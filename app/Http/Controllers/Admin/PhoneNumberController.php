<?php

namespace App\Http\Controllers\Admin;

use App\Helpers\PhoneNumberHelper;
use App\Http\Controllers\Controller;
use App\Models\PhoneNumber;
use App\Services\PhoneNumberService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class PhoneNumberController extends Controller
{
    protected $phoneNumberService;

    public function __construct(PhoneNumberService $phoneNumberService)
    {
        $this->phoneNumberService = $phoneNumberService;
    }

    /**
     * Display phone number inventory
     */
    public function index(Request $request)
    {
        $this->authorize('viewAny', PhoneNumber::class);

        $query = PhoneNumber::with(['user', 'requester', 'approver']);

        // Filter by status
        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        // Filter by country
        if ($request->filled('country')) {
            $query->where('country_code', $request->country);
        }

        // Filter by area code
        if ($request->filled('area_code')) {
            $query->where('area_code', $request->area_code);
        }

        // Search by number
        if ($request->filled('search')) {
            $query->where('number', 'like', '%' . $request->search . '%');
        }

        $numbers = $query->latest()
            ->paginate($request->per_page ?? 15)
            ->withQueryString();

        $statistics = $this->phoneNumberService->getStatistics();

        // Fetch Twilio numbers with configuration status (always fetch fresh from Twilio API)
        $twilioNumbers = $this->getTwilioNumbers();
        
        // Auto-sync Twilio numbers to database in background for better data consistency
        $this->syncTwilioNumbersToDatabase($twilioNumbers);

        // Get ALL assigned phone numbers (not just paginated ones) for matching with Twilio numbers
        $allAssignedNumbers = PhoneNumber::where('status', 'assigned')
            ->with('user')
            ->get()
            ->keyBy('number'); // Key by phone number for quick lookup

        // Enhance Twilio numbers with assignment information
        $twilioNumbers = collect($twilioNumbers)->map(function ($twilioNumber) use ($allAssignedNumbers) {
            $assignedNumber = $allAssignedNumbers->get($twilioNumber['phone_number']);
            
            if ($assignedNumber) {
                $twilioNumber['assigned_to'] = [
                    'id' => $assignedNumber->id,
                    'user_id' => $assignedNumber->user_id,
                    'user_name' => $assignedNumber->user ? $assignedNumber->user->name : null,
                    'assigned_at' => $assignedNumber->assigned_at,
                ];
            } else {
                $twilioNumber['assigned_to'] = null;
            }
            
            return $twilioNumber;
        })->toArray();

        // Get customer and admin users for assignment
        $users = \App\Models\User::select('users.id', 'users.name', 'users.email')
            ->join('role_user', 'users.id', '=', 'role_user.user_id')
            ->join('roles', 'role_user.role_id', '=', 'roles.id')
            ->whereIn('roles.slug', ['customer', 'admin'])
            ->distinct()
            ->orderBy('users.name')
            ->get();

        return Inertia::render('Admin/PhoneNumbers/Index', [
            'numbers' => $numbers,
            'stats' => $statistics,
            'filters' => $request->only(['status', 'country', 'area_code', 'search']),
            'twilioNumbers' => $twilioNumbers,
            'twilioConfig' => $this->getTwilioConfig(),
            'users' => $users,
        ]);
    }

    /**
     * Get Twilio numbers with configuration status
     */
    private function getTwilioNumbers()
    {
        try {
            $config = \App\Models\TwilioGlobalConfig::active();
            
            if (!$config) {
                Log::warning('No active Twilio configuration found');
                return [];
            }

            if (!$config->account_sid || !$config->auth_token) {
                Log::error('Twilio configuration missing credentials');
                return [];
            }

            $client = new \Twilio\Rest\Client(
                $config->account_sid,
                $config->getDecryptedAuthToken()
            );

            // Fetch latest numbers from Twilio API
            $numbers = $client->incomingPhoneNumbers->read();
            
            if (empty($numbers)) {
                Log::info('No phone numbers found in Twilio account', [
                    'account_sid' => $config->account_sid
                ]);
                return [];
            }
            
            Log::info('Fetching Twilio numbers', [
                'account_sid' => $config->account_sid,
                'count' => count($numbers)
            ]);
            
            $twilioNumbers = [];
            foreach ($numbers as $number) {
                $twilioNumbers[] = [
                    'sid' => $number->sid,
                    'phone_number' => $number->phoneNumber,
                    'friendly_name' => $number->friendlyName ?? $number->phoneNumber,
                    'voice_application_sid' => $number->voiceApplicationSid,
                    'voice_url' => $number->voiceUrl,
                    'status_callback' => $number->statusCallback,
                    'capabilities' => [
                        'voice' => $number->capabilities->voice ?? false,
                        'sms' => $number->capabilities->sms ?? false,
                        'mms' => $number->capabilities->mms ?? false,
                    ],
                    'is_configured' => $number->voiceApplicationSid === $config->twiml_app_sid,
                ];
            }

            Log::info('Twilio numbers fetched successfully', [
                'count' => count($twilioNumbers),
                'account_sid' => $config->account_sid
            ]);
            return $twilioNumbers;
        } catch (\Twilio\Exceptions\AuthenticationException $e) {
            Log::error('Twilio authentication failed', [
                'error' => $e->getMessage(),
                'status' => $e->getStatusCode()
            ]);
            return [];
        } catch (\Exception $e) {
            Log::error('Failed to fetch Twilio numbers', [
                'error' => $e->getMessage(),
                'class' => get_class($e)
            ]);
            return [];
        }
    }

    /**
     * Get Twilio configuration
     */
    private function getTwilioConfig()
    {
        $config = \App\Models\TwilioGlobalConfig::active();
        
        if (!$config) {
            return null;
        }

        return [
            'account_sid' => $config->account_sid,
            'twiml_app_sid' => $config->twiml_app_sid,
            'webhook_url' => $config->webhook_url,
            'is_active' => $config->is_active,
        ];
    }

    /**
     * Sync Twilio numbers to database
     * This runs automatically when viewing the inventory page
     */
    private function syncTwilioNumbersToDatabase($twilioNumbers)
    {
        if (empty($twilioNumbers)) {
            return;
        }

        try {
            $config = \App\Models\TwilioGlobalConfig::active();
            if (!$config) {
                return;
            }

            foreach ($twilioNumbers as $twilioNumber) {
                PhoneNumber::updateOrCreate(
                    ['number' => $twilioNumber['phone_number']],
                    [
                        'twilio_sid' => $twilioNumber['sid'],
                        'formatted_number' => $twilioNumber['phone_number'],
                        'friendly_name' => $twilioNumber['friendly_name'],
                        'country_code' => substr($twilioNumber['phone_number'], 1, 2) === '1' ? 'US' : null,
                        'area_code' => PhoneNumberHelper::extractAreaCode($twilioNumber['phone_number']),
                        'status' => PhoneNumber::where('number', $twilioNumber['phone_number'])->value('status') ?? 'available',
                        'capabilities' => $twilioNumber['capabilities'],
                        'monthly_cost' => 1.00,
                    ]
                );
            }

            Log::info('Twilio numbers synced to database', [
                'count' => count($twilioNumbers),
                'account_sid' => $config->account_sid
            ]);
        } catch (\Exception $e) {
            Log::error('Failed to sync Twilio numbers to database', [
                'error' => $e->getMessage()
            ]);
        }
    }

    /**
     * Sync available numbers from Twilio
     */
    public function sync(Request $request)
    {
        $this->authorize('sync', PhoneNumber::class);

        $request->validate([
            'country_code' => 'required|string|size:2',
            'area_code' => 'nullable|string|max:10',
        ]);

        try {
            $numbers = $this->phoneNumberService->syncAvailableNumbers(
                $request->country_code,
                $request->area_code
            );

            // Check if no numbers found
            if (empty($numbers)) {
                return response()->json([
                    'success' => true,
                    'message' => 'No numbers found for the selected country/area code.',
                    'numbers' => [],
                ]);
            }

            // Format numbers for response - use collect() to ensure it's a collection
            $syncedNumbers = collect($numbers)->map(function ($number) {
                return [
                    'id' => $number->id,
                    'number' => $number->number,
                    'formatted_number' => $number->formatted_number,
                    'friendly_name' => $number->friendly_name,
                    'area_code' => $number->area_code,
                    'capabilities' => $number->capabilities,
                ];
            });

            return response()->json([
                'success' => true,
                'message' => count($numbers) . ' numbers synced from Twilio successfully.',
                'numbers' => $syncedNumbers,
            ]);
        } catch (\Twilio\Exceptions\RestException $e) {
            // Handle Twilio-specific errors
            Log::warning('Twilio sync error', [
                'error' => $e->getMessage(),
                'code' => $e->getStatusCode(),
                'country_code' => $request->country_code,
                'area_code' => $request->area_code,
            ]);

            // Check if it's a 404 (resource not found - no numbers available)
            if ($e->getStatusCode() == 404) {
                return response()->json([
                    'success' => true,
                    'message' => 'No numbers found for the selected country/area code.',
                    'numbers' => [],
                ]);
            }
            
            return response()->json([
                'success' => false,
                'message' => 'Failed to sync numbers: ' . $e->getMessage(),
            ], 500);
        } catch (\Exception $e) {
            Log::error('Failed to sync numbers', [
                'error' => $e->getMessage(),
                'country_code' => $request->country_code,
                'area_code' => $request->area_code,
            ]);
            
            // Check if error message contains "not found" or "404"
            if (stripos($e->getMessage(), 'not found') !== false || stripos($e->getMessage(), '404') !== false) {
                return response()->json([
                    'success' => true,
                    'message' => 'No numbers found for the selected country/area code.',
                    'numbers' => [],
                ]);
            }
            
            return response()->json([
                'success' => false,
                'message' => 'Failed to sync numbers: ' . $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Configure selected phone numbers
     */
    public function configure(Request $request)
    {
        $this->authorize('sync', PhoneNumber::class);

        $request->validate([
            'phone_numbers' => 'required|array|min:1',
            'phone_numbers.*' => 'required|string',
        ]);

        $config = \App\Models\TwilioGlobalConfig::active();
        
        if (!$config) {
            return redirect()->back()->with('error', 'No active Twilio configuration found. Please configure Twilio in Settings.');
        }

        if (!$config->twiml_app_sid) {
            return redirect()->back()->with('error', 'TwiML Application not configured. Please run: php artisan twilio:configure');
        }

        try {
            $client = new \Twilio\Rest\Client(
                $config->account_sid,
                $config->getDecryptedAuthToken()
            );

            $configured = 0;
            $errors = [];

            foreach ($request->phone_numbers as $phoneNumber) {
                try {
                    // Find the phone number SID
                    $numbers = $client->incomingPhoneNumbers->read(['phoneNumber' => $phoneNumber]);
                    
                    if (empty($numbers)) {
                        $errors[] = "Phone number {$phoneNumber} not found";
                        continue;
                    }

                    $numberSid = $numbers[0]->sid;

                    // Update to use TwiML Application
                    $client->incomingPhoneNumbers($numberSid)
                        ->update([
                            'voiceApplicationSid' => $config->twiml_app_sid,
                        ]);

                    $configured++;
                } catch (\Exception $e) {
                    $errors[] = "Failed to configure {$phoneNumber}: " . $e->getMessage();
                }
            }

            if ($configured > 0) {
                $message = "Successfully configured {$configured} phone number(s) for DialN AI WebRTC";
                if (!empty($errors)) {
                    $message .= '. Some errors: ' . implode(', ', $errors);
                }
                return redirect()->back()->with('success', $message);
            } else {
                return redirect()->back()->with('error', 'Failed to configure phone numbers: ' . implode(', ', $errors));
            }
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Failed to configure phone numbers: ' . $e->getMessage());
        }
    }

    /**
     * Release a phone number back to Twilio
     */
    public function release(PhoneNumber $phoneNumber)
    {
        $this->authorize('release', $phoneNumber);

        try {
            $this->phoneNumberService->releaseNumber($phoneNumber);

            return redirect()->back()->with('success', 'Phone number released successfully.');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Failed to release number: ' . $e->getMessage());
        }
    }

    /**
     * Revoke/unassign a phone number from user (keeps in inventory)
     */
    public function revoke(PhoneNumber $phoneNumber)
    {
        $this->authorize('release', $phoneNumber); // Reuse release permission

        try {
            $userName = $phoneNumber->user ? $phoneNumber->user->name : 'user';
            $this->phoneNumberService->revokeNumber($phoneNumber);

            return redirect()->back()->with('success', "Phone number revoked from {$userName} successfully.");
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Failed to revoke number: ' . $e->getMessage());
        }
    }

    /**
     * Get available numbers (API endpoint)
     */
    public function available(Request $request)
    {
        $this->authorize('viewAny', PhoneNumber::class);

        $numbers = $this->phoneNumberService->getAvailableNumbers(
            $request->country_code,
            $request->area_code,
            $request->has_voice ?? null,
            $request->has_sms ?? null
        );

        return response()->json([
            'numbers' => $numbers,
        ]);
    }

    /**
     * Show statistics (API endpoint)
     */
    public function statistics()
    {
        $this->authorize('viewCosts', PhoneNumber::class);

        return response()->json([
            'statistics' => $this->phoneNumberService->getStatistics(),
        ]);
    }

    /**
     * Manually assign a phone number to a user
     */
    public function assignNumber(Request $request)
    {
        $this->authorize('sync', PhoneNumber::class);

        // Clean up empty strings to null BEFORE validation
        if ($request->phone_number_id === '' || $request->phone_number_id === null) {
            $request->merge(['phone_number_id' => null]);
        }
        if ($request->phone_number === '' || $request->phone_number === null) {
            $request->merge(['phone_number' => null]);
        }

        $request->validate([
            'user_id' => 'required|exists:users,id',
            'phone_number_id' => 'nullable|exists:phone_numbers,id',
            'phone_number' => ['nullable', 'string', 'regex:/^\+[1-9]\d{1,14}$/'],
            'friendly_name' => 'nullable|string|max:255',
        ]);

        // Ensure at least one of phone_number_id or phone_number is provided
        if (!$request->filled('phone_number_id') && !$request->filled('phone_number')) {
            return redirect()->back()->with('error', 'Please provide either an existing phone number or a new phone number to purchase.');
        }

        try {
            $user = \App\Models\User::findOrFail($request->user_id);
            
            Log::info('Assigning phone number', [
                'user_id' => $request->user_id,
                'phone_number_id' => $request->phone_number_id,
                'phone_number' => $request->phone_number,
                'friendly_name' => $request->friendly_name,
            ]);
            
            // Use database transaction for atomic operation
            $result = \Illuminate\Support\Facades\DB::transaction(function () use ($request, $user) {
                // Option 1: Assign existing number from database
                if ($request->filled('phone_number_id')) {
                    $phoneNumber = PhoneNumber::findOrFail($request->phone_number_id);
                    
                    // Check if number is available
                    if ($phoneNumber->status !== 'available') {
                        throw new \Exception('This number is not available for assignment.');
                    }
                    
                    // Ensure number has twilio_sid - fetch from Twilio if missing
                    if (!$phoneNumber->twilio_sid) {
                        $config = \App\Models\TwilioGlobalConfig::active();
                        if ($config) {
                            try {
                                $client = new \Twilio\Rest\Client(
                                    $config->account_sid,
                                    $config->getDecryptedAuthToken()
                                );
                                $twilioNumbers = $client->incomingPhoneNumbers->read([
                                    'phoneNumber' => $phoneNumber->number
                                ]);
                                if (!empty($twilioNumbers)) {
                                    $phoneNumber->twilio_sid = $twilioNumbers[0]->sid;
                                    $phoneNumber->save();
                                }
                            } catch (\Exception $e) {
                                Log::warning('Could not fetch twilio_sid during assignment', [
                                    'number' => $phoneNumber->number,
                                    'error' => $e->getMessage()
                                ]);
                            }
                        }
                    }
                    
                    // Assign the number
                    $phoneNumber = $this->phoneNumberService->assignNumber($phoneNumber, $user);
                    
                    Log::info('Phone number assigned successfully', [
                        'number' => $phoneNumber->number,
                        'user_id' => $user->id,
                        'twilio_sid' => $phoneNumber->twilio_sid
                    ]);
                    
                    return [
                        'success' => true,
                        'message' => "Phone number {$phoneNumber->formatted_number} assigned to {$user->name} successfully.",
                        'phone_number' => $phoneNumber,
                    ];
                }
                
                // Option 2: Purchase new number from Twilio and assign
                if ($request->filled('phone_number')) {
                    // Check if number already exists in database
                    $existing = PhoneNumber::where('number', $request->phone_number)->first();
                    
                    if ($existing) {
                        if ($existing->status === 'available') {
                            // Ensure twilio_sid is set
                            if (!$existing->twilio_sid) {
                                $config = \App\Models\TwilioGlobalConfig::active();
                                if ($config) {
                                    try {
                                        $client = new \Twilio\Rest\Client(
                                            $config->account_sid,
                                            $config->getDecryptedAuthToken()
                                        );
                                        $twilioNumbers = $client->incomingPhoneNumbers->read([
                                            'phoneNumber' => $existing->number
                                        ]);
                                        if (!empty($twilioNumbers)) {
                                            $existing->twilio_sid = $twilioNumbers[0]->sid;
                                            $existing->save();
                                        }
                                    } catch (\Exception $e) {
                                        Log::warning('Could not fetch twilio_sid', [
                                            'number' => $existing->number,
                                            'error' => $e->getMessage()
                                        ]);
                                    }
                                }
                            }
                            
                            // Assign existing available number
                            $phoneNumber = $this->phoneNumberService->assignNumber($existing, $user);
                            
                            Log::info('Existing number assigned', [
                                'number' => $phoneNumber->number,
                                'user_id' => $user->id,
                                'twilio_sid' => $phoneNumber->twilio_sid
                            ]);
                            
                            return [
                                'success' => true,
                                'message' => "Phone number {$phoneNumber->formatted_number} assigned to {$user->name} successfully.",
                                'phone_number' => $phoneNumber,
                            ];
                        } else {
                            throw new \Exception('This number is already assigned to another user.');
                        }
                    } else {
                        // Purchase from Twilio
                        $phoneNumber = $this->phoneNumberService->purchaseNumber(
                            $request->phone_number,
                            $request->friendly_name
                        );
                        
                        // Configure for WebRTC
                        $config = \App\Models\TwilioGlobalConfig::active();
                        if ($config && $config->twiml_app_sid) {
                            $this->phoneNumberService->configureForWebRTC($phoneNumber, $config->twiml_app_sid);
                        }
                        
                        // Assign to user
                        $phoneNumber = $this->phoneNumberService->assignNumber($phoneNumber, $user);
                        
                        Log::info('Phone number purchased and assigned', [
                            'number' => $phoneNumber->number,
                            'user_id' => $user->id,
                            'twilio_sid' => $phoneNumber->twilio_sid
                        ]);
                        
                        return [
                            'success' => true,
                            'message' => "Phone number {$phoneNumber->formatted_number} purchased and assigned to {$user->name} successfully.",
                            'phone_number' => $phoneNumber,
                        ];
                    }
                }
                
                // This should never be reached due to early validation
                throw new \Exception('No valid phone number provided for assignment.');
            });
            
            return redirect()->back()->with('success', $result['message']);
            
        } catch (\Exception $e) {
            Log::error('Failed to assign phone number: ' . $e->getMessage());
            return redirect()->back()->with('error', 'Failed to assign number: ' . $e->getMessage());
        }
    }

    /**
     * Get list of countries where Twilio supports phone numbers
     */
    public function getSupportedCountries()
    {
        try {
            $config = \App\Models\TwilioGlobalConfig::active();
            
            if (!$config) {
                return response()->json([
                    'countries' => []
                ]);
            }

            $client = new \Twilio\Rest\Client(
                $config->account_sid,
                $config->getDecryptedAuthToken()
            );

            // Fetch all supported countries using availablePhoneNumbers
            $countries = $client->availablePhoneNumbers->read();

            // Transform to a clean array with country code and name
            $countryList = array_map(function($country) {
                return [
                    'code' => $country->countryCode,
                    'name' => $country->country,
                ];
            }, $countries);

            // Sort by name
            usort($countryList, function($a, $b) {
                return strcmp($a['name'], $b['name']);
            });

            return response()->json([
                'countries' => $countryList
            ]);
            
        } catch (\Exception $e) {
            Log::error('Failed to fetch supported countries', [
                'error' => $e->getMessage()
            ]);
            
            return response()->json([
                'countries' => []
            ], 500);
        }
    }
}

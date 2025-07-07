<?php

namespace App\Http\Controllers;

use App\Models\UserSipTrunk;
use App\Models\TwilioGlobalConfig;
use App\Services\TrunkAutoSetupService;
use App\Services\TrunkCallService;
use App\Services\TrunkHealthService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;
use Inertia\Inertia;

class TrunkManagementController extends Controller
{
    protected TrunkAutoSetupService $autoSetupService;
    protected TrunkCallService $callService;
    protected TrunkHealthService $healthService;

    public function __construct(
        TrunkAutoSetupService $autoSetupService,
        TrunkCallService $callService,
        TrunkHealthService $healthService
    ) {
        $this->autoSetupService = $autoSetupService;
        $this->callService = $callService;
        $this->healthService = $healthService;
    }

    /**
     * Display list of user's SIP trunks
     */
    public function index()
    {
        $user = Auth::user();
        
        $trunks = $user->sipTrunks()
            ->with(['phoneNumbers'])
            ->withCount('phoneNumbers')
            ->latest()
            ->get()
            ->map(function ($trunk) {
                return [
                    'id' => $trunk->id,
                    'friendly_name' => $trunk->trunk_friendly_name ?? 'SIP Trunk',
                    'status' => $trunk->status ?? 'unknown',
                    'health_status' => $trunk->health_status ?? 'unknown',
                    'trunk_domain_name' => $trunk->trunk_domain_name ?? 'N/A',
                    'phone_numbers_count' => $trunk->phone_numbers_count ?? 0,
                    'total_calls_count' => $trunk->total_calls_count ?? 0,
                    'total_minutes_used' => number_format((float)($trunk->total_minutes_used ?? 0), 2),
                    'last_call_at' => $trunk->last_call_at?->toISOString(),
                    'last_health_check_at' => $trunk->last_health_check_at?->toISOString(),
                    'created_at' => $trunk->created_at->toISOString(),
                    'is_operational' => $trunk->isOperational(),
                    'is_setup_complete' => $trunk->isSetupComplete(),
                    'setup_progress' => $trunk->setup_progress ?? 0,
                ];
            });

        return Inertia::render('TwilioIntegration/SipTrunk/Index', [
            'trunks' => $trunks,
            'hasTrunk' => $trunks->isNotEmpty(),
        ]);
    }

    /**
     * Show setup wizard
     */
    public function create()
    {
        $user = Auth::user();

        // Check if user already has an active trunk
        if ($user->hasSipTrunk()) {
            return redirect()->route('sip-trunk.index')
                ->with('warning', 'You already have an active SIP trunk. Please disconnect it first if you want to connect a new one.');
        }

        // Check if global Twilio config exists in database
        $twilioConfig = TwilioGlobalConfig::active();
        
        // More strict validation: check if config exists AND has valid credentials
        $twilioConfigured = false;
        $twilioAccountSid = null;
        
        if ($twilioConfig) {
            $accountSid = trim($twilioConfig->account_sid ?? '');
            $authToken = trim($twilioConfig->auth_token ?? '');
            
            // Validate Account SID format (starts with AC and is 34 characters)
            $validAccountSid = !empty($accountSid) && 
                              str_starts_with($accountSid, 'AC') && 
                              strlen($accountSid) === 34;
            
            // Validate Auth Token (should be 32 characters minimum)
            $validAuthToken = !empty($authToken) && strlen($authToken) >= 32;
            
            $twilioConfigured = $validAccountSid && $validAuthToken;
            $twilioAccountSid = $twilioConfigured ? substr($accountSid, 0, 8) . '...' : null;
        }

        return Inertia::render('TwilioIntegration/SipTrunk/SetupWizard', [
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
            ],
            'twilioConfigured' => $twilioConfigured,
            'twilioAccountSid' => $twilioAccountSid,
        ]);
    }

    /**
     * Store - trigger automatic setup
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'friendly_name' => 'nullable|string|max:100',
        ]);

        // Get global Twilio config from database
        $twilioConfig = TwilioGlobalConfig::active();

        if (!$twilioConfig) {
            return response()->json([
                'success' => false,
                'message' => 'Twilio configuration is not set up. Please configure your Twilio credentials first at /settings/twilio',
            ], 400);
        }

        $twilioAccountSid = trim($twilioConfig->account_sid ?? '');
        $twilioAuthToken = trim($twilioConfig->auth_token ?? '');

        // Validate credentials format
        if (empty($twilioAccountSid) || !str_starts_with($twilioAccountSid, 'AC') || strlen($twilioAccountSid) !== 34) {
            return response()->json([
                'success' => false,
                'message' => 'Invalid Twilio Account SID. Please reconfigure your Twilio credentials at /settings/twilio',
            ], 400);
        }

        if (empty($twilioAuthToken) || strlen($twilioAuthToken) < 32) {
            return response()->json([
                'success' => false,
                'message' => 'Invalid Twilio Auth Token. Please reconfigure your Twilio credentials at /settings/twilio',
            ], 400);
        }

        $twilioAuthToken = $twilioConfig->getDecryptedAuthToken();

        $user = Auth::user();

        // Check if user already has an active trunk
        if ($user->hasSipTrunk()) {
            return response()->json([
                'success' => false,
                'message' => 'You already have an active SIP trunk.',
            ], 400);
        }

        // Generate webhook token if not exists
        if (!$user->webhook_token) {
            $user->webhook_token = Str::random(40);
            $user->save();
        }

        // Generate friendly name if not provided
        $friendlyName = $validated['friendly_name'] ?? "{$user->name}'s SIP Trunk";

        try {
            // Start automatic setup
            $result = $this->autoSetupService->setupTrunk(
                $user,
                $twilioAccountSid,
                $twilioAuthToken,
                $friendlyName
            );

            if ($result['success']) {
                Log::info("SIP Trunk setup completed for user {$user->id}", [
                    'trunk_id' => $result['trunk']->id,
                    'test_results' => $result['test_results'],
                ]);

                return response()->json([
                    'success' => true,
                    'message' => 'SIP Trunk connected successfully!',
                    'trunk' => [
                        'id' => $result['trunk']->id,
                        'friendly_name' => $result['trunk']->trunk_friendly_name,
                        'trunk_domain_name' => $result['trunk']->trunk_domain_name,
                        'phone_numbers_count' => $result['trunk']->phoneNumbers()->count(),
                    ],
                    'test_results' => $result['test_results'],
                ]);
            } else {
                return response()->json([
                    'success' => false,
                    'message' => $result['error'] ?? 'Failed to setup SIP trunk.',
                ], 400);
            }
        } catch (\Exception $e) {
            Log::error("SIP Trunk setup failed for user {$user->id}", [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);

            return response()->json([
                'success' => false,
                'message' => 'An error occurred during setup: ' . $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Display trunk details
     */
    public function show(UserSipTrunk $trunk)
    {
        // Ensure user owns this trunk
        if ($trunk->user_id !== Auth::id()) {
            abort(403, 'Unauthorized access to this trunk.');
        }

        $trunk->load(['phoneNumbers']);

        // Get statistics
        $statistics = $this->callService->getTrunkStatistics($trunk);

        // Get recent health logs
        $healthHistory = $this->healthService->getHealthHistory($trunk, 10);

        // Get issues if any
        $issues = $this->healthService->needsAttention($trunk);

        return Inertia::render('TwilioIntegration/SipTrunk/Show', [
            'trunk' => [
                'id' => $trunk->id,
                'friendly_name' => $trunk->trunk_friendly_name ?? 'SIP Trunk',
                'status' => $trunk->status ?? 'unknown',
                'health_status' => $trunk->health_status ?? 'unknown',
                'trunk_sid' => $trunk->trunk_sid ?? 'N/A',
                'trunk_domain_name' => $trunk->trunk_domain_name ?? 'N/A',
                'origination_sip_url' => $trunk->origination_sip_url ?? 'N/A',
                'termination_method' => $trunk->termination_method ?? 'N/A',
                'created_at' => $trunk->created_at->toISOString(),
                'last_call_at' => $trunk->last_call_at?->toISOString(),
                'last_health_check_at' => $trunk->last_health_check_at?->toISOString(),
                'is_operational' => $trunk->isOperational(),
                'phone_numbers' => $trunk->phoneNumbers->map(fn($number) => [
                    'id' => $number->id,
                    'phone_number' => $number->phone_number,
                    'formatted' => $number->formatted,
                    'assigned_to' => $number->assigned_to ?? 'unassigned',
                    'assigned_id' => $number->assigned_id,
                    'has_voice' => $number->hasVoice(),
                    'has_sms' => $number->hasSms(),
                    'has_mms' => $number->hasMms(),
                    'is_available' => $number->isAvailable(),
                ]),
            ],
            'statistics' => $statistics,
            'healthHistory' => $healthHistory->map(fn($log) => [
                'id' => $log->id,
                'check_type' => $log->check_type ?? 'unknown',
                'status' => $log->status ?? 'unknown',
                'response_time_ms' => $log->response_time_ms ?? 0,
                'error_message' => $log->error_message,
                'checked_at' => $log->checked_at->toISOString(),
            ]),
            'issues' => $issues ?? [],
        ]);
    }

    /**
     * Get setup status - for polling during setup
     */
    public function setupStatus(UserSipTrunk $trunk)
    {
        // Ensure user owns this trunk
        if ($trunk->user_id !== Auth::id()) {
            abort(403, 'Unauthorized access to this trunk.');
        }

        return response()->json([
            'status' => $trunk->status,
            'setup_step' => $trunk->setup_step,
            'setup_progress' => $trunk->setup_progress,
            'setup_error' => $trunk->last_error,
            'is_setup_complete' => $trunk->isSetupComplete(),
        ]);
    }

    /**
     * Sync phone numbers
     */
    public function sync(UserSipTrunk $trunk)
    {
        // Ensure user owns this trunk
        if ($trunk->user_id !== Auth::id()) {
            abort(403, 'Unauthorized access to this trunk.');
        }

        try {
            $result = $this->autoSetupService->syncPhoneNumbers($trunk);

            if ($result['success']) {
                return response()->json([
                    'success' => true,
                    'message' => "Synced {$result['synced_count']} phone numbers successfully.",
                    'synced_count' => $result['synced_count'],
                ]);
            } else {
                return response()->json([
                    'success' => false,
                    'message' => $result['error'] ?? 'Failed to sync phone numbers.',
                ], 400);
            }
        } catch (\Exception $e) {
            Log::error("Phone number sync failed for trunk {$trunk->id}", [
                'error' => $e->getMessage(),
            ]);

            return response()->json([
                'success' => false,
                'message' => 'An error occurred during sync: ' . $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Run health check
     */
    public function health(UserSipTrunk $trunk)
    {
        // Ensure user owns this trunk
        if ($trunk->user_id !== Auth::id()) {
            abort(403, 'Unauthorized access to this trunk.');
        }

        try {
            $result = $this->healthService->performHealthCheck($trunk);

            return response()->json([
                'success' => true,
                'healthy' => $result['healthy'],
                'health_status' => $result['health_status'],
                'response_time_ms' => $result['response_time_ms'],
                'issues' => $result['issues'],
                'tests' => $result['tests'],
            ]);
        } catch (\Exception $e) {
            Log::error("Health check failed for trunk {$trunk->id}", [
                'error' => $e->getMessage(),
            ]);

            return response()->json([
                'success' => false,
                'message' => 'An error occurred during health check: ' . $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Disconnect trunk
     */
    public function destroy(UserSipTrunk $trunk)
    {
        // Ensure user owns this trunk
        if ($trunk->user_id !== Auth::id()) {
            abort(403, 'Unauthorized access to this trunk.');
        }

        try {
            // Optional: Delete trunk from Twilio (commented out - user may want to keep it in Twilio)
            // $client = $trunk->getTwilioClient();
            // $client->trunking->v1->trunks($trunk->trunk_sid)->delete();

            // Mark trunk as suspended in our database
            $trunk->update([
                'status' => 'suspended',
                'health_status' => 'down',
            ]);

            Log::info("SIP Trunk disconnected for user {$trunk->user_id}", [
                'trunk_id' => $trunk->id,
            ]);

            return response()->json([
                'success' => true,
                'message' => 'SIP Trunk disconnected successfully.',
            ]);
        } catch (\Exception $e) {
            Log::error("Trunk disconnect failed for trunk {$trunk->id}", [
                'error' => $e->getMessage(),
            ]);

            return response()->json([
                'success' => false,
                'message' => 'An error occurred while disconnecting: ' . $e->getMessage(),
            ], 500);
        }
    }
}

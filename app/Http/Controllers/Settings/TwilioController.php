<?php

declare(strict_types=1);

namespace App\Http\Controllers\Settings;

use App\Http\Controllers\Controller;
use App\Models\TwilioGlobalConfig;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Inertia\Response;
use Twilio\Rest\Client;

class TwilioController extends Controller
{
    /**
     * Show Twilio configuration page
     */
    public function show(Request $request): Response
    {
        // Only admin can view Twilio settings
        $user = $request->user();
        
        if (!$user->isAdmin()) {
            return Inertia::render('settings/twilio', [
                'config' => null,
                'canManageTwilio' => false,
            ]);
        }

        $config = TwilioGlobalConfig::active();
        
        return Inertia::render('settings/twilio', [
            'config' => $config ? [
                'id' => $config->id,
                'account_sid' => $config->account_sid,
                'api_key_sid' => $config->api_key_sid,
                'twiml_app_sid' => $config->twiml_app_sid,
                'webhook_url' => $config->webhook_url,
                'is_active' => $config->is_active,
                'verified_at' => $config->verified_at?->toDateTimeString(),
            ] : null,
            'canManageTwilio' => true,
        ]);
    }
    
    /**
     * Configure global Twilio settings
     */
    public function configure(Request $request)
    {
        // Only admin can configure Twilio
        if (!$request->user()->isAdmin()) {
            abort(403, 'Unauthorized action.');
        }

        $validated = $request->validate([
            'account_sid' => 'required|string|starts_with:AC',
            'auth_token' => 'required|string|min:32',
        ]);
        
        // Trim whitespace from credentials (common copy-paste issue)
        $validated['account_sid'] = trim($validated['account_sid']);
        $validated['auth_token'] = trim($validated['auth_token']);
        
        // Initialize API key and TwiML App as null - will be created fresh
        $validated['api_key_sid'] = null;
        $validated['api_key_secret'] = null;
        $validated['twiml_app_sid'] = null;
        
        // Check if auth token looks like a placeholder
        if (str_contains(strtolower($validated['auth_token']), 'your twilio') || 
            str_contains(strtolower($validated['auth_token']), 'placeholder')) {
            return back()->withErrors([
                'auth_token' => 'Please enter your actual Twilio Auth Token, not the placeholder text.'
            ]);
        }
        
        // Auto-generate webhook URL from current application URL
        $validated['webhook_url'] = rtrim(config('app.url'), '/');

        try {
            // Verify credentials
            $client = new Client(
                $validated['account_sid'],
                $validated['auth_token']
            );
            
            // Test the connection - use a simpler method that just validates credentials
            try {
                // Try to list incoming phone numbers (this is a basic read operation)
                // Just fetch one to test if credentials are valid
                $numbers = $client->incomingPhoneNumbers->read([], 1);
                
                Log::info('Twilio authentication successful', [
                    'account_sid' => $validated['account_sid'],
                ]);
            } catch (\Twilio\Exceptions\AuthenticationException $e) {
                Log::error('Twilio authentication failed', [
                    'account_sid' => $validated['account_sid'],
                    'auth_token_length' => strlen($validated['auth_token']),
                    'error' => $e->getMessage(),
                    'error_code' => $e->getCode(),
                ]);
                return back()->withErrors([
                    'auth_token' => 'Authentication failed. The Account SID and Auth Token do not match. Please copy BOTH from the same Twilio account. Auth Token must be exactly 32 characters (current: ' . strlen($validated['auth_token']) . ').'
                ]);
            } catch (\Exception $e) {
                Log::error('Twilio connection error', [
                    'account_sid' => $validated['account_sid'],
                    'error' => $e->getMessage(),
                    'error_class' => get_class($e),
                ]);
                return back()->withErrors([
                    'account_sid' => 'Connection failed: ' . $e->getMessage()
                ]);
            }
            
            // Create API Key if not provided
            if (empty($validated['api_key_sid']) || empty($validated['api_key_secret'])) {
                try {
                    $apiKey = $client->newKeys->create([
                        'friendlyName' => 'DialN AI WebRTC Key - ' . now()->format('Y-m-d H:i:s'),
                    ]);
                    
                    $validated['api_key_sid'] = $apiKey->sid;
                    $validated['api_key_secret'] = $apiKey->secret;
                } catch (\Exception $e) {
                    return back()->with('error', 'Failed to create API Key: ' . $e->getMessage());
                }
            }
            
            // Prepare TwiML App URLs
            // Use manual-call endpoint as the primary voice URL
            // This handles BOTH inbound (external phones) AND outbound (browser) calls
            $voiceUrl = rtrim($validated['webhook_url'], '/') . '/twiml/manual-call';
            $statusCallback = rtrim($validated['webhook_url'], '/') . '/webhooks/twilio/call-status';
            // Fallback URL for error handling
            $voiceFallbackUrl = rtrim($validated['webhook_url'], '/') . '/twiml/inbound-call';
            
            // Create or update TwiML App
            if (empty($validated['twiml_app_sid'])) {
                // Create new TwiML App
                try {
                    $application = $client->applications->create([
                        'voiceUrl' => $voiceUrl,
                        'voiceMethod' => 'POST',
                        'voiceFallbackUrl' => $voiceFallbackUrl,
                        'voiceFallbackMethod' => 'POST',
                        'statusCallback' => $statusCallback,
                        'statusCallbackMethod' => 'POST',
                        'friendlyName' => 'DialN AI WebRTC - ' . now()->format('Y-m-d H:i:s'),
                    ]);
                    
                    $validated['twiml_app_sid'] = $application->sid;
                    
                    Log::info('TwiML App created', [
                        'app_sid' => $application->sid,
                        'voice_url' => $voiceUrl,
                    ]);
                } catch (\Exception $e) {
                    return back()->with('error', 'Failed to create TwiML App: ' . $e->getMessage());
                }
            } else {
                // Update existing TwiML App to ensure URLs are correct
                try {
                    $client->applications($validated['twiml_app_sid'])
                        ->update([
                            'voiceUrl' => $voiceUrl,
                            'voiceMethod' => 'POST',
                            'voiceFallbackUrl' => $voiceFallbackUrl,
                            'voiceFallbackMethod' => 'POST',
                            'statusCallback' => $statusCallback,
                            'statusCallbackMethod' => 'POST',
                        ]);
                    
                    Log::info('TwiML App updated', [
                        'app_sid' => $validated['twiml_app_sid'],
                        'voice_url' => $voiceUrl,
                    ]);
                } catch (\Exception $e) {
                    Log::warning('Failed to update existing TwiML App, will use as-is', [
                        'app_sid' => $validated['twiml_app_sid'],
                        'error' => $e->getMessage(),
                    ]);
                }
            }
            
            // SECURITY: Delete all old Twilio configurations to prevent conflicts
            // This ensures only one Twilio account is active at a time
            $oldConfigs = TwilioGlobalConfig::where('account_sid', '!=', $validated['account_sid'])->get();
            foreach ($oldConfigs as $oldConfig) {
                Log::info('Deleting old Twilio configuration', [
                    'old_account_sid' => $oldConfig->account_sid,
                    'new_account_sid' => $validated['account_sid']
                ]);
                $oldConfig->delete();
            }
            
            // Deactivate any remaining configs (safety measure)
            TwilioGlobalConfig::query()->update(['is_active' => false]);
            
            // Create or update config
            $config = TwilioGlobalConfig::updateOrCreate(
                ['account_sid' => $validated['account_sid']],
                [
                    'auth_token' => $validated['auth_token'],
                    'api_key_sid' => $validated['api_key_sid'],
                    'api_key_secret' => $validated['api_key_secret'],
                    'twiml_app_sid' => $validated['twiml_app_sid'],
                    'webhook_url' => rtrim($validated['webhook_url'], '/'),
                    'is_active' => true,
                    'verified_at' => now(),
                ]
            );
            
            // SECURITY: Do NOT automatically configure phone numbers when saving Twilio credentials
            // Phone numbers should be configured individually from the Phone Number Inventory
            // when the user explicitly clicks a "Configure" button for each number.
            
            return back()->with('success', 'Twilio configuration saved successfully! You can now configure individual phone numbers from the Phone Number Inventory.');
        } catch (\Exception $e) {
            Log::error('Twilio configuration failed: ' . $e->getMessage());
            return back()->with('error', 'Failed to configure Twilio: ' . $e->getMessage());
        }
    }
    
    /**
     * Configure specific phone numbers
     */
    public function configurePhones(Request $request)
    {
        // Only admin can configure Twilio
        if (!$request->user()->isAdmin()) {
            abort(403, 'Unauthorized action.');
        }

        $request->validate([
            'phone_numbers' => 'required|array|min:1',
            'phone_numbers.*' => 'required|string',
        ]);
        
        $config = TwilioGlobalConfig::active();
        
        if (!$config) {
            return back()->with('error', 'No active Twilio configuration found. Please run: php artisan twilio:configure');
        }
        
        try {
            $client = new Client(
                $config->account_sid,
                $config->getDecryptedAuthToken()
            );
            
            $configured = 0;
            $errors = [];
            
            foreach ($request->phone_numbers as $phoneNumber) {
                try {
                    // Find the phone number by phone number string
                    $numbers = $client->incomingPhoneNumbers->read(['phoneNumber' => $phoneNumber]);
                    
                    if (empty($numbers)) {
                        $errors[] = "Phone number {$phoneNumber} not found";
                        continue;
                    }
                    
                    $numberSid = $numbers[0]->sid;
                    
                    // Update to use TwiML Application (this is the recommended approach)
                    $client->incomingPhoneNumbers($numberSid)
                        ->update([
                            'voiceApplicationSid' => $config->twiml_app_sid,
                        ]);
                    
                    $configured++;
                    
                    Log::info('Phone number configured manually', [
                        'phone' => $phoneNumber,
                        'sid' => $numberSid,
                        'twiml_app' => $config->twiml_app_sid,
                    ]);
                } catch (\Exception $e) {
                    $errors[] = "Failed to configure {$phoneNumber}: " . $e->getMessage();
                }
            }
            
            if ($configured > 0) {
                $message = "Successfully configured {$configured} phone number(s)";
                if (!empty($errors)) {
                    $message .= '. Some errors occurred: ' . implode(', ', $errors);
                }
                return back()->with('success', $message);
            } else {
                return back()->with('error', 'Failed to configure phone numbers: ' . implode(', ', $errors));
            }
        } catch (\Exception $e) {
            return back()->with('error', 'Failed to configure phone numbers: ' . $e->getMessage());
        }
    }
    
    /**
     * Test call functionality
     */
    public function testCall(Request $request)
    {
        // Only admin can test calls
        if (!$request->user()->isAdmin()) {
            abort(403, 'Unauthorized action.');
        }

        $request->validate([
            'phone_number' => 'required|string',
            'from_number' => 'required|string',
        ]);

        $config = TwilioGlobalConfig::active();
        
        if (!$config) {
            return back()->with('error', 'No active Twilio configuration found');
        }

        try {
            $client = new Client(
                $config->account_sid,
                $config->getDecryptedAuthToken()
            );

            // Create a simple test call
            $call = $client->calls->create(
                $request->phone_number, // To
                $request->from_number,  // From
                [
                    'url' => route('twiml.test-call'),
                    'statusCallback' => $config->webhook_url . '/webhooks/twilio/call/status/test',
                ]
            );

            Log::info('Test call initiated', [
                'call_sid' => $call->sid,
                'to' => $request->phone_number,
                'from' => $request->from_number,
                'status' => $call->status,
            ]);

            return back()->with('success', "Test call initiated! Call SID: {$call->sid}. Check your phone.");
        } catch (\Exception $e) {
            Log::error('Test call failed: ' . $e->getMessage());
            return back()->with('error', 'Failed to initiate test call: ' . $e->getMessage());
        }
    }

    /**
     * Test webhook connectivity
     */
    public function testWebhook(Request $request)
    {
        // Only admin can test webhooks
        if (!$request->user()->isAdmin()) {
            abort(403, 'Unauthorized action.');
        }

        $config = TwilioGlobalConfig::active();
        
        if (!$config) {
            return back()->with('error', 'No active Twilio configuration found');
        }
        
        $webhookUrl = $config->webhook_url . '/twiml/manual-call?call_id=test';
        
        try {
            $ch = curl_init($webhookUrl);
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
            curl_setopt($ch, CURLOPT_TIMEOUT, 5);
            curl_setopt($ch, CURLOPT_HTTPHEADER, ['Bypass-Tunnel-Reminder: true']);
            curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
            $response = curl_exec($ch);
            $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
            curl_close($ch);
            
            if ($httpCode == 200) {
                return back()->with('success', "Webhook is accessible (HTTP {$httpCode})");
            } else {
                return back()->with('error', "Webhook returned HTTP {$httpCode}. Make sure your webhook URL is publicly accessible.");
            }
        } catch (\Exception $e) {
            return back()->with('error', 'Failed to test webhook: ' . $e->getMessage());
        }
    }

    /**
     * Run a full connectivity health check and return per-item status
     */
    public function healthCheck(Request $request)
    {
        if (!$request->user()->isAdmin()) {
            abort(403);
        }

        $checks = [];

        // ── 1. Config exists ──────────────────────────────────────────────
        $config = TwilioGlobalConfig::active();
        $checks['credentials_saved'] = [
            'label'   => 'Credentials saved',
            'detail'  => 'Account SID and Auth Token stored in the database',
            'status'  => $config ? 'ok' : 'fail',
            'message' => $config ? 'Account SID: ' . substr($config->account_sid, 0, 6) . '••••' : 'No Twilio credentials configured yet',
            'action'  => $config ? null : 'Enter your Account SID and Auth Token in the form below',
        ];

        if (!$config) {
            return response()->json(['checks' => $checks]);
        }

        // ── 2. Credentials valid (live API call) ──────────────────────────
        $client = null;
        try {
            $client = new Client($config->account_sid, $config->getDecryptedAuthToken());
            $account = $client->api->v2010->accounts($config->account_sid)->fetch();
            $isTrial = str_contains(strtolower($account->type ?? ''), 'trial');
            $checks['credentials_valid'] = [
                'label'   => 'Credentials valid',
                'detail'  => 'Auth Token authenticates successfully with Twilio API',
                'status'  => 'ok',
                'message' => 'Connected · Account type: ' . ucfirst($account->type ?? 'full') . ($isTrial ? ' ⚠ Trial' : ''),
                'action'  => null,
            ];
            $checks['trial_warning'] = [
                'label'   => 'Account type',
                'detail'  => 'Trial accounts can only call verified numbers',
                'status'  => $isTrial ? 'warn' : 'ok',
                'message' => $isTrial
                    ? 'Trial account — you can only call numbers verified in the Twilio Console'
                    : 'Full account — no restrictions on outbound numbers',
                'action'  => $isTrial ? 'Go to Twilio Console → Phone Numbers → Verified Caller IDs and add your mobile number' : null,
            ];
        } catch (\Twilio\Exceptions\AuthenticationException $e) {
            $checks['credentials_valid'] = [
                'label'   => 'Credentials valid',
                'detail'  => 'Auth Token authenticates successfully with Twilio API',
                'status'  => 'fail',
                'message' => 'Authentication failed — Account SID / Auth Token mismatch',
                'action'  => 'Copy both values fresh from console.twilio.com → Dashboard',
            ];
            return response()->json(['checks' => $checks]);
        } catch (\Exception $e) {
            $checks['credentials_valid'] = [
                'label'   => 'Credentials valid',
                'detail'  => 'Auth Token authenticates successfully with Twilio API',
                'status'  => 'fail',
                'message' => 'Connection error: ' . $e->getMessage(),
                'action'  => 'Check your internet connection and Twilio account status',
            ];
            return response()->json(['checks' => $checks]);
        }

        // ── 3. API Key exists ─────────────────────────────────────────────
        $apiKeyOk = false;
        if ($config->api_key_sid) {
            try {
                $client->keys($config->api_key_sid)->fetch();
                $apiKeyOk = true;
            } catch (\Exception $e) {
                $apiKeyOk = false;
            }
        }
        $checks['api_key'] = [
            'label'   => 'API Key (browser softphone)',
            'detail'  => 'Needed to generate JWT tokens for the in-browser calling widget',
            'status'  => $apiKeyOk ? 'ok' : 'fail',
            'message' => $apiKeyOk
                ? 'API Key ' . substr($config->api_key_sid, 0, 8) . '•• is active'
                : ($config->api_key_sid ? 'API Key not found in Twilio (may have been deleted)' : 'No API Key created yet'),
            'action'  => $apiKeyOk ? null : 'Click "Sync Configuration" — it will auto-create a new API Key',
        ];

        // ── 4. TwiML App exists & URLs correct ────────────────────────────
        $twimlOk = false;
        $twimlDetail = '';
        if ($config->twiml_app_sid) {
            try {
                $app = $client->applications($config->twiml_app_sid)->fetch();
                $expectedUrl = rtrim($config->webhook_url, '/') . '/twiml/manual-call';
                $twimlOk = true;
                $twimlDetail = 'Voice URL: ' . ($app->voiceUrl ?? 'not set');
                $urlMatch = $app->voiceUrl === $expectedUrl;
                if (!$urlMatch) {
                    $checks['twiml_app'] = [
                        'label'   => 'TwiML App',
                        'detail'  => 'Routes calls to your webhook URL',
                        'status'  => 'warn',
                        'message' => 'TwiML App exists but Voice URL is stale: ' . $app->voiceUrl,
                        'action'  => 'Click "Sync Configuration" to update the URL to: ' . $expectedUrl,
                    ];
                } else {
                    $checks['twiml_app'] = [
                        'label'   => 'TwiML App',
                        'detail'  => 'Routes calls to your webhook URL',
                        'status'  => 'ok',
                        'message' => 'App SID ' . substr($config->twiml_app_sid, 0, 8) . '•• · Voice URL correct',
                        'action'  => null,
                    ];
                }
            } catch (\Exception $e) {
                $checks['twiml_app'] = [
                    'label'   => 'TwiML App',
                    'detail'  => 'Routes calls to your webhook URL',
                    'status'  => 'fail',
                    'message' => 'TwiML App SID not found in Twilio (deleted externally?)',
                    'action'  => 'Click "Sync Configuration" to create a fresh TwiML App',
                ];
            }
        } else {
            $checks['twiml_app'] = [
                'label'   => 'TwiML App',
                'detail'  => 'Routes calls to your webhook URL',
                'status'  => 'fail',
                'message' => 'No TwiML App configured',
                'action'  => 'Click "Sync Configuration" to auto-create one',
            ];
        }

        // ── 5. Webhook URL reachable ──────────────────────────────────────
        $webhookUrl = rtrim($config->webhook_url ?? '', '/') . '/twiml/manual-call';
        $webhookOk  = false;
        $webhookMsg = '';
        try {
            $ch = curl_init($webhookUrl);
            curl_setopt_array($ch, [
                CURLOPT_RETURNTRANSFER => true,
                CURLOPT_TIMEOUT        => 6,
                CURLOPT_HTTPHEADER     => ['Bypass-Tunnel-Reminder: true'],
                CURLOPT_SSL_VERIFYPEER => false,
                CURLOPT_FOLLOWLOCATION => true,
            ]);
            curl_exec($ch);
            $code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
            curl_close($ch);
            $webhookOk  = in_array($code, [200, 405, 422]); // 405/422 = reached but wrong method — still reachable
            $webhookMsg = $webhookOk ? 'Reachable (HTTP ' . $code . ')' : 'Returned HTTP ' . $code . ' — Twilio cannot reach your server';
        } catch (\Exception $e) {
            $webhookMsg = 'Could not connect: ' . $e->getMessage();
        }
        $checks['webhook_reachable'] = [
            'label'   => 'Webhook URL reachable',
            'detail'  => 'Twilio must be able to POST to your server during calls',
            'status'  => $webhookOk ? 'ok' : 'fail',
            'message' => $webhookUrl . ' → ' . $webhookMsg,
            'action'  => $webhookOk ? null : 'Start a tunnel (ngrok/localtunnel) and update APP_URL + TWILIO_WEBHOOK_URL in .env, then Sync',
        ];

        // ── 6. Phone numbers in Twilio account ───────────────────────────
        try {
            $numbers = $client->incomingPhoneNumbers->read([], 20);
            $count   = count($numbers);
            $linked  = 0;
            $numList = [];
            foreach ($numbers as $n) {
                $isLinked  = $n->voiceApplicationSid === $config->twiml_app_sid;
                $linked   += $isLinked ? 1 : 0;
                $numList[] = $n->phoneNumber . ($isLinked ? ' ✓' : ' ✗ not linked');
            }
            $checks['phone_numbers'] = [
                'label'   => 'Phone numbers',
                'detail'  => 'Twilio numbers assigned to your account',
                'status'  => $count > 0 ? ($linked === $count ? 'ok' : 'warn') : 'fail',
                'message' => $count > 0
                    ? $count . ' number(s) found · ' . $linked . ' linked to TwiML App: ' . implode(', ', $numList)
                    : 'No phone numbers in your Twilio account',
                'action'  => $count === 0
                    ? 'Go to Twilio Console → Phone Numbers → Buy a Number'
                    : ($linked < $count ? 'Click "Sync Configuration" to link all numbers to the TwiML App' : null),
            ];
        } catch (\Exception $e) {
            $checks['phone_numbers'] = [
                'label'   => 'Phone numbers',
                'detail'  => 'Twilio numbers assigned to your account',
                'status'  => 'warn',
                'message' => 'Could not fetch phone numbers: ' . $e->getMessage(),
                'action'  => null,
            ];
        }

        // ── 7. India geo permission ───────────────────────────────────────
        try {
            $inGeo = $client->voice->v1->dialingPermissions->countries('IN')->fetch();
            $indiaOk = $inGeo->lowRiskNumbersEnabled || $inGeo->highRiskSpecialNumbersEnabled;
            $checks['india_geo'] = [
                'label'   => 'India calling enabled',
                'detail'  => 'Geo permission for IN (India) numbers',
                'status'  => $indiaOk ? 'ok' : 'warn',
                'message' => $indiaOk ? 'India (IN) is enabled for outbound calls' : 'India is not enabled — calls to +91 numbers will fail',
                'action'  => $indiaOk ? null : 'Go to Geo Permissions below and enable India, or click "Enable All"',
            ];
        } catch (\Exception $e) {
            $checks['india_geo'] = [
                'label'   => 'India calling enabled',
                'detail'  => 'Geo permission for IN (India) numbers',
                'status'  => 'warn',
                'message' => 'Could not check India geo permission',
                'action'  => null,
            ];
        }

        return response()->json(['checks' => $checks]);
    }

    /**
     * Remove Twilio configuration
     */
    public function remove(Request $request)
    {
        // Only admin can remove Twilio configuration
        if (!$request->user()->isAdmin()) {
            abort(403, 'Unauthorized action.');
        }

        try {
            $config = TwilioGlobalConfig::active();
            
            if (!$config) {
                return back()->with('error', 'No active Twilio configuration found');
            }

            // Delete the configuration
            $config->delete();

            return back()->with('success', 'Twilio configuration removed successfully');
        } catch (\Exception $e) {
            Log::error('Failed to remove Twilio configuration: ' . $e->getMessage());
            return back()->with('error', 'Failed to remove Twilio configuration: ' . $e->getMessage());
        }
    }
    
    /**
     * Sync/Update TwiML App and phone numbers with current configuration
     * This ensures all URLs are up-to-date without manual Twilio Console changes
     */
    public function sync(Request $request)
    {
        // Only admin can sync Twilio configuration
        if (!$request->user()->isAdmin()) {
            abort(403, 'Unauthorized action.');
        }

        $config = TwilioGlobalConfig::active();
        
        if (!$config) {
            return back()->with('error', 'No active Twilio configuration found');
        }

        try {
            $client = new Client(
                $config->account_sid,
                $config->getDecryptedAuthToken()
            );
            
            // Prepare updated URLs
            $voiceUrl = rtrim($config->webhook_url, '/') . '/twiml/manual-call';
            $statusCallback = rtrim($config->webhook_url, '/') . '/webhooks/twilio/call-status';
            $voiceFallbackUrl = rtrim($config->webhook_url, '/') . '/twiml/inbound-call';
            
            // Update TwiML App
            if ($config->twiml_app_sid) {
                try {
                    $client->applications($config->twiml_app_sid)
                        ->update([
                            'voiceUrl' => $voiceUrl,
                            'voiceMethod' => 'POST',
                            'voiceFallbackUrl' => $voiceFallbackUrl,
                            'voiceFallbackMethod' => 'POST',
                            'statusCallback' => $statusCallback,
                            'statusCallbackMethod' => 'POST',
                        ]);
                    
                    Log::info('TwiML App synced successfully', [
                        'app_sid' => $config->twiml_app_sid,
                        'voice_url' => $voiceUrl,
                    ]);
                } catch (\Exception $e) {
                    Log::error('Failed to update TwiML App', [
                        'app_sid' => $config->twiml_app_sid,
                        'error' => $e->getMessage(),
                    ]);
                    return back()->with('error', 'Failed to update TwiML App: ' . $e->getMessage());
                }
            }
            
            // Update all phone numbers
            $phoneNumbersUpdated = 0;
            $phoneNumberErrors = [];
            
            try {
                $numbers = $client->incomingPhoneNumbers->read();
                
                foreach ($numbers as $number) {
                    try {
                        $client->incomingPhoneNumbers($number->sid)
                            ->update([
                                'voiceApplicationSid' => $config->twiml_app_sid,
                            ]);
                        
                        $phoneNumbersUpdated++;
                        
                        Log::info('Phone number synced', [
                            'phone' => $number->phoneNumber,
                            'sid' => $number->sid,
                        ]);
                    } catch (\Exception $e) {
                        $phoneNumberErrors[] = $number->phoneNumber;
                        Log::error('Failed to sync phone number', [
                            'phone' => $number->phoneNumber,
                            'error' => $e->getMessage(),
                        ]);
                    }
                }
            } catch (\Exception $e) {
                Log::error('Failed to fetch phone numbers for sync', [
                    'error' => $e->getMessage(),
                ]);
            }
            
            // Update the verified timestamp
            $config->update(['verified_at' => now()]);
            
            // Build success message
            $message = 'Configuration synced successfully!';
            if ($config->twiml_app_sid) {
                $message .= ' TwiML App updated.';
            }
            if ($phoneNumbersUpdated > 0) {
                $message .= " {$phoneNumbersUpdated} phone number(s) updated.";
            }
            if (!empty($phoneNumberErrors)) {
                $message .= ' Some phone numbers could not be updated: ' . implode(', ', $phoneNumberErrors);
            }
            
            return back()->with('success', $message);
        } catch (\Exception $e) {
            Log::error('Configuration sync failed: ' . $e->getMessage());
            return back()->with('error', 'Failed to sync configuration: ' . $e->getMessage());
        }
    }
    
    /**
     * Get current geo permissions with all available countries
     */
    public function getGeoPermissions(Request $request)
    {
        if (!$request->user()->isAdmin()) {
            abort(403, 'Unauthorized action.');
        }

        // Try to get active config first, then fall back to any config
        $config = TwilioGlobalConfig::active() ?? TwilioGlobalConfig::first();
        
        if (!$config) {
            return response()->json(['error' => 'Please configure Twilio credentials first'], 404);
        }

        try {
            $client = new Client(
                $config->account_sid,
                $config->getDecryptedAuthToken()
            );
            
            // Get list of all available countries with their permissions
            $availableCountries = $client->voice->v1->dialingPermissions
                ->countries->read();
            
            $countries = [];
            foreach ($availableCountries as $country) {
                $countries[] = [
                    'iso_code' => $country->isoCode,
                    'name' => $country->name,
                    'continent' => $country->continent ?? 'Unknown',
                    'enabled' => $country->lowRiskNumbersEnabled || $country->highRiskSpecialNumbersEnabled || $country->highRiskTollfraudNumbersEnabled,
                ];
            }
            
            // Sort by name
            usort($countries, function($a, $b) {
                return strcmp($a['name'], $b['name']);
            });
            
            return response()->json([
                'countries' => $countries,
            ]);
        } catch (\Exception $e) {
            Log::error('Failed to fetch geo permissions: ' . $e->getMessage());
            return response()->json(['error' => 'Failed to fetch geo permissions: ' . $e->getMessage()], 500);
        }
    }
    
    /**
     * Update geo permissions by enabling/disabling specific countries
     */
    public function updateGeoPermissions(Request $request)
    {
        if (!$request->user()->isAdmin()) {
            abort(403, 'Unauthorized action.');
        }

        $validated = $request->validate([
            'enabled_countries' => 'required|array',
            'enabled_countries.*' => 'required|string|size:2', // ISO country codes
        ]);

        // Try to get active config first, then fall back to any config
        $config = TwilioGlobalConfig::active() ?? TwilioGlobalConfig::first();
        
        if (!$config) {
            return response()->json(['error' => 'Please configure Twilio credentials first'], 404);
        }

        try {
            $client = new Client(
                $config->account_sid,
                $config->getDecryptedAuthToken()
            );
            
            // First, get all available countries to disable them all
            $allCountries = $client->voice->v1->dialingPermissions
                ->countries->read();
            
            $allIsoCodes = array_map(function($country) {
                return $country->isoCode;
            }, iterator_to_array($allCountries));
            
            // Disable all countries first
            if (!empty($allIsoCodes)) {
                $client->voice->v1->dialingPermissions
                    ->bulkCountryUpdates->create([
                        'updateRequest' => implode(',', array_map(function($iso) {
                            return $iso . ':low_risk_numbers_enabled=false,high_risk_special_numbers_enabled=false,high_risk_tollfraud_numbers_enabled=false';
                        }, $allIsoCodes))
                    ]);
            }
            
            // If countries selected, enable them
            if (!empty($validated['enabled_countries'])) {
                $client->voice->v1->dialingPermissions
                    ->bulkCountryUpdates->create([
                        'updateRequest' => implode(',', array_map(function($iso) {
                            return $iso . ':low_risk_numbers_enabled=true,high_risk_special_numbers_enabled=true,high_risk_tollfraud_numbers_enabled=true';
                        }, $validated['enabled_countries']))
                    ]);
                
                Log::info('Geo permissions updated', [
                    'countries' => $validated['enabled_countries'],
                ]);
                
                session()->flash('success', count($validated['enabled_countries']) . ' countries enabled successfully');
                
                return response()->json([
                    'success' => true,
                    'message' => count($validated['enabled_countries']) . ' countries enabled',
                ]);
            } else {
                Log::info('All geo permissions disabled');
                
                session()->flash('success', 'All countries disabled successfully');
                
                return response()->json([
                    'success' => true,
                    'message' => 'All countries disabled',
                ]);
            }
        } catch (\Exception $e) {
            Log::error('Failed to update geo permissions: ' . $e->getMessage());
            return response()->json(['error' => 'Failed to update geo permissions: ' . $e->getMessage()], 500);
        }
    }
    
    /**
     * Enable all countries (remove geo restrictions)
     */
    public function enableAllCountries(Request $request)
    {
        if (!$request->user()->isAdmin()) {
            abort(403, 'Unauthorized action.');
        }

        // Try to get active config first, then fall back to any config
        $config = TwilioGlobalConfig::active() ?? TwilioGlobalConfig::first();
        
        if (!$config) {
            return response()->json(['error' => 'Please configure Twilio credentials first'], 404);
        }

        try {
            $client = new Client(
                $config->account_sid,
                $config->getDecryptedAuthToken()
            );
            
            // Get all available countries
            $allCountries = $client->voice->v1->dialingPermissions
                ->countries->read();
            
            $allIsoCodes = array_map(function($country) {
                return $country->isoCode;
            }, iterator_to_array($allCountries));
            
            // Enable all countries
            if (!empty($allIsoCodes)) {
                $client->voice->v1->dialingPermissions
                    ->bulkCountryUpdates->create([
                        'updateRequest' => implode(',', array_map(function($iso) {
                            return $iso . ':low_risk_numbers_enabled=true,high_risk_special_numbers_enabled=true,high_risk_tollfraud_numbers_enabled=true';
                        }, $allIsoCodes))
                    ]);
            }
            
            Log::info('All geo permissions enabled');
            
            session()->flash('success', 'All countries enabled successfully');
            
            return response()->json([
                'success' => true,
                'message' => 'All countries enabled',
            ]);
        } catch (\Exception $e) {
            Log::error('Failed to enable all countries: ' . $e->getMessage());
            return response()->json(['error' => 'Failed to enable all countries: ' . $e->getMessage()], 500);
        }
    }
}


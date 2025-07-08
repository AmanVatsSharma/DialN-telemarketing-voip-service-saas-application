<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Models\Call;
use App\Models\PhoneNumber;
use App\Models\TwilioGlobalConfig;
use App\Services\TwiMLService;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Log;
use Twilio\Security\RequestValidator;

class TwimlController extends Controller
{
    public function __construct(
        private TwiMLService $twimlService
    ) {}

    /**
     * Validate Twilio webhook signature for security
     */
    private function validateTwilioRequest(Request $request): bool
    {
        // Skip validation in local development
        if (app()->environment('local') && config('app.debug')) {
            return true;
        }

        // Get auth token from database
        $globalConfig = TwilioGlobalConfig::active();
        
        if (!$globalConfig) {
            Log::warning('No active Twilio configuration found for request validation');
            return false;
        }

        $validator = new RequestValidator($globalConfig->getDecryptedAuthToken());
        
        $signature = $request->header('X-Twilio-Signature', '');
        $url = $request->fullUrl();
        $params = $request->all();
        
        return $validator->validate($signature, $url, $params);
    }

    /**
     * Generate TwiML for Softphone (handles both inbound and outbound)
     */
    public function manualCall(Request $request): Response
    {
        // Get call_id from multiple possible sources
        $callId = $request->input('call_id') ?? $request->query('call_id');
        $toNumber = $request->input('To');
        $fromNumber = $request->input('From');
        $twilioCallSid = $request->input('CallSid');
        $direction = $request->input('Direction'); // 'inbound' or 'outbound-api'
        
        // Log essential parameters only (prevent response bloat)
        Log::info('TwiML Request', [
            'call_id' => $callId,
            'direction' => $direction,
            'to' => $toNumber,
            'from' => $fromNumber,
        ]);
        
        // Detect call type with priority:
        // 1. If From starts with "client:" → ALWAYS treat as outbound from browser (even if Direction='inbound')
        // 2. If has call_id parameter → Outbound call from browser
        // 3. If Direction='inbound' AND From is real phone number → Inbound from external phone
        
        $isFromClient = str_starts_with($fromNumber ?? '', 'client:');
        
        // CRITICAL: If call is from a Twilio Client, it's NEVER an inbound call
        // Even if Twilio sends Direction='inbound', it's an outbound call from the browser
        if ($isFromClient) {
            // This is an outbound call from browser - must have call_id
            if (!$callId) {
                Log::warning('TwiML: Outbound call from client missing call_id', [
                    'from' => $fromNumber,
                    'to' => $toNumber,
                ]);
                $twiml = $this->twimlService->generateTts('Call ID missing for outbound call', ['language' => 'en-US']);
                return $this->respondWithTwiml($twiml);
            }
            // Continue with outbound call handling below
        } else {
            // Not from client - check if it's a real inbound call from external phone
            $isInboundCall = $direction === 'inbound' && !$callId;
            
            if ($isInboundCall) {
                Log::info('Inbound call detected - routing to inboundCall handler', [
                    'from' => $fromNumber,
                    'to' => $toNumber,
                    'call_sid' => $twilioCallSid,
                ]);
                
                // Route to dedicated inbound call handler
                return $this->inboundCall($request);
            }
        }
        
        // Handle outbound calls from browser (or API)
        if (!$callId) {
            Log::warning('TwiML: Call ID missing for outbound call', [
                'from' => $fromNumber,
                'to' => $toNumber,
                'is_from_client' => $isFromClient,
            ]);
            $twiml = $this->twimlService->generateTts('Call ID missing', ['language' => 'en-US']);
            return $this->respondWithTwiml($twiml);
        }

        $call = Call::find($callId);

        if (!$call) {
            Log::warning('TwiML: Call not found', ['call_id' => $callId]);
            $twiml = $this->twimlService->generateTts('Call not found', ['language' => 'en-US']);
            return $this->respondWithTwiml($twiml);
        }
        
        // Log the call record details
        Log::info('TwiML: Call found', [
            'call_id' => $call->id,
            'to_number' => $call->to_number,
            'from_number' => $call->from_number,
            'direction' => $call->direction,
        ]);

        // Update call record with Twilio Call SID (if not already set)
        if ($twilioCallSid && !$call->twilio_call_sid) {
            $call->update([
                'twilio_call_sid' => $twilioCallSid,
                'status' => 'ringing',
            ]);
            Log::info('TwiML: Updated call with Twilio SID', [
                'call_id' => $call->id,
                'twilio_call_sid' => $twilioCallSid,
            ]);
        }

        // Use the number from the call record if not provided in request
        // Priority: Request To parameter -> Call record to_number
        $toNumber = $toNumber ?? $call->to_number;
        
        // Validate we have a destination number
        if (empty($toNumber)) {
            Log::error('TwiML: No destination number', [
                'call_id' => $call->id,
                'request_to' => $request->input('To'),
                'call_to_number' => $call->to_number,
            ]);
            $twiml = $this->twimlService->generateTts('Destination number is missing', ['language' => 'en-US']);
            return $this->respondWithTwiml($twiml);
        }
        
        // Ensure phone number is in E.164 format (starts with +)
        if (!str_starts_with($toNumber, '+')) {
            // Assume US number if no country code
            $toNumber = '+1' . preg_replace('/[^0-9]/', '', $toNumber);
        }
        
        Log::info('TwiML: Dial', [
            'call_id' => $call->id, 
            'to' => $toNumber,
            'from' => $call->from_number
        ]);
        
        // Prepare status callback URL
        $statusCallbackUrl = route('webhooks.twilio.call.status', ['call_id' => $call->id]);
        
        // Prepare recording callback if enabled
        $recordingCallbackUrl = $call->enable_recording 
            ? route('webhooks.twilio.call.recording', ['call_id' => $call->id])
            : null;
        
        // Prepare transcription callback if enabled
        $transcriptionCallbackUrl = $call->enable_recording 
            ? route('webhooks.twilio.call.transcription', ['call_id' => $call->id])
            : null;
        
        // Build record attribute for Dial
        $recordAttribute = $call->enable_recording ? ' record="record-from-answer"' : '';
        
        // Build recordingStatusCallback attribute if needed
        $recordingCallbackAttr = $recordingCallbackUrl 
            ? ' recordingStatusCallback="' . $recordingCallbackUrl . '" recordingStatusCallbackMethod="POST"'
            : '';
        
        // Build transcribe attribute if enabled (enables automatic transcription)
        $transcribeAttr = $call->enable_recording && $transcriptionCallbackUrl
            ? ' recordingStatusCallbackEvent="completed" transcribe="true" transcribeCallback="' . $transcriptionCallbackUrl . '"'
            : '';
        
        // For browser-to-phone calls using Twilio Client/Device SDK
        // Simply dial the destination number - the browser is already connected
        $twiml = <<<XML
<?xml version="1.0" encoding="UTF-8"?>
<Response>
    <Dial callerId="{$call->from_number}" timeout="30" action="{$statusCallbackUrl}"{$recordAttribute}{$recordingCallbackAttr}{$transcribeAttr}>
        <Number statusCallbackEvent="initiated ringing answered completed" statusCallback="{$statusCallbackUrl}">{$toNumber}</Number>
    </Dial>
    <Say voice="alice">Call ended. Goodbye!</Say>
</Response>
XML;

        return $this->respondWithTwiml($twiml);
    }

    /**
     * Generate TwiML for campaign call (TTS)
     */
    public function campaignCallTts(Request $request): Response
    {
        $callId = $request->query('call_id');
        
        if (!$callId) {
            $twiml = $this->twimlService->generateTts('Call ID missing', ['language' => 'en-US']);
            return $this->respondWithTwiml($twiml);
        }

        $call = Call::with('campaign')->find($callId);

        if (!$call || !$call->campaign) {
            $twiml = $this->twimlService->generateTts('Campaign not found', ['language' => 'en-US']);
            return $this->respondWithTwiml($twiml);
        }

        $campaign = $call->campaign;

        // Get status callback URL
        $statusCallback = route('webhooks.twilio.call.status', ['call_id' => $call->id]);
        
        // Get recording callback if enabled
        $recordingCallback = null;
        if ($campaign->enable_recording) {
            $recordingCallback = route('webhooks.twilio.call.recording', ['call_id' => $call->id]);
        }

        // Replace variables in message
        // Use variant message if assigned, otherwise use campaign default
        if ($call->message_variant_id && $call->messageVariant) {
            $message = $call->messageVariant->message_text;
            Log::info('Using message variant', [
                'call_id' => $call->id,
                'variant_id' => $call->message_variant_id,
                'variant_label' => $call->messageVariant->variant_label,
            ]);
        } else {
            $message = $campaign->message;
        }
        
        // First, replace campaign-level variables (same for all contacts)
        $campaignVariables = $campaign->campaign_variables ?? [];
        if (is_string($campaignVariables)) {
            $campaignVariables = json_decode($campaignVariables, true) ?? [];
        }
        
        foreach ($campaignVariables as $key => $value) {
            $message = str_replace("{{{$key}}}", (string) $value, $message);
        }
        
        // Then, replace contact-level variables (different per contact)
        if ($call->campaignContact) {
            $contact = $call->campaignContact;
            
            // Replace contact fields (first_name, last_name, etc.)
            $contactFields = [
                'first_name' => $contact->first_name ?? '',
                'last_name' => $contact->last_name ?? '',
                'phone_number' => $contact->phone_number ?? '',
                'email' => $contact->email ?? '',
                'company' => $contact->company ?? '',
            ];
            
            foreach ($contactFields as $key => $value) {
                $message = str_replace("{{{$key}}}", (string) $value, $message);
            }
            
            // Replace custom variables from the variables JSON field
            $customVariables = $contact->variables ?? [];
            if (is_string($customVariables)) {
                $customVariables = json_decode($customVariables, true) ?? [];
            }
            foreach ($customVariables as $key => $value) {
                $message = str_replace("{{{$key}}}", (string) $value, $message);
            }
        }

        // Get DTMF callback if enabled
        $dtmfCallback = null;
        if ($campaign->enable_dtmf) {
            $dtmfCallback = route('webhooks.twilio.call.dtmf', ['call_id' => $call->id]);
        }

        // Generate TwiML with TTS
        $twiml = $this->twimlService->generateTts(
            $message,
            [
                'voice' => $campaign->voice,
                'language' => $campaign->language,
                'enable_dtmf' => $campaign->enable_dtmf,
                'dtmf_callback' => $dtmfCallback,
                'enable_recording' => $campaign->enable_recording,
                'recording_callback' => $recordingCallback,
            ]
        );

        return $this->respondWithTwiml($twiml);
    }

    /**
     * Generate TwiML for campaign call (Voice playback)
     */
    public function campaignCallVoice(Request $request): Response
    {
        $callId = $request->query('call_id');
        
        if (!$callId) {
            $twiml = $this->twimlService->generateTts('Call ID missing', ['language' => 'en-US']);
            return $this->respondWithTwiml($twiml);
        }

        $call = Call::with('campaign.audioFile')->find($callId);

        if (!$call || !$call->campaign || !$call->campaign->audioFile) {
            $twiml = $this->twimlService->generateTts('Audio file not found', ['language' => 'en-US']);
            return $this->respondWithTwiml($twiml);
        }

        $campaign = $call->campaign;
        
        // Get audio URL and make it absolute for Twilio
        $audioUrl = $call->campaign->audioFile->url;
        if (!str_starts_with($audioUrl, 'http')) {
            $audioUrl = url($audioUrl);
        }

        // Get status callback URL
        $statusCallback = route('webhooks.twilio.call.status', ['call_id' => $call->id]);
        
        // Get recording callback if enabled
        $recordingCallback = null;
        if ($campaign->enable_recording) {
            $recordingCallback = route('webhooks.twilio.call.recording', ['call_id' => $call->id]);
        }

        // Get DTMF callback if enabled
        $dtmfCallback = null;
        if ($campaign->enable_dtmf) {
            $dtmfCallback = route('webhooks.twilio.call.dtmf', ['call_id' => $call->id]);
        }

        // Generate TwiML with voice playback
        $twiml = $this->twimlService->generateVoicePlayback(
            $audioUrl,
            [
                'enable_dtmf' => $campaign->enable_dtmf,
                'dtmf_callback' => $dtmfCallback,
                'enable_recording' => $campaign->enable_recording,
                'recording_callback' => $recordingCallback,
            ]
        );

        return $this->respondWithTwiml($twiml);
    }

    /**
     * Handle inbound calls to Twilio number
     */
    public function inboundCall(Request $request): Response
    {
        $fromNumber = $request->input('From');
        $toNumber = $request->input('To');
        $callSid = $request->input('CallSid');
        
        Log::info('Inbound Call Handler', [
            'from' => $fromNumber,
            'to' => $toNumber,
            'call_sid' => $callSid,
        ]);

        // IMPORTANT: If this is from a Twilio Client (browser), redirect to manual-call handler
        // This can happen if TwiML App is still configured with old URLs
        if (str_starts_with($fromNumber ?? '', 'client:')) {
            Log::warning('Inbound handler received client call - this should use manual-call endpoint', [
                'from' => $fromNumber,
                'to' => $toNumber,
            ]);
            
            // Return error TwiML to prevent duplicate call creation
            $twiml = <<<XML
<?xml version="1.0" encoding="UTF-8"?>
<Response>
    <Say voice="alice">Configuration error. Please update your TwiML App to use the manual-call endpoint.</Say>
    <Hangup/>
</Response>
XML;
            return $this->respondWithTwiml($twiml);
        }

        // Find which user owns this phone number
        $phoneNumber = PhoneNumber::where('number', $toNumber)
            ->where('status', 'active')
            ->first();

        // Determine target user (owner of phone number, or default to first user)
        $userId = $phoneNumber && $phoneNumber->user_id 
            ? $phoneNumber->user_id 
            : 1;

        // Generate client identity (must match token identity: user_{id})
        $clientIdentity = 'user_' . $userId;

        // Check if call already exists to prevent duplicates
        $existingCall = Call::where('twilio_call_sid', $callSid)->first();
        
        if ($existingCall) {
            Log::info('Call already exists, using existing record', [
                'call_id' => $existingCall->id,
                'call_sid' => $callSid,
            ]);
            $call = $existingCall;
        } else {
            // Create call record for inbound call
            $call = Call::create([
                'user_id' => $userId,
                'call_type' => 'manual',
                'direction' => 'inbound',
                'from_number' => $fromNumber,
                'to_number' => $toNumber,
                'twilio_call_sid' => $callSid,
                'status' => 'ringing',
                'started_at' => now(),
            ]);

            Log::info('Inbound call created', ['call_id' => $call->id, 'user' => $userId]);
        }

        // Prepare status callback URL
        $statusCallbackUrl = route('webhooks.twilio.call.status', ['call_id' => $call->id]);

        // Generate TwiML to connect inbound call to user's browser
        // This will ring the browser Device for the logged-in user
        $twiml = <<<XML
<?xml version="1.0" encoding="UTF-8"?>
<Response>
    <Say voice="alice">Connecting your call. Please wait.</Say>
    <Dial timeout="30" callerId="{$fromNumber}" action="{$statusCallbackUrl}">
        <Client statusCallbackEvent="initiated ringing answered completed" statusCallback="{$statusCallbackUrl}">{$clientIdentity}</Client>
    </Dial>
    <Say voice="alice">The person you are trying to reach is not available. Goodbye!</Say>
</Response>
XML;

        return $this->respondWithTwiml($twiml);
    }

    /**
     * Handle AI Agent calls with simple gather-based conversation
     */
    public function aiAgentCall(Request $request): Response
    {
        // Validate Twilio request signature
        if (!$this->validateTwilioRequest($request)) {
            Log::warning('Invalid Twilio signature for AI agent call', [
                'ip' => $request->ip(),
                'url' => $request->fullUrl(),
            ]);
            abort(403, 'Invalid request signature');
        }

        $fromNumber = $request->input('From');
        $toNumber = $request->input('To');
        $callSid = $request->input('CallSid');
        $speechResult = $request->input('SpeechResult');
        $direction = $request->input('Direction', 'inbound');

        Log::info('AI Agent Call Handler', [
            'from' => $fromNumber,
            'to' => $toNumber,
            'call_sid' => $callSid,
            'speech' => $speechResult,
            'direction' => $direction,
        ]);

        try {
            // Find AI agent by phone number
            // For outbound calls (outbound-api), use From number
            // For inbound calls, use To number
            $agentPhoneNumber = ($direction === 'outbound-api') ? $fromNumber : $toNumber;
            
            $phoneNumber = \App\Models\PhoneNumber::where('number', $agentPhoneNumber)
                ->orWhere('number', 'like', '%' . substr($agentPhoneNumber, -10))
                ->first();

            if (!$phoneNumber) {
                // Try direct lookup in ai_agents table
                $aiAgent = \App\Models\AiAgent::where('phone_number', $agentPhoneNumber)
                    ->where('active', true)
                    ->first();
                    
                if (!$aiAgent) {
                    Log::warning('No phone number found for AI agent call', [
                        'direction' => $direction,
                        'agent_phone' => $agentPhoneNumber
                    ]);
                    return $this->respondWithFallback('I\'m sorry, this number is not configured.');
                }
            } else {
                $aiAgent = \App\Models\AiAgent::where('phone_number', $phoneNumber->number)
                    ->where('active', true)
                    ->first();

                if (!$aiAgent) {
                    Log::warning('No active AI agent found for phone number', ['phone' => $phoneNumber->number]);
                    return $this->respondWithFallback('I\'m sorry, no agent is available at this time.');
                }
            }

            // Initialize or get existing call
            $call = \App\Models\AiAgentCall::firstOrCreate(
                ['call_sid' => $callSid],
                [
                    'ai_agent_id' => $aiAgent->id,
                    'direction' => $direction,
                    'from_number' => $fromNumber,
                    'to_number' => $toNumber,
                    'status' => 'in-progress',
                    'started_at' => now(),
                    'answered_at' => now(),
                ]
            );

            // Get services
            $conversationEngine = new \App\Services\AiAgent\ConversationEngine($aiAgent);
            $tts = new \App\Services\AiAgent\OpenAiTtsService($aiAgent);
            $stateManager = new \App\Services\AiAgent\CallStateManager(
                app(\App\Services\AiAgent\DeepgramService::class),
                $conversationEngine,
                $tts
            );

            // If no speech yet, send greeting
            if (!$speechResult) {
                $greeting = $stateManager->handleCallAnswered($call);
                $message = $greeting ? $greeting['text'] : "Hello! I'm your AI assistant. How can I help you today?";
            } else {
                // Process user's speech
                $response = $stateManager->processUserInput($call, $speechResult);
                
                if ($response && $response['action'] === 'transfer') {
                    // Transfer to human
                    return $this->respondWithTransfer($aiAgent->transfer_number, $response['text']);
                }
                
                if ($response && $response['action'] === 'end') {
                    // End call
                    return $this->respondWithGoodbye($response['text']);
                }
                
                $message = $response ? $response['text'] : "I'm sorry, I didn't understand that. Could you please repeat?";
            }

            // Generate TwiML with Gather for next input
            $actionUrl = url('/twiml/ai-agent-call');
            $voice = $this->mapVoiceForTwilio($aiAgent->voice);

            $twiml = <<<XML
<?xml version="1.0" encoding="UTF-8"?>
<Response>
    <Gather input="speech" action="{$actionUrl}" method="POST" speechTimeout="3" timeout="5" language="en-US">
        <Say voice="{$voice}">{$message}</Say>
    </Gather>
    <Say voice="{$voice}">I didn't hear anything. Please call again if you need assistance. Goodbye!</Say>
    <Hangup/>
</Response>
XML;

            Log::info('AI Agent response generated', [
                'agent_id' => $aiAgent->id,
                'call_id' => $call->id,
                'message' => $message,
            ]);

            return $this->respondWithTwiml($twiml);
        } catch (\Exception $e) {
            Log::error('AI Agent call error', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);
            return $this->respondWithFallback('I\'m sorry, an error occurred. Please try again later.');
        }
    }
    
    /**
     * Generate TwiML for campaign call with AI agent
     */
    public function campaignCallAiAgent(Request $request): Response
    {
        $callId = $request->query('call_id');
        
        if (!$callId) {
            return $this->respondWithFallback('Call ID missing');
        }

        $call = Call::with(['campaign.aiAgent', 'campaignContact'])->find($callId);

        if (!$call || !$call->campaign) {
            return $this->respondWithFallback('Campaign not found');
        }

        $campaign = $call->campaign;
        $aiAgent = $campaign->aiAgent;

        if (!$aiAgent) {
            Log::warning('Campaign has no AI agent assigned', ['campaign_id' => $campaign->id]);
            return $this->respondWithFallback('No AI agent configured for this campaign');
        }

        if (!$aiAgent->active) {
            Log::warning('AI agent is inactive', ['agent_id' => $aiAgent->id]);
            return $this->respondWithFallback('AI agent is not active');
        }

        $fromNumber = $request->input('From');
        $toNumber = $request->input('To');
        $callSid = $request->input('CallSid');
        $speechResult = $request->input('SpeechResult');

        Log::info('Campaign AI Agent Call', [
            'call_id' => $call->id,
            'campaign_id' => $campaign->id,
            'agent_id' => $aiAgent->id,
            'call_sid' => $callSid,
            'speech' => $speechResult,
        ]);

        try {
            // Initialize or get existing AI agent call record
            $aiAgentCall = \App\Models\AiAgentCall::firstOrCreate(
                ['call_sid' => $callSid],
                [
                    'ai_agent_id' => $aiAgent->id,
                    'direction' => 'outbound',
                    'from_number' => $fromNumber,
                    'to_number' => $toNumber,
                    'status' => 'in-progress',
                    'started_at' => now(),
                    'answered_at' => now(),
                    'campaign_id' => $campaign->id,
                    'campaign_contact_id' => $call->campaignContact ? $call->campaignContact->id : null,
                ]
            );

            // Get services
            $conversationEngine = new \App\Services\AiAgent\ConversationEngine($aiAgent);
            $tts = new \App\Services\AiAgent\OpenAiTtsService($aiAgent);
            $stateManager = new \App\Services\AiAgent\CallStateManager(
                app(\App\Services\AiAgent\DeepgramService::class),
                $conversationEngine,
                $tts
            );

            // If no speech yet, send greeting with contact personalization
            if (!$speechResult) {
                // Build personalized greeting using campaign variables and contact info
                $greeting = $this->buildPersonalizedGreeting($aiAgent, $campaign, $call->campaignContact);
                $message = $greeting;
            } else {
                // Process user's speech
                $response = $stateManager->processUserInput($aiAgentCall, $speechResult);
                
                if ($response && $response['action'] === 'transfer' && $aiAgent->enable_transfer) {
                    // Transfer to human
                    return $this->respondWithTransfer($aiAgent->transfer_number, $response['text']);
                }
                
                if ($response && $response['action'] === 'end') {
                    // End call and mark as completed
                    if ($call->campaignContact) {
                        $call->campaignContact->update(['status' => 'completed']);
                    }
                    return $this->respondWithGoodbye($response['text']);
                }
                
                $message = $response ? $response['text'] : "I'm sorry, I didn't understand that. Could you please repeat?";
            }

            // Generate TwiML with Gather for next input
            $actionUrl = route('twiml.campaign.ai-agent') . '?call_id=' . $callId;
            $voice = $this->mapVoiceForTwilio($aiAgent->voice);

            $twiml = <<<XML
<?xml version="1.0" encoding="UTF-8"?>
<Response>
    <Gather input="speech" action="{$actionUrl}" method="POST" speechTimeout="3" timeout="5" language="en-US">
        <Say voice="{$voice}">{$message}</Say>
    </Gather>
    <Say voice="{$voice}">I didn't hear anything. Thank you for your time. Goodbye!</Say>
    <Hangup/>
</Response>
XML;

            Log::info('Campaign AI Agent response generated', [
                'campaign_id' => $campaign->id,
                'agent_id' => $aiAgent->id,
                'call_id' => $call->id,
            ]);

            return $this->respondWithTwiml($twiml);
        } catch (\Exception $e) {
            Log::error('Campaign AI Agent call error', [
                'call_id' => $call->id,
                'campaign_id' => $campaign->id,
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);
            
            // Mark contact as failed
            if ($call->campaignContact) {
                $call->campaignContact->update(['status' => 'failed']);
            }
            
            return $this->respondWithFallback('I\'m sorry, an error occurred. Goodbye.');
        }
    }

    /**
     * Build personalized greeting for campaign calls
     */
    private function buildPersonalizedGreeting(
        \App\Models\AiAgent $aiAgent,
        \App\Models\Campaign $campaign,
        ?\App\Models\CampaignContact $contact
    ): string {
        // Start with AI agent's system prompt or default greeting
        $greeting = "Hello! ";
        
        // Add personalization if contact exists
        if ($contact) {
            if ($contact->first_name) {
                $greeting .= $contact->first_name . ", ";
            }
        }
        
        // Add campaign-specific context to the greeting
        // The AI agent will use its system_prompt for the full conversation context
        $greeting .= "How can I help you today?";
        
        return $greeting;
    }
    
    /**
     * Map AI agent voice to Twilio voice
     */
    private function mapVoiceForTwilio(string $voice): string
    {
        $voiceMap = [
            'alloy' => 'Polly.Joanna',
            'echo' => 'Polly.Matthew',
            'fable' => 'Polly.Brian',
            'onyx' => 'Polly.Matthew',
            'nova' => 'Polly.Joanna',
            'shimmer' => 'Polly.Joanna',
        ];
        
        return $voiceMap[$voice] ?? 'Polly.Joanna';
    }
    
    /**
     * Generate transfer TwiML
     */
    private function respondWithTransfer(string $transferNumber, string $message): Response
    {
        $twiml = <<<XML
<?xml version="1.0" encoding="UTF-8"?>
<Response>
    <Say voice="Polly.Joanna">{$message}</Say>
    <Dial timeout="30" callerId="+16465767282">{$transferNumber}</Dial>
    <Say voice="Polly.Joanna">I'm sorry, I couldn't reach a human agent. Please try again later. Goodbye!</Say>
    <Hangup/>
</Response>
XML;
        return $this->respondWithTwiml($twiml);
    }
    
    /**
     * Generate goodbye TwiML
     */
    private function respondWithGoodbye(string $message): Response
    {
        $twiml = <<<XML
<?xml version="1.0" encoding="UTF-8"?>
<Response>
    <Say voice="Polly.Joanna">{$message}</Say>
    <Hangup/>
</Response>
XML;
        return $this->respondWithTwiml($twiml);
    }

    /**
     * Fallback TwiML response
     */
    private function respondWithFallback(string $message): Response
    {
        $twiml = <<<XML
<?xml version="1.0" encoding="UTF-8"?>
<Response>
    <Say voice="alice">{$message}</Say>
    <Hangup/>
</Response>
XML;

        return $this->respondWithTwiml($twiml);
    }

    /**
     * Return TwiML response
     */
    private function respondWithTwiml(string $twiml): Response
    {
        // Log only TwiML length for debugging (avoid logging full XML to prevent response bloat)
        Log::debug('TwiML Response Generated', [
            'size_bytes' => strlen($twiml),
            'size_kb' => round(strlen($twiml) / 1024, 2)
        ]);
        
        return response($twiml, 200, [
            'Content-Type' => 'application/xml; charset=utf-8',
            'Cache-Control' => 'no-cache, no-store, must-revalidate',
            'Pragma' => 'no-cache',
            'Expires' => '0',
        ]);
    }
}

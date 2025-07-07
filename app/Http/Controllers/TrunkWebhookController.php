<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\UserSipTrunk;
use App\Models\Call;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Twilio\TwiML\VoiceResponse;

class TrunkWebhookController extends Controller
{
    /**
     * Handle inbound voice calls from SIP trunk
     * 
     * URL: /sip/trunk/voice/{webhook_token}
     */
    public function handleInboundCall(Request $request, string $webhookToken)
    {
        try {
            // Find user by webhook token
            $user = User::where('webhook_token', $webhookToken)->first();

            if (!$user) {
                Log::error('Invalid webhook token for inbound call', [
                    'token' => $webhookToken,
                    'from' => $request->input('From'),
                    'to' => $request->input('To'),
                ]);

                return $this->rejectCall('Invalid configuration');
            }

            // Get user's active trunk
            $trunk = $user->getActiveSipTrunk();

            if (!$trunk || !$trunk->isOperational()) {
                Log::error('No operational trunk for inbound call', [
                    'user_id' => $user->id,
                    'from' => $request->input('From'),
                    'to' => $request->input('To'),
                ]);

                return $this->rejectCall('Service unavailable');
            }

            // Get call details from Twilio
            $callSid = $request->input('CallSid');
            $from = $request->input('From');
            $to = $request->input('To');
            $callStatus = $request->input('CallStatus');

            Log::info('Inbound call received via SIP trunk', [
                'user_id' => $user->id,
                'trunk_id' => $trunk->id,
                'call_sid' => $callSid,
                'from' => $from,
                'to' => $to,
                'status' => $callStatus,
            ]);

            // Find the phone number assignment
            $trunkNumber = $trunk->phoneNumbers()
                ->where('phone_number', $to)
                ->first();

            if (!$trunkNumber) {
                Log::warning('Inbound call to unassigned number', [
                    'trunk_id' => $trunk->id,
                    'to' => $to,
                ]);

                // Default handling: forward to user's softphone
                return $this->forwardToSoftphone($user, $from, $to, $callSid);
            }

            // Route based on assignment
            switch ($trunkNumber->assigned_to) {
                case 'softphone':
                    return $this->forwardToSoftphone($user, $from, $to, $callSid);

                case 'campaign':
                    return $this->handleCampaignInbound($trunkNumber->assigned_id, $from, $to, $callSid);

                case 'ai_agent':
                    return $this->handleAiAgentInbound($trunkNumber->assigned_id, $from, $to, $callSid);

                case 'unassigned':
                default:
                    // Default: forward to softphone
                    return $this->forwardToSoftphone($user, $from, $to, $callSid);
            }
        } catch (\Exception $e) {
            Log::error('Error handling inbound call', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);

            return $this->rejectCall('System error');
        }
    }

    /**
     * Handle call status callbacks
     * 
     * URL: /sip/trunk/call-status/{trunk}
     */
    public function handleStatusCallback(Request $request, UserSipTrunk $trunk)
    {
        try {
            $callSid = $request->input('CallSid');
            $callStatus = $request->input('CallStatus');
            $callDuration = $request->input('CallDuration', 0);
            $price = $request->input('Price');
            $priceUnit = $request->input('PriceUnit');

            Log::info('Call status callback received', [
                'trunk_id' => $trunk->id,
                'call_sid' => $callSid,
                'status' => $callStatus,
                'duration' => $callDuration,
            ]);

            // Update call record if exists (Call model uses twilio_call_sid)
            $call = Call::where('twilio_call_sid', $callSid)->first();
            if ($call) {
                $updateData = [
                    'status' => $callStatus,
                    'duration_seconds' => (int) $callDuration,
                ];
                if ($price !== null && $price !== '') {
                    $updateData['price'] = abs((float) $price);
                    $updateData['price_unit'] = $priceUnit ?? 'USD';
                }
                $call->update($updateData);
            }

            // Record completed calls in trunk statistics
            if ($callStatus === 'completed' && $callDuration > 0) {
                $trunk->recordCall($callDuration);

                Log::info('Call completed and recorded', [
                    'trunk_id' => $trunk->id,
                    'call_sid' => $callSid,
                    'duration' => $callDuration,
                ]);
            }

            return response('OK', 200);
        } catch (\Exception $e) {
            Log::error('Error handling status callback', [
                'trunk_id' => $trunk->id,
                'error' => $e->getMessage(),
            ]);

            return response('Error', 500);
        }
    }

    /**
     * Handle disaster recovery / failover
     * 
     * URL: /sip/trunk/disaster-recovery
     */
    public function handleDisasterRecovery(Request $request)
    {
        try {
            $callSid = $request->input('CallSid');
            $from = $request->input('From');
            $to = $request->input('To');

            Log::warning('Disaster recovery triggered', [
                'call_sid' => $callSid,
                'from' => $from,
                'to' => $to,
            ]);

            // Try to find user by phone number
            // This is a fallback mechanism
            $response = new VoiceResponse();
            $response->say('We are experiencing technical difficulties. Please try again later.');
            $response->hangup();

            return response($response, 200)
                ->header('Content-Type', 'text/xml');
        } catch (\Exception $e) {
            Log::error('Error in disaster recovery', [
                'error' => $e->getMessage(),
            ]);

            return $this->rejectCall('System error');
        }
    }

    /**
     * Forward call to user's softphone (WebRTC client)
     */
    protected function forwardToSoftphone(User $user, string $from, string $to, string $callSid): \Illuminate\Http\Response
    {
        $response = new VoiceResponse();

        // Play ringing tone while connecting
        $dial = $response->dial('', [
            'timeout' => 30,
            'ringTone' => 'us',
        ]);

        // Connect to user's WebRTC client (identity must match token: user_{id})
        $dial->client('user_' . $user->id);

        Log::info('Forwarding call to softphone', [
            'user_id' => $user->id,
            'call_sid' => $callSid,
            'from' => $from,
        ]);

        return response($response, 200)
            ->header('Content-Type', 'text/xml');
    }

    /**
     * Handle inbound call for campaign
     */
    protected function handleCampaignInbound(int $campaignId, string $from, string $to, string $callSid): \Illuminate\Http\Response
    {
        // TODO: Implement campaign-specific inbound handling
        // This could be for callbacks, DTMF responses, etc.

        $response = new VoiceResponse();
        $response->say('Thank you for calling. This number is associated with a campaign.');
        
        // You can add more sophisticated handling here
        // For example, record a voicemail, play a message, etc.
        
        $response->hangup();

        Log::info('Campaign inbound call handled', [
            'campaign_id' => $campaignId,
            'call_sid' => $callSid,
            'from' => $from,
        ]);

        return response($response, 200)
            ->header('Content-Type', 'text/xml');
    }

    /**
     * Handle inbound call for AI agent
     */
    protected function handleAiAgentInbound($aiAgentId, string $from, string $to, string $callSid): \Illuminate\Http\Response
    {
        // TODO: Implement AI agent inbound handling
        // This should connect to your AI service

        $response = new VoiceResponse();
        
        // Example: Connect to AI service endpoint
        // $response->redirect(route('ai.agent.handle', ['agent' => $aiAgentId]));

        $response->say('Connecting you to our AI assistant.');
        
        // Placeholder - implement actual AI integration
        $response->hangup();

        Log::info('AI agent inbound call handled', [
            'ai_agent_id' => $aiAgentId,
            'call_sid' => $callSid,
            'from' => $from,
        ]);

        return response($response, 200)
            ->header('Content-Type', 'text/xml');
    }

    /**
     * Reject call with a message
     */
    protected function rejectCall(string $reason): \Illuminate\Http\Response
    {
        $response = new VoiceResponse();
        $response->say("We're sorry, but we cannot connect your call at this time. $reason.");
        $response->hangup();

        return response($response, 200)
            ->header('Content-Type', 'text/xml');
    }
}

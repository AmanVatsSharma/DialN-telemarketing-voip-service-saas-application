<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\AiAgent;
use App\Models\AiAgentCall;
use App\Models\Contact;
use App\Models\TwilioGlobalConfig;
use App\Services\AiAgent\CallStateManager;
use App\Services\TwilioService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class AiAgentCallController extends Controller
{
    private CallStateManager $stateManager;
    private TwilioService $twilioService;

    public function __construct(CallStateManager $stateManager, TwilioService $twilioService)
    {
        $this->stateManager = $stateManager;
        $this->twilioService = $twilioService;
    }

    public function index(Request $request)
    {
        $query = AiAgentCall::query();

        // Filter by agent
        if ($request->has('ai_agent_id')) {
            $query->where('ai_agent_id', $request->ai_agent_id);
        }

        // Filter by status
        if ($request->has('status')) {
            $query->where('status', $request->status);
        }

        // Filter by direction
        if ($request->has('direction')) {
            $query->where('direction', $request->direction);
        }

        // Filter by date range
        if ($request->has('from_date')) {
            $query->whereDate('started_at', '>=', $request->from_date);
        }
        if ($request->has('to_date')) {
            $query->whereDate('started_at', '<=', $request->to_date);
        }

        $calls = $query->with(['agent', 'contact', 'campaign'])
            ->orderBy('started_at', 'desc')
            ->paginate($request->input('per_page', 15));

        return response()->json($calls);
    }

    public function show($id)
    {
        $call = AiAgentCall::with(['agent', 'contact', 'campaign', 'conversations'])
            ->findOrFail($id);

        // Sync with Twilio to get real-time data
        try {
            $globalConfig = TwilioGlobalConfig::active();
            if (!$globalConfig) {
                \Log::warning('No active Twilio configuration found');
                return response()->json([
                    'call' => $call,
                    'transcript' => $call->getTranscript(),
                    'stats' => $this->stateManager->getCallStats($call),
                ]);
            }
            
            // Initialize Twilio service with global credentials
            $credential = new \App\Models\TwilioCredential([
                'account_sid' => $globalConfig->account_sid,
                'auth_token' => $globalConfig->getDecryptedAuthToken(),
            ]);
            $this->twilioService->initialize($credential);
            
            $twilioData = $this->twilioService->fetchCallDetails($call->call_sid);
            
            if ($twilioData) {
                // Update call with real-time Twilio data
                $twilioPrice = isset($twilioData['price']) && $twilioData['price'] ? abs((float) $twilioData['price']) : null;
                
                $call->update([
                    'status' => $this->mapTwilioStatus($twilioData['status']),
                    'duration' => $twilioData['duration'] ?? $call->duration,
                    'ended_at' => $twilioData['end_time'] ?? $call->ended_at,
                    'recording_url' => !empty($twilioData['recordings']) ? $twilioData['recordings'][0]['url'] : $call->recording_url,
                ]);
                
                // Update Twilio cost if available
                if ($twilioPrice !== null) {
                    $call->updateCostBreakdown(twilioCost: $twilioPrice);
                }
                
                // Refresh the model to get updated data
                $call->refresh();
            }
        } catch (\Exception $e) {
            \Log::warning('Failed to sync call with Twilio', [
                'call_id' => $id,
                'error' => $e->getMessage(),
            ]);
        }

        $transcript = $call->getTranscript();
        $stats = $this->stateManager->getCallStats($call);

        return response()->json([
            'call' => $call,
            'transcript' => $transcript,
            'stats' => $stats,
        ]);
    }

    /**
     * Map Twilio status to our internal status
     */
    private function mapTwilioStatus(string $twilioStatus): string
    {
        return match ($twilioStatus) {
            'queued', 'initiated' => 'initiated',
            'ringing' => 'ringing',
            'in-progress', 'answered' => 'in-progress',
            'completed' => 'completed',
            'busy', 'failed', 'no-answer', 'canceled' => 'failed',
            default => $twilioStatus,
        };
    }

    public function active()
    {
        $calls = AiAgentCall::with(['agent', 'contact'])
            ->whereIn('status', ['initiated', 'ringing', 'in-progress'])
            ->whereNull('ended_at')  // Only calls that haven't ended
            ->orderBy('started_at', 'desc')
            ->get();

        return response()->json($calls);
    }

    public function initiate(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'ai_agent_id' => 'required|exists:ai_agents,id',
            'to_number' => 'required|string',
            'contact_id' => 'nullable|exists:contacts,id',
            'campaign_id' => 'nullable|exists:campaigns,id',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $validator->errors(),
            ], 422);
        }

        $agent = AiAgent::findOrFail($request->ai_agent_id);

        if (!$agent->active) {
            return response()->json([
                'message' => 'AI Agent is not active',
            ], 400);
        }

        if ($agent->type === 'inbound') {
            return response()->json([
                'message' => 'AI Agent is not configured for outbound calls',
            ], 400);
        }

        try {
            $globalConfig = TwilioGlobalConfig::active();
            if (!$globalConfig) {
                return response()->json([
                    'message' => 'Twilio is not configured. Please configure Twilio in Settings.',
                ], 500);
            }
            
            // Get webhook URL from APP_URL or detect from request
            $webhookUrl = rtrim(config('app.url'), '/') . '/twiml/ai-agent-call';
            
            // Initialize Twilio Client
            $accountSid = $globalConfig->account_sid;
            $authToken = $globalConfig->getDecryptedAuthToken();
            $twilioClient = new \Twilio\Rest\Client($accountSid, $authToken);
            
            \Log::info('Initiating AI Agent outbound call', [
                'agent_id' => $agent->id,
                'to' => $request->to_number,
                'from' => $agent->phone_number,
                'webhook' => $webhookUrl,
            ]);
            
            // Make the call via Twilio
            $twilioCall = $twilioClient->calls->create(
                $request->to_number, // To
                $agent->phone_number, // From (AI Agent's Twilio number)
                [
                    'url' => $webhookUrl,
                    'method' => 'POST',
                    'statusCallback' => rtrim(config('app.url'), '/') . '/webhooks/twilio/call/status',
                    'statusCallbackMethod' => 'POST',
                    'statusCallbackEvent' => ['initiated', 'ringing', 'answered', 'completed'],
                    'record' => $agent->enable_recording ? true : false,
                    'timeout' => 30,
                ]
            );
            
            // Create call record with actual Twilio SID
            $call = AiAgentCall::create([
                'ai_agent_id' => $agent->id,
                'contact_id' => $request->contact_id,
                'campaign_id' => $request->campaign_id,
                'call_sid' => $twilioCall->sid,
                'direction' => 'outbound',
                'from_number' => $agent->phone_number,
                'to_number' => $request->to_number,
                'status' => 'initiated',
                'started_at' => now(),
            ]);
            
            \Log::info('AI Agent call initiated successfully', [
                'call_id' => $call->id,
                'twilio_sid' => $twilioCall->sid,
                'status' => $twilioCall->status,
            ]);

            return response()->json([
                'message' => 'Call initiated successfully',
                'call' => $call,
                'twilio_status' => $twilioCall->status,
            ], 201);
            
        } catch (\Exception $e) {
            \Log::error('Failed to initiate AI Agent call', [
                'error' => $e->getMessage(),
                'agent_id' => $agent->id,
                'to' => $request->to_number,
            ]);
            
            return response()->json([
                'message' => 'Failed to initiate call: ' . $e->getMessage(),
            ], 500);
        }
    }

    public function stop($id)
    {
        $call = AiAgentCall::findOrFail($id);

        if (!in_array($call->status, ['initiated', 'ringing', 'in-progress'])) {
            return response()->json([
                'message' => 'Call is not active',
            ], 400);
        }

        try {
            $globalConfig = TwilioGlobalConfig::active();
            if (!$globalConfig) {
                return response()->json([
                    'message' => 'Twilio is not configured. Please configure Twilio in Settings.',
                ], 500);
            }
            
            // Initialize Twilio Client
            $accountSid = $globalConfig->account_sid;
            $authToken = $globalConfig->getDecryptedAuthToken();
            $twilioClient = new \Twilio\Rest\Client($accountSid, $authToken);
            
            // End the call
            $twilioCall = $twilioClient->calls($call->call_sid)->update([
                'status' => 'completed'
            ]);
            
            \Log::info('AI Agent call stopped', [
                'call_id' => $call->id,
                'call_sid' => $call->call_sid,
            ]);
            
            $this->stateManager->handleCallCompleted($call, 'user_stopped');

            return response()->json([
                'message' => 'Call stopped successfully',
                'call' => $call->fresh(),
            ]);
            
        } catch (\Exception $e) {
            \Log::error('Failed to stop AI Agent call', [
                'error' => $e->getMessage(),
                'call_id' => $call->id,
            ]);
            
            return response()->json([
                'message' => 'Failed to stop call: ' . $e->getMessage(),
            ], 500);
        }
    }

    public function sync($id)
    {
        $call = AiAgentCall::with(['agent', 'contact', 'campaign'])->findOrFail($id);

        try {
            // Get active Twilio configuration
            $globalConfig = TwilioGlobalConfig::active();
            
            if (!$globalConfig) {
                return response()->json([
                    'message' => 'Twilio is not configured. Please configure Twilio in Settings.',
                ], 500);
            }

            // Initialize Twilio service with global credentials
            $credential = new \App\Models\TwilioCredential([
                'account_sid' => $globalConfig->account_sid,
                'auth_token' => $globalConfig->getDecryptedAuthToken(),
            ]);
            $this->twilioService->initialize($credential);
            
            // Fetch real-time call details from Twilio
            $twilioData = $this->twilioService->fetchCallDetails($call->call_sid);
            
            if ($twilioData) {
                // Update call with real-time Twilio data
                $twilioPrice = isset($twilioData['price']) && $twilioData['price'] ? abs((float) $twilioData['price']) : null;
                
                $call->update([
                    'status' => $this->mapTwilioStatus($twilioData['status']),
                    'duration' => $twilioData['duration'] ?? $call->duration,
                    'ended_at' => $twilioData['end_time'] ?? $call->ended_at,
                    'recording_url' => $twilioData['recording_url'] ?? $call->recording_url,
                ]);
                
                // Update Twilio cost if available
                if ($twilioPrice !== null) {
                    $call->updateCostBreakdown(twilioCost: $twilioPrice);
                }
                
                // Refresh the model to get updated data
                $call->refresh();
                
                \Log::info('Call synced with Twilio', [
                    'call_id' => $call->id,
                    'call_sid' => $call->call_sid,
                    'status' => $call->status,
                    'duration' => $call->duration,
                ]);
            }

            return response()->json([
                'message' => 'Call synced successfully',
                'call' => $call->load('conversations'),
            ]);
            
        } catch (\Exception $e) {
            \Log::error('Failed to sync call with Twilio', [
                'error' => $e->getMessage(),
                'call_id' => $call->id,
                'call_sid' => $call->call_sid,
            ]);
            
            return response()->json([
                'message' => 'Failed to sync call: ' . $e->getMessage(),
            ], 500);
        }
    }

    public function transcript($id)
    {
        $call = AiAgentCall::with('conversations')->findOrFail($id);
        $transcript = $call->getTranscript();

        return response()->json([
            'call_sid' => $call->call_sid,
            'transcript' => $transcript,
            'conversations' => $call->conversations,
        ]);
    }

    public function stats(Request $request)
    {
        $query = AiAgentCall::query();

        // Filter by agent
        if ($request->has('ai_agent_id')) {
            $query->where('ai_agent_id', $request->ai_agent_id);
        }

        // Filter by date range
        if ($request->has('from_date')) {
            $query->whereDate('started_at', '>=', $request->from_date);
        }
        if ($request->has('to_date')) {
            $query->whereDate('started_at', '<=', $request->to_date);
        }

        $stats = [
            'total_calls' => $query->count(),
            'completed_calls' => (clone $query)->where('status', 'completed')->count(),
            'active_calls' => (clone $query)->whereIn('status', ['initiated', 'ringing', 'in-progress'])->count(),
            'failed_calls' => (clone $query)->where('status', 'failed')->count(),
            'average_duration' => (clone $query)->where('status', 'completed')->avg('duration'),
            'total_cost' => (clone $query)->sum('cost_estimate'),
            'transferred_calls' => (clone $query)->where('transferred', true)->count(),
        ];

        return response()->json($stats);
    }

    public function export(Request $request)
    {
        $query = AiAgentCall::query();

        // Filter by agent
        if ($request->has('ai_agent_id')) {
            $query->where('ai_agent_id', $request->ai_agent_id);
        }

        // Filter by status
        if ($request->has('status') && $request->status !== 'all') {
            $query->where('status', $request->status);
        }

        // Filter by direction
        if ($request->has('direction') && $request->direction !== 'all') {
            $query->where('direction', $request->direction);
        }

        // Filter by date range
        if ($request->has('from_date')) {
            $query->whereDate('started_at', '>=', $request->from_date);
        }
        if ($request->has('to_date')) {
            $query->whereDate('started_at', '<=', $request->to_date);
        }

        $calls = $query->with(['agent', 'contact', 'campaign'])
            ->orderBy('started_at', 'desc')
            ->limit(10000) // Limit to prevent memory issues
            ->get();

        $filename = 'ai-agent-calls-' . now()->format('Y-m-d-His') . '.csv';

        $headers = [
            'Content-Type' => 'text/csv',
            'Content-Disposition' => 'attachment; filename="' . $filename . '"',
            'Pragma' => 'no-cache',
            'Cache-Control' => 'must-revalidate, post-check=0, pre-check=0',
            'Expires' => '0',
        ];

        $callback = function () use ($calls) {
            $file = fopen('php://output', 'w');

            // CSV Headers
            fputcsv($file, [
                'ID',
                'AI Agent',
                'Direction',
                'From Number',
                'To Number',
                'Contact Name',
                'Campaign',
                'Status',
                'Duration (seconds)',
                'Turn Count',
                'Cost Estimate',
                'Transferred',
                'Recording URL',
                'Started At',
                'Ended At',
                'Created At',
            ]);

            // CSV Data
            foreach ($calls as $call) {
                fputcsv($file, [
                    $call->id,
                    $call->agent?->name ?? 'N/A',
                    $call->direction,
                    $call->from_number,
                    $call->to_number,
                    $call->contact?->name ?? 'N/A',
                    $call->campaign?->name ?? 'N/A',
                    $call->status,
                    $call->duration ?? 0,
                    $call->turn_count ?? 0,
                    $call->cost_estimate ?? 0,
                    $call->transferred ? 'Yes' : 'No',
                    $call->recording_url ?? '',
                    $call->started_at?->format('Y-m-d H:i:s') ?? '',
                    $call->ended_at?->format('Y-m-d H:i:s') ?? '',
                    $call->created_at?->format('Y-m-d H:i:s') ?? '',
                ]);
            }

            fclose($file);
        };

        return response()->stream($callback, 200, $headers);
    }

    /**
     * Handle call status callback from Twilio
     */
    public function handleCallStatus(Request $request)
    {
        try {
            $callSid = $request->input('CallSid');
            $callStatus = $request->input('CallStatus');
            $duration = $request->input('CallDuration');
            
            \Log::info('Received call status callback', [
                'call_sid' => $callSid,
                'status' => $callStatus,
                'duration' => $duration,
                'all_data' => $request->all(),
            ]);

            // Find the call by Twilio SID
            $call = AiAgentCall::where('call_sid', $callSid)->first();
            
            if (!$call) {
                \Log::warning('Call not found for status callback', [
                    'call_sid' => $callSid,
                ]);
                return response('<?xml version="1.0" encoding="UTF-8"?><Response></Response>', 200)
                    ->header('Content-Type', 'text/xml');
            }

            // Update call status
            $updateData = ['status' => $callStatus];
            
            if ($duration !== null) {
                $updateData['duration'] = (int)$duration;
            }
            
            if (in_array($callStatus, ['completed', 'failed', 'busy', 'no-answer', 'canceled'])) {
                $updateData['ended_at'] = now();
            }
            
            $call->update($updateData);

            // Store Twilio's actual price when provided (so we show true Twilio cost, not estimate)
            $twilioPrice = $request->input('Price');
            if ($twilioPrice !== null && $twilioPrice !== '') {
                $twilioCost = abs((float) $twilioPrice);
                $call->updateCostBreakdown(twilioCost: $twilioCost);
            }
            
            \Log::info('Call status updated', [
                'call_id' => $call->id,
                'status' => $callStatus,
            ]);

            return response('<?xml version="1.0" encoding="UTF-8"?><Response></Response>', 200)
                ->header('Content-Type', 'text/xml');
            
        } catch (\Exception $e) {
            \Log::error('Failed to handle call status callback', [
                'error' => $e->getMessage(),
                'request' => $request->all(),
            ]);
            
            return response('<?xml version="1.0" encoding="UTF-8"?><Response></Response>', 200)
                ->header('Content-Type', 'text/xml');
        }
    }
}

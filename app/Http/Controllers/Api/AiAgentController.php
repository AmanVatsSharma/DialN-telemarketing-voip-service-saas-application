<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\AiAgent;
use App\Models\TwilioGlobalConfig;
use App\Services\AiAgent\ConversationEngine;
use App\Services\AiAgent\DeepgramService;
use App\Services\AiAgent\OpenAiTtsService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class AiAgentController extends Controller
{
    public function index(Request $request)
    {
        $query = AiAgent::query();

        // Filter by type
        if ($request->has('type')) {
            $query->where('type', $request->type);
        }

        // Filter by active status
        if ($request->has('active')) {
            $query->where('active', $request->boolean('active'));
        }

        $agents = $query->with(['calls', 'knowledgeBase'])
            ->withCount(['calls', 'activeCalls', 'completedCalls'])
            ->paginate($request->input('per_page', 15));

        return response()->json($agents);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'phone_number' => 'nullable|string|unique:ai_agents,phone_number',
            'description' => 'nullable|string',
            'type' => 'required|in:inbound,outbound,both',
            'text_provider' => 'nullable|string|in:openrouter,openai',
            'text_api_key' => 'nullable|string', // Optional - will use platform key if not provided
            'tts_provider' => 'nullable|string|in:openai',
            'tts_api_key' => 'nullable|string', // Optional - will use platform key if not provided
            'tts_model' => 'nullable|string|in:tts-1,gpt-4o-mini-tts',
            'tts_instructions' => 'nullable|string|required_if:tts_model,gpt-4o-mini-tts|max:1000',
            'system_prompt' => 'required|string',
            'first_message' => 'nullable|string|max:500',
            'goodbye_message' => 'nullable|string|max:500',
            'knowledge_base' => 'nullable|string',
            'knowledge_base_id' => 'nullable|integer|exists:knowledge_bases,id',
            'model' => 'required|string',
            'voice' => 'required|string',
            'max_tokens' => 'nullable|integer|min:100|max:4000',
            'temperature' => 'nullable|numeric|min:0|max:2',
            'active' => 'nullable|boolean',
            'enable_transfer' => 'nullable|boolean',
            'transfer_number' => 'nullable|string|required_if:enable_transfer,true',
            'enable_recording' => 'nullable|boolean',
            'max_duration' => 'nullable|integer|min:60|max:3600',
            'silence_timeout' => 'nullable|integer|min:5|max:60',
            'response_timeout' => 'nullable|integer|min:5|max:30',
            'trigger_keywords' => 'nullable|array',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $validator->errors(),
            ], 422);
        }

        $agent = AiAgent::create($validator->validated());

        return response()->json([
            'message' => 'AI Agent created successfully',
            'agent' => $agent,
        ], 201);
    }

    public function show($id)
    {
        $agent = AiAgent::with(['calls', 'knowledgeBase'])
            ->withCount(['calls', 'activeCalls', 'completedCalls'])
            ->findOrFail($id);

        $stats = $agent->getStats();

        return response()->json([
            'data' => $agent,
            'stats' => $stats,
        ]);
    }

    public function calls($id)
    {
        $agent = AiAgent::findOrFail($id);

        $calls = $agent->calls()
            ->with(['conversations'])
            ->orderBy('created_at', 'desc')
            ->limit(20)
            ->get();

        return response()->json([
            'data' => $calls,
        ]);
    }

    public function update(Request $request, $id)
    {
        $agent = AiAgent::findOrFail($id);

        // Clean up phone_number - treat empty string as null
        if ($request->has('phone_number') && $request->phone_number === '') {
            $request->merge(['phone_number' => null]);
        }

        // If API keys are empty strings and agent already has keys, don't require them
        $requireTextKey = $request->input('text_provider') === 'openai' && 
                         empty($agent->text_api_key) && 
                         $request->input('text_api_key') === '';
        
        $requireTtsKey = $request->input('tts_provider') === 'openai' && 
                        empty($agent->tts_api_key) && 
                        $request->input('tts_api_key') === '';

        $validator = Validator::make($request->all(), [
            'name' => 'sometimes|required|string|max:255',
            'phone_number' => 'nullable|string', // Removed unique constraint - force assignment
            'description' => 'nullable|string',
            'type' => 'sometimes|required|in:inbound,outbound,both',
            'text_provider' => 'nullable|string|in:openrouter,openai',
            'text_api_key' => $requireTextKey ? 'required|string' : 'nullable|string',
            'tts_provider' => 'nullable|string|in:openai',
            'tts_api_key' => $requireTtsKey ? 'required|string' : 'nullable|string',
            'tts_model' => 'nullable|string|in:tts-1,gpt-4o-mini-tts',
            'tts_instructions' => 'nullable|string|required_if:tts_model,gpt-4o-mini-tts|max:1000',
            'system_prompt' => 'sometimes|required|string',
            'first_message' => 'nullable|string|max:500',
            'goodbye_message' => 'nullable|string|max:500',
            'knowledge_base' => 'nullable|string',
            'knowledge_base_id' => 'nullable|integer|exists:knowledge_bases,id',
            'model' => 'sometimes|required|string',
            'voice' => 'sometimes|required|string',
            'max_tokens' => 'nullable|integer|min:100|max:4000',
            'temperature' => 'nullable|numeric|min:0|max:2',
            'active' => 'nullable|boolean',
            'enable_transfer' => 'nullable|boolean',
            'transfer_number' => 'nullable|string',
            'enable_recording' => 'nullable|boolean',
            'max_duration' => 'nullable|integer|min:60|max:3600',
            'silence_timeout' => 'nullable|integer|min:5|max:60',
            'response_timeout' => 'nullable|integer|min:5|max:30',
            'trigger_keywords' => 'nullable|array',
        ]);

        if ($validator->fails()) {
            \Log::error('AI Agent validation failed', [
                'agent_id' => $id,
                'errors' => $validator->errors()->toArray(),
                'request_data' => $request->all()
            ]);
            
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $validator->errors(),
            ], 422);
        }

        // Force assignment: If assigning a phone number, remove it from other agents
        if ($request->filled('phone_number')) {
            AiAgent::where('phone_number', $request->phone_number)
                ->where('id', '!=', $id)
                ->update(['phone_number' => null]);
            
            \Log::info('Phone number reassigned to AI agent', [
                'agent_id' => $id,
                'phone_number' => $request->phone_number
            ]);
        }

        $agent->update($validator->validated());

        // Auto-configure Twilio webhooks if phone number is assigned
        if ($agent->phone_number) {
            try {
                $this->autoConfigurePhoneNumber($agent);
            } catch (\Exception $e) {
                \Log::warning('Failed to auto-configure Twilio webhooks', [
                    'agent_id' => $agent->id,
                    'error' => $e->getMessage()
                ]);
            }
        }

        return response()->json([
            'message' => 'AI Agent updated successfully',
            'agent' => $agent,
        ]);
    }

    public function destroy($id)
    {
        $agent = AiAgent::findOrFail($id);
        
        // Check if agent has active calls
        if ($agent->activeCalls()->exists()) {
            return response()->json([
                'message' => 'Cannot delete agent with active calls. Please wait for calls to complete.',
                'active_calls' => $agent->activeCalls()->count(),
            ], 400);
        }

        // Check if agent has call history
        $totalCalls = $agent->calls()->count();
        if ($totalCalls > 0) {
            return response()->json([
                'message' => 'Cannot delete agent with call history. This would permanently delete ' . $totalCalls . ' call records. Please use archive instead.',
                'total_calls' => $totalCalls,
                'suggestion' => 'Use the archive feature to preserve call history while deactivating the agent.',
            ], 400);
        }

        // Check if agent is used in campaigns
        $campaigns = $agent->campaigns;
        if ($campaigns->count() > 0) {
            return response()->json([
                'message' => 'Cannot delete agent used in ' . $campaigns->count() . ' campaign(s). Please unlink campaigns first.',
                'campaigns' => $campaigns->pluck('name'),
            ], 400);
        }

        // Safe to delete (no data loss)
        $agent->delete();

        return response()->json([
            'message' => 'AI Agent deleted successfully',
        ]);
    }

    /**
     * Archive an AI agent (soft delete + deactivate)
     */
    public function archive($id)
    {
        $agent = AiAgent::findOrFail($id);
        
        // Check if agent has active calls
        if ($agent->activeCalls()->exists()) {
            return response()->json([
                'message' => 'Cannot archive agent with active calls. Please wait for calls to complete.',
                'active_calls' => $agent->activeCalls()->count(),
            ], 400);
        }

        // Deactivate agent
        $agent->update(['active' => false]);
        
        // Unlink from campaigns (preserve campaign but remove agent)
        $campaignsAffected = $agent->campaigns()->count();
        $agent->campaigns()->update(['ai_agent_id' => null]);
        
        // Soft delete
        $agent->delete();

        return response()->json([
            'message' => 'AI Agent archived successfully',
            'preserved_calls' => $agent->calls()->count(),
            'campaigns_unlinked' => $campaignsAffected,
        ]);
    }

    /**
     * Restore an archived agent
     */
    public function restore($id)
    {
        $agent = AiAgent::withTrashed()->findOrFail($id);
        
        if (!$agent->trashed()) {
            return response()->json([
                'message' => 'Agent is not archived',
            ], 400);
        }

        $agent->restore();
        
        return response()->json([
            'message' => 'AI Agent restored successfully',
            'agent' => $agent,
        ]);
    }

    /**
     * Check if user has configured API keys
     */
    public function checkApiKeys(Request $request)
    {
        // Check if any agent has OpenAI text API key
        $hasTextApiKey = AiAgent::where('text_provider', 'openai')
            ->whereNotNull('text_api_key')
            ->where('text_api_key', '!=', '')
            ->exists();

        // Check if any agent has OpenAI TTS API key
        $hasTtsApiKey = AiAgent::where('tts_provider', 'openai')
            ->whereNotNull('tts_api_key')
            ->where('tts_api_key', '!=', '')
            ->exists();

        return response()->json([
            'has_text_api_key' => $hasTextApiKey,
            'has_tts_api_key' => $hasTtsApiKey,
        ]);
    }

    public function test($id)
    {
        $agent = AiAgent::findOrFail($id);

        $conversationEngine = new ConversationEngine($agent);
        $deepgram = app(DeepgramService::class);
        $tts = new OpenAiTtsService($agent);

        $results = [
            'agent' => $agent->name,
            'tests' => [],
        ];

        // Test Deepgram
        try {
            $deepgramTest = $deepgram->test();
            $results['tests']['deepgram'] = [
                'status' => 'success',
                'message' => 'Deepgram API is accessible',
            ];
        } catch (\Exception $e) {
            $results['tests']['deepgram'] = [
                'status' => 'failed',
                'message' => $e->getMessage(),
            ];
        }

        // Test Text Generation (OpenRouter or OpenAI)
        try {
            $openrouterTest = $conversationEngine->test();
            $results['tests'][$agent->text_provider ?? 'openrouter'] = [
                'status' => 'success',
                'message' => ucfirst($agent->text_provider ?? 'openrouter') . ' API is accessible',
            ];
        } catch (\Exception $e) {
            $results['tests'][$agent->text_provider ?? 'openrouter'] = [
                'status' => 'failed',
                'message' => $e->getMessage(),
            ];
        }

        // Test TTS (OpenAI or other)
        try {
            $ttsTest = $tts->test();
            $results['tests'][$agent->tts_provider ?? 'openai'] = [
                'status' => 'success',
                'message' => ucfirst($agent->tts_provider ?? 'openai') . ' TTS API is accessible',
            ];
        } catch (\Exception $e) {
            $results['tests'][$agent->tts_provider ?? 'openai'] = [
                'status' => 'failed',
                'message' => $e->getMessage(),
            ];
        }

        return response()->json($results);
    }

    public function availableModels(Request $request)
    {
        $provider = $request->input('provider', 'openrouter');
        
        if ($provider === 'openai') {
            return response()->json(config('ai-agent.openai_models', []));
        }
        
        return response()->json(config('ai-agent.openrouter_models', []));
    }

    /**
     * Validate Text Generation Provider API Key (OpenAI or OpenRouter)
     */
    public function validateTextProviderKey(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'provider' => 'required|string|in:openai,openrouter',
            'api_key' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'valid' => false,
                'error' => 'Provider and API key are required',
            ], 400);
        }

        $provider = $request->input('provider');
        $apiKey = $request->input('api_key');

        try {
            if ($provider === 'openai') {
                $response = \Illuminate\Support\Facades\Http::withHeaders([
                    'Authorization' => "Bearer {$apiKey}",
                ])->timeout(10)->get('https://api.openai.com/v1/models');

                if ($response->successful()) {
                    return response()->json(['valid' => true]);
                }
            } elseif ($provider === 'openrouter') {
                // OpenRouter doesn't require API key validation in same way
                // Just check if key format looks valid
                if (strlen($apiKey) > 10) {
                    return response()->json(['valid' => true]);
                }
            }

            return response()->json([
                'valid' => false,
                'error' => 'Invalid API key or API request failed',
            ], 400);
        } catch (\Exception $e) {
            return response()->json([
                'valid' => false,
                'error' => $e->getMessage(),
            ], 400);
        }
    }

    /**
     * Validate TTS Provider API Key
     */
    public function validateTtsProviderKey(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'provider' => 'required|string|in:openai',
            'api_key' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'valid' => false,
                'error' => 'Provider and API key are required',
            ], 400);
        }

        $provider = $request->input('provider');
        $apiKey = $request->input('api_key');

        try {
            if ($provider === 'openai') {
                // Test TTS endpoint specifically
                $response = \Illuminate\Support\Facades\Http::withHeaders([
                    'Authorization' => "Bearer {$apiKey}",
                ])->timeout(10)->get('https://api.openai.com/v1/models');

                if ($response->successful()) {
                    return response()->json(['valid' => true]);
                }
            }

            return response()->json([
                'valid' => false,
                'error' => 'Invalid API key or API request failed',
            ], 400);
        } catch (\Exception $e) {
            return response()->json([
                'valid' => false,
                'error' => $e->getMessage(),
            ], 400);
        }
    }

    /**
     * Get available TTS models for a provider
     */
    public function availableTtsModels(Request $request)
    {
        $provider = $request->input('provider', 'openai');
        
        if ($provider === 'openai') {
            $models = config('ai-agent.tts_providers.openai.models', []);
            return response()->json($models);
        }
        
        return response()->json([]);
    }

    /**
     * @deprecated Use validateTextProviderKey instead
     */
    public function validateOpenAiKey(Request $request)
    {
        return $this->validateTextProviderKey($request->merge(['provider' => 'openai']));
    }

    public function availableVoices()
    {
        return response()->json(config('ai-agent.voices'));
    }

    public function availableTemplates()
    {
        return response()->json(config('ai-agent.templates', []));
    }

    /**
     * Configure Twilio webhooks for AI Agent
     */
    public function configureWebhooks($id)
    {
        $agent = AiAgent::findOrFail($id);

        if (!$agent->phone_number) {
            return response()->json([
                'message' => 'AI Agent must have a phone number assigned',
            ], 400);
        }

        try {
            $result = $this->autoConfigurePhoneNumber($agent);
            
            return response()->json([
                'message' => 'Webhooks configured successfully',
                'webhook_url' => $result['webhook_url'],
                'phone_sid' => $result['phone_sid'],
            ]);
            
        } catch (\Exception $e) {
            \Log::error('Failed to configure Twilio webhooks', [
                'error' => $e->getMessage(),
                'agent_id' => $agent->id,
            ]);
            
            return response()->json([
                'message' => 'Failed to configure webhooks: ' . $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Auto-configure phone number voice webhooks for AI Agent
     */
    protected function autoConfigurePhoneNumber(AiAgent $agent)
    {
        // Get active Twilio configuration
        $globalConfig = TwilioGlobalConfig::active();
        
        if (!$globalConfig) {
            throw new \Exception('Twilio is not configured. Please configure Twilio in Settings.');
        }

        $accountSid = $globalConfig->account_sid;
        $authToken = $globalConfig->getDecryptedAuthToken();
        $twilioClient = new \Twilio\Rest\Client($accountSid, $authToken);
        
        // Get webhook URL
        $webhookUrl = rtrim(config('app.url'), '/') . '/twiml/ai-agent-call';
        $statusCallbackUrl = rtrim(config('app.url'), '/') . '/webhooks/twilio/call/status';
        
        // Find the phone number in Twilio
        $phoneNumbers = $twilioClient->incomingPhoneNumbers->read([
            'phoneNumber' => $agent->phone_number
        ]);
        
        if (empty($phoneNumbers)) {
            throw new \Exception('Phone number not found in Twilio account');
        }
        
        $phoneNumber = $phoneNumbers[0];
        
        // Update the phone number with AI Agent webhook
        $phoneNumber->update([
            'voiceUrl' => $webhookUrl,
            'voiceMethod' => 'POST',
            'statusCallback' => $statusCallbackUrl,
            'statusCallbackMethod' => 'POST',
        ]);
        
        \Log::info('Twilio webhook auto-configured for AI Agent', [
            'agent_id' => $agent->id,
            'phone' => $agent->phone_number,
            'webhook' => $webhookUrl,
        ]);
        
        // Update agent record
        $agent->update([
            'twilio_auto_configured' => true,
            'twilio_webhook_sid' => $phoneNumber->sid,
        ]);

        return [
            'webhook_url' => $webhookUrl,
            'phone_sid' => $phoneNumber->sid,
        ];
    }

    /**
     * Test AI Agent configuration
     */
    public function testConfiguration($id)
    {
        $agent = AiAgent::findOrFail($id);

        $results = [
            'agent' => $agent->name,
            'checks' => [],
        ];

        // Check OpenAI API
        $results['checks']['openai'] = $this->checkOpenAI();
        
        // Check Twilio configuration
        $results['checks']['twilio'] = $this->checkTwilio($agent);
        
        // Check webhook URL accessibility
        $results['checks']['webhook'] = $this->checkWebhookUrl();
        
        // Overall status
        $results['status'] = collect($results['checks'])->every(fn($check) => $check['status'] === 'success') ? 'success' : 'warning';

        return response()->json($results);
    }

    private function checkOpenAI()
    {
        try {
            $apiKey = config('services.openai.api_key');
            if (empty($apiKey) || $apiKey === 'your-openai-api-key-here') {
                return [
                    'status' => 'error',
                    'message' => 'OpenAI API key not configured',
                ];
            }

            return [
                'status' => 'success',
                'message' => 'OpenAI API key configured',
                'key' => substr($apiKey, 0, 20) . '...',
            ];
        } catch (\Exception $e) {
            return [
                'status' => 'error',
                'message' => $e->getMessage(),
            ];
        }
    }

    private function checkTwilio($agent)
    {
        try {
            $globalConfig = TwilioGlobalConfig::active();
            
            if (!$globalConfig) {
                return [
                    'status' => 'error',
                    'message' => 'Twilio credentials not configured',
                ];
            }

            $accountSid = $globalConfig->account_sid;
            $authToken = $globalConfig->getDecryptedAuthToken();

            $twilioClient = new \Twilio\Rest\Client($accountSid, $authToken);
            $account = $twilioClient->api->v2010->accounts($accountSid)->fetch();

            $result = [
                'status' => 'success',
                'message' => 'Twilio account connected',
                'account_name' => $account->friendlyName,
            ];

            // Check if agent has phone number configured
            if ($agent->phone_number) {
                $phoneNumbers = $twilioClient->incomingPhoneNumbers->read([
                    'phoneNumber' => $agent->phone_number
                ]);

                if (!empty($phoneNumbers)) {
                    $result['phone_configured'] = true;
                    $result['webhook_configured'] = $agent->twilio_auto_configured;
                } else {
                    $result['phone_configured'] = false;
                    $result['status'] = 'warning';
                    $result['message'] .= ' - Phone number not found in Twilio';
                }
            }

            return $result;
        } catch (\Exception $e) {
            return [
                'status' => 'error',
                'message' => 'Twilio connection failed: ' . $e->getMessage(),
            ];
        }
    }

    private function checkWebhookUrl()
    {
        try {
            $webhookUrl = rtrim(config('app.url'), '/') . '/twiml/ai-agent-call';
            
            // Check if URL is accessible (basic check)
            if (str_starts_with($webhookUrl, 'https://')) {
                return [
                    'status' => 'success',
                    'message' => 'Webhook URL configured',
                    'url' => $webhookUrl,
                ];
            } else {
                return [
                    'status' => 'warning',
                    'message' => 'Webhook URL should use HTTPS for production',
                    'url' => $webhookUrl,
                ];
            }
        } catch (\Exception $e) {
            return [
                'status' => 'error',
                'message' => $e->getMessage(),
            ];
        }
    }
}

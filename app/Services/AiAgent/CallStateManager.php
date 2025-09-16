<?php

namespace App\Services\AiAgent;

use App\Models\AiAgent;
use App\Models\AiAgentCall;
use App\Models\AiAgentConversation;
use Exception;
use Illuminate\Support\Facades\Log;

class CallStateManager
{
    private DeepgramService $deepgram;
    private ConversationEngine $conversation;
    private OpenAiTtsService $tts;

    public function __construct(
        DeepgramService $deepgram,
        ConversationEngine $conversation,
        OpenAiTtsService $tts
    ) {
        $this->deepgram = $deepgram;
        $this->conversation = $conversation;
        $this->tts = $tts;
    }

    /**
     * Initialize a new AI agent call
     */
    public function initializeCall(
        AiAgent $agent,
        string $callSid,
        string $direction,
        string $from,
        string $to,
        ?int $contactId = null,
        ?int $campaignId = null
    ): AiAgentCall {
        $call = AiAgentCall::create([
            'ai_agent_id' => $agent->id,
            'call_sid' => $callSid,
            'direction' => $direction,
            'from_number' => $from,
            'to_number' => $to,
            'contact_id' => $contactId,
            'campaign_id' => $campaignId,
            'status' => 'initiated',
            'started_at' => now(),
        ]);

        // Add system message
        $this->addConversation($call, 'system', $agent->system_prompt, 0);

        Log::info('AI Agent call initialized', [
            'call_id' => $call->id,
            'agent_id' => $agent->id,
            'call_sid' => $callSid,
        ]);

        return $call;
    }

    /**
     * Handle call answered
     */
    public function handleCallAnswered(AiAgentCall $call): ?array
    {
        try {
            $call->markAnswered();

            // Eager load agent if not already loaded
            if (!$call->relationLoaded('agent')) {
                $call->load('agent');
            }
            $agent = $call->agent;
            $greeting = $this->conversation->generateGreeting($agent);

            // Add assistant greeting to conversation
            $this->addConversation($call, 'assistant', $greeting, 1);

            // Generate TTS audio
            $audio = $this->tts->generateForTwilio($greeting, $agent->voice);

            return [
                'text' => $greeting,
                'audio' => $audio,
                'action' => 'speak',
            ];
        } catch (Exception $e) {
            Log::error('Error handling call answered', [
                'call_id' => $call->id,
                'error' => $e->getMessage(),
            ]);
            return null;
        }
    }

    /**
     * Process user speech input
     */
    public function processUserInput(
        AiAgentCall $call,
        string $transcript,
        float $confidence = 1.0
    ): ?array {
        try {
            // Eager load agent if not already loaded
            if (!$call->relationLoaded('agent')) {
                $call->load('agent');
            }
            $agent = $call->agent;
            
            // Add user message to conversation
            $turnNumber = $call->turn_count + 1;
            $this->addConversation($call, 'user', $transcript, $turnNumber, $confidence);

            // Check if conversation should end
            if ($this->conversation->shouldEndConversation($transcript)) {
                $goodbye = $this->conversation->generateGoodbye($agent);
                $this->addConversation($call, 'assistant', $goodbye, $turnNumber + 1);
                
                return [
                    'text' => $goodbye,
                    'audio' => $this->tts->generateForTwilio($goodbye, $agent->voice),
                    'action' => 'end',
                ];
            }

            // Generate AI response
            $response = $this->conversation->generateResponse($agent, $call, $transcript);

            if (!$response) {
                // Fallback response
                $fallback = "I'm sorry, I didn't catch that. Could you please repeat?";
                $this->addConversation($call, 'assistant', $fallback, $turnNumber + 1);
                
                return [
                    'text' => $fallback,
                    'audio' => $this->tts->generateForTwilio($fallback, $agent->voice),
                    'action' => 'continue',
                ];
            }

            // Add assistant response to conversation
            $this->addConversation(
                $call,
                'assistant',
                $response['content'],
                $turnNumber + 1,
                null,
                $response['usage'] ?? null
            );

            // Track OpenAI tokens and cost
            if (isset($response['usage'])) {
                $this->trackOpenAICost($call, $response['usage'], $response['model'] ?? null);
            }

            // Update turn count
            $call->increment('turn_count', 2); // User + Assistant

            // Handle transfer if needed
            if ($response['action'] === 'transfer') {
                return [
                    'text' => $response['content'],
                    'audio' => $this->tts->generateForTwilio($response['content'], $agent->voice),
                    'action' => 'transfer',
                    'transfer_to' => $response['transfer_to'],
                ];
            }

            // Generate TTS for response
            $audio = $this->tts->generateForTwilio($response['content'], $agent->voice);

            return [
                'text' => $response['content'],
                'audio' => $audio,
                'action' => 'continue',
            ];
        } catch (Exception $e) {
            Log::error('Error processing user input', [
                'call_id' => $call->id,
                'error' => $e->getMessage(),
            ]);
            return null;
        }
    }

    /**
     * Handle call completion
     */
    public function handleCallCompleted(
        AiAgentCall $call,
        string $reason = 'completed',
        ?string $recordingUrl = null
    ): void {
        try {
            $call->markCompleted($reason);

            if ($recordingUrl) {
                $call->update(['recording_url' => $recordingUrl]);
            }

            // Calculate cost estimate
            $call->updateCostEstimate();

            Log::info('AI Agent call completed', [
                'call_id' => $call->id,
                'duration' => $call->duration,
                'turns' => $call->turn_count,
                'cost' => $call->cost_estimate,
                'reason' => $reason,
            ]);
        } catch (Exception $e) {
            Log::error('Error handling call completion', [
                'call_id' => $call->id,
                'error' => $e->getMessage(),
            ]);
        }
    }

    /**
     * Add conversation turn
     */
    private function addConversation(
        AiAgentCall $call,
        string $role,
        string $content,
        int $turnNumber,
        ?float $confidence = null,
        ?array $metadata = null
    ): AiAgentConversation {
        return AiAgentConversation::create([
            'ai_agent_call_id' => $call->id,
            'turn_number' => $turnNumber,
            'role' => $role,
            'content' => $content,
            'confidence' => $confidence,
            'metadata' => $metadata,
        ]);
    }

    /**
     * Check if call has exceeded limits
     */
    public function shouldEndCall(AiAgentCall $call): bool
    {
        $agent = $call->agent;

        // Check duration limit
        if ($call->answered_at) {
            $duration = now()->diffInSeconds($call->answered_at);
            if ($duration >= $agent->max_duration) {
                Log::info('Call exceeded max duration', [
                    'call_id' => $call->id,
                    'duration' => $duration,
                    'max' => $agent->max_duration,
                ]);
                return true;
            }
        }

        // Check conversation turn limit
        $maxTurns = config('ai-agent.conversation.max_turns', 50);
        if ($call->turn_count >= $maxTurns) {
            Log::info('Call exceeded max turns', [
                'call_id' => $call->id,
                'turns' => $call->turn_count,
            ]);
            return true;
        }

        return false;
    }

    /**
     * Get call statistics
     */
    public function getCallStats(AiAgentCall $call): array
    {
        return [
            'duration' => $call->duration,
            'turns' => $call->turn_count,
            'cost' => $call->cost_estimate,
            'twilio_cost' => $call->twilio_cost,
            'openai_cost' => $call->openai_cost,
            'total_tokens' => $call->total_tokens,
            'status' => $call->status,
            'transferred' => $call->transferred,
            'end_reason' => $call->end_reason,
        ];
    }

    /**
     * Track OpenAI cost from usage data
     */
    private function trackOpenAICost(AiAgentCall $call, array $usage, ?string $model = null): void
    {
        // Extract token counts
        $inputTokens = $usage['prompt_tokens'] ?? 0;
        $outputTokens = $usage['completion_tokens'] ?? 0;
        $totalTokens = $usage['total_tokens'] ?? ($inputTokens + $outputTokens);

        // Get pricing based on model (GPT-4 vs GPT-3.5)
        // GPT-4 Turbo: $0.01/1K input, $0.03/1K output
        // GPT-3.5 Turbo: $0.0015/1K input, $0.002/1K output
        $isGpt4 = str_contains(strtolower($model ?? ''), 'gpt-4');
        
        $inputCostPer1K = $isGpt4 ? 0.01 : 0.0015;
        $outputCostPer1K = $isGpt4 ? 0.03 : 0.002;

        // Calculate cost for this turn
        $turnCost = ($inputTokens / 1000 * $inputCostPer1K) + ($outputTokens / 1000 * $outputCostPer1K);

        // Update cumulative totals
        $call->increment('input_tokens', $inputTokens);
        $call->increment('output_tokens', $outputTokens);
        $call->increment('total_tokens', $totalTokens);
        
        // Update OpenAI cost
        $newOpenAICost = (float) $call->openai_cost + $turnCost;
        $call->updateCostBreakdown(openaiCost: $newOpenAICost, tokens: (int) $call->total_tokens);

        Log::debug('Tracked OpenAI cost', [
            'call_id' => $call->id,
            'model' => $model,
            'input_tokens' => $inputTokens,
            'output_tokens' => $outputTokens,
            'turn_cost' => round($turnCost, 6),
            'total_openai_cost' => round($newOpenAICost, 6),
        ]);
    }
}

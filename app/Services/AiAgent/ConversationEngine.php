<?php

namespace App\Services\AiAgent;

use App\Models\AiAgent;
use App\Models\AiAgentCall;
use Exception;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;

class ConversationEngine
{
    private string $apiKey;
    private string $apiUrl;
    private string $provider;
    private array $fallbackModels;

    public function __construct(AiAgent $agent)
    {
        // Use agent's text provider preference
        if ($agent->text_provider === 'openai') {
            $this->provider = 'openai';
            $this->apiKey = $agent->text_api_key ?: config('services.openai.api_key');
            $this->apiUrl = 'https://api.openai.com/v1';
            $this->fallbackModels = ['gpt-3.5-turbo', 'gpt-4o-mini'];
        } else {
            // Default to OpenRouter
            $this->provider = 'openrouter';
            $this->apiKey = config('openrouter.api_key');
            $this->apiUrl = 'https://openrouter.ai/api/v1';
            $this->fallbackModels = config('openrouter.fallback_models', []);
        }

        if (empty($this->apiKey)) {
            throw new Exception("{$this->provider} API key is not configured for agent {$agent->name}");
        }
    }

    /**
     * Generate AI response for conversation
     */
    public function generateResponse(
        AiAgent $agent,
        AiAgentCall $call,
        string $userMessage
    ): ?array {
        try {
            // Build conversation history
            $messages = $this->buildMessageHistory($agent, $call);
            
            // Add new user message
            $messages[] = [
                'role' => 'user',
                'content' => $userMessage,
            ];

            // Check if should transfer
            if ($agent->shouldTransfer($userMessage)) {
                return [
                    'content' => $this->getTransferMessage($agent),
                    'action' => 'transfer',
                    'transfer_to' => $agent->transfer_number,
                ];
            }

            // Prepare models to try - start with agent's preferred model, then fallback models
            $modelsToTry = [$agent->model];
            
            // Add fallback models if available
            if (!empty($this->fallbackModels)) {
                foreach ($this->fallbackModels as $fallbackModel) {
                    if ($fallbackModel !== $agent->model) {
                        $modelsToTry[] = $fallbackModel;
                    }
                }
            }

            $lastException = null;

            // Try each model in sequence until one succeeds
            foreach ($modelsToTry as $index => $modelName) {
                try {
                    Log::debug('Attempting AI agent conversation', [
                        'model' => $modelName,
                        'attempt' => $index + 1,
                        'total_models' => count($modelsToTry),
                        'agent_id' => $agent->id,
                        'call_id' => $call->id,
                    ]);

                    // Call API with provider-specific headers
                    $headers = [
                        'Authorization' => "Bearer {$this->apiKey}",
                        'Content-Type' => 'application/json',
                    ];
                    
                    // Add OpenRouter-specific headers
                    if ($this->provider === 'openrouter') {
                        $headers['HTTP-Referer'] = config('app.url');
                        $headers['X-Title'] = config('app.name');
                    }
                    
                    // Optimize parameters for lower latency
                    $maxTokens = min((int) $agent->max_tokens, 300); // Cap at 300 for faster responses
                    
                    // Lower timeout for first model to fail fast and try fallback; full timeout for fallbacks
                    $baseTimeout = (int) ($agent->response_timeout ?? 20);
                    $timeout = $index === 0 ? min($baseTimeout, 12) : $baseTimeout;
                    
                    $response = Http::withHeaders($headers)
                        ->timeout($timeout)
                        ->post("{$this->apiUrl}/chat/completions", [
                            'model' => $modelName,
                            'messages' => $messages,
                            'max_tokens' => $maxTokens,
                            'temperature' => (float) $agent->temperature,
                            'stream' => false, // Note: Streaming requires different handling
                            'presence_penalty' => 0.6, // Reduce repetition
                            'frequency_penalty' => 0.3, // Encourage conciseness
                        ]);

                    if ($response->successful()) {
                        $data = $response->json();
                        
                        $content = trim($data['choices'][0]['message']['content'] ?? '');
                        $usage = $data['usage'] ?? [];

                        // Cap length for faster TTS and lower latency (configurable)
                        $maxResponseChars = config('ai-agent.max_response_chars', 500);
                        if ($maxResponseChars > 0 && strlen($content) > $maxResponseChars) {
                            $content = substr($content, 0, $maxResponseChars);
                            $lastSpace = strrpos($content, ' ');
                            if ($lastSpace !== false) {
                                $content = substr($content, 0, $lastSpace);
                            }
                        }

                        if ($content === '') {
                            $lastException = new Exception('Model returned empty content');
                            continue;
                        }

                        Log::debug('AI agent conversation success', [
                            'model' => $modelName,
                            'attempt' => $index + 1,
                            'agent_id' => $agent->id,
                            'call_id' => $call->id,
                        ]);

                        return [
                            'content' => $content,
                            'action' => 'continue',
                            'usage' => $usage,
                            'model' => $modelName,
                        ];
                    }

                    // API returned error status, log and try next model
                    Log::warning('AI agent conversation failed for model', [
                        'model' => $modelName,
                        'attempt' => $index + 1,
                        'status' => $response->status(),
                        'body' => $response->body(),
                        'agent_id' => $agent->id,
                        'call_id' => $call->id,
                    ]);
                    
                    $lastException = new Exception("Model {$modelName} failed: " . $response->status());

                } catch (Exception $e) {
                    Log::warning('AI agent conversation exception for model', [
                        'model' => $modelName,
                        'attempt' => $index + 1,
                        'error' => $e->getMessage(),
                        'agent_id' => $agent->id,
                        'call_id' => $call->id,
                    ]);
                    
                    $lastException = $e;
                    
                    // Continue to next model
                    continue;
                }
            }

            // All models failed
            Log::error('All AI agent conversation models failed', [
                'models_tried' => $modelsToTry,
                'last_error' => $lastException?->getMessage(),
                'agent_id' => $agent->id,
                'call_id' => $call->id,
            ]);

            return null;
        } catch (Exception $e) {
            Log::error('Conversation engine error', [
                'error' => $e->getMessage(),
                'agent_id' => $agent->id,
                'call_id' => $call->id,
            ]);
            return null;
        }
    }

    /**
     * Build message history for context
     */
    private function buildMessageHistory(AiAgent $agent, AiAgentCall $call): array
    {
        $messages = [];

        // Start with the voice AI base instruction (non-negotiable rules)
        // Load from public/voice-ai-base-instruction.md
        $baseInstruction = $this->getVoiceAiBaseInstruction();
        
        // Build the complete system prompt
        $systemPrompt = $baseInstruction;
        
        // Add knowledge base if available: from selected KB or inline text (capped for latency; 0 = no cap)
        $agent->loadMissing('knowledgeBase');
        $kbRaw = $agent->getEffectiveKnowledgeBaseContent();
        if ($kbRaw !== null && $kbRaw !== '') {
            $kb = $kbRaw;
            $maxKbChars = (int) config('ai-agent.max_knowledge_base_chars', 4000);
            if ($maxKbChars > 0 && Str::length($kb) > $maxKbChars) {
                $kb = Str::limit($kb, $maxKbChars);
            }
            $systemPrompt .= "\n\n---\n\nCONTEXT AND KNOWLEDGE BASE:\n" . $kb;
        }
        
        // Add user's custom system prompt (their specific instructions)
        if (!empty($agent->system_prompt)) {
            $systemPrompt .= "\n\n---\n\nCUSTOM INSTRUCTIONS:\n" . 
                           trim($agent->system_prompt);
        }

        // Add system prompt
        $messages[] = [
            'role' => 'system',
            'content' => $systemPrompt,
        ];

        // Add conversation history (last 5 turns for context - optimized for latency)
        $conversations = $call->conversations()
            ->where('role', '!=', 'system')
            ->orderBy('turn_number', 'desc')
            ->limit(5)
            ->get()
            ->reverse();

        foreach ($conversations as $conv) {
            $messages[] = [
                'role' => $conv->role,
                'content' => $conv->content,
            ];
        }

        return $messages;
    }

    /**
     * Get transfer message
     */
    private function getTransferMessage(AiAgent $agent): string
    {
        return config('ai-agent.transfer.confirmation', 
            "I'll transfer you to a human agent right away. Please hold.");
    }

    /**
     * Generate greeting message for new call
     */
    public function generateGreeting(AiAgent $agent): string
    {
        // Use custom first_message if configured
        if (!empty($agent->first_message)) {
            return $agent->first_message;
        }

        // Fallback to default greetings
        $greetings = [
            'inbound' => "Hello! I'm an AI assistant. How can I help you today?",
            'outbound' => "Hello! This is an automated call from " . config('app.name') . ". Do you have a moment to talk?",
        ];

        return $greetings[$agent->type] ?? $greetings['inbound'];
    }

    /**
     * Generate goodbye message
     */
    public function generateGoodbye(AiAgent $agent = null): string
    {
        // Use custom goodbye_message if configured
        if ($agent && !empty($agent->goodbye_message)) {
            return $agent->goodbye_message;
        }

        return "Thank you for your time. Have a great day!";
    }

    /**
     * Get Voice AI Base Instruction
     * Loads from public/voice-ai-base-instruction.md with caching
     */
    private function getVoiceAiBaseInstruction(): string
    {
        // Cache key for the base instruction
        $cacheKey = 'voice_ai_base_instruction';
        
        // Try to get from cache first (cached for 1 hour)
        $cachedInstruction = cache()->get($cacheKey);
        
        if ($cachedInstruction !== null) {
            return $cachedInstruction;
        }
        
        // Load from file
        $filePath = config('ai-agent.voice_ai_base_instruction_file');
        $instruction = '';
        
        if ($filePath && file_exists($filePath)) {
            $instruction = file_get_contents($filePath);
        }
        
        // Cache for 1 hour (3600 seconds)
        if (!empty($instruction)) {
            cache()->put($cacheKey, $instruction, 3600);
        }
        
        return $instruction;
    }

    /**
     * Check if conversation should end
     */
    public function shouldEndConversation(string $userMessage): bool
    {
        $endKeywords = [
            'goodbye',
            'bye',
            'end call',
            'hang up',
            'stop',
            'no thanks',
            'not interested',
        ];

        $message = strtolower(trim($userMessage));
        
        foreach ($endKeywords as $keyword) {
            if (str_contains($message, $keyword)) {
                return true;
            }
        }

        return false;
    }

    /**
     * Test the conversation engine
     */
    public function test(): bool
    {
        try {
            $response = Http::withHeaders([
                'Authorization' => "Bearer {$this->apiKey}",
                'HTTP-Referer' => config('app.url'),
                'X-Title' => config('app.name'),
            ])->get("{$this->apiUrl}/models");

            return $response->successful();
        } catch (Exception $e) {
            Log::error('OpenRouter test failed', ['error' => $e->getMessage()]);
            return false;
        }
    }

    /**
     * Get available models
     */
    public function getAvailableModels(): array
    {
        return config('ai-agent.models', []);
    }
}

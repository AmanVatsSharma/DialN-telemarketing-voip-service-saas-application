<?php

return [
    /*
    |--------------------------------------------------------------------------
    | AI Agent Configuration
    |--------------------------------------------------------------------------
    |
    | Configuration for AI Agent calling features
    |
    */

    /*
    |--------------------------------------------------------------------------
    | Default Settings
    |--------------------------------------------------------------------------
    */
    
    'default_model' => env('AI_AGENT_DEFAULT_MODEL', 'google/gemini-flash-1.5'),
    
    'default_voice' => env('AI_AGENT_DEFAULT_VOICE', 'alloy'),
    
    'max_tokens' => env('AI_AGENT_MAX_TOKENS', 150),

    // Max characters for LLM response before TTS (reduces TTS latency; 0 = no cap)
    'max_response_chars' => env('AI_AGENT_MAX_RESPONSE_CHARS', 500),

    // Max characters of knowledge base included in system prompt (0 = no cap; reduces latency)
    'max_knowledge_base_chars' => env('AI_AGENT_MAX_KNOWLEDGE_BASE_CHARS', 4000),
    
    'temperature' => env('AI_AGENT_TEMPERATURE', 0.7),
    
    'streaming' => env('AI_AGENT_STREAMING', true),
    
    /*
    |--------------------------------------------------------------------------
    | Voice AI Base Instruction File
    |--------------------------------------------------------------------------
    |
    | Path to the markdown file containing the voice AI base instruction.
    | This is ALWAYS prepended to the user's custom system prompt.
    | You can edit: public/voice-ai-base-instruction.md
    |
    */
    
    'voice_ai_base_instruction_file' => public_path('voice-ai-base-instruction.md'),
    
    /*
    |--------------------------------------------------------------------------
    | Available Models (via OpenRouter)
    |--------------------------------------------------------------------------
    */    /*
    |--------------------------------------------------------------------------
    | Available Models (via OpenRouter)
    |--------------------------------------------------------------------------
    */
    
    'openrouter_models' => [
        [
            'id' => 'openai/gpt-oss-20b:free',
            'name' => 'GPT OSS 20B',
            'cost' => 'FREE',
            'cost_per_1k_tokens' => 0,
            'speed' => 'Fast',
            'context' => '8K tokens',
        ],
        [
            'id' => 'deepseek/deepseek-chat-v3.1:free',
            'name' => 'DeepSeek Chat v3.1',
            'cost' => 'FREE',
            'cost_per_1k_tokens' => 0,
            'speed' => 'Fast',
            'context' => '64K tokens',
        ],
        [
            'id' => 'deepseek/deepseek-chat-v3-0324:free',
            'name' => 'DeepSeek Chat v3-0324',
            'cost' => 'FREE',
            'cost_per_1k_tokens' => 0,
            'speed' => 'Fast',
            'context' => '64K tokens',
        ],
        [
            'id' => 'openrouter/polaris-alpha',
            'name' => 'Polaris Alpha',
            'cost' => 'FREE',
            'cost_per_1k_tokens' => 0,
            'speed' => 'Very Fast',
            'context' => '32K tokens',
        ],
        [
            'id' => 'z-ai/glm-4.5-air:free',
            'name' => 'GLM 4.5 Air',
            'cost' => 'FREE',
            'cost_per_1k_tokens' => 0,
            'speed' => 'Fast',
            'context' => '128K tokens',
        ],
        [
            'id' => 'moonshotai/kimi-k2:free',
            'name' => 'Kimi K2',
            'cost' => 'FREE',
            'cost_per_1k_tokens' => 0,
            'speed' => 'Fast',
            'context' => '128K tokens',
        ],
    ],

    /*
    |--------------------------------------------------------------------------
    | Available Models (via OpenAI Direct - BYOC)
    |--------------------------------------------------------------------------
    */
    
    'openai_models' => [
        [
            'id' => 'gpt-3.5-turbo',
            'name' => 'GPT-3.5 Turbo',
            'cost' => '$0.50/$1.50 per 1M',
            'cost_per_1k_tokens' => 0.50,
            'speed' => 'Very Fast',
            'context' => '16K tokens',
        ],
        [
            'id' => 'gpt-4o-mini',
            'name' => 'GPT-4o Mini',
            'cost' => '$0.15/$0.60 per 1M',
            'cost_per_1k_tokens' => 0.15,
            'speed' => 'Very Fast',
            'context' => '128K tokens',
        ],
        [
            'id' => 'gpt-4o',
            'name' => 'GPT-4o',
            'cost' => '$5/$15 per 1M',
            'cost_per_1k_tokens' => 5.00,
            'speed' => 'Fast',
            'context' => '128K tokens',
        ],
        [
            'id' => 'gpt-4-turbo',
            'name' => 'GPT-4 Turbo',
            'cost' => '$10/$30 per 1M',
            'cost_per_1k_tokens' => 10.00,
            'speed' => 'Medium',
            'context' => '128K tokens',
        ],
    ],

    /*
    |--------------------------------------------------------------------------
    | Legacy Models (Deprecated - kept for backward compatibility)
    |--------------------------------------------------------------------------
    */
    
    'models' => [
        [
            'id' => 'google/gemini-flash-1.5',
            'name' => 'Gemini Flash 1.5',
            'cost' => 'FREE',
            'cost_per_1k_tokens' => 0,
            'speed' => 'Very Fast',
            'context' => '1M tokens',
        ],
        [
            'id' => 'google/gemini-flash-2.0',
            'name' => 'Gemini Flash 2.0',
            'cost' => 'FREE',
            'cost_per_1k_tokens' => 0,
            'speed' => 'Ultra Fast',
            'context' => '1M tokens',
        ],
        [
            'id' => 'meta-llama/llama-3.1-8b-instruct',
            'name' => 'Llama 3.1 8B',
            'cost' => 'FREE',
            'cost_per_1k_tokens' => 0,
            'speed' => 'Fast',
            'context' => '128K tokens',
        ],
        [
            'id' => 'meta-llama/llama-3.1-70b-instruct',
            'name' => 'Llama 3.1 70B',
            'cost' => 'FREE',
            'cost_per_1k_tokens' => 0,
            'speed' => 'Medium',
            'context' => '128K tokens',
        ],
        [
            'id' => 'openai/gpt-4o-mini',
            'name' => 'GPT-4o Mini',
            'cost' => '$0.15/1M input, $0.60/1M output',
            'cost_per_1k_tokens' => 0.15,
            'speed' => 'Very Fast',
            'context' => '128K tokens',
        ],
    ],
    
    /*
    |--------------------------------------------------------------------------
    | TTS (Text-to-Speech) Providers
    |--------------------------------------------------------------------------
    */
    
    'tts_providers' => [
        'openai' => [
            'name' => 'OpenAI TTS',
            'api_url' => 'https://api.openai.com/v1/audio/speech',
            'models' => [
                [
                    'id' => 'tts-1',
                    'name' => 'TTS-1 (Standard)',
                    'description' => '⚡ Fastest - Optimized for real-time streaming',
                    'speed' => 'fastest',
                    'quality' => 'standard',
                ],
                [
                    'id' => 'gpt-4o-mini-tts',
                    'name' => 'GPT-4o Mini TTS',
                    'description' => '🎭 Fast + Emotional - Best for conversational agents',
                    'speed' => 'fast',
                    'quality' => 'high',
                ],
            ],
            'default_model' => 'tts-1',
            'voices' => ['alloy', 'ash', 'coral', 'echo', 'fable', 'onyx', 'nova', 'shimmer', 'verse'],
            'formats' => ['mp3', 'opus', 'aac', 'flac'],
            'cost_per_1m_chars' => 15.00, // $15 per 1M characters
        ],
        // Future providers can be added here:
        // 'elevenlabs' => [...],
        // 'google' => [...],
        // 'azure' => [...],
    ],

    /*
    |--------------------------------------------------------------------------
    | Available TTS Voices (OpenAI)
    |--------------------------------------------------------------------------
    */
    
    'voices' => [
        [
            'id' => 'alloy',
            'name' => 'Alloy',
            'description' => 'Neutral, balanced, very popular',
            'gender' => 'Neutral',
        ],
        [
            'id' => 'ash',
            'name' => 'Ash',
            'description' => 'Slightly deeper, calm',
            'gender' => 'Neutral',
        ],
        [
            'id' => 'coral',
            'name' => 'Coral',
            'description' => 'Warm, friendly, natural (great for calls)',
            'gender' => 'Female',
        ],
        [
            'id' => 'echo',
            'name' => 'Echo',
            'description' => 'Clear, confident',
            'gender' => 'Male',
        ],
        [
            'id' => 'verse',
            'name' => 'Verse',
            'description' => 'Expressive, narrative',
            'gender' => 'Male',
        ],
        [
            'id' => 'fable',
            'name' => 'Fable',
            'description' => 'Storytelling tone',
            'gender' => 'Male',
        ],
        [
            'id' => 'onyx',
            'name' => 'Onyx',
            'description' => 'Deep, authoritative',
            'gender' => 'Male',
        ],
        [
            'id' => 'nova',
            'name' => 'Nova',
            'description' => 'Bright, energetic',
            'gender' => 'Female',
        ],
        [
            'id' => 'shimmer',
            'name' => 'Shimmer',
            'description' => 'Light, soft',
            'gender' => 'Female',
        ],
    ],
    
    /*
    |--------------------------------------------------------------------------
    | Prompt Templates
    |--------------------------------------------------------------------------
    */
    
    'templates' => [
        [
            'id' => 'support',
            'name' => 'Customer Support',
            'type' => 'inbound',
            'prompt' => 'You are a helpful customer support AI assistant for DialN. Be friendly, professional, and concise. Answer questions about our automated calling platform. If you can\'t help, offer to transfer to a human agent. Keep responses under 3 sentences.',
        ],
        [
            'id' => 'sales',
            'name' => 'Sales Agent',
            'type' => 'both',
            'prompt' => 'You are a sales AI assistant for DialN. Qualify leads by asking about their business needs, team size, and call volume. Be enthusiastic but not pushy. Schedule demos with qualified leads. Keep responses conversational and under 3 sentences.',
        ],
        [
            'id' => 'survey',
            'name' => 'Survey Bot',
            'type' => 'outbound',
            'prompt' => 'You are conducting a quick customer satisfaction survey. Be polite and brief. Ask the survey questions one at a time and thank them for each response. If they want to stop, thank them and end the call gracefully.',
        ],
        [
            'id' => 'lead_qualification',
            'name' => 'Lead Qualification',
            'type' => 'outbound',
            'prompt' => 'You are reaching out to qualify potential leads. Introduce yourself briefly, confirm their interest, and ask qualifying questions about their business needs. Be respectful of their time. If they\'re not interested, thank them politely and end the call.',
        ],
    ],
    
    /*
    |--------------------------------------------------------------------------
    | Conversation Settings
    |--------------------------------------------------------------------------
    */
    
    'conversation' => [
        'max_turns' => 50, // Maximum conversation turns
        'max_duration' => 600, // Maximum call duration (seconds)
        'silence_timeout' => 10, // Seconds of silence before ending call
        'interrupt_threshold' => 0.5, // Threshold for detecting interruptions
    ],
    
    /*
    |--------------------------------------------------------------------------
    | Default System Prompts
    |--------------------------------------------------------------------------
    */
    
    'prompts' => [
        'inbound_support' => "You are a helpful customer support AI assistant for DialN. Be friendly, professional, and concise. Answer questions about our automated calling platform. If you can't help, offer to transfer to a human agent. Keep responses under 3 sentences.",
        
        'inbound_sales' => "You are a sales AI assistant for DialN. Qualify leads by asking about their business needs, team size, and call volume. Be enthusiastic but not pushy. Schedule demos with qualified leads. Keep responses conversational and under 3 sentences.",
        
        'outbound_survey' => "You are conducting a quick customer satisfaction survey. Be polite and brief. Ask the survey questions one at a time and thank them for each response. If they want to stop, thank them and end the call gracefully.",
        
        'outbound_lead_qualification' => "You are reaching out to qualify potential leads. Introduce yourself briefly, confirm their interest, and ask qualifying questions about their business needs. Be respectful of their time. If they're not interested, thank them politely and end the call.",
    ],
    
    /*
    |--------------------------------------------------------------------------
    | Transfer Settings
    |--------------------------------------------------------------------------
    */
    
    'transfer' => [
        'enabled' => true,
        'keywords' => ['human', 'agent', 'person', 'representative', 'manager', 'speak to someone'],
        'confirmation' => "I'll transfer you to a human agent right away. Please hold.",
    ],
    
    /*
    |--------------------------------------------------------------------------
    | Recording Settings
    |--------------------------------------------------------------------------
    */
    
    'recording' => [
        'enabled' => true,
        'format' => 'mp3',
        'transcribe' => true,
    ],
    
    /*
    |--------------------------------------------------------------------------
    | WebSocket Server Configuration
    |--------------------------------------------------------------------------
    */
    
    'websocket' => [
        'url' => env('WEBSOCKET_URL', 'ws://localhost:8090'),
        'host' => env('WEBSOCKET_HOST', '0.0.0.0'),
        'port' => env('WEBSOCKET_PORT', 8090),
    ],
    
    /*
    |--------------------------------------------------------------------------
    | Cost Tracking
    |--------------------------------------------------------------------------
    */
    
    'cost_tracking' => [
        'enabled' => true,
        'deepgram_cost_per_min' => 0.0043,
        'openai_tts_cost_per_1k_chars' => 0.015,
        'twilio_cost_per_min' => 0.0085,
    ],
];

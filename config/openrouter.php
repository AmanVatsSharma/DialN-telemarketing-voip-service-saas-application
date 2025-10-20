<?php

return [
    /*
    |--------------------------------------------------------------------------
    | OpenRouter API Configuration
    |--------------------------------------------------------------------------
    |
    | Configuration for OpenRouter AI service used for campaign message
    | generation and enhancement.
    |
    */

    'api_key' => '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',

    'api_url' => 'https://openrouter.ai/api/v1/chat/completions',

    'model' => 'openai/gpt-oss-20b:free',

    // Fallback models - tried in order if previous fails
    // This ensures zero failed ratio by switching to next model on error
    'fallback_models' => [
        'openai/gpt-oss-20b:free',
        'deepseek/deepseek-chat-v3.1:free',
        'deepseek/deepseek-chat-v3-0324:free',
        'openrouter/polaris-alpha',
        'z-ai/glm-4.5-air:free',
        'moonshotai/kimi-k2:free',
    ],

    'max_tokens' => 300,

    'temperature' => 0.7,

    'site_url' => env('APP_URL', 'http://localhost'),

    'app_name' => env('APP_NAME', 'DialN'),
];

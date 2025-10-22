<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Third Party Services
    |--------------------------------------------------------------------------
    |
    | This file is for storing the credentials for third party services such
    | as Mailgun, Postmark, AWS and more. This file provides the de facto
    | location for this type of information, allowing packages to have
    | a conventional file to locate the various service credentials.
    |
    */

    'postmark' => [
        'token' => env('POSTMARK_TOKEN'),
    ],

    'ses' => [
        'key' => env('AWS_ACCESS_KEY_ID'),
        'secret' => env('AWS_SECRET_ACCESS_KEY'),
        'region' => env('AWS_DEFAULT_REGION', 'us-east-1'),
    ],

    'resend' => [
        'key' => env('RESEND_KEY'),
    ],

    'slack' => [
        'notifications' => [
            'bot_user_oauth_token' => env('SLACK_BOT_USER_OAUTH_TOKEN'),
            'channel' => env('SLACK_BOT_USER_DEFAULT_CHANNEL'),
        ],
    ],

    'twilio' => [
        'sid' => env('TWILIO_ACCOUNT_SID'),
        'token' => env('TWILIO_AUTH_TOKEN'),
        'phone_number' => env('TWILIO_PHONE_NUMBER'),
        'verify_service_sid' => env('TWILIO_VERIFY_SERVICE_SID'), // For Twilio Verify API
    ],

    'stripe' => [
        'secret' => env('STRIPE_SECRET_KEY'),
        'public' => env('STRIPE_PUBLIC_KEY'),
        'webhook_secret' => env('STRIPE_WEBHOOK_SECRET'),
        'test_mode' => env('STRIPE_TEST_MODE', true),
        'fee_percentage' => env('STRIPE_FEE_PERCENTAGE', 2.9),
        'fee_fixed' => env('STRIPE_FEE_FIXED', 0.30),
    ],

    'openai' => [
        'api_key' => env('OPENAI_API_KEY'),
        'use_direct' => env('AI_AGENT_USE_OPENAI', true),
        'tts_model' => env('OPENAI_TTS_MODEL', 'tts-1'),
        'tts_voice' => env('OPENAI_TTS_VOICE', 'alloy'),
    ],

    'razorpay' => [
        'api_key' => env('RAZORPAY_API_KEY'),
        'secret_key' => env('RAZORPAY_SECRET_KEY'),
        'webhook_secret' => env('RAZORPAY_WEBHOOK_SECRET'),
        'test_mode' => env('RAZORPAY_TEST_MODE', true),
        'fee_percentage' => env('RAZORPAY_FEE_PERCENTAGE', 2.0),
        'fee_fixed' => env('RAZORPAY_FEE_FIXED', 0.0),
    ],

];

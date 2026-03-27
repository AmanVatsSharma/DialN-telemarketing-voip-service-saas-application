<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Actions\Twilio\GenerateTwilioTokenAction;

/*
|--------------------------------------------------------------------------
| Twilio WebRTC Routes
|--------------------------------------------------------------------------
|
| Routes for Twilio Client SDK integration (browser-based calling)
|
*/

Route::middleware('auth')->prefix('api/twilio')->group(function () {
    
    /**
     * Generate access token for Twilio Device SDK
     * Used by frontend to initialize WebRTC calling
     */
    Route::get('/token', function (Request $request) {
        try {
            $user = $request->user();
            $action = new GenerateTwilioTokenAction();
            $token = $action->execute($user);
            
            return response()->json([
                'token' => $token,
                'identity' => 'user_' . $user->id,
                'expires_in' => 3600, // 1 hour
            ]);
        } catch (\Exception $e) {
            \Log::error('Failed to generate Twilio token', [
                'error' => $e->getMessage(),
                'user_id' => $request->user()->id
            ]);
            
            return response()->json([
                'error' => 'Failed to generate access token: ' . $e->getMessage()
            ], 500);
        }
    })->name('twilio.token');
    
    /**
     * Refresh access token (same as generate, but semantically different)
     */
    Route::post('/token/refresh', function (Request $request) {
        try {
            $user = $request->user();
            $action = new GenerateTwilioTokenAction();
            $token = $action->execute($user);
            
            return response()->json([
                'token' => $token,
                'identity' => 'user_' . $user->id,
                'expires_in' => 3600,
            ]);
        } catch (\Exception $e) {
            \Log::error('Failed to refresh Twilio token', [
                'error' => $e->getMessage(),
                'user_id' => $request->user()->id
            ]);
            
            return response()->json([
                'error' => 'Failed to refresh token: ' . $e->getMessage()
            ], 500);
        }
    })->name('twilio.token.refresh');
    
    /**
     * Get Twilio configuration status
     */
    Route::get('/status', function (Request $request) {
        $config = \App\Models\TwilioGlobalConfig::active();
        
        return response()->json([
            'configured' => $config !== null,
            'account_sid' => $config?->account_sid,
            'has_api_key' => $config && $config->api_key_sid !== null,
            'has_twiml_app' => $config && $config->twiml_app_sid !== null,
            'verified' => $config?->verified_at !== null,
        ]);
    })->name('twilio.status');
});

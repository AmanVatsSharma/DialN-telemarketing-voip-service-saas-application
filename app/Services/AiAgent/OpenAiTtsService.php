<?php

namespace App\Services\AiAgent;

use App\Models\AiAgent;
use Exception;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class OpenAiTtsService
{
    private string $provider;
    private string $apiKey;
    private string $apiUrl;
    private string $model;
    private string $voice;
    private AiAgent $agent;

    public function __construct(AiAgent $agent)
    {
        $this->agent = $agent;
        $this->provider = $agent->tts_provider ?? 'openai';
        
        // Get TTS provider configuration
        $providerConfig = config("ai-agent.tts_providers.{$this->provider}");
        
        if (!$providerConfig) {
            throw new Exception("TTS provider '{$this->provider}' is not configured");
        }

        // Use agent's TTS API key, fallback to platform key if not set
        $this->apiKey = $agent->tts_api_key ?: config('services.openai.api_key');
        $this->apiUrl = $providerConfig['api_url'];
        
        // Use agent's selected TTS model, fallback to default
        $this->model = $agent->tts_model ?? $providerConfig['default_model'];
        
        $this->voice = config('ai-agent.default_voice', $providerConfig['voices'][0]);

        if (empty($this->apiKey)) {
            throw new Exception("TTS API key is not configured for provider '{$this->provider}'");
        }
    }

    /**
     * Generate speech from text
     * 
     * @param string $text Text to convert to speech
     * @param string|null $voice Voice to use (alloy, echo, fable, onyx, nova, shimmer)
     * @param string $format Output format (mp3, opus, aac, flac)
     * @return array|null ['audio' => base64_encoded_audio, 'format' => 'mp3']
     */
    public function generateSpeech(
        string $text,
        ?string $voice = null,
        string $format = 'mp3'
    ): ?array {
        try {
            $voice = $voice ?? $this->voice;

            $payload = [
                'model' => $this->model,
                'input' => $text,
                'voice' => $voice,
                'response_format' => $format,
                'speed' => 1.15, // Slightly faster for reduced latency (0.25 to 4.0)
            ];

            // Add instructions only for gpt-4o-mini-tts model
            if ($this->model === 'gpt-4o-mini-tts' && !empty($this->agent->tts_instructions)) {
                $payload['instructions'] = $this->agent->tts_instructions;
            }

            $response = Http::withHeaders([
                'Authorization' => "Bearer {$this->apiKey}",
                'Content-Type' => 'application/json',
            ])->post($this->apiUrl, $payload);

            if ($response->successful()) {
                return [
                    'audio' => base64_encode($response->body()),
                    'format' => $format,
                    'size' => strlen($response->body()),
                ];
            }

            Log::error('OpenAI TTS failed', [
                'status' => $response->status(),
                'body' => $response->body(),
            ]);

            return null;
        } catch (Exception $e) {
            Log::error('OpenAI TTS error', [
                'error' => $e->getMessage(),
                'text' => $text,
            ]);
            return null;
        }
    }

    /**
     * Generate speech and save to file
     */
    public function generateAndSave(
        string $text,
        string $filename,
        ?string $voice = null
    ): ?string {
        try {
            $result = $this->generateSpeech($text, $voice, 'mp3');
            
            if (!$result) {
                return null;
            }

            $audioData = base64_decode($result['audio']);
            $path = "ai-agent-audio/{$filename}.mp3";
            
            Storage::disk('public')->put($path, $audioData);
            
            return Storage::disk('public')->url($path);
        } catch (Exception $e) {
            Log::error('Failed to save TTS audio', [
                'error' => $e->getMessage(),
                'filename' => $filename,
            ]);
            return null;
        }
    }

    /**
     * Stream audio for real-time playback
     * For Twilio, we need to convert to μ-law format
     */
    public function generateForTwilio(string $text, ?string $voice = null): ?string
    {
        try {
            $voice = $voice ?? $this->voice;
            
            // Create cache key from text and voice
            $cacheKey = 'tts:' . md5($text . $voice);
            
            // Cache for 24 hours (common responses like greetings/goodbyes)
            return Cache::remember($cacheKey, 86400, function () use ($text, $voice) {
                // Generate MP3
                $result = $this->generateSpeech($text, $voice, 'mp3');
                
                if (!$result) {
                    return null;
                }

                // For real-time streaming to Twilio, we need μ-law encoded audio
                // This would typically require ffmpeg conversion
                // For now, return base64 encoded audio that can be played via TwiML
                
                return $result['audio'];
            });
        } catch (Exception $e) {
            Log::error('Failed to generate Twilio audio', [
                'error' => $e->getMessage(),
            ]);
            return null;
        }
    }

    /**
     * Estimate cost for text-to-speech
     */
    public function estimateCost(string $text): float
    {
        $charCount = strlen($text);
        $costPer1kChars = config('ai-agent.cost_tracking.openai_tts_cost_per_1k_chars', 0.015);
        
        return ($charCount / 1000) * $costPer1kChars;
    }

    /**
     * Get available voices
     */
    public function getAvailableVoices(): array
    {
        return config('ai-agent.voices', [
            'alloy' => 'Alloy (Neutral)',
            'echo' => 'Echo (Male)',
            'fable' => 'Fable (British Male)',
            'onyx' => 'Onyx (Deep Male)',
            'nova' => 'Nova (Female)',
            'shimmer' => 'Shimmer (Soft Female)',
        ]);
    }

    /**
     * Test the TTS service
     */
    public function test(): bool
    {
        try {
            $result = $this->generateSpeech('This is a test.', 'alloy');
            return $result !== null;
        } catch (Exception $e) {
            Log::error('OpenAI TTS test failed', ['error' => $e->getMessage()]);
            return false;
        }
    }
}

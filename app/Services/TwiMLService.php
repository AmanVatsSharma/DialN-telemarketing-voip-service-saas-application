<?php

declare(strict_types=1);

namespace App\Services;

use App\Models\Campaign;
use Twilio\TwiML\VoiceResponse;

class TwiMLService
{
    /**
     * Generate TwiML for text-to-speech
     */
    public function generateTts(
        string $text,
        array $options = []
    ): string {
        $response = new VoiceResponse();
        
        $voice = $options['voice'] ?? 'Polly.Joanna';
        $language = $options['language'] ?? 'en-US';
        $enableDtmf = $options['enable_dtmf'] ?? false;
        $enableRecording = $options['enable_recording'] ?? false;

        // Say the message
        $response->say(
            $text,
            [
                'voice' => $voice,
                'language' => $language,
            ]
        );

        // Add DTMF gathering if enabled
        if ($enableDtmf) {
            $gather = $response->gather([
                'numDigits' => $options['dtmf_digits'] ?? 1,
                'timeout' => $options['dtmf_timeout'] ?? 5,
                'action' => $options['dtmf_callback'] ?? route('twilio.webhook.dtmf'),
                'method' => 'POST',
            ]);

            $gather->say(
                $options['dtmf_prompt'] ?? 'Press any key to respond.',
                [
                    'voice' => $voice,
                    'language' => $language,
                ]
            );
        }

        // Add recording if enabled
        if ($enableRecording) {
            $response->record([
                'maxLength' => $options['recording_max_length'] ?? 30,
                'action' => $options['recording_callback'] ?? route('twilio.webhook.recording'),
                'method' => 'POST',
            ]);
        }

        return (string) $response;
    }

    /**
     * Generate TwiML for voice file playback
     */
    public function generateVoicePlayback(
        string $audioUrl,
        array $options = []
    ): string {
        $response = new VoiceResponse();
        
        $enableDtmf = $options['enable_dtmf'] ?? false;
        $enableRecording = $options['enable_recording'] ?? false;

        // Play the audio file
        $response->play($audioUrl);

        // Add DTMF gathering if enabled
        if ($enableDtmf) {
            $gather = $response->gather([
                'numDigits' => $options['dtmf_digits'] ?? 1,
                'timeout' => $options['dtmf_timeout'] ?? 5,
                'action' => $options['dtmf_callback'] ?? route('twilio.webhook.dtmf'),
                'method' => 'POST',
            ]);

            $gather->say(
                $options['dtmf_prompt'] ?? 'Press any key to respond.'
            );
        }

        // Add recording if enabled
        if ($enableRecording) {
            $response->record([
                'maxLength' => $options['recording_max_length'] ?? 30,
                'action' => $options['recording_callback'] ?? route('twilio.webhook.recording'),
                'method' => 'POST',
            ]);
        }

        return (string) $response;
    }

    /**
     * Generate TwiML for campaign call
     */
    public function generateCampaignTwiml(
        Campaign $campaign,
        array $contactData = [],
        ?int $callId = null
    ): string {
        $response = new VoiceResponse();

        // Answer delay if configured
        if ($campaign->answer_delay_seconds > 0) {
            $response->pause(['length' => $campaign->answer_delay_seconds]);
        }

        if ($campaign->type === 'text_to_speech') {
            // Replace variables in script
            $text = $this->replaceVariables($campaign->script_text, $contactData);
            
            $voice = $this->getVoiceName($campaign->voice_gender, $campaign->voice_language);

            if ($campaign->enable_dtmf && $campaign->dtmf_prompt) {
                // Say main message first
                $response->say(
                    $text,
                    [
                        'voice' => $voice,
                        'language' => $campaign->voice_language,
                    ]
                );
            } else {
                $response->say(
                    $text,
                    [
                        'voice' => $voice,
                        'language' => $campaign->voice_language,
                    ]
                );
            }
        } else {
            // Voice to voice - play audio file
            $response->play(url($campaign->audio_file_path));
        }

        // Add DTMF if enabled
        if ($campaign->enable_dtmf) {
            $dtmfUrl = route('twilio.webhook.dtmf') . '?call_id=' . $callId;
            
            $gather = $response->gather([
                'numDigits' => $campaign->dtmf_num_digits ?? 1,
                'timeout' => $campaign->dtmf_timeout ?? 5,
                'action' => $dtmfUrl,
                'method' => 'POST',
            ]);

            $voice = $this->getVoiceName($campaign->voice_gender ?? 'female', $campaign->voice_language);
            
            // Use custom DTMF prompt or default
            $dtmfPrompt = $campaign->dtmf_prompt ?? 'Press a key to respond.';
            
            $gather->say(
                $dtmfPrompt,
                [
                    'voice' => $voice,
                    'language' => $campaign->voice_language,
                ]
            );
        }

        // Add recording if enabled
        if ($campaign->enable_recording) {
            $recordingUrl = route('twilio.webhook.recording') . '?call_id=' . $callId;
            
            $response->record([
                'maxLength' => $campaign->recording_max_length ?? 300,
                'action' => $recordingUrl,
                'method' => 'POST',
            ]);
        }

        return (string) $response;
    }

    /**
     * Generate TwiML for Softphone
     */
    public function generateManualCallTwiml(
        string $phoneNumber,
        array $options = []
    ): string {
        $response = new VoiceResponse();

        $dial = $response->dial('', [
            'timeout' => $options['timeout'] ?? 60,
            'record' => $options['record'] ?? 'do-not-record',
            'recordingStatusCallback' => $options['recording_callback'] ?? null,
        ]);

        $dial->number($phoneNumber);

        return (string) $response;
    }

    /**
     * Generate TwiML for DTMF response
     */
    public function generateDtmfResponse(string $digit): string
    {
        $response = new VoiceResponse();

        switch ($digit) {
            case '1':
                $response->say('Connecting you to a representative. Please hold.');
                // In production, connect to agent queue
                break;
            case '2':
                $response->say('You have been removed from our list. Goodbye.');
                $response->hangup();
                break;
            default:
                $response->say('Invalid selection. Goodbye.');
                $response->hangup();
        }

        return (string) $response;
    }

    /**
     * Generate TwiML for error handling
     */
    public function generateErrorResponse(string $message = null): string
    {
        $response = new VoiceResponse();
        
        $message = $message ?? 'We apologize, but an error occurred. Please try again later.';
        
        $response->say($message);
        $response->hangup();

        return (string) $response;
    }

    /**
     * Generate TwiML for transferring call to another number
     */
    public function generateTransfer(string $phoneNumber, string $message = null): string
    {
        $response = new VoiceResponse();
        
        if ($message) {
            $response->say($message);
        }
        
        $dial = $response->dial('', [
            'timeout' => 30,
            'record' => 'do-not-record',
        ]);
        
        $dial->number($phoneNumber);

        return (string) $response;
    }

    /**
     * Replace variables in text with contact data
     */
    private function replaceVariables(string $text, array $contactData): string
    {
        foreach ($contactData as $key => $value) {
            $text = str_replace('{{' . $key . '}}', $value, $text);
        }

        return $text;
    }

    /**
     * Get Twilio Polly voice name based on gender and language
     */
    private function getVoiceName(string $gender, string $language): string
    {
        $voices = [
            'en-US' => [
                'male' => 'Polly.Matthew',
                'female' => 'Polly.Joanna',
                'neutral' => 'Polly.Kendra',
            ],
            'en-GB' => [
                'male' => 'Polly.Brian',
                'female' => 'Polly.Amy',
                'neutral' => 'Polly.Emma',
            ],
            'es-ES' => [
                'male' => 'Polly.Enrique',
                'female' => 'Polly.Conchita',
                'neutral' => 'Polly.Lucia',
            ],
            'fr-FR' => [
                'male' => 'Polly.Mathieu',
                'female' => 'Polly.Celine',
                'neutral' => 'Polly.Lea',
            ],
        ];

        return $voices[$language][$gender] ?? 'Polly.Joanna';
    }
}

<?php

namespace App\Services\SMS;

use App\Models\User;
use App\Models\TwilioCredential;
use Twilio\Rest\Client;
use Twilio\Security\RequestValidator;
use Exception;
use Illuminate\Support\Facades\Log;

class TwilioSMSProvider implements SMSProviderInterface
{
    private ?Client $client = null;
    private ?TwilioCredential $credential = null;

    public function initializeForUser(User $user): self
    {
        $credential = $user->getActiveTwilioCredential();

        if (!$credential) {
            throw new Exception('No active Twilio credentials found for user.');
        }

        $this->credential = $credential;
        $this->client = new Client(
            $credential->account_sid,
            $credential->auth_token
        );

        return $this;
    }

    public function initialize(TwilioCredential $credential): self
    {
        $this->credential = $credential;
        $this->client = new Client(
            $credential->account_sid,
            $credential->auth_token
        );

        return $this;
    }

    public function send(string $from, string $to, string $message, array $options = []): array
    {
        try {
            if (!$this->client) {
                throw new Exception('Twilio client not initialized.');
            }

            $params = [
                'from' => $from,
                'body' => $message,
            ];

            if (!empty($options['media_urls'])) {
                $params['mediaUrl'] = $options['media_urls'];
            }

            $twilioMessage = $this->client->messages->create($to, $params);

            return [
                'success' => true,
                'message_id' => $twilioMessage->sid,
                'status' => $twilioMessage->status,
                'cost' => $twilioMessage->price ? abs((float) $twilioMessage->price) : null,
                'num_segments' => $twilioMessage->numSegments ?? 1,
                'error' => null,
            ];
        } catch (Exception $e) {
            Log::error('Twilio SMS send failed', [
                'from' => $from,
                'to' => $to,
                'error' => $e->getMessage(),
            ]);

            return [
                'success' => false,
                'message_id' => null,
                'status' => 'failed',
                'cost' => null,
                'num_segments' => 1,
                'error' => $e->getMessage(),
            ];
        }
    }

    public function sendBatch(string $from, array $recipients, array $options = []): array
    {
        $results = [];
        $successCount = 0;
        $failedCount = 0;

        foreach ($recipients as $recipient) {
            $to = $recipient['to'];
            $message = $recipient['message'];
            
            $result = $this->send($from, $to, $message, $options);
            
            if ($result['success']) {
                $successCount++;
            } else {
                $failedCount++;
            }
            
            $results[] = [
                'to' => $to,
                'result' => $result,
            ];
        }

        return [
            'success' => $successCount,
            'failed' => $failedCount,
            'total' => count($recipients),
            'results' => $results,
        ];
    }

    public function getStatus(string $messageId): array
    {
        try {
            if (!$this->client) {
                throw new Exception('Twilio client not initialized.');
            }

            $message = $this->client->messages($messageId)->fetch();

            return [
                'status' => $message->status,
                'delivered_at' => $message->dateSent ? $message->dateSent->format('Y-m-d H:i:s') : null,
                'error' => $message->errorMessage,
                'error_code' => $message->errorCode,
            ];
        } catch (Exception $e) {
            Log::error('Twilio SMS status check failed', [
                'message_id' => $messageId,
                'error' => $e->getMessage(),
            ]);

            return [
                'status' => 'unknown',
                'delivered_at' => null,
                'error' => $e->getMessage(),
                'error_code' => null,
            ];
        }
    }

    public function validateWebhook(array $payload, string $signature): bool
    {
        try {
            if (!$this->credential) {
                return false;
            }

            $validator = new RequestValidator($this->credential->auth_token);
            $url = request()->fullUrl();
            
            return $validator->validate($signature, $url, $payload);
        } catch (Exception $e) {
            Log::error('Twilio webhook validation failed', ['error' => $e->getMessage()]);
            return false;
        }
    }

    public function parseIncoming(array $payload): array
    {
        return [
            'from' => $payload['From'] ?? '',
            'to' => $payload['To'] ?? '',
            'body' => $payload['Body'] ?? '',
            'message_id' => $payload['MessageSid'] ?? '',
            'timestamp' => now()->toDateTimeString(),
            'num_segments' => $payload['NumSegments'] ?? 1,
            'media_urls' => $this->extractMediaUrls($payload),
        ];
    }

    private function extractMediaUrls(array $payload): array
    {
        $mediaUrls = [];
        $numMedia = (int) ($payload['NumMedia'] ?? 0);

        for ($i = 0; $i < $numMedia; $i++) {
            if (isset($payload["MediaUrl{$i}"])) {
                $mediaUrls[] = $payload["MediaUrl{$i}"];
            }
        }

        return $mediaUrls;
    }

    public function getName(): string
    {
        return 'twilio';
    }

    public function supportsMMS(): bool
    {
        return true;
    }
}

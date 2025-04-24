<?php

declare(strict_types=1);

namespace App\Actions\Calls;

use App\Models\Call;
use App\Models\TwilioGlobalConfig;
use Exception;
use Illuminate\Support\Facades\Log;
use Twilio\Rest\Client;

class EndCallAction
{
    /**
     * End an active call using global Twilio configuration
     */
    public function execute(Call $call): bool
    {
        if (!$call->isInProgress()) {
            throw new Exception('Call is not in progress and cannot be ended.');
        }

        // Get global Twilio configuration
        $config = TwilioGlobalConfig::active();

        if (!$config) {
            throw new Exception('No active Twilio configuration found.');
        }

        // Initialize Twilio client with global credentials
        $client = new Client(
            $config->account_sid,
            $config->getDecryptedAuthToken()
        );

        try {
            // Update call status to completed via Twilio
            $client->calls($call->twilio_call_sid)
                ->update(['status' => 'completed']);

            $call->update([
                'status' => 'canceled',
                'ended_at' => now(),
            ]);

            Log::info('Call ended', [
                'call_id' => $call->id,
                'twilio_call_sid' => $call->twilio_call_sid,
            ]);

            return true;
        } catch (\Exception $e) {
            Log::error('Failed to end call', [
                'call_id' => $call->id,
                'error' => $e->getMessage(),
            ]);

            return false;
        }
    }
}

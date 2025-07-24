<?php

declare(strict_types=1);

namespace App\Jobs;

use App\Models\Campaign;
use App\Models\CampaignContact;
use App\Models\Call;
use App\Models\MessageVariant;
use App\Services\TwilioService;
use App\Services\CreditService;
use App\Services\PhoneValidationService;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;

class MakeCampaignCallJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public int $tries = 1; // Retries handled manually
    public int $timeout = 120; // 2 minutes
    public int $maxExceptions = 2;

    /**
     * Create a new job instance.
     */
    public function __construct(
        public Campaign $campaign,
        public CampaignContact $contact
    ) {
        // Use dedicated queue for campaign calls
        $this->queue = 'campaign-calls';
    }

    /**
     * Execute the job.
     */
    public function handle(
        TwilioService $twilioService,
        CreditService $creditService,
        PhoneValidationService $phoneValidator
    ): void {
        // Check if campaign is still running
        $this->campaign->refresh();

        if ($this->campaign->status !== 'running') {
            Log::info("Campaign {$this->campaign->id} is not running, skipping call");
            $this->contact->update(['status' => 'pending']); // Reset to pending
            return;
        }

        // Check if contact already called
        $this->contact->refresh();
        if ($this->contact->status === 'completed' || $this->contact->status === 'failed') {
            return;
        }

        try {
            // 1. CHECK USER CREDITS FIRST (before any API call)
            $user = $this->campaign->user;
            if (!$creditService->canAfford($user, 1.0)) {
                Log::warning("Insufficient credits for campaign {$this->campaign->id}, pausing campaign");
                
                // Pause the campaign
                $this->campaign->update([
                    'status' => 'paused',
                    'paused_at' => now(),
                ]);

                // Reset contact to pending
                $this->contact->update(['status' => 'pending']);
                
                return;
            }

            // 2. VALIDATE AND SANITIZE PHONE NUMBER
            $phoneResult = $phoneValidator->sanitize($this->contact->phone_number);
            
            if (!$phoneResult['success']) {
                // Invalid phone number - skip this contact
                Log::error("Invalid phone number for contact {$this->contact->id}: {$phoneResult['error']}");
                
                $this->contact->update([
                    'status' => 'failed',
                    'call_attempts' => $this->contact->call_attempts + 1,
                ]);

                // Don't deduct credits for invalid numbers
                return;
            }

            $sanitizedNumber = $phoneResult['formatted'];

            // 3. GET TWILIO CREDENTIALS
            $credentials = $this->campaign->user->twilioCredential;

            if (!$credentials) {
                throw new \Exception('No Twilio credentials found for user');
            }

            // 4. CREATE CALL RECORD
            $call = Call::create([
                'user_id' => $this->campaign->user_id,
                'campaign_id' => $this->campaign->id,
                'campaign_contact_id' => $this->contact->id,
                'message_variant_id' => $this->selectMessageVariant(),
                'to_number' => $sanitizedNumber, // Use sanitized number
                'from_number' => $this->campaign->from_number,
                'status' => 'initiated',
                'direction' => 'outbound',
                'call_type' => 'campaign',
                'enable_recording' => $this->campaign->enable_recording,
                'enable_dtmf' => $this->campaign->enable_dtmf,
            ]);

            // 5. PREPARE CALL PARAMETERS
            $callParams = $this->prepareCallParameters($call->id);

            // 6. INITIALIZE TWILIO
            $twilioService->initializeForUser($this->campaign->user);

            // 7. MAKE CALL VIA TWILIO
            $twilioResult = $twilioService->initiateCall(
                $sanitizedNumber, // Use sanitized number
                $this->campaign->from_number,
                $callParams['twiml_url'],
                [
                    'statusCallback' => route('webhooks.twilio.call.status', ['call_id' => $call->id]),
                    'record' => $this->campaign->enable_recording,
                ]
            );

            if (!$twilioResult['success']) {
                // Check if it's a critical Twilio error
                $errorMessage = $twilioResult['error'] ?? 'Unknown error';
                
                if ($this->isCriticalTwilioError($errorMessage)) {
                    // Critical error - pause campaign
                    Log::error("Critical Twilio error for campaign {$this->campaign->id}: {$errorMessage}");
                    
                    $this->campaign->update([
                        'status' => 'paused',
                        'paused_at' => now(),
                    ]);
                    
                    throw new \Exception($errorMessage);
                }
                
                // Non-critical error - skip this contact and continue
                Log::warning("Twilio call failed for contact {$this->contact->id}: {$errorMessage}");
                
                $this->contact->update([
                    'status' => 'failed',
                    'call_attempts' => $this->contact->call_attempts + 1,
                ]);
                
                // Mark call as failed
                $call->update(['status' => 'failed']);
                
                // Don't deduct credits for failed calls
                return;
            }

            // 8. CALL INITIATED SUCCESSFULLY - DEDUCT CREDITS
            $deductResult = $creditService->deductCredit(
                $user,
                1.0,
                "Campaign call to {$sanitizedNumber}",
                [
                    'service_type' => 'call',
                    'reference_type' => 'Call',
                    'reference_id' => $call->id,
                    'metadata' => [
                        'campaign_id' => $this->campaign->id,
                        'contact_id' => $this->contact->id,
                    ],
                ]
            );

            if (!$deductResult) {
                // This shouldn't happen as we checked credits earlier
                Log::error("Failed to deduct credits after successful call initiation");
            }

            // 9. UPDATE CALL WITH TWILIO SID
            // Map Twilio status to our enum values
            $twilioStatus = $twilioResult['status'];
            $mappedStatus = match($twilioStatus) {
                'queued', 'initiated' => 'initiated',
                'ringing' => 'ringing',
                'in-progress', 'answered' => 'in-progress',
                'completed' => 'completed',
                'busy' => 'busy',
                'no-answer', 'no_answer' => 'no-answer',
                'failed' => 'failed',
                'canceled', 'cancelled' => 'canceled',
                default => 'initiated',
            };
            
            $call->update([
                'twilio_call_sid' => $twilioResult['call_sid'],
                'status' => $mappedStatus,
            ]);

            // 10. UPDATE CONTACT STATUS
            $this->contact->update([
                'status' => 'in_progress',
                'call_attempts' => $this->contact->call_attempts + 1,
                'last_call_at' => now(),
            ]);

            Log::info("Call initiated successfully for campaign {$this->campaign->id}, contact {$this->contact->id}, credits deducted");
            
        } catch (\Exception $e) {
            Log::error("Failed to make call for campaign {$this->campaign->id}, contact {$this->contact->id}: {$e->getMessage()}");

            // Handle retry logic
            $this->handleCallFailure($e);
        }
    }

    /**
     * Check if the error is critical (should pause campaign)
     */
    private function isCriticalTwilioError(string $errorMessage): bool
    {
        $criticalErrors = [
            'authenticate',
            'credentials',
            'suspended',
            'disabled',
            'account',
            'permission',
            'unauthorized',
        ];

        $lowerError = strtolower($errorMessage);
        
        foreach ($criticalErrors as $keyword) {
            if (str_contains($lowerError, $keyword)) {
                return true;
            }
        }

        return false;
    }

    /**
     * Prepare call parameters based on campaign type
     */
    private function prepareCallParameters(int $callId): array
    {
        // Check if campaign has AI agent assigned
        if ($this->campaign->ai_agent_id) {
            // Use AI agent conversation endpoint
            $twimlUrl = route('twiml.campaign.ai-agent') . '?call_id=' . $callId;
        } elseif ($this->campaign->type === 'text_to_speech') {
            // Use TTS TwiML endpoint with call_id as query parameter
            $twimlUrl = route('twiml.campaign.tts') . '?call_id=' . $callId;
        } else {
            // Use voice file TwiML endpoint with call_id as query parameter
            $twimlUrl = route('twiml.campaign.voice') . '?call_id=' . $callId;
        }

        return [
            'twiml_url' => $twimlUrl,
        ];
    }

    /**
     * Handle call failure and retry logic
     */
    private function handleCallFailure(\Exception $exception): void
    {
        $this->contact->refresh();

        if ($this->contact->call_attempts < $this->campaign->retry_attempts) {
            // Schedule retry
            $this->contact->update([
                'status' => 'pending',
                'call_attempts' => $this->contact->call_attempts + 1,
            ]);

            // Dispatch retry job with delay
            MakeCampaignCallJob::dispatch($this->campaign, $this->contact)
                ->delay(now()->addMinutes($this->campaign->retry_delay_minutes));

            Log::info("Scheduled retry for contact {$this->contact->id} in {$this->campaign->retry_delay_minutes} minutes");
        } else {
            // Max retries reached, mark as failed
            $this->contact->update([
                'status' => 'failed',
            ]);

            // Update campaign stats
            $this->campaign->increment('total_failed');

            Log::warning("Contact {$this->contact->id} failed after {$this->contact->call_attempts} attempts");
        }
    }

    /**
     * Handle a job failure.
     */
    public function failed(\Throwable $exception): void
    {
        Log::error("MakeCampaignCallJob failed for contact {$this->contact->id}: {$exception->getMessage()}");

        $this->handleCallFailure($exception);
    }

    /**
     * Select a message variant for A/B testing
     * Returns variant ID if variants exist and are active, null otherwise
     */
    private function selectMessageVariant(): ?int
    {
        try {
            // Get all active variants for this campaign
            $activeVariants = MessageVariant::where('campaign_id', $this->campaign->id)
                ->where('is_active', true)
                ->get();

            if ($activeVariants->isEmpty()) {
                return null; // No variants, use default message
            }

            // If there's a winner, use it exclusively
            $winner = $activeVariants->where('is_winner', true)->first();
            if ($winner) {
                $winner->recordUsage();
                return $winner->id;
            }

            // A/B testing: randomly select from active variants
            // Weight selection slightly towards better performers if they have data
            $variantId = $this->weightedRandomSelection($activeVariants);
            
            // Record usage
            $selectedVariant = $activeVariants->find($variantId);
            if ($selectedVariant) {
                $selectedVariant->recordUsage();
            }

            return $variantId;
        } catch (\Exception $e) {
            Log::error('Failed to select message variant', [
                'campaign_id' => $this->campaign->id,
                'error' => $e->getMessage(),
            ]);
            return null; // Fall back to default message
        }
    }

    /**
     * Weighted random selection based on variant performance
     * Better performers get slightly higher chance (80% equal, 20% weighted)
     */
    private function weightedRandomSelection($variants): int
    {
        // If any variant has < 10 sends, do pure random for fair testing
        $minSends = $variants->min('sent_count');
        if ($minSends < 10) {
            return $variants->random()->id;
        }

        // 80% chance: pure random (ensures fair testing)
        if (rand(1, 100) <= 80) {
            return $variants->random()->id;
        }

        // 20% chance: weighted by effectiveness score
        $totalScore = $variants->sum('effectiveness_score');
        if ($totalScore == 0) {
            return $variants->random()->id;
        }

        $random = rand(1, (int)($totalScore * 100)) / 100;
        $cumulative = 0;

        foreach ($variants as $variant) {
            $cumulative += $variant->effectiveness_score;
            if ($random <= $cumulative) {
                return $variant->id;
            }
        }

        return $variants->last()->id;
    }
}

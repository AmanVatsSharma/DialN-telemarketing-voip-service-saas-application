<?php

namespace App\Services;

use App\Models\User;
use App\Models\Transaction;
use App\Services\Payment\PaymentGatewayInterface;
use App\Services\Payment\StripePaymentGateway;
use App\Services\Payment\RazorpayPaymentGateway;
use Illuminate\Support\Facades\Log;

class PaymentService
{
    protected CreditService $creditService;

    public function __construct(CreditService $creditService)
    {
        $this->creditService = $creditService;
    }

    /**
     * Get payment gateway instance.
     */
    public function getGateway(string $gateway = 'stripe'): PaymentGatewayInterface
    {
        return match($gateway) {
            'stripe' => new StripePaymentGateway(),
            'razorpay' => new RazorpayPaymentGateway(),
            default => throw new \Exception('Unsupported payment gateway: ' . $gateway),
        };
    }

    /**
     * Create a checkout session for top-up.
     *
     * @param User $user
     * @param float $amount
     * @param string $currency
     * @param string $gateway
     * @return array
     */
    public function createTopUpCheckout(User $user, float $amount, string $currency = 'USD', string $gateway = 'stripe'): array
    {
        // Validate minimum amount
        $minAmount = 5.00;
        if ($amount < $minAmount) {
            throw new \Exception("Minimum top-up amount is $minAmount $currency");
        }

        $gatewayInstance = $this->getGateway($gateway);

        // Verify currency is supported
        if (!in_array($currency, $gatewayInstance->getSupportedCurrencies())) {
            throw new \Exception("Currency $currency is not supported by $gateway");
        }

        // Create pending transaction
        $transaction = Transaction::create([
            'user_id' => $user->id,
            'type' => 'credit',
            'amount' => $amount,
            'currency' => $currency,
            'balance_before' => $user->credit_balance,
            'balance_after' => $user->credit_balance, // Will be updated when payment completes
            'description' => 'Credit top-up',
            'reference_type' => 'TopUp',
            'payment_gateway' => $gateway,
            'status' => 'pending',
            'metadata' => [
                'initiated_at' => now()->toDateTimeString(),
            ],
        ]);

        // Create checkout session
        $checkout = $gatewayInstance->createCheckoutSession($amount, $currency, [
            'user_id' => $user->id,
            'transaction_id' => $transaction->id,
            'customer_email' => $user->email,
        ]);

        // Update transaction with payment ID
        $transaction->update([
            'payment_id' => $checkout['payment_id'] ?? $checkout['session_id'],
            'metadata' => array_merge($transaction->metadata ?? [], [
                'session_id' => $checkout['session_id'],
            ]),
        ]);

        Log::info('Checkout session created', [
            'user_id' => $user->id,
            'amount' => $amount,
            'currency' => $currency,
            'gateway' => $gateway,
            'transaction_id' => $transaction->id,
        ]);

        return [
            'transaction_id' => $transaction->id,
            'checkout_url' => $checkout['checkout_url'],
            'session_id' => $checkout['session_id'],
        ];
    }

    /**
     * Complete a transaction manually (e.g., from success callback).
     */
    public function completeTransaction(Transaction $transaction, string $paymentId): void
    {
        if ($transaction->status === 'completed') {
            Log::info('Transaction already completed', ['transaction_id' => $transaction->id]);
            return;
        }

        $user = $transaction->user;

        // Add credit to user account
        $this->creditService->addCredit(
            $user,
            $transaction->amount,
            'Credit top-up completed',
            [
                'currency' => $transaction->currency,
                'reference_type' => 'TopUp',
                'reference_id' => $transaction->id,
                'payment_gateway' => $transaction->payment_gateway,
                'payment_id' => $paymentId,
                'metadata' => [
                    'original_transaction_id' => $transaction->id,
                    'completed_at' => now()->toDateTimeString(),
                    'completion_method' => 'callback',
                ],
            ]
        );

        // Update original pending transaction
        $transaction->update([
            'status' => 'completed',
            'payment_id' => $paymentId,
            'balance_after' => $user->fresh()->credit_balance,
            'metadata' => array_merge($transaction->metadata ?? [], [
                'completed_at' => now()->toDateTimeString(),
                'completion_method' => 'callback',
            ]),
        ]);

        Log::info('Transaction completed via callback', [
            'transaction_id' => $transaction->id,
            'user_id' => $user->id,
            'amount' => $transaction->amount,
            'payment_id' => $paymentId,
        ]);
    }

    /**
     * Handle payment webhook.
     *
     * @param string $gateway
     * @param string $payload
     * @param string $signature
     * @return void
     */
    public function handleWebhook(string $gateway, string $payload, string $signature): void
    {
        $gatewayInstance = $this->getGateway($gateway);

        try {
            $event = $gatewayInstance->handleWebhook($payload, $signature);

            Log::info('Webhook received', [
                'gateway' => $gateway,
                'event_type' => $event['event_type'],
                'payment_id' => $event['payment_id'],
            ]);

            // Find transaction by payment ID
            $transaction = Transaction::where('payment_id', $event['payment_id'])
                ->where('payment_gateway', $gateway)
                ->first();

            if (!$transaction) {
                Log::warning('Transaction not found for webhook', [
                    'payment_id' => $event['payment_id'],
                    'gateway' => $gateway,
                ]);
                return;
            }

            // Handle different event types
            match($event['event_type']) {
                'payment.success' => $this->handlePaymentSuccess($transaction, $event),
                'payment.failed' => $this->handlePaymentFailed($transaction, $event),
                'refund.completed' => $this->handleRefundCompleted($transaction, $event),
                default => Log::info('Unhandled webhook event', ['event_type' => $event['event_type']]),
            };

        } catch (\Exception $e) {
            Log::error('Webhook handling failed', [
                'gateway' => $gateway,
                'error' => $e->getMessage(),
            ]);
            throw $e;
        }
    }

    /**
     * Handle successful payment.
     */
    protected function handlePaymentSuccess(Transaction $transaction, array $event): void
    {
        if ($transaction->status === 'completed') {
            Log::info('Payment already processed', ['transaction_id' => $transaction->id]);
            return;
        }

        $user = $transaction->user;

        // Add credit to user account
        $this->creditService->addCredit(
            $user,
            $transaction->amount,
            'Credit top-up completed',
            [
                'currency' => $transaction->currency,
                'reference_type' => 'TopUp',
                'reference_id' => $transaction->id,
                'payment_gateway' => $transaction->payment_gateway,
                'payment_id' => $transaction->payment_id,
                'metadata' => [
                    'original_transaction_id' => $transaction->id,
                    'webhook_event' => $event['event_type'],
                    'completed_at' => now()->toDateTimeString(),
                ],
            ]
        );

        // Update original pending transaction
        $transaction->update([
            'status' => 'completed',
            'metadata' => array_merge($transaction->metadata ?? [], [
                'completed_at' => now()->toDateTimeString(),
                'webhook_event' => $event['event_type'],
            ]),
        ]);

        // Send notification (implement later)
        // Notification::send($user, new PaymentSuccessNotification($transaction));

        Log::info('Payment success processed', [
            'transaction_id' => $transaction->id,
            'user_id' => $user->id,
            'amount' => $transaction->amount,
        ]);
    }

    /**
     * Handle failed payment.
     */
    protected function handlePaymentFailed(Transaction $transaction, array $event): void
    {
        $transaction->update([
            'status' => 'failed',
            'metadata' => array_merge($transaction->metadata ?? [], [
                'failed_at' => now()->toDateTimeString(),
                'error_message' => $event['error_message'] ?? 'Payment failed',
                'webhook_event' => $event['event_type'],
            ]),
        ]);

        // Send notification (implement later)
        // Notification::send($transaction->user, new PaymentFailedNotification($transaction));

        Log::warning('Payment failed', [
            'transaction_id' => $transaction->id,
            'user_id' => $transaction->user_id,
            'error' => $event['error_message'] ?? 'Unknown error',
        ]);
    }

    /**
     * Handle completed refund.
     */
    protected function handleRefundCompleted(Transaction $transaction, array $event): void
    {
        $user = $transaction->user;

        // Deduct refunded amount from user balance
        try {
            $this->creditService->deductCredit(
                $user,
                $event['amount'],
                'Refund processed',
                [
                    'currency' => $transaction->currency,
                    'reference_type' => 'Refund',
                    'reference_id' => $transaction->id,
                    'payment_gateway' => $transaction->payment_gateway,
                    'payment_id' => $transaction->payment_id,
                    'metadata' => [
                        'original_transaction_id' => $transaction->id,
                        'webhook_event' => $event['event_type'],
                        'refunded_at' => now()->toDateTimeString(),
                    ],
                ]
            );

            $transaction->update([
                'status' => 'refunded',
                'metadata' => array_merge($transaction->metadata ?? [], [
                    'refunded_at' => now()->toDateTimeString(),
                    'webhook_event' => $event['event_type'],
                ]),
            ]);

            Log::info('Refund processed', [
                'transaction_id' => $transaction->id,
                'user_id' => $user->id,
                'amount' => $event['amount'],
            ]);

        } catch (\Exception $e) {
            Log::error('Refund processing failed', [
                'transaction_id' => $transaction->id,
                'error' => $e->getMessage(),
            ]);
        }
    }

    /**
     * Process a refund.
     *
     * @param Transaction $transaction
     * @param float|null $amount
     * @return array
     */
    public function processRefund(Transaction $transaction, ?float $amount = null): array
    {
        if ($transaction->status !== 'completed') {
            throw new \Exception('Can only refund completed transactions');
        }

        if ($transaction->type !== 'credit') {
            throw new \Exception('Can only refund credit transactions');
        }

        $gatewayInstance = $this->getGateway($transaction->payment_gateway);

        $refund = $gatewayInstance->refund($transaction->payment_id, $amount);

        Log::info('Refund initiated', [
            'transaction_id' => $transaction->id,
            'refund_id' => $refund['refund_id'],
            'amount' => $refund['amount'],
        ]);

        return $refund;
    }

    /**
     * Get supported currencies.
     */
    public function getSupportedCurrencies(string $gateway = 'stripe'): array
    {
        $gatewayInstance = $this->getGateway($gateway);
        return $gatewayInstance->getSupportedCurrencies();
    }

    /**
     * Get available payment gateways.
     */
    public function getAvailableGateways(): array
    {
        $gateways = [];
        
        // Check if Stripe is configured
        if ($this->isGatewayConfigured('stripe')) {
            try {
                $gateways[] = [
                    'id' => 'stripe',
                    'name' => 'Stripe',
                    'icon' => '/images/stripe-icon.png',
                    'supported_currencies' => $this->getSupportedCurrencies('stripe'),
                ];
            } catch (\Exception $e) {
                Log::error('Failed to get Stripe currencies', ['error' => $e->getMessage()]);
            }
        }
        
        // Check if Razorpay is configured
        if ($this->isGatewayConfigured('razorpay')) {
            try {
                $gateways[] = [
                    'id' => 'razorpay',
                    'name' => 'Razorpay',
                    'icon' => '/images/razorpay-icon.png',
                    'supported_currencies' => $this->getSupportedCurrencies('razorpay'),
                ];
            } catch (\Exception $e) {
                Log::error('Failed to get Razorpay currencies', ['error' => $e->getMessage()]);
            }
        }
        
        return $gateways;
    }
    
    /**
     * Check if a payment gateway is configured.
     */
    public function isGatewayConfigured(string $gateway): bool
    {
        return match($gateway) {
            'stripe' => !empty(config('services.stripe.secret')) && !empty(config('services.stripe.public')),
            'razorpay' => !empty(config('services.razorpay.api_key')) && !empty(config('services.razorpay.secret_key')),
            default => false,
        };
    }
}

<?php

namespace App\Http\Controllers;

use App\Services\PaymentService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class PaymentController extends Controller
{
    protected PaymentService $paymentService;

    public function __construct(PaymentService $paymentService)
    {
        $this->paymentService = $paymentService;
    }

    /**
     * Create a checkout session.
     */
    public function createCheckout(Request $request)
    {
        $validated = $request->validate([
            'amount' => 'required|numeric|min:5|max:10000',
            'currency' => 'required|string|size:3',
            'gateway' => 'nullable|string|in:stripe,razorpay',
        ]);

        $user = $request->user();
        $gateway = $validated['gateway'] ?? 'stripe';

        try {
            $checkout = $this->paymentService->createTopUpCheckout(
                $user,
                $validated['amount'],
                $validated['currency'],
                $gateway
            );

            return response()->json([
                'success' => true,
                'checkout_url' => $checkout['checkout_url'],
                'transaction_id' => $checkout['transaction_id'],
            ]);

        } catch (\Exception $e) {
            Log::error('Checkout creation failed', [
                'user_id' => $user->id,
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);

            // Return user-friendly message
            $message = 'Payment system is currently unavailable. Please try again later or contact support.';
            
            // Check for specific configuration issues
            if (str_contains($e->getMessage(), 'not configured') || str_contains($e->getMessage(), 'STRIPE_SECRET_KEY')) {
                $message = 'Payment processing is not yet configured. Please contact support for assistance.';
            }

            return response()->json([
                'success' => false,
                'message' => $message,
            ], 400);
        }
    }

    /**
     * Handle payment webhook.
     */
    public function handleWebhook(Request $request, string $gateway)
    {
        try {
            $payload = $request->getContent();
            $signature = $request->header('Stripe-Signature'); // For Stripe

            $this->paymentService->handleWebhook($gateway, $payload, $signature);

            return response()->json(['success' => true]);

        } catch (\Exception $e) {
            Log::error('Webhook handling failed', [
                'gateway' => $gateway,
                'error' => $e->getMessage(),
            ]);

            return response()->json(['error' => $e->getMessage()], 400);
        }
    }

    /**
     * Payment success page.
     */
    public function success(Request $request)
    {
        $sessionId = $request->query('session_id');
        $paymentId = $request->query('payment_id');
        $signature = $request->query('signature');

        // If we have Razorpay payment details, verify and complete the payment
        if ($paymentId && $sessionId) {
            try {
                // Find transaction by order ID
                $transaction = \App\Models\Transaction::where('payment_id', $sessionId)
                    ->where('payment_gateway', 'razorpay')
                    ->where('status', 'pending')
                    ->first();

                if ($transaction) {
                    // Verify payment with Razorpay
                    $gateway = $this->paymentService->getGateway('razorpay');
                    
                    // For Razorpay, we need to verify the payment on server side
                    // Get payment details to verify it's successful
                    $paymentDetails = $gateway->getTransactionDetails($paymentId);
                    
                    if ($paymentDetails['status'] === 'captured' || $paymentDetails['status'] === 'authorized') {
                        // Payment is successful, complete the transaction
                        $this->paymentService->completeTransaction($transaction, $paymentId);
                        
                        // Refresh transaction to get updated data
                        $transaction->refresh();
                        
                        return Inertia::render('Credit/PaymentSuccess', [
                            'amount' => $transaction->amount,
                            'transactionId' => $transaction->id,
                            'paymentId' => $paymentId,
                            'gateway' => 'razorpay',
                        ]);
                    }
                }
            } catch (\Exception $e) {
                Log::error('Razorpay payment verification failed', [
                    'payment_id' => $paymentId,
                    'order_id' => $sessionId,
                    'error' => $e->getMessage(),
                ]);
            }
        }

        return Inertia::render('Credit/PaymentSuccess', [
            'sessionId' => $sessionId,
        ]);
    }

    /**
     * Payment cancel page.
     */
    public function cancel(Request $request)
    {
        return Inertia::render('Credit/PaymentCancel');
    }

    /**
     * Process a refund (admin only).
     */
    public function refund(Request $request, int $transactionId)
    {
        $validated = $request->validate([
            'amount' => 'nullable|numeric|min:0.01',
        ]);

        try {
            $transaction = \App\Models\Transaction::findOrFail($transactionId);

            // Check permissions (should be admin only)
            if (!$request->user()->hasRole('admin')) {
                return response()->json(['error' => 'Unauthorized'], 403);
            }

            $refund = $this->paymentService->processRefund(
                $transaction,
                $validated['amount'] ?? null
            );

            return response()->json([
                'success' => true,
                'refund' => $refund,
            ]);

        } catch (\Exception $e) {
            Log::error('Refund processing failed', [
                'transaction_id' => $transactionId,
                'error' => $e->getMessage(),
            ]);

            return response()->json([
                'success' => false,
                'message' => $e->getMessage(),
            ], 400);
        }
    }
}


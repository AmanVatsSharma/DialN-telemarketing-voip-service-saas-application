<?php

namespace Tests\Feature;

use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Config;
use App\Services\Payment\StripePaymentGateway;
use App\Services\PaymentService;

class StripeConfigTest extends TestCase
{
    /**
     * Test if Stripe is configured with the necessary credentials.
     */
    public function test_stripe_credentials_are_configured(): void
    {
        $secretKey = config('services.stripe.secret');
        $publicKey = config('services.stripe.public');
        
        $this->assertNotEmpty($secretKey, 'STRIPE_SECRET_KEY is not set in .env file');
        $this->assertNotEmpty($publicKey, 'STRIPE_PUBLIC_KEY is not set in .env file');
        
        // Check if it's a test key or live key
        $isTestKey = str_starts_with($secretKey, 'sk_test_');
        $isLiveKey = str_starts_with($secretKey, 'sk_live_');
        
        $this->assertTrue(
            $isTestKey || $isLiveKey,
            'STRIPE_SECRET_KEY does not appear to be a valid Stripe secret key (should start with sk_test_ or sk_live_)'
        );
        
        echo "\n✓ Stripe Secret Key is configured" . ($isTestKey ? ' (TEST MODE)' : ' (LIVE MODE)');
        echo "\n✓ Stripe Public Key is configured\n";
    }

    /**
     * Test if Stripe gateway can be instantiated.
     */
    public function test_stripe_gateway_can_be_instantiated(): void
    {
        try {
            $gateway = new StripePaymentGateway();
            $this->assertInstanceOf(StripePaymentGateway::class, $gateway);
            echo "\n✓ Stripe Gateway instantiated successfully\n";
        } catch (\Exception $e) {
            $this->fail('Failed to instantiate Stripe Gateway: ' . $e->getMessage());
        }
    }

    /**
     * Test Stripe configuration values.
     */
    public function test_stripe_configuration_values(): void
    {
        $config = config('services.stripe');
        
        $this->assertIsArray($config);
        $this->assertArrayHasKey('secret', $config);
        $this->assertArrayHasKey('public', $config);
        $this->assertArrayHasKey('test_mode', $config);
        $this->assertArrayHasKey('fee_percentage', $config);
        $this->assertArrayHasKey('fee_fixed', $config);
        
        echo "\n✓ All Stripe config keys are present";
        echo "\n  - Test Mode: " . ($config['test_mode'] ? 'YES' : 'NO');
        echo "\n  - Fee Percentage: " . $config['fee_percentage'] . '%';
        echo "\n  - Fee Fixed: $" . $config['fee_fixed'] . "\n";
    }

    /**
     * Test if PaymentService can get available gateways.
     */
    public function test_payment_service_can_get_available_gateways(): void
    {
        try {
            $creditService = app(\App\Services\CreditService::class);
            $paymentService = new PaymentService($creditService);
            $gateways = $paymentService->getAvailableGateways();
            
            $this->assertIsArray($gateways);
            $this->assertNotEmpty($gateways, 'No payment gateways available');
            
            // Check if Stripe is in the available gateways
            $stripeGateway = collect($gateways)->firstWhere('id', 'stripe');
            $this->assertNotNull($stripeGateway, 'Stripe gateway is not available');
            
            echo "\n✓ Payment Service can retrieve available gateways";
            echo "\n  - Found " . count($gateways) . " gateway(s)\n";
            
            foreach ($gateways as $gateway) {
                echo "    • " . $gateway['name'] . " (" . $gateway['id'] . ")\n";
            }
        } catch (\Exception $e) {
            $this->fail('Failed to get available gateways: ' . $e->getMessage());
        }
    }

    /**
     * Test Stripe API connection by verifying supported currencies.
     */
    public function test_stripe_api_connection(): void
    {
        try {
            $gateway = new StripePaymentGateway();
            $currencies = $gateway->getSupportedCurrencies();
            
            $this->assertIsArray($currencies);
            $this->assertNotEmpty($currencies, 'No supported currencies returned from Stripe');
            $this->assertContains('USD', $currencies, 'USD should be in supported currencies');
            
            echo "\n✓ Stripe API connection successful";
            echo "\n  - Supported currencies: " . count($currencies);
            echo "\n  - Sample currencies: " . implode(', ', array_slice($currencies, 0, 10)) . "...\n";
        } catch (\Exception $e) {
            $this->fail('Failed to connect to Stripe API: ' . $e->getMessage());
        }
    }

    /**
     * Test webhook secret configuration (optional but recommended).
     */
    public function test_stripe_webhook_secret_configuration(): void
    {
        $webhookSecret = config('services.stripe.webhook_secret');
        
        if (empty($webhookSecret)) {
            $this->markTestSkipped('Webhook secret is not configured (optional for basic setup)');
        }
        
        $this->assertNotEmpty($webhookSecret);
        $this->assertTrue(
            str_starts_with($webhookSecret, 'whsec_'),
            'STRIPE_WEBHOOK_SECRET does not appear to be a valid Stripe webhook secret (should start with whsec_)'
        );
        
        echo "\n✓ Stripe Webhook Secret is configured\n";
    }
}

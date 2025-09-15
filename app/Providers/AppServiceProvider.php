<?php

namespace App\Providers;

use App\Models\UserKycVerification;
use App\Policies\KycPolicy;
use App\Services\TwiMLService;
use App\Services\TwilioService;
use App\Services\WebhookHandlerService;
use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Schema;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        // Register Twilio services as singletons
        $this->app->singleton(TwilioService::class, function ($app) {
            return new TwilioService();
        });

        $this->app->singleton(TwiMLService::class, function ($app) {
            return new TwiMLService();
        });

        $this->app->singleton(WebhookHandlerService::class, function ($app) {
            return new WebhookHandlerService();
        });
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Schema::defaultStringLength(191);
        
        // Register policies
        Gate::policy(UserKycVerification::class, KycPolicy::class);
        
        // Auto-update APP_URL when running via web
        if (!app()->runningInConsole() && !app()->environment('testing')) {
            $this->updateAppUrlIfNeeded();
        }
    }

    /**
     * Update APP_URL in .env if it differs from current request
     */
    protected function updateAppUrlIfNeeded(): void
    {
        try {
            $currentUrl = request()->getSchemeAndHttpHost();
            $configUrl = config('app.url');

            if ($currentUrl !== $configUrl) {
                $this->updateEnvFile('APP_URL', $currentUrl);
                config(['app.url' => $currentUrl]);
                \Log::info("APP_URL automatically updated to: {$currentUrl}");
            }
        } catch (\Exception $e) {
            \Log::error("Failed to update APP_URL: " . $e->getMessage());
        }
    }

    /**
     * Update .env file with new value
     */
    protected function updateEnvFile(string $key, string $value): void
    {
        $envPath = base_path('.env');

        if (!file_exists($envPath)) {
            return;
        }

        $envContent = file_get_contents($envPath);

        if (preg_match("/^{$key}=.*/m", $envContent)) {
            $newContent = preg_replace(
                "/^{$key}=.*/m",
                "{$key}={$value}",
                $envContent
            );
        } else {
            $newContent = preg_replace(
                '/(^APP_DEBUG=.*$)/m',
                "$1\n{$key}={$value}",
                $envContent
            );
        }

        file_put_contents($envPath, $newContent);
    }
}

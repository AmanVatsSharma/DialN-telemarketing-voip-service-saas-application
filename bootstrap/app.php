<?php

use App\Http\Middleware\CheckInstalled;
use App\Http\Middleware\CheckOwnership;
use App\Http\Middleware\CheckPermission;
use App\Http\Middleware\CheckRole;
use App\Http\Middleware\HandleAppearance;
use App\Http\Middleware\HandleInertiaRequests;
use App\Http\Middleware\ThrottleApiRequests;
use App\Http\Middleware\UpdateAppUrl;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Http\Middleware\AddLinkHeadersForPreloadedAssets;
use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Support\Facades\Route;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        api: __DIR__.'/../routes/api.php',
        commands: __DIR__.'/../routes/console.php',
        channels: __DIR__.'/../routes/channels.php',
        health: '/up',
        apiPrefix: 'api',
        then: function () {
            Route::middleware('web')
                ->group(base_path('routes/install.php'));
            
            Route::middleware('web')
                ->group(base_path('routes/kyc.php'));
        }
    )
    ->withMiddleware(function (Middleware $middleware) {
        $middleware->encryptCookies(except: ['appearance', 'sidebar_state']);

        $middleware->validateCsrfTokens(except: [
            'webhooks/twilio/*',
            'webhooks/payment/*',
            'twiml/*',
            'sanctum/csrf-cookie', // Allow this endpoint to set CSRF cookie
        ]);

        // Ensure stateful API
        $middleware->statefulApi();

        // Prepend CheckInstalled to run before session middleware
        $middleware->web(prepend: [
            CheckInstalled::class,
            UpdateAppUrl::class,
        ]);

        $middleware->web(append: [
            HandleAppearance::class,
            HandleInertiaRequests::class,
            AddLinkHeadersForPreloadedAssets::class,
        ]);

        // Register role and permission middleware aliases
        $middleware->alias([
            'role' => CheckRole::class,
            'permission' => CheckPermission::class,
            'ownership' => CheckOwnership::class,
            'throttle.api' => ThrottleApiRequests::class,
            'kyc' => \App\Http\Middleware\CheckKycTier::class,
        ]);
    })
    ->withSchedule(function (Schedule $schedule) {
        // Auto-launch scheduled campaigns when their time arrives
        $schedule->call(function () {
            $campaigns = \App\Models\Campaign::where('status', 'scheduled')
                ->where('scheduled_at', '<=', now())
                ->whereNull('started_at')
                ->get();
            
            foreach ($campaigns as $campaign) {
                try {
                    app(\App\Actions\Campaigns\LaunchCampaignAction::class)->execute($campaign);
                    \Illuminate\Support\Facades\Log::info("Auto-launched scheduled campaign: {$campaign->id}");
                } catch (\Exception $e) {
                    \Illuminate\Support\Facades\Log::error("Failed to auto-launch campaign {$campaign->id}: {$e->getMessage()}");
                }
            }
        })->everyMinute()->name('launch-scheduled-campaigns');

        // Process running campaigns every minute
        $schedule->call(function () {
            $campaigns = \App\Models\Campaign::where('status', 'running')->get();
            foreach ($campaigns as $campaign) {
                \App\Jobs\ProcessCampaignJob::dispatch($campaign);
            }
        })->everyMinute()->name('process-campaigns');

        // Sync available Twilio numbers daily at 3 AM
        $schedule->command('twilio:sync-numbers')->dailyAt('03:00');
        
        // Charge monthly phone number fees on the 1st of each month at 2 AM
        $schedule->command('phone-numbers:charge-monthly')
            ->monthlyOn(1, '02:00')
            ->name('charge-monthly-phone-numbers');
    })
    ->withExceptions(function (Exceptions $exceptions) {
        // Only integrate Sentry if the package is installed
        if (class_exists(\Sentry\Laravel\Integration::class)) {
            \Sentry\Laravel\Integration::handles($exceptions);
        }
    })->create();

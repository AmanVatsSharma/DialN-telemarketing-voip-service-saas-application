<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class UpdateAppUrl
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $currentUrl = $request->getSchemeAndHttpHost();
        $configUrl = config('app.url');

        // Only update if URL has changed and we're not in testing
        if ($currentUrl !== $configUrl && !app()->environment('testing')) {
            $this->updateEnvFile('APP_URL', $currentUrl);
            
            // Update config in memory for current request
            config(['app.url' => $currentUrl]);
        }

        return $next($request);
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

        try {
            $envContent = file_get_contents($envPath);

            // Check if key exists
            if (preg_match("/^{$key}=.*/m", $envContent)) {
                // Update existing key
                $newContent = preg_replace(
                    "/^{$key}=.*/m",
                    "{$key}={$value}",
                    $envContent
                );
            } else {
                // Add new key after APP_DEBUG
                $newContent = preg_replace(
                    '/(^APP_DEBUG=.*$)/m',
                    "$1\n{$key}={$value}",
                    $envContent
                );
            }

            // Write back to file
            file_put_contents($envPath, $newContent);

            // Log the update
            \Log::info("APP_URL automatically updated to: {$value}");
        } catch (\Exception $e) {
            // Silently fail to not break the application
            \Log::error("Failed to update APP_URL: " . $e->getMessage());
        }
    }
}

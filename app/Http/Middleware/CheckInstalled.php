<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Symfony\Component\HttpFoundation\Response;

class CheckInstalled
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $installedFile = public_path('.installed');

        // If not installed, use file-based sessions to avoid database dependency
        if (!file_exists($installedFile)) {
            // Set file sessions in runtime config
            config(['session.driver' => 'file']);
            
            // Also update .env file to persist this setting
            $this->ensureFileSessionsInEnv();
            
            // Redirect to installer (except if already on install routes)
            if (!$request->is('install*')) {
                return redirect('/install');
            }
        }

        // If already installed and trying to access installer, redirect to dashboard
        if (file_exists($installedFile) && $request->is('install*')) {
            return redirect('/dashboard');
        }

        return $next($request);
    }

    /**
     * Ensure .env file uses file sessions AND file cache during installation
     */
    private function ensureFileSessionsInEnv(): void
    {
        $envFile = base_path('.env');
        
        if (!File::exists($envFile)) {
            return;
        }
        
        $envContent = File::get($envFile);
        $updated = false;
        
        // Update session driver to file if set to database
        if (preg_match('/^SESSION_DRIVER=database/m', $envContent)) {
            $envContent = preg_replace(
                '/^SESSION_DRIVER=.*/m',
                'SESSION_DRIVER=file',
                $envContent
            );
            $updated = true;
        }
        
        // Update cache store to file if set to database
        if (preg_match('/^CACHE_STORE=database/m', $envContent)) {
            $envContent = preg_replace(
                '/^CACHE_STORE=.*/m',
                'CACHE_STORE=file',
                $envContent
            );
            $updated = true;
        }
        
        // Update queue connection to sync if set to database
        if (preg_match('/^QUEUE_CONNECTION=database/m', $envContent)) {
            $envContent = preg_replace(
                '/^QUEUE_CONNECTION=.*/m',
                'QUEUE_CONNECTION=sync',
                $envContent
            );
            $updated = true;
        }
        
        if ($updated) {
            File::put($envFile, $envContent);
            
            // Clear config cache to pick up the changes
            $configCache = base_path('bootstrap/cache/config.php');
            if (File::exists($configCache)) {
                @File::delete($configCache);
            }
        }
    }
}

<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class UpdateAppUrl extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:update-url {url? : The URL to set as APP_URL}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Update APP_URL in .env file based on current request or provided URL';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $envPath = base_path('.env');

        if (!file_exists($envPath)) {
            $this->error('.env file not found!');
            return 1;
        }

        // Get URL from argument or detect from request
        $url = $this->argument('url');
        
        if (!$url) {
            $url = $this->detectUrl();
        }

        if (!$url) {
            $this->error('Could not detect URL. Please provide URL as argument.');
            return 1;
        }

        // Validate URL
        if (!filter_var($url, FILTER_VALIDATE_URL)) {
            $this->error('Invalid URL format: ' . $url);
            return 1;
        }

        // Read current .env content
        $envContent = file_get_contents($envPath);

        // Update APP_URL
        if (preg_match('/^APP_URL=.*/m', $envContent)) {
            $newContent = preg_replace(
                '/^APP_URL=.*/m',
                'APP_URL=' . $url,
                $envContent
            );
        } else {
            // If APP_URL doesn't exist, add it after APP_DEBUG
            $newContent = preg_replace(
                '/(^APP_DEBUG=.*$)/m',
                "$1\nAPP_URL=" . $url,
                $envContent
            );
        }

        // Write back to .env
        file_put_contents($envPath, $newContent);

        $this->info('APP_URL updated successfully to: ' . $url);
        
        // Clear config cache
        $this->call('config:clear');
        
        return 0;
    }

    /**
     * Detect URL from current environment
     */
    protected function detectUrl(): ?string
    {
        // Try to get from current config (might be set via web request)
        if (app()->runningInConsole()) {
            // If running in console, try to detect from server
            $host = gethostname();
            $protocol = 'http';
            
            // Check if we're in a typical local development environment
            if (str_contains($host, 'localhost') || str_contains($host, '127.0.0.1')) {
                return 'http://localhost';
            }
            
            return null;
        }

        // If running via web, get from request
        return request()->getSchemeAndHttpHost();
    }
}

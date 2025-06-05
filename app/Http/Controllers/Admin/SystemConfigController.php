<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class SystemConfigController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/SystemConfig/Index', [
            'config' => $this->getConfig(),
        ]);
    }

    public function update(Request $request)
    {
        // Log the incoming request for debugging
        \Log::info('System Config Update Request', [
            'section' => $request->section,
            'config' => $request->config,
            'all_data' => $request->all(),
        ]);

        $request->validate([
            'section' => 'required|in:stripe,razorpay,mail,application',
            'config' => 'required|array',
            'logo' => 'nullable|image|mimes:png,jpg,jpeg,svg|max:2048',
            'favicon' => 'nullable|image|mimes:png,jpg,jpeg,ico|max:1024',
        ]);

        $section = $request->section;
        
        try {
            switch ($section) {
                case 'stripe':
                    $this->updateStripeConfig($request->config);
                    break;
                case 'razorpay':
                    $this->updateRazorpayConfig($request->config);
                    break;
                case 'mail':
                    $this->updateMailConfig($request->config);
                    break;
                case 'application':
                    $this->updateApplicationConfig($request->config, $request->file('logo'), $request->file('favicon'));
                    // Clear all caches when app name or logo changes
                    Cache::flush();
                    Artisan::call('view:clear');
                    Artisan::call('config:clear');
                    break;
            }

            // Clear config cache
            Artisan::call('config:clear');

            \Log::info('System Config Updated Successfully', ['section' => $section]);

            return back()->with('success', ucfirst($section) . ' configuration updated successfully.');
        } catch (\Exception $e) {
            \Log::error('System Config Update Failed', [
                'section' => $section,
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);
            return back()->with('error', 'Failed to update configuration: ' . $e->getMessage());
        }
    }

    private function getConfig()
    {
        return [
            'stripe' => [
                'key' => config('services.stripe.public') ?? '',
                'secret' => config('services.stripe.secret') ? '••••••••' : '',
            ],
            'razorpay' => [
                'key' => config('services.razorpay.key') ?? '',
                'secret' => config('services.razorpay.secret') ? '••••••••' : '',
                'webhook_secret' => config('services.razorpay.webhook_secret') ? '••••••••' : '',
                'test_mode' => config('services.razorpay.test_mode', true),
            ],
            'mail' => [
                'mailer' => config('mail.default') ?? 'log',
                'host' => config('mail.mailers.smtp.host') ?? '127.0.0.1',
                'port' => config('mail.mailers.smtp.port') ?? 2525,
                'username' => config('mail.mailers.smtp.username') ?? 'null',
                'password' => config('mail.mailers.smtp.password') ? '••••••••' : '',
                'encryption' => config('mail.mailers.smtp.encryption') ?? 'tls',
                'from_address' => config('mail.from.address') ?? 'hello@example.com',
                'from_name' => config('mail.from.name') ?? config('app.name'),
            ],
            'application' => [
                'name' => config('app.name') ?? 'DialN AI',
                'url' => config('app.url') ?? '',
                'timezone' => config('app.timezone') ?? 'UTC',
                'locale' => config('app.locale') ?? 'en',
                'debug' => config('app.debug') ?? false,
                'environment' => config('app.env') ?? 'production',
                'logo' => \App\Helpers\AppHelper::getLogoUrl(),
                'favicon' => \App\Helpers\AppHelper::getFaviconUrl(),
            ],
        ];
    }

    private function updateStripeConfig(array $config)
    {
        $this->updateEnvFile([
            'STRIPE_PUBLIC_KEY' => $config['key'] ?? '',
            'STRIPE_SECRET_KEY' => $config['secret'] !== '••••••••' ? $config['secret'] : null,
        ]);
    }

    private function updateRazorpayConfig(array $config)
    {
        $this->updateEnvFile([
            'RAZORPAY_API_KEY' => $config['key'] ?? '',
            'RAZORPAY_SECRET_KEY' => $config['secret'] !== '••••••••' ? $config['secret'] : null,
            'RAZORPAY_WEBHOOK_SECRET' => $config['webhook_secret'] !== '••••••••' ? ($config['webhook_secret'] ?? '') : null,
            'RAZORPAY_TEST_MODE' => isset($config['test_mode']) ? ($config['test_mode'] ? 'true' : 'false') : 'true',
        ]);
    }

    private function updateMailConfig(array $config)
    {
        $envData = [
            'MAIL_MAILER' => $config['mailer'] ?? 'log',
            'MAIL_HOST' => $config['host'] ?? '127.0.0.1',
            'MAIL_PORT' => $config['port'] ?? 2525,
            'MAIL_USERNAME' => $config['username'] ?? 'null',
            'MAIL_PASSWORD' => $config['password'] !== '••••••••' ? ($config['password'] ?? 'null') : null,
            'MAIL_ENCRYPTION' => $config['encryption'] ?? 'tls',
            'MAIL_FROM_ADDRESS' => $config['from_address'] ?? 'hello@example.com',
            'MAIL_FROM_NAME' => $config['from_name'] ?? '"${APP_NAME}"',
        ];

        // Add MAIL_SCHEME if encryption is set
        if (!empty($config['encryption']) && $config['encryption'] !== 'none') {
            $envData['MAIL_ENCRYPTION'] = $config['encryption'];
        }

        $this->updateEnvFile($envData);
    }

    private function updateApplicationConfig(array $config, $logoFile = null, $faviconFile = null)
    {
        $envData = [
            'APP_NAME' => $config['name'] ?? 'DialN AI',
            'APP_URL' => $config['url'] ?? '',
            'APP_TIMEZONE' => $config['timezone'] ?? 'UTC',
            'APP_LOCALE' => $config['locale'] ?? 'en',
            'APP_DEBUG' => isset($config['debug']) ? ($config['debug'] ? 'true' : 'false') : 'false',
            'APP_ENV' => $config['environment'] ?? 'production',
        ];

        // Handle logo upload - Save to storage
        if ($logoFile) {
            // Get theme settings
            $themeSetting = \App\Models\ThemeSetting::first() ?? new \App\Models\ThemeSetting();
            
            // Delete old logo if exists
            if ($themeSetting->logo_path && Storage::disk('public')->exists($themeSetting->logo_path)) {
                Storage::disk('public')->delete($themeSetting->logo_path);
            }
            
            // Store new logo in storage/app/public/theme directory
            $logoPath = $logoFile->store('theme', 'public');
            
            // Update theme settings
            $themeSetting->logo_path = $logoPath;
            $themeSetting->save();
            
            \Log::info('Logo uploaded and saved to ThemeSetting', ['path' => $logoPath]);
        }

        // Handle favicon upload - Save to storage
        if ($faviconFile) {
            // Get theme settings
            $themeSetting = \App\Models\ThemeSetting::first() ?? new \App\Models\ThemeSetting();
            
            // Delete old favicon if exists
            if ($themeSetting->favicon_path && Storage::disk('public')->exists($themeSetting->favicon_path)) {
                Storage::disk('public')->delete($themeSetting->favicon_path);
            }
            
            // Store new favicon in storage/app/public/theme directory
            $faviconPath = $faviconFile->store('theme', 'public');
            
            // Update theme settings
            $themeSetting->favicon_path = $faviconPath;
            $themeSetting->save();
            
            \Log::info('Favicon uploaded and saved to ThemeSetting', ['path' => $faviconPath]);
        }

        $this->updateEnvFile($envData);
    }

    private function updateEnvFile(array $data)
    {
        $envPath = base_path('.env');
        
        \Log::info('Updating .env file', [
            'path' => $envPath,
            'data_keys' => array_keys($data),
        ]);
        
        if (!File::exists($envPath)) {
            throw new \Exception('.env file not found');
        }

        if (!is_writable($envPath)) {
            throw new \Exception('.env file is not writable. Please check file permissions.');
        }

        $envContent = File::get($envPath);

        foreach ($data as $key => $value) {
            // Skip if value is null (means don't update)
            if ($value === null) {
                continue;
            }

            // Convert value to string
            $value = (string) $value;

            // Check if value should be quoted
            $formattedValue = $value;
            
            // Check if value already has quotes or uses variable substitution
            if (preg_match('/^["\'].*["\']$/', $value) || strpos($value, '${') !== false) {
                // Already quoted or uses variable, keep as is
                $formattedValue = $value;
            } elseif ($value === 'null' || $value === 'true' || $value === 'false') {
                // Don't quote null, true, or false values
                $formattedValue = $value;
            } elseif (strpos($value, ' ') !== false || empty($value)) {
                // Needs quotes: has spaces or is empty
                $formattedValue = '"' . str_replace('"', '\\"', $value) . '"';
            } else {
                // No quotes needed for simple values
                $formattedValue = $value;
            }

            $pattern = "/^{$key}=.*/m";
            $replacement = "{$key}={$formattedValue}";

            if (preg_match($pattern, $envContent)) {
                // Update existing key
                $envContent = preg_replace($pattern, $replacement, $envContent);
            } else {
                // Add new key at the end
                $envContent = rtrim($envContent) . "\n{$replacement}\n";
            }
        }

        \Log::info('Writing .env file', ['path' => $envPath]);
        File::put($envPath, $envContent);
        \Log::info('.env file updated successfully');
    }

    public function testMail(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
        ]);

        try {
            Mail::raw('This is a test email from DialN AI.', function ($message) use ($request) {
                $message->to($request->email)
                    ->subject('Test Email - DialN AI');
            });

            return response()->json([
                'success' => true,
                'message' => 'Test email sent successfully to ' . $request->email,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to send test email: ' . $e->getMessage(),
            ], 500);
        }
    }
}

<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class InstallController extends Controller
{
    /**
     * Show installer welcome page
     */
    public function index()
    {
        return redirect()->route('install.requirements');
    }

    /**
     * Show requirements check page
     */
    public function requirements()
    {
        $requirements = $this->getRequirements();

        return Inertia::render('Install/Requirements', [
            'requirements' => $requirements,
        ]);
    }

    /**
     * Check all requirements
     */
    public function checkRequirements()
    {
        $requirements = $this->getRequirements();
        
        $allPassed = collect($requirements)->every(function ($group) {
            return collect($group['items'])->every(fn($item) => $item['passed']);
        });

        if ($allPassed) {
            return redirect()->route('install.database');
        }

        return back()->with('error', 'Please fix all requirements before continuing.');
    }

    /**
     * Show database configuration page
     */
    public function database()
    {
        return Inertia::render('Install/Database', [
            'env' => [
                'DB_HOST' => env('DB_HOST', '127.0.0.1'),
                'DB_PORT' => env('DB_PORT', '3306'),
                'DB_DATABASE' => env('DB_DATABASE', ''),
                'DB_USERNAME' => env('DB_USERNAME', ''),
            ]
        ]);
    }

    /**
     * Test database connection
     */
    public function testDatabase(Request $request)
    {
        $validated = $request->validate([
            'host' => 'required|string',
            'port' => 'required|integer',
            'database' => 'required|string',
            'username' => 'required|string',
            'password' => 'nullable|string',
        ]);

        try {
            config([
                'database.connections.test' => [
                    'driver' => 'mysql',
                    'host' => $validated['host'],
                    'port' => $validated['port'],
                    'database' => $validated['database'],
                    'username' => $validated['username'],
                    'password' => $validated['password'] ?? '',
                    'charset' => 'utf8mb4',
                    'collation' => 'utf8mb4_unicode_ci',
                    'prefix' => '',
                    'strict' => true,
                    'engine' => null,
                ]
            ]);

            DB::connection('test')->getPdo();
            DB::purge('test');

            return back()->with('flash', [
                'message' => 'Database connection successful!'
            ]);
        } catch (\Exception $e) {
            return back()->withErrors([
                'message' => 'Database connection failed: ' . $e->getMessage()
            ]);
        }
    }

    /**
     * Run database migrations
     */
    public function runMigrations(Request $request)
    {
        $validated = $request->validate([
            'host' => 'required|string',
            'port' => 'required|integer',
            'database' => 'required|string',
            'username' => 'required|string',
            'password' => 'nullable|string',
        ]);

        try {
            // Increase execution time for migrations
            set_time_limit(300); // 5 minutes
            ini_set('max_execution_time', '300');
            
            // Step 1: Update .env file with database credentials
            $this->updateEnvFile([
                'DB_HOST' => $validated['host'],
                'DB_PORT' => $validated['port'],
                'DB_DATABASE' => $validated['database'],
                'DB_USERNAME' => $validated['username'],
                'DB_PASSWORD' => $validated['password'] ?? '',
            ]);

            // Step 2: Manually clear config cache files (avoid artisan commands that need DB)
            $this->clearConfigCache();
            
            // Step 3: Reload configuration to pick up new database settings
            Artisan::call('config:cache');
            
            // Step 4: Run installation migration command (like opmation:load)
            Log::info('Starting install:migrate command from controller');
            $exitCode = Artisan::call('install:migrate');
            $output = Artisan::output();
            
            Log::info('Installation migration completed', [
                'exit_code' => $exitCode,
                'output' => $output
            ]);
            
            if ($exitCode !== 0) {
                Log::error('Migration command returned non-zero exit code', [
                    'exit_code' => $exitCode,
                    'output' => $output
                ]);
                throw new \Exception('Migration command failed with exit code ' . $exitCode . '. Output: ' . substr($output, 0, 500));
            }
            
            // Step 5: Switch to database drivers now that tables exist
            $this->updateEnvFile([
                'SESSION_DRIVER' => 'database',
                'CACHE_STORE' => 'database',
                'QUEUE_CONNECTION' => 'database',
            ]);
            
            // Clear and rebuild config cache
            $this->clearConfigCache();
            Artisan::call('config:cache');

            return redirect()->route('install.admin')->with('flash', [
                'message' => 'Database migrated successfully!'
            ]);
            
        } catch (\Exception $e) {
            // Log detailed error
            Log::error('Installation migration error', [
                'message' => $e->getMessage(),
                'file' => $e->getFile(),
                'line' => $e->getLine(),
                'trace' => $e->getTraceAsString(),
                'credentials' => [
                    'host' => $validated['host'],
                    'port' => $validated['port'],
                    'database' => $validated['database'],
                    'username' => $validated['username'],
                ]
            ]);
            
            return back()->withErrors([
                'message' => 'Migration failed: ' . $e->getMessage()
            ]);
        }
    }

    /**
     * Show admin creation page
     */
    public function admin()
    {
        return Inertia::render('Install/Admin');
    }

    /**
     * Create admin user and complete installation
     */
    public function createAdmin(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8|confirmed',
        ]);

        try {
            // Create admin user
            $admin = User::create([
                'name' => $validated['name'],
                'email' => $validated['email'],
                'password' => Hash::make($validated['password']),
                'role' => 'admin',
                'credit_balance' => 0,
                'is_unlimited_credits' => true, // Admin has unlimited credits
            ]);

            // Create .installed file
            File::put(public_path('.installed'), now()->toDateTimeString());

            return redirect()->route('install.complete');
        } catch (\Exception $e) {
            return back()->withErrors([
                'error' => 'Failed to create admin user: ' . $e->getMessage()
            ]);
        }
    }

    /**
     * Show installation complete page
     */
    public function complete()
    {
        return Inertia::render('Install/Complete');
    }

    /**
     * Get system requirements
     */
    private function getRequirements(): array
    {
        return [
            'php' => [
                'title' => 'PHP Requirements',
                'items' => [
                    [
                        'name' => 'PHP Version >= 8.3',
                        'passed' => version_compare(PHP_VERSION, '8.3.0', '>='),
                        'current' => PHP_VERSION,
                    ],
                ],
            ],
            'extensions' => [
                'title' => 'PHP Extensions',
                'items' => [
                    ['name' => 'PDO', 'passed' => extension_loaded('pdo')],
                    ['name' => 'PDO MySQL', 'passed' => extension_loaded('pdo_mysql')],
                    ['name' => 'mbstring', 'passed' => extension_loaded('mbstring')],
                    ['name' => 'OpenSSL', 'passed' => extension_loaded('openssl')],
                    ['name' => 'Tokenizer', 'passed' => extension_loaded('tokenizer')],
                    ['name' => 'XML', 'passed' => extension_loaded('xml')],
                    ['name' => 'Ctype', 'passed' => extension_loaded('ctype')],
                    ['name' => 'JSON', 'passed' => extension_loaded('json')],
                    ['name' => 'BCMath', 'passed' => extension_loaded('bcmath')],
                    ['name' => 'Fileinfo', 'passed' => extension_loaded('fileinfo')],
                    ['name' => 'cURL', 'passed' => extension_loaded('curl')],
                ],
            ],
            'permissions' => [
                'title' => 'Directory Permissions',
                'items' => [
                    [
                        'name' => 'storage/',
                        'passed' => is_writable(storage_path()),
                    ],
                    [
                        'name' => 'storage/app/',
                        'passed' => is_writable(storage_path('app')),
                    ],
                    [
                        'name' => 'storage/framework/',
                        'passed' => is_writable(storage_path('framework')),
                    ],
                    [
                        'name' => 'storage/logs/',
                        'passed' => is_writable(storage_path('logs')),
                    ],
                    [
                        'name' => 'bootstrap/cache/',
                        'passed' => is_writable(base_path('bootstrap/cache')),
                    ],
                ],
            ],
            'files' => [
                'title' => 'Required Files',
                'items' => [
                    [
                        'name' => '.env file exists',
                        'passed' => file_exists(base_path('.env')),
                    ],
                ],
            ],
        ];
    }

    /**
     * Update .env file with new values
     */
    private function updateEnvFile(array $data): void
    {
        $envFile = base_path('.env');
        $envContent = File::get($envFile);

        foreach ($data as $key => $value) {
            $value = $this->escapeEnvValue($value);
            
            if (preg_match("/^{$key}=.*/m", $envContent)) {
                $envContent = preg_replace(
                    "/^{$key}=.*/m",
                    "{$key}={$value}",
                    $envContent
                );
            } else {
                $envContent .= "\n{$key}={$value}";
            }
        }

        File::put($envFile, $envContent);
    }

    /**
     * Escape environment variable value
     */
    private function escapeEnvValue($value): string
    {
        if (empty($value)) {
            return '""';
        }

        if (preg_match('/\s/', $value) || preg_match('/[#"]/', $value)) {
            return '"' . str_replace('"', '\"', $value) . '"';
        }

        return $value;
    }
    
    /**
     * Clear config cache files manually
     */
    private function clearConfigCache(): void
    {
        $cacheFiles = [
            base_path('bootstrap/cache/config.php'),
            base_path('bootstrap/cache/routes-v7.php'),
            base_path('bootstrap/cache/events.php'),
            base_path('bootstrap/cache/packages.php'),
            base_path('bootstrap/cache/services.php'),
        ];
        
        foreach ($cacheFiles as $file) {
            if (File::exists($file)) {
                @File::delete($file);
            }
        }
    }
}

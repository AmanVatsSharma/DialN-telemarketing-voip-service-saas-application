<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Artisan;

class InstallMigrate extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'install:migrate';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Run database migrations and seeders for installation';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $this->info('Starting installation migration...');
        
        try {
            // Ensure APP_KEY exists
            if (empty(env('APP_KEY'))) {
                $this->info('Generating application key...');
                $this->call('key:generate');
            }
            
            // Run migrations
            $this->info('Running database migrations...');
            $exitCode = $this->call('migrate:fresh', ['--force' => true]);
            if ($exitCode !== 0) {
                throw new \Exception('Migration failed with exit code: ' . $exitCode);
            }
            
            // Run seeders
            $this->info('Running database seeders...');
            $exitCode = $this->call('db:seed', ['--force' => true]);
            if ($exitCode !== 0) {
                throw new \Exception('Seeding failed with exit code: ' . $exitCode);
            }
            
            // Create storage link if needed
            if (!is_link(public_path('storage'))) {
                $this->info('Creating storage link...');
                $this->call('storage:link');
            }
            
            $this->newLine();
            $this->info('✓ Installation migration completed successfully!');
            
            return 0;
            
        } catch (\Exception $e) {
            $this->error('Installation failed: ' . $e->getMessage());
            return 1;
        }
    }
}

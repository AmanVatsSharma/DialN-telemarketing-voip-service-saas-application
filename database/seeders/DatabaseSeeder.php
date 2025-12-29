<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Role;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Seed roles and permissions first
        $this->call([
            RoleSeeder::class,
            PermissionSeeder::class,
            ThemeSeeder::class,
            CampaignTemplateSeeder::class,
            PricingRuleSeeder::class,
        ]);

        // NOTE: Default users are disabled during installer
        // The installer will create the admin user during setup
        // Uncomment the code below if you want to seed test users for development
        
        // Create default admin user
        $admin = User::firstOrCreate(
            ['email' => 'admin@example.com'],
            [
                'name' => 'System Admin',
                'password' => bcrypt('password'),
                'email_verified_at' => now(),
                'status' => 'active',
            ]
        );

        // Assign admin role
        $adminRole = Role::where('slug', Role::ADMIN)->first();
        if ($adminRole && !$admin->hasRole(Role::ADMIN)) {
            $admin->assignRole($adminRole);
            $this->command->info('Admin user created: admin@example.com / password');
        }

        // Create default customer user for testing
        $customer = User::firstOrCreate(
            ['email' => 'customer@example.com'],
            [
                'name' => 'Test Customer',
                'password' => bcrypt('password'),
                'email_verified_at' => now(),
                'status' => 'active',
            ]
        );

        // Assign customer role
        $customerRole = Role::where('slug', Role::CUSTOMER)->first();
        if ($customerRole && !$customer->hasRole(Role::CUSTOMER)) {
            $customer->assignRole($customerRole);
            $this->command->info('Customer user created: customer@example.com / password');
        }

        // Create default agent user for testing
        $agent = User::firstOrCreate(
            ['email' => 'agent@example.com'],
            [
                'name' => 'Test Agent',
                'password' => bcrypt('password'),
                'email_verified_at' => now(),
                'status' => 'active',
                'parent_user_id' => $customer->id, // Agent belongs to customer
            ]
        );

        // Assign agent role
        $agentRole = Role::where('slug', Role::AGENT)->first();
        if ($agentRole && !$agent->hasRole(Role::AGENT)) {
            $agent->assignRole($agentRole, $customer->id);
            $this->command->info('Agent user created: agent@example.com / password (belongs to customer)');
        }

        // Keep the old test user for backward compatibility
        $testUser = User::firstOrCreate(
            ['email' => 'test@example.com'],
            [
                'name' => 'Test User',
                'password' => bcrypt('password'),
                'email_verified_at' => now(),
                'status' => 'active',
            ]
        );

        // Assign customer role to test user if not already assigned
        if (!$testUser->hasRole(Role::CUSTOMER)) {
            $testUser->assignRole($customerRole);
        }
        
    }
}


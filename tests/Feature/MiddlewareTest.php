<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;

class MiddlewareTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        
        $this->artisan('db:seed', ['--class' => 'RoleSeeder']);
        $this->artisan('db:seed', ['--class' => 'PermissionSeeder']);
    }

    /** @test */
    public function role_middleware_allows_user_with_correct_role()
    {
        $admin = User::factory()->create();
        $admin->assignRole('admin');

        // Users route requires 'admin' or 'customer' role
        $response = $this->actingAs($admin)->get(route('users.index'));
        
        $response->assertStatus(200);
    }

    /** @test */
    public function role_middleware_blocks_user_without_correct_role()
    {
        $agent = User::factory()->create();
        $agent->assignRole('agent');

        // Users route requires 'admin' or 'customer' role
        $response = $this->actingAs($agent)->get(route('users.index'));
        
        $response->assertStatus(403);
    }

    /** @test */
    public function role_middleware_allows_multiple_roles()
    {
        $customer = User::factory()->create();
        $customer->assignRole('customer');

        // Users route requires 'admin' OR 'customer' role
        $response = $this->actingAs($customer)->get(route('users.index'));
        
        $response->assertStatus(200);
    }

    /** @test */
    public function role_middleware_redirects_guest()
    {
        $response = $this->get(route('users.index'));
        
        $response->assertRedirect(route('login'));
    }

    /** @test */
    public function agents_route_requires_admin_or_customer_role()
    {
        $admin = User::factory()->create();
        $admin->assignRole('admin');

        $customer = User::factory()->create();
        $customer->assignRole('customer');

        $agent = User::factory()->create();
        $agent->assignRole('agent');

        // Admin can access
        $response = $this->actingAs($admin)->get(route('agents.index'));
        $response->assertStatus(200);

        // Customer can access
        $response = $this->actingAs($customer)->get(route('agents.index'));
        $response->assertStatus(200);

        // Agent cannot access
        $response = $this->actingAs($agent)->get(route('agents.index'));
        $response->assertStatus(403);
    }

    /** @test */
    public function role_permission_update_requires_admin_role()
    {
        $admin = User::factory()->create();
        $admin->assignRole('admin');

        $customer = User::factory()->create();
        $customer->assignRole('customer');

        $role = \App\Models\Role::where('slug', 'agent')->first();

        // Admin can update
        $response = $this->actingAs($admin)->put(route('roles.update-permissions', $role), [
            'permissions' => []
        ]);
        $response->assertStatus(302); // Redirect after success

        // Customer cannot update
        $response = $this->actingAs($customer)->put(route('roles.update-permissions', $role), [
            'permissions' => []
        ]);
        $response->assertStatus(403);
    }

    /** @test */
    public function unauthenticated_user_cannot_access_protected_routes()
    {
        $routes = [
            route('dashboard'),
            route('users.index'),
            route('agents.index'),
            route('roles.index'),
        ];

        foreach ($routes as $route) {
            $response = $this->get($route);
            $response->assertRedirect(route('login'));
        }
    }

    /** @test */
    public function verified_middleware_blocks_unverified_users()
    {
        $user = User::factory()->create([
            'email_verified_at' => null
        ]);
        $user->assignRole('customer');

        $response = $this->actingAs($user)->get(route('dashboard'));
        
        $response->assertRedirect(route('verification.notice'));
    }

    /** @test */
    public function verified_users_can_access_dashboard()
    {
        $user = User::factory()->create([
            'email_verified_at' => now()
        ]);
        $user->assignRole('customer');

        $response = $this->actingAs($user)->get(route('dashboard'));
        
        $response->assertStatus(200);
    }
}

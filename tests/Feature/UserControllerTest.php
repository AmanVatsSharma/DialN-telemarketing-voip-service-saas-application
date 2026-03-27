<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\User;
use App\Models\Role;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;

class UserControllerTest extends TestCase
{
    use RefreshDatabase, WithFaker;

    protected function setUp(): void
    {
        parent::setUp();
        
        // Seed roles and permissions
        $this->artisan('db:seed', ['--class' => 'RoleSeeder']);
        $this->artisan('db:seed', ['--class' => 'PermissionSeeder']);
    }

    /** @test */
    public function guest_cannot_access_users_page()
    {
        $response = $this->get(route('users.index'));
        
        $response->assertRedirect(route('login'));
    }

    /** @test */
    public function agent_cannot_access_users_page()
    {
        $agent = User::factory()->create();
        $agent->assignRole('agent');

        $response = $this->actingAs($agent)->get(route('users.index'));
        
        $response->assertStatus(403);
    }

    /** @test */
    public function admin_can_access_users_page()
    {
        $admin = User::factory()->create();
        $admin->assignRole('admin');

        $response = $this->actingAs($admin)->get(route('users.index'));
        
        $response->assertStatus(200);
    }

    /** @test */
    public function customer_can_access_users_page()
    {
        $customer = User::factory()->create();
        $customer->assignRole('customer');

        $response = $this->actingAs($customer)->get(route('users.index'));
        
        $response->assertStatus(200);
    }

    /** @test */
    public function admin_sees_all_users()
    {
        $admin = User::factory()->create();
        $admin->assignRole('admin');

        $customer1 = User::factory()->create();
        $customer1->assignRole('customer');

        $customer2 = User::factory()->create();
        $customer2->assignRole('customer');

        $agent = User::factory()->create();
        $agent->assignRole('agent');

        $response = $this->actingAs($admin)->get(route('users.index'));
        
        $response->assertStatus(200);
        
        // Admin should see all users (4 total including themselves)
        $users = $response->viewData('users');
        $this->assertCount(4, $users);
    }

    /** @test */
    public function customer_sees_only_their_agents()
    {
        $customer = User::factory()->create();
        $customer->assignRole('customer');

        $theirAgent = User::factory()->create(['parent_user_id' => $customer->id]);
        $theirAgent->assignRole('agent');

        $otherCustomer = User::factory()->create();
        $otherCustomer->assignRole('customer');

        $otherAgent = User::factory()->create(['parent_user_id' => $otherCustomer->id]);
        $otherAgent->assignRole('agent');

        $response = $this->actingAs($customer)->get(route('users.index'));
        
        $response->assertStatus(200);
        
        // Customer should only see their own agents
        $users = $response->viewData('users');
        $this->assertCount(1, $users);
        $this->assertEquals($theirAgent->id, $users->first()->id);
    }

    /** @test */
    public function admin_can_create_any_user()
    {
        $admin = User::factory()->create();
        $admin->assignRole('admin');

        $response = $this->actingAs($admin)->post(route('users.store'), [
            'name' => 'Test User',
            'email' => 'test@example.com',
            'password' => 'Password123!',
            'password_confirmation' => 'Password123!',
            'role' => 'customer',
        ]);

        $response->assertRedirect(route('users.index'));
        
        $this->assertDatabaseHas('users', [
            'email' => 'test@example.com'
        ]);

        $user = User::where('email', 'test@example.com')->first();
        $this->assertTrue($user->hasRole('customer'));
    }

    /** @test */
    public function customer_can_create_agents()
    {
        $customer = User::factory()->create();
        $customer->assignRole('customer');

        $response = $this->actingAs($customer)->post(route('users.store'), [
            'name' => 'Test Agent',
            'email' => 'agent@example.com',
            'password' => 'Password123!',
            'password_confirmation' => 'Password123!',
            'role' => 'agent',
        ]);

        $response->assertRedirect(route('users.index'));
        
        $agent = User::where('email', 'agent@example.com')->first();
        $this->assertNotNull($agent);
        $this->assertTrue($agent->hasRole('agent'));
        $this->assertEquals($customer->id, $agent->parent_user_id);
    }

    /** @test */
    public function customer_cannot_create_admin_users()
    {
        $customer = User::factory()->create();
        $customer->assignRole('customer');

        $response = $this->actingAs($customer)->post(route('users.store'), [
            'name' => 'Test Admin',
            'email' => 'admin@example.com',
            'password' => 'Password123!',
            'password_confirmation' => 'Password123!',
            'role' => 'admin',
        ]);

        $response->assertStatus(403);
    }

    /** @test */
    public function admin_can_toggle_user_status()
    {
        $admin = User::factory()->create();
        $admin->assignRole('admin');

        $user = User::factory()->create(['status' => 'active']);

        $response = $this->actingAs($admin)->post(route('users.toggle-status', $user));

        $response->assertRedirect();
        
        $user->refresh();
        $this->assertEquals('inactive', $user->status);

        // Toggle again
        $response = $this->actingAs($admin)->post(route('users.toggle-status', $user));
        
        $user->refresh();
        $this->assertEquals('active', $user->status);
    }

    /** @test */
    public function customer_can_toggle_their_agent_status()
    {
        $customer = User::factory()->create();
        $customer->assignRole('customer');

        $agent = User::factory()->create([
            'parent_user_id' => $customer->id,
            'status' => 'active'
        ]);
        $agent->assignRole('agent');

        $response = $this->actingAs($customer)->post(route('users.toggle-status', $agent));

        $response->assertRedirect();
        
        $agent->refresh();
        $this->assertEquals('inactive', $agent->status);
    }

    /** @test */
    public function customer_cannot_toggle_other_customer_agent_status()
    {
        $customer = User::factory()->create();
        $customer->assignRole('customer');

        $otherCustomer = User::factory()->create();
        $otherCustomer->assignRole('customer');

        $otherAgent = User::factory()->create(['parent_user_id' => $otherCustomer->id]);
        $otherAgent->assignRole('agent');

        $response = $this->actingAs($customer)->post(route('users.toggle-status', $otherAgent));

        $response->assertStatus(403);
    }

    /** @test */
    public function admin_can_update_user()
    {
        $admin = User::factory()->create();
        $admin->assignRole('admin');

        $user = User::factory()->create();
        $user->assignRole('customer');

        $response = $this->actingAs($admin)->put(route('users.update', $user), [
            'name' => 'Updated Name',
            'email' => $user->email,
            'role' => 'customer',
        ]);

        $response->assertRedirect();
        
        $user->refresh();
        $this->assertEquals('Updated Name', $user->name);
    }

    /** @test */
    public function admin_can_delete_user()
    {
        $admin = User::factory()->create();
        $admin->assignRole('admin');

        $user = User::factory()->create();

        $response = $this->actingAs($admin)->delete(route('users.destroy', $user));

        $response->assertRedirect(route('users.index'));
        
        $this->assertDatabaseMissing('users', ['id' => $user->id]);
    }

    /** @test */
    public function customer_can_delete_their_agents()
    {
        $customer = User::factory()->create();
        $customer->assignRole('customer');

        $agent = User::factory()->create(['parent_user_id' => $customer->id]);
        $agent->assignRole('agent');

        $response = $this->actingAs($customer)->delete(route('users.destroy', $agent));

        $response->assertRedirect(route('users.index'));
        
        $this->assertDatabaseMissing('users', ['id' => $agent->id]);
    }
}

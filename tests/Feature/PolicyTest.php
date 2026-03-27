<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\User;
use App\Models\Campaign;
use App\Models\Contact;
use App\Models\Call;
use Illuminate\Foundation\Testing\RefreshDatabase;

class PolicyTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        
        $this->artisan('db:seed', ['--class' => 'RoleSeeder']);
        $this->artisan('db:seed', ['--class' => 'PermissionSeeder']);
    }

    /** @test */
    public function admin_can_view_any_campaigns()
    {
        $admin = User::factory()->create();
        $admin->assignRole('admin');

        $this->assertTrue($admin->can('viewAny', Campaign::class));
    }

    /** @test */
    public function admin_can_view_any_users_campaign()
    {
        $admin = User::factory()->create();
        $admin->assignRole('admin');

        $otherUser = User::factory()->create();
        $campaign = Campaign::factory()->create(['user_id' => $otherUser->id]);

        $this->assertTrue($admin->can('view', $campaign));
    }

    /** @test */
    public function customer_can_view_own_campaigns()
    {
        $customer = User::factory()->create();
        $customer->assignRole('customer');

        $campaign = Campaign::factory()->create(['user_id' => $customer->id]);

        $this->assertTrue($customer->can('view', $campaign));
    }

    /** @test */
    public function customer_cannot_view_other_customers_campaigns()
    {
        $customer = User::factory()->create();
        $customer->assignRole('customer');

        $otherCustomer = User::factory()->create();
        $campaign = Campaign::factory()->create(['user_id' => $otherCustomer->id]);

        $this->assertFalse($customer->can('view', $campaign));
    }

    /** @test */
    public function agent_can_view_parent_campaigns()
    {
        $customer = User::factory()->create();
        $customer->assignRole('customer');

        $agent = User::factory()->create(['parent_user_id' => $customer->id]);
        $agent->assignRole('agent');

        $campaign = Campaign::factory()->create(['user_id' => $customer->id]);

        $this->assertTrue($agent->can('view', $campaign));
    }

    /** @test */
    public function agent_cannot_view_non_parent_campaigns()
    {
        $customer = User::factory()->create();
        $customer->assignRole('customer');

        $agent = User::factory()->create(['parent_user_id' => $customer->id]);
        $agent->assignRole('agent');

        $otherCustomer = User::factory()->create();
        $campaign = Campaign::factory()->create(['user_id' => $otherCustomer->id]);

        $this->assertFalse($agent->can('view', $campaign));
    }

    /** @test */
    public function customer_can_create_campaigns()
    {
        $customer = User::factory()->create();
        $customer->assignRole('customer');

        $this->assertTrue($customer->can('create', Campaign::class));
    }

    /** @test */
    public function agent_cannot_create_campaigns()
    {
        $agent = User::factory()->create();
        $agent->assignRole('agent');

        $this->assertFalse($agent->can('create', Campaign::class));
    }

    /** @test */
    public function customer_can_update_own_campaigns()
    {
        $customer = User::factory()->create();
        $customer->assignRole('customer');

        $campaign = Campaign::factory()->create(['user_id' => $customer->id]);

        $this->assertTrue($customer->can('update', $campaign));
    }

    /** @test */
    public function agent_cannot_update_campaigns()
    {
        $customer = User::factory()->create();
        $agent = User::factory()->create(['parent_user_id' => $customer->id]);
        $agent->assignRole('agent');

        $campaign = Campaign::factory()->create(['user_id' => $customer->id]);

        $this->assertFalse($agent->can('update', $campaign));
    }

    /** @test */
    public function customer_can_delete_own_campaigns()
    {
        $customer = User::factory()->create();
        $customer->assignRole('customer');

        $campaign = Campaign::factory()->create(['user_id' => $customer->id]);

        $this->assertTrue($customer->can('delete', $campaign));
    }

    /** @test */
    public function contact_policy_works_same_as_campaign_policy()
    {
        $customer = User::factory()->create();
        $customer->assignRole('customer');

        $agent = User::factory()->create(['parent_user_id' => $customer->id]);
        $agent->assignRole('agent');

        $contact = Contact::factory()->create(['user_id' => $customer->id]);

        // Customer can manage own
        $this->assertTrue($customer->can('view', $contact));
        $this->assertTrue($customer->can('update', $contact));
        
        // Agent can view parent's but not update
        $this->assertTrue($agent->can('view', $contact));
        $this->assertFalse($agent->can('update', $contact));
    }

    /** @test */
    public function call_policy_works_same_as_campaign_policy()
    {
        $customer = User::factory()->create();
        $customer->assignRole('customer');

        $agent = User::factory()->create(['parent_user_id' => $customer->id]);
        $agent->assignRole('agent');

        $call = Call::factory()->create(['user_id' => $customer->id]);

        // Customer can manage own
        $this->assertTrue($customer->can('view', $call));
        $this->assertTrue($customer->can('update', $call));
        
        // Agent can view parent's but not update
        $this->assertTrue($agent->can('view', $call));
        $this->assertFalse($agent->can('update', $call));
    }

    /** @test */
    public function agent_can_make_calls()
    {
        $agent = User::factory()->create();
        $agent->assignRole('agent');

        $this->assertTrue($agent->can('make', Call::class));
    }

    /** @test */
    public function user_without_calls_make_permission_cannot_make_calls()
    {
        $user = User::factory()->create();
        // No role assigned, no permissions

        $this->assertFalse($user->can('make', Call::class));
    }

    /** @test */
    public function admin_can_manage_all_users()
    {
        $admin = User::factory()->create();
        $admin->assignRole('admin');

        $customer = User::factory()->create();
        $customer->assignRole('customer');

        $this->assertTrue($admin->can('view', $customer));
        $this->assertTrue($admin->can('update', $customer));
        $this->assertTrue($admin->can('delete', $customer));
    }

    /** @test */
    public function customer_can_manage_their_agents()
    {
        $customer = User::factory()->create();
        $customer->assignRole('customer');

        $agent = User::factory()->create(['parent_user_id' => $customer->id]);
        $agent->assignRole('agent');

        $this->assertTrue($customer->can('view', $agent));
        $this->assertTrue($customer->can('update', $agent));
        $this->assertTrue($customer->can('delete', $agent));
    }

    /** @test */
    public function customer_cannot_manage_other_agents()
    {
        $customer = User::factory()->create();
        $customer->assignRole('customer');

        $otherCustomer = User::factory()->create();
        $otherAgent = User::factory()->create(['parent_user_id' => $otherCustomer->id]);
        $otherAgent->assignRole('agent');

        $this->assertFalse($customer->can('view', $otherAgent));
        $this->assertFalse($customer->can('update', $otherAgent));
        $this->assertFalse($customer->can('delete', $otherAgent));
    }

    /** @test */
    public function customer_cannot_manage_admin_users()
    {
        $customer = User::factory()->create();
        $customer->assignRole('customer');

        $admin = User::factory()->create();
        $admin->assignRole('admin');

        $this->assertFalse($customer->can('view', $admin));
        $this->assertFalse($customer->can('update', $admin));
        $this->assertFalse($customer->can('delete', $admin));
    }

    /** @test */
    public function admin_cannot_manage_other_admins()
    {
        $admin1 = User::factory()->create();
        $admin1->assignRole('admin');

        $admin2 = User::factory()->create();
        $admin2->assignRole('admin');

        // Admin can view other admins but not modify them
        $this->assertTrue($admin1->can('view', $admin2));
        $this->assertFalse($admin1->can('update', $admin2));
        $this->assertFalse($admin1->can('delete', $admin2));
    }

    /** @test */
    public function user_without_permission_is_denied()
    {
        $user = User::factory()->create();
        // No role, no permissions

        $campaign = Campaign::factory()->create(['user_id' => $user->id]);

        $this->assertFalse($user->can('view', $campaign));
        $this->assertFalse($user->can('create', Campaign::class));
    }
}

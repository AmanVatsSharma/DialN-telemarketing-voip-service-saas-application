<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\User;
use App\Models\Campaign;
use App\Models\Contact;
use App\Models\Call;
use Illuminate\Foundation\Testing\RefreshDatabase;

class DashboardTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        
        $this->artisan('db:seed', ['--class' => 'RoleSeeder']);
        $this->artisan('db:seed', ['--class' => 'PermissionSeeder']);
    }

    /** @test */
    public function test_guests_are_redirected_to_the_login_page()
    {
        $response = $this->get(route('dashboard'));
        
        $response->assertRedirect(route('login'));
    }

    /** @test */
    public function test_authenticated_users_can_visit_the_dashboard()
    {
        $user = User::factory()->create();
        $user->assignRole('customer');

        $response = $this->actingAs($user)->get(route('dashboard'));
        
        $response->assertStatus(200);
    }

    /** @test */
    public function admin_dashboard_shows_all_statistics()
    {
        $admin = User::factory()->create();
        $admin->assignRole('admin');

        $customer1 = User::factory()->create();
        $customer1->assignRole('customer');

        $customer2 = User::factory()->create();
        $customer2->assignRole('customer');

        Campaign::factory()->count(5)->create(['user_id' => $customer1->id]);
        Campaign::factory()->count(3)->create(['user_id' => $customer2->id]);
        
        Contact::factory()->count(10)->create(['user_id' => $customer1->id]);
        Contact::factory()->count(7)->create(['user_id' => $customer2->id]);

        $response = $this->actingAs($admin)->get(route('dashboard'));
        
        $response->assertStatus(200);
        
        $stats = $response->viewData('stats');
        
        // Admin sees all campaigns and contacts
        $this->assertEquals(8, $stats['totalCampaigns']);
        $this->assertEquals(17, $stats['totalContacts']);
    }

    /** @test */
    public function customer_dashboard_shows_only_their_statistics()
    {
        $customer1 = User::factory()->create();
        $customer1->assignRole('customer');

        $customer2 = User::factory()->create();
        $customer2->assignRole('customer');

        Campaign::factory()->count(5)->create(['user_id' => $customer1->id]);
        Campaign::factory()->count(3)->create(['user_id' => $customer2->id]);
        
        Contact::factory()->count(10)->create(['user_id' => $customer1->id]);
        Contact::factory()->count(7)->create(['user_id' => $customer2->id]);

        $response = $this->actingAs($customer1)->get(route('dashboard'));
        
        $response->assertStatus(200);
        
        $stats = $response->viewData('stats');
        
        // Customer sees only their own data
        $this->assertEquals(5, $stats['totalCampaigns']);
        $this->assertEquals(10, $stats['totalContacts']);
    }

    /** @test */
    public function agent_dashboard_shows_parent_statistics()
    {
        $customer = User::factory()->create();
        $customer->assignRole('customer');

        $agent = User::factory()->create(['parent_user_id' => $customer->id]);
        $agent->assignRole('agent');

        $otherCustomer = User::factory()->create();
        $otherCustomer->assignRole('customer');

        Campaign::factory()->count(5)->create(['user_id' => $customer->id]);
        Campaign::factory()->count(3)->create(['user_id' => $otherCustomer->id]);
        
        Contact::factory()->count(10)->create(['user_id' => $customer->id]);
        Contact::factory()->count(7)->create(['user_id' => $otherCustomer->id]);

        $response = $this->actingAs($agent)->get(route('dashboard'));
        
        $response->assertStatus(200);
        
        $stats = $response->viewData('stats');
        
        // Agent sees parent's data
        $this->assertEquals(5, $stats['totalCampaigns']);
        $this->assertEquals(10, $stats['totalContacts']);
    }

    /** @test */
    public function admin_dashboard_includes_user_count()
    {
        $admin = User::factory()->create();
        $admin->assignRole('admin');

        User::factory()->count(5)->create()->each(function ($user) {
            $user->assignRole('customer');
        });

        User::factory()->count(10)->create()->each(function ($user) {
            $user->assignRole('agent');
        });

        $response = $this->actingAs($admin)->get(route('dashboard'));
        
        $stats = $response->viewData('stats');
        
        // Admin + 5 customers + 10 agents = 16 total users
        $this->assertEquals(16, $stats['totalUsers']);
    }

    /** @test */
    public function customer_dashboard_shows_agent_count()
    {
        $customer = User::factory()->create();
        $customer->assignRole('customer');

        User::factory()->count(3)->create(['parent_user_id' => $customer->id])->each(function ($user) {
            $user->assignRole('agent');
        });

        $otherCustomer = User::factory()->create();
        $otherCustomer->assignRole('customer');

        User::factory()->count(5)->create(['parent_user_id' => $otherCustomer->id])->each(function ($user) {
            $user->assignRole('agent');
        });

        $response = $this->actingAs($customer)->get(route('dashboard'));
        
        $stats = $response->viewData('stats');
        
        // Customer sees only their agents
        $this->assertEquals(3, $stats['totalAgents']);
    }
}

<?php

namespace Tests\Feature;

use App\Models\User;
use App\Models\Role;
use App\Models\PhoneNumber;
use App\Models\NumberRequest;
use App\Notifications\NumberRequestCreated;
use App\Notifications\NumberRequestApproved;
use App\Notifications\NumberRequestRejected;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Notification;
use Tests\TestCase;

class PhoneNumberProvisioningTest extends TestCase
{
    use RefreshDatabase;

    protected $admin;
    protected $customer;
    protected $agent;

    protected function setUp(): void
    {
        parent::setUp();

        // Create roles
        $adminRole = Role::create(['name' => 'Admin', 'slug' => 'admin']);
        $customerRole = Role::create(['name' => 'Customer', 'slug' => 'customer']);
        $agentRole = Role::create(['name' => 'Agent', 'slug' => 'agent']);

        // Create users
        $this->admin = User::factory()->create();
        $this->admin->roles()->attach($adminRole);

        $this->customer = User::factory()->create();
        $this->customer->roles()->attach($customerRole);

        $this->agent = User::factory()->create(['parent_user_id' => $this->customer->id]);
        $this->agent->roles()->attach($agentRole);
    }

    /** @test */
    public function customer_can_browse_available_phone_numbers()
    {
        // Create available phone numbers
        PhoneNumber::factory()->count(5)->create(['status' => 'available']);

        $response = $this->actingAs($this->customer)
            ->get(route('numbers.available'));

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => $page
            ->component('Customer/Numbers/Available')
            ->has('numbers')
        );
    }

    /** @test */
    public function customer_can_request_available_phone_number()
    {
        Notification::fake();

        $phoneNumber = PhoneNumber::factory()->create([
            'status' => 'available',
            'number' => '+14155552671',
        ]);

        $response = $this->actingAs($this->customer)
            ->post(route('numbers.request', $phoneNumber), [
                'customer_notes' => 'Need for marketing campaign',
            ]);

        $response->assertRedirect(route('customer.numbers.my-requests'));
        $response->assertSessionHas('success');

        // Assert number marked as requested
        $this->assertEquals('requested', $phoneNumber->fresh()->status);

        // Assert request created
        $this->assertDatabaseHas('number_requests', [
            'phone_number_id' => $phoneNumber->id,
            'customer_id' => $this->customer->id,
            'status' => 'pending',
            'customer_notes' => 'Need for marketing campaign',
        ]);

        // Assert admin notified
        Notification::assertSentTo(
            [$this->admin],
            NumberRequestCreated::class
        );
    }

    /** @test */
    public function customer_cannot_request_already_requested_number()
    {
        $phoneNumber = PhoneNumber::factory()->create([
            'status' => 'requested',
        ]);

        $response = $this->actingAs($this->customer)
            ->post(route('numbers.request', $phoneNumber), [
                'customer_notes' => 'Want this number',
            ]);

        $response->assertStatus(403); // Forbidden by policy
    }

    /** @test */
    public function customer_cannot_request_assigned_number()
    {
        $otherCustomer = User::factory()->create();
        
        $phoneNumber = PhoneNumber::factory()->create([
            'status' => 'assigned',
            'user_id' => $otherCustomer->id,
        ]);

        $response = $this->actingAs($this->customer)
            ->post(route('numbers.request', $phoneNumber));

        $response->assertStatus(403);
    }

    /** @test */
    public function customer_can_view_their_requests()
    {
        $phoneNumber = PhoneNumber::factory()->create();
        $request = NumberRequest::factory()->create([
            'phone_number_id' => $phoneNumber->id,
            'customer_id' => $this->customer->id,
            'status' => 'pending',
        ]);

        $response = $this->actingAs($this->customer)
            ->get(route('numbers.my-requests'));

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => $page
            ->component('Customer/Numbers/MyRequests')
            ->has('requests')
        );
    }

    /** @test */
    public function customer_can_cancel_pending_request()
    {
        $phoneNumber = PhoneNumber::factory()->create(['status' => 'requested']);
        $request = NumberRequest::factory()->create([
            'phone_number_id' => $phoneNumber->id,
            'customer_id' => $this->customer->id,
            'status' => 'pending',
        ]);

        $response = $this->actingAs($this->customer)
            ->post(route('numbers.cancel', $request));

        $response->assertRedirect();
        $response->assertSessionHas('success');

        // Assert request cancelled
        $this->assertEquals('cancelled', $request->fresh()->status);

        // Assert number released
        $this->assertEquals('available', $phoneNumber->fresh()->status);
    }

    /** @test */
    public function customer_cannot_cancel_approved_request()
    {
        $phoneNumber = PhoneNumber::factory()->create();
        $request = NumberRequest::factory()->create([
            'phone_number_id' => $phoneNumber->id,
            'customer_id' => $this->customer->id,
            'status' => 'approved',
        ]);

        $response = $this->actingAs($this->customer)
            ->post(route('numbers.cancel', $request));

        $response->assertStatus(403);
    }

    /** @test */
    public function admin_can_view_pending_requests()
    {
        $phoneNumber = PhoneNumber::factory()->create();
        NumberRequest::factory()->count(3)->create([
            'phone_number_id' => $phoneNumber->id,
            'status' => 'pending',
        ]);

        $response = $this->actingAs($this->admin)
            ->get(route('admin.number-requests.index'));

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => $page
            ->component('Admin/NumberRequests/Index')
            ->has('requests')
        );
    }

    /** @test */
    public function admin_can_approve_number_request()
    {
        Notification::fake();

        $phoneNumber = PhoneNumber::factory()->create(['status' => 'requested']);
        $request = NumberRequest::factory()->create([
            'phone_number_id' => $phoneNumber->id,
            'customer_id' => $this->customer->id,
            'status' => 'pending',
        ]);

        $response = $this->actingAs($this->admin)
            ->post(route('admin.number-requests.approve', $request), [
                'admin_notes' => 'Approved for Q4 campaign',
            ]);

        $response->assertRedirect();
        $response->assertSessionHas('success');

        // Assert request approved
        $request->refresh();
        $this->assertEquals('approved', $request->status);
        $this->assertEquals($this->admin->id, $request->admin_id);
        $this->assertEquals('Approved for Q4 campaign', $request->admin_notes);
        $this->assertNotNull($request->processed_at);

        // Assert number assigned
        $phoneNumber->refresh();
        $this->assertEquals('assigned', $phoneNumber->status);
        $this->assertEquals($this->customer->id, $phoneNumber->user_id);
        $this->assertEquals($this->admin->id, $phoneNumber->approved_by);
        $this->assertNotNull($phoneNumber->assigned_at);

        // Assert customer notified
        Notification::assertSentTo(
            [$this->customer],
            NumberRequestApproved::class
        );
    }

    /** @test */
    public function admin_can_reject_number_request()
    {
        Notification::fake();

        $phoneNumber = PhoneNumber::factory()->create(['status' => 'requested']);
        $request = NumberRequest::factory()->create([
            'phone_number_id' => $phoneNumber->id,
            'customer_id' => $this->customer->id,
            'status' => 'pending',
        ]);

        $response = $this->actingAs($this->admin)
            ->post(route('admin.number-requests.reject', $request), [
                'admin_notes' => 'Number reserved for another customer',
            ]);

        $response->assertRedirect();
        $response->assertSessionHas('success');

        // Assert request rejected
        $request->refresh();
        $this->assertEquals('rejected', $request->status);
        $this->assertEquals($this->admin->id, $request->admin_id);
        $this->assertEquals('Number reserved for another customer', $request->admin_notes);

        // Assert number released
        $this->assertEquals('available', $phoneNumber->fresh()->status);

        // Assert customer notified
        Notification::assertSentTo(
            [$this->customer],
            NumberRequestRejected::class
        );
    }

    /** @test */
    public function customer_cannot_access_admin_number_management()
    {
        $response = $this->actingAs($this->customer)
            ->get(route('admin.numbers.index'));

        $response->assertStatus(403);
    }

    /** @test */
    public function agent_can_view_customer_assigned_numbers()
    {
        $phoneNumber = PhoneNumber::factory()->create([
            'user_id' => $this->customer->id,
            'status' => 'assigned',
        ]);

        $response = $this->actingAs($this->agent)
            ->get(route('numbers.my-numbers'));

        $response->assertStatus(200);
    }

    /** @test */
    public function agent_cannot_request_numbers()
    {
        $phoneNumber = PhoneNumber::factory()->create(['status' => 'available']);

        $response = $this->actingAs($this->agent)
            ->post(route('numbers.request', $phoneNumber));

        $response->assertStatus(403);
    }

    /** @test */
    public function phone_number_statistics_are_accurate()
    {
        // Create various phone numbers
        PhoneNumber::factory()->count(10)->create(['status' => 'available']);
        PhoneNumber::factory()->count(5)->create([
            'status' => 'assigned',
            'user_id' => $this->customer->id,
            'monthly_cost' => 1.00,
        ]);
        PhoneNumber::factory()->count(3)->create(['status' => 'requested']);

        $response = $this->actingAs($this->admin)
            ->get(route('admin.numbers.statistics'));

        $response->assertStatus(200);
        $response->assertJson([
            'statistics' => [
                'total' => 18,
                'available' => 10,
                'assigned' => 5,
                'requested' => 3,
                'total_cost' => 5.00,
            ],
        ]);
    }

    /** @test */
    public function admin_dashboard_shows_phone_number_stats()
    {
        PhoneNumber::factory()->count(10)->create(['status' => 'available']);
        PhoneNumber::factory()->count(5)->create(['status' => 'assigned']);
        NumberRequest::factory()->count(3)->create(['status' => 'pending']);

        $response = $this->actingAs($this->admin)
            ->get(route('dashboard'));

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => $page
            ->has('stats.total_phone_numbers')
            ->has('stats.available_numbers')
            ->has('stats.pending_number_requests')
        );
    }

    /** @test */
    public function customer_dashboard_shows_their_phone_number_stats()
    {
        PhoneNumber::factory()->count(2)->create([
            'user_id' => $this->customer->id,
            'status' => 'assigned',
        ]);
        NumberRequest::factory()->count(1)->create([
            'customer_id' => $this->customer->id,
            'status' => 'pending',
        ]);

        $response = $this->actingAs($this->customer)
            ->get(route('dashboard'));

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => $page
            ->has('stats.my_phone_numbers')
            ->has('stats.my_pending_requests')
            ->where('stats.my_phone_numbers', 2)
            ->where('stats.my_pending_requests', 1)
        );
    }
}

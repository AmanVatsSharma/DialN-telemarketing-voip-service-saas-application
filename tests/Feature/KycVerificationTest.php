<?php

namespace Tests\Feature;

use App\Enums\DocumentStatus;
use App\Enums\DocumentType;
use App\Enums\KycStatus;
use App\Enums\KycTier;
use App\Models\Role;
use App\Models\User;
use App\Models\UserKycVerification;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;

class KycVerificationTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        
        // Seed roles
        Role::create(['name' => 'Admin', 'slug' => 'admin', 'level' => 1]);
        Role::create(['name' => 'Customer', 'slug' => 'customer', 'level' => 2]);
        Role::create(['name' => 'Agent', 'slug' => 'agent', 'level' => 3]);
        
        // Fake storage for document uploads
        Storage::fake('local');
    }

    /** @test */
    public function unverified_user_can_access_kyc_status_page()
    {
        $user = User::factory()->create(['created_at' => now()->subDays(2)]);
        $user->roles()->attach(2); // Customer role

        $response = $this->actingAs($user)->get('/settings/kyc');

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => $page->component('settings/kyc/index'));
    }

    /** @test */
    public function user_can_submit_basic_kyc_with_phone_number()
    {
        $user = User::factory()->create();
        $user->roles()->attach(2);

        $response = $this->actingAs($user)->post('/settings/kyc/basic', [
            'phone_number' => '+15551234567',
        ]);

        $response->assertRedirect('/settings/kyc/verify-phone');
        $this->assertDatabaseHas('user_kyc_verifications', [
            'user_id' => $user->id,
            'kyc_tier' => 'basic',
            'status' => 'pending',
            'phone_number' => '+15551234567',
        ]);
    }

    /** @test */
    public function user_can_verify_phone_with_correct_otp()
    {
        $user = User::factory()->create();
        $user->roles()->attach(2);
        
        $kyc = UserKycVerification::create([
            'user_id' => $user->id,
            'kyc_tier' => 'basic',
            'status' => 'pending',
            'phone_number' => '+15551234567',
            'phone_verification_code' => '123456',
            'phone_code_sent_at' => now(),
            'phone_verification_attempts' => 0,
        ]);

        $response = $this->actingAs($user)->post('/settings/kyc/verify-phone', [
            'code' => '123456',
        ]);

        $response->assertRedirect('/settings/kyc');
        $response->assertSessionHas('success');
        
        $kyc->refresh();
        $this->assertEquals('approved', $kyc->status);
        $this->assertNotNull($kyc->phone_verified_at);
    }

    /** @test */
    public function user_cannot_verify_phone_with_incorrect_otp()
    {
        $user = User::factory()->create();
        $user->roles()->attach(2);
        
        UserKycVerification::create([
            'user_id' => $user->id,
            'kyc_tier' => 'basic',
            'status' => 'pending',
            'phone_number' => '+15551234567',
            'phone_verification_code' => '123456',
            'phone_code_sent_at' => now(),
            'phone_verification_attempts' => 0,
        ]);

        $response = $this->actingAs($user)->post('/settings/kyc/verify-phone', [
            'code' => '999999',
        ]);

        $response->assertSessionHasErrors(['code']);
        $this->assertDatabaseHas('user_kyc_verifications', [
            'user_id' => $user->id,
            'phone_verification_attempts' => 1,
        ]);
    }

    /** @test */
    public function user_can_resend_verification_code()
    {
        $user = User::factory()->create();
        $user->roles()->attach(2);
        
        UserKycVerification::create([
            'user_id' => $user->id,
            'kyc_tier' => 'basic',
            'status' => 'pending',
            'phone_number' => '+15551234567',
            'phone_verification_code' => '123456',
            'phone_code_sent_at' => now()->subMinutes(2),
            'phone_verification_attempts' => 0,
        ]);

        $response = $this->actingAs($user)->post('/settings/kyc/resend-code');

        $response->assertRedirect();
        $response->assertSessionHas('success');
    }

    /** @test */
    public function user_can_submit_business_kyc_documents()
    {
        $user = User::factory()->create();
        $user->roles()->attach(2);
        
        // First complete basic KYC
        UserKycVerification::create([
            'user_id' => $user->id,
            'kyc_tier' => 'basic',
            'status' => 'approved',
            'phone_number' => '+15551234567',
            'phone_verified_at' => now(),
        ]);

        $response = $this->actingAs($user)->post('/settings/kyc/business', [
            'business_name' => 'Test Corp',
            'business_registration_number' => 'REG123456',
            'business_type' => 'corporation',
            'address_line1' => '123 Test St',
            'city' => 'Test City',
            'state' => 'TS',
            'postal_code' => '12345',
            'country' => 'US',
            'id_document_type' => 'passport',
            'id_document' => UploadedFile::fake()->create('passport.pdf', 1024),
            'business_document' => UploadedFile::fake()->create('business_reg.pdf', 1024),
            'selfie_with_id' => UploadedFile::fake()->image('selfie.jpg'),
        ]);

        $response->assertRedirect('/settings/kyc');
        $this->assertDatabaseHas('user_kyc_verifications', [
            'user_id' => $user->id,
            'kyc_tier' => 'business',
            'status' => 'pending',
            'business_name' => 'Test Corp',
        ]);
    }

    /** @test */
    public function admin_can_view_pending_kyc_submissions()
    {
        $admin = User::factory()->create();
        $admin->roles()->attach(1); // Admin role
        
        $customer = User::factory()->create();
        $customer->roles()->attach(2);
        
        UserKycVerification::create([
            'user_id' => $customer->id,
            'kyc_tier' => 'business',
            'status' => 'pending',
            'phone_number' => '+15551234567',
            'business_name' => 'Test Corp',
            'submitted_at' => now(),
        ]);

        $response = $this->actingAs($admin)->get('/admin/kyc');

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => $page
            ->component('admin/kyc/index')
            ->has('verifications.data', 1)
        );
    }

    /** @test */
    public function admin_can_approve_business_kyc()
    {
        $admin = User::factory()->create();
        $admin->roles()->attach(1);
        
        $customer = User::factory()->create();
        $customer->roles()->attach(2);
        
        $kyc = UserKycVerification::create([
            'user_id' => $customer->id,
            'kyc_tier' => 'business',
            'status' => 'pending',
            'phone_number' => '+15551234567',
            'phone_verified_at' => now(),
            'business_name' => 'Test Corp',
            'submitted_at' => now(),
        ]);

        $response = $this->actingAs($admin)->post("/admin/kyc/{$kyc->id}/approve", [
            'admin_notes' => 'All documents verified.',
        ]);

        $response->assertRedirect();
        $kyc->refresh();
        
        $this->assertEquals('approved', $kyc->status);
        $this->assertNotNull($kyc->approved_at);
        $this->assertEquals($admin->id, $kyc->reviewed_by);
    }

    /** @test */
    public function admin_can_reject_business_kyc()
    {
        $admin = User::factory()->create();
        $admin->roles()->attach(1);
        
        $customer = User::factory()->create();
        $customer->roles()->attach(2);
        
        $kyc = UserKycVerification::create([
            'user_id' => $customer->id,
            'kyc_tier' => 'business',
            'status' => 'pending',
            'phone_number' => '+15551234567',
            'business_name' => 'Test Corp',
            'submitted_at' => now(),
        ]);

        $response = $this->actingAs($admin)->post("/admin/kyc/{$kyc->id}/reject", [
            'rejection_reason' => 'Documents are unclear.',
            'admin_notes' => 'Please resubmit with clearer photos.',
        ]);

        $response->assertRedirect();
        $kyc->refresh();
        
        $this->assertEquals('rejected', $kyc->status);
        $this->assertEquals('Documents are unclear.', $kyc->rejection_reason);
    }

    /** @test */
    public function unverified_user_is_blocked_from_campaigns_after_grace_period()
    {
        $user = User::factory()->create([
            'created_at' => now()->subDays(10), // Grace period expired
        ]);
        $user->roles()->attach(2);

        $response = $this->actingAs($user)->get('/campaigns');

        $response->assertRedirect('/settings/kyc');
        $response->assertSessionHas('error');
    }

    /** @test */
    public function basic_kyc_user_can_access_campaigns()
    {
        $user = User::factory()->create();
        $user->roles()->attach(2);
        
        UserKycVerification::create([
            'user_id' => $user->id,
            'kyc_tier' => 'basic',
            'status' => 'approved',
            'phone_number' => '+15551234567',
            'phone_verified_at' => now(),
            'approved_at' => now(),
            'expires_at' => now()->addYears(2),
        ]);

        $response = $this->actingAs($user)->get('/campaigns');

        $response->assertStatus(200);
    }

    /** @test */
    public function basic_kyc_user_is_blocked_from_ai_agents()
    {
        $user = User::factory()->create();
        $user->roles()->attach(2);
        
        UserKycVerification::create([
            'user_id' => $user->id,
            'kyc_tier' => 'basic',
            'status' => 'approved',
            'phone_number' => '+15551234567',
            'phone_verified_at' => now(),
        ]);

        $response = $this->actingAs($user)->get('/ai-agents');

        $response->assertRedirect('/settings/kyc');
        $response->assertSessionHas('error');
    }

    /** @test */
    public function business_kyc_user_can_access_ai_agents()
    {
        $user = User::factory()->create();
        $user->roles()->attach(2);
        
        UserKycVerification::create([
            'user_id' => $user->id,
            'kyc_tier' => 'business',
            'status' => 'approved',
            'phone_number' => '+15551234567',
            'phone_verified_at' => now(),
            'approved_at' => now(),
            'expires_at' => now()->addYears(2),
        ]);

        $response = $this->actingAs($user)->get('/ai-agents');

        $response->assertStatus(200);
    }

    /** @test */
    public function user_within_grace_period_can_access_campaigns_with_warning()
    {
        $user = User::factory()->create([
            'created_at' => now()->subDays(3), // Day 3 of grace period
        ]);
        $user->roles()->attach(2);

        $response = $this->actingAs($user)->get('/campaigns');

        $response->assertStatus(200);
    }

    /** @test */
    public function admin_users_bypass_kyc_requirements()
    {
        $admin = User::factory()->create();
        $admin->roles()->attach(1); // Admin role

        $response = $this->actingAs($admin)->get('/campaigns');

        $response->assertStatus(200);
    }
}

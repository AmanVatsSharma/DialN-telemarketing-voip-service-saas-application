<?php

namespace Tests\Unit\Models;

use App\Enums\DocumentStatus;
use App\Enums\KycStatus;
use App\Enums\KycTier;
use App\Models\Role;
use App\Models\User;
use App\Models\UserKycVerification;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class UserKycVerificationTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        
        // Seed roles
        Role::create(['name' => 'Admin', 'slug' => 'admin', 'level' => 1]);
        Role::create(['name' => 'Customer', 'slug' => 'customer', 'level' => 2]);
        Role::create(['name' => 'Agent', 'slug' => 'agent', 'level' => 3]);
    }

    /** @test */
    public function it_belongs_to_a_user()
    {
        $user = User::factory()->create();
        $user->roles()->attach(2);
        
        $kyc = UserKycVerification::create([
            'user_id' => $user->id,
            'kyc_tier' => 'basic',
            'status' => 'pending',
        ]);

        $this->assertInstanceOf(User::class, $kyc->user);
        $this->assertEquals($user->id, $kyc->user->id);
    }

    /** @test */
    public function it_belongs_to_a_reviewer()
    {
        $admin = User::factory()->create();
        $admin->roles()->attach(1);
        
        $customer = User::factory()->create();
        $customer->roles()->attach(2);
        
        $kyc = UserKycVerification::create([
            'user_id' => $customer->id,
            'kyc_tier' => 'business',
            'status' => 'approved',
            'reviewed_by' => $admin->id,
        ]);

        $this->assertInstanceOf(User::class, $kyc->reviewer);
        $this->assertEquals($admin->id, $kyc->reviewer->id);
    }

    /** @test */
    public function is_pending_returns_true_for_pending_status()
    {
        $kyc = new UserKycVerification([
            'status' => 'pending',
        ]);

        $this->assertTrue($kyc->isPending());
    }

    /** @test */
    public function is_approved_returns_true_for_approved_status()
    {
        $kyc = new UserKycVerification([
            'status' => 'approved',
        ]);

        $this->assertTrue($kyc->isApproved());
    }

    /** @test */
    public function is_rejected_returns_true_for_rejected_status()
    {
        $kyc = new UserKycVerification([
            'status' => 'rejected',
        ]);

        $this->assertTrue($kyc->isRejected());
    }

    /** @test */
    public function can_verify_phone_returns_true_when_phone_not_verified()
    {
        $kyc = new UserKycVerification([
            'kyc_tier' => 'basic',
            'phone_verified_at' => null,
        ]);

        $this->assertTrue($kyc->canVerifyPhone());
    }

    /** @test */
    public function can_verify_phone_returns_false_when_phone_already_verified()
    {
        $kyc = new UserKycVerification([
            'kyc_tier' => 'basic',
            'phone_verified_at' => now(),
        ]);

        $this->assertFalse($kyc->canVerifyPhone());
    }

    /** @test */
    public function needs_renewal_returns_true_when_expiring_within_60_days()
    {
        $kyc = new UserKycVerification([
            'status' => 'approved',
            'expires_at' => now()->addDays(45),
        ]);

        $this->assertTrue($kyc->needsRenewal());
    }

    /** @test */
    public function needs_renewal_returns_false_when_expiring_after_60_days()
    {
        $kyc = new UserKycVerification([
            'status' => 'approved',
            'expires_at' => now()->addDays(100),
        ]);

        $this->assertFalse($kyc->needsRenewal());
    }

    /** @test */
    public function all_documents_approved_returns_true_when_all_business_docs_approved()
    {
        $kyc = new UserKycVerification([
            'kyc_tier' => 'business',
            'status' => 'approved',
            'id_document_status' => 'approved',
            'business_document_status' => 'approved',
            'selfie_with_id_status' => 'approved',
        ]);

        $this->assertTrue($kyc->allDocumentsApproved());
    }

    /** @test */
    public function all_documents_approved_returns_false_when_any_doc_not_approved()
    {
        $kyc = new UserKycVerification([
            'kyc_tier' => 'business',
            'id_document_status' => 'approved',
            'business_document_status' => 'pending',
            'selfie_with_id_status' => 'approved',
        ]);

        $this->assertFalse($kyc->allDocumentsApproved());
    }

    /** @test */
    public function pending_scope_returns_only_pending_verifications()
    {
        $user1 = User::factory()->create();
        $user1->roles()->attach(2);
        $user2 = User::factory()->create();
        $user2->roles()->attach(2);
        $user3 = User::factory()->create();
        $user3->roles()->attach(2);
        
        UserKycVerification::create([
            'user_id' => $user1->id,
            'kyc_tier' => 'basic',
            'status' => 'pending',
        ]);
        
        UserKycVerification::create([
            'user_id' => $user2->id,
            'kyc_tier' => 'business',
            'status' => 'approved',
        ]);
        
        UserKycVerification::create([
            'user_id' => $user3->id,
            'kyc_tier' => 'business',
            'status' => 'pending',
        ]);

        $pending = UserKycVerification::pending()->get();

        $this->assertCount(2, $pending);
    }

    /** @test */
    public function approved_scope_returns_only_approved_verifications()
    {
        $user1 = User::factory()->create();
        $user1->roles()->attach(2);
        $user2 = User::factory()->create();
        $user2->roles()->attach(2);
        
        UserKycVerification::create([
            'user_id' => $user1->id,
            'kyc_tier' => 'basic',
            'status' => 'pending',
        ]);
        
        UserKycVerification::create([
            'user_id' => $user2->id,
            'kyc_tier' => 'business',
            'status' => 'approved',
        ]);

        $approved = UserKycVerification::approved()->get();

        $this->assertCount(1, $approved);
    }

    /** @test */
    public function basic_tier_scope_returns_only_basic_tier_verifications()
    {
        $user1 = User::factory()->create();
        $user1->roles()->attach(2);
        $user2 = User::factory()->create();
        $user2->roles()->attach(2);
        
        UserKycVerification::create([
            'user_id' => $user1->id,
            'kyc_tier' => 'basic',
            'status' => 'approved',
        ]);
        
        UserKycVerification::create([
            'user_id' => $user2->id,
            'kyc_tier' => 'business',
            'status' => 'approved',
        ]);

        $basicTier = UserKycVerification::basicTier()->get();

        $this->assertCount(1, $basicTier);
    }

    /** @test */
    public function business_tier_scope_returns_only_business_tier_verifications()
    {
        $user1 = User::factory()->create();
        $user1->roles()->attach(2);
        $user2 = User::factory()->create();
        $user2->roles()->attach(2);
        
        UserKycVerification::create([
            'user_id' => $user1->id,
            'kyc_tier' => 'basic',
            'status' => 'approved',
        ]);
        
        UserKycVerification::create([
            'user_id' => $user2->id,
            'kyc_tier' => 'business',
            'status' => 'approved',
        ]);

        $businessTier = UserKycVerification::businessTier()->get();

        $this->assertCount(1, $businessTier);
    }

    /** @test */
    public function expiring_within_scope_returns_verifications_expiring_within_given_days()
    {
        $user1 = User::factory()->create();
        $user1->roles()->attach(2);
        $user2 = User::factory()->create();
        $user2->roles()->attach(2);
        $user3 = User::factory()->create();
        $user3->roles()->attach(2);
        
        UserKycVerification::create([
            'user_id' => $user1->id,
            'kyc_tier' => 'basic',
            'status' => 'approved',
            'expires_at' => now()->addDays(45),
        ]);
        
        UserKycVerification::create([
            'user_id' => $user2->id,
            'kyc_tier' => 'basic',
            'status' => 'approved',
            'expires_at' => now()->addDays(100),
        ]);
        
        UserKycVerification::create([
            'user_id' => $user3->id,
            'kyc_tier' => 'business',
            'status' => 'approved',
            'expires_at' => now()->addDays(30),
        ]);

        $expiringSoon = UserKycVerification::expiringWithin(60)->get();

        $this->assertCount(2, $expiringSoon);
    }

    /** @test */
    public function user_helper_methods_work_correctly()
    {
        $user = User::factory()->create();
        $user->roles()->attach(2);
        
        // Test unverified
        $this->assertTrue($user->isKycUnverified());
        $this->assertFalse($user->isKycBasic());
        $this->assertFalse($user->isKycBusiness());
        
        // Create basic KYC
        UserKycVerification::create([
            'user_id' => $user->id,
            'kyc_tier' => 'basic',
            'status' => 'approved',
            'phone_number' => '+15551234567',
            'phone_verified_at' => now(),
        ]);
        
        $user->refresh();
        $this->assertFalse($user->isKycUnverified());
        $this->assertTrue($user->isKycBasic());
        $this->assertFalse($user->isKycBusiness());
    }

    /** @test */
    public function user_can_access_feature_checks_kyc_tier()
    {
        $user = User::factory()->create();
        $user->roles()->attach(2);
        
        // Unverified user
        $this->assertFalse($user->canAccessFeature('campaigns'));
        
        // Basic KYC
        UserKycVerification::create([
            'user_id' => $user->id,
            'kyc_tier' => 'basic',
            'status' => 'approved',
        ]);
        
        $user->refresh();
        $this->assertTrue($user->canAccessFeature('campaigns'));
        $this->assertFalse($user->canAccessFeature('ai_agents'));
    }

    /** @test */
    public function user_kyc_limits_are_correct_for_each_tier()
    {
        $user = User::factory()->create();
        $user->roles()->attach(2);
        
        // Unverified limits
        $limits = $user->getKycLimits();
        $this->assertEquals(0, $limits['max_phone_numbers']);
        $this->assertEquals(0, $limits['max_calls_per_day']);
        
        // Basic limits
        UserKycVerification::create([
            'user_id' => $user->id,
            'kyc_tier' => 'basic',
            'status' => 'approved',
        ]);
        
        $user->refresh();
        $limits = $user->getKycLimits();
        $this->assertEquals(3, $limits['max_phone_numbers']);
        $this->assertEquals(100, $limits['max_calls_per_day']);
        $this->assertEquals(500, $limits['max_deposit']);
        
        // Business limits (unlimited)
        $user->kycVerification->update(['kyc_tier' => 'business']);
        $user->refresh();
        
        $limits = $user->getKycLimits();
        $this->assertNull($limits['max_phone_numbers']);
        $this->assertNull($limits['max_calls_per_day']);
        $this->assertNull($limits['max_deposit']);
    }
}

<?php

namespace Tests\Feature;

use App\Models\User;
use App\Models\Contact;
use App\Models\Campaign;
use App\Models\CampaignContact;
use App\Models\FollowUpSequence;
use App\Models\SequenceEnrollment;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class FollowUpSequenceTest extends TestCase
{
    use RefreshDatabase;

    /**
     * Test creating a sequence via API
     */
    public function test_can_create_sequence(): void
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user, 'sanctum')->postJson('/api/v1/sequences', [
            'name' => 'No Answer Follow-Up',
            'description' => 'Automated follow-up for no answer calls',
            'trigger_type' => 'no_answer',
            'is_active' => true,
            'use_smart_timing' => true,
            'priority' => 8,
            'steps' => [
                [
                    'step_name' => 'First retry call',
                    'delay_amount' => 24,
                    'delay_unit' => 'hours',
                    'action_type' => 'call',
                    'action_config' => [],
                ],
                [
                    'step_name' => 'Send SMS',
                    'delay_amount' => 48,
                    'delay_unit' => 'hours',
                    'action_type' => 'sms',
                    'action_config' => ['message' => 'Follow-up message'],
                ],
            ],
        ]);

        $response->assertStatus(201)
            ->assertJson([
                'success' => true,
                'data' => [
                    'name' => 'No Answer Follow-Up',
                    'trigger_type' => 'no_answer',
                    'is_active' => true,
                ],
            ]);

        $this->assertDatabaseHas('follow_up_sequences', [
            'name' => 'No Answer Follow-Up',
            'user_id' => $user->id,
        ]);

        $this->assertDatabaseCount('sequence_steps', 2);
    }

    /**
     * Test listing sequences
     */
    public function test_can_list_sequences(): void
    {
        $user = User::factory()->create();
        
        FollowUpSequence::factory()->create(['user_id' => $user->id, 'name' => 'Sequence 1']);
        FollowUpSequence::factory()->create(['user_id' => $user->id, 'name' => 'Sequence 2']);
        
        // Another user's sequence (should not be visible)
        $otherUser = User::factory()->create();
        FollowUpSequence::factory()->create(['user_id' => $otherUser->id, 'name' => 'Other Sequence']);

        $response = $this->actingAs($user, 'sanctum')->getJson('/api/v1/sequences');

        $response->assertStatus(200);
        
        $data = $response->json('data');
        $this->assertCount(2, $data);
    }

    /**
     * Test activating/deactivating a sequence
     */
    public function test_can_activate_and_deactivate_sequence(): void
    {
        $user = User::factory()->create();
        $sequence = FollowUpSequence::factory()->create([
            'user_id' => $user->id,
            'is_active' => false,
        ]);

        // Activate
        $response = $this->actingAs($user, 'sanctum')
            ->postJson("/api/v1/sequences/{$sequence->id}/activate");

        $response->assertStatus(200);
        $this->assertTrue($sequence->fresh()->is_active);

        // Deactivate
        $response = $this->actingAs($user, 'sanctum')
            ->postJson("/api/v1/sequences/{$sequence->id}/deactivate");

        $response->assertStatus(200);
        $this->assertFalse($sequence->fresh()->is_active);
    }

    /**
     * Test manual contact enrollment
     */
    public function test_can_manually_enroll_contact(): void
    {
        $user = User::factory()->create();
        $contact = Contact::factory()->create(['user_id' => $user->id]);
        $campaign = Campaign::factory()->create(['user_id' => $user->id]);
        $campaignContact = CampaignContact::factory()->create([
            'campaign_id' => $campaign->id,
            'contact_id' => $contact->id,
        ]);
        $sequence = FollowUpSequence::factory()->create([
            'user_id' => $user->id,
            'is_active' => true,
        ]);

        $response = $this->actingAs($user, 'sanctum')
            ->postJson("/api/v1/contacts/{$contact->id}/enroll", [
                'sequence_id' => $sequence->id,
                'campaign_contact_id' => $campaignContact->id,
            ]);

        $response->assertStatus(200)
            ->assertJson(['success' => true]);

        $this->assertDatabaseHas('sequence_enrollments', [
            'sequence_id' => $sequence->id,
            'contact_id' => $contact->id,
            'campaign_contact_id' => $campaignContact->id,
            'status' => 'active',
        ]);
    }

    /**
     * Test preventing duplicate enrollments
     */
    public function test_prevents_duplicate_enrollments(): void
    {
        $user = User::factory()->create();
        $contact = Contact::factory()->create(['user_id' => $user->id]);
        $campaign = Campaign::factory()->create(['user_id' => $user->id]);
        $campaignContact = CampaignContact::factory()->create([
            'campaign_id' => $campaign->id,
            'contact_id' => $contact->id,
        ]);
        $sequence = FollowUpSequence::factory()->create([
            'user_id' => $user->id,
            'is_active' => true,
        ]);

        // First enrollment
        SequenceEnrollment::create([
            'sequence_id' => $sequence->id,
            'contact_id' => $contact->id,
            'campaign_contact_id' => $campaignContact->id,
            'campaign_id' => $campaign->id,
            'status' => 'active',
            'current_step' => 0,
            'steps_completed' => 0,
            'enrolled_at' => now(),
        ]);

        // Second enrollment attempt
        $response = $this->actingAs($user, 'sanctum')
            ->postJson("/api/v1/contacts/{$contact->id}/enroll", [
                'sequence_id' => $sequence->id,
                'campaign_contact_id' => $campaignContact->id,
            ]);

        $response->assertStatus(400)
            ->assertJson(['success' => false]);

        $this->assertDatabaseCount('sequence_enrollments', 1);
    }

    /**
     * Test getting sequence analytics
     */
    public function test_can_get_sequence_analytics(): void
    {
        $user = User::factory()->create();
        $sequence = FollowUpSequence::factory()->create([
            'user_id' => $user->id,
            'total_enrolled' => 100,
            'total_completed' => 80,
            'total_converted' => 40,
            'conversion_rate' => 50.00,
        ]);

        $response = $this->actingAs($user, 'sanctum')
            ->getJson("/api/v1/sequences/{$sequence->id}/analytics");

        $response->assertStatus(200)
            ->assertJson([
                'success' => true,
                'data' => [
                    'total_enrolled' => 100,
                    'completed' => 80,
                    'converted' => 40,
                ],
            ]);
    }

    /**
     * Test authorization - user cannot access another user's sequence
     */
    public function test_cannot_access_other_users_sequence(): void
    {
        $user1 = User::factory()->create();
        $user2 = User::factory()->create();
        
        $sequence = FollowUpSequence::factory()->create(['user_id' => $user1->id]);

        $response = $this->actingAs($user2, 'sanctum')
            ->getJson("/api/v1/sequences/{$sequence->id}");

        $response->assertStatus(403);
    }
}

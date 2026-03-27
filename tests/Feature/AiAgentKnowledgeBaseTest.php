<?php

namespace Tests\Feature;

use App\Models\AiAgent;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use PHPUnit\Framework\Attributes\Group;
use Tests\TestCase;

#[Group('ai-agent')]
#[Group('knowledge-base')]
class AiAgentKnowledgeBaseTest extends TestCase
{
    use RefreshDatabase;

    protected User $user;

    protected function setUp(): void
    {
        parent::setUp();
        $this->user = User::factory()->create();
    }

    public function test_can_create_agent_without_knowledge_base(): void
    {
        config(['openrouter.api_key' => 'test-key']);

        $payload = $this->validAgentPayload();
        unset($payload['knowledge_base']);

        $response = $this->actingAs($this->user, 'sanctum')
            ->postJson('/api/v1/ai-agents', $payload);

        $response->assertStatus(201);
        $response->assertJsonPath('agent.name', $payload['name']);
        $agent = AiAgent::find($response->json('agent.id'));
        $this->assertNull($agent->knowledge_base);
    }

    public function test_can_create_agent_with_null_knowledge_base(): void
    {
        config(['openrouter.api_key' => 'test-key']);

        $payload = $this->validAgentPayload();
        $payload['knowledge_base'] = null;

        $response = $this->actingAs($this->user, 'sanctum')
            ->postJson('/api/v1/ai-agents', $payload);

        $response->assertStatus(201);
        $agent = AiAgent::find($response->json('agent.id'));
        $this->assertNull($agent->knowledge_base);
    }

    public function test_can_create_agent_with_empty_string_knowledge_base(): void
    {
        config(['openrouter.api_key' => 'test-key']);

        $payload = $this->validAgentPayload();
        $payload['knowledge_base'] = '';

        $response = $this->actingAs($this->user, 'sanctum')
            ->postJson('/api/v1/ai-agents', $payload);

        $response->assertStatus(201);
        $agent = AiAgent::find($response->json('agent.id'));
        $this->assertTrue($agent->knowledge_base === '' || $agent->knowledge_base === null);
    }

    public function test_can_create_agent_with_knowledge_base(): void
    {
        config(['openrouter.api_key' => 'test-key']);

        $payload = $this->validAgentPayload();
        $payload['knowledge_base'] = 'Our business hours are 9am-5pm.';

        $response = $this->actingAs($this->user, 'sanctum')
            ->postJson('/api/v1/ai-agents', $payload);

        $response->assertStatus(201);
        $agent = AiAgent::find($response->json('agent.id'));
        $this->assertSame('Our business hours are 9am-5pm.', $agent->knowledge_base);
    }

    public function test_can_update_agent_to_empty_knowledge_base(): void
    {
        config(['openrouter.api_key' => 'test-key']);

        $agent = AiAgent::create(array_merge($this->validAgentPayload(), [
            'knowledge_base' => 'Some existing KB content.',
        ]));

        $response = $this->actingAs($this->user, 'sanctum')
            ->putJson("/api/v1/ai-agents/{$agent->id}", [
                'knowledge_base' => '',
            ]);

        $response->assertStatus(200);
        $agent->refresh();
        $this->assertTrue($agent->knowledge_base === '' || $agent->knowledge_base === null);
    }

    public function test_can_update_agent_to_null_knowledge_base(): void
    {
        config(['openrouter.api_key' => 'test-key']);

        $agent = AiAgent::create(array_merge($this->validAgentPayload(), [
            'knowledge_base' => 'Some existing KB content.',
        ]));

        $response = $this->actingAs($this->user, 'sanctum')
            ->putJson("/api/v1/ai-agents/{$agent->id}", [
                'knowledge_base' => null,
            ]);

        $response->assertStatus(200);
        $agent->refresh();
        $this->assertNull($agent->knowledge_base);
    }

    public function test_can_update_agent_with_new_knowledge_base(): void
    {
        config(['openrouter.api_key' => 'test-key']);

        $agent = AiAgent::create(array_merge($this->validAgentPayload(), [
            'knowledge_base' => 'Old content.',
        ]));

        $newKb = 'New KB: Support hours 8am-8pm. Refunds within 30 days.';
        $response = $this->actingAs($this->user, 'sanctum')
            ->putJson("/api/v1/ai-agents/{$agent->id}", [
                'knowledge_base' => $newKb,
            ]);

        $response->assertStatus(200);
        $agent->refresh();
        $this->assertSame($newKb, $agent->knowledge_base);
    }

    public function test_show_agent_returns_knowledge_base(): void
    {
        config(['openrouter.api_key' => 'test-key']);

        $agent = AiAgent::create(array_merge($this->validAgentPayload(), [
            'knowledge_base' => 'Visible KB content for show.',
        ]));

        $response = $this->actingAs($this->user, 'sanctum')
            ->getJson("/api/v1/ai-agents/{$agent->id}");

        $response->assertStatus(200);
        $response->assertJsonPath('data.knowledge_base', 'Visible KB content for show.');
    }

    public function test_show_agent_with_null_knowledge_base(): void
    {
        config(['openrouter.api_key' => 'test-key']);

        $agent = AiAgent::create(array_merge($this->validAgentPayload(), [
            'knowledge_base' => null,
        ]));

        $response = $this->actingAs($this->user, 'sanctum')
            ->getJson("/api/v1/ai-agents/{$agent->id}");

        $response->assertStatus(200);
        $this->assertTrue(
            $response->json('data.knowledge_base') === null || $response->json('data.knowledge_base') === '',
            'knowledge_base should be null or empty in response'
        );
    }

    public function test_create_agent_response_includes_knowledge_base_field(): void
    {
        config(['openrouter.api_key' => 'test-key']);

        $payload = $this->validAgentPayload();
        $payload['knowledge_base'] = 'Included in response.';

        $response = $this->actingAs($this->user, 'sanctum')
            ->postJson('/api/v1/ai-agents', $payload);

        $response->assertStatus(201);
        $response->assertJsonPath('agent.knowledge_base', 'Included in response.');
    }

    protected function validAgentPayload(): array
    {
        return [
            'name' => 'Test AI Agent',
            'type' => 'inbound',
            'system_prompt' => 'You are a helpful assistant.',
            'model' => 'openai/gpt-oss-20b:free',
            'voice' => 'alloy',
        ];
    }
}

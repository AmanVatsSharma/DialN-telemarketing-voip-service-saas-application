<?php

namespace Tests\Unit\Services;

use App\Models\AiAgent;
use App\Models\AiAgentCall;
use App\Services\AiAgent\ConversationEngine;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Http;
use PHPUnit\Framework\Attributes\Group;
use Tests\TestCase;

#[Group('ai-agent')]
#[Group('knowledge-base')]
class ConversationEngineTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        config(['openrouter.api_key' => 'test-key']);
    }

    public function test_knowledge_base_is_capped_in_system_prompt(): void
    {
        config(['ai-agent.max_knowledge_base_chars' => 50]);

        $longKb = str_repeat('x', 200);
        $agent = AiAgent::create([
            'name' => 'Test Agent',
            'type' => 'inbound',
            'text_provider' => 'openrouter',
            'system_prompt' => 'You are helpful.',
            'knowledge_base' => $longKb,
            'model' => 'test-model',
            'voice' => 'alloy',
        ]);

        $call = AiAgentCall::create([
            'ai_agent_id' => $agent->id,
            'call_sid' => 'CA' . uniqid(),
            'direction' => 'inbound',
            'from_number' => '+15551234567',
            'to_number' => '+15559876543',
            'status' => 'in-progress',
            'started_at' => now(),
            'answered_at' => now(),
            'turn_count' => 0,
        ]);

        Http::fake([
            '*' => Http::response([
                'choices' => [['message' => ['content' => 'Hello!']]],
                'usage' => ['prompt_tokens' => 10, 'completion_tokens' => 5, 'total_tokens' => 15],
            ], 200),
        ]);

        $engine = new ConversationEngine($agent);
        $engine->generateResponse($agent, $call, 'Hi');

        $requests = Http::recorded();
        $this->assertCount(1, $requests);

        $sentRequest = $requests[0][0];
        $body = json_decode($sentRequest->body(), true);
        $this->assertIsArray($body);
        $this->assertArrayHasKey('messages', $body);

        $systemMessage = collect($body['messages'])->firstWhere('role', 'system');
        $this->assertNotNull($systemMessage);
        $content = $systemMessage['content'];

        $this->assertStringContainsString('CONTEXT AND KNOWLEDGE BASE', $content);
        $start = strpos($content, 'CONTEXT AND KNOWLEDGE BASE:');
        $end = strpos($content, 'CUSTOM INSTRUCTIONS:', $start);
        $this->assertNotFalse($end);
        $kbSection = substr($content, $start, $end - $start);
        $kbContent = trim(substr($kbSection, strlen('CONTEXT AND KNOWLEDGE BASE:')));
        $this->assertLessThanOrEqual(60, strlen($kbContent), 'KB section should be capped (50 chars + suffix)');
        $this->assertLessThan(strlen($longKb), strlen($kbContent), 'Capped KB should be shorter than original');
    }

    public function test_empty_knowledge_base_omits_context_section(): void
    {
        $agent = AiAgent::create([
            'name' => 'Test Agent',
            'type' => 'inbound',
            'text_provider' => 'openrouter',
            'system_prompt' => 'You are helpful.',
            'knowledge_base' => null,
            'model' => 'test-model',
            'voice' => 'alloy',
        ]);

        $call = AiAgentCall::create([
            'ai_agent_id' => $agent->id,
            'call_sid' => 'CA' . uniqid(),
            'direction' => 'inbound',
            'from_number' => '+15551234567',
            'to_number' => '+15559876543',
            'status' => 'in-progress',
            'started_at' => now(),
            'answered_at' => now(),
            'turn_count' => 0,
        ]);

        Http::fake([
            '*' => Http::response([
                'choices' => [['message' => ['content' => 'Hello!']]],
                'usage' => ['prompt_tokens' => 10, 'completion_tokens' => 5, 'total_tokens' => 15],
            ], 200),
        ]);

        $engine = new ConversationEngine($agent);
        $engine->generateResponse($agent, $call, 'Hi');

        $requests = Http::recorded();
        $sentRequest = $requests[0][0];
        $body = json_decode($sentRequest->body(), true);
        $systemMessage = collect($body['messages'])->firstWhere('role', 'system');
        $content = $systemMessage['content'];

        $this->assertStringNotContainsString('CONTEXT AND KNOWLEDGE BASE', $content);
    }

    public function test_whitespace_only_knowledge_base_omits_context_section(): void
    {
        $agent = AiAgent::create([
            'name' => 'Test Agent',
            'type' => 'inbound',
            'text_provider' => 'openrouter',
            'system_prompt' => 'You are helpful.',
            'knowledge_base' => '   ',
            'model' => 'test-model',
            'voice' => 'alloy',
        ]);

        $call = AiAgentCall::create([
            'ai_agent_id' => $agent->id,
            'call_sid' => 'CA' . uniqid(),
            'direction' => 'inbound',
            'from_number' => '+15551234567',
            'to_number' => '+15559876543',
            'status' => 'in-progress',
            'started_at' => now(),
            'answered_at' => now(),
            'turn_count' => 0,
        ]);

        Http::fake([
            '*' => Http::response([
                'choices' => [['message' => ['content' => 'Hello!']]],
                'usage' => ['prompt_tokens' => 10, 'completion_tokens' => 5, 'total_tokens' => 15],
            ], 200),
        ]);

        $engine = new ConversationEngine($agent);
        $engine->generateResponse($agent, $call, 'Hi');

        $requests = Http::recorded();
        $sentRequest = $requests[0][0];
        $body = json_decode($sentRequest->body(), true);
        $systemMessage = collect($body['messages'])->firstWhere('role', 'system');
        $content = $systemMessage['content'];

        $this->assertStringNotContainsString('CONTEXT AND KNOWLEDGE BASE', $content);
    }

    public function test_knowledge_base_with_zero_cap_includes_full_content(): void
    {
        config(['ai-agent.max_knowledge_base_chars' => 0]);

        $fullKb = 'Our business hours are 9am to 5pm. We sell widgets.';
        $agent = AiAgent::create([
            'name' => 'Test Agent',
            'type' => 'inbound',
            'text_provider' => 'openrouter',
            'system_prompt' => 'You are helpful.',
            'knowledge_base' => $fullKb,
            'model' => 'test-model',
            'voice' => 'alloy',
        ]);

        $call = AiAgentCall::create([
            'ai_agent_id' => $agent->id,
            'call_sid' => 'CA' . uniqid(),
            'direction' => 'inbound',
            'from_number' => '+15551234567',
            'to_number' => '+15559876543',
            'status' => 'in-progress',
            'started_at' => now(),
            'answered_at' => now(),
            'turn_count' => 0,
        ]);

        Http::fake([
            '*' => Http::response([
                'choices' => [['message' => ['content' => 'Hello!']]],
                'usage' => ['prompt_tokens' => 10, 'completion_tokens' => 5, 'total_tokens' => 15],
            ], 200),
        ]);

        $engine = new ConversationEngine($agent);
        $engine->generateResponse($agent, $call, 'Hi');

        $requests = Http::recorded();
        $sentRequest = $requests[0][0];
        $body = json_decode($sentRequest->body(), true);
        $systemMessage = collect($body['messages'])->firstWhere('role', 'system');
        $content = $systemMessage['content'];

        $this->assertStringContainsString('CONTEXT AND KNOWLEDGE BASE', $content);
        $this->assertStringContainsString($fullKb, $content);
    }

    public function test_knowledge_base_shorter_than_cap_is_unchanged(): void
    {
        config(['ai-agent.max_knowledge_base_chars' => 4000]);

        $shortKb = 'We are open 9-5.';
        $agent = AiAgent::create([
            'name' => 'Test Agent',
            'type' => 'inbound',
            'text_provider' => 'openrouter',
            'system_prompt' => 'You are helpful.',
            'knowledge_base' => $shortKb,
            'model' => 'test-model',
            'voice' => 'alloy',
        ]);

        $call = AiAgentCall::create([
            'ai_agent_id' => $agent->id,
            'call_sid' => 'CA' . uniqid(),
            'direction' => 'inbound',
            'from_number' => '+15551234567',
            'to_number' => '+15559876543',
            'status' => 'in-progress',
            'started_at' => now(),
            'answered_at' => now(),
            'turn_count' => 0,
        ]);

        Http::fake([
            '*' => Http::response([
                'choices' => [['message' => ['content' => 'Hello!']]],
                'usage' => ['prompt_tokens' => 10, 'completion_tokens' => 5, 'total_tokens' => 15],
            ], 200),
        ]);

        $engine = new ConversationEngine($agent);
        $engine->generateResponse($agent, $call, 'Hi');

        $requests = Http::recorded();
        $sentRequest = $requests[0][0];
        $body = json_decode($sentRequest->body(), true);
        $systemMessage = collect($body['messages'])->firstWhere('role', 'system');
        $content = $systemMessage['content'];

        $this->assertStringContainsString('CONTEXT AND KNOWLEDGE BASE', $content);
        $this->assertStringContainsString($shortKb, $content);
    }

    public function test_generate_response_returns_content_action_usage_and_model(): void
    {
        $agent = AiAgent::create([
            'name' => 'Test Agent',
            'type' => 'inbound',
            'text_provider' => 'openrouter',
            'system_prompt' => 'You are helpful.',
            'knowledge_base' => 'FAQ: We sell widgets.',
            'model' => 'test-model',
            'voice' => 'alloy',
        ]);

        $call = AiAgentCall::create([
            'ai_agent_id' => $agent->id,
            'call_sid' => 'CA' . uniqid(),
            'direction' => 'inbound',
            'from_number' => '+15551234567',
            'to_number' => '+15559876543',
            'status' => 'in-progress',
            'started_at' => now(),
            'answered_at' => now(),
            'turn_count' => 0,
        ]);

        Http::fake([
            '*' => Http::response([
                'choices' => [['message' => ['content' => 'How can I help?']]],
                'usage' => ['prompt_tokens' => 20, 'completion_tokens' => 6, 'total_tokens' => 26],
            ], 200),
        ]);

        $engine = new ConversationEngine($agent);
        $result = $engine->generateResponse($agent, $call, 'Hi');

        $this->assertIsArray($result);
        $this->assertSame('How can I help?', $result['content']);
        $this->assertSame('continue', $result['action']);
        $this->assertSame(['prompt_tokens' => 20, 'completion_tokens' => 6, 'total_tokens' => 26], $result['usage']);
        $this->assertSame('test-model', $result['model']);
    }

    public function test_generate_response_returns_null_when_api_returns_empty_content(): void
    {
        $agent = AiAgent::create([
            'name' => 'Test Agent',
            'type' => 'inbound',
            'text_provider' => 'openrouter',
            'system_prompt' => 'You are helpful.',
            'knowledge_base' => null,
            'model' => 'test-model',
            'voice' => 'alloy',
        ]);

        $call = AiAgentCall::create([
            'ai_agent_id' => $agent->id,
            'call_sid' => 'CA' . uniqid(),
            'direction' => 'inbound',
            'from_number' => '+15551234567',
            'to_number' => '+15559876543',
            'status' => 'in-progress',
            'started_at' => now(),
            'answered_at' => now(),
            'turn_count' => 0,
        ]);

        Http::fake([
            '*' => Http::response([
                'choices' => [['message' => ['content' => '   ']]],
                'usage' => ['prompt_tokens' => 10, 'completion_tokens' => 0, 'total_tokens' => 10],
            ], 200),
        ]);

        $engine = new ConversationEngine($agent);
        $result = $engine->generateResponse($agent, $call, 'Hi');

        $this->assertNull($result);
    }
}

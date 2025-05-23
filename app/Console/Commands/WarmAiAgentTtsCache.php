<?php

namespace App\Console\Commands;

use App\Models\AiAgent;
use App\Services\AiAgent\ConversationEngine;
use App\Services\AiAgent\OpenAiTtsService;
use Illuminate\Console\Command;

class WarmAiAgentTtsCache extends Command
{
    protected $signature = 'ai-agent:warm-tts-cache
                            {--agent= : Warm cache for a single agent by ID}
                            {--all : Warm cache for all active agents (default if no --agent)}';

    protected $description = 'Warm TTS cache for agent phrases (greeting, goodbye, transfer) to reduce first-call latency';

    public function handle(): int
    {
        $agentId = $this->option('agent');
        $all = $this->option('all') || $agentId === null;

        $agents = $all
            ? AiAgent::where('active', true)->get()
            : AiAgent::where('id', $agentId)->get();

        if ($agents->isEmpty()) {
            $this->warn($agentId ? "No agent found with ID {$agentId}." : 'No active agents found.');
            return Command::FAILURE;
        }

        $transferText = config('ai-agent.transfer.confirmation', "I'll transfer you to a human agent right away. Please hold.");

        foreach ($agents as $agent) {
            $this->info("Warming TTS cache for agent: {$agent->name} (ID: {$agent->id})");

            try {
                $engine = new ConversationEngine($agent);
                $tts = new OpenAiTtsService($agent);

                $greeting = $engine->generateGreeting($agent);
                $goodbye = $engine->generateGoodbye($agent);

                $tts->generateForTwilio($greeting, $agent->voice);
                $this->line('  ✓ Greeting');
                $tts->generateForTwilio($goodbye, $agent->voice);
                $this->line('  ✓ Goodbye');
                $tts->generateForTwilio($transferText, $agent->voice);
                $this->line('  ✓ Transfer message');
            } catch (\Throwable $e) {
                $this->error("  Failed: {$e->getMessage()}");
            }
        }

        $this->info('TTS cache warming complete.');
        return Command::SUCCESS;
    }
}

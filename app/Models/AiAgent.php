<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class AiAgent extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'name',
        'phone_number',
        'knowledge_base_id',
        'twilio_auto_configured',
        'twilio_webhook_sid',
        'description',
        'type',
        'text_provider',
        'text_api_key',
        'tts_provider',
        'tts_api_key',
        'tts_model',
        'tts_instructions',
        'system_prompt',
        'first_message',
        'goodbye_message',
        'knowledge_base',
        'model',
        'voice',
        'max_tokens',
        'temperature',
        'active',
        'settings',
        'enable_transfer',
        'transfer_number',
        'enable_recording',
        'max_duration',
        'silence_timeout',
        'response_timeout',
        'trigger_keywords',
    ];

    protected $casts = [
        'active' => 'boolean',
        'twilio_auto_configured' => 'boolean',
        'enable_transfer' => 'boolean',
        'enable_recording' => 'boolean',
        'max_tokens' => 'integer',
        'max_duration' => 'integer',
        'silence_timeout' => 'integer',
        'response_timeout' => 'integer',
        'temperature' => 'decimal:2',
        'settings' => 'array',
        'trigger_keywords' => 'array',
        'text_api_key' => 'encrypted',
        'tts_api_key' => 'encrypted',
    ];

    /**
     * Get the selected knowledge base (optional)
     */
    public function knowledgeBase(): BelongsTo
    {
        return $this->belongsTo(KnowledgeBase::class);
    }

    /**
     * Get effective KB content: from selected KB or inline knowledge_base text
     */
    public function getEffectiveKnowledgeBaseContent(): ?string
    {
        if ($this->knowledge_base_id && $this->relationLoaded('knowledgeBase') && $this->knowledgeBase) {
            return trim((string) $this->knowledgeBase->content) ?: null;
        }
        return !empty(trim((string) $this->knowledge_base)) ? trim((string) $this->knowledge_base) : null;
    }

    /**
     * Get all calls for this agent
     */
    public function calls(): HasMany
    {
        return $this->hasMany(AiAgentCall::class);
    }

    /**
     * Get active calls for this agent
     */
    public function activeCalls(): HasMany
    {
        return $this->hasMany(AiAgentCall::class)
            ->whereIn('status', ['initiated', 'ringing', 'in-progress']);
    }

    /**
     * Get completed calls for this agent
     */
    public function completedCalls(): HasMany
    {
        return $this->hasMany(AiAgentCall::class)
            ->where('status', 'completed');
    }

    /**
     * Get campaigns using this agent
     */
    public function campaigns(): HasMany
    {
        return $this->hasMany(Campaign::class);
    }

    /**
     * Scope for active agents
     */
    public function scopeActive($query)
    {
        return $query->where('active', true);
    }

    /**
     * Scope for inbound agents
     */
    public function scopeInbound($query)
    {
        return $query->where('type', 'inbound');
    }

    /**
     * Scope for outbound agents
     */
    public function scopeOutbound($query)
    {
        return $query->where('type', 'outbound');
    }

    /**
     * Get agent statistics
     */
    public function getStats(): array
    {
        $totalCalls = $this->calls()->count();
        $completedCalls = $this->completedCalls()->count();
        $averageDuration = $this->completedCalls()->avg('duration');
        $totalCost = $this->calls()->sum('cost_estimate');

        return [
            'total_calls' => $totalCalls,
            'completed_calls' => $completedCalls,
            'success_rate' => $totalCalls > 0 ? round(($completedCalls / $totalCalls) * 100, 2) : 0,
            'average_duration' => round($averageDuration ?? 0, 2),
            'total_cost' => round($totalCost, 4),
        ];
    }

    /**
     * Check if agent should transfer based on keywords
     */
    public function shouldTransfer(string $userMessage): bool
    {
        if (!$this->enable_transfer || empty($this->trigger_keywords)) {
            return false;
        }

        $message = strtolower($userMessage);
        foreach ($this->trigger_keywords as $keyword) {
            if (str_contains($message, strtolower($keyword))) {
                return true;
            }
        }

        return false;
    }
}

<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Call extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'campaign_id',
        'campaign_contact_id',
        'message_variant_id',
        'call_type',
        'direction',
        'from_number',
        'to_number',
        'twilio_call_sid',
        'status',
        'duration_seconds',
        'recording_url',
        'recording_duration',
        'recording_sid',
        'transcript_sid',
        'transcript_text',
        'transcript_status',
        'transcript_price',
        'answered_by',
        'dtmf_digits',
        'error_message',
        'price',
        'price_unit',
        'started_at',
        'ended_at',
        // AI Sentiment Analysis fields
        'sentiment',
        'sentiment_confidence',
        'lead_score',
        'lead_quality',
        'ai_summary',
        'key_intents',
        'sentiment_analyzed_at',
    ];

    protected $casts = [
        'duration_seconds' => 'integer',
        'recording_duration' => 'integer',
        'price' => 'decimal:4',
        'transcript_price' => 'decimal:4',
        'started_at' => 'datetime',
        'ended_at' => 'datetime',
        // AI Sentiment Analysis casts
        'sentiment_confidence' => 'integer',
        'lead_score' => 'integer',
        'key_intents' => 'array',
        'sentiment_analyzed_at' => 'datetime',
    ];

    protected $appends = ['duration'];

    // Relationships
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function campaign(): BelongsTo
    {
        return $this->belongsTo(Campaign::class);
    }

    public function campaignContact(): BelongsTo
    {
        return $this->belongsTo(CampaignContact::class);
    }

    public function messageVariant(): BelongsTo
    {
        return $this->belongsTo(MessageVariant::class);
    }

    public function logs(): HasMany
    {
        return $this->hasMany(CallLog::class);
    }

    public function dtmfResponses(): HasMany
    {
        return $this->hasMany(CallDtmfResponse::class);
    }

    // Scopes
    public function scopeCompleted($query)
    {
        return $query->where('status', 'completed');
    }

    public function scopeInProgress($query)
    {
        return $query->whereIn('status', ['initiated', 'ringing', 'in-progress']);
    }

    public function scopeFailed($query)
    {
        return $query->where('status', 'failed');
    }

    public function scopeAnswered($query)
    {
        return $query->where('status', 'completed')
            ->whereNotNull('duration_seconds')
            ->where('duration_seconds', '>', 0);
    }

    public function scopeManual($query)
    {
        return $query->where('call_type', 'manual');
    }

    public function scopeCampaign($query)
    {
        return $query->where('call_type', 'campaign');
    }

    // Helper Methods
    public function isCompleted(): bool
    {
        return $this->status === 'completed';
    }

    public function isInProgress(): bool
    {
        return in_array($this->status, ['initiated', 'ringing', 'in-progress']);
    }

    public function wasAnswered(): bool
    {
        return $this->status === 'completed' && $this->duration_seconds > 0;
    }

    public function hasRecording(): bool
    {
        return $this->recording_url !== null;
    }

    public function hasTranscript(): bool
    {
        return $this->transcript_text !== null && $this->transcript_text !== '';
    }

    public function hasDtmf(): bool
    {
        return $this->dtmf_digits !== null && $this->dtmf_digits !== '';
    }

    public function hasSentimentAnalysis(): bool
    {
        return $this->sentiment !== null;
    }

    public function isHotLead(): bool
    {
        return $this->lead_quality === 'hot';
    }

    public function isPositiveSentiment(): bool
    {
        return $this->sentiment === 'positive';
    }

    public function getDurationFormatted(): string
    {
        if ($this->duration_seconds === null) {
            return '0:00';
        }

        $minutes = floor($this->duration_seconds / 60);
        $seconds = $this->duration_seconds % 60;

        return sprintf('%d:%02d', $minutes, $seconds);
    }

    /**
     * Accessor for backward compatibility
     * Returns duration_seconds as duration
     */
    public function getDurationAttribute(): ?int
    {
        return $this->duration_seconds;
    }
}

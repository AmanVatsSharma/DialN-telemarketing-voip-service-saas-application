<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Sequence extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'follow_up_sequences';

    protected $fillable = [
        'user_id',
        'name',
        'description',
        'trigger_type',
        'trigger_conditions',
        'stop_conditions',
        'is_active',
        'use_smart_timing',
        'max_enrollments',
        'priority',
        'total_enrolled',
        'total_completed',
        'total_converted',
        'conversion_rate',
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'use_smart_timing' => 'boolean',
        'priority' => 'integer',
        'trigger_conditions' => 'array',
        'stop_conditions' => 'array',
        'max_enrollments' => 'integer',
        'total_enrolled' => 'integer',
        'total_completed' => 'integer',
        'total_converted' => 'integer',
        'conversion_rate' => 'decimal:2',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
        'deleted_at' => 'datetime',
    ];

    /**
     * Get the user that owns the sequence.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the steps for the sequence.
     */
    public function steps(): HasMany
    {
        return $this->hasMany(SequenceStep::class)->orderBy('step_order');
    }

    /**
     * Get the enrollments for the sequence.
     */
    public function enrollments(): HasMany
    {
        return $this->hasMany(SequenceEnrollment::class);
    }

    /**
     * Get active enrollments.
     */
    public function activeEnrollments(): HasMany
    {
        return $this->hasMany(SequenceEnrollment::class)->where('status', 'active');
    }

    /**
     * Get completed enrollments.
     */
    public function completedEnrollments(): HasMany
    {
        return $this->hasMany(SequenceEnrollment::class)->where('status', 'completed');
    }

    /**
     * Get converted enrollments.
     */
    public function convertedEnrollments(): HasMany
    {
        return $this->hasMany(SequenceEnrollment::class)->where('status', 'converted');
    }

    /**
     * Scope a query to only include active sequences.
     */
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    /**
     * Scope a query to only include sequences for a specific user.
     */
    public function scopeForUser($query, $userId)
    {
        return $query->where('user_id', $userId);
    }

    /**
     * Scope a query to only include sequences for a specific trigger type.
     */
    public function scopeByTrigger($query, $triggerType)
    {
        return $query->where('trigger_type', $triggerType);
    }

    /**
     * Scope a query to order by priority.
     */
    public function scopeByPriority($query)
    {
        return $query->orderBy('priority', 'desc');
    }
}

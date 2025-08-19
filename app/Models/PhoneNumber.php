<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PhoneNumber extends Model
{
    use HasFactory;

    protected $fillable = [
        'number',
        'formatted_number',
        'friendly_name',
        'country_code',
        'area_code',
        'status',
        'source', // NEW: twilio_direct or sip_trunk
        'trunk_phone_number_id', // NEW: link to trunk_phone_numbers
        'trunk_id', // NEW: link to user_sip_trunks
        'twilio_sid',
        'provider_sid',
        'user_id',
        'requested_by',
        'approved_by',
        'capabilities',
        'monthly_cost',
        'original_monthly_cost', // NEW: original price before discount
        'discount_percentage', // NEW: savings percentage
        'notes',
        'ai_agent_id',
        'sms_settings',
        'requested_at',
        'approved_at',
        'assigned_at',
        'released_at',
    ];

    protected $casts = [
        'capabilities' => 'array',
        'sms_settings' => 'array',
        'monthly_cost' => 'decimal:2',
        'original_monthly_cost' => 'decimal:2', // NEW
        'discount_percentage' => 'decimal:2', // NEW
        'requested_at' => 'datetime',
        'approved_at' => 'datetime',
        'assigned_at' => 'datetime',
        'released_at' => 'datetime',
    ];

    /**
     * Get the owner (customer) of this phone number
     */
    public function owner()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    /**
     * Alias for owner relationship (for consistency with frontend)
     */
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    /**
     * Get the customer who requested this number
     */
    public function requester()
    {
        return $this->belongsTo(User::class, 'requested_by');
    }

    /**
     * Get the admin who approved this number
     */
    public function approver()
    {
        return $this->belongsTo(User::class, 'approved_by');
    }

    /**
     * Get all requests for this number
     */
    public function requests()
    {
        return $this->hasMany(NumberRequest::class);
    }

    /**
     * Get campaigns using this phone number
     */
    public function campaigns()
    {
        return $this->hasMany(Campaign::class, 'phone_number_id');
    }

    /**
     * Get the AI agent assigned to this phone number (for SMS automation)
     */
    public function aiAgent()
    {
        return $this->belongsTo(\App\Models\AiAgent::class, 'ai_agent_id');
    }

    /**
     * Get SMS conversations for this phone number
     */
    public function smsConversations()
    {
        return $this->hasMany(SmsConversation::class, 'phone_number_id');
    }

    /**
     * Scope: Get only available numbers
     */
    public function scopeAvailable($query)
    {
        return $query->where('status', 'available');
    }

    /**
     * Scope: Get only assigned numbers
     */
    public function scopeAssigned($query)
    {
        return $query->where('status', 'assigned');
    }

    /**
     * Scope: Get only requested numbers
     */
    public function scopeRequested($query)
    {
        return $query->where('status', 'requested');
    }

    /**
     * Scope: Filter by country code
     */
    public function scopeForCountry($query, $countryCode)
    {
        return $query->where('country_code', $countryCode);
    }

    /**
     * Scope: Filter by area code
     */
    public function scopeForAreaCode($query, $areaCode)
    {
        return $query->where('area_code', $areaCode);
    }

    /**
     * Mark number as requested by a customer
     */
    public function markAsRequested($customerId)
    {
        $this->update([
            'status' => 'requested',
            'requested_by' => $customerId,
            'requested_at' => now(),
        ]);

        return $this;
    }

    /**
     * Assign number to a customer (after approval)
     */
    public function assignToCustomer($customerId, $adminId)
    {
        $this->update([
            'status' => 'assigned',
            'user_id' => $customerId,
            'approved_by' => $adminId,
            'approved_at' => now(),
            'assigned_at' => now(),
        ]);

        return $this;
    }

    /**
     * Release number back to available pool
     */
    public function release()
    {
        $this->update([
            'status' => 'available',
            'user_id' => null,
            'requested_by' => null,
            'released_at' => now(),
        ]);

        return $this;
    }

    /**
     * Check if number supports voice calls
     */
    public function hasVoiceCapability(): bool
    {
        return $this->capabilities['voice'] ?? false;
    }

    /**
     * Check if number supports SMS
     */
    public function hasSmsCapability(): bool
    {
        return $this->capabilities['sms'] ?? false;
    }

    /**
     * Check if number supports MMS
     */
    public function hasMmsCapability(): bool
    {
        return $this->capabilities['mms'] ?? false;
    }

    /**
     * Get formatted phone number for display
     */
    public function getFormattedAttribute(): string
    {
        return $this->formatted_number ?? $this->friendly_name ?? $this->number;
    }

    /**
     * Check if number is owned by a specific user
     */
    public function isOwnedBy($userId): bool
    {
        return $this->user_id == $userId;
    }

    /**
     * Check if number is available for request
     */
    public function isAvailable(): bool
    {
        return $this->status === 'available';
    }

    /**
     * Check if number is currently assigned
     */
    public function isAssigned(): bool
    {
        return $this->status === 'assigned';
    }

    // ============================================
    // SIP TRUNK INTEGRATION RELATIONSHIPS
    // ============================================

    /**
     * Get the trunk phone number record (if from SIP trunk)
     */
    public function trunkPhoneNumber()
    {
        return $this->belongsTo(TrunkPhoneNumber::class, 'trunk_phone_number_id');
    }

    /**
     * Get the SIP trunk this number belongs to (if from trunk)
     */
    public function trunk()
    {
        return $this->belongsTo(UserSipTrunk::class, 'trunk_id');
    }

    /**
     * Check if this number is from a SIP trunk
     */
    public function isTrunkNumber(): bool
    {
        return $this->source === 'sip_trunk';
    }

    /**
     * Check if this number is from direct Twilio
     */
    public function isDirectNumber(): bool
    {
        return $this->source === 'twilio_direct';
    }

    /**
     * Get the savings amount (original - current cost)
     */
    public function getSavingsAmount(): float
    {
        if (!$this->original_monthly_cost) {
            return 0.00;
        }
        return (float) ($this->original_monthly_cost - $this->monthly_cost);
    }

    /**
     * Scope: Get only trunk numbers
     */
    public function scopeFromTrunk($query)
    {
        return $query->where('source', 'sip_trunk');
    }

    /**
     * Scope: Get only direct Twilio numbers
     */
    public function scopeFromDirect($query)
    {
        return $query->where('source', 'twilio_direct');
    }
}


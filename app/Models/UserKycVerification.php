<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Facades\Storage;
use Carbon\Carbon;

class UserKycVerification extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'kyc_tier',
        'status',
        // Tier 1: Phone Verification
        'phone_number',
        'phone_verified_at',
        'phone_verification_code',
        'phone_verification_expires_at',
        'phone_verification_attempts',
        // Tier 2: Business Information
        'business_name',
        'business_registration_number',
        'business_type',
        'business_address_line1',
        'business_address_line2',
        'business_city',
        'business_state',
        'business_postal_code',
        'business_country',
        // Documents
        'id_document_type',
        'id_document_path',
        'id_document_status',
        'business_document_path',
        'business_document_status',
        'selfie_with_id_path',
        'selfie_with_id_status',
        // Admin Review
        'reviewed_by',
        'reviewed_at',
        'rejection_reason',
        'admin_notes',
        // Timestamps
        'submitted_at',
        'approved_at',
        'expires_at',
    ];

    protected $casts = [
        'phone_verified_at' => 'datetime',
        'phone_verification_expires_at' => 'datetime',
        'phone_verification_attempts' => 'integer',
        'reviewed_at' => 'datetime',
        'submitted_at' => 'datetime',
        'approved_at' => 'datetime',
        'expires_at' => 'datetime',
    ];

    protected $hidden = [
        'phone_verification_code',
    ];

    // Relationships
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function reviewer(): BelongsTo
    {
        return $this->belongsTo(User::class, 'reviewed_by');
    }

    // Accessors for document URLs
    public function getIdDocumentUrlAttribute(): ?string
    {
        return $this->id_document_path 
            ? Storage::disk('private')->url($this->id_document_path)
            : null;
    }

    public function getBusinessDocumentUrlAttribute(): ?string
    {
        return $this->business_document_path 
            ? Storage::disk('private')->url($this->business_document_path)
            : null;
    }

    public function getSelfieWithIdUrlAttribute(): ?string
    {
        return $this->selfie_with_id_path 
            ? Storage::disk('private')->url($this->selfie_with_id_path)
            : null;
    }

    // Scopes
    public function scopePending($query)
    {
        return $query->where('status', 'pending');
    }

    public function scopeApproved($query)
    {
        return $query->where('status', 'approved');
    }

    public function scopeRejected($query)
    {
        return $query->where('status', 'rejected');
    }

    public function scopeExpired($query)
    {
        return $query->where('status', 'expired');
    }

    public function scopeBasicTier($query)
    {
        return $query->where('kyc_tier', 'basic');
    }

    public function scopeBusinessTier($query)
    {
        return $query->where('kyc_tier', 'business');
    }

    public function scopeUnverified($query)
    {
        return $query->where('kyc_tier', 'unverified');
    }

    public function scopeExpiringWithin($query, int $days)
    {
        return $query->where('expires_at', '<=', Carbon::now()->addDays($days))
                    ->where('status', 'approved');
    }

    public function scopePendingReview($query)
    {
        return $query->where('status', 'pending')
                    ->whereNotNull('submitted_at')
                    ->orderBy('submitted_at', 'asc');
    }

    // Helper methods
    public function isPending(): bool
    {
        return $this->status === 'pending';
    }

    public function isApproved(): bool
    {
        return $this->status === 'approved';
    }

    public function isRejected(): bool
    {
        return $this->status === 'rejected';
    }

    public function isExpired(): bool
    {
        return $this->status === 'expired' || 
               ($this->expires_at && $this->expires_at->isPast());
    }

    public function isBasicTier(): bool
    {
        return $this->kyc_tier === 'basic';
    }

    public function isBusinessTier(): bool
    {
        return $this->kyc_tier === 'business';
    }

    public function isUnverified(): bool
    {
        return $this->kyc_tier === 'unverified';
    }

    public function canVerifyPhone(): bool
    {
        // Can verify if phone not already verified
        return is_null($this->phone_verified_at) &&
               $this->phone_verification_attempts < 5 &&
               (!$this->phone_verification_expires_at || $this->phone_verification_expires_at->isFuture());
    }

    public function needsRenewal(int $days = 60): bool
    {
        if (!$this->isApproved() || !$this->expires_at) {
            return false;
        }
        
        $daysUntilExpiry = Carbon::now()->diffInDays($this->expires_at, false);
        return $daysUntilExpiry >= 0 && $daysUntilExpiry <= $days;
    }

    public function getFullBusinessAddress(): string
    {
        $parts = array_filter([
            $this->business_address_line1,
            $this->business_address_line2,
            $this->business_city,
            $this->business_state,
            $this->business_postal_code,
            $this->business_country,
        ]);

        return implode(', ', $parts);
    }

    public function getAllDocumentsStatus(): array
    {
        return [
            'id_document' => [
                'status' => $this->id_document_status,
                'uploaded' => !empty($this->id_document_path),
            ],
            'business_document' => [
                'status' => $this->business_document_status,
                'uploaded' => !empty($this->business_document_path),
            ],
            'selfie_with_id' => [
                'status' => $this->selfie_with_id_status,
                'uploaded' => !empty($this->selfie_with_id_path),
            ],
        ];
    }

    public function allDocumentsApproved(): bool
    {
        if ($this->isBasicTier()) {
            return true; // Basic tier doesn't require documents
        }

        return $this->id_document_status === 'approved' &&
               $this->business_document_status === 'approved' &&
               $this->selfie_with_id_status === 'approved';
    }

    public function hasAnyRejectedDocument(): bool
    {
        return $this->id_document_status === 'rejected' ||
               $this->business_document_status === 'rejected' ||
               $this->selfie_with_id_status === 'rejected';
    }
}

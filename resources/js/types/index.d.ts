import { InertiaLinkProps } from '@inertiajs/react';
import { LucideIcon } from 'lucide-react';

export interface Auth {
    user: User;
    kyc?: KycSummary | null;
    isImpersonating?: boolean;
}

export interface KycSummary {
    tier: KycTier;
    status: KycStatus | null;
    is_unverified: boolean;
    grace_period_ends_at: string;
    days_remaining: number;
    is_grace_period_expired: boolean;
    needs_renewal: boolean;
    expires_at: string | null;
    limits: {
        max_phone_numbers: number | null;
        max_calls_per_day: number | null;
        max_deposit: number | null;
    };
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href?: NonNullable<InertiaLinkProps['href']>;
    icon?: LucideIcon | null;
    isActive?: boolean;
    visible?: boolean;
    items?: NavItem[]; // Support for nested items
    isGroup?: boolean; // Indicates this is a group/section
    isSeparator?: boolean; // Visual separator
    badge?: string; // Optional badge text (e.g., 'NEW', 'BETA')
    roles?: string[]; // Restrict visibility to specific roles
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    kycEnabled: boolean;
    sidebarOpen: boolean;
    csrf_token: string;
    [key: string]: unknown;
}

export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    two_factor_enabled?: boolean;
    status?: 'active' | 'inactive' | 'suspended';
    parent_user_id?: number | null;
    last_login_at?: string | null;
    roles?: Role[];
    permissions?: Permission[];
    parent?: User;
    agents?: User[];
    kyc?: {
        id: number;
        status: KycStatus;
        kyc_tier: KycTier;
    } | null;
    created_at: string;
    updated_at: string;
    [key: string]: unknown; // This allows for additional properties...
}

export interface Role {
    id: number;
    name: string;
    slug: string;
    description: string | null;
    level: number;
    is_system: boolean;
    permissions?: Permission[];
    created_at: string;
    updated_at: string;
}

export interface Permission {
    id: number;
    name: string;
    slug: string;
    description: string | null;
    module: string;
    created_at: string;
    updated_at: string;
}

// KYC Types
export type KycTier = 'unverified' | 'basic' | 'business';
export type KycStatus = 'pending' | 'approved' | 'rejected' | 'expired';
export type DocumentStatus = 'pending' | 'approved' | 'rejected';
export type DocumentType = 'passport' | 'drivers_license' | 'national_id' | 'business_registration' | 'tax_certificate' | 'selfie_with_id';

export interface UserKycVerification {
    id: number;
    user_id: number;
    kyc_tier: KycTier;
    status: KycStatus;
    // Phone Verification
    phone_number?: string;
    phone_verified_at?: string;
    phone_verification_expires_at?: string;
    phone_verification_attempts?: number;
    // Business Information
    business_name?: string;
    business_registration_number?: string;
    business_type?: string;
    business_address_line1?: string;
    business_address_line2?: string;
    business_city?: string;
    business_state?: string;
    business_postal_code?: string;
    business_country?: string;
    // Documents
    id_document_type?: DocumentType;
    id_document_path?: string;
    id_document_status?: DocumentStatus;
    business_document_path?: string;
    business_document_status?: DocumentStatus;
    selfie_with_id_path?: string;
    selfie_with_id_status?: DocumentStatus;
    // Review
    reviewed_by?: number;
    reviewed_at?: string;
    rejection_reason?: string;
    admin_notes?: string;
    // Timestamps
    submitted_at?: string;
    approved_at?: string;
    expires_at?: string;
    created_at: string;
    updated_at: string;
    // Computed
    documents_status?: {
        id_document: { status: DocumentStatus; uploaded: boolean };
        business_document: { status: DocumentStatus; uploaded: boolean };
        selfie_with_id: { status: DocumentStatus; uploaded: boolean };
    };
    can_verify_phone?: boolean;
    needs_renewal?: boolean;
    // Relationships
    user?: User;
    reviewer?: User;
}

export interface KycLimits {
    max_phone_numbers: number | null;
    max_calls_per_day: number | null;
    max_deposit: number | null;
}

export interface KycUsage {
    phone_numbers: number;
    calls_today: number;
}

// Extend Window interface to include axios
declare global {
    interface Window {
        axios: import('axios').AxiosInstance;
    }
}


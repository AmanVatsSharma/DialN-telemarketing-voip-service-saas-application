<?php

namespace App\Http\Middleware;

use Illuminate\Foundation\Inspiring;
use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        [$message, $author] = str(Inspiring::quotes()->random())->explode('-');

        $user = $request->user();
        
        // Prepare user data with permissions if authenticated
        $userData = null;
        $kycData = null;
        
        if ($user) {
            $user->load('roles', 'kycVerification');
            $userData = array_merge(
                $user->toArray(),
                ['permissions' => $user->permissions()->values()->all()]
            );
            
            // Add KYC information for all non-admin users
            if (!$user->hasRole('admin') && $user->kycVerification) {
                $kyc = $user->kycVerification;
                $diffInDays = $user->created_at->diffInDays(now());
                $daysRemaining = max(0, ceil(7 - $diffInDays));
                
                $kycData = [
                    'tier' => $kyc->kyc_tier,
                    'status' => $kyc->status,
                    'is_unverified' => $user->isKycUnverified(),
                    'grace_period_ends_at' => $user->created_at->addDays(7)->toDateTimeString(),
                    'days_remaining' => (int) $daysRemaining,
                    'is_grace_period_expired' => $diffInDays >= 7,
                    'needs_renewal' => $kyc->needsRenewal(),
                    'expires_at' => $kyc->kyc_verified_at?->addYears(2)->toDateTimeString(),
                    'limits' => $user->getKycLimits(),
                ];
            } elseif (!$user->hasRole('admin') && !$user->kycVerification) {
                // User has no KYC record yet (new user)
                $diffInDays = $user->created_at->diffInDays(now());
                $daysRemaining = max(0, ceil(7 - $diffInDays));
                
                $kycData = [
                    'tier' => 'unverified',
                    'status' => null,
                    'is_unverified' => true,
                    'grace_period_ends_at' => $user->created_at->addDays(7)->toDateTimeString(),
                    'days_remaining' => (int) $daysRemaining,
                    'is_grace_period_expired' => $diffInDays >= 7,
                    'needs_renewal' => false,
                    'expires_at' => null,
                    'limits' => $user->getKycLimits(),
                ];
            }
        }

        return [
            ...parent::share($request),
            'name' => config('app.name'),
            'appName' => config('app.name'),
            'appLogo' => \App\Helpers\AppHelper::getLogoUrl() ?? config('app.logo'),
            'quote' => ['message' => trim($message), 'author' => trim($author)],
            'auth' => [
                'user' => $userData,
                'kyc' => $kycData,
                'isImpersonating' => $request->session()->has('impersonator'),
            ],
            'kycEnabled' => \App\Models\KycSetting::get('kyc_enabled', true),
            'sidebarOpen' => ! $request->hasCookie('sidebar_state') || $request->cookie('sidebar_state') === 'true',
            'csrf_token' => csrf_token(), // Always provide fresh CSRF token
            'flash' => [
                'success' => $request->session()->get('success'),
                'error' => $request->session()->get('error'),
                'warning' => $request->session()->get('warning'),
                'info' => $request->session()->get('info'),
            ],
        ];
    }
}

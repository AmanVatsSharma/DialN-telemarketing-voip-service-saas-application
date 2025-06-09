<?php

namespace App\Http\Controllers;

use App\Models\Campaign;
use App\Services\AnalyticsService;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Inertia\Inertia;
use Inertia\Response as InertiaResponse;

class AnalyticsController extends Controller
{
    public function __construct(
        private AnalyticsService $analyticsService
    ) {}

    /**
     * Show campaign analytics page
     */
    public function campaignAnalytics(Request $request, Campaign $campaign): InertiaResponse
    {
        if ($campaign->user_id !== $request->user()->id) {
            abort(403);
        }

        $analytics = $this->analyticsService->getCampaignAnalytics($campaign);

        return Inertia::render('analytics/campaign', [
            'campaign' => $campaign,
            'analytics' => $analytics,
        ]);
    }

    /**
     * Get campaign analytics data (API endpoint)
     */
    public function getCampaignAnalyticsData(Request $request, Campaign $campaign): array
    {
        if ($campaign->user_id !== $request->user()->id) {
            abort(403);
        }

        return $this->analyticsService->getCampaignAnalytics($campaign);
    }

    /**
     * Show user analytics dashboard
     */
    public function dashboard(Request $request): InertiaResponse
    {
        $userId = $request->user()->id;
        $analytics = $this->analyticsService->getUserAnalytics($userId);

        $campaigns = Campaign::where('user_id', $userId)
            ->orderByDesc('created_at')
            ->limit(10)
            ->get();

        return Inertia::render('analytics/dashboard', [
            'analytics' => $analytics,
            'recentCampaigns' => $campaigns,
        ]);
    }

    /**
     * Export campaign calls to CSV
     */
    public function exportCalls(Request $request, Campaign $campaign): Response
    {
        if ($campaign->user_id !== $request->user()->id) {
            abort(403);
        }

        $csv = $this->analyticsService->exportCampaignCalls($campaign);

        $filename = sprintf(
            'campaign-%s-calls-%s.csv',
            $campaign->id,
            now()->format('Y-m-d-His')
        );

        return response($csv, 200, [
            'Content-Type' => 'text/csv',
            'Content-Disposition' => 'attachment; filename="' . $filename . '"',
        ]);
    }

    /**
     * Export campaign contacts to CSV
     */
    public function exportContacts(Request $request, Campaign $campaign): Response
    {
        if ($campaign->user_id !== $request->user()->id) {
            abort(403);
        }

        $csv = $this->analyticsService->exportCampaignContacts($campaign);

        $filename = sprintf(
            'campaign-%s-contacts-%s.csv',
            $campaign->id,
            now()->format('Y-m-d-His')
        );

        return response($csv, 200, [
            'Content-Type' => 'text/csv',
            'Content-Disposition' => 'attachment; filename="' . $filename . '"',
        ]);
    }
}

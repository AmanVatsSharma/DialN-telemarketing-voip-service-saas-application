<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Models\CrmIntegration;
use App\Models\CrmWebhookLog;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class IntegrationController extends Controller
{
    /**
     * Display integrations list
     */
    public function index(Request $request): Response
    {
        $userId = $request->user()->id;

        $integrations = CrmIntegration::where('user_id', $userId)
            ->orderBy('created_at', 'desc')
            ->get();

        $stats = [
            'total_integrations' => CrmIntegration::where('user_id', $userId)->count(),
            'active_integrations' => CrmIntegration::where('user_id', $userId)->where('is_active', true)->count(),
            'total_webhooks_sent' => CrmWebhookLog::where('user_id', $userId)->count(),
            'successful_webhooks' => CrmWebhookLog::where('user_id', $userId)->successful()->count(),
            'failed_webhooks' => CrmWebhookLog::where('user_id', $userId)->failed()->count(),
            'webhooks_last_24h' => CrmWebhookLog::where('user_id', $userId)
                ->where('triggered_at', '>=', now()->subDay())
                ->count(),
        ];

        $stats['success_rate'] = $stats['total_webhooks_sent'] > 0 
            ? round(($stats['successful_webhooks'] / $stats['total_webhooks_sent']) * 100, 2)
            : 0;

        return Inertia::render('integrations/index', [
            'integrations' => $integrations,
            'stats' => $stats,
        ]);
    }

    /**
     * Show create form
     */
    public function create(): Response
    {
        return Inertia::render('integrations/form');
    }

    /**
     * Show edit form
     */
    public function edit(Request $request, int $id): Response
    {
        $integration = CrmIntegration::where('user_id', $request->user()->id)
            ->findOrFail($id);

        return Inertia::render('integrations/form', [
            'integration' => $integration,
        ]);
    }

    /**
     * Show logs for specific integration
     */
    public function logs(Request $request, int $id): Response
    {
        $integration = CrmIntegration::where('user_id', $request->user()->id)
            ->findOrFail($id);

        $logs = CrmWebhookLog::where('crm_integration_id', $id)
            ->orderBy('triggered_at', 'desc')
            ->paginate(50);

        return Inertia::render('integrations/logs', [
            'logs' => $logs,
            'integration' => [
                'id' => $integration->id,
                'name' => $integration->name,
            ],
        ]);
    }

    /**
     * Show all logs
     */
    public function allLogs(Request $request): Response
    {
        $logs = CrmWebhookLog::where('user_id', $request->user()->id)
            ->with('crmIntegration:id,name')
            ->orderBy('triggered_at', 'desc')
            ->paginate(50);

        return Inertia::render('integrations/logs', [
            'logs' => $logs,
        ]);
    }
}

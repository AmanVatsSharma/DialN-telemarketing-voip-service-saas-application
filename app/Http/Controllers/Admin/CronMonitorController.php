<?php

declare(strict_types=1);

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\CronJobLog;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class CronMonitorController extends Controller
{
    /**
     * Display cron job monitoring dashboard
     */
    public function index(Request $request): Response
    {
        $hours = (int) $request->input('hours', 24);

        // Get all unique job names from the database dynamically
        $jobNames = CronJobLog::select('job_name')
            ->distinct()
            ->orderBy('job_name')
            ->pluck('job_name')
            ->toArray();

        // If no jobs found, use defaults
        if (empty($jobNames)) {
            $jobNames = ['schedule:run', 'queue:work'];
        }

        $jobsData = [];

        foreach ($jobNames as $jobName) {
            $lastRun = CronJobLog::getLastSuccessfulRun($jobName);
            $stats = CronJobLog::getStats($jobName, $hours);
            $recentFailures = CronJobLog::getRecentFailures($jobName, 5);
            $isHealthy = CronJobLog::isHealthy($jobName, 2);

            $jobsData[] = [
                'name' => $jobName,
                'is_healthy' => $isHealthy,
                'last_run' => $lastRun ? [
                    'completed_at' => $lastRun->completed_at?->toDateTimeString(),
                    'completed_at_human' => $lastRun->completed_at?->diffForHumans(),
                    'execution_time_ms' => $lastRun->execution_time_ms ?? 0,
                    'jobs_processed' => $lastRun->jobs_processed ?? 0,
                ] : null,
                'stats' => $stats,
                'recent_failures' => $recentFailures->map(fn($log) => [
                    'started_at' => $log->started_at->toDateTimeString(),
                    'started_at_human' => $log->started_at->diffForHumans(),
                    'output' => $log->output ?? 'No output',
                ]),
            ];
        }

        // Get recent logs for timeline
        $recentLogs = CronJobLog::with([])
            ->latest('started_at')
            ->limit(50)
            ->get()
            ->map(fn($log) => [
                'id' => $log->id,
                'job_name' => $log->job_name ?? 'Unknown',
                'status' => $log->status ?? 'unknown',
                'started_at' => $log->started_at->toDateTimeString(),
                'started_at_human' => $log->started_at->diffForHumans(),
                'completed_at' => $log->completed_at?->toDateTimeString(),
                'execution_time_ms' => $log->execution_time_ms ?? 0,
                'jobs_processed' => $log->jobs_processed ?? 0,
                'output' => $log->output,
            ]);

        return Inertia::render('Admin/CronMonitor', [
            'jobs' => $jobsData,
            'recent_logs' => $recentLogs,
            'hours' => $hours,
        ]);
    }

    /**
     * Cleanup old logs
     */
    public function cleanup(Request $request)
    {
        $days = (int) $request->input('days', 7);
        $deleted = CronJobLog::cleanup($days);

        return back()->with('success', "Cleaned up {$deleted} old log entries.");
    }
}

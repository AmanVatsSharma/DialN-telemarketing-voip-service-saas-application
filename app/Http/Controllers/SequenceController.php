<?php

namespace App\Http\Controllers;

use App\Models\Sequence;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;

class SequenceController extends Controller
{
    /**
     * Display a listing of sequences.
     */
    public function index(Request $request)
    {
        $query = Sequence::where('user_id', auth()->id())
            ->with(['steps'])
            ->withCount([
                'enrollments',
                'enrollments as active_enrollments_count' => function ($query) {
                    $query->where('status', 'active');
                },
                'enrollments as completed_enrollments_count' => function ($query) {
                    $query->where('status', 'completed');
                },
                'enrollments as converted_enrollments_count' => function ($query) {
                    $query->where('status', 'converted');
                }
            ]);

        // Add search filter
        if ($request->filled('search')) {
            $query->where(function ($q) use ($request) {
                $q->where('name', 'like', '%' . $request->search . '%')
                  ->orWhere('description', 'like', '%' . $request->search . '%');
            });
        }

        // Add status filter
        if ($request->filled('status')) {
            $query->where('is_active', $request->status === 'active');
        }

        // Add trigger type filter
        if ($request->filled('trigger_type')) {
            $query->where('trigger_type', $request->trigger_type);
        }

        $sequences = $query->orderBy('created_at', 'desc')->paginate(12);

        // Calculate overall stats
        $stats = [
            'total' => Sequence::where('user_id', auth()->id())->count(),
            'enrolled' => DB::table('sequence_enrollments')
                ->join('follow_up_sequences', 'sequence_enrollments.sequence_id', '=', 'follow_up_sequences.id')
                ->where('follow_up_sequences.user_id', auth()->id())
                ->count(),
            'converted' => DB::table('sequence_enrollments')
                ->join('follow_up_sequences', 'sequence_enrollments.sequence_id', '=', 'follow_up_sequences.id')
                ->where('follow_up_sequences.user_id', auth()->id())
                ->where('sequence_enrollments.status', 'converted')
                ->count(),
        ];

        // Calculate average conversion rate
        $totalCompleted = DB::table('sequence_enrollments')
            ->join('follow_up_sequences', 'sequence_enrollments.sequence_id', '=', 'follow_up_sequences.id')
            ->where('follow_up_sequences.user_id', auth()->id())
            ->where('sequence_enrollments.status', 'completed')
            ->count();

        $stats['avg_conversion_rate'] = $totalCompleted > 0 
            ? round(($stats['converted'] / $totalCompleted) * 100, 1) 
            : 0;

        return Inertia::render('sequences/index', [
            'sequences' => $sequences,
            'stats' => $stats,
            'filters' => [
                'search' => $request->search,
                'status' => $request->status,
                'trigger_type' => $request->trigger_type,
            ]
        ]);
    }

    /**
     * Show the form for creating a new sequence.
     */
    public function create()
    {
        return Inertia::render('sequences/create');
    }

    /**
     * Display the specified sequence.
     */
    public function show(Sequence $sequence)
    {
        // Authorize user can view this sequence
        if ($sequence->user_id !== auth()->id()) {
            abort(403);
        }

        // Load sequence with relationships
        $sequence->load([
            'steps' => function ($query) {
                $query->orderBy('step_order');
            },
            'enrollments.contact',
            'enrollments.currentStep'
        ]);

        // Calculate enrollment stats
        $enrollmentStats = [
            'total' => $sequence->enrollments()->count(),
            'active' => $sequence->enrollments()->where('status', 'active')->count(),
            'completed' => $sequence->enrollments()->where('status', 'completed')->count(),
            'paused' => $sequence->enrollments()->where('status', 'paused')->count(),
            'converted' => $sequence->enrollments()->where('status', 'converted')->count(),
        ];

        // Calculate conversion rate
        $completed = $enrollmentStats['completed'];
        $enrollmentStats['conversion_rate'] = $completed > 0 
            ? round(($enrollmentStats['converted'] / $completed) * 100, 1) 
            : 0;

        // Get analytics data for each step
        $stepAnalytics = [];
        foreach ($sequence->steps as $step) {
            $stepAnalytics[$step->id] = [
                'executed' => DB::table('sequence_execution_logs')
                    ->where('step_id', $step->id)
                    ->count(),
                'successful' => DB::table('sequence_execution_logs')
                    ->where('step_id', $step->id)
                    ->where('status', 'completed')
                    ->count(),
                'failed' => DB::table('sequence_execution_logs')
                    ->where('step_id', $step->id)
                    ->where('status', 'failed')
                    ->count(),
            ];
        }

        // Get recent enrollments for the enrollments tab
        $recentEnrollments = $sequence->enrollments()
            ->with(['contact', 'currentStep'])
            ->latest()
            ->take(50)
            ->get();

        // Performance data for analytics tab
        $analytics = [
            'enrollments' => $enrollmentStats,
            'step_analytics' => $stepAnalytics,
            'status_breakdown' => [
                'active' => $enrollmentStats['active'],
                'completed' => $enrollmentStats['completed'],
                'paused' => $enrollmentStats['paused'],
            ],
            'step_performance' => $sequence->steps->map(function ($step) use ($stepAnalytics) {
                $executed = $stepAnalytics[$step->id]['executed'] ?? 0;
                $successful = $stepAnalytics[$step->id]['successful'] ?? 0;
                
                return [
                    'step_name' => $step->name,
                    'executed' => $executed,
                    'success_rate' => $executed > 0 ? round(($successful / $executed) * 100, 1) : 0,
                ];
            }),
        ];

        return Inertia::render('sequences/show', [
            'sequence' => $sequence,
            'enrollments' => $recentEnrollments,
            'analytics' => $analytics,
            'stats' => $enrollmentStats,
        ]);
    }

    /**
     * Show the form for editing the specified sequence.
     */
    public function edit(Sequence $sequence)
    {
        // Authorize user can edit this sequence
        if ($sequence->user_id !== auth()->id()) {
            abort(403);
        }

        // Load steps for editing
        $sequence->load(['steps' => function ($query) {
            $query->orderBy('step_order');
        }]);

        // Reuse the create page with sequence data
        return Inertia::render('sequences/create', [
            'sequence' => $sequence,
            'isEditing' => true,
        ]);
    }
}

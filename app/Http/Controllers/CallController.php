<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Actions\Calls\EndCallAction;
use App\Actions\Calls\InitiateCallAction;
use App\Actions\Calls\RecordDtmfAction;
use App\Actions\Calls\UpdateCallStatusAction;
use App\Models\Call;
use App\Models\TwilioGlobalConfig;
use App\Models\PhoneNumber;
use App\Services\TwilioSyncService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Inertia\Response;

class CallController extends Controller
{
    /**
     * Display the softphone page
     */
    public function softphone(Request $request): Response
    {
        $user = $request->user();
        
        // Check if voice service is configured (don't mention Twilio to users)
        $isConfigured = TwilioGlobalConfig::exists();
        
        // Check if user has assigned phone numbers
        $hasAssignedNumbers = PhoneNumber::where('user_id', $user->id)
            ->where('status', 'assigned')
            ->exists();
        
        return Inertia::render('calls/manual', [
            'isConfigured' => $isConfigured,
            'hasAssignedNumbers' => $hasAssignedNumbers,
        ]);
    }

    /**
     * Display call history
     */
    public function index(Request $request): Response
    {
        $this->authorize('viewAny', Call::class);

        $user = $request->user();
        $user->loadMissing('roles');

        // Build query based on role
        $query = Call::query()
            ->with(['campaign', 'campaignContact', 'user'])
            ->latest();

        // Apply strict role-based filtering for data isolation
        if ($user->hasRole('admin')) {
            // Admin can see all calls - no filter needed
        } elseif ($user->hasRole('customer')) {
            // Customer can ONLY see their own calls (strict isolation)
            $query->where('user_id', $user->id);
        } elseif ($user->hasRole('agent')) {
            // Agent can see their parent customer's calls
            $query->where('user_id', $user->parent_user_id);
        } else {
            // Default: users can only see their own calls
            $query->where('user_id', $user->id);
        }

        // Filter by status
        if ($request->has('status') && $request->status !== 'all') {
            $query->where('status', $request->status);
        }

        // Filter by call type
        if ($request->has('call_type') && $request->call_type !== 'all') {
            $query->where('call_type', $request->call_type);
        }

        // Filter by direction (inbound/outbound)
        if ($request->has('direction') && $request->direction !== 'all') {
            $query->where('direction', $request->direction);
        }

        // Filter by date range
        if ($request->has('from_date')) {
            $query->whereDate('created_at', '>=', $request->from_date);
        }

        if ($request->has('to_date')) {
            $query->whereDate('created_at', '<=', $request->to_date);
        }

        // Search by phone number
        if ($request->has('search') && $request->search) {
            $query->where(function ($q) use ($request) {
                $q->where('to_number', 'like', '%' . $request->search . '%')
                  ->orWhere('from_number', 'like', '%' . $request->search . '%');
            });
        }

        $calls = $query->paginate(10)->withQueryString();

        // Get statistics based on user role with strict isolation
        $statsQuery = Call::query();
        
        // Apply SAME role-based filtering to statistics - CRITICAL for data isolation
        if ($user->hasRole('admin')) {
            // Admin sees all calls - no filter needed
        } elseif ($user->hasRole('customer')) {
            // Customer can ONLY see their own call statistics (strict isolation)
            $statsQuery->where('user_id', $user->id);
        } elseif ($user->hasRole('agent')) {
            // Agent can see their parent customer's call statistics
            $statsQuery->where('user_id', $user->parent_user_id);
        } else {
            // Default: users can only see their own statistics
            $statsQuery->where('user_id', $user->id);
        }

        $stats = [
            'total' => (clone $statsQuery)->count(),
            'completed' => (clone $statsQuery)->where('status', 'completed')->count(),
            'failed' => (clone $statsQuery)->whereIn('status', ['failed', 'busy', 'no-answer'])->count(),
            'in_progress' => (clone $statsQuery)->whereIn('status', ['initiated', 'ringing', 'in-progress'])->count(),
            'inbound' => (clone $statsQuery)->where('direction', 'inbound')->count(),
            'outbound' => (clone $statsQuery)->where('direction', 'outbound')->count(),
        ];

        return Inertia::render('calls/index', [
            'calls' => $calls,
            'stats' => $stats,
            'filters' => $request->only(['status', 'call_type', 'direction', 'from_date', 'to_date', 'search']),
        ]);
    }

    /**
     * Display a specific call details
     */
    public function show(Request $request, Call $call): Response
    {
        $this->authorize('view', $call);

        $call->load(['campaign', 'campaignContact', 'logs', 'dtmfResponses']);

        // Get contact information if available
        $contact = null;
        if ($call->campaignContact) {
            $contact = [
                'id' => $call->campaignContact->contact->id ?? null,
                'name' => $call->campaignContact->contact->name ?? null,
                'phone_number' => $call->to_number,
            ];
        }

        return Inertia::render('calls/Show', [
            'call' => $call,
            'contact' => $contact,
            'breadcrumbs' => [
                ['title' => 'Dashboard', 'href' => route('dashboard')],
                ['title' => 'Call History', 'href' => route('calls.index')],
                ['title' => 'Call #' . $call->id, 'href' => route('calls.show', $call->id)],
            ],
        ]);
    }

    /**
     * Sync call data with Twilio
     */
    public function syncWithTwilio(
        Request $request,
        TwilioSyncService $syncService
    ): JsonResponse {
        try {
            $synced = $syncService->syncActiveCalls($request->user()->id);

            return response()->json([
                'success' => true,
                'synced' => $synced,
                'message' => "Synced $synced active calls",
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Sync specific call with Twilio
     */
    public function syncCall(
        Request $request,
        Call $call,
        TwilioSyncService $syncService
    ): JsonResponse {
        $this->authorize('view', $call);

        try {
            $success = $syncService->syncCall($call);

            if ($success) {
                return response()->json([
                    'success' => true,
                    'call' => $call->fresh(),
                    'message' => 'Call synced successfully',
                ]);
            }

            return response()->json([
                'success' => false,
                'error' => 'Failed to sync call',
            ], 400);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Initiate a new call
     */
    public function initiate(
        Request $request,
        InitiateCallAction $action
    ): JsonResponse {
        $this->authorize('create', Call::class);

        // Log incoming request for debugging
        Log::info('Call Initiate Request', [
            'all_input' => $request->all(),
            'user_id' => $request->user()?->id,
            'method' => $request->method(),
        ]);

        try {
            $validated = $request->validate([
                'to_number' => ['required', 'string'],
                'from_number' => ['nullable', 'string'],
                'enable_recording' => ['boolean'],
            ]);

            Log::info('Validation passed', ['validated' => $validated]);

            $call = $action->execute($request->user(), $validated);

            return response()->json([
                'success' => true,
                'call' => [
                    'id' => $call->id,
                    'twilio_call_sid' => $call->twilio_call_sid,
                    'to_number' => $call->to_number,
                    'from_number' => $call->from_number,
                    'status' => $call->status,
                ],
            ]);
        } catch (\Illuminate\Validation\ValidationException $e) {
            Log::error('Call initiation validation failed', [
                'errors' => $e->errors(),
                'message' => $e->getMessage(),
            ]);

            return response()->json([
                'success' => false,
                'error' => 'The payload is invalid.',
                'validation_errors' => $e->errors(),
            ], 400);
        } catch (\Exception $e) {
            Log::error('Call initiation failed', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);

            return response()->json([
                'success' => false,
                'error' => $e->getMessage(),
            ], 400);
        }
    }

    /**
     * End an active call
     */
    public function end(
        Request $request,
        Call $call,
        EndCallAction $action
    ): JsonResponse {
        $this->authorize('execute', $call);

        try {

            $success = $action->execute($call);

            return response()->json([
                'success' => $success,
                'call' => [
                    'id' => $call->id,
                    'status' => $call->fresh()->status,
                ],
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'error' => $e->getMessage(),
            ], 400);
        }
    }

    /**
     * Get call status
     */
    public function status(Request $request, Call $call): JsonResponse
    {
        $this->authorize('view', $call);

        return response()->json([
            'id' => $call->id,
            'status' => $call->status,
            'duration_seconds' => $call->duration_seconds,
            'started_at' => $call->started_at?->toISOString(),
            'ended_at' => $call->ended_at?->toISOString(),
            'recording_url' => $call->recording_url,
            'dtmf_digits' => $call->dtmf_digits,
        ]);
    }

    /**
     * Webhook: Handle call status updates from Twilio
     */
    public function webhookStatus(
        Request $request,
        UpdateCallStatusAction $action
    ): JsonResponse {
        $callId = $request->input('call_id') ?? $request->route('call_id');
        $twilioCallSid = $request->input('CallSid');
        
        // Try to find call by call_id first, then by Twilio CallSid (for inbound calls)
        if ($callId) {
            $call = Call::find($callId);
        } elseif ($twilioCallSid) {
            $call = Call::where('twilio_call_sid', $twilioCallSid)->first();
        } else {
            Log::warning('Webhook received without call_id or CallSid', $request->all());
            return response()->json(['error' => 'Missing call_id or CallSid'], 400);
        }

        if (!$call) {
            Log::warning('Webhook received for non-existent call', [
                'call_id' => $callId,
                'twilio_call_sid' => $twilioCallSid,
            ]);
            return response()->json(['error' => 'Call not found'], 404);
        }

        try {
            $action->execute($call, $request->all());

            return response()->json(['success' => true]);
        } catch (\Exception $e) {
            Log::error('Webhook status error', [
                'call_id' => $call->id,
                'twilio_call_sid' => $twilioCallSid,
                'error' => $e->getMessage(),
            ]);

            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    /**
     * Webhook: Handle recording completion from Twilio
     */
    public function webhookRecording(Request $request): JsonResponse
    {
        $callId = $request->input('call_id') ?? $request->route('call_id');
        $recordingSid = $request->input('RecordingSid');
        $recordingUrl = $request->input('RecordingUrl');
        $recordingDuration = $request->input('RecordingDuration');

        if (!$callId) {
            return response()->json(['error' => 'Missing call_id'], 400);
        }

        $call = Call::find($callId);

        if (!$call) {
            return response()->json(['error' => 'Call not found'], 404);
        }

        $call->update([
            'recording_sid' => $recordingSid,
            'recording_url' => $recordingUrl,
            'recording_duration' => $recordingDuration,
        ]);

        Log::info('Recording webhook processed', [
            'call_id' => $callId,
            'recording_sid' => $recordingSid,
        ]);

        return response()->json(['success' => true]);
    }

    /**
     * Webhook: Handle transcription callback from Twilio
     */
    public function webhookTranscription(Request $request): JsonResponse
    {
        $callId = $request->input('call_id') ?? $request->route('call_id');
        $transcriptionSid = $request->input('TranscriptionSid');
        $transcriptionText = $request->input('TranscriptionText');
        $transcriptionStatus = $request->input('TranscriptionStatus');
        $transcriptionUrl = $request->input('TranscriptionUrl');
        $transcriptionPrice = $request->input('TranscriptionPrice');

        if (!$callId) {
            return response()->json(['error' => 'Missing call_id'], 400);
        }

        $call = Call::find($callId);

        if (!$call) {
            return response()->json(['error' => 'Call not found'], 404);
        }

        $call->update([
            'transcript_sid' => $transcriptionSid,
            'transcript_text' => $transcriptionText,
            'transcript_status' => $transcriptionStatus,
            'transcript_price' => $transcriptionPrice ? abs((float) $transcriptionPrice) : null,
        ]);

        Log::info('Transcription webhook processed', [
            'call_id' => $callId,
            'transcription_sid' => $transcriptionSid,
            'status' => $transcriptionStatus,
        ]);

        // Trigger AI sentiment analysis if transcription is complete and has text
        if ($transcriptionStatus === 'completed' && !empty($transcriptionText)) {
            try {
                $sentimentService = app(\App\Services\SentimentAnalysisService::class);
                $sentimentService->processCall($call);
            } catch (\Exception $e) {
                Log::warning('Sentiment analysis trigger failed', [
                    'call_id' => $callId,
                    'error' => $e->getMessage(),
                ]);
                // Don't fail the webhook even if sentiment analysis fails
            }
        }

        return response()->json(['success' => true]);
    }

    /**
     * Export calls to CSV
     */
    public function export(Request $request)
    {
        $this->authorize('viewAny', Call::class);

        $user = $request->user();
        $user->loadMissing('roles');

        // Build query with same role-based filtering as index
        $query = Call::query()
            ->with(['campaign', 'campaignContact', 'user'])
            ->latest();

        // Apply strict role-based filtering
        if ($user->hasRole('admin')) {
            // Admin can see all calls
        } elseif ($user->hasRole('customer')) {
            $query->where('user_id', $user->id);
        } elseif ($user->hasRole('agent')) {
            $query->where('user_id', $user->parent_user_id);
        } else {
            $query->where('user_id', $user->id);
        }

        // Apply same filters as index page
        if ($request->has('status') && $request->status !== 'all') {
            $query->where('status', $request->status);
        }

        if ($request->has('call_type') && $request->call_type !== 'all') {
            $query->where('call_type', $request->call_type);
        }

        if ($request->has('direction') && $request->direction !== 'all') {
            $query->where('direction', $request->direction);
        }

        if ($request->has('from_date')) {
            $query->whereDate('created_at', '>=', $request->from_date);
        }

        if ($request->has('to_date')) {
            $query->whereDate('created_at', '<=', $request->to_date);
        }

        if ($request->has('search') && $request->search) {
            $query->where(function ($q) use ($request) {
                $q->where('to_number', 'like', '%' . $request->search . '%')
                  ->orWhere('from_number', 'like', '%' . $request->search . '%');
            });
        }

        $calls = $query->limit(10000)->get(); // Limit to prevent memory issues

        // Generate CSV
        $filename = 'calls_export_' . date('Y-m-d_His') . '.csv';
        
        $headers = [
            'Content-Type' => 'text/csv',
            'Content-Disposition' => 'attachment; filename="' . $filename . '"',
        ];

        $callback = function() use ($calls) {
            $file = fopen('php://output', 'w');
            
            // CSV Headers
            fputcsv($file, [
                'ID',
                'Status',
                'Direction',
                'From Number',
                'To Number',
                'Contact Name',
                'Call Type',
                'Campaign',
                'Duration (seconds)',
                'Cost',
                'Recording URL',
                'Started At',
                'Ended At',
                'Created At',
            ]);

            // CSV Rows
            foreach ($calls as $call) {
                $contactName = '';
                if ($call->campaignContact) {
                    $contactName = trim(
                        ($call->campaignContact->first_name ?? '') . ' ' . 
                        ($call->campaignContact->last_name ?? '')
                    );
                }

                fputcsv($file, [
                    $call->id,
                    $call->status,
                    $call->direction,
                    $call->from_number,
                    $call->to_number,
                    $contactName ?: $call->to_number,
                    $call->call_type,
                    $call->campaign ? $call->campaign->name : '',
                    $call->duration ?? 0,
                    $call->price ?? 0,
                    $call->recording_url ?? '',
                    $call->started_at ?? '',
                    $call->ended_at ?? '',
                    $call->created_at,
                ]);
            }

            fclose($file);
        };

        return response()->stream($callback, 200, $headers);
    }

    /**
     * Webhook: Handle DTMF input from Twilio
     */
    public function webhookDtmf(
        Request $request,
        RecordDtmfAction $action
    ): JsonResponse {
        $callId = $request->input('call_id') ?? $request->route('call_id');
        $digits = $request->input('Digits');

        if (!$callId || !$digits) {
            return response()->json(['error' => 'Missing data'], 400);
        }

        $call = Call::find($callId);

        if (!$call) {
            return response()->json(['error' => 'Call not found'], 404);
        }

        $action->execute($call, $digits);

        return response()->json(['success' => true]);
    }
}

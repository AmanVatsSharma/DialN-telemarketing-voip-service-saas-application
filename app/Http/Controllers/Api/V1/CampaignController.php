<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Api\BaseApiController;
use App\Http\Resources\CampaignResource;
use App\Http\Resources\CallResource;
use App\Models\Campaign;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Spatie\QueryBuilder\QueryBuilder;
use Spatie\QueryBuilder\AllowedFilter;

/**
 * @OA\Tag(
 *     name="Campaigns",
 *     description="Campaign management endpoints"
 * )
 */
class CampaignController extends BaseApiController
{
    /**
     * @OA\Get(
     *     path="/api/v1/campaigns",
     *     summary="List all campaigns",
     *     tags={"Campaigns"},
     *     security={{"sanctum":{}}},
     *     @OA\Parameter(name="filter[status]", in="query", @OA\Schema(type="string")),
     *     @OA\Parameter(name="filter[type]", in="query", @OA\Schema(type="string")),
     *     @OA\Parameter(name="sort", in="query", @OA\Schema(type="string", example="-created_at")),
     *     @OA\Parameter(name="page", in="query", @OA\Schema(type="integer", example=1)),
     *     @OA\Parameter(name="per_page", in="query", @OA\Schema(type="integer", example=15)),
     *     @OA\Response(response=200, description="Campaigns list")
     * )
     */
    public function index(Request $request): JsonResponse
    {
        $perPage = $request->get('per_page', 15);

        $campaigns = QueryBuilder::for(Campaign::class)
            ->allowedFilters([
                'name',
                'status',
                'type',
                AllowedFilter::exact('user_id'),
            ])
            ->allowedSorts(['name', 'status', 'created_at', 'scheduled_at'])
            ->where('user_id', $request->user()->id)
            ->with(['user', 'phoneNumber', 'aiAgent'])
            ->paginate($perPage);

        return $this->paginatedResponse($campaigns, CampaignResource::class);
    }

    /**
     * @OA\Post(
     *     path="/api/v1/campaigns",
     *     summary="Create a new campaign",
     *     description="Create a new campaign. When phone_number_id is provided, the system automatically checks if that phone number has an active AI agent assigned and will auto-assign the ai_agent_id to the campaign.",
     *     tags={"Campaigns"},
     *     security={{"sanctum":{}}},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"name","type","message"},
     *             @OA\Property(property="name", type="string", example="Summer Sale Campaign"),
     *             @OA\Property(property="type", type="string", enum={"tts", "audio"}, example="tts"),
     *             @OA\Property(property="message", type="string", example="Hello {first_name}, we have a special offer for you!"),
     *             @OA\Property(property="phone_number_id", type="integer", example=1, description="Phone number ID - AI agent will be auto-assigned if phone has one"),
     *             @OA\Property(property="voice", type="string", example="alice"),
     *             @OA\Property(property="caller_id", type="string", example="+1234567890"),
     *             @OA\Property(property="enable_recording", type="boolean", example=true),
     *             @OA\Property(property="max_concurrent_calls", type="integer", example=5)
     *         )
     *     ),
     *     @OA\Response(
     *         response=201,
     *         description="Campaign created successfully. ai_agent_id will be populated automatically if phone number has an active AI agent.",
     *         @OA\JsonContent(
     *             @OA\Property(property="success", type="boolean", example=true),
     *             @OA\Property(property="data", ref="#/components/schemas/Campaign"),
     *             @OA\Property(property="message", type="string", example="Campaign created successfully")
     *         )
     *     ),
     *     @OA\Response(response=401, description="Unauthenticated"),
     *     @OA\Response(response=422, description="Validation error")
     * )
     */
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'type' => 'required|in:tts,audio',
            'message' => 'required_if:type,tts|string',
            'voice' => 'nullable|string',
            'voice_language' => 'nullable|string',
            'caller_id' => 'nullable|string',
            'from_number' => 'nullable|string',
            'phone_number_id' => 'nullable|exists:phone_numbers,id',
            'enable_recording' => 'nullable|boolean',
            'enable_dtmf' => 'nullable|boolean',
            'enable_amd' => 'nullable|boolean',
            'max_concurrent_calls' => 'nullable|integer|min:1|max:50',
            'retry_attempts' => 'nullable|integer|min:0|max:5',
            'retry_delay_minutes' => 'nullable|integer|min:1',
            'scheduled_at' => 'nullable|date',
        ]);

        $validated['user_id'] = $request->user()->id;
        $validated['status'] = 'draft';

        $campaign = Campaign::create($validated);

        return $this->createdResponse(
            new CampaignResource($campaign->load(['user', 'phoneNumber', 'aiAgent'])),
            'Campaign created successfully'
        );
    }

    /**
     * @OA\Get(
     *     path="/api/v1/campaigns/{id}",
     *     summary="Get campaign details",
     *     tags={"Campaigns"},
     *     security={{"sanctum":{}}},
     *     @OA\Parameter(name="id", in="path", required=true, @OA\Schema(type="integer")),
     *     @OA\Response(response=200, description="Campaign details")
     * )
     */
    public function show(Request $request, Campaign $campaign): JsonResponse
    {
        // Check ownership
        if ($campaign->user_id !== $request->user()->id && !$request->user()->hasRole('admin')) {
            return $this->forbiddenResponse('You do not have permission to access this campaign');
        }

        return $this->successResponse(
            new CampaignResource($campaign->load(['user', 'phoneNumber', 'aiAgent']))
        );
    }

    /**
     * @OA\Put(
     *     path="/api/v1/campaigns/{id}",
     *     summary="Update campaign",
     *     description="Update campaign. When changing phone_number_id, the system automatically updates ai_agent_id based on the new phone number. If the new phone has no AI agent, ai_agent_id will be set to null.",
     *     tags={"Campaigns"},
     *     security={{"sanctum":{}}},
     *     @OA\Parameter(name="id", in="path", required=true, @OA\Schema(type="integer")),
     *     @OA\RequestBody(
     *         @OA\JsonContent(
     *             @OA\Property(property="name", type="string"),
     *             @OA\Property(property="phone_number_id", type="integer", description="Change phone number - AI agent will be auto-updated"),
     *             @OA\Property(property="message", type="string"),
     *             @OA\Property(property="enable_recording", type="boolean")
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Campaign updated successfully. ai_agent_id updated automatically based on phone number."
     *     ),
     *     @OA\Response(response=400, description="Cannot update running campaign"),
     *     @OA\Response(response=403, description="Forbidden"),
     *     @OA\Response(response=404, description="Campaign not found")
     * )
     */
    public function update(Request $request, Campaign $campaign): JsonResponse
    {
        // Check ownership
        if ($campaign->user_id !== $request->user()->id && !$request->user()->hasRole('admin')) {
            return $this->forbiddenResponse('You do not have permission to update this campaign');
        }

        // Prevent updating running campaigns
        if (in_array($campaign->status, ['running', 'processing'])) {
            return $this->errorResponse('Cannot update campaign while it is running', 400);
        }

        $validated = $request->validate([
            'name' => 'sometimes|string|max:255',
            'message' => 'sometimes|string',
            'voice' => 'sometimes|string',
            'voice_language' => 'sometimes|string',
            'caller_id' => 'sometimes|string',
            'enable_recording' => 'sometimes|boolean',
            'enable_dtmf' => 'sometimes|boolean',
            'max_concurrent_calls' => 'sometimes|integer|min:1|max:50',
            'scheduled_at' => 'sometimes|date',
        ]);

        $campaign->update($validated);

        return $this->successResponse(
            new CampaignResource($campaign->fresh(['user', 'phoneNumber', 'aiAgent'])),
            'Campaign updated successfully'
        );
    }

    /**
     * @OA\Delete(
     *     path="/api/v1/campaigns/{id}",
     *     summary="Delete campaign",
     *     tags={"Campaigns"},
     *     security={{"sanctum":{}}},
     *     @OA\Parameter(name="id", in="path", required=true, @OA\Schema(type="integer")),
     *     @OA\Response(response=200, description="Campaign deleted successfully")
     * )
     */
    public function destroy(Request $request, Campaign $campaign): JsonResponse
    {
        // Check ownership
        if ($campaign->user_id !== $request->user()->id && !$request->user()->hasRole('admin')) {
            return $this->forbiddenResponse('You do not have permission to delete this campaign');
        }

        // Prevent deleting running campaigns
        if (in_array($campaign->status, ['running', 'processing'])) {
            return $this->errorResponse('Cannot delete campaign while it is running', 400);
        }

        $campaign->delete();

        return $this->successResponse(null, 'Campaign deleted successfully');
    }

    /**
     * @OA\Post(
     *     path="/api/v1/campaigns/{id}/start",
     *     summary="Start campaign",
     *     tags={"Campaigns"},
     *     security={{"sanctum":{}}},
     *     @OA\Parameter(name="id", in="path", required=true, @OA\Schema(type="integer")),
     *     @OA\Response(response=200, description="Campaign started successfully")
     * )
     */
    public function start(Request $request, Campaign $campaign): JsonResponse
    {
        // Check ownership
        if ($campaign->user_id !== $request->user()->id && !$request->user()->hasRole('admin')) {
            return $this->forbiddenResponse();
        }

        if (!in_array($campaign->status, ['draft', 'paused', 'scheduled'])) {
            return $this->errorResponse('Campaign cannot be started from current status', 400);
        }

        $campaign->update([
            'status' => 'running',
            'started_at' => now(),
        ]);

        // Dispatch campaign processing job
        \App\Jobs\ProcessCampaignJob::dispatch($campaign);

        return $this->successResponse(
            new CampaignResource($campaign->fresh()),
            'Campaign started successfully'
        );
    }

    /**
     * @OA\Post(
     *     path="/api/v1/campaigns/{id}/pause",
     *     summary="Pause campaign",
     *     tags={"Campaigns"},
     *     security={{"sanctum":{}}},
     *     @OA\Response(response=200, description="Campaign paused")
     * )
     */
    public function pause(Request $request, Campaign $campaign): JsonResponse
    {
        if ($campaign->user_id !== $request->user()->id && !$request->user()->hasRole('admin')) {
            return $this->forbiddenResponse();
        }

        if ($campaign->status !== 'running') {
            return $this->errorResponse('Only running campaigns can be paused', 400);
        }

        $campaign->update([
            'status' => 'paused',
            'paused_at' => now(),
        ]);

        return $this->successResponse(
            new CampaignResource($campaign->fresh()),
            'Campaign paused successfully'
        );
    }

    /**
     * @OA\Post(
     *     path="/api/v1/campaigns/{id}/resume",
     *     summary="Resume paused campaign",
     *     tags={"Campaigns"},
     *     security={{"sanctum":{}}},
     *     @OA\Response(response=200, description="Campaign resumed")
     * )
     */
    public function resume(Request $request, Campaign $campaign): JsonResponse
    {
        if ($campaign->user_id !== $request->user()->id && !$request->user()->hasRole('admin')) {
            return $this->forbiddenResponse();
        }

        if ($campaign->status !== 'paused') {
            return $this->errorResponse('Only paused campaigns can be resumed', 400);
        }

        $campaign->update([
            'status' => 'running',
            'paused_at' => null,
        ]);

        return $this->successResponse(
            new CampaignResource($campaign->fresh()),
            'Campaign resumed successfully'
        );
    }

    /**
     * @OA\Post(
     *     path="/api/v1/campaigns/{id}/stop",
     *     summary="Stop campaign",
     *     tags={"Campaigns"},
     *     security={{"sanctum":{}}},
     *     @OA\Response(response=200, description="Campaign stopped")
     * )
     */
    public function stop(Request $request, Campaign $campaign): JsonResponse
    {
        if ($campaign->user_id !== $request->user()->id && !$request->user()->hasRole('admin')) {
            return $this->forbiddenResponse();
        }

        $campaign->update([
            'status' => 'stopped',
            'completed_at' => now(),
        ]);

        return $this->successResponse(
            new CampaignResource($campaign->fresh()),
            'Campaign stopped successfully'
        );
    }

    /**
     * @OA\Get(
     *     path="/api/v1/campaigns/{id}/stats",
     *     summary="Get campaign statistics",
     *     tags={"Campaigns"},
     *     security={{"sanctum":{}}},
     *     @OA\Response(response=200, description="Campaign statistics")
     * )
     */
    public function stats(Request $request, Campaign $campaign): JsonResponse
    {
        if ($campaign->user_id !== $request->user()->id && !$request->user()->hasRole('admin')) {
            return $this->forbiddenResponse();
        }

        $stats = [
            'campaign_id' => $campaign->id,
            'campaign_name' => $campaign->name,
            'status' => $campaign->status,
            'total_contacts' => $campaign->total_contacts,
            'total_calls' => $campaign->total_calls,
            'completed_calls' => $campaign->completed_calls,
            'failed_calls' => $campaign->failed_calls,
            'pending_calls' => $campaign->total_contacts - $campaign->total_calls,
            'success_rate' => $campaign->total_calls > 0 
                ? round(($campaign->completed_calls / $campaign->total_calls) * 100, 2) 
                : 0,
            'average_duration' => $campaign->calls()->avg('duration_seconds'),
            'total_cost' => $campaign->calls()->sum('price'),
        ];

        return $this->successResponse($stats);
    }

    /**
     * @OA\Get(
     *     path="/api/v1/campaigns/{id}/calls",
     *     summary="Get campaign calls",
     *     tags={"Campaigns"},
     *     security={{"sanctum":{}}},
     *     @OA\Response(response=200, description="Campaign calls list")
     * )
     */
    public function calls(Request $request, Campaign $campaign): JsonResponse
    {
        if ($campaign->user_id !== $request->user()->id && !$request->user()->hasRole('admin')) {
            return $this->forbiddenResponse();
        }

        $perPage = $request->get('per_page', 15);
        
        $calls = $campaign->calls()
            ->with(['campaignContact'])
            ->latest()
            ->paginate($perPage);

        return $this->paginatedResponse($calls, CallResource::class);
    }

    /**
     * @OA\Get(
     *     path="/api/v1/campaigns/{id}/contacts",
     *     summary="Get campaign contacts",
     *     tags={"Campaigns"},
     *     security={{"sanctum":{}}},
     *     @OA\Response(response=200, description="Campaign contacts list")
     * )
     */
    public function contacts(Request $request, Campaign $campaign): JsonResponse
    {
        if ($campaign->user_id !== $request->user()->id && !$request->user()->hasRole('admin')) {
            return $this->forbiddenResponse();
        }

        $perPage = $request->get('per_page', 15);
        
        $contacts = $campaign->campaignContacts()
            ->paginate($perPage);

        return $this->paginatedResponse($contacts);
    }
}

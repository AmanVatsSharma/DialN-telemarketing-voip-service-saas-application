<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\NumberRequest;
use App\Models\PhoneNumber;
use App\Services\NumberRequestService;
use App\Services\PhoneNumberService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class CustomerNumberController extends Controller
{
    protected $phoneNumberService;
    protected $numberRequestService;

    public function __construct(
        PhoneNumberService $phoneNumberService,
        NumberRequestService $numberRequestService
    ) {
        $this->phoneNumberService = $phoneNumberService;
        $this->numberRequestService = $numberRequestService;
    }

    /**
     * Get available countries with enabled geo-permissions
     */
    public function countries(Request $request)
    {
        $this->authorize('viewAny', PhoneNumber::class);

        try {
            $countries = $this->phoneNumberService->getEnabledCountries();
            return response()->json(['countries' => $countries]);
        } catch (\Exception $e) {
            Log::error('Failed to fetch enabled countries: ' . $e->getMessage());
            return response()->json(['error' => 'Failed to fetch countries'], 500);
        }
    }

    /**
     * Display available numbers for browsing
     */
    public function available(Request $request)
    {
        $this->authorize('viewAny', PhoneNumber::class);

        $numbers = $this->phoneNumberService->getAvailableNumbers(
            $request->country_code,
            $request->area_code,
            $request->has_voice ?? null,
            $request->has_sms ?? null
        );

        // Get enabled countries for the dropdown
        $countries = [];
        try {
            $countries = $this->phoneNumberService->getEnabledCountries();
        } catch (\Exception $e) {
            Log::warning('Failed to fetch enabled countries: ' . $e->getMessage());
        }

        return Inertia::render('Customer/Numbers/Available', [
            'numbers' => $numbers->paginate($request->per_page ?? 24),
            'filters' => $request->only(['country_code', 'area_code', 'has_voice', 'has_sms']),
            'stats' => $this->phoneNumberService->getAvailableStats(),
            'countries' => $countries,
        ]);
    }

    /**
     * Display customer's assigned numbers
     */
    public function myNumbers(Request $request)
    {
        $this->authorize('viewAny', PhoneNumber::class);

        // Get user's numbers - MUST only return numbers with user_id AND status = 'assigned'
        $numbers = $this->phoneNumberService->getUserNumbers($request->user()->id)
            ->paginate($request->per_page ?? 15);
        
        // Get AI agents with their phone numbers
        $aiAgents = \App\Models\AiAgent::whereNotNull('phone_number')
            ->get()
            ->keyBy('phone_number');
        
        // Add AI agent info to each number
        $numbers->getCollection()->transform(function ($number) use ($aiAgents) {
            $aiAgent = $aiAgents->get($number->number);
            $number->ai_agent = $aiAgent ? [
                'id' => $aiAgent->id,
                'name' => $aiAgent->name,
                'type' => $aiAgent->type,
                'active' => $aiAgent->active,
            ] : null;
            return $number;
        });

        return Inertia::render('Customer/Numbers/MyNumbers', [
            'numbers' => $numbers,
        ]);
    }

    /**
     * Display customer's number requests
     */
    public function myRequests(Request $request)
    {
        $this->authorize('viewAny', NumberRequest::class);

        $requests = $this->numberRequestService->getCustomerRequests($request->user())
            ->with(['phoneNumber'])
            ->latest('requested_at')
            ->paginate($request->per_page ?? 15);

        return Inertia::render('Customer/Numbers/MyRequests', [
            'requests' => $requests,
        ]);
    }

    /**
     * Request a phone number
     */
    public function request(PhoneNumber $phoneNumber, Request $request)
    {
        $this->authorize('request', $phoneNumber);

        $request->validate([
            'customer_notes' => 'nullable|string|max:500',
        ]);

        try {
            $numberRequest = $this->numberRequestService->createRequest(
                $phoneNumber,
                $request->user(),
                $request->customer_notes
            );

            return redirect()->route('customer.numbers.my-requests')
                ->with('success', 'Number request submitted successfully. Admin will review shortly.');
        } catch (\Exception $e) {
            return redirect()->back()
                ->with('error', 'Failed to submit request: ' . $e->getMessage());
        }
    }

    /**
     * Cancel a pending request
     */
    public function cancel(NumberRequest $numberRequest)
    {
        $this->authorize('cancel', $numberRequest);

        try {
            $this->numberRequestService->cancelRequest($numberRequest);

            return redirect()->back()
                ->with('success', 'Request cancelled successfully.');
        } catch (\Exception $e) {
            return redirect()->back()
                ->with('error', 'Failed to cancel request: ' . $e->getMessage());
        }
    }

    /**
     * API endpoint to get user's assigned numbers (for softphone switcher)
     * EXCLUDES numbers assigned to AI Agents
     */
    public function myNumbersApi(Request $request)
    {
        $userId = $request->user()->id;
        
        Log::info('Fetching user numbers for softphone', ['user_id' => $userId]);
        
        // Get numbers assigned to AI agents (to exclude from softphone)
        $aiAgentNumbers = \App\Models\AiAgent::whereNotNull('phone_number')
            ->pluck('phone_number')
            ->toArray();

        // Get only configured numbers (those with twilio_sid set and assigned)
        // EXCLUDE numbers that are assigned to AI agents
        $numbers = $this->phoneNumberService->getUserNumbers($userId)
            ->whereNotNull('twilio_sid') // Must have Twilio SID (configured in Twilio)
            ->whereNotIn('number', $aiAgentNumbers) // CRITICAL: Exclude AI Agent numbers
            ->get()
            ->map(function ($number) {
                return [
                    'id' => $number->id,
                    'number' => $number->number,
                    'formatted_number' => $number->formatted_number,
                    'friendly_name' => $number->friendly_name,
                    'capabilities' => $number->capabilities,
                ];
            });

        Log::info('User numbers fetched for softphone', [
            'user_id' => $userId,
            'count' => $numbers->count(),
            'numbers' => $numbers->pluck('number')->toArray()
        ]);

        return response()->json([
            'numbers' => $numbers,
        ]);
    }

    /**
     * Get ALL available phone numbers for AI Agent assignment
     * Returns only numbers that are purchased from Twilio (have twilio_sid)
     * Includes AI agent information and supports filtering
     */
    public function allNumbersApi(Request $request)
    {
        $search = $request->query('search', '');
        
        // Get AI agents with their phone numbers for quick lookup
        $aiAgents = \App\Models\AiAgent::whereNotNull('phone_number')
            ->get()
            ->keyBy('phone_number');

        // Get ALL purchased/configured numbers from Twilio, regardless of assignment status
        // This is for AI Agent assignment - we want to show all available Twilio numbers
        $query = \App\Models\PhoneNumber::whereNotNull('twilio_sid'); // Must be purchased from Twilio
        
        // Apply search filter if provided
        if ($search) {
            $query->where(function($q) use ($search, $aiAgents) {
                // Search by phone number
                $q->where('number', 'like', '%' . $search . '%')
                  ->orWhere('friendly_name', 'like', '%' . $search . '%');
                
                // Search by AI agent name
                $agentNumbers = $aiAgents->filter(function($agent) use ($search) {
                    return stripos($agent->name, $search) !== false;
                })->pluck('phone_number')->toArray();
                
                if (!empty($agentNumbers)) {
                    $q->orWhereIn('number', $agentNumbers);
                }
            });
        }
        
        $numbers = $query->orderBy('number')
            ->get()
            ->map(function ($number) use ($aiAgents) {
                $aiAgent = $aiAgents->get($number->number);
                
                return [
                    'id' => $number->id,
                    'number' => $number->number,
                    'formatted_number' => $number->formatted_number,
                    'friendly_name' => $number->friendly_name,
                    'capabilities' => $number->capabilities,
                    'status' => $number->status,
                    'is_assigned_to_user' => $number->user_id ? true : false,
                    'ai_agent' => $aiAgent ? [
                        'id' => $aiAgent->id,
                        'name' => $aiAgent->name,
                        'type' => $aiAgent->type,
                        'active' => $aiAgent->active,
                    ] : null,
                ];
            });

        return response()->json([
            'numbers' => $numbers,
        ]);
    }
}

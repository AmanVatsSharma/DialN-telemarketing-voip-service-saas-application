<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Actions\Campaigns\CreateCampaignAction;
use App\Actions\Campaigns\DeleteCampaignAction;
use App\Actions\Campaigns\LaunchCampaignAction;
use App\Actions\Campaigns\PauseCampaignAction;
use App\Actions\Campaigns\ResumeCampaignAction;
use App\Actions\Campaigns\UpdateCampaignAction;
use App\Actions\Campaigns\UploadCampaignContactsAction;
use App\Models\AudioFile;
use App\Models\Campaign;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Inertia\Response;

class CampaignController extends Controller
{
    /**
     * Display a listing of campaigns
     */
    public function index(Request $request): Response
    {
        $this->authorize('viewAny', Campaign::class);

        $user = $request->user();
        $query = Campaign::query();

        // Admin sees all, Customer sees own, Agent sees parent's
        if ($user->isAdmin()) {
            // Admin sees all campaigns
        } elseif ($user->isCustomer()) {
            $query->where('user_id', $user->id);
        } elseif ($user->isAgent()) {
            $query->where('user_id', $user->parent_user_id);
        }

        $campaigns = $query
            ->when($request->input('status'), function ($query, $status) {
                $query->where('status', $status);
            })
            ->withCount('campaignContacts')
            ->latest()
            ->paginate(15);

        return Inertia::render('campaigns/index', [
            'campaigns' => $campaigns,
            'filters' => [
                'status' => $request->input('status'),
            ],
        ]);
    }

    /**
     * Show the form for creating a new campaign
     */
    public function create(Request $request): Response
    {
        $this->authorize('create', Campaign::class);

        $audioFiles = AudioFile::query()
            ->where('user_id', $request->user()->id)
            ->orderBy('filename')
            ->get(['id', 'filename']);

        // Get campaign templates (system + user's custom)
        $templates = \App\Models\CampaignTemplate::query()
            ->where(function ($q) use ($request) {
                $q->where('is_system_template', true)
                  ->orWhere('user_id', $request->user()->id);
            })
            ->orderByDesc('is_system_template')
            ->orderBy('category')
            ->orderByDesc('usage_count')
            ->get(['id', 'name', 'description', 'category', 'template_data', 'is_system_template']);

        // Get selected template if provided
        $selectedTemplate = null;
        if ($request->has('template')) {
            $selectedTemplate = \App\Models\CampaignTemplate::find($request->get('template'));
            if ($selectedTemplate) {
                $selectedTemplate->incrementUsage();
            }
        }

        // Get user's contact lists
        $contactLists = \App\Models\ContactList::where('user_id', $request->user()->id)
            ->withCount('contacts')
            ->orderBy('name')
            ->get(['id', 'name', 'contacts_count']);

        // Get user's phone numbers with AI agent information
        $phoneNumbers = $request->user()->phoneNumbers()
            ->whereNotNull('twilio_sid')
            ->with(['aiAgent' => function ($query) {
                $query->select('id', 'name', 'type', 'phone_number', 'active');
            }])
            ->get()
            ->map(function ($phone) {
                return [
                    'id' => $phone->id,
                    'number' => $phone->number,
                    'formatted_number' => $phone->formatted_number,
                    'friendly_name' => $phone->friendly_name,
                    'ai_agent' => $phone->aiAgent ? [
                        'id' => $phone->aiAgent->id,
                        'name' => $phone->aiAgent->name,
                        'type' => $phone->aiAgent->type,
                        'is_active' => $phone->aiAgent->active,
                    ] : null,
                ];
            });

        return Inertia::render('campaigns/create', [
            'audioFiles' => $audioFiles,
            'templates' => $templates,
            'selectedTemplate' => $selectedTemplate,
            'contactLists' => $contactLists,
            'phoneNumbers' => $phoneNumbers,
        ]);
    }

    /**
     * Store a newly created campaign
     */
    public function store(
        Request $request,
        CreateCampaignAction $action
    ): RedirectResponse {
        $this->authorize('create', Campaign::class);

        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'type' => ['required', 'in:text_to_speech,voice_to_voice'],
            'message' => ['nullable', 'string', 'max:250'],
            'audio_file_id' => ['nullable', 'exists:audio_files,id'],
            'language' => ['nullable', 'string', 'max:10'],
            'voice' => ['nullable', 'string', 'max:50'],
            'phone_number_id' => ['nullable', 'exists:phone_numbers,id'],
            'from_number' => ['nullable', 'string', 'max:20'],
            'enable_recording' => ['boolean'],
            'enable_dtmf' => ['boolean'],
            'max_concurrent_calls' => ['integer', 'min:1', 'max:50'],
            'retry_attempts' => ['integer', 'min:0', 'max:10'],
            'retry_delay_minutes' => ['integer', 'min:1', 'max:60'],
            'expected_variables' => ['nullable', 'array'],
            'expected_variables.*' => ['string', 'regex:/^[a-z_][a-z0-9_]*$/'],
            'campaign_variables' => ['nullable', 'array'],
            'campaign_variables.*' => ['string'],
            'launch_type' => ['nullable', 'in:draft,instant,scheduled'],
            'scheduled_at' => ['nullable', 'date', 'after:now'],
            'dtmf_actions' => ['nullable', 'array'],
            'dtmf_actions.*.key' => ['required', 'string', 'max:1'],
            'dtmf_actions.*.label' => ['required', 'string', 'max:255'],
            'dtmf_actions.*.action' => ['nullable', 'string', 'max:255'],
            'contact_list_ids' => ['nullable', 'array'],
            'contact_list_ids.*' => ['exists:contact_lists,id'],
        ]);

        // Set from_number from the selected phone number
        if ($validated['phone_number_id']) {
            $phoneNumber = \App\Models\PhoneNumber::find($validated['phone_number_id']);
            if ($phoneNumber) {
                $validated['from_number'] = $phoneNumber->number;
                
                // Auto-assign AI agent if phone number has one assigned
                $aiAgent = \App\Models\AiAgent::where('phone_number', $phoneNumber->number)
                    ->where('active', true)
                    ->first();
                
                if ($aiAgent) {
                    $validated['ai_agent_id'] = $aiAgent->id;
                    \Illuminate\Support\Facades\Log::info('Auto-assigned AI agent to campaign', [
                        'campaign_name' => $validated['name'],
                        'phone_number' => $phoneNumber->number,
                        'ai_agent_id' => $aiAgent->id,
                        'ai_agent_name' => $aiAgent->name,
                    ]);
                }
            }
        }

        // If no phone number is selected, force campaign to draft status
        if (empty($validated['phone_number_id'])) {
            $validated['launch_type'] = 'draft';
        }

        try {
            $campaign = $action->execute($request->user(), $validated);

            // Attach contact lists if provided
            if (!empty($validated['contact_list_ids'])) {
                $this->attachContactListsToCampaign($campaign, $validated['contact_list_ids']);
            }

            return redirect()->route('campaigns.show', $campaign->id)
                ->with('success', 'Campaign created successfully');
        } catch (\Exception $e) {
            return back()->withErrors(['error' => $e->getMessage()]);
        }
    }

    /**
     * Attach contacts from contact lists to campaign
     */
    private function attachContactListsToCampaign($campaign, array $contactListIds): void
    {
        foreach ($contactListIds as $listId) {
            $contactList = \App\Models\ContactList::find($listId);
            if (!$contactList) continue;

            $contacts = $contactList->contacts;
            foreach ($contacts as $contact) {
                // Check if contact already in campaign
                $exists = $campaign->campaignContacts()
                    ->where('phone_number', $contact->phone_number)
                    ->exists();

                if (!$exists) {
                    $campaign->campaignContacts()->create([
                        'phone_number' => $contact->phone_number,
                        'first_name' => $contact->first_name,
                        'last_name' => $contact->last_name,
                        'email' => $contact->email,
                        'status' => 'pending',
                        'call_attempts' => 0,
                    ]);
                }
            }
        }

        // Update campaign total_contacts count
        $campaign->update([
            'total_contacts' => $campaign->campaignContacts()->count(),
        ]);
    }

    /**
     * Display the specified campaign
     */
    public function show(Request $request, Campaign $campaign): Response
    {
        $this->authorize('view', $campaign);

        $campaign->load([
            'campaignContacts' => function ($query) {
                $query->latest()->limit(10);
            },
            'calls' => function ($query) {
                $query->latest()->limit(10);
            },
            'audioFile',
            'aiAgent' => function ($query) {
                $query->select('id', 'name', 'model', 'voice', 'active');
            },
        ]);

        $campaign->loadCount('campaignContacts', 'calls');

        // Get DTMF analytics if DTMF is enabled
        $dtmfStats = null;
        if ($campaign->enable_dtmf) {
            $totalResponses = $campaign->dtmfResponses()->count();
            
            $dtmfStats = [
                'total' => $totalResponses,
                'by_digit' => $campaign->dtmfResponses()
                    ->select('digits_pressed', \Illuminate\Support\Facades\DB::raw('count(*) as count'))
                    ->groupBy('digits_pressed')
                    ->get()
                    ->map(function ($item) use ($campaign, $totalResponses) {
                        $label = $this->getDtmfLabel($campaign, $item->digits_pressed);
                        return [
                            'digit' => $item->digits_pressed,
                            'label' => $label,
                            'count' => $item->count,
                            'percentage' => $totalResponses > 0 ? round(($item->count / $totalResponses) * 100, 1) : 0,
                        ];
                    }),
                'by_action' => $campaign->dtmfResponses()
                    ->whereNotNull('action_taken')
                    ->select('action_taken', \Illuminate\Support\Facades\DB::raw('count(*) as count'))
                    ->groupBy('action_taken')
                    ->get()
                    ->map(function ($item) use ($totalResponses) {
                        return [
                            'action' => $item->action_taken,
                            'count' => $item->count,
                            'percentage' => $totalResponses > 0 ? round(($item->count / $totalResponses) * 100, 1) : 0,
                        ];
                    }),
            ];
        }

        return Inertia::render('campaigns/show', [
            'campaign' => $campaign,
            'dtmfStats' => $dtmfStats,
        ]);
    }

    /**
     * Helper method to get DTMF label from campaign actions
     */
    private function getDtmfLabel(Campaign $campaign, string $digit): string
    {
        $actions = $campaign->dtmf_actions ?? [];
        
        foreach ($actions as $action) {
            if (isset($action['key']) && $action['key'] === $digit) {
                return $action['label'] ?? $digit;
            }
        }
        
        return $digit;
    }

    /**
     * Show the form for editing the specified campaign
     */
    public function edit(Request $request, Campaign $campaign): Response
    {
        $this->authorize('update', $campaign);

        $audioFiles = AudioFile::query()
            ->where('user_id', $request->user()->id)
            ->orderBy('filename')
            ->get(['id', 'filename']);

        // Get user's phone numbers with AI agent information
        $phoneNumbers = $request->user()->phoneNumbers()
            ->whereNotNull('twilio_sid')
            ->with(['aiAgent' => function ($query) {
                $query->select('id', 'name', 'type', 'phone_number', 'active');
            }])
            ->get()
            ->map(function ($phone) {
                return [
                    'id' => $phone->id,
                    'number' => $phone->number,
                    'formatted_number' => $phone->formatted_number,
                    'friendly_name' => $phone->friendly_name,
                    'ai_agent' => $phone->aiAgent ? [
                        'id' => $phone->aiAgent->id,
                        'name' => $phone->aiAgent->name,
                        'type' => $phone->aiAgent->type,
                        'is_active' => $phone->aiAgent->active,
                    ] : null,
                ];
            });

        return Inertia::render('campaigns/edit', [
            'campaign' => $campaign,
            'audioFiles' => $audioFiles,
            'phoneNumbers' => $phoneNumbers,
        ]);
    }

    /**
     * Update the specified campaign
     */
    public function update(
        Request $request,
        Campaign $campaign,
        UpdateCampaignAction $action
    ): RedirectResponse {
        $this->authorize('update', $campaign);

        $validated = $request->validate([
            'name' => ['sometimes', 'string', 'max:255'],
            'type' => ['sometimes', 'in:text_to_speech,voice_to_voice'],
            'message' => ['nullable', 'string', 'max:250'],
            'audio_file_id' => ['nullable', 'exists:audio_files,id'],
            'language' => ['nullable', 'string', 'max:10'],
            'voice' => ['nullable', 'string', 'max:50'],
            'phone_number_id' => ['nullable', 'exists:phone_numbers,id'],
            'from_number' => ['nullable', 'string', 'max:20'],
            'enable_recording' => ['boolean'],
            'enable_dtmf' => ['boolean'],
            'max_concurrent_calls' => ['integer', 'min:1', 'max:50'],
            'retry_attempts' => ['integer', 'min:0', 'max:10'],
            'retry_delay_minutes' => ['integer', 'min:1', 'max:60'],
            'scheduled_at' => ['nullable', 'date'],
            'expected_variables' => ['nullable', 'array'],
            'expected_variables.*' => ['string', 'regex:/^[a-z_][a-z0-9_]*$/'],
            'campaign_variables' => ['nullable', 'array'],
        ]);

        // Set from_number from the selected phone number
        if (isset($validated['phone_number_id']) && $validated['phone_number_id']) {
            $phoneNumber = \App\Models\PhoneNumber::find($validated['phone_number_id']);
            if ($phoneNumber) {
                $validated['from_number'] = $phoneNumber->number;
                
                // Auto-assign AI agent if phone number has one assigned
                $aiAgent = \App\Models\AiAgent::where('phone_number', $phoneNumber->number)
                    ->where('active', true)
                    ->first();
                
                if ($aiAgent) {
                    $validated['ai_agent_id'] = $aiAgent->id;
                } else {
                    // Clear AI agent if phone number changed to one without agent
                    $validated['ai_agent_id'] = null;
                }
            }
        }

        try {
            $action->execute($campaign, $validated);

            return redirect()->route('campaigns.show', $campaign->id)
                ->with('success', 'Campaign updated successfully');
        } catch (\Exception $e) {
            return back()->withErrors(['error' => $e->getMessage()]);
        }
    }

    /**
     * Remove the specified campaign
     */
    public function destroy(
        Request $request,
        Campaign $campaign,
        DeleteCampaignAction $action
    ): RedirectResponse {
        $this->authorize('delete', $campaign);

        try {
            $action->execute($campaign);

            return redirect()->route('campaigns.index')
                ->with('success', 'Campaign deleted successfully');
        } catch (\Exception $e) {
            return back()->withErrors(['error' => $e->getMessage()]);
        }
    }

    /**
     * Launch a campaign
     */
    public function launch(
        Request $request,
        Campaign $campaign,
        LaunchCampaignAction $action
    ): RedirectResponse {
        $this->authorize('execute', $campaign);

        try {
            $action->execute($campaign);

            return back()->with('success', 'Campaign launched successfully');
        } catch (\Exception $e) {
            return back()->withErrors(['error' => $e->getMessage()]);
        }
    }

    /**
     * Pause a campaign
     */
    public function pause(
        Request $request,
        Campaign $campaign,
        PauseCampaignAction $action
    ): RedirectResponse {
        $this->authorize('execute', $campaign);

        try {
            $action->execute($campaign);

            return back()->with('success', 'Campaign paused successfully');
        } catch (\Exception $e) {
            return back()->withErrors(['error' => $e->getMessage()]);
        }
    }

    /**
     * Resume a campaign
     */
    public function resume(
        Request $request,
        Campaign $campaign,
        ResumeCampaignAction $action
    ): RedirectResponse {
        $this->authorize('execute', $campaign);

        try {
            $action->execute($campaign);

            return back()->with('success', 'Campaign resumed successfully');
        } catch (\Exception $e) {
            return back()->withErrors(['error' => $e->getMessage()]);
        }
    }

    /**
     * Upload contacts from CSV file
     */
    public function uploadContacts(
        Request $request,
        Campaign $campaign,
        UploadCampaignContactsAction $action
    ): RedirectResponse {
        $this->authorize('update', $campaign);

        $request->validate([
            'file' => 'required|file|mimes:csv,txt|max:5120', // 5MB
        ]);

        try {
            $result = $action->execute($campaign, $request->file('file'));

            $message = sprintf(
                'Imported %d contacts. %d skipped.',
                $result['imported'],
                $result['skipped']
            );

            return back()->with([
                'success' => $message,
                'upload_result' => $result,
            ]);
        } catch (\Exception $e) {
            return back()->withErrors(['error' => $e->getMessage()]);
        }
    }

    /**
     * Make on-demand call without queue (for testing)
     */
    public function makeOnDemandCall(
        Request $request,
        Campaign $campaign
    ): RedirectResponse {
        $this->authorize('update', $campaign);

        // Import necessary services
        $twilioService = app(\App\Services\TwilioService::class);
        $creditService = app(\App\Services\CreditService::class);
        $phoneValidator = app(\App\Services\PhoneValidationService::class);

        try {
            // Get next pending contact
            $contact = $campaign->campaignContacts()
                ->where('status', 'pending')
                ->orderBy('id')
                ->first();

            if (!$contact) {
                return back()->withErrors(['error' => 'No pending contacts found in this campaign']);
            }

            // Check user credits
            $user = $campaign->user;
            if (!$creditService->canAfford($user, 1.0)) {
                return back()->withErrors(['error' => 'Insufficient credits. Please top up your account.']);
            }

            // Validate phone number
            $phoneResult = $phoneValidator->sanitize($contact->phone_number);
            
            if (!$phoneResult['success']) {
                $contact->update([
                    'status' => 'failed',
                    'call_attempts' => $contact->call_attempts + 1,
                ]);
                return back()->withErrors(['error' => "Invalid phone number: {$phoneResult['error']}"]);
            }

            $sanitizedNumber = $phoneResult['formatted'];

            // Check Twilio credentials
            if (!$user->twilioCredential) {
                return back()->withErrors(['error' => 'No Twilio credentials found. Please configure Twilio first.']);
            }

            // Update contact to in_progress
            $contact->update([
                'status' => 'in_progress',
                'call_attempts' => $contact->call_attempts + 1,
                'last_call_at' => now(),
            ]);

            // Create call record
            $call = \App\Models\Call::create([
                'user_id' => $campaign->user_id,
                'campaign_id' => $campaign->id,
                'campaign_contact_id' => $contact->id,
                'to_number' => $sanitizedNumber,
                'from_number' => $campaign->from_number,
                'status' => 'initiated',
                'direction' => 'outbound',
                'call_type' => 'campaign',
                'enable_recording' => $campaign->enable_recording,
                'enable_dtmf' => $campaign->enable_dtmf,
            ]);

            // Prepare TwiML URL based on campaign type
            if ($campaign->type === 'text_to_speech') {
                $twimlUrl = route('twiml.campaign.tts') . '?call_id=' . $call->id;
            } else {
                $twimlUrl = route('twiml.campaign.voice') . '?call_id=' . $call->id;
            }

            Log::info('ON-DEMAND CALL - Starting', [
                'campaign_id' => $campaign->id,
                'contact_id' => $contact->id,
                'call_id' => $call->id,
                'to' => $sanitizedNumber,
                'from' => $campaign->from_number,
                'twiml_url' => $twimlUrl,
            ]);

            // Initialize Twilio
            $twilioService->initializeForUser($user);

            // Make the call
            $twilioResult = $twilioService->initiateCall(
                $sanitizedNumber,
                $campaign->from_number,
                $twimlUrl,
                [
                    'statusCallback' => route('webhooks.twilio.call.status', ['call_id' => $call->id]),
                    'record' => $campaign->enable_recording ? 'record-from-answer' : null,
                ]
            );

            Log::info('ON-DEMAND CALL - Twilio Result', [
                'call_id' => $call->id,
                'result' => $twilioResult,
            ]);

            if (!$twilioResult['success']) {
                $errorMessage = $twilioResult['error'] ?? 'Unknown error';
                
                Log::error('ON-DEMAND CALL - Failed', [
                    'call_id' => $call->id,
                    'error' => $errorMessage,
                ]);

                $contact->update(['status' => 'failed']);
                $call->update([
                    'status' => 'failed',
                    'error_message' => $errorMessage,
                ]);

                return back()->withErrors(['error' => "Call failed: {$errorMessage}"]);
            }

            // Success - deduct credits
            $creditService->deductCredit(
                $user,
                1.0,
                "On-demand campaign call to {$sanitizedNumber}",
                [
                    'service_type' => 'call',
                    'reference_type' => 'Call',
                    'reference_id' => $call->id,
                    'metadata' => [
                        'campaign_id' => $campaign->id,
                        'contact_id' => $contact->id,
                        'on_demand' => true,
                    ],
                ]
            );

            // Update call with Twilio SID
            $twilioStatus = $twilioResult['status'];
            $mappedStatus = match($twilioStatus) {
                'queued', 'initiated' => 'initiated',
                'ringing' => 'ringing',
                'in-progress', 'answered' => 'in-progress',
                'completed' => 'completed',
                'busy' => 'busy',
                'no-answer', 'no_answer' => 'no-answer',
                'failed' => 'failed',
                'canceled', 'cancelled' => 'canceled',
                default => 'initiated',
            };

            $call->update([
                'twilio_call_sid' => $twilioResult['call_sid'],
                'status' => $mappedStatus,
            ]);

            Log::info('ON-DEMAND CALL - Success', [
                'call_id' => $call->id,
                'twilio_sid' => $twilioResult['call_sid'],
                'status' => $mappedStatus,
            ]);

            return back()->with('success', "Call initiated successfully! Call SID: {$twilioResult['call_sid']}");

        } catch (\Exception $e) {
            Log::error('ON-DEMAND CALL - Exception', [
                'campaign_id' => $campaign->id,
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);

            // Reset contact if it was set to in_progress
            if (isset($contact)) {
                $contact->update(['status' => 'pending']);
            }

            return back()->withErrors(['error' => "Error: {$e->getMessage()}"]);
        }
    }
}

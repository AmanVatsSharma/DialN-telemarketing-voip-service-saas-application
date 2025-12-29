<?php

namespace Database\Seeders;

use App\Models\AiAgent;
use App\Models\Call;
use App\Models\Campaign;
use App\Models\CampaignContact;
use App\Models\Contact;
use App\Models\ContactList;
use App\Models\PhoneNumber;
use App\Models\Role;
use App\Models\Transaction;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class DemoDataSeeder extends Seeder
{
    public function run(): void
    {
        $this->command->info('');
        $this->command->info('🌱 Seeding demo data...');
        $this->command->info('');

        $customer = $this->ensureDemoUser();
        $phone    = $this->seedPhoneNumber($customer);
        $lists    = $this->seedContactLists($customer);
        $contacts = $this->seedContacts($customer, $lists);
        $agents   = $this->seedAiAgents($customer, $phone);
        $this->seedCampaigns($customer, $phone, $contacts, $agents);
        $this->seedTransactions($customer);

        $this->command->info('');
        $this->command->info('🎉 Demo data seeded!');
        $this->command->info('');
        $this->command->info('  Login → http://127.0.0.1:8001/login');
        $this->command->info('  Email:    demo@DialN.app');
        $this->command->info('  Password: demo1234');
        $this->command->info('');
    }

    // -----------------------------------------------------------------------
    // Demo user
    // -----------------------------------------------------------------------

    private function ensureDemoUser(): User
    {
        $customerRole = Role::where('slug', Role::CUSTOMER)->firstOrFail();

        $user = User::firstOrCreate(
            ['email' => 'demo@DialN.app'],
            [
                'name'               => 'Alex Rivera',
                'password'           => Hash::make('demo1234'),
                'status'             => 'active',
                'email_verified_at'  => now(),
                'credit_balance'     => 250.00,
                'preferred_currency' => 'USD',
            ]
        );

        if (! $user->hasRole(Role::CUSTOMER)) {
            $user->roles()->attach($customerRole->id);
        }

        $this->command->info("✅ Demo user: demo@DialN.app / demo1234  (credit balance: \$250)");

        return $user;
    }

    // -----------------------------------------------------------------------
    // Phone number
    // -----------------------------------------------------------------------

    private function seedPhoneNumber(User $user): PhoneNumber
    {
        $phone = PhoneNumber::firstOrCreate(
            ['number' => '+12025550187', 'user_id' => $user->id],
            [
                'formatted_number' => '+1 (202) 555-0187',
                'friendly_name'    => 'Demo Line – Washington DC',
                'country_code'     => 'US',
                'area_code'        => '202',
                'status'           => 'assigned',
                'source'           => 'twilio_direct',
                'twilio_sid'       => 'PN' . Str::random(32),
                'capabilities'     => ['voice' => true, 'sms' => true, 'mms' => false],
                'monthly_cost'     => 1.15,
                'notes'            => 'Primary demo number',
            ]
        );

        $this->command->info('✅ Phone number: +1 (202) 555-0187');

        return $phone;
    }

    // -----------------------------------------------------------------------
    // Contact lists
    // -----------------------------------------------------------------------

    private function seedContactLists(User $user): array
    {
        $lists = [];
        $defs  = [
            ['name' => 'Q1 Prospects',          'description' => 'Warm leads from Q1 trade-show'],
            ['name' => 'Enterprise Targets',     'description' => 'Fortune 1000 decision-makers'],
            ['name' => 'Churned Customers',      'description' => 'Win-back list — cancelled in last 90 days'],
            ['name' => 'Newsletter Subscribers', 'description' => 'Opted-in for product updates'],
        ];

        foreach ($defs as $def) {
            $lists[] = ContactList::firstOrCreate(
                ['user_id' => $user->id, 'name' => $def['name']],
                ['description' => $def['description'], 'contact_count' => 0]
            );
        }

        $this->command->info('✅ Contact lists: ' . count($lists));

        return $lists;
    }

    // -----------------------------------------------------------------------
    // Contacts
    // -----------------------------------------------------------------------

    private function seedContacts(User $user, array $lists): array
    {
        $people = [
            // First name, Last name, Phone, Email, Company, Job title, Status, Engagement
            ['Sarah',   'Johnson',   '+14155550101', 'sarah.johnson@acme.com',        'Acme Corp',         'VP of Sales',           'active', 88],
            ['Michael', 'Chen',      '+14155550102', 'mchen@globaltrade.io',           'Global Trade',      'CEO',                   'active', 95],
            ['Emily',   'Rodriguez', '+14155550103', 'emily.r@brighttech.com',         'BrightTech',        'Director of Ops',       'active', 72],
            ['James',   'Williams',  '+14155550104', 'jwilliams@nexusfinance.com',     'Nexus Finance',     'CFO',                   'active', 60],
            ['Priya',   'Patel',     '+14155550105', 'priya@innovahealth.com',         'Innova Health',     'Head of Procurement',   'active', 81],
            ['David',   'Kim',       '+14155550106', 'dkim@skylineretail.com',         'Skyline Retail',    'COO',                   'active', 45],
            ['Laura',   'Martinez',  '+14155550107', 'lmartinez@urbanlogistics.net',   'Urban Logistics',   'Purchasing Manager',    'active', 68],
            ['Robert',  'Taylor',    '+14155550108', 'rtaylor@peakmanufacturing.com',  'Peak Manufacturing','Plant Director',        'active', 55],
            ['Aisha',   'Thompson',  '+14155550109', 'aisha.t@cloudbridge.io',         'Cloudbridge',       'CTO',                   'active', 90],
            ['Brian',   'Anderson',  '+14155550110', 'banderson@verdantenergy.com',    'Verdant Energy',    'Business Dev Manager',  'active', 77],
            ['Chloe',   'Wilson',    '+14155550111', 'cwilson@metroinsurance.com',     'Metro Insurance',   'Account Executive',     'active', 62],
            ['Daniel',  'Lee',       '+14155550112', 'dlee@alphaconsulting.co',        'Alpha Consulting',  'Managing Partner',      'active', 83],
            ['Fatima',  'Nasser',    '+14155550113', 'fnasser@crescentmedia.com',      'Crescent Media',    'CMO',                   'active', 70],
            ['George',  'Harris',    '+14155550114', 'gharris@titanbuilders.com',      'Titan Builders',    'President',             'active', 50],
            ['Hannah',  'Clark',     '+14155550115', 'hclark@swiftpayments.io',        'SwiftPayments',     'VP Product',            'active', 78],
            ['Ivan',    'Lewis',     '+14155550116', 'ilewis@northstarsupply.com',     'Northstar Supply',  'Ops Manager',           'inactive', 20],
            ['Julia',   'Walker',    '+14155550117', 'jwalker@solarhorizon.com',       'Solar Horizon',     'Sales Director',        'active', 86],
            ['Kevin',   'Hall',      '+14155550118', 'khall@primelogistics.net',       'Prime Logistics',   'Fleet Manager',         'active', 40],
            ['Lisa',    'Young',     '+14155550119', 'lyoung@diamondrealty.com',       'Diamond Realty',    'Senior Broker',         'active', 65],
            ['Marcus',  'Allen',     '+14155550120', 'mallen@fusiontechnology.com',    'Fusion Technology', 'IT Director',           'active', 73],
        ];

        $contacts = [];
        foreach ($people as $i => [$first, $last, $phone, $email, $company, $title, $status, $engagement]) {
            $contact = Contact::firstOrCreate(
                ['user_id' => $user->id, 'phone_number' => $phone],
                [
                    'first_name'          => $first,
                    'last_name'           => $last,
                    'email'               => $email,
                    'company'             => $company,
                    'job_title'           => $title,
                    'status'              => $status,
                    'opted_out'           => $status === 'inactive',
                    'opted_out_at'        => $status === 'inactive' ? now()->subDays(10) : null,
                    'source'              => collect(['import', 'crm_sync', 'manual', 'api'])->random(),
                    'timezone'            => collect(['America/New_York', 'America/Chicago', 'America/Los_Angeles', 'America/Denver'])->random(),
                    'language'            => 'en',
                    'engagement_score'    => $engagement,
                    'data_quality_score'  => rand(70, 99),
                    'total_campaigns'     => rand(1, 4),
                    'total_calls'         => rand(1, 6),
                    'successful_calls'    => rand(0, 4),
                    'last_contacted_at'   => now()->subDays(rand(1, 60)),
                    'manually_verified'   => (bool) rand(0, 1),
                ]
            );

            // Attach to a list
            $list = $lists[$i % count($lists)];
            if (! $list->contacts()->where('contact_id', $contact->id)->exists()) {
                $list->contacts()->attach($contact->id);
            }

            $contacts[] = $contact;
        }

        // Update contact counts on lists
        foreach ($lists as $list) {
            $list->update(['contact_count' => $list->contacts()->count()]);
        }

        $this->command->info('✅ Contacts: ' . count($contacts));

        return $contacts;
    }

    // -----------------------------------------------------------------------
    // AI Agents
    // -----------------------------------------------------------------------

    private function seedAiAgents(User $user, PhoneNumber $phone): array
    {
        $agentDefs = [
            [
                'name'          => 'Sales Qualifier — Sophie',
                'description'   => 'Qualifies inbound leads and books discovery calls',
                'type'          => 'outbound',
                'phone_number'  => '+12025550187',
                'system_prompt' => "You are Sophie, a friendly sales development representative for DialN. Your goal is to qualify prospects by understanding their team size, current calling solution, and monthly call volume. Always be concise, warm, and professional. If they're a good fit, offer to book a 15-minute demo.",
                'first_message' => "Hi, this is Sophie calling from DialN. I'm reaching out because your company recently expressed interest in our outbound calling platform. Do you have two minutes to chat?",
                'goodbye_message' => "Thanks so much for your time today! I'll send over the calendar invite shortly. Have a great day!",
                'voice'         => 'alloy',
                'model'         => 'openai/gpt-4o-mini',
                'temperature'   => 0.7,
                'active'        => true,
            ],
            [
                'name'          => 'Customer Win-Back — Marcus',
                'description'   => 'Re-engages churned customers with targeted offers',
                'type'          => 'outbound',
                'phone_number'  => '+12025550188',
                'system_prompt' => "You are Marcus, a customer success specialist. You're calling customers who cancelled their subscription in the past 90 days. Your goal is to understand why they left and offer a 30% discount to return. Be empathetic, listen carefully, and don't be pushy.",
                'first_message' => "Hello, may I speak with {first_name}? This is Marcus from DialN's customer success team. I noticed your account was closed recently and I wanted to personally reach out.",
                'goodbye_message' => "I completely understand. Thank you for your candid feedback — it really helps us improve. Take care!",
                'voice'         => 'echo',
                'model'         => 'openai/gpt-4o-mini',
                'temperature'   => 0.6,
                'active'        => true,
            ],
            [
                'name'          => 'Survey Bot — Dana',
                'description'   => 'Collects NPS and product feedback post-onboarding',
                'type'          => 'outbound',
                'phone_number'  => '+12025550189',
                'system_prompt' => "You are Dana, conducting a quick 3-question satisfaction survey on behalf of DialN. Keep it under 3 minutes. Ask: 1) On a scale of 1–10, how satisfied are you? 2) What's working well? 3) What could be improved? Thank them warmly at the end.",
                'first_message' => "Hi {first_name}, I'm Dana calling from DialN. We'd love your honest feedback on your onboarding experience — it only takes about 3 minutes. Is now a good time?",
                'goodbye_message' => "Wonderful! Your feedback has been recorded. We really appreciate it and will use it to keep improving. Thank you and have a fantastic day!",
                'voice'         => 'coral',
                'model'         => 'openai/gpt-4o-mini',
                'temperature'   => 0.5,
                'active'        => true,
            ],
        ];

        $agents = [];
        foreach ($agentDefs as $def) {
            $agent = AiAgent::firstOrCreate(
                ['name' => $def['name']],
                array_merge($def, [
                    'tts_provider'     => 'openai',
                    'text_provider'    => 'openrouter',
                    'max_tokens'       => 300,
                    'max_duration'     => 600,
                    'silence_timeout'  => 10,
                    'response_timeout' => 5,
                    'enable_recording' => true,
                    'enable_transfer'  => false,
                ])
            );
            $agents[] = $agent;
        }

        $this->command->info('✅ AI Agents: ' . count($agents));

        return $agents;
    }

    // -----------------------------------------------------------------------
    // Campaigns
    // -----------------------------------------------------------------------

    private function seedCampaigns(User $user, PhoneNumber $phone, array $contacts, array $agents): void
    {
        $campaigns = [
            // Completed campaign with good results
            [
                'meta' => [
                    'name'             => 'Q1 Product Launch Blast',
                    'type'             => 'text_to_speech',
                    'status'           => 'completed',
                    'message'          => "Hi {first_name}, this is Alex from DialN. We just launched our AI-powered outbound calling platform and I'd love to show you how it can 10x your team's productivity. Press 1 to learn more or 2 to be removed from our list.",
                    'voice'            => 'Polly.Joanna',
                    'voice_gender'     => 'female',
                    'voice_language'   => 'en-US',
                    'from_number'      => $phone->number,
                    'enable_recording' => true,
                    'enable_dtmf'      => true,
                    'dtmf_num_digits'  => 1,
                    'dtmf_timeout'     => 5,
                    'dtmf_prompt'      => 'Press 1 to speak with a rep or 2 to opt out',
                    'total_contacts'   => 12,
                    'total_called'     => 12,
                    'total_answered'   => 9,
                    'total_failed'     => 3,
                    'started_at'       => now()->subDays(14),
                    'completed_at'     => now()->subDays(13),
                    'scheduled_at'     => now()->subDays(14),
                ],
                'contacts' => array_slice($contacts, 0, 12),
                'call_statuses' => ['completed', 'completed', 'completed', 'completed', 'completed', 'completed', 'completed', 'completed', 'completed', 'no-answer', 'busy', 'failed'],
            ],
            // Active / running campaign
            [
                'meta' => [
                    'name'             => 'Enterprise Outreach — April',
                    'type'             => 'text_to_speech',
                    'status'           => 'paused',
                    'message'          => "Hello {first_name}, I'm reaching out from DialN. Our enterprise calling platform is now used by over 500 businesses like {company}. Can we schedule 15 minutes to show you the ROI? Reply YES to this message or visit DialN.app.",
                    'voice'            => 'Polly.Matthew',
                    'voice_gender'     => 'male',
                    'voice_language'   => 'en-US',
                    'from_number'      => $phone->number,
                    'enable_recording' => true,
                    'enable_dtmf'      => false,
                    'total_contacts'   => 8,
                    'total_called'     => 5,
                    'total_answered'   => 4,
                    'total_failed'     => 1,
                    'started_at'       => now()->subDays(2),
                    'paused_at'        => now()->subHours(3),
                ],
                'contacts' => array_slice($contacts, 4, 8),
                'call_statuses' => ['completed', 'completed', 'completed', 'completed', 'no-answer', null, null, null],
            ],
            // AI Agent campaign
            [
                'meta' => [
                    'name'             => 'Win-Back — Churned Q4',
                    'type'             => 'voice_to_voice',
                    'status'           => 'completed',
                    'from_number'      => $phone->number,
                    'enable_recording' => true,
                    'enable_dtmf'      => false,
                    'ai_agent_id'      => $agents[1]->id ?? null,
                    'total_contacts'   => 6,
                    'total_called'     => 6,
                    'total_answered'   => 4,
                    'total_failed'     => 2,
                    'started_at'       => now()->subDays(7),
                    'completed_at'     => now()->subDays(6),
                    'scheduled_at'     => now()->subDays(7),
                ],
                'contacts' => array_slice($contacts, 8, 6),
                'call_statuses' => ['completed', 'completed', 'completed', 'completed', 'no-answer', 'no-answer'],
            ],
            // Scheduled upcoming campaign
            [
                'meta' => [
                    'name'             => 'May Webinar Invites',
                    'type'             => 'text_to_speech',
                    'status'           => 'scheduled',
                    'message'          => "Hi {first_name}! You're personally invited to our live demo webinar on May 15th. We'll show you how teams like {company} are saving 40% on calling costs with DialN. Register at DialN.app/webinar. See you there!",
                    'voice'            => 'Polly.Joanna',
                    'voice_gender'     => 'female',
                    'voice_language'   => 'en-US',
                    'from_number'      => $phone->number,
                    'enable_recording' => false,
                    'enable_dtmf'      => false,
                    'total_contacts'   => 20,
                    'total_called'     => 0,
                    'total_answered'   => 0,
                    'total_failed'     => 0,
                    'scheduled_at'     => now()->addDays(5),
                ],
                'contacts' => $contacts,
                'call_statuses' => [],
            ],
        ];

        $totalCalls = 0;

        foreach ($campaigns as $def) {
            $campaign = Campaign::firstOrCreate(
                ['user_id' => $user->id, 'name' => $def['meta']['name']],
                array_merge($def['meta'], ['user_id' => $user->id, 'phone_number_id' => null])
            );

            foreach ($def['contacts'] as $i => $contact) {
                $statusKey   = $def['call_statuses'][$i] ?? null;
                $callCreated = $statusKey !== null;

                $cc = CampaignContact::firstOrCreate(
                    ['campaign_id' => $campaign->id, 'contact_id' => $contact->id],
                    [
                        'phone_number'  => $contact->phone_number,
                        'first_name'    => $contact->first_name,
                        'last_name'     => $contact->last_name,
                        'email'         => $contact->email,
                        'company'       => $contact->company,
                        'status'        => $callCreated
                            ? ($statusKey === 'completed' ? 'called' : $statusKey)
                            : 'pending',
                        'last_call_at'  => $callCreated ? now()->subDays(rand(1, 14)) : null,
                        'call_attempts' => $callCreated ? 1 : 0,
                    ]
                );

                if ($callCreated) {
                    $isAnswered = $statusKey === 'completed';
                    $duration   = $isAnswered ? rand(30, 240) : 0;
                    $price      = $isAnswered ? round($duration / 60 * 0.013, 4) : 0;

                    $sentiments = ['positive', 'positive', 'positive', 'neutral', 'neutral', 'negative'];
                    $sentiment  = $isAnswered ? $sentiments[array_rand($sentiments)] : null;

                    $summaries = [
                        'positive' => 'Prospect expressed strong interest and asked about pricing. Requested a demo call.',
                        'neutral'  => 'Contact was polite but non-committal. Asked for follow-up email with details.',
                        'negative' => 'Contact already using a competitor. Not interested at this time.',
                    ];

                    Call::firstOrCreate(
                        ['campaign_id' => $campaign->id, 'campaign_contact_id' => $cc->id],
                        [
                            'user_id'              => $user->id,
                            'call_type'            => 'campaign',
                            'direction'            => 'outbound',
                            'from_number'          => $phone->number,
                            'to_number'            => $contact->phone_number,
                            'twilio_call_sid'      => 'CA' . Str::random(32),
                            'status'               => $statusKey,
                            'duration_seconds'     => $duration,
                            'answered_by'          => $isAnswered ? 'human' : null,
                            'price'                => $price,
                            'price_unit'           => 'USD',
                            'started_at'           => now()->subDays(rand(1, 14))->subSeconds(rand(0, 3600)),
                            'ended_at'             => $isAnswered ? now()->subDays(rand(1, 14)) : null,
                            'sentiment'            => $sentiment,
                            'sentiment_confidence' => $isAnswered ? rand(75, 98) / 100 : null,
                            'lead_score'           => $isAnswered ? rand(20, 95) : null,
                            'lead_quality'         => $isAnswered ? collect(['hot', 'warm', 'warm', 'cold'])->random() : null,
                            'ai_summary'           => $isAnswered && $sentiment ? $summaries[$sentiment] : null,
                            'sentiment_analyzed_at' => $isAnswered ? now()->subDays(rand(0, 1)) : null,
                        ]
                    );
                    $totalCalls++;
                }
            }
        }

        $this->command->info('✅ Campaigns: ' . count($campaigns) . '  |  Calls logged: ' . $totalCalls);
    }

    // -----------------------------------------------------------------------
    // Transactions / billing history
    // -----------------------------------------------------------------------

    private function seedTransactions(User $user): void
    {
        if (! class_exists(Transaction::class)) {
            return;
        }

        $txns = [
            ['type' => 'credit_purchase', 'amount' => 100.00, 'description' => 'Credit top-up — Starter Pack',      'days_ago' => 45],
            ['type' => 'credit_purchase', 'amount' => 200.00, 'description' => 'Credit top-up — Growth Pack',        'days_ago' => 20],
            ['type' => 'call_charge',     'amount' => -12.48, 'description' => 'Campaign: Q1 Product Launch Blast',   'days_ago' => 13],
            ['type' => 'call_charge',     'amount' => -8.31,  'description' => 'Campaign: Win-Back — Churned Q4',     'days_ago' => 6],
            ['type' => 'call_charge',     'amount' => -5.20,  'description' => 'Campaign: Enterprise Outreach',       'days_ago' => 2],
            ['type' => 'number_rental',   'amount' => -1.15,  'description' => 'Phone number +1 (202) 555-0187',      'days_ago' => 1],
        ];

        $created = 0;
        foreach ($txns as $t) {
            try {
                Transaction::firstOrCreate(
                    [
                        'user_id'     => $user->id,
                        'description' => $t['description'],
                    ],
                    [
                        'type'         => $t['type'],
                        'amount'       => $t['amount'],
                        'currency'     => 'USD',
                        'status'       => 'completed',
                        'created_at'   => now()->subDays($t['days_ago']),
                        'updated_at'   => now()->subDays($t['days_ago']),
                    ]
                );
                $created++;
            } catch (\Throwable $e) {
                // Transaction model may have required fields we don't know — skip gracefully
            }
        }

        if ($created > 0) {
            $this->command->info("✅ Transactions: $created");
        }
    }
}

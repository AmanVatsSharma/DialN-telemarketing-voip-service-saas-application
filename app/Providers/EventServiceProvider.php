<?php

namespace App\Providers;

use App\Events\CRM\CallCompletedEvent;
use App\Events\CRM\LeadQualifiedEvent;
use App\Events\CRM\ContactAddedEvent;
use App\Events\CRM\ContactUpdatedEvent;
use App\Events\CRM\CampaignStartedEvent;
use App\Events\CRM\DtmfResponseEvent;
use App\Listeners\CRM\DispatchCallCompletedWebhook;
use App\Listeners\CRM\DispatchLeadQualifiedWebhook;
use App\Listeners\CRM\DispatchContactAddedWebhook;
use App\Listeners\CRM\DispatchContactUpdatedWebhook;
use App\Listeners\CRM\DispatchCampaignStartedWebhook;
use App\Listeners\CRM\DispatchDtmfResponseWebhook;
use Illuminate\Foundation\Support\Providers\EventServiceProvider as ServiceProvider;

class EventServiceProvider extends ServiceProvider
{
    /**
     * The event listener mappings for the application.
     *
     * @var array<class-string, array<int, class-string>>
     */
    protected $listen = [
        CallCompletedEvent::class => [
            DispatchCallCompletedWebhook::class,
        ],
        LeadQualifiedEvent::class => [
            DispatchLeadQualifiedWebhook::class,
        ],
        ContactAddedEvent::class => [
            DispatchContactAddedWebhook::class,
        ],
        ContactUpdatedEvent::class => [
            DispatchContactUpdatedWebhook::class,
        ],
        CampaignStartedEvent::class => [
            DispatchCampaignStartedWebhook::class,
        ],
        DtmfResponseEvent::class => [
            DispatchDtmfResponseWebhook::class,
        ],
    ];

    /**
     * Register any events for your application.
     */
    public function boot(): void
    {
        //
    }

    /**
     * Determine if events and listeners should be automatically discovered.
     */
    public function shouldDiscoverEvents(): bool
    {
        return false;
    }
}

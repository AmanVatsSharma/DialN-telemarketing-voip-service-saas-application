<?php

namespace App\Console\Commands;

use App\Services\TwilioPricingService;
use App\Models\PricingRule;
use Illuminate\Console\Command;

class FetchTwilioPricing extends Command
{
    protected $signature = 'twilio:fetch-pricing 
                            {service_type : The service type (call, sms, phone_number, or all)}
                            {--markup-type=percentage : The markup type (percentage, fixed, hybrid)}
                            {--markup-value=25 : The markup value}
                            {--markup-fixed=0 : The fixed markup amount for hybrid type}';

    protected $description = 'Fetch pricing from Twilio for all countries';

    public function handle(TwilioPricingService $twilioPricingService)
    {
        $serviceType = $this->argument('service_type');
        $markupType = $this->option('markup-type');
        $markupValue = (float) $this->option('markup-value');
        $markupFixed = (float) $this->option('markup-fixed');

        $serviceTypes = $serviceType === 'all' 
            ? ['call', 'sms', 'phone_number']
            : [$serviceType];

        foreach ($serviceTypes as $type) {
            $this->info("Fetching {$type} pricing from Twilio...");
            
            try {
                $allPricing = [];
                $nextPageUrl = null;
                $pageCount = 0;

                do {
                    $result = match($type) {
                        'call' => $twilioPricingService->fetchVoicePricing($nextPageUrl),
                        'sms' => $twilioPricingService->fetchSmsPricing($nextPageUrl),
                        'phone_number' => $twilioPricingService->fetchPhoneNumberPricing($nextPageUrl),
                    };

                    $allPricing = array_merge($allPricing, $result['pricing']);
                    $nextPageUrl = $result['next_page_url'];
                    $pageCount++;

                    $this->info("  Fetched page {$pageCount} - " . count($result['pricing']) . " countries");
                    
                    // Debug: Show next page URL clearly
                    if ($nextPageUrl) {
                        // Show just the token part for readability
                        if (preg_match('/PageToken=([^&]+)/', $nextPageUrl, $matches)) {
                            $this->comment("  Next: PageToken=" . $matches[1]);
                        }
                    } else {
                        $this->comment("  No more pages - stopping");
                    }

                } while ($nextPageUrl);

                $this->info("Total countries fetched: " . count($allPricing));
                $this->info("Processing pricing rules...");

                $created = 0;
                $updated = 0;

                foreach ($allPricing as $pricing) {
                    $customerCharge = match($markupType) {
                        'percentage' => $pricing['base_cost'] * (1 + ($markupValue / 100)),
                        'fixed' => $pricing['base_cost'] + $markupValue,
                        'hybrid' => ($pricing['base_cost'] * (1 + ($markupValue / 100))) + $markupFixed,
                    };

                    $data = [
                        'country_code' => $pricing['country_code'],
                        'country_name' => $pricing['country_name'],
                        'service_type' => $type,
                        'base_cost' => $pricing['base_cost'],
                        'base_cost_unit' => $pricing['base_cost_unit'],
                        'markup_type' => $markupType,
                        'markup_value' => $markupValue,
                        'markup_fixed' => $markupType === 'hybrid' ? $markupFixed : null,
                        'customer_charge' => $customerCharge,
                        'minimum_charge' => $customerCharge,
                        'tier' => 'standard',
                        'is_active' => true,
                    ];

                    $existing = PricingRule::where('country_code', $pricing['country_code'])
                        ->where('service_type', $type)
                        ->where('tier', 'standard')
                        ->first();

                    if ($existing) {
                        $existing->update($data);
                        $updated++;
                    } else {
                        PricingRule::create($data);
                        $created++;
                    }
                }

                $this->info("✅ {$type} pricing completed:");
                $this->info("   Created: {$created}");
                $this->info("   Updated: {$updated}");
                $this->newLine();

            } catch (\Exception $e) {
                $this->error("❌ Error fetching {$type} pricing: " . $e->getMessage());
            }
        }

        $this->info('🎉 All pricing fetched successfully!');
        return Command::SUCCESS;
    }
}

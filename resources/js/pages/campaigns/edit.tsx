import AppLayout from '@/layouts/app-layout';
import Heading from '@/components/heading';
import { Button } from '@/components/ui/button';
import { Link, useForm, Head } from '@inertiajs/react';
import { ArrowLeft, Save } from 'lucide-react';
import {
  CampaignBasicInfo,
  CampaignVoiceSettings,
  CampaignSettings,
  AudioFileSelector,
  PhoneNumberSelector,
} from '@/components/campaigns/campaign-form-sections';
import VariableManager from '@/components/campaigns/variable-manager';
import EnhancedMessageInput from '@/components/campaigns/enhanced-message-input';
import { MessageVariantsGenerator } from '@/components/campaigns/message-variants-generator';
import { FormEventHandler } from 'react';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';

interface Campaign {
  id: number;
  name: string;
  type: 'text_to_speech' | 'voice_to_voice';
  message: string | null;
  phone_number_id: number | null;
  audio_file_id: number | null;
  language: string | null;
  voice: string | null;
  enable_recording: boolean;
  enable_dtmf: boolean;
  max_concurrent_calls: number;
  retry_attempts: number;
  retry_delay_minutes: number;
  expected_variables: string[] | null;
  campaign_variables: Record<string, string> | null;
}

interface PhoneNumber {
  id: number;
  number: string;
  formatted_number?: string;
  friendly_name?: string;
  ai_agent?: {
    id: number;
    name: string;
    type: string;
    is_active: boolean;
  };
}

interface Props {
  campaign: Campaign;
  audioFiles: Array<{ id: number; filename: string }>;
  phoneNumbers: PhoneNumber[];
}

export default function CampaignEdit({ campaign, audioFiles, phoneNumbers }: Props) {
  const { data, setData, put, errors, processing } = useForm({
    name: campaign.name,
    type: campaign.type,
    message: campaign.message || '',
    phone_number_id: campaign.phone_number_id || null,
    audio_file_id: campaign.audio_file_id || null,
    language: campaign.language || 'en-US',
    voice: campaign.voice || 'Joanna',
    enable_recording: campaign.enable_recording,
    enable_dtmf: campaign.enable_dtmf,
    max_concurrent_calls: campaign.max_concurrent_calls,
    retry_attempts: campaign.retry_attempts,
    retry_delay_minutes: campaign.retry_delay_minutes,
    expected_variables: campaign.expected_variables || [],
    campaign_variables: campaign.campaign_variables || {},
  });

  const handleChange = (field: string, value: string | boolean | number | null) => {
    setData(field as keyof typeof data, value as never);
  };

  const handleVariablesChange = (contactVars: string[], campaignVars: Record<string, string>) => {
    setData('expected_variables', contactVars);
    setData('campaign_variables', campaignVars);
  };

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    put(`/campaigns/${campaign.id}`);
  };

  const breadcrumbs: BreadcrumbItem[] = [
    {
      title: 'Dashboard',
      href: dashboard().url,
    },
    {
      title: 'Campaigns',
      href: '/campaigns',
    },
    {
      title: campaign.name,
      href: `/campaigns/${campaign.id}`,
    },
    {
      title: 'Edit',
      href: `/campaigns/${campaign.id}/edit`,
    },
  ];

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title={`Edit ${campaign.name}`} />
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Link href={`/campaigns/${campaign.id}`}>
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <Heading title="Edit Campaign" description={`Editing: ${campaign.name}`} />
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Info */}
          <CampaignBasicInfo
            data={{ name: data.name, type: data.type }}
            errors={{ name: errors.name, type: errors.type }}
            onChange={handleChange}
          />

          {/* Phone Number Selector */}
          <PhoneNumberSelector
            data={{ phone_number_id: data.phone_number_id }}
            phoneNumbers={phoneNumbers}
            errors={{ phone_number_id: errors.phone_number_id }}
            onChange={handleChange}
          />

          {/* Message (only for TTS) */}
          {data.type === 'text_to_speech' && (
            <>
              {/* Variables Manager - Must come first */}
              <VariableManager
                message={data.message}
                onVariablesChange={handleVariablesChange}
                initialContactVars={data.expected_variables}
                initialCampaignVars={data.campaign_variables}
              />

              {/* Enhanced Message Input */}
              <EnhancedMessageInput
                value={data.message}
                contactVariables={data.expected_variables}
                campaignVariables={data.campaign_variables}
                onChange={(value) => handleChange('message', value)}
                error={errors.message}
              />

              {/* AI Message Variants A/B Testing */}
              {data.message && (
                <MessageVariantsGenerator
                  campaignId={campaign.id}
                  baseMessage={data.message}
                  description={campaign.name}
                  onVariantsGenerated={(variants) => {
                    console.log('Generated variants:', variants);
                  }}
                />
              )}

              <CampaignVoiceSettings
                data={{ language: data.language, voice: data.voice }}
                errors={{ language: errors.language, voice: errors.voice }}
                onChange={handleChange}
              />
            </>
          )}

          {/* Audio File (only for Voice-to-Voice) */}
          {data.type === 'voice_to_voice' && (
            <AudioFileSelector
              data={{ audio_file_id: data.audio_file_id }}
              errors={{ audio_file_id: errors.audio_file_id }}
              audioFiles={audioFiles}
              onChange={handleChange}
            />
          )}

          {/* Settings */}
          <CampaignSettings
            data={{
              enable_recording: data.enable_recording,
              enable_dtmf: data.enable_dtmf,
              max_concurrent_calls: data.max_concurrent_calls,
              retry_attempts: data.retry_attempts,
              retry_delay_minutes: data.retry_delay_minutes,
            }}
            errors={{
              enable_recording: errors.enable_recording,
              enable_dtmf: errors.enable_dtmf,
              max_concurrent_calls: errors.max_concurrent_calls,
              retry_attempts: errors.retry_attempts,
              retry_delay_minutes: errors.retry_delay_minutes,
            }}
            onChange={handleChange}
          />

          {/* Actions */}
          <div className="flex justify-end gap-3">
            <Link href={`/campaigns/${campaign.id}`}>
              <Button type="button" variant="outline" disabled={processing}>
                Cancel
              </Button>
            </Link>
            <Button type="submit" disabled={processing}>
              <Save className="mr-2 h-4 w-4" />
              {processing ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        </form>
      </div>
    </AppLayout>
  );
}

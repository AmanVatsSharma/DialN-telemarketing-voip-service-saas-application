import { Head } from '@inertiajs/react';

import AppearanceTabs from '@/components/appearance-tabs';
import FontSelector from '@/components/font-selector';
import HeadingSmall from '@/components/heading-small';
import { type BreadcrumbItem } from '@/types';

import AppLayout from '@/layouts/app-layout';
import SettingsLayout from '@/layouts/settings/layout';
import { edit as editAppearance } from '@/routes/appearance';
import { PageHelp } from '@/components/page-help';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Appearance settings',
        href: editAppearance().url,
    },
];

export default function Appearance() {
    const helpSections = [
        {
            title: 'Theme Customization',
            content: 'Customize the visual appearance of the application to match your preferences. Choose between light and dark modes for comfortable viewing.',
        },
        {
            title: 'Font Selection',
            content: 'Choose your preferred font for the dashboard. This setting only affects the dashboard page and allows you to customize the reading experience.',
        },
        {
            title: 'Color Schemes',
            content: 'Select from various color themes to personalize your workspace. Changes apply immediately across the application.',
        },
        {
            title: 'Accessibility',
            content: 'Dark mode can reduce eye strain in low-light conditions. Choose the theme that works best for your environment.',
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Appearance settings" />

            <SettingsLayout>
                <div className="space-y-6">
                    <div className="flex items-center justify-between">
                        <HeadingSmall
                            title="Appearance settings"
                            description="Update your account's appearance settings"
                        />
                        <PageHelp title="Appearance Help" sections={helpSections} />
                    </div>
                    <AppearanceTabs />
                    <FontSelector />
                </div>
            </SettingsLayout>
        </AppLayout>
    );
}

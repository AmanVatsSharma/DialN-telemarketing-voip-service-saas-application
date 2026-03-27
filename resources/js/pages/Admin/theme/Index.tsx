import AppLayout from '@/layouts/app-layout';
import Heading from '@/components/heading';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Head, Link } from '@inertiajs/react';
import { 
    Settings, 
    Sparkles, 
    BarChart3, 
    Zap, 
    Gift, 
    Briefcase, 
    DollarSign, 
    HelpCircle, 
    MessageSquare 
} from 'lucide-react';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';

interface ThemeIndexProps {
    stats: {
        settings: number;
        hero: number;
        stats: number;
        features: number;
        benefits: number;
        use_cases: number;
        pricing: number;
        faqs: number;
        footer: number;
    };
}

export default function Index({ stats }: ThemeIndexProps) {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: dashboard().url },
        { title: 'Theme Management', href: '/admin/theme' },
    ];

    const sections = [
        {
            title: 'Settings',
            description: 'Site name, logo, colors, social links',
            icon: Settings,
            href: '/admin/theme/settings',
            count: stats.settings,
            color: 'bg-blue-500',
        },
        {
            title: 'Hero Section',
            description: 'Badge, headline, subtitle, CTAs',
            icon: Sparkles,
            href: '/admin/theme/hero',
            count: stats.hero,
            color: 'bg-purple-500',
        },
        {
            title: 'Stats',
            description: 'Homepage statistics display',
            icon: BarChart3,
            href: '/admin/theme/stats',
            count: stats.stats,
            color: 'bg-green-500',
        },
        {
            title: 'Features',
            description: 'Product features showcase',
            icon: Zap,
            href: '/admin/theme/features',
            count: stats.features,
            color: 'bg-yellow-500',
        },
        {
            title: 'Benefits',
            description: 'Why choose us section',
            icon: Gift,
            href: '/admin/theme/benefits',
            count: stats.benefits,
            color: 'bg-pink-500',
        },
        {
            title: 'Use Cases',
            description: 'Industry applications',
            icon: Briefcase,
            href: '/admin/theme/use-cases',
            count: stats.use_cases,
            color: 'bg-indigo-500',
        },
        {
            title: 'Pricing',
            description: 'Credit packages pricing',
            icon: DollarSign,
            href: '/admin/theme/pricing',
            count: stats.pricing,
            color: 'bg-emerald-500',
        },
        {
            title: 'FAQs',
            description: 'Frequently asked questions',
            icon: HelpCircle,
            href: '/admin/theme/faqs',
            count: stats.faqs,
            color: 'bg-orange-500',
        },
        {
            title: 'Footer',
            description: 'CTA section and trust indicators',
            icon: MessageSquare,
            href: '/admin/theme/footer',
            count: stats.footer,
            color: 'bg-red-500',
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Theme Management" />

            <div className="mx-auto max-w-7xl space-y-6">
                <Heading
                    title="Theme Management"
                    description="Manage your landing page content and appearance"
                />

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {sections.map((section) => {
                        const Icon = section.icon;
                        return (
                            <Card key={section.href} className="hover:shadow-lg transition-shadow">
                                <CardHeader>
                                    <div className="flex items-center justify-between">
                                        <div className={`w-12 h-12 rounded-lg ${section.color} flex items-center justify-center text-white`}>
                                            <Icon className="w-6 h-6" />
                                        </div>
                                        <span className="text-2xl font-bold text-muted-foreground">
                                            {section.count}
                                        </span>
                                    </div>
                                    <CardTitle className="mt-4">{section.title}</CardTitle>
                                    <CardDescription>{section.description}</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <Button asChild className="w-full">
                                        <Link href={section.href}>
                                            Manage
                                        </Link>
                                    </Button>
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>

                <Card className="border-dashed">
                    <CardHeader>
                        <CardTitle>Cache Information</CardTitle>
                        <CardDescription>
                            Theme data is cached for 24 hours to improve performance. 
                            Changes you make will automatically clear the cache and update the landing page.
                        </CardDescription>
                    </CardHeader>
                </Card>
            </div>
        </AppLayout>
    );
}

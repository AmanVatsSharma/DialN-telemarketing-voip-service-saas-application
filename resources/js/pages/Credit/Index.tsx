import Heading from '@/components/heading';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Head, Link } from '@inertiajs/react';
import { CreditCard, Wallet, TrendingUp } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import { PageHelp } from '@/components/page-help';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';

interface Props {
    creditBalance: number | string | null;
}

export default function CreditIndex({ creditBalance = 0 }: Props) {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: dashboard().url },
        { title: 'My Credits', href: '/credit' },
    ];
    
    // Convert creditBalance to a number safely
    const balance = typeof creditBalance === 'number' 
        ? creditBalance 
        : parseFloat(creditBalance as string) || 0;

    const helpSections = [
        {
            title: 'Credits Overview',
            content: 'Credits are used to pay for phone calls. Each call deducts credits based on its duration and destination. Monitor your balance to ensure uninterrupted service.',
        },
        {
            title: 'Topping Up',
            content: 'Click "Top Up Now" to add credits to your account. Choose from preset amounts or enter a custom amount. Payments are processed securely.',
        },
        {
            title: 'Credit Usage',
            content: 'Credits are deducted in real-time as calls are made. View your transaction history to track credit usage per campaign and call.',
        },
        {
            title: 'Low Balance Alert',
            content: 'Keep your balance topped up to avoid campaign interruptions. Consider setting up auto-recharge for continuous operations.',
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="My Credits" />

            <div className="mx-auto max-w-7xl space-y-6">
                <div className="flex items-center justify-between">
                    <Heading
                        title="My Credits"
                        description="View your credit balance and top up"
                    />
                    <PageHelp title="Credits Help" sections={helpSections} />
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center">
                                <Wallet className="mr-2 h-5 w-5" />
                                Current Balance
                            </CardTitle>
                            <CardDescription>Your available credits</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="text-4xl font-bold">${balance.toFixed(2)}</div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Top Up Credits</CardTitle>
                            <CardDescription>Add more credits to your account</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Button asChild className="w-full">
                                <Link href="/credit/top-up">
                                    <CreditCard className="mr-2 h-4 w-4" />
                                    Top Up Now
                                </Link>
                            </Button>
                        </CardContent>
                    </Card>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center">
                            <TrendingUp className="mr-2 h-5 w-5" />
                            Account Statement
                        </CardTitle>
                        <CardDescription>View your complete credit account history</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Button variant="outline" asChild>
                            <Link href="/credit/history">View History</Link>
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}

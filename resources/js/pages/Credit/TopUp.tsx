import AppLayout from '@/layouts/app-layout';
import Heading from '@/components/heading';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Head } from '@inertiajs/react';
import { CreditCard, Wallet, AlertCircle, Check } from 'lucide-react';
import { useState } from 'react';
import { PageHelp } from '@/components/page-help';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

interface PaymentGateway {
    id: string;
    name: string;
    icon: string;
    supported_currencies: string[];
}

interface Props {
    currentBalance: number;
    configError?: string;
    availableGateways: PaymentGateway[];
}

export default function TopUp({ currentBalance = 0, configError, availableGateways = [] }: Props) {
    const [amount, setAmount] = useState('10.00');
    const [selectedGateway, setSelectedGateway] = useState(availableGateways[0]?.id || 'stripe');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(configError || null);

    const predefinedAmounts = [10, 25, 50, 100, 250, 500];

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: dashboard().url },
        { title: 'Top Up Credits', href: '/credit/top-up' },
    ];

    const helpSections = [
        {
            title: 'Top Up Credits Overview',
            content: 'Add credits to your account to use services like making calls, sending SMS messages, and purchasing phone numbers. Your credits are stored securely and can be used at any time.',
        },
        {
            title: 'Current Balance',
            content: 'Your current balance is displayed at the top. This shows how many credits you currently have available. Top up when your balance runs low to avoid service interruptions.',
        },
        {
            title: 'Preset Amounts',
            content: 'Select from preset amounts ($10, $25, $50, $100, $250, $500) for quick top-ups. These common amounts make it easy to add credits without entering a custom value.',
        },
        {
            title: 'Custom Amount',
            content: 'Enter any custom amount starting from $1.00. The custom amount field allows you to top up the exact amount you need for your specific use case.',
        },
        {
            title: 'Payment Process',
            content: 'When you click "Proceed to Payment", you\'ll be redirected to a secure payment processor (Stripe). Complete the payment there, and credits will be added to your account immediately upon successful payment.',
        },
        {
            title: 'Payment Security',
            content: 'All payments are processed securely through Stripe. We never store your credit card information. You can view all your transactions in the Credit History page.',
        },
    ];

    const handleTopUp = async () => {
        setLoading(true);
        setError(null);
        
        try {
            const response = await fetch('/payment/checkout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
                },
                body: JSON.stringify({
                    amount: parseFloat(amount),
                    currency: 'USD',
                    gateway: selectedGateway,
                }),
            });

            const data = await response.json();

            if (data.success && data.checkout_url) {
                // Redirect to payment gateway checkout
                window.location.href = data.checkout_url;
            } else {
                setError(data.message || 'Failed to create checkout session. Please try again.');
                setLoading(false);
            }
        } catch {
            setError('An error occurred. Please try again later.');
            setLoading(false);
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Top Up Credits" />

            <div className="mx-auto max-w-7xl space-y-6">
                <div className="flex items-center justify-between">
                    <Heading
                        title="Top Up Credits"
                        description="Add credits to your account balance"
                    />
                    <PageHelp title="Top Up Credits Help" sections={helpSections} />
                </div>

                {error && (
                    <Alert variant="destructive">
                        <AlertCircle className="h-4 w-4" />
                        <AlertTitle>Payment Error</AlertTitle>
                        <AlertDescription>{error}</AlertDescription>
                    </Alert>
                )}

                <div className="max-w-3xl space-y-6">

                <Card>
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <div>
                                <CardTitle>Current Balance</CardTitle>
                                <CardDescription>Your available credits</CardDescription>
                            </div>
                            <Wallet className="h-8 w-8 text-muted-foreground" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold">
                            ${Number(currentBalance).toFixed(2)}
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Select Amount</CardTitle>
                        <CardDescription>Choose a preset amount or enter a custom value</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        {/* Payment Gateway Selection */}
                        {availableGateways.length > 1 && (
                            <div className="space-y-3">
                                <Label>Payment Method</Label>
                                <RadioGroup value={selectedGateway} onValueChange={setSelectedGateway}>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                        {availableGateways.map((gateway) => (
                                            <Label
                                                key={gateway.id}
                                                htmlFor={gateway.id}
                                                className={`flex items-center justify-between rounded-lg border-2 p-4 cursor-pointer transition-all ${
                                                    selectedGateway === gateway.id
                                                        ? 'border-primary bg-primary/5'
                                                        : 'border-muted hover:border-primary/50'
                                                }`}
                                            >
                                                <div className="flex items-center gap-3">
                                                    <RadioGroupItem value={gateway.id} id={gateway.id} />
                                                    <div>
                                                        <p className="font-medium">{gateway.name}</p>
                                                        <p className="text-xs text-muted-foreground">
                                                            Secure payment
                                                        </p>
                                                    </div>
                                                </div>
                                                {selectedGateway === gateway.id && (
                                                    <Check className="h-5 w-5 text-primary" />
                                                )}
                                            </Label>
                                        ))}
                                    </div>
                                </RadioGroup>
                            </div>
                        )}

                        <div className="grid grid-cols-3 gap-3">
                            {predefinedAmounts.map((presetAmount) => (
                                <Button
                                    key={presetAmount}
                                    variant={parseFloat(amount) === presetAmount ? 'default' : 'outline'}
                                    onClick={() => setAmount(presetAmount.toFixed(2))}
                                >
                                    ${presetAmount}
                                </Button>
                            ))}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="custom-amount">Custom Amount</Label>
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                                    $
                                </span>
                                <Input
                                    id="custom-amount"
                                    type="number"
                                    step="0.01"
                                    min="1"
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                    className="pl-7"
                                />
                            </div>
                        </div>

                        <div className="border-t pt-4">
                            <div className="flex items-center justify-between text-lg font-medium mb-4">
                                <span>Amount to add:</span>
                                <span className="text-2xl">${parseFloat(amount || '0').toFixed(2)}</span>
                            </div>

                            <Button 
                                size="lg" 
                                className="w-full"
                                onClick={handleTopUp}
                                disabled={loading || !amount || parseFloat(amount) < 1}
                            >
                                <CreditCard className="mr-2 h-5 w-5" />
                                Proceed to Payment
                            </Button>
                        </div>

                        <p className="text-sm text-muted-foreground text-center">
                            You will be redirected to our secure payment processor
                        </p>
                    </CardContent>
                </Card>
                </div>
            </div>
        </AppLayout>
    );
}

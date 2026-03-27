import AlertError from '@/components/alert-error';
import Heading from '@/components/heading';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { PageHelp } from '@/components/page-help';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { BreadcrumbItem } from '@/types';
import { Head, Link, router, useForm } from '@inertiajs/react';
import { Check, Loader2, Phone, Shield, Network, Settings, AlertCircle } from 'lucide-react';
import { FormEventHandler, useState, useEffect } from 'react';

interface SetupWizardProps {
    user: {
        id: number;
        name: string;
        email: string;
    };
    twilioConfigured: boolean;
    twilioAccountSid: string | null;
}

interface SetupResult {
    success: boolean;
    message: string;
    trunk?: {
        id: number;
        friendly_name: string;
        trunk_domain_name: string;
        phone_numbers_count: number;
    };
    test_results?: any;
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: dashboard().url },
    { title: 'Twilio Integration', href: '/settings/twilio' },
    { title: 'SIP Trunk Setup', href: '/sip-trunk/setup' },
];

const helpSections = [
    {
        title: 'What is SIP Trunk Setup?',
        content: 'This wizard connects your Twilio account to DialN using SIP Trunking technology. It automatically configures your trunk, imports phone numbers, sets up webhooks, and runs health tests - all in about 60 seconds.',
    },
    {
        title: 'What You Need',
        content: `• Twilio Account SID (starts with "AC"): Find it in your Twilio Console dashboard
• Auth Token: Located in your Twilio Console under Account Info
• Active Twilio account with phone numbers
• The setup is completely automatic - just provide credentials and we handle the rest`,
    },
    {
        title: 'Setup Process (7 Steps)',
        content: `1. Validate Credentials: We verify your Twilio Account SID and Auth Token
2. Create Trunk: Your SIP trunk is created in Twilio with optimal settings
3. Origination URLs: Configure inbound call routing to DialN
4. Import Numbers: All your Twilio phone numbers are automatically imported
5. Configure Numbers: Numbers are linked to your trunk for call routing
6. Set Webhooks: Voice URLs configured for seamless call handling
7. Health Tests: 5 comprehensive tests ensure everything works perfectly`,
    },
    {
        title: 'Benefits of BYOT (Bring Your Own Trunk)',
        content: `• Cost Savings: Save 35% on per-minute calling rates compared to standard Twilio pricing
• No Per-Number Fees: Eliminate monthly charges for each phone number
• Full Control: Keep complete ownership of your Twilio account and numbers
• Universal Usage: Use for softphone calls, campaigns, and AI agents
• Real-time Monitoring: Built-in health checks and call statistics`,
    },
    {
        title: 'Troubleshooting',
        content: `Common Issues:
• Invalid Credentials: Double-check your Account SID starts with "AC" and Auth Token is correct
• API Access: Ensure your Twilio account has API access enabled
• Number Compatibility: Voice-enabled numbers are required (SMS-only numbers won't work)
• Stuck Setup: If setup hangs over 2 minutes, click "Start Over" and try again
• Connection Failed: Check your internet connection and Twilio account status`,
    },
    {
        title: 'What Happens During Setup?',
        content: `Real-Time Progress: Watch as each step completes with live status updates
Automatic Configuration: All Twilio settings are optimized automatically
Error Handling: If any step fails, you'll see a clear error message and can retry
Success Confirmation: Upon completion, view your trunk dashboard with statistics
No Manual Work: Everything is handled automatically - no technical knowledge needed`,
    },
];

export default function SetupWizard({ user, twilioConfigured, twilioAccountSid }: SetupWizardProps) {
    const [step, setStep] = useState<'credentials' | 'setup' | 'success'>('credentials');
    const [setupProgress, setSetupProgress] = useState(0);
    const [setupStep, setSetupStep] = useState('');
    const [setupError, setSetupError] = useState<string | null>(null);
    const [setupResult, setSetupResult] = useState<SetupResult | null>(null);
    const [trunkId, setTrunkId] = useState<number | null>(null);

    const { data, setData, processing, errors } = useForm({
        friendly_name: `${user.name}'s SIP Trunk`,
    });

    // Poll setup status when in setup step
    useEffect(() => {
        if (step === 'setup' && trunkId) {
            const interval = setInterval(async () => {
                try {
                    const response = await window.axios.get(`/sip-trunk/${trunkId}/setup-status`);
                    
                    setSetupProgress(response.data.setup_progress || 0);
                    setSetupStep(response.data.setup_step || '');
                    
                    if (response.data.is_setup_complete) {
                        clearInterval(interval);
                        // Give a small delay to show 100% completion
                        setTimeout(() => {
                            setStep('success');
                        }, 1000);
                    }
                    
                    if (response.data.setup_error) {
                        clearInterval(interval);
                        setSetupError(response.data.setup_error);
                    }
                } catch (error) {
                    console.error('Failed to fetch setup status:', error);
                }
            }, 2000); // Poll every 2 seconds

            return () => clearInterval(interval);
        }
    }, [step, trunkId]);

    const submit: FormEventHandler = async (e) => {
        e.preventDefault();
        setSetupError(null);

        try {
            const response = await window.axios.post('/sip-trunk/setup', data);
            
            if (response.data.success) {
                setSetupResult(response.data);
                setTrunkId(response.data.trunk.id);
                setStep('setup');
            } else {
                setSetupError(response.data.message || 'Failed to setup SIP trunk');
            }
        } catch (error: any) {
            setSetupError(
                error.response?.data?.message ||
                'Failed to setup SIP trunk. Please check your credentials and try again.'
            );
        }
    };

    const handleStartOver = () => {
        setStep('credentials');
        setSetupProgress(0);
        setSetupStep('');
        setSetupError(null);
        setSetupResult(null);
        setTrunkId(null);
    };

    const handleViewDashboard = () => {
        router.visit('/sip-trunk');
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="SIP Trunk Setup" />

            <div className="mx-auto max-w-3xl space-y-6 p-4 md:p-8">
                <div className="flex items-center justify-between">
                    <Heading title="SIP Trunk Setup Wizard" />
                    <PageHelp 
                        title="SIP Trunk Setup Help" 
                        sections={helpSections}
                        documentationUrl="/docs/documentation.html#sip-trunk"
                    />
                </div>

                {/* Step Indicators */}
                <div className="flex items-center justify-center space-x-4">
                    <div className="flex flex-col items-center">
                        <div
                            className={`flex h-12 w-12 items-center justify-center rounded-full ${
                                step === 'credentials'
                                    ? 'bg-primary text-primary-foreground'
                                    : 'bg-muted text-muted-foreground'
                            }`}
                        >
                            <Shield className="h-6 w-6" />
                        </div>
                        <span className="mt-2 text-sm font-medium">Credentials</span>
                    </div>

                    <div className="h-px w-16 bg-muted" />

                    <div className="flex flex-col items-center">
                        <div
                            className={`flex h-12 w-12 items-center justify-center rounded-full ${
                                step === 'setup'
                                    ? 'bg-primary text-primary-foreground'
                                    : 'bg-muted text-muted-foreground'
                            }`}
                        >
                            <Network className="h-6 w-6" />
                        </div>
                        <span className="mt-2 text-sm font-medium">Setup</span>
                    </div>

                    <div className="h-px w-16 bg-muted" />

                    <div className="flex flex-col items-center">
                        <div
                            className={`flex h-12 w-12 items-center justify-center rounded-full ${
                                step === 'success'
                                    ? 'bg-primary text-primary-foreground'
                                    : 'bg-muted text-muted-foreground'
                            }`}
                        >
                            <Check className="h-6 w-6" />
                        </div>
                        <span className="mt-2 text-sm font-medium">Complete</span>
                    </div>
                </div>

                {/* Step 1: Credentials */}
                {step === 'credentials' && (
                    <Card>
                        <CardHeader>
                            <CardTitle>Connect Your Twilio SIP Trunk</CardTitle>
                            <CardDescription>
                                We'll automatically configure your SIP trunk, import your phone numbers, and test the connection.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            {!twilioConfigured ? (
                                <div className="relative overflow-hidden rounded-xl border bg-muted/50 p-8 shadow-sm">
                                    {/* Decorative background elements */}
                                    <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-muted/30 blur-3xl" />
                                    <div className="absolute -bottom-12 -left-12 h-40 w-40 rounded-full bg-muted/30 blur-3xl" />
                                    
                                    <div className="relative space-y-6">
                                        {/* Icon and Title */}
                                        <div className="flex items-start gap-4">
                                            <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl bg-primary shadow-lg">
                                                <Settings className="h-7 w-7 text-primary-foreground" />
                                            </div>
                                            <div className="flex-1 space-y-1">
                                                <h3 className="text-xl font-bold">
                                                    Twilio Configuration Required
                                                </h3>
                                                <p className="text-sm text-muted-foreground">
                                                    Connect your Twilio account to get started
                                                </p>
                                            </div>
                                        </div>

                                        {/* Message */}
                                        <div className="rounded-lg border bg-card p-4 shadow-sm">
                                            <p className="text-sm leading-relaxed text-muted-foreground">
                                                Before you can set up your SIP Trunk, you need to configure your Twilio account credentials. 
                                                This is a quick one-time setup that takes less than a minute.
                                            </p>
                                        </div>

                                        {/* Action Button */}
                                        <Link
                                            href="/settings/twilio"
                                            className="group inline-flex w-full items-center justify-center gap-3 rounded-xl bg-primary px-8 py-4 text-base font-semibold text-primary-foreground shadow-lg transition-all duration-200 hover:scale-[1.02] hover:bg-primary/90 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-ring active:scale-[0.98]"
                                        >
                                            <Settings className="h-5 w-5 transition-transform group-hover:rotate-90" />
                                            Configure Twilio Settings
                                        </Link>

                                        {/* Info chips */}
                                        <div className="flex flex-wrap gap-2">
                                            <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1.5 text-xs font-medium text-secondary-foreground shadow-sm">
                                                <Check className="h-3.5 w-3.5" />
                                                One-time setup
                                            </span>
                                            <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1.5 text-xs font-medium text-secondary-foreground shadow-sm">
                                                <Check className="h-3.5 w-3.5" />
                                                Takes less than 1 minute
                                            </span>
                                            <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1.5 text-xs font-medium text-secondary-foreground shadow-sm">
                                                <Check className="h-3.5 w-3.5" />
                                                Secure connection
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <form onSubmit={submit} className="space-y-6">
                                    {setupError && (
                                        <Alert variant="destructive">
                                            <AlertDescription>{setupError}</AlertDescription>
                                        </Alert>
                                    )}

                                    <Alert className="border-l-4 border-primary bg-muted/50">
                                        <Check className="h-4 w-4" />
                                        <AlertTitle>Ready to Configure SIP Trunk</AlertTitle>
                                        <AlertDescription className="text-sm text-muted-foreground leading-relaxed">
                                            Your Twilio account{' '}
                                            <code className="rounded bg-muted px-1.5 py-0.5 text-xs font-mono">
                                                {twilioAccountSid}
                                            </code>{' '}
                                            is connected. Complete the form below to set up your SIP Trunk.
                                        </AlertDescription>
                                    </Alert>

                                <div className="space-y-2">
                                    <Label htmlFor="friendly_name">Friendly Name (Optional)</Label>
                                    <Input
                                        id="friendly_name"
                                        type="text"
                                        value={data.friendly_name}
                                        onChange={(e) => setData('friendly_name', e.target.value)}
                                        placeholder="e.g., Production SIP Trunk"
                                        disabled={processing}
                                    />
                                    {errors.friendly_name && (
                                        <p className="text-sm text-destructive">{errors.friendly_name}</p>
                                    )}
                                </div>

                                <div className="rounded-lg bg-muted p-4">
                                    <h4 className="mb-2 font-semibold text-sm">What happens next?</h4>
                                    <ul className="space-y-1 text-sm text-muted-foreground">
                                        <li>• Validate your Twilio credentials</li>
                                        <li>• Create a SIP trunk in your account</li>
                                        <li>• Configure inbound call routing</li>
                                        <li>• Configure outbound authentication</li>
                                        <li>• Import all your phone numbers</li>
                                        <li>• Test the connection end-to-end</li>
                                    </ul>
                                </div>

                                <div className="flex gap-4">
                                    <Button type="submit" disabled={processing} className="w-full">
                                        {processing ? (
                                            <>
                                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                Starting Setup...
                                            </>
                                        ) : (
                                            'Start Automatic Setup'
                                        )}
                                    </Button>
                                </div>
                            </form>
                            )}
                        </CardContent>
                    </Card>
                )}

                {/* Step 2: Automatic Setup in Progress */}
                {step === 'setup' && (
                    <Card>
                        <CardHeader>
                            <CardTitle>Setting Up Your SIP Trunk</CardTitle>
                            <CardDescription>
                                Please wait while we configure your SIP trunk automatically. This should take about 60 seconds.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {setupError ? (
                                <Alert variant="destructive">
                                    <AlertDescription>
                                        <p className="mb-2 font-semibold">Setup Failed</p>
                                        <p>{setupError}</p>
                                    </AlertDescription>
                                </Alert>
                            ) : (
                                <>
                                    <div className="space-y-2">
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="font-medium">{setupStep || 'Initializing...'}</span>
                                            <span className="text-muted-foreground">{setupProgress}%</span>
                                        </div>
                                        <Progress value={setupProgress} className="h-2" />
                                    </div>

                                    <div className="flex items-center justify-center py-8">
                                        <Loader2 className="h-12 w-12 animate-spin text-primary" />
                                    </div>

                                    <div className="space-y-2 text-center text-sm text-muted-foreground">
                                        <p>Do not close or refresh this page.</p>
                                        <p>We're configuring everything automatically in the background.</p>
                                    </div>
                                </>
                            )}

                            {setupError && (
                                <div className="flex gap-4">
                                    <Button onClick={handleStartOver} variant="outline" className="w-full">
                                        Try Again
                                    </Button>
                                    <Button onClick={handleViewDashboard} variant="secondary" className="w-full">
                                        View Dashboard
                                    </Button>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                )}

                {/* Step 3: Success */}
                {step === 'success' && setupResult && (
                    <Card>
                        <CardHeader>
                            <div className="flex items-center gap-4">
                                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900">
                                    <Check className="h-8 w-8 text-green-600 dark:text-green-400" />
                                </div>
                                <div>
                                    <CardTitle>SIP Trunk Connected Successfully!</CardTitle>
                                    <CardDescription>Your trunk is ready to make and receive calls.</CardDescription>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="rounded-lg border bg-card p-4">
                                <h4 className="mb-4 font-semibold">Trunk Details</h4>
                                <dl className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                        <dt className="text-muted-foreground">Trunk Name:</dt>
                                        <dd className="font-medium">{setupResult.trunk?.friendly_name}</dd>
                                    </div>
                                    <div className="flex justify-between">
                                        <dt className="text-muted-foreground">Domain:</dt>
                                        <dd className="font-mono text-xs">{setupResult.trunk?.trunk_domain_name}</dd>
                                    </div>
                                    <div className="flex justify-between">
                                        <dt className="text-muted-foreground">Phone Numbers:</dt>
                                        <dd className="font-medium">{setupResult.trunk?.phone_numbers_count} imported</dd>
                                    </div>
                                </dl>
                            </div>

                            <Alert>
                                <Phone className="h-4 w-4" />
                                <AlertDescription>
                                    <p className="mb-2 font-semibold">What's Next?</p>
                                    <ul className="space-y-1 text-sm">
                                        <li>• Your phone numbers are now connected to the trunk</li>
                                        <li>• You can make calls at reduced rates ($0.0085/min)</li>
                                        <li>• Inbound calls will route to your softphone or campaigns</li>
                                        <li>• Monitor trunk health and statistics in the dashboard</li>
                                    </ul>
                                </AlertDescription>
                            </Alert>

                            <div className="flex gap-4">
                                <Button onClick={handleViewDashboard} className="w-full">
                                    View Trunk Dashboard
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                )}
            </div>
        </AppLayout>
    );
}

import { useState, useEffect } from 'react';
import AppLayout from '@/layouts/app-layout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Head, Link, usePage } from '@inertiajs/react';
import {
    Phone, Users, Megaphone, PhoneCall, UserCheck, PhoneIncoming,
    Clock, Calendar, BarChart3, AlertTriangle, ShieldCheck, X,
    TrendingUp, CheckCircle2, Activity, DollarSign, ArrowRight,
    Plus, Upload
} from 'lucide-react';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
    ResponsiveContainer, BarChart, Bar, Cell, PieChart, Pie, Legend
} from 'recharts';

interface CustomerStats {
    total_agents: number;
    total_campaigns: number;
    active_campaigns: number;
    total_contacts: number;
    active_contacts: number;
    total_calls: number;
    calls_today: number;
    calls_this_week: number;
    calls_this_month: number;
    my_phone_numbers: number;
    my_pending_requests: number;
}

interface Campaign {
    id: number;
    name: string;
    status: string;
    total_contacts: number;
    contacted: number;
    created_at: string;
    owner?: string;
}

interface Call {
    id: number;
    to_number: string;
    status: string;
    duration_seconds: number | null;
    created_at: string;
    owner?: string;
}

interface ChartData {
    date: string;
    label: string;
    total: number;
    completed: number;
    failed: number;
}

interface CampaignsChart {
    draft: number;
    active: number;
    paused: number;
    completed: number;
}

interface AdminStats {
    total_users: number;
    total_customers: number;
    total_agents: number;
    total_campaigns: number;
    active_campaigns: number;
    total_contacts: number;
    total_calls: number;
    total_phone_numbers: number;
    purchased_phone_numbers: number;
    available_phone_numbers: number;
    assigned_phone_numbers: number;
    pending_requests: number;
    total_phone_cost: string;
    credits_sold: string;
    credits_used: string;
}

interface AgentStats {
    available_campaigns: number;
    available_contacts: number;
    calls_today: number;
    calls_this_week: number;
    total_calls: number;
}

interface Props {
    stats: CustomerStats | AdminStats | AgentStats;
    recentCampaigns: Campaign[];
    recentCalls: Call[];
    callsChart: ChartData[];
    campaignsChart: CampaignsChart;
}

// ─── Shared helpers ──────────────────────────────────────────────────────────

function formatDuration(seconds: number | null) {
    if (!seconds) return '0s';
    if (seconds < 60) return `${seconds}s`;
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}m ${secs}s`;
}

function getGreeting() {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
}

const statusConfig: Record<string, { label: string; variant: 'default' | 'secondary' | 'destructive' | 'outline' }> = {
    active: { label: 'Active', variant: 'default' },
    paused: { label: 'Paused', variant: 'secondary' },
    completed: { label: 'Completed', variant: 'outline' },
    draft: { label: 'Draft', variant: 'secondary' },
};

const callStatusConfig: Record<string, 'default' | 'secondary' | 'destructive'> = {
    completed: 'default',
    failed: 'destructive',
    busy: 'destructive',
    'no-answer': 'destructive',
    'in-progress': 'secondary',
};

// ─── Stat card — Apple/Shopify style: typography carries hierarchy, no rainbow ─

interface StatCardProps {
    title: string;
    value: string | number;
    subtitle: string;
    icon: React.ReactNode;
    delay?: number;
    href?: string;
}

function StatCard({ title, value, subtitle, icon, delay = 0, href }: StatCardProps) {
    const inner = (
        <CardContent className="pt-5 pb-5 px-5">
            <div className="flex items-start justify-between">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">{title}</p>
                <span className="text-muted-foreground/40">{icon}</span>
            </div>
            <p className="mt-3 text-[2rem] font-semibold tracking-tight leading-none">{value}</p>
            <p className="mt-2 text-xs text-muted-foreground">{subtitle}</p>
        </CardContent>
    );

    return (
        <Card
            className="animate-fade-in rounded-xl border border-border/60 shadow-none hover:shadow-sm hover:border-border transition-all duration-200"
            style={{ animationDelay: `${delay}ms` }}
        >
            {href ? <Link href={href} className="block">{inner}</Link> : inner}
        </Card>
    );
}

// ─── Section label ────────────────────────────────────────────────────────────

function SectionLabel({ children }: { children: React.ReactNode }) {
    return (
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">
            {children}
        </p>
    );
}

// ─── Calls area chart ─────────────────────────────────────────────────────────

function CallsTrendChart({ data }: { data: ChartData[] }) {
    if (!data?.length) return null;
    return (
        <ResponsiveContainer width="100%" height={180}>
            <AreaChart data={data} margin={{ top: 4, right: 4, left: -32, bottom: 0 }}>
                <defs>
                    <linearGradient id="colorCompleted" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="var(--color-primary)" stopOpacity={0.2} />
                        <stop offset="95%" stopColor="var(--color-primary)" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorFailed" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="var(--color-destructive)" stopOpacity={0.15} />
                        <stop offset="95%" stopColor="var(--color-destructive)" stopOpacity={0} />
                    </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
                <XAxis dataKey="label" tick={{ fontSize: 11, fill: 'var(--color-muted-foreground)' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: 'var(--color-muted-foreground)' }} axisLine={false} tickLine={false} allowDecimals={false} />
                <Tooltip
                    contentStyle={{
                        background: 'var(--color-popover)',
                        border: '1px solid var(--color-border)',
                        borderRadius: '8px',
                        fontSize: '12px',
                        color: 'var(--color-popover-foreground)',
                    }}
                    cursor={{ stroke: 'var(--color-border)', strokeWidth: 1 }}
                />
                <Area type="monotone" dataKey="completed" name="Completed" stroke="var(--color-primary)" strokeWidth={2} fill="url(#colorCompleted)" dot={false} />
                <Area type="monotone" dataKey="failed" name="Failed" stroke="var(--color-destructive)" strokeWidth={2} fill="url(#colorFailed)" dot={false} />
            </AreaChart>
        </ResponsiveContainer>
    );
}

// ─── Campaign status list ─────────────────────────────────────────────────────

function CampaignStatusList({ data }: { data: CampaignsChart }) {
    const items = [
        { label: 'Active', count: data.active, color: 'var(--stat-green-fg)' },
        { label: 'Draft', count: data.draft, color: 'var(--color-muted-foreground)' },
        { label: 'Paused', count: data.paused, color: 'var(--stat-amber-fg)' },
        { label: 'Completed', count: data.completed, color: 'var(--stat-blue-fg)' },
    ];
    const total = items.reduce((s, i) => s + i.count, 0);

    return (
        <div className="space-y-3">
            {items.map((item) => (
                <div key={item.label} className="flex items-center gap-3">
                    <div className="h-2.5 w-2.5 rounded-full shrink-0" style={{ background: item.color }} />
                    <div className="flex flex-1 items-center justify-between min-w-0">
                        <span className="text-sm text-foreground">{item.label}</span>
                        <div className="flex items-center gap-3 ml-4">
                            <div className="hidden sm:block w-24 h-1.5 rounded-full bg-muted overflow-hidden">
                                <div
                                    className="h-full rounded-full transition-all duration-500"
                                    style={{ width: `${total > 0 ? (item.count / total) * 100 : 0}%`, background: item.color }}
                                />
                            </div>
                            <span className="text-sm font-semibold w-6 text-right tabular-nums">{item.count}</span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

// ─── Recent list ──────────────────────────────────────────────────────────────

function RecentCampaignsList({ campaigns }: { campaigns: Campaign[] }) {
    if (!campaigns?.length) {
        return (
            <div className="flex flex-col items-center justify-center py-10">
                <Megaphone className="h-8 w-8 text-muted-foreground/30 mb-2" />
                <p className="text-sm text-muted-foreground">No campaigns yet</p>
            </div>
        );
    }
    return (
        <div className="space-y-1">
            {campaigns.slice(0, 5).map((c) => (
                <div key={c.id} className="flex items-center justify-between rounded-lg px-3 py-2.5 hover:bg-muted/50 transition-colors group">
                    <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                            <Link
                                href={`/campaigns/${c.id}`}
                                className="text-sm font-medium truncate hover:text-primary transition-colors"
                            >
                                {c.name}
                            </Link>
                            <Badge variant={statusConfig[c.status]?.variant || 'outline'} className="shrink-0 text-xs">
                                {statusConfig[c.status]?.label || c.status}
                            </Badge>
                        </div>
                        <p className="mt-0.5 text-xs text-muted-foreground">
                            {c.contacted} / {c.total_contacts} contacted
                            {c.owner && ` · ${c.owner}`}
                        </p>
                    </div>
                    <ArrowRight className="h-4 w-4 text-muted-foreground/40 opacity-0 group-hover:opacity-100 transition-opacity ml-2 shrink-0" />
                </div>
            ))}
        </div>
    );
}

function RecentCallsList({ calls }: { calls: Call[] }) {
    if (!calls?.length) {
        return (
            <div className="flex flex-col items-center justify-center py-10">
                <PhoneCall className="h-8 w-8 text-muted-foreground/30 mb-2" />
                <p className="text-sm text-muted-foreground">No calls yet</p>
            </div>
        );
    }
    return (
        <div className="space-y-1">
            {calls.slice(0, 5).map((call) => (
                <div key={call.id} className="flex items-center justify-between rounded-lg px-3 py-2.5 hover:bg-muted/50 transition-colors">
                    <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium">{call.to_number}</p>
                        <p className="mt-0.5 text-xs text-muted-foreground">
                            {formatDuration(call.duration_seconds)} · {new Date(call.created_at).toLocaleDateString()}
                            {call.owner && ` · ${call.owner}`}
                        </p>
                    </div>
                    <Badge variant={callStatusConfig[call.status] || 'secondary'} className="text-xs shrink-0 ml-2">
                        {call.status}
                    </Badge>
                </div>
            ))}
        </div>
    );
}

// ─── KYC Banner ───────────────────────────────────────────────────────────────

function KycWarningBanner() {
    const [isDismissed, setIsDismissed] = useState(false);
    const { kycEnabled, auth } = usePage().props as any;
    const kycData = auth?.kyc;

    useEffect(() => {
        const dismissed = sessionStorage.getItem('kyc-banner-dismissed');
        if (dismissed === 'true') setIsDismissed(true);
    }, []);

    if (!kycEnabled || !kycData || !kycData.is_unverified || isDismissed) return null;

    const isExpired = kycData.is_grace_period_expired;
    const daysRemaining = Math.ceil(kycData.days_remaining);

    const handleDismiss = () => {
        sessionStorage.setItem('kyc-banner-dismissed', 'true');
        setIsDismissed(true);
    };

    return (
        <Alert
            variant={isExpired ? 'destructive' : 'default'}
            className={`relative ${!isExpired ? 'border-amber-200 bg-amber-50 text-amber-900 dark:border-amber-900/50 dark:bg-amber-900/20 dark:text-amber-400' : ''}`}
        >
            {!isExpired && (
                <button
                    onClick={handleDismiss}
                    className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                    aria-label="Close"
                >
                    <X className="h-4 w-4" />
                </button>
            )}
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle className="font-semibold pr-8">
                {isExpired ? 'Account Suspended — Verification Required' : 'Verify Your Account'}
            </AlertTitle>
            <AlertDescription className="mt-2">
                {isExpired ? (
                    <>
                        <p className="mb-3">Your grace period has expired. Complete KYC verification to restore access.</p>
                        <Button asChild size="sm" variant="destructive">
                            <Link href="/settings/kyc">
                                <ShieldCheck className="mr-2 h-4 w-4" />
                                Verify Now
                            </Link>
                        </Button>
                    </>
                ) : (
                    <>
                        <p className="mb-3">
                            <span className="font-bold">{daysRemaining} {daysRemaining === 1 ? 'day' : 'days'} remaining</span> in your grace period.
                            Complete KYC to unlock phone numbers, campaigns, and calling features.
                        </p>
                        <Button asChild size="sm" className="bg-amber-600 hover:bg-amber-700 dark:bg-amber-700 dark:hover:bg-amber-800">
                            <Link href="/settings/kyc">
                                <ShieldCheck className="mr-2 h-4 w-4" />
                                Verify Account ({daysRemaining} {daysRemaining === 1 ? 'day' : 'days'} left)
                            </Link>
                        </Button>
                    </>
                )}
            </AlertDescription>
        </Alert>
    );
}

// ─── Main component ────────────────────────────────────────────────────────────

export default function Index({
    stats,
    recentCampaigns = [],
    recentCalls = [],
    callsChart = [],
    campaignsChart = { draft: 0, active: 0, paused: 0, completed: 0 },
}: Props) {
    const { auth } = usePage().props as any;
    const user = auth?.user;
    const { isAdmin, isCustomer, isAgent } = useAuth();

    const breadcrumbs: BreadcrumbItem[] = [{ title: 'Dashboard', href: dashboard().url }];

    // ── Admin view ─────────────────────────────────────────────────────────────
    if (isAdmin()) {
        const s = stats as AdminStats;
        return (
            <AppLayout breadcrumbs={breadcrumbs}>
                <Head title="Dashboard" />
                <div className="flex h-full flex-1 flex-col gap-8 p-4 md:p-8">
                    {/* Header */}
                    <div className="flex items-start justify-between animate-fade-in">
                        <div>
                            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-1">Dashboard</p>
                            <h1 className="text-2xl font-semibold tracking-tight">
                                {getGreeting()}, {user?.name || 'Admin'}
                            </h1>
                            <p className="mt-1 text-sm text-muted-foreground">Here's your system overview</p>
                        </div>
                    </div>

                    <KycWarningBanner />

                    {/* System Overview */}
                    <div>
                        <SectionLabel>System Overview</SectionLabel>
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                            <StatCard title="Total Users" value={s.total_users} subtitle={`${s.total_customers} customers · ${s.total_agents} agents`} icon={<Users className="h-5 w-5" />} delay={0} />
                            <StatCard title="Campaigns" value={s.total_campaigns} subtitle={`${s.active_campaigns} active`} icon={<Megaphone className="h-5 w-5" />} delay={60} />
                            <StatCard title="Contacts" value={s.total_contacts?.toLocaleString()} subtitle="Total in system" icon={<UserCheck className="h-5 w-5" />} delay={120} />
                            <StatCard title="Total Calls" value={s.total_calls?.toLocaleString()} subtitle="All-time calls" icon={<PhoneCall className="h-5 w-5" />} delay={180} />
                        </div>
                    </div>

                    {/* Phone Numbers */}
                    <div>
                        <SectionLabel>Phone Number Inventory</SectionLabel>
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
                            <StatCard title="Total Numbers" value={s.total_phone_numbers} subtitle="In system" icon={<Phone className="h-5 w-5" />} delay={0} />
                            <StatCard title="Purchased" value={s.purchased_phone_numbers} subtitle="From Twilio" icon={<Phone className="h-5 w-5" />} delay={40} />
                            <StatCard title="Available" value={s.available_phone_numbers} subtitle="Ready to assign" icon={<CheckCircle2 className="h-5 w-5" />} delay={80} />
                            <StatCard title="Assigned" value={s.assigned_phone_numbers} subtitle="In use" icon={<PhoneIncoming className="h-5 w-5" />} delay={120} />
                            <StatCard title="Pending Requests" value={s.pending_requests} subtitle="Awaiting assignment" icon={<Clock className="h-5 w-5" />} delay={160} />
                        </div>
                    </div>

                    {/* Financial */}
                    <div>
                        <SectionLabel>Financial Overview</SectionLabel>
                        <div className="grid gap-4 md:grid-cols-3">
                            <StatCard title="Monthly Phone Cost" value={`$${s.total_phone_cost}`} subtitle="Twilio line rental" icon={<Phone className="h-5 w-5" />} delay={0} />
                            <StatCard title="Credits Sold" value={`$${s.credits_sold}`} subtitle="Total credits purchased" icon={<DollarSign className="h-5 w-5" />} delay={60} />
                            <StatCard title="Credits Used" value={`$${s.credits_used}`} subtitle="Total credits consumed" icon={<Activity className="h-5 w-5" />} delay={120} />
                        </div>
                    </div>

                    {/* Charts */}
                    <div className="grid gap-6 md:grid-cols-2 animate-fade-in" style={{ animationDelay: '200ms' }}>
                        <Card>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-base font-semibold">Call Trends</CardTitle>
                                <CardDescription>Last 7 days · completed vs failed</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <CallsTrendChart data={callsChart} />
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-base font-semibold">Campaign Status</CardTitle>
                                <CardDescription>Distribution by state</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <CampaignStatusList data={campaignsChart} />
                            </CardContent>
                        </Card>
                    </div>

                    {/* Recent activity */}
                    <div className="grid gap-6 md:grid-cols-2 animate-fade-in" style={{ animationDelay: '260ms' }}>
                        <Card>
                            <CardHeader className="pb-3">
                                <CardTitle className="text-base font-semibold">Recent Campaigns</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <RecentCampaignsList campaigns={recentCampaigns} />
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="pb-3">
                                <CardTitle className="text-base font-semibold">Recent Calls</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <RecentCallsList calls={recentCalls} />
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </AppLayout>
        );
    }

    // ── Agent view ─────────────────────────────────────────────────────────────
    if (isAgent()) {
        const s = stats as AgentStats;
        return (
            <AppLayout breadcrumbs={breadcrumbs}>
                <Head title="Dashboard" />
                <div className="flex h-full flex-1 flex-col gap-8 p-4 md:p-8">
                    {/* Header */}
                    <div className="flex items-start justify-between animate-fade-in">
                        <div>
                            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-1">Dashboard</p>
                            <h1 className="text-2xl font-semibold tracking-tight">
                                {getGreeting()}, {user?.name || 'Agent'}
                            </h1>
                            <p className="mt-1 text-sm text-muted-foreground">Let's make some great calls today</p>
                        </div>
                    </div>

                    <KycWarningBanner />

                    {/* Performance */}
                    <div>
                        <SectionLabel>Your Performance</SectionLabel>
                        <div className="grid gap-4 md:grid-cols-3">
                            <StatCard title="Today's Calls" value={s.calls_today} subtitle="Calls made today" icon={<PhoneCall className="h-5 w-5" />} delay={0} />
                            <StatCard title="This Week" value={s.calls_this_week} subtitle="Calls this week" icon={<Calendar className="h-5 w-5" />} delay={60} />
                            <StatCard title="All-time Calls" value={s.total_calls} subtitle="Total calls made" icon={<TrendingUp className="h-5 w-5" />} delay={120} />
                        </div>
                    </div>

                    {/* Available work */}
                    <div>
                        <SectionLabel>Available Work</SectionLabel>
                        <div className="grid gap-4 md:grid-cols-2">
                            <StatCard title="Available Campaigns" value={s.available_campaigns} subtitle="Campaigns you can work on" icon={<Megaphone className="h-5 w-5" />} delay={0} href="/campaigns" />
                            <StatCard title="Available Contacts" value={s.available_contacts?.toLocaleString()} subtitle="Contacts ready to call" icon={<UserCheck className="h-5 w-5" />} delay={60} />
                        </div>
                    </div>

                    {/* Quick actions */}
                    <div>
                        <SectionLabel>Quick Actions</SectionLabel>
                        <div className="grid gap-3 md:grid-cols-3">
                            {[
                                { href: '/campaigns', icon: <Megaphone className="h-5 w-5" />, label: 'View Campaigns', sub: 'Browse available campaigns' },
                                { href: '/calls', icon: <PhoneCall className="h-5 w-5" />, label: 'Make Calls', sub: 'Start calling contacts' },
                                { href: '/calls/history', icon: <Clock className="h-5 w-5" />, label: 'Call History', sub: 'View your call logs' },
                            ].map((action) => (
                                <Card key={action.href} className="hover:shadow-sm transition-all duration-200 cursor-pointer border-border/60">
                                    <CardContent className="pt-5 pb-4">
                                        <Link href={action.href} className="flex items-center gap-3">
                                            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted text-muted-foreground">
                                                {action.icon}
                                            </div>
                                            <div>
                                                <p className="font-medium text-sm">{action.label}</p>
                                                <p className="text-xs text-muted-foreground">{action.sub}</p>
                                            </div>
                                        </Link>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>

                    {/* Recent activity */}
                    <div className="grid gap-6 md:grid-cols-2 animate-fade-in" style={{ animationDelay: '200ms' }}>
                        <Card>
                            <CardHeader className="pb-3">
                                <CardTitle className="text-base font-semibold">Available Campaigns</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <RecentCampaignsList campaigns={recentCampaigns} />
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="pb-3">
                                <CardTitle className="text-base font-semibold">Your Recent Calls</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <RecentCallsList calls={recentCalls} />
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </AppLayout>
        );
    }

    // ── Customer view (default) ────────────────────────────────────────────────
    const s = stats as CustomerStats;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-8 p-4 md:p-8">
                {/* Header */}
                <div className="flex items-start justify-between animate-fade-in">
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-1">Dashboard</p>
                        <h1 className="text-2xl font-semibold tracking-tight">
                            {getGreeting()}, {user?.name || 'there'}
                        </h1>
                        <p className="mt-1 text-sm text-muted-foreground">Ready to launch your next campaign?</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button variant="outline" asChild size="sm">
                            <Link href="/contacts/import">
                                <Upload className="mr-2 h-4 w-4" />
                                Import Contacts
                            </Link>
                        </Button>
                        <Button asChild size="sm">
                            <Link href="/campaigns/create">
                                <Plus className="mr-2 h-4 w-4" />
                                New Campaign
                            </Link>
                        </Button>
                    </div>
                </div>

                <KycWarningBanner />

                {/* Key stats */}
                <div>
                    <SectionLabel>Overview</SectionLabel>
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                        <StatCard title="Campaigns" value={s.total_campaigns} subtitle={`${s.active_campaigns} active`} icon={<Megaphone className="h-5 w-5" />} delay={0} href="/campaigns" />
                        <StatCard title="Contacts" value={s.total_contacts?.toLocaleString()} subtitle={`${s.active_contacts} active`} icon={<Users className="h-5 w-5" />} delay={60} href="/contacts" />
                        <StatCard title="Total Calls" value={s.total_calls?.toLocaleString()} subtitle={`${s.calls_today} today`} icon={<Phone className="h-5 w-5" />} delay={120} href="/calls/history" />
                        <StatCard title="Team Size" value={s.total_agents} subtitle="Active agents" icon={<UserCheck className="h-5 w-5" />} delay={180} href="/agents" />
                    </div>
                </div>

                {/* Call activity */}
                <div>
                    <SectionLabel>Call Activity</SectionLabel>
                    <div className="grid gap-4 md:grid-cols-3">
                        <StatCard title="Today" value={s.calls_today} subtitle="Calls made" icon={<PhoneCall className="h-5 w-5" />} delay={0} />
                        <StatCard title="This Week" value={s.calls_this_week} subtitle="Calls made" icon={<Calendar className="h-5 w-5" />} delay={60} />
                        <StatCard title="This Month" value={s.calls_this_month} subtitle="Calls made" icon={<BarChart3 className="h-5 w-5" />} delay={120} />
                    </div>
                </div>

                {/* Charts */}
                <div className="grid gap-6 md:grid-cols-2 animate-fade-in" style={{ animationDelay: '160ms' }}>
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-base font-semibold">Call Trends</CardTitle>
                            <CardDescription>Last 7 days · completed vs failed</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <CallsTrendChart data={callsChart} />
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-base font-semibold">Campaign Status</CardTitle>
                            <CardDescription>Distribution by state</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <CampaignStatusList data={campaignsChart} />
                        </CardContent>
                    </Card>
                </div>

                {/* Phone numbers */}
                <div>
                    <SectionLabel>Phone Numbers</SectionLabel>
                    <div className="grid gap-4 md:grid-cols-2">
                        <StatCard
                            title="My Numbers"
                            value={s.my_phone_numbers}
                            subtitle="View all numbers →"
                            icon={<PhoneIncoming className="h-5 w-5" />}
                            href="/numbers/my-numbers"
                        />
                        <StatCard
                            title="Pending Requests"
                            value={s.my_pending_requests}
                            subtitle="Browse available →"
                            icon={<Clock className="h-5 w-5" />}
                            href="/numbers/available"
                        />
                    </div>
                </div>

                {/* Recent activity */}
                <div className="grid gap-6 md:grid-cols-2 animate-fade-in" style={{ animationDelay: '220ms' }}>
                    <Card>
                        <CardHeader className="pb-3">
                            <div className="flex items-center justify-between">
                                <CardTitle className="text-base font-semibold">Recent Campaigns</CardTitle>
                                <Link href="/campaigns" className="text-xs text-muted-foreground hover:text-primary transition-colors flex items-center gap-1">
                                    View all <ArrowRight className="h-3 w-3" />
                                </Link>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <RecentCampaignsList campaigns={recentCampaigns} />
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="pb-3">
                            <div className="flex items-center justify-between">
                                <CardTitle className="text-base font-semibold">Recent Calls</CardTitle>
                                <Link href="/calls/history" className="text-xs text-muted-foreground hover:text-primary transition-colors flex items-center gap-1">
                                    View all <ArrowRight className="h-3 w-3" />
                                </Link>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <RecentCallsList calls={recentCalls} />
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}

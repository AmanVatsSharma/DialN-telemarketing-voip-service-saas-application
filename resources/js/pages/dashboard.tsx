import { useEffect, useRef, useState } from 'react';
import AppLayout from '@/layouts/app-layout';
import { Head, Link, usePage } from '@inertiajs/react';
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from 'recharts';
import {
    Phone,
    PhoneCall,
    Megaphone,
    Users,
    CheckCircle2,
    XCircle,
    TrendingUp,
    ArrowRight,
    Plus,
    Upload,
    BarChart3,
    UserCheck,
    Clock,
} from 'lucide-react';
import { dashboard } from '@/routes';
import { type BreadcrumbItem, type Auth } from '@/types';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

// ─── Types ────────────────────────────────────────────────────────────────────

interface StatsShape {
    total_calls?: number;
    active_campaigns?: number;
    total_campaigns?: number;
    calls_today?: number;
    calls_this_week?: number;
    calls_this_month?: number;
    total_contacts?: number;
    active_contacts?: number;
    total_agents?: number;
    total_users?: number;
    total_customers?: number;
    my_phone_numbers?: number;
    my_pending_requests?: number;
    // admin fields
    total_phone_numbers?: number;
    purchased_phone_numbers?: number;
    available_phone_numbers?: number;
    assigned_phone_numbers?: number;
    pending_requests?: number;
    total_phone_cost?: string;
    [key: string]: unknown;
}

interface Campaign {
    id: number;
    name: string;
    status: string;
    total_contacts: number;
    contacted: number;
    created_at: string;
    owner?: string | null;
}

interface CallRecord {
    id: number;
    to_number: string;
    status: string;
    duration_seconds: number | null;
    created_at: string;
    owner?: string | null;
}

interface ChartPoint {
    date: string;
    label: string;
    total: number;
    completed: number;
    failed: number;
}

interface DashboardProps {
    stats?: StatsShape;
    recentCampaigns?: Campaign[];
    recentCalls?: CallRecord[];
    callsChart?: ChartPoint[];
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getGreeting(): string {
    const h = new Date().getHours();
    if (h < 12) return 'Good morning';
    if (h < 18) return 'Good afternoon';
    return 'Good evening';
}

function formatDuration(seconds: number | null): string {
    if (!seconds || seconds <= 0) return '—';
    if (seconds < 60) return `${seconds}s`;
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return s > 0 ? `${m}m ${s}s` : `${m}m`;
}

function easeOutCubic(t: number): number {
    return 1 - Math.pow(1 - t, 3);
}

// ─── Count-up hook ────────────────────────────────────────────────────────────

function useCountUp(target: number, duration = 1200): number {
    const [value, setValue] = useState(0);
    const rafRef = useRef<number | null>(null);

    useEffect(() => {
        if (target === 0) {
            setValue(0);
            return;
        }
        const start = performance.now();
        const animate = (now: number) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            setValue(Math.round(easeOutCubic(progress) * target));
            if (progress < 1) {
                rafRef.current = requestAnimationFrame(animate);
            }
        };
        rafRef.current = requestAnimationFrame(animate);
        return () => {
            if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
        };
    }, [target, duration]);

    return value;
}

// ─── KPI Stat Card ────────────────────────────────────────────────────────────

interface StatCardProps {
    title: string;
    rawValue: number;
    subtitle: string;
    icon: React.ReactNode;
    delay?: number;
    href?: string;
    accentColor?: string;
}

function StatCard({
    title,
    rawValue,
    subtitle,
    icon,
    delay = 0,
    href,
    accentColor = 'bg-primary',
}: StatCardProps) {
    const displayValue = useCountUp(rawValue);

    const inner = (
        <div className="pt-5 pb-5 px-5">
            <div className="flex items-start justify-between gap-2">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground leading-none">
                    {title}
                </p>
                <span className="text-muted-foreground/40 shrink-0">{icon}</span>
            </div>
            <p className="mt-3 text-[2rem] font-semibold tracking-tight leading-none tabular-nums">
                {displayValue.toLocaleString()}
            </p>
            <p className="mt-2 text-xs text-muted-foreground">{subtitle}</p>
        </div>
    );

    return (
        <div
            className="animate-fade-in relative bg-card border border-border/60 rounded-xl shadow-none hover:shadow-sm hover:border-border transition-all duration-200 overflow-hidden"
            style={{ animationDelay: `${delay}ms`, animationFillMode: 'both' }}
        >
            <div className={`absolute left-0 top-0 bottom-0 w-[3px] rounded-l-xl ${accentColor}`} />
            {href ? (
                <Link href={href} className="block">
                    {inner}
                </Link>
            ) : (
                inner
            )}
        </div>
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

// ─── Call Volume Area Chart ────────────────────────────────────────────────────

function CallVolumeChart({ data }: { data: ChartPoint[] }) {
    if (!data || data.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center h-64 gap-2">
                <BarChart3 className="h-10 w-10 text-muted-foreground/20" />
                <p className="text-sm text-muted-foreground">No call data for the last 7 days</p>
            </div>
        );
    }

    return (
        <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data} margin={{ top: 4, right: 4, left: -28, bottom: 0 }}>
                    <defs>
                        <linearGradient id="gradTotal" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#2563eb" stopOpacity={0.18} />
                            <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="gradCompleted" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#16a34a" stopOpacity={0.15} />
                            <stop offset="95%" stopColor="#16a34a" stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="gradFailed" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#dc2626" stopOpacity={0.13} />
                            <stop offset="95%" stopColor="#dc2626" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <CartesianGrid
                        strokeDasharray="3 3"
                        stroke="var(--color-border, #e5e7eb)"
                        vertical={false}
                    />
                    <XAxis
                        dataKey="label"
                        tick={{ fontSize: 11, fill: 'var(--color-muted-foreground, #6b7280)' }}
                        axisLine={false}
                        tickLine={false}
                    />
                    <YAxis
                        tick={{ fontSize: 11, fill: 'var(--color-muted-foreground, #6b7280)' }}
                        axisLine={false}
                        tickLine={false}
                        allowDecimals={false}
                    />
                    <Tooltip
                        contentStyle={{
                            background: 'var(--color-popover, #fff)',
                            border: '1px solid var(--color-border, #e5e7eb)',
                            borderRadius: '8px',
                            fontSize: '12px',
                            color: 'var(--color-popover-foreground, #111)',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                        }}
                        cursor={{ stroke: 'var(--color-border, #e5e7eb)', strokeWidth: 1 }}
                    />
                    <Area
                        type="monotone"
                        dataKey="total"
                        name="Total"
                        stroke="#2563eb"
                        strokeWidth={2}
                        fill="url(#gradTotal)"
                        dot={false}
                    />
                    <Area
                        type="monotone"
                        dataKey="completed"
                        name="Completed"
                        stroke="#16a34a"
                        strokeWidth={2}
                        fill="url(#gradCompleted)"
                        dot={false}
                    />
                    <Area
                        type="monotone"
                        dataKey="failed"
                        name="Failed"
                        stroke="#dc2626"
                        strokeWidth={1.5}
                        fill="url(#gradFailed)"
                        dot={false}
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
}

// ─── Campaign status badge mapping ────────────────────────────────────────────

const campaignBadgeVariant: Record<string, 'default' | 'secondary' | 'destructive' | 'outline'> = {
    active: 'default',
    paused: 'secondary',
    completed: 'outline',
    draft: 'secondary',
};

const campaignStatusLabel: Record<string, string> = {
    active: 'Active',
    paused: 'Paused',
    completed: 'Completed',
    draft: 'Draft',
};

// ─── Recent Campaigns ─────────────────────────────────────────────────────────

function RecentCampaigns({ campaigns }: { campaigns: Campaign[] }) {
    if (!campaigns || campaigns.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-10 gap-2">
                <Megaphone className="h-9 w-9 text-muted-foreground/20" />
                <p className="text-sm text-muted-foreground">No campaigns yet</p>
                <Link
                    href="/campaigns/create"
                    className="text-xs text-primary hover:underline"
                >
                    Create your first campaign
                </Link>
            </div>
        );
    }

    return (
        <div className="space-y-1">
            {campaigns.slice(0, 5).map((c) => {
                const progress =
                    c.total_contacts > 0
                        ? Math.round((c.contacted / c.total_contacts) * 100)
                        : 0;

                return (
                    <div
                        key={c.id}
                        className="rounded-lg px-3 py-2.5 hover:bg-muted/50 transition-colors group"
                    >
                        <div className="flex items-center justify-between gap-2 mb-1.5">
                            <Link
                                href={`/campaigns/${c.id}`}
                                className="text-sm font-medium truncate hover:text-primary transition-colors max-w-[180px]"
                            >
                                {c.name}
                            </Link>
                            <div className="flex items-center gap-2 shrink-0">
                                {c.owner && (
                                    <span className="text-xs text-muted-foreground hidden sm:inline">
                                        {c.owner}
                                    </span>
                                )}
                                <Badge
                                    variant={campaignBadgeVariant[c.status] || 'outline'}
                                    className="text-xs"
                                >
                                    {campaignStatusLabel[c.status] || c.status}
                                </Badge>
                                <ArrowRight className="h-4 w-4 text-muted-foreground/40 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-primary rounded-full transition-all duration-700"
                                    style={{ width: `${progress}%` }}
                                />
                            </div>
                            <span className="text-xs text-muted-foreground tabular-nums shrink-0">
                                {c.contacted}/{c.total_contacts}
                            </span>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

// ─── Call status icon ─────────────────────────────────────────────────────────

function CallStatusIcon({ status }: { status: string }) {
    if (status === 'completed') {
        return <CheckCircle2 className="h-4 w-4 text-green-500 shrink-0" />;
    }
    if (['failed', 'busy', 'no-answer', 'canceled'].includes(status)) {
        return <XCircle className="h-4 w-4 text-red-500 shrink-0" />;
    }
    return <Phone className="h-4 w-4 text-blue-500 shrink-0" />;
}

// ─── Recent Calls ─────────────────────────────────────────────────────────────

function RecentCalls({ calls }: { calls: CallRecord[] }) {
    if (!calls || calls.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-10 gap-2">
                <PhoneCall className="h-9 w-9 text-muted-foreground/20" />
                <p className="text-sm text-muted-foreground">No calls yet</p>
            </div>
        );
    }

    return (
        <div className="space-y-1">
            {calls.slice(0, 8).map((call) => (
                <div
                    key={call.id}
                    className="flex items-center gap-3 rounded-lg px-3 py-2.5 hover:bg-muted/50 transition-colors"
                >
                    <CallStatusIcon status={call.status} />
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{call.to_number}</p>
                        <p className="text-xs text-muted-foreground">
                            {formatDuration(call.duration_seconds)}
                            {' · '}
                            {new Date(call.created_at).toLocaleDateString(undefined, {
                                month: 'short',
                                day: 'numeric',
                            })}
                            {call.owner ? ` · ${call.owner}` : ''}
                        </p>
                    </div>
                    <span
                        className={`text-xs font-medium shrink-0 capitalize ${
                            call.status === 'completed'
                                ? 'text-green-600 dark:text-green-400'
                                : ['failed', 'busy', 'no-answer'].includes(call.status)
                                  ? 'text-red-500'
                                  : 'text-blue-500'
                        }`}
                    >
                        {call.status.replace('-', '\u2011')}
                    </span>
                </div>
            ))}
        </div>
    );
}

// ─── Quick Actions ────────────────────────────────────────────────────────────

const quickActions = [
    {
        href: '/campaigns/create',
        icon: <Megaphone className="h-6 w-6" />,
        title: 'New Campaign',
        description: 'Launch an outbound calling campaign',
        gradient: 'from-blue-500/10 to-indigo-500/10 dark:from-blue-500/20 dark:to-indigo-500/20',
        border: 'hover:border-blue-300 dark:hover:border-blue-700',
        iconColor: 'text-blue-600 dark:text-blue-400',
    },
    {
        href: '/contacts/create',
        icon: <Users className="h-6 w-6" />,
        title: 'Add Contact',
        description: 'Add a contact to your CRM',
        gradient: 'from-emerald-500/10 to-teal-500/10 dark:from-emerald-500/20 dark:to-teal-500/20',
        border: 'hover:border-emerald-300 dark:hover:border-emerald-700',
        iconColor: 'text-emerald-600 dark:text-emerald-400',
    },
    {
        href: '/calls/manual',
        icon: <Phone className="h-6 w-6" />,
        title: 'Make a Call',
        description: 'Dial a number directly right now',
        gradient: 'from-violet-500/10 to-purple-500/10 dark:from-violet-500/20 dark:to-purple-500/20',
        border: 'hover:border-violet-300 dark:hover:border-violet-700',
        iconColor: 'text-violet-600 dark:text-violet-400',
    },
];

// ─── Main component ────────────────────────────────────────────────────────────

export default function Dashboard() {
    const { auth, stats, recentCampaigns, recentCalls, callsChart } = usePage<{
        auth: Auth;
        stats?: StatsShape;
        recentCampaigns?: Campaign[];
        recentCalls?: CallRecord[];
        callsChart?: ChartPoint[];
        [key: string]: unknown;
    }>().props;

    const user = auth?.user;

    const s = (stats ?? {}) as StatsShape;
    const campaigns: Campaign[] = recentCampaigns ?? [];
    const calls: CallRecord[] = recentCalls ?? [];
    const chartData: ChartPoint[] = callsChart ?? [];

    // Derived KPI values
    const totalCalls = (s.total_calls ?? 0) as number;
    const activeCampaigns = (s.active_campaigns ?? 0) as number;
    const totalContacts = (s.total_contacts ?? 0) as number;
    const callsToday = (s.calls_today ?? 0) as number;

    // Compute answer rate from chart data
    const chartTotal = chartData.reduce((acc, d) => acc + (d.total || 0), 0);
    const chartCompleted = chartData.reduce((acc, d) => acc + (d.completed || 0), 0);
    const answerRate = chartTotal > 0 ? Math.round((chartCompleted / chartTotal) * 100) : 0;

    const breadcrumbs: BreadcrumbItem[] = [{ title: 'Dashboard', href: dashboard().url }];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-8 p-4 md:p-8">

                {/* ── Header ── */}
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 animate-fade-in">
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-1">
                            Dashboard
                        </p>
                        <h1 className="text-2xl font-semibold tracking-tight">
                            {getGreeting()}{user?.name ? `, ${user.name}` : ''}
                        </h1>
                        <p className="mt-1 text-sm text-muted-foreground">
                            Here's what's happening with your campaigns today.
                        </p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                        <Button variant="outline" size="sm" asChild>
                            <Link href="/contacts/import">
                                <Upload className="mr-1.5 h-4 w-4" />
                                Import Contacts
                            </Link>
                        </Button>
                        <Button size="sm" asChild>
                            <Link href="/campaigns/create">
                                <Plus className="mr-1.5 h-4 w-4" />
                                New Campaign
                            </Link>
                        </Button>
                    </div>
                </div>

                {/* ── KPI Cards ── */}
                <div>
                    <SectionLabel>Overview</SectionLabel>
                    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
                        <StatCard
                            title="Total Calls"
                            rawValue={totalCalls}
                            subtitle={`${callsToday} today`}
                            icon={<PhoneCall className="h-5 w-5" />}
                            delay={0}
                            href="/calls/history"
                            accentColor="bg-blue-500"
                        />
                        <StatCard
                            title="Active Campaigns"
                            rawValue={activeCampaigns}
                            subtitle={`${(s.total_campaigns ?? 0) as number} total`}
                            icon={<Megaphone className="h-5 w-5" />}
                            delay={60}
                            href="/campaigns"
                            accentColor="bg-indigo-500"
                        />
                        <StatCard
                            title="Contacts"
                            rawValue={totalContacts}
                            subtitle={`${(s.active_contacts ?? totalContacts) as number} active`}
                            icon={<UserCheck className="h-5 w-5" />}
                            delay={120}
                            href="/contacts"
                            accentColor="bg-emerald-500"
                        />
                        <StatCard
                            title="7-day Answer Rate"
                            rawValue={answerRate}
                            subtitle={chartTotal > 0 ? `${chartCompleted}/${chartTotal} answered` : 'No data yet'}
                            icon={<TrendingUp className="h-5 w-5" />}
                            delay={180}
                            accentColor="bg-violet-500"
                        />
                    </div>
                </div>

                {/* ── Call Activity ── */}
                {(s.calls_today !== undefined || s.calls_this_week !== undefined || s.calls_this_month !== undefined) && (
                    <div>
                        <SectionLabel>Call Activity</SectionLabel>
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                            <StatCard
                                title="Today"
                                rawValue={(s.calls_today ?? 0) as number}
                                subtitle="Calls made today"
                                icon={<Phone className="h-5 w-5" />}
                                delay={0}
                                accentColor="bg-sky-500"
                            />
                            <StatCard
                                title="This Week"
                                rawValue={(s.calls_this_week ?? 0) as number}
                                subtitle="Calls this week"
                                icon={<Clock className="h-5 w-5" />}
                                delay={60}
                                accentColor="bg-cyan-500"
                            />
                            <StatCard
                                title="This Month"
                                rawValue={(s.calls_this_month ?? 0) as number}
                                subtitle="Calls this month"
                                icon={<BarChart3 className="h-5 w-5" />}
                                delay={120}
                                accentColor="bg-teal-500"
                            />
                        </div>
                    </div>
                )}

                {/* ── Call Volume Area Chart ── */}
                <div
                    className="animate-fade-in"
                    style={{ animationDelay: '160ms', animationFillMode: 'both' }}
                >
                    <SectionLabel>Call Volume — Last 7 Days</SectionLabel>
                    <Card>
                        <CardHeader className="pb-2">
                            <div className="flex items-center justify-between">
                                <div>
                                    <CardTitle className="text-base font-semibold">
                                        Call Trends
                                    </CardTitle>
                                    <CardDescription className="mt-0.5">
                                        Total · Completed · Failed
                                    </CardDescription>
                                </div>
                                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                                    <span className="flex items-center gap-1.5">
                                        <span className="h-2.5 w-2.5 rounded-full bg-blue-500 inline-block" />
                                        Total
                                    </span>
                                    <span className="flex items-center gap-1.5">
                                        <span className="h-2.5 w-2.5 rounded-full bg-green-500 inline-block" />
                                        Completed
                                    </span>
                                    <span className="flex items-center gap-1.5">
                                        <span className="h-2.5 w-2.5 rounded-full bg-red-500 inline-block" />
                                        Failed
                                    </span>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <CallVolumeChart data={chartData} />
                        </CardContent>
                    </Card>
                </div>

                {/* ── Recent Campaigns + Recent Calls ── */}
                <div
                    className="grid gap-6 md:grid-cols-2 animate-fade-in"
                    style={{ animationDelay: '220ms', animationFillMode: 'both' }}
                >
                    <Card>
                        <CardHeader className="pb-3">
                            <div className="flex items-center justify-between">
                                <CardTitle className="text-base font-semibold">
                                    Recent Campaigns
                                </CardTitle>
                                <Link
                                    href="/campaigns"
                                    className="text-xs text-muted-foreground hover:text-primary transition-colors flex items-center gap-1"
                                >
                                    View all <ArrowRight className="h-3 w-3" />
                                </Link>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <RecentCampaigns campaigns={campaigns} />
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="pb-3">
                            <div className="flex items-center justify-between">
                                <CardTitle className="text-base font-semibold">
                                    Recent Calls
                                </CardTitle>
                                <Link
                                    href="/calls/history"
                                    className="text-xs text-muted-foreground hover:text-primary transition-colors flex items-center gap-1"
                                >
                                    View all <ArrowRight className="h-3 w-3" />
                                </Link>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <RecentCalls calls={calls} />
                        </CardContent>
                    </Card>
                </div>

                {/* ── Quick Actions ── */}
                <div
                    className="animate-fade-in"
                    style={{ animationDelay: '280ms', animationFillMode: 'both' }}
                >
                    <SectionLabel>Quick Actions</SectionLabel>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                        {quickActions.map((action) => (
                            <Link key={action.href} href={action.href} className="block group">
                                <div
                                    className={`relative rounded-xl border border-border/60 bg-gradient-to-br ${action.gradient} ${action.border} p-5 transition-all duration-200 hover:shadow-sm hover:-translate-y-0.5 overflow-hidden`}
                                >
                                    <div className={`mb-3 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-background/70 dark:bg-background/40 ${action.iconColor}`}>
                                        {action.icon}
                                    </div>
                                    <p className="font-semibold text-sm">{action.title}</p>
                                    <p className="mt-0.5 text-xs text-muted-foreground">
                                        {action.description}
                                    </p>
                                    <ArrowRight className="absolute right-4 bottom-4 h-4 w-4 text-muted-foreground/30 opacity-0 group-hover:opacity-100 transition-all duration-200 group-hover:translate-x-0.5" />
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>

            </div>
        </AppLayout>
    );
}

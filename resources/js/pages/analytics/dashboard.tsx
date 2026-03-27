import AppLayout from '@/layouts/app-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Link, Head } from '@inertiajs/react';
import { Phone, Clock, Activity, BarChart3, PhoneCall, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { PageHelp } from '@/components/page-help';

interface Campaign {
  id: number;
  name: string;
  type: string;
  status: string;
  total_contacts: number;
  total_called: number;
  total_answered: number;
  created_at: string;
}

interface Call {
  id: number;
  to_number: string;
  status: string;
  duration: number | null;
  created_at: string;
}

interface Analytics {
  total_campaigns: number;
  active_campaigns: number;
  completed_campaigns: number;
  total_calls: number;
  total_answered: number;
  average_answer_rate: number;
  total_duration: number;
  total_duration_formatted: string;
  recent_calls: Call[];
}

interface Props {
  analytics: Analytics;
  recentCampaigns: Campaign[];
}

const statusConfig: Record<string, { label: string; variant: 'default' | 'secondary' | 'destructive' | 'outline' }> = {
  draft: { label: 'Draft', variant: 'outline' },
  running: { label: 'Running', variant: 'default' },
  paused: { label: 'Paused', variant: 'secondary' },
  completed: { label: 'Completed', variant: 'secondary' },
  failed: { label: 'Failed', variant: 'destructive' },
};

const callStatusConfig: Record<string, { label: string; variant: 'default' | 'secondary' | 'destructive' | 'outline' }> = {
  initiated: { label: 'Initiated', variant: 'outline' },
  ringing: { label: 'Ringing', variant: 'default' },
  'in-progress': { label: 'In Progress', variant: 'default' },
  completed: { label: 'Completed', variant: 'secondary' },
  busy: { label: 'Busy', variant: 'secondary' },
  failed: { label: 'Failed', variant: 'destructive' },
  'no-answer': { label: 'No Answer', variant: 'secondary' },
};

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle: string;
  icon: React.ReactNode;
  delay?: number;
}

function StatCard({ title, value, subtitle, icon, delay = 0 }: StatCardProps) {
  return (
    <Card
      className="animate-fade-in rounded-xl border border-border/60 shadow-none hover:shadow-sm hover:border-border transition-all duration-200"
      style={{ animationDelay: `${delay}ms` }}
    >
      <CardContent className="pt-5 pb-5 px-5">
        <div className="flex items-start justify-between">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">{title}</p>
          <span className="text-muted-foreground/40">{icon}</span>
        </div>
        <p className="mt-3 text-[2rem] font-semibold tracking-tight leading-none">{value}</p>
        <p className="mt-2 text-xs text-muted-foreground">{subtitle}</p>
      </CardContent>
    </Card>
  );
}

export default function AnalyticsDashboard({
  analytics = {
    total_campaigns: 0,
    active_campaigns: 0,
    completed_campaigns: 0,
    total_calls: 0,
    total_answered: 0,
    average_answer_rate: 0,
    total_duration: 0,
    total_duration_formatted: '0s',
    recent_calls: []
  },
  recentCampaigns = []
}: Props) {
  const formatDuration = (seconds: number | null) => {
    if (!seconds) return '0s';
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return mins > 0 ? `${mins}m ${secs}s` : `${secs}s`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  const breadcrumbs: BreadcrumbItem[] = [
    {
      title: 'Home',
      href: dashboard().url,
    },
    {
      title: 'Analytics',
      href: '/analytics/dashboard',
    },
  ];

  const helpSections = [
    {
      title: 'Analytics Overview',
      content: 'This dashboard provides comprehensive statistics about your campaigns and calls. Monitor performance metrics, call outcomes, and campaign effectiveness.',
    },
    {
      title: 'Campaign Metrics',
      content: 'Total Campaigns shows all campaigns created. Active campaigns are currently running. Completed campaigns have finished calling all contacts.',
    },
    {
      title: 'Call Statistics',
      content: 'Total Calls displays all calls made. Total Answered shows successful connections. Answer Rate is the percentage of calls that were answered.',
    },
    {
      title: 'Call Duration',
      content: 'Total Duration shows the cumulative time spent on all calls. This helps track resource usage and billing.',
    },
    {
      title: 'Recent Activity',
      content: 'View recent campaigns and calls to monitor ongoing activity. Click on campaigns to see detailed analytics for that specific campaign.',
    },
    {
      title: 'Performance Insights',
      content: 'Use these metrics to optimize your campaigns. High answer rates indicate good contact lists and timing. Low rates may suggest adjustments needed.',
    },
  ];

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Analytics" />
      <div className="mx-auto max-w-7xl space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between animate-fade-in">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-1">Overview</p>
            <h1 className="text-2xl font-semibold tracking-tight">Analytics</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Campaign performance and call statistics
            </p>
          </div>
          <PageHelp title="Analytics Help" sections={helpSections} />
        </div>

        {/* Overview Stats */}
        <div className="grid gap-4 md:grid-cols-4">
          <StatCard
            title="Total Campaigns"
            value={analytics.total_campaigns}
            subtitle={`${analytics.active_campaigns} active · ${analytics.completed_campaigns} completed`}
            icon={<Activity className="h-5 w-5" />}
            delay={0}
          />
          <StatCard
            title="Total Calls"
            value={analytics.total_calls.toLocaleString()}
            subtitle={`${analytics.total_answered} answered`}
            icon={<Phone className="h-5 w-5" />}
            delay={60}
          />
          <StatCard
            title="Answer Rate"
            value={`${analytics.average_answer_rate}%`}
            subtitle="Across all campaigns"
            icon={<CheckCircle2 className="h-5 w-5" />}
            delay={120}
          />
          <StatCard
            title="Total Duration"
            value={analytics.total_duration_formatted}
            subtitle={`${analytics.total_duration.toLocaleString()} seconds total`}
            icon={<Clock className="h-5 w-5" />}
            delay={180}
          />
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Recent Campaigns */}
          <Card className="animate-fade-in" style={{ animationDelay: '200ms' }}>
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-semibold">Recent Campaigns</CardTitle>
              <CardDescription>Your latest campaign activity</CardDescription>
            </CardHeader>
            <CardContent>
              {recentCampaigns.length > 0 ? (
                <div className="space-y-1">
                  {recentCampaigns.map((campaign) => (
                    <div
                      key={campaign.id}
                      className="flex items-center justify-between rounded-lg px-3 py-2.5 hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <Link
                            href={`/campaigns/${campaign.id}`}
                            className="font-medium text-sm hover:text-primary transition-colors truncate"
                          >
                            {campaign.name}
                          </Link>
                          <Badge variant={statusConfig[campaign.status]?.variant || 'outline'} className="shrink-0 text-xs">
                            {statusConfig[campaign.status]?.label || campaign.status}
                          </Badge>
                        </div>
                        <p className="mt-0.5 text-xs text-muted-foreground capitalize">
                          {campaign.type.replace('_', ' ')} · {campaign.total_contacts} contacts
                          {campaign.total_called > 0 && ` · ${campaign.total_called} called`}
                        </p>
                      </div>
                      {(campaign.total_called > 0 || ['running', 'completed'].includes(campaign.status)) && (
                        <Link href={`/analytics/campaigns/${campaign.id}`}>
                          <Button variant="ghost" size="sm" className="ml-2 h-8 w-8 p-0">
                            <BarChart3 className="h-4 w-4" />
                          </Button>
                        </Link>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-10 text-center">
                  <Activity className="h-8 w-8 text-muted-foreground/30 mb-2" />
                  <p className="text-sm text-muted-foreground">No campaigns yet</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Recent Calls */}
          <Card className="animate-fade-in" style={{ animationDelay: '240ms' }}>
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-semibold">Recent Calls</CardTitle>
              <CardDescription>Latest call activity across all campaigns</CardDescription>
            </CardHeader>
            <CardContent>
              {analytics.recent_calls.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow className="border-0 hover:bg-transparent">
                      <TableHead className="text-xs font-semibold uppercase tracking-wide text-muted-foreground px-3">Number</TableHead>
                      <TableHead className="text-xs font-semibold uppercase tracking-wide text-muted-foreground px-3">Status</TableHead>
                      <TableHead className="text-xs font-semibold uppercase tracking-wide text-muted-foreground px-3">Duration</TableHead>
                      <TableHead className="text-xs font-semibold uppercase tracking-wide text-muted-foreground px-3">Time</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {analytics.recent_calls.map((call) => (
                      <TableRow key={call.id} className="hover:bg-muted/50 transition-colors border-0">
                        <TableCell className="font-medium text-sm px-3 py-2">{call.to_number}</TableCell>
                        <TableCell className="px-3 py-2">
                          <Badge variant={callStatusConfig[call.status]?.variant || 'outline'} className="text-xs">
                            {callStatusConfig[call.status]?.label || call.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="px-3 py-2 text-sm">{formatDuration(call.duration)}</TableCell>
                        <TableCell className="px-3 py-2 text-xs text-muted-foreground">
                          {formatDate(call.created_at)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <div className="flex flex-col items-center justify-center py-10 text-center">
                  <PhoneCall className="h-8 w-8 text-muted-foreground/30 mb-2" />
                  <p className="text-sm text-muted-foreground">No calls yet</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
}

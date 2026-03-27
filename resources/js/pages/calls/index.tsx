import AppLayout from '@/layouts/app-layout';
import Heading from '@/components/heading';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { router, Link, Head } from '@inertiajs/react';
import { Phone, PhoneCall, PhoneMissed, PhoneOff, Clock, Search, Filter, Eye, Mic, Download } from 'lucide-react';
import { FormEvent, useState } from 'react';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { PageHelp } from '@/components/page-help';

interface Call {
  id: number;
  call_type: string;
  direction: string;
  to_number: string;
  from_number: string;
  status: string;
  duration: number | null;
  price: number | string | null;
  price_unit: string | null;
  recording_url: string | null;
  recording_duration: number | null;
  started_at: string | null;
  ended_at: string | null;
  created_at: string;
  campaign?: {
    id: number;
    name: string;
  };
  campaignContact?: {
    id: number;
    first_name: string | null;
    last_name: string | null;
    phone_number: string;
  };
}

interface Props {
  calls?: {
    data: Call[];
    links: unknown[];
    meta: {
      current_page: number;
      from: number | null;
      last_page: number;
      per_page: number;
      to: number | null;
      total: number;
    };
  };
  stats?: {
    total: number;
    completed: number;
    failed: number;
    in_progress: number;
    inbound: number;
    outbound: number;
  };
  filters?: {
    status?: string;
    call_type?: string;
    direction?: string;
    from_date?: string;
    to_date?: string;
    search?: string;
  };
}

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Dashboard',
    href: dashboard().url,
  },
  {
    title: 'Call History',
    href: '/calls',
  },
];

export default function CallsIndex({ 
  calls = { data: [], links: [], meta: { current_page: 1, from: null, last_page: 1, per_page: 20, to: null, total: 0 } },
  stats = { total: 0, completed: 0, failed: 0, in_progress: 0, inbound: 0, outbound: 0 },
  filters = {}
}: Props) {
  const [searchTerm, setSearchTerm] = useState(filters.search || '');
  const [showFilters, setShowFilters] = useState(false);

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    router.get('/calls', { ...filters, search: searchTerm }, { preserveState: true });
  };

  const handleFilterChange = (key: string, value: string) => {
    router.get('/calls', { ...filters, [key]: value }, { preserveState: true });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <PhoneCall className="h-4 w-4 text-green-600" />;
      case 'failed':
      case 'busy':
      case 'no-answer':
        return <PhoneMissed className="h-4 w-4 text-red-600" />;
      case 'in-progress':
      case 'ringing':
        return <Phone className="h-4 w-4 text-blue-600 animate-pulse" />;
      default:
        return <PhoneOff className="h-4 w-4 text-slate-400" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, 'default' | 'secondary' | 'destructive' | 'outline'> = {
      completed: 'default',
      failed: 'destructive',
      busy: 'destructive',
      'no-answer': 'destructive',
      'in-progress': 'secondary',
      ringing: 'secondary',
    };

    return (
      <Badge variant={variants[status] || 'outline'} className="capitalize">
        {status.replace(/-/g, ' ')}
      </Badge>
    );
  };

  const formatDuration = (seconds: number | null) => {
    if (!seconds) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const formatContactName = (call: Call) => {
    if (call.campaignContact) {
      const name = [call.campaignContact.first_name, call.campaignContact.last_name]
        .filter(Boolean)
        .join(' ');
      return name || call.to_number;
    }
    return call.to_number;
  };

  const helpSections = [
    {
      title: 'Call History Overview',
      content: 'This page displays all calls made through the system, including campaign calls and Softphones. View detailed information about each call including status, duration, and cost.',
    },
    {
      title: 'Call Status',
      content: 'Completed: Call was answered and completed. Failed: Call could not be connected. Busy: Contact was on another call. No-answer: Contact did not pick up. In-progress/Ringing: Call is currently active.',
    },
    {
      title: 'Statistics Cards',
      content: 'Track your overall calling performance with Total Calls, Completed calls with success rate, Failed calls, and currently In-progress calls.',
    },
    {
      title: 'Search and Filters',
      content: 'Search by phone number or contact name. Use filters to view calls by status, call type (campaign/manual), or date range.',
    },
    {
      title: 'Call Duration and Cost',
      content: 'Duration shows how long the call lasted (minutes:seconds). Cost is calculated based on call duration and rates, deducted from your credits balance.',
    },
    {
      title: 'View Call Details',
      content: 'Click the eye icon to view full call details including recordings, transcripts, and additional information.',
    },
  ];

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Call History" />
      <div className="flex h-full flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="flex items-center justify-between">
          <Heading
            title="Call History"
            description="View all your calls and their details"
          />
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              onClick={() => {
                const params = new URLSearchParams();
                if (filters.status && filters.status !== 'all') params.append('status', filters.status);
                if (filters.call_type && filters.call_type !== 'all') params.append('call_type', filters.call_type);
                if (filters.direction && filters.direction !== 'all') params.append('direction', filters.direction);
                if (filters.from_date) params.append('from_date', filters.from_date);
                if (filters.to_date) params.append('to_date', filters.to_date);
                if (filters.search) params.append('search', filters.search);
                window.location.href = `/calls/export?${params.toString()}`;
              }}
            >
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <PageHelp title="Call History Help" sections={helpSections} />
          </div>
        </div>
        {/* Statistics Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Calls</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{(stats?.total ?? 0).toLocaleString()}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completed</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{(stats?.completed ?? 0).toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                {(stats?.total ?? 0) > 0 ? Math.round(((stats?.completed ?? 0) / (stats?.total ?? 1)) * 100) : 0}% success rate
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Failed</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{(stats?.failed ?? 0).toLocaleString()}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">In Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{(stats?.in_progress ?? 0).toLocaleString()}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Inbound</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">{(stats?.inbound ?? 0).toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                {(stats?.total ?? 0) > 0 ? Math.round(((stats?.inbound ?? 0) / (stats?.total ?? 1)) * 100) : 0}%
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Outbound</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">{(stats?.outbound ?? 0).toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                {(stats?.total ?? 0) > 0 ? Math.round(((stats?.outbound ?? 0) / (stats?.total ?? 1)) * 100) : 0}%
              </p>
            </CardContent>
          </Card>
        </div>

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Filters</CardTitle>
              <CardDescription>Search and filter your call history</CardDescription>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="h-4 w-4 mr-2" />
              {showFilters ? 'Hide' : 'Show'} Filters
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSearch} className="mb-4">
            <div className="flex gap-2">
              <div className="flex-1">
                <Input
                  type="text"
                  placeholder="Search by phone number..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full"
                />
              </div>
              <Button type="submit">
                <Search className="h-4 w-4 mr-2" />
                Search
              </Button>
            </div>
          </form>

          {showFilters && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Status</label>
                <select
                  className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm"
                  value={filters.status || 'all'}
                  onChange={(e) => handleFilterChange('status', e.target.value)}
                >
                  <option value="all">All Status</option>
                  <option value="completed">Completed</option>
                  <option value="failed">Failed</option>
                  <option value="busy">Busy</option>
                  <option value="no-answer">No Answer</option>
                  <option value="in-progress">In Progress</option>
                </select>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Call Type</label>
                <select
                  className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm"
                  value={filters.call_type || 'all'}
                  onChange={(e) => handleFilterChange('call_type', e.target.value)}
                >
                  <option value="all">All Types</option>
                  <option value="manual">Manual</option>
                  <option value="campaign">Campaign</option>
                </select>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Direction</label>
                <select
                  className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm"
                  value={filters.direction || 'all'}
                  onChange={(e) => handleFilterChange('direction', e.target.value)}
                >
                  <option value="all">All Directions</option>
                  <option value="inbound">Inbound</option>
                  <option value="outbound">Outbound</option>
                </select>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">From Date</label>
                <Input
                  type="date"
                  value={filters.from_date || ''}
                  onChange={(e) => handleFilterChange('from_date', e.target.value)}
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">To Date</label>
                <Input
                  type="date"
                  value={filters.to_date || ''}
                  onChange={(e) => handleFilterChange('to_date', e.target.value)}
                />
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Calls Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Call History</CardTitle>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {(calls?.data?.length ?? 0) > 0 ? (
            <>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Status</TableHead>
                    <TableHead>Direction</TableHead>
                    <TableHead>Contact / Number</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Campaign</TableHead>
                    <TableHead>Duration</TableHead>
                    <TableHead className="text-right">Cost</TableHead>
                    <TableHead>Recording</TableHead>
                    <TableHead>Date & Time</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {(calls?.data ?? []).map((call) => (
                    <TableRow key={call.id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getStatusIcon(call.status)}
                          {getStatusBadge(call.status)}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge 
                          variant={call.direction === 'inbound' ? 'default' : 'secondary'}
                          className="capitalize"
                        >
                          {call.direction === 'inbound' ? (
                            <>
                              <svg className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H10" />
                              </svg>
                              Inbound
                            </>
                          ) : (
                            <>
                              <svg className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4-4m0 0l-4-4m4 4H7" />
                              </svg>
                              Outbound
                            </>
                          )}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{formatContactName(call)}</div>
                          <div className="text-sm text-slate-500">
                            From: {call.from_number}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="capitalize">
                          {call.call_type}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {call.campaign ? (
                          <Link
                            href={`/campaigns/${call.campaign.id}`}
                            className="text-blue-600 hover:underline"
                          >
                            {call.campaign.name}
                          </Link>
                        ) : (
                          <span className="text-slate-400">-</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Clock className="h-3.5 w-3.5 text-slate-400" />
                          {formatDuration(call.duration)}
                        </div>
                      </TableCell>
                      <TableCell className="text-right font-mono text-sm">
                        {call.price != null && Number(call.price) > 0
                          ? `$${Number(call.price).toFixed(4)}`
                          : '—'}
                      </TableCell>
                      <TableCell>
                        {call.recording_url ? (
                          <div className="flex items-center gap-2">
                            <Mic className="h-4 w-4 text-green-600" />
                            <audio controls className="h-8" style={{ width: '180px' }}>
                              <source src={call.recording_url} type="audio/mpeg" />
                              Your browser does not support audio.
                            </audio>
                          </div>
                        ) : (
                          <span className="text-slate-400 text-sm">-</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          {new Date(call.created_at).toLocaleString()}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <Link href={`/calls/${call.id}`}>
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </Link>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              {/* Pagination */}
              {(calls?.meta?.last_page ?? 1) > 1 && (
                <div className="mt-4 flex items-center justify-between">
                  <div className="text-sm text-slate-600">
                    Showing {calls?.meta?.from ?? 0} to {calls?.meta?.to ?? 0} of {calls?.meta?.total ?? 0} calls
                  </div>
                  <div className="flex gap-2">
                    {(calls?.meta?.current_page ?? 1) > 1 && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          router.get('/calls', {
                            ...filters,
                            page: (calls?.meta?.current_page ?? 1) - 1,
                          })
                        }
                      >
                        Previous
                      </Button>
                    )}
                    {(calls?.meta?.current_page ?? 1) < (calls?.meta?.last_page ?? 1) && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          router.get('/calls', {
                            ...filters,
                            page: (calls?.meta?.current_page ?? 1) + 1,
                          })
                        }
                      >
                        Next
                      </Button>
                    )}
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-12">
              <PhoneOff className="h-12 w-12 text-slate-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-slate-900 mb-2">No calls found</h3>
              <p className="text-slate-600 mb-4">
                {filters.search || filters.status || filters.call_type
                  ? 'Try adjusting your filters'
                  : 'Start making calls to see them here'}
              </p>
              <Link href="/softphone">
                <Button>
                  <Phone className="h-4 w-4 mr-2" />
                  Make a Call
                </Button>
              </Link>
            </div>
          )}
        </CardContent>
      </Card>
      </div>
    </AppLayout>
  );
}

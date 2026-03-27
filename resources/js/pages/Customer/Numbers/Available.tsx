import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Label } from '@/components/ui/label';
import { Link, router, Head, useForm } from '@inertiajs/react';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { useState } from 'react';
import { 
  Search, 
  Phone, 
  PhoneCall, 
  MessageSquare, 
  Filter,
  X,
  AlertCircle,
  Network,
  Zap
} from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface PhoneNumber {
  id: number;
  number: string;
  formatted_number: string;
  friendly_name: string;
  country_code: string;
  area_code: string;
  status: 'available' | 'requested' | 'assigned' | 'released';
  source: 'twilio_direct' | 'sip_trunk'; // NEW: Track number source
  capabilities: {
    voice: boolean;
    sms: boolean;
    mms: boolean;
  };
  monthly_cost: number;
  original_monthly_cost?: number; // NEW: Original price before discount
  discount_percentage?: number; // NEW: Savings percentage
  created_at: string;
}

interface PaginatedNumbers {
  data: PhoneNumber[];
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
}

interface Stats {
  total_available: number;
  voice_capable: number;
  sms_capable: number;
  average_cost: number;
}

interface Country {
  code: string;
  name: string;
  continent: string;
}

interface Props {
  numbers: PaginatedNumbers;
  filters: {
    search?: string;
    country_code?: string;
    area_code?: string;
    voice_capable?: boolean;
    sms_capable?: boolean;
  };
  stats: Stats;
  countries: Country[];
}

export default function AvailableNumbers({ numbers, filters, stats, countries = [] }: Props) {
  const [selectedNumber, setSelectedNumber] = useState<PhoneNumber | null>(null);
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
  const [isFilterSheetOpen, setIsFilterSheetOpen] = useState(false);

  const { data, setData, post, processing, errors, reset } = useForm({
    customer_notes: '',
  });

  const [localFilters, setLocalFilters] = useState({
    search: filters.search || '',
    country_code: filters.country_code || '',
    area_code: filters.area_code || '',
    voice_capable: filters.voice_capable?.toString() || 'all',
    sms_capable: filters.sms_capable?.toString() || 'all',
  });

  const handleSearch = () => {
    // Filter out 'all' values before sending to backend
    const searchParams = {
      ...localFilters,
      voice_capable: localFilters.voice_capable === 'all' ? '' : localFilters.voice_capable,
      sms_capable: localFilters.sms_capable === 'all' ? '' : localFilters.sms_capable,
    };
    
    router.get('/numbers/available', searchParams, {
      preserveState: true,
      preserveScroll: true,
    });
  };

  const handleClearFilters = () => {
    const clearedFilters = {
      search: '',
      country_code: '',
      area_code: '',
      voice_capable: 'all',
      sms_capable: 'all',
    };
    setLocalFilters(clearedFilters);
    router.get('/numbers/available', {}, {
      preserveState: true,
      preserveScroll: true,
    });
  };

  const handleRequestNumber = (number: PhoneNumber) => {
    setSelectedNumber(number);
    setIsRequestModalOpen(true);
  };

  const submitRequest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedNumber) return;

    post(`/numbers/${selectedNumber.id}/request`, {
      onSuccess: () => {
        setIsRequestModalOpen(false);
        reset();
        setSelectedNumber(null);
      },
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'default';
      case 'requested': return 'secondary';
      case 'assigned': return 'destructive';
      default: return 'outline';
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const breadcrumbs: BreadcrumbItem[] = [
    {
      title: 'Dashboard',
      href: dashboard().url,
    },
    {
      title: 'Available Phone Numbers',
      href: '/numbers/available',
    },
  ];

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Available Phone Numbers" />
      
      <div className="flex h-full flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Available Phone Numbers</h1>
            <p className="text-muted-foreground">
              Browse and request phone numbers for your campaigns
            </p>
          </div>
          <Button asChild>
            <Link href="/numbers/my-numbers">
              <Phone className="mr-2 h-4 w-4" />
              My Numbers
            </Link>
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Available</CardTitle>
              <Phone className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.total_available}</div>
              <p className="text-xs text-muted-foreground">
                Numbers ready to use
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Voice Capable</CardTitle>
              <PhoneCall className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.voice_capable}</div>
              <p className="text-xs text-muted-foreground">
                Can make/receive calls
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">SMS Capable</CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.sms_capable}</div>
              <p className="text-xs text-muted-foreground">
                Can send/receive SMS
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg. Monthly Cost</CardTitle>
              <Phone className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatCurrency(stats.average_cost)}</div>
              <p className="text-xs text-muted-foreground">
                Per number
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Search Numbers</CardTitle>
                <CardDescription>Find phone numbers by area code, country, or capabilities</CardDescription>
              </div>
              <Sheet open={isFilterSheetOpen} onOpenChange={setIsFilterSheetOpen}>
                <SheetTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Filter className="mr-2 h-4 w-4" />
                    Advanced Filters
                  </Button>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>Filter Phone Numbers</SheetTitle>
                    <SheetDescription>
                      Narrow down available numbers by your criteria
                    </SheetDescription>
                  </SheetHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="country">Country</Label>
                      <Select
                        value={localFilters.country_code}
                        onValueChange={(value) => setLocalFilters({ ...localFilters, country_code: value })}
                      >
                        <SelectTrigger id="country">
                          <SelectValue placeholder="Select country..." />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="">All Countries</SelectItem>
                          {countries.map((country) => (
                            <SelectItem key={country.code} value={country.code}>
                              {country.code} - {country.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="area">Area Code</Label>
                      <Input
                        id="area"
                        placeholder="415, 510, 212..."
                        value={localFilters.area_code}
                        onChange={(e) => setLocalFilters({ ...localFilters, area_code: e.target.value })}
                      />
                    </div>

                    <Separator />

                    <div className="space-y-2">
                      <Label htmlFor="voice">Voice Capability</Label>
                      <Select
                        value={localFilters.voice_capable}
                        onValueChange={(value) => setLocalFilters({ ...localFilters, voice_capable: value })}
                      >
                        <SelectTrigger id="voice">
                          <SelectValue placeholder="Any" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Any</SelectItem>
                          <SelectItem value="1">Voice Capable Only</SelectItem>
                          <SelectItem value="0">No Voice</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="sms">SMS Capability</Label>
                      <Select
                        value={localFilters.sms_capable}
                        onValueChange={(value) => setLocalFilters({ ...localFilters, sms_capable: value })}
                      >
                        <SelectTrigger id="sms">
                          <SelectValue placeholder="Any" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Any</SelectItem>
                          <SelectItem value="1">SMS Capable Only</SelectItem>
                          <SelectItem value="0">No SMS</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={() => { handleSearch(); setIsFilterSheetOpen(false); }} className="flex-1">
                      Apply Filters
                    </Button>
                    <Button variant="outline" onClick={handleClearFilters}>
                      Clear
                    </Button>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by number..."
                  className="pl-8"
                  value={localFilters.search}
                  onChange={(e) => setLocalFilters({ ...localFilters, search: e.target.value })}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                />
              </div>
              <Button onClick={handleSearch}>Search</Button>
              {Object.values(localFilters).some(v => v !== '') && (
                <Button variant="ghost" onClick={handleClearFilters}>
                  <X className="mr-2 h-4 w-4" />
                  Clear
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* No Countries Warning */}
        {countries.length === 0 && (
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              <strong>No countries configured.</strong> Please contact your administrator to:
              <ol className="mt-2 ml-4 list-decimal">
                <li>Configure Twilio settings (Settings → Twilio)</li>
                <li>Enable countries in geo-permissions</li>
                <li>Sync phone numbers for enabled countries</li>
              </ol>
            </AlertDescription>
          </Alert>
        )}

        {/* Numbers Table */}
        <Card>
          <CardHeader>
            <CardTitle>Available Numbers ({numbers.total})</CardTitle>
            <CardDescription>
              Select a phone number to request it for your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            {numbers.data.length === 0 ? (
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  {countries.length === 0 ? (
                    <>
                      <strong>No phone numbers available.</strong> The system needs to be configured first.
                      Please contact your administrator to set up Twilio and sync phone numbers.
                    </>
                  ) : (
                    <>
                      No phone numbers match your search criteria. Try adjusting your filters or contact support.
                      {numbers.total === 0 && (
                        <p className="mt-2">
                          <strong>Note:</strong> The database appears empty. An administrator may need to run:
                          <code className="ml-1 px-2 py-1 bg-muted rounded">php scripts/sync-multiple-countries.php</code>
                        </p>
                      )}
                    </>
                  )}
                </AlertDescription>
              </Alert>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Phone Number</TableHead>
                    <TableHead>Country</TableHead>
                    <TableHead>Area Code</TableHead>
                    <TableHead>Capabilities</TableHead>
                    <TableHead>Monthly Cost</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {numbers.data.map((number) => (
                    <TableRow key={number.id}>
                      <TableCell>
                        <div className="flex flex-col">
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{number.formatted_number}</span>
                            {number.source === 'sip_trunk' && (
                              <Badge variant="default" className="bg-green-600 hover:bg-green-700">
                                <Network className="mr-1 h-3 w-3" />
                                SIP Trunk
                              </Badge>
                            )}
                          </div>
                          <span className="text-sm text-muted-foreground">{number.friendly_name}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{number.country_code}</Badge>
                      </TableCell>
                      <TableCell>{number.area_code}</TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          {number.capabilities.voice && (
                            <Badge variant="secondary" className="text-xs">
                              <PhoneCall className="mr-1 h-3 w-3" />
                              Voice
                            </Badge>
                          )}
                          {number.capabilities.sms && (
                            <Badge variant="secondary" className="text-xs">
                              <MessageSquare className="mr-1 h-3 w-3" />
                              SMS
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">
                        {number.source === 'sip_trunk' ? (
                          <div className="flex flex-col">
                            <div className="flex items-center gap-1">
                              <span className="text-lg font-bold text-green-600">FREE</span>
                              <Zap className="h-4 w-4 text-yellow-500" />
                            </div>
                            {number.original_monthly_cost && number.original_monthly_cost > 0 && (
                              <span className="text-xs text-muted-foreground line-through">
                                {formatCurrency(number.original_monthly_cost)}
                              </span>
                            )}
                          </div>
                        ) : (
                          formatCurrency(number.monthly_cost)
                        )}
                      </TableCell>
                      <TableCell>
                        <Badge variant={getStatusColor(number.status)}>
                          {number.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          size="sm"
                          onClick={() => handleRequestNumber(number)}
                          disabled={number.status !== 'available'}
                        >
                          {number.status === 'available' ? 'Request' : 'Unavailable'}
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}

            {/* Pagination */}
            {numbers.last_page > 1 && (
              <div className="flex items-center justify-between pt-4">
                <div className="text-sm text-muted-foreground">
                  Showing {numbers.data.length} of {numbers.total} numbers
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => router.get(`/numbers/available?page=${numbers.current_page - 1}`, localFilters)}
                    disabled={numbers.current_page === 1}
                  >
                    Previous
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => router.get(`/numbers/available?page=${numbers.current_page + 1}`, localFilters)}
                    disabled={numbers.current_page === numbers.last_page}
                  >
                    Next
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Request Modal */}
      <Dialog open={isRequestModalOpen} onOpenChange={setIsRequestModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Request Phone Number</DialogTitle>
            <DialogDescription>
              Submit a request for this phone number. An admin will review and approve your request.
            </DialogDescription>
          </DialogHeader>
          
          {selectedNumber && (
            <form onSubmit={submitRequest}>
              <div className="space-y-4 py-4">
                <div className="rounded-lg border p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Phone Number:</span>
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-bold">{selectedNumber.formatted_number}</span>
                      {selectedNumber.source === 'sip_trunk' && (
                        <Badge variant="default" className="bg-green-600">
                          <Network className="mr-1 h-3 w-3" />
                          SIP Trunk
                        </Badge>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Location:</span>
                    <span>{selectedNumber.country_code} • Area Code: {selectedNumber.area_code}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Capabilities:</span>
                    <div className="flex gap-1">
                      {selectedNumber.capabilities.voice && <Badge variant="secondary">Voice</Badge>}
                      {selectedNumber.capabilities.sms && <Badge variant="secondary">SMS</Badge>}
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Monthly Cost:</span>
                    {selectedNumber.source === 'sip_trunk' ? (
                      <div className="flex flex-col items-end">
                        <div className="flex items-center gap-1">
                          <span className="text-lg font-bold text-green-600">FREE</span>
                          <Zap className="h-4 w-4 text-yellow-500" />
                        </div>
                        {selectedNumber.original_monthly_cost && selectedNumber.original_monthly_cost > 0 && (
                          <div className="flex items-center gap-2 text-xs">
                            <span className="line-through text-muted-foreground">
                              {formatCurrency(selectedNumber.original_monthly_cost)}
                            </span>
                            <Badge variant="outline" className="text-green-600 border-green-600">
                              Save 100%
                            </Badge>
                          </div>
                        )}
                      </div>
                    ) : (
                      <span className="font-bold">{formatCurrency(selectedNumber.monthly_cost)}</span>
                    )}
                  </div>
                  {selectedNumber.source === 'sip_trunk' && (
                    <Alert className="mt-4 border-green-600 bg-green-50 dark:bg-green-950/20">
                      <Network className="h-4 w-4 text-green-600" />
                      <AlertDescription className="text-sm text-green-800 dark:text-green-200">
                        This number is from our SIP Trunk integration - no monthly fees!
                      </AlertDescription>
                    </Alert>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notes">Notes (Optional)</Label>
                  <Textarea
                    id="notes"
                    placeholder="Tell us why you need this number..."
                    value={data.customer_notes}
                    onChange={(e) => setData('customer_notes', e.target.value)}
                    rows={4}
                  />
                  {errors.customer_notes && (
                    <p className="text-sm text-destructive">{errors.customer_notes}</p>
                  )}
                  <p className="text-xs text-muted-foreground">
                    Providing details about your use case helps us process your request faster.
                  </p>
                </div>

                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    Once submitted, your request will be reviewed by an admin. You'll receive an email notification when it's approved or if more information is needed.
                  </AlertDescription>
                </Alert>
              </div>

              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsRequestModalOpen(false)}
                  disabled={processing}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={processing}>
                  {processing ? 'Submitting...' : 'Submit Request'}
                </Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </AppLayout>
  );
}

import { Head, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Search,
  Plus,
  Upload,
  CheckCircle,
  X,
  ChevronUp,
  ChevronDown,
  ChevronsUpDown,
  Users,
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { PageHelp } from '@/components/page-help';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import Heading from '@/components/heading';
import { ImportModal } from '@/components/contacts/import-modal';
import { PhoneValidationModal } from '@/components/contacts/phone-validation-modal';
import { toast } from 'sonner';

interface Contact {
  id: number;
  first_name: string;
  last_name: string;
  phone_number: string;
  email?: string;
  company?: string;
  tags?: string[];
  status: string;
}

interface ContactTag {
  id: number;
  name: string;
}

interface ContactList {
  id: number;
  name: string;
}

interface Props {
  contacts: {
    data: Contact[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
  tags?: ContactTag[];
  lists?: ContactList[];
  filters?: {
    search?: string;
  };
}

function buildPages(current: number, last: number): (number | '...')[] {
  if (last <= 7) return Array.from({ length: last }, (_, i) => i + 1);
  if (current <= 4) return [1, 2, 3, 4, 5, '...', last];
  if (current >= last - 3) return [1, '...', last - 4, last - 3, last - 2, last - 1, last];
  return [1, '...', current - 1, current, current + 1, '...', last];
}

function SortIcon({
  column,
  sortBy,
  sortDir,
}: {
  column: string;
  sortBy: string;
  sortDir: 'asc' | 'desc';
}) {
  if (sortBy !== column) return <ChevronsUpDown className="size-3.5 text-muted-foreground/40" />;
  return sortDir === 'asc' ? (
    <ChevronUp className="size-3.5 text-primary" />
  ) : (
    <ChevronDown className="size-3.5 text-primary" />
  );
}

export default function ContactsIndex({ contacts, tags = [], lists = [], filters = {} }: Props) {
  const [searchValue, setSearchValue] = useState(filters.search || '');
  const [importModalOpen, setImportModalOpen] = useState(false);
  const [validationModalOpen, setValidationModalOpen] = useState(false);
  const [sortBy, setSortBy] = useState<string>('');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');
  const perPage = contacts.per_page;
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [isInitialLoading, setIsInitialLoading] = useState(true);

  // Brief 200ms skeleton on first mount
  useEffect(() => {
    const timer = setTimeout(() => setIsInitialLoading(false), 200);
    return () => clearTimeout(timer);
  }, []);

  // Debounced search — 300ms after the user stops typing
  useEffect(() => {
    const timer = setTimeout(() => {
      router.get(
        '/contacts',
        { search: searchValue, page: 1, sort_by: sortBy, sort_dir: sortDir, per_page: perPage },
        { preserveState: true, replace: true },
      );
    }, 300);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchValue]);

  const handleSort = (column: string) => {
    const newDir = sortBy === column && sortDir === 'asc' ? 'desc' : 'asc';
    setSortBy(column);
    setSortDir(newDir);
    router.get(
      '/contacts',
      { search: searchValue, sort_by: column, sort_dir: newDir, per_page: perPage },
      { preserveState: true, replace: true },
    );
  };

  const allSelected =
    contacts.data.length > 0 && selectedIds.length === contacts.data.length;

  const toggleAll = (checked: boolean) =>
    setSelectedIds(checked ? contacts.data.map((c) => c.id) : []);

  const toggleOne = (id: number) =>
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );

  const goToPage = (page: number) => {
    router.get(
      '/contacts',
      { page, search: searchValue, sort_by: sortBy, sort_dir: sortDir, per_page: perPage },
      { preserveState: true },
    );
  };

  const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: dashboard().url },
    { title: 'Contacts', href: '/contacts' },
  ];

  const helpSections = [
    {
      title: 'Contact Management',
      content:
        'Manage all your contacts in one place. Add contacts individually, import in bulk from CSV files, and organize them into contact lists for campaigns.',
    },
    {
      title: 'Adding Contacts',
      content:
        'Click "Add Contact" to manually create a single contact, or use "Import" to upload multiple contacts from a CSV file.',
    },
    {
      title: 'Contact Information',
      content:
        'Each contact can have first name, last name, phone number (required), email, company, and tags for organization.',
    },
    {
      title: 'Contact Status',
      content:
        'Active: Available for calling. Inactive: Excluded from campaigns. DNC (Do Not Call): Permanently excluded from all calls.',
    },
    {
      title: 'Search and Filter',
      content:
        'Search by name, phone number, email, or company. Use filters to view contacts by status or tags.',
    },
    {
      title: 'Bulk Actions',
      content:
        'Select multiple contacts to perform bulk operations like adding to contact lists, changing status, or exporting.',
    },
  ];

  const SortableHead = ({ label, column }: { label: string; column: string }) => (
    <TableHead
      className="cursor-pointer hover:bg-muted/50 select-none transition-colors"
      onClick={() => handleSort(column)}
    >
      <div className="flex items-center gap-1">
        {label}
        <SortIcon column={column} sortBy={sortBy} sortDir={sortDir} />
      </div>
    </TableHead>
  );

  const rangeStart =
    contacts.total === 0 ? 0 : (contacts.current_page - 1) * contacts.per_page + 1;
  const rangeEnd = Math.min(contacts.current_page * contacts.per_page, contacts.total);

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Contacts" />

      <div className="mx-auto max-w-7xl space-y-6">
        <div className="flex justify-between items-center">
          <Heading title="Contacts" description="Manage your contact list" />
          <div className="flex gap-2">
            <PageHelp title="Contacts Help" sections={helpSections} />
            <Button variant="outline" onClick={() => setValidationModalOpen(true)}>
              <CheckCircle className="mr-2 h-4 w-4" />
              Check Valid Numbers
            </Button>
            <Button variant="outline" onClick={() => setImportModalOpen(true)}>
              <Upload className="mr-2 h-4 w-4" />
              Import
            </Button>
            <Button onClick={() => router.get('/contacts/create')}>
              <Plus className="mr-2 h-4 w-4" />
              Add Contact
            </Button>
          </div>
        </div>

        <Card className="p-6">
          {/* Debounced search bar */}
          <div className="flex gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search contacts..."
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  className="pl-10 pr-10"
                />
                {searchValue && (
                  <button
                    onClick={() => setSearchValue('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                    aria-label="Clear search"
                  >
                    <X className="size-4 text-muted-foreground" />
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Showing X–Y of Z contacts */}
          {contacts.total > 0 && (
            <p className="text-sm text-muted-foreground mb-3">
              Showing {rangeStart}–{rangeEnd} of {contacts.total} contacts
            </p>
          )}

          {isInitialLoading ? (
            <Skeleton variant="table" rows={10} />
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-10">
                    <Checkbox
                      checked={allSelected}
                      onCheckedChange={(checked) => toggleAll(Boolean(checked))}
                      aria-label="Select all"
                    />
                  </TableHead>
                  <SortableHead label="Name" column="first_name" />
                  <SortableHead label="Phone" column="phone_number" />
                  <SortableHead label="Email" column="email" />
                  <SortableHead label="Company" column="company" />
                  <SortableHead label="Status" column="status" />
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {contacts?.data?.length > 0 ? (
                  contacts.data.map((contact) => (
                    <TableRow key={contact.id}>
                      <TableCell>
                        <Checkbox
                          checked={selectedIds.includes(contact.id)}
                          onCheckedChange={() => toggleOne(contact.id)}
                          aria-label={`Select ${contact.first_name} ${contact.last_name}`}
                        />
                      </TableCell>
                      <TableCell className="font-medium">
                        {contact.first_name} {contact.last_name}
                      </TableCell>
                      <TableCell>{contact.phone_number}</TableCell>
                      <TableCell>{contact.email || '-'}</TableCell>
                      <TableCell>{contact.company || '-'}</TableCell>
                      <TableCell>
                        <Badge variant={contact.status === 'active' ? 'default' : 'secondary'}>
                          {contact.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => router.get(`/contacts/${contact.id}`)}
                        >
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} className="py-16 text-center">
                      <div className="flex flex-col items-center gap-4">
                        <div className="bg-muted/40 rounded-2xl p-5">
                          <Users
                            className="size-12 text-muted-foreground/50"
                            strokeWidth={1.5}
                          />
                        </div>
                        <div>
                          <p className="font-semibold text-foreground mb-1">No contacts found</p>
                          <p className="text-sm text-muted-foreground">
                            Try adjusting your search or import contacts from a CSV file.
                          </p>
                        </div>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          )}

          {/* Smart ellipsis pagination */}
          {contacts?.total > contacts?.per_page && (
            <div className="mt-4 flex justify-center gap-2">
              {buildPages(contacts.current_page, contacts.last_page).map((page, idx) =>
                page === '...' ? (
                  <span
                    key={`ellipsis-${idx}`}
                    className="px-2 flex items-center text-muted-foreground"
                  >
                    …
                  </span>
                ) : (
                  <Button
                    key={page}
                    variant={page === contacts.current_page ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => goToPage(page as number)}
                  >
                    {page}
                  </Button>
                ),
              )}
            </div>
          )}
        </Card>
      </div>

      {/* Floating bulk action bar */}
      {selectedIds.length > 0 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 bg-foreground text-background rounded-full px-5 py-3 shadow-2xl animate-fade-in">
          <span className="text-sm font-medium">{selectedIds.length} selected</span>
          <div className="w-px h-4 bg-background/20" />
          <button
            onClick={() => setSelectedIds([])}
            className="text-sm opacity-60 hover:opacity-100 transition-opacity"
          >
            Cancel
          </button>
        </div>
      )}

      <ImportModal
        open={importModalOpen}
        onClose={() => setImportModalOpen(false)}
        tags={tags}
        lists={lists}
      />

      <PhoneValidationModal
        open={validationModalOpen}
        onClose={() => setValidationModalOpen(false)}
        onValidate={() => {
          toast.success('Phone numbers validated successfully');
        }}
      />
    </AppLayout>
  );
}

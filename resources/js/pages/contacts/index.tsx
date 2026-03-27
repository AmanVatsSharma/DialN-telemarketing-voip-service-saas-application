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
import { Search, Plus, Upload, CheckCircle } from 'lucide-react';
import { useState } from 'react';
import { PageHelp } from '@/components/page-help';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import Heading from '@/components/heading';
import { ImportModal } from '@/components/contacts/import-modal';
import { PhoneValidationModal } from '@/components/contacts/phone-validation-modal';

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

export default function ContactsIndex({ contacts, tags = [], lists = [], filters = {} }: Props) {
  const [search, setSearch] = useState(filters.search || '');
  const [importModalOpen, setImportModalOpen] = useState(false);
  const [validationModalOpen, setValidationModalOpen] = useState(false);

  const handleSearch = () => {
    router.get('/contacts', { search }, { preserveState: true });
  };

  const breadcrumbs: BreadcrumbItem[] = [
    {
      title: 'Dashboard',
      href: dashboard().url,
    },
    {
      title: 'Contacts',
      href: '/contacts',
    },
  ];

  const helpSections = [
    {
      title: 'Contact Management',
      content: 'Manage all your contacts in one place. Add contacts individually, import in bulk from CSV files, and organize them into contact lists for campaigns.',
    },
    {
      title: 'Adding Contacts',
      content: 'Click "Add Contact" to manually create a single contact, or use "Import" to upload multiple contacts from a CSV file.',
    },
    {
      title: 'Contact Information',
      content: 'Each contact can have first name, last name, phone number (required), email, company, and tags for organization.',
    },
    {
      title: 'Contact Status',
      content: 'Active: Available for calling. Inactive: Excluded from campaigns. DNC (Do Not Call): Permanently excluded from all calls.',
    },
    {
      title: 'Search and Filter',
      content: 'Search by name, phone number, email, or company. Use filters to view contacts by status or tags.',
    },
    {
      title: 'Bulk Actions',
      content: 'Select multiple contacts to perform bulk operations like adding to contact lists, changing status, or exporting.',
    },
  ];

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
          <div className="flex gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search contacts..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                  className="pl-10"
                />
              </div>
            </div>
            <Button onClick={handleSearch}>Search</Button>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Company</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {contacts?.data?.length > 0 ? (
                contacts.data.map((contact) => (
                  <TableRow key={contact.id}>
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
                  <TableCell colSpan={6} className="text-center py-8">
                    No contacts found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>

          {contacts?.total > contacts?.per_page && (
            <div className="mt-4 flex justify-center gap-2">
              {Array.from({ length: contacts.last_page }, (_, i) => i + 1).map((page) => (
                <Button
                  key={page}
                  variant={page === contacts.current_page ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => router.get('/contacts', { page, search })}
                >
                  {page}
                </Button>
              ))}
            </div>
          )}
        </Card>
      </div>

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
          // Optionally refresh contacts list after validation
          // router.reload({ only: ['contacts'] });
        }}
      />
    </AppLayout>
  );
}
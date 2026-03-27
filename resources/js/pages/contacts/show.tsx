import { Head, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Edit, Phone, Mail, Building } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { PageHelp } from '@/components/page-help';
import { ContactQualityChecker } from '@/components/contacts/contact-quality-checker';
import { BreadcrumbItem } from '@/types';

interface Contact {
  id: number;
  first_name: string;
  last_name: string;
  phone_number: string;
  email?: string;
  company?: string;
  notes?: string;
  status: string;
  created_at: string;
}

interface Call {
  id: number;
  direction: string;
  status: string;
  duration: number;
  created_at: string;
}

interface Props {
  contact: Contact;
  recentCalls?: Call[];
}

export default function ContactShow({ contact, recentCalls = [] }: Props) {
  const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Contacts', href: '/contacts' },
    { title: `${contact.first_name} ${contact.last_name}`, href: `/contacts/${contact.id}` },
  ];

  const helpSections = [
    {
      title: 'Contact Details Overview',
      content: 'This page displays comprehensive information about a specific contact, including their personal details, contact information, and call history.',
    },
    {
      title: 'Contact Information',
      content: 'View the contact\'s phone number, email address, and company name. You can quickly identify the best way to reach out to this contact.',
    },
    {
      title: 'Recent Calls',
      content: 'See a list of recent calls with this contact, including the date & time, direction (inbound/outbound), status, and duration of each call.',
    },
    {
      title: 'Editing Contact',
      content: 'Click the "Edit" button in the top-right corner to modify the contact\'s information, update their details, or add notes.',
    },
    {
      title: 'Call History',
      content: 'Click "View" on any call in the Recent Calls table to see detailed information about that specific call, including recordings and transcripts if available.',
    },
    {
      title: 'Navigation',
      content: 'Use the "Back" button to return to the contacts list, or use the breadcrumb navigation at the top of the page to navigate to other sections.',
    },
  ];

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title={`${contact.first_name} ${contact.last_name}`} />

      <div className="mx-auto max-w-7xl space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">{contact.first_name} {contact.last_name}</h1>
            <p className="text-muted-foreground">Contact details</p>
          </div>
          <div className="flex gap-2">
            <PageHelp title="Contact Details Help" sections={helpSections} />
            <Button variant="outline" onClick={() => router.get('/contacts')}>
              Back
            </Button>
            <Button variant="outline" onClick={() => router.get(`/contacts/${contact.id}/edit`)}>
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </Button>
          </div>
        </div>

        <Card className="p-6">
          <div className="grid gap-6 md:grid-cols-3">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary/10 rounded-lg">
                <Phone className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Phone</p>
                <p className="font-medium">{contact.phone_number}</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-500/10 rounded-lg">
                <Mail className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Email</p>
                <p className="font-medium">{contact.email || 'N/A'}</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-500/10 rounded-lg">
                <Building className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Company</p>
                <p className="font-medium">{contact.company || 'N/A'}</p>
              </div>
            </div>
          </div>

          {contact.notes && (
            <div className="mt-6">
              <h3 className="font-semibold mb-2">Notes</h3>
              <p className="text-muted-foreground">{contact.notes}</p>
            </div>
          )}
        </Card>

        {/* AI Data Quality Check */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">AI Data Quality Check</h2>
          <p className="text-sm text-muted-foreground mb-4">
            Use AI to analyze and improve the quality of this contact's data. Get suggestions for formatting, missing fields, and potential duplicates.
          </p>
          <ContactQualityChecker
            contactId={contact.id}
            contactData={{
              phone_number: contact.phone_number,
              first_name: contact.first_name,
              last_name: contact.last_name,
              email: contact.email,
              company: contact.company,
            }}
            onApply={() => router.reload({ only: ['contact'] })}
          />
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Recent Calls</h2>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date & Time</TableHead>
                <TableHead>Direction</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentCalls.length > 0 ? (
                recentCalls.map((call) => (
                  <TableRow key={call.id}>
                    <TableCell>{new Date(call.created_at).toLocaleString()}</TableCell>
                    <TableCell>
                      <Badge variant={call.direction === 'outbound' ? 'default' : 'secondary'}>
                        {call.direction}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={call.status === 'completed' ? 'default' : 'secondary'}>
                        {call.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{call.duration}s</TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => router.get(`/calls/${call.id}`)}
                      >
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8">
                    No calls yet
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </Card>
      </div>
    </AppLayout>
  );
}

import AppLayout from '@/layouts/app-layout';
import Heading from '@/components/heading';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Head, Link, router } from '@inertiajs/react';
import { Plus, Users, Eye, Trash2 } from 'lucide-react';
import { PageHelp } from '@/components/page-help';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface ContactList {
    id: number;
    name: string;
    description: string;
    contacts_count: number;
    created_at: string;
}

interface Props {
    lists: ContactList[];
}

export default function Index({ lists = [] }: Props) {
    const listArray = Array.isArray(lists) ? lists : [];

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Dashboard',
            href: dashboard().url,
        },
        {
            title: 'Contact Lists',
            href: '/contact-lists',
        },
    ];

    const helpSections = [
        {
            title: 'Contact Lists Overview',
            content: 'Contact lists are groups of contacts organized for specific campaigns. Create lists to segment your contacts by campaign type, region, interest, or any criteria that suits your needs.',
        },
        {
            title: 'Creating Lists',
            content: 'Click "Create List" to make a new contact list. Give it a descriptive name and description to identify its purpose.',
        },
        {
            title: 'Adding Contacts to Lists',
            content: 'After creating a list, add contacts from your main contact database. You can import contacts directly into a list or select existing contacts to add.',
        },
        {
            title: 'Using Lists in Campaigns',
            content: 'When creating a campaign, select which contact list(s) to call. Each campaign can target one or more contact lists.',
        },
        {
            title: 'List Management',
            content: 'View list details to see all contacts, edit list information, or remove contacts. The contact count shows how many contacts are in each list.',
        },
    ];

    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this contact list?')) {
            router.delete(`/contact-lists/${id}`);
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Contact Lists" />

            <div className="mx-auto max-w-7xl space-y-6">
                <div className="flex items-center justify-between">
                    <Heading
                        title="Contact Lists"
                        description="Manage your contact lists and segments"
                    />
                    <div className="flex items-center gap-2">
                        <PageHelp title="Contact Lists Help" sections={helpSections} />
                        <Button asChild>
                            <Link href="/contact-lists/create">
                                <Plus className="mr-2 h-4 w-4" />
                                Create List
                            </Link>
                        </Button>
                    </div>
                </div>

                <Card className="p-6">
                    {listArray.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-12">
                            <Users className="h-12 w-12 text-muted-foreground mb-4" />
                            <p className="text-lg font-medium">No contact lists found</p>
                            <p className="text-sm text-muted-foreground mb-4">
                                Create your first contact list to organize your contacts
                            </p>
                            <Button asChild>
                                <Link href="/contact-lists/create">
                                    <Plus className="mr-2 h-4 w-4" />
                                    Create List
                                </Link>
                            </Button>
                        </div>
                    ) : (
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Description</TableHead>
                                    <TableHead className="text-center">Contacts</TableHead>
                                    <TableHead>Created</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {listArray.map((list) => (
                                    <TableRow key={list.id}>
                                        <TableCell className="font-medium">{list.name}</TableCell>
                                        <TableCell className="text-muted-foreground max-w-md truncate">
                                            {list.description || '-'}
                                        </TableCell>
                                        <TableCell className="text-center">
                                            <Badge variant="secondary">
                                                {Number(list.contacts_count || 0)}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-muted-foreground">
                                            {new Date(list.created_at).toLocaleDateString()}
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <Button variant="outline" size="sm" asChild>
                                                    <Link href={`/contact-lists/${list.id}`}>
                                                        <Eye className="mr-2 h-4 w-4" />
                                                        View
                                                    </Link>
                                                </Button>
                                                <Button 
                                                    variant="outline" 
                                                    size="sm"
                                                    onClick={() => handleDelete(list.id)}
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    )}
                </Card>
            </div>
        </AppLayout>
    );
}

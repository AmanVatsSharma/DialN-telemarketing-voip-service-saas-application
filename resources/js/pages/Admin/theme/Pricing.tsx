import AppLayout from '@/layouts/app-layout';
import Heading from '@/components/heading';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Head, useForm, router } from '@inertiajs/react';
import { Plus, Trash2 } from 'lucide-react';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { useState } from 'react';

interface PricingTier {
    id: number;
    credits: number;
    price: number;
    per_credit: number;
    popular: boolean;
    icon: string | null;
    savings: string | null;
    order: number;
    is_active: boolean;
}

interface PricingProps {
    pricing: PricingTier[];
}

export default function Pricing({ pricing = [] }: PricingProps) {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: dashboard().url },
        { title: 'Theme', href: '/admin/theme' },
        { title: 'Pricing', href: '/admin/theme/pricing' },
    ];

    const [showNewForm, setShowNewForm] = useState(false);

    const newForm = useForm({
        credits: '',
        price: '',
        per_credit: '',
        popular: false,
        icon: '',
        savings: '',
        order: pricing.length + 1,
        is_active: true,
    });

    const handleCreate = (e: React.FormEvent) => {
        e.preventDefault();
        newForm.post('/admin/theme/pricing', {
            onSuccess: () => {
                newForm.reset();
                setShowNewForm(false);
            },
        });
    };

    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this pricing tier?')) {
            router.delete(`/admin/theme/pricing/${id}`);
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Pricing Section" />

            <div className="mx-auto max-w-7xl space-y-6">
                <div className="flex items-center justify-between">
                    <Heading
                        title="Pricing Section"
                        description="Manage pricing tiers displayed on your site"
                    />
                    <Button onClick={() => setShowNewForm(!showNewForm)}>
                        <Plus className="mr-2 h-4 w-4" />
                        Add Pricing Tier
                    </Button>
                </div>

                {showNewForm && (
                    <Card>
                        <CardContent className="pt-6">
                            <form onSubmit={handleCreate} className="space-y-4">
                                <div className="grid gap-4 md:grid-cols-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="credits">Credits *</Label>
                                        <Input
                                            id="credits"
                                            type="text"
                                            value={newForm.data.credits}
                                            onChange={(e) => newForm.setData('credits', e.target.value)}
                                            placeholder="100"
                                        />
                                        {newForm.errors.credits && (
                                            <p className="text-sm text-red-600">{newForm.errors.credits}</p>
                                        )}
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="price">Price *</Label>
                                        <Input
                                            id="price"
                                            type="text"
                                            value={newForm.data.price}
                                            onChange={(e) => newForm.setData('price', e.target.value)}
                                            placeholder="$10"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="per_credit">Per Credit *</Label>
                                        <Input
                                            id="per_credit"
                                            type="text"
                                            value={newForm.data.per_credit}
                                            onChange={(e) => newForm.setData('per_credit', e.target.value)}
                                            placeholder="$0.10"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="icon">Icon</Label>
                                        <Input
                                            id="icon"
                                            value={newForm.data.icon}
                                            onChange={(e) => newForm.setData('icon', e.target.value)}
                                            placeholder="💎"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="savings">Savings Text</Label>
                                    <Input
                                        id="savings"
                                        value={newForm.data.savings}
                                        onChange={(e) => newForm.setData('savings', e.target.value)}
                                        placeholder="Save 20%"
                                    />
                                </div>
                                <div className="flex justify-end gap-2">
                                    <Button type="button" variant="outline" onClick={() => setShowNewForm(false)}>
                                        Cancel
                                    </Button>
                                    <Button type="submit" disabled={newForm.processing}>
                                        {newForm.processing ? 'Creating...' : 'Create Pricing Tier'}
                                    </Button>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                )}

                <Card>
                    <CardContent className="pt-6">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Icon</TableHead>
                                    <TableHead>Credits</TableHead>
                                    <TableHead>Price</TableHead>
                                    <TableHead>Per Credit</TableHead>
                                    <TableHead>Savings</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {pricing.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={7} className="text-center text-muted-foreground">
                                            No pricing tiers yet. Click "Add Pricing Tier" to create one.
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    pricing.map((tier) => (
                                        <TableRow key={tier.id}>
                                            <TableCell className="text-2xl">{tier.icon}</TableCell>
                                            <TableCell className="font-semibold">{tier.credits}</TableCell>
                                            <TableCell>${tier.price}</TableCell>
                                            <TableCell>${tier.per_credit}</TableCell>
                                            <TableCell>{tier.savings || '-'}</TableCell>
                                            <TableCell>
                                                <div className="flex gap-2">
                                                    <Badge variant={tier.is_active ? 'default' : 'secondary'}>
                                                        {tier.is_active ? 'Active' : 'Inactive'}
                                                    </Badge>
                                                    {tier.popular && <Badge variant="outline">Popular</Badge>}
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => handleDelete(tier.id)}
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}

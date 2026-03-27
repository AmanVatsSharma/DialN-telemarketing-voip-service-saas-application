import AppLayout from '@/layouts/app-layout';
import Heading from '@/components/heading';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Head } from '@inertiajs/react';
import { DollarSign, TrendingUp, Activity } from 'lucide-react';

interface Props {
    totalRevenue: number;
    totalCost: number;
    totalProfit: number;
    profitMargin: number;
}

export default function ProfitDashboard({ 
    totalRevenue = 0, 
    totalCost = 0, 
    totalProfit = 0, 
    profitMargin = 0 
}: Props) {
    return (
        <AppLayout>
            <Head title="Profit Dashboard" />

            <div className="space-y-6">
                <Heading
                    title="Profit Dashboard"
                    description="Overview of revenue, costs, and profit margins"
                />

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                            <DollarSign className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-green-600">
                                ${Number(totalRevenue).toFixed(2)}
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Cost</CardTitle>
                            <Activity className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-red-600">
                                ${Number(totalCost).toFixed(2)}
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Profit</CardTitle>
                            <TrendingUp className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-blue-600">
                                ${Number(totalProfit).toFixed(2)}
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Profit Margin</CardTitle>
                            <TrendingUp className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {Number(profitMargin).toFixed(2)}%
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Profit Analytics</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">
                            Detailed profit analytics and trends will be displayed here.
                        </p>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}

import AppLayout from '@/layouts/app-layout';
import Heading from '@/components/heading';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Head } from '@inertiajs/react';
import { TrendingUp, Users, CreditCard, Activity } from 'lucide-react';

interface UserStats {
    total_users: number;
    active_users: number;
    total_credits: number;
    avg_credits_per_user: number;
}

interface MonthlyData {
    month: string;
    credits_purchased: number;
    credits_spent: number;
}

interface Props {
    userStats: UserStats;
    monthlyData: MonthlyData[];
}

export default function Reports({ 
    userStats = { total_users: 0, active_users: 0, total_credits: 0, avg_credits_per_user: 0 },
    monthlyData = []
}: Props) {
    const stats = userStats || { total_users: 0, active_users: 0, total_credits: 0, avg_credits_per_user: 0 };
    const monthly = Array.isArray(monthlyData) ? monthlyData : [];

    return (
        <AppLayout>
            <Head title="Credit Reports" />

            <div className="space-y-6">
                <Heading
                    title="Credit Reports"
                    description="Comprehensive credit usage and statistics"
                />

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                            <Users className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.total_users}</div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
                            <Activity className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-green-600">
                                {stats.active_users}
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Credits</CardTitle>
                            <CreditCard className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                ${Number(stats.total_credits).toFixed(2)}
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Avg Per User</CardTitle>
                            <TrendingUp className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                ${Number(stats.avg_credits_per_user).toFixed(2)}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Monthly Credit Activity</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {monthly.length === 0 ? (
                            <p className="text-muted-foreground">No monthly data available.</p>
                        ) : (
                            <div className="space-y-4">
                                {monthly.map((data, index) => (
                                    <div 
                                        key={index}
                                        className="flex items-center justify-between p-4 border rounded-lg"
                                    >
                                        <div>
                                            <p className="font-medium">{data.month}</p>
                                        </div>
                                        <div className="flex gap-8">
                                            <div className="text-right">
                                                <p className="text-sm text-muted-foreground">Purchased</p>
                                                <p className="font-bold text-green-600">
                                                    ${Number(data.credits_purchased).toFixed(2)}
                                                </p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-sm text-muted-foreground">Spent</p>
                                                <p className="font-bold text-red-600">
                                                    ${Number(data.credits_spent).toFixed(2)}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}

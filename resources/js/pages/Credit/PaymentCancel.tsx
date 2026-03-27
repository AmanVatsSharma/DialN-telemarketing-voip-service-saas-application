import Heading from '@/components/heading';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Head, Link } from '@inertiajs/react';
import { XCircle, ArrowRight } from 'lucide-react';

export default function PaymentCancel() {
    return (
        <>
            <Head title="Payment Cancelled" />

            <div className="flex min-h-[60vh] items-center justify-center">
                <Card className="max-w-md">
                    <CardHeader className="text-center">
                        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
                            <XCircle className="h-10 w-10 text-red-600" />
                        </div>
                        <CardTitle className="text-2xl">Payment Cancelled</CardTitle>
                        <CardDescription>
                            Your payment was cancelled. No charges were made to your account.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex flex-col gap-2">
                            <Button asChild className="w-full">
                                <Link href="/credit/top-up">
                                    Try Again
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </Link>
                            </Button>
                            <Button variant="outline" asChild className="w-full">
                                <Link href="/dashboard">Go to Dashboard</Link>
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </>
    );
}

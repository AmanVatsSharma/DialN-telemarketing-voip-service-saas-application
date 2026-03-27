import Heading from '@/components/heading';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Head, Link } from '@inertiajs/react';
import { CheckCircle2, ArrowRight } from 'lucide-react';

interface Props {
    amount: number;
    transactionId?: string;
    paymentId?: string;
    gateway?: string;
}

export default function PaymentSuccess({ amount = 0, transactionId, paymentId, gateway }: Props) {
    return (
        <>
            <Head title="Payment Successful" />

            <div className="flex min-h-[60vh] items-center justify-center">
                <Card className="max-w-md">
                    <CardHeader className="text-center">
                        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                            <CheckCircle2 className="h-10 w-10 text-green-600" />
                        </div>
                        <CardTitle className="text-2xl">Payment Successful!</CardTitle>
                        <CardDescription>
                            Your account has been credited with ${Number(amount).toFixed(2)}
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {transactionId && (
                            <div className="rounded-lg bg-muted p-4 text-center">
                                <p className="text-sm text-muted-foreground">Transaction ID</p>
                                <p className="font-mono text-sm font-medium">{transactionId}</p>
                            </div>
                        )}
                        {paymentId && (
                            <div className="rounded-lg bg-muted p-4 text-center">
                                <p className="text-sm text-muted-foreground">{gateway === 'razorpay' ? 'Razorpay' : 'Stripe'} Payment ID</p>
                                <p className="font-mono text-sm font-medium break-all">{paymentId}</p>
                            </div>
                        )}
                        
                        <div className="flex flex-col gap-2">
                            <Button asChild className="w-full">
                                <Link href="/credit">
                                    View Credits
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

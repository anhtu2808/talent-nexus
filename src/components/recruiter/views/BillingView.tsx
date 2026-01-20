import { CreditCard, Sparkles, TrendingUp, History } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const BillingView = () => {
    // Mock data
    const aiCredits = 850;
    const pendingPayment = 2500000;
    const nextBillingDate = "Feb 01, 2026";

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-bold tracking-tight">Billing & AI Credits</h2>
                <p className="text-muted-foreground">Manage your payment status and AI feature usage</p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                {/* AI Credits Card */}
                <Card className="border-indigo-100 shadow-sm relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-10">
                        <Sparkles className="h-24 w-24 text-indigo-600" />
                    </div>
                    <CardHeader>
                        <CardTitle className="text-indigo-600 flex items-center gap-2">
                            <Sparkles className="h-5 w-5" />
                            AI Credits
                        </CardTitle>
                        <CardDescription>Use credits for AI-powered candidate matching & analysis</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="mt-2">
                            <span className="text-4xl font-bold text-indigo-900">{aiCredits}</span>
                            <span className="text-muted-foreground ml-2">credits available</span>
                        </div>
                        <div className="mt-4 w-full bg-slate-100 rounded-full h-2.5">
                            <div className="bg-gradient-to-r from-indigo-500 to-purple-500 h-2.5 rounded-full" style={{ width: '65%' }}></div>
                        </div>
                        <p className="text-xs text-muted-foreground mt-2">65% used this month</p>
                    </CardContent>
                    <CardFooter>
                        <Button className="w-full bg-indigo-600 hover:bg-indigo-700">Top Up Credits</Button>
                    </CardFooter>
                </Card>

                {/* Billing Summary Card */}
                <Card className="border-slate-100 shadow-sm">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <CreditCard className="h-5 w-5" />
                            Current Billing
                        </CardTitle>
                        <CardDescription>Next invoice due on {nextBillingDate}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="mt-2">
                            <span className="text-4xl font-bold">{pendingPayment.toLocaleString('vi-VN')} ₫</span>
                            <span className="text-muted-foreground ml-2">pending</span>
                        </div>
                        <div className="mt-6 flex flex-col space-y-2">
                            <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">Plan Subscription</span>
                                <span className="font-medium">2,000,000 ₫</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">AI Credit Refill (500)</span>
                                <span className="font-medium">500,000 ₫</span>
                            </div>
                            <div className="border-t pt-2 mt-2 flex justify-between font-bold">
                                <span>Total</span>
                                <span>2,500,000 ₫</span>
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button variant="outline" className="w-full">View Invoices</Button>
                    </CardFooter>
                </Card>
            </div>

            {/* Credit Usage History (Placeholder) */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                        <History className="h-5 w-5 text-muted-foreground" />
                        Credit Usage History
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {[
                            { action: "CV Analysis (Batch 10)", date: "Today, 10:23 AM", amount: -10 },
                            { action: "Smart Matching - Senior Dev", date: "Yesterday, 2:45 PM", amount: -25 },
                            { action: "Credit Top-up", date: "Jan 15, 2026", amount: +500, type: 'credit' }
                        ].map((item, i) => (
                            <div key={i} className="flex justify-between items-center py-2 border-b last:border-0">
                                <div>
                                    <p className="font-medium">{item.action}</p>
                                    <p className="text-xs text-muted-foreground">{item.date}</p>
                                </div>
                                <div className={item.amount > 0 ? "text-green-600 font-bold" : "text-slate-600"}>
                                    {item.amount > 0 ? '+' : ''}{item.amount}
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default BillingView;

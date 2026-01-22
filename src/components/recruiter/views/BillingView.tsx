import { CreditCard, Sparkles, Check, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const BillingView = () => {
    // Mock data
    const aiCredits = 850;
    const maxCredits = 1000; // Assuming a max for the progress bar
    const creditPercentage = (aiCredits / maxCredits) * 100;

    const basePrice = 2000000;

    // Package definitions
    const packages = [
        {
            duration: "1 Month",
            price: basePrice,
            label: "Monthly",
            description: "Flexible, short-term commitment",
            features: [
                "Full Access to Talent Pool",
                "Unlimited Job Postings",
                "AI Candidate Matching",
                "Priority Support",
                "Advanced Analytics"
            ]
        },
        {
            duration: "3 Months",
            price: basePrice * 3 * 0.95, // 5% discount for example, or just flat. Let's keep it simple or slightly discounted.
            label: "Quarterly",
            description: "Perfect for seasonal hiring",
            features: [
                "Full Access to Talent Pool",
                "Unlimited Job Postings",
                "AI Candidate Matching",
                "Priority Support",
                "Advanced Analytics"
            ],
            // highlight: true
        },
        {
            duration: "6 Months",
            price: basePrice * 6 * 0.90, // 10% discount
            label: "Biannual",
            description: "Great value for growing teams",
            features: [
                "Full Access to Talent Pool",
                "Unlimited Job Postings",
                "AI Candidate Matching",
                "Priority Support",
                "Advanced Analytics"
            ]
        },
        {
            duration: "12 Months",
            price: basePrice * 12 * 0.85, // 15% discount
            label: "Annual",
            description: "Best ROI for long-term hiring",
            features: [
                "Full Access to Talent Pool",
                "Unlimited Job Postings",
                "AI Candidate Matching",
                "Priority Support",
                "Advanced Analytics"
            ]
        }
    ];

    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-2xl font-bold tracking-tight">Plans & credits</h2>
                <p className="text-muted-foreground">Manage your subscription plan and credit balance.</p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                {/* Current Plan Card */}
                <Card className="bg-slate-50 border-slate-200">
                    <CardHeader>
                        <div className="mb-2">
                            <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                                <Zap className="h-6 w-6 text-white" />
                            </div>
                        </div>
                        <CardTitle className="text-xl">You're on Free Plan</CardTitle>
                        <CardDescription>Upgrade to unlock full features</CardDescription>
                    </CardHeader>
                    <CardFooter>
                        <Button variant="outline" className="bg-white">Manage Subscription</Button>
                    </CardFooter>
                </Card>

                {/* Credits Card */}
                <Card className="bg-slate-50 border-slate-200">
                    <CardHeader className="pb-2">
                        <div className="flex justify-between items-center">
                            <CardTitle className="text-xl">Credits remaining</CardTitle>
                            <span className="text-sm font-medium text-muted-foreground">{aiCredits} of {maxCredits}</span>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="w-full bg-slate-200 rounded-full h-3 mb-4">
                            <div
                                className="bg-blue-700 h-3 rounded-full transition-all duration-500"
                                style={{ width: `${Math.min(creditPercentage, 100)}%` }}
                            ></div>
                        </div>
                        <div className="flex flex-col gap-1 text-sm text-slate-600">
                            <div className="flex items-center gap-2">
                                <span className="text-slate-400">×</span> No credits will rollover
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-blue-600">•</span> Daily credits reset at midnight UTC
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700">Top Up Credits</Button>
                    </CardFooter>
                </Card>
            </div>

            {/* Packages Grid */}
            <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
                {packages.map((pkg, index) => (
                    <Card key={index} className={`flex flex-col ${index === 3 ? 'border-primary/50 ring-1 ring-primary/20' : ''}`}>
                        <CardHeader>
                            <CardTitle className="text-xl">{pkg.duration}</CardTitle>
                            <CardDescription className="min-h-[40px]">{pkg.description}</CardDescription>
                            <div className="mt-4">
                                <span className="text-3xl font-bold">{pkg.price.toLocaleString('vi-VN')}</span>
                                <span className="text-muted-foreground text-sm"> ₫</span>
                            </div>
                        </CardHeader>
                        <CardContent className="flex-1">
                            <Button className="w-full mb-6" variant={index === 3 ? "default" : "outline"}>
                                Choose Plan
                            </Button>
                            <div className="space-y-3">
                                {pkg.features.map((feature, idx) => (
                                    <div key={idx} className="flex items-start gap-2 text-sm">
                                        <Check className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                                        <span>{feature}</span>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default BillingView;

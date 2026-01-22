import { useState } from 'react';
import { CreditCard, Zap, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { Recruiter } from '@/types';
import { format } from 'date-fns';

const BillingView = () => {
    const { user, updateUser } = useAuth();
    const recruiterUser = user as Recruiter;

    // Mock data
    const aiCredits = 850;
    const maxCredits = 1000;
    const creditPercentage = (aiCredits / maxCredits) * 100;

    const basePrice = 2000000;
    const creditPrice = 1000; // 1 credit = 1000 VND

    // State for modals and inputs
    const [isTopUpOpen, setIsTopUpOpen] = useState(false);
    const [topUpAmount, setTopUpAmount] = useState<number>(100);

    const packages = [
        {
            duration: "1 Month",
            durationMonths: 1,
            price: basePrice,
            label: "Monthly",
            description: "Flexible, short-term commitment",
            features: [
                "Full management of job listings: post, close, edit",
                "Manage applications: view CVs, change candidate status",
                "Access AI features: matching score, proposed CV"
            ]
        },
        {
            duration: "3 Months",
            durationMonths: 3,
            price: basePrice * 3 * 0.95,
            label: "Quarterly",
            description: "Perfect for seasonal hiring",
            features: [
                "Full management of job listings: post, close, edit",
                "Manage applications: view CVs, change candidate status",
                "Access AI features: matching score, proposed CV"
            ]
        },
        {
            duration: "6 Months",
            durationMonths: 6,
            price: basePrice * 6 * 0.90,
            label: "Biannual",
            description: "Great value for growing teams",
            features: [
                "Full management of job listings: post, close, edit",
                "Manage applications: view CVs, change candidate status",
                "Access AI features: matching score, proposed CV"
            ]
        },
        {
            duration: "12 Months",
            durationMonths: 12,
            price: basePrice * 12 * 0.85,
            label: "Annual",
            description: "Best ROI for long-term hiring",
            features: [
                "Full management of job listings: post, close, edit",
                "Manage applications: view CVs, change candidate status",
                "Access AI features: matching score, proposed CV"
            ]
        }
    ];

    const handleTopUpConfirm = () => {
        // Logic to process payment would go here
        alert(`Successfully topped up ${topUpAmount} credits for ${(topUpAmount * creditPrice).toLocaleString('vi-VN')} ₫`);
        setIsTopUpOpen(false);
    };

    const handleChoosePlan = (pkg: typeof packages[0]) => {
        const now = new Date();
        const expiresAt = new Date(now.setMonth(now.getMonth() + pkg.durationMonths));

        // Update user state
        updateUser({
            hasPurchasedPackage: true,
            currentPlan: pkg.label,
            planExpiresAt: expiresAt
        } as any);

        alert(`You have successfully subscribed to the ${pkg.label} plan.`);
    };

    const currentPlanName = recruiterUser?.currentPlan || "Free Plan";
    const expiryDate = recruiterUser?.planExpiresAt ? format(new Date(recruiterUser.planExpiresAt), 'dd/MM/yyyy') : null;

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
                        <CardTitle className="text-xl">
                            {recruiterUser?.hasPurchasedPackage ? (
                                <>You're on {currentPlanName}</>
                            ) : (
                                "You're on Free Plan"
                            )}
                        </CardTitle>
                        <CardDescription>
                            {expiryDate ? (
                                <>Expires on {expiryDate}</>
                            ) : (
                                "Upgrade to unlock full features"
                            )}
                        </CardDescription>
                    </CardHeader>
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
                        <Button
                            className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700"
                            onClick={() => setIsTopUpOpen(true)}
                        >
                            Top Up Credits
                        </Button>
                    </CardFooter>
                </Card>
            </div>

            {/* Packages Grid */}
            <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
                {packages.map((pkg, index) => (
                    <Card key={index} className={`flex flex-col ${recruiterUser?.currentPlan === pkg.label ? 'border-primary ring-2 ring-primary/20' : ''}`}>
                        <CardHeader>
                            <CardTitle className="text-xl">{pkg.duration}</CardTitle>
                            <CardDescription className="min-h-[40px]">{pkg.description}</CardDescription>
                            <div className="mt-4">
                                <span className="text-3xl font-bold">{pkg.price.toLocaleString('vi-VN')}</span>
                                <span className="text-muted-foreground text-sm"> ₫</span>
                            </div>
                        </CardHeader>
                        <CardContent className="flex-1">
                            <Button
                                className="w-full mb-6"
                                variant={recruiterUser?.currentPlan === pkg.label ? "secondary" : "default"}
                                onClick={() => handleChoosePlan(pkg)}
                                disabled={recruiterUser?.currentPlan === pkg.label}
                            >
                                {recruiterUser?.currentPlan === pkg.label ? "Current Plan" : "Choose Plan"}
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

            {/* Top Up Modal */}
            <Dialog open={isTopUpOpen} onOpenChange={setIsTopUpOpen}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Top Up AI Credits</DialogTitle>
                        <DialogDescription>
                            Purchase additional credits for AI features. 1 Credit = 1.000 ₫
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="amount" className="text-right">
                                Amount
                            </Label>
                            <Input
                                id="amount"
                                type="number"
                                value={topUpAmount}
                                onChange={(e) => setTopUpAmount(Number(e.target.value))}
                                className="col-span-3"
                                min={10}
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label className="text-right">Total Price</Label>
                            <div className="col-span-3 font-semibold text-lg">
                                {(topUpAmount * creditPrice).toLocaleString('vi-VN')} ₫
                            </div>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="submit" onClick={handleTopUpConfirm}>Confirm Purchase</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default BillingView;

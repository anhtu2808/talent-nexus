import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '@/components/layout/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { initialPlans } from '@/data/pricingPlans';
import { Check, Users, ArrowRight } from 'lucide-react';
import { PricingPlan } from '@/types';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

const PackageSelection = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { hrAccountCount, email } = location.state || { hrAccountCount: 1, email: '' };

    const [selectedPlanId, setSelectedPlanId] = useState<number | null>(null);

    // Filter for Recruiter Seat Plans
    const seatPlans = initialPlans.filter(
        plan => plan.target === 'recruiter' && plan.recruiterPlanType === 'seat'
    );

    const formatCurrency = (val: number) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(val);
    };

    const handleSelectPlan = (planId: number) => {
        setSelectedPlanId(planId);
    };

    const handleContinue = () => {
        if (!selectedPlanId) return;

        // Mock API call for assigning plan
        toast.success('Registration completed successfully! Plan assigned.');
        navigate('/recruiter/pending-approval');
    };

    const getPriceCalculation = (plan: PricingPlan) => {
        const total = plan.salePrice * hrAccountCount;
        return { total };
    };

    return (
        <div className="min-h-screen flex flex-col bg-slate-50">
            <Header />
            <main className="flex-1 container mx-auto py-12 px-4">
                <div className="text-center mb-12">
                    <h1 className="text-3xl font-bold text-slate-900 mb-4">Choose Your Plan</h1>
                    <p className="text-slate-600 max-w-3xl mx-auto whitespace-nowrap">
                        Select the plan that best fits your recruitment needs.
                        You are registering for <span className="font-bold text-slate-900">{hrAccountCount} HR Account(s)</span>.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {seatPlans.map((plan) => {
                        const { total } = getPriceCalculation(plan);
                        const isSelected = selectedPlanId === plan.id;

                        return (
                            <Card
                                key={plan.id}
                                className={`relative flex flex-col transition-all duration-200 cursor-pointer hover:shadow-lg border-2 ${isSelected ? 'border-primary ring-2 ring-primary/20 shadow-xl scale-[1.02]' : 'border-transparent hover:border-slate-200'
                                    }`}
                                onClick={() => handleSelectPlan(plan.id)}
                            >
                                {isSelected && (
                                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-white px-3 py-1 rounded-full text-xs font-bold shadow-sm flex items-center gap-1">
                                        <Check size={12} /> Selected
                                    </div>
                                )}

                                <CardHeader className="text-center pb-2">
                                    <Badge variant="outline" className="w-fit mx-auto mb-4 border-slate-200 font-normal text-slate-500">
                                        {plan.duration === 30 ? 'Monthly' : `${Math.round(plan.duration / 30)} Months`}
                                    </Badge>
                                    <CardTitle className="text-xl font-bold">{plan.name.replace("Standard Seat License", "").replace(/\(.*\)/, "").trim() || "Standard"}</CardTitle>
                                    <CardDescription className="h-auto mt-2 min-h-[40px]">
                                        {plan.description}
                                    </CardDescription>
                                </CardHeader>

                                <CardContent className="flex-1 flex flex-col items-center justify-center py-6 bg-slate-50/50 border-y border-slate-100">
                                    <div className="text-center mb-4">
                                        <p className="text-sm text-slate-500 mb-1">Price per Account</p>
                                        <p className="text-2xl font-bold text-slate-900">{formatCurrency(plan.salePrice)}</p>
                                        <p className="text-xs text-slate-400">for {plan.duration} days</p>
                                    </div>

                                    <div className="w-full h-px bg-slate-200 my-2" />

                                    <div className="text-center mt-2 w-full bg-white p-3 rounded-xl border border-dashed border-slate-200">
                                        <div className="flex items-center justify-center gap-2 text-sm text-slate-600 mb-1">
                                            <Users size={14} />
                                            <span className="font-semibold">{hrAccountCount} Accounts</span>
                                        </div>
                                        <p className="text-left text-xs uppercase text-slate-400 font-bold tracking-widest mb-1 pl-1">Total Payment</p>
                                        <p className="text-2xl font-black text-primary truncate" title={formatCurrency(total)}>
                                            {formatCurrency(total)}
                                        </p>
                                    </div>
                                </CardContent>

                                <CardFooter className="pt-6">
                                    <Button
                                        className={`w-full ${isSelected ? 'bg-primary' : 'bg-slate-900'}`}
                                        variant={isSelected ? 'default' : 'outline'}
                                    >
                                        {isSelected ? 'Confirm Selection' : 'Select Plan'}
                                    </Button>
                                </CardFooter>
                            </Card>
                        );
                    })}
                </div>

                <div className="mt-12 flex justify-center">
                    <Button
                        size="lg"
                        className="px-12 h-14 text-lg shadow-xl shadow-primary/20"
                        disabled={!selectedPlanId}
                        onClick={handleContinue}
                    >
                        Complete Registration <ArrowRight className="ml-2" />
                    </Button>
                </div>
            </main>
        </div>
    );
};

export default PackageSelection;

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, X, Crown } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const UpgradeAccount = () => {
    const navigate = useNavigate();
    const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

    const plans = [
        {
            name: "Free",
            price: "0 đ",
            period: "/ month",
            description: "Essential tools for job seeking",
            features: [
                { name: "Apply to Jobs", included: true },
                { name: "Upload CV", included: true },
                { name: "Basic Job Search", included: true },
                { name: "AI CV Analysis", included: false },
                { name: "Priority Application", included: false },
                { name: "See Who Viewed Profile", included: false },
                { name: "Profile Highlighting", included: false },
            ],
            action: "Current Plan",
            variant: "outline" as const,
        },
        {
            name: "1 Month VIP",
            price: "499,000 đ",
            period: "/ 1 month",
            description: "Boost your visibility and insights",
            features: [
                { name: "Apply to Jobs", included: true },
                { name: "Upload CV", included: true },
                { name: "Basic Job Search", included: true },
                { name: "AI CV Analysis", included: true },
                { name: "Priority Application", included: true },
                { name: "See Who Viewed Profile", included: true },
                { name: "Profile Highlighting", included: true },
            ],
            action: "Upgrade Now",
            variant: "default" as const,
        },
        {
            name: "6 Months VIP",
            price: "2,499,000 đ",
            period: "/ 6 months",
            description: "Save 16% compared to monthly",
            features: [
                { name: "Apply to Jobs", included: true },
                { name: "Upload CV", included: true },
                { name: "Basic Job Search", included: true },
                { name: "AI CV Analysis", included: true },
                { name: "Priority Application", included: true },
                { name: "See Who Viewed Profile", included: true },
                { name: "Profile Highlighting", included: true },
            ],
            action: "Upgrade Now",
            variant: "default" as const,
            popular: true,
            badge: "Popular Choice",
        },
        {
            name: "1 Year VIP",
            price: "4,499,000 đ",
            period: "/ 12 months",
            description: "Best value, save 25%",
            features: [
                { name: "Apply to Jobs", included: true },
                { name: "Upload CV", included: true },
                { name: "Basic Job Search", included: true },
                { name: "AI CV Analysis", included: true },
                { name: "Priority Application", included: true },
                { name: "See Who Viewed Profile", included: true },
                { name: "Profile Highlighting", included: true },
            ],
            action: "Upgrade Now",
            variant: "default" as const,
            badge: "Best Value",
        },
    ];

    return (
        <div className="space-y-6 animate-fade-in">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Upgrade Account</h1>
                <p className="text-muted-foreground mt-2">
                    Unlock premium features to accelerate your job search.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {plans.map((plan) => (
                    <Card
                        key={plan.name}
                        onClick={() => setSelectedPlan(plan.name)}
                        className={cn(
                            "flex flex-col relative transition-all duration-200 hover:shadow-lg cursor-pointer",
                            selectedPlan === plan.name
                                ? "border-primary border-2 shadow-md scale-105 z-10"
                                : "hover:border-primary/50"
                        )}
                    >
                        {plan.badge && (
                            <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                                <Badge className="bg-primary text-primary-foreground hover:bg-primary">
                                    {plan.badge}
                                </Badge>
                            </div>
                        )}

                        <CardHeader>
                            <CardTitle className="flex items-center justify-between">
                                {plan.name}
                                {plan.name.includes("VIP") && <Crown className="h-5 w-5 text-yellow-500" />}
                            </CardTitle>
                            <CardDescription>{plan.description}</CardDescription>
                        </CardHeader>

                        <CardContent className="flex-1">
                            <div className="mb-6">
                                <span className="text-3xl font-bold">{plan.price}</span>
                                <span className="text-muted-foreground text-sm font-normal">
                                    {plan.period}
                                </span>
                            </div>

                            <div className="space-y-3">
                                {plan.features.map((feature) => (
                                    <div key={feature.name} className="flex items-center gap-2 text-sm">
                                        {feature.included ? (
                                            <Check className="h-4 w-4 text-green-500 shrink-0" />
                                        ) : (
                                            <X className="h-4 w-4 text-muted-foreground shrink-0" />
                                        )}
                                        <span className={feature.included ? "text-foreground" : "text-muted-foreground"}>
                                            {feature.name}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </CardContent>

                        <CardFooter>
                            <Button
                                className="w-full"
                                variant={selectedPlan === plan.name ? "default" : "outline"}
                                disabled={plan.name === "Free"}
                                onClick={() => navigate("/candidate/payment", { state: { plan } })}
                            >
                                {plan.action}
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default UpgradeAccount;

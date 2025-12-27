import { Check, X, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const PlansView = () => {
    // Mock current plan - in a real app this would come from user context/API
    const currentPlan: 'free' | 'premium' = 'free' as 'free' | 'premium';

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-bold tracking-tight">Plans & Billing</h2>
                <p className="text-muted-foreground">Manage your subscription and billing information.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto pt-4">
                {/* Free Plan */}
                <Card className={`relative flex flex-col ${currentPlan === 'free' ? 'border-primary shadow-md' : ''}`}>
                    {currentPlan === 'free' && (
                        <div className="absolute top-0 right-0 transform translate-x-2 -translate-y-2">
                            <Badge className="bg-primary text-primary-foreground">Current Plan</Badge>
                        </div>
                    )}
                    <CardHeader>
                        <CardTitle className="text-2xl">Free</CardTitle>
                        <CardDescription>Essential tools for basic recruitment needs</CardDescription>
                        <div className="mt-4">
                            <span className="text-4xl font-bold">0 ₫</span>
                            <span className="text-muted-foreground"> / month</span>
                        </div>
                    </CardHeader>
                    <CardContent className="flex-1">
                        <ul className="space-y-3 text-sm">
                            <li className="flex items-center">
                                <Check className="h-4 w-4 text-green-500 mr-2" />
                                Post Jobs
                            </li>
                            <li className="flex items-center">
                                <Check className="h-4 w-4 text-green-500 mr-2" />
                                Manage CVs
                            </li>
                            <li className="flex items-center">
                                <Check className="h-4 w-4 text-green-500 mr-2" />
                                Basic Candidate Search
                            </li>
                            <li className="flex items-center text-muted-foreground">
                                <X className="h-4 w-4 mr-2" />
                                AI CV Analysis
                            </li>
                            <li className="flex items-center text-muted-foreground">
                                <X className="h-4 w-4 mr-2" />
                                AI Candidate Matching
                            </li>
                            <li className="flex items-center text-muted-foreground">
                                <X className="h-4 w-4 mr-2" />
                                AI Smart Scoring
                            </li>
                        </ul>
                    </CardContent>
                    <CardFooter>
                        <Button className="w-full" variant={currentPlan === 'free' ? "outline" : "default"} disabled={currentPlan === 'free'}>
                            {currentPlan === 'free' ? 'Your Current Plan' : 'Downgrade'}
                        </Button>
                    </CardFooter>
                </Card>

                {/* Premium Plan */}
                <Card className={`relative flex flex-col border-primary/50 shadow-lg ${currentPlan === 'premium' ? 'border-primary' : ''}`}>
                    {currentPlan === 'premium' && (
                        <div className="absolute top-0 right-0 transform translate-x-2 -translate-y-2">
                            <Badge className="bg-primary text-primary-foreground">Current Plan</Badge>
                        </div>
                    )}
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        <Badge variant="secondary" className="px-4 py-1 text-sm font-semibold bg-gradient-to-r from-indigo-500 to-purple-600 text-white border-0">
                            RECOMMENDED
                        </Badge>
                    </div>
                    <CardHeader>
                        <CardTitle className="text-2xl">Premium</CardTitle>
                        <CardDescription>Advanced AI-powered tools for supercharged hiring</CardDescription>
                        <div className="mt-4">
                            <span className="text-4xl font-bold">499,000 ₫</span>
                            <span className="text-muted-foreground"> / month</span>
                        </div>
                    </CardHeader>
                    <CardContent className="flex-1">
                        <ul className="space-y-3 text-sm">
                            <li className="flex items-center">
                                <Check className="h-4 w-4 text-green-500 mr-2" />
                                <strong>Everything in Free</strong>
                            </li>
                            <li className="flex items-center">
                                <Check className="h-4 w-4 text-green-500 mr-2" />
                                <span className="font-medium text-primary">AI CV Analysis</span>
                            </li>
                            <li className="flex items-center">
                                <Check className="h-4 w-4 text-green-500 mr-2" />
                                <span className="font-medium text-primary">AI Candidate Matching</span>
                            </li>
                            <li className="flex items-center">
                                <Check className="h-4 w-4 text-green-500 mr-2" />
                                <span className="font-medium text-primary">AI Smart Scoring</span>
                            </li>
                            <li className="flex items-center">
                                <Check className="h-4 w-4 text-green-500 mr-2" />
                                Priority Support
                            </li>
                        </ul>
                    </CardContent>
                    <CardFooter>
                        <Button className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white transition-all shadow-md" disabled={currentPlan === 'premium'}>
                            {currentPlan === 'premium' ? 'Your Current Plan' : 'Upgrade to Premium'}
                        </Button>
                    </CardFooter>
                </Card>
            </div>
        </div>
    );
};

export default PlansView;

import { BarChart, TrendingUp, Users } from 'lucide-react';
import { useSubscription } from '@/contexts/SubscriptionContext';
import { Button } from '@/components/ui/button';

const ReportsView = () => {
    const { tier } = useSubscription();

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight">Recruitment report</h2>
                    <p className="text-muted-foreground">Overview of your recruitment effectiveness</p>
                </div>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
                <div className="bg-card p-6 rounded-xl border border-border">
                    <div className="flex items-center gap-4">
                        <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                            <Users className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-muted-foreground">Total applicants</p>
                            <h3 className="text-2xl font-bold">1,234</h3>
                        </div>
                    </div>
                </div>
                <div className="bg-card p-6 rounded-xl border border-border">
                    <div className="flex items-center gap-4">
                        <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-lg">
                            <TrendingUp className="h-6 w-6 text-green-600 dark:text-green-400" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-muted-foreground">Recruitment ratio</p>
                            <h3 className="text-2xl font-bold">12%</h3>
                        </div>
                    </div>
                </div>
                <div className="bg-card p-6 rounded-xl border border-border">
                    <div className="flex items-center gap-4">
                        <div className="p-2 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
                            <BarChart className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-muted-foreground">Active jobs</p>
                            <h3 className="text-2xl font-bold">5</h3>
                        </div>
                    </div>
                </div>
            </div>

            <div className="relative">
                {tier === 'free' && (
                    <div className="absolute inset-0 bg-background/60 backdrop-blur-[2px] z-10 flex flex-col items-center justify-center rounded-xl border border-border">
                        <div className="bg-card p-6 rounded-lg shadow-lg text-center max-w-sm border border-border">
                            <div className="mb-4 flex justify-center">
                                <div className="p-3 bg-primary/10 rounded-full">
                                    <BarChart className="h-8 w-8 text-primary" />
                                </div>
                            </div>
                            <h3 className="text-lg font-bold mb-2">Detailed Reports is a Premium Feature</h3>
                            <p className="text-muted-foreground mb-4">Upgrade to Premium to access detailed analytics, trends, and recruitment insights.</p>
                            <Button className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
                                Upgrade to Premium
                            </Button>
                        </div>
                    </div>
                )}

                <div className={`grid md:grid-cols-2 gap-6 ${tier === 'free' ? 'opacity-50 pointer-events-none select-none' : ''}`}>
                    {/* Mock Charts */}
                    <div className="bg-card p-6 rounded-xl border border-border h-[300px] flex items-center justify-center">
                        <div className="text-center text-muted-foreground">Detailed Applicant Trends (Chart)</div>
                    </div>
                    <div className="bg-card p-6 rounded-xl border border-border h-[300px] flex items-center justify-center">
                        <div className="text-center text-muted-foreground">Source Effectiveness (Chart)</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReportsView;

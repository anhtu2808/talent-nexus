import { BarChart, TrendingUp, Users } from 'lucide-react';

const ReportsView = () => {
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

            <div className="rounded-xl border border-border bg-card p-8 text-center text-muted-foreground">
                <p>Details charts will be updated in the next version.</p>
            </div>
        </div>
    );
};

export default ReportsView;

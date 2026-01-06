import { BarChart as BarChartIcon, TrendingUp, Users, Briefcase, Calendar } from 'lucide-react';
import { useSubscription } from '@/contexts/SubscriptionContext';
import { Button } from '@/components/ui/button';
import { mockApplications, mockJobs, mockCandidateProfiles } from '@/data/mockData';
import { formatDistanceToNow } from 'date-fns';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    LineChart,
    Line,
    AreaChart,
    Area
} from 'recharts';

// Fake data for charts
const monthlyApplications = [
    { name: 'Jan', applications: 65 },
    { name: 'Feb', applications: 59 },
    { name: 'Mar', applications: 80 },
    { name: 'Apr', applications: 81 },
    { name: 'May', applications: 56 },
    { name: 'Jun', applications: 55 },
    { name: 'Jul', applications: 40 },
];

const jobsEffectiveness = [
    { name: 'React Dev', views: 1200, applications: 45 },
    { name: 'Java Dev', views: 890, applications: 32 },
    { name: 'AI Engineer', views: 756, applications: 28 },
    { name: 'DevOps', views: 623, applications: 19 },
    { name: 'Product Mgr', views: 1100, applications: 56 },
];

const ReportsView = () => {
    const { tier } = useSubscription();

    // 1. Calculate Metrics
    const totalApplications = mockApplications.length;
    const activeJobsCount = mockJobs.filter(j => j.isActive).length;

    // Calculate simple trend (mock logic for now)
    const trendPercentage = "+12.5%";

    // 2. Get Recent Applicants
    // Sort applications by date descending and take top 5
    const recentApplications = [...mockApplications]
        .sort((a, b) => new Date(b.appliedAt).getTime() - new Date(a.appliedAt).getTime())
        .slice(0, 5)
        .map(app => {
            const candidate = mockCandidateProfiles.find(c => c.id === app.candidateId);
            const job = mockJobs.find(j => j.id === app.jobId);
            return {
                id: app.id,
                candidateName: candidate?.name || 'Unknown Candidate',
                jobTitle: job?.title || 'Unknown Job',
                appliedAt: app.appliedAt,
                avatar: candidate?.avatar
            };
        });

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight">Recruitment Report</h2>
                    <p className="text-muted-foreground">Overview of your recruitment effectiveness</p>
                </div>
            </div>

            {/* Metrics Cards */}
            <div className="grid gap-4 md:grid-cols-3">
                <div className="bg-card p-6 rounded-xl border border-border shadow-sm">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-xl">
                            <Users className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-muted-foreground">Total Applicants</p>
                            <div className="flex items-baseline gap-2">
                                <h3 className="text-2xl font-bold">{totalApplications}</h3>
                                <span className="text-xs font-medium text-green-600 bg-green-100 dark:bg-green-900/30 px-1.5 py-0.5 rounded-full">
                                    {trendPercentage}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-card p-6 rounded-xl border border-border shadow-sm">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-purple-100 dark:bg-purple-900/20 rounded-xl">
                            <Briefcase className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-muted-foreground">Open Jobs</p>
                            <h3 className="text-2xl font-bold">{activeJobsCount}</h3>
                        </div>
                    </div>
                </div>

                <div className="bg-card p-6 rounded-xl border border-border shadow-sm">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-green-100 dark:bg-green-900/20 rounded-xl">
                            <TrendingUp className="h-6 w-6 text-green-600 dark:text-green-400" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-muted-foreground">Recruitment Ratio</p>
                            <h3 className="text-2xl font-bold">18%</h3>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-7">
                {/* Premium Charts Section */}
                <div className="md:col-span-4 relative rounded-xl border border-border bg-card shadow-sm p-6">
                    <div className="mb-6">
                        <h3 className="font-semibold text-lg">Application Trends</h3>
                        <p className="text-sm text-muted-foreground">Monthly application volume</p>
                    </div>

                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={monthlyApplications}>
                                <defs>
                                    <linearGradient id="colorApps" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.3} />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#888888', fontSize: 12 }} dy={10} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#888888', fontSize: 12 }} />
                                <Tooltip
                                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                                />
                                <Area type="monotone" dataKey="applications" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorApps)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Premium Lock Overlay */}
                    {tier === 'free' && (
                        <div className="absolute inset-0 bg-background/60 backdrop-blur-sm z-10 flex flex-col items-center justify-center rounded-xl p-6">
                            <div className="text-center max-w-sm space-y-4">
                                <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                                    <BarChartIcon className="h-6 w-6 text-primary" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold">Unlock Advanced Analytics</h3>
                                    <p className="text-sm text-muted-foreground mt-1">Upgrade to Premium to view detailed application trends and sourcing insights.</p>
                                </div>
                                <Button className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white shadow-lg">
                                    Upgrade to Premium
                                </Button>
                            </div>
                        </div>
                    )}
                </div>

                {/* Recent Applicants */}
                <div className="md:col-span-3 bg-card rounded-xl border border-border shadow-sm p-6">
                    <div className="mb-6">
                        <h3 className="font-semibold text-lg">Recent Applications</h3>
                        <p className="text-sm text-muted-foreground">Latest 5 candidates applied</p>
                    </div>

                    <div className="space-y-4">
                        {recentApplications.map((app) => (
                            <div key={app.id} className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors border border-transparent hover:border-border">
                                <img
                                    src={app.avatar}
                                    alt={app.candidateName}
                                    className="w-10 h-10 rounded-full object-cover border border-border"
                                />
                                <div className="flex-1 min-w-0">
                                    <p className="font-medium text-sm truncate">{app.candidateName}</p>
                                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                                        <Briefcase className="h-3 w-3" />
                                        <span className="truncate">{app.jobTitle}</span>
                                    </div>
                                </div>
                                <div className="text-right shrink-0">
                                    <span className="text-xs text-muted-foreground whitespace-nowrap">
                                        {formatDistanceToNow(app.appliedAt, { addSuffix: true })}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Additional Chart Example (Job Effectiveness) */}
            <div className="bg-card rounded-xl border border-border shadow-sm p-6 relative">
                <div className="mb-6">
                    <h3 className="font-semibold text-lg">Job Performance</h3>
                    <p className="text-sm text-muted-foreground">Applications vs Views per Job</p>
                </div>
                <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={jobsEffectiveness} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.3} />
                            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#888888', fontSize: 12 }} dy={10} />
                            <YAxis axisLine={false} tickLine={false} tick={{ fill: '#888888', fontSize: 12 }} />
                            <Tooltip
                                cursor={{ fill: 'rgba(0,0,0,0.05)' }}
                                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                            />
                            <Legend />
                            <Bar dataKey="views" name="Views" fill="#e2e8f0" radius={[4, 4, 0, 0]} />
                            <Bar dataKey="applications" name="Applications" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                {/* Premium Lock Overlay Repeated */}
                {tier === 'free' && (
                    <div className="absolute inset-0 bg-background/60 backdrop-blur-sm z-10 flex flex-col items-center justify-center rounded-xl p-6">
                        <Button className="bg-white/80 dark:bg-slate-800/80 text-foreground hover:bg-white dark:hover:bg-slate-800 backdrop-blur-md border border-border">
                            Upgrade to view specific job insights
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ReportsView;

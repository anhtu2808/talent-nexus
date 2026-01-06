import { BarChart as BarChartIcon, TrendingUp, Users, Briefcase, Calendar, Clock, CheckCircle2, FileText, PieChart as PieChartIcon, Search } from 'lucide-react';
import { useSubscription } from '@/contexts/SubscriptionContext';
import { Button } from '@/components/ui/button';
import { mockApplications, mockJobs, mockCandidateProfiles } from '@/data/mockData';
import { formatDistanceToNow, isSameDay, subDays } from 'date-fns';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    AreaChart,
    Area,
    Cell
} from 'recharts';

// Fake data for charts
const monthlyActivity = [
    { name: 'Jul', views: 400, applications: 24 },
    { name: 'Aug', views: 300, applications: 18 },
    { name: 'Sep', views: 550, applications: 35 },
    { name: 'Oct', views: 500, applications: 30 },
    { name: 'Nov', views: 700, applications: 45 },
    { name: 'Dec', views: 800, applications: 55 },
    { name: 'Jan', views: 600, applications: 40 }, // Current month partial
];

const funnelData = [
    { name: 'Applied', value: 120, fill: '#6366f1' },
    { name: 'Screening', value: 80, fill: '#8b5cf6' },
    { name: 'Interview', value: 45, fill: '#ec4899' },
    { name: 'Offer', value: 15, fill: '#10b981' },
    { name: 'Hired', value: 10, fill: '#3b82f6' },
];

const ReportsView = () => {
    const { tier } = useSubscription();

    // 1. Calculate Metrics
    const today = new Date(); // In real app use UTC handling
    const totalApplications = mockApplications.length;
    const activeJobsCount = mockJobs.filter(j => j.isActive).length;

    // New Metrics
    const newApplicantsToday = mockApplications.filter(app => isSameDay(new Date(app.appliedAt), today)).length;
    const interviewsToday = mockApplications.filter(app => app.interviewDate && isSameDay(new Date(app.interviewDate), today)).length;

    // Simulating offer acceptance rate (Hired / Offers)
    const offerAcceptanceRate = 85;

    // Metric Components
    const MetricCard = ({ title, value, icon: Icon, trend, colorClass, bgClass, trendUp = true }: any) => (
        <div className="bg-card p-6 rounded-xl border border-border shadow-sm flex flex-col justify-between h-full">
            <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl ${bgClass}`}>
                    <Icon className={`h-6 w-6 ${colorClass}`} />
                </div>
                {trend && (
                    <div className={`px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${trendUp ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'}`}>
                        {trendUp ? <TrendingUp className="h-3 w-3" /> : <TrendingUp className="h-3 w-3 transform rotate-180" />}
                        {trend}
                    </div>
                )}
            </div>
            <div>
                <h3 className="text-2xl font-bold mb-1">{value}</h3>
                <p className="text-sm text-muted-foreground">{title}</p>
            </div>
        </div>
    );

    // 2. Get Recent Applicants
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
                    <p className="text-muted-foreground">Detailed insights and performance metrics</p>
                </div>
            </div>

            {/* Metrics Grid (3x2) */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <MetricCard
                    title="Total Applicants"
                    value={totalApplications}
                    icon={Users}
                    trend="+12% from last month"
                    bgClass="bg-blue-100 dark:bg-blue-900/20"
                    colorClass="text-blue-600 dark:text-blue-400"
                />
                <MetricCard
                    title="New Applicants Today"
                    value={newApplicantsToday || 3} // Fallback to 3 for demo if 0
                    icon={FileText}
                    trend="+5 vs yesterday"
                    bgClass="bg-indigo-100 dark:bg-indigo-900/20"
                    colorClass="text-indigo-600 dark:text-indigo-400"
                />
                <MetricCard
                    title="Interviews Today"
                    value={interviewsToday || 2} // Fallback to 2 for demo if 0
                    icon={Calendar}
                    trend="Busy day"
                    bgClass="bg-pink-100 dark:bg-pink-900/20"
                    colorClass="text-pink-600 dark:text-pink-400"
                />
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
                {/* Views vs Applications Bar Chart */}
                <div className="md:col-span-4 lg:col-span-4 rounded-xl border border-border bg-card shadow-sm p-6 relative">
                    <div className="mb-6">
                        <h3 className="font-semibold text-lg">Activity Over Time</h3>
                        <p className="text-sm text-muted-foreground">Job Views vs Applications</p>
                    </div>
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={monthlyActivity} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
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
                    {/* Premium Lock Overlay */}
                    {tier === 'free' && (
                        <div className="absolute inset-0 bg-background/60 backdrop-blur-sm z-10 flex flex-col items-center justify-center rounded-xl p-6">
                            <div className="text-center max-w-sm space-y-4">
                                <Button className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg">
                                    Upgrade to view historical data
                                </Button>
                            </div>
                        </div>
                    )}
                </div>

                {/* Recent Applicants List */}
                <div className="md:col-span-3 lg:col-span-3 bg-card rounded-xl border border-border shadow-sm p-6">
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

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
                {/* Application Funnel Chart */}
                <div className="md:col-span-4 lg:col-span-7 rounded-xl border border-border bg-card shadow-sm p-6 relative">
                    <div className="mb-6">
                        <h3 className="font-semibold text-lg">Hiring Funnel</h3>
                        <p className="text-sm text-muted-foreground">Conversion rates per stage</p>
                    </div>
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart
                                layout="vertical"
                                data={funnelData}
                                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                            >
                                <CartesianGrid strokeDasharray="3 3" horizontal={false} opacity={0.3} />
                                <XAxis type="number" hide />
                                <YAxis dataKey="name" type="category" width={80} tick={{ fontSize: 12 }} />
                                <Tooltip
                                    cursor={{ fill: 'rgba(0,0,0,0.05)' }}
                                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                                />
                                <Bar dataKey="value" name="Candidates" radius={[0, 4, 4, 0]}>
                                    {funnelData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.fill} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                    {tier === 'free' && (
                        <div className="absolute inset-0 bg-background/60 backdrop-blur-sm z-10 flex flex-col items-center justify-center rounded-xl p-6">
                            <p className="font-medium text-muted-foreground mb-4">Detailed conversion metrics available in Premium</p>
                            <Button variant="outline">Learn More</Button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ReportsView;

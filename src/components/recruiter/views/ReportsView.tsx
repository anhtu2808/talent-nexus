import { useState, useMemo } from 'react';
import { BarChart as BarChartIcon, TrendingUp, Users, Briefcase, Calendar, Clock, CheckCircle2, FileText, PieChart as PieChartIcon, Search, Lock, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { mockApplications, mockJobs, mockCandidateProfiles, mockCVs } from '@/data/mockData';
import { formatDistanceToNow, isSameDay, subDays, format, startOfDay } from 'date-fns';
import {
    BarChart,
    Bar,
    LineChart,
    Line,
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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import {
    Dialog,
    DialogContent,
} from '@/components/ui/dialog';
import { CV } from '@/types';

const ReportsView = () => {
    const [selectedJobId, setSelectedJobId] = useState<string>('all');
    const [viewingCV, setViewingCV] = useState<CV | null>(null);

    // 1. Calculate Metrics
    const today = new Date();
    const totalApplications = mockApplications.length;

    // New Metrics
    const newApplicantsToday = mockApplications.filter(app => isSameDay(new Date(app.appliedAt), today)).length;
    const interviewsToday = mockApplications.filter(app => app.interviewDate && isSameDay(new Date(app.interviewDate), today)).length;

    // Filtered Data Calculations
    const filteredApplications = useMemo(() => {
        return selectedJobId === 'all'
            ? mockApplications
            : mockApplications.filter(app => app.jobId === selectedJobId);
    }, [selectedJobId]);

    // Chart 1: Total Applications (By Job if 'all', By Status if 'specific job')
    const barChartData = useMemo(() => {
        if (selectedJobId === 'all') {
            // Group by Job
            const jobCounts = mockJobs.map(job => {
                const count = mockApplications.filter(app => app.jobId === job.id).length;
                return {
                    name: job.title.length > 20 ? job.title.substring(0, 20) + '...' : job.title,
                    fullTitle: job.title,
                    applications: count
                };
            }).filter(item => item.applications > 0).sort((a, b) => b.applications - a.applications).slice(0, 10);
            return jobCounts;
        } else {
            // Group by Status for specific job
            const statuses = ['new', 'screening', 'interviewing', 'negotiating', 'hired', 'rejected'];
            return statuses.map(status => ({
                name: status.charAt(0).toUpperCase() + status.slice(1),
                applications: filteredApplications.filter(app => app.status === status).length
            }));
        }
    }, [selectedJobId, filteredApplications]);

    // Chart 2: Trends Line Chart (Last 14 Days) - Multi-line
    const lineChartData = useMemo(() => {
        const days = Array.from({ length: 14 }, (_, i) => subDays(today, 13 - i));

        // Get top 5 jobs for "All" view to avoid clutter
        const topJobs = mockJobs
            .map(job => ({
                id: job.id,
                title: job.title,
                count: mockApplications.filter(app => app.jobId === job.id).length
            }))
            .sort((a, b) => b.count - a.count)
            .slice(0, 5);

        return days.map(day => {
            const dateStr = format(day, 'MMM dd');
            const dataPoint: any = { name: dateStr };

            if (selectedJobId === 'all') {
                // Add line for each top job
                topJobs.forEach(job => {
                    const count = mockApplications.filter(app =>
                        app.jobId === job.id && isSameDay(new Date(app.appliedAt), day)
                    ).length;
                    dataPoint[job.title] = count;
                });
            } else {
                // Specific Job only
                const job = mockJobs.find(j => j.id === selectedJobId);
                if (job) {
                    const count = mockApplications.filter(app =>
                        app.jobId === selectedJobId && isSameDay(new Date(app.appliedAt), day)
                    ).length;
                    dataPoint[job.title] = count;
                }
            }
            return dataPoint;
        });
    }, [selectedJobId]);

    // Get jobs to render lines for
    const displayedJobs = useMemo(() => {
        if (selectedJobId !== 'all') {
            const job = mockJobs.find(j => j.id === selectedJobId);
            return job ? [job] : [];
        }
        return mockJobs
            .map(job => ({
                id: job.id,
                title: job.title,
                count: mockApplications.filter(app => app.jobId === job.id).length
            }))
            .sort((a, b) => b.count - a.count)
            .slice(0, 5);
    }, [selectedJobId]);

    const lineColors = ['#8b5cf6', '#3b82f6', '#10b981', '#f59e0b', '#ef4444'];


    // Recent Applicants
    const recentApplications = useMemo(() => {
        return [...mockApplications]
            .sort((a, b) => new Date(b.appliedAt).getTime() - new Date(a.appliedAt).getTime())
            .slice(0, 5)
            .map(app => {
                const candidate = mockCandidateProfiles.find(c => c.id === app.candidateId);
                const job = mockJobs.find(j => j.id === app.jobId);
                const cv = mockCVs.find(c => c.id === app.cvId);
                return {
                    id: app.id,
                    candidateName: candidate?.name || 'Unknown Candidate',
                    jobTitle: job?.title || 'Unknown Job',
                    appliedAt: app.appliedAt,
                    avatar: candidate?.avatar,
                    cv: cv
                };
            });
    }, []);

    // Helper components
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

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight">Recruitment Report</h2>
                    <p className="text-muted-foreground">Detailed insights and performance metrics</p>
                </div>
                <div className="w-[300px]">
                    <Select value={selectedJobId} onValueChange={setSelectedJobId}>
                        <SelectTrigger>
                            <SelectValue placeholder="Filter by Job" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Jobs</SelectItem>
                            {mockJobs.map(job => (
                                <SelectItem key={job.id} value={job.id}>{job.title}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </div>

            {/* Metrics Grid */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <MetricCard
                    title="Total Applicants"
                    value={selectedJobId === 'all' ? totalApplications : filteredApplications.length}
                    icon={Users}
                    trend="+12% from last month"
                    bgClass="bg-blue-100 dark:bg-blue-900/20"
                    colorClass="text-blue-600 dark:text-blue-400"
                />
                <MetricCard
                    title="New Applicants Today"
                    value={newApplicantsToday || 0}
                    icon={FileText}
                    trend="+5 vs yesterday"
                    bgClass="bg-indigo-100 dark:bg-indigo-900/20"
                    colorClass="text-indigo-600 dark:text-indigo-400"
                />
                <MetricCard
                    title="Interviews Today"
                    value={interviewsToday || 0}
                    icon={Calendar}
                    trend="Busy day"
                    bgClass="bg-pink-100 dark:bg-pink-900/20"
                    colorClass="text-pink-600 dark:text-pink-400"
                />
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
                {/* Main Bar Chart: Total Applications (By Job or Status) */}
                <div className="md:col-span-4 lg:col-span-4 rounded-xl border border-border bg-card shadow-sm p-6">
                    <div className="mb-6">
                        <h3 className="font-semibold text-lg">
                            {selectedJobId === 'all' ? 'Applications by Job' : 'Applications by Status'}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                            {selectedJobId === 'all' ? 'Top jobs by applicant count' : 'Current pipeline distribution'}
                        </p>
                    </div>
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={barChartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.3} />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#888888', fontSize: 12 }} dy={10} interval={0} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#888888', fontSize: 12 }} />
                                <Tooltip
                                    cursor={{ fill: 'rgba(0,0,0,0.05)' }}
                                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                                />
                                <Bar dataKey="applications" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Recent Applicants List */}
                <div className="md:col-span-3 lg:col-span-3 bg-card rounded-xl border border-border shadow-sm p-6 flex flex-col">
                    <div className="mb-6">
                        <h3 className="font-semibold text-lg">Recent Applications</h3>
                        <p className="text-sm text-muted-foreground">Latest 5 candidates applied</p>
                    </div>

                    <div className="space-y-4 flex-1">
                        {recentApplications.map((app) => (
                            <div
                                key={app.id}
                                onClick={() => app.cv && setViewingCV(app.cv)}
                                className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent/10 transition-colors border border-transparent hover:border-accent/20 cursor-pointer"
                            >
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

            {/* Applications Trend Line Chart */}
            <div className="rounded-xl border border-border bg-card shadow-sm p-6 relative">
                <div className="mb-6">
                    <h3 className="font-semibold text-lg">Application Trends</h3>
                    <p className="text-sm text-muted-foreground">Daily applications over the last 14 days {selectedJobId === 'all' && '(Top 5 Jobs)'}</p>
                </div>
                <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={lineChartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.3} />
                            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#888888', fontSize: 12 }} dy={10} />
                            <YAxis axisLine={false} tickLine={false} tick={{ fill: '#888888', fontSize: 12 }} allowDecimals={false} />
                            <Tooltip
                                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                            />
                            <Legend />
                            {displayedJobs.map((job, index) => (
                                <Line
                                    key={job.id}
                                    type="monotone"
                                    dataKey={job.title}
                                    name={job.title}
                                    stroke={lineColors[index % lineColors.length]}
                                    strokeWidth={3}
                                    dot={{ r: 4, strokeWidth: 2 }}
                                    activeDot={{ r: 6 }}
                                />
                            ))}
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* CV Viewer Dialog */}
            <Dialog open={!!viewingCV} onOpenChange={() => setViewingCV(null)}>
                <DialogContent className="max-w-7xl h-[90vh] p-0 overflow-hidden flex flex-col">
                    <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-card shrink-0">
                        <div className="flex items-center gap-3">
                            <FileText className="h-5 w-5 text-primary" />
                            <div>
                                <h2 className="font-semibold text-foreground">{viewingCV?.fileName}</h2>
                                <p className="text-sm text-muted-foreground">Uploaded at {viewingCV && new Date(viewingCV.uploadedAt).toLocaleDateString()}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm" onClick={() => window.open('/sample-cv.pdf', '_blank')}>
                                <Eye className="h-4 w-4 mr-2" />
                                Open PDF
                            </Button>
                        </div>
                    </div>

                    <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 overflow-hidden">
                        <div className="lg:col-span-2 bg-muted border-r border-border h-full overflow-hidden">
                            <iframe src="/sample-cv.pdf" className="w-full h-full" title="CV Preview" />
                        </div>
                        <div className="bg-card p-6 overflow-y-auto h-full space-y-8 relative">

                            {viewingCV && !viewingCV.atsBreakdown && (
                                <div className="text-center py-8 text-muted-foreground">No detailed analysis available.</div>
                            )}
                            {viewingCV?.atsBreakdown && (
                                <>
                                    <h3 className="text-lg font-semibold mb-4">ATS Analysis</h3>
                                    <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg border border-border">
                                        <div><div className="text-sm text-muted-foreground">Overall Score</div><div className="text-3xl font-bold text-primary">{viewingCV.atsScore}%</div></div>
                                        <div className="h-12 w-12 rounded-full border-4 border-primary flex items-center justify-center text-xs font-bold">{viewingCV.atsScore}</div>
                                    </div>
                                    <div className="space-y-4">
                                        <h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wider">Score Breakdown</h4>
                                        <div className="space-y-3">
                                            {/* Simplified bars for brevity */}
                                            {['Skills Match', 'Keywords Match', 'Formatting'].map((label, idx) => {
                                                const scores = [viewingCV.atsBreakdown!.skillsMatch, viewingCV.atsBreakdown!.keywordsMatch, viewingCV.atsBreakdown!.formattingScore];
                                                const colors = ['bg-blue-500', 'bg-indigo-500', 'bg-green-500'];
                                                return (
                                                    <div key={label}>
                                                        <div className="flex justify-between text-sm mb-1"><span>{label}</span><span>{scores[idx]}%</span></div>
                                                        <div className="h-2 bg-muted rounded-full overflow-hidden"><div className={`h-full ${colors[idx]} rounded-full`} style={{ width: `${scores[idx]}%` }} /></div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default ReportsView;

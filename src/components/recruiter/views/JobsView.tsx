import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { mockJobs } from '@/data/mockData';
import { Job } from '@/types';
import {
    Users,
    TrendingUp,
    Eye,
    Plus,
    Clock,
    MoreHorizontal,
    Search,
    Filter,
    MapPin
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { toast } from 'sonner';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
} from '@/components/ui/dialog';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Check, ChevronsUpDown, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { cities, trendingSkills } from "@/data/mockData";

const JobsView = () => {
    const [viewingJob, setViewingJob] = useState<Job | null>(null);

    // Filter states
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [typeFilter, setTypeFilter] = useState("all");
    const [locationFilter, setLocationFilter] = useState("all");

    // Local state for jobs to simulate updates
    const [recruiterJobs, setRecruiterJobs] = useState(() => {
        const jobs = mockJobs.filter(job => job.recruiterId === 'r1' || job.recruiterId === 'r2');
        // Auto-close expired jobs
        return jobs.map(job => {
            if (job.isActive && job.deadline && new Date(job.deadline) < new Date()) {
                return { ...job, isActive: false };
            }
            return job;
        });
    });

    // Derived state for filtered jobs
    const filteredJobs = recruiterJobs.filter(job => {
        // Search query filter
        const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            job.company.toLowerCase().includes(searchQuery.toLowerCase());

        // Status filter
        const matchesStatus = statusFilter === "all"
            ? true
            : statusFilter === "active"
                ? job.isActive
                : !job.isActive;

        // Type filter
        const matchesType = typeFilter === "all"
            ? true
            : job.type === typeFilter;

        // Location filter
        const matchesLocation = locationFilter === "all"
            ? true
            : job.location.some(loc => loc.includes(locationFilter));

        return matchesSearch && matchesStatus && matchesType && matchesLocation;
    });

    const handleEditJob = (job: Job) => {
        navigate(`/recruiter/jobs/${job.id}/edit`);
    };

    const handleToggleStatus = (jobId: string) => {
        setRecruiterJobs(prev => prev.map(job => {
            if (job.id === jobId) {
                const newStatus = !job.isActive;
                toast.success(`Job ${newStatus ? 'activated' : 'paused'} successfully`);
                return { ...job, isActive: newStatus };
            }
            return job;
        }));
    };

    const handleCloseJob = (jobId: string) => {
        setRecruiterJobs(prev => prev.map(job => {
            if (job.id === jobId) {
                if (!job.isActive) return job; // Already closed/inactive
                toast.success('Job closed successfully');
                return { ...job, isActive: false };
            }
            return job;
        }));
    };

    const navigate = useNavigate();

    const handleViewDetails = (job: Job) => {
        navigate(`/jobs/${job.id}`, { state: { role: 'recruiter' } });
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight">Recruitment Posts</h2>
                    <p className="text-muted-foreground">Manage your job postings</p>
                </div>
                <Button variant="accent" size="lg" onClick={() => navigate('/recruiter/jobs/post')}>
                    <Plus className="h-4 w-4 mr-2" />
                    Post New Job
                </Button>
            </div>

            {/* Filters */}
            <div className="flex flex-col md:flex-row gap-4 p-4 bg-card border rounded-lg shadow-sm">
                <div className="flex-1">
                    <div className="relative">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search by title or company..."
                            className="pl-9"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>
                <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                        <SelectTrigger className="w-[130px]">
                            <div className="flex items-center gap-2">
                                <Filter className="h-3.5 w-3.5" />
                                <SelectValue placeholder="Status" />
                            </div>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Status</SelectItem>
                            <SelectItem value="active">Active</SelectItem>
                            <SelectItem value="closed">Closed</SelectItem>
                        </SelectContent>
                    </Select>

                    <Select value={typeFilter} onValueChange={setTypeFilter}>
                        <SelectTrigger className="w-[130px]">
                            <SelectValue placeholder="Job Type" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Types</SelectItem>
                            <SelectItem value="full-time">Full-time</SelectItem>
                            <SelectItem value="part-time">Part-time</SelectItem>
                            <SelectItem value="contract">Contract</SelectItem>
                            <SelectItem value="remote">Remote</SelectItem>
                        </SelectContent>
                    </Select>

                    <Select value={locationFilter} onValueChange={setLocationFilter}>
                        <SelectTrigger className="w-[140px]">
                            <div className="flex items-center gap-2">
                                <MapPin className="h-3.5 w-3.5" />
                                <SelectValue placeholder="Location" />
                            </div>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Locations</SelectItem>
                            {cities.filter(c => c !== 'All Cities').map(city => (
                                <SelectItem key={city} value={city}>{city}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    {(searchQuery || statusFilter !== 'all' || typeFilter !== 'all' || locationFilter !== 'all') && (
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => {
                                setSearchQuery("");
                                setStatusFilter("all");
                                setTypeFilter("all");
                                setLocationFilter("all");
                            }}
                            title="Clear filters"
                        >
                            <X className="h-4 w-4" />
                        </Button>
                    )}
                </div>
            </div>



            {/* View Details Modal */}
            <Dialog open={!!viewingJob} onOpenChange={(open) => !open && setViewingJob(null)}>
                <DialogContent className="max-w-3xl max-h-[85vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle className="text-xl">{viewingJob?.title}</DialogTitle>
                        <DialogDescription>
                            {viewingJob?.location.join(', ')} • {viewingJob?.type} • {viewingJob?.salary}
                        </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-6 mt-4">
                        <div>
                            <h3 className="font-semibold mb-2">Job Description</h3>
                            <p className="text-muted-foreground whitespace-pre-wrap">{viewingJob?.description}</p>
                        </div>
                        <div>
                            <h3 className="font-semibold mb-2">Requirements</h3>
                            <p className="text-muted-foreground whitespace-pre-wrap">
                                {/* Mock requirements if not in type, otherwise just placeholder */}
                                - 3+ years of experience
                                - Strong knowledge of modern tech stack
                                - Good communication skills
                            </p>
                        </div>
                        <div className="flex gap-4 p-4 bg-muted/50 rounded-lg">
                            <div className="flex-1 text-center">
                                <div className="text-2xl font-bold">{viewingJob?.applicantCount}</div>
                                <div className="text-xs text-muted-foreground">Applicants</div>
                            </div>
                            <div className="flex-1 text-center">
                                <div className="text-2xl font-bold">{viewingJob?.views}</div>
                                <div className="text-xs text-muted-foreground">Views</div>
                            </div>
                            <div className="flex-1 text-center">
                                <div className="text-2xl font-bold">{viewingJob && viewingJob.views ? ((viewingJob.clickToApply / viewingJob.views) * 100).toFixed(1) : 0}%</div>
                                <div className="text-xs text-muted-foreground">CTR</div>
                            </div>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button onClick={() => setViewingJob(null)}>Close</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <div className="grid gap-4">
                {filteredJobs.length === 0 ? (
                    <div className="text-center py-12 bg-muted/20 rounded-lg border border-dashed">
                        <p className="text-muted-foreground">No jobs found matching your filters.</p>
                        <Button
                            variant="link"
                            onClick={() => {
                                setSearchQuery("");
                                setStatusFilter("all");
                                setTypeFilter("all");
                                setLocationFilter("all");
                            }}
                        >
                            Clear all filters
                        </Button>
                    </div>
                ) : (
                    filteredJobs.map((job) => (
                        <div
                            key={job.id}
                            className="group flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 bg-card border border-border rounded-xl hover:border-accent/50 transition-colors"
                        >
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-3 mb-2">
                                    <h3 className="font-semibold text-lg text-foreground truncate">{job.title}</h3>
                                    <Badge variant={job.isActive ? 'default' : 'secondary'}>
                                        {job.isActive ? 'Active' : 'Closed'}
                                    </Badge>
                                </div>

                                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                                    <span className="flex items-center gap-1">
                                        <Clock className="h-4 w-4" />
                                        Posted {formatDistanceToNow(job.postedAt, { addSuffix: true })}
                                    </span>
                                    <span className="w-1 h-1 bg-muted-foreground rounded-full" />
                                    <span>{job.location.join(', ')}</span>
                                    <span className="w-1 h-1 bg-muted-foreground rounded-full" />
                                    <span>{job.salary}</span>
                                    {job.deadline && (
                                        <>
                                            <span className="w-1 h-1 bg-muted-foreground rounded-full" />
                                            <span className={new Date(job.deadline) < new Date() ? "text-red-500" : ""}>
                                                Ends {formatDistanceToNow(job.deadline, { addSuffix: true })}
                                            </span>
                                        </>
                                    )}
                                </div>

                                <div className="flex items-center gap-6 mt-4">
                                    <div className="flex items-center gap-2">
                                        <Users className="h-4 w-4 text-accent" />
                                        <span className="font-medium">{job.applicantCount}</span>
                                        <span className="text-muted-foreground text-sm">applicants</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Eye className="h-4 w-4 text-blue-500" />
                                        <span className="font-medium">{job.views || 0}</span>
                                        <span className="text-muted-foreground text-sm">views</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <TrendingUp className="h-4 w-4 text-green-500" />
                                        <span className="font-medium">
                                            {job.clickToApply && job.views ? ((job.clickToApply / job.views) * 100).toFixed(1) : 0}%
                                        </span>
                                        <span className="text-muted-foreground text-sm">CTR</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <Button variant="outline" size="sm" onClick={() => handleViewDetails(job)}>View Details</Button>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" size="icon">
                                            <MoreHorizontal className="h-4 w-4" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuItem onClick={() => handleEditJob(job)}>Edit</DropdownMenuItem>
                                        <DropdownMenuItem onClick={() => handleToggleStatus(job.id)}>
                                            {job.isActive ? 'Pause' : 'Resume'}
                                        </DropdownMenuItem>
                                        <DropdownMenuItem
                                            className="text-red-500"
                                            onClick={() => handleCloseJob(job.id)}
                                        >
                                            Close Job
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default JobsView;

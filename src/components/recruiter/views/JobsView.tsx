import { useState } from 'react';
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
    MoreHorizontal
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

const JobsView = () => {
    const [createJobOpen, setCreateJobOpen] = useState(false);
    const [editingJob, setEditingJob] = useState<Job | null>(null);
    const [viewingJob, setViewingJob] = useState<Job | null>(null);

    // Local state for jobs to simulate updates
    const [recruiterJobs, setRecruiterJobs] = useState(
        mockJobs.filter(job => job.recruiterId === 'r1' || job.recruiterId === 'r2')
    );

    const handleCreateJob = (e: React.FormEvent) => {
        e.preventDefault();
        setCreateJobOpen(false);
        toast.success('Job posted successfully!');
    };

    const handleEditJob = (job: Job) => {
        setEditingJob(job);
        setCreateJobOpen(true); // Re-use create dialog for now or create separate edit logic
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

    const handleViewDetails = (job: Job) => {
        setViewingJob(job);
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight">Recruitment Posts</h2>
                    <p className="text-muted-foreground">Manage your job postings</p>
                </div>
                <Button variant="accent" size="lg" onClick={() => { setEditingJob(null); setCreateJobOpen(true); }}>
                    <Plus className="h-4 w-4 mr-2" />
                    Post New Job
                </Button>
            </div>

            {/* Create/Edit Modal */}
            <Dialog open={createJobOpen} onOpenChange={setCreateJobOpen}>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>{editingJob ? 'Edit Job Posting' : 'Create Job Posting'}</DialogTitle>
                        <DialogDescription>
                            {editingJob ? 'Update the details of your job listing.' : 'Fill in the details to create a new job listing. AI will help extract keywords for better matching.'}
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleCreateJob} className="space-y-4 mt-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="job-title">Job Title *</Label>
                                <Input id="job-title" placeholder="e.g., Senior React Developer" defaultValue={editingJob?.title} required />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="job-type">Job Type *</Label>
                                <Select defaultValue={editingJob?.type || undefined} required>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="full-time">Full-time</SelectItem>
                                        <SelectItem value="part-time">Part-time</SelectItem>
                                        <SelectItem value="contract">Contract</SelectItem>
                                        <SelectItem value="remote">Remote</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="location">Location *</Label>
                                <Input id="location" placeholder="e.g., Ho Chi Minh City" defaultValue={editingJob?.location} required />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="salary">Salary Range *</Label>
                                <Input id="salary" placeholder="e.g., $2,000 - $4,000" defaultValue={editingJob?.salary} required />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="description">Job Description *</Label>
                            <Textarea
                                id="description"
                                placeholder="Describe the role, responsibilities..."
                                className="min-h-32"
                                defaultValue={editingJob?.description}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="requirements">Requirements *</Label>
                            <Textarea
                                id="requirements"
                                placeholder="List the requirements..."
                                className="min-h-24"
                                defaultValue={editingJob ? 'React, Node.js, TypeScript' : ''} // Mock placeholder
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="skills">Required Skills (comma-separated) *</Label>
                            <Input id="skills" placeholder="e.g., React, TypeScript, Node.js" defaultValue={editingJob?.skills?.join(', ') || ''} required />
                        </div>
                        <DialogFooter>
                            <Button type="button" variant="outline" onClick={() => setCreateJobOpen(false)}>
                                Cancel
                            </Button>
                            <Button type="submit" variant="accent">
                                {editingJob ? 'Update Job' : 'Post Job'}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>

            {/* View Details Modal */}
            <Dialog open={!!viewingJob} onOpenChange={(open) => !open && setViewingJob(null)}>
                <DialogContent className="max-w-3xl max-h-[85vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle className="text-xl">{viewingJob?.title}</DialogTitle>
                        <DialogDescription>
                            {viewingJob?.location} • {viewingJob?.type} • {viewingJob?.salary}
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
                {recruiterJobs.map((job) => (
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
                                <span>{job.location}</span>
                                <span className="w-1 h-1 bg-muted-foreground rounded-full" />
                                <span>{job.salary}</span>
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
                                    <DropdownMenuItem className="text-red-500">Close Job</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default JobsView;

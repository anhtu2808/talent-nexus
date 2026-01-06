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
    const [createJobOpen, setCreateJobOpen] = useState(false);
    const [editingJob, setEditingJob] = useState<Job | null>(null);
    const [viewingJob, setViewingJob] = useState<Job | null>(null);

    // Multi-select states
    const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
    const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
    const [locationOpen, setLocationOpen] = useState(false);
    const [skillsOpen, setSkillsOpen] = useState(false);
    const [skillSearch, setSkillSearch] = useState("");

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

    const handleCreateJob = (e: React.FormEvent) => {
        e.preventDefault();
        // Here you would typically gather all form data including selectedLocations and selectedSkills
        console.log("Locations:", selectedLocations);
        console.log("Skills:", selectedSkills);

        setCreateJobOpen(false);
        toast.success('Job posted successfully!');
    };

    const handleEditJob = (job: Job) => {
        setEditingJob(job);
        // Location is now string[], so we use it directly
        setSelectedLocations(job.location);
        setSelectedSkills(job.skills || []);
        setCreateJobOpen(true);
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
                <Button variant="accent" size="lg" onClick={() => {
                    setEditingJob(null);
                    setSelectedLocations([]);
                    setSelectedSkills([]);
                    setCreateJobOpen(true);
                }}>
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
                                <Label>Location *</Label>
                                <Popover open={locationOpen} onOpenChange={setLocationOpen}>
                                    <PopoverTrigger asChild>
                                        <Button
                                            type="button"
                                            variant="outline"
                                            role="combobox"
                                            aria-expanded={locationOpen}
                                            className="w-full justify-between h-auto min-h-10 py-2"
                                        >
                                            {selectedLocations.length > 0 ? (
                                                <div className="flex flex-wrap gap-1">
                                                    {selectedLocations.map((loc) => (
                                                        <Badge variant="secondary" key={loc} className="mr-1 mb-1">
                                                            {loc}
                                                            <div
                                                                className="ml-1 ring-offset-background rounded-full outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 cursor-pointer"
                                                                onKeyDown={(e) => {
                                                                    if (e.key === "Enter") {
                                                                        e.stopPropagation();
                                                                        setSelectedLocations(selectedLocations.filter((l) => l !== loc));
                                                                    }
                                                                }}
                                                                onMouseDown={(e) => {
                                                                    e.preventDefault();
                                                                    e.stopPropagation();
                                                                }}
                                                                onClick={(e) => {
                                                                    e.preventDefault();
                                                                    e.stopPropagation();
                                                                    setSelectedLocations(selectedLocations.filter((l) => l !== loc));
                                                                }}
                                                            >
                                                                <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
                                                            </div>
                                                        </Badge>
                                                    ))}
                                                </div>
                                            ) : (
                                                <span className="text-muted-foreground">Select locations...</span>
                                            )}
                                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-[400px] p-0" align="start">
                                        <Command>
                                            <CommandInput placeholder="Search location..." />
                                            <CommandList>
                                                <CommandEmpty>No location found.</CommandEmpty>
                                                <CommandGroup>
                                                    {cities.map((city) => (
                                                        <CommandItem
                                                            key={city}
                                                            value={city}
                                                            onSelect={(currentValue) => {
                                                                if (!selectedLocations.includes(currentValue)) {
                                                                    setSelectedLocations([...selectedLocations, currentValue]);
                                                                }
                                                                // Don't close to allow multi select
                                                            }}
                                                        >
                                                            <Check
                                                                className={cn(
                                                                    "mr-2 h-4 w-4",
                                                                    selectedLocations.includes(city) ? "opacity-100" : "opacity-0"
                                                                )}
                                                            />
                                                            {city}
                                                        </CommandItem>
                                                    ))}
                                                </CommandGroup>
                                            </CommandList>
                                        </Command>
                                    </PopoverContent>
                                </Popover>
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
                            <Label>Required Skills *</Label>
                            <Popover open={skillsOpen} onOpenChange={setSkillsOpen}>
                                <PopoverTrigger asChild>
                                    <Button
                                        type="button"
                                        variant="outline"
                                        role="combobox"
                                        aria-expanded={skillsOpen}
                                        className="w-full justify-between h-auto min-h-10 py-2"
                                    >
                                        {selectedSkills.length > 0 ? (
                                            <div className="flex flex-wrap gap-1">
                                                {selectedSkills.map((skill) => (
                                                    <Badge variant="secondary" key={skill} className="mr-1 mb-1">
                                                        {skill}
                                                        <div
                                                            className="ml-1 ring-offset-background rounded-full outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 cursor-pointer"
                                                            onKeyDown={(e) => {
                                                                if (e.key === "Enter") {
                                                                    e.stopPropagation();
                                                                    setSelectedSkills(selectedSkills.filter((s) => s !== skill));
                                                                }
                                                            }}
                                                            onMouseDown={(e) => {
                                                                e.preventDefault();
                                                                e.stopPropagation();
                                                            }}
                                                            onClick={(e) => {
                                                                e.preventDefault();
                                                                e.stopPropagation();
                                                                setSelectedSkills(selectedSkills.filter((s) => s !== skill));
                                                            }}
                                                        >
                                                            <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
                                                        </div>
                                                    </Badge>
                                                ))}
                                            </div>
                                        ) : (
                                            <span className="text-muted-foreground">Select skills...</span>
                                        )}
                                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-[400px] p-0" align="start">
                                    <Command>
                                        <CommandInput
                                            placeholder="Search skills..."
                                            value={skillSearch}
                                            onValueChange={setSkillSearch}
                                        />
                                        <CommandList>
                                            <CommandEmpty>
                                                <button
                                                    className="w-full text-left p-2 text-sm text-accent hover:bg-accent/10 rounded-sm"
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        if (skillSearch && !selectedSkills.includes(skillSearch)) {
                                                            setSelectedSkills([...selectedSkills, skillSearch]);
                                                            setSkillSearch("");
                                                        }
                                                    }}
                                                >
                                                    Create "{skillSearch}"
                                                </button>
                                            </CommandEmpty>
                                            <CommandGroup heading="Suggestions">
                                                {trendingSkills.map((skill) => (
                                                    <CommandItem
                                                        key={skill}
                                                        value={skill}
                                                        onSelect={(currentValue) => {
                                                            // For skills, we use the raw value usually, nicely cased
                                                            const actualValue = trendingSkills.find(s => s.toLowerCase() === currentValue.toLowerCase()) || currentValue;
                                                            if (!selectedSkills.includes(actualValue)) {
                                                                setSelectedSkills([...selectedSkills, actualValue]);
                                                            }
                                                        }}
                                                    >
                                                        <Check
                                                            className={cn(
                                                                "mr-2 h-4 w-4",
                                                                selectedSkills.includes(skill) ? "opacity-100" : "opacity-0"
                                                            )}
                                                        />
                                                        {skill}
                                                    </CommandItem>
                                                ))}
                                            </CommandGroup>
                                        </CommandList>
                                    </Command>
                                </PopoverContent>
                            </Popover>
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

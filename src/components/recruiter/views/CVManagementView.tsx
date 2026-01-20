import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { mockJobs, mockApplications, mockCandidateProfiles, mockCVs } from '@/data/mockData';
import { Application, ApplicationStatus, CV, CandidateProfile } from '@/types';
import KanbanBoard from '@/components/recruiter/KanbanBoard';
import ApplicantCard from '@/components/recruiter/ApplicantCard';
import ApplicantFilters, { FilterState } from '@/components/recruiter/ApplicantFilters';
import InterviewScheduler from '@/components/recruiter/InterviewScheduler';
import CandidateBookingModal from '@/components/recruiter/CandidateBookingModal';
import { useAuth } from '@/contexts/AuthContext';
import {
    LayoutGrid,
    List,
    Users,
    FileText,
    Eye,
    Calendar,
    Lock,
    ArrowUpDown
} from 'lucide-react';
import { toast } from 'sonner';
import {
    Dialog,
    DialogContent,
} from '@/components/ui/dialog';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';



interface CVManagementViewProps {
    jobId?: string;
}

const CVManagementView = ({ jobId }: CVManagementViewProps = {}) => {
    const { user } = useAuth();
    // Initialize with 'all' by default or mockJobs[0]?.id if strict
    const [selectedJob, setSelectedJob] = useState<string>(
        jobId || mockJobs.filter(job => job.recruiterId === 'r1' || job.recruiterId === 'r2')[0]?.id || ''
    );
    const [viewMode, setViewMode] = useState<'kanban' | 'list'>('kanban');
    const [applications, setApplications] = useState<Application[]>(mockApplications);
    const [viewingCV, setViewingCV] = useState<CV | null>(null);
    const [sortOption, setSortOption] = useState<string>('date-desc');

    // Interview scheduling state
    const [schedulerOpen, setSchedulerOpen] = useState(false);
    const [bookingModalOpen, setBookingModalOpen] = useState(false);
    const [selectedCandidateForBooking, setSelectedCandidateForBooking] = useState<{
        applicationId: string;
        candidate: CandidateProfile;
    } | null>(null);

    const [filters, setFilters] = useState<FilterState>({
        search: '',
        location: 'All Cities',
        status: 'all',
        minExperience: 0,
        maxExperience: 10,
        minSalary: 0,
        maxSalary: 10000,
        skills: [],
        language: '',
        languageLevel: '',
        matchScoreMin: 0
    });

    const recruiterJobs = mockJobs.filter(job => job.recruiterId === 'r1' || job.recruiterId === 'r2');
    const selectedJobData = mockJobs.find(j => j.id === selectedJob);

    // Get applicants for selected job with filters
    const getFilteredApplications = useMemo(() => {
        let apps = applications;

        // Filter by Job ID
        if (selectedJob) {
            apps = apps.filter(app => app.jobId === selectedJob);
        }

        // Apply filters
        apps = apps.filter(app => {
            const candidate = mockCandidateProfiles.find(c => c.id === app.candidateId);
            if (!candidate) return false;

            // Search filter
            if (filters.search) {
                const searchLower = filters.search.toLowerCase();
                const matchesSearch =
                    candidate.name.toLowerCase().includes(searchLower) ||
                    candidate.email.toLowerCase().includes(searchLower) ||
                    candidate.skills?.some(s => s.toLowerCase().includes(searchLower));
                if (!matchesSearch) return false;
            }

            // Status filter
            if (filters.status !== 'all' && app.status !== filters.status) {
                return false;
            }

            // Location filter
            if (filters.location !== 'All Cities' && candidate.location !== filters.location) {
                return false;
            }

            // Experience filter
            const exp = candidate.yearsOfExperience || 0;
            if (exp < filters.minExperience || exp > filters.maxExperience) {
                return false;
            }

            // Match score filter
            if (filters.matchScoreMin > 0 && (app.matchScore || 0) < filters.matchScoreMin) {
                return false;
            }

            // Skills filter (basic implementation)
            if (filters.skills.length > 0) {
                const hasAllSkills = filters.skills.every(skill =>
                    candidate.skills?.some(s => s.toLowerCase().includes(skill.toLowerCase()))
                );
                if (!hasAllSkills) return false;
            }

            // Language filter
            if (filters.language && filters.language !== 'any') {
                const hasLanguage = candidate.languages?.some(l => l.language === filters.language);
                if (!hasLanguage) return false;

                if (filters.languageLevel && filters.languageLevel !== 'any') {
                    const meetsLevel = candidate.languages?.some(
                        l => l.language === filters.language && l.level === filters.languageLevel
                    );
                    if (!meetsLevel) return false;
                }
            }

            return true;
        });

        // Apply sorting
        if (viewMode === 'list') {
            return [...apps].sort((a, b) => {
                const candidateA = mockCandidateProfiles.find(c => c.id === a.candidateId);
                const candidateB = mockCandidateProfiles.find(c => c.id === b.candidateId);

                switch (sortOption) {
                    case 'date-desc':
                        return new Date(b.appliedAt).getTime() - new Date(a.appliedAt).getTime();
                    case 'date-asc':
                        return new Date(a.appliedAt).getTime() - new Date(b.appliedAt).getTime();
                    case 'match-desc':
                        return (b.matchScore || 0) - (a.matchScore || 0);
                    case 'match-asc':
                        return (a.matchScore || 0) - (b.matchScore || 0);
                    case 'name-asc':
                        return (candidateA?.name || '').localeCompare(candidateB?.name || '');
                    case 'name-desc':
                        return (candidateB?.name || '').localeCompare(candidateA?.name || '');
                    case 'status':
                        return a.status.localeCompare(b.status);
                    default:
                        return 0;
                }
            });
        }

        return apps;
    }, [applications, selectedJob, filters, recruiterJobs, sortOption, viewMode]);

    const handleStatusChange = (applicationId: string, newStatus: ApplicationStatus) => {
        setApplications(prev => prev.map(app => {
            if (app.id === applicationId) {
                return { ...app, status: newStatus };
            }
            return app;
        }));
        toast.success(`Status updated to ${newStatus}`);
    };

    const handleAddNote = (applicationId: string, noteContent: string) => {
        setApplications(prev => prev.map(app => {
            if (app.id === applicationId) {
                const newNote = {
                    id: `n${Date.now()}`,
                    applicationId,
                    authorId: user?.id || 'r1',
                    authorName: user?.name || 'HR Manager',
                    content: noteContent,
                    createdAt: new Date()
                };
                return {
                    ...app,
                    notes: [...(app.notes || []), newNote]
                };
            }
            return app;
        }));
        toast.success('Note added successfully');
    };

    const handleViewCV = (cv: CV) => {
        setViewingCV(cv);
    };

    const handleScheduleInterview = (applicationId: string, candidate: CandidateProfile) => {
        setSelectedCandidateForBooking({ applicationId, candidate });
        setBookingModalOpen(true);
    };

    const clearFilters = () => {
        setFilters({
            search: '',
            location: 'All Cities',
            status: 'all',
            minExperience: 0,
            maxExperience: 10,
            minSalary: 0,
            maxSalary: 10000,
            skills: [],
            language: '',
            languageLevel: '',
            matchScoreMin: 0
        });
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight">CV Management</h2>
                    <p className="text-muted-foreground">Track and manage candidate applications</p>
                </div>
                <div className="flex items-center gap-3">
                    {!jobId && (
                        <Select value={selectedJob} onValueChange={setSelectedJob}>
                            <SelectTrigger className="w-[300px]">
                                <SelectValue placeholder="Select a Job" />
                            </SelectTrigger>
                            <SelectContent>
                                {recruiterJobs.map(job => (
                                    <SelectItem key={job.id} value={job.id}>
                                        {job.title} <span className="text-muted-foreground">({job.isActive ? 'Open' : 'Closed'})</span>
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    )}
                    {/* {selectedJob && (
                        <Button
                            variant="outline"
                            onClick={() => setSchedulerOpen(true)}
                        >
                            <Calendar className="h-4 w-4 mr-2" />
                            Interview Schedule
                        </Button>
                    )} */}
                </div>
            </div>

            <div className="bg-card rounded-xl border border-border">
                <div className="p-4 border-b border-border">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                        <div>
                            <h2 className="font-semibold text-lg">
                                {selectedJobData?.title || 'Job Selection'}
                            </h2>
                            <p className="text-sm text-muted-foreground">
                                {getFilteredApplications.length} candidates found
                            </p>
                        </div>
                        <div className="flex items-center gap-2">
                            {viewMode === 'list' && (
                                <div className="mr-2">
                                    <Select value={sortOption} onValueChange={setSortOption}>
                                        <SelectTrigger className="w-[180px] h-8 text-xs">
                                            <ArrowUpDown className="h-3 w-3 mr-2" />
                                            <SelectValue placeholder="Sort by" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="date-desc">Newest First</SelectItem>
                                            <SelectItem value="date-asc">Oldest First</SelectItem>
                                            <SelectItem value="match-desc">Highest Match Score</SelectItem>
                                            <SelectItem value="match-asc">Lowest Match Score</SelectItem>
                                            <SelectItem value="name-asc">Candidate Name (A-Z)</SelectItem>
                                            <SelectItem value="name-desc">Candidate Name (Z-A)</SelectItem>
                                            <SelectItem value="status">Status</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            )}

                            <Button
                                variant={viewMode === 'kanban' ? 'default' : 'outline'}
                                size="sm"
                                onClick={() => setViewMode('kanban')}
                            >
                                <LayoutGrid className="h-4 w-4 mr-2" />
                                Kanban
                            </Button>
                            <Button
                                variant={viewMode === 'list' ? 'default' : 'outline'}
                                size="sm"
                                onClick={() => setViewMode('list')}
                            >
                                <List className="h-4 w-4 mr-2" />
                                List
                            </Button>
                        </div>
                    </div>
                </div>

                <>
                    <div className="p-4 border-b border-border">
                        <ApplicantFilters
                            filters={filters}
                            onFiltersChange={setFilters}
                            onClearFilters={clearFilters}
                        />
                    </div>

                    <div className="p-4">
                        {viewMode === 'kanban' ? (
                            <KanbanBoard
                                applications={getFilteredApplications}
                                candidates={mockCandidateProfiles}
                                cvs={mockCVs}
                                onStatusChange={handleStatusChange}
                                onAddNote={handleAddNote}
                                onViewCV={handleViewCV}
                                onScheduleInterview={handleScheduleInterview}
                            />
                        ) : (
                            <div className="space-y-4">
                                {getFilteredApplications.length > 0 ? (
                                    getFilteredApplications.map(app => {
                                        const candidate = mockCandidateProfiles.find(c => c.id === app.candidateId);
                                        const cv = mockCVs.find(c => c.id === app.cvId);
                                        if (!candidate) return null;
                                        return (
                                            <ApplicantCard
                                                key={app.id}
                                                application={app}
                                                candidate={candidate}
                                                cv={cv}
                                                onStatusChange={handleStatusChange}
                                                onAddNote={handleAddNote}
                                                onViewCV={handleViewCV}
                                                onScheduleInterview={handleScheduleInterview}
                                            />
                                        );
                                    })
                                ) : (
                                    <div className="text-center py-12">
                                        <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                                        <p className="text-muted-foreground">No candidates match your filters</p>
                                        <Button variant="link" onClick={clearFilters}>
                                            Clear filters
                                        </Button>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </>
            </div>

            {/* CV Viewer Dialog */}
            <Dialog open={!!viewingCV} onOpenChange={() => setViewingCV(null)}>
                <DialogContent className="max-w-7xl h-[90vh] p-0 overflow-hidden flex flex-col">
                    {/* Header */}
                    <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-card shrink-0">
                        <div className="flex items-center gap-3">
                            <FileText className="h-5 w-5 text-primary" />
                            <div>
                                <h2 className="font-semibold text-foreground">{viewingCV?.fileName}</h2>
                                <p className="text-sm text-muted-foreground">Uploaded at {viewingCV && new Date(viewingCV.uploadedAt).toLocaleDateString()}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => window.open('/sample-cv.pdf', '_blank')}
                            >
                                <Eye className="h-4 w-4 mr-2" />
                                Open PDF
                            </Button>
                        </div>
                    </div>

                    <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 overflow-hidden">
                        {/* PDF Viewer - 2/3 width */}
                        <div className="lg:col-span-2 bg-muted border-r border-border h-full overflow-hidden">
                            <iframe
                                src="/sample-cv.pdf"
                                className="w-full h-full"
                                title="CV Preview"
                                style={{
                                    transform: "scale(1)",
                                    transformOrigin: "0 0",
                                }}
                            />
                        </div>

                        {/* ATS Analysis Panel - 1/3 width */}
                        <div className="bg-card p-6 overflow-y-auto h-full relative">
                            <Tabs defaultValue="ai" className="h-full flex flex-col">
                                <div className="flex items-center justify-between mb-6 shrink-0">
                                    <h3 className="text-lg font-semibold">Assessment</h3>
                                    <TabsList className="grid w-full max-w-[200px] grid-cols-2">
                                        <TabsTrigger value="ai">AI Analysis</TabsTrigger>
                                        <TabsTrigger value="manual">Manual</TabsTrigger>
                                    </TabsList>
                                </div>

                                <TabsContent value="ai" className="space-y-8 flex-1 overflow-y-auto pr-2">
                                    <div>
                                        {/* ATS Analysis Header removed, as it's now in tabs */}
                                        <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg border border-border">
                                            <div>
                                                <div className="text-sm text-muted-foreground">Overall Score</div>
                                                {viewingCV?.atsBreakdown && selectedJobData?.weights ? (
                                                    <div className="text-3xl font-bold text-primary">
                                                        {Math.round(
                                                            ((viewingCV.atsBreakdown.skillsMatch || 0) * selectedJobData.weights.skills +
                                                                (viewingCV.atsBreakdown.requirementsMatch ?? viewingCV.atsBreakdown.keywordsMatch ?? 0) * selectedJobData.weights.requirements +
                                                                (viewingCV.atsBreakdown.experienceMatch || 0) * selectedJobData.weights.experience +
                                                                (viewingCV.atsBreakdown.locationMatch || 0) * selectedJobData.weights.location) / 100
                                                        )}%
                                                    </div>
                                                ) : (
                                                    <div className="text-3xl font-bold text-primary">{viewingCV?.atsScore}%</div>
                                                )}
                                            </div>
                                            <div className="h-12 w-12 rounded-full border-4 border-primary flex items-center justify-center text-xs font-bold">
                                                {viewingCV?.atsBreakdown && selectedJobData?.weights ? (
                                                    Math.round(
                                                        ((viewingCV.atsBreakdown.skillsMatch || 0) * selectedJobData.weights.skills +
                                                            (viewingCV.atsBreakdown.requirementsMatch ?? viewingCV.atsBreakdown.keywordsMatch ?? 0) * selectedJobData.weights.requirements +
                                                            (viewingCV.atsBreakdown.experienceMatch || 0) * selectedJobData.weights.experience +
                                                            (viewingCV.atsBreakdown.locationMatch || 0) * selectedJobData.weights.location) / 100
                                                    )
                                                ) : (
                                                    viewingCV?.atsScore
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    {viewingCV?.atsBreakdown ? (
                                        <div className="space-y-4">
                                            <h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wider">Score Breakdown & Analysis</h4>
                                            <div className="space-y-6">
                                                {/* Skills */}
                                                <div>
                                                    <div className="flex justify-between text-sm mb-2">
                                                        <span className="font-medium">Skills Match {selectedJobData?.weights && <span className="text-muted-foreground text-xs font-normal">({selectedJobData.weights.skills}%)</span>}</span>
                                                        <span className="font-bold">{viewingCV.atsBreakdown.skillsMatch || 0}%</span>
                                                    </div>
                                                    <div className="h-2 bg-muted rounded-full overflow-hidden mb-3">
                                                        <div
                                                            className="h-full bg-blue-500 rounded-full"
                                                            style={{ width: `${viewingCV.atsBreakdown.skillsMatch || 0}%` }}
                                                        />
                                                    </div>
                                                    <div className="bg-muted/50 p-3 rounded-lg border border-border text-xs text-muted-foreground">
                                                        <ul className="list-disc list-inside space-y-1">
                                                            {Array.isArray(viewingCV.atsBreakdown.skillsAnalysis) ? (
                                                                viewingCV.atsBreakdown.skillsAnalysis.map((point, i) => (
                                                                    <li key={i}>{point}</li>
                                                                ))
                                                            ) : (
                                                                <li>{viewingCV.atsBreakdown.skillsAnalysis || "Candidate's skills align with the job requirements."}</li>
                                                            )}
                                                        </ul>
                                                    </div>
                                                </div>

                                                {/* Requirements */}
                                                <div>
                                                    <div className="flex justify-between text-sm mb-2">
                                                        <span className="font-medium">Requirements Match {selectedJobData?.weights && <span className="text-muted-foreground text-xs font-normal">({selectedJobData.weights.requirements}%)</span>}</span>
                                                        <span className="font-bold">{viewingCV.atsBreakdown.requirementsMatch ?? viewingCV.atsBreakdown.keywordsMatch ?? 0}%</span>
                                                    </div>
                                                    <div className="h-2 bg-muted rounded-full overflow-hidden mb-3">
                                                        <div
                                                            className="h-full bg-indigo-500 rounded-full"
                                                            style={{ width: `${viewingCV.atsBreakdown.requirementsMatch ?? viewingCV.atsBreakdown.keywordsMatch ?? 0}%` }}
                                                        />
                                                    </div>
                                                    <div className="bg-muted/50 p-3 rounded-lg border border-border text-xs text-muted-foreground">
                                                        <ul className="list-disc list-inside space-y-1">
                                                            {Array.isArray(viewingCV.atsBreakdown.requirementsAnalysis) ? (
                                                                viewingCV.atsBreakdown.requirementsAnalysis.map((point, i) => (
                                                                    <li key={i}>{point}</li>
                                                                ))
                                                            ) : (
                                                                <li>{viewingCV.atsBreakdown.requirementsAnalysis || "Candidate meets the core job requirements."}</li>
                                                            )}
                                                        </ul>
                                                    </div>
                                                </div>

                                                {/* Experience */}
                                                <div>
                                                    <div className="flex justify-between text-sm mb-2">
                                                        <span className="font-medium">Experience Match {selectedJobData?.weights && <span className="text-muted-foreground text-xs font-normal">({selectedJobData.weights.experience}%)</span>}</span>
                                                        <span className="font-bold">{viewingCV.atsBreakdown.experienceMatch || 0}%</span>
                                                    </div>
                                                    <div className="h-2 bg-muted rounded-full overflow-hidden mb-3">
                                                        <div
                                                            className="h-full bg-purple-500 rounded-full"
                                                            style={{ width: `${viewingCV.atsBreakdown.experienceMatch || 0}%` }}
                                                        />
                                                    </div>
                                                    <div className="bg-muted/50 p-3 rounded-lg border border-border text-xs text-muted-foreground">
                                                        <ul className="list-disc list-inside space-y-1">
                                                            {Array.isArray(viewingCV.atsBreakdown.experienceAnalysis) ? (
                                                                viewingCV.atsBreakdown.experienceAnalysis.map((point, i) => (
                                                                    <li key={i}>{point}</li>
                                                                ))
                                                            ) : (
                                                                <li>{viewingCV.atsBreakdown.experienceAnalysis || "Experience level matches the role description."}</li>
                                                            )}
                                                        </ul>
                                                    </div>
                                                </div>

                                                {/* Location */}
                                                <div>
                                                    <div className="flex justify-between text-sm mb-2">
                                                        <span className="font-medium">Location Match {selectedJobData?.weights && <span className="text-muted-foreground text-xs font-normal">({selectedJobData.weights.location}%)</span>}</span>
                                                        <span className="font-bold">{viewingCV.atsBreakdown.locationMatch || 0}%</span>
                                                    </div>
                                                    <div className="h-2 bg-muted rounded-full overflow-hidden mb-3">
                                                        <div
                                                            className="h-full bg-teal-500 rounded-full"
                                                            style={{ width: `${viewingCV.atsBreakdown.locationMatch || 0}%` }}
                                                        />
                                                    </div>
                                                    <div className="bg-muted/50 p-3 rounded-lg border border-border text-xs text-muted-foreground">
                                                        <ul className="list-disc list-inside space-y-1">
                                                            {Array.isArray(viewingCV.atsBreakdown.locationAnalysis) ? (
                                                                viewingCV.atsBreakdown.locationAnalysis.map((point, i) => (
                                                                    <li key={i}>{point}</li>
                                                                ))
                                                            ) : (
                                                                <li>{viewingCV.atsBreakdown.locationAnalysis || "Candidate is within a suitable location range."}</li>
                                                            )}
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="text-center py-8 text-muted-foreground">
                                            No detailed analysis available.
                                        </div>
                                    )}
                                </TabsContent>

                                <TabsContent value="manual" className="space-y-6 flex-1 overflow-y-auto pr-2">
                                    <div className="bg-yellow-500/10 text-yellow-600 p-4 rounded-lg text-sm border border-yellow-500/20">
                                        Use this section to manually evaluate the candidate if the AI analysis is inaccurate or incomplete.
                                    </div>

                                    <div className="space-y-6">
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <Label htmlFor="manual-skills">Skills Score (0-100)</Label>
                                                <Input id="manual-skills" type="number" min="0" max="100" placeholder="e.g. 85" />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="manual-reqs">Requirements Score (0-100)</Label>
                                                <Input id="manual-reqs" type="number" min="0" max="100" placeholder="e.g. 80" />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="manual-exp">Experience Score (0-100)</Label>
                                                <Input id="manual-exp" type="number" min="0" max="100" placeholder="e.g. 90" />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="manual-loc">Location Score (0-100)</Label>
                                                <Input id="manual-loc" type="number" min="0" max="100" placeholder="e.g. 100" />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="manual-notes">Evaluation Notes</Label>
                                            <Textarea
                                                id="manual-notes"
                                                placeholder="Enter your manual evaluation reasoning here..."
                                                className="min-h-[150px]"
                                            />
                                        </div>

                                        <Button className="w-full">
                                            Save Manual Evaluation
                                        </Button>
                                    </div>
                                </TabsContent>
                            </Tabs>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>

            {/* Interview Scheduler Modal */}
            {selectedJob && selectedJobData && (
                <InterviewScheduler
                    open={schedulerOpen}
                    onOpenChange={setSchedulerOpen}
                    jobId={selectedJob}
                    jobTitle={selectedJobData.title}
                    recruiterId={user?.id || 'r1'}
                />
            )}

            {/* Candidate Booking Modal */}
            {selectedCandidateForBooking && (
                <CandidateBookingModal
                    open={bookingModalOpen}
                    onOpenChange={setBookingModalOpen}
                    applicationId={selectedCandidateForBooking.applicationId}
                    candidateId={selectedCandidateForBooking.candidate.id}
                    candidateName={selectedCandidateForBooking.candidate.name}
                    candidateEmail={selectedCandidateForBooking.candidate.email}
                    jobId={selectedJob}
                    jobTitle={selectedJobData?.title || 'Job'}
                    onBooked={() => {
                        handleStatusChange(selectedCandidateForBooking.applicationId, 'interview');
                    }}
                />
            )}
        </div>
    );
};

export default CVManagementView;

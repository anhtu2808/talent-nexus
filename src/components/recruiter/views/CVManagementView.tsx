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
    Calendar
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

const CVManagementView = () => {
    const { user } = useAuth();
    // Initialize with 'all' by default or mockJobs[0]?.id if strict
    const [selectedJob, setSelectedJob] = useState<string>(
        mockJobs.filter(job => job.recruiterId === 'r1' || job.recruiterId === 'r2')[0]?.id || ''
    );
    const [viewMode, setViewMode] = useState<'kanban' | 'list'>('kanban');
    const [applications, setApplications] = useState<Application[]>(mockApplications);
    const [viewingCV, setViewingCV] = useState<CV | null>(null);

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

        return apps;
    }, [applications, selectedJob, filters, recruiterJobs]);

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
                    {selectedJob && (
                        <Button
                            variant="outline"
                            onClick={() => setSchedulerOpen(true)}
                        >
                            <Calendar className="h-4 w-4 mr-2" />
                            Interview Schedule
                        </Button>
                    )}
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
                <DialogContent className="max-w-4xl h-[85vh] p-0 overflow-hidden">
                    <div className="flex flex-col h-full">
                        {/* Header */}
                        <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-card">
                            <div className="flex items-center gap-3">
                                <FileText className="h-5 w-5 text-primary" />
                                <div>
                                    <h2 className="font-semibold text-foreground">{viewingCV?.fileName}</h2>
                                    <p className="text-sm text-muted-foreground">ATS Score: {viewingCV?.atsScore}%</p>
                                </div>
                            </div>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => window.open('/sample-cv.pdf', '_blank')}
                            >
                                <Eye className="h-4 w-4 mr-2" />
                                Open PDF
                            </Button>
                        </div>

                        {/* PDF Viewer */}
                        <div className="flex-1 bg-muted">
                            <iframe
                                src="/sample-cv.pdf"
                                className="w-full h-full"
                                title="CV Preview"
                            />
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
                        handleStatusChange(selectedCandidateForBooking.applicationId, 'interviewing');
                    }}
                />
            )}
        </div>
    );
};

export default CVManagementView;

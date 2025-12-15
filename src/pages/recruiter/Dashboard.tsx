import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/layout/Header';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useAuth } from '@/contexts/AuthContext';
import { mockJobs, mockApplications, mockCandidateProfiles, mockCVs } from '@/data/mockData';
import { Application, ApplicationStatus, CV, CandidateProfile } from '@/types';
import KanbanBoard from '@/components/recruiter/KanbanBoard';
import ApplicantCard from '@/components/recruiter/ApplicantCard';
import ApplicantFilters, { FilterState } from '@/components/recruiter/ApplicantFilters';
import InterviewScheduler from '@/components/recruiter/InterviewScheduler';
import CandidateBookingModal from '@/components/recruiter/CandidateBookingModal';
import {
  Briefcase,
  Users,
  TrendingUp,
  Eye,
  Plus,
  Clock,
  CheckCircle,
  LayoutGrid,
  List,
  FileText,
  Calendar
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
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';

const RecruiterDashboard = () => {
  const { user } = useAuth();
  const [createJobOpen, setCreateJobOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState<string | null>(mockJobs[0]?.id || null);
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
    minExperience: 0,
    maxExperience: 10,
    minSalary: 0,
    maxSalary: 10000,
    skills: [],
    language: '',
    languageLevel: '',
    matchScoreMin: 0
  });

  // Get recruiter's jobs
  const recruiterJobs = mockJobs.filter(job => job.recruiterId === 'r1' || job.recruiterId === 'r2');

  // Get applicants for selected job with filters
  const getFilteredApplications = useMemo(() => {
    let apps = applications.filter(app => app.jobId === selectedJob);

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

      // Location filter
      if (filters.location !== 'All Cities' && candidate.location !== filters.location) {
        return false;
      }

      // Experience filter
      const exp = candidate.yearsOfExperience || 0;
      if (exp < filters.minExperience || exp > filters.maxExperience) {
        return false;
      }

      // Skills filter
      if (filters.skills.length > 0) {
        const hasAllSkills = filters.skills.every(skill =>
          candidate.skills?.some(s => s.toLowerCase().includes(skill.toLowerCase()))
        );
        if (!hasAllSkills) return false;
      }

      // Match score filter
      if (filters.matchScoreMin > 0 && (app.matchScore || 0) < filters.matchScoreMin) {
        return false;
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
  }, [applications, selectedJob, filters]);

  const stats = [
    {
      label: 'Active Jobs',
      value: recruiterJobs.filter(j => j.isActive).length,
      icon: Briefcase,
      color: 'text-blue-500',
      change: '+2 this week'
    },
    {
      label: 'Total Applicants',
      value: recruiterJobs.reduce((acc, job) => acc + job.applicantCount, 0),
      icon: Users,
      color: 'text-accent',
      change: '+45 this week'
    },
    {
      label: 'Interviews Scheduled',
      value: applications.filter(a => a.status === 'interviewing').length,
      icon: Clock,
      color: 'text-purple-500',
      change: '+3 this week'
    },
    {
      label: 'Positions Filled',
      value: applications.filter(a => a.status === 'hired').length,
      icon: CheckCircle,
      color: 'text-green-500',
      change: '+1 this month'
    }
  ];

  const handleCreateJob = (e: React.FormEvent) => {
    e.preventDefault();
    setCreateJobOpen(false);
    toast.success('Job posted successfully!');
  };

  const handleStatusChange = (applicationId: string, newStatus: ApplicationStatus) => {
    setApplications(prev => prev.map(app => {
      if (app.id === applicationId) {
        return { ...app, status: newStatus };
      }
      return app;
    }));
    toast.success(`Đã chuyển sang trạng thái ${newStatus}`);
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

  const selectedJobData = mockJobs.find(j => j.id === selectedJob);

  return (
    <div className="min-h-screen bg-muted/30">
      <Header />
      
      <main className="container py-8">
        {/* Welcome Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
              Recruiter Dashboard
            </h1>
            <p className="text-muted-foreground">
              Manage your job postings and find the best candidates.
            </p>
          </div>
          <div className="flex items-center gap-3">
            {selectedJob && (
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => setSchedulerOpen(true)}
              >
                <Calendar className="h-4 w-4 mr-2" />
                Manage Interview Slots
              </Button>
            )}
            <Dialog open={createJobOpen} onOpenChange={setCreateJobOpen}>
              <DialogTrigger asChild>
                <Button variant="accent" size="lg">
                  <Plus className="h-4 w-4 mr-2" />
                  Post New Job
                </Button>
              </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Create Job Posting</DialogTitle>
                <DialogDescription>
                  Fill in the details to create a new job listing. AI will help extract keywords for better matching.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleCreateJob} className="space-y-4 mt-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="job-title">Job Title *</Label>
                    <Input id="job-title" placeholder="e.g., Senior React Developer" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="job-type">Job Type *</Label>
                    <Select required>
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
                    <Input id="location" placeholder="e.g., Ho Chi Minh City" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="salary">Salary Range *</Label>
                    <Input id="salary" placeholder="e.g., $2,000 - $4,000" required />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Job Description *</Label>
                  <Textarea 
                    id="description" 
                    placeholder="Describe the role, responsibilities, and what you're looking for..."
                    className="min-h-32"
                    required 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="requirements">Requirements *</Label>
                  <Textarea 
                    id="requirements" 
                    placeholder="List the requirements, one per line..."
                    className="min-h-24"
                    required 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="skills">Required Skills (comma-separated) *</Label>
                  <Input id="skills" placeholder="e.g., React, TypeScript, Node.js" required />
                </div>
                <DialogFooter>
                  <Button type="button" variant="outline" onClick={() => setCreateJobOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit" variant="accent">
                    Post Job
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-card rounded-xl border border-border p-5">
              <div className="flex items-center justify-between mb-3">
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
                <span className="text-xs text-accent font-medium">{stat.change}</span>
              </div>
              <div className="text-2xl font-bold text-foreground">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Job Listings Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-card rounded-xl border border-border sticky top-4">
              <div className="p-4 border-b border-border">
                <h2 className="font-semibold">Your Job Postings</h2>
              </div>
              <div className="divide-y divide-border max-h-[600px] overflow-y-auto">
                {recruiterJobs.map((job) => (
                  <button
                    key={job.id}
                    onClick={() => setSelectedJob(job.id)}
                    className={`w-full p-4 text-left hover:bg-muted/50 transition-colors ${
                      selectedJob === job.id ? 'bg-accent/5 border-l-2 border-accent' : ''
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-foreground truncate">{job.title}</h3>
                        <p className="text-sm text-muted-foreground">{job.location}</p>
                        <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Users className="h-3 w-3" />
                            {job.applicantCount} applicants
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {formatDistanceToNow(job.postedAt, { addSuffix: true })}
                          </span>
                        </div>
                        {job.views && (
                          <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Eye className="h-3 w-3" />
                              {job.views} views
                            </span>
                            <span className="flex items-center gap-1">
                              <TrendingUp className="h-3 w-3" />
                              {job.clickToApply && job.views ? 
                                ((job.clickToApply / job.views) * 100).toFixed(1) : 0}% CTR
                            </span>
                          </div>
                        )}
                      </div>
                      <Badge variant={job.isActive ? 'default' : 'secondary'} className="shrink-0">
                        {job.isActive ? 'Active' : 'Closed'}
                      </Badge>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Applicant Pipeline */}
          <div className="lg:col-span-3">
            <div className="bg-card rounded-xl border border-border">
              <div className="p-4 border-b border-border">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div>
                    <h2 className="font-semibold text-lg">
                      {selectedJobData?.title || 'Select a Job'}
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

              <div className="p-4 border-b border-border">
                <ApplicantFilters
                  filters={filters}
                  onFiltersChange={setFilters}
                  onClearFilters={clearFilters}
                />
              </div>

              {selectedJob && (
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
                          <p className="text-muted-foreground">No applicants match your filters</p>
                          <Button variant="link" onClick={clearFilters}>
                            Clear filters
                          </Button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* CV Viewer Dialog - Simplified */}
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
                Mở PDF
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
      {selectedCandidateForBooking && selectedJob && selectedJobData && (
        <CandidateBookingModal
          open={bookingModalOpen}
          onOpenChange={setBookingModalOpen}
          applicationId={selectedCandidateForBooking.applicationId}
          candidateId={selectedCandidateForBooking.candidate.id}
          candidateName={selectedCandidateForBooking.candidate.name}
          candidateEmail={selectedCandidateForBooking.candidate.email}
          jobId={selectedJob}
          jobTitle={selectedJobData.title}
          onBooked={() => {
            // Update application status to interviewing
            handleStatusChange(selectedCandidateForBooking.applicationId, 'interviewing');
          }}
        />
      )}
    </div>
  );
};

export default RecruiterDashboard;

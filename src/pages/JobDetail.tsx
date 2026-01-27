import { useState, useRef } from 'react';
import { Link, useParams, useLocation, useNavigate } from 'react-router-dom';
import { formatDistanceToNow, format } from 'date-fns';
import { toast } from 'sonner';
import {
  ArrowLeft,
  Briefcase,
  Building,
  CheckCircle,
  Clock,
  DollarSign,
  FileText,
  Loader2,
  MapPin,
  Upload,
  User,
  MoreHorizontal,
  Plus,
  Search,
  Users,
  Eye,
  TrendingUp,
  X,
  Check,
  ChevronsUpDown,
  Calendar,
  Lock,
  MessageSquare,
  Send,
  Phone,
  Mail,
  ChevronDown,
  ChevronUp,
  Copy // Added Copy icon
} from 'lucide-react';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
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
import { cn } from '@/lib/utils';

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import CVMatchAnalysis from '@/components/jobs/CVMatchAnalysis';
import ApplicantCard from '@/components/recruiter/ApplicantCard';
import CVManagementView from '@/components/recruiter/views/CVManagementView';
import ProposedCVsView from '@/components/recruiter/views/ProposedCVsView';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { mockCVs, mockJobs, mockApplications, mockCandidateProfiles, cities, trendingSkills } from '@/data/mockData';
import { Job, ApplicationStatus, CV, CandidateProfile, Application } from '@/types';

import { useAuth } from '@/contexts/AuthContext';

const JobDetail = () => {
  const { id } = useParams();
  const location = useLocation();

  const { user } = useAuth();

  // State initialization
  // Use local state for job to allow editing
  const [job, setJob] = useState<Job | undefined>(() => mockJobs.find(j => j.id === id));
  const isRecruiterView = location.state?.role === 'recruiter';



  // Applicant Management State
  const [applications, setApplications] = useState<Application[]>(() => {
    return isRecruiterView ? mockApplications.filter(app => app.jobId === id) : [];
  });
  const [viewingCV, setViewingCV] = useState<CV | null>(null);

  // Candidate Match/Apply State (Candidate View)
  const [selectedCV, setSelectedCV] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [matchScore, setMatchScore] = useState<number | null>(null);
  const [showDetailedAnalysis, setShowDetailedAnalysis] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogMode, setDialogMode] = useState<'check' | 'apply'>('check');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  // Combine application data with candidate and CV
  const applicants = applications.map(app => {
    const candidate = mockCandidateProfiles.find(c => c.id === app.candidateId);
    const cv = mockCVs.find(c => c.id === app.cvId);
    return {
      ...app,
      candidate,
      cv
    };
  }).filter(app => app.candidate) as (Application & { candidate: CandidateProfile, cv?: CV })[];

  if (!job) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 container py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Job not found</h1>
          <Link to="/jobs">
            <Button>Return to Jobs</Button>
          </Link>
        </main>
        <Footer />
      </div>
    );
  }


  // Handlers
  const handleEditClick = () => {
    navigate(`/recruiter/jobs/${id}/edit`);
  };

  const handleCloneClick = () => {
    navigate('/recruiter/jobs/post', { state: { cloneData: job } });
  };

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

  // --- Original Candidate View Handlers ---
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsUploading(true);
      setTimeout(() => {
        setIsUploading(false);
        toast.success(`${file.name} has been successfully uploaded.`);
        setSelectedCV('new-upload-id');
      }, 1500);
    }
  };

  const handleCheckMatch = () => {
    if (!selectedCV) return;
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      setMatchScore(Math.floor(Math.random() * 30) + 70);
      setShowDetailedAnalysis(true);
    }, 2000);
  };

  const handleApply = () => {
    if (!selectedCV) return;
    setIsUploading(true);
    setTimeout(() => {
      setIsUploading(false);
      toast.success(`You have successfully applied for ${job.title}`);
      setIsDialogOpen(false);
      resetState();
    }, 1500);
  };

  const resetState = () => {
    setSelectedCV(null);
    setMatchScore(null);
    setShowDetailedAnalysis(false);
    setIsAnalyzing(false);
  };

  const userCVs = mockCVs;

  return (
    <div className="min-h-screen flex flex-col bg-muted/30">
      <Header />

      <main className="flex-1 container py-8">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="inline-flex items-center text-muted-foreground hover:text-foreground mb-6 transition-colors bg-transparent border-none p-0 cursor-pointer"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          {isRecruiterView && (
            <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <Card className="p-4 flex flex-col justify-center items-center text-center">
                <span className="text-sm text-muted-foreground mb-1">Views</span>
                <span className="text-2xl font-bold">{job.views}</span>
              </Card>
              <Card className="p-4 flex flex-col justify-center items-center text-center">
                <span className="text-sm text-muted-foreground mb-1">CTR</span>
                <span className="text-2xl font-bold text-green-600">
                  {job.clickToApply && job.views ? ((job.clickToApply / job.views) * 100).toFixed(1) : 0}%
                </span>
              </Card>
              <Card className="p-4 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                    HR
                  </div>
                  <div className="text-left">
                    <p className="font-medium text-sm">HR Team</p>
                  </div>
                </div>
              </Card>
            </div>
          )}
          {/* Main Content */}
          <div className={cn("space-y-8", isRecruiterView ? "lg:col-span-3" : "lg:col-span-2")}>
            {isRecruiterView ? (
              <Tabs defaultValue="applicants" className="w-full">
                <TabsList className="mb-4 w-full justify-start border-b rounded-none h-auto p-0 bg-transparent gap-6">
                  <TabsTrigger
                    value="details"
                    className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-0 py-2"
                  >
                    Job Details
                  </TabsTrigger>
                  <TabsTrigger
                    value="applicants"
                    className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-0 py-2"
                  >
                    Applicants
                  </TabsTrigger>
                  <TabsTrigger
                    value="proposed"
                    className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-0 py-2"
                  >
                    Proposed CVs
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="details" className="mt-0">
                  <div className="bg-card rounded-xl border border-border p-8 shadow-sm">
                    <div className="flex items-start justify-between gap-4 mb-6">
                      <div className="flex items-center gap-4">
                        <img
                          src={job.companyLogo}
                          alt={job.company}
                          className="w-20 h-20 rounded-xl object-cover border border-border"
                        />
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h1 className="text-2xl font-bold text-foreground">{job.title}</h1>
                            <div className="flex items-center gap-2 text-muted-foreground">
                              <Building className="h-4 w-4" />
                              <span className="font-medium">{job.company}</span>
                            </div>
                            <div className="flex gap-2 ml-2">
                              <Button variant="outline" size="sm" className="h-7 text-xs" onClick={handleCloneClick}>
                                <Copy className="h-3 w-3 mr-1" />
                                Clone Job
                              </Button>
                              <Button variant="outline" size="sm" className="h-7 text-xs" onClick={handleEditClick}>
                                Edit Job
                              </Button>
                            </div>
                          </div >
                        </div >
                      </div>
                    </div >

                    <div className="flex flex-wrap gap-4 mb-8 pt-6 border-t border-border">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <MapPin className="h-5 w-5 text-accent" />
                        <span>{job.location.join(', ')}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <DollarSign className="h-5 w-5 text-accent" />
                        <span>{job.salary}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Briefcase className="h-5 w-5 text-accent" />
                        <span className="capitalize">{job.type}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Clock className="h-5 w-5 text-accent" />
                        <span>Posted {formatDistanceToNow(job.postedAt)} ago</span>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <section>
                        <h3 className="text-lg font-semibold mb-3">About the Role</h3>
                        <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
                          {job.description}
                        </p>
                      </section>

                      <section>
                        <h3 className="text-lg font-semibold mb-3">Requirements</h3>
                        <ul className="space-y-2">
                          {job.requirements.map((req, index) => (
                            <li key={index} className="flex items-start gap-3 text-muted-foreground">
                              <CheckCircle className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                              <span>{req}</span>
                            </li>
                          ))}
                        </ul>
                      </section>

                      <section>
                        <h3 className="text-lg font-semibold mb-3">Skills Required</h3>
                        <div className="flex flex-wrap gap-2">
                          {job.skills?.map((skill) => (
                            <Badge key={skill} variant="secondary" className="px-3 py-1">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </section>
                    </div>
                  </div >
                </TabsContent>

                <TabsContent value="applicants" className="mt-0">
                  <CVManagementView jobId={id} />
                </TabsContent>

                <TabsContent value="proposed" className="mt-0">
                  <ProposedCVsView jobId={id} />
                </TabsContent>
              </Tabs>
            ) : (
              <div className="bg-card rounded-xl border border-border p-8 shadow-sm">
                <div className="flex items-start justify-between gap-4 mb-6">
                  <div className="flex items-center gap-4">
                    <img
                      src={job.companyLogo}
                      alt={job.company}
                      className="w-20 h-20 rounded-xl object-cover border border-border"
                    />
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h1 className="text-2xl font-bold text-foreground">{job.title}</h1>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Building className="h-4 w-4" />
                          <span className="font-medium">{job.company}</span>
                        </div>
                      </div >
                    </div >
                  </div>
                  {matchScore !== null && (
                    <Badge variant="outline" className={cn(
                      "text-lg px-4 py-1",
                      matchScore >= 80 ? "border-green-500 text-green-600 bg-green-50" : "border-yellow-500 text-yellow-600 bg-yellow-50"
                    )}>
                      {matchScore}% Match
                    </Badge>
                  )}
                </div >

                <div className="flex flex-wrap gap-4 mb-8 pt-6 border-t border-border">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="h-5 w-5 text-accent" />
                    <span>{job.location.join(', ')}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <DollarSign className="h-5 w-5 text-accent" />
                    <span>{job.salary}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Briefcase className="h-5 w-5 text-accent" />
                    <span className="capitalize">{job.type}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Clock className="h-5 w-5 text-accent" />
                    <span>Posted {formatDistanceToNow(job.postedAt)} ago</span>
                  </div>
                </div>

                <div className="space-y-6">
                  <section>
                    <h3 className="text-lg font-semibold mb-3">About the Role</h3>
                    <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
                      {job.description}
                    </p>
                  </section>

                  <section>
                    <h3 className="text-lg font-semibold mb-3">Requirements</h3>
                    <ul className="space-y-2">
                      {job.requirements.map((req, index) => (
                        <li key={index} className="flex items-start gap-3 text-muted-foreground">
                          <CheckCircle className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                          <span>{req}</span>
                        </li>
                      ))}
                    </ul>
                  </section>

                  <section>
                    <h3 className="text-lg font-semibold mb-3">Skills Required</h3>
                    <div className="flex flex-wrap gap-2">
                      {job.skills?.map((skill) => (
                        <Badge key={skill} variant="secondary" className="px-3 py-1">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </section>
                </div>
              </div >
            )}
          </div >

          {/* Sidebar CTA */}
          {!isRecruiterView && (
            <div className="lg:col-span-1" >
              <div className="sticky top-24 space-y-6">
                <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
                  <h3 className="font-semibold text-lg mb-4">Interested in this job?</h3>
                  <p className="text-muted-foreground text-sm mb-6">
                    Check how well your profile matches this position before applying.
                  </p>

                  <Dialog open={isDialogOpen} onOpenChange={(open) => {
                    setIsDialogOpen(open);
                    if (!open) resetState();
                  }}>
                    <div className="space-y-3">
                      <Button
                        className="w-full relative overflow-hidden group"
                        size="lg"
                        variant="accent"
                        onClick={() => {
                          setDialogMode('check');
                          setIsDialogOpen(true);
                        }}
                      >
                        <span className="relative z-10 flex items-center justify-center gap-2">
                          <CheckCircle className="w-5 h-5" />
                          Check Match
                        </span>
                      </Button>

                      <Button
                        className="w-full"
                        size="lg"
                        variant="outline"
                        onClick={() => {
                          setDialogMode('apply');
                          setIsDialogOpen(true);
                        }}
                      >
                        Apply Now
                      </Button>
                    </div>

                    <DialogContent className={cn(
                      "overflow-hidden p-0",
                      showDetailedAnalysis ? "max-w-5xl" : "max-w-3xl"
                    )}>
                      {showDetailedAnalysis && matchScore !== null ? (
                        <CVMatchAnalysis
                          job={job}
                          matchScore={matchScore}
                          onClose={() => setIsDialogOpen(false)}
                          onApply={() => {
                            toast.success(`You have successfully applied for ${job.title}`);
                            setIsDialogOpen(false);
                            resetState();
                          }}
                        />
                      ) : (
                        <>
                          <DialogHeader className="p-6 pb-0">
                            <DialogTitle>
                              {dialogMode === 'check' ? 'Compare CV with Job Description' : 'Apply for this Position'}
                            </DialogTitle>
                            <DialogDescription>
                              {dialogMode === 'check'
                                ? 'Select a CV to see how well you match this position.'
                                : 'Select a CV to submit your application.'}
                            </DialogDescription>
                          </DialogHeader>

                          <div className="p-6">
                            {isAnalyzing && (
                              <div className="flex flex-col items-center justify-center py-12">
                                <Loader2 className="h-12 w-12 text-accent animate-spin mb-4" />
                                <p className="text-lg font-medium">Analyzing your CV...</p>
                                <p className="text-sm text-muted-foreground">Comparing skills and experience with JD</p>
                              </div>
                            )}

                            {!isAnalyzing && (
                              <div className="space-y-6">
                                {userCVs.length > 0 && (
                                  <div className="space-y-3">
                                    <label className="text-sm font-medium text-foreground">
                                      Select from your resumes
                                    </label>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[300px] overflow-y-auto pr-2">
                                      {userCVs.map((cv) => (
                                        <div
                                          key={cv.id}
                                          onClick={() => setSelectedCV(cv.id)}
                                          className={cn(
                                            "relative flex items-center p-3 rounded-lg border-2 cursor-pointer transition-all hover:bg-muted/50",
                                            selectedCV === cv.id ? "border-accent bg-accent/5" : "border-transparent bg-muted/30"
                                          )}
                                        >
                                          <div className="w-14 h-18 bg-background rounded border border-border flex items-center justify-center mr-3 shadow-sm shrink-0">
                                            <FileText className="h-6 w-6 text-muted-foreground/50" />
                                          </div>

                                          <div className="flex-1 min-w-0">
                                            <p className="font-medium truncate text-sm">{cv.fileName}</p>
                                            <p className="text-xs text-muted-foreground">
                                              Uploaded {formatDistanceToNow(cv.uploadedAt)} ago
                                            </p>
                                            {cv.atsScore && (
                                              <Badge variant="secondary" className="mt-1 text-xs">
                                                ATS Score: {cv.atsScore}
                                              </Badge>
                                            )}
                                          </div>

                                          {selectedCV === cv.id && (
                                            <div className="absolute top-2 right-2 text-accent">
                                              <CheckCircle className="h-5 w-5" />
                                            </div>
                                          )}
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                )}

                                <div className="space-y-3">
                                  <div className="flex items-center gap-3">
                                    <span className={cn("h-px flex-1 bg-border", userCVs.length > 0 ? "" : "hidden")} />
                                    <span className={cn("text-xs text-muted-foreground font-medium uppercase", userCVs.length > 0 ? "" : "hidden")}>Or</span>
                                    <span className={cn("h-px flex-1 bg-border", userCVs.length > 0 ? "" : "hidden")} />
                                  </div>

                                  <div
                                    onClick={() => fileInputRef.current?.click()}
                                    className={cn(
                                      "border-2 border-dashed border-border rounded-xl p-6 flex flex-col items-center justify-center text-center cursor-pointer hover:border-accent hover:bg-accent/5 transition-all outline-none focus:ring-2 focus:ring-accent",
                                      selectedCV === 'new-upload-id' ? "border-accent bg-accent/5" : ""
                                    )}
                                  >
                                    <input
                                      ref={fileInputRef}
                                      type="file"
                                      accept=".pdf,.docx"
                                      className="hidden"
                                      onChange={handleFileUpload}
                                    />
                                    {isUploading ? (
                                      <Loader2 className="h-8 w-8 text-accent animate-spin mb-2" />
                                    ) : (
                                      <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                                    )}
                                    <p className="font-medium">
                                      {isUploading ? "Uploading..." : "Upload a new CV"}
                                    </p>
                                    <p className="text-sm text-muted-foreground mt-1">
                                      PDF or DOCX up to 5MB
                                    </p>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>

                          {!isAnalyzing && (
                            <DialogFooter className="p-6 pt-0">
                              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                              {dialogMode === 'check' ? (
                                <Button
                                  variant="accent"
                                  disabled={!selectedCV}
                                  onClick={handleCheckMatch}
                                >
                                  Analyze Match
                                </Button>
                              ) : (
                                <Button
                                  variant="accent"
                                  disabled={!selectedCV || isUploading}
                                  onClick={handleApply}
                                >
                                  {isUploading ? (
                                    <>
                                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                      Applying...
                                    </>
                                  ) : (
                                    "Submit Application"
                                  )}
                                </Button>
                              )}
                            </DialogFooter>
                          )}
                        </>
                      )}
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </div>
          )}
        </div >
      </main >


      {/* View CV Dialog (Copied from CVManagementView) */}
      < Dialog open={!!viewingCV} onOpenChange={() => setViewingCV(null)}>
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
              <Button
                variant="outline"
                size="sm"
                onClick={() => window.open(viewingCV?.fileUrl || '/sample-cv.pdf', '_blank')}
              >
                <Eye className="h-4 w-4 mr-2" />
                Open PDF
              </Button>
            </div>
          </div>

          <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 overflow-hidden">
            <div className="lg:col-span-2 bg-muted border-r border-border h-full overflow-hidden">
              <iframe
                src="/sample-cv.pdf"
                className="w-full h-full"
                title="CV Preview"
              />
            </div>

            <div className="bg-card p-6 overflow-y-auto h-full space-y-8 relative">


              <div>
                <h3 className="text-lg font-semibold mb-4">ATS Analysis</h3>
                <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg border border-border">
                  <div>
                    <div className="text-sm text-muted-foreground">Overall Score</div>
                    <div className="text-3xl font-bold text-primary">{viewingCV?.atsScore}%</div>
                  </div>
                  <div className="h-12 w-12 rounded-full border-4 border-primary flex items-center justify-center text-xs font-bold">
                    {viewingCV?.atsScore}
                  </div>
                </div>
              </div>

              {viewingCV?.atsBreakdown ? (
                <>
                  <div className="space-y-4">
                    <h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wider">Score Breakdown</h4>
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Skills Match</span>
                          <span>{viewingCV.atsBreakdown.skillsMatch}%</span>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div
                            className="h-full bg-blue-500 rounded-full"
                            style={{ width: `${viewingCV.atsBreakdown.skillsMatch}%` }}
                          />
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Keywords Match</span>
                          <span>{viewingCV.atsBreakdown.keywordsMatch}%</span>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div
                            className="h-full bg-indigo-500 rounded-full"
                            style={{ width: `${viewingCV.atsBreakdown.keywordsMatch}%` }}
                          />
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Formatting</span>
                          <span>{viewingCV.atsBreakdown.formattingScore}%</span>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div
                            className="h-full bg-green-500 rounded-full"
                            style={{ width: `${viewingCV.atsBreakdown.formattingScore}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wider">Analysis Feedback</h4>
                    <div className="space-y-2">
                      {viewingCV.atsBreakdown.missingKeywords.length > 0 && (
                        <div className="p-3 bg-red-500/10 text-red-600 rounded-lg text-sm">
                          <strong>Missing Keywords:</strong> {viewingCV.atsBreakdown.missingKeywords.join(', ')}
                        </div>
                      )}
                      {viewingCV.atsBreakdown.feedback.map((item, idx) => (
                        <div key={idx} className="p-3 bg-blue-500/10 text-blue-600 rounded-lg text-sm flex gap-2">
                          <div className="mt-0.5">•</div>
                          <div>{item}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  No detailed analysis available.
                </div>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog >

      <Footer />
    </div >
  );
};

export default JobDetail;

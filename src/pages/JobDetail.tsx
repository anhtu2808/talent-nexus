import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';
import CVMatchAnalysis from '@/components/jobs/CVMatchAnalysis';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { mockCVs, mockJobs } from '@/data/mockData';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { formatDistanceToNow } from 'date-fns';
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
  Upload
} from 'lucide-react';
import { useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

const JobDetail = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const job = mockJobs.find(j => j.id === id);
  const [selectedCV, setSelectedCV] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [matchScore, setMatchScore] = useState<number | null>(null);
  const [showDetailedAnalysis, setShowDetailedAnalysis] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsUploading(true);
      // Simulate upload delay
      setTimeout(() => {
        setIsUploading(false);
        toast({
          title: "CV Uploaded",
          description: `${file.name} has been successfully uploaded.`,
        });
        // In a real app, this would add to the list of CVs
        setSelectedCV('new-upload-id'); // Temp mock ID
      }, 1500);
    }
  };

  const handleCheckMatch = () => {
    if (!selectedCV) return;

    setIsAnalyzing(true);
    // Simulate AI analysis delay
    setTimeout(() => {
      setIsAnalyzing(false);
      setMatchScore(Math.floor(Math.random() * 30) + 70); // Random score 70-100
      setShowDetailedAnalysis(true);
    }, 2000);
  };

  const resetState = () => {
    setSelectedCV(null);
    setMatchScore(null);
    setShowDetailedAnalysis(false);
    setIsAnalyzing(false);
  };

  // Filter mocked CVs for demonstration (assuming user is logged in)
  const userCVs = mockCVs;

  return (
    <div className="min-h-screen flex flex-col bg-muted/30">
      <Header />

      <main className="flex-1 container py-8">
        <Link to="/jobs" className="inline-flex items-center text-muted-foreground hover:text-foreground mb-6 transition-colors">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Jobs
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-card rounded-xl border border-border p-8 shadow-sm">
              <div className="flex items-start justify-between gap-4 mb-6">
                <div className="flex items-center gap-4">
                  <img
                    src={job.companyLogo}
                    alt={job.company}
                    className="w-20 h-20 rounded-xl object-cover border border-border"
                  />
                  <div>
                    <h1 className="text-2xl font-bold text-foreground mb-1">{job.title}</h1>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Building className="h-4 w-4" />
                      <span className="font-medium">{job.company}</span>
                    </div>
                  </div>
                </div>
                {matchScore !== null && (
                  <Badge variant="outline" className={cn(
                    "text-lg px-4 py-1",
                    matchScore >= 80 ? "border-green-500 text-green-600 bg-green-50" : "border-yellow-500 text-yellow-600 bg-yellow-50"
                  )}>
                    {matchScore}% Match
                  </Badge>
                )}
              </div>

              <div className="flex flex-wrap gap-4 mb-8 pt-6 border-t border-border">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="h-5 w-5 text-accent" />
                  <span>{job.location}</span>
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
                  <p className="text-muted-foreground leading-relaxed">
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
                    {job.skills.map((skill) => (
                      <Badge key={skill} variant="secondary" className="px-3 py-1">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </section>
              </div>
            </div>
          </div>

          {/* Sidebar CTA */}
          <div className="lg:col-span-1">
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
                  <DialogTrigger asChild>
                    <Button className="w-full" size="lg" variant="accent">
                      Check CV Match & Apply
                    </Button>
                  </DialogTrigger>
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
                          toast({
                            title: "Application Submitted",
                            description: `You have successfully applied for ${job.title}`,
                          });
                          setIsDialogOpen(false);
                          resetState();
                        }}
                      />
                    ) : (
                      <>
                        <DialogHeader className="p-6 pb-0">
                          <DialogTitle>Compare CV with Job Description</DialogTitle>
                          <DialogDescription>
                            Select a CV to see how well you match this position.
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
                              {/* Existing CVs */}
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
                                        {/* Left Preview Image mock */}
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

                              {/* Upload Choice */}
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
                            <Button
                              variant="accent"
                              disabled={!selectedCV}
                              onClick={handleCheckMatch}
                            >
                              Analyze Match
                            </Button>
                          </DialogFooter>
                        )}
                      </>
                    )}
                  </DialogContent>
                </Dialog>
              </div>

              {/* Recruitment Info */}
              <Card className="p-6">
                <h3 className="font-semibold mb-4">Recruiter Info</h3>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                    HR
                  </div>
                  <div>
                    <p className="font-medium text-sm">Talent Acquisition Team</p>
                    <p className="text-xs text-muted-foreground">Active 2 hours ago</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default JobDetail;

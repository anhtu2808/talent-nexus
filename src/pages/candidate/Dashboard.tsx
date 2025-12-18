import Header from '@/components/layout/Header';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { useAuth } from '@/contexts/AuthContext';
import { mockApplications, mockCVs, mockJobs } from '@/data/mockData';
import { formatDistanceToNow } from 'date-fns';
import {
  AlertCircle,
  Briefcase,
  CheckCircle,
  Clock,
  Download,
  Eye,
  FileText,
  Plus,
  Search,
  Sparkles,
  Trash2,
  TrendingUp,
  Upload,
  XCircle
} from 'lucide-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const CandidateDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [cvs, setCvs] = useState(mockCVs);
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);

  // Get user's applications
  const userApplications = mockApplications.filter(app => app.candidateId === 'c1');

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'pending':
        return { icon: Clock, color: 'bg-yellow-100 text-yellow-700', label: 'Pending' };
      case 'reviewing':
        return { icon: Eye, color: 'bg-blue-100 text-blue-700', label: 'Reviewing' };
      case 'shortlisted':
        return { icon: TrendingUp, color: 'bg-purple-100 text-purple-700', label: 'Shortlisted' };
      case 'interview':
        return { icon: Briefcase, color: 'bg-accent/20 text-accent', label: 'Interview' };
      case 'offered':
        return { icon: CheckCircle, color: 'bg-green-100 text-green-700', label: 'Offered' };
      case 'rejected':
        return { icon: XCircle, color: 'bg-red-100 text-red-700', label: 'Rejected' };
      default:
        return { icon: AlertCircle, color: 'bg-gray-100 text-gray-700', label: status };
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Simulate upload
      const newCV = {
        id: `cv${Date.now()}`,
        candidateId: 'c1',
        fileName: file.name,
        fileUrl: URL.createObjectURL(file),
        uploadedAt: new Date(),
        atsScore: Math.floor(Math.random() * 30) + 70
      };
      setCvs([...cvs, newCV]);
      setUploadDialogOpen(false);
      toast.success('CV uploaded successfully! AI is analyzing...');
    }
  };

  const stats = [
    {
      label: 'Total Applications',
      value: userApplications.length,
      icon: Briefcase,
      color: 'text-blue-500'
    },
    {
      label: 'Interview Invites',
      value: userApplications.filter(a => a.status === 'interviewing').length,
      icon: TrendingUp,
      color: 'text-accent'
    },
    {
      label: 'CVs Uploaded',
      value: cvs.length,
      icon: FileText,
      color: 'text-purple-500'
    },
    {
      label: 'Profile Views',
      value: 127,
      icon: Eye,
      color: 'text-orange-500'
    }
  ];

  return (
    <div className="min-h-screen bg-muted/30">
      <Header />

      <main className="container py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
            Welcome back, {user?.name?.split(' ')[0] || 'Candidate'}! 👋
          </h1>
          <p className="text-muted-foreground">
            Track your applications, manage your CVs, and find your next opportunity.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-card rounded-xl border border-border p-5">
              <div className="flex items-center justify-between mb-3">
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
              </div>
              <div className="text-2xl font-bold text-foreground">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* CV Management */}
            <section className="bg-card rounded-xl border border-border p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <FileText className="h-5 w-5 text-primary" />
                  </div>
                  <h2 className="text-lg font-semibold">My CVs</h2>
                </div>
                <Dialog open={uploadDialogOpen} onOpenChange={setUploadDialogOpen}>
                  <DialogTrigger asChild>
                    <Button variant="accent" size="sm">
                      <Upload className="h-4 w-4 mr-2" />
                      Upload CV
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Upload Your CV</DialogTitle>
                      <DialogDescription>
                        Upload a PDF or DOCX file. Our AI will analyze it and provide an ATS score.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 mt-4">
                      <div className="border-2 border-dashed border-border rounded-xl p-8 text-center">
                        <Upload className="h-10 w-10 text-muted-foreground mx-auto mb-4" />
                        <Label htmlFor="cv-upload" className="cursor-pointer">
                          <span className="text-accent font-medium">Click to upload</span>
                          <span className="text-muted-foreground"> or drag and drop</span>
                          <p className="text-sm text-muted-foreground mt-1">PDF, DOCX up to 10MB</p>
                        </Label>
                        <Input
                          id="cv-upload"
                          type="file"
                          accept=".pdf,.docx"
                          className="hidden"
                          onChange={handleFileUpload}
                        />
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>

              {cvs.length > 0 ? (
                <div className="space-y-4">
                  {cvs.map((cv) => (
                    <div key={cv.id} className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg">
                      <div className="p-3 rounded-lg bg-accent/10">
                        <FileText className="h-6 w-6 text-accent" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-foreground truncate">{cv.fileName}</p>
                        <p className="text-sm text-muted-foreground">
                          Uploaded {formatDistanceToNow(cv.uploadedAt, { addSuffix: true })}
                        </p>
                      </div>
                      {cv.atsScore && (
                        <div className="text-center">
                          <div className="flex items-center gap-1 text-accent">
                            <Sparkles className="h-4 w-4" />
                            <span className="font-bold">{cv.atsScore}</span>
                          </div>
                          <p className="text-xs text-muted-foreground">ATS Score</p>
                        </div>
                      )}
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon">
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="text-destructive">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                        <Link to={`/candidate/cv-check/${cv.id}`}>
                          <Button variant="ghost" size="icon" className="text-accent hover:bg-accent/10">
                            <Sparkles className="h-4 w-4" />
                          </Button>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground mb-4">No CVs uploaded yet</p>
                  <Button variant="accent" onClick={() => setUploadDialogOpen(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Upload Your First CV
                  </Button>
                </div>
              )}
            </section>

            {/* Application Status */}
            <section className="bg-card rounded-xl border border-border p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-accent/10">
                    <Briefcase className="h-5 w-5 text-accent" />
                  </div>
                  <h2 className="text-lg font-semibold">Recent Applications</h2>
                </div>
                <Link to="/candidate/applications">
                  <Button variant="outline" size="sm">
                    View All
                  </Button>
                </Link>
              </div>

              {userApplications.slice(0, 3).map((app) => {
                const job = mockJobs.find(j => j.id === app.jobId);
                const statusConfig = getStatusConfig(app.status);
                const StatusIcon = statusConfig.icon;

                return job ? (
                  <div key={app.id} className="flex items-center gap-4 p-4 mb-4 bg-muted/50 rounded-lg last:mb-0">
                    <img
                      src={job.companyLogo}
                      alt={job.company}
                      className="w-12 h-12 rounded-lg"
                    />
                    <div className="flex-1 min-w-0">
                      <Link to={`/candidate/applications/${app.id}`} className="font-medium text-foreground hover:text-accent truncate block">
                        {job.title}
                      </Link>
                      <Link to={`/candidate/applications/${app.id}`} className="text-sm text-muted-foreground hover:text-accent transition-colors">
                        {job.company}
                      </Link>
                    </div>
                    <Badge className={statusConfig.color}>
                      <StatusIcon className="h-3 w-3 mr-1" />
                      {statusConfig.label}
                    </Badge>
                  </div>
                ) : null;
              })}

              {userApplications.length === 0 && (
                <div className="text-center py-8">
                  <Briefcase className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground mb-4">No applications yet</p>
                  <Button variant="accent" onClick={() => navigate('/jobs')}>
                    <Search className="h-4 w-4 mr-2" />
                    Browse Jobs
                  </Button>
                </div>
              )}
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Profile Completion */}
            <div className="bg-card rounded-xl border border-border p-6">
              <h3 className="font-semibold mb-4">Profile Completion</h3>
              <Progress value={75} className="h-2 mb-2" />
              <p className="text-sm text-muted-foreground">75% Complete</p>
              <ul className="mt-4 space-y-2">
                <li className="flex items-center gap-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-accent" />
                  <span>Basic info added</span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-accent" />
                  <span>CV uploaded</span>
                </li>
                <li className="flex items-center gap-2 text-sm text-muted-foreground">
                  <AlertCircle className="h-4 w-4" />
                  <span>Add work experience</span>
                </li>
                <li className="flex items-center gap-2 text-sm text-muted-foreground">
                  <AlertCircle className="h-4 w-4" />
                  <span>Add skills</span>
                </li>
              </ul>
            </div>

            {/* Recommended Jobs */}
            <div className="bg-card rounded-xl border border-border p-6">
              <h3 className="font-semibold mb-4">Recommended For You</h3>
              <div className="space-y-4">
                {mockJobs.slice(0, 3).map((job) => (
                  <Link key={job.id} to={`/jobs/${job.id}`} className="block group">
                    <div className="flex items-start gap-3">
                      <img src={job.companyLogo} alt={job.company} className="w-10 h-10 rounded-lg" />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm text-foreground group-hover:text-accent truncate">
                          {job.title}
                        </p>
                        <p className="text-xs text-muted-foreground truncate">{job.company}</p>
                        <p className="text-xs text-muted-foreground">{job.location}</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
              <Link to="/jobs">
                <Button variant="outline" className="w-full mt-4" size="sm">
                  View All Jobs
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CandidateDashboard;

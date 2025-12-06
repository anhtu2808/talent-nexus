import { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/layout/Header';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useAuth } from '@/contexts/AuthContext';
import { mockJobs, mockApplications, mockCandidates } from '@/data/mockData';
import {
  Briefcase,
  Users,
  TrendingUp,
  Eye,
  Plus,
  MoreVertical,
  Clock,
  CheckCircle,
  XCircle,
  Search,
  FileText,
  Star,
  ChevronRight
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
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

  // Get recruiter's jobs
  const recruiterJobs = mockJobs.filter(job => job.recruiterId === 'r1' || job.recruiterId === 'r2');

  // Get applicants for selected job
  const getApplicantsForJob = (jobId: string) => {
    return mockApplications.filter(app => app.jobId === jobId);
  };

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
      value: 8,
      icon: Clock,
      color: 'text-purple-500',
      change: '+3 this week'
    },
    {
      label: 'Positions Filled',
      value: 12,
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

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="secondary">Pending</Badge>;
      case 'reviewing':
        return <Badge className="bg-blue-100 text-blue-700">Reviewing</Badge>;
      case 'shortlisted':
        return <Badge className="bg-purple-100 text-purple-700">Shortlisted</Badge>;
      case 'interview':
        return <Badge className="bg-accent/20 text-accent">Interview</Badge>;
      case 'offered':
        return <Badge className="bg-green-100 text-green-700">Offered</Badge>;
      case 'rejected':
        return <Badge variant="destructive">Rejected</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Job Listings */}
          <div className="lg:col-span-1">
            <div className="bg-card rounded-xl border border-border">
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
          <div className="lg:col-span-2">
            <div className="bg-card rounded-xl border border-border">
              <div className="p-4 border-b border-border">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="font-semibold">Applicant Pipeline</h2>
                    <p className="text-sm text-muted-foreground">
                      {selectedJob ? mockJobs.find(j => j.id === selectedJob)?.title : 'Select a job'}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input placeholder="Search candidates..." className="pl-9 w-48" />
                    </div>
                  </div>
                </div>
              </div>

              {selectedJob && (
                <Tabs defaultValue="all" className="p-4">
                  <TabsList>
                    <TabsTrigger value="all">All</TabsTrigger>
                    <TabsTrigger value="pending">Pending</TabsTrigger>
                    <TabsTrigger value="shortlisted">Shortlisted</TabsTrigger>
                    <TabsTrigger value="interview">Interview</TabsTrigger>
                  </TabsList>

                  <TabsContent value="all" className="mt-4">
                    <div className="space-y-3">
                      {getApplicantsForJob(selectedJob).length > 0 ? (
                        getApplicantsForJob(selectedJob).map((app) => {
                          const candidate = mockCandidates.find(c => c.id === app.candidateId);
                          return candidate ? (
                            <div
                              key={app.id}
                              className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
                            >
                              <img
                                src={candidate.avatar}
                                alt={candidate.name}
                                className="w-12 h-12 rounded-full"
                              />
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2">
                                  <h4 className="font-medium text-foreground">{candidate.name}</h4>
                                  {app.matchScore && app.matchScore >= 85 && (
                                    <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                                  )}
                                </div>
                                <p className="text-sm text-muted-foreground">{candidate.email}</p>
                                <p className="text-xs text-muted-foreground">
                                  Applied {formatDistanceToNow(app.appliedAt, { addSuffix: true })}
                                </p>
                              </div>
                              {app.matchScore && (
                                <div className="text-center px-3">
                                  <div className={`text-lg font-bold ${app.matchScore >= 80 ? 'text-accent' : 'text-muted-foreground'}`}>
                                    {app.matchScore}%
                                  </div>
                                  <p className="text-xs text-muted-foreground">Match</p>
                                </div>
                              )}
                              {getStatusBadge(app.status)}
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon">
                                    <MoreVertical className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem>
                                    <Eye className="h-4 w-4 mr-2" />
                                    View Profile
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <FileText className="h-4 w-4 mr-2" />
                                    View CV
                                  </DropdownMenuItem>
                                  <DropdownMenuItem className="text-accent">
                                    <CheckCircle className="h-4 w-4 mr-2" />
                                    Shortlist
                                  </DropdownMenuItem>
                                  <DropdownMenuItem className="text-destructive">
                                    <XCircle className="h-4 w-4 mr-2" />
                                    Reject
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          ) : null;
                        })
                      ) : (
                        <div className="text-center py-12">
                          <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                          <p className="text-muted-foreground">No applicants yet for this position</p>
                        </div>
                      )}
                    </div>
                  </TabsContent>

                  <TabsContent value="pending" className="mt-4">
                    <div className="text-center py-12 text-muted-foreground">
                      Filter by pending status...
                    </div>
                  </TabsContent>

                  <TabsContent value="shortlisted" className="mt-4">
                    <div className="text-center py-12 text-muted-foreground">
                      Filter by shortlisted status...
                    </div>
                  </TabsContent>

                  <TabsContent value="interview" className="mt-4">
                    <div className="text-center py-12 text-muted-foreground">
                      Filter by interview status...
                    </div>
                  </TabsContent>
                </Tabs>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default RecruiterDashboard;

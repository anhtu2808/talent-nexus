import Header from '@/components/layout/Header';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { mockApplications, mockCVs, mockJobs } from '@/data/mockData';
import { formatDistanceToNow } from 'date-fns';
import {
  ArrowLeft,
  Briefcase,
  CheckCircle,
  Download,
  FileText,
  MapPin,
  MessageSquare
} from 'lucide-react';
import { Link, useParams } from 'react-router-dom';

const ApplicationDetail = () => {
  const { id } = useParams();
  const application = mockApplications.find(a => a.id === id);
  const job = application ? mockJobs.find(j => j.id === application.jobId) : null;
  const cv = application ? mockCVs.find(c => c.id === application.cvId) : null;

  if (!application || !job) {
    return (
      <div className="min-h-screen bg-muted/30">
        <Header />
        <main className="container py-20 text-center">
          <h1 className="text-2xl font-bold mb-4">Application Not Found</h1>
          <Link to="/candidate/applications">
            <Button>Back to Applications</Button>
          </Link>
        </main>
      </div>
    );
  }

  // Mock timeline steps
  const steps = [
    { id: 'pending', label: 'Applied', date: application.appliedAt, completed: true },
    { id: 'reviewing', label: 'Under Review', date: new Date(application.appliedAt.getTime() + 86400000), completed: ['reviewing', 'interview', 'shortlisted', 'offered', 'rejected'].includes(application.status) },
    { id: 'interview', label: 'Interview', date: new Date(application.appliedAt.getTime() + 86400000 * 3), completed: ['interview', 'offered', 'rejected'].includes(application.status) },
    { id: 'offered', label: 'Final Decision', date: new Date(application.appliedAt.getTime() + 86400000 * 7), completed: ['offered', 'rejected'].includes(application.status) }
  ];

  // Mock activity log
  const activities = [
    {
      id: 1,
      type: 'status_change',
      title: 'Application Received',
      description: 'Your application has been received and is being processed.',
      date: application.appliedAt,
      icon: CheckCircle,
      color: 'text-green-500'
    },
    {
      id: 2,
      type: 'email',
      title: 'Confirmation Email Sent',
      description: 'An automated confirmation email was sent to your inbox.',
      date: new Date(application.appliedAt.getTime() + 3600000), // +1 hour
      icon: MessageSquare,
      color: 'text-blue-500'
    },
    // Add more based on status...
    ...(application.status !== 'pending' ? [{
      id: 3,
      type: 'status_change',
      title: 'Status Updated to Reviewing',
      description: 'Recruiter started reviewing your application.',
      date: new Date(application.appliedAt.getTime() + 86400000),
      icon: Eye,
      color: 'text-blue-500'
    }] : [])
  ];

  function Eye(props: any) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    )
  }


  return (
    <div className="min-h-screen bg-muted/30">
      <Header />

      <main className="container py-8">
        <Link to="/candidate/applications" className="inline-flex items-center text-muted-foreground hover:text-foreground mb-6 transition-colors">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Applications
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">

            {/* Header Card */}
            <div className="bg-card rounded-xl border border-border p-6">
              <div className="flex items-start gap-4">
                <img
                  src={job.companyLogo}
                  alt={job.company}
                  className="w-16 h-16 rounded-lg object-contain bg-white border border-border/50 p-1"
                />
                <div className="flex-1">
                  <h1 className="text-2xl font-bold mb-1">{job.title}</h1>
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Briefcase className="h-4 w-4" />
                      {job.company}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      {job.location}
                    </span>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <Badge variant="secondary" className="capitalize">{application.status}</Badge>
                    <Badge variant="outline">Match Score: {application.matchScore}%</Badge>
                  </div>
                </div>
              </div>
            </div>

            {/* Timeline */}
            <div className="bg-card rounded-xl border border-border p-6">
              <h2 className="text-lg font-semibold mb-6">Application Progress</h2>
              <div className="relative">
                {/* Progress Line */}
                <div className="absolute top-4 left-0 w-full h-0.5 bg-muted">
                  <div
                    className="h-full bg-accent transition-all duration-500"
                    style={{ width: `${(steps.filter(s => s.completed).length - 1) / (steps.length - 1) * 100}%` }}
                  />
                </div>

                <div className="relative flex justify-between">
                  {steps.map((step, index) => (
                    <div key={step.id} className="flex flex-col items-center">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 bg-background z-10 transition-colors ${step.completed ? 'border-accent text-accent' : 'border-muted text-muted-foreground'
                        }`}>
                        {step.completed ? (
                          <CheckCircle className="h-5 w-5 fill-current text-white bg-accent rounded-full" />
                        ) : (
                          <span className="text-xs">{index + 1}</span>
                        )}
                      </div>
                      <span className={`text-xs font-medium mt-2 ${step.completed ? 'text-foreground' : 'text-muted-foreground'}`}>
                        {step.label}
                      </span>
                      {step.completed && (
                        <span className="text-[10px] text-muted-foreground">
                          {step.date.toLocaleDateString()}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Activity Log */}
            <div className="bg-card rounded-xl border border-border p-6">
              <h2 className="text-lg font-semibold mb-6">Activity Log</h2>
              <div className="space-y-6">
                {activities.map((activity, index) => (
                  <div key={activity.id} className="flex gap-4 relative">
                    {index !== activities.length - 1 && (
                      <div className="absolute top-8 left-2.5 w-0.5 h-full bg-border -z-10" />
                    )}
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center bg-background shrink-0 mt-1`}>
                      <activity.icon className={`h-5 w-5 ${activity.color}`} />
                    </div>
                    <div>
                      <p className="text-sm font-medium">{activity.title}</p>
                      <p className="text-sm text-muted-foreground mt-0.5">{activity.description}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {formatDistanceToNow(activity.date, { addSuffix: true })}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Sidebar */}
          <div className="space-y-6">

            {/* CV Section */}
            <div className="bg-card rounded-xl border border-border p-6">
              <h2 className="text-base font-semibold mb-4">Submitted CV</h2>
              {cv ? (
                <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg border border-border/50">
                  <div className="p-2 bg-background rounded border border-border/50">
                    <FileText className="h-6 w-6 text-red-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{cv.fileName}</p>
                    <p className="text-xs text-muted-foreground">
                      Uploaded {new Date(cv.uploadedAt).toLocaleDateString()}
                    </p>
                  </div>
                  <Button variant="ghost" size="icon">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">No CV details available</p>
              )}
            </div>

            {/* Job Details Quick View */}
            <div className="bg-card rounded-xl border border-border p-6">
              <h2 className="text-base font-semibold mb-4">Job Details</h2>
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Salary</span>
                  <span className="font-medium">{job.salary}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Type</span>
                  <span className="font-medium capitalize">{job.type}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Posted</span>
                  <span className="font-medium">{formatDistanceToNow(job.postedAt)} ago</span>
                </div>

                <Separator className="my-3" />

                <Link to={`/jobs/${job.id}`}>
                  <Button variant="outline" className="w-full">View Full Job Post</Button>
                </Link>
              </div>
            </div>

          </div>
        </div>

      </main>
    </div>
  );
};

export default ApplicationDetail;

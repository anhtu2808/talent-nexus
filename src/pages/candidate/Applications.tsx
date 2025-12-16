import Header from '@/components/layout/Header';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/contexts/AuthContext';
import { mockApplications, mockJobs } from '@/data/mockData';
import { formatDistanceToNow } from 'date-fns';
import {
  AlertCircle,
  Briefcase,
  CheckCircle,
  Clock,
  Eye,
  Filter,
  Search,
  TrendingUp,
  XCircle
} from 'lucide-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Applications = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

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

  const filteredApplications = userApplications.filter(app => {
    const job = mockJobs.find(j => j.id === app.jobId);
    if (!job) return false;

    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || app.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-muted/30">
      <Header />

      <main className="container py-8">
        <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">My Applications</h1>
            <p className="text-muted-foreground mt-1">Track the status of your job applications</p>
          </div>
          <Link to="/jobs">
            <Button variant="accent">
              <Search className="h-4 w-4 mr-2" />
              Find More Jobs
            </Button>
          </Link>
        </div>

        <div className="bg-card rounded-xl border border-border p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by job title or company..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0">
              <Filter className="h-4 w-4 text-muted-foreground shrink-0" />
              <div className="flex gap-2">
                {['all', 'pending', 'reviewing', 'interview'].map((status) => (
                  <button
                    key={status}
                    onClick={() => setStatusFilter(status)}
                    className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${statusFilter === status
                      ? 'bg-accent/10 text-accent'
                      : 'bg-muted text-muted-foreground hover:bg-muted/80'
                      }`}
                  >
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {filteredApplications.length > 0 ? (
            <div className="space-y-4">
              {filteredApplications.map((app) => {
                const job = mockJobs.find(j => j.id === app.jobId);
                const statusConfig = getStatusConfig(app.status);
                const StatusIcon = statusConfig.icon;

                return job ? (
                  <div key={app.id} className="flex flex-col sm:flex-row sm:items-center gap-4 p-4 bg-muted/50 rounded-lg border border-transparent hover:border-accent/20 transition-all hover:bg-muted/70">
                    <img
                      src={job.companyLogo}
                      alt={job.company}
                      className="w-12 h-12 rounded-lg"
                    />
                    <div className="flex-1 min-w-0">
                      <Link to={`/candidate/applications/${app.id}`} className="font-medium text-foreground hover:text-accent truncate block text-lg">
                        {job.title}
                      </Link>
                      <div className="text-sm text-muted-foreground">
                        <Link to={`/candidate/applications/${app.id}`} className="hover:text-accent transition-colors">
                          {job.company}
                        </Link>
                        <span> • {job.location}</span>
                      </div>
                      <div className="flex items-center mt-1 text-xs text-muted-foreground gap-2">
                        <span>Applied {formatDistanceToNow(app.appliedAt, { addSuffix: true })}</span>
                      </div>
                    </div>
                    {app.matchScore && (
                      <div className="text-center sm:px-4 sm:border-l sm:border-r border-border/50">
                        <div className="text-lg font-bold text-accent">{app.matchScore}%</div>
                        <p className="text-xs text-muted-foreground">Match Score</p>
                      </div>
                    )}
                    <div className="flex flex-col sm:items-end gap-2">
                      <Badge className={statusConfig.color}>
                        <StatusIcon className="h-3 w-3 mr-1" />
                        {statusConfig.label}
                      </Badge>
                      <Link to={`/candidate/applications/${app.id}`}>
                        <Button variant="ghost" size="sm" className="hidden sm:flex text-muted-foreground hover:text-foreground">
                          View Details
                        </Button>
                      </Link>
                    </div>
                  </div>
                ) : null;
              })}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="bg-muted/50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Briefcase className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium mb-2">No applications found</h3>
              <p className="text-muted-foreground mb-6 max-w-sm mx-auto">
                {searchTerm || statusFilter !== 'all'
                  ? "Try adjusting your search or filters to find what you're looking for."
                  : "You haven't applied to any jobs yet. Start your search today!"}
              </p>
              <Button variant="accent" onClick={() => navigate('/jobs')}>
                <Search className="h-4 w-4 mr-2" />
                Browse Jobs
              </Button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Applications;

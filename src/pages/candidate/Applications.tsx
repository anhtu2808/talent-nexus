import JobCardItem from '@/components/candidate/JobCardItem';
import MyJobsTabs from '@/components/candidate/MyJobsTabs';
import { useAuth } from '@/contexts/AuthContext';
import { mockApplications, mockJobs } from '@/data/mockData';
import { format } from 'date-fns';
import { Info } from 'lucide-react';
import { useState } from 'react';

const Applications = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('applied');

  // Get user's applications
  const userApplications = mockApplications.filter(app => app.candidateId === 'c1');

  // Counts for tabs (mocked for saved/recent)
  const stats = {
    applied: userApplications.length,
    saved: 0,
    recent: 6
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 min-h-[600px]">
      <h1 className="text-2xl font-bold text-foreground mb-6">My Jobs</h1>

      <MyJobsTabs
        activeTab={activeTab}
        onTabChange={setActiveTab}
        counts={stats}
      />

      {/* Info Alert */}
      {activeTab === 'applied' && (
        <div className="flex items-center gap-2 text-muted-foreground text-sm bg-gray-50 p-3 rounded-lg mb-6">
          <Info className="h-4 w-4" />
          <p>Your applied jobs are stored for the last 12 months.</p>

          <div className="ml-auto flex items-center gap-1">
            <span>Sort by:</span>
            <span className="font-bold text-foreground cursor-pointer">Latest application date ▾</span>
          </div>
        </div>
      )}

      {/* Job List */}
      <div className="space-y-4">
        {activeTab === 'applied' ? (
          userApplications.length > 0 ? (
            userApplications.map(app => {
              const job = mockJobs.find(j => j.id === app.jobId);
              if (!job) return null;

              return (
                <JobCardItem
                  key={app.id}
                  id={job.id}
                  applicationId={app.id}
                  companyLogo={job.companyLogo}
                  companyName={job.company}
                  jobTitle={job.title}
                  location={job.location.join(', ')}
                  salary={job.salary}
                  appliedDate={format(new Date(app.appliedAt), 'dd/MM/yyyy')}
                  status={app.status}
                  isExpired={false} // Mock logic for now
                />
              );
            })
          ) : (
            <div className="text-center py-12 text-muted-foreground">
              No applied jobs found.
            </div>
          )
        ) : (
          <div className="text-center py-12 text-muted-foreground">
            No {activeTab} jobs found.
          </div>
        )}
      </div>
    </div>
  );
};

export default Applications;


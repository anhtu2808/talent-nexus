import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { mockJobs } from '@/data/mockData';
import { MapPin, Clock, DollarSign, Users, ArrowRight } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

const FeaturedJobs = () => {
  const featuredJobs = mockJobs.slice(0, 6);

  return (
    <section className="py-20 bg-background">
      <div className="container">
        <div className="flex items-center justify-between mb-10">
          <div>
            <span className="inline-block text-accent font-semibold text-sm uppercase tracking-wider mb-2">
              Latest Opportunities
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Featured Jobs
            </h2>
          </div>
          <Link to="/jobs">
            <Button variant="outline" className="hidden md:flex items-center gap-2">
              View All Jobs
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredJobs.map((job, index) => (
            <Link
              key={job.id}
              to={`/jobs/${job.id}`}
              className="group bg-card rounded-xl border border-border p-6 hover:border-accent/50 hover:shadow-lg transition-all duration-300"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-start gap-4 mb-4">
                <img
                  src={job.companyLogo}
                  alt={job.company}
                  className="w-14 h-14 rounded-lg object-cover"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-foreground group-hover:text-accent transition-colors truncate">
                    {job.title}
                  </h3>
                  <p className="text-sm text-muted-foreground truncate">{job.company}</p>
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>{job.location}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <DollarSign className="h-4 w-4" />
                  <span>{job.salary}</span>
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{formatDistanceToNow(job.postedAt, { addSuffix: true })}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    <span>{job.applicantCount} applicants</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary" className="capitalize">
                  {job.type}
                </Badge>
                {job.skills.slice(0, 2).map((skill) => (
                  <Badge key={skill} variant="outline">
                    {skill}
                  </Badge>
                ))}
                {job.skills.length > 2 && (
                  <Badge variant="outline">+{job.skills.length - 2}</Badge>
                )}
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-8 text-center md:hidden">
          <Link to="/jobs">
            <Button variant="accent" className="w-full">
              View All Jobs
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedJobs;

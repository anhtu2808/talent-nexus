import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Job } from '@/types';
import { MapPin, Clock, DollarSign, Users, Heart, ExternalLink } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { cn } from '@/lib/utils';

interface JobCardProps {
  job: Job;
  variant?: 'default' | 'compact';
  showApply?: boolean;
}

const JobCard = ({ job, variant = 'default', showApply = true }: JobCardProps) => {
  const isCompact = variant === 'compact';

  return (
    <div
      className={cn(
        "group bg-card rounded-xl border border-border hover:border-accent/50 hover:shadow-lg transition-all duration-300",
        isCompact ? "p-4" : "p-6"
      )}
    >
      <div className="flex items-start gap-4">
        <img
          src={job.companyLogo}
          alt={job.company}
          className={cn(
            "rounded-lg object-cover",
            isCompact ? "w-12 h-12" : "w-16 h-16"
          )}
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div>
              <Link to={`/jobs/${job.id}`}>
                <h3 className={cn(
                  "font-semibold text-foreground group-hover:text-accent transition-colors",
                  isCompact ? "text-base" : "text-lg"
                )}>
                  {job.title}
                </h3>
              </Link>
              <p className="text-sm text-muted-foreground">{job.company}</p>
            </div>
            <button className="p-2 hover:bg-muted rounded-lg transition-colors">
              <Heart className="h-4 w-4 text-muted-foreground hover:text-destructive" />
            </button>
          </div>

          <div className={cn("flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground", isCompact ? "mt-2" : "mt-3")}>
            <div className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              <span>{job.location.join(', ')}</span>
            </div>
            <div className="flex items-center gap-1">
              <DollarSign className="h-4 w-4" />
              <span>{job.salary}</span>
            </div>
            {!isCompact && (
              <>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>{formatDistanceToNow(job.postedAt, { addSuffix: true })}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  <span>{job.applicantCount} applicants</span>
                </div>
              </>
            )}
          </div>

          <div className={cn("flex flex-wrap gap-2", isCompact ? "mt-3" : "mt-4")}>
            <Badge variant="secondary" className="capitalize">
              {job.type}
            </Badge>
            {job.skills.slice(0, isCompact ? 2 : 3).map((skill) => (
              <Badge key={skill} variant="outline">
                {skill}
              </Badge>
            ))}
            {job.skills.length > (isCompact ? 2 : 3) && (
              <Badge variant="outline">+{job.skills.length - (isCompact ? 2 : 3)}</Badge>
            )}
          </div>

          {showApply && !isCompact && (
            <div className="flex items-center gap-3 mt-4 pt-4 border-t border-border">
              <Link to={`/jobs/${job.id}`} className="flex-1">
                <Button variant="accent" className="w-full">
                  Apply Now
                </Button>
              </Link>
              <Link to={`/jobs/${job.id}`}>
                <Button variant="outline" size="icon">
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobCard;

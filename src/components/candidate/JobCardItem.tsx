import { Badge } from '@/components/ui/badge';
import { DollarSign } from 'lucide-react';
import { Link } from 'react-router-dom';

interface JobCardItemProps {
  id: string;
  companyLogo: string;
  companyName: string;
  jobTitle: string;
  location: string;
  salary: string;
  appliedDate: string;
  isExpired?: boolean;
  status: string;
  applicationId?: string;
}


const JobCardItem = ({
  id,
  companyLogo,
  companyName,
  jobTitle,
  location,
  salary,
  appliedDate,
  isExpired = false,
  applicationId
}: JobCardItemProps) => {
  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200 hover:border-red-200 hover:shadow-sm transition-all group">
      <div className="flex items-start gap-4">
        {/* Company Logo */}
        <div className="w-16 h-16 flex-shrink-0 border border-gray-100 rounded-lg p-1 bg-white">
          <img
            src={companyLogo}
            alt={companyName}
            className="w-full h-full object-contain rounded"
          />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-start">
            <div>
              <Link
                to={applicationId ? `/candidate/applications/${applicationId}` : `/jobs/${id}`}
                className="text-lg font-bold text-foreground group-hover:text-red-600 transition-colors line-clamp-1"
              >
                {jobTitle}
              </Link>
              <div className="text-muted-foreground mb-1">
                {companyName}
              </div>
              <div className="text-sm text-gray-400 mb-2">
                {location} • At office
              </div>

              <div className="flex items-center gap-1 text-green-600 font-medium text-sm">
                <DollarSign className="h-4 w-4" />
                <span>{salary || "You'll love it"}</span>
              </div>
            </div>

            <div className="text-right flex flex-col items-end gap-2">
              <span className="text-sm text-muted-foreground whitespace-nowrap">
                Applied on {appliedDate}
              </span>
              {isExpired && (
                <Badge variant="secondary" className="bg-gray-100 text-gray-500 font-normal">
                  Expired
                </Badge>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Footer/Actions - optional based on design, currently hidden in screenshot but common */}
      {/* <div className="mt-4 pt-4 border-t border-dashed border-gray-200 flex justify-between items-center">
         <span className="text-xs text-green-600 font-medium flex items-center gap-1">
            <CheckCircle className="h-3 w-3" /> Employer viewed
         </span>
      </div> */}
    </div>
  );
};

export default JobCardItem;

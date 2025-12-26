import { FileText } from 'lucide-react';
import { Link } from 'react-router-dom';

const DashboardCVCard = () => {
  return (
    <div className="bg-white rounded-xl border border-border p-6 shadow-sm">


      <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
        <div className="flex items-start gap-4">
          <div className="bg-primary/10 p-3 rounded-lg">
            <FileText className="h-8 w-8 text-primary" />
          </div>

          <div className="flex-1">
            <Link
              to="#"
              className="text-foreground font-medium hover:underline block mb-1"
            >
              Junior Backend Developer (Java) - Đặng Mai Anh Tú.pdf
            </Link>
            <p className="text-sm text-muted-foreground mb-3">
              Last uploaded: 24/10/2025
            </p>

            <Link
              to="/candidate/cv-manager"
              className="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1 text-sm"
            >
              Manage CV attachment <span className="text-lg">›</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardCVCard;

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuth } from '@/contexts/AuthContext';
import { Briefcase, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

const DashboardProfileCard = () => {
  const { user } = useAuth();

  return (
    <div className="bg-white rounded-xl border border-border p-6 shadow-sm">
      <div className="flex items-start gap-6">
        <Avatar className="h-24 w-24">
          <AvatarImage src={user?.avatar} alt={user?.name} />
          <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
        </Avatar>

        <div className="space-y-3 flex-1">
          <h2 className="text-2xl font-bold text-foreground">
            {user?.name || 'Candidate'}
          </h2>

          <div className="space-y-2 text-muted-foreground">
            <div className="flex items-center gap-2">
              <Briefcase className="h-4 w-4" />
              <span>Full Stack Developer</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              <span>{user?.email}</span>
            </div>
            <div className="flex items-center gap-2">
              <span role="img" aria-label="phone">📱</span>
              <span>0123 456 789</span>
            </div>
          </div>

          <div className="pt-2">
            <Link
              to="/candidate/profile"
              className="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
            >
              Update your profile <span className="text-lg">›</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardProfileCard;

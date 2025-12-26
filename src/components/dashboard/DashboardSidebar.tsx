import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';
import {
  Bell,
  Briefcase,
  FileText,
  LayoutDashboard,
  Mail,
  Settings,
  User
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const DashboardSidebar = () => {
  const { user } = useAuth();
  const location = useLocation();

  const menuItems = [
    {
      icon: LayoutDashboard,
      label: 'Dashboard',
      href: '/candidate/dashboard',
    },
    {
      icon: FileText,
      label: 'CV Attachment',
      href: '/candidate/cv-manager', // Placeholder path
    },
    {
      icon: User,
      label: 'Profile',
      href: '/candidate/profile', // Placeholder path
    },
    {
      icon: Briefcase,
      label: 'My Jobs',
      href: '/candidate/applications',
    },
    {
      icon: Mail,
      label: 'Job Invitation',
      href: '/candidate/job-invitations', // Placeholder path
      badge: 0,
    },

    {
      icon: Bell,
      label: 'Notifications',
      href: '/candidate/notifications', // Placeholder path
    },
    {
      icon: Settings,
      label: 'Settings',
      href: '/candidate/settings', // Placeholder path
    },
  ];

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="bg-background rounded-xl h-full">
      {/* Welcome Section */}
      <div className="mb-6 px-4 pt-4">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xl">👋</span>
          <span className="text-sm text-muted-foreground">Welcome</span>
        </div>
        <h2 className="text-lg font-bold text-foreground">
          {user?.name || 'Candidate'}
        </h2>
      </div>

      {/* Navigation Links */}
      <nav className="space-y-1">
        {menuItems.map((item) => {
          const active = isActive(item.href);
          return (
            <Link
              key={item.label}
              to={item.href}
              className={cn(
                "flex items-center justify-between px-4 py-3 text-sm font-medium transition-colors hover:bg-muted/50 border-l-4 border-transparent",
                active
                  ? "text-primary bg-primary/10 border-primary"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <div className="flex items-center gap-3">
                <item.icon className={cn("h-5 w-5", active ? "text-primary" : "text-muted-foreground")} />
                <span>{item.label}</span>
              </div>
              {item.badge !== undefined && (
                <span className={cn(
                  "px-2 py-0.5 rounded-full text-xs text-white",
                  item.badge > 0 ? "bg-primary" : "bg-gray-400"
                )}>
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

export default DashboardSidebar;

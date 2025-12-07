import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { formatDistanceToNow } from 'date-fns';
import {
  Bell,
  Briefcase,
  Calendar,
  CheckCircle,
  Clock,
  X
} from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Mock Notification Data
const mockNotifications = [
  {
    id: 'n1',
    type: 'application_update',
    title: 'Application Status Updated',
    message: 'Your application for Senior Frontend Developer at TechCorp has been moved to "Interview" stage.',
    timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 mins ago
    read: false,
    link: '/candidate/applications',
    icon: Briefcase,
    color: 'bg-accent/10 text-accent'
  },
  {
    id: 'n2',
    type: 'interview_invite',
    title: 'New Interview Invitation',
    message: 'Google has invited you to a technical screening interview.',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    read: false,
    link: '/candidate/applications',
    icon: Calendar,
    color: 'bg-purple-100 text-purple-700'
  },
  {
    id: 'n3',
    type: 'profile_view',
    title: 'Profile View',
    message: 'Your profile was viewed by a recruiter from Microsoft.',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
    read: true,
    link: '/profile', // Placeholder
    icon: CheckCircle,
    color: 'bg-green-100 text-green-700'
  },
  {
    id: 'n4',
    type: 'new_job',
    title: 'New Job Alert',
    message: 'A new job matching your preferences "Product Designer" was posted.',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48), // 2 days ago
    read: true,
    link: '/jobs/j2',
    icon: Bell,
    color: 'bg-yellow-100 text-yellow-700'
  }
];

const NotificationDropdown = () => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState(mockNotifications);
  const [isOpen, setIsOpen] = useState(false);

  const handleMarkAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const handleMarkAllAsRead = (e: React.MouseEvent) => {
    e.stopPropagation();
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const deleteNotification = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const handleNotificationClick = (notification: typeof mockNotifications[0]) => {
    handleMarkAsRead(notification.id);
    setIsOpen(false);
    if (notification.link) {
      navigate(notification.link);
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5 text-muted-foreground" />
          {unreadCount > 0 && (
            <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-red-500 ring-2 ring-background" />
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80 md:w-96">
        <div className="flex items-center justify-between px-2 py-1.5">
          <span className="font-semibold text-sm">Notifications</span>
          {unreadCount > 0 && (
            <button
              onClick={handleMarkAllAsRead}
              className="text-xs text-accent hover:underline"
            >
              Mark all as read
            </button>
          )}
        </div>
        <DropdownMenuSeparator />
        <div className="max-h-[70vh] overflow-y-auto">
          {notifications.length > 0 ? (
            <div className="py-1">
              {notifications.map((notification) => (
                <DropdownMenuItem
                  key={notification.id}
                  onClick={() => handleNotificationClick(notification)}
                  className={`flex items-start gap-3 p-3 cursor-pointer ${!notification.read ? 'bg-accent/5' : ''}`}
                >
                  <div className={`p-2 h-fit rounded-full shrink-0 ${notification.color}`}>
                    <notification.icon className="h-4 w-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start mb-0.5">
                      <span className={`font-medium text-sm leading-none ${!notification.read ? 'text-foreground' : 'text-muted-foreground'}`}>
                        {notification.title}
                      </span>
                      <button
                        onClick={(e) => deleteNotification(notification.id, e)}
                        className="text-muted-foreground hover:text-destructive transition-colors ml-2"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                    <p className="text-xs text-muted-foreground line-clamp-2 mb-1">
                      {notification.message}
                    </p>
                    <p className="text-[10px] text-muted-foreground flex items-center gap-1">
                      <Clock className="h-2.5 w-2.5" />
                      {formatDistanceToNow(notification.timestamp, { addSuffix: true })}
                    </p>
                  </div>
                  {!notification.read && (
                    <span className="absolute left-1 top-1/2 -translate-y-1/2 w-1 h-1 rounded-full bg-accent" />
                  )}
                </DropdownMenuItem>
              ))}
            </div>
          ) : (
            <div className="py-8 text-center text-muted-foreground">
              <Bell className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p className="text-sm">No notifications</p>
            </div>
          )}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NotificationDropdown;

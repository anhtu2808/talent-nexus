import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { formatDistanceToNow } from 'date-fns';
import {
  Bell,
  Briefcase,
  CheckCircle,
  MessageSquare,
  X
} from 'lucide-react';
import { useState } from 'react';

const mockNotifications = [
  {
    id: 1,
    type: 'application_update',
    title: 'Application Status Updated',
    message: 'Your application for Senior Frontend Developer at TechCorp has been moved to "Interview" stage.',
    time: new Date(Date.now() - 1000 * 60 * 30), // 30 mins ago
    read: false,
    link: '/candidate/applications/1'
  },
  {
    id: 2,
    type: 'job_alert',
    title: 'New Job Match Found',
    message: 'We found a new job that matches your profile: Full Stack Engineer at StartupInc.',
    time: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    read: false,
    link: '/jobs/2'
  },
  {
    id: 3,
    type: 'message',
    title: 'New Message from Recruiter',
    message: 'Hi, we would like to schedule a screening call with you next week.',
    time: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
    read: true,
    link: '/candidate/messages'
  },
  {
    id: 4,
    type: 'system',
    title: 'Profile Completeness',
    message: 'Your profile is 80% complete. Add your certifications to reach 100%.',
    time: new Date(Date.now() - 1000 * 60 * 60 * 48), // 2 days ago
    read: true,
    link: '/candidate/profile'
  }
];

const Notifications = () => {
  const [notifications, setNotifications] = useState(mockNotifications);

  const markAsRead = (id: number) => {
    setNotifications(notifications.map(n =>
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const deleteNotification = (id: number) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'application_update':
        return <Briefcase className="h-5 w-5 text-blue-500" />;
      case 'job_alert':
        return <Bell className="h-5 w-5 text-amber-500" />;
      case 'message':
        return <MessageSquare className="h-5 w-5 text-green-500" />;
      default:
        return <Bell className="h-5 w-5 text-gray-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="bg-card border-b border-border mb-6">
        <div className="px-6 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold">Notifications</h1>
          <Button variant="outline" size="sm" onClick={markAllAsRead}>
            Mark all as read
          </Button>
        </div>
      </div>

      <div className="px-6 pb-10 space-y-4">
        {notifications.length === 0 ? (
          <Card className="p-12 text-center text-muted-foreground">
            <Bell className="h-12 w-12 mx-auto mb-4 opacity-20" />
            <p className="text-lg font-medium">No notifications yet</p>
            <p className="text-sm">We'll notify you when there's an update on your applications.</p>
          </Card>
        ) : (
          notifications.map((notification) => (
            <Card
              key={notification.id}
              className={`p-4 transition-all hover:shadow-md ${!notification.read ? 'bg-accent/5 border-l-4 border-l-accent' : ''}`}
            >
              <div className="flex items-start gap-4">
                <div className={`p-2 rounded-full ${!notification.read ? 'bg-background shadow-sm' : 'bg-muted/50'}`}>
                  {getIcon(notification.type)}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className={`font-semibold text-base ${!notification.read ? 'text-foreground' : 'text-muted-foreground'}`}>
                        {notification.title}
                        {!notification.read && (
                          <Badge variant="secondary" className="ml-2 bg-accent text-white hover:bg-accent/90">New</Badge>
                        )}
                      </h3>
                      <p className="text-sm text-foreground/80 mt-1 line-clamp-2">
                        {notification.message}
                      </p>
                      <p className="text-xs text-muted-foreground mt-2">
                        {formatDistanceToNow(notification.time, { addSuffix: true })}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      {!notification.read && (
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-accent hover:text-accent hover:bg-accent/10"
                          onClick={() => markAsRead(notification.id)}
                          title="Mark as read"
                        >
                          <CheckCircle className="h-4 w-4" />
                        </Button>
                      )}

                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-muted-foreground hover:text-primary hover:bg-primary/10"
                        onClick={() => deleteNotification(notification.id)}
                        title="Dismiss"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default Notifications;

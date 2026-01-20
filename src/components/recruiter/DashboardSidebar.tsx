import { Button } from '@/components/ui/button';

import {
    BarChart,
    Briefcase,
    CreditCard,
    FileText,
    Home,
    LogOut,
    Settings,
    Sparkles,
    Users
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

interface SidebarProps {
    activeTab: string;
    setActiveTab: (tab: string) => void;
}

export const DashboardSidebar = ({ activeTab, setActiveTab }: SidebarProps) => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const menuItems = [
        {
            id: 'reports',
            label: 'Recruitment overview',
            icon: BarChart,
        },
        {
            id: 'jobs',
            label: 'Jobs',
            icon: Briefcase,
        },
        // Only show Team tab for managers
        ...(user?.subRole === 'manager' ? [{
            id: 'team',
            label: 'Team',
            icon: Users,
        }] : []),
        {
            id: 'cvs',
            label: 'CVs',
            icon: FileText,
        },
        {
            id: 'proposed',
            label: 'Proposed CVs',
            icon: Sparkles,
        },
        {
            id: 'settings',
            label: 'Account Settings',
            icon: Settings,
        },
    ];

    return (
        <div className="w-64 bg-card border-r border-border h-[calc(100vh-64px)] sticky top-16 flex flex-col">
            <div className="p-4">
                <Button
                    variant="ghost"
                    className="w-full justify-start mb-4 text-muted-foreground hover:text-foreground"
                    onClick={() => navigate('/')}
                >
                    <Home className="h-4 w-4 mr-2" />
                    Home
                </Button>
                {menuItems.map((item) => (
                    <Button
                        key={item.id}
                        variant={activeTab === item.id ? 'secondary' : 'ghost'}
                        className={`w-full justify-start mb-1 ${activeTab === item.id ? 'bg-accent/10 text-accent font-medium' : 'text-muted-foreground'}`}
                        onClick={() => setActiveTab(item.id)}
                    >
                        <item.icon className="h-4 w-4 mr-2" />
                        {item.label}
                    </Button>
                ))}
            </div>
            <div className="p-4 border-t border-border mt-auto">

                <Button variant="ghost" className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50">
                    <LogOut className="h-4 w-4 mr-2" />
                    Đăng xuất
                </Button>
            </div>
        </div >
    );
};

import { Button } from '@/components/ui/button';

import {
    BarChart,
    Briefcase,
    Building, /* Import Building icon */
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
    restricted?: boolean;
}

export const DashboardSidebar = ({ activeTab, setActiveTab, restricted = false }: SidebarProps) => {
    const { user, updateUser } = useAuth();
    const navigate = useNavigate();

    const togglePackageStatus = () => {
        if (user && user.role === 'recruiter') {
            // Cast to any to access custom Recruiter properties if TS complains, or rely on the updated type
            updateUser({ hasPurchasedPackage: !(user as any).hasPurchasedPackage } as any);
        }
    };

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
        // Only show Company Profile for managers
        ...(user?.subRole === 'manager' ? [{
            id: 'company-info',
            label: 'Company Profile',
            icon: Building,
        }] : []),
        // Only show Billing for managers (assuming sensitive info)
        ...(user?.subRole === 'manager' ? [{
            id: 'billing',
            label: 'Billing & Credits',
            icon: CreditCard,
        }] : []),
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
                    disabled={restricted}
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
                        disabled={restricted && item.id !== 'billing' && item.id !== 'settings'}
                    >
                        <item.icon className="h-4 w-4 mr-2" />
                        {item.label}
                    </Button>
                ))}
            </div>
            <div className="p-4 border-t border-border mt-auto space-y-2">
                {/* Debug Toggle for Package Status */}
                {user?.subRole === 'manager' && (
                    <Button
                        variant="outline"
                        size="sm"
                        className="w-full text-xs border-dashed"
                        onClick={togglePackageStatus}
                    >
                        {(user as any).hasPurchasedPackage ? 'Set Unpurchased' : 'Set Purchased'}
                    </Button>
                )}

                <Button variant="ghost" className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50">
                    <LogOut className="h-4 w-4 mr-2" />
                    Đăng xuất
                </Button>
            </div>
        </div >
    );
};

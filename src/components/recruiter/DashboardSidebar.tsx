import { Button } from '@/components/ui/button';
import {
    Briefcase,
    FileText,
    Settings,
    BarChart,
    LogOut,
    CreditCard
} from 'lucide-react';

interface SidebarProps {
    activeTab: string;
    setActiveTab: (tab: string) => void;
}

export const DashboardSidebar = ({ activeTab, setActiveTab }: SidebarProps) => {
    const menuItems = [
        {
            id: 'reports',
            label: 'Recruitment report',
            icon: BarChart,
        },
        {
            id: 'jobs',
            label: 'Jobs',
            icon: Briefcase,
        },
        {
            id: 'cvs',
            label: 'CVs',
            icon: FileText,
        },
        {
            id: 'plans',
            label: 'Plans & Billing',
            icon: CreditCard,
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
            <div className="mt-auto p-4 border-t border-border">
                <Button variant="ghost" className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50">
                    <LogOut className="h-4 w-4 mr-2" />
                    Đăng xuất
                </Button>
            </div>
        </div>
    );
};

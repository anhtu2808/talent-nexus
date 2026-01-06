import { Button } from '@/components/ui/button';
import { useSubscription } from '@/contexts/SubscriptionContext';
import {
    BarChart,
    Briefcase,
    CreditCard,
    FileText,
    Home,
    LogOut,
    Settings,
    Sparkles
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface SidebarProps {
    activeTab: string;
    setActiveTab: (tab: string) => void;
}

export const DashboardSidebar = ({ activeTab, setActiveTab }: SidebarProps) => {
    const { tier, togglePlan } = useSubscription();
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
                <div className="mb-4 p-3 bg-muted/50 rounded-lg">
                    <div className="text-xs font-medium text-muted-foreground mb-2">Dev Mode: Plan</div>
                    <div className="flex bg-background rounded-md border border-border p-1">
                        <Button
                            variant="ghost"
                            size="sm"
                            className={`flex-1 h-7 text-xs ${tier === 'free' ? 'bg-primary text-primary-foreground shadow-sm' : ''}`}
                            onClick={() => tier === 'premium' && togglePlan()}
                        >
                            Free
                        </Button>
                        <Button
                            variant="ghost"
                            size="sm"
                            className={`flex-1 h-7 text-xs ${tier === 'premium' ? 'bg-primary text-primary-foreground shadow-sm' : ''}`}
                            onClick={() => tier === 'free' && togglePlan()}
                        >
                            Premium
                        </Button>
                    </div>
                </div>

                <Button variant="ghost" className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50">
                    <LogOut className="h-4 w-4 mr-2" />
                    Đăng xuất
                </Button>
            </div>
        </div >
    );
};

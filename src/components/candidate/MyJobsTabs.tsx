import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface MyJobsTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  counts: {
    applied: number;
    saved: number;
    recent: number;
  };
}

const MyJobsTabs = ({ activeTab, onTabChange, counts }: MyJobsTabsProps) => {
  const tabs = [
    { id: 'applied', label: 'Applied Jobs', count: counts.applied },
    { id: 'saved', label: 'Saved Jobs', count: counts.saved },
    { id: 'recent', label: 'Recent Viewed Jobs', count: counts.recent },
  ];

  return (
    <div className="flex items-center gap-8 border-b border-gray-200 mb-6">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={cn(
              "flex items-center gap-2 py-4 border-b-2 transition-all font-medium text-sm relative top-[1px]",
              isActive
                ? "border-red-500 text-foreground"
                : "border-transparent text-muted-foreground hover:text-foreground"
            )}
          >
            {tab.label}
            <Badge
              variant="secondary"
              className={cn(
                "rounded-full h-5 min-w-5 flex items-center justify-center px-1 text-xs",
                isActive ? "bg-red-500 text-white hover:bg-red-600" : "bg-gray-200 text-gray-600 hover:bg-gray-300"
              )}
            >
              {tab.count}
            </Badge>
          </button>
        );
      })}
    </div>
  );
};

export default MyJobsTabs;

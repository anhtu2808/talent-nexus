import { 
  LayoutDashboard, Users, Activity, Settings, Shield, 
  FileText, BarChart3, LogOut, ChevronLeft, Briefcase 
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { cn } from "@/lib/utils";

interface AdminSidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

const navItems = [
  { title: "Dashboard", url: "/admin/dashboard", icon: LayoutDashboard },
  { title: "User Management", url: "/admin/users", icon: Users },
  { title: "Job Management", url: "/admin/jobs", icon: Briefcase },
  { title: "AI Monitoring", url: "/admin/ai-monitoring", icon: Activity },
  { title: "System Logs", url: "/admin/logs", icon: FileText },
  { title: "Analytics", url: "/admin/analytics", icon: BarChart3 },
  { title: "Settings", url: "/admin/settings", icon: Settings },
];

export function AdminSidebar({ collapsed, onToggle }: AdminSidebarProps) {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/auth');
  };

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-40 h-screen bg-white border-r border-slate-200 transition-all duration-300 shadow-sm",
        collapsed ? "w-20" : "w-64"
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between h-16 px-4 border-b border-slate-100">
        {!collapsed && (
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#38B65F] to-[#2D914C] flex items-center justify-center shadow-lg shadow-green-500/20">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-[#0F2238] tracking-tight">Admin Panel</span>
          </div>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggle}
          className={cn("h-8 w-8 hover:bg-slate-100", collapsed && "mx-auto")}
        >
          <ChevronLeft className={cn("h-4 w-4 transition-transform text-slate-500", collapsed && "rotate-180")} />
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.url}
            to={item.url}
            className={({ isActive }) => cn(
              "flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 font-medium group",
              isActive 
                ? "bg-[#38B65F]/10 text-[#38B65F]" 
                : "text-slate-500 hover:bg-slate-50 hover:text-[#38B65F]",
              collapsed && "justify-center px-0"
            )}
          >
            <item.icon className={cn("w-5 h-5 flex-shrink-0", "group-hover:scale-110 transition-transform")} />
            {!collapsed && <span className="text-sm">{item.title}</span>}
          </NavLink>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-slate-100">
        <Button
          onClick={handleLogout}
          className={cn(
            "w-full flex items-center gap-3 px-3 py-3 rounded-xl text-slate-500 hover:bg-red-50 hover:text-red-500 transition-all font-medium bg-transparent border-none",
            collapsed && "justify-center px-0"
          )}
        >
          <LogOut className="w-5 h-5 flex-shrink-0" />
          {!collapsed && <span className="text-sm">Thoát Admin</span>}
        </Button>
      </div>
    </aside>
  );
}
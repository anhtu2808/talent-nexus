import { 
  LayoutDashboard, 
  Users, 
  Activity, 
  Settings, 
  Shield,
  FileText,
  BarChart3,
  LogOut,
  ChevronLeft,
  Briefcase,
  Building
} from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface AdminSidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

const navItems = [
  { title: "Dashboard", url: "/admin", icon: LayoutDashboard },
  { title: "User Management", url: "/admin/users", icon: Users },
  { title: "Job Management", url: "/admin/jobs", icon: Briefcase },
  { title: "Company Management", url: "/admin/companies", icon: Building },
  { title: "Transactions", url: "/admin/transactions", icon: FileText },
];

export function AdminSidebar({ collapsed, onToggle }: AdminSidebarProps) {
  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-40 h-screen bg-card border-r border-border transition-all duration-300 shadow-sm",
        collapsed ? "w-16" : "w-64"
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between h-16 px-4 border-b border-border">
        {!collapsed && (
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#38B65F] to-[#2D914C] flex items-center justify-center shadow-lg shadow-green-500/10">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-foreground tracking-tight">Admin Panel</span>
          </div>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggle}
          className={cn("h-8 w-8 hover:bg-muted", collapsed && "mx-auto")}
        >
          <ChevronLeft className={cn("h-4 w-4 transition-transform text-muted-foreground", collapsed && "rotate-180")} />
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.url}
            to={item.url}
            end={item.url === "/admin"}
            className={cn(
              "flex items-center gap-3 px-3 py-2.5 rounded-xl text-muted-foreground hover:bg-muted hover:text-foreground transition-all duration-200 group",
              collapsed && "justify-center px-2"
            )}
            activeClassName="bg-[#38B65F]/10 text-[#38B65F] hover:bg-[#38B65F]/15 hover:text-[#38B65F]"
          >
            <item.icon className="w-5 h-5 flex-shrink-0 group-hover:scale-105 transition-transform" />
            {!collapsed && <span className="text-sm font-semibold">{item.title}</span>}
          </NavLink>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-3 border-t border-border">
        <NavLink
          to="/"
          className={cn(
            "flex items-center gap-3 px-3 py-2.5 rounded-xl text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-all duration-200 group",
            collapsed && "justify-center px-2"
          )}
        >
          <LogOut className="w-5 h-5 flex-shrink-0 group-hover:-translate-x-1 transition-transform" />
          {!collapsed && <span className="text-sm font-semibold">Exit Admin</span>}
        </NavLink>
      </div>
    </aside>
  );
}
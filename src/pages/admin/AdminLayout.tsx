import { useState } from "react";
import { Outlet, Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import NotificationDropdown from '@/components/notifications/NotificationDropdown';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { 
  Briefcase, ChevronDown, LayoutDashboard, LogOut, 
  Menu, X, Shield, Users, Activity, FileText, Settings, BarChart3, 
  Building
} from 'lucide-react';

interface AdminLayoutProps {
  children?: React.ReactNode;
  title?: string;
  subtitle?: string;
}

export function AdminLayout({ children, title, subtitle }: AdminLayoutProps) {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navItems = [
    { title: "Dashboard", url: "/admin/dashboard", icon: LayoutDashboard },
    { title: "Users", url: "/admin/users", icon: Users },
    { title: "Jobs", url: "/admin/jobs", icon: Briefcase },
    { title: "Companies", url: "/admin/companies", icon: Building },
    { title: "AI Monitoring", url: "/admin/ai-monitoring", icon: Activity },
    { title: "Logs", url: "/admin/logs", icon: FileText },
    { title: "Analytics", url: "/admin/analytics", icon: BarChart3 },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Header đồng bộ với phong cách SmartRecruit */}
      <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-8">
            {/* Logo dark navy */}
            <Link to="/" className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#0F2238]">
                <Shield className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold text-foreground">
                Smart<span className="text-[#38B65F]">Recruit</span>
              </span>
            </Link>

            <nav className="hidden md:flex items-center gap-6 overflow-x-auto no-scrollbar">
              {navItems.map((item) => (
                <Link 
                  key={item.url}
                  to={item.url} 
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-foreground whitespace-nowrap",
                    location.pathname === item.url 
                      ? "text-[#38B65F] font-bold" // Active color xanh lá giống hình SmartRecruit
                      : "text-muted-foreground"
                  )}
                >
                  {item.title}
                </Link>
              ))}
            </nav>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <NotificationDropdown />
            {isAuthenticated && user && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center gap-2 px-2 hover:bg-[#F8FAFC]">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback className="bg-[#38B65F]/10 text-[#38B65F] font-bold">
                        {user.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-medium">{user.name}</span>
                    <ChevronDown className="h-4 w-4 text-muted-foreground" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="px-2 py-1.5">
                    <p className="text-sm font-bold text-[#0F2238]">{user.name}</p>
                    <p className="text-xs text-muted-foreground">{user.email}</p>
                    <span className="mt-1 inline-block rounded-full bg-[#38B65F]/10 px-2 py-0.5 text-xs font-medium text-[#38B65F] capitalize">
                      {user.role}
                    </span>
                  </div>
                  <DropdownMenuSeparator />
                  {navItems.map((item) => (
                    <DropdownMenuItem key={item.url} onClick={() => navigate(item.url)}>
                      <item.icon className="mr-2 h-4 w-4" />
                      {item.title}
                    </DropdownMenuItem>
                  ))}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="text-destructive focus:text-destructive">
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>
      </header>

      <main className="container py-8 md:py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#0F2238] tracking-tight">{title}</h1>
          {subtitle && <p className="text-slate-500 mt-2 text-sm font-medium">{subtitle}</p>}
        </div>
        {children || <Outlet />}
      </main>
    </div>
  );
}
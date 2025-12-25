import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
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
import { AdminSidebar } from "@/components/layout/AdminSidebar" // Import Sidebar đã sửa ở bước trước
import { cn } from '@/lib/utils';
import { 
  ChevronDown, LogOut, Menu, User, Settings
} from 'lucide-react';

interface AdminLayoutProps {
  children?: React.ReactNode;
  title?: string;
  subtitle?: string;
}

export function AdminLayout({ children, title, subtitle }: AdminLayoutProps) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/auth');
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex">
      {/* Sidebar cố định bên trái */}
      <AdminSidebar 
        collapsed={collapsed} 
        onToggle={() => setCollapsed(!collapsed)} 
      />

      {/* Khu vực nội dung bên phải */}
      <div className={cn(
        "flex-1 flex flex-col transition-all duration-300",
        collapsed ? "pl-16" : "pl-64" // Padding để không bị Sidebar đè lên
      )}>
        
        {/* Topbar: Chứa thông tin User & Thông báo */}
        <header className="h-16 border-b border-slate-200 bg-white sticky top-0 z-30 flex items-center justify-between px-8">
          <div>
            {/* Có thể để Search bar hoặc Breadcrumbs ở đây */}
          </div>

          <div className="flex items-center gap-4">
            <NotificationDropdown />
            
            <div className="h-6 w-[1px] bg-slate-200 mx-2" /> {/* Divider */}

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-3 px-2 hover:bg-slate-50 transition-colors">
                  <div className="text-right hidden sm:block">
                    <p className="text-xs font-bold text-[#0F2238] leading-none">{user?.name}</p>
                    <p className="text-[10px] text-slate-400 mt-1 uppercase font-black tracking-tighter">
                      {user?.role}
                    </p>
                  </div>
                  <Avatar className="h-9 w-9 border-2 border-[#38B65F]/20">
                    <AvatarImage src={user?.avatar} alt={user?.name} />
                    <AvatarFallback className="bg-[#38B65F]/10 text-[#38B65F] font-bold">
                      {user?.name?.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <ChevronDown className="h-4 w-4 text-slate-400" />
                </Button>
              </DropdownMenuTrigger>
              
              <DropdownMenuContent align="end" className="w-56 rounded-xl shadow-xl border-slate-100 p-1">
                <div className="px-3 py-2 border-b border-slate-50 mb-1">
                  <p className="text-xs text-slate-400 font-medium">Signed in as</p>
                  <p className="text-sm font-bold text-[#0F2238] truncate">{user?.email}</p>
                </div>
                
                <DropdownMenuItem className="gap-2 font-medium cursor-pointer rounded-lg">
                  <User className="w-4 h-4 text-slate-400" /> Profile Settings
                </DropdownMenuItem>
                <DropdownMenuItem className="gap-2 font-medium cursor-pointer rounded-lg">
                  <Settings className="w-4 h-4 text-slate-400" /> System Config
                </DropdownMenuItem>
                
                <DropdownMenuSeparator className="bg-slate-50" />
                
                <DropdownMenuItem 
                  onClick={handleLogout} 
                  className="gap-2 font-bold text-red-500 focus:text-red-500 focus:bg-red-50 cursor-pointer rounded-lg"
                >
                  <LogOut className="w-4 h-4" /> Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Nội dung chính */}
        <main className="p-8 max-w-7xl mx-auto w-full">
          {(title || subtitle) && (
            <div className="mb-8">
              <h1 className="text-3xl font-black text-[#0F2238] tracking-tight">
                {title}
              </h1>
              {subtitle && (
                <p className="text-slate-500 mt-1 text-sm font-medium">
                  {subtitle}
                </p>
              )}
            </div>
          )}
          
          <div className="animate-in fade-in duration-500">
            {children || <Outlet />}
          </div>
        </main>
      </div>
    </div>
  );
}
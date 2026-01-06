import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Users, Briefcase, FileText, Activity, TrendingUp, TrendingDown,
  CheckCircle, Clock, ShieldAlert, Building2, ChevronRight
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";

const stats = [
  { label: "Total Users", value: "12,847", change: "+12%", trend: "up", icon: Users },
  { label: "Active Jobs", value: "1,234", change: "+8%", trend: "up", icon: Briefcase },
  { label: "CVs Processed", value: "45,678", change: "+23%", trend: "up", icon: FileText },
  { label: "AI Requests Today", value: "8,492", change: "-5%", trend: "down", icon: Activity },
];

// Cập nhật Mock Data công ty chờ duyệt (Sử dụng ID khớp với CompanyDetail)
const pendingCompanies = [
  { id: "3", name: "StartupXYZ", appliedAt: "2026-01-05T10:00:00", type: "Fintech" },
  { id: "3", name: "CloudFirst", appliedAt: "2026-01-04T14:30:00", type: "Cloud Services" },
  { id: "3", name: "Design Studio", appliedAt: "2026-01-03T09:15:00", type: "Creative" },
].sort((a, b) => new Date(a.appliedAt).getTime() - new Date(b.appliedAt).getTime());

const getWaitTime = (dateString: string) => {
  const diffInHours = Math.floor((new Date().getTime() - new Date(dateString).getTime()) / (1000 * 60 * 60));
  if (diffInHours > 24) return `${Math.floor(diffInHours / 24)}d ago`;
  return `${diffInHours}h ago`;
};

const recentUsers = [
  { id: "1", name: "John Smith", email: "john@example.com", role: "Candidate", status: "Active" },
  { id: "2", name: "TechCorp Inc", email: "hr@techcorp.io", role: "Recruiter", status: "Active" },
  { id: "3", name: "Sarah Johnson", email: "sarah@example.com", role: "Candidate", status: "Pending" },
];

export default function AdminDashboard() {
  const navigate = useNavigate();

  return (
    <div className="space-y-6 text-left animate-in fade-in duration-500">
      <div>
        <h1 className="text-4xl font-black text-[#0F2238] tracking-tight">Platform Overview</h1>
        <p className="text-slate-500 mt-2 text-sm font-bold uppercase tracking-wider">System Health & AI Performance Metrics </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.label} className="border-none shadow-sm hover:shadow-md transition-all duration-300 bg-white group cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-2xl bg-[#38B65F]/10 flex items-center justify-center group-hover:bg-[#38B65F] transition-colors duration-300">
                  <stat.icon className="w-6 h-6 text-[#38B65F] group-hover:text-white transition-colors" />
                </div>
                <div className={cn(
                  "flex items-center gap-1 text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-tighter",
                  stat.trend === "up" ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
                )}>
                  {stat.trend === "up" ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                  {stat.change}
                </div>
              </div>
              <p className="text-3xl font-black text-[#0F2238] tracking-tight">{stat.value}</p>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">{stat.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Pending Approvals Section - Direct Navigation to Detail */}
        <Card className="border-none shadow-sm bg-white overflow-hidden">
          <CardHeader className="border-b border-slate-50 bg-slate-50/50 py-4">
            <CardTitle className="text-sm font-black uppercase tracking-widest flex items-center gap-2 text-[#0F2238]">
              <ShieldAlert className="w-4 h-4 text-orange-500" /> Verification Queue 
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 space-y-3">
            {pendingCompanies.map((company) => (
              <div 
                key={company.id} 
                onClick={() => navigate(`/admin/companies/${company.id}`)} // ĐIỀU HƯỚNG TRỰC TIẾP
                className="flex items-center justify-between p-3 rounded-xl bg-slate-50 group hover:bg-white hover:shadow-md transition-all border border-transparent hover:border-slate-100 cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-orange-50 rounded-lg group-hover:bg-orange-500 transition-colors">
                    <Building2 className="w-4 h-4 text-orange-500 group-hover:text-white" />
                  </div>
                  <div>
                    <p className="font-bold text-sm text-[#0F2238]">{company.name}</p>
                    <p className="text-[9px] text-slate-400 uppercase font-black tracking-tight">{company.type}</p>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <div className="flex items-center gap-1 text-[10px] font-black text-orange-600 uppercase tracking-tighter">
                    <Clock className="w-3 h-3" />
                    {getWaitTime(company.appliedAt)}
                  </div>
                  <span className="text-[10px] font-black text-[#38B65F] uppercase flex items-center mt-1">
                    Review <ChevronRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* User Table - Monitoring New Sign-ups */}
        <Card className="lg:col-span-2 border-none shadow-sm bg-white overflow-hidden">
          <CardHeader className="border-b border-slate-50 bg-slate-50/50 flex flex-row items-center justify-between py-4 px-6">
            <CardTitle className="text-sm font-black uppercase tracking-widest text-[#0F2238]">Audit Trail: New Sign-ups</CardTitle>
            <Button 
                variant="ghost" 
                size="sm" 
                className="text-[#38B65F] font-black text-[10px] uppercase hover:bg-[#38B65F]/10 tracking-widest"
                onClick={() => navigate('/admin/users')}
            >
                View Full Registry
            </Button>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="text-[10px] uppercase tracking-widest font-black text-slate-400 bg-slate-50/30">
                  <tr>
                    <th className="px-6 py-4">Account Holder</th>
                    <th className="px-6 py-4">Security Role</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4 text-right">Audit</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {recentUsers.map((user) => (
                    <tr key={user.id} className="hover:bg-slate-50/50 transition-colors group">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3 text-left">
                          <div className="w-9 h-9 rounded-xl bg-[#38B65F]/10 flex items-center justify-center font-black text-[#38B65F] text-xs border border-white">
                            {user.name.charAt(0)}
                          </div>
                          <div>
                            <p className="font-bold text-sm text-[#0F2238] group-hover:text-[#38B65F] transition-colors">{user.name}</p>
                            <p className="text-[10px] text-slate-400 font-medium">{user.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <Badge className={cn(
                          "shadow-none rounded-lg px-2.5 py-0.5 font-black text-[9px] uppercase border-none",
                          user.role === "Recruiter" ? "bg-blue-50 text-blue-600" : "bg-purple-50 text-purple-600"
                        )}>
                          {user.role}
                        </Badge>
                      </td>
                      <td className="px-6 py-4">
                         <div className={cn(
                            "flex items-center gap-1.5 font-black text-[10px] uppercase",
                            user.status === "Active" ? "text-[#38B65F]" : "text-amber-500"
                         )}>
                            <CheckCircle className="w-3.5 h-3.5" /> {user.status}
                         </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <Button 
                            variant="ghost" 
                            size="sm" 
                            className="text-slate-400 hover:text-[#0F2238] font-black text-[10px] uppercase"
                            onClick={() => navigate(`/admin/users/${user.id}`)}
                        >
                            Inspect
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Users, Briefcase, FileText, Activity, TrendingUp, TrendingDown,
  CheckCircle, Clock, ShieldAlert, Building2, ChevronRight
} from "lucide-react";
import { cn } from "@/lib/utils";

const stats = [
  { label: "Total Users", value: "12,847", change: "+12%", trend: "up", icon: Users },
  { label: "Active Jobs", value: "1,234", change: "+8%", trend: "up", icon: Briefcase },
  { label: "CVs Processed", value: "45,678", change: "+23%", trend: "up", icon: FileText },
  { label: "AI Requests Today", value: "8,492", change: "-5%", trend: "down", icon: Activity },
];

// Dữ liệu công ty đang chờ duyệt
const pendingCompanies = [
  { id: 1, name: "FPT Software", appliedAt: "2023-10-20T10:00:00", type: "Technology" },
  { id: 2, name: "Vietcombank", appliedAt: "2023-10-22T14:30:00", type: "Banking" },
  { id: 3, name: "VinGroup", appliedAt: "2023-10-24T09:15:00", type: "Conglomerate" },
].sort((a, b) => new Date(a.appliedAt).getTime() - new Date(b.appliedAt).getTime()); // Sắp xếp cũ nhất lên đầu

// Hàm tính thời gian chờ đơn giản
const getWaitTime = (dateString: string) => {
  const diffInHours = Math.floor((new Date().getTime() - new Date(dateString).getTime()) / (1000 * 60 * 60));
  if (diffInHours > 24) return `${Math.floor(diffInHours / 24)}d ago`;
  return `${diffInHours}h ago`;
};

const recentUsers = [
  { id: 1, name: "Nguyen Van A", email: "vana@gmail.com", role: "Candidate", status: "Active", joined: "Today" },
  { id: 2, name: "Tech Global JSC", email: "hr@techglobal.com", role: "Recruiter", status: "Active", joined: "Today" },
  { id: 3, name: "Tran Thi B", email: "thib@gmail.com", role: "Candidate", status: "Pending", joined: "Yesterday" },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-bold text-[#0F2238] tracking-tight">Platform Overview</h1>
        <p className="text-slate-500 mt-2 text-sm font-medium">Monitor AI performance and platform-wide activities.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.label} className="border-none shadow-sm hover:shadow-md transition-all duration-300 bg-white group">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-2xl bg-[#38B65F]/10 flex items-center justify-center group-hover:bg-[#38B65F] transition-colors duration-300">
                  <stat.icon className="w-6 h-6 text-[#38B65F] group-hover:text-white transition-colors" />
                </div>
                <div className={cn(
                  "flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full",
                  stat.trend === "up" ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
                )}>
                  {stat.trend === "up" ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                  {stat.change}
                </div>
              </div>
              <p className="text-3xl font-bold text-[#0F2238] tracking-tight">{stat.value}</p>
              <p className="text-sm font-medium text-slate-400 mt-1">{stat.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Pending Approvals Section */}
        <Card className="border-none shadow-sm bg-white overflow-hidden">
          <CardHeader className="border-b border-slate-50 bg-slate-50/50">
            <CardTitle className="text-lg font-bold flex items-center gap-2 text-[#0F2238]">
              <ShieldAlert className="w-5 h-5 text-orange-500" /> Pending Approvals
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            {pendingCompanies.map((company) => (
              <div key={company.id} className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 group hover:bg-white hover:shadow-sm transition-all border border-transparent hover:border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-orange-50 rounded-lg group-hover:bg-orange-500 transition-colors">
                    <Building2 className="w-4 h-4 text-orange-500 group-hover:text-white" />
                  </div>
                  <div>
                    <p className="font-bold text-sm text-[#0F2238]">{company.name}</p>
                    <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">{company.type}</p>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-orange-600">
                    <Clock className="w-3 h-3" />
                    {getWaitTime(company.appliedAt)}
                  </div>
                  <button className="text-[10px] font-bold text-[#38B65F] flex items-center hover:underline">
                    Review <ChevronRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
            {pendingCompanies.length === 0 && (
              <div className="text-center py-6 text-slate-400 text-sm">No pending approvals</div>
            )}
          </CardContent>
        </Card>

        {/* User Table */}
        <Card className="lg:col-span-2 border-none shadow-sm bg-white overflow-hidden">
          <CardHeader className="border-b border-slate-50 bg-slate-50/50 flex flex-row items-center justify-between">
            <CardTitle className="text-lg font-bold text-[#0F2238]">New Sign-ups</CardTitle>
            <Button variant="ghost" size="sm" className="text-[#38B65F] font-bold hover:bg-[#38B65F]/10">View All</Button>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="text-[11px] uppercase tracking-wider font-bold text-slate-400 bg-slate-50/50">
                  <tr>
                    <th className="px-6 py-4">User Info</th>
                    <th className="px-6 py-4">Role</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {recentUsers.map((user) => (
                    <tr key={user.id} className="hover:bg-slate-50/30 transition-colors group">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-500 text-xs">
                            {user.name.charAt(0)}
                          </div>
                          <div>
                            <p className="text-sm font-bold text-[#0F2238]">{user.name}</p>
                            <p className="text-xs text-slate-400">{user.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <Badge className={cn(
                          "shadow-none rounded-lg px-2.5 py-0.5 font-bold text-[10px]",
                          user.role === "Recruiter" ? "bg-blue-50 text-blue-600" : "bg-purple-50 text-purple-600"
                        )}>
                          {user.role}
                        </Badge>
                      </td>
                      <td className="px-6 py-4">
                         <div className="flex items-center gap-1.5 text-green-600 font-bold text-xs">
                            <CheckCircle className="w-3.5 h-3.5" /> {user.status}
                         </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <Button variant="ghost" size="sm" className="text-slate-400 hover:text-[#38B65F]">Manage</Button>
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
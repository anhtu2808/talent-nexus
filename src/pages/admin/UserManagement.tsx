import { useState } from "react";
import { AdminLayout } from "./AdminLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  Search, 
  MoreVertical, 
  UserCheck, 
  UserX, 
  Mail,
  Key,
  Trash2,
  Eye,
  Download,
  Users,
  ShieldCheck,
  Calendar
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

const users = [
  { id: 1, name: "John Smith", email: "john@example.com", role: "Candidate", status: "Active", cvCount: 3, applications: 12, joined: "Dec 1, 2024" },
  { id: 2, name: "TechCorp Inc", email: "hr@techcorp.com", role: "Recruiter", status: "Active", jobPosts: 8, hires: 24, joined: "Nov 15, 2024" },
  { id: 3, name: "Sarah Johnson", email: "sarah@example.com", role: "Candidate", status: "Pending", cvCount: 1, applications: 0, joined: "Dec 10, 2024" },
  { id: 4, name: "Global Hire", email: "contact@globalhire.com", role: "Recruiter", status: "Active", jobPosts: 15, hires: 67, joined: "Oct 20, 2024" },
  { id: 5, name: "Mike Davis", email: "mike@example.com", role: "Candidate", status: "Suspended", cvCount: 2, applications: 5, joined: "Nov 1, 2024" },
  { id: 8, name: "Admin User", email: "admin@smartrecruit.com", role: "Admin", status: "Active", lastLogin: "Today", joined: "Jan 1, 2024" },
];

export default function UserManagement() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* 1. Impactful Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-left">
        <StatCard label="Total Users" value="12,847" color="text-[#0F2238]" icon={<Users />} />
        <StatCard label="Candidates" value="9,234" color="text-blue-500" icon={<Users />} />
        <StatCard label="Recruiters" value="3,608" color="text-[#38B65F]" icon={<Users />} />
        <StatCard label="Admins" value="5" color="text-red-500" icon={<ShieldCheck />} />
      </div>

      {/* 2. Synchronized Filter Bar */}
      <Card className="bg-white border-none shadow-sm rounded-2xl mb-6 overflow-hidden">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="relative flex-1 group w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-[#38B65F] transition-colors" />
              <Input
                placeholder="Search users by name or email..."
                className="pl-10 bg-slate-50 border-none rounded-xl h-11 focus-visible:ring-[#38B65F]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-3 w-full md:w-auto">
              <Select defaultValue="all">
                <SelectTrigger className="w-full md:w-40 border-slate-200 rounded-xl h-11 font-semibold text-slate-600">
                  <SelectValue placeholder="Role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Roles</SelectItem>
                  <SelectItem value="candidate">Candidate</SelectItem>
                  <SelectItem value="recruiter">Recruiter</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" className="h-11 rounded-xl border-slate-200 font-bold hover:bg-slate-50 text-slate-600">
                <Download className="w-4 h-4 mr-2" /> Export
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 3. User Data Table */}
      <Card className="bg-white border-none shadow-sm rounded-2xl overflow-hidden">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-slate-50 bg-slate-50/50">
                  <th className="py-4 px-6 text-[11px] uppercase tracking-wider font-bold text-slate-400">User Details</th>
                  <th className="py-4 px-6 text-[11px] uppercase tracking-wider font-bold text-slate-400">Role</th>
                  <th className="py-4 px-6 text-[11px] uppercase tracking-wider font-bold text-slate-400">Account Status</th>
                  <th className="py-4 px-6 text-[11px] uppercase tracking-wider font-bold text-slate-400">Platform Activity</th>
                  <th className="py-4 px-6 text-[11px] uppercase tracking-wider font-bold text-slate-400">Joined</th>
                  <th className="py-4 px-6 text-[11px] uppercase tracking-wider font-bold text-slate-400 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3 text-left">
                        <Avatar className="h-10 w-10 border-2 border-white shadow-sm">
                          <AvatarFallback className={cn(
                            "text-xs font-bold",
                            user.role === "Admin" ? "bg-red-50 text-red-500" :
                            user.role === "Recruiter" ? "bg-blue-50 text-blue-500" :
                            "bg-[#38B65F]/10 text-[#38B65F]"
                          )}>
                            {user.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-bold text-sm text-[#0F2238] group-hover:text-[#38B65F] transition-colors">{user.name}</p>
                          <p className="text-xs text-slate-400">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <Badge className={cn(
                        "shadow-none rounded-lg px-2.5 py-0.5 font-bold text-[10px] uppercase",
                        user.role === "Admin" ? "bg-red-50 text-red-600" :
                        user.role === "Recruiter" ? "bg-blue-50 text-blue-600" :
                        "bg-slate-100 text-slate-600"
                      )}>
                        {user.role}
                      </Badge>
                    </td>
                    <td className="py-4 px-6 text-left">
                      <div className="flex items-center gap-1.5 font-bold text-xs">
                        <span className={cn(
                          "w-2 h-2 rounded-full",
                          user.status === "Active" ? "bg-green-500" :
                          user.status === "Pending" ? "bg-amber-500" : "bg-red-500"
                        )} />
                        <span className={cn(
                          user.status === "Active" ? "text-green-600" :
                          user.status === "Pending" ? "text-amber-600" : "text-red-600"
                        )}>{user.status}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-xs font-semibold text-slate-500 text-left">
                      {user.role === "Candidate" && (
                        <span className="flex flex-col">
                          <span>{user.cvCount} CVs Uploaded</span>
                          <span className="text-[10px] text-slate-400">{user.applications} Applications</span>
                        </span>
                      )}
                      {user.role === "Recruiter" && (
                        <span className="flex flex-col">
                          <span>{user.jobPosts} Job Posts</span>
                          <span className="text-[10px] text-slate-400">{user.hires} Hires Made</span>
                        </span>
                      )}
                      {user.role === "Admin" && (
                        <span className="text-slate-400">Last seen: <span className="text-slate-600">{user.lastLogin}</span></span>
                      )}
                    </td>
                    <td className="py-4 px-6 text-xs font-medium text-slate-400 text-left">
                      <div className="flex items-center gap-1">
                        <Calendar size={12} />
                        {user.joined}
                      </div>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="rounded-full hover:bg-white hover:shadow-sm">
                            <MoreVertical className="w-4 h-4 text-slate-400" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="rounded-xl shadow-xl w-48 border-slate-100">
                          <DropdownMenuItem className="gap-2 font-semibold text-sm">
                            <Eye className="w-4 h-4 text-slate-400" /> View Profile
                          </DropdownMenuItem>
                          <DropdownMenuItem className="gap-2 font-semibold text-sm">
                            <Mail className="w-4 h-4 text-slate-400" /> Send Email
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="gap-2 font-semibold text-sm text-red-500">
                            <Trash2 className="w-4 h-4" /> Delete Account
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function StatCard({ label, value, color, icon }: { label: string, value: string, color: string, icon: React.ReactNode }) {
  return (
    <Card className="bg-white border-none shadow-sm rounded-2xl overflow-hidden">
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <p className={cn("text-3xl font-black mb-1", color)}>{value}</p>
            <p className="text-sm font-bold text-slate-400 uppercase tracking-wider">{label}</p>
          </div>
          <div className={cn("p-2 rounded-lg bg-slate-50", color)}>
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
  Mail,
  Trash2,
  Eye,
  Download,
  Users,
  ShieldCheck,
  Calendar,
  Briefcase
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus } from "lucide-react";

const users = [
  { id: 1, name: "John Smith", email: "john@example.com", role: "Candidate", status: "Active", cvCount: 3, applications: 12, joined: "Dec 1, 2024" },
  { id: 2, name: "TechCorp Inc", email: "hr@techcorp.com", role: "Recruiter", status: "Active", jobPosts: 8, hires: 24, joined: "Nov 15, 2024" },
  { id: 3, name: "Sarah Johnson", email: "sarah@example.com", role: "Candidate", status: "Pending", cvCount: 1, applications: 0, joined: "Dec 10, 2024" },
  { id: 4, name: "Global Hire", email: "contact@globalhire.com", role: "Recruiter", status: "Active", jobPosts: 15, hires: 67, joined: "Oct 20, 2024" },
  { id: 5, name: "Mike Davis", email: "mike@example.com", role: "Candidate", status: "Suspended", cvCount: 2, applications: 5, joined: "Nov 1, 2024" },
  { id: 8, name: "Admin User", email: "admin@smartrecruit.com", role: "Admin", status: "Active", lastLogin: "Today", joined: "Jan 1, 2024" },
];

export default function UserManagement() {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const navigate = useNavigate();

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab = activeTab === "all" || user.role.toLowerCase() === activeTab.toLowerCase();
    return matchesSearch && matchesTab;
  });

  return (
    <div className="space-y-6 text-left animate-in fade-in duration-500">
      {/* 1. Header & Create Button */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-black text-[#0F2238] tracking-tight">User Directory</h1>
          <p className="text-sm text-slate-500 font-medium">Manage platform access and member profiles</p>
        </div>

        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-[#38B65F] hover:bg-[#2D914C] text-white font-black rounded-xl h-11 px-6 shadow-lg shadow-green-500/20">
              <Plus size={20} className="mr-2" /> Add New User
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[450px] rounded-3xl border-none shadow-2xl p-0 overflow-hidden">
            <DialogHeader className="p-8 pb-0">
              <DialogTitle className="text-2xl font-black text-[#0F2238]">Create Account</DialogTitle>
              <p className="text-sm text-slate-500 font-medium">Manual member registration for the platform</p>
            </DialogHeader>
            
            <div className="p-8 space-y-5">
              <div className="space-y-2">
                <Label className="font-bold text-slate-700 ml-1">Full Name</Label>
                <Input placeholder="e.g. Nguyen Van A" className="rounded-xl h-11 bg-slate-50/50 border-slate-200" />
              </div>
              <div className="space-y-2">
                <Label className="font-bold text-slate-700 ml-1">Email Address</Label>
                <Input type="email" placeholder="name@example.com" className="rounded-xl h-11 bg-slate-50/50 border-slate-200" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="font-bold text-slate-700 ml-1">Account Role</Label>
                  <Select defaultValue="candidate">
                    <SelectTrigger className="rounded-xl h-11 bg-slate-50/50">
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="candidate">Candidate</SelectItem>
                      <SelectItem value="recruiter">Recruiter</SelectItem>
                      <SelectItem value="admin">Administrator</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="font-bold text-slate-700 ml-1">Initial Status</Label>
                  <Select defaultValue="active">
                    <SelectTrigger className="rounded-xl h-11 bg-slate-50/50">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="pt-2">
                <div className="flex items-center gap-2 p-3 rounded-xl bg-blue-50 border border-blue-100">
                  <Mail size={16} className="text-blue-500" />
                  <p className="text-[10px] text-blue-700 font-medium italic">
                    A temporary password and verification link will be sent to this email.
                  </p>
                </div>
              </div>
            </div>

            <DialogFooter className="p-8 pt-0 flex gap-3">
              <Button variant="ghost" onClick={() => setIsCreateDialogOpen(false)} className="font-bold text-slate-400 uppercase text-[11px]">Cancel</Button>
              <Button className="bg-[#0F2238] text-white font-black rounded-xl px-8 h-11 shadow-lg">Confirm & Create</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      {/* 1. Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-left">
        <StatCard label="Total Users" value="12,847" color="text-[#0F2238]" icon={<Users className="w-5 h-5" />} />
        <StatCard label="Candidates" value="9,234" color="text-blue-500" icon={<Users className="w-5 h-5" />} />
        <StatCard label="Recruiters" value="3,608" color="text-[#38B65F]" icon={<Briefcase className="w-5 h-5" />} />
        <StatCard label="Admins" value="5" color="text-red-500" icon={<ShieldCheck className="w-5 h-5" />} />
      </div>

      {/* 2. Tabs & Filter Bar */}
      <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
          <TabsList className="bg-slate-100/50 p-1 rounded-xl border border-slate-200">
            <TabsTrigger value="all" className="rounded-lg font-bold px-6 data-[state=active]:bg-white data-[state=active]:text-[#38B65F] data-[state=active]:shadow-sm">All Users</TabsTrigger>
            <TabsTrigger value="candidate" className="rounded-lg font-bold px-6 data-[state=active]:bg-white data-[state=active]:text-blue-500">Candidates</TabsTrigger>
            <TabsTrigger value="recruiter" className="rounded-lg font-bold px-6 data-[state=active]:bg-white data-[state=active]:text-[#38B65F]">Recruiters</TabsTrigger>
            <TabsTrigger value="admin" className="rounded-lg font-bold px-6 data-[state=active]:bg-white data-[state=active]:text-red-500">Admins</TabsTrigger>
          </TabsList>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="relative group flex-1 md:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-[#38B65F] transition-colors" />
              <Input
                placeholder="Search..."
                className="pl-10 bg-white border-slate-200 rounded-xl h-10 focus-visible:ring-[#38B65F]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button variant="outline" className="h-10 rounded-xl border-slate-200 font-bold hover:bg-slate-50 text-slate-600">
              <Download className="w-4 h-4 mr-2" /> Export
            </Button>
          </div>
        </div>

        {/* 3. User Data Table */}
        <Card className="bg-white border-none shadow-sm rounded-2xl overflow-hidden">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-slate-50 bg-slate-50/50">
                    <th className="py-4 px-6 text-[11px] uppercase tracking-wider font-bold text-slate-400">User Details</th>
                    <th className="py-4 px-6 text-[11px] uppercase tracking-wider font-bold text-slate-400">Account Status</th>
                    <th className="py-4 px-6 text-[11px] uppercase tracking-wider font-bold text-slate-400">Platform Activity</th>
                    <th className="py-4 px-6 text-[11px] uppercase tracking-wider font-bold text-slate-400">Joined</th>
                    <th className="py-4 px-6 text-[11px] uppercase tracking-wider font-bold text-slate-400 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {filteredUsers.length > 0 ? (
                    filteredUsers.map((user) => (
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
                              <div className="flex items-center gap-2">
                                <p className="font-bold text-sm text-[#0F2238] group-hover:text-[#38B65F] transition-colors">{user.name}</p>
                                {activeTab === "all" && (
                                  <Badge className={cn(
                                    "h-4 px-1.5 text-[8px] font-black uppercase border-none",
                                    user.role === "Admin" ? "bg-red-100 text-red-600" :
                                    user.role === "Recruiter" ? "bg-blue-100 text-blue-600" :
                                    "bg-slate-100 text-slate-500"
                                  )}>{user.role}</Badge>
                                )}
                              </div>
                              <p className="text-xs text-slate-400">{user.email}</p>
                            </div>
                          </div>
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
                            <span className="text-slate-400">Last seen: <span className="text-slate-600 font-bold">{user.lastLogin}</span></span>
                          )}
                        </td>
                        <td className="py-4 px-6 text-xs font-medium text-slate-400 text-left">
                          <div className="flex items-center gap-1">
                            <Calendar size={12} />
                            {user.joined}
                          </div>
                        </td>
                        <td className="py-4 px-6 text-right">
                          {/* ĐÃ SỬA: Truyền userId vào component */}
                          <UserActionDropdown userId={user.id} />
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="py-12 text-center text-slate-400 font-medium">No users found.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </Tabs>
    </div>
  );
}

// Sub-components
function StatCard({ label, value, color, icon }: { label: string, value: string, color: string, icon: React.ReactNode }) {
  return (
    <Card className="bg-white border-none shadow-sm rounded-2xl overflow-hidden hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <p className={cn("text-3xl font-black mb-1", color)}>{value}</p>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{label}</p>
          </div>
          <div className={cn("p-2.5 rounded-xl bg-slate-50", color)}>{icon}</div>
        </div>
      </CardContent>
    </Card>
  );
}

// ĐÃ SỬA: Thêm tham số userId và định nghĩa kiểu dữ liệu (Props)
function UserActionDropdown({ userId }: { userId: number | string }) {
  const navigate = useNavigate();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full hover:bg-slate-100">
          <MoreVertical className="w-4 h-4 text-slate-400" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="rounded-xl shadow-xl w-48 border-slate-100">
        <DropdownMenuItem 
          className="gap-2 font-semibold text-sm cursor-pointer"
          onClick={() => navigate(`/admin/users/${userId}`)}
        >
          <Eye className="w-4 h-4 text-slate-400" /> View Profile
        </DropdownMenuItem>
        <DropdownMenuItem className="gap-2 font-semibold text-sm cursor-pointer">
          <Mail className="w-4 h-4 text-slate-400" /> Send Email
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="gap-2 font-semibold text-sm text-red-500 focus:text-red-500 focus:bg-red-50 cursor-pointer">
          <Trash2 className="w-4 h-4" /> Delete Account
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
  Eye,
  Trash2,
  Building2,
  MapPin,
  Users,
  Briefcase,
  Calendar,
  CheckCircle2,
  Clock,
  AlertTriangle,
  XCircle,
  FileEdit,
  Play
} from "lucide-react";
import { cn } from "@/lib/utils";

// Mock data giữ nguyên ID và nội dung, cập nhật STATUS theo Business Rule [cite: 365]
const jobs = [
  { id: 1, title: "Senior React Developer", company: "TechCorp Inc", location: "San Francisco, CA", type: "Full-time", status: "Published", applicants: 45, posted: "Dec 1, 2024" },
  { id: 2, title: "Product Manager", company: "StartupXYZ", location: "Remote", type: "Full-time", status: "Pending Review", applicants: 0, posted: "Nov 28, 2024" },
  { id: 3, title: "UX Designer", company: "Global Hire", location: "New York, NY", type: "Contract", status: "Closed", applicants: 23, posted: "Nov 20, 2024" },
  { id: 4, title: "Data Scientist", company: "TechCorp Inc", location: "Ha Noi, VN", type: "Full-time", status: "Draft", applicants: 0, posted: "Dec 5, 2024" },
  { id: 5, title: "DevOps Engineer", company: "CloudFirst", location: "Remote", type: "Full-time", status: "Suspended", applicants: 34, posted: "Dec 3, 2024" },
];

export default function AdminJobs() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const navigate = useNavigate();

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          job.company.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || job.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6 text-left">
      {/* 1. Stat Cards cập nhật theo 5 trạng thái Business Rule [cite: 365, 72] */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <StatCard label="Total Jobs" value="1,234" color="text-[#0F2238]" icon={<Briefcase size={20} />} />
        <StatCard label="Published" value="892" color="text-[#38B65F]" icon={<CheckCircle2 size={20} />} />
        <StatCard label="Pending" value="12" color="text-amber-500" icon={<Clock size={20} />} />
        <StatCard label="Closed" value="318" color="text-slate-400" icon={<XCircle size={20} />} />
        <StatCard label="Suspended" value="12" color="text-red-500" icon={<AlertTriangle size={20} />} />
      </div>

      {/* 2. Filter Bar */}
      <Card className="bg-white border-none shadow-sm rounded-2xl mb-6 overflow-hidden">
        <CardContent className="p-6 flex flex-col md:flex-row gap-4 items-center">
          <div className="relative flex-1 group w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-[#38B65F]" />
            <Input
              placeholder="Search jobs by title or company..."
              className="pl-10 bg-slate-50 border-none rounded-xl h-11 focus-visible:ring-[#38B65F]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-3 w-full md:w-auto">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-52 border-slate-200 rounded-xl h-11 font-semibold text-slate-600 bg-white">
                <SelectValue placeholder="Status Filter" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All States</SelectItem>
                <SelectItem value="Published">Published</SelectItem>
                <SelectItem value="Pending Review">Pending Review</SelectItem>
                <SelectItem value="Draft">Draft</SelectItem>
                <SelectItem value="Closed">Closed</SelectItem>
                <SelectItem value="Suspended">Suspended</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* 3. Detailed Jobs Table */}
      <Card className="bg-white border-none shadow-sm rounded-2xl overflow-hidden">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-slate-50 bg-slate-50/50">
                  <th className="py-4 px-6 text-[11px] uppercase tracking-wider font-bold text-slate-400">Job Opportunity</th>
                  <th className="py-4 px-6 text-[11px] uppercase tracking-wider font-bold text-slate-400">Organization</th>
                  <th className="py-4 px-6 text-[11px] uppercase tracking-wider font-bold text-slate-400 text-center">Status</th>
                  <th className="py-4 px-6 text-[11px] uppercase tracking-wider font-bold text-slate-400 text-center">Applicants</th>
                  <th className="py-4 px-6 text-[11px] uppercase tracking-wider font-bold text-slate-400">Posted</th>
                  <th className="py-4 px-6 text-[11px] uppercase tracking-wider font-bold text-slate-400 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filteredJobs.map((job) => (
                  <tr key={job.id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="py-4 px-6">
                      <div>
                        <p className="font-bold text-sm text-[#0F2238] group-hover:text-[#38B65F] transition-colors">{job.title}</p>
                        <div className="flex items-center gap-2 mt-1 text-[10px] font-bold text-slate-400 uppercase tracking-tight">
                          <MapPin size={10} /> {job.location}
                          <span className="text-slate-200 mx-1">•</span>
                          <span className="bg-slate-100 px-1.5 py-0.5 rounded text-slate-500">{job.type}</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        <div className="p-1.5 rounded-lg bg-slate-50 text-slate-400">
                          <Building2 size={16} />
                        </div>
                        <span className="text-sm font-bold text-slate-600">{job.company}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-center">
                      <Badge className={cn(
                        "shadow-none rounded-full px-3 py-1 font-black text-[9px] uppercase border-none",
                        job.status === "Published" ? "bg-green-50 text-green-600" :
                        job.status === "Pending Review" ? "bg-amber-50 text-amber-600" :
                        job.status === "Suspended" ? "bg-red-50 text-red-600" :
                        "bg-slate-100 text-slate-500"
                      )}>
                        ● {job.status}
                      </Badge>
                    </td>
                    <td className="py-4 px-6 text-center">
                      <div className="inline-flex items-center gap-2 text-sm font-black text-[#0F2238]">
                        <Users size={14} className="text-slate-300" />
                        {job.applicants}
                      </div>
                    </td>
                    <td className="py-4 px-6 text-xs font-bold text-slate-400 italic">
                      {job.posted}
                    </td>
                    <td className="py-4 px-6 text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="rounded-full hover:bg-slate-100">
                            <MoreVertical className="w-4 h-4 text-slate-400" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="rounded-xl shadow-xl w-52 border-slate-100">
                          <DropdownMenuItem 
                            className="gap-2 font-semibold text-sm py-2.5 cursor-pointer"
                            onClick={() => navigate(`/admin/jobs/${job.id}`)}
                          >
                            <Eye size={15} className="text-slate-400" /> Inspect JD
                          </DropdownMenuItem>
                          
                          {/* Hành động đặc thù cho Admin để duyệt job  */}
                          {job.status === "Pending Review" && (
                            <DropdownMenuItem className="gap-2 font-bold text-sm py-2.5 text-[#38B65F] focus:text-[#38B65F] focus:bg-green-50">
                              <CheckCircle2 size={15} /> Approve & Publish
                            </DropdownMenuItem>
                          )}

                          <DropdownMenuItem className="gap-2 font-semibold text-sm py-2.5">
                            <AlertTriangle size={15} className="text-slate-400" /> Suspend Listing
                          </DropdownMenuItem>
                          
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="gap-2 font-semibold text-sm py-2.5 text-red-500 focus:text-red-500 focus:bg-red-50 cursor-pointer">
                            <Trash2 size={15} /> Terminate Record
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
    <Card className="bg-white border-none shadow-sm rounded-2xl overflow-hidden transition-all hover:shadow-md">
      <CardContent className="p-4 flex justify-between items-center">
        <div>
          <p className={cn("text-2xl font-black mb-0.5", color)}>{value}</p>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{label}</p>
        </div>
        <div className={cn("p-2 rounded-xl bg-slate-50", color)}>
          {icon}
        </div>
      </CardContent>
    </Card>
  );
}
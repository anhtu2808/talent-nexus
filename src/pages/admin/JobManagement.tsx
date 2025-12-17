import { useState } from "react";
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
  Pause,
  Play,
  Trash2,
  Flag,
  Building2,
  MapPin,
  Users,
  Briefcase,
  Calendar
} from "lucide-react";
import { cn } from "@/lib/utils";

const jobs = [
  { id: 1, title: "Senior React Developer", company: "TechCorp Inc", location: "San Francisco, CA", type: "Full-time", status: "Active", applicants: 45, posted: "Dec 1, 2024" },
  { id: 2, title: "Product Manager", company: "StartupXYZ", location: "Remote", type: "Full-time", status: "Active", applicants: 78, posted: "Nov 28, 2024" },
  { id: 3, title: "UX Designer", company: "Global Hire", location: "New York, NY", type: "Contract", status: "Paused", applicants: 23, posted: "Nov 20, 2024" },
  { id: 4, title: "Data Scientist", company: "TechCorp Inc", location: "Austin, TX", type: "Full-time", status: "Active", applicants: 56, posted: "Dec 5, 2024" },
  { id: 5, title: "DevOps Engineer", company: "CloudFirst", location: "Remote", type: "Full-time", status: "Flagged", applicants: 34, posted: "Dec 3, 2024" },
];

export default function AdminJobs() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredJobs = jobs.filter(job => 
    job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    job.company.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* 1. Impactful Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-left">
        <StatCard label="Total Jobs" value="1,234" color="text-[#0F2238]" icon={<Briefcase />} />
        <StatCard label="Active" value="892" color="text-[#38B65F]" icon={<Play />} />
        <StatCard label="Paused" value="156" color="text-amber-500" icon={<Pause />} />
        <StatCard label="Flagged" value="12" color="text-red-500" icon={<Flag />} />
      </div>

      {/* 2. Synchronized Filter Bar */}
      <Card className="bg-white border-none shadow-sm rounded-2xl mb-6 overflow-hidden text-left">
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
            <Select defaultValue="all">
              <SelectTrigger className="w-full md:w-40 border-slate-200 rounded-xl h-11 font-semibold text-slate-600">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="paused">Paused</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* 3. Detailed Jobs Table */}
      <Card className="bg-white border-none shadow-sm rounded-2xl overflow-hidden text-left">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-slate-50 bg-slate-50/50">
                  <th className="py-4 px-6 text-[11px] uppercase tracking-wider font-bold text-slate-400">Job Details</th>
                  <th className="py-4 px-6 text-[11px] uppercase tracking-wider font-bold text-slate-400">Company</th>
                  <th className="py-4 px-6 text-[11px] uppercase tracking-wider font-bold text-slate-400">Status</th>
                  <th className="py-4 px-6 text-[11px] uppercase tracking-wider font-bold text-slate-400">Applicants</th>
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
                        <div className="flex items-center gap-3 mt-1 text-[11px] font-medium text-slate-400 uppercase tracking-tight">
                          <span className="flex items-center gap-1">
                            <MapPin size={12} /> {job.location}
                          </span>
                          <span className="bg-slate-100 px-1.5 py-0.5 rounded text-slate-500 font-bold">{job.type}</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        <div className="p-1.5 rounded-lg bg-slate-50 text-slate-400 group-hover:text-[#38B65F] transition-colors">
                          <Building2 size={16} />
                        </div>
                        <span className="text-sm font-bold text-slate-600">{job.company}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <Badge className={cn(
                        "shadow-none rounded-lg px-2.5 py-0.5 font-bold text-[10px] border-none",
                        job.status === "Active" ? "bg-green-50 text-green-600" :
                        job.status === "Paused" ? "bg-amber-50 text-amber-600" :
                        "bg-red-50 text-red-600"
                      )}>
                        ● {job.status}
                      </Badge>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2 text-sm font-black text-[#0F2238]">
                        <Users size={14} className="text-slate-400" />
                        {job.applicants}
                      </div>
                    </td>
                    <td className="py-4 px-6 text-xs font-bold text-slate-400">
                      <div className="flex items-center gap-1">
                        <Calendar size={12} />
                        {job.posted}
                      </div>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="rounded-full hover:bg-white">
                            <MoreVertical className="w-4 h-4 text-slate-400" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="rounded-xl shadow-xl w-48 border-slate-100">
                          <DropdownMenuItem className="gap-2 font-semibold text-sm">
                            <Eye size={14} /> View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem className="gap-2 font-semibold text-sm">
                            <Pause size={14} /> Pause Listing
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="gap-2 font-semibold text-sm text-red-500 cursor-pointer">
                            <Trash2 size={14} /> Remove Listing
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
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
  Building2, 
  Globe, 
  Mail, 
  Trash2, 
  Eye, 
  Download, 
  ShieldCheck,
  Briefcase,
  ExternalLink,
  MapPin
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

const companies = [
  { id: 1, name: "TechCorp Inc", industry: "Information Technology", email: "hr@techcorp.com", website: "techcorp.io", location: "San Francisco, CA", status: "Verified", jobCount: 45, joined: "Nov 15, 2024", logo: "" },
  { id: 2, name: "Global Hire", industry: "Recruitment", email: "contact@globalhire.com", website: "globalhire.com", location: "London, UK", status: "Verified", jobCount: 128, joined: "Oct 20, 2024", logo: "" },
  { id: 3, name: "StartupXYZ", industry: "Fintech", email: "jobs@startupxyz.com", website: "startupxyz.vn", location: "Ha Noi, VN", status: "Pending", jobCount: 8, joined: "Dec 5, 2024", logo: "" },
  { id: 4, name: "CloudFirst", industry: "Cloud Services", email: "admin@cloudfirst.net", website: "cloudfirst.net", location: "Remote", status: "Verified", jobCount: 34, joined: "Sep 12, 2024", logo: "" },
];

export default function CompanyManagement() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCompanies = companies.filter(company => 
    company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    company.industry.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 text-left">
      {/* 1. Stats Cards - Đồng bộ phong cách Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard label="Total Companies" value="842" color="text-[#0F2238]" icon={<Building2 />} />
        <StatCard label="Verified" value="790" color="text-[#38B65F]" icon={<ShieldCheck />} />
        <StatCard label="Pending Approval" value="12" color="text-amber-500" icon={<ClockIcon />} />
      </div>

      {/* 2. Filter Bar */}
      <Card className="bg-white border-none shadow-sm rounded-2xl mb-6 overflow-hidden">
        <CardContent className="p-6 flex flex-col md:flex-row gap-4 items-center">
          <div className="relative flex-1 group w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-[#38B65F] transition-colors" />
            <Input
              placeholder="Search companies by name or industry..."
              className="pl-10 bg-slate-50 border-none rounded-xl h-11 focus-visible:ring-[#38B65F]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-3 w-full md:w-auto">
            <Select defaultValue="all">
              <SelectTrigger className="w-full md:w-40 border-slate-200 rounded-xl h-11 font-semibold text-slate-600">
                <SelectValue placeholder="Industry" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Industries</SelectItem>
                <SelectItem value="it">Information Technology</SelectItem>
                <SelectItem value="fintech">Fintech</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="h-11 rounded-xl border-slate-200 font-bold hover:bg-slate-50 text-slate-600">
              <Download className="w-4 h-4 mr-2" /> Export
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* 3. Company Data Table */}
      <Card className="bg-white border-none shadow-sm rounded-2xl overflow-hidden">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-slate-50 bg-slate-50/50">
                  <th className="py-4 px-6 text-[11px] uppercase tracking-wider font-bold text-slate-400">Company Details</th>
                  <th className="py-4 px-6 text-[11px] uppercase tracking-wider font-bold text-slate-400">Status</th>
                  <th className="py-4 px-6 text-[11px] uppercase tracking-wider font-bold text-slate-400">Active Jobs</th>
                  <th className="py-4 px-6 text-[11px] uppercase tracking-wider font-bold text-slate-400">Location</th>
                  <th className="py-4 px-6 text-[11px] uppercase tracking-wider font-bold text-slate-400 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filteredCompanies.map((company) => (
                  <tr key={company.id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3 text-left">
                        <Avatar className="h-10 w-10 border-2 border-white shadow-sm rounded-xl">
                          <AvatarFallback className="bg-[#38B65F]/10 text-[#38B65F] font-bold rounded-xl">
                            {company.name[0]}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-bold text-sm text-[#0F2238] group-hover:text-[#38B65F] transition-colors">{company.name}</p>
                          <p className="text-[11px] text-slate-400 font-bold uppercase tracking-tighter">{company.industry}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <Badge className={cn(
                        "shadow-none rounded-lg px-2.5 py-0.5 font-bold text-[10px] border-none uppercase",
                        company.status === "Verified" ? "bg-green-50 text-green-600" : "bg-amber-50 text-amber-600"
                      )}>
                        ● {company.status}
                      </Badge>
                    </td>
                    <td className="py-4 px-6">
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-blue-50 text-blue-600 font-black text-xs">
                        <Briefcase size={12} /> {company.jobCount} Jobs
                      </div>
                    </td>
                    <td className="py-4 px-6 text-xs font-bold text-slate-400">
                      <div className="flex items-center gap-1">
                        <MapPin size={12} className="text-slate-300" />
                        {company.location}
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
                            <Eye size={14} /> View profile
                          </DropdownMenuItem>
                          <DropdownMenuItem className="gap-2 font-semibold text-sm">
                            <Globe size={14} /> Visit website
                          </DropdownMenuItem>
                          <DropdownMenuItem className="gap-2 font-semibold text-sm">
                            <Mail size={14} /> Contact HR
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="gap-2 font-semibold text-sm text-red-500 cursor-pointer">
                            <Trash2 size={14} /> Remove Company
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

// Component phụ bổ trợ
function StatCard({ label, value, color, icon }: { label: string, value: string, color: string, icon: React.ReactNode }) {
  return (
    <Card className="bg-white border-none shadow-sm rounded-2xl overflow-hidden group hover:shadow-md transition-all">
      <CardContent className="p-6 flex justify-between items-start">
        <div>
          <p className={cn("text-3xl font-black mb-1", color)}>{value}</p>
          <p className="text-sm font-bold text-slate-400 uppercase tracking-wider">{label}</p>
        </div>
        <div className={cn("p-2 rounded-lg bg-slate-50", color)}>
          {icon}
        </div>
      </CardContent>
    </Card>
  );
}

function ClockIcon() {
  return <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-clock"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>;
}
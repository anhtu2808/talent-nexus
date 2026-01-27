import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  Search, MoreVertical, Building2, Globe, Mail, 
  Trash2, Eye, ShieldCheck, Clock, CheckCircle2, 
  UserCheck, MapPin, Download, AlertCircle, XCircle, FileSearch
} from "lucide-react";
import { cn } from "@/lib/utils";

// Mock data cập nhật theo luồng xác thực mới 
const companies = [
  { id: "1", name: "TechCorp Inc", industry: "IT", email: "hr@techcorp.com", location: "San Francisco", status: "Approved", joined: "Nov 15, 2024", manager: "Sarah Jenkins" },
  { id: "2", name: "Global Hire", industry: "Recruitment", email: "contact@globalhire.com", location: "London", status: "Approved", joined: "Oct 20, 2024", manager: "Michael Ross" },
  { id: "3", name: "StartupXYZ", industry: "Fintech", email: "jobs@startupxyz.com", location: "Ha Noi, VN", status: "Pending", joined: "Dec 5, 2024", manager: "Harvey Specter" },
  { id: "4", name: "CloudFirst", industry: "Cloud", email: "admin@cloudfirst.net", location: "Remote", status: "Under Review", joined: "Sep 12, 2024", manager: "Jessica Pearson" },
  { id: "5", name: "Nexus Tech", industry: "Software", email: "robert@nexus.com", location: "Singapore", status: "Rejected", joined: "Dec 24, 2024", manager: "Robert Downey" },
];

export default function CompanyManagement() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const navigate = useNavigate();

  const filteredCompanies = companies.filter(company => {
    const matchesSearch = company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          company.manager.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (activeTab === "all") return matchesSearch;
    return matchesSearch && company.status.replace(/\s+/g, '-').toLowerCase() === activeTab;
  });

  const pendingCount = companies.filter(c => c.status === "Pending" || c.status === "Under Review").length;

  return (
    <div className="space-y-6 text-left animate-in fade-in duration-500">
      {/* 1. Thống kê theo luồng Moderation  */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard label="Total Registrations" value={companies.length.toString()} color="text-[#0F2238]" icon={<Building2 size={20} />} />
        <StatCard label="Awaiting Review" value={pendingCount.toString()} color="text-orange-500" icon={<FileSearch size={20} />} />
        <StatCard label="Verified Partners" value={companies.filter(c => c.status === "Approved").length.toString()} color="text-[#38B65F]" icon={<ShieldCheck size={20} />} />
      </div>

      <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
        <div className="flex flex-col lg:flex-row justify-between items-center gap-4 mb-6">
          <TabsList className="bg-slate-100/50 p-1 rounded-xl border border-slate-200">
            <TabsTrigger value="all" className="rounded-lg font-bold px-6">All Requests</TabsTrigger>
            <TabsTrigger value="pending" className="rounded-lg font-bold px-6 text-orange-500">Pending</TabsTrigger>
            <TabsTrigger value="under-review" className="rounded-lg font-bold px-6 text-blue-500">Under Review</TabsTrigger>
            <TabsTrigger value="approved" className="rounded-lg font-bold px-6 text-[#38B65F]">Approved</TabsTrigger>
            <TabsTrigger value="rejected" className="rounded-lg font-bold px-6 text-red-500">Rejected</TabsTrigger>
          </TabsList>

          <div className="relative group w-full lg:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-[#38B65F]" />
            <Input
              placeholder="Search by company or manager..."
              className="pl-10 bg-white border-slate-200 rounded-xl h-10 focus-visible:ring-[#38B65F]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <Card className="bg-white border-none shadow-sm rounded-2xl overflow-hidden">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-slate-50 bg-slate-50/50">
                    <th className="py-4 px-6 text-[10px] uppercase tracking-widest font-black text-slate-400">Organization Info</th>
                    <th className="py-4 px-6 text-[10px] uppercase tracking-widest font-black text-slate-400">Moderation Status</th>
                    <th className="py-4 px-6 text-[10px] uppercase tracking-widest font-black text-slate-400">Industry</th>
                    <th className="py-4 px-6 text-[10px] uppercase tracking-widest font-black text-slate-400">Location</th>
                    <th className="py-4 px-6 text-[10px] uppercase tracking-widest font-black text-slate-400 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {filteredCompanies.map((company) => (
                    <tr key={company.id} className="hover:bg-slate-50/50 transition-colors group">
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center border border-slate-100">
                            <Building2 size={18} className="text-slate-400" />
                          </div>
                          <div>
                            <p className="font-bold text-sm text-[#0F2238] group-hover:text-[#38B65F] transition-colors">{company.name}</p>
                            <div className="flex items-center gap-1 text-[10px] font-bold text-slate-400 uppercase italic">
                              <UserCheck size={10} className="text-blue-500" /> {company.manager}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <Badge className={cn(
                          "font-black text-[9px] px-2.5 py-0.5 rounded-full border-none uppercase tracking-widest",
                          company.status === "Approved" ? "bg-green-50 text-green-600" : 
                          company.status === "Pending" ? "bg-orange-50 text-orange-600" :
                          company.status === "Under Review" ? "bg-blue-50 text-blue-600" : "bg-red-50 text-red-600"
                        )}>
                          ● {company.status}
                        </Badge>
                      </td>
                      <td className="py-4 px-6 text-xs font-bold text-slate-500 italic">
                        {company.industry}
                      </td>
                      <td className="py-4 px-6 text-xs font-bold text-slate-500">
                        <div className="flex items-center gap-1.5">
                          <MapPin size={13} className="text-slate-300" /> {company.location}
                        </div>
                      </td>
                      <td className="py-4 px-6 text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="rounded-full">
                              <MoreVertical className="w-4 h-4 text-slate-400" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="rounded-xl shadow-xl w-56 border-slate-100">
                            <DropdownMenuItem className="gap-2 font-bold text-sm py-2.5 cursor-pointer" onClick={() => navigate(`/admin/companies/${company.id}`)}>
                              <Eye size={15} className="text-slate-400" /> Inspect Documents
                            </DropdownMenuItem>
                            
                            <DropdownMenuSeparator />
                            
                            {/* Phân tách hành động theo trạng thái [cite: 268] */}
                            {company.status === "Pending" && (
                              <DropdownMenuItem className="gap-2 font-black text-sm py-2.5 text-blue-600 focus:text-blue-600">
                                <FileSearch size={15} /> Start Review
                              </DropdownMenuItem>
                            )}
                            
                            {(company.status === "Pending" || company.status === "Under Review") && (
                              <>
                                <DropdownMenuItem className="gap-2 font-black text-sm py-2.5 text-[#38B65F] focus:text-[#38B65F]">
                                  <CheckCircle2 size={15} /> Approve Registration
                                </DropdownMenuItem>
                                <DropdownMenuItem className="gap-2 font-black text-sm py-2.5 text-red-500 focus:text-red-500">
                                  <XCircle size={15} /> Reject Request
                                </DropdownMenuItem>
                              </>
                            )}

                            {company.status === "Approved" && (
                                <DropdownMenuItem className="gap-2 font-bold text-sm py-2.5 text-amber-600 focus:text-amber-600">
                                    <AlertCircle size={15} /> Suspend Partner
                                </DropdownMenuItem>
                            )}

                            <DropdownMenuItem className="gap-2 font-bold text-sm py-2.5 text-red-600 focus:bg-red-50">
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
      </Tabs>
    </div>
  );
}

function StatCard({ label, value, color, icon }: { label: string, value: string, color: string, icon: React.ReactNode }) {
  return (
    <Card className="bg-white border-none shadow-sm rounded-2xl group hover:shadow-md transition-all">
      <CardContent className="p-6 flex justify-between items-start">
        <div>
          <p className={cn("text-3xl font-black mb-1", color)}>{value}</p>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{label}</p>
        </div>
        <div className={cn("p-2.5 rounded-xl bg-slate-50 group-hover:bg-slate-100 transition-colors", color)}>
          {icon}
        </div>
      </CardContent>
    </Card>
  );
}
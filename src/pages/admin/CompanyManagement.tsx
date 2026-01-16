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
  Trash2, Eye, Download, ShieldCheck, Briefcase,
  MapPin, Clock, CheckCircle2, AlertCircle, Users, UserCheck
} from "lucide-react";
import { cn } from "@/lib/utils";

// Bổ sung manager và seats vào mookdata
const companies = [
  { id: "1", name: "TechCorp Inc", industry: "IT", email: "hr@techcorp.com", website: "techcorp.io", location: "San Francisco", status: "Verified", jobCount: 45, joined: "Nov 15, 2024", manager: "Sarah Jenkins", seats: 1 },
  { id: "2", name: "Global Hire", industry: "Recruitment", email: "contact@globalhire.com", website: "global.com", location: "London", status: "Verified", jobCount: 128, joined: "Oct 20, 2024", manager: "Michael Ross", seats: 5 },
  { id: "3", name: "StartupXYZ", industry: "Fintech", email: "jobs@startupxyz.com", website: "startupxyz.vn", location: "Ha Noi, VN", status: "Pending", jobCount: 0, joined: "Dec 5, 2024", manager: "Harvey Specter", seats: 5 },
  { id: "4", name: "CloudFirst", industry: "Cloud", email: "admin@cloudfirst.net", website: "cloudfirst.net", location: "Remote", status: "Verified", jobCount: 34, joined: "Sep 12, 2024", manager: "Jessica Pearson", seats: 7 },
  { id: "5", name: "Nexus Tech", industry: "Software", email: "robert@nexus.com", website: "nexus.io", location: "Singapore", status: "Pending", jobCount: 0, joined: "Dec 24, 2024", manager: "Robert Downey", seats: 3 },
];

export default function CompanyManagement() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const navigate = useNavigate();

  const filteredCompanies = companies.filter(company => {
    const matchesSearch = company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          company.industry.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          company.manager.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (activeTab === "all") return matchesSearch;
    return matchesSearch && company.status.toLowerCase() === activeTab.toLowerCase();
  });

  const pendingCount = companies.filter(c => c.status === "Pending").length;

  return (
    <div className="space-y-6 text-left animate-in fade-in duration-500">
      {/* 1. Dashboard Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard label="Total Organizations" value={companies.length.toString()} color="text-[#0F2238]" icon={<Building2 className="w-5 h-5" />} />
        <StatCard label="Pending Approval" value={pendingCount.toString()} color="text-orange-500" icon={<Clock className="w-5 h-5" />} />
        <StatCard label="Total Active Seats" value="245" color="text-[#38B65F]" icon={<Users className="w-5 h-5" />} />
      </div>

      <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
        <div className="flex flex-col lg:flex-row justify-between items-center gap-4 mb-6">
          <TabsList className="bg-slate-100/50 p-1 rounded-xl border border-slate-200">
            <TabsTrigger value="all" className="rounded-lg font-bold px-6 data-[state=active]:bg-white">All Registry</TabsTrigger>
            <TabsTrigger value="pending" className="rounded-lg font-bold px-6 data-[state=active]:bg-white data-[state=active]:text-orange-500 relative">
              Pending Requests
              {pendingCount > 0 && <span className="ml-2 bg-orange-500 text-white text-[10px] px-1.5 py-0.5 rounded-full">{pendingCount}</span>}
            </TabsTrigger>
            <TabsTrigger value="verified" className="rounded-lg font-bold px-6 data-[state=active]:bg-white data-[state=active]:text-[#38B65F]">Verified</TabsTrigger>
            <TabsTrigger value="suspended" className="rounded-lg font-bold px-6 data-[state=active]:bg-white data-[state=active]:text-red-500">Suspended</TabsTrigger>
          </TabsList>

          <div className="flex items-center gap-3 w-full lg:w-auto">
            <div className="relative group flex-1 lg:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-[#38B65F]" />
              <Input
                placeholder="Search name, industry or manager..."
                className="pl-10 bg-white border-slate-200 rounded-xl h-10 focus-visible:ring-[#38B65F]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button variant="outline" className="h-10 rounded-xl border-slate-200 font-bold text-slate-600">
              <Download className="w-4 h-4 mr-2" /> Export
            </Button>
          </div>
        </div>

        <Card className="bg-white border-none shadow-sm rounded-2xl overflow-hidden">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-slate-50 bg-slate-50/50">
                    <th className="py-4 px-6 text-[10px] uppercase tracking-widest font-black text-slate-400">Organization & Manager</th>
                    <th className="py-4 px-6 text-[10px] uppercase tracking-widest font-black text-slate-400">Status</th>
                    <th className="py-4 px-6 text-[10px] uppercase tracking-widest font-black text-slate-400">Seats Plan</th>
                    <th className="py-4 px-6 text-[10px] uppercase tracking-widest font-black text-slate-400">Location</th>
                    <th className="py-4 px-6 text-[10px] uppercase tracking-widest font-black text-slate-400 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {filteredCompanies.map((company) => (
                    <tr key={company.id} className="hover:bg-slate-50/50 transition-colors group">
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center border border-slate-100">
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
                          "font-black text-[9px] px-2 py-0.5 rounded-full border-none uppercase tracking-tighter",
                          company.status === "Verified" ? "bg-green-50 text-green-600" : 
                          company.status === "Pending" ? "bg-orange-50 text-orange-600" : "bg-red-50 text-red-600"
                        )}>
                          ● {company.status}
                        </Badge>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex flex-col items-start">
                            {company.status === "Pending" ? (
                              <>
                                  <span className="text-sm font-black text-orange-500">{company.seats} Seats</span>
                                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest italic">Requested</span>
                              </>
                            ) : (
                              <>
                                  <span className="text-sm font-black text-[#38B65F]">{company.seats} Seats</span>
                                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Active License</span>
                              </>
                            )}
                        </div>
                      </td>
                      <td className="py-4 px-6 text-xs font-bold text-slate-500">
                        <div className="flex items-center gap-1.5">
                          <MapPin size={13} className="text-slate-300" /> {company.location}
                        </div>
                      </td>
                      <td className="py-4 px-6 text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="rounded-full hover:bg-slate-100">
                              <MoreVertical className="w-4 h-4 text-slate-400" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="rounded-xl shadow-xl w-52 border-slate-100">
                            <DropdownMenuItem className="gap-2 font-bold text-sm py-2.5 cursor-pointer" onClick={() => navigate(`/admin/companies/${company.id}`)}>
                              <Eye size={15} className="text-slate-400" /> Review Application
                            </DropdownMenuItem>
                            <DropdownMenuItem className="gap-2 font-semibold text-sm py-2.5"><Mail size={15} className="text-slate-400" /> Contact Manager</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            {company.status === "Pending" && (
                              <DropdownMenuItem className="gap-2 font-black text-sm py-2.5 text-[#38B65F] focus:text-[#38B65F] focus:bg-green-50 cursor-pointer">
                                <CheckCircle2 size={15} /> Approve & Activate
                              </DropdownMenuItem>
                            )}
                            <DropdownMenuItem className="gap-2 font-bold text-sm py-2.5 text-red-500 focus:text-red-500 focus:bg-red-50 cursor-pointer">
                              <Trash2 size={15} /> Remove Registry
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
        <div className={cn("p-2.5 rounded-xl bg-slate-50 group-hover:bg-slate-100", color)}>
          {icon}
        </div>
      </CardContent>
    </Card>
  );
}
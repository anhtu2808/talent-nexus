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
  MapPin,
  Clock,
  CheckCircle2,
  AlertCircle
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

const companies = [
  { id: "1", name: "TechCorp Inc", industry: "Information Technology", email: "hr@techcorp.com", website: "techcorp.io", location: "San Francisco, CA", status: "Verified", jobCount: 45, joined: "Nov 15, 2024" },
  { id: "2", name: "Global Hire", industry: "Recruitment", email: "contact@globalhire.com", website: "globalhire.com", location: "London, UK", status: "Verified", jobCount: 128, joined: "Oct 20, 2024" },
  { id: "3", name: "StartupXYZ", industry: "Fintech", email: "jobs@startupxyz.com", website: "startupxyz.vn", location: "Ha Noi, VN", status: "Pending", jobCount: 8, joined: "Dec 5, 2024" },
  { id: "4", name: "CloudFirst", industry: "Cloud Services", email: "admin@cloudfirst.net", website: "cloudfirst.net", location: "Remote", status: "Verified", jobCount: 34, joined: "Sep 12, 2024" },
  { id: "5", name: "Design Studio", industry: "Creative", email: "hello@design.co", website: "design.co", location: "HCM City, VN", status: "Suspended", jobCount: 0, joined: "Aug 30, 2024" },
];

export default function CompanyManagement() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const navigate = useNavigate();
  const filteredCompanies = companies.filter(company => {
    const matchesSearch = company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          company.industry.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab = activeTab === "all" || company.status.toLowerCase() === activeTab.toLowerCase();
    return matchesSearch && matchesTab;
  });

  return (
    <div className="space-y-6 text-left">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard label="Total Companies" value="842" color="text-[#0F2238]" icon={<Building2 className="w-5 h-5" />} />
        <StatCard label="Verified Partners" value="790" color="text-[#38B65F]" icon={<ShieldCheck className="w-5 h-5" />} />
        <StatCard label="Pending Approval" value="12" color="text-amber-500" icon={<Clock className="w-5 h-5" />} />
      </div>

      {/* 2. Tabs & Filter Bar Combined */}
      <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
        <div className="flex flex-col lg:flex-row justify-between items-center gap-4 mb-6">
          <TabsList className="bg-slate-100/50 p-1 rounded-xl border border-slate-200">
            <TabsTrigger value="all" className="rounded-lg font-bold px-6 data-[state=active]:bg-white data-[state=active]:shadow-sm">
              All Organizations
            </TabsTrigger>
            <TabsTrigger value="verified" className="rounded-lg font-bold px-6 data-[state=active]:bg-white data-[state=active]:text-[#38B65F]">
              Verified
            </TabsTrigger>
            <TabsTrigger value="pending" className="rounded-lg font-bold px-6 data-[state=active]:bg-white data-[state=active]:text-amber-500">
              Pending
            </TabsTrigger>
            <TabsTrigger value="suspended" className="rounded-lg font-bold px-6 data-[state=active]:bg-white data-[state=active]:text-red-500">
              Suspended
            </TabsTrigger>
          </TabsList>

          <div className="flex items-center gap-3 w-full lg:w-auto">
            <div className="relative group flex-1 lg:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-[#38B65F] transition-colors" />
              <Input
                placeholder="Search by name, industry..."
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

        <Card className="bg-white border-none shadow-sm rounded-2xl overflow-hidden">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-slate-50 bg-slate-50/50">
                    <th className="py-4 px-6 text-[11px] uppercase tracking-wider font-bold text-slate-400">Company Details</th>
                    <th className="py-4 px-6 text-[11px] uppercase tracking-wider font-bold text-slate-400">Status</th>
                    <th className="py-4 px-6 text-[11px] uppercase tracking-wider font-bold text-slate-400">Inventory</th>
                    <th className="py-4 px-6 text-[11px] uppercase tracking-wider font-bold text-slate-400">Location</th>
                    <th className="py-4 px-6 text-[11px] uppercase tracking-wider font-bold text-slate-400 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {filteredCompanies.length > 0 ? (
                    filteredCompanies.map((company) => (
                      <tr key={company.id} className="hover:bg-slate-50/50 transition-colors group">
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-3 text-left">
                            <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center border-2 border-white shadow-sm">
                                <Building2 size={18} className="text-slate-400" />
                            </div>
                            <div>
                              <p className="font-bold text-sm text-[#0F2238] group-hover:text-[#38B65F] transition-colors">
                                {company.name}
                              </p>
                              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider italic">
                                {company.industry}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <div className={cn(
                            "flex items-center gap-1.5 font-bold text-[10px] px-2.5 py-1 rounded-full w-fit uppercase",
                            company.status === "Verified" ? "bg-green-50 text-green-600" : 
                            company.status === "Pending" ? "bg-amber-50 text-amber-600" : "bg-red-50 text-red-600"
                          )}>
                            {company.status === "Verified" ? <CheckCircle2 size={12} /> : 
                             company.status === "Pending" ? <Clock size={12} /> : <AlertCircle size={12} />}
                            {company.status}
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex flex-col gap-1">
                            <div className="inline-flex items-center gap-1.5 text-[#0F2238] font-bold text-xs">
                              <Briefcase size={12} className="text-[#38B65F]" /> {company.jobCount} Active Jobs
                            </div>
                            <p className="text-[10px] text-slate-400 ml-4.5 font-medium">Joined {company.joined}</p>
                          </div>
                        </td>
                        <td className="py-4 px-6 text-xs font-bold text-slate-500">
                          <div className="flex items-center gap-1.5">
                            <MapPin size={13} className="text-slate-300" />
                            {company.location}
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
                              <DropdownMenuItem 
                                className="gap-2 font-semibold text-sm py-2.5 cursor-pointer"
                                onClick={() => navigate(`/admin/companies/${company.id}`)}
                              >
                                <Eye size={15} className="text-slate-400" /> View Company Profile
                              </DropdownMenuItem>
                              <DropdownMenuItem className="gap-2 font-semibold text-sm py-2.5 cursor-pointer">
                                <Globe size={15} className="text-slate-400" /> Visit Website
                              </DropdownMenuItem>
                              <DropdownMenuItem className="gap-2 font-semibold text-sm py-2.5 cursor-pointer">
                                <Mail size={15} className="text-slate-400" /> Message HR Manager
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              {company.status === "Pending" && (
                                <DropdownMenuItem className="gap-2 font-bold text-sm py-2.5 text-[#38B65F] focus:text-[#38B65F] focus:bg-green-50 cursor-pointer">
                                  <CheckCircle2 size={15} /> Approve Registration
                                </DropdownMenuItem>
                              )}
                              <DropdownMenuItem className="gap-2 font-semibold text-sm py-2.5 text-red-500 focus:text-red-500 focus:bg-red-50 cursor-pointer">
                                <Trash2 size={15} /> Terminate Organization
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="py-20 text-center">
                        <div className="flex flex-col items-center gap-2">
                          <Building2 className="w-10 h-10 text-slate-200" />
                          <p className="text-slate-400 font-medium">No organizations found in this category.</p>
                        </div>
                      </td>
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

function StatCard({ label, value, color, icon }: { label: string, value: string, color: string, icon: React.ReactNode }) {
  return (
    <Card className="bg-white border-none shadow-sm rounded-2xl overflow-hidden group hover:shadow-md transition-all duration-300">
      <CardContent className="p-6 flex justify-between items-start">
        <div>
          <p className={cn("text-3xl font-black mb-1", color)}>{value}</p>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">{label}</p>
        </div>
        <div className={cn("p-2.5 rounded-xl bg-slate-50 transition-colors group-hover:bg-slate-100", color)}>
          {icon}
        </div>
      </CardContent>
    </Card>
  );
}
import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ChevronLeft, Building2, MapPin, Briefcase, Calendar, 
  Users, Globe, Mail, ShieldCheck, CheckCircle2, 
  AlertCircle, Trash2, ExternalLink, UserPlus, XCircle, Ban
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Mock Data with Foreign Names and platform logic
const mockCompanies = [
  { 
    id: "1", 
    name: "TechCorp Inc", 
    industry: "Information Technology", 
    email: "contact@techcorp.io", 
    website: "https://techcorp.io", 
    location: "Palo Alto, California", 
    status: "Verified", 
    jobCount: 45, 
    joined: "Nov 15, 2024",
    logo: "https://api.dicebear.com/7.x/initials/svg?seed=TC",
    description: "TechCorp is a leading provider of AI-driven enterprise solutions, focusing on scalable cloud infrastructure and intelligent automation.",
    size: "500-1000 Employees",
    recruiters: [
      { name: "Sarah Jenkins", email: "s.jenkins@techcorp.io", role: "HR Manager", status: "Active" },
      { name: "Michael Ross", email: "m.ross@techcorp.io", role: "Technical Recruiter", status: "Active" },
      { name: "Jessica Pearson", email: "j.pearson@techcorp.io", role: "Head of Talent", status: "Active" }
    ],
    activeJobs: [
      { id: "J01", title: "Senior React Developer", applicants: 45, type: "Full-time" },
      { id: "J02", title: "Cloud Architect (AWS)", applicants: 28, type: "Contract" },
      { id: "J03", title: "AI Research Engineer", applicants: 67, type: "Full-time" }
    ]
  },
  { 
    id: "3", 
    name: "StartupXYZ", 
    industry: "Fintech", 
    email: "hr@startupxyz.com", 
    website: "https://startupxyz.com", 
    location: "London, UK", 
    status: "Pending", 
    jobCount: 8, 
    joined: "Dec 05, 2024",
    logo: "https://api.dicebear.com/7.x/initials/svg?seed=SX",
    description: "A fast-growing Fintech startup focusing on decentralized finance and micro-lending solutions for emerging markets.",
    size: "10-50 Employees",
    recruiters: [
      { name: "Harvey Specter", email: "h.specter@startupxyz.com", role: "CEO & Founder", status: "Active" }
    ],
    activeJobs: [
      { id: "J04", title: "Lead Blockchain Developer", applicants: 12, type: "Full-time" }
    ]
  }
];

export default function AdminCompanyDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");

  const company = mockCompanies.find(c => c.id === id);

  if (!company) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <AlertCircle className="w-16 h-16 text-red-500 mb-4" />
        <h2 className="text-2xl font-bold text-[#0F2238]">Organization Not Found</h2>
        <Button onClick={() => navigate('/admin/companies')} className="mt-4 rounded-xl bg-[#0F2238]">Back to List</Button>
      </div>
    );
  }

  return (
    <div className="space-y-6 text-left animate-in fade-in duration-500">
      {/* Header Navigation */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" onClick={() => navigate(-1)} className="rounded-xl border-slate-200 bg-white">
            <ChevronLeft className="w-5 h-5" />
          </Button>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#38B65F]/10 flex items-center justify-center border border-[#38B65F]/20">
              <Building2 className="w-6 h-6 text-[#38B65F]" />
            </div>
            <div>
              <h2 className="text-2xl font-extrabold text-[#0F2238] tracking-tight">{company.name}</h2>
              <p className="text-sm text-slate-500 font-medium uppercase tracking-wider">{company.industry} • Since {company.joined}</p>
            </div>
          </div>
        </div>
        <Badge className={cn(
          "px-4 py-1.5 rounded-xl border-none uppercase text-[10px] font-black tracking-widest",
          company.status === "Verified" ? "bg-green-50 text-green-600" : 
          company.status === "Pending" ? "bg-amber-50 text-amber-600" : "bg-red-50 text-red-600"
        )}>
          ● {company.status} Account
        </Badge>
      </div>

      <Tabs defaultValue="overview" onValueChange={setActiveTab} className="w-full">
        <TabsList className="bg-slate-100/50 p-1 rounded-xl mb-6">
          <TabsTrigger value="overview" className="rounded-lg font-bold px-8">Overview</TabsTrigger>
          <TabsTrigger value="team" className="rounded-lg font-bold px-8">HR Team ({company.recruiters.length})</TabsTrigger>
          <TabsTrigger value="jobs" className="rounded-lg font-bold px-8">Listings ({company.activeJobs.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* LEFT COLUMN: COMPANY CARD */}
            <div className="space-y-6">
              <Card className="border-none shadow-sm rounded-2xl bg-white p-8 text-center">
                <Avatar className="w-24 h-24 rounded-2xl mx-auto mb-4 border-2 border-slate-50 shadow-sm">
                  <AvatarImage src={company.logo} />
                  <AvatarFallback className="bg-[#38B65F]/10 text-[#38B65F] font-black text-2xl">{company.name[0]}</AvatarFallback>
                </Avatar>
                <h3 className="text-lg font-black text-[#0F2238]">{company.name}</h3>
                <div className="flex items-center justify-center gap-1.5 text-blue-500 mt-1">
                  <Globe size={14} />
                  <a href={company.website} target="_blank" className="text-xs font-bold hover:underline">{company.website.replace('https://', '')}</a>
                </div>
                
                <div className="mt-8 pt-8 border-t border-slate-50 grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <p className="text-2xl font-black text-[#38B65F]">{company.jobCount}</p>
                    <p className="text-[10px] font-bold text-slate-400 uppercase">Jobs Posted</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-black text-blue-500">{company.recruiters.length}</p>
                    <p className="text-[10px] font-bold text-slate-400 uppercase">Team Members</p>
                  </div>
                </div>
              </Card>

              <Card className="border-none shadow-sm rounded-2xl bg-[#0F2238] text-white p-6">
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-6">Verification Insights</p>
                <div className="space-y-4">
                    <div className="flex items-center gap-3">
                       <ShieldCheck size={16} className="text-[#38B65F]" />
                       <span className="text-xs font-bold">Platform Trust Score: High</span>
                    </div>
                    <div className="flex items-center gap-3">
                       <CheckCircle2 size={16} className="text-[#38B65F]" />
                       <span className="text-xs font-bold uppercase tracking-tighter">Premium Enterprise Plan</span>
                    </div>
                </div>
              </Card>
            </div>

            {/* RIGHT COLUMN: DETAILED INFO */}
            <div className="lg:col-span-2 space-y-6">
              <Card className="border-none shadow-sm rounded-2xl bg-white overflow-hidden">
                <CardHeader className="border-b border-slate-50 bg-slate-50/50 py-4 px-6">
                  <CardTitle className="text-sm font-bold uppercase tracking-wider text-[#0F2238]">General Information</CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-y-10 gap-x-8">
                    <InfoItem icon={<Mail size={18} />} label="Corporate Email" value={company.email} />
                    <InfoItem icon={<Users size={18} />} label="Staffing Size" value={company.size} />
                    <InfoItem icon={<MapPin size={18} />} label="Registered Office" value={company.location} />
                    <InfoItem icon={<Calendar size={18} />} label="Onboarding Date" value={company.joined} />
                  </div>
                  <div className="mt-10 pt-8 border-t border-slate-100">
                    <h4 className="font-bold text-xs mb-4 uppercase tracking-widest text-slate-400">Executive Summary</h4>
                    <p className="text-slate-600 leading-relaxed text-sm">{company.description}</p>
                  </div>
                </CardContent>
              </Card>

              {/* ACTION BUTTONS BASED ON STATUS */}
              <div className="flex justify-end gap-3 pt-2">
                {company.status === "Pending" ? (
                  <>
                    <Button variant="outline" className="rounded-xl font-bold text-red-500 border-red-100 hover:bg-red-50">
                      <XCircle size={16} className="mr-2" /> Reject Application
                    </Button>
                    <Button className="rounded-xl bg-[#38B65F] hover:bg-[#2D914C] font-bold px-8 text-white">
                      <CheckCircle2 size={16} className="mr-2" /> Approve & Verify
                    </Button>
                  </>
                ) : (
                  <>
                    <Button variant="outline" className="rounded-xl font-bold text-amber-600 border-amber-100 hover:bg-amber-50">
                      <Ban size={16} className="mr-2" /> Suspend Access
                    </Button>
                    <Button variant="outline" className="rounded-xl font-bold text-red-500 border-red-100 hover:bg-red-50">
                      <Trash2 size={16} className="mr-2" /> Terminate Account
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        </TabsContent>

        {/* TEAM TAB: List Recruiters */}
        <TabsContent value="team">
          <Card className="border-none shadow-sm rounded-2xl bg-white overflow-hidden">
             <CardHeader className="border-b border-slate-50 bg-slate-50/50 px-6 py-4">
                <CardTitle className="text-sm font-bold uppercase tracking-widest text-[#0F2238]">Associated Recruitment Officers</CardTitle>
             </CardHeader>
             <CardContent className="p-0">
                <table className="w-full text-left">
                   <thead className="bg-slate-50/30 text-[10px] uppercase font-black text-slate-400">
                      <tr>
                        <th className="px-6 py-4 tracking-widest">Full Name</th>
                        <th className="px-6 py-4 tracking-widest">Position</th>
                        <th className="px-6 py-4 tracking-widest">Platform Status</th>
                        <th className="px-6 py-4 text-right tracking-widest">Management</th>
                      </tr>
                   </thead>
                   <tbody className="divide-y divide-slate-50">
                      {company.recruiters.map((hr, idx) => (
                        <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                          <td className="px-6 py-4">
                             <div className="flex flex-col">
                                <span className="text-sm font-bold text-[#0F2238]">{hr.name}</span>
                                <span className="text-[11px] text-slate-400 font-medium">{hr.email}</span>
                             </div>
                          </td>
                          <td className="px-6 py-4 text-xs font-bold text-slate-500">{hr.role}</td>
                          <td className="px-6 py-4">
                             <Badge className="bg-green-50 text-green-600 border-none text-[10px] uppercase font-black tracking-tighter">● {hr.status}</Badge>
                          </td>
                          <td className="px-6 py-4 text-right">
                             <Button variant="ghost" size="sm" className="text-slate-400 font-bold hover:text-[#38B65F]">Audit User</Button>
                          </td>
                        </tr>
                      ))}
                   </tbody>
                </table>
             </CardContent>
          </Card>
        </TabsContent>

        {/* JOBS TAB: List Postings */}
        <TabsContent value="jobs">
          <Card className="border-none shadow-sm rounded-2xl bg-white overflow-hidden">
            <CardHeader className="border-b border-slate-50 bg-slate-50/50 px-6 py-4">
              <CardTitle className="text-sm font-bold uppercase tracking-widest text-[#0F2238]">Organization Job Listings</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
               <table className="w-full text-left">
                  <thead className="bg-slate-50/30 text-[10px] uppercase font-black text-slate-400">
                     <tr>
                        <th className="px-6 py-4 tracking-widest">Job Title</th>
                        <th className="px-6 py-4 tracking-widest">Contract Type</th>
                        <th className="px-6 py-4 tracking-widest">Pipeline</th>
                        <th className="px-6 py-4 text-right tracking-widest">Action</th>
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                     {company.activeJobs.map(job => (
                        <tr key={job.id} className="hover:bg-slate-50/50 transition-colors">
                           <td className="px-6 py-4 text-sm font-bold text-[#0F2238]">{job.title}</td>
                           <td className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">{job.type}</td>
                           <td className="px-6 py-4">
                              <div className="flex items-center gap-1.5 text-[#38B65F] font-black text-xs">
                                 <Users size={12}/> {job.applicants} Applied
                              </div>
                           </td>
                           <td className="px-6 py-4 text-right">
                              <Button variant="ghost" size="sm" className="text-[#38B65F] font-bold" onClick={() => navigate(`/admin/jobs/${job.id}`)}>
                                 <ExternalLink size={14} className="mr-1"/> Inspect JD
                              </Button>
                           </td>
                        </tr>
                     ))}
                  </tbody>
               </table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function InfoItem({ icon, label, value }: { icon: React.ReactNode, label: string, value: string }) {
  return (
    <div className="flex gap-4">
      <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 shrink-0">
        {icon}
      </div>
      <div>
        <p className="text-[10px] font-black uppercase text-slate-400 tracking-wider mb-0.5">{label}</p>
        <p className="text-sm font-bold text-[#0F2238]">{value}</p>
      </div>
    </div>
  );
}
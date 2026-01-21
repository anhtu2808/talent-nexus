import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ChevronLeft, Building2, MapPin, Briefcase, Calendar, 
  Users, Globe, Mail, ShieldCheck, CheckCircle2, Sparkles,
  AlertCircle, Trash2, ExternalLink, Phone, FileCheck, XCircle, Ban, FileText,
  UserCircle2, Fingerprint, UserPlus
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Mock Data mở rộng bao quát cả 2 trường hợp: Pending (Chờ duyệt) và Verified (Đã hoạt động)
const mockCompanies = [
  { 
    id: "1", 
    name: "TechCorp Inc", 
    industry: "Information Technology", 
    taxCode: "0101234567",
    email: "contact@techcorp.io", 
    website: "https://techcorp.io", 
    location: "Palo Alto, California", 
    status: "Verified", 
    aiBalance: 1250,
    jobCount: 45, 
    joined: "Nov 15, 2024",
    logo: "https://api.dicebear.com/7.x/initials/svg?seed=TC",
    licenseUrl: "license.pdf",
    description: "Leading provider of AI-driven enterprise solutions.",
    size: "500-1000 Employees",
    requestedAccount: {
        desiredUsername: "sarah_jen",
        officialEmail: "s.jenkins@techcorp.io",
        contactPhone: "+1 650 555 0123",
        managerName: "Sarah Jenkins",
        requestedSeats: 10,
        note: "Initial enterprise setup."
    },
    // Dữ liệu chỉ có khi đã Verified
    recruiters: [
      { id: "R1", name: "Sarah Jenkins", email: "s.jenkins@techcorp.io", role: "HR Manager", status: "Active" },
      { id: "R2", name: "Michael Ross", email: "m.ross@techcorp.io", role: "Technical Recruiter", status: "Active" }
    ],
    activeJobs: [
      { id: "J01", title: "Senior React Developer", applicants: 45, type: "Full-time" },
      { id: "J02", title: "Cloud Architect (AWS)", applicants: 28, type: "Contract" }
    ]
  },
  { 
    id: "3", 
    name: "StartupXYZ", 
    industry: "Fintech", 
    taxCode: "0312987654",
    email: "hr@startupxyz.com", 
    paymentStatus: "Unpaid",
    aiBalance: 0,
    website: "https://startupxyz.com", 
    location: "London, UK", 
    status: "Pending", 
    jobCount: 0, 
    joined: "Dec 05, 2024",
    logo: "https://api.dicebear.com/7.x/initials/svg?seed=SX",
    licenseUrl: "registration.pdf",
    description: "A fast-growing Fintech startup focusing on DeFi.",
    size: "10-50 Employees",
    requestedAccount: {
        desiredUsername: "harvey_specter_pro",
        officialEmail: "harvey.specter@startupxyz.com",
        contactPhone: "+44 20 7946 0111",
        managerName: "Harvey Specter",
        requestedSeats: 5,
        note: "We need 5 seats to pilot the AI matching feature."
    },
    recruiters: [], 
    activeJobs: []
  }
];

export default function AdminCompanyDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");

  const company = mockCompanies.find(c => c.id === id) || mockCompanies[0];
  const isPending = company.status === "Pending";

  return (
    <div className="space-y-6 text-left animate-in fade-in duration-500">
      {/* 1. Header Navigation */}
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
              <p className="text-sm text-slate-500 font-medium uppercase tracking-wider">
                {isPending ? "Reviewing Registration Request" : "Verified Organization Profile"}
              </p>
            </div>
          </div>
        </div>
        <Badge className={cn(
          "px-4 py-1.5 rounded-xl border-none uppercase text-[10px] font-black tracking-widest",
          isPending ? "bg-orange-50 text-orange-600" : "bg-green-50 text-green-600"
        )}>
          ● {company.status} Account
        </Badge>
      </div>

      <Tabs defaultValue="overview" onValueChange={setActiveTab} className="w-full">
        <TabsList className="bg-slate-100/50 p-1 rounded-xl mb-6">
          <TabsTrigger value="overview" className="rounded-lg font-bold px-8 text-xs uppercase tracking-widest">Overview</TabsTrigger>
          {/* Chỉ hiện Team và Jobs nếu đã Verify */}
          {!isPending && (
            <>
              <TabsTrigger value="team" className="rounded-lg font-bold px-8 text-xs uppercase tracking-widest text-[#38B65F]">HR Team ({company.recruiters.length})</TabsTrigger>
              <TabsTrigger value="jobs" className="rounded-lg font-bold px-8 text-xs uppercase tracking-widest text-[#38B65F]">Job Listings ({company.activeJobs.length})</TabsTrigger>
            </>
          )}
        </TabsList>

        <TabsContent value="overview">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* CỘT TRÁI: THÔNG TIN TÀI KHOẢN MONG MUỐN */}
            <div className="space-y-6">
              <Card className="border-none shadow-lg rounded-2xl bg-[#0F2238] text-white overflow-hidden">
                <CardHeader className="border-b border-slate-800 bg-slate-900/50">
                  <CardTitle className="text-[10px] font-black uppercase tracking-[0.2em] text-[#38B65F] flex items-center gap-2">
                    <Fingerprint size={14} /> Requested Account Info
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-6 text-left">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-14 w-14 rounded-2xl border-2 border-[#38B65F]">
                      <AvatarFallback className="bg-slate-800 text-lg font-black">{company.requestedAccount.managerName.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-base font-black">{company.requestedAccount.managerName}</p>
                      <Badge variant="outline" className="text-[9px] border-slate-700 text-slate-400 uppercase mt-1">Recruiter Manager</Badge>
                    </div>
                  </div>

                  <div className="space-y-4 pt-4 border-t border-slate-800">
                    <AccountField icon={<UserCircle2 size={14}/>} label="Desired Username" value={company.requestedAccount.desiredUsername} />
                    <AccountField icon={<Mail size={14}/>} label="Official Email" value={company.requestedAccount.officialEmail} />
                    <AccountField icon={<Phone size={14}/>} label="Contact Phone" value={company.requestedAccount.contactPhone} />
                    <AccountField icon={<Users size={14}/>} label={isPending ? "Requested Seats" : "Active Seats"} value={`${company.requestedAccount.requestedSeats} Seats`} isHighlight={!isPending} // Chỉ xanh khi đã Verify
                      />
                      {/* FIELD MỚI: AI CREDIT BALANCE  */}
                    <div className="flex items-center justify-between group">
                      <div className="flex items-center gap-3">
                        <div className={cn("transition-colors", !isPending ? "text-[#38B65F]" : "text-slate-500")}>
                          <Sparkles size={14} />
                        </div>
                        <div className="min-w-0 text-left">
                          <p className="text-[9px] font-black uppercase text-slate-500 tracking-tighter">AI Usage Balance</p>
                          <p className={cn("text-sm font-black tracking-tight", !isPending ? "text-[#38B65F]" : "text-slate-400 italic")}>
                            {!isPending ? `${company.aiBalance?.toLocaleString()} Credits` : "Awaiting Allocation"}
                          </p>
                        </div>
                      </div>
                      {!isPending && (
                        <Badge variant="outline" className="text-[8px] border-green-500/30 text-[#38B65F] uppercase px-1.5 h-4">Active</Badge>
                      )}
                    </div>
                      
                      {/* Bổ sung Badge trạng thái thanh toán */}
                      <div className="flex items-center justify-between">
                        <p className="text-[9px] font-black uppercase text-slate-500 tracking-tighter ml-7">Billing Status</p>
                        <Badge className={cn(
                          "text-[8px] font-black uppercase border-none",
                          isPending ? "bg-slate-800 text-slate-400" : "bg-green-500/20 text-[#38B65F]"
                        )}>
                          {isPending ? "Waiting for Approval" : "Paid & Active"}
                        </Badge>
                      </div>
                  </div>
                </CardContent>
              </Card>

              {/* Thông tin pháp lý */}
              <Card className="border-none shadow-sm rounded-2xl bg-white p-6">
                 <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4">Verification Assets</h4>
                 <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100 group cursor-pointer hover:border-[#38B65F] transition-all">
                       <div className="flex items-center gap-3 text-slate-600 group-hover:text-[#38B65F]">
                          <FileText size={18} />
                          <span className="text-xs font-bold uppercase tracking-tighter">Business License</span>
                       </div>
                       <ExternalLink size={14} className="text-slate-300" />
                    </div>
                    <div className="flex items-center gap-2 text-[10px] font-bold text-[#38B65F] px-1">
                       <ShieldCheck size={12} /> Legal Docs Verified
                    </div>
                 </div>
              </Card>
            </div>

            {/* CỘT PHẢI: CHI TIẾT DOANH NGHIỆP */}
            <div className="lg:col-span-2 space-y-6">
              <Card className="border-none shadow-sm rounded-2xl bg-white overflow-hidden text-left">
                <CardHeader className="border-b border-slate-50 bg-slate-50/50 py-4 px-6">
                  <CardTitle className="text-[10px] font-black uppercase tracking-widest text-slate-400">Company Profile Dossier</CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-y-10 gap-x-8">
                    <InfoItem icon={<Building2 size={18} />} label="Registered Name" value={company.name} />
                    <InfoItem icon={<FileCheck size={18} />} label="Tax Identification" value={company.taxCode} />
                    <InfoItem icon={<Globe size={18} />} label="Website" value={company.website} />
                    <InfoItem icon={<Users size={18} />} label="Workforce Scale" value={company.size} />
                    <InfoItem icon={<MapPin size={18} />} label="Headquarters" value={company.location} />
                    <InfoItem icon={<Calendar size={18} />} label="Request Date" value={company.joined} />
                  </div>
                  <div className="mt-12 pt-8 border-t border-slate-100">
                    <h4 className="font-bold text-xs mb-3 uppercase tracking-widest text-slate-400">About Organization</h4>
                    <p className="text-slate-600 leading-relaxed text-sm">{company.description}</p>
                  </div>
                </CardContent>
              </Card>

              {/* ACTION BUTTONS */}
              <div className="flex justify-end gap-3 pt-2">
                {isPending ? (
                  <>
                    <Button variant="outline" className="rounded-xl font-bold text-red-500 border-red-100 hover:bg-red-50 px-8">Reject Registration</Button>
                    <Button className="rounded-xl bg-[#38B65F] hover:bg-[#2D914C] font-black px-12 text-white shadow-lg">Approve & Issue Account</Button>
                  </>
                ) : (
                  <>
                    <Button variant="outline" className="rounded-xl font-bold text-amber-600 border-amber-100">Suspend Access</Button>
                    <Button variant="outline" className="rounded-xl font-bold text-red-500 border-red-100">Terminate Organization</Button>
                  </>
                )}
              </div>
            </div>
          </div>
        </TabsContent>

        {/* 2. TAB TEAM (Dành cho Verified Company) */}
        <TabsContent value="team">
          <Card className="border-none shadow-sm rounded-2xl bg-white overflow-hidden text-left">
             <CardHeader className="border-b border-slate-50 bg-slate-50/50 flex flex-row items-center justify-between px-6 py-4">
                <CardTitle className="text-sm font-bold uppercase tracking-widest text-[#0F2238]">Associated Recruitment Officers</CardTitle>
                <Button variant="ghost" className="text-[#38B65F] font-bold text-xs"><UserPlus size={14} className="mr-1"/> Add Member</Button>
             </CardHeader>
             <CardContent className="p-0">
                <table className="w-full">
                   <thead className="bg-slate-50/30 text-[10px] uppercase font-black text-slate-400">
                      <tr>
                        <th className="px-6 py-4 text-left">Member Details</th>
                        <th className="px-6 py-4 text-left">Role</th>
                        <th className="px-6 py-4 text-left">Status</th>
                        <th className="px-6 py-4 text-right">Action</th>
                      </tr>
                   </thead>
                   <tbody className="divide-y divide-slate-50">
                      {company.recruiters.map((hr, idx) => (
                        <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                          <td className="px-6 py-4">
                             <div className="flex flex-col text-left">
                                <span className="text-sm font-bold text-[#0F2238]">{hr.name}</span>
                                <span className="text-[10px] text-slate-400 font-medium">{hr.email}</span>
                             </div>
                          </td>
                          <td className="px-6 py-4 text-xs font-bold text-slate-500">{hr.role}</td>
                          <td className="px-6 py-4"><Badge className="bg-green-50 text-green-600 border-none text-[10px] uppercase font-black">● {hr.status}</Badge></td>
                          <td className="px-6 py-4 text-right">
                             <Button variant="ghost" size="sm" className="text-slate-400 font-bold hover:text-[#38B65F]" onClick={() => navigate(`/admin/users/${hr.id}`)}>Audit User</Button>
                          </td>
                        </tr>
                      ))}
                   </tbody>
                </table>
             </CardContent>
          </Card>
        </TabsContent>

        {/* 3. TAB JOBS (Dành cho Verified Company) */}
        <TabsContent value="jobs">
          <Card className="border-none shadow-sm rounded-2xl bg-white overflow-hidden text-left">
            <CardHeader className="border-b border-slate-50 bg-slate-50/50 px-6 py-4">
              <CardTitle className="text-sm font-bold uppercase tracking-widest text-[#0F2238]">Organization Job Listings</CardTitle>
            </CardHeader>
            <CardContent className="p-0 text-left">
               <table className="w-full">
                  <thead className="bg-slate-50/30 text-[10px] uppercase font-black text-slate-400">
                     <tr>
                        <th className="px-6 py-4 text-left">Position</th>
                        <th className="px-6 py-4 text-left">Type</th>
                        <th className="px-6 py-4 text-left">Applicants</th>
                        <th className="px-6 py-4 text-right">Action</th>
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50 text-left">
                     {company.activeJobs.map(job => (
                        <tr key={job.id} className="hover:bg-slate-50/50 transition-colors">
                           <td className="px-6 py-4 text-sm font-bold text-[#0F2238]">{job.title}</td>
                           <td className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">{job.type}</td>
                           <td className="px-6 py-4">
                              <div className="flex items-center gap-1.5 text-[#38B65F] font-black text-xs"><Users size={12}/> {job.applicants} Applied</div>
                           </td>
                           <td className="px-6 py-4 text-right">
                              <Button variant="ghost" size="sm" className="text-[#38B65F] font-bold" onClick={() => navigate(`/admin/jobs/${job.id}`)}><ExternalLink size={14} className="mr-1"/> Inspect JD</Button>
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

// Internal Helper Components
function AccountField({ icon, label, value, isHighlight }: { icon: React.ReactNode, label: string, value: string, isHighlight?: boolean }) {
    return (
      <div className="flex items-center justify-between group">
        <div className="flex items-center gap-3">
          <div className="text-slate-500 group-hover:text-[#38B65F] transition-colors">{icon}</div>
          <div className="min-w-0 text-left">
            <p className="text-[9px] font-black uppercase text-slate-500 tracking-tighter">{label}</p>
            <p className={cn("text-xs font-bold truncate", isHighlight ? "text-[#38B65F]" : "text-white")}>{value}</p>
          </div>
        </div>
      </div>
    );
}

function InfoItem({ icon, label, value }: { icon: React.ReactNode, label: string, value: string }) {
  return (
    <div className="flex gap-4">
      <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 shrink-0">
        {icon}
      </div>
      <div className="text-left">
        <p className="text-[10px] font-black uppercase text-slate-400 tracking-wider mb-0.5">{label}</p>
        <p className="text-sm font-bold text-[#0F2238]">{value}</p>
      </div>
    </div>
  );
}
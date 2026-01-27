import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ChevronLeft, Building2, MapPin, Calendar, History,
  Wallet, CreditCard, Receipt,
  Users, Globe, Mail, ShieldCheck, Sparkles,
  ExternalLink, Phone, FileCheck, FileText, Clock,
  UserCircle2, Fingerprint, Info, ShieldAlert
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

// Mock Data cập nhật theo Rule: 1 Company = 1 Recruiter Account 
const mockCompanies = [
  { 
    id: "1", 
    name: "TechCorp Inc", 
    industry: "Information Technology", 
    taxCode: "0101234567",
    status: "Approved", // Cập nhật status theo luồng BR-51 
    aiBalance: 1250,
    joined: "Nov 15, 2024",
    logo: "https://api.dicebear.com/7.x/initials/svg?seed=TC",
    description: "Leading provider of AI-driven enterprise solutions.",
    size: "500-1000 Employees",
    location: "Palo Alto, California",
    website: "https://techcorp.io",
    // Duy nhất 1 Recruiter Account  
    recruiter: {
        id: "R1",
        name: "Sarah Jenkins",
        email: "s.jenkins@techcorp.io",
        phone: "+1 650 555 0123",
        username: "sarah_jen",
        role: "Recruiter Manager",
        status: "Active",
        lastLogin: "2 hours ago"
    },
    purchasedPackages: [
        { id: "P1", name: "Standard Subscription", type: "Subscription", price: 5000000, date: "Dec 01, 2025", expiry: "Dec 01, 2026", status: "Active" },
        { id: "P2", name: "AI Power Pack (5000 Credits)", type: "Usage", price: 2000000, date: "Jan 10, 2026", expiry: "Permanent", status: "Completed" }
    ],
    activeJobs: [
      { id: "J01", title: "Senior React Developer", applicants: 45, type: "Full-time" }
    ]
  },
  { 
    id: "3", 
    name: "StartupXYZ", 
    industry: "Fintech", 
    taxCode: "0312987654",
    status: "Pending", 
    aiBalance: 0,
    joined: "Dec 05, 2024",
    logo: "https://api.dicebear.com/7.x/initials/svg?seed=SX",
    description: "A fast-growing Fintech startup focusing on DeFi.",
    size: "10-50 Employees",
    location: "Ha Noi, VN",
    website: "https://startupxyz.vn",
    recruiter: {
        id: "R3",
        name: "Harvey Specter",
        email: "harvey.specter@startupxyz.com",
        phone: "+84 389 275 513",
        username: "harvey_specter_pro",
        role: "Recruiter Manager",
        status: "Pending Approval",
        lastLogin: "Never"
    },
    activeJobs: []
  }
];

export default function AdminCompanyDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");

  const company = mockCompanies.find(c => c.id === id) || mockCompanies[0];
  const isApproved = company.status === "Approved";

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(val);
  };
  return (
    <div className="space-y-6 text-left animate-in fade-in duration-500">
      {/* 1. Header Navigation */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" onClick={() => navigate(-1)} className="rounded-xl border-slate-200">
            <ChevronLeft className="w-5 h-5" />
          </Button>
          <div>
            <h2 className="text-2xl font-extrabold text-[#0F2238] tracking-tight">{company.name}</h2>
            <p className="text-sm text-slate-500 font-medium uppercase tracking-wider">
               Moderation Phase: {company.status} 
            </p>
          </div>
        </div>
        <Badge className={cn(
          "px-4 py-1.5 rounded-xl border-none uppercase text-[10px] font-black tracking-widest",
          company.status === "Approved" ? "bg-green-50 text-green-600" : "bg-orange-50 text-orange-600"
        )}>
          ● {company.status}
        </Badge>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="bg-slate-100/50 p-1 rounded-xl mb-6">
          <TabsTrigger value="overview" className="rounded-lg font-bold px-8 text-xs uppercase tracking-widest">Dossier Overview</TabsTrigger>
          <TabsTrigger value="recruiter" className="rounded-lg font-bold px-8 text-xs uppercase tracking-widest text-[#38B65F]">Recruiter Profile</TabsTrigger>
         <TabsTrigger value="billing" className="rounded-lg font-bold px-6 text-xs uppercase tracking-widest text-blue-600 italic">Financial & Packages</TabsTrigger>
          {isApproved && (
            <TabsTrigger value="jobs" className="rounded-lg font-bold px-6 text-xs uppercase tracking-widest text-[#38B65F]">Active Jobs</TabsTrigger>
          )}
        </TabsList>

        <TabsContent value="overview">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* CỘT TRÁI: QUICK METRICS */}
            <div className="space-y-6">
              <Card className="border-none shadow-lg rounded-2xl bg-[#0F2238] text-white overflow-hidden">
                <CardHeader className="border-b border-slate-800 bg-slate-900/50 py-4">
                  <CardTitle className="text-[10px] font-black uppercase tracking-[0.2em] text-[#38B65F] flex items-center gap-2">
                    <Fingerprint size={14} /> Account Allocation
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-5 text-left">
                    <AccountField icon={<Sparkles size={14} />} label="AI Usage Balance" value={isApproved ? `${company.aiBalance?.toLocaleString()} Credits` : "Locked"} isHighlight={isApproved} />
                    <AccountField icon={<Mail size={14}/>} label="Auth Email" value={company.recruiter.email} />
                    <AccountField icon={<UserCircle2 size={14}/>} label="Master Username" value={company.recruiter.username} />
                    
                    <div className="pt-4 border-t border-slate-800">
                        <p className="text-[9px] font-black uppercase text-slate-500 tracking-tighter mb-2">Registration Status</p>
                        <Badge className={cn(
                            "w-full justify-center text-[10px] font-black uppercase border-none py-1.5",
                            isApproved ? "bg-green-500/20 text-[#38B65F]" : "bg-slate-800 text-slate-400"
                        )}>
                            {isApproved ? "Subscription Active" : "Moderation Pending"}
                        </Badge>
                    </div>
                </CardContent>
              </Card>

              <Card className="border-none shadow-sm rounded-2xl bg-white p-6">
                  <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4">Legal Verification </h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100 group cursor-pointer hover:border-[#38B65F] transition-all">
                       <div className="flex items-center gap-3 text-slate-600 group-hover:text-[#38B65F]">
                          <FileText size={18} />
                          <span className="text-xs font-bold uppercase tracking-tighter">Business License</span>
                       </div>
                       <ExternalLink size={14} className="text-slate-300" />
                    </div>
                    {isApproved && (
                        <div className="flex items-center gap-2 text-[10px] font-bold text-[#38B65F] px-1 animate-pulse">
                            <ShieldCheck size={12} /> Verified by Admin
                        </div>
                    )}
                  </div>
              </Card>
            </div>

            {/* CỘT PHẢI: CHI TIẾT DOANH NGHIỆP */}
            <div className="lg:col-span-2 space-y-6">
              <Card className="border-none shadow-sm rounded-2xl bg-white overflow-hidden text-left">
                <CardHeader className="border-b border-slate-50 bg-slate-50/50 py-4 px-6">
                  <CardTitle className="text-[10px] font-black uppercase tracking-widest text-slate-400">Organization Dossier</CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-y-10 gap-x-8">
                    <InfoItem icon={<Building2 size={18} />} label="Registered Name" value={company.name} />
                    <InfoItem icon={<FileCheck size={18} />} label="Tax Identification" value={company.taxCode} />
                    <InfoItem icon={<Globe size={18} />} label="Website URL" value={company.website} />
                    <InfoItem icon={<Users size={18} />} label="Staff Size" value={company.size} />
                    <InfoItem icon={<MapPin size={18} />} label="HQ Location" value={company.location} />
                    <InfoItem icon={<Calendar size={18} />} label="Request Logged" value={company.joined} />
                  </div>
                  <div className="mt-12 pt-8 border-t border-slate-100">
                    <h4 className="font-bold text-xs mb-3 uppercase tracking-widest text-slate-400">Company Bio</h4>
                    <p className="text-slate-600 leading-relaxed text-sm">{company.description}</p>
                  </div>
                </CardContent>
              </Card>

              <div className="flex justify-end gap-3">
                {!isApproved ? (
                  <>
                    <Button variant="outline" className="rounded-xl font-bold text-red-500 border-red-100 px-8">Reject</Button>
                    <Button className="rounded-xl bg-[#38B65F] hover:bg-[#2D914C] font-black px-12 text-white">Approve & Activate </Button>
                  </>
                ) : (
                  <Button variant="outline" className="rounded-xl font-bold text-red-500 border-red-100">Suspend Organization</Button>
                )}
              </div>
            </div>
          </div>
        </TabsContent>

        {/* 2. TAB RECRUITER (Thay thế HR Team)  */}
        <TabsContent value="recruiter">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="border-none shadow-sm rounded-2xl bg-white p-8 text-center flex flex-col items-center">
                    <Avatar className="h-24 w-24 rounded-3xl border-4 border-slate-50 mb-4">
                        <AvatarFallback className="bg-[#0F2238] text-white text-2xl font-black">{company.recruiter.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <h3 className="text-xl font-black text-[#0F2238]">{company.recruiter.name}</h3>
                    <p className="text-xs font-bold text-[#38B65F] uppercase tracking-widest mb-4">{company.recruiter.role}</p>
                    <Badge variant="outline" className="rounded-full px-4 border-slate-100 text-slate-400 text-[10px]">
                        ID: {company.recruiter.id}
                    </Badge>
                </Card>

                <Card className="md:col-span-2 border-none shadow-sm rounded-2xl bg-white overflow-hidden">
                    <CardHeader className="border-b border-slate-50 bg-slate-50/50 px-8 py-4">
                        <CardTitle className="text-xs font-black uppercase tracking-widest text-slate-400">Account Security & Contact</CardTitle>
                    </CardHeader>
                    <CardContent className="p-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <InfoItem icon={<Mail size={18}/>} label="Email Address" value={company.recruiter.email} />
                            <InfoItem icon={<Phone size={18}/>} label="Contact Number" value={company.recruiter.phone} />
                            <InfoItem icon={<UserCircle2 size={18}/>} label="System Username" value={company.recruiter.username} />
                            <InfoItem icon={<Clock size={18}/>} label="Last Activity" value={company.recruiter.lastLogin} />
                        </div>

                        <div className="mt-10 p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-start gap-4">
                            <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-blue-500 shadow-sm shrink-0">
                                <ShieldAlert size={20} />
                            </div>
                            <div>
                                <p className="text-xs font-bold text-[#0F2238] mb-1">Account Governance</p>
                                <p className="text-[11px] text-slate-500 leading-relaxed">
                                    This recruiter account is the primary master for <strong>{company.name}</strong>.  
                                    All job listings and AI credit consumption are tied to this profile.
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </TabsContent>

        <TabsContent value="billing" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="border-none shadow-sm rounded-2xl bg-white p-6 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600"><Wallet size={24}/></div>
                    <div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Current Balance</p>
                        <p className="text-xl font-black text-[#0F2238]">{company.aiBalance?.toLocaleString()} Credits</p>
                    </div>
                </Card>
                <Card className="border-none shadow-sm rounded-2xl bg-white p-6 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600"><CreditCard size={24}/></div>
                    <div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Active Subscription</p>
                        <p className="text-xl font-black text-[#0F2238]">Standard</p>
                    </div>
                </Card>
                <Card className="border-none shadow-sm rounded-2xl bg-[#0F2238] p-6 flex items-center gap-4 text-white">
                    <div className="w-12 h-12 rounded-xl bg-[#38B65F]/20 flex items-center justify-center text-[#38B65F]"><Receipt size={24}/></div>
                    <div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Total Revenue</p>
                        <p className="text-xl font-black text-[#38B65F]">{formatCurrency(7000000)}</p>
                    </div>
                </Card>
            </div>

            <Card className="border-none shadow-sm rounded-2xl bg-white overflow-hidden text-left">
                <CardHeader className="border-b border-slate-50 bg-slate-50/50 px-8 py-4 flex flex-row justify-between items-center">
                    <CardTitle className="text-xs font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
                        <History size={16} /> Package Purchase History 
                    </CardTitle>
                    <Button variant="ghost" className="text-xs font-bold text-blue-600">Download All Invoices</Button>
                </CardHeader>
                <CardContent className="p-0">
                    <table className="w-full text-left">
                        <thead className="bg-slate-50/30 text-[10px] uppercase font-black text-slate-400">
                            <tr>
                                <th className="px-8 py-4">Package Name</th>
                                <th className="px-8 py-4">Billing Type</th>
                                <th className="px-8 py-4">Amount</th>
                                <th className="px-8 py-4">Purchase Date</th>
                                <th className="px-8 py-4">Expiration</th>
                                <th className="px-8 py-4 text-right">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {company.purchasedPackages.map(pkg => (
                                <tr key={pkg.id} className="hover:bg-slate-50/50 transition-colors">
                                    <td className="px-8 py-4 text-sm font-bold text-[#0F2238]">{pkg.name}</td>
                                    <td className="px-8 py-4">
                                        <Badge variant="outline" className={cn(
                                            "text-[9px] uppercase font-black px-2 py-0.5",
                                            pkg.type === "Subscription" ? "border-purple-200 text-purple-600 bg-purple-50" : "border-blue-200 text-blue-600 bg-blue-50"
                                        )}>
                                            {pkg.type}
                                        </Badge>
                                    </td>
                                    <td className="px-8 py-4 text-sm font-black text-slate-600">{formatCurrency(pkg.price)}</td>
                                    <td className="px-8 py-4 text-xs font-bold text-slate-400 italic">{pkg.date}</td>
                                    <td className="px-8 py-4 text-xs font-bold text-slate-400">{pkg.expiry}</td>
                                    <td className="px-8 py-4 text-right">
                                        <Badge className={cn(
                                            "text-[10px] font-black uppercase border-none px-3 py-1",
                                            pkg.status === "Active" ? "bg-green-50 text-green-600" : "bg-slate-100 text-slate-400"
                                        )}>
                                            ● {pkg.status}
                                        </Badge>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </CardContent>
            </Card>
        </TabsContent>

        <TabsContent value="jobs">
          <Card className="border-none shadow-sm rounded-2xl bg-white overflow-hidden">
            <CardHeader className="border-b border-slate-50 bg-slate-50/50 px-6 py-4">
              <CardTitle className="text-sm font-bold uppercase tracking-widest text-[#0F2238]">Active Listings</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
               <table className="w-full text-left">
                  <thead className="bg-slate-50/30 text-[10px] uppercase font-black text-slate-400">
                     <tr>
                        <th className="px-8 py-4">Position Title</th>
                        <th className="px-8 py-4">Type</th>
                        <th className="px-8 py-4">Applicants</th>
                        <th className="px-8 py-4 text-right">Action</th>
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                     {company.activeJobs.map(job => (
                        <tr key={job.id} className="hover:bg-slate-50/50 transition-colors">
                           <td className="px-8 py-4 text-sm font-bold text-[#0F2238]">{job.title}</td>
                           <td className="px-8 py-4 text-xs font-bold text-slate-500 uppercase">{job.type}</td>
                           <td className="px-8 py-4">
                              <div className="flex items-center gap-1.5 text-[#38B65F] font-black text-xs"><Users size={12}/> {job.applicants} Applied</div>
                           </td>
                           <td className="px-8 py-4 text-right">
                              <Button variant="ghost" size="sm" className="text-[#38B65F] font-bold" onClick={() => navigate(`/admin/jobs/${job.id}`)}>
                                <ExternalLink size={14} className="mr-1"/> Inspect
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

// Helper Components
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
      <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 shrink-0">{icon}</div>
      <div className="text-left">
        <p className="text-[10px] font-black uppercase text-slate-400 tracking-wider mb-0.5">{label}</p>
        <p className="text-sm font-bold text-[#0F2238]">{value}</p>
      </div>
    </div>
  );
}
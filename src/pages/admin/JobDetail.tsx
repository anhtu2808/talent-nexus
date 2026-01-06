import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ChevronLeft, Building2, MapPin, Briefcase, Calendar, 
  Users, Mail, Phone, Globe, User, ShieldCheck, 
  AlertCircle, FileText, Trash2, PauseCircle, CheckCircle, Download, Eye
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Dữ liệu mẫu mở rộng với thông tin Công ty và Người đăng
const mockJobs = [
  { 
    id: "1", 
    title: "Senior React Developer", 
    location: "San Francisco, CA", 
    type: "Full-time", 
    status: "Active", 
    posted: "Dec 1, 2024", 
    applicantsCount: 2, 
    salary: "$2,000 - $3,500",
    description: "Seeking a Senior React Developer to lead our frontend team in building recruitment tools.",
    requirements: ["5+ years React experience", "Team leadership", "Strong Communication"],
    // Thông tin chi tiết Công ty 
    company: {
      name: "TechCorp Inc",
      logo: "https://api.dicebear.com/7.x/initials/svg?seed=TC",
      website: "https://techcorp.io",
      industry: "Information Technology",
      size: "500-1000 Employees",
      address: "123 Silicon Valley, CA",
      verified: true
    },
    // Thông tin người đăng (Recruiter) [cite: 33, 47]
    postedBy: {
      name: "Nguyen Van A",
      email: "nva@gmail.com",
      phone: "+84 987 654 321",
      role: "Talent Acquisition Manager",
      avatar: ""
    },
    applicants: [
      { id: "A1", name: "Alice Nguyen", status: "Shortlisted", appliedDate: "Dec 5, 2024", cvUrl: "/sample-cv.pdf" },
      { id: "A2", name: "Bob Tran", status: "Applied", appliedDate: "Dec 6, 2024", cvUrl: "/sample-cv.pdf" }
    ]
  },
  { 
    id: "2", 
    title: "Full Stack Java Developer", 
    location: "Ha Noi, VN", 
    type: "Full-time", 
    status: "Active", 
    posted: "Nov 28, 2024", 
    applicantsCount: 2, 
    salary: "$1,500 - $2,500",
    description: "Join our fintech team to build secure and scalable banking solutions using Spring Boot and React.",
    requirements: ["3+ years Java/Spring Boot", "ReactJS proficiency", "Microservices experience"],
    company: {
      name: "FinTech Solutions",
      logo: "https://api.dicebear.com/7.x/initials/svg?seed=FS",
      website: "https://fintechsolutions.vn",
      industry: "Fintech",
      size: "100-200 Employees",
      address: "Cau Giay District, Ha Noi",
      verified: true
    },
    postedBy: {
      name: "Eison Dam",
      email: "damed@gmail.com",
      phone: "+84 389 275 513",
      role: "HR Leader",
      avatar: ""
    },
    applicants: [
      { id: "A3", name: "Nguyen Van C", status: "Applied", appliedDate: "Dec 1, 2024" },
      { id: "A4", name: "Nguyen Van D", status: "Reviewing", appliedDate: "Dec 2, 2024" }
    ]
  },
  { 
    id: "3", 
    title: "AI/ML Engineer", 
    location: "Remote", 
    type: "Contract", 
    status: "Paused", 
    posted: "Dec 10, 2024", 
    applicantsCount: 1, 
    salary: "Negotiable",
    description: "Develop and fine-tune NLP models for automated resume scoring and matching.",
    requirements: ["Master's in CS or related field", "Python & PyTorch expertise", "Experience with BERT/NLP"],
    company: {
      name: "SmartRecruit AI",
      logo: "https://api.dicebear.com/7.x/initials/svg?seed=SR",
      website: "https://smartrecruit.ai",
      industry: "Artificial Intelligence",
      size: "10-50 Employees",
      address: "Remote / San Francisco",
      verified: false
    },
    postedBy: {
      name: "John Tom",
      email: "Tom@job.com",
      phone: "+84 974 969 904",
      role: "AI Technical Recruiter",
      avatar: ""
    },
    applicants: [
      { id: "A5", name: "Nguyen Van B", status: "Applied", appliedDate: "Dec 11, 2024" }
    ]
  }
];

export default function AdminJobDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("details");

  const job = mockJobs.find(j => j.id === id);

  if (!job) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <AlertCircle className="w-16 h-16 text-red-500 mb-4" />
        <h2 className="text-2xl font-bold text-[#0F2238]">Job Not Found</h2>
        <Button onClick={() => navigate('/admin/jobs')} className="mt-4 rounded-xl bg-[#0F2238]">Back to Listings</Button>
      </div>
    );
  }

  return (
    <div className="space-y-6 text-left animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" onClick={() => navigate(-1)} className="rounded-xl border-slate-200 bg-white shadow-sm">
            <ChevronLeft className="w-5 h-5 text-slate-600" />
          </Button>
          <div>
            <h2 className="text-2xl font-extrabold text-[#0F2238] tracking-tight">{job.title}</h2>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">ID: {job.id} • Posted on {job.posted}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
            <Badge className={cn(
                "px-4 py-1.5 rounded-xl border-none uppercase text-[10px] font-black tracking-widest",
                job.status === "Active" ? "bg-green-50 text-green-600" : "bg-amber-50 text-amber-600"
            )}>
                ● {job.status}
            </Badge>
        </div>
      </div>

      <Tabs defaultValue="details" onValueChange={setActiveTab} className="w-full">
        <TabsList className="bg-slate-100/50 p-1 rounded-xl mb-6">
          <TabsTrigger value="details" className="rounded-lg font-bold px-8">Job & Company</TabsTrigger>
          <TabsTrigger value="applicants" className="rounded-lg font-bold px-8">Applicants ({job.applicantsCount})</TabsTrigger>
        </TabsList>

        <TabsContent value="details" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* CỘT TRÁI: THÔNG TIN CÔNG TY & NGƯỜI ĐĂNG */}
            <div className="space-y-6">
              {/* Card Công ty  */}
              <Card className="border-none shadow-sm rounded-2xl bg-white overflow-hidden">
                <CardHeader className="border-b border-slate-50 bg-slate-50/50 py-4 px-6">
                    <CardTitle className="text-xs font-bold uppercase tracking-widest text-slate-400 flex items-center gap-2">
                        <Building2 size={14} /> Company Profile
                    </CardTitle>
                </CardHeader>
                <CardContent className="p-6 text-center">
                  <img src={job.company.logo} alt={job.company.name} className="w-20 h-20 rounded-2xl mx-auto mb-4 border border-slate-100 shadow-sm" />
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <h3 className="text-lg font-black text-[#0F2238]">{job.company.name}</h3>
                    {job.company.verified && <ShieldCheck size={16} className="text-[#38B65F]" />}
                  </div>
                  <p className="text-xs font-bold text-[#38B65F] uppercase mb-6">{job.company.industry}</p>
                  
                  <div className="space-y-3 text-left border-t pt-6 border-slate-50">
                    <CompanyMetaItem icon={<Globe size={14} />} label="Website" value={job.company.website} isLink />
                    <CompanyMetaItem icon={<Users size={14} />} label="Size" value={job.company.size} />
                    <CompanyMetaItem icon={<MapPin size={14} />} label="Address" value={job.company.address} />
                  </div>
                </CardContent>
              </Card>

              {/* Card Người đăng (Recruiter)  */}
              <Card className="border-none shadow-sm rounded-2xl bg-[#0F2238] text-white overflow-hidden">
                <CardHeader className="py-4 px-6 border-b border-slate-800">
                    <CardTitle className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 flex items-center gap-2">
                        <User size={14} /> Posted By
                    </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-6">
                    <Avatar className="h-12 w-12 rounded-xl border-2 border-slate-700">
                        <AvatarFallback className="bg-slate-700 text-white font-bold">{job.postedBy.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="text-left">
                        <p className="text-sm font-black">{job.postedBy.name}</p>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">{job.postedBy.role}</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-xs text-slate-300">
                        <Mail size={14} className="text-[#38B65F]" /> {job.postedBy.email}
                    </div>
                    <div className="flex items-center gap-3 text-xs text-slate-300">
                        <Phone size={14} className="text-[#38B65F]" /> {job.postedBy.phone}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* CỘT PHẢI: NỘI DUNG CÔNG VIỆC */}
            <div className="lg:col-span-2 space-y-6">
              <Card className="border-none shadow-sm rounded-2xl bg-white overflow-hidden">
                <CardHeader className="border-b border-slate-50 bg-slate-50/50 py-4 px-6">
                  <CardTitle className="text-sm font-bold uppercase tracking-wider text-[#0F2238]">Job Specifications</CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-y-10 gap-x-8">
                    <InfoItem icon={<Briefcase size={18} />} label="Employment Type" value={job.type} />
                    <InfoItem icon={<MapPin size={18} />} label="Location" value={job.location} />
                    <InfoItem icon={<Calendar size={18} />} label="Posted Date" value={job.posted} />
                    <InfoItem icon={<Users size={18} />} label="Applicant Limit" value="Unlimited" />
                  </div>
                  
                  <div className="mt-10 pt-8 border-t border-slate-100">
                    <h4 className="font-bold text-xs mb-4 uppercase tracking-widest text-slate-400">Position Description</h4>
                    <p className="text-slate-600 leading-relaxed text-sm">{job.description}</p>
                  </div>

                  <div className="mt-8">
                    <h4 className="font-bold text-xs mb-4 uppercase tracking-widest text-slate-400">Requirements</h4>
                    <ul className="space-y-2">
                        {job.requirements.map((req, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                                <CheckCircle size={14} className="text-[#38B65F] mt-1 shrink-0" /> {req}
                            </li>
                        ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>

              {/* Admin Footer Actions */}
              <div className="flex justify-end gap-3 pt-2">
                <Button variant="outline" className="rounded-xl font-bold text-amber-600 border-slate-200 hover:bg-amber-50">
                    <PauseCircle className="w-4 h-4 mr-2" /> Pause Listing
                </Button>
                <Button variant="outline" className="rounded-xl font-bold text-red-500 border-slate-200 hover:bg-red-50">
                    <Trash2 className="w-4 h-4 mr-2" /> Delete Listing
                </Button>
                <Button className="rounded-xl bg-[#38B65F] font-bold px-8 text-white shadow-lg shadow-green-100">
                  Update Position
                </Button>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* TAB ỨNG VIÊN */}
        <TabsContent value="applicants">
          <Card className="border-none shadow-sm rounded-2xl bg-white overflow-hidden">
            <CardHeader className="border-b border-slate-50 bg-slate-50/50 px-6 py-4">
              <CardTitle className="text-sm font-bold uppercase tracking-widest text-[#0F2238]">Applicant List</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <table className="w-full text-left">
                <thead className="bg-slate-50/30 text-[10px] uppercase font-black text-slate-400">
                  <tr>
                    <th className="px-6 py-4">Candidate Name</th>
                    <th className="px-6 py-4">Application Status</th>
                    <th className="px-6 py-4">Submission Date</th>
                    <th className="px-6 py-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {job.applicants.map((applicant) => (
                    <tr key={applicant.id} className="hover:bg-slate-50/50 transition-colors group">
                      <td className="px-6 py-4 flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center text-xs font-black">
                          {applicant.name.charAt(0)}
                        </div>
                        <span className="text-sm font-bold text-[#0F2238]">{applicant.name}</span>
                      </td>
                      <td className="px-6 py-4">
                        <Badge className="bg-blue-50 text-blue-600 border-none text-[10px] font-black uppercase">
                            {applicant.status}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 text-xs font-medium text-slate-400">{applicant.appliedDate}</td>
                      <td className="px-6 py-4 text-right">
                        
                        {/* TÍCH HỢP XEM CV TẠI ĐÂY */}
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="ghost" size="sm" className="text-[#38B65F] font-bold">
                              <Eye size={14} className="mr-1" /> View CV
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-4xl h-[90vh] flex flex-col p-0 overflow-hidden rounded-2xl border-none">
                            <DialogHeader className="p-4 border-b bg-white">
                              <div className="flex items-center justify-between pr-8">
                                <DialogTitle className="flex items-center gap-2 text-[#0F2238]">
                                  <FileText className="w-5 h-5 text-blue-500" />
                                  CV - {applicant.name}
                                </DialogTitle>
                                <a 
                                  href={applicant.cvUrl} 
                                  download 
                                  className="text-xs flex items-center gap-1 font-bold text-slate-500 hover:text-[#38B65F]"
                                >
                                  <Download size={14} /> Download PDF
                                </a>
                              </div>
                            </DialogHeader>
                            <div className="flex-1 bg-slate-100 p-4 overflow-auto">
                              <iframe 
                                src={`${applicant.cvUrl}#toolbar=0`} 
                                className="w-full h-full rounded-lg shadow-lg bg-white"
                                title={`CV of ${applicant.name}`}
                              />
                            </div>
                          </DialogContent>
                        </Dialog>

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

// Sub-components hỗ trợ
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

function CompanyMetaItem({ icon, label, value, isLink }: { icon: React.ReactNode, label: string, value: string, isLink?: boolean }) {
  return (
    <div className="flex items-center gap-3">
      <div className="text-slate-300">{icon}</div>
      <div className="min-w-0">
        <p className="text-[9px] font-black uppercase text-slate-400 tracking-tighter">{label}</p>
        {isLink ? (
          <a href={value} target="_blank" rel="noreferrer" className="text-xs font-bold text-blue-500 hover:underline truncate block">
            {value.replace('https://', '')}
          </a>
        ) : (
          <p className="text-xs font-bold text-slate-600 truncate">{value}</p>
        )}
      </div>
    </div>
  );
}
import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ChevronLeft, Mail, Calendar, Briefcase, MapPin, 
  Shield, UserCheck, BarChart3, Building2,
  Phone, Globe, CheckCircle2, XCircle, FileText, Eye, Download
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { cn } from "@/lib/utils";

// Mock Data integrated with platform logic [cite: 72]
const mockUsers = [
  { 
    id: "1", name: "John Smith", email: "john@example.com", role: "Candidate", status: "Active", 
    cvCount: 3, applications: 12, joined: "Dec 1, 2024", phone: "+84 901 234 567", 
    location: "Ho Chi Minh City, VN", atsScoreAverage: 85,
    cvs: [
      { id: "CV01", name: "Senior_React_Dev_v1.pdf", date: "Dec 5, 2024", score: 92, url: "/sample-cv.pdf" },
      { id: "CV02", name: "Frontend_Engineer_Fullstack.docx", date: "Dec 10, 2024", score: 78, url: "/sample-cv.pdf" }
    ]
  },
  { 
    id: "2", name: "TechCorp Inc", email: "hr@techcorp.com", role: "Recruiter", status: "Active", 
    jobPosts: 8, totalHires: 24, joined: "Nov 15, 2024", companyName: "TechCorp Inc", 
    industry: "Information Technology", phone: "+84 28 3333 4444", location: "District 1, HCM",
    jobs: [
      { id: "JOB01", title: "Senior Java Developer", applicants: 45, status: "Active" },
      { id: "JOB02", title: "Project Manager", applicants: 12, status: "Closed" }
    ]
  }
];

export default function UserDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedCV, setSelectedCV] = useState<{name: string, url: string} | null>(null);

  const user = mockUsers.find(u => u.id === id);

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <XCircle className="w-16 h-16 text-red-500 mb-4" />
        <h2 className="text-2xl font-bold text-[#0F2238]">User Not Found</h2>
        <Button onClick={() => navigate('/admin/users')} className="mt-4 rounded-xl bg-[#0F2238]">Back to List</Button>
      </div>
    );
  }

  const isCandidate = user.role === "Candidate";
  const isRecruiter = user.role === "Recruiter";

  return (
    <div className="space-y-6 text-left animate-in fade-in duration-500">
      {/* Header Navigation */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" onClick={() => navigate(-1)} className="rounded-xl border-slate-200">
            <ChevronLeft className="w-5 h-5" />
          </Button>
          <div>
            <h2 className="text-2xl font-bold text-[#0F2238] tracking-tight">{user.name}</h2>
            <p className="text-sm text-slate-500 font-medium">UID: {user.id} • {user.role} Account</p>
          </div>
        </div>
        <Badge className={cn(
          "px-4 py-1.5 rounded-xl border-none uppercase text-[10px] font-black tracking-widest",
          user.status === "Active" ? "bg-green-50 text-green-600" : "bg-amber-50 text-amber-600"
        )}>
          ● {user.status} Account
        </Badge>
      </div>

      <Tabs defaultValue="overview" onValueChange={setActiveTab} className="w-full">
        <TabsList className="bg-slate-100/50 p-1 rounded-xl mb-6">
          <TabsTrigger value="overview" className="rounded-lg font-bold px-6">Overview</TabsTrigger>
          <TabsTrigger value="assets" className="rounded-lg font-bold px-6">
            {isCandidate ? "CV Repository" : "Job Postings"}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* LEFT COLUMN: PROFILE CARD */}
            <div className="space-y-6">
              <Card className="border-none shadow-sm rounded-2xl bg-white text-center p-8">
                <div className="w-24 h-24 rounded-2xl bg-[#38B65F]/10 text-[#38B65F] flex items-center justify-center text-3xl font-black mx-auto mb-4 border-2 border-white shadow-sm">
                  {user.name.charAt(0)}
                </div>
                <h3 className="text-xl font-bold text-[#0F2238]">{user.name}</h3>
                <p className="text-sm text-slate-400 font-medium mb-6">{user.email}</p>
                <div className="flex flex-col gap-2">
                   <div className="flex justify-between text-xs font-bold border-b pb-2 border-slate-50">
                      <span className="text-slate-400">Applications</span>
                      <span className="text-[#0F2238]">{user.applications || user.totalHires}</span>
                   </div>
                   <div className="flex justify-between text-xs font-bold pt-1">
                      <span className="text-slate-400">Member Since</span>
                      <span className="text-[#0F2238]">{user.joined}</span>
                   </div>
                </div>
              </Card>

              {/* Quick AI Stats [cite: 44, 53] */}
              <Card className="border-none shadow-sm rounded-2xl bg-[#0F2238] text-white p-6">
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-6">AI Engine Status</p>
                {isCandidate ? (
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold text-slate-300">Avg. ATS Score</span>
                      <span className="text-lg font-black text-[#38B65F]">{user.atsScoreAverage}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-700 rounded-full overflow-hidden">
                      <div className="bg-[#38B65F] h-full" style={{ width: `${user.atsScoreAverage}%` }}></div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                       <CheckCircle2 size={16} className="text-[#38B65F]" />
                       <span className="text-xs font-bold">JD Semantic Parsing </span>
                    </div>
                    <div className="flex items-center gap-3">
                       <CheckCircle2 size={16} className="text-[#38B65F]" />
                       <span className="text-xs font-bold">BERT Matcher Ready </span>
                    </div>
                  </div>
                )}
              </Card>
            </div>

            {/* RIGHT COLUMN: DETAILED INFO */}
            <div className="lg:col-span-2 space-y-6">
              <Card className="border-none shadow-sm rounded-2xl bg-white overflow-hidden">
                <CardHeader className="border-b border-slate-50 bg-slate-50/50 py-4 px-6 text-left">
                  <CardTitle className="text-sm font-bold uppercase tracking-wider text-[#0F2238]">Personal Information</CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-y-10 gap-x-8">
                    <InfoItem icon={<Mail className="w-4 h-4" />} label="Email Address" value={user.email} />
                    <InfoItem icon={<Phone className="w-4 h-4" />} label="Contact phone" value={user.phone} />
                    <InfoItem icon={<MapPin className="w-4 h-4" />} label="Registered Location" value={user.location} />
                    <InfoItem icon={<Calendar className="w-4 h-4" />} label="Platform Join Date" value={user.joined} />
                    {isRecruiter && (
                      <>
                        <InfoItem icon={<Building2 className="w-4 h-4" />} label="Corporate Identity" value={user.companyName || ""} />
                        <InfoItem icon={<Globe className="w-4 h-4" />} label="Industry Sector" value={user.industry || ""} />
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Actions  */}
              <div className="flex justify-end gap-3">
                <Button variant="outline" className="rounded-xl font-bold text-red-500 border-slate-200">Deactivate Account</Button>
                
              </div>
            </div>
          </div>
        </TabsContent>

        {/* ASSETS TAB: List CVs or Jobs */}
        <TabsContent value="assets">
          <Card className="border-none shadow-sm rounded-2xl bg-white overflow-hidden">
            <CardHeader className="border-b border-slate-50 bg-slate-50/50 px-6 py-4">
              <CardTitle className="text-sm font-bold uppercase tracking-widest text-[#0F2238]">
                {isCandidate ? "CV Repository " : "Managed Job Postings "}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
            <table className="w-full text-left">
              <thead className="bg-slate-50/30 text-[10px] uppercase font-black text-slate-400">
                <tr>
                  <th className="px-6 py-4">{isCandidate ? "Document Name" : "Job Title"}</th>
                  <th className="px-6 py-4">{isCandidate ? "Uploaded Date" : "Applicants"}</th>
                  <th className="px-6 py-4">{isCandidate ? "AI Score" : "Status"}</th>
                  <th className="px-6 py-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {isCandidate ? user.cvs?.map(cv => (
                  <tr key={cv.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4 flex items-center gap-3">
                      <FileText size={16} className="text-blue-500" />
                      <span className="text-sm font-bold text-[#0F2238]">{cv.name}</span>
                    </td>
                    <td className="px-6 py-4 text-xs font-medium text-slate-500">{cv.date}</td>
                    <td className="px-6 py-4">
                      <Badge className="bg-green-50 text-green-600 border-none font-bold text-[10px]">{cv.score}%</Badge>
                    </td>
                    <td className="px-6 py-4 text-right">
                      {/* Sử dụng Dialog để xem CV */}
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="text-[#38B65F] font-bold"
                            onClick={() => setSelectedCV({ name: cv.name, url: cv.url })}
                          >
                            <Eye size={14} className="mr-1" /> View
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-4xl h-[90vh] flex flex-col p-0 overflow-hidden rounded-2xl border-none">
                          <DialogHeader className="p-4 border-b bg-white">
                            <div className="flex items-center justify-between pr-8">
                              <DialogTitle className="flex items-center gap-2 text-[#0F2238]">
                                <FileText className="w-5 h-5 text-blue-500" />
                                {cv.name}
                              </DialogTitle>
                              <a href={cv.url} download className="text-xs flex items-center gap-1 font-bold text-slate-500 hover:text-[#38B65F]">
                                <Download size={14} /> Download PDF
                              </a>
                            </div>
                          </DialogHeader>
                          <div className="flex-1 bg-slate-100 p-4 overflow-auto">
                            {/* Hiển thị PDF qua iframe */}
                            <iframe 
                              src={`${cv.url}#toolbar=0`} 
                              className="w-full h-full rounded-lg shadow-lg bg-white"
                              title="CV Preview"
                            />
                          </div>
                        </DialogContent>
                      </Dialog>
                    </td>
                  </tr>
                )) : null /* (Code recruiter giữ nguyên) */}
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
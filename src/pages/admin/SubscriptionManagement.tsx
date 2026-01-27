import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import {
  Search, Building2, User, Sparkles, 
  MoreVertical, Zap, FileText, Download, Wallet
} from "lucide-react";

// 1. Định nghĩa lại Interface theo Business Rule mới (Feature-based)
interface JobPostSubscription {
  id: string;
  company: string;
  manager: string;
  jobLimit: number; // Thay cho seats
  status: "PAID" | "UNPAID" | "EXPIRED";
  total: number;
  expiryDate: string;
}

interface AIUsageQuota {
  id: string;
  company: string;
  creditsPurchased: number;
  amount: number;
  date: string;
  status: string;
}

interface CandidatePremium {
  id: string;
  user: string;
  email: string;
  tier: string;
  aiCredits: number;
  scoring: string;
  status: string;
  price: number;
}

// 2. Mock Data cập nhật
const jobSubscriptions: JobPostSubscription[] = [
  { id: "S-101", company: "TechCorp Inc", manager: "Sarah Jenkins", jobLimit: 10, status: "PAID", total: 1500000, expiryDate: "Feb 15, 2026" },
  { id: "S-102", company: "StartupXYZ", manager: "Harvey Specter", jobLimit: 5, status: "UNPAID", total: 800000, expiryDate: "N/A" },
];

const aiUsageQuota: AIUsageQuota[] = [
  { id: "A-901", company: "TechCorp Inc", creditsPurchased: 1000, amount: 1000000, date: "Jan 10, 2026", status: "Completed" },
  { id: "A-902", company: "Global Hire", creditsPurchased: 500, amount: 500000, date: "Jan 12, 2026", status: "Completed" },
];

const candidatePremium: CandidatePremium[] = [

  { id: "U-501", user: "John Smith", email: "john@example.com", tier: "Premium", aiCredits: 100, scoring: "Unlimited", status: "Active", price: 199000 },

  { id: "U-502", user: "Emily Chen", email: "emily@dev.io", tier: "Free", aiCredits: 2, scoring: "Limited", status: "Standard", price: 0 },

];

export default function SubscriptionManagement() {
  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(val);
  };

  return (
    <div className="space-y-6 text-left animate-in fade-in duration-500">
      {/* Header Stats */}
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-black text-[#0F2238] tracking-tight">Subscription Audit</h1>
          <p className="text-slate-500 text-sm font-medium mt-1 uppercase tracking-widest leading-none">Revenue Streams & Feature Allocation</p>
        </div>
        <div className="flex gap-3">
            <StatSmall label="Job Pack Revenue" value="32.5M ₫" color="text-purple-600" icon={<FileText size={12}/>} />
            <StatSmall label="AI Quota Sales" value="18.2M ₫" icon={<Sparkles size={12}/>} color="text-blue-600" />
        </div>
      </div>

      <Tabs defaultValue="company" className="w-full">
        <div className="flex flex-col lg:flex-row justify-between items-center gap-4 mb-6">
          <TabsList className="bg-slate-100/50 p-1 rounded-xl border border-slate-200">
            <TabsTrigger value="company" className="rounded-lg font-bold px-8 data-[state=active]:bg-white">
              <Building2 size={16} className="mr-2"/> Recruiter (B2B)
            </TabsTrigger>
            <TabsTrigger value="candidate" className="rounded-lg font-bold px-8 data-[state=active]:bg-white data-[state=active]:text-blue-600">
              <User size={16} className="mr-2"/> Candidate (B2C)
            </TabsTrigger>
          </TabsList>
          <div className="flex gap-2">
             <Button variant="outline" size="sm" className="rounded-xl border-slate-200 font-bold text-slate-500"><Download size={14} className="mr-2"/> Export Audit</Button>
          </div>
        </div>

        {/* PHẦN RECRUITER: Tách biệt Gói đăng bài và AI Credits */}
        <TabsContent value="company" className="space-y-6">
          <Tabs defaultValue="job_packs">
            <div className="flex items-center gap-2 mb-4">
               <TabsList className="bg-transparent p-0 gap-2">
                  <TabsTrigger value="job_packs" className="rounded-full px-5 border border-slate-200 data-[state=active]:bg-purple-600 data-[state=active]:text-white font-bold text-[10px] uppercase tracking-widest">1. Gói đăng bài & Feature</TabsTrigger>
                  <TabsTrigger value="ai_usage" className="rounded-full px-5 border border-slate-200 data-[state=active]:bg-blue-600 data-[state=active]:text-white font-bold text-[10px] uppercase tracking-widest">2. AI Usage Quota</TabsTrigger>
               </TabsList>
               <div className="h-[1px] flex-1 bg-slate-100" />
            </div>

            {/* Quản lý Gói Đăng Bài */}
            <TabsContent value="job_packs">
              <Card className="border-none shadow-sm rounded-2xl overflow-hidden bg-white">
                <table className="w-full text-left">
                  <thead className="bg-slate-50/50 border-b border-slate-100 text-[10px] uppercase font-black text-slate-400">
                    <tr>
                      <th className="px-6 py-4">Organization & Manager</th>
                      <th className="px-6 py-4 text-center">Job Post Limit</th>
                      <th className="px-6 py-4">Subscription Fee</th>
                      <th className="px-6 py-4">Status</th>
                      <th className="px-6 py-4 text-right">Expiry Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {jobSubscriptions.map((sub) => (
                      <tr key={sub.id} className="hover:bg-slate-50/30 transition-colors group">
                        <td className="px-6 py-4">
                           <p className="font-bold text-sm text-[#0F2238] group-hover:text-purple-600 transition-colors">{sub.company}</p>
                           <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">PIC: {sub.manager}</p>
                        </td>
                        <td className="px-6 py-4 text-center">
                           <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-100 font-black uppercase text-[9px]">
                              <FileText size={10} className="mr-1.5"/> {sub.jobLimit} Tin đăng
                           </Badge>
                        </td>
                        <td className="px-6 py-4 text-sm font-black text-[#0F2238]">{formatCurrency(sub.total)}</td>
                        <td className="px-6 py-4">
                           <Badge className={cn(
                             "text-[9px] font-black uppercase border-none", 
                             sub.status === "PAID" ? "bg-green-50 text-green-600" : "bg-orange-50 text-orange-600"
                           )}>
                             ● {sub.status}
                           </Badge>
                        </td>
                        <td className="px-6 py-4 text-right text-xs font-medium text-slate-400 italic">{sub.expiryDate}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Card>
            </TabsContent>

            {/* Quản lý AI Usage Quota */}
            <TabsContent value="ai_usage">
              <Card className="border-none shadow-sm rounded-2xl overflow-hidden bg-white">
                <table className="w-full text-left">
                  <thead className="bg-slate-50/50 border-b border-slate-100 text-[10px] uppercase font-black text-slate-400">
                    <tr>
                      <th className="px-6 py-4">Transaction ID</th>
                      <th className="px-6 py-4">Organization</th>
                      <th className="px-6 py-4 text-center">AI Credits Allocated</th>
                      <th className="px-6 py-4">Amount</th>
                      <th className="px-6 py-4 text-right">Issue Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {aiUsageQuota.map((log) => (
                      <tr key={log.id} className="hover:bg-slate-50/30 transition-colors">
                        <td className="px-6 py-4 text-xs font-bold text-slate-400">#{log.id}</td>
                        <td className="px-6 py-4 font-bold text-sm text-[#0F2238]">{log.company}</td>
                        <td className="px-6 py-4 text-center">
                           <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-100 font-black uppercase text-[10px]">
                              <Sparkles size={10} className="mr-1.5"/> {log.creditsPurchased.toLocaleString()} Credits
                           </Badge>
                        </td>
                        <td className="px-6 py-4 text-sm font-black text-blue-600">{formatCurrency(log.amount)}</td>
                        <td className="px-6 py-4 text-right text-xs font-medium text-slate-400">{log.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Card>
            </TabsContent>
          </Tabs>
        </TabsContent>

        {/* PHẦN CANDIDATE: Premium Access (Giữ nguyên) */}
        <TabsContent value="candidate">
          <Card className="border-none shadow-sm rounded-2xl overflow-hidden bg-white text-left">
            <table className="w-full text-left">
              <thead className="bg-slate-50/50 border-b border-slate-100 text-[10px] uppercase font-black text-slate-400">
                <tr>
                  <th className="px-6 py-4 text-left">Candidate Info</th>
                  <th className="px-6 py-4 text-left">Scoring Rule</th>
                  <th className="px-6 py-4 text-center">Monthly AI Quota</th>
                  <th className="px-6 py-4">Access Fee</th>
                  <th className="px-6 py-4 text-right">Manage</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 text-left">
                {candidatePremium.map((sub) => (
                  <tr key={sub.id} className="hover:bg-slate-50/30 transition-colors">
                    <td className="px-6 py-4 text-left">
                        <p className="font-bold text-sm text-[#0F2238]">{sub.user}</p>
                        <p className="text-[10px] text-slate-400">{sub.email}</p>
                    </td>
                    <td className="px-6 py-4 text-left">
                       <p className="text-xs font-bold text-slate-600 uppercase italic leading-none">{sub.scoring} Scoring</p>
                       <p className="text-[9px] font-bold text-slate-400 mt-1 uppercase tracking-widest">ATS & Matching </p>
                    </td>
                    <td className="px-6 py-4 text-center">
                       <Badge className={cn("border-none font-black text-[10px] px-2.5 shadow-sm", sub.tier === "Premium" ? "bg-[#38B65F] text-white" : "bg-slate-100 text-slate-400")}>
                          <Zap size={10} className="mr-1 fill-white"/> {sub.aiCredits} Credits 
                       </Badge>
                    </td>
                    <td className="px-6 py-4 text-sm font-black text-[#0F2238] text-left">{formatCurrency(sub.price)}</td>
                    <td className="px-6 py-4 text-right"><Button variant="ghost" size="icon"><MoreVertical size={16}/></Button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function StatSmall({ label, value, color, icon }: { label: string, value: string, color: string, icon?: React.ReactNode }) {
    return (
        <div className="bg-white px-5 py-3 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-end min-w-[160px] group hover:border-[#38B65F]/20 transition-all">
            <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none mb-2 flex items-center gap-1.5">
              {icon} {label}
            </span>
            <span className={cn("text-xl font-black tracking-tighter leading-none", color)}>{value}</span>
        </div>
    );
}
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import {
  Search, Building2, User, Sparkles, Users, 
  MoreVertical, Zap, TrendingUp, History
} from "lucide-react";

// 1. Định nghĩa các Interface để tránh lỗi TypeScript
interface SeatSubscription {
  id: string;
  company: string;
  manager: string;
  seats: number;
  status: string;
  total: number;
  nextBilling: string; // Đã thêm để sửa lỗi ts(2339)
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

// 2. Mock Data khớp với Business Rule [cite: 296, 297, 298, 305]
const seatSubscriptions: SeatSubscription[] = [
  { id: "S-101", company: "TechCorp Inc", manager: "Sarah Jenkins", seats: 10, status: "PAID", total: 5000000, nextBilling: "Feb 15, 2026" },
  { id: "S-102", company: "StartupXYZ", manager: "Harvey Specter", seats: 5, status: "UNPAID", total: 2500000, nextBilling: "N/A" },
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
          <h1 className="text-3xl font-black text-[#0F2238] tracking-tight text-left">Subscription Audit</h1>
          <p className="text-slate-500 text-sm font-medium mt-1 uppercase tracking-widest">Revenue Streams & Resource Allocation</p>
        </div>
        <div className="flex gap-3">
            <StatSmall label="Seat Revenue" value="48.5M ₫" color="text-purple-600" />
            <StatSmall label="AI Usage Sales" value="12.2M ₫" icon={<Sparkles size={12}/>} color="text-blue-600" />
        </div>
      </div>

      <Tabs defaultValue="company" className="w-full">
        {/* Phân tách cấp 1: Company vs Candidate [cite: 4] */}
        <div className="flex flex-col lg:flex-row justify-between items-center gap-4 mb-6">
          <TabsList className="bg-slate-100/50 p-1 rounded-xl border border-slate-200">
            <TabsTrigger value="company" className="rounded-lg font-bold px-8 data-[state=active]:bg-white">
              <Building2 size={16} className="mr-2"/> Company (B2B)
            </TabsTrigger>
            <TabsTrigger value="candidate" className="rounded-lg font-bold px-8 data-[state=active]:bg-white data-[state=active]:text-blue-600">
              <User size={16} className="mr-2"/> Candidate (B2C)
            </TabsTrigger>
          </TabsList>
          <div className="relative group w-full md:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-[#38B65F]" />
            <Input placeholder="Search records..." className="pl-10 h-10 rounded-xl border-slate-200 bg-white" />
          </div>
        </div>

        {/* PHẦN COMPANY: Tách biệt Seat và AI Quota [cite: 296] */}
        <TabsContent value="company" className="space-y-6">
          <Tabs defaultValue="seats">
            <div className="flex items-center gap-2 mb-4">
               <TabsList className="bg-transparent p-0 gap-2">
                  <TabsTrigger value="seats" className="rounded-full px-4 border border-slate-200 data-[state=active]:bg-purple-600 data-[state=active]:text-white font-bold text-[10px] uppercase">1. Seat Licenses</TabsTrigger>
                  <TabsTrigger value="ai" className="rounded-full px-4 border border-slate-200 data-[state=active]:bg-blue-600 data-[state=active]:text-white font-bold text-[10px] uppercase">2. AI Usage Quota</TabsTrigger>
               </TabsList>
               <div className="h-[1px] flex-1 bg-slate-100" />
            </div>

            {/* Quản lý Seat Subscriptions  */}
            <TabsContent value="seats">
              <Card className="border-none shadow-sm rounded-2xl overflow-hidden bg-white">
                <table className="w-full text-left">
                  <thead className="bg-slate-50/50 border-b border-slate-100 text-[10px] uppercase font-black text-slate-400">
                    <tr>
                      <th className="px-6 py-4 text-left">Organization & Manager</th>
                      <th className="px-6 py-4 text-center">Active Seats</th>
                      <th className="px-6 py-4">Total Fee</th>
                      <th className="px-6 py-4">Status</th>
                      <th className="px-6 py-4 text-right">Renewal Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50 text-left">
                    {seatSubscriptions.map((sub) => (
                      <tr key={sub.id} className="hover:bg-slate-50/30 transition-colors">
                        <td className="px-6 py-4">
                           <p className="font-bold text-sm text-[#0F2238]">{sub.company}</p>
                           <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">Manager: {sub.manager}</p>
                        </td>
                        <td className="px-6 py-4 text-center">
                           <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-100 font-black uppercase text-[9px]"><Users size={10} className="mr-1"/> {sub.seats} Seats</Badge>
                        </td>
                        <td className="px-6 py-4 text-sm font-black text-[#0F2238]">{formatCurrency(sub.total)}</td>
                        <td className="px-6 py-4">
                           <Badge className={cn("text-[9px] font-black uppercase border-none", sub.status === "PAID" ? "bg-green-50 text-green-600" : "bg-orange-50 text-orange-600")}>● {sub.status}</Badge>
                        </td>
                        <td className="px-6 py-4 text-right text-xs font-medium text-slate-400">{sub.nextBilling}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Card>
            </TabsContent>

            {/* Quản lý AI Usage Quota  */}
            <TabsContent value="ai">
              <Card className="border-none shadow-sm rounded-2xl overflow-hidden bg-white text-left">
                <table className="w-full text-left">
                  <thead className="bg-slate-50/50 border-b border-slate-100 text-[10px] uppercase font-black text-slate-400">
                    <tr>
                      <th className="px-6 py-4 text-left">Order ID</th>
                      <th className="px-6 py-4 text-left">Organization</th>
                      <th className="px-6 py-4 text-center">Resource</th>
                      <th className="px-6 py-4">Amount</th>
                      <th className="px-6 py-4 text-right">Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50 text-left">
                    {aiUsageQuota.map((log) => (
                      <tr key={log.id} className="hover:bg-slate-50/30 transition-colors">
                        <td className="px-6 py-4 text-xs font-bold text-slate-400 text-left">#{log.id}</td>
                        <td className="px-6 py-4 font-bold text-sm text-[#0F2238] text-left">{log.company}</td>
                        <td className="px-6 py-4 text-center">
                           <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-100 font-black uppercase text-[10px]">
                              <Sparkles size={10} className="mr-1.5"/> {log.creditsPurchased} AI Credits
                           </Badge>
                        </td>
                        <td className="px-6 py-4 text-sm font-black text-blue-600 text-left">{formatCurrency(log.amount)}</td>
                        <td className="px-6 py-4 text-right text-xs font-medium text-slate-400">{log.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Card>
            </TabsContent>
          </Tabs>
        </TabsContent>

        {/* PHẦN CANDIDATE: Premium Access [cite: 303, 304, 305] */}
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
        <div className="bg-white px-4 py-2 rounded-xl shadow-sm border border-slate-100 flex flex-col items-end min-w-[150px]">
            <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1 flex items-center gap-1.5">{icon} {label}</span>
            <span className={cn("text-lg font-black tracking-tighter leading-none", color)}>{value}</span>
        </div>
    );
}
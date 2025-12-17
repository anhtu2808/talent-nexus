import { useState } from "react";
import { AdminLayout } from "./AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  Activity, 
  Cpu, 
  Zap,
  Clock,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  RefreshCw,
  ZapOff
} from "lucide-react";
import { cn } from "@/lib/utils";

const aiMetrics = [
  { label: "Requests Today", value: "8,492", change: "+12%", icon: Zap, color: "text-[#38B65F]", bg: "bg-[#38B65F]/10" },
  { label: "Avg Response", value: "1.2s", change: "-8%", icon: Clock, color: "text-blue-500", bg: "bg-blue-50" },
  { label: "Success Rate", value: "99.7%", change: "+0.2%", icon: CheckCircle, color: "text-green-600", bg: "bg-green-50" },
  { label: "Queue Length", value: "23", change: "-15%", icon: Activity, color: "text-amber-500", bg: "bg-amber-50" },
];

const modelStats = [
  { name: "CV Parser (NLP)", version: "v2.3.1", status: "Active", accuracy: 94, requests: "3,245", avgTime: "0.8s" },
  { name: "ATS Scorer", version: "v1.8.0", status: "Active", accuracy: 91, requests: "2,890", avgTime: "0.5s" },
  { name: "BERT Matcher", version: "v3.1.0", status: "Active", accuracy: 89, requests: "1,567", avgTime: "2.1s" },
];

const recentRequests = [
  { id: 1, type: "CV Parse", status: "Success", duration: "0.7s", time: "2 min ago" },
  { id: 2, type: "JD-CV Match", status: "Success", duration: "2.3s", time: "3 min ago" },
  { id: 3, type: "ATS Score", status: "Success", duration: "0.4s", time: "5 min ago" },
  { id: 4, type: "CV Parse", status: "Failed", duration: "-", time: "8 min ago" },
];

export default function AdminAIMonitoring() {
  return (
    <div className="space-y-6">
      {/* 1. Impactful Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
        {aiMetrics.map((metric) => (
          <StatCard key={metric.label} {...metric} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 2. Model Status List */}
        <div className="lg:col-span-2 space-y-6 text-left">
          <Card className="bg-white border-none shadow-sm rounded-2xl overflow-hidden">
            <CardHeader className="border-b border-slate-50 bg-slate-50/50 py-4 px-6 flex flex-row items-center justify-between">
              <CardTitle className="text-lg font-bold flex items-center gap-2 text-[#0F2238]">
                <Cpu className="w-5 h-5 text-[#38B65F]" /> Active AI Models
              </CardTitle>
              <Button variant="ghost" size="sm" className="text-[#38B65F] font-bold hover:bg-[#38B65F]/10 rounded-lg">
                <RefreshCw className="w-4 h-4 mr-2" /> Refresh
              </Button>
            </CardHeader>
            <CardContent className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              {modelStats.map((model) => (
                <div key={model.name} className="p-4 rounded-xl border border-slate-100 bg-slate-50/30 hover:bg-white hover:shadow-md transition-all group">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <p className="font-bold text-[#0F2238] group-hover:text-[#38B65F] transition-colors">{model.name}</p>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{model.version}</p>
                    </div>
                    <Badge className="bg-green-50 text-green-600 border-none shadow-none text-[10px] font-bold lowercase">
                      ● {model.status}
                    </Badge>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between text-xs font-bold">
                      <span className="text-slate-400">Accuracy</span>
                      <span className="text-[#0F2238]">{model.accuracy}%</span>
                    </div>
                    <Progress value={model.accuracy} className="h-1.5 bg-slate-100" />
                    <div className="flex justify-between text-[10px] font-bold text-slate-400 uppercase">
                      <span>{model.requests} reqs</span>
                      <span>Avg: {model.avgTime}</span>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Performance Trend Chart Placeholder */}
          <Card className="bg-white border-none shadow-sm rounded-2xl overflow-hidden">
             <CardHeader className="py-4 px-6 border-b border-slate-50">
                <CardTitle className="text-lg font-bold flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-[#38B65F]" /> Request Volume (24h)
                </CardTitle>
             </CardHeader>
             <CardContent className="p-12 flex flex-col items-center justify-center opacity-40">
                <Activity size={48} className="text-slate-300 mb-4" />
                <p className="text-sm font-bold text-slate-400 uppercase tracking-widest text-center">Chart visualization connected to backend</p>
             </CardContent>
          </Card>
        </div>

        {/* 3. Recent Requests Feed */}
        <Card className="bg-white border-none shadow-sm rounded-2xl overflow-hidden text-left h-fit">
          <CardHeader className="border-b border-slate-50 bg-slate-50/50 py-4 px-6">
            <CardTitle className="text-lg font-bold text-[#0F2238]">Live Requests</CardTitle>
          </CardHeader>
          <CardContent className="p-4 space-y-3">
            {recentRequests.map((req) => (
              <div key={req.id} className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100">
                <div className="flex items-center gap-3">
                  <div className={cn("p-2 rounded-lg", req.status === "Success" ? "bg-green-50" : "bg-red-50")}>
                    {req.status === "Success" ? <Zap size={14} className="text-[#38B65F]" /> : <ZapOff size={14} className="text-red-500" />}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-[#0F2238]">{req.type}</p>
                    <p className="text-[10px] font-medium text-slate-400">{req.time}</p>
                  </div>
                </div>
                <div className="text-right">
                  <Badge variant="outline" className={cn(
                    "text-[9px] font-black border-none px-1.5 py-0",
                    req.status === "Success" ? "text-green-600 bg-green-50" : "text-red-600 bg-red-50"
                  )}>
                    {req.status}
                  </Badge>
                  <p className="text-[10px] font-bold text-slate-400 mt-1">{req.duration}</p>
                </div>
              </div>
            ))}
            <Button variant="ghost" className="w-full text-xs font-bold text-slate-400 hover:text-[#38B65F] mt-2">
              View Analytics Feed
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

interface StatCardProps {
  label: string;
  value: string | number;
  change: string;
  icon: React.ElementType; // Sử dụng React.ElementType cho Lucide Icons
  color: string;
  bg: string;
}

function StatCard({ label, value, change, icon: Icon, color, bg }: StatCardProps) {
  return (
    <Card className="bg-white border-none shadow-sm rounded-2xl overflow-hidden group hover:shadow-md transition-all">
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div className={cn("p-2.5 rounded-xl transition-transform group-hover:scale-110 shadow-sm", bg, color)}>
            <Icon size={20} />
          </div>
          <span className="text-[10px] font-black bg-green-50 text-green-600 px-2 py-0.5 rounded-full">
            {change}
          </span>
        </div>
        <div>
          <p className="text-3xl font-black text-[#0F2238] tracking-tighter mb-1">{value}</p>
          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">{label}</p>
        </div>
      </CardContent>
    </Card>
  );
}
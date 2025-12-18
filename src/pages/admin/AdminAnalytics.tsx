import { AdminLayout } from "./AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  BarChart3, 
  TrendingUp,
  Users,
  Briefcase,
  FileText,
  Activity,
  Star
} from "lucide-react";
import { cn } from "@/lib/utils";

const platformMetrics = [
  { label: "Total Users", value: "12,847", change: "+12%", icon: Users, color: "text-[#0F2238]", bg: "bg-slate-50" },
  { label: "Active Jobs", value: "1,234", change: "+8%", icon: Briefcase, color: "text-[#38B65F]", bg: "bg-[#38B65F]/10" },
  { label: "CVs Uploaded", value: "45,678", change: "+23%", icon: FileText, color: "text-blue-500", bg: "bg-blue-50" },
  { label: "Applications", value: "89,234", change: "+15%", icon: Activity, color: "text-purple-500", bg: "bg-purple-50" },
];

const topRecruiters = [
  { name: "TechCorp Inc", jobs: 45, hires: 89, rating: 4.8 },
  { name: "Global Hire", jobs: 38, hires: 67, rating: 4.7 },
  { name: "StartupXYZ", jobs: 23, hires: 34, rating: 4.9 },
  { name: "CloudFirst", jobs: 19, hires: 28, rating: 4.6 },
];

const topSkills = [
  { skill: "React", demand: 89, supply: 72 },
  { skill: "Python", demand: 85, supply: 78 },
  { skill: "JavaScript", demand: 82, supply: 85 },
  { skill: "Machine Learning", demand: 78, supply: 45 },
];

export default function AdminAnalytics() {
  return (
    <div className="space-y-6 text-left">
      {/* 1. Date Range Selector - Synchronized with Filter Bar Style */}
      <div className="flex justify-end mb-6">
        <Select defaultValue="30d">
          <SelectTrigger className="w-44 border-slate-200 rounded-xl h-11 font-semibold text-slate-600 bg-white shadow-sm">
            <SelectValue placeholder="Time Range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7d">Last 7 days</SelectItem>
            <SelectItem value="30d">Last 30 days</SelectItem>
            <SelectItem value="90d">Last 90 days</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* 2. Impactful Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {platformMetrics.map((metric) => (
          <StatCard key={metric.label} {...metric} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 3. Growth Charts Placeholders */}
        <Card className="bg-white border-none shadow-sm rounded-2xl overflow-hidden">
          <CardHeader className="border-b border-slate-50 bg-slate-50/50 py-4 px-6">
            <CardTitle className="text-lg font-bold flex items-center gap-2 text-[#0F2238]">
              <TrendingUp className="w-5 h-5 text-[#38B65F]" /> User Growth
            </CardTitle>
          </CardHeader>
          <CardContent className="p-12 flex flex-col items-center justify-center opacity-40">
            <BarChart3 size={48} className="text-slate-300 mb-4" />
            <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Growth Visualization</p>
          </CardContent>
        </Card>

        <Card className="bg-white border-none shadow-sm rounded-2xl overflow-hidden">
          <CardHeader className="border-b border-slate-50 bg-slate-50/50 py-4 px-6">
            <CardTitle className="text-lg font-bold flex items-center gap-2 text-[#0F2238]">
              <Activity className="w-5 h-5 text-[#38B65F]" /> Application Volume
            </CardTitle>
          </CardHeader>
          <CardContent className="p-12 flex flex-col items-center justify-center opacity-40">
            <BarChart3 size={48} className="text-slate-300 mb-4" />
            <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Volume Analytics</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 4. Top Recruiters List */}
        <Card className="bg-white border-none shadow-sm rounded-2xl overflow-hidden">
          <CardHeader className="border-b border-slate-50 bg-slate-50/50 py-4 px-6">
            <CardTitle className="text-lg font-bold text-[#0F2238]">Top Recruiters</CardTitle>
          </CardHeader>
          <CardContent className="p-4 space-y-3">
            {topRecruiters.map((recruiter, index) => (
              <div key={recruiter.name} className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100">
                <div className="flex items-center gap-4">
                  <span className="w-8 h-8 rounded-lg bg-[#38B65F]/10 text-[#38B65F] flex items-center justify-center text-sm font-black">
                    {index + 1}
                  </span>
                  <div>
                    <p className="font-bold text-sm text-[#0F2238]">{recruiter.name}</p>
                    <p className="text-[10px] font-bold text-slate-400 uppercase">{recruiter.jobs} jobs posted</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-black text-sm text-[#0F2238]">{recruiter.hires} hires</p>
                  <div className="flex items-center gap-1 text-[#38B65F]">
                    <Star size={10} fill="currentColor" />
                    <span className="text-[10px] font-black">{recruiter.rating}</span>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* 5. Skills Demand vs Supply */}
        <Card className="bg-white border-none shadow-sm rounded-2xl overflow-hidden">
          <CardHeader className="border-b border-slate-50 bg-slate-50/50 py-4 px-6">
            <CardTitle className="text-lg font-bold text-[#0F2238]">Skills Gap Analysis</CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            {topSkills.map((item) => (
              <div key={item.skill} className="space-y-2">
                <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider">
                  <span className="text-[#0F2238]">{item.skill}</span>
                  <span className={cn(item.demand > item.supply ? "text-red-500" : "text-[#38B65F]")}>
                    {item.demand > item.supply ? "High Gap" : "Balanced"}
                  </span>
                </div>
                <div className="space-y-1.5">
                  <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-[#38B65F] transition-all" style={{ width: `${item.demand}%` }} />
                  </div>
                  <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-400 transition-all opacity-60" style={{ width: `${item.supply}%` }} />
                  </div>
                </div>
                <div className="flex justify-between text-[10px] font-black text-slate-400 uppercase">
                  <span>Demand: {item.demand}%</span>
                  <span>Supply: {item.supply}%</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

interface StatCardProps {
  label: string;
  value: string;
  change: string;
  icon: React.ElementType;
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
          <Badge className="bg-green-50 text-green-600 border-none shadow-none text-[10px] font-black uppercase tracking-tighter">
            {change}
          </Badge>
        </div>
        <div>
          <p className="text-3xl font-black text-[#0F2238] tracking-tighter mb-1">{value}</p>
          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">{label}</p>
        </div>
      </CardContent>
    </Card>
  );
}
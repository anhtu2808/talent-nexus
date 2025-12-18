import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Search, 
  AlertTriangle,
  Info,
  AlertCircle,
  CheckCircle,
  Download,
  RefreshCw,
  Activity
} from "lucide-react";
import { cn } from "@/lib/utils";

const logs = [
  { id: 1, level: "info", message: "User john@example.com logged in successfully", source: "Auth", timestamp: "2024-12-12 10:45:23" },
  { id: 2, level: "warning", message: "High API latency detected (3.2s) for JD-CV matching", source: "AI Service", timestamp: "2024-12-12 10:42:15" },
  { id: 3, level: "error", message: "Failed to parse CV: Invalid PDF format", source: "CV Parser", timestamp: "2024-12-12 10:38:07" },
  { id: 4, level: "info", message: "New job posted: Senior React Developer by TechCorp", source: "Jobs", timestamp: "2024-12-12 10:35:42" },
  { id: 5, level: "success", message: "Database backup completed successfully", source: "System", timestamp: "2024-12-12 10:30:00" },
];

const getLevelStyles = (level: string) => {
  switch (level) {
    case "info": return { icon: <Info size={16} />, color: "text-blue-500", bg: "bg-blue-50", badge: "bg-blue-100 text-blue-700" };
    case "warning": return { icon: <AlertTriangle size={16} />, color: "text-amber-500", bg: "bg-amber-50", badge: "bg-amber-100 text-amber-700" };
    case "error": return { icon: <AlertCircle size={16} />, color: "text-red-500", bg: "bg-red-50", badge: "bg-red-100 text-red-700" };
    case "success": return { icon: <CheckCircle size={16} />, color: "text-[#38B65F]", bg: "bg-green-50", badge: "bg-green-100 text-green-700" };
    default: return { icon: <Info size={16} />, color: "text-slate-500", bg: "bg-slate-50", badge: "bg-slate-100 text-slate-700" };
  }
};

export default function AdminLogs() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="space-y-6">
      {/* 1. Impactful Stat Cards - Đồng bộ style Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-left">
        <StatCard label="Info" value="1,234" color="text-blue-500" bg="bg-blue-50" icon={<Info />} />
        <StatCard label="Warnings" value="56" color="text-amber-500" bg="bg-amber-50" icon={<AlertTriangle />} />
        <StatCard label="Errors" value="12" color="text-red-500" bg="bg-red-50" icon={<AlertCircle />} />
        <StatCard label="Success" value="892" color="text-[#38B65F]" bg="bg-green-50" icon={<CheckCircle />} />
      </div>

      {/* 2. Filter Bar - Đồng bộ style User Management */}
      <Card className="bg-white border-none shadow-sm rounded-2xl overflow-hidden">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="relative flex-1 group w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-[#38B65F]" />
              <Input
                placeholder="Search logs by message..."
                className="pl-10 bg-slate-50 border-none rounded-xl h-11 focus-visible:ring-[#38B65F]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-3 w-full md:w-auto">
              <Select defaultValue="all">
                <SelectTrigger className="w-full md:w-40 border-slate-200 rounded-xl h-11 font-semibold">
                  <SelectValue placeholder="Level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Levels</SelectItem>
                  <SelectItem value="error">Error</SelectItem>
                  <SelectItem value="warning">Warning</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" className="h-11 rounded-xl border-slate-200 font-bold hover:bg-slate-50">
                <RefreshCw className="w-4 h-4 mr-2" /> Refresh
              </Button>
              <Button variant="outline" className="h-11 rounded-xl border-slate-200 font-bold hover:bg-slate-50">
                <Download className="w-4 h-4 mr-2" /> Export
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 3. Activity Logs List */}
      <Card className="bg-white border-none shadow-sm rounded-2xl overflow-hidden">
        <CardHeader className="border-b border-slate-50 bg-slate-50/50 py-4 px-6">
          <CardTitle className="text-lg font-bold flex items-center gap-2 text-[#0F2238]">
            <Activity className="w-5 h-5 text-[#38B65F]" /> Activity Logs
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-4">
          {logs.map((log) => {
            const styles = getLevelStyles(log.level);
            return (
              <div key={log.id} className="flex gap-4 p-4 rounded-xl border border-transparent hover:border-slate-100 hover:bg-slate-50/50 transition-all text-left">
                <div className={cn("p-2.5 rounded-lg h-fit shadow-sm", styles.bg, styles.color)}>
                  {styles.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-[#0F2238] mb-1">{log.message}</p>
                  <div className="flex items-center gap-4 text-[11px] font-bold uppercase tracking-wider">
                    <span className={cn("px-2 py-0.5 rounded text-[10px]", styles.badge)}>
                      {log.level}
                    </span>
                    <span className="text-slate-400">Source: <span className="text-slate-600">{log.source}</span></span>
                    <span className="text-slate-400 italic font-medium lowercase tracking-normal">{log.timestamp}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
}

interface StatCardProps {
  label: string;
  value: string;
  color: string;
  bg: string;
  icon: React.ReactNode;
}

function StatCard({ label, value, color, bg, icon }: StatCardProps) {
  return (
    <Card className="bg-white border-none shadow-sm rounded-2xl overflow-hidden group hover:shadow-md transition-all">
      <CardContent className="p-6 flex items-center gap-4">
        <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110", bg, color)}>
          {icon}
        </div>
        <div>
          <p className="text-sm font-bold text-slate-400 uppercase tracking-wider">{label}</p>
          <p className={cn("text-2xl font-black tracking-tight", color)}>{value}</p>
        </div>
      </CardContent>
    </Card>
  );
}
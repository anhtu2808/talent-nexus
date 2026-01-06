import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Search, Download, CreditCard, Receipt, 
  ArrowUpRight, Filter, Calendar, FileJson, Building2, Sparkles
} from "lucide-react";
import { cn } from "@/lib/utils";

// Dữ liệu mẫu giao dịch
const transactions = [
  { id: "TX-9021", user: "TechCorp Inc", email: "billing@techcorp.com", type: "Job Package", amount: 1500000, status: "Completed", date: "2025-12-24", method: "Stripe", service: "Premium Job Post (x5)" },
  { id: "TX-9022", user: "Nguyen Van A", email: "vana@gmail.com", type: "AI Credit", amount: 50000, status: "Completed", date: "2025-12-24", method: "Momo", service: "10 AI CV Scans" },
  { id: "TX-9023", user: "Global Hire", email: "hr@global.com", type: "Job Package", amount: 3000000, status: "Pending", date: "2025-12-23", method: "Bank Transfer", service: "Enterprise Monthly" },
  { id: "TX-9024", user: "Tran Thi B", email: "thib@gmail.com", type: "AI Credit", amount: 200000, status: "Failed", date: "2025-12-23", method: "Visa", service: "50 AI CV Scans" },
];

export default function TransactionManagement() {
  const [activeTab, setActiveTab] = useState("all");
  const navigate = useNavigate();

  const filteredTransactions = transactions.filter(tx => 
    activeTab === "all" || 
    (activeTab === "ai" && tx.type === "AI Credit") ||
    (activeTab === "jobs" && tx.type === "Job Package")
  );

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(val);
  };

  return (
    <div className="space-y-6">
      {/* 1. Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard 
          label="Total Revenue" 
          value={formatCurrency(4800000)} 
          sub="Last 30 days"
          icon={<Receipt className="w-5 h-5 text-[#38B65F]" />} 
        />
        <StatCard 
          label="AI Services" 
          value={formatCurrency(250000)} 
          sub="24 transactions"
          icon={<Sparkles className="w-5 h-5 text-blue-500" />} 
        />
        <StatCard 
          label="Job Packages" 
          value={formatCurrency(4550000)} 
          sub="12 companies"
          icon={<Building2 className="w-5 h-5 text-purple-500" />} 
        />
      </div>

      {/* 2. Filter Bar */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <Tabs defaultValue="all" className="w-full md:w-auto" onValueChange={setActiveTab}>
          <TabsList className="bg-white border border-slate-200 p-1 rounded-xl shadow-sm">
            <TabsTrigger value="all" className="rounded-lg px-5 font-bold data-[state=active]:bg-[#38B65F] data-[state=active]:text-white">All History</TabsTrigger>
            <TabsTrigger value="ai" className="rounded-lg px-5 font-bold data-[state=active]:bg-blue-500 data-[state=active]:text-white">AI Credits</TabsTrigger>
            <TabsTrigger value="jobs" className="rounded-lg px-5 font-bold data-[state=active]:bg-purple-500 data-[state=active]:text-white">Job Packages</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="flex items-center gap-2 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input placeholder="Search ID, email..." className="pl-10 h-10 rounded-xl border-none bg-white shadow-sm" />
          </div>
          <Button variant="outline" className="h-10 rounded-xl bg-white border-slate-200 font-bold text-slate-600">
            <Download className="w-4 h-4 mr-2" /> Export
          </Button>
        </div>
      </div>

      {/* 3. Transactions Table */}
      <Card className="border-none shadow-sm rounded-2xl overflow-hidden bg-white">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-slate-50 bg-slate-50/50">
                  <th className="py-4 px-6 text-[11px] uppercase tracking-wider font-bold text-slate-400">Transaction</th>
                  <th className="py-4 px-6 text-[11px] uppercase tracking-wider font-bold text-slate-400">User / Company</th>
                  <th className="py-4 px-6 text-[11px] uppercase tracking-wider font-bold text-slate-400">Service</th>
                  <th className="py-4 px-6 text-[11px] uppercase tracking-wider font-bold text-slate-400">Amount</th>
                  <th className="py-4 px-6 text-[11px] uppercase tracking-wider font-bold text-slate-400">Status</th>
                  <th className="py-4 px-6 text-[11px] uppercase tracking-wider font-bold text-slate-400 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filteredTransactions.map((tx) => (
                  <tr key={tx.id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className={cn(
                          "w-9 h-9 rounded-lg flex items-center justify-center",
                          tx.type === "AI Credit" ? "bg-blue-50 text-blue-600" : "bg-purple-50 text-purple-600"
                        )}>
                          {tx.type === "AI Credit" ? <Sparkles className="w-4 h-4" /> : <Building2 className="w-4 h-4" />}
                        </div>
                        <div>
                          <p className="font-bold text-sm text-[#0F2238]">{tx.id}</p>
                          <p className="text-[10px] text-slate-400 flex items-center gap-1">
                            <Calendar className="w-3 h-3" /> {tx.date}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <p className="font-bold text-sm text-[#0F2238]">{tx.user}</p>
                      <p className="text-xs text-slate-400">{tx.email}</p>
                    </td>
                    <td className="py-4 px-6">
                      <Badge variant="outline" className="rounded-lg font-bold text-[10px] bg-slate-50 border-slate-100 text-slate-600">
                        {tx.service}
                      </Badge>
                    </td>
                    <td className="py-4 px-6">
                      <p className="font-black text-sm text-[#0F2238]">{formatCurrency(tx.amount)}</p>
                      <p className="text-[10px] text-slate-400 font-medium">via {tx.method}</p>
                    </td>
                    <td className="py-4 px-6">
                      <div className={cn(
                        "flex items-center gap-1.5 font-bold text-xs px-2.5 py-1 rounded-full w-fit",
                        tx.status === "Completed" ? "bg-green-50 text-green-600" : 
                        tx.status === "Pending" ? "bg-amber-50 text-amber-600" : "bg-red-50 text-red-600"
                      )}>
                        <span className={cn(
                          "w-1.5 h-1.5 rounded-full",
                          tx.status === "Completed" ? "bg-green-500" : 
                          tx.status === "Pending" ? "bg-amber-500" : "bg-red-500"
                        )} />
                        {tx.status}
                      </div>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <Button 
  variant="ghost" 
  size="sm" 
  className="font-bold text-[#38B65F]"
  onClick={() => navigate(`/admin/transactions/${tx.id}`)}
>
  Details
</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function StatCard({ label, value, sub, icon }: { label: string, value: string, sub: string, icon: React.ReactNode }) {
  return (
    <Card className="bg-white border-none shadow-sm rounded-2xl">
      <CardContent className="p-6 flex items-center gap-4">
        <div className="p-3 rounded-2xl bg-slate-50">
          {icon}
        </div>
        <div>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{label}</p>
          <p className="text-2xl font-black text-[#0F2238] leading-none my-1">{value}</p>
          <p className="text-[10px] font-medium text-[#38B65F]">{sub}</p>
        </div>
      </CardContent>
    </Card>
  );
}
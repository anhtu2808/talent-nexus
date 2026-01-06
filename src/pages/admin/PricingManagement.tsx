import { useState } from "react";
import { 
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter 
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Plus, Edit2, Trash2, Sparkles, 
  Briefcase, Bold, Italic, Underline, List, ListOrdered, 
  Image as ImageIcon, Search, User, Building2, LayoutGrid
} from "lucide-react";
import { cn } from "@/lib/utils";

// 1. Định nghĩa kiểu dữ liệu để tránh lỗi "Unexpected any"
interface PricingPlan {
  id: number;
  name: string;
  salePrice: number;
  target: "candidate" | "recruiter";
  type: "AI Credit" | "Job Package" | "AI Scan";
  duration: number;
  status: "Active" | "Inactive";
  description?: string;
}

const initialPlans: PricingPlan[] = [
  { id: 1, name: "Student AI Booster", salePrice: 199000, target: "candidate", type: "AI Credit", duration: 90, status: "Active" },
  { id: 2, name: "Enterprise Hiring Pro", salePrice: 1359000, target: "recruiter", type: "Job Package", duration: 270, status: "Active" },
  { id: 3, name: "Quick Scan Pack", salePrice: 25000, target: "candidate", type: "AI Scan", duration: 30, status: "Active" },
];

export default function PricingManagement() {
  const [plans, setPlans] = useState<PricingPlan[]>(initialPlans);
  const [activeTab, setActiveTab] = useState<string>("all");
  const [open, setOpen] = useState<boolean>(false);
  const [editingPlan, setEditingPlan] = useState<PricingPlan | null>(null);

  const filteredPlans = plans.filter((plan: PricingPlan) => 
    activeTab === "all" ? true : plan.target === activeTab
  );

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(val / 25000); 
  };

  const handleCreateNew = () => {
    setEditingPlan(null);
    setOpen(true);
  };

  const handleEdit = (plan: PricingPlan) => {
    setEditingPlan(plan);
    setOpen(true);
  };

  const handleDelete = (id: number) => {
    if (window.confirm("Are you sure you want to remove this pricing plan?")) {
      setPlans(plans.filter(p => p.id !== id));
    }
  };

  return (
    <div className="space-y-6 text-left animate-in fade-in duration-500">
      {/* 1. Navigation & Action Bar */}
      <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-8">
          <TabsList className="bg-slate-100/50 p-1 rounded-xl border border-slate-200">
            <TabsTrigger value="all" className="rounded-lg font-bold px-5 data-[state=active]:bg-white data-[state=active]:text-[#0F2238] gap-2">
              <LayoutGrid size={15} /> All Plans
            </TabsTrigger>
            <TabsTrigger value="candidate" className="rounded-lg font-bold px-5 data-[state=active]:bg-white data-[state=active]:text-blue-600 gap-2">
              <User size={15} /> Candidates
            </TabsTrigger>
            <TabsTrigger value="recruiter" className="rounded-lg font-bold px-5 data-[state=active]:bg-white data-[state=active]:text-purple-600 gap-2">
              <Building2 size={15} /> Recruiters
            </TabsTrigger>
          </TabsList>
          
          <div className="flex items-center gap-3 w-full lg:w-auto">
            <div className="relative group flex-1 md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-[#38B65F]" />
              <Input placeholder="Search plans..." className="pl-10 h-11 rounded-xl bg-white border-slate-200 focus-visible:ring-[#38B65F]" />
            </div>
            <Button onClick={handleCreateNew} className="bg-[#38B65F] hover:bg-[#2D914C] text-white font-bold rounded-xl px-5 gap-2 h-11 shadow-lg shadow-green-500/20">
              <Plus size={20} /> Create Plan
            </Button>
          </div>
        </div>

        {/* 2. List of Plans */}
        <TabsContent value={activeTab} className="grid grid-cols-1 gap-4 outline-none">
          {filteredPlans.map((plan: PricingPlan) => (
            <Card key={plan.id} className="border border-slate-100 shadow-sm hover:shadow-md transition-all rounded-2xl overflow-hidden group bg-white">
              <CardContent className="p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div className="flex items-center gap-5">
                  <div className={cn(
                    "w-14 h-14 rounded-2xl flex items-center justify-center transition-colors shadow-inner",
                    plan.target === "candidate" ? "bg-blue-50 text-blue-500 group-hover:bg-blue-500 group-hover:text-white" : "bg-purple-50 text-purple-500 group-hover:bg-purple-500 group-hover:text-white"
                  )}>
                    {plan.target === "candidate" ? <Sparkles size={28} /> : <Briefcase size={28} />}
                  </div>
                  <div>
                    <div className="flex items-center gap-3">
                      <h3 className="font-black text-lg text-[#0F2238]">{plan.name}</h3>
                      <Badge className={cn(
                        "border-none text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-widest",
                        plan.status === "Active" ? "bg-green-100 text-green-600" : "bg-slate-100 text-slate-400"
                      )}>● {plan.status}</Badge>
                    </div>
                    <div className="flex items-center gap-4 mt-2">
                      <div className="flex flex-col">
                        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest leading-none mb-1">Price</span>
                        <span className="text-base font-black text-[#0F2238]">{formatCurrency(plan.salePrice)}</span>
                      </div>
                      <div className="w-[1px] h-8 bg-slate-100" />
                      <div className="flex flex-col">
                        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest leading-none mb-1">Duration</span>
                        <span className="text-sm font-bold text-slate-600">{plan.duration} Days</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 w-full md:w-auto border-t md:border-t-0 pt-4 md:pt-0">
                  <Button variant="outline" onClick={() => handleEdit(plan)} className="flex-1 md:flex-none rounded-xl border-slate-200 font-bold hover:bg-slate-50 gap-2 h-10 px-5">
                    <Edit2 size={16} className="text-slate-400" /> Edit
                  </Button>
                  <Button variant="outline" onClick={() => handleDelete(plan.id)} className="h-10 w-10 p-0 rounded-xl border-slate-200 hover:bg-red-50 hover:text-red-500">
                    <Trash2 size={16} />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>

      {/* 3. Unified Form Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[650px] rounded-3xl p-0 overflow-hidden border-none shadow-2xl">
          <DialogHeader className="p-8 pb-0 bg-slate-50/50">
            <DialogTitle className="text-2xl font-black text-[#0F2238]">
              {editingPlan ? "Edit Subscription Tier" : "New Subscription Tier"}
            </DialogTitle>
          </DialogHeader>
          
          <div className="p-8 space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-sm font-bold text-slate-700">Tier Name *</Label>
                <Input defaultValue={editingPlan?.name || ""} placeholder="e.g. Premium Monthly" className="rounded-xl bg-slate-50 border-slate-100 h-11" />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-bold text-slate-700">Target Audience *</Label>
                <Select defaultValue={editingPlan?.target || "candidate"}>
                  <SelectTrigger className="h-11 rounded-xl bg-slate-50 border-slate-100">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="candidate">Candidate (AI Credits)</SelectItem>
                    <SelectItem value="recruiter">Recruiter (Job Posts)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label className="text-sm font-bold text-slate-700">Package Benefits</Label>
              <div className="rounded-xl border border-slate-200 overflow-hidden bg-white">
                <div className="flex items-center gap-1 p-2 border-b border-slate-100 bg-slate-50">
                  <ToolbarButton icon={<Bold size={14} />} />
                  <ToolbarButton icon={<Italic size={14} />} />
                  <ToolbarButton icon={<Underline size={14} />} />
                  <div className="w-[1px] h-4 bg-slate-200 mx-1" />
                  <ToolbarButton icon={<List size={14} />} />
                  <ToolbarButton icon={<ListOrdered size={14} />} />
                  <ToolbarButton icon={<ImageIcon size={14} />} />
                </div>
                <Textarea placeholder="List the benefits..." className="border-none focus-visible:ring-0 min-h-[120px] text-sm p-4 outline-none" />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label className="text-sm font-bold text-slate-700">Type</Label>
                <Select defaultValue={editingPlan?.type || "AI Credit"}>
                  <SelectTrigger className="h-11 rounded-xl bg-slate-50 border-slate-100">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="AI Credit">AI Credit</SelectItem>
                    <SelectItem value="Job Package">Job Package</SelectItem>
                    <SelectItem value="AI Scan">AI Scan</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-bold text-slate-700">Sale Price (VND) *</Label>
                <Input type="number" defaultValue={editingPlan?.salePrice || 0} className="rounded-xl h-11 font-bold text-[#38B65F]" />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-bold text-slate-700">Duration (Days)</Label>
                <Input type="number" defaultValue={editingPlan?.duration || 30} className="rounded-xl h-11" />
              </div>
            </div>
          </div>

          <DialogFooter className="p-8 pt-0 gap-3">
            <Button variant="ghost" onClick={() => setOpen(false)} className="rounded-xl font-bold text-slate-400">Cancel</Button>
            <Button className="bg-[#38B65F] hover:bg-[#2D914C] text-white font-black rounded-xl px-10 h-11">
              {editingPlan ? "Update Changes" : "Publish Plan"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function ToolbarButton({ icon }: { icon: React.ReactNode }) {
  return (
    <button className="p-2 hover:bg-white hover:shadow-sm rounded-lg transition-all text-slate-400 hover:text-[#38B65F]">
      {icon}
    </button>
  );
}
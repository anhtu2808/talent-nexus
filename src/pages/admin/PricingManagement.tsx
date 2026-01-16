import { useState } from "react";
import { 
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter 
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
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
  Search, User, Building2, LayoutGrid, Users, Zap
} from "lucide-react";
import { cn } from "@/lib/utils";

interface PricingPlan {
  id: number;
  name: string;
  salePrice: number;
  target: "candidate" | "recruiter";
  // Các trường mới theo Business Rule [cite: 33, 45]
  userSeats?: number; 
  aiCredits: number;
  isUnlimitedScoring?: boolean; // Dành riêng cho Premium Candidate 
  duration: number;
  status: "Active" | "Inactive";
  description?: string;
}

const initialPlans: PricingPlan[] = [
  { id: 1, name: "Premium Candidate", salePrice: 199000, target: "candidate", aiCredits: 100, isUnlimitedScoring: true, duration: 30, status: "Active" },
  { id: 2, name: "Enterprise Suite", salePrice: 2500000, target: "recruiter", userSeats: 5, aiCredits: 1000, duration: 30, status: "Active" },
];

export default function PricingManagement() {
  const [plans, setPlans] = useState<PricingPlan[]>(initialPlans);
  const [activeTab, setActiveTab] = useState<string>("all");
  const [open, setOpen] = useState<boolean>(false);
  const [editingPlan, setEditingPlan] = useState<PricingPlan | null>(null);

  const filteredPlans = plans.filter((plan) => 
    activeTab === "all" ? true : plan.target === activeTab
  );

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(val);
  };

  return (
    <div className="space-y-6 text-left animate-in fade-in duration-500">
      {/* 1. Header & Filter */}
      <div className="flex flex-col lg:flex-row justify-between items-center gap-4 mb-8">
        <Tabs defaultValue="all" className="w-full lg:w-auto" onValueChange={setActiveTab}>
          <TabsList className="bg-slate-100/50 p-1 rounded-xl border border-slate-200">
            <TabsTrigger value="all" className="rounded-lg font-bold px-5 data-[state=active]:bg-white shadow-none"><LayoutGrid size={15} className="mr-2"/>All</TabsTrigger>
            <TabsTrigger value="candidate" className="rounded-lg font-bold px-5 data-[state=active]:bg-white text-blue-600 shadow-none"><User size={15} className="mr-2"/>Candidates</TabsTrigger>
            <TabsTrigger value="recruiter" className="rounded-lg font-bold px-5 data-[state=active]:bg-white text-purple-600 shadow-none"><Building2 size={15} className="mr-2"/>Recruiters</TabsTrigger>
          </TabsList>
        </Tabs>
        
        <div className="flex items-center gap-3 w-full lg:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input placeholder="Search tiers..." className="pl-10 h-11 rounded-xl bg-white border-slate-200" />
          </div>
          <Button onClick={() => { setEditingPlan(null); setOpen(true); }} className="bg-[#38B65F] hover:bg-[#2D914C] text-white font-black rounded-xl h-11 px-6 shadow-lg shadow-green-500/20">
            <Plus size={20} className="mr-2" /> New Tier
          </Button>
        </div>
      </div>

      {/* 2. Grid of Plans */}
      <div className="grid grid-cols-1 gap-4">
        {filteredPlans.map((plan) => (
          <Card key={plan.id} className="border border-slate-100 shadow-sm rounded-2xl bg-white group overflow-hidden">
            <CardContent className="p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="flex items-center gap-5">
                <div className={cn(
                  "w-14 h-14 rounded-2xl flex items-center justify-center shadow-inner",
                  plan.target === "candidate" ? "bg-blue-50 text-blue-500" : "bg-purple-50 text-purple-500"
                )}>
                  {plan.target === "candidate" ? <Zap size={28} /> : <Users size={28} />}
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-black text-lg text-[#0F2238]">{plan.name}</h3>
                    <Badge className="bg-green-100 text-green-600 border-none font-bold text-[10px] uppercase tracking-widest">● {plan.status}</Badge>
                  </div>
                  
                  <div className="flex flex-wrap gap-4 items-center">
                    <div className="flex items-center gap-1.5 text-[#0F2238] font-bold text-sm">
                      {formatCurrency(plan.salePrice)} <span className="text-[10px] text-slate-400 uppercase">/ {plan.duration} Days</span>
                    </div>
                    <div className="w-[1px] h-4 bg-slate-200" />
                    {/* Tùy biến hiển thị theo Business Rule [cite: 33, 45] */}
                    {plan.target === "recruiter" && (
                       <Badge variant="secondary" className="rounded-lg font-bold gap-1.5 bg-slate-50 text-slate-600 border-slate-100">
                         <Users size={12}/> {plan.userSeats} Seats
                       </Badge>
                    )}
                    <Badge variant="secondary" className="rounded-lg font-bold gap-1.5 bg-blue-50 text-blue-600 border-blue-100">
                      <Sparkles size={12}/> {plan.aiCredits} AI Credits
                    </Badge>
                    {plan.isUnlimitedScoring && (
                      <Badge variant="secondary" className="rounded-lg font-bold gap-1.5 bg-green-50 text-green-600 border-green-100 uppercase text-[9px]">
                        Unlimited Scoring
                      </Badge>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 w-full md:w-auto border-t md:border-t-0 pt-4 md:pt-0">
                <Button variant="outline" onClick={() => { setEditingPlan(plan); setOpen(true); }} className="flex-1 md:flex-none rounded-xl border-slate-200 font-bold hover:bg-slate-50 gap-2">
                  <Edit2 size={16} className="text-slate-400" /> Edit
                </Button>
                <Button variant="outline" className="h-10 w-10 p-0 rounded-xl border-slate-200 hover:bg-red-50 hover:text-red-500">
                  <Trash2 size={16} />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* 3. Form Dialog [cite: 33, 45] */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[700px] rounded-3xl p-0 overflow-hidden border-none shadow-2xl">
          <DialogHeader className="p-8 pb-4 bg-slate-50/50">
            <DialogTitle className="text-2xl font-black text-[#0F2238]">Configure Tier Settings</DialogTitle>
          </DialogHeader>
          
          <div className="p-8 space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="font-bold text-slate-700">Tier Name</Label>
                <Input defaultValue={editingPlan?.name} placeholder="e.g. Recruiter Enterprise" className="rounded-xl h-11" />
              </div>
              <div className="space-y-2">
                <Label className="font-bold text-slate-700">Target Role</Label>
                <Select defaultValue={editingPlan?.target || "candidate"}>
                  <SelectTrigger className="h-11 rounded-xl">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="candidate">Candidate (B2C)</SelectItem>
                    <SelectItem value="recruiter">Recruiter (B2B)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="bg-slate-50/50 rounded-2xl p-6 border border-slate-100 space-y-6">
               <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400">Quota Configuration</h4>
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* Trường Seats dành cho Recruiter  */}
                  <div className="space-y-2">
                    <Label className="text-xs font-bold">User Seats</Label>
                    <Input type="number" defaultValue={editingPlan?.userSeats || 1} className="rounded-xl h-10 bg-white" />
                  </div>
                  {/* AI Credits Quota [cite: 33, 45] */}
                  <div className="space-y-2">
                    <Label className="text-xs font-bold text-blue-600">AI Credits / Month</Label>
                    <Input type="number" defaultValue={editingPlan?.aiCredits || 100} className="rounded-xl h-10 bg-white border-blue-100" />
                  </div>
                  {/* Toggle Unlimited cho Candidate  */}
                  <div className="flex flex-col gap-2 justify-center">
                    <Label className="text-xs font-bold">Unlimited Scoring</Label>
                    <div className="flex items-center gap-2">
                      <Switch checked={editingPlan?.isUnlimitedScoring} />
                      <span className="text-[10px] font-bold text-slate-400 uppercase">Enable</span>
                    </div>
                  </div>
               </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="font-bold text-slate-700">Price (VND)</Label>
                <Input type="number" defaultValue={editingPlan?.salePrice} className="rounded-xl h-11 font-black text-[#38B65F]" />
              </div>
              <div className="space-y-2">
                <Label className="font-bold text-slate-700">Cycle (Days)</Label>
                <Input type="number" defaultValue={editingPlan?.duration || 30} className="rounded-xl h-11" />
              </div>
            </div>
          </div>

          <DialogFooter className="p-8 pt-0 gap-3">
            <Button variant="ghost" onClick={() => setOpen(false)} className="font-bold text-slate-400">Cancel</Button>
            <Button className="bg-[#0F2238] text-white font-black rounded-xl px-10 h-11 shadow-lg shadow-slate-200">
              Save Configuration
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
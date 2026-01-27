import { useState, useEffect } from "react";
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
  Plus, Edit2, Trash2, Sparkles, FileText, Search, User, Building2, Users, Zap, CheckCircle2, Briefcase
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";

import { PricingPlan, RecruiterPlanType, TargetRole } from "@/types";
import { initialPlans } from "@/data/pricingPlans";


export default function PricingManagement() {
  const [plans, setPlans] = useState<PricingPlan[]>(initialPlans);
  const [open, setOpen] = useState<boolean>(false);
  const [activeMainTab, setActiveMainTab] = useState<string>("candidate");
  const [activeRecruiterTab, setActiveRecruiterTab] = useState<string>("job_post");

  const [pricePerMonth, setPricePerMonth] = useState<number>(0);
  const [months, setMonths] = useState<number>(1);
  const [totalPrice, setTotalPrice] = useState<number>(0);

  // States cho Form
  const [targetRole, setTargetRole] = useState<TargetRole>("candidate");
  const [recType, setRecType] = useState<RecruiterPlanType>("job_post");

  useEffect(() => {
    setTotalPrice(pricePerMonth * months * 1.1); // Tính cả thuế 10%
  }, [pricePerMonth, months]);

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(val);
  };

  const handleDelete = (id: number) => {
    setPlans(plans.filter(p => p.id !== id));
  };

  const getFilteredPlans = () => {
    if (activeMainTab === "candidate") {
      return plans.filter(p => p.target === "candidate");
    }
    return plans.filter(p => p.target === "recruiter" && p.recruiterPlanType === activeRecruiterTab);
  };



  return (
    <div className="space-y-6 text-left animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-black text-[#0F2238] tracking-tight text-left">Thiết lập Gói dịch vụ</h1>
          <p className="text-sm text-slate-500 font-medium text-left">Quản lý định mức tài nguyên và đơn giá theo Business Rule </p>
        </div>
        <Button onClick={() => setOpen(true)} className="bg-[#38B65F] hover:bg-[#2D914C] text-white font-black rounded-xl h-11 px-6 shadow-lg shadow-green-500/20">
          <Plus size={20} className="mr-2" /> Thêm gói mới
        </Button>
      </div>

      <Tabs value={activeMainTab} onValueChange={setActiveMainTab} className="w-full">
        <TabsList className="bg-slate-100/50 p-1 rounded-xl border border-slate-200 mb-8">
          <TabsTrigger value="candidate" className="rounded-lg font-bold px-8 data-[state=active]:bg-white data-[state=active]:text-blue-600">
            <User size={16} className="mr-2" /> Candidate (B2C)
          </TabsTrigger>
          <TabsTrigger value="recruiter" className="rounded-lg font-bold px-8 data-[state=active]:bg-white data-[state=active]:text-purple-600">
            <Building2 size={16} className="mr-2" /> Recruiter (B2B)
          </TabsTrigger>
        </TabsList>

        <TabsContent value="candidate" className="space-y-4">
          {getFilteredPlans().map((plan) => (
            <PlanCard key={plan.id} plan={plan} onDelete={() => handleDelete(plan.id)} formatCurrency={formatCurrency} />
          ))}
        </TabsContent>

        <TabsContent value="recruiter" className="space-y-6">
          <Tabs value={activeRecruiterTab} onValueChange={setActiveRecruiterTab} className="w-full">
            <div className="flex items-center gap-3 mb-6">
              <TabsList className="bg-transparent p-0 gap-2 text-left">
                <TabsTrigger value="job_post" className="rounded-full px-5 border border-slate-200 data-[state=active]:bg-purple-600 data-[state=active]:text-white font-bold text-[10px] uppercase tracking-widest">1. Job post Subscriptions</TabsTrigger>
                <TabsTrigger value="ai_quota" className="rounded-full px-5 border border-slate-200 data-[state=active]:bg-blue-600 data-[state=active]:text-white font-bold text-[10px] uppercase tracking-widest">2. AI Usage Quota</TabsTrigger>
              </TabsList>
              <div className="h-[1px] flex-1 bg-slate-100" />
            </div>

            <TabsContent value="job_post" className="space-y-4">
              {getFilteredPlans().map((plan) => (
                <PlanCard key={plan.id} plan={plan} onDelete={() => handleDelete(plan.id)} formatCurrency={formatCurrency} />
              ))}
            </TabsContent>

            <TabsContent value="ai_quota" className="space-y-4">
              {getFilteredPlans().map((plan) => (
                <PlanCard key={plan.id} plan={plan} onDelete={() => handleDelete(plan.id)} formatCurrency={formatCurrency} />
              ))}
            </TabsContent>
          </Tabs>
        </TabsContent>
      </Tabs>

      {/* CRUD DIALOG */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[750px] max-h-[90vh] rounded-3xl p-0 overflow-hidden border-none shadow-2xl flex flex-col">
          <DialogHeader className="p-8 pb-4 bg-slate-50/50 text-left shrink-0">
            <DialogTitle className="text-2xl font-black text-[#0F2238]">Thiết lập Gói dịch vụ</DialogTitle>
          </DialogHeader>

          <ScrollArea className="flex-1 overflow-y-auto">
            <div className="px-8 py-4 space-y-6 text-left">
              {/* 1. Thông tin chung (Giữ nguyên) */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label className="font-bold text-slate-700">Tên gói dịch vụ</Label>
                  <Input placeholder="VD: Premium Candidate" className="rounded-xl h-11" />
                </div>
                <div className="space-y-2">
                  <Label className="font-bold text-slate-700">Đối tượng mục tiêu</Label>
                  <Select defaultValue="candidate" onValueChange={(v: TargetRole) => setTargetRole(v)}>
                    <SelectTrigger className="h-11 rounded-xl"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="candidate">Candidate (B2C)</SelectItem>
                      <SelectItem value="recruiter">Recruiter (B2B)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                {targetRole === "recruiter" && (
                  <div className="space-y-2 animate-in slide-in-from-top-2">
                    <Label className="font-bold text-slate-700">Loại gói dịch vụ</Label>
                    <Select defaultValue="job_post" onValueChange={(v: RecruiterPlanType) => setRecType(v)}>
                      <SelectTrigger className="h-11 rounded-xl font-bold">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {/* Đổi nhãn từ Seat sang Gói đăng bài  */}
                        <SelectItem value="job_post">Gói Đăng bài & Tính năng</SelectItem>
                        <SelectItem value="ai_quota">Gói Nạp AI Credit</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label className="font-bold text-slate-700">Mô tả quyền lợi (Description)</Label>
                <Textarea placeholder="Nêu rõ các tính năng nâng cao..." className="rounded-xl min-h-[80px] bg-white border-slate-200 resize-none" />
              </div>

              {/* 2. Định mức tài nguyên (Giữ nguyên logic) */}
              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 space-y-6">
                <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400">Cấu hình định mức (Allocation)</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {targetRole === "recruiter" && recType === "job_post" ? (
                      <div className="col-span-2 py-4 px-6 bg-purple-50/50 rounded-2xl border border-purple-100">
                        <div className="flex items-center gap-3 mb-4">
                          <Briefcase className="text-purple-600" size={20} />
                          <p className="text-sm font-bold text-purple-900 uppercase tracking-tight">Cấu hình Gói đăng bài</p>
                        </div>
                        <div className="space-y-3">
                          <Label className="text-xs font-bold text-slate-600">Giới hạn số lượng tin đăng (Job Listings)</Label>
                          <Input type="number" placeholder="VD: 10 tin/gói" className="rounded-xl h-10 bg-white border-purple-100" />
                          <p className="text-[10px] text-slate-500 italic">* Hệ thống sẽ tự đóng tin khi hết hạn hoặc đủ số lượng.</p>
                        </div>
                      </div>
                    ) : recType === "ai_quota" ? (
                    <div className="space-y-2 col-span-2">
                      <Label className="text-xs font-bold text-blue-600 flex items-center gap-2">
                        <Sparkles size={14} /> Số lượng AI Credits nạp thêm
                      </Label>
                      <Input type="number" placeholder="1000" className="rounded-xl h-10 bg-white border-blue-100" />
                    </div>
                  ) : (
                    <>
                      <div className="space-y-2">
                        <Label className="text-xs font-bold flex items-center gap-2"><Briefcase size={14} /> Lượt ATS/Matching Scoring</Label>
                        <Input type="number" placeholder="3" className="rounded-xl h-10 bg-white" />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-xs font-bold text-blue-600 flex items-center gap-2"><Sparkles size={14} /> AI Credits mỗi tháng</Label>
                        <Input type="number" placeholder="100" className="rounded-xl h-10 bg-white border-blue-100" />
                      </div>
                    </>
                  )}
                </div>

                {targetRole === "candidate" && (
                  <div className="flex items-center justify-between py-4 border-t border-slate-200">
                    <div className="space-y-0.5">
                      <Label className="text-sm font-bold">Kích hoạt Unlimited Scoring</Label>
                      <p className="text-[10px] text-slate-400 uppercase font-bold tracking-tighter">Bỏ qua các giới hạn chấm điểm</p>
                    </div>
                    <Switch />
                  </div>
                )}
              </div>

              {/* 3. Phần Thiết lập Giá - CHỈ THAY ĐỔI TẠI ĐÂY */}
              {targetRole === "recruiter" && recType === "job_post" ? (
                <div className="bg-white rounded-3xl p-6 space-y-6 border border-purple-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-purple-50/50 rounded-full -mr-16 -mt-16 blur-3xl" />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
                    <div className="space-y-2">
                      <Label className="font-bold text-slate-500 text-[10px] uppercase tracking-[0.12em] leading-none ml-1">
                        Giá trọn gói (VNĐ/Gói)
                      </Label>
                      <Input 
                        type="number" 
                        placeholder="0"
                        className="rounded-2xl h-12 bg-slate-50/50 border-slate-200 font-black text-purple-600 text-lg" 
                        onChange={(e) => setPricePerMonth(Number(e.target.value))} 
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="font-bold text-slate-500 text-[10px] uppercase tracking-[0.12em] leading-none ml-1">
                        Thời hạn sử dụng (Tháng)
                      </Label>
                      <Input 
                        type="number" 
                        defaultValue={1}
                        className="rounded-2xl h-12 bg-slate-50/50 border-slate-200 font-black text-[#0F2238] text-lg" 
                        onChange={(e) => setMonths(Number(e.target.value))} 
                      />
                    </div>
                  </div>

                  <div className="pt-6 border-t border-purple-50 flex justify-between items-center relative z-10">
                    <div>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Doanh thu dự kiến</p>
                      <div className="flex items-baseline gap-2">
                        {/* Đối với gói đăng bài, chúng ta thường tính giá gói cố định cho chu kỳ  */}
                        <p className="text-3xl font-black text-purple-600 tracking-tighter">{formatCurrency(totalPrice)}</p>
                        <span className="text-[10px] font-bold text-slate-400 uppercase italic">/ trọn gói</span>
                      </div>
                    </div>
                    <Badge className="bg-purple-600 text-white border-none font-black px-4 py-1.5 rounded-xl uppercase text-[9px]">
                      Feature Subscription
                    </Badge>
                  </div>
                </div>
              ) : (
                /* GIỮ NGUYÊN FORM GIÁ CŨ CHO CÁC LOẠI GÓI KHÁC */
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="font-bold text-slate-700 text-sm">Giá bán (VNĐ)</Label>
                    <Input type="number" placeholder="0" className="rounded-xl h-11 font-black text-[#38B65F]" />
                  </div>
                  <div className="space-y-2">
                    <Label className="font-bold text-slate-700 text-sm">Chu kỳ (Tháng)</Label>
                    <Input type="number" placeholder="1" className="rounded-xl h-11" />
                    <p className="text-[10px] text-slate-400 italic leading-none">* Nhập 0 nếu gói không hết hạn</p>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>

          <DialogFooter className="p-8 pt-4 bg-slate-50/30 border-t border-slate-100 shrink-0">
            <Button variant="ghost" onClick={() => setOpen(false)} className="font-bold text-slate-400 uppercase text-[11px]">Hủy bỏ</Button>
            <Button className="bg-[#0F2238] text-white font-black rounded-xl px-10 h-11 shadow-lg">Lưu cấu hình gói</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function PlanCard({ plan, onDelete, formatCurrency }: { plan: PricingPlan, onDelete: () => void, formatCurrency: (v: number) => string }) {
  return (
    <Card className="border border-slate-100 shadow-sm rounded-2xl bg-white group hover:shadow-md transition-all">
      <CardContent className="p-6 flex flex-col md:flex-row items-center justify-between gap-6 text-left">
        <div className="flex items-center gap-5 text-left">
          <div className={cn(
            "w-14 h-14 rounded-2xl flex items-center justify-center shadow-inner",
            plan.target === "candidate" ? "bg-blue-50 text-blue-500" : plan.recruiterPlanType === "job_post" ? "bg-purple-50 text-purple-500" : "bg-amber-50 text-amber-500"
          )}>
            {plan.target === "candidate" ? <Zap size={28} /> : plan.recruiterPlanType === "job_post" ? <Briefcase size={28} /> : <Sparkles size={28} />}
          </div>
          <div className="text-left flex-1">
            <div className="flex items-center gap-3 mb-1 text-left">
              <h3 className="font-black text-lg text-[#0F2238]">{plan.name}</h3>
              <Badge variant="outline" className="text-[9px] uppercase font-black tracking-tighter bg-slate-50">
                  {plan.target === "recruiter" ? (plan.recruiterPlanType === "job_post" ? "B2B Subscription" : "B2B Usage") : "B2C Premium"}
              </Badge>
            </div>
            <p className="text-xs text-slate-400 mb-3 line-clamp-1 max-w-xl text-left">{plan.description}</p>
            <div className="flex flex-wrap gap-4 items-center text-left">
              <span className="font-black text-[#38B65F] text-sm">{formatCurrency(plan.salePrice)}</span>
              
              {/* SỬA TẠI ĐÂY: Hiển thị giới hạn tin đăng thay vì seat */}
              {plan.jobLimit && plan.jobLimit > 0 && (
                <span className="text-xs font-bold text-purple-600 flex items-center gap-1.5 bg-purple-50 px-2 py-0.5 rounded-lg">
                  <FileText size={12} /> {plan.jobLimit} Tin đăng
                </span>
              )}

              {plan.aiCredits > 0 && (
                <span className="text-xs font-bold text-blue-600 flex items-center gap-1.5 bg-blue-50 px-2 py-0.5 rounded-lg">
                  <Sparkles size={12} /> {plan.aiCredits} Credits
                </span>
              )}
              
              {plan.isUnlimitedScoring && (
                <span className="text-[10px] font-black text-green-600 uppercase flex items-center gap-1">
                  <CheckCircle2 size={12} /> Unlimited Scoring
                </span>
              )}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="rounded-xl border-slate-200 font-bold hover:bg-slate-50"><Edit2 size={14} className="mr-2" />Edit</Button>
          <Button variant="outline" size="icon" onClick={onDelete} className="rounded-xl border-slate-200 hover:bg-red-50 hover:text-red-500 text-slate-400"><Trash2 size={16} /></Button>
        </div>
      </CardContent>
    </Card>
  );
}
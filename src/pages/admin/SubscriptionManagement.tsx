import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import {
  CheckCircle2,
  Clock,
  CreditCard,
  Eye,
  Mail,
  MoreVertical,
  Plus,
  Search,
  XCircle
} from "lucide-react";
import { useState } from "react";

// Mock Data
const initialSubscriptions = [
  {
    id: "SUB-001",
    user: { name: "John Smith", email: "john@example.com", avatar: "" },
    plan: { name: "Enterprise Hiring Pro", price: 1359000, type: "recruiter" },
    status: "Active",
    startDate: "Dec 1, 2024",
    endDate: "Mar 1, 2025",
    paymentMethod: "Visa ending 4242"
  },
  {
    id: "SUB-002",
    user: { name: "Sarah Johnson", email: "sarah@example.com", avatar: "" },
    plan: { name: "Student AI Booster", price: 199000, type: "candidate" },
    status: "Active",
    startDate: "Dec 10, 2024",
    endDate: "Jan 10, 2025",
    paymentMethod: "Mastercard ending 5555"
  },
  {
    id: "SUB-003",
    user: { name: "TechCorp Inc", email: "hr@techcorp.com", avatar: "" },
    plan: { name: "Enterprise Hiring Pro", price: 1359000, type: "recruiter" },
    status: "Expired",
    startDate: "Sep 1, 2024",
    endDate: "Dec 1, 2024",
    paymentMethod: "Visa ending 1234"
  },
  {
    id: "SUB-004",
    user: { name: "David Wilson", email: "david@example.com", avatar: "" },
    plan: { name: "Quick Scan Pack", price: 25000, type: "candidate" },
    status: "Cancelled",
    startDate: "Nov 15, 2024",
    endDate: "Dec 15, 2024",
    paymentMethod: "Paypal"
  },
  {
    id: "SUB-005",
    user: { name: "Emily Chen", email: "emily@example.com", avatar: "" },
    plan: { name: "Student AI Booster", price: 199000, type: "candidate" },
    status: "Active",
    startDate: "Dec 20, 2024",
    endDate: "Mar 20, 2025",
    paymentMethod: "Visa ending 8888"
  },
];

export default function SubscriptionManagement() {
  const [subscriptions, setSubscriptions] = useState(initialSubscriptions);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [roleFilter, setRoleFilter] = useState("all");
  const [packageFilter, setPackageFilter] = useState("all");

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newSub, setNewSub] = useState({
    name: "",
    email: "",
    planName: "Student AI Booster",
    status: "Active",
    duration: 30
  });

  const handleAddSubscription = () => {
    const planType = newSub.planName.includes("Hiring") ? "recruiter" : "candidate";
    const price = newSub.planName.includes("Hiring") ? 1359000 : newSub.planName.includes("Scan") ? 25000 : 199000;

    // Calculate dates
    const start = new Date();
    const end = new Date();
    end.setDate(start.getDate() + (newSub.duration || 30));

    const formatDate = (date: Date) => date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

    const newSubscription = {
      id: `SUB-${Math.floor(Math.random() * 10000)}`,
      user: { name: newSub.name, email: newSub.email, avatar: "" },
      plan: { name: newSub.planName, price: price, type: planType },
      status: newSub.status,
      startDate: formatDate(start),
      endDate: formatDate(end),
      paymentMethod: "Manual Entry"
    };

    setSubscriptions([newSubscription, ...subscriptions]);
    setIsAddDialogOpen(false);
    setNewSub({ name: "", email: "", planName: "Student AI Booster", status: "Active", duration: 30 });
  };

  const filteredSubscriptions = subscriptions.filter(sub => {
    const matchesSearch = sub.user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sub.user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sub.id.toLowerCase().includes(searchQuery.toLowerCase());

    let matchesTab = true;
    if (activeTab === "active") matchesTab = sub.status === "Active";
    else if (activeTab === "expired") matchesTab = sub.status === "Expired" || sub.status === "Cancelled";

    const matchesRole = roleFilter === "all" || sub.plan.type === roleFilter;
    const matchesPackage = packageFilter === "all" || sub.plan.name === packageFilter;

    return matchesSearch && matchesTab && matchesRole && matchesPackage;
  });

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(val);
  };

  return (
    <div className="space-y-6">
      {/* 1. Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard
          label="Total Revenue"
          value="45.2M ₫"
          color="text-[#38B65F]"
          icon={<CreditCard className="w-5 h-5" />}
          trend="+12% this month"
        />
        <StatCard
          label="Active Subscriptions"
          value="842"
          color="text-blue-500"
          icon={<CheckCircle2 className="w-5 h-5" />}
          trend="+24 new today"
        />
        <StatCard
          label="Expiring Soon"
          value="15"
          color="text-amber-500"
          icon={<Clock className="w-5 h-5" />}
          trend="In next 7 days"
        />
        <StatCard
          label="Cancelled"
          value="12"
          color="text-red-500"
          icon={<XCircle className="w-5 h-5" />}
          trend="-2% vs last month"
        />
      </div>

      {/* 2. Controls */}
      <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
          <TabsList className="bg-slate-100/50 p-1 rounded-xl border border-slate-200">
            <TabsTrigger value="all" className="rounded-lg font-bold px-6 data-[state=active]:bg-white data-[state=active]:text-[#0F2238] data-[state=active]:shadow-sm">
              All Records
            </TabsTrigger>
            <TabsTrigger value="active" className="rounded-lg font-bold px-6 data-[state=active]:bg-white data-[state=active]:text-[#38B65F]">
              Active
            </TabsTrigger>
            <TabsTrigger value="expired" className="rounded-lg font-bold px-6 data-[state=active]:bg-white data-[state=active]:text-slate-500">
              Expired / Cancelled
            </TabsTrigger>
          </TabsList>

          <div className="flex flex-col md:flex-row items-center gap-3 w-full md:w-auto">
            <div className="relative group flex-1 md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-[#38B65F] transition-colors" />
              <Input
                placeholder="Search user, ID..."
                className="pl-10 bg-white border-slate-200 rounded-xl h-10 focus-visible:ring-[#38B65F] w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <Select value={roleFilter} onValueChange={setRoleFilter}>
              <SelectTrigger className="w-[140px] h-10 rounded-xl bg-white border-slate-200 font-medium">
                <SelectValue placeholder="All Roles" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Roles</SelectItem>
                <SelectItem value="candidate">Candidate</SelectItem>
                <SelectItem value="recruiter">Recruiter</SelectItem>
              </SelectContent>
            </Select>

            <Select value={packageFilter} onValueChange={setPackageFilter}>
              <SelectTrigger className="w-[180px] h-10 rounded-xl bg-white border-slate-200 font-medium">
                <SelectValue placeholder="All Packages" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Packages</SelectItem>
                <SelectItem value="Student AI Booster">Student AI Booster</SelectItem>
                <SelectItem value="Enterprise Hiring Pro">Enterprise Hiring Pro</SelectItem>
                <SelectItem value="Quick Scan Pack">Quick Scan Pack</SelectItem>
              </SelectContent>
            </Select>

            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-[#38B65F] hover:bg-[#2D914C] text-white font-bold rounded-xl h-10 px-4 gap-2 shadow-sm whitespace-nowrap">
                  <Plus className="w-5 h-5" /> Add Subscription
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px] rounded-3xl p-0 overflow-hidden border-none shadow-2xl">
                <DialogHeader className="p-8 pb-0 bg-slate-50/50">
                  <DialogTitle className="text-2xl font-black text-[#0F2238]">New Subscription</DialogTitle>
                </DialogHeader>

                <div className="p-8 space-y-4">
                  <div className="space-y-2">
                    <Label className="text-sm font-bold text-slate-700">User Name</Label>
                    <Input
                      placeholder="e.g. John Doe"
                      className="rounded-xl h-11"
                      value={newSub.name}
                      onChange={(e) => setNewSub({ ...newSub, name: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-bold text-slate-700">User Email</Label>
                    <Input
                      placeholder="e.g. john@example.com"
                      className="rounded-xl h-11"
                      value={newSub.email}
                      onChange={(e) => setNewSub({ ...newSub, email: e.target.value })}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-sm font-bold text-slate-700">Plan</Label>
                      <Select
                        value={newSub.planName}
                        onValueChange={(val) => setNewSub({ ...newSub, planName: val })}
                      >
                        <SelectTrigger className="h-11 rounded-xl">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Student AI Booster">Student AI Booster</SelectItem>
                          <SelectItem value="Enterprise Hiring Pro">Enterprise Hiring Pro</SelectItem>
                          <SelectItem value="Quick Scan Pack">Quick Scan Pack</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm font-bold text-slate-700">Status</Label>
                      <Select
                        value={newSub.status}
                        onValueChange={(val) => setNewSub({ ...newSub, status: val })}
                      >
                        <SelectTrigger className="h-11 rounded-xl">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Active">Active</SelectItem>
                          <SelectItem value="Expired">Expired</SelectItem>
                          <SelectItem value="Cancelled">Cancelled</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-bold text-slate-700">Duration (Days)</Label>
                    <Input
                      type="number"
                      placeholder="30"
                      className="rounded-xl h-11"
                      value={newSub.duration}
                      onChange={(e) => setNewSub({ ...newSub, duration: parseInt(e.target.value) || 0 })}
                    />
                  </div>
                </div>

                <DialogFooter className="p-8 pt-0 gap-3">
                  <Button variant="ghost" onClick={() => setIsAddDialogOpen(false)} className="rounded-xl font-bold text-slate-400">Cancel</Button>
                  <Button onClick={handleAddSubscription} className="bg-[#38B65F] hover:bg-[#2D914C] text-white font-black rounded-xl px-8 h-11">Create</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* 3. Table */}
        <Card className="bg-white border-none shadow-sm rounded-2xl overflow-hidden">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-50 bg-slate-50/50">
                    <th className="py-4 px-6 text-[11px] uppercase tracking-wider font-bold text-slate-400">Subscriber</th>
                    <th className="py-4 px-6 text-[11px] uppercase tracking-wider font-bold text-slate-400">Plan Details</th>
                    <th className="py-4 px-6 text-[11px] uppercase tracking-wider font-bold text-slate-400">Status</th>
                    <th className="py-4 px-6 text-[11px] uppercase tracking-wider font-bold text-slate-400">Duration</th>
                    <th className="py-4 px-6 text-[11px] uppercase tracking-wider font-bold text-slate-400">Amount</th>
                    <th className="py-4 px-6 text-[11px] uppercase tracking-wider font-bold text-slate-400 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {filteredSubscriptions.length > 0 ? (
                    filteredSubscriptions.map((sub) => (
                      <tr key={sub.id} className="hover:bg-slate-50/50 transition-colors group">
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-3">
                            <Avatar className="h-9 w-9 border border-slate-100">
                              <AvatarImage src={sub.user.avatar} />
                              <AvatarFallback className="text-xs font-bold bg-slate-100 text-slate-500">
                                {sub.user.name.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-bold text-sm text-[#0F2238]">{sub.user.name}</p>
                              <p className="text-xs text-slate-400">{sub.user.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex flex-col">
                            <span className="font-bold text-sm text-[#0F2238]">{sub.plan.name}</span>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge variant="outline" className={cn(
                                "text-[9px] px-2 py-0 h-4 border-none font-bold uppercase tracking-wider",
                                sub.plan.type === "candidate" ? "bg-blue-50 text-blue-600" : "bg-purple-50 text-purple-600"
                              )}>
                                {sub.plan.type}
                              </Badge>
                              <span className="text-[10px] text-slate-400">#{sub.id}</span>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <Badge className={cn(
                            "h-6 px-2.5 font-bold border-none",
                            sub.status === "Active" ? "bg-green-100 text-green-700 hover:bg-green-100" :
                              sub.status === "Expired" ? "bg-slate-100 text-slate-500 hover:bg-slate-100" :
                                "bg-red-100 text-red-600 hover:bg-red-100"
                          )}>
                            {/* Dot indicator */}
                            <span className={cn(
                              "w-1.5 h-1.5 rounded-full mr-2",
                              sub.status === "Active" ? "bg-green-500" :
                                sub.status === "Expired" ? "bg-slate-400" : "bg-red-500"
                            )} />
                            {sub.status}
                          </Badge>
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex flex-col text-xs">
                            <span className="font-medium text-slate-600">From: {sub.startDate}</span>
                            <span className="text-slate-400">To: {sub.endDate}</span>
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <div className="font-bold text-sm text-[#0F2238]">{formatCurrency(sub.plan.price)}</div>
                          <div className="text-[10px] text-slate-400 flex items-center gap-1">
                            <CreditCard size={10} /> {sub.paymentMethod}
                          </div>
                        </td>
                        <td className="py-4 px-6 text-right">
                          <SubscriptionActionDropdown />
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} className="py-12 text-center">
                        <div className="flex flex-col items-center gap-2">
                          <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center">
                            <Search className="w-6 h-6 text-slate-300" />
                          </div>
                          <p className="text-slate-500 font-medium">No subscriptions found</p>
                          <p className="text-xs text-slate-400">Try adjusting your filters or search query.</p>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </Tabs>
    </div>
  );
}

function StatCard({ label, value, color, icon, trend }: { label: string, value: string, color: string, icon: React.ReactNode, trend?: string }) {
  return (
    <Card className="bg-white border-none shadow-sm rounded-2xl overflow-hidden hover:shadow-md transition-all">
      <CardContent className="p-5">
        <div className="flex justify-between items-start mb-4">
          <div className={cn("p-2.5 rounded-xl bg-opacity-10", color.replace('text-', 'bg-'))}>
            {icon}
          </div>
          {trend && (
            <span className={cn(
              "text-[10px] font-bold px-2 py-1 rounded-full",
              trend.includes('+') ? "bg-green-50 text-green-600" :
                trend.includes('-') ? "bg-red-50 text-red-600" : "bg-slate-50 text-slate-500"
            )}>
              {trend}
            </span>
          )}
        </div>
        <div>
          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">{label}</p>
          <p className={cn("text-2xl font-black mt-1", color)}>{value}</p>
        </div>
      </CardContent>
    </Card>
  );
}

function SubscriptionActionDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full hover:bg-slate-100">
          <MoreVertical className="w-4 h-4 text-slate-400" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="rounded-xl shadow-xl w-48 border-slate-100 p-1">
        <DropdownMenuItem className="gap-2 font-semibold text-sm cursor-pointer rounded-lg">
          <Eye className="w-4 h-4 text-slate-400" /> View Details
        </DropdownMenuItem>
        <DropdownMenuItem className="gap-2 font-semibold text-sm cursor-pointer rounded-lg">
          <Mail className="w-4 h-4 text-slate-400" /> Send Invoice
        </DropdownMenuItem>
        <DropdownMenuItem className="gap-2 font-semibold text-sm cursor-pointer rounded-lg text-red-500 focus:text-red-500 focus:bg-red-50">
          <XCircle className="w-4 h-4" /> Cancel Subscription
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

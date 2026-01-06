import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  ChevronLeft, Printer, Download, CreditCard, 
  Calendar, User, Mail, ShieldCheck, Receipt,
  CheckCircle2, AlertCircle, Clock, Building2, Sparkles
} from "lucide-react";
import { cn } from "@/lib/utils";

// Mock Data khớp với danh sách giao dịch
const mockTransactions = [
  { 
    id: "TX-9021", 
    user: "TechCorp Inc", 
    email: "billing@techcorp.com", 
    type: "Job Package", 
    amount: 1500000, 
    status: "Completed", 
    date: "Dec 24, 2025 - 14:30", 
    method: "Stripe (Visa **** 4242)", 
    service: "Premium Job Post (x5)",
    tax: 150000,
    total: 1650000,
    description: "Purchase of 5 Premium Job Posting slots with 30-day validity and AI BERT Matcher enabled." 
  }
];

export default function TransactionDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Tìm kiếm giao dịch dựa trên ID
  const tx = mockTransactions.find(t => t.id === id) || mockTransactions[0];

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(val);
  };

  return (
    <div className="space-y-6 text-left animate-in fade-in duration-500">
      {/* Header Navigation */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" onClick={() => navigate(-1)} className="rounded-xl border-slate-200 bg-white">
            <ChevronLeft className="w-5 h-5" />
          </Button>
          <div>
            <h2 className="text-2xl font-extrabold text-[#0F2238] tracking-tight">Invoice Details</h2>
            <p className="text-sm text-slate-500 font-medium uppercase tracking-wider">{tx.id} • Internal Reference</p>
          </div>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="rounded-xl font-bold border-slate-200">
            <Printer className="w-4 h-4 mr-2" /> Print
          </Button>
          <Button className="rounded-xl bg-[#0F2238] font-bold px-6 text-white shadow-lg shadow-slate-200">
            <Download className="w-4 h-4 mr-2" /> Download PDF
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT COLUMN: STATUS & SUMMARY */}
        <div className="space-y-6">
          <Card className="border-none shadow-sm rounded-2xl bg-white p-8 text-center">
            <div className={cn(
              "w-20 h-20 rounded-3xl mx-auto mb-4 flex items-center justify-center border-4 border-white shadow-sm",
              tx.status === "Completed" ? "bg-green-500 text-white" : "bg-amber-500 text-white"
            )}>
              {tx.status === "Completed" ? <CheckCircle2 size={40} /> : <Clock size={40} />}
            </div>
            <h3 className="text-2xl font-black text-[#0F2238]">{formatCurrency(tx.total)}</h3>
            <p className="text-sm font-bold text-slate-400 uppercase mt-1">Transaction Total</p>
            
            <Badge className={cn(
              "mt-6 px-4 py-1.5 rounded-full border-none font-black text-[10px] uppercase tracking-widest",
              tx.status === "Completed" ? "bg-green-50 text-green-600" : "bg-amber-50 text-amber-600"
            )}>
              ● Payment {tx.status}
            </Badge>
          </Card>

          <Card className="border-none shadow-sm rounded-2xl bg-[#0F2238] text-white p-6">
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-6">Payment Method</p>
            <div className="flex items-center gap-4">
               <div className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center">
                  <CreditCard className="text-[#38B65F]" />
               </div>
               <div>
                  <p className="text-sm font-bold">{tx.method}</p>
                  <p className="text-[10px] text-slate-400 font-medium italic">Processed via Secure Gateway</p>
               </div>
            </div>
          </Card>
        </div>

        {/* RIGHT COLUMN: BILLING DETAILS */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="border-none shadow-sm rounded-2xl bg-white overflow-hidden">
            <CardHeader className="border-b border-slate-50 bg-slate-50/50 py-4 px-6 text-left">
              <CardTitle className="text-sm font-bold uppercase tracking-wider text-[#0F2238]">Billing Information</CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-10 gap-x-8">
                <InfoItem icon={<User className="w-4 h-4" />} label="Account Name" value={tx.user} />
                <InfoItem icon={<Mail className="w-4 h-4" />} label="Billing Email" value={tx.email} />
                <InfoItem icon={<Calendar className="w-4 h-4" />} label="Transaction Date" value={tx.date} />
                <InfoItem icon={<Receipt className="w-4 h-4" />} label="Service Category" value={tx.type} />
              </div>

              {/* Invoice Breakdown */}
              <div className="mt-12 pt-8 border-t border-slate-100">
                <h4 className="font-bold text-xs mb-6 uppercase tracking-widest text-slate-400">Order Summary</h4>
                <div className="space-y-4">
                   <div className="flex justify-between items-center bg-slate-50 p-4 rounded-xl">
                      <div className="flex items-center gap-3">
                         {tx.type === "AI Credit" ? <Sparkles className="text-blue-500 w-5 h-5"/> : <Building2 className="text-purple-500 w-5 h-5"/>}
                         <div>
                            <p className="text-sm font-bold text-[#0F2238]">{tx.service}</p>
                            <p className="text-[10px] text-slate-400 font-medium">Standard License Agreement</p>
                         </div>
                      </div>
                      <p className="font-bold text-sm">{formatCurrency(tx.amount)}</p>
                   </div>
                   
                   <div className="px-4 space-y-2 pt-2">
                      <div className="flex justify-between text-xs font-medium text-slate-500">
                         <span>Subtotal</span>
                         <span>{formatCurrency(tx.amount)}</span>
                      </div>
                      <div className="flex justify-between text-xs font-medium text-slate-500">
                         <span>Tax (VAT 10%)</span>
                         <span>{formatCurrency(tx.tax)}</span>
                      </div>
                      <div className="flex justify-between text-base font-black text-[#0F2238] pt-4 border-t border-slate-50">
                         <span>Amount Paid</span>
                         <span className="text-[#38B65F]">{formatCurrency(tx.total)}</span>
                      </div>
                   </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Description Card */}
          <Card className="border-none shadow-sm rounded-2xl bg-white p-6">
             <h4 className="font-bold text-xs mb-3 uppercase tracking-widest text-slate-400">Merchant Notes</h4>
             <p className="text-sm text-slate-600 leading-relaxed italic">"{tx.description}"</p>
          </Card>
        </div>
      </div>
    </div>
  );
}

function InfoItem({ icon, label, value }: { icon: React.ReactNode, label: string, value: string }) {
  return (
    <div className="flex gap-4">
      <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 shrink-0">
        {icon}
      </div>
      <div>
        <p className="text-[10px] font-black uppercase text-slate-400 tracking-wider mb-0.5">{label}</p>
        <p className="text-sm font-bold text-[#0F2238]">{value}</p>
      </div>
    </div>
  );
}
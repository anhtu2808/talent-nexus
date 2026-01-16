import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  CheckCircle2, XCircle, Building2, User, 
  Mail, Users, ShieldCheck, Clock, ExternalLink 
} from "lucide-react";

const pendingRequests = [
  { 
    id: "REQ-001", 
    companyName: "Nexus Tech", 
    managerName: "Robert Downey", 
    email: "robert@nexus.com",
    seatsRequested: 10,
    industry: "Software",
    appliedAt: "2025-12-24 10:00"
  },
  { 
    id: "REQ-002", 
    companyName: "InnoLab", 
    managerName: "Emma Watson", 
    email: "hr@innolab.io",
    seatsRequested: 3,
    industry: "Education",
    appliedAt: "2025-12-25 08:30"
  }
];

export default function RegistrationRequests() {
  return (
    <div className="space-y-6 text-left animate-in fade-in duration-500">
      <div>
        <h2 className="text-2xl font-black text-[#0F2238]">Registration Requests</h2>
        <p className="text-sm text-slate-500 font-medium">Review and approve Recruiter Manager accounts & Company profiles</p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {pendingRequests.map((req) => (
          <Card key={req.id} className="border-none shadow-sm rounded-2xl bg-white overflow-hidden group">
            <CardContent className="p-0">
              <div className="flex flex-col md:flex-row">
                {/* Thông tin công ty */}
                <div className="p-6 flex-1 border-r border-slate-50">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center text-orange-500">
                      <Building2 size={20} />
                    </div>
                    <div>
                      <h3 className="font-black text-[#0F2238]">{req.companyName}</h3>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{req.industry}</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-xs font-medium text-slate-600">
                      <Clock size={14} className="text-slate-400" /> Applied: {req.appliedAt}
                    </div>
                    <div className="flex items-center gap-2 text-xs font-black text-[#38B65F]">
                      <Users size={14} /> Requested Seats: {req.seatsRequested}
                    </div>
                  </div>
                </div>

                {/* Thông tin người đại diện */}
                <div className="p-6 flex-1 bg-slate-50/30">
                   <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-500">
                        <User size={20} />
                      </div>
                      <div>
                        <h3 className="font-bold text-sm text-[#0F2238]">{req.managerName}</h3>
                        <p className="text-xs text-slate-400 font-medium">Recruiter Manager</p>
                      </div>
                   </div>
                   <div className="flex items-center gap-2 text-xs font-bold text-slate-600">
                      <Mail size={14} className="text-slate-400" /> {req.email}
                   </div>
                </div>

                {/* Hành động */}
                <div className="p-6 flex items-center gap-3 bg-slate-50/50">
                  <Button variant="outline" className="rounded-xl border-red-100 text-red-500 font-bold hover:bg-red-50">
                    Reject
                  </Button>
                  <Button className="rounded-xl bg-[#38B65F] hover:bg-[#2D914C] font-black text-white px-6 shadow-lg shadow-green-100">
                    Approve & Active
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
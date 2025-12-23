import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/contexts/AuthContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import GlobalError from "./components/GlobalError";
import Auth from "./pages/Auth";
import ApplicationDetail from "./pages/candidate/ApplicationDetail";
import Applications from "./pages/candidate/Applications";
import CVAnalysis from "./pages/candidate/CVAnalysis";
import CandidateDashboard from "./pages/candidate/Dashboard";
import Companies from "./pages/Companies";
import CompanyDetail from "./pages/CompanyDetail";
import Index from "./pages/Index";
import JobDetail from "./pages/JobDetail";
import Jobs from "./pages/Jobs";
import NotFound from "./pages/NotFound";
import RecruiterDashboard from "./pages/recruiter/Dashboard";
import RecruiterRegister from "./pages/recruiter/Register";
import RecruiterVerification from "./pages/recruiter/Verification";
import VerifyPhone from "./pages/recruiter/VerifyPhone";
import AdminDashboard from "./pages/admin/Dashboard";
import UserManagement from "./pages/admin/UserManagement";
import { AdminLayout } from "./pages/admin/AdminLayout";
import SystemLogs from "./pages/admin/SystemLogs";
import AdminAIMonitoring from "./pages/admin/AIMonitoring";
import JobManagement from "./pages/admin/JobManagement";
import Analytics from "./pages/admin/AdminAnalytics";
import CompanyManagement from "./pages/admin/CompanyManagement";


const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <GlobalError>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/jobs" element={<Jobs />} />
              <Route path="/companies" element={<Companies />} />
              <Route path="/companies/:id" element={<CompanyDetail />} />
              <Route path="/jobs/:id" element={<JobDetail />} />
              <Route path="/candidate/dashboard" element={<CandidateDashboard />} />
              <Route path="/candidate/applications" element={<Applications />} />
              <Route path="/candidate/applications/:id" element={<ApplicationDetail />} />
              <Route path="/candidate/cv-check/:id" element={<CVAnalysis />} />
              <Route path="/recruiter/dashboard" element={<RecruiterDashboard />} />
              <Route path="/recruiter/register" element={<RecruiterRegister />} />
              <Route path="/recruiter/verify" element={<RecruiterVerification />} />
              <Route path="/recruiter/verify/phone" element={<VerifyPhone />} />
              <Route path="/admin" element={<AdminLayout />}>
                {/* Route mặc định khi vào /admin sẽ dẫn tới dashboard */}
                <Route index element={<AdminDashboard />} />
                <Route path="dashboard" element={<AdminDashboard />} />
                <Route path="users" element={<UserManagement />} />
                <Route path="jobs" element={<JobManagement />} />
                <Route path="companies" element={<CompanyManagement />} />
                <Route path="ai-monitoring" element={<AdminAIMonitoring />} />
                <Route path="logs" element={<SystemLogs />} />
                <Route path="analytics" element={<Analytics />} />
              </Route>
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </GlobalError>
  </QueryClientProvider>
);

export default App;

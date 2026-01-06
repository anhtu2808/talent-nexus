import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/contexts/AuthContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import GlobalError from "./components/GlobalError";
import CandidateLayout from "./components/layout/CandidateLayout";
import { AdminLayout } from "./pages/admin/AdminLayout";
import CompanyManagement from "./pages/admin/CompanyManagement";
import AdminDashboard from "./pages/admin/Dashboard";
import JobManagement from "./pages/admin/JobManagement";
import PricingManagement from "./pages/admin/PricingManagement";
import TransactionManagement from "./pages/admin/Transactions";
import UserManagement from "./pages/admin/UserManagement";
import Auth from "./pages/Auth";
import ApplicationDetail from "./pages/candidate/ApplicationDetail";
import Applications from "./pages/candidate/Applications";
import CVAnalysis from "./pages/candidate/CVAnalysis";
import CVManager from "./pages/candidate/CVManager";
import CandidateDashboard from "./pages/candidate/Dashboard";
import Notifications from "./pages/candidate/Notifications";
import Payment from "./pages/candidate/Payment";
import {
  JobInvitations,
  Profile,
  Settings,
  Subscriptions,
} from "./pages/candidate/PlaceholderPages";
import UpgradeAccount from "./pages/candidate/UpgradeAccount";
import Companies from "./pages/Companies";
import CompanyDetail from "./pages/CompanyDetail";
import Index from "./pages/Index";
import JobDetail from "./pages/JobDetail";
import Jobs from "./pages/Jobs";
import NotFound from "./pages/NotFound";
import RecruiterDashboard from "./pages/recruiter/Dashboard";
import RecruiterRegister from "./pages/recruiter/Register";
import TeamManagement from "./pages/recruiter/TeamManagement";
import RecruiterVerification from "./pages/recruiter/Verification";
import VerifyCompany from "./pages/recruiter/VerifyCompany";
import VerifyLicense from "./pages/recruiter/VerifyLicense";
import VerifyPhone from "./pages/recruiter/VerifyPhone";
import UserDetail from "./pages/admin/UserDetail";
import { SubscriptionProvider } from "@/contexts/SubscriptionContext";
import SubscriptionManagement from "./pages/admin/SubscriptionManagement";
import AdminJobDetail from "./pages/admin/JobDetail";
import AdminCompanyDetail from "./pages/admin/CompanyDetail";
import TransactionDetail from "./pages/admin/TransactionDetail";

const queryClient = new QueryClient();
const App = () => (
  <QueryClientProvider client={queryClient}>
    <GlobalError>
      <AuthProvider>
        <SubscriptionProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/auth" element={<Auth />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/jobs" element={<Jobs />} />
                <Route path="/companies" element={<Companies />} />
                <Route path="/companies/:id" element={<CompanyDetail />} />
                <Route path="/jobs/:id" element={<JobDetail />} />
                <Route path="/candidate/cv-check/:id" element={<CVAnalysis />} />
                <Route path="/candidate" element={<CandidateLayout />}>
                  <Route path="dashboard" element={<CandidateDashboard />} />
                  <Route path="applications" element={<Applications />} />
                  <Route path="applications/:id" element={<ApplicationDetail />} />
                  <Route path="cv-manager" element={<CVManager />} />
                  <Route path="profile" element={<Profile />} />
                  <Route path="job-invitations" element={<JobInvitations />} />
                  <Route path="subscriptions" element={<Subscriptions />} />
                  <Route path="notifications" element={<Notifications />} />
                  <Route path="settings" element={<Settings />} />
                  <Route path="upgrade" element={<UpgradeAccount />} />
                  <Route path="payment" element={<Payment />} />
                </Route>
                <Route path="/recruiter/dashboard" element={<RecruiterDashboard />} />
                <Route path="/recruiter/team" element={<TeamManagement />} />
                <Route path="/recruiter/register" element={<RecruiterRegister />} />
                <Route path="/recruiter/verify" element={<RecruiterVerification />} />
                <Route path="/recruiter/verify/phone" element={<VerifyPhone />} />
                <Route path="/recruiter/verify/company" element={<VerifyCompany />} />
                <Route path="/recruiter/verify/license" element={<VerifyLicense />} />
                <Route path="/admin" element={<AdminLayout />}>
                  {/* Route mặc định khi vào /admin sẽ dẫn tới dashboard */}
                  <Route index element={<AdminDashboard />} />
                  <Route path="dashboard" element={<AdminDashboard />} />
                  <Route path="users" element={<UserManagement />} />
                  <Route path="users/:id" element={<UserDetail />} />
                  <Route path="jobs" element={<JobManagement />} />
                  <Route path="jobs/:id" element={<AdminJobDetail />} />
                  <Route path="companies" element={<CompanyManagement />} />
                  <Route path="companies/:id" element={<AdminCompanyDetail />} />
                  <Route path="transactions" element={<TransactionManagement />} />
                  <Route path="transactions/:id" element={<TransactionDetail />} />
                  <Route path="pricing" element={<PricingManagement />} />
                  <Route path="subscriptions" element={<SubscriptionManagement />} />
                </Route>
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </SubscriptionProvider>
      </AuthProvider>
    </GlobalError>
  </QueryClientProvider>
);

export default App;

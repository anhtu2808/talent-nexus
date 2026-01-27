import { useState } from 'react';
import Header from '@/components/layout/Header';
import { DashboardSidebar } from '@/components/recruiter/DashboardSidebar';
import JobsView from '@/components/recruiter/views/JobsView';
import CVManagementView from '@/components/recruiter/views/CVManagementView';
import ReportsView from '@/components/recruiter/views/ReportsView';
import SettingsView from '@/components/recruiter/views/SettingsView';
import PlansView from '@/components/recruiter/views/PlansView';
import ProposedCVsView from '@/components/recruiter/views/ProposedCVsView';
import CompanyInfoView from '@/components/recruiter/views/CompanyInfoView';
import BillingView from '@/components/recruiter/views/BillingView';
import TalentPoolView from '@/components/recruiter/views/TalentPoolView';
import { useAuth } from '@/contexts/AuthContext';

import { Recruiter } from '@/types';

const RecruiterDashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('reports');

  // Check if user hasn't purchased a package (Role check simplified as requested)
  // Logic: All recruiters now see everything, but maybe package restriction still applies?
  // "Nếu chưa chọn gói sẽ bị navig" logic from older tasks might still apply but simply check for package.
  const isRestricted = user?.role === 'recruiter' &&
    !(user as Recruiter).hasPurchasedPackage;

  // Force active tab to billing if restricted
  if (isRestricted && activeTab !== 'billing') {
    setActiveTab('billing');
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'reports':
        return <ReportsView />;
      case 'jobs':
        return <JobsView />;
      case 'talent-pool':
        return <TalentPoolView />;
      case 'cvs':
        return <CVManagementView />;
      case 'proposed':
        return <ProposedCVsView />;
      case 'settings':
        return <SettingsView />;
      case 'plans':
        return <PlansView />;
      case 'company-info':
        return <CompanyInfoView />;
      case 'billing':
        return <BillingView />;
      default:
        return <ReportsView />;
    }
  };

  return (
    <div className="min-h-screen bg-muted/30 flex flex-col">
      <Header />

      <div className="flex flex-1 container max-w-screen-2xl p-0">
        <DashboardSidebar activeTab={activeTab} setActiveTab={setActiveTab} restricted={isRestricted} />

        <main className="flex-1 p-8 overflow-y-auto h-[calc(100vh-64px)]">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default RecruiterDashboard;

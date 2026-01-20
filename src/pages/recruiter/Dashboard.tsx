import { useState } from 'react';
import Header from '@/components/layout/Header';
import { DashboardSidebar } from '@/components/recruiter/DashboardSidebar';
import JobsView from '@/components/recruiter/views/JobsView';
import CVManagementView from '@/components/recruiter/views/CVManagementView';
import ReportsView from '@/components/recruiter/views/ReportsView';
import SettingsView from '@/components/recruiter/views/SettingsView';
import PlansView from '@/components/recruiter/views/PlansView';
import ProposedCVsView from '@/components/recruiter/views/ProposedCVsView';
import TeamManagementView from '@/components/recruiter/views/TeamManagementView';
import CompanyInfoView from '@/components/recruiter/views/CompanyInfoView';
import BillingView from '@/components/recruiter/views/BillingView';
import { useAuth } from '@/contexts/AuthContext';

const RecruiterDashboard = () => {
  const [activeTab, setActiveTab] = useState('reports');

  const renderContent = () => {
    switch (activeTab) {
      case 'reports':
        return <ReportsView />;
      case 'jobs':
        return <JobsView />;
      case 'cvs':
        return <CVManagementView />;
      case 'proposed':
        return <ProposedCVsView />;
      case 'settings':
        return <SettingsView />;
      case 'plans':
        return <PlansView />;
      case 'team':
        return <TeamManagementView />;
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
        <DashboardSidebar activeTab={activeTab} setActiveTab={setActiveTab} />

        <main className="flex-1 p-8 overflow-y-auto h-[calc(100vh-64px)]">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default RecruiterDashboard;

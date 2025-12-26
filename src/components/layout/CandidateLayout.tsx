import DashboardSidebar from '@/components/dashboard/DashboardSidebar';
import Header from '@/components/layout/Header';
import { Outlet } from 'react-router-dom';

const CandidateLayout = () => {
  return (
    <div className="min-h-screen bg-muted/30">
      <Header />
      <main className="container py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1">
            <DashboardSidebar />
          </div>
          <div className="lg:col-span-3 space-y-6">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
};

export default CandidateLayout;

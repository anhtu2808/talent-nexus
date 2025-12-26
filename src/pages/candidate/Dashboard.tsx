import DashboardCVCard from '@/components/dashboard/DashboardCVCard';
import DashboardITviecProfile from '@/components/dashboard/DashboardITviecProfile';
import DashboardProfileCard from '@/components/dashboard/DashboardProfileCard';

const CandidateDashboard = () => {
  return (
    <>
      <DashboardProfileCard />

      <h2 className="text-xl font-bold text-foreground">Your Attached CV</h2>
      <DashboardCVCard />

      <h2 className="text-xl font-bold text-foreground">ITviec Profile</h2>
      <DashboardITviecProfile />
    </>
  );
};

export default CandidateDashboard;

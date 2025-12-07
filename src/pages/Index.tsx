import CTASection from '@/components/landing/CTASection';
import FeaturedJobs from '@/components/landing/FeaturedJobs';
import FeaturesSection from '@/components/landing/FeaturesSection';
import HeroSection from '@/components/landing/HeroSection';
import TopCompanies from '@/components/landing/TopCompanies';
import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <TopCompanies />
        <FeaturedJobs />
        <FeaturesSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;

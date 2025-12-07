import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { mockJobs } from '@/data/mockData';
import { ArrowRight, Building2, MapPin, Search, Users } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

// Extended mock companies data
const mockCompanies = [
  {
    id: '1',
    name: 'TechVision Corp',
    logo: 'https://ui-avatars.com/api/?name=TV&background=0F2238&color=fff&size=100',
    location: 'Ho Chi Minh City',
    industry: 'Software Development',
    employees: '500-1000',
    description: 'Leading provider of enterprise software solutions.'
  },
  {
    id: '2',
    name: 'FinTech Solutions',
    logo: 'https://ui-avatars.com/api/?name=FS&background=38B65F&color=fff&size=100',
    location: 'Ha Noi',
    industry: 'Financial Technology',
    employees: '100-500',
    description: 'Revolutionizing banking with secure and scalable tech.'
  },
  {
    id: '3',
    name: 'AI Dynamics',
    logo: 'https://ui-avatars.com/api/?name=AI&background=6366f1&color=fff&size=100',
    location: 'Da Nang',
    industry: 'Artificial Intelligence',
    employees: '50-100',
    description: 'Building the future with advanced AI & ML models.'
  },
  {
    id: '4',
    name: 'CloudScale Inc',
    logo: 'https://ui-avatars.com/api/?name=CS&background=f59e0b&color=fff&size=100',
    location: 'Remote',
    industry: 'Cloud Infrastructure',
    employees: '200-500',
    description: 'Global leader in cloud computing and DevOps services.'
  },
  {
    id: '5',
    name: 'StartupHub',
    logo: 'https://ui-avatars.com/api/?name=SH&background=ec4899&color=fff&size=100',
    location: 'Ho Chi Minh City',
    industry: 'Internet / Product',
    employees: '50-150',
    description: 'Fast-growing startup incubator and product studio.'
  },
  {
    id: '6',
    name: 'Quality First Ltd',
    logo: 'https://ui-avatars.com/api/?name=QF&background=14b8a6&color=fff&size=100',
    location: 'Ha Noi',
    industry: 'Quality Assurance',
    employees: '1000+',
    description: 'Ensuring software excellence through automation.'
  },
  {
    id: '7',
    name: 'FPT Software',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/FPT_logo_2010.svg/2560px-FPT_logo_2010.svg.png',
    location: 'Global',
    industry: 'IT Services',
    employees: '10000+',
    description: 'Vietnam’s largest IT software & services company.'
  },
  {
    id: '8',
    name: 'Viettel Group',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Viettel_logo_2021.svg/1200px-Viettel_logo_2021.svg.png',
    location: 'Ha Noi',
    industry: 'Telecommunications',
    employees: '10000+',
    description: 'Leading telecommunications group in Vietnam.'
  }
];

const Companies = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCompanies = mockCompanies.filter(company =>
    company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    company.industry.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getOpenJobsCount = (companyName: string) => {
    return mockJobs.filter(job => job.company === companyName && job.isActive).length;
  };

  return (
    <div className="min-h-screen flex flex-col bg-muted/30">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-hero-gradient text-primary-foreground py-20 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-96 h-96 bg-accent rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-72 h-72 bg-blue-500 rounded-full blur-3xl" />
          </div>
          <div className="container relative z-10 text-center">
            <h1 className="text-3xl md:text-5xl font-bold mb-6">
              Discover Great Places to Work
            </h1>
            <p className="text-xl text-primary-foreground/80 max-w-2xl mx-auto mb-10">
              Find the perfect company culture for your next career move. Explore top employers and their open positions.
            </p>

            <div className="max-w-xl mx-auto relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Search by company name or industry..."
                className="pl-12 h-12 rounded-full bg-background/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50 focus-visible:ring-accent backdrop-blur-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </section>

        {/* Companies Grid */}
        <div className="container py-16">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-2xl font-bold">Top Employers</h2>
            <span className="text-muted-foreground">{filteredCompanies.length} companies found</span>
          </div>

          {filteredCompanies.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredCompanies.map(company => {
                const jobCount = getOpenJobsCount(company.name);
                return (
                  <div key={company.id} className="bg-card rounded-xl border border-border p-6 hover:shadow-md transition-all group flex flex-col h-full">
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-16 h-16 rounded-lg bg-muted/50 p-2 flex items-center justify-center border border-border/50">
                        <img
                          src={company.logo}
                          alt={company.name}
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-accent/10 text-accent">
                        {jobCount} Open Jobs
                      </span>
                    </div>

                    <h3 className="text-lg font-bold mb-1 group-hover:text-accent transition-colors">{company.name}</h3>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                      <MapPin className="h-4 w-4" />
                      <span>{company.location}</span>
                    </div>

                    <p className="text-sm text-muted-foreground mb-6 line-clamp-2 flex-1">
                      {company.description}
                    </p>

                    <div className="pt-4 border-t border-border flex items-center justify-between text-sm">
                      <div className="flex items-center gap-1.5 text-muted-foreground">
                        <Building2 className="h-4 w-4" />
                        <span>{company.industry}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-muted-foreground">
                        <Users className="h-4 w-4" />
                        <span>{company.employees}</span>
                      </div>
                    </div>

                    <Link to={`/jobs?search=${encodeURIComponent(company.name)}`}>
                      <Button className="w-full mt-4 bg-accent hover:bg-accent/90 text-white shadow-md hover:shadow-lg transition-all group-hover:translate-y-[-2px]">
                        View Jobs <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-20">
              <Building2 className="h-16 w-16 text-muted-foreground/30 mx-auto mb-4" />
              <h3 className="text-xl font-medium mb-2">No companies found</h3>
              <p className="text-muted-foreground">Try adjusting your search terms.</p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Companies;

import { Building2 } from 'lucide-react';

const employers = [
  { name: 'TechVision', logo: 'https://ui-avatars.com/api/?name=TV&background=0F2238&color=fff&size=100' },
  { name: 'FinTech Sol', logo: 'https://ui-avatars.com/api/?name=FS&background=38B65F&color=fff&size=100' },
  { name: 'AI Dynamics', logo: 'https://ui-avatars.com/api/?name=AI&background=6366f1&color=fff&size=100' },
  { name: 'CloudScale', logo: 'https://ui-avatars.com/api/?name=CS&background=f59e0b&color=fff&size=100' },
  { name: 'StartupHub', logo: 'https://ui-avatars.com/api/?name=SH&background=ec4899&color=fff&size=100' },
  { name: 'Quality First', logo: 'https://ui-avatars.com/api/?name=QF&background=14b8a6&color=fff&size=100' },
];

const TopEmployers = () => {
  return (
    <section className="py-16 bg-background">
      <div className="container">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 text-muted-foreground mb-3">
            <Building2 className="h-5 w-5" />
            <span className="text-sm font-medium uppercase tracking-wider">Trusted By</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Top Employers
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {employers.map((employer) => (
            <div
              key={employer.name}
              className="group flex flex-col items-center justify-center p-6 bg-card rounded-xl border border-border hover:border-accent/50 hover:shadow-md transition-all cursor-pointer"
            >
              <img
                src={employer.logo}
                alt={employer.name}
                className="w-16 h-16 rounded-lg mb-3 group-hover:scale-105 transition-transform"
              />
              <span className="text-sm font-medium text-foreground">{employer.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopEmployers;

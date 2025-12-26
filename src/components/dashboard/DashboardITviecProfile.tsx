import { ArrowRight } from 'lucide-react';

const DashboardITviecProfile = () => {
  return (
    <div className="bg-white rounded-xl border border-border p-6 shadow-sm">


      <div className="flex flex-col md:flex-row items-center gap-8">
        {/* Progress Section */}
        <div className="flex items-center gap-6 flex-1">
          <div className="relative h-24 w-24 flex-shrink-0">
            {/* Simple CSS donut chart using conic-gradient */}
            <div
              className="absolute inset-0 rounded-full"
              style={{
                background: 'conic-gradient(hsl(var(--primary)) 10%, #f3f4f6 10%)'
                // Light red for progress, gray for remainder
              }}
            />
            <div className="absolute inset-2 bg-white rounded-full flex items-center justify-center">
              <span className="text-xl font-bold">10%</span>
            </div>
          </div>

          <div className="max-w-xs">
            <p className="text-muted-foreground">
              Reach <span className="font-bold text-primary">70%</span> of your profile to start generating your IT professional CV.
            </p>
          </div>
        </div>

        {/* Templates Promo */}
        <div className="flex-1 w-full md:w-auto">
          <div className="border border-gray-200 rounded-lg p-4 flex items-center justify-between hover:border-primary/50 transition-colors group cursor-pointer">
            <div className="flex flex-col gap-1">
              <span className="font-medium text-foreground group-hover:text-primary transition-colors">
                Explore CV templates
              </span>
              <span className="text-xs text-muted-foreground">
                Professional templates for developers
              </span>
            </div>
            <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-primary transition-colors" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardITviecProfile;

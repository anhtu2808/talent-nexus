import { Button } from '@/components/ui/button';
import { ArrowRight, Briefcase, Upload } from 'lucide-react';
import { Link } from 'react-router-dom';

const CTASection = () => {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* For Candidates */}
          <div className="relative bg-hero-gradient rounded-2xl p-8 md:p-10 overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl" />
            <div className="relative">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-accent/20 mb-6">
                <Upload className="h-7 w-7 text-accent" />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-primary-foreground mb-4">
                For Candidates
              </h3>
              <p className="text-primary-foreground/80 mb-6">
                Upload your CV and let AI optimize it for better matches. Get personalized job recommendations and track your applications.
              </p>
              <ul className="space-y-2 mb-8 text-primary-foreground/70">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                  AI-powered CV scoring & optimization
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                  Smart job matching with top companies
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                  Real-time application tracking
                </li>
              </ul>
              <Link to="/candidate/cv-manager">
                <Button variant="hero" size="lg">
                  Upload Your CV
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>

          {/* For Employers */}
          <div className="relative bg-card rounded-2xl p-8 md:p-10 border border-border overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl" />
            <div className="relative">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-primary/10 mb-6">
                <Briefcase className="h-7 w-7 text-primary" />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                For Recruiters
              </h3>
              <p className="text-muted-foreground mb-6">
                Post jobs and find top talent using AI-powered candidate matching. Streamline your hiring process with smart analytics.
              </p>
              <ul className="space-y-2 mb-8 text-muted-foreground">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                  AI-ranked candidate shortlists
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                  Smart JD-CV matching engine
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                  Comprehensive hiring dashboard
                </li>
              </ul>
              <Link to="/auth?mode=register&role=recruiter">
                <Button variant="navy" size="lg">
                  Post a Job
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;

import { Link } from 'react-router-dom';
import { Briefcase, Facebook, Linkedin, Twitter, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent">
                <Briefcase className="h-5 w-5 text-accent-foreground" />
              </div>
              <span className="text-xl font-bold">
                Smart<span className="text-accent">Recruit</span>
              </span>
            </Link>
            <p className="text-sm text-primary-foreground/70">
              AI-powered Resume Scoring Platform connecting top talent with leading companies.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-primary-foreground/70 hover:text-accent transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-primary-foreground/70 hover:text-accent transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="text-primary-foreground/70 hover:text-accent transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-primary-foreground/70 hover:text-accent transition-colors">
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* For Candidates */}
          <div>
            <h4 className="font-semibold mb-4">For Candidates</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/jobs" className="text-sm text-primary-foreground/70 hover:text-accent transition-colors">
                  Browse Jobs
                </Link>
              </li>
              <li>
                <Link to="/cv-builder" className="text-sm text-primary-foreground/70 hover:text-accent transition-colors">
                  CV Builder
                </Link>
              </li>
              <li>
                <Link to="/career-tips" className="text-sm text-primary-foreground/70 hover:text-accent transition-colors">
                  Career Tips
                </Link>
              </li>
              <li>
                <Link to="/salary-guide" className="text-sm text-primary-foreground/70 hover:text-accent transition-colors">
                  Salary Guide
                </Link>
              </li>
            </ul>
          </div>

          {/* For Employers */}
          <div>
            <h4 className="font-semibold mb-4">For Employers</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/post-job" className="text-sm text-primary-foreground/70 hover:text-accent transition-colors">
                  Post a Job
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="text-sm text-primary-foreground/70 hover:text-accent transition-colors">
                  Pricing Plans
                </Link>
              </li>
              <li>
                <Link to="/talent-search" className="text-sm text-primary-foreground/70 hover:text-accent transition-colors">
                  Search Talent
                </Link>
              </li>
              <li>
                <Link to="/employer-branding" className="text-sm text-primary-foreground/70 hover:text-accent transition-colors">
                  Employer Branding
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-sm text-primary-foreground/70 hover:text-accent transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm text-primary-foreground/70 hover:text-accent transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-sm text-primary-foreground/70 hover:text-accent transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-sm text-primary-foreground/70 hover:text-accent transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/10 mt-8 pt-8 text-center">
          <p className="text-sm text-primary-foreground/50">
            © {new Date().getFullYear()} SmartRecruit. All rights reserved. Built with ❤️ by FPT University Students.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, MapPin, ChevronDown, Sparkles } from 'lucide-react';
import { trendingSkills, cities } from '@/data/mockData';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const HeroSection = () => {
  const [keyword, setKeyword] = useState('');
  const [selectedCity, setSelectedCity] = useState('All Cities');
  const navigate = useNavigate();

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (keyword) params.set('q', keyword);
    if (selectedCity !== 'All Cities') params.set('location', selectedCity);
    navigate(`/jobs?${params.toString()}`);
  };

  return (
    <section className="relative bg-hero-gradient overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-72 h-72 bg-accent rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-accent/50 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
      </div>

      <div className="container relative py-16 md:py-24 lg:py-32">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-accent/20 text-accent rounded-full px-4 py-1.5 text-sm font-medium mb-6 animate-fade-in">
            <Sparkles className="h-4 w-4" />
            AI-Powered Recruitment Platform
          </div>

          {/* Main Heading */}
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6 animate-slide-up">
            Find Your Dream
            <span className="block text-accent mt-2">IT Job Today</span>
          </h1>

          <p className="text-lg md:text-xl text-primary-foreground/80 mb-10 max-w-2xl mx-auto animate-slide-up" style={{ animationDelay: '0.1s' }}>
            Connect with top tech companies. Optimize your CV with AI. 
            Land your perfect role faster.
          </p>

          {/* Search Box */}
          <div className="bg-card rounded-2xl p-3 shadow-xl max-w-3xl mx-auto animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <div className="flex flex-col md:flex-row gap-3">
              {/* Location Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="w-full md:w-48 justify-between text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      <span className="truncate">{selectedCity}</span>
                    </div>
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-48">
                  {cities.map((city) => (
                    <DropdownMenuItem
                      key={city}
                      onClick={() => setSelectedCity(city)}
                      className={selectedCity === city ? 'bg-accent/10 text-accent' : ''}
                    >
                      {city}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Search Input */}
              <div className="flex-1 relative">
                <Input
                  placeholder="Enter keyword (Java, React, Python...)"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                  className="pl-4 pr-4 h-11 border-0 bg-muted/50 focus-visible:ring-accent"
                />
              </div>

              {/* Search Button */}
              <Button variant="accent" size="lg" onClick={handleSearch} className="md:w-32">
                <Search className="h-4 w-4 mr-2" />
                Search
              </Button>
            </div>
          </div>

          {/* Trending Skills */}
          <div className="mt-8 animate-slide-up" style={{ animationDelay: '0.3s' }}>
            <span className="text-primary-foreground/60 text-sm mr-3">Trending:</span>
            <div className="inline-flex flex-wrap gap-2 justify-center">
              {trendingSkills.slice(0, 8).map((skill) => (
                <button
                  key={skill}
                  onClick={() => {
                    setKeyword(skill);
                    handleSearch();
                  }}
                  className="px-3 py-1 text-sm bg-primary-foreground/10 text-primary-foreground rounded-full hover:bg-accent hover:text-accent-foreground transition-colors"
                >
                  {skill}
                </button>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 animate-slide-up" style={{ animationDelay: '0.4s' }}>
            {[
              { value: '10K+', label: 'Active Jobs' },
              { value: '5K+', label: 'Companies' },
              { value: '50K+', label: 'Candidates' },
              { value: '95%', label: 'Match Rate' }
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-accent">{stat.value}</div>
                <div className="text-sm text-primary-foreground/60">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

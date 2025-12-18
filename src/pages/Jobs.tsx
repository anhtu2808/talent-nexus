import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import JobCard from '@/components/jobs/JobCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { mockJobs, cities, jobTypes } from '@/data/mockData';
import { Search, MapPin, Filter, X, SlidersHorizontal } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const Jobs = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [keyword, setKeyword] = useState(searchParams.get('q') || '');
  const [selectedLocation, setSelectedLocation] = useState(searchParams.get('location') || 'All Cities');
  const [selectedType, setSelectedType] = useState(searchParams.get('type') || 'all');
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState('newest');

  const allSkills = useMemo(() => {
    const skills = new Set<string>();
    mockJobs.forEach(job => job.skills.forEach(skill => skills.add(skill)));
    return Array.from(skills).sort();
  }, []);

  const filteredJobs = useMemo(() => {
    let jobs = [...mockJobs];

    // Filter by keyword
    if (keyword) {
      const lowerKeyword = keyword.toLowerCase();
      jobs = jobs.filter(job =>
        job.title.toLowerCase().includes(lowerKeyword) ||
        job.company.toLowerCase().includes(lowerKeyword) ||
        job.skills.some(skill => skill.toLowerCase().includes(lowerKeyword))
      );
    }

    // Filter by location
    if (selectedLocation !== 'All Cities') {
      jobs = jobs.filter(job => job.location === selectedLocation);
    }

    // Filter by type
    if (selectedType !== 'all') {
      jobs = jobs.filter(job => job.type === selectedType);
    }

    // Filter by skills
    if (selectedSkills.length > 0) {
      jobs = jobs.filter(job =>
        selectedSkills.some(skill => job.skills.includes(skill))
      );
    }

    // Sort
    if (sortBy === 'newest') {
      jobs.sort((a, b) => b.postedAt.getTime() - a.postedAt.getTime());
    } else if (sortBy === 'applicants') {
      jobs.sort((a, b) => b.applicantCount - a.applicantCount);
    }

    return jobs;
  }, [keyword, selectedLocation, selectedType, selectedSkills, sortBy]);

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (keyword) params.set('q', keyword);
    if (selectedLocation !== 'All Cities') params.set('location', selectedLocation);
    if (selectedType !== 'all') params.set('type', selectedType);
    setSearchParams(params);
  };

  const clearFilters = () => {
    setKeyword('');
    setSelectedLocation('All Cities');
    setSelectedType('all');
    setSelectedSkills([]);
    setSearchParams({});
  };

  const hasActiveFilters = keyword || selectedLocation !== 'All Cities' || selectedType !== 'all' || selectedSkills.length > 0;

  const FilterSidebar = () => (
    <div className="space-y-6">
      {/* Location Filter */}
      <div>
        <Label className="text-sm font-medium mb-3 block">Location</Label>
        <Select value={selectedLocation} onValueChange={setSelectedLocation}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {cities.map(city => (
              <SelectItem key={city} value={city}>{city}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Job Type Filter */}
      <div>
        <Label className="text-sm font-medium mb-3 block">Job Type</Label>
        <Select value={selectedType} onValueChange={setSelectedType}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {jobTypes.map(type => (
              <SelectItem key={type.value} value={type.value}>{type.label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Skills Filter */}
      <div>
        <Label className="text-sm font-medium mb-3 block">Skills</Label>
        <div className="space-y-2 max-h-48 overflow-y-auto">
          {allSkills.map(skill => (
            <div key={skill} className="flex items-center gap-2">
              <Checkbox
                id={`skill-${skill}`}
                checked={selectedSkills.includes(skill)}
                onCheckedChange={(checked) => {
                  if (checked) {
                    setSelectedSkills([...selectedSkills, skill]);
                  } else {
                    setSelectedSkills(selectedSkills.filter(s => s !== skill));
                  }
                }}
              />
              <label htmlFor={`skill-${skill}`} className="text-sm cursor-pointer">
                {skill}
              </label>
            </div>
          ))}
        </div>
      </div>

      {hasActiveFilters && (
        <Button variant="outline" className="w-full" onClick={clearFilters}>
          <X className="h-4 w-4 mr-2" />
          Clear Filters
        </Button>
      )}
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col bg-muted/30">
      <Header />

      {/* Search Bar */}
      <div className="bg-primary py-8">
        <div className="container">
          <div className="bg-card rounded-xl p-3 shadow-lg">
            <div className="flex flex-col md:flex-row gap-3">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Job title, keyword, or company"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                  className="pl-10"
                />
              </div>
              <div className="relative md:w-48">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground z-10" />
                <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                  <SelectTrigger className="pl-10">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {cities.map(city => (
                      <SelectItem key={city} value={city}>{city}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Button variant="accent" onClick={handleSearch} className="md:w-28">
                <Search className="h-4 w-4 mr-2" />
                Search
              </Button>
            </div>
          </div>
        </div>
      </div>

      <main className="flex-1 container py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Desktop Sidebar */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="bg-card rounded-xl border border-border p-6 sticky top-24">
              <div className="flex items-center gap-2 mb-6">
                <Filter className="h-5 w-5 text-muted-foreground" />
                <h2 className="font-semibold">Filters</h2>
              </div>
              <FilterSidebar />
            </div>
          </aside>

          {/* Jobs List */}
          <div className="flex-1">
            {/* Mobile Filter & Sort */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground">{filteredJobs.length} jobs found</span>
                {hasActiveFilters && (
                  <Button variant="ghost" size="sm" onClick={clearFilters} className="text-accent">
                    Clear all
                  </Button>
                )}
              </div>
              <div className="flex items-center gap-2">
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline" size="sm" className="lg:hidden">
                      <SlidersHorizontal className="h-4 w-4 mr-2" />
                      Filters
                    </Button>
                  </SheetTrigger>
                  <SheetContent>
                    <SheetHeader>
                      <SheetTitle>Filters</SheetTitle>
                    </SheetHeader>
                    <div className="mt-6">
                      <FilterSidebar />
                    </div>
                  </SheetContent>
                </Sheet>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-36">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Newest</SelectItem>
                    <SelectItem value="applicants">Most Popular</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Jobs Grid */}
            {filteredJobs.length > 0 ? (
              <div className="space-y-4">
                {filteredJobs.map((job) => (
                  <JobCard key={job.id} job={job} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-card rounded-xl border border-border">
                <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No jobs found</h3>
                <p className="text-muted-foreground mb-4">
                  Try adjusting your search or filter criteria
                </p>
                <Button variant="outline" onClick={clearFilters}>
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Jobs;

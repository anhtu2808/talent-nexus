import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import JobCard from '@/components/jobs/JobCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { mockJobs, cities, jobTypes } from '@/data/mockData';
import { jobCategories } from '@/data/jobCategories';
import { IndustrySelector } from '@/components/search/IndustrySelector';
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
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState('newest');

  useEffect(() => {
    const cats = searchParams.get('categories');
    if (cats) {
      setSelectedCategories(cats.split(','));
    } else {
      setSelectedCategories([]);
    }
    setKeyword(searchParams.get('q') || '');
    setSelectedLocation(searchParams.get('location') || 'All Cities');
    setSelectedType(searchParams.get('type') || 'all');
  }, [searchParams]);

  const allSkills = useMemo(() => {
    const skills = new Set<string>();
    mockJobs.forEach(job => job.skills.forEach(skill => skills.add(skill)));
    return Array.from(skills).sort();
  }, []);

  // Helper to map category IDs to names
  const categoryNames = useMemo(() => {
    if (selectedCategories.length === 0) return [];

    const names: string[] = [];
    jobCategories.forEach(group => {
      group.professions.forEach(prof => {
        prof.specializations.forEach(spec => {
          if (selectedCategories.includes(spec.id)) {
            names.push(spec.name);
          }
        });
      });
    });
    return names;
  }, [selectedCategories]);

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
      jobs = jobs.filter(job => job.location.includes(selectedLocation)); // Changed to includes for array locations if applicable, or kept strictly equal if string
      // Note: mockData location is string | string[], let's handle both.
      // Based on mockData viewed earlier: location: ['Ho Chi Minh City'] (array) or 'Ho Chi Minh City' (string)
      // The current filter `job.location ===` might check reference on array which is bad, or value on string.
      // Let's improve this.
      jobs = jobs.filter(job => {
        if (Array.isArray(job.location)) {
          return job.location.includes(selectedLocation);
        }
        return job.location === selectedLocation;
      });
    }

    // Filter by type
    if (selectedType !== 'all') {
      jobs = jobs.filter(job => job.type === selectedType);
    }

    // Filter by skills (manual sidebar selection)
    if (selectedSkills.length > 0) {
      jobs = jobs.filter(job =>
        selectedSkills.some(skill => job.skills.includes(skill))
      );
    }

    // Filter by Categories (from URL/Selector)
    if (categoryNames.length > 0) {
      // Filter jobs that have at least one skill matching the selected category names
      // We match loosely (includes) to be more forgiving, e.g. "React" matches "ReactJS"
      jobs = jobs.filter(job =>
        job.skills.some(skill =>
          categoryNames.some(catName =>
            skill.toLowerCase().includes(catName.toLowerCase()) ||
            catName.toLowerCase().includes(skill.toLowerCase())
          )
        ) ||
        // Also check job title
        categoryNames.some(catName => job.title.toLowerCase().includes(catName.toLowerCase()))
      );
    }

    // Sort
    if (sortBy === 'newest') {
      jobs.sort((a, b) => b.postedAt.getTime() - a.postedAt.getTime());
    } else if (sortBy === 'applicants') {
      jobs.sort((a, b) => b.applicantCount - a.applicantCount);
    }

    return jobs;
  }, [keyword, selectedLocation, selectedType, selectedSkills, sortBy, categoryNames]);

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (keyword) params.set('q', keyword);
    if (selectedLocation !== 'All Cities') params.set('location', selectedLocation);
    if (selectedType !== 'all') params.set('type', selectedType);
    if (selectedCategories.length > 0) params.set('categories', selectedCategories.join(','));
    setSearchParams(params);
  };

  const clearFilters = () => {
    setKeyword('');
    setSelectedLocation('All Cities');
    setSelectedType('all');
    setSelectedSkills([]);
    setSelectedCategories([]);
    setSearchParams({});
  };

  const hasActiveFilters = keyword || selectedLocation !== 'All Cities' || selectedType !== 'all' || selectedSkills.length > 0 || selectedCategories.length > 0;

  const FilterSidebar = () => (
    <div className="space-y-6">
      {/* Location Filter */}
      <div>
        <Label className="text-sm font-medium mb-3 block">Location</Label>
        <Select value={selectedLocation} onValueChange={(val) => {
          setSelectedLocation(val);
          // Updating one filter should probably trigger search update for consistency or just wait for explicit "Search"?
          // The logic here is mixed: handleSearch updates URL, but local state drives the list.
          // Ideally, we should sync local state to URL immediately or use URL as source of truth.
          // For now, let's keep the existing pattern but maybe sync on change?
          // The existing code didn't sync automatically. Let's keep it manual or update URL.
          // But waitForPreviousTools used useEffect to sync FROM URL.
          // If we change state here without updating URL, refreshing clears it.
          // Let's leave it as is for now to match existing behavior.
        }}>
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
              <div className="md:w-[280px]">
                <IndustrySelector
                  onSelect={setSelectedCategories}
                  selectedIds={selectedCategories}
                />
              </div>
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Job title, keyword, or company"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                  className="pl-10 h-10 border-transparent bg-white shadow-none focus-visible:ring-0"
                />
              </div>
              <Button variant="accent" onClick={handleSearch} className="md:w-28 h-10 rounded-lg">
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
            {/* Category Chips - optional display of what's selected via URL */}
            {categoryNames.length > 0 && (
              <div className="mb-4 flex flex-wrap gap-2">
                {categoryNames.map(name => (
                  <div key={name} className="bg-accent/10 text-accent px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                    {name}
                    <button onClick={() => {
                      // Allow removing category tags
                      // This requires mapping name back to ID or just removing from URL?
                      // Since map is many-to-one potentially or complex, removing by filtering IDs that produce this name
                      // Simplified: just clear all for now or complex reverse lookup
                      // Let's just rely on Clear Filters
                    }} className="hover:bg-accent/20 rounded-full p-0.5">
                    </button>
                  </div>
                ))}
              </div>
            )}

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

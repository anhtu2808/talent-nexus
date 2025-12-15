import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import {
  Search,
  Filter,
  X,
  MapPin,
  DollarSign,
  Briefcase,
  Globe,
  CircleDot
} from 'lucide-react';
import { cities, experienceLevels, languageLevels, trendingSkills } from '@/data/mockData';
import { ApplicationStatus, PIPELINE_STAGES } from '@/types';

export interface FilterState {
  search: string;
  location: string;
  status: ApplicationStatus | 'all';
  minExperience: number;
  maxExperience: number;
  minSalary: number;
  maxSalary: number;
  skills: string[];
  language: string;
  languageLevel: string;
  matchScoreMin: number;
}

interface ApplicantFiltersProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  onClearFilters: () => void;
}

const ApplicantFilters = ({ filters, onFiltersChange, onClearFilters }: ApplicantFiltersProps) => {
  const [tempSkill, setTempSkill] = useState('');

  const updateFilter = <K extends keyof FilterState>(key: K, value: FilterState[K]) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const addSkill = (skill: string) => {
    if (skill && !filters.skills.includes(skill)) {
      updateFilter('skills', [...filters.skills, skill]);
    }
    setTempSkill('');
  };

  const removeSkill = (skill: string) => {
    updateFilter('skills', filters.skills.filter(s => s !== skill));
  };

  const hasActiveFilters = 
    filters.search ||
    filters.location !== 'All Cities' ||
    filters.status !== 'all' ||
    filters.minExperience > 0 ||
    filters.maxExperience < 10 ||
    filters.minSalary > 0 ||
    filters.maxSalary < 10000 ||
    filters.skills.length > 0 ||
    filters.language ||
    filters.matchScoreMin > 0;

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            value={filters.search}
            onChange={(e) => updateFilter('search', e.target.value)}
            placeholder="Search candidates by name, email, or skills..."
            className="pl-10"
          />
        </div>
        
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" className="gap-2">
              <Filter className="h-4 w-4" />
              Filters
              {hasActiveFilters && (
                <Badge variant="secondary" className="ml-1 h-5 w-5 p-0 flex items-center justify-center">
                  !
                </Badge>
              )}
            </Button>
          </SheetTrigger>
          <SheetContent className="w-[400px] sm:w-[540px] overflow-y-auto">
            <SheetHeader>
              <SheetTitle>Filter Candidates</SheetTitle>
              <SheetDescription>
                Narrow down your search to find the perfect candidates.
              </SheetDescription>
            </SheetHeader>

            <div className="space-y-6 mt-6">
              {/* Status Filter */}
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <CircleDot className="h-4 w-4" />
                  Status
                </Label>
                <Select
                  value={filters.status}
                  onValueChange={(value) => updateFilter('status', value as ApplicationStatus | 'all')}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    {PIPELINE_STAGES.map(stage => (
                      <SelectItem key={stage.key} value={stage.key}>{stage.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Location Filter */}
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  Location
                </Label>
                <Select
                  value={filters.location}
                  onValueChange={(value) => updateFilter('location', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select location" />
                  </SelectTrigger>
                  <SelectContent>
                    {cities.map(city => (
                      <SelectItem key={city} value={city}>{city}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Experience Filter */}
              <div className="space-y-4">
                <Label className="flex items-center gap-2">
                  <Briefcase className="h-4 w-4" />
                  Years of Experience
                </Label>
                <div className="px-2">
                  <Slider
                    value={[filters.minExperience, filters.maxExperience]}
                    onValueChange={([min, max]) => {
                      updateFilter('minExperience', min);
                      updateFilter('maxExperience', max);
                    }}
                    max={10}
                    step={1}
                  />
                  <div className="flex justify-between mt-2 text-sm text-muted-foreground">
                    <span>{filters.minExperience} years</span>
                    <span>{filters.maxExperience}+ years</span>
                  </div>
                </div>
              </div>

              {/* Salary Filter */}
              <div className="space-y-4">
                <Label className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4" />
                  Expected Salary Range (USD)
                </Label>
                <div className="px-2">
                  <Slider
                    value={[filters.minSalary, filters.maxSalary]}
                    onValueChange={([min, max]) => {
                      updateFilter('minSalary', min);
                      updateFilter('maxSalary', max);
                    }}
                    max={10000}
                    step={500}
                  />
                  <div className="flex justify-between mt-2 text-sm text-muted-foreground">
                    <span>${filters.minSalary.toLocaleString()}</span>
                    <span>${filters.maxSalary.toLocaleString()}+</span>
                  </div>
                </div>
              </div>

              {/* Match Score Filter */}
              <div className="space-y-4">
                <Label>Minimum Match Score</Label>
                <div className="px-2">
                  <Slider
                    value={[filters.matchScoreMin]}
                    onValueChange={([value]) => updateFilter('matchScoreMin', value)}
                    max={100}
                    step={5}
                  />
                  <div className="flex justify-between mt-2 text-sm text-muted-foreground">
                    <span>{filters.matchScoreMin}%</span>
                    <span>100%</span>
                  </div>
                </div>
              </div>

              {/* Skills Filter */}
              <div className="space-y-2">
                <Label>Required Skills</Label>
                <div className="flex gap-2">
                  <Input
                    value={tempSkill}
                    onChange={(e) => setTempSkill(e.target.value)}
                    placeholder="Add a skill..."
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        addSkill(tempSkill);
                      }
                    }}
                  />
                  <Button onClick={() => addSkill(tempSkill)} variant="secondary">
                    Add
                  </Button>
                </div>
                {filters.skills.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {filters.skills.map(skill => (
                      <Badge key={skill} variant="default" className="gap-1">
                        {skill}
                        <button onClick={() => removeSkill(skill)}>
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                )}
                <div className="flex flex-wrap gap-2 mt-2">
                  <span className="text-xs text-muted-foreground">Quick add:</span>
                  {trendingSkills.slice(0, 6).map(skill => (
                    <button
                      key={skill}
                      onClick={() => addSkill(skill)}
                      className="text-xs text-accent hover:underline"
                      disabled={filters.skills.includes(skill)}
                    >
                      {skill}
                    </button>
                  ))}
                </div>
              </div>

              {/* Language Filter */}
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <Globe className="h-4 w-4" />
                  Language Proficiency
                </Label>
                <div className="grid grid-cols-2 gap-2">
                  <Select
                    value={filters.language}
                    onValueChange={(value) => updateFilter('language', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="any">Any Language</SelectItem>
                      <SelectItem value="English">English</SelectItem>
                      <SelectItem value="Japanese">Japanese</SelectItem>
                      <SelectItem value="Korean">Korean</SelectItem>
                      <SelectItem value="Chinese">Chinese</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select
                    value={filters.languageLevel}
                    onValueChange={(value) => updateFilter('languageLevel', value)}
                    disabled={!filters.language || filters.language === 'any'}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="any">Any Level</SelectItem>
                      {languageLevels.map(level => (
                        <SelectItem key={level} value={level}>{level}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 pt-4 border-t">
                <Button variant="outline" onClick={onClearFilters} className="flex-1">
                  Clear All Filters
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>

        {hasActiveFilters && (
          <Button variant="ghost" size="sm" onClick={onClearFilters}>
            <X className="h-4 w-4 mr-1" />
            Clear
          </Button>
        )}
      </div>

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2">
          {filters.status !== 'all' && (
            <Badge variant="secondary" className="gap-1">
              <CircleDot className="h-3 w-3" />
              {PIPELINE_STAGES.find(s => s.key === filters.status)?.label}
              <button onClick={() => updateFilter('status', 'all')}>
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}
          {filters.location !== 'All Cities' && (
            <Badge variant="secondary" className="gap-1">
              <MapPin className="h-3 w-3" />
              {filters.location}
              <button onClick={() => updateFilter('location', 'All Cities')}>
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}
          {(filters.minExperience > 0 || filters.maxExperience < 10) && (
            <Badge variant="secondary" className="gap-1">
              <Briefcase className="h-3 w-3" />
              {filters.minExperience}-{filters.maxExperience}+ years
              <button onClick={() => { updateFilter('minExperience', 0); updateFilter('maxExperience', 10); }}>
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}
          {filters.matchScoreMin > 0 && (
            <Badge variant="secondary" className="gap-1">
              ≥{filters.matchScoreMin}% Match
              <button onClick={() => updateFilter('matchScoreMin', 0)}>
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}
          {filters.skills.map(skill => (
            <Badge key={skill} variant="secondary" className="gap-1">
              {skill}
              <button onClick={() => removeSkill(skill)}>
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
};

export default ApplicantFilters;

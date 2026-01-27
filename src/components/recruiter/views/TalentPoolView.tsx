import { useState, useMemo } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Search, MapPin, Briefcase, DollarSign, Globe, Filter, X, Bookmark, Mail, Phone, ExternalLink } from 'lucide-react';
import { mockCandidateProfiles, cities, trendingSkills } from '@/data/mockData';
import { CandidateProfile } from '@/types';
import { toast } from 'sonner';

const TalentPoolView = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedLocation, setSelectedLocation] = useState<string>('all');
    const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
    const [tempSkill, setTempSkill] = useState('');
    const [showFilters, setShowFilters] = useState(false);
    
    // Additional filters
    const [minExp, setMinExp] = useState(0);
    const [maxExp, setMaxExp] = useState(10);
    const [openToWorkOnly, setOpenToWorkOnly] = useState(false);

    const toggleSkill = (skill: string) => {
        if (selectedSkills.includes(skill)) {
            setSelectedSkills(prev => prev.filter(s => s !== skill));
        } else {
            setSelectedSkills(prev => [...prev, skill]);
        }
    };

    const addCustomSkill = () => {
        if (tempSkill && !selectedSkills.includes(tempSkill)) {
            setSelectedSkills(prev => [...prev, tempSkill]);
            setTempSkill('');
        }
    };

    const clearFilters = () => {
        setSearchQuery('');
        setSelectedLocation('all');
        setSelectedSkills([]);
        setMinExp(0);
        setMaxExp(10);
        setOpenToWorkOnly(false);
    };

    const filteredCandidates = useMemo(() => {
        return mockCandidateProfiles.filter(candidate => {
            // Search Query
            if (searchQuery) {
                const query = searchQuery.toLowerCase();
                const matchesName = candidate.name.toLowerCase().includes(query);
                const matchesEmail = candidate.email.toLowerCase().includes(query);
                const matchesSkill = candidate.skills?.some(s => s.toLowerCase().includes(query));
                if (!matchesName && !matchesEmail && !matchesSkill) return false;
            }

            // Location
            if (selectedLocation !== 'all' && candidate.location !== selectedLocation) {
                return false;
            }

            // Skills (Must match ALL selected skills)
            if (selectedSkills.length > 0) {
                const candidateSkillsLower = candidate.skills?.map(s => s.toLowerCase()) || [];
                const hasAllSkills = selectedSkills.every(skill => 
                    candidateSkillsLower.some(cs => cs.includes(skill.toLowerCase()))
                );
                if (!hasAllSkills) return false;
            }

            // Experience
            if ((candidate.yearsOfExperience || 0) < minExp || (candidate.yearsOfExperience || 0) > maxExp) {
                return false;
            }

            // Open to Work
            if (openToWorkOnly && !candidate.openToWork) {
                return false;
            }

            return true;
        });
    }, [searchQuery, selectedLocation, selectedSkills, minExp, maxExp, openToWorkOnly]);

    const handleInvite = (candidate: CandidateProfile) => {
        toast.success(`Invitation sent to ${candidate.name}`);
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-2">
                <h2 className="text-2xl font-bold tracking-tight">Talent Pool</h2>
                <p className="text-muted-foreground">
                    Search and connect with {mockCandidateProfiles.length} active candidates in our database.
                </p>
            </div>

            <div className="flex flex-col lg:flex-row gap-6">
                {/* Filters Sidebar */}
                <div className={`lg:w-1/4 space-y-6 ${showFilters ? 'block' : 'hidden lg:block'}`}>
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">Filters</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {/* Location */}
                            <div className="space-y-2">
                                <Label>Location</Label>
                                <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select location" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">All Locations</SelectItem>
                                        {cities.map(city => (
                                            <SelectItem key={city} value={city}>{city}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Skills */}
                            <div className="space-y-2">
                                <Label>Skills</Label>
                                <div className="flex gap-2 mb-2">
                                    <Input 
                                        placeholder="Add skill..." 
                                        value={tempSkill}
                                        onChange={(e) => setTempSkill(e.target.value)}
                                        onKeyDown={(e) => e.key === 'Enter' && addCustomSkill()}
                                    />
                                    <Button size="sm" variant="outline" onClick={addCustomSkill}>Add</Button>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {selectedSkills.map(skill => (
                                        <Badge key={skill} variant="secondary" className="gap-1">
                                            {skill}
                                            <X className="h-3 w-3 cursor-pointer" onClick={() => toggleSkill(skill)} />
                                        </Badge>
                                    ))}
                                </div>
                                <div className="pt-2 flex flex-wrap gap-2">
                                    {trendingSkills.slice(0, 5).map(skill => (
                                        <Badge 
                                            key={skill} 
                                            variant="outline" 
                                            className="cursor-pointer hover:bg-muted"
                                            onClick={() => toggleSkill(skill)}
                                        >
                                            + {skill}
                                        </Badge>
                                    ))}
                                </div>
                            </div>

                            {/* Experience */}
                            <div className="space-y-4">
                                <div className="flex justify-between">
                                    <Label>Experience (Years)</Label>
                                    <span className="text-xs text-muted-foreground">{minExp} - {maxExp}+ years</span>
                                </div>
                                <Slider 
                                    defaultValue={[0, 10]} 
                                    max={15} 
                                    step={1} 
                                    value={[minExp, maxExp]}
                                    onValueChange={([min, max]) => {
                                        setMinExp(min);
                                        setMaxExp(max);
                                    }}
                                />
                            </div>

                            {/* Open to Work */}
                            <div className="flex items-center space-x-2">
                                <Checkbox 
                                    id="open-work" 
                                    checked={openToWorkOnly} 
                                    onCheckedChange={(c) => setOpenToWorkOnly(!!c)} 
                                />
                                <Label htmlFor="open-work">Only "Open to Work"</Label>
                            </div>

                            <Button variant="outline" className="w-full" onClick={clearFilters}>
                                Reset Filters
                            </Button>
                        </CardContent>
                    </Card>
                </div>

                {/* Main Content */}
                <div className="flex-1 space-y-6">
                    {/* Search Bar */}
                    <div className="flex gap-4">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input 
                                placeholder="Search by name, email, or keywords..." 
                                className="pl-10 h-10"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                        <Button 
                            variant="outline" 
                            className="lg:hidden"
                            onClick={() => setShowFilters(!showFilters)}
                        >
                            <Filter className="h-4 w-4 mr-2" />
                            Filters
                        </Button>
                    </div>

                    {/* Results Count */}
                    <div className="flex justify-between items-center">
                        <p className="text-sm text-muted-foreground">
                            Found <strong>{filteredCandidates.length}</strong> candidates
                        </p>
                    </div>

                    {/* Candidate List */}
                    <div className="grid gap-4">
                        {filteredCandidates.length > 0 ? (
                            filteredCandidates.map(candidate => (
                                <Card key={candidate.id} className="hover:shadow-md transition-all">
                                    <CardContent className="p-6">
                                        <div className="flex flex-col md:flex-row gap-6">
                                            {/* Avatar & Basic Info */}
                                            <div className="flex gap-4 min-w-[250px]">
                                                <Avatar className="h-16 w-16 border">
                                                    <AvatarImage src={candidate.avatar} />
                                                    <AvatarFallback>{candidate.name.substring(0, 2)}</AvatarFallback>
                                                </Avatar>
                                                <div>
                                                    <h3 className="font-semibold text-lg hover:text-primary cursor-pointer flex items-center gap-2">
                                                        {candidate.name}
                                                        {candidate.openToWork && (
                                                            <span className="inline-block w-2 h-2 bg-green-500 rounded-full" title="Open to Work" />
                                                        )}
                                                    </h3>
                                                    <div className="flex flex-col gap-1 text-sm text-muted-foreground mt-1">
                                                        <div className="flex items-center gap-2">
                                                            <MapPin className="h-3 w-3" />
                                                            {candidate.location}
                                                        </div>
                                                        <div className="flex items-center gap-2">
                                                            <Briefcase className="h-3 w-3" />
                                                            {candidate.yearsOfExperience} years exp
                                                        </div>
                                                        <div className="flex items-center gap-2">
                                                            <DollarSign className="h-3 w-3" />
                                                            {candidate.expectedSalary}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Skills & Bio */}
                                            <div className="flex-1 space-y-3">
                                                <div className="flex flex-wrap gap-2">
                                                    {candidate.skills?.slice(0, 8).map((skill, i) => (
                                                        <Badge key={i} variant="secondary" className="font-normal text-xs">
                                                            {skill}
                                                        </Badge>
                                                    ))}
                                                    {(candidate.skills?.length || 0) > 8 && (
                                                        <Badge variant="outline" className="text-xs">
                                                            +{candidate.skills!.length - 8} more
                                                        </Badge>
                                                    )}
                                                </div>
                                                
                                                {candidate.languages && (
                                                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                                        <Globe className="h-4 w-4" />
                                                        {candidate.languages.map(l => l.language).join(', ')}
                                                    </div>
                                                )}
                                            </div>

                                            {/* Actions */}
                                            <div className="flex flex-col gap-2 justify-center min-w-[140px] border-l pl-6 border-dashed">
                                                <Button onClick={() => handleInvite(candidate)}>
                                                    Invite to Apply
                                                </Button>
                                                <Button variant="outline">
                                                    View Profile
                                                </Button>
                                                <div className="flex justify-center gap-2 mt-2">
                                                    <Button variant="ghost" size="icon" className="h-8 w-8">
                                                        <Bookmark className="h-4 w-4" />
                                                    </Button>
                                                    <Button variant="ghost" size="icon" className="h-8 w-8">
                                                        <Mail className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))
                        ) : (
                            <div className="text-center py-12 bg-muted/20 rounded-xl border border-dashed">
                                <Search className="h-10 w-10 text-muted-foreground mx-auto mb-4" />
                                <h3 className="text-lg font-medium">No candidates found</h3>
                                <p className="text-muted-foreground">Try adjusting your filters or search query.</p>
                                <Button variant="link" onClick={clearFilters} className="mt-2">Clear all filters</Button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TalentPoolView;

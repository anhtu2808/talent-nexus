
import { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Slider } from "@/components/ui/slider";
import { Progress } from "@/components/ui/progress";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { ArrowLeft, Building, MapPin, DollarSign, Briefcase, Clock, Check, ChevronsUpDown, X, Plus, User, TrendingUp } from 'lucide-react';
import Header from '@/components/layout/Header';
import { toast } from 'sonner';
import { mockJobs, cities, trendingSkills } from '@/data/mockData';
import { Job } from '@/types';
import { cn } from "@/lib/utils";

const PostJob = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const location = useLocation();
    const cloneData = location.state?.cloneData;
    const isEditing = !!id;

    const [loading, setLoading] = useState(false);

    // Form States
    const [title, setTitle] = useState('');
    const [type, setType] = useState('full-time');
    const [salary, setSalary] = useState('');
    const [locationList, setLocationList] = useState<string[]>([]);
    const [description, setDescription] = useState('');
    const [requirements, setRequirements] = useState(''); // Text area for now, split by newlines
    const [skills, setSkills] = useState<string[]>([]);

    // New Fields
    const [level, setLevel] = useState('Middle');
    const [experience, setExperience] = useState('1-3 years');
    const [workingTime, setWorkingTime] = useState('Standard Office Hours (Mon-Fri)');
    const [benefits, setBenefits] = useState<string[]>([]);

    const [weights, setWeights] = useState({
        requirements: 40,
        skills: 30,
        experience: 20,
        location: 10
    });
    const totalWeight = weights.requirements + weights.skills + weights.experience + weights.location;

    // UI States
    const [locationOpen, setLocationOpen] = useState(false);
    const [skillsOpen, setSkillsOpen] = useState(false);
    const [skillSearch, setSkillSearch] = useState("");
    const [benefitsOpen, setBenefitsOpen] = useState(false);
    const [benefitSearch, setBenefitSearch] = useState("");
    const [workingTimeOpen, setWorkingTimeOpen] = useState(false);
    const [workingTimeSearch, setWorkingTimeSearch] = useState("");

    // Mock Data Constants
    // In a real app, these might come from an API or the company's profile
    const COMPANY_ADDRESS = "123 Tech Park, Innovation Way, Silicon Valley, CA";

    const EXPERIENCE_RANGES = [
        "No experience",
        "Less than 1 year",
        "1-3 years",
        "3-5 years",
        "5-10 years",
        "More than 10 years"
    ];

    const JOB_LEVELS = [
        "Intern",
        "Fresher",
        "Junior",
        "Middle",
        "Senior",
        "Team Leader",
        "Manager",
        "Director"
    ];

    const WORKING_TIMES = [
        "Standard Office Hours (Mon-Fri)",
        "Flexible Hours",
        "Shift Work",
        "Remote",
        "Hybrid"
    ];

    const SUGGESTED_BENEFITS = [
        "Health Insurance",
        "13th Month Salary",
        "Performance Bonus",
        "Laptop Provided",
        "Remote Work",
        "Training & Development",
        "Travel Opportunities",
        "Team Building Activities",
        "Free Snacks & Drinks"
    ];

    // Load data if editing OR cloning
    useEffect(() => {
        if (isEditing && id) {
            const job = mockJobs.find(j => j.id === id);
            if (job) {
                setTitle(job.title);
                setType(job.type);
                setSalary(job.salary);
                setLocationList(job.location);
                setDescription(job.description);
                setRequirements(job.requirements.join('\n'));
                setSkills(job.skills || []);
                // Mock mapping for new fields if they existed on job object, otherwise default
                // For now, these default or stay as initialized
            } else {
                toast.error("Job not found");
                navigate('/recruiter/dashboard');
            }
        } else if (cloneData) {
            // Pre-fill from cloned job
            setTitle(`${cloneData.title} (Copy)`); // Optional: append copy
            setType(cloneData.type);
            setSalary(cloneData.salary);
            setLocationList(cloneData.location);
            setDescription(cloneData.description);
            setRequirements(cloneData.requirements.join('\n'));
            setSkills(cloneData.skills || []);
            // New fields would be copied here too if they existed on data
            toast.info("Job details cloned. Review and publish.");
        }
    }, [isEditing, id, navigate, cloneData]);

    const handleSave = () => {
        if (!title || !salary || !description || locationList.length === 0) {
            toast.error("Please fill in all required fields (Title, Location, Salary, Description)");
            return;
        }

        if (totalWeight !== 100) {
            toast.error(`AI Match Weights must total 100 %.Current: ${totalWeight}% `);
            return;
        }

        setLoading(true);

        // Simulate API call
        setTimeout(() => {
            setLoading(false);
            if (isEditing) {
                toast.success("Job updated successfully!");
            } else {
                toast.success("Job posted successfully!");
            }
            navigate('/recruiter/dashboard');
        }, 1000);
    };

    return (
        <div className="min-h-screen flex flex-col bg-muted/30">
            {/* ... existing header/main ... */}
            <Header />

            <main className="flex-1 container py-8">
                {/* ... Back button ... */}
                <button
                    type="button"
                    onClick={() => navigate(-1)}
                    className="inline-flex items-center text-muted-foreground hover:text-foreground mb-6 transition-colors bg-transparent border-none p-0 cursor-pointer"
                >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back
                </button>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content - Preview/Edit Area */}
                    <div className="lg:col-span-2 space-y-8">
                        <div className="bg-card rounded-xl border border-border p-8 shadow-sm">
                            {/* Header Section */}
                            <div className="flex items-start gap-4 mb-6">
                                <div className="w-20 h-20 rounded-xl bg-primary/10 flex items-center justify-center border border-border shrink-0">
                                    <Building className="h-10 w-10 text-primary" />
                                </div>
                                <div className="flex-1 space-y-4">
                                    <div>
                                        <Label htmlFor="job-title" className="text-xs font-semibold uppercase text-muted-foreground mb-1 block">Job Title</Label>
                                        <Input
                                            id="job-title"
                                            value={title}
                                            onChange={(e) => setTitle(e.target.value)}
                                            placeholder="e.g. Senior React Developer"
                                            className="text-xl font-bold h-12"
                                        />
                                    </div>
                                    <div className="flex items-center gap-2 text-muted-foreground">
                                        <Building className="h-4 w-4" />
                                        <span className="font-medium">My Company (Smart Recruit)</span>
                                    </div>
                                </div>
                            </div>

                            {/* Group 1: Role Definition (Location, Position, Experience) */}
                            <div className="space-y-6 pt-6 border-t border-border">
                                <h3 className="text-lg font-semibold flex items-center gap-2">
                                    <MapPin className="h-5 w-5 text-accent" />
                                    Role Definition
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {/* Location */}
                                    <div className="space-y-2 md:col-span-2">
                                        <div className="flex items-center justify-between">
                                            <Label className="flex items-center gap-2 text-muted-foreground">
                                                Location
                                            </Label>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                className="h-6 text-xs text-primary hover:text-primary/80"
                                                onClick={() => setLocationList([COMPANY_ADDRESS])}
                                                type="button"
                                            >
                                                Use Company Address
                                            </Button>
                                        </div>
                                        <Popover open={locationOpen} onOpenChange={setLocationOpen}>
                                            <PopoverTrigger asChild>
                                                <Button
                                                    variant="outline"
                                                    role="combobox"
                                                    aria-expanded={locationOpen}
                                                    className="w-full justify-between"
                                                >
                                                    {locationList.length > 0
                                                        ? <span className="truncate">{locationList.join(', ')}</span>
                                                        : "Select locations..."}
                                                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-[400px] p-0" align="start">
                                                <Command>
                                                    <CommandInput placeholder="Search location..." />
                                                    <CommandList>
                                                        <CommandEmpty>No location found.</CommandEmpty>
                                                        <CommandGroup>
                                                            {cities.map((city) => (
                                                                <CommandItem
                                                                    key={city}
                                                                    value={city}
                                                                    onSelect={(currentValue) => {
                                                                        if (locationList.includes(currentValue)) {
                                                                            setLocationList(locationList.filter(l => l !== currentValue));
                                                                        } else {
                                                                            setLocationList([...locationList, currentValue]);
                                                                        }
                                                                    }}
                                                                >
                                                                    <Check
                                                                        className={cn(
                                                                            "mr-2 h-4 w-4",
                                                                            locationList.includes(city) ? "opacity-100" : "opacity-0"
                                                                        )}
                                                                    />
                                                                    {city}
                                                                </CommandItem>
                                                            ))}
                                                        </CommandGroup>
                                                    </CommandList>
                                                </Command>
                                            </PopoverContent>
                                        </Popover>
                                    </div>

                                    {/* Job Level */}
                                    <div className="space-y-2">
                                        <Label className="flex items-center gap-2 text-muted-foreground">
                                            Job Position
                                        </Label>
                                        <Select value={level} onValueChange={setLevel}>
                                            <SelectTrigger>
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {JOB_LEVELS.map(lvl => (
                                                    <SelectItem key={lvl} value={lvl}>{lvl}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    {/* Experience */}
                                    <div className="space-y-2">
                                        <Label className="flex items-center gap-2 text-muted-foreground">
                                            Experience
                                        </Label>
                                        <Select value={experience} onValueChange={setExperience}>
                                            <SelectTrigger>
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {EXPERIENCE_RANGES.map(exp => (
                                                    <SelectItem key={exp} value={exp}>{exp}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                            </div>

                            {/* Group 2: Compensation & Schedule (Salary, Type, Time) */}
                            <div className="space-y-6 pt-6 border-t border-border">
                                <h3 className="text-lg font-semibold flex items-center gap-2">
                                    <Briefcase className="h-5 w-5 text-accent" />
                                    Work & Compensation
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {/* Salary Range */}
                                    <div className="space-y-2">
                                        <Label className="flex items-center gap-2 text-muted-foreground">
                                            Salary Range
                                        </Label>
                                        <Input
                                            value={salary}
                                            onChange={(e) => setSalary(e.target.value)}
                                            placeholder="e.g. $2,000 - $4,000"
                                        />
                                    </div>

                                    {/* Employment Type */}
                                    <div className="space-y-2">
                                        <Label className="flex items-center gap-2 text-muted-foreground">
                                            Employment Type
                                        </Label>
                                        <Select value={type} onValueChange={setType}>
                                            <SelectTrigger>
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="full-time">Full-time</SelectItem>
                                                <SelectItem value="part-time">Part-time</SelectItem>
                                                <SelectItem value="contract">Contract</SelectItem>
                                                <SelectItem value="remote">Remote</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    {/* Working Time */}
                                    <div className="space-y-2 md:col-span-2">
                                        <Label className="flex items-center gap-2 text-muted-foreground">
                                            Working Time
                                        </Label>
                                        <Popover open={workingTimeOpen} onOpenChange={setWorkingTimeOpen}>
                                            <PopoverTrigger asChild>
                                                <Button
                                                    variant="outline"
                                                    role="combobox"
                                                    aria-expanded={workingTimeOpen}
                                                    className="w-full justify-between"
                                                >
                                                    {workingTime || "Select working time..."}
                                                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-[400px] p-0">
                                                <Command>
                                                    <CommandInput
                                                        placeholder="Search or enter custom time..."
                                                        value={workingTimeSearch}
                                                        onValueChange={setWorkingTimeSearch}
                                                    />
                                                    <CommandList>
                                                        <CommandEmpty>
                                                            <button
                                                                className="w-full text-left p-2 text-sm text-accent hover:bg-accent/10 rounded-sm"
                                                                onClick={(e) => {
                                                                    e.preventDefault();
                                                                    setWorkingTime(workingTimeSearch);
                                                                    setWorkingTimeSearch("");
                                                                    setWorkingTimeOpen(false);
                                                                }}
                                                            >
                                                                Use custom: "{workingTimeSearch}"
                                                            </button>
                                                        </CommandEmpty>
                                                        <CommandGroup>
                                                            {WORKING_TIMES.map((wt) => (
                                                                <CommandItem
                                                                    key={wt}
                                                                    value={wt}
                                                                    onSelect={(currentValue) => {
                                                                        setWorkingTime(currentValue);
                                                                        setWorkingTimeOpen(false);
                                                                    }}
                                                                >
                                                                    <Check
                                                                        className={cn(
                                                                            "mr-2 h-4 w-4",
                                                                            workingTime === wt ? "opacity-100" : "opacity-0"
                                                                        )}
                                                                    />
                                                                    {wt}
                                                                </CommandItem>
                                                            ))}
                                                        </CommandGroup>
                                                    </CommandList>
                                                </Command>
                                            </PopoverContent>
                                        </Popover>
                                    </div>
                                </div>
                            </div>

                            {/* AI Scoring Configuration */}
                            <div className="space-y-6 pt-6 border-t border-border">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-lg font-semibold flex items-center gap-2">
                                        <TrendingUp className="h-5 w-5 text-accent" />
                                        AI Scoring Weights
                                    </h3>
                                    <Badge variant={totalWeight === 100 ? "default" : "destructive"}>
                                        Total: {totalWeight}%
                                    </Badge>
                                </div>
                                <p className="text-sm text-muted-foreground">
                                    Configure how the AI prioritizes different criteria when scoring candidates. Total must equal 100%.
                                </p>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 bg-muted/20 rounded-lg">
                                    <div className="space-y-3">
                                        <div className="flex justify-between items-center">
                                            <Label>Requirements ({weights.requirements}%)</Label>
                                        </div>
                                        <Slider
                                            value={[weights.requirements]}
                                            max={100}
                                            step={5}
                                            onValueChange={(val) => setWeights(prev => ({ ...prev, requirements: val[0] }))}
                                        />
                                    </div>
                                    <div className="space-y-3">
                                        <div className="flex justify-between items-center">
                                            <Label>Skills ({weights.skills}%)</Label>
                                        </div>
                                        <Slider
                                            value={[weights.skills]}
                                            max={100}
                                            step={5}
                                            onValueChange={(val) => setWeights(prev => ({ ...prev, skills: val[0] }))}
                                        />
                                    </div>
                                    <div className="space-y-3">
                                        <div className="flex justify-between items-center">
                                            <Label>Experience ({weights.experience}%)</Label>
                                        </div>
                                        <Slider
                                            value={[weights.experience]}
                                            max={100}
                                            step={5}
                                            onValueChange={(val) => setWeights(prev => ({ ...prev, experience: val[0] }))}
                                        />
                                    </div>
                                    <div className="space-y-3">
                                        <div className="flex justify-between items-center">
                                            <Label>Location ({weights.location}%)</Label>
                                        </div>
                                        <Slider
                                            value={[weights.location]}
                                            max={100}
                                            step={5}
                                            onValueChange={(val) => setWeights(prev => ({ ...prev, location: val[0] }))}
                                        />
                                    </div>
                                </div>
                            </div>


                            <div className="space-y-8 pt-6 border-t border-border">
                                <section className="space-y-3">
                                    <Label className="text-lg font-semibold">About the Role</Label>
                                    <Textarea
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        placeholder="Describe the role, responsibilities, and what you're looking for..."
                                        className="min-h-[200px]"
                                    />
                                </section>

                                <section className="space-y-3">
                                    <Label className="text-lg font-semibold">Requirements</Label>
                                    <p className="text-sm text-muted-foreground">Enter each requirement on a new line.</p>
                                    <Textarea
                                        value={requirements}
                                        onChange={(e) => setRequirements(e.target.value)}
                                        placeholder="- 3+ years of experience&#10;- Strong knowledge of React&#10;- Good communication skills"
                                        className="min-h-[150px]"
                                    />
                                </section>

                                <section className="space-y-3">
                                    <Label className="text-lg font-semibold">Benefits</Label>
                                    <Popover open={benefitsOpen} onOpenChange={setBenefitsOpen}>
                                        <PopoverTrigger asChild>
                                            <Button
                                                variant="outline"
                                                role="combobox"
                                                aria-expanded={benefitsOpen}
                                                className="w-full justify-between h-auto min-h-[40px]"
                                            >
                                                {benefits.length > 0 ? (
                                                    <div className="flex flex-wrap gap-1 py-1">
                                                        {benefits.map((benefit) => (
                                                            <Badge variant="secondary" key={benefit} className="mr-1">
                                                                {benefit}
                                                            </Badge>
                                                        ))}
                                                    </div>
                                                ) : (
                                                    <span className="text-muted-foreground">Select benefits...</span>
                                                )}
                                                <Plus className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-[400px] p-0" align="start">
                                            <Command>
                                                <CommandInput
                                                    placeholder="Search benefits..."
                                                    value={benefitSearch}
                                                    onValueChange={setBenefitSearch}
                                                />
                                                <CommandList>
                                                    <CommandEmpty>
                                                        <button
                                                            className="w-full text-left p-2 text-sm text-accent hover:bg-accent/10 rounded-sm"
                                                            onClick={(e) => {
                                                                e.preventDefault();
                                                                if (benefitSearch && !benefits.includes(benefitSearch)) {
                                                                    setBenefits([...benefits, benefitSearch]);
                                                                    setBenefitSearch("");
                                                                }
                                                            }}
                                                        >
                                                            Create "{benefitSearch}"
                                                        </button>
                                                    </CommandEmpty>
                                                    <CommandGroup heading="Suggestions">
                                                        {SUGGESTED_BENEFITS.map((benefit) => (
                                                            <CommandItem
                                                                key={benefit}
                                                                value={benefit}
                                                                onSelect={(currentValue) => {
                                                                    // CommandItem lowercases values, so we match original or use current
                                                                    const actualValue = SUGGESTED_BENEFITS.find(b => b.toLowerCase() === currentValue.toLowerCase()) || currentValue;
                                                                    if (benefits.includes(actualValue)) {
                                                                        setBenefits(benefits.filter(b => b !== actualValue));
                                                                    } else {
                                                                        setBenefits([...benefits, actualValue]);
                                                                    }
                                                                }}
                                                            >
                                                                <Check
                                                                    className={cn(
                                                                        "mr-2 h-4 w-4",
                                                                        benefits.includes(benefit) ? "opacity-100" : "opacity-0"
                                                                    )}
                                                                />
                                                                {benefit}
                                                            </CommandItem>
                                                        ))}
                                                    </CommandGroup>
                                                </CommandList>
                                            </Command>
                                        </PopoverContent>
                                    </Popover>
                                </section>

                                <section className="space-y-3">
                                    <Label className="text-lg font-semibold">Skills Required</Label>
                                    <Popover open={skillsOpen} onOpenChange={setSkillsOpen}>
                                        <PopoverTrigger asChild>
                                            <Button
                                                variant="outline"
                                                role="combobox"
                                                aria-expanded={skillsOpen}
                                                className="w-full justify-between h-auto min-h-[40px]"
                                            >
                                                {skills.length > 0 ? (
                                                    <div className="flex flex-wrap gap-1 py-1">
                                                        {skills.map((skill) => (
                                                            <Badge variant="secondary" key={skill} className="mr-1">
                                                                {skill}
                                                            </Badge>
                                                        ))}
                                                    </div>
                                                ) : (
                                                    <span className="text-muted-foreground">Select skills...</span>
                                                )}
                                                <Plus className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-[400px] p-0" align="start">
                                            <Command>
                                                <CommandInput
                                                    placeholder="Search skills..."
                                                    value={skillSearch}
                                                    onValueChange={setSkillSearch}
                                                />
                                                <CommandList>
                                                    <CommandEmpty>
                                                        <button
                                                            className="w-full text-left p-2 text-sm text-accent hover:bg-accent/10 rounded-sm"
                                                            onClick={(e) => {
                                                                e.preventDefault();
                                                                if (skillSearch && !skills.includes(skillSearch)) {
                                                                    setSkills([...skills, skillSearch]);
                                                                    setSkillSearch("");
                                                                }
                                                            }}
                                                        >
                                                            Create "{skillSearch}"
                                                        </button>
                                                    </CommandEmpty>
                                                    <CommandGroup heading="Suggestions">
                                                        {trendingSkills.map((skill) => (
                                                            <CommandItem
                                                                key={skill}
                                                                value={skill}
                                                                onSelect={(currentValue) => {
                                                                    const actualValue = trendingSkills.find(s => s.toLowerCase() === currentValue.toLowerCase()) || currentValue;
                                                                    if (skills.includes(actualValue)) {
                                                                        setSkills(skills.filter(s => s !== actualValue));
                                                                    } else {
                                                                        setSkills([...skills, actualValue]);
                                                                    }
                                                                }}
                                                            >
                                                                <Check
                                                                    className={cn(
                                                                        "mr-2 h-4 w-4",
                                                                        skills.includes(skill) ? "opacity-100" : "opacity-0"
                                                                    )}
                                                                />
                                                                {skill}
                                                            </CommandItem>
                                                        ))}
                                                    </CommandGroup>
                                                </CommandList>
                                            </Command>
                                        </PopoverContent>
                                    </Popover>
                                </section>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar CTA */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-24 space-y-6">
                            <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
                                <h3 className="font-semibold text-lg mb-4">{isEditing ? 'Update Job' : 'Publish Job'}</h3>
                                <p className="text-muted-foreground text-sm mb-6">
                                    Review your job post details carefully before publishing. It will be visible to thousands of candidates immediately.
                                </p>

                                <div className="space-y-3">
                                    <Button
                                        className="w-full"
                                        size="lg"
                                        variant="accent"
                                        onClick={handleSave}
                                        disabled={loading}
                                    >
                                        {loading ? 'Processing...' : (isEditing ? 'Save Changes' : 'Publish Now')}
                                    </Button>

                                    <Button
                                        className="w-full"
                                        size="lg"
                                        variant="outline"
                                        onClick={() => navigate(-1)}
                                    >
                                        Cancel
                                    </Button>
                                </div>
                            </div>

                            <div className="bg-muted/50 rounded-xl p-6">
                                <h4 className="font-medium mb-2">Pro Tips</h4>
                                <ul className="text-sm text-muted-foreground space-y-2 list-disc list-inside">
                                    <li>Use a clear, standard job title.</li>
                                    <li>Be specific about requirements.</li>
                                    <li>Include salary range to attract 3x more candidates.</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default PostJob;

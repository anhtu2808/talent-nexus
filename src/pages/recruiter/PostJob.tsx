import { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
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
import { ArrowLeft, Building, MapPin, DollarSign, Briefcase, Clock, Check, ChevronsUpDown, X, Plus } from 'lucide-react';
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

    // UI States
    const [locationOpen, setLocationOpen] = useState(false);
    const [skillsOpen, setSkillsOpen] = useState(false);
    const [skillSearch, setSkillSearch] = useState("");

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
            toast.info("Job details cloned. Review and publish.");
        }
    }, [isEditing, id, navigate, cloneData]);

    const handleSave = () => {
        if (!title || !salary || !description || locationList.length === 0) {
            toast.error("Please fill in all required fields (Title, Location, Salary, Description)");
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
            navigate('/recruiter/dashboard'); // Go back to jobs list (which is default view in dashboard for now, or we can go to /jobs)
            // Ideally we navigate to the specific Jobs tab in dashboard, but dashboard route defaults to first tab or uses state. 
            // For now, let's assume we want to go back to wherever the jobs list is. 
            // Since JobsView is a component inside Dashboard, we might need to rely on Dashboard default or context.
            // Or arguably, if this is a "page", maybe we want to go to /recruiter/dashboard?tab=jobs? 
            // The dashboard doesn't use query params for tabs yet, but defaults to 'overview'. 
            // Users will find their way.
        }, 1000);
    };

    return (
        <div className="min-h-screen flex flex-col bg-muted/30">
            <Header />

            <main className="flex-1 container py-8">
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

                            {/* Key Details Row */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 pt-6 border-t border-border">
                                <div className="space-y-2">
                                    <Label className="flex items-center gap-2 text-muted-foreground">
                                        <MapPin className="h-4 w-4 text-accent" />
                                        Location
                                    </Label>
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
                                        <PopoverContent className="w-[300px] p-0" align="start">
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

                                <div className="space-y-2">
                                    <Label className="flex items-center gap-2 text-muted-foreground">
                                        <DollarSign className="h-4 w-4 text-accent" />
                                        Salary Range
                                    </Label>
                                    <Input
                                        value={salary}
                                        onChange={(e) => setSalary(e.target.value)}
                                        placeholder="e.g. $2,000 - $4,000"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label className="flex items-center gap-2 text-muted-foreground">
                                        <Briefcase className="h-4 w-4 text-accent" />
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

                                <div className="space-y-2">
                                    <Label className="flex items-center gap-2 text-muted-foreground">
                                        <Clock className="h-4 w-4 text-accent" />
                                        Posted
                                    </Label>
                                    <Input disabled value="Just now" className="bg-muted" />
                                </div>
                            </div>

                            <div className="space-y-8">
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

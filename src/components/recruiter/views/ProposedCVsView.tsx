import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from '@/components/ui/dialog';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { mockJobs, mockCandidates, mockApplications, mockCVs } from '@/data/mockData';
import { Job, CandidateProfile, CV } from '@/types';
import { Sparkles, Briefcase, Star, UserCheck, ArrowRight, Mail, FileText, User } from 'lucide-react';
import { toast } from 'sonner';


// React PDF Viewer imports
import { Viewer, Worker } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

interface ProposedMatch {
    candidate: CandidateProfile;
    job: Job;
    score: number;
    reasons: string[];
    type: 'skill_match' | 'high_potential';
}

interface ProposedCVsViewProps {
    jobId?: string;
}

const ProposedCVsView = ({ jobId }: ProposedCVsViewProps = {}) => {
    // Create instance of default layout plugin
    const defaultLayoutPluginInstance = defaultLayoutPlugin();

    const [invitedMatches, setInvitedMatches] = useState<string[]>([]);
    const [selectedMatch, setSelectedMatch] = useState<ProposedMatch | null>(null);
    const [isCreditConfirmOpen, setIsCreditConfirmOpen] = useState(false);

    // Mock handler for finding matches with credits
    const handleFindMatches = () => {
        setIsCreditConfirmOpen(false);
        toast.success("Used 10 credits to find new matches!");
        // Logic to refresh or fetch matches would go here
    };

    const proposedMatches = useMemo(() => {
        const matches: ProposedMatch[] = [];
        let activeJobs = mockJobs.filter(j => j.isActive);

        if (jobId) {
            activeJobs = activeJobs.filter(j => j.id === jobId);
        }

        // helper to check if applied
        const hasApplied = (candidateId: string, jobId: string) => {
            return mockApplications.some(a => a.candidateId === candidateId && a.jobId === jobId);
        };

        // 1. Skill Matching Strategy
        activeJobs.forEach(job => {
            mockCandidates.forEach(candidate => {
                if (hasApplied(candidate.id, job.id)) return;

                // Simple skill intersection
                const jobSkills = job.skills.map(s => s.toLowerCase());
                const candidateSkills = candidate.skills?.map(s => s.toLowerCase()) || [];
                const matchingSkills = jobSkills.filter(s => candidateSkills.includes(s));

                const matchRatio = matchingSkills.length / jobSkills.length;
                const score = Math.round(matchRatio * 100);

                // Threshold: > 70% skills match
                if (score > 70) {
                    matches.push({
                        candidate,
                        job,
                        score: score,
                        reasons: [`Matches ${matchingSkills.length}/${jobSkills.length} required skills`],
                        type: 'skill_match'
                    });
                }
            });
        });

        // 2. High Potential Strategy (Good candidates from other apps)
        // Find candidates with matchScore > 80 in any application
        const highPotentialCandidates = new Set<string>();
        mockApplications.forEach(app => {
            if (app.matchScore && app.matchScore > 80) {
                highPotentialCandidates.add(app.candidateId);
            }
        });

        highPotentialCandidates.forEach(candidateId => {
            const candidate = mockCandidates.find(c => c.id === candidateId);
            if (!candidate) return;

            activeJobs.forEach(job => {
                if (hasApplied(candidate.id, job.id)) return;

                // If not already added by skill match
                const existingMatch = matches.find(m => m.candidate.id === candidate.id && m.job.id === job.id);
                if (existingMatch) return;

                // For high potential, we assign a base "Potential Score" but let's check skill overlap too
                const jobSkills = job.skills.map(s => s.toLowerCase());
                const candidateSkills = candidate.skills?.map(s => s.toLowerCase()) || [];
                const matchingSkills = jobSkills.filter(s => candidateSkills.includes(s));
                // Calculate a hypothetical score based on skills + bonus for being high potential
                const skillScore = (matchingSkills.length / jobSkills.length) * 100;
                const potentialScore = Math.min(95, Math.round(skillScore + 15)); // Boost score for proven performers

                if (potentialScore > 70) {
                    matches.push({
                        candidate,
                        job,
                        score: potentialScore,
                        reasons: ['High performing candidate in other pipelines', `Matches ${matchingSkills.length} skills`],
                        type: 'high_potential'
                    });
                }
            });
        });

        return matches.sort((a, b) => b.score - a.score);
    }, [jobId]); // Remove tier dependency

    const handleInvite = (matchId: string) => {
        setInvitedMatches(prev => [...prev, matchId]);
        toast.success('Invitation sent to candidate');
    };

    const getCandidateCV = (candidateId: string): CV | undefined => {
        return mockCVs.find(cv => cv.candidateId === candidateId);
    };



    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2">
                        <Sparkles className="h-6 w-6 text-yellow-500" />
                        Proposed Candidates
                    </h2>
                    <p className="text-muted-foreground">
                        Top candidates matched for your jobs (&gt;70%).
                    </p>
                </div>
                <Button
                    onClick={() => setIsCreditConfirmOpen(true)}
                    className="bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 text-white border-0 shadow-md"
                >
                    <Sparkles className="mr-2 h-4 w-4" />
                    Find Candidates
                </Button>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {proposedMatches.map((match) => {
                    const matchId = `${match.candidate.id}-${match.job.id}`;
                    const isInvited = invitedMatches.includes(matchId);

                    return (
                        <Card
                            key={matchId}
                            className="flex flex-col group hover:shadow-md transition-all cursor-pointer hover:border-primary/50"
                            onClick={() => setSelectedMatch(match)}
                        >
                            <CardHeader className="pb-3">
                                <div className="flex justify-between items-start">
                                    <div className="flex items-center gap-3">
                                        <Avatar className="h-10 w-10 border">
                                            <AvatarImage src={match.candidate.avatar} alt={match.candidate.name} />
                                            <AvatarFallback>{match.candidate.name.substring(0, 2)}</AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <CardTitle className="text-base group-hover:text-primary transition-colors">{match.candidate.name}</CardTitle>
                                            <CardDescription className="flex items-center gap-1">
                                                <UserCheck className="h-3 w-3" />
                                                {match.candidate.yearsOfExperience} years exp
                                            </CardDescription>
                                        </div>
                                    </div>
                                    <Badge variant={match.score > 85 ? "default" : "secondary"}>
                                        {match.score}% Match
                                    </Badge>
                                </div>
                            </CardHeader>
                            <CardContent className="flex-1 flex flex-col gap-4">
                                <div className="space-y-2">
                                    <div className="text-sm font-medium text-muted-foreground">Suggested for:</div>
                                    <div className="flex items-center gap-2 font-medium">
                                        <Briefcase className="h-4 w-4 text-primary" />
                                        {match.job.title}
                                    </div>
                                </div>

                                <div className="space-y-2 flex-1">
                                    <div className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Match Reasons</div>
                                    <ul className="text-sm space-y-1">
                                        {match.reasons.map((reason, i) => (
                                            <li key={i} className="flex items-start gap-2">
                                                <Star className="h-3 w-3 text-yellow-500 mt-1 shrink-0" />
                                                <span>{reason}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="pt-2">
                                    <Button
                                        className="w-full"
                                        variant={isInvited ? "outline" : "default"}
                                        disabled={isInvited}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleInvite(matchId);
                                        }}
                                    >
                                        {isInvited ? (
                                            <>
                                                <UserCheck className="h-4 w-4 mr-2" />
                                                Invited
                                            </>
                                        ) : (
                                            <>
                                                <Mail className="h-4 w-4 mr-2" />
                                                Invite
                                            </>
                                        )}
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    );
                })}

                {proposedMatches.length === 0 && (
                    <div className="col-span-full text-center py-12 text-muted-foreground border border-dashed rounded-lg bg-muted/20">
                        <Sparkles className="mx-auto h-8 w-8 text-muted-foreground/50 mb-2" />
                        <p>No high-confidence matches found (&gt;70%).</p>
                    </div>
                )}
            </div>

            <Dialog open={!!selectedMatch} onOpenChange={(open) => !open && setSelectedMatch(null)}>
                <DialogContent className="max-w-3xl max-h-[85vh] overflow-hidden flex flex-col p-0 gap-0">
                    <DialogHeader className="p-6 pb-2 border-b">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <Avatar className="h-16 w-16 border-2 border-background shadow-sm">
                                    <AvatarImage src={selectedMatch?.candidate.avatar} />
                                    <AvatarFallback className="text-lg">{selectedMatch?.candidate.name.substring(0, 2)}</AvatarFallback>
                                </Avatar>
                                <div>
                                    <DialogTitle className="text-2xl">{selectedMatch?.candidate.name}</DialogTitle>
                                    <DialogDescription className="text-base flex items-center gap-2 mt-1">
                                        <span>{selectedMatch?.candidate.role}</span>
                                        <span>•</span>
                                        <span>{selectedMatch?.candidate.location}</span>
                                    </DialogDescription>
                                </div>
                            </div>
                            <div className="text-right">
                                <Badge className="text-lg px-3 py-1 mb-1" variant="outline">{selectedMatch?.score}% Match</Badge>
                                <div className="text-sm text-muted-foreground">for {selectedMatch?.job.title}</div>
                            </div>
                        </div>
                    </DialogHeader>

                    <div className="flex-1 overflow-y-auto bg-muted/10">
                        <div className="p-6 space-y-8">
                            {/* Tabs for Info vs CV */}
                            <Tabs defaultValue="info" className="w-full">
                                <TabsList className="grid w-full grid-cols-2 mb-6">
                                    <TabsTrigger value="info">
                                        <User className="h-4 w-4 mr-2" />
                                        Candidate Profile
                                    </TabsTrigger>
                                    <TabsTrigger value="cv">
                                        <FileText className="h-4 w-4 mr-2" />
                                        CV Document
                                    </TabsTrigger>
                                </TabsList>
                                <TabsContent value="info" className="space-y-6">
                                    <div className="grid gap-6 md:grid-cols-2">
                                        <div className="space-y-4">
                                            <h3 className="font-semibold text-lg flex items-center gap-2">
                                                <Briefcase className="h-4 w-4" /> Experience
                                            </h3>
                                            {/* Using parsed data from CV if available, or just mock placeholder */}
                                            {selectedMatch && getCandidateCV(selectedMatch.candidate.id)?.parsedData?.experience.map((exp, i) => (
                                                <div key={i} className="bg-card p-4 rounded-lg border shadow-sm">
                                                    <div className="font-medium text-base">{exp.title}</div>
                                                    <div className="text-sm text-primary">{exp.company}</div>
                                                    <div className="text-xs text-muted-foreground mt-1">{exp.duration}</div>
                                                    <p className="text-sm mt-2 text-muted-foreground">{exp.description}</p>
                                                </div>
                                            )) || (
                                                    <div className="text-sm text-muted-foreground italic">No detailed experience data available.</div>
                                                )}
                                        </div>

                                        <div className="space-y-6">
                                            <div className="space-y-3">
                                                <h3 className="font-semibold text-lg flex items-center gap-2">
                                                    <Star className="h-4 w-4" /> Skills
                                                </h3>
                                                <div className="flex flex-wrap gap-2">
                                                    {selectedMatch?.candidate.skills?.map(skill => (
                                                        <Badge key={skill} variant="secondary">{skill}</Badge>
                                                    ))}
                                                </div>
                                            </div>

                                            <div className="space-y-3">
                                                <h3 className="font-semibold text-lg">Contact Information</h3>
                                                <div className="bg-card p-4 rounded-lg border grid gap-2 text-sm">
                                                    <div className="flex justify-between">
                                                        <span className="text-muted-foreground">Email</span>
                                                        <span className="font-medium">{selectedMatch?.candidate.email}</span>
                                                    </div>
                                                    <div className="flex justify-between">
                                                        <span className="text-muted-foreground">Phone</span>
                                                        <span className="font-medium">{selectedMatch?.candidate.phone || 'N/A'}</span>
                                                    </div>
                                                    <div className="flex justify-between">
                                                        <span className="text-muted-foreground">Location</span>
                                                        <span className="font-medium">{selectedMatch?.candidate.location || 'N/A'}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </TabsContent>
                                <TabsContent value="cv" className="h-[600px] mt-0 border rounded-md overflow-hidden bg-slate-50">
                                    {selectedMatch && getCandidateCV(selectedMatch.candidate.id) ? (
                                        <div className="h-full w-full">
                                            <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
                                                <Viewer
                                                    fileUrl={getCandidateCV(selectedMatch.candidate.id)?.fileUrl || '/sample-cv.pdf'}
                                                    plugins={[defaultLayoutPluginInstance]}
                                                    defaultScale={1.2}
                                                />
                                            </Worker>
                                        </div>
                                    ) : (
                                        <div className="h-full flex items-center justify-center text-muted-foreground flex-col gap-2">
                                            <FileText className="h-10 w-10 text-muted-foreground/50" />
                                            <span>No CV document found for this candidate.</span>
                                        </div>
                                    )}
                                </TabsContent>
                            </Tabs>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>

            <AlertDialog open={isCreditConfirmOpen} onOpenChange={setIsCreditConfirmOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Use Credits to Find Candidates?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action will use <span className="font-bold text-foreground">10 credits</span> to scour our database for the best matching candidates for this job.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleFindMatches} className="bg-gradient-to-r from-yellow-500 to-amber-600 text-white border-0">
                            Confirm & Use Credits
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div >
    );
};

export default ProposedCVsView;

import Header from '@/components/layout/Header';
import { Button } from '@/components/ui/button';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import {
  ArrowLeft,
  Sparkles,
  Upload,
  CheckCircle2,
  XCircle,
  AlertCircle,
  ChevronDown,
  ChevronUp,
  FileText,
  Lock
} from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useSubscription } from '@/contexts/SubscriptionContext';

// React PDF Viewer imports
import { Viewer, Worker } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import { RenderHighlightsProps, searchPlugin } from '@react-pdf-viewer/search';

// Import styles
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import '@react-pdf-viewer/search/lib/styles/index.css';

// PDF file URL (from public folder)
const resumePdfUrl = '/sample-cv.pdf';

const CVAnalysis = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { tier } = useSubscription();

  // State for Overall Score
  const [overallScore, setOverallScore] = useState(72);

  // Initial Data with more detailed fixing suggestions
  const initialCategories = [
    {
      id: 'completeness',
      label: 'Completeness',
      score: 85,
      description: 'Evaluates the completeness of all CV sections.',
      issues: [
        {
          title: "Contact Information",
          status: "success",
          description: "Email, phone number, and LinkedIn link are present.",
          fixSuggestion: "Ensure all contact details are up-to-date."
        },
        {
          title: "Education Section",
          status: "success",
          description: "Degrees and institutions are clearly listed.",
          fixSuggestion: "Add relevant coursework or honors if applicable."
        },
        {
          title: "Personal Projects",
          status: "warning",
          description: "Consider adding links to Demos or Repositories for your projects.",
          fixSuggestion: "Include GitHub links and live demo URLs for each project."
        }
      ]
    },
    {
      id: 'ats_friendly',
      label: 'ATS-friendly Format',
      score: 90,
      description: 'Readability score by automated Applicant Tracking Systems.',
      issues: [
        { title: "File Format", status: "success", description: "Standard PDF format with selectable text." },
        { title: "Table Usage", status: "success", description: "Simple structure, avoiding complex tables that cause parsing errors." },
        { title: "Fonts", status: "success", description: "Using standard, machine-readable fonts." }
      ]
    },
    {
      id: 'readability',
      label: 'Readability',
      score: 75,
      description: 'The reading experience for a human recruiter.',
      issues: [
        {
          title: "Line Length",
          status: "warning",
          description: "Some bullet points are too long (> 2 lines). Try splitting them.",
          fixSuggestion: "Break down long sentences into concise 1-line bullet points."
        },
        { title: "White Space", status: "success", description: "Good distribution of white space, not cluttered." },
        { title: "Bullet Points", status: "success", description: "Lists are presented clearly." }
      ]
    },
    {
      id: 'experience_quality',
      label: 'Experience Quality',
      score: 65,
      description: 'Depth and relevance of work experience descriptions.',
      issues: [
        {
          title: "Action Verbs",
          status: "warning",
          description: "Start each point with a strong action verb. Avoid 'Responsible for...'.",
          fixSuggestion: "Replace passive phrases with strong verbs like 'Led', 'Developed', 'Optimized'."
        },
        { title: "Job Details", status: "success", description: "Technologies used are described in good detail." },
        {
          title: "Results/Achievements",
          status: "error",
          description: "Missing specific results (achievements) in past projects.",
          fixSuggestion: "Add specific metrics (e.g., 'Increased efficiency by 20%') to demonstrate impact."
        }
      ]
    },
    {
      id: 'consistency',
      label: 'Consistency & Logic',
      score: 80,
      description: 'Uniformity in formatting and content flow.',
      issues: [
        {
          title: "Date Formatting",
          status: "success",
          description: "Consistent MM/YYYY format throughout the document."
        },
        {
          title: "Punctuation",
          status: "warning",
          description: "Check ending punctuation of bullet points (inconsistent periods).",
          fixSuggestion: "Ensure all bullet points end either with or without a period consistently."
        }
      ]
    },
    {
      id: 'skill_presentation',
      label: 'Skill Presentation',
      score: 70,
      description: 'How technical skills are organized and highlighted.',
      issues: [
        { title: "Skill Grouping", status: "success", description: "Frontend and Backend skills are clearly separated." },
        {
          title: "Relevance",
          status: "warning",
          description: "Move the most critical skills to the top of the list.",
          fixSuggestion: "Reorder skills to prioritize those mentioned in the job description."
        },
        {
          title: "Keywords",
          status: "error",
          description: "Missing key JD keywords (e.g., Docker, CI/CD).",
          fixSuggestion: "Integrate keywords like 'Docker', 'Kubernetes', and 'CI/CD' into your skills section."
        }
      ]
    },
    {
      id: 'professionalism',
      label: 'Professionalism',
      score: 95,
      description: 'Tone, style, and professional appearance.',
      issues: [
        { title: "Spelling", status: "success", description: "No major spelling errors detected." },
        { title: "Email Address", status: "success", description: "Professional email address used." },
        { title: "Photo", status: "success", description: "No profile photo used (standard for international/ATS norms)." }
      ]
    },
    {
      id: 'conciseness',
      label: 'Conciseness',
      score: 85,
      description: 'Ability to convey information succinctly.',
      issues: [
        { title: "Page Count", status: "success", description: "1 page is ideal for your current experience level." },
        { title: "Irrelevant Info", status: "success", description: "No unnecessary personal details (age, religion, etc.)." }
      ]
    },
    {
      id: 'value_signal',
      label: 'Value Signal',
      score: 45,
      description: 'Demonstrating capability through metrics and awards.',
      issues: [
        {
          title: "Quantified Metrics",
          status: "error",
          description: "Only 10% of experience bullets have numbers. Aim for at least 30%.",
          fixSuggestion: "Quantify your achievements using numbers, percentages, and dollar amounts."
        },
        {
          title: "Awards/Recognition",
          status: "warning",
          description: "No notable awards or special recognition section found.",
          fixSuggestion: "Add an 'Awards & Honors' section to highlight your achievements."
        }
      ]
    },
    {
      id: 'credibility',
      label: 'Credibility',
      score: 88,
      description: 'Authenticity and trustworthiness of the profile.',
      issues: [
        { title: "Verified Links", status: "success", description: "LinkedIn and GitHub Profile links are active." },
        { title: "Employment Gaps", status: "success", description: "No unexplained large gaps in employment history." }
      ]
    }
  ];

  const [categories, setCategories] = useState(initialCategories);

  const [selectedCategory, setSelectedCategory] = useState<any>(null);

  // Define AI Findings (Keywords to search and highlight)
  // Define AI Findings (Keywords to search and highlight)
  interface Finding {
    keyword: string;
    type: 'warning' | 'success' | 'info';
    message: string;
    suggestions?: string[];
    currentSuggestionIndex?: number;
  }

  const [aiFindings, setAiFindings] = useState<Finding[]>([
    {
      keyword: "Software Engineer",
      type: 'warning',
      message: "Consider being more specific. Try 'Full-Stack Software Engineer' to match JD.",
      suggestions: [
        "Consider being more specific. Try 'Full-Stack Software Engineer' to match JD.",
        "Alternatively, use 'Senior Software Engineer' if you have 5+ years experience.",
        "Match the job description by using 'Backend Developer' as your title."
      ],
      currentSuggestionIndex: 0
    },
    {
      keyword: "ReactJS",
      type: 'success',
      message: "Great! This is a high-demand skill in the current market."
    },
    {
      keyword: "Java",
      type: 'info',
      message: "Consider adding specific frameworks you know (e.g., Spring Boot).",
      suggestions: [
        "Consider adding specific frameworks you know (e.g., Spring Boot).",
        "Mention specific versions like 'Java 17' or 'Java 21'.",
        "List related ecosystem tools like 'Maven' or 'Gradle'."
      ],
      currentSuggestionIndex: 0
    }
  ]);

  const handleRegenerate = (keyword: string) => {
    toast.success("Regenerating AI suggestion...");
    setTimeout(() => {
      setAiFindings(prev => prev.map(f => {
        if (f.keyword === keyword && f.suggestions) {
          const nextIndex = ((f.currentSuggestionIndex || 0) + 1) % f.suggestions.length;
          return {
            ...f,
            currentSuggestionIndex: nextIndex,
            message: f.suggestions[nextIndex]
          };
        }
        return f;
      }));
      toast.success("New suggestion generated!");
    }, 600);
  };



  const handleFixIssue = (catId: string, issueIndex: number) => {
    toast.success("Applying recommended changes...");

    setTimeout(() => {
      setCategories(prevCats => prevCats.map(cat => {
        if (cat.id === catId) {
          const newIssues = [...cat.issues];
          const issue = newIssues[issueIndex];

          // Only update if not already fixed
          if (issue.status !== 'success') {
            issue.status = 'success';
            issue.description = issue.fixSuggestion || "Issue resolved successfully.";

            // Boost category score
            const newScore = Math.min(100, cat.score + 5);
            cat.score = newScore;

            // Boost Overall Score
            setOverallScore(prev => Math.min(100, prev + 2));
          }

          return { ...cat, issues: newIssues };
        }
        return cat;
      }));

      toast.success("Issue fixed! Score updated.");
    }, 800);
  };

  // Create instance of default layout plugin
  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  // Configure Search Plugin with Custom Highlighting
  const searchPluginInstance = searchPlugin({
    keyword: [
      ...aiFindings.map(f => f.keyword)
    ],
    renderHighlights: (props: RenderHighlightsProps) => {
      const { getCssProperties, highlightAreas } = props;

      return (
        <div>
          {highlightAreas.map((area, index) => {
            const text = area.keywordStr?.trim();
            if (!text) return null;

            const finding = aiFindings.find(f => text.includes(f.keyword));
            if (!finding) return <div key={index} style={getCssProperties(area)} />;

            const colorClass = finding.type === 'warning' ? 'bg-amber-500/30 border-amber-500'
              : finding.type === 'success' ? 'bg-green-500/30 border-green-500'
                : 'bg-blue-500/30 border-blue-500';
            const iconColor = finding.type === 'warning' ? 'text-amber-600'
              : finding.type === 'success' ? 'text-green-600'
                : 'text-blue-600';

            return (
              <HoverCard key={index}>
                <HoverCardTrigger asChild>
                  <div
                    style={getCssProperties(area)}
                    className={cn(
                      "absolute cursor-pointer border-b-2 hover:opacity-80 transition-opacity z-10",
                      colorClass
                    )}
                  />
                </HoverCardTrigger>
                <HoverCardContent className="w-80 z-50 pointer-events-auto">
                  <div className="flex justify-between space-x-4">
                    <div className="space-y-1 w-full">
                      <h4 className="text-sm font-semibold flex items-center gap-2">
                        <Sparkles className={cn("h-4 w-4", iconColor)} />
                        AI Suggestion
                      </h4>

                      {tier === 'free' ? (
                        <div className="relative mt-2">
                          <p className="text-sm text-muted-foreground blur-md select-none opacity-50">
                            {finding.message}
                          </p>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <Button
                              variant="secondary"
                              size="sm"
                              className="h-7 text-xs gap-1.5 shadow-sm bg-background/80 hover:bg-background backdrop-blur-sm"
                              onClick={() => navigate('/candidate/upgrade')}
                            >
                              <Lock className="w-3 h-3" /> Upgrade
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <>
                          <p className="text-sm text-muted-foreground transition-all duration-300">
                            {finding.message}
                          </p>
                          <div className="flex items-center pt-2">
                            <Button
                              size="sm"
                              variant="outline"
                              className="h-7 text-xs"
                              onClick={() => handleRegenerate(finding.keyword)}
                              disabled={!finding.suggestions}
                            >
                              Fixed (Re-generated)
                            </Button>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </HoverCardContent>
              </HoverCard>
            );
          })}
        </div>
      );
    },
  });

  const { highlight } = searchPluginInstance;
  const hasHighlighted = useRef(false);

  // Trigger search on mount
  useEffect(() => {
    if (highlight && !hasHighlighted.current) {
      highlight(aiFindings.map(f => f.keyword));
      hasHighlighted.current = true;
    }
  }, [highlight, aiFindings]);

  const handleOptimize = () => {
    toast.success("Optimizing your CV...");
  };

  return (
    <div className="min-h-screen bg-muted/30 flex flex-col">
      <Header />

      <main className="flex-1 w-full px-4 lg:px-6 py-6 h-[calc(100vh-4rem)] overflow-hidden">

        {/* Header Actions */}
        <div className="flex items-center justify-between mb-4">
          <Link
            to="/candidate/dashboard"
            className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors text-sm"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Link>
          <div>
            <input
              type="file"
              id="reupload-cv"
              className="hidden"
              accept=".pdf,.docx"
              onChange={(e) => {
                if (e.target.files?.[0]) {
                  toast.success("Uploading new CV version...");
                  setTimeout(() => {
                    toast.success("Analysis updated with new CV!");
                    // Here we would normally trigger a re-analysis
                  }, 1500);
                }
              }}
            />
            <Button
              variant="outline"
              size="sm"
              className="h-8 text-xs bg-white hover:bg-slate-50"
              onClick={() => document.getElementById('reupload-cv')?.click()}
            >
              <Upload className="h-3 w-3 mr-1.5" /> Re-upload
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-full items-start">

          {/* LEFT: Navigation & Details (Expandable) */}
          <div className="lg:col-span-3 flex flex-col max-h-full space-y-4">

            <div className="bg-white rounded-xl shadow-sm border border-border flex flex-col overflow-hidden">
              {/* Overall Score Area */}
              <div className="p-6 border-b border-border flex flex-col items-center justify-center bg-slate-50/50">
                <div className="relative w-32 h-32 flex items-center justify-center">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle className="text-muted/20" strokeWidth="10" stroke="currentColor" fill="transparent" r="58" cx="64" cy="64" />
                    <circle
                      className={`${overallScore >= 70 ? 'text-green-500' : overallScore >= 50 ? 'text-amber-500' : 'text-red-500'} transition-all duration-1000 ease-out`}
                      strokeWidth="10"
                      strokeDasharray={365}
                      strokeDashoffset={365 - (365 * overallScore) / 100}
                      strokeLinecap="round"
                      stroke="currentColor"
                      fill="transparent"
                      r="58"
                      cx="64"
                      cy="64"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-4xl font-bold text-foreground">{overallScore}</span>
                    <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-semibold mt-1">Overall</span>
                  </div>
                </div>
              </div>

              {/* Navigation Menu (Accordion Style) */}
              <div className="flex-1 overflow-y-auto p-2 space-y-2">


                {/* Critical Fixes Section */}
                <div className="space-y-1">
                  <div className="pl-3 py-2 text-xs font-semibold text-red-600/80 uppercase tracking-wider flex items-center gap-2">
                    <AlertCircle className="h-3 w-3" />
                    Critical Fixes
                  </div>
                  {categories.filter(c => c.score < 80).map((cat) => (
                    <div key={cat.id} className="rounded-lg border border-transparent transition-all overflow-hidden">
                      <button
                        onClick={() => setSelectedCategory(selectedCategory?.id === cat.id ? null : cat)}
                        className={cn(
                          "w-full flex items-center justify-between p-3 text-sm transition-all",
                          selectedCategory?.id === cat.id
                            ? "bg-red-50 text-red-700 font-medium"
                            : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                        )}
                      >
                        <div className="flex items-center gap-2 overflow-hidden">
                          <span className={cn(
                            "flex items-center justify-center w-6 h-6 rounded text-[10px] font-bold shrink-0",
                            cat.score >= 50 ? "bg-amber-100 text-amber-700" : "bg-red-100 text-red-700"
                          )}>
                            {cat.score}
                          </span>
                          <span className="truncate">{cat.label}</span>
                        </div>
                        {selectedCategory?.id === cat.id ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                      </button>

                      {/* Expanded Content for Category */}
                      {selectedCategory?.id === cat.id && (
                        <div className="p-4 bg-red-50/30 border-t border-red-100 space-y-4 relative">
                          <p className="text-sm text-slate-600 leading-relaxed px-1">
                            {cat.description}
                          </p>

                          {tier === 'free' ? (
                            <div className="relative">
                              {/* Blurred Content Placeholder */}
                              <div className="blur-sm select-none opacity-50 space-y-3 pointer-events-none">
                                {[1, 2, 3].map((_, idx) => (
                                  <div key={idx} className="bg-white p-4 rounded-lg border border-border shadow-sm">
                                    <div className="flex items-start gap-3">
                                      <div className="p-1.5 bg-slate-100 rounded-full mt-0.5 shrink-0"><AlertCircle className="h-4 w-4 text-slate-400" /></div>
                                      <div className="flex-1 min-w-0">
                                        <div className="h-4 bg-slate-200 rounded w-2/3 mb-2"></div>
                                        <div className="h-3 bg-slate-100 rounded w-full mb-1"></div>
                                        <div className="h-3 bg-slate-100 rounded w-4/5"></div>
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>

                              {/* Premium Overlay */}
                              <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4 z-10">
                                <div className="bg-white/90 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-purple-100 max-w-xs">
                                  <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                                    {/* BarChart icon replacement or similar */}
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-600"><line x1="12" x2="12" y1="20" y2="10" /><line x1="18" x2="18" y1="20" y2="4" /><line x1="6" x2="6" y1="20" y2="16" /></svg>
                                  </div>
                                  <h4 className="font-bold text-slate-900 mb-2">Detailed Reports is a Premium Feature</h4>
                                  <p className="text-xs text-muted-foreground mb-4">Upgrade to Premium to access detailed analytics, trends, and recruitment insights.</p>
                                  <Button
                                    onClick={() => navigate('/candidate/upgrade')}
                                    className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white border-0"
                                  >
                                    Upgrade to Premium
                                  </Button>
                                </div>
                              </div>
                            </div>
                          ) : (
                            <div className="space-y-3">
                              {cat.issues.map((issue: any, idx: number) => (
                                <div key={idx} className="bg-white p-4 rounded-lg border border-border shadow-sm">
                                  <div className="flex items-start gap-3">
                                    {issue.status === 'success' && <div className="p-1.5 bg-green-100 text-green-600 rounded-full mt-0.5 shrink-0"><CheckCircle2 className="h-4 w-4" /></div>}
                                    {issue.status === 'warning' && <div className="p-1.5 bg-amber-100 text-amber-600 rounded-full mt-0.5 shrink-0"><AlertCircle className="h-4 w-4" /></div>}
                                    {issue.status === 'error' && <div className="p-1.5 bg-red-100 text-red-600 rounded-full mt-0.5 shrink-0"><XCircle className="h-4 w-4" /></div>}

                                    <div className="flex-1 min-w-0">
                                      <h4 className="font-semibold text-sm mb-1 text-slate-900 leading-snug">{issue.title}</h4>
                                      <p className="text-sm text-slate-600 leading-relaxed mb-3">
                                        {issue.description}
                                      </p>

                                      <div className="flex justify-start">
                                        <Button variant="outline" size="sm" className="h-7 text-xs px-3 text-blue-600 border-blue-200 hover:text-blue-700 hover:bg-blue-50"
                                          onClick={() => handleFixIssue(cat.id, idx)}
                                        >
                                          Fix this issue <ChevronDown className="h-3 w-3 ml-1" />
                                        </Button>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Passed Section */}
                <div className="space-y-1">
                  <div className="pl-3 py-2 text-xs font-semibold text-green-600/80 uppercase tracking-wider flex items-center gap-2">
                    <CheckCircle2 className="h-3 w-3" />
                    Passed Checks
                  </div>
                  {categories.filter(c => c.score >= 80).map((cat) => (
                    <div key={cat.id} className="rounded-lg border border-transparent transition-all overflow-hidden">
                      <button
                        onClick={() => setSelectedCategory(selectedCategory?.id === cat.id ? null : cat)}
                        className={cn(
                          "w-full flex items-center justify-between p-3 text-sm transition-all",
                          selectedCategory?.id === cat.id
                            ? "bg-green-50 text-green-700 font-medium"
                            : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                        )}
                      >
                        <div className="flex items-center gap-2 overflow-hidden">
                          <span className="flex items-center justify-center w-6 h-6 rounded bg-green-100 text-green-700 text-[10px] font-bold shrink-0">
                            {cat.score}
                          </span>
                          <span className="truncate">{cat.label}</span>
                        </div>
                        {selectedCategory?.id === cat.id ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                      </button>
                      {/* Expanded Content for Category */}
                      {selectedCategory?.id === cat.id && (
                        <div className="p-4 bg-green-50/30 border-t border-green-100 space-y-4">
                          <p className="text-sm text-slate-600 leading-relaxed px-1">
                            {cat.description}
                          </p>
                          <div className="space-y-3">
                            {cat.issues.map((issue: any, idx: number) => (
                              <div key={idx} className="bg-white p-4 rounded-lg border border-border shadow-sm">
                                <div className="flex items-start gap-3">
                                  {issue.status === 'success' && <div className="p-1.5 bg-green-100 text-green-600 rounded-full mt-0.5 shrink-0"><CheckCircle2 className="h-4 w-4" /></div>}
                                  {issue.status === 'warning' && <div className="p-1.5 bg-amber-100 text-amber-600 rounded-full mt-0.5 shrink-0"><AlertCircle className="h-4 w-4" /></div>}
                                  {issue.status === 'error' && <div className="p-1.5 bg-red-100 text-red-600 rounded-full mt-0.5 shrink-0"><XCircle className="h-4 w-4" /></div>}

                                  <div className="flex-1 min-w-0">
                                    <h4 className="font-semibold text-sm mb-1 text-slate-900 leading-snug">{issue.title}</h4>
                                    <p className="text-sm text-slate-600 leading-relaxed mb-1">
                                      {issue.description}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

              </div>

              {/* Optimize Button (Footer) */}
              <div className="p-4 border-t border-border bg-slate-50">
                {tier === 'free' ? (
                  <Button
                    size="lg"
                    className="w-full bg-slate-100 hover:bg-slate-200 text-slate-500 shadow-sm font-semibold border border-slate-200"
                    onClick={() => navigate('/candidate/upgrade')}
                  >
                    <Lock className="h-4 w-4 mr-2" /> Unlock CV Optimization
                  </Button>
                ) : (
                  <Button
                    size="lg"
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm font-semibold"
                    onClick={handleOptimize}
                  >
                    <Sparkles className="h-4 w-4 mr-2" /> Optimize CV
                  </Button>
                )}
              </div>

            </div>
          </div>

          {/* RIGHT: PDF Viewer (Expanded) */}
          <div className="lg:col-span-9 bg-white rounded-xl shadow-lg border border-border overflow-hidden flex flex-col h-full relative z-0">
            {/* PDF Toolbar can go here if needed */}
            <div className="bg-slate-50 border-b border-border p-2 flex justify-end text-xs text-muted-foreground">
              Viewing: <span className="font-medium ml-1 text-foreground">sample-cv.pdf</span>
            </div>

            {/* PDF Content */}
            <div className="flex-1 relative overflow-hidden">
              <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
                <Viewer
                  fileUrl={resumePdfUrl}
                  plugins={[defaultLayoutPluginInstance, searchPluginInstance]}
                  defaultScale={1.7}
                />
              </Worker>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
};

export default CVAnalysis;

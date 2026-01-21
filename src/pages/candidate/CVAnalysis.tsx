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
  Lock,
  Info
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



  interface Issue {
    title: string;
    status: string;
    description: string;
    fixSuggestion?: string;
    keywords: string[];
    explanation?: string;
    examples?: {
      weak: string;
      strong: string;
    };
    alternatives?: string[];
    currentAltIndex?: number;
  }

  interface Category {
    id: string;
    label: string;
    score: number;
    description: string;
    issues: Issue[];
  }

  // Initial Data with more detailed fixing suggestions
  const initialCategories: Category[] = [
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
          fixSuggestion: "Ensure all contact details are up-to-date.",
          keywords: ["@gmail.com", "linkedin.com", "09"]
        },
        {
          title: "Education Section",
          status: "success",
          description: "Degrees and institutions are clearly listed.",
          fixSuggestion: "Add relevant coursework or honors if applicable.",
          keywords: ["University", "Bachelor", "Degree", "GPA"]
        },
        {
          title: "Personal Projects",
          status: "warning",
          description: "Consider adding links to Demos or Repositories for your projects.",
          explanation: "Recruiters and hiring managers want to see proof of your work. Providing direct links to code repositories (GitHub) or live demos allows them to verify your skills and assess the quality of your code effectively.",
          fixSuggestion: "Include GitHub links and live demo URLs for each project.",
          keywords: ["Project", "GitHub", "Demo"],
          alternatives: [
            "Adding direct links to your GitHub or live demos acts as immediate proof of competence.",
            "Projects without links are harder to verify. Include URLs to showcase your actual code.",
            "Make your portfolio accessible by linking directly to your repositories or deployed apps."
          ],
          currentAltIndex: 0
        }
      ]
    },
    {
      id: 'ats_friendly',
      label: 'ATS-friendly Format',
      score: 100,
      description: 'Readability score by automated Applicant Tracking Systems.',
      issues: [
        { title: "File Format", status: "success", description: "Standard PDF format with selectable text.", keywords: [] },
        { title: "Table Usage", status: "success", description: "Simple structure, avoiding complex tables that cause parsing errors.", keywords: [] },
        { title: "Fonts", status: "success", description: "Using standard, machine-readable fonts.", keywords: [] }
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
          explanation: "Long bullet points are difficult to scan quickly. Recruiters spend an average of 6-7 seconds on a resume. Concise points ensure your key achievements are read and understood immediately.",
          examples: {
            weak: "Responsible for managing the day-to-day operations of the sales team, including hiring, training, and tracking performance metrics...",
            strong: "Managed daily sales operations, hired/trained 15+ staff, and tracked KPIs."
          },
          fixSuggestion: "Break down long sentences into concise 1-line bullet points.",
          keywords: ["•"]
        },
        { title: "White Space", status: "success", description: "Good distribution of white space, not cluttered.", keywords: [] },
        { title: "Bullet Points", status: "success", description: "Lists are presented clearly.", keywords: ["•", "-"] }
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
          explanation: "Using passive language like 'Responsible for' weakens your profile. Strong action verbs (e.g., 'Spearheaded', 'Optimized', 'Built') convey leadership and direct impact, making your experience sound more impressive and results-oriented.",
          examples: {
            weak: "Responsible for creating new marketing materials.",
            strong: "Spearheaded the creation of high-impact marketing collateral."
          },
          fixSuggestion: "Replace passive phrases with strong verbs like 'Led', 'Developed', 'Optimized'.",
          keywords: ["Responsible", "Led", "Developed", "Optimized"]
        },
        { title: "Job Details", status: "success", description: "Technologies used are described in good detail.", keywords: ["React", "Java", "Spring"] },
        {
          title: "Results/Achievements",
          status: "error",
          description: "Missing specific results (achievements) in past projects.",
          explanation: "Employers look for candidates who drive results. Without specific achievements, your experience reads like a job description. highlighting what you accomplished, rather than just what you did, separates you from other candidates.",
          examples: {
            weak: "Worked on optimizations for the backend API to improve speed.",
            strong: "Optimized backend API endpoints, reducing response time by 40%."
          },
          fixSuggestion: "Add specific metrics (e.g., 'Increased efficiency by 20%') to demonstrate impact.",
          keywords: ["%", "Increased", "Reduced", "Saved"]
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
          description: "Consistent MM/YYYY format throughout the document.",
          keywords: ["2020", "2021", "2022", "2023", "Present"]
        },
        {
          title: "Punctuation",
          status: "warning",
          description: "Check ending punctuation of bullet points (inconsistent periods).",
          explanation: "Inconsistency in punctuation signals a lack of attention to detail. Whether you choose to use periods or not, sticking to one style throughout the document makes it look polished and professional.",
          fixSuggestion: "Ensure all bullet points end either with or without a period consistently.",
          keywords: ["."]
        }
      ]
    },
    {
      id: 'skill_presentation',
      label: 'Skill Presentation',
      score: 70,
      description: 'How technical skills are organized and highlighted.',
      issues: [
        { title: "Skill Grouping", status: "success", description: "Frontend and Backend skills are clearly separated.", keywords: ["Skills", "Frontend", "Backend"] },
        {
          title: "Relevance",
          status: "warning",
          description: "Move the most critical skills to the top of the list.",
          explanation: "The top of your skills list is the most valuable real estate. ATS and recruiters scan this first. If your most relevant skills are buried at the bottom, they might be missed entirely.",
          fixSuggestion: "Reorder skills to prioritize those mentioned in the job description.",
          keywords: ["React", "Java"]
        },
        {
          title: "Keywords",
          status: "error",
          description: "Missing key JD keywords (e.g., Docker, CI/CD).",
          explanation: "ATS algorithms search for specific keywords from the Job Description. Missing these exact terms can lead to your CV being filtered out before it even reaches a human recruiter.",
          fixSuggestion: "Integrate keywords like 'Docker', 'Kubernetes', and 'CI/CD' into your skills section.",
          keywords: ["Docker", "CI/CD", "Kubernetes"]
        }
      ]
    },
    {
      id: 'professionalism',
      label: 'Professionalism',
      score: 100,
      description: 'Tone, style, and professional appearance.',
      issues: [
        { title: "Spelling", status: "success", description: "No major spelling errors detected.", keywords: [] },
        { title: "Email Address", status: "success", description: "Professional email address used.", keywords: ["@gmail.com"] },
        { title: "Photo", status: "success", description: "No profile photo used (standard for international/ATS norms).", keywords: [] }
      ]
    },
    {
      id: 'conciseness',
      label: 'Conciseness',
      score: 100,
      description: 'Ability to convey information succinctly.',
      issues: [
        { title: "Page Count", status: "success", description: "1 page is ideal for your current experience level.", keywords: [] },
        { title: "Irrelevant Info", status: "success", description: "No unnecessary personal details (age, religion, etc.).", keywords: ["Age", "Religion", "Marital"] }
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
          explanation: "Recruiters are looking for evidence of impact on your resume, and hard numbers help with this. Using hard numbers to describe your achievements is important, even if you're entry-level. Notice how using hard numbers emphasizes the impact of your work.",
          examples: {
            weak: "In charge of creating new processes and improving communication between departments.",
            strong: "Managed a process re-engineering project to improve and consolidate end-to-end service processes; restructured communication flow among 10 departments and cut down paperwork by 75%."
          },
          fixSuggestion: "Quantify your achievements using numbers, percentages, and dollar amounts.",
          keywords: ["%"]
        },
        {
          title: "Awards/Recognition",
          status: "warning",
          description: "No notable awards or special recognition section found.",
          explanation: "Awards serve as third-party validation of your skills. Even minor recognitions can differentiate you from other candidates with similar experience levels.",
          fixSuggestion: "Add an 'Awards & Honors' section to highlight your achievements.",
          keywords: ["Award", "Honor", "Certificate"]
        }
      ]
    },
    {
      id: 'credibility',
      label: 'Credibility',
      score: 100,
      description: 'Authenticity and trustworthiness of the profile.',
      issues: [
        { title: "Verified Links", status: "success", description: "LinkedIn and GitHub Profile links are active.", keywords: ["linkedin", "github"] },
        { title: "Employment Gaps", status: "success", description: "No unexplained large gaps in employment history.", keywords: ["2023", "2024"] }
      ]
    }
  ];

  const [categories, setCategories] = useState<Category[]>(initialCategories);

  // Derive Overall Score from Categories
  const overallScore = useMemo(() => {
    const total = categories.reduce((acc, cat) => acc + cat.score, 0);
    return Math.round(total / categories.length);
  }, [categories]);

  const [selectedCategory, setSelectedCategory] = useState<Category>(initialCategories[0]);
  const [activeIssue, setActiveIssue] = useState<string | null>(null);

  // Define AI Findings (Keywords to search and highlight)
  interface Finding {
    keyword: string;
    type: 'warning' | 'success' | 'info';
    message: string;
    suggestions?: string[];
    currentSuggestionIndex?: number;
  }

  const [aiFindings, setAiFindings] = useState<Finding[]>([]);

  const handleRegenerate = (keyword: string) => {
    toast.success("Regenerating AI suggestion...");
    setTimeout(() => {
      setAiFindings(prev => prev.map(f => {
        if (f.keyword === keyword) {
          // Cycle through suggestions or generate a variant (mock)
          const suggestions = f.suggestions && f.suggestions.length > 0
            ? f.suggestions
            : [f.message, "Alternative phrasing: " + f.message, "Concise variant: " + f.message];

          const nextIndex = ((f.currentSuggestionIndex || 0) + 1) % suggestions.length;

          return {
            ...f,
            suggestions,
            currentSuggestionIndex: nextIndex,
            message: suggestions[nextIndex]
          };
        }
        return f;
      }));
    }, 600);
  };

  const handleRegenerateIssue = (catId: string, issueIndex: number, keywords: string[]) => {
    toast.success("Regenerating suggestion...");

    // 1. Update the UI text for the issue (Description)
    setCategories(prevCats => prevCats.map(cat => {
      if (cat.id === catId) {
        const newIssues = [...cat.issues];
        const issue = newIssues[issueIndex];

        // Cycle through alternatives if available
        if (issue.alternatives && issue.alternatives.length > 0) {
          const nextIndex = ((issue.currentAltIndex || 0) + 1) % issue.alternatives.length;

          const newDesc = issue.alternatives[nextIndex];

          newIssues[issueIndex] = {
            ...issue,
            description: newDesc,
            currentAltIndex: nextIndex
          };
        }
        return { ...cat, issues: newIssues };
      }
      return cat;
    }));

    // 2. Update AI findings (hidden/tooltip logic)
    if (!keywords || keywords.length === 0) return;

    setTimeout(() => {
      setAiFindings(prev => prev.map(f => {
        if (keywords.includes(f.keyword)) {
          const suggestions = f.suggestions && f.suggestions.length > 0
            ? f.suggestions
            : [f.message, "Alternative phrasing: " + f.message, "Concise variant: " + f.message];

          const nextIndex = ((f.currentSuggestionIndex || 0) + 1) % suggestions.length;
          return {
            ...f,
            suggestions,
            currentSuggestionIndex: nextIndex,
            message: suggestions[nextIndex]
          };
        }
        return f;
      }));
    }, 300);
  };

  const handleFixIssue = (catId: string, issueIndex: number) => {
    toast.success("Applying recommended changes...");

    setTimeout(() => {
      // 1. Update Categories State (Score)
      setCategories(prevCats => prevCats.map(cat => {
        if (cat.id === catId) {
          const newIssues = [...cat.issues];
          const issue = newIssues[issueIndex];

          // Only update if not already fixed
          if (issue.status !== 'success') {
            issue.status = 'success';
            issue.description = issue.fixSuggestion || "Issue resolved successfully.";

            // Smart Score Calculation
            const totalIssues = newIssues.length;
            const fixedIssues = newIssues.filter(i => i.status === 'success').length;

            let newScore = cat.score;
            if (fixedIssues === totalIssues) {
              newScore = 100; // Perfect score if all issues fixed
            } else {
              // Proportional boost for partial fixes
              newScore = Math.min(95, cat.score + 15);
            }
            cat.score = newScore;

            // 2. Also Update AI Findings to show Green Highlight
            setAiFindings(prev => prev.map(f =>
              issue.keywords.includes(f.keyword)
                ? { ...f, type: 'success', message: "Issue resolved successfully." }
                : f
            ));
          }

          return { ...cat, issues: newIssues };
        }
        return cat;
      }));

      toast.success("Issue fixed! Score updated.");
    }, 800);

  };

  const handleIssueClick = (issue: any) => {
    setActiveIssue(issue.title);

    // If there are keywords, update findings and trigger highlight
    if (issue.keywords && issue.keywords.length > 0) {
      // Map keywords to findings format
      const newFindings = issue.keywords.map((kw: string) => ({
        keyword: kw,
        type: issue.status, // 'warning' | 'success' | 'info' | 'error'
        message: issue.description,
        suggestions: issue.fixSuggestion
          ? [issue.fixSuggestion, `Alternative: ${issue.fixSuggestion}`, `Concise: ${issue.fixSuggestion}`] // Mock variations
          : [],
        currentSuggestionIndex: 0
      }));

      // Update state (this will cause renderHighlights to use new colors/messages)
      // Note: 'error' isn't in Finding type, so we might need to map it or update Finding type.
      // The current Finding type is 'warning' | 'success' | 'info'. 'error' is used in categories.
      // We should map 'error' to 'warning' or update the type. 
      // Let's assume 'error' maps to 'warning' for visual consistency in findings if type is strict.

      const safeFindings = newFindings.map((f: any) => ({
        ...f,
        type: f.type === 'error' ? 'warning' : f.type
      }));

      setAiFindings(safeFindings as Finding[]);



      toast.info(`Highlighting: ${issue.title}`);
    } else {
      toast.info("No text to highlight for this section.");
    }
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


  // Trigger search on mount
  useEffect(() => {
    if (highlight) {
      // Small timeout to ensure PDF is rendered
      const timer = setTimeout(() => {
        highlight(aiFindings.map(f => f.keyword));
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [highlight, aiFindings]);

  const handleOptimize = () => {
    const promise = new Promise((resolve) => setTimeout(resolve, 2000));

    toast.promise(promise, {
      loading: 'AI is analyzing and optimizing your CV structure...',
      success: () => {
        setCategories(prev => prev.map(cat => ({
          ...cat,
          score: 100, // Perfect score after optimization
          issues: cat.issues.map(issue => ({
            ...issue,
            status: 'success' as const, // Cast to literal type if needed, though mostly inferred
            description: issue.fixSuggestion || "Optimized by AI to meet industry standards."
          }))
        })));
        return 'CV Analysis Optimized! All critical issues resolved.';
      },
      error: 'Optimization failed'
    });
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

          {/* LEFT: Navigation (Sidebar) */}
          <div className="lg:col-span-2 flex flex-col max-h-full space-y-4">

            <div className="bg-white rounded-xl shadow-sm border border-border flex flex-col overflow-hidden h-full">
              {/* Overall Score Area */}
              <div className="p-6 border-b border-border flex flex-col items-center justify-center bg-slate-50/50">
                <div className="relative w-24 h-24 flex items-center justify-center">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle className="text-muted/20" strokeWidth="8" stroke="currentColor" fill="transparent" r="42" cx="48" cy="48" />
                    <circle
                      className={`${overallScore >= 70 ? 'text-green-500' : overallScore >= 50 ? 'text-amber-500' : 'text-red-500'} transition-all duration-1000 ease-out`}
                      strokeWidth="8"
                      strokeDasharray={264}
                      strokeDashoffset={264 - (264 * overallScore) / 100}
                      strokeLinecap="round"
                      stroke="currentColor"
                      fill="transparent"
                      r="42"
                      cx="48"
                      cy="48"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-2xl font-bold text-foreground">{overallScore}</span>
                    <span className="text-[8px] text-muted-foreground uppercase tracking-widest font-semibold mt-0.5">Overall</span>
                  </div>
                </div>
              </div>

              {/* Navigation Menu */}
              <div className="flex-1 overflow-y-auto p-2 space-y-2">
                {/* Critical Fixes Section */}
                <div className="space-y-1">
                  <div className="pl-3 py-2 text-xs font-semibold text-red-600/80 uppercase tracking-wider flex items-center gap-2">
                    <AlertCircle className="h-3 w-3" />
                    Critical Fixes
                  </div>
                  {categories.filter(c => c.score < 100).map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat)}
                      className={cn(
                        "w-full flex items-center justify-between p-3 text-sm transition-all rounded-lg",
                        selectedCategory?.id === cat.id
                          ? "bg-red-50 text-red-700 font-medium border border-red-100 ring-1 ring-red-100"
                          : "text-muted-foreground hover:bg-muted/50 hover:text-foreground border border-transparent"
                      )}
                    >
                      <div className="flex items-center gap-3 overflow-hidden">
                        <span className={cn(
                          "flex items-center justify-center w-6 h-6 rounded text-[10px] font-bold shrink-0",
                          cat.score >= 50 ? "bg-amber-100 text-amber-700" : "bg-red-100 text-red-700"
                        )}>
                          {cat.score}
                        </span>
                        <span className="truncate">{cat.label}</span>
                      </div>
                      <div className="text-muted-foreground">
                        <ArrowLeft className={cn("h-4 w-4 rotate-180 opacity-0 transition-opacity", selectedCategory?.id === cat.id && "opacity-100")} />
                      </div>
                    </button>
                  ))}
                </div>

                {/* Passed Section */}
                <div className="space-y-1">
                  <div className="pl-3 py-2 text-xs font-semibold text-green-600/80 uppercase tracking-wider flex items-center gap-2">
                    <CheckCircle2 className="h-3 w-3" />
                    Passed Checks
                  </div>
                  {categories.filter(c => c.score === 100).map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat)}
                      className={cn(
                        "w-full flex items-center justify-between p-3 text-sm transition-all rounded-lg",
                        selectedCategory?.id === cat.id
                          ? "bg-green-50 text-green-700 font-medium border border-green-100 ring-1 ring-green-100"
                          : "text-muted-foreground hover:bg-muted/50 hover:text-foreground border border-transparent"
                      )}
                    >
                      <div className="flex items-center gap-3 overflow-hidden">
                        <span className="flex items-center justify-center w-6 h-6 rounded bg-green-100 text-green-700 text-[10px] font-bold shrink-0">
                          {cat.score}
                        </span>
                        <span className="truncate">{cat.label}</span>
                      </div>
                      <div className="text-muted-foreground">
                        <ArrowLeft className={cn("h-4 w-4 rotate-180 opacity-0 transition-opacity", selectedCategory?.id === cat.id && "opacity-100")} />
                      </div>
                    </button>
                  ))}
                </div>
              </div>
              {/* Optimize Button (Footer) */}
              <div className="p-4 border-t border-border bg-slate-50">
                {tier === 'free' ? (
                  <Button
                    size="lg"
                    className="w-full bg-slate-100 hover:bg-slate-200 text-slate-500 shadow-sm font-semibold border border-slate-200 text-xs"
                    onClick={() => navigate('/candidate/upgrade')}
                  >
                    <Lock className="h-3 w-3 mr-2" /> Unlock
                  </Button>
                ) : (
                  <Button
                    size="lg"
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm font-semibold text-xs"
                    onClick={handleOptimize}
                  >
                    <Sparkles className="h-3 w-3 mr-2" /> Optimize
                  </Button>
                )}
              </div>
            </div>
          </div>

          {/* MIDDLE: Detailed Analysis */}
          <div className="lg:col-span-4 flex flex-col h-full bg-white rounded-xl shadow-sm border border-border overflow-hidden">
            {selectedCategory ? (
              <>
                <div className="p-6 border-b border-border bg-slate-50/50">
                  <div className="flex items-center justify-between mb-2">
                    <h2 className="text-xl font-bold text-slate-900">{selectedCategory.label}</h2>
                    <span className={cn(
                      "px-3 py-1 rounded-full text-sm font-bold",
                      selectedCategory.score >= 80 ? "bg-green-100 text-green-700" :
                        selectedCategory.score >= 50 ? "bg-amber-100 text-amber-700" : "bg-red-100 text-red-700"
                    )}>
                      Score: {selectedCategory.score}
                    </span>
                  </div>
                  <p className="text-slate-600 text-sm">{selectedCategory.description}</p>
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/30">
                  {tier === 'free' && selectedCategory.score < 100 ? (
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
                            <Lock className="h-5 w-5 text-purple-600" />
                          </div>
                          <h4 className="font-bold text-slate-900 mb-2">Detailed Reports is a Premium Feature</h4>
                          <p className="text-xs text-muted-foreground mb-4">Upgrade to Premium to access detailed analytics.</p>
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
                    <div className="space-y-4">
                      {selectedCategory.issues.map((issue: any, idx: number) => (
                        <div
                          key={idx}
                          className={cn(
                            "bg-white p-4 rounded-lg border shadow-sm transition-all cursor-pointer hover:shadow-md",
                            activeIssue === issue.title ? "border-indigo-500 ring-1 ring-indigo-500 bg-indigo-50/10" : "border-border"
                          )}
                          onClick={() => handleIssueClick(issue)}
                        >
                          <div className="flex items-start gap-3">
                            {issue.status === 'success' && <div className="p-1.5 bg-green-100 text-green-600 rounded-full mt-0.5 shrink-0"><CheckCircle2 className="h-4 w-4" /></div>}
                            {issue.status === 'warning' && <div className="p-1.5 bg-amber-100 text-amber-600 rounded-full mt-0.5 shrink-0"><AlertCircle className="h-4 w-4" /></div>}
                            {issue.status === 'error' && <div className="p-1.5 bg-red-100 text-red-600 rounded-full mt-0.5 shrink-0"><XCircle className="h-4 w-4" /></div>}

                            <div className="flex-1 min-w-0">
                              <h4 className="font-semibold text-sm mb-1 text-slate-900 leading-snug">{issue.title}</h4>
                              <p className="text-sm text-slate-600 leading-relaxed mb-3">
                                {issue.description}
                              </p>

                              {/* Detailed Explanation Section */}
                              {issue.explanation && (
                                <div className="mb-4 mt-3">
                                  <div className="bg-blue-50/50 p-4 rounded-lg border border-blue-100">
                                    <h5 className="font-semibold text-blue-900 text-xs mb-2 flex items-center gap-1.5 uppercase tracking-wide">
                                      <Info className="w-3.5 h-3.5" />
                                      Why this matters
                                    </h5>
                                    <p className="text-sm text-slate-700 leading-relaxed">
                                      {issue.explanation}
                                    </p>
                                  </div>

                                  {/* Examples Comparison */}
                                  {issue.examples && (
                                    <div className="mt-4 grid gap-3">
                                      <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider ml-1">Example</div>

                                      {/* Weaker Example */}
                                      <div className="relative group">
                                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-red-400 rounded-l-md"></div>
                                        <div className="bg-red-50 p-3 pl-4 rounded-r-md border border-l-0 border-red-100">
                                          <span className="text-[10px] font-bold text-red-600 bg-red-100 px-1.5 py-0.5 rounded uppercase tracking-wide mb-1.5 inline-block">
                                            Weaker
                                          </span>
                                          <p className="text-sm text-slate-700 italic">
                                            "{issue.examples.weak}"
                                          </p>
                                        </div>
                                      </div>

                                      {/* Stronger Example */}
                                      <div className="relative group">
                                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-green-500 rounded-l-md"></div>
                                        <div className="bg-green-50 p-3 pl-4 rounded-r-md border border-l-0 border-green-100 shadow-sm">
                                          <span className="text-[10px] font-bold text-green-700 bg-green-100 px-1.5 py-0.5 rounded uppercase tracking-wide mb-1.5 inline-block">
                                            Stronger
                                          </span>
                                          <p className="text-sm text-slate-800 font-medium">
                                            "{issue.examples.strong}"
                                          </p>
                                        </div>
                                      </div>
                                    </div>
                                  )}
                                </div>
                              )}

                              {issue.status !== 'success' && (
                                <div className="flex justify-start gap-2">
                                  <Button variant="outline" size="sm" className="h-7 text-xs px-3 text-blue-600 border-blue-200 hover:text-blue-700 hover:bg-blue-50"
                                    onClick={(e) => {
                                      e.stopPropagation(); // Prevent triggering the row click
                                      handleFixIssue(selectedCategory.id, idx);
                                    }}
                                  >
                                    Fix this issue <ChevronDown className="h-3 w-3 ml-1" />
                                  </Button>

                                  <Button variant="outline" size="sm" className="h-7 text-xs px-3 text-slate-600 border-slate-200 hover:text-slate-700 hover:bg-slate-50"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleRegenerateIssue(selectedCategory.id, idx, issue.keywords);
                                    }}
                                  >
                                    <Sparkles className="h-3 w-3 mr-1.5 text-indigo-500" />
                                    Re-generated
                                  </Button>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center p-6 text-muted-foreground">
                <Sparkles className="h-12 w-12 mb-4 text-slate-300" />
                <p>Select a category to view detailed analysis.</p>
              </div>
            )}
          </div>

          {/* RIGHT: PDF Viewer (Expanded) */}
          <div className="lg:col-span-6 bg-white rounded-xl shadow-lg border border-border overflow-hidden flex flex-col h-full relative z-0">
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
                  defaultScale={1.3}
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

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
  FileText
} from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { toast } from 'sonner';

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

  // Mock Data mimicking "Resume Worded" structure
  const overallScore = 72;

  const summaryCategory = {
    id: 'summary',
    label: 'Executive Summary',
    score: overallScore,
    description: 'High-level analysis and key takeaways from your CV.',
    issues: [], // Empty for compatibility
    strengths: [
      "Excellent use of action verbs",
      "Clear contact information",
      "Consistent formatting throughout"
    ],
    weaknesses: [
      "Lack of quantified metrics",
      "Missing key technical keywords",
      "Soft skills section is sparse"
    ],
    conclusion: "Your CV has a strong foundation with good formatting and clear language. However, to pass ATS filters for top tech companies, you need to focus on quantifying your impact (numbers!) and ensuring you list specific frameworks mentioned in job descriptions."
  };

  const categories = [
    {
      id: 'completeness',
      label: 'Completeness',
      score: 85,
      description: 'Evaluates the completeness of all CV sections.',
      issues: [
        { title: "Contact Information", status: "success", description: "Email, phone number, and LinkedIn link are present." },
        { title: "Education Section", status: "success", description: "Degrees and institutions are clearly listed." },
        { title: "Personal Projects", status: "warning", description: "Consider adding links to Demos or Repositories for your projects." }
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
        { title: "Line Length", status: "warning", description: "Some bullet points are too long (> 2 lines). Try splitting them." },
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
        { title: "Action Verbs", status: "warning", description: "Start each point with a strong action verb. Avoid 'Responsible for...'." },
        { title: "Job Details", status: "success", description: "Technologies used are described in good detail." },
        { title: "Results/Achievements", status: "error", description: "Missing specific results (achievements) in past projects." }
      ]
    },
    {
      id: 'consistency',
      label: 'Consistency & Logic',
      score: 80,
      description: 'Uniformity in formatting and content flow.',
      issues: [
        { title: "Date Formatting", status: "success", description: "Consistent MM/YYYY format throughout the document." },
        { title: "Punctuation", status: "warning", description: "Check ending punctuation of bullet points (inconsistent periods)." }
      ]
    },
    {
      id: 'skill_presentation',
      label: 'Skill Presentation',
      score: 70,
      description: 'How technical skills are organized and highlighted.',
      issues: [
        { title: "Skill Grouping", status: "success", description: "Frontend and Backend skills are clearly separated." },
        { title: "Relevance", status: "warning", description: "Move the most critical skills to the top of the list." },
        { title: "Keywords", status: "error", description: "Missing key JD keywords (e.g., Docker, CI/CD)." }
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
        { title: "Quantified Metrics", status: "error", description: "Only 10% of experience bullets have numbers. Aim for at least 30%." },
        { title: "Awards/Recognition", status: "warning", description: "No notable awards or special recognition section found." }
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

  const [selectedCategory, setSelectedCategory] = useState<any>(summaryCategory);

  // Define AI Findings (Keywords to search and highlight)
  const aiFindings = useMemo(() => [
    {
      keyword: "Software Engineer",
      type: 'warning' as const,
      message: "Consider being more specific. Try 'Full-Stack Software Engineer' to match JD."
    },
    {
      keyword: "ReactJS",
      type: 'success' as const,
      message: "Great! This is a high-demand skill in the current market."
    },
    {
      keyword: "Java",
      type: 'info' as const,
      message: "Consider adding specific frameworks you know (e.g., Spring Boot)."
    }
  ], []);

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
                    <div className="space-y-1">
                      <h4 className="text-sm font-semibold flex items-center gap-2">
                        <Sparkles className={cn("h-4 w-4", iconColor)} />
                        AI Suggestion
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {finding.message}
                      </p>
                      <div className="flex items-center pt-2">
                        <Button size="sm" variant="outline" className="h-7 text-xs">Apply Fix</Button>
                      </div>
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
          <Button variant="outline" size="sm" className="h-8 text-xs bg-white hover:bg-slate-50">
            <Upload className="h-3 w-3 mr-1.5" /> Re-upload
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-full pb-10">

          {/* LEFT: Navigation & Details (Expandable) */}
          <div className="lg:col-span-5 flex flex-col h-full space-y-4">

            <div className="bg-white rounded-xl shadow-sm border border-border flex-1 flex flex-col overflow-hidden">
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

                {/* Summary Section */}
                <div className="rounded-lg border border-transparent transition-all overflow-hidden">
                  <button
                    onClick={() => setSelectedCategory(selectedCategory.id === 'summary' ? null : summaryCategory)}
                    className={cn(
                      "w-full flex items-center justify-between p-3 text-sm transition-all",
                      selectedCategory?.id === 'summary'
                        ? "bg-indigo-50 text-indigo-700 font-medium"
                        : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <div className={cn("p-1.5 rounded-md", selectedCategory?.id === 'summary' ? "bg-indigo-100" : "bg-slate-100")}>
                        <FileText className="h-4 w-4" />
                      </div>
                      <span className="truncate">Executive Summary</span>
                    </div>
                    {selectedCategory?.id === 'summary' ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                  </button>

                  {/* Summary Expanded Content */}
                  {selectedCategory?.id === 'summary' && (
                    <div className="p-4 bg-indigo-50/10 border-t border-indigo-100 space-y-4">
                      <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                        <h3 className="font-semibold text-slate-900 mb-2 text-xs uppercase tracking-wider">Professional Verdict</h3>
                        <p className="text-sm text-slate-700 leading-relaxed">
                          {summaryCategory.conclusion}
                        </p>
                      </div>

                      <div className="space-y-3">
                        <h3 className="font-semibold text-green-700 flex items-center gap-2 text-sm">
                          <CheckCircle2 className="h-4 w-4" /> Key Strengths
                        </h3>
                        <ul className="space-y-2">
                          {summaryCategory.strengths.map((item: string, i: number) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                              <span className="w-1.5 h-1.5 rounded-full bg-green-500 mt-1.5 shrink-0" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="space-y-3">
                        <h3 className="font-semibold text-red-700 flex items-center gap-2 text-sm">
                          <AlertCircle className="h-4 w-4" /> Major Weaknesses
                        </h3>
                        <ul className="space-y-2">
                          {summaryCategory.weaknesses.map((item: string, i: number) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                              <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 shrink-0" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="pt-2">
                        <Button
                          size="sm"
                          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white text-xs"
                          onClick={() => {
                            // Find first critical issue
                            const firstCritical = categories.find(c => c.score < 80);
                            if (firstCritical) setSelectedCategory(firstCritical);
                          }}
                        >
                          Start Fixing Critical Issues &rarr;
                        </Button>
                      </div>
                    </div>
                  )}
                </div>

                <div className="h-px bg-border mx-2" />

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
                        <div className="p-3 bg-red-50/10 border-t border-red-100 space-y-3">
                          <p className="text-xs text-muted-foreground leading-relaxed px-1">
                            {cat.description}
                          </p>
                          <div className="space-y-3">
                            {cat.issues.map((issue: any, idx: number) => (
                              <div key={idx} className="bg-white p-3 rounded-lg border border-border shadow-sm">
                                <div className="flex items-start gap-3">
                                  {issue.status === 'success' && <div className="p-1.5 bg-green-100 text-green-600 rounded-full mt-0.5 shrink-0"><CheckCircle2 className="h-3.5 w-3.5" /></div>}
                                  {issue.status === 'warning' && <div className="p-1.5 bg-amber-100 text-amber-600 rounded-full mt-0.5 shrink-0"><AlertCircle className="h-3.5 w-3.5" /></div>}
                                  {issue.status === 'error' && <div className="p-1.5 bg-red-100 text-red-600 rounded-full mt-0.5 shrink-0"><XCircle className="h-3.5 w-3.5" /></div>}

                                  <div className="flex-1 min-w-0">
                                    <h4 className="font-semibold text-sm mb-0.5 truncate">{issue.title}</h4>
                                    <p className="text-xs text-muted-foreground leading-relaxed mb-2">
                                      {issue.description}
                                    </p>

                                    <div className="flex justify-end">
                                      <Button variant="ghost" size="sm" className="h-6 text-[10px] px-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50">
                                        Fix this <ChevronDown className="h-2.5 w-2.5 ml-1" />
                                      </Button>
                                    </div>
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
                        <div className="p-3 bg-green-50/10 border-t border-green-100 space-y-3">
                          <p className="text-xs text-muted-foreground leading-relaxed px-1">
                            {cat.description}
                          </p>
                          <div className="space-y-3">
                            {cat.issues.map((issue: any, idx: number) => (
                              <div key={idx} className="bg-white p-3 rounded-lg border border-border shadow-sm">
                                <div className="flex items-start gap-3">
                                  {issue.status === 'success' && <div className="p-1.5 bg-green-100 text-green-600 rounded-full mt-0.5 shrink-0"><CheckCircle2 className="h-3.5 w-3.5" /></div>}
                                  {issue.status === 'warning' && <div className="p-1.5 bg-amber-100 text-amber-600 rounded-full mt-0.5 shrink-0"><AlertCircle className="h-3.5 w-3.5" /></div>}
                                  {issue.status === 'error' && <div className="p-1.5 bg-red-100 text-red-600 rounded-full mt-0.5 shrink-0"><XCircle className="h-3.5 w-3.5" /></div>}

                                  <div className="flex-1 min-w-0">
                                    <h4 className="font-semibold text-sm mb-0.5 truncate">{issue.title}</h4>
                                    <p className="text-xs text-muted-foreground leading-relaxed mb-1">
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
                <Button size="lg" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm font-semibold">
                  <Sparkles className="h-4 w-4 mr-2" /> Optimize CV
                </Button>
              </div>

            </div>
          </div>

          {/* RIGHT: PDF Viewer (Expanded) */}
          <div className="lg:col-span-7 bg-white rounded-xl shadow-lg border border-border overflow-hidden flex flex-col h-full relative z-0">
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
                  defaultScale={1.25}
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

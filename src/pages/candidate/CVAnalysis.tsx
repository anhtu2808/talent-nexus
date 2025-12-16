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
      id: 'searchability',
      label: 'Searchability',
      score: 85,
      description: 'Ensure your resume gets found by ATS algorithms.',
      issues: [
        { title: "Keywords detected", status: "success", description: "Found 15/20 essential keywords for this role." },
        { title: "File format", status: "success", description: "PDF format is optimal." },
        { title: "Contact info", status: "success", description: "Email and Phone are clear." }
      ]
    },
    {
      id: 'hard_skills',
      label: 'Hard Skills',
      score: 40,
      description: 'Technical skills required for the job.',
      issues: [
        { title: "Missing Core Frameworks", status: "error", description: "Job requires 'React' and 'Node.js' but they appear low in frequency." },
        { title: "Tools Section", status: "warning", description: "Consider grouping tools by category (DevOps, Frontend, etc.)." }
      ]
    },
    {
      id: 'soft_skills',
      label: 'Soft Skills',
      score: 60,
      description: 'Interpersonal skills and leadership.',
      issues: [
        { title: "Leadership words", status: "warning", description: "Try words like 'Led', 'Mentored', 'Spearheaded' to show leadership." },
        { title: "Communication", status: "success", description: "Good use of 'Collaborated' and 'Presented'." },
        { title: "Teamwork", status: "success", description: "Cross-functional team experience is well highlighted." }
      ]
    },
    {
      id: 'recruiter_check',
      label: 'Recruiter Tips',
      score: 75,
      description: 'What human recruiters look for in 6 seconds.',
      issues: [
        { title: "Bullet point length", status: "warning", description: "Some bullet points are too long. Keep them under 2 lines." },
        { title: "Active Voice", status: "success", description: "Majority of sentences use active voice." },
        { title: "Avoid Clichés", status: "success", description: "No 'Go-getter' or 'Hard worker' clichés found." }
      ]
    },
    {
      id: 'formatting',
      label: 'Formatting',
      score: 100,
      description: 'Visual layout and structure.',
      issues: [
        { title: "Section Headers", status: "success", description: "Standard headers (Experience, Education) detected." },
        { title: "Date Consistency", status: "success", description: "Dates are formatted consistently (MM/YYYY)." },
        { title: "Margins", status: "success", description: "Margins are standard size." }
      ]
    },
    {
      id: 'impact',
      label: 'Quantify Impact',
      score: 30,
      description: 'Use numbers to prove your value.',
      issues: [
        { title: "Lack of metrics", status: "error", description: "Only 14% of your bullet points include numbers. Aim for 40%+." },
        { title: "Action verbs", status: "warning", description: "Start every bullet with a strong action verb." }
      ]
    },
    {
      id: 'brevity',
      label: 'Brevity & Style',
      score: 90,
      description: 'Conciseness and formatting.',
      issues: [
        { title: "Length efficient", status: "success", description: "1 page is perfect for your experience level." },
        { title: "Consistent fonts", status: "success", description: "Font usage is professional and consistent." }
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

        {/* Back Link Moved Outside Grid */}
        <Link
          to="/candidate/dashboard"
          className="inline-flex items-center text-muted-foreground hover:text-foreground mb-4 transition-colors text-sm"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Link>

        {/* 3-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-full pb-10">

          {/* LEFT: Navigation & Score */}
          <div className="lg:col-span-3 flex flex-col h-full space-y-4">

            <div className="bg-white rounded-xl shadow-sm border border-border flex-1 flex flex-col overflow-hidden">
              {/* Overall Score Area */}
              <div className="p-6 border-b border-border flex flex-col items-center justify-center bg-slate-50/50">
                <div className="relative w-32 h-32 flex items-center justify-center mb-4">
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
                <div className="grid grid-cols-2 gap-2 w-full">
                  <Button variant="outline" size="sm" className="w-full text-xs">
                    <Upload className="h-3 w-3 mr-1.5" /> Re-upload
                  </Button>
                  <Button size="sm" className="w-full text-xs bg-indigo-600 hover:bg-indigo-700 text-white">
                    <Sparkles className="h-3 w-3 mr-1.5" /> Optimize
                  </Button>
                </div>
              </div>

              {/* Navigation Menu */}
              <div className="flex-1 overflow-y-auto p-2 space-y-4">

                {/* Summary Section Link */}
                <button
                  onClick={() => setSelectedCategory(summaryCategory)}
                  className={cn(
                    "w-full flex items-center justify-between p-3 rounded-lg text-sm transition-all mb-2",
                    selectedCategory.id === 'summary'
                      ? "bg-indigo-50 text-indigo-700 font-medium border border-indigo-100 shadow-sm"
                      : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <div className={cn("p-1.5 rounded-md", selectedCategory.id === 'summary' ? "bg-indigo-100" : "bg-slate-100")}>
                      <FileText className="h-4 w-4" />
                    </div>
                    <span className="truncate">Executive Summary</span>
                  </div>
                </button>

                <div className="h-px bg-border mx-2" />

                {/* Critical Fixes Section */}
                <div>
                  <div className="pl-3 py-2 text-xs font-semibold text-red-600/80 uppercase tracking-wider flex items-center gap-2">
                    <AlertCircle className="h-3 w-3" />
                    Critical Fixes
                  </div>
                  <div className="space-y-1">
                    {categories.filter(c => c.score < 80).map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => setSelectedCategory(cat)}
                        className={cn(
                          "w-full flex items-center justify-between p-3 rounded-lg text-sm transition-all",
                          selectedCategory.id === cat.id
                            ? "bg-red-50 text-red-700 font-medium border border-red-100 shadow-sm"
                            : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                        )}
                      >
                        <span className="flex-1 text-left truncate mr-2">{cat.label}</span>
                        <span className={cn(
                          "px-2 py-0.5 rounded text-xs font-bold min-w-[1.5rem] text-center",
                          cat.score >= 50 ? "bg-amber-100 text-amber-700" : "bg-red-100 text-red-700"
                        )}>
                          {cat.score}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Passed Section */}
                <div>
                  <div className="pl-3 py-2 text-xs font-semibold text-green-600/80 uppercase tracking-wider flex items-center gap-2">
                    <CheckCircle2 className="h-3 w-3" />
                    Passed Checks
                  </div>
                  <div className="space-y-1">
                    {categories.filter(c => c.score >= 80).map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => setSelectedCategory(cat)}
                        className={cn(
                          "w-full flex items-center justify-between p-3 rounded-lg text-sm transition-all",
                          selectedCategory.id === cat.id
                            ? "bg-green-50 text-green-700 font-medium border border-green-100 shadow-sm"
                            : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                        )}
                      >
                        <span className="flex-1 text-left truncate mr-2">{cat.label}</span>
                        <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded text-xs font-bold min-w-[1.5rem] text-center">
                          {cat.score}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* MIDDLE: Detail View */}
          <div className="lg:col-span-4 bg-white rounded-xl shadow-sm border border-border flex flex-col h-full overflow-hidden">

            {selectedCategory.id === 'summary' ? (
              // SUMMARY VIEW
              <div className="h-full flex flex-col">
                <div className="p-6 border-b border-border bg-indigo-50/30">
                  <h2 className="text-2xl font-bold text-foreground mb-2 flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-indigo-600" />
                    Executive Summary
                  </h2>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {selectedCategory.description}
                  </p>
                </div>

                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                    <h3 className="font-semibold text-slate-900 mb-3">Professional Verdict</h3>
                    <p className="text-sm text-slate-700 leading-relaxed">
                      {selectedCategory.conclusion}
                    </p>
                  </div>

                  <div className="space-y-3">
                    <h3 className="font-semibold text-green-700 flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4" /> Key Strengths
                    </h3>
                    <ul className="space-y-2">
                      {selectedCategory.strengths.map((item: string, i: number) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                          <span className="w-1.5 h-1.5 rounded-full bg-green-500 mt-1.5 shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-3">
                    <h3 className="font-semibold text-red-700 flex items-center gap-2">
                      <AlertCircle className="h-4 w-4" /> Major Weaknesses
                    </h3>
                    <ul className="space-y-2">
                      {selectedCategory.weaknesses.map((item: string, i: number) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                          <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-4">
                    <Button
                      className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
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
              </div>
            ) : (
              // STANDARD CATEGORY VIEW (Issues List)
              <>
                <div className="p-6 border-b border-border bg-slate-50/30">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-2">
                    <h2 className="text-2xl font-bold text-foreground">{selectedCategory.label}</h2>
                    <div className="relative w-12 h-12 flex items-center justify-center">
                      <svg className="w-full h-full transform -rotate-90">
                        <circle className="text-muted/20" strokeWidth="4" stroke="currentColor" fill="transparent" r="20" cx="24" cy="24" />
                        <circle
                          className={`${selectedCategory.score >= 70 ? 'text-green-500' : selectedCategory.score >= 50 ? 'text-amber-500' : 'text-red-500'}`}
                          strokeWidth="4"
                          strokeDasharray={125}
                          strokeDashoffset={125 - (125 * selectedCategory.score) / 100}
                          strokeLinecap="round"
                          stroke="currentColor"
                          fill="transparent"
                          r="20"
                          cx="24"
                          cy="24"
                        />
                      </svg>
                      <span className="absolute text-sm font-bold">{selectedCategory.score}</span>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {selectedCategory.description}
                  </p>
                </div>

                {/* Issues List */}
                <div className="p-4 flex-1 overflow-y-auto space-y-4 bg-muted/10">
                  {selectedCategory.issues.map((issue: any, idx: number) => (
                    <div key={idx} className="bg-white p-4 rounded-xl border border-border shadow-sm hover:shadow-md transition-shadow">
                      <div className="flex items-start gap-4">
                        {issue.status === 'success' && <div className="p-2 bg-green-100 text-green-600 rounded-full mt-1"><CheckCircle2 className="h-5 w-5" /></div>}
                        {issue.status === 'warning' && <div className="p-2 bg-amber-100 text-amber-600 rounded-full mt-1"><AlertCircle className="h-5 w-5" /></div>}
                        {issue.status === 'error' && <div className="p-2 bg-red-100 text-red-600 rounded-full mt-1"><XCircle className="h-5 w-5" /></div>}

                        <div className="flex-1">
                          <h4 className="font-semibold text-base mb-1">{issue.title}</h4>
                          <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                            {issue.description}
                          </p>

                          <div className="flex justify-end">
                            <Button variant="ghost" size="sm" className="h-8 text-xs text-blue-600 hover:text-blue-700 hover:bg-blue-50">
                              Fix this <ChevronDown className="h-3 w-3 ml-1" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}

          </div>

          {/* RIGHT: PDF Viewer */}
          <div className="lg:col-span-5 bg-white rounded-xl shadow-lg border border-border overflow-hidden flex flex-col h-full relative z-0">
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
                  defaultScale={0.8}
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

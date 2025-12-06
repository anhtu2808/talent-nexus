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
  const [matchScore, setMatchScore] = useState(55);

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
  // REMOVED useMemo because searchPlugin uses hooks internally
  const searchPluginInstance = searchPlugin({
    keyword: [
      // Load keywords to highlight
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
    setMatchScore(prev => Math.min(prev + 15, 95));
  };

  return (
    <div className="min-h-screen bg-muted/30 flex flex-col">
      <Header />

      <main className="flex-1 w-full px-4 lg:px-8 py-6">
        <Link
          to="/candidate/dashboard"
          className="inline-flex items-center text-muted-foreground hover:text-foreground mb-4 transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Dashboard
        </Link>

        {/* Full Height Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-[calc(100vh-8rem)]">

          {/* Sidebar - Analysis Control */}
          <div className="lg:col-span-3 space-y-4 flex flex-col h-full overflow-hidden">
            <div className="bg-card rounded-xl border border-border p-6 shadow-sm flex-1 flex flex-col overflow-y-auto">
              <div className="text-center mb-6">
                <h3 className="font-semibold text-lg mb-4">Match Rate</h3>
                <div className="relative w-40 h-40 mx-auto flex items-center justify-center">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle className="text-muted/30" strokeWidth="12" stroke="currentColor" fill="transparent" r="70" cx="80" cy="80" />
                    <circle className="text-amber-400" strokeWidth="12" strokeDasharray={440} strokeDashoffset={440 - (440 * matchScore) / 100} strokeLinecap="round" stroke="currentColor" fill="transparent" r="70" cx="80" cy="80" />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-4xl font-bold text-foreground">{matchScore}%</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3 mb-8">
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                  <Upload className="h-4 w-4 mr-2" />
                  Upload & rescan
                </Button>
                <Button onClick={handleOptimize} className="w-full bg-blue-50 text-blue-600 hover:bg-blue-100 border border-blue-200">
                  <Sparkles className="h-4 w-4 mr-2" />
                  One-Click Optimize
                </Button>
              </div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">Searchability</span>
                    <span className="text-blue-600 text-xs font-medium">3 issues to fix</span>
                  </div>
                  <Progress value={70} className="h-2 bg-muted [&>div]:bg-blue-500" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">Hard Skills</span>
                    <span className="text-blue-600 text-xs font-medium">10 issues to fix</span>
                  </div>
                  <Progress value={40} className="h-2 bg-muted [&>div]:bg-red-500" />
                </div>
              </div>
            </div>
          </div>

          {/* Main - PDF Viewer */}
          <div className="lg:col-span-9 bg-white rounded-xl shadow-lg border border-border overflow-hidden flex flex-col h-full relative z-0">

            {/* PDF Viewer Container */}
            <div className="flex-1 relative overflow-hidden">
              <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
                <Viewer
                  fileUrl={resumePdfUrl}
                  plugins={[defaultLayoutPluginInstance, searchPluginInstance]}
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

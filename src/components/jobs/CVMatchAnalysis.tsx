import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Job } from '@/types';
import { cn } from '@/lib/utils';
import {
  AlertCircle,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  FileText,
  Lightbulb,
  Sparkles,
  TrendingUp,
  XCircle,
} from 'lucide-react';
import { useState } from 'react';

interface MatchItem {
  category: 'skill' | 'experience' | 'education' | 'keyword';
  name: string;
  status: 'match' | 'partial' | 'missing';
  cvValue?: string;
  jdValue: string;
  reason: string;
  suggestion?: string;
  importance: 'required' | 'preferred' | 'nice-to-have';
}

interface CVMatchAnalysisProps {
  job: Job;
  matchScore: number;
  onClose: () => void;
  onApply: () => void;
}

// Mock detailed analysis data
const generateMockAnalysis = (job: Job): MatchItem[] => {
  const items: MatchItem[] = [];
  
  // Skills analysis
  const cvSkills = ['React', 'TypeScript', 'Node.js', 'Python', 'AWS', 'Git', 'SQL'];
  
  job.skills.forEach((skill) => {
    const hasSkill = cvSkills.includes(skill);
    const hasPartial = skill === 'PostgreSQL' && cvSkills.includes('SQL');
    
    items.push({
      category: 'skill',
      name: skill,
      status: hasSkill ? 'match' : hasPartial ? 'partial' : 'missing',
      cvValue: hasSkill ? skill : hasPartial ? 'SQL' : undefined,
      jdValue: skill,
      reason: hasSkill 
        ? `Bạn có ${skill} trong CV - phù hợp yêu cầu JD` 
        : hasPartial 
          ? `Bạn có SQL nhưng JD yêu cầu cụ thể ${skill}`
          : `JD yêu cầu ${skill} nhưng không tìm thấy trong CV`,
      suggestion: hasSkill 
        ? undefined 
        : hasPartial 
          ? `Thêm kinh nghiệm cụ thể với ${skill} vào CV`
          : `Bổ sung kỹ năng ${skill} hoặc các dự án liên quan`,
      importance: 'required',
    });
  });

  // Experience analysis
  items.push({
    category: 'experience',
    name: 'Số năm kinh nghiệm',
    status: 'match',
    cvValue: '5+ years',
    jdValue: '3+ years',
    reason: 'CV thể hiện 5+ năm kinh nghiệm, vượt yêu cầu 3+ năm của JD',
    importance: 'required',
  });

  items.push({
    category: 'experience',
    name: 'Kinh nghiệm lĩnh vực',
    status: job.company.includes('FinTech') ? 'missing' : 'partial',
    cvValue: 'E-commerce, Tech startup',
    jdValue: job.company.includes('FinTech') ? 'Banking/Fintech' : 'Tech industry',
    reason: job.company.includes('FinTech') 
      ? 'JD ưu tiên ứng viên có kinh nghiệm Banking/Fintech, CV chưa thể hiện'
      : 'Kinh nghiệm startup tech phù hợp một phần với yêu cầu',
    suggestion: job.company.includes('FinTech') 
      ? 'Highlight bất kỳ dự án nào liên quan đến payment, transaction processing'
      : undefined,
    importance: 'preferred',
  });

  // Education
  items.push({
    category: 'education',
    name: 'Bằng cấp',
    status: 'match',
    cvValue: 'Bachelor of Computer Science - FPT University',
    jdValue: 'Bachelor degree in CS or related field',
    reason: 'Bằng Cử nhân CNTT phù hợp với yêu cầu',
    importance: 'required',
  });

  // Keywords from requirements
  job.requirements.forEach((req, index) => {
    const keywords: Record<string, { has: boolean; cvText?: string }> = {
      'microservices': { has: true, cvText: 'Built microservices architecture' },
      'RESTful APIs': { has: true, cvText: 'Developed RESTful APIs' },
      'GraphQL': { has: false },
      'CI/CD': { has: true, cvText: 'Experience with CI/CD pipelines' },
      'agile': { has: true, cvText: 'Worked in agile environment' },
      'problem-solving': { has: true, cvText: 'Strong problem-solving skills' },
    };

    const foundKeyword = Object.keys(keywords).find(k => 
      req.toLowerCase().includes(k.toLowerCase())
    );

    if (foundKeyword && !items.some(i => i.name === foundKeyword)) {
      const kw = keywords[foundKeyword];
      items.push({
        category: 'keyword',
        name: foundKeyword,
        status: kw.has ? 'match' : 'missing',
        cvValue: kw.cvText,
        jdValue: req,
        reason: kw.has 
          ? `CV có đề cập "${kw.cvText}" phù hợp với yêu cầu`
          : `Yêu cầu "${foundKeyword}" không được tìm thấy trong CV`,
        suggestion: kw.has ? undefined : `Thêm kinh nghiệm liên quan đến ${foundKeyword} vào CV`,
        importance: 'required',
      });
    }
  });

  return items;
};

const CVMatchAnalysis = ({ job, matchScore, onClose, onApply }: CVMatchAnalysisProps) => {
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    skill: true,
    experience: true,
    education: true,
    keyword: true,
  });

  const analysisItems = generateMockAnalysis(job);

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const groupedItems = {
    skill: analysisItems.filter(i => i.category === 'skill'),
    experience: analysisItems.filter(i => i.category === 'experience'),
    education: analysisItems.filter(i => i.category === 'education'),
    keyword: analysisItems.filter(i => i.category === 'keyword'),
  };

  const stats = {
    matched: analysisItems.filter(i => i.status === 'match').length,
    partial: analysisItems.filter(i => i.status === 'partial').length,
    missing: analysisItems.filter(i => i.status === 'missing').length,
    total: analysisItems.length,
  };

  const getCategoryLabel = (cat: string) => {
    switch (cat) {
      case 'skill': return 'Kỹ năng kỹ thuật';
      case 'experience': return 'Kinh nghiệm làm việc';
      case 'education': return 'Học vấn';
      case 'keyword': return 'Từ khóa quan trọng';
      default: return cat;
    }
  };

  const getCategoryIcon = (cat: string) => {
    switch (cat) {
      case 'skill': return <Sparkles className="h-4 w-4" />;
      case 'experience': return <TrendingUp className="h-4 w-4" />;
      case 'education': return <FileText className="h-4 w-4" />;
      case 'keyword': return <AlertCircle className="h-4 w-4" />;
      default: return null;
    }
  };

  return (
    <div className="flex flex-col h-full max-h-[80vh]">
      {/* Header with Score */}
      <div className="flex-shrink-0 p-6 bg-gradient-to-r from-primary/5 to-accent/5 border-b border-border">
        <div className="flex items-center gap-6">
          <div className={cn(
            "relative w-28 h-28 rounded-full flex items-center justify-center",
            matchScore >= 80 ? "bg-green-100" : matchScore >= 60 ? "bg-amber-100" : "bg-red-100"
          )}>
            <svg className="absolute inset-0 w-full h-full transform -rotate-90">
              <circle 
                className="text-muted/20" 
                strokeWidth="8" 
                stroke="currentColor" 
                fill="transparent" 
                r="50" 
                cx="56" 
                cy="56" 
              />
              <circle 
                className={cn(
                  matchScore >= 80 ? "text-green-500" : matchScore >= 60 ? "text-amber-500" : "text-red-500"
                )}
                strokeWidth="8" 
                strokeDasharray={314}
                strokeDashoffset={314 - (314 * matchScore) / 100}
                strokeLinecap="round"
                stroke="currentColor" 
                fill="transparent" 
                r="50" 
                cx="56" 
                cy="56" 
              />
            </svg>
            <span className={cn(
              "text-3xl font-bold",
              matchScore >= 80 ? "text-green-600" : matchScore >= 60 ? "text-amber-600" : "text-red-600"
            )}>
              {matchScore}%
            </span>
          </div>
          
          <div className="flex-1">
            <h2 className="text-xl font-bold mb-2">
              {matchScore >= 80 ? "Phù hợp xuất sắc!" : matchScore >= 60 ? "Phù hợp tốt" : "Cần cải thiện"}
            </h2>
            <p className="text-muted-foreground text-sm mb-4">
              CV của bạn {matchScore >= 80 ? "rất phù hợp" : matchScore >= 60 ? "khá phù hợp" : "cần bổ sung thêm"} với vị trí {job.title}
            </p>
            
            <div className="flex gap-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-green-500" />
                <span><strong>{stats.matched}</strong> Phù hợp</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-amber-500" />
                <span><strong>{stats.partial}</strong> Một phần</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <span><strong>{stats.missing}</strong> Thiếu</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scrollable Analysis Content */}
      <ScrollArea className="flex-1 p-6">
        <div className="space-y-6">
          {Object.entries(groupedItems).map(([category, items]) => {
            if (items.length === 0) return null;
            
            const categoryStats = {
              matched: items.filter(i => i.status === 'match').length,
              total: items.length,
            };
            const categoryScore = Math.round((categoryStats.matched / categoryStats.total) * 100);
            
            return (
              <div key={category} className="border border-border rounded-xl overflow-hidden">
                {/* Category Header */}
                <button
                  onClick={() => toggleSection(category)}
                  className="w-full flex items-center justify-between p-4 bg-muted/30 hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className={cn(
                      "p-2 rounded-lg",
                      categoryScore >= 80 ? "bg-green-100 text-green-600" : 
                      categoryScore >= 50 ? "bg-amber-100 text-amber-600" : 
                      "bg-red-100 text-red-600"
                    )}>
                      {getCategoryIcon(category)}
                    </div>
                    <div className="text-left">
                      <h3 className="font-semibold">{getCategoryLabel(category)}</h3>
                      <p className="text-xs text-muted-foreground">
                        {categoryStats.matched}/{categoryStats.total} mục phù hợp
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-24">
                      <Progress 
                        value={categoryScore} 
                        className={cn(
                          "h-2",
                          categoryScore >= 80 ? "[&>div]:bg-green-500" : 
                          categoryScore >= 50 ? "[&>div]:bg-amber-500" : 
                          "[&>div]:bg-red-500"
                        )}
                      />
                    </div>
                    <span className="text-sm font-medium w-10">{categoryScore}%</span>
                    {expandedSections[category] ? (
                      <ChevronUp className="h-5 w-5 text-muted-foreground" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-muted-foreground" />
                    )}
                  </div>
                </button>

                {/* Category Items */}
                {expandedSections[category] && (
                  <div className="divide-y divide-border">
                    {items.map((item, index) => (
                      <div key={index} className="p-4 hover:bg-muted/20 transition-colors">
                        <div className="flex items-start gap-3">
                          {/* Status Icon */}
                          <div className={cn(
                            "flex-shrink-0 mt-0.5",
                            item.status === 'match' ? "text-green-500" :
                            item.status === 'partial' ? "text-amber-500" :
                            "text-red-500"
                          )}>
                            {item.status === 'match' ? (
                              <CheckCircle2 className="h-5 w-5" />
                            ) : item.status === 'partial' ? (
                              <AlertCircle className="h-5 w-5" />
                            ) : (
                              <XCircle className="h-5 w-5" />
                            )}
                          </div>

                          {/* Content */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-medium">{item.name}</span>
                              <Badge 
                                variant="outline" 
                                className={cn(
                                  "text-xs",
                                  item.importance === 'required' ? "border-red-300 text-red-600" :
                                  item.importance === 'preferred' ? "border-amber-300 text-amber-600" :
                                  "border-muted-foreground/30 text-muted-foreground"
                                )}
                              >
                                {item.importance === 'required' ? 'Bắt buộc' : 
                                 item.importance === 'preferred' ? 'Ưu tiên' : 'Có thì tốt'}
                              </Badge>
                            </div>

                            {/* Comparison */}
                            <div className="grid grid-cols-2 gap-4 mt-3 mb-3">
                              <div className="p-3 rounded-lg bg-muted/50 border border-border">
                                <p className="text-xs text-muted-foreground mb-1 font-medium">📄 Trong CV của bạn</p>
                                <p className={cn(
                                  "text-sm",
                                  item.cvValue ? "text-foreground" : "text-muted-foreground italic"
                                )}>
                                  {item.cvValue || "Không tìm thấy"}
                                </p>
                              </div>
                              <div className="p-3 rounded-lg bg-primary/5 border border-primary/20">
                                <p className="text-xs text-primary mb-1 font-medium">📋 JD yêu cầu</p>
                                <p className="text-sm text-foreground">{item.jdValue}</p>
                              </div>
                            </div>

                            {/* Reason */}
                            <div className={cn(
                              "p-3 rounded-lg text-sm",
                              item.status === 'match' ? "bg-green-50 border border-green-200" :
                              item.status === 'partial' ? "bg-amber-50 border border-amber-200" :
                              "bg-red-50 border border-red-200"
                            )}>
                              <p className={cn(
                                item.status === 'match' ? "text-green-700" :
                                item.status === 'partial' ? "text-amber-700" :
                                "text-red-700"
                              )}>
                                <strong>
                                  {item.status === 'match' ? '✓ Phù hợp: ' : 
                                   item.status === 'partial' ? '⚠ Một phần: ' : 
                                   '✗ Thiếu: '}
                                </strong>
                                {item.reason}
                              </p>
                            </div>

                            {/* Suggestion */}
                            {item.suggestion && (
                              <div className="mt-3 p-3 rounded-lg bg-blue-50 border border-blue-200 flex items-start gap-2">
                                <Lightbulb className="h-4 w-4 text-blue-600 flex-shrink-0 mt-0.5" />
                                <div>
                                  <p className="text-xs font-medium text-blue-700 mb-1">Gợi ý cải thiện</p>
                                  <p className="text-sm text-blue-600">{item.suggestion}</p>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </ScrollArea>

      {/* Footer Actions */}
      <Separator />
      <div className="flex-shrink-0 p-6 bg-muted/30 flex items-center justify-between gap-4">
        <div className="text-sm text-muted-foreground">
          <Lightbulb className="h-4 w-4 inline mr-1" />
          Cải thiện {stats.missing + stats.partial} mục để tăng tỷ lệ phù hợp
        </div>
        <div className="flex gap-3">
          <Button variant="outline" onClick={onClose}>
            Đóng
          </Button>
          <Button variant="accent" onClick={onApply}>
            Tiếp tục ứng tuyển
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CVMatchAnalysis;

import { useState } from 'react';
import { Application, CandidateProfile, CV, ApplicationStatus, PIPELINE_STAGES } from '@/types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
  Star,
  MoreVertical,
  Eye,
  FileText,
  MessageSquare,
  Calendar,
  Mail,
  Phone,
  MapPin,
  ChevronDown,
  ChevronUp,
  Send,
  Clock,
  DollarSign,
  Briefcase
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { formatDistanceToNow, format } from 'date-fns';
import { cn } from '@/lib/utils';

interface ApplicantCardProps {
  application: Application;
  candidate: CandidateProfile;
  cv?: CV;
  onStatusChange: (applicationId: string, newStatus: ApplicationStatus) => void;
  onAddNote: (applicationId: string, note: string) => void;
  onViewCV: (cv: CV) => void;
  onScheduleInterview?: (applicationId: string, candidate: CandidateProfile) => void;
  compact?: boolean;
}

const ApplicantCard = ({
  application,
  candidate,
  cv,
  onStatusChange,
  onAddNote,
  onViewCV,
  onScheduleInterview,
  compact = false
}: ApplicantCardProps) => {
  const [showNotes, setShowNotes] = useState(false);
  const [newNote, setNewNote] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);

  const getStatusColor = (status: ApplicationStatus) => {
    const stage = PIPELINE_STAGES.find(s => s.key === status);
    return stage?.color || 'bg-gray-500';
  };

  const handleAddNote = () => {
    if (newNote.trim()) {
      onAddNote(application.id, newNote);
      setNewNote('');
    }
  };

  const getMatchScoreColor = (score: number) => {
    if (score >= 85) return 'text-green-600 bg-green-100';
    if (score >= 70) return 'text-amber-600 bg-amber-100';
    return 'text-red-600 bg-red-100';
  };

  if (compact) {
    return (
      <div className="bg-card border border-border rounded-lg p-3 hover:shadow-md transition-shadow cursor-grab">
        <div className="flex items-start gap-3">
          <img
            src={candidate.avatar}
            alt={candidate.name}
            className="w-10 h-10 rounded-full shrink-0"
          />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h4 className="font-medium text-sm text-foreground truncate">{candidate.name}</h4>
              {application.matchScore && application.matchScore >= 85 && (
                <Star className="h-3 w-3 text-yellow-500 fill-yellow-500 shrink-0" />
              )}
            </div>
            <p className="text-xs text-muted-foreground truncate">{candidate.location}</p>
            {application.matchScore && (
              <div className={cn(
                "inline-flex items-center px-1.5 py-0.5 rounded text-xs font-medium mt-1",
                getMatchScoreColor(application.matchScore)
              )}>
                {application.matchScore}% Match
              </div>
            )}
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              {cv && (
                <DropdownMenuItem onClick={() => onViewCV(cv)}>
                  <FileText className="h-4 w-4 mr-2" />
                  View CV
                </DropdownMenuItem>
              )}
              <DropdownMenuItem onClick={() => setShowNotes(!showNotes)}>
                <MessageSquare className="h-4 w-4 mr-2" />
                Notes ({application.notes?.length || 0})
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              {PIPELINE_STAGES.filter(s => s.key !== application.status).map(stage => (
                <DropdownMenuItem
                  key={stage.key}
                  onClick={() => onStatusChange(application.id, stage.key)}
                >
                  <div className={cn("w-2 h-2 rounded-full mr-2", stage.color)} />
                  Move to {stage.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {showNotes && (
          <div className="mt-3 pt-3 border-t border-border space-y-2">
            {application.notes?.map(note => (
              <div key={note.id} className="bg-muted/50 rounded p-2 text-xs">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-medium">{note.authorName}</span>
                  <span className="text-muted-foreground">
                    {formatDistanceToNow(note.createdAt, { addSuffix: true })}
                  </span>
                </div>
                <p className="text-muted-foreground">{note.content}</p>
              </div>
            ))}
            <div className="flex gap-2">
              <Textarea
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                placeholder="Add a note..."
                className="text-xs min-h-[60px]"
              />
              <Button size="icon" onClick={handleAddNote} className="shrink-0">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-xl p-4 hover:shadow-lg transition-shadow">
      {/* Header */}
      <div className="flex items-start gap-4 mb-4">
        <img
          src={candidate.avatar}
          alt={candidate.name}
          className="w-14 h-14 rounded-full"
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-semibold text-lg text-foreground">{candidate.name}</h3>
            {application.matchScore && application.matchScore >= 85 && (
              <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
            )}
          </div>
          <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <Mail className="h-3 w-3" />
              {candidate.email}
            </span>
            {candidate.phone && (
              <span className="flex items-center gap-1">
                <Phone className="h-3 w-3" />
                {candidate.phone}
              </span>
            )}
            {candidate.location && (
              <span className="flex items-center gap-1">
                <MapPin className="h-3 w-3" />
                {candidate.location}
              </span>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2">
          {application.matchScore && (
            <div className={cn(
              "flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-semibold",
              getMatchScoreColor(application.matchScore)
            )}>
              {application.matchScore}% Match
            </div>
          )}
          <Badge className={cn(getStatusColor(application.status), "text-white")}>
            {PIPELINE_STAGES.find(s => s.key === application.status)?.label}
          </Badge>
        </div>
      </div>

      {/* Candidate Details */}
      <div className="grid grid-cols-3 gap-4 mb-4 p-3 bg-muted/50 rounded-lg">
        <div className="flex items-center gap-2">
          <Briefcase className="h-4 w-4 text-muted-foreground" />
          <div>
            <p className="text-xs text-muted-foreground">Experience</p>
            <p className="text-sm font-medium">{candidate.yearsOfExperience || 0} years</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <DollarSign className="h-4 w-4 text-muted-foreground" />
          <div>
            <p className="text-xs text-muted-foreground">Expected Salary</p>
            <p className="text-sm font-medium">{candidate.expectedSalary || 'Negotiable'}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4 text-muted-foreground" />
          <div>
            <p className="text-xs text-muted-foreground">Applied</p>
            <p className="text-sm font-medium">
              {formatDistanceToNow(application.appliedAt, { addSuffix: true })}
            </p>
          </div>
        </div>
      </div>

      {/* Skills */}
      {candidate.skills && candidate.skills.length > 0 && (
        <div className="mb-4">
          <div className="flex flex-wrap gap-2">
            {candidate.skills.slice(0, isExpanded ? undefined : 5).map((skill, idx) => (
              <Badge key={idx} variant="secondary" className="text-xs">
                {skill}
              </Badge>
            ))}
            {!isExpanded && candidate.skills.length > 5 && (
              <Badge variant="outline" className="text-xs">
                +{candidate.skills.length - 5} more
              </Badge>
            )}
          </div>
        </div>
      )}

      {/* Languages */}
      {candidate.languages && candidate.languages.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {candidate.languages.map((lang, idx) => (
            <span key={idx} className="text-xs text-muted-foreground">
              {lang.language}: <span className="font-medium">{lang.level}</span>
              {idx < candidate.languages!.length - 1 && ' • '}
            </span>
          ))}
        </div>
      )}

      {/* Expand/Collapse Button */}
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full mb-4"
      >
        {isExpanded ? (
          <>
            <ChevronUp className="h-4 w-4 mr-2" />
            Show Less
          </>
        ) : (
          <>
            <ChevronDown className="h-4 w-4 mr-2" />
            Show More Details
          </>
        )}
      </Button>

      {/* Expanded Content */}
      {isExpanded && (
        <div className="space-y-4 mb-4">
          {/* Timeline */}
          <div className="space-y-2">
            <h4 className="font-medium text-sm">Activity Timeline</h4>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <div className="w-2 h-2 rounded-full bg-blue-500" />
                Applied {format(application.appliedAt, 'MMM d, yyyy')}
              </div>
              {application.viewedAt && (
                <div className="flex items-center gap-2 text-muted-foreground">
                  <div className="w-2 h-2 rounded-full bg-gray-500" />
                  Viewed {format(application.viewedAt, 'MMM d, yyyy')}
                </div>
              )}
              {application.contactedAt && (
                <div className="flex items-center gap-2 text-muted-foreground">
                  <div className="w-2 h-2 rounded-full bg-purple-500" />
                  Contacted {format(application.contactedAt, 'MMM d, yyyy')}
                </div>
              )}
              {application.interviewDate && (
                <div className="flex items-center gap-2 text-muted-foreground">
                  <div className="w-2 h-2 rounded-full bg-amber-500" />
                  Interview scheduled {format(application.interviewDate, 'MMM d, yyyy')}
                </div>
              )}
            </div>
          </div>

          {/* Notes Section */}
          <div className="space-y-2">
            <h4 className="font-medium text-sm flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              Team Notes ({application.notes?.length || 0})
            </h4>
            {application.notes && application.notes.length > 0 ? (
              <div className="space-y-2">
                {application.notes.map(note => (
                  <div key={note.id} className="bg-muted/50 rounded-lg p-3">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium text-sm">{note.authorName}</span>
                      <span className="text-xs text-muted-foreground">
                        {formatDistanceToNow(note.createdAt, { addSuffix: true })}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">{note.content}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">No notes yet.</p>
            )}
            <div className="flex gap-2">
              <Textarea
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                placeholder="Add a note for your team..."
                className="min-h-[80px]"
              />
              <Button onClick={handleAddNote} className="shrink-0">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex items-center gap-2 pt-4 border-t border-border">
        {cv && (
          <Button variant="outline" size="sm" onClick={() => onViewCV(cv)}>
            <FileText className="h-4 w-4 mr-2" />
            View CV
          </Button>
        )}
        <Button variant="outline" size="sm">
          <Mail className="h-4 w-4 mr-2" />
          Email
        </Button>
        {onScheduleInterview && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => onScheduleInterview(application.id, candidate)}
            className="text-accent hover:text-accent"
          >
            <Calendar className="h-4 w-4 mr-2" />
            Schedule Interview
          </Button>
        )}
        <div className="flex-1" />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="default" size="sm">
              Move to Stage
              <ChevronDown className="h-4 w-4 ml-2" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            {PIPELINE_STAGES.filter(s => s.key !== application.status).map(stage => (
              <DropdownMenuItem
                key={stage.key}
                onClick={() => onStatusChange(application.id, stage.key)}
              >
                <div className={cn("w-2 h-2 rounded-full mr-2", stage.color)} />
                {stage.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default ApplicantCard;

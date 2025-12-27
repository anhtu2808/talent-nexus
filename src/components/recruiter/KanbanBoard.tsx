import { useState } from 'react';
import { Application, CandidateProfile, CV, ApplicationStatus, PIPELINE_STAGES } from '@/types';
import ApplicantCard from './ApplicantCard';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';

interface KanbanBoardProps {
  applications: Application[];
  candidates: CandidateProfile[];
  cvs: CV[];
  onStatusChange: (applicationId: string, newStatus: ApplicationStatus) => void;
  onAddNote: (applicationId: string, note: string) => void;
  onViewCV: (cv: CV) => void;
  onScheduleInterview?: (applicationId: string, candidate: CandidateProfile) => void;
  tier?: 'free' | 'premium';
}

const KanbanBoard = ({
  applications,
  candidates,
  cvs,
  onStatusChange,
  onAddNote,
  onViewCV,
  onScheduleInterview,
  tier = 'premium'
}: KanbanBoardProps) => {
  const [draggedApp, setDraggedApp] = useState<string | null>(null);
  const [dragOverColumn, setDragOverColumn] = useState<ApplicationStatus | null>(null);

  const getApplicationsByStatus = (status: ApplicationStatus) => {
    return applications.filter(app => app.status === status);
  };

  const getCandidateById = (id: string) => {
    return candidates.find(c => c.id === id);
  };

  const getCVById = (id: string) => {
    return cvs.find(cv => cv.id === id);
  };

  const handleDragStart = (e: React.DragEvent, applicationId: string) => {
    setDraggedApp(applicationId);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent, status: ApplicationStatus) => {
    e.preventDefault();
    setDragOverColumn(status);
  };

  const handleDragLeave = () => {
    setDragOverColumn(null);
  };

  const handleDrop = (e: React.DragEvent, status: ApplicationStatus) => {
    e.preventDefault();
    if (draggedApp) {
      onStatusChange(draggedApp, status);
    }
    setDraggedApp(null);
    setDragOverColumn(null);
  };

  // Show all pipeline stages for the kanban
  const kanbanStages = PIPELINE_STAGES;

  return (
    <div className="flex gap-4 overflow-x-auto pb-4">
      {kanbanStages.map(stage => {
        const stageApps = getApplicationsByStatus(stage.key);
        const isDropTarget = dragOverColumn === stage.key;

        return (
          <div
            key={stage.key}
            className={cn(
              "flex-shrink-0 w-[320px] bg-muted/30 rounded-xl border border-border",
              isDropTarget && "ring-2 ring-accent bg-accent/5"
            )}
            onDragOver={(e) => handleDragOver(e, stage.key)}
            onDragLeave={handleDragLeave}
            onDrop={(e) => handleDrop(e, stage.key)}
          >
            {/* Column Header */}
            <div className="p-4 border-b border-border">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className={cn("w-3 h-3 rounded-full", stage.color)} />
                  <h3 className="font-semibold text-foreground">{stage.label}</h3>
                </div>
                <span className="text-sm text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
                  {stageApps.length}
                </span>
              </div>
            </div>

            {/* Cards Container */}
            <ScrollArea className="h-[calc(100vh-320px)]">
              <div className="p-3 space-y-3">
                {stageApps.length > 0 ? (
                  stageApps.map(app => {
                    const candidate = getCandidateById(app.candidateId);
                    const cv = getCVById(app.cvId);

                    if (!candidate) return null;

                    return (
                      <div
                        key={app.id}
                        draggable
                        onDragStart={(e) => handleDragStart(e, app.id)}
                        className={cn(
                          "transition-opacity",
                          draggedApp === app.id && "opacity-50"
                        )}
                      >
                        <ApplicantCard
                          application={app}
                          candidate={candidate}
                          cv={cv}
                          onStatusChange={onStatusChange}
                          onAddNote={onAddNote}
                          onViewCV={onViewCV}
                          onScheduleInterview={onScheduleInterview}
                          compact
                          tier={tier}
                        />
                      </div>
                    );
                  })
                ) : (
                  <div className="text-center py-8 text-muted-foreground text-sm">
                    No applicants in this stage
                  </div>
                )}
              </div>
            </ScrollArea>
          </div>
        );
      })}
    </div>
  );
};

export default KanbanBoard;

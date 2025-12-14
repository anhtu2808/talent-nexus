import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Calendar } from '@/components/ui/calendar';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Calendar as CalendarIcon,
  Clock,
  Video,
  Plus,
  Trash2,
  Copy,
  ExternalLink,
  Users
} from 'lucide-react';
import { format, addMinutes, setHours, setMinutes, isSameDay, isAfter } from 'date-fns';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

interface TimeSlot {
  id: string;
  job_id: string;
  recruiter_id: string;
  start_time: string;
  end_time: string;
  duration_minutes: number;
  is_available: boolean;
}

interface ScheduledInterview {
  id: string;
  slot_id: string;
  application_id: string;
  candidate_id: string;
  candidate_name: string;
  candidate_email: string;
  job_title: string;
  interview_type: string;
  meet_link: string;
  notes: string | null;
  status: string;
  created_at: string;
}

interface InterviewSchedulerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  jobId: string;
  jobTitle: string;
  recruiterId: string;
}

const generateMeetLink = () => {
  const chars = 'abcdefghijklmnopqrstuvwxyz';
  const generateSegment = (length: number) => 
    Array.from({ length }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
  return `https://meet.smartrecruit.app/${generateSegment(3)}-${generateSegment(4)}-${generateSegment(3)}`;
};

const timeOptions = Array.from({ length: 24 }, (_, hour) => 
  [0, 30].map(minute => ({
    value: `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`,
    label: format(setMinutes(setHours(new Date(), hour), minute), 'h:mm a')
  }))
).flat();

const InterviewScheduler = ({ 
  open, 
  onOpenChange, 
  jobId, 
  jobTitle, 
  recruiterId 
}: InterviewSchedulerProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [startTime, setStartTime] = useState('09:00');
  const [duration, setDuration] = useState('30');
  const [slots, setSlots] = useState<TimeSlot[]>([]);
  const [scheduledInterviews, setScheduledInterviews] = useState<ScheduledInterview[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch existing slots and interviews
  useEffect(() => {
    if (open && jobId) {
      fetchSlots();
      fetchScheduledInterviews();
    }
  }, [open, jobId]);

  const fetchSlots = async () => {
    const { data, error } = await supabase
      .from('interview_slots')
      .select('*')
      .eq('job_id', jobId)
      .order('start_time', { ascending: true });

    if (error) {
      console.error('Error fetching slots:', error);
      return;
    }
    setSlots(data || []);
  };

  const fetchScheduledInterviews = async () => {
    const { data, error } = await supabase
      .from('scheduled_interviews')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching interviews:', error);
      return;
    }
    setScheduledInterviews(data || []);
  };

  const handleAddSlot = async () => {
    if (!selectedDate) {
      toast.error('Please select a date');
      return;
    }

    setIsLoading(true);

    const [hours, minutes] = startTime.split(':').map(Number);
    const slotStart = setMinutes(setHours(selectedDate, hours), minutes);
    const slotEnd = addMinutes(slotStart, parseInt(duration));

    // Check if slot is in the past
    if (!isAfter(slotStart, new Date())) {
      toast.error('Cannot create slots in the past');
      setIsLoading(false);
      return;
    }

    const { error } = await supabase
      .from('interview_slots')
      .insert({
        job_id: jobId,
        recruiter_id: recruiterId,
        start_time: slotStart.toISOString(),
        end_time: slotEnd.toISOString(),
        duration_minutes: parseInt(duration),
        is_available: true
      });

    if (error) {
      console.error('Error creating slot:', error);
      toast.error('Failed to create time slot');
    } else {
      toast.success('Time slot created');
      fetchSlots();
    }

    setIsLoading(false);
  };

  const handleDeleteSlot = async (slotId: string) => {
    const { error } = await supabase
      .from('interview_slots')
      .delete()
      .eq('id', slotId);

    if (error) {
      console.error('Error deleting slot:', error);
      toast.error('Failed to delete time slot');
    } else {
      toast.success('Time slot deleted');
      fetchSlots();
    }
  };

  const handleCopyLink = (link: string) => {
    navigator.clipboard.writeText(link);
    toast.success('Meeting link copied to clipboard');
  };

  // Group slots by date
  const slotsByDate = slots.reduce((acc, slot) => {
    const date = format(new Date(slot.start_time), 'yyyy-MM-dd');
    if (!acc[date]) acc[date] = [];
    acc[date].push(slot);
    return acc;
  }, {} as Record<string, TimeSlot[]>);

  const getSlotsForSelectedDate = () => {
    if (!selectedDate) return [];
    const dateKey = format(selectedDate, 'yyyy-MM-dd');
    return slotsByDate[dateKey] || [];
  };

  const getInterviewForSlot = (slotId: string) => {
    return scheduledInterviews.find(interview => interview.slot_id === slotId);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <CalendarIcon className="h-5 w-5" />
            Interview Scheduler
          </DialogTitle>
          <DialogDescription>
            Manage interview time slots for <span className="font-medium">{jobTitle}</span>
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-4">
          {/* Left: Calendar & Slot Creation */}
          <div className="space-y-4">
            <div className="bg-muted/50 rounded-lg p-4">
              <h3 className="font-medium mb-3">Select Date</h3>
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                className="rounded-md border pointer-events-auto"
                disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
              />
            </div>

            <div className="bg-muted/50 rounded-lg p-4 space-y-4">
              <h3 className="font-medium">Add Time Slot</h3>
              
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label>Start Time</Label>
                  <Select value={startTime} onValueChange={setStartTime}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="max-h-60">
                      {timeOptions.map(option => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label>Duration</Label>
                  <Select value={duration} onValueChange={setDuration}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="30">30 minutes</SelectItem>
                      <SelectItem value="45">45 minutes</SelectItem>
                      <SelectItem value="60">1 hour</SelectItem>
                      <SelectItem value="90">1.5 hours</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button 
                onClick={handleAddSlot} 
                disabled={isLoading || !selectedDate}
                className="w-full"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Time Slot
              </Button>
            </div>
          </div>

          {/* Right: Slots for Selected Date */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-medium">
                {selectedDate ? format(selectedDate, 'EEEE, MMMM d, yyyy') : 'Select a date'}
              </h3>
              <Badge variant="secondary">
                {getSlotsForSelectedDate().length} slots
              </Badge>
            </div>

            <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2">
              {getSlotsForSelectedDate().length > 0 ? (
                getSlotsForSelectedDate().map(slot => {
                  const interview = getInterviewForSlot(slot.id);
                  const isBooked = !slot.is_available || !!interview;

                  return (
                    <div
                      key={slot.id}
                      className={cn(
                        "border rounded-lg p-4 transition-colors",
                        isBooked 
                          ? "bg-accent/10 border-accent/30" 
                          : "bg-card hover:bg-muted/50"
                      )}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div className={cn(
                            "p-2 rounded-lg",
                            isBooked ? "bg-accent/20" : "bg-muted"
                          )}>
                            <Clock className={cn(
                              "h-4 w-4",
                              isBooked ? "text-accent" : "text-muted-foreground"
                            )} />
                          </div>
                          <div>
                            <div className="font-medium">
                              {format(new Date(slot.start_time), 'h:mm a')} - {format(new Date(slot.end_time), 'h:mm a')}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {slot.duration_minutes} minutes
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          {isBooked ? (
                            <Badge className="bg-accent text-white">Booked</Badge>
                          ) : (
                            <Badge variant="secondary">Available</Badge>
                          )}
                          {!isBooked && (
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleDeleteSlot(slot.id)}
                              className="text-destructive hover:text-destructive"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      </div>

                      {interview && (
                        <div className="mt-4 pt-4 border-t border-border space-y-3">
                          <div className="flex items-center gap-2">
                            <Users className="h-4 w-4 text-muted-foreground" />
                            <span className="font-medium">{interview.candidate_name}</span>
                            <span className="text-sm text-muted-foreground">
                              ({interview.candidate_email})
                            </span>
                          </div>
                          
                          <div className="flex items-center gap-2 bg-muted/50 rounded-lg p-3">
                            <Video className="h-4 w-4 text-accent" />
                            <span className="text-sm font-mono flex-1 truncate">
                              {interview.meet_link}
                            </span>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleCopyLink(interview.meet_link)}
                            >
                              <Copy className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => window.open(interview.meet_link, '_blank')}
                            >
                              <ExternalLink className="h-4 w-4" />
                            </Button>
                          </div>

                          <Badge variant="outline" className="capitalize">
                            {interview.status}
                          </Badge>
                        </div>
                      )}
                    </div>
                  );
                })
              ) : (
                <div className="text-center py-12 text-muted-foreground">
                  <CalendarIcon className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No time slots for this date</p>
                  <p className="text-sm">Add slots using the form on the left</p>
                </div>
              )}
            </div>
          </div>
        </div>

        <DialogFooter className="mt-6">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default InterviewScheduler;

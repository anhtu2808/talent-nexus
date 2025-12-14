import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar } from '@/components/ui/calendar';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  Calendar as CalendarIcon,
  Clock,
  Video,
  CheckCircle,
  User,
  Mail
} from 'lucide-react';
import { format, isSameDay } from 'date-fns';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

interface TimeSlot {
  id: string;
  job_id: string;
  start_time: string;
  end_time: string;
  duration_minutes: number;
  is_available: boolean;
}

interface CandidateBookingModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  applicationId: string;
  candidateId: string;
  candidateName: string;
  candidateEmail: string;
  jobId: string;
  jobTitle: string;
  onBooked?: () => void;
}

const generateMeetLink = () => {
  const chars = 'abcdefghijklmnopqrstuvwxyz';
  const generateSegment = (length: number) => 
    Array.from({ length }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
  return `https://meet.smartrecruit.app/${generateSegment(3)}-${generateSegment(4)}-${generateSegment(3)}`;
};

const CandidateBookingModal = ({
  open,
  onOpenChange,
  applicationId,
  candidateId,
  candidateName,
  candidateEmail,
  jobId,
  jobTitle,
  onBooked
}: CandidateBookingModalProps) => {
  const [slots, setSlots] = useState<TimeSlot[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);
  const [notes, setNotes] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isBooked, setIsBooked] = useState(false);
  const [meetLink, setMeetLink] = useState('');

  useEffect(() => {
    if (open && jobId) {
      fetchAvailableSlots();
      setIsBooked(false);
      setSelectedSlot(null);
      setSelectedDate(undefined);
      setNotes('');
    }
  }, [open, jobId]);

  const fetchAvailableSlots = async () => {
    const { data, error } = await supabase
      .from('interview_slots')
      .select('*')
      .eq('job_id', jobId)
      .eq('is_available', true)
      .gte('start_time', new Date().toISOString())
      .order('start_time', { ascending: true });

    if (error) {
      console.error('Error fetching slots:', error);
      toast.error('Failed to load available slots');
      return;
    }
    setSlots(data || []);

    // Auto-select first available date
    if (data && data.length > 0) {
      setSelectedDate(new Date(data[0].start_time));
    }
  };

  const getSlotsForSelectedDate = () => {
    if (!selectedDate) return [];
    return slots.filter(slot => 
      isSameDay(new Date(slot.start_time), selectedDate)
    );
  };

  const getAvailableDates = () => {
    const dates = new Set(
      slots.map(slot => format(new Date(slot.start_time), 'yyyy-MM-dd'))
    );
    return Array.from(dates).map(d => new Date(d));
  };

  const handleBookInterview = async () => {
    if (!selectedSlot) {
      toast.error('Please select a time slot');
      return;
    }

    setIsLoading(true);
    const generatedMeetLink = generateMeetLink();

    // Create the scheduled interview
    const { error: interviewError } = await supabase
      .from('scheduled_interviews')
      .insert({
        slot_id: selectedSlot.id,
        application_id: applicationId,
        candidate_id: candidateId,
        candidate_name: candidateName,
        candidate_email: candidateEmail,
        job_title: jobTitle,
        interview_type: 'video',
        meet_link: generatedMeetLink,
        notes: notes || null,
        status: 'scheduled'
      });

    if (interviewError) {
      console.error('Error booking interview:', interviewError);
      toast.error('Failed to book interview');
      setIsLoading(false);
      return;
    }

    // Mark the slot as unavailable
    const { error: slotError } = await supabase
      .from('interview_slots')
      .update({ is_available: false })
      .eq('id', selectedSlot.id);

    if (slotError) {
      console.error('Error updating slot:', slotError);
    }

    setMeetLink(generatedMeetLink);
    setIsBooked(true);
    setIsLoading(false);
    toast.success('Interview scheduled successfully!');
    onBooked?.();
  };

  if (isBooked) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-lg">
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-8 w-8 text-accent" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Interview Scheduled!</h2>
            <p className="text-muted-foreground mb-6">
              The interview has been scheduled for {candidateName}
            </p>

            <div className="bg-muted/50 rounded-lg p-4 mb-6 text-left space-y-3">
              <div className="flex items-center gap-2">
                <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                <span>
                  {selectedSlot && format(new Date(selectedSlot.start_time), 'EEEE, MMMM d, yyyy')}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span>
                  {selectedSlot && `${format(new Date(selectedSlot.start_time), 'h:mm a')} - ${format(new Date(selectedSlot.end_time), 'h:mm a')}`}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Video className="h-4 w-4 text-accent" />
                <span className="font-mono text-sm break-all">{meetLink}</span>
              </div>
            </div>

            <p className="text-sm text-muted-foreground mb-6">
              A calendar invite will be sent to <strong>{candidateEmail}</strong>
            </p>

            <Button onClick={() => onOpenChange(false)} className="w-full">
              Done
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <CalendarIcon className="h-5 w-5" />
            Schedule Interview
          </DialogTitle>
          <DialogDescription>
            Select a time slot for the interview with {candidateName}
          </DialogDescription>
        </DialogHeader>

        {/* Candidate Info */}
        <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg">
          <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
            <User className="h-6 w-6 text-primary" />
          </div>
          <div>
            <div className="font-medium">{candidateName}</div>
            <div className="text-sm text-muted-foreground flex items-center gap-1">
              <Mail className="h-3 w-3" />
              {candidateEmail}
            </div>
          </div>
          <Badge variant="secondary" className="ml-auto">
            {jobTitle}
          </Badge>
        </div>

        {slots.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            <CalendarIcon className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p className="font-medium">No available time slots</p>
            <p className="text-sm">The recruiter hasn't added any interview slots yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-4">
            {/* Calendar */}
            <div>
              <h3 className="font-medium mb-3">Select Date</h3>
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={(date) => {
                  setSelectedDate(date);
                  setSelectedSlot(null);
                }}
                className="rounded-md border pointer-events-auto"
                disabled={(date) => {
                  const availableDates = getAvailableDates();
                  return !availableDates.some(d => isSameDay(d, date));
                }}
                modifiers={{
                  available: getAvailableDates()
                }}
                modifiersStyles={{
                  available: { backgroundColor: 'hsl(var(--accent) / 0.1)' }
                }}
              />
            </div>

            {/* Time Slots */}
            <div>
              <h3 className="font-medium mb-3">
                {selectedDate ? format(selectedDate, 'EEEE, MMMM d') : 'Select a date first'}
              </h3>
              
              <div className="space-y-2 max-h-[300px] overflow-y-auto">
                {getSlotsForSelectedDate().map(slot => (
                  <button
                    key={slot.id}
                    onClick={() => setSelectedSlot(slot)}
                    className={cn(
                      "w-full p-4 rounded-lg border text-left transition-all",
                      selectedSlot?.id === slot.id
                        ? "border-accent bg-accent/10 ring-2 ring-accent"
                        : "border-border hover:border-accent/50 hover:bg-muted/50"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <Clock className={cn(
                        "h-4 w-4",
                        selectedSlot?.id === slot.id ? "text-accent" : "text-muted-foreground"
                      )} />
                      <div>
                        <div className="font-medium">
                          {format(new Date(slot.start_time), 'h:mm a')} - {format(new Date(slot.end_time), 'h:mm a')}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {slot.duration_minutes} minutes
                        </div>
                      </div>
                      {selectedSlot?.id === slot.id && (
                        <CheckCircle className="h-4 w-4 text-accent ml-auto" />
                      )}
                    </div>
                  </button>
                ))}
                
                {selectedDate && getSlotsForSelectedDate().length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    No slots available for this date
                  </div>
                )}
              </div>

              {selectedSlot && (
                <div className="mt-4 space-y-3">
                  <Label>Notes for the interview (optional)</Label>
                  <Textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Any specific topics to discuss, preparation instructions, etc."
                    className="min-h-[80px]"
                  />
                </div>
              )}
            </div>
          </div>
        )}

        <DialogFooter className="mt-6">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button 
            onClick={handleBookInterview}
            disabled={!selectedSlot || isLoading}
            className="gap-2"
          >
            <Video className="h-4 w-4" />
            {isLoading ? 'Scheduling...' : 'Schedule Interview'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CandidateBookingModal;

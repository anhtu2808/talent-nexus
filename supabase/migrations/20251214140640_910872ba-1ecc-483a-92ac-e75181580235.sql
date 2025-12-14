-- Create interview slots table for recruiters to set available times
CREATE TABLE public.interview_slots (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  job_id TEXT NOT NULL,
  recruiter_id TEXT NOT NULL,
  start_time TIMESTAMP WITH TIME ZONE NOT NULL,
  end_time TIMESTAMP WITH TIME ZONE NOT NULL,
  duration_minutes INTEGER NOT NULL DEFAULT 30,
  is_available BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create scheduled interviews table
CREATE TABLE public.scheduled_interviews (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  slot_id UUID REFERENCES public.interview_slots(id) ON DELETE CASCADE,
  application_id TEXT NOT NULL,
  candidate_id TEXT NOT NULL,
  candidate_name TEXT NOT NULL,
  candidate_email TEXT NOT NULL,
  job_title TEXT NOT NULL,
  interview_type TEXT NOT NULL DEFAULT 'video',
  meet_link TEXT NOT NULL,
  notes TEXT,
  status TEXT NOT NULL DEFAULT 'scheduled',
  reminder_sent BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.interview_slots ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.scheduled_interviews ENABLE ROW LEVEL SECURITY;

-- Public read access for interview slots (candidates need to see available slots)
CREATE POLICY "Anyone can view available interview slots"
ON public.interview_slots
FOR SELECT
USING (is_available = true);

-- Public insert for scheduled interviews (candidates booking)
CREATE POLICY "Anyone can book an interview"
ON public.scheduled_interviews
FOR INSERT
WITH CHECK (true);

-- Public read for scheduled interviews
CREATE POLICY "Anyone can view scheduled interviews"
ON public.scheduled_interviews
FOR SELECT
USING (true);

-- Public update for interview slots (to mark as booked)
CREATE POLICY "Anyone can update interview slots"
ON public.interview_slots
FOR UPDATE
USING (true);

-- Public insert for interview slots (recruiters creating slots)
CREATE POLICY "Anyone can create interview slots"
ON public.interview_slots
FOR INSERT
WITH CHECK (true);

-- Public delete for interview slots
CREATE POLICY "Anyone can delete interview slots"
ON public.interview_slots
FOR DELETE
USING (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_interview_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_interviews_updated_at
BEFORE UPDATE ON public.scheduled_interviews
FOR EACH ROW
EXECUTE FUNCTION public.update_interview_updated_at();
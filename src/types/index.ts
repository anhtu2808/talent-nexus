export type UserRole = 'candidate' | 'recruiter' | 'admin';

export type ApplicationStatus = 'new' | 'viewed' | 'screening' | 'interviewing' | 'negotiating' | 'offered' | 'hired' | 'rejected';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
  createdAt: Date;
}

export interface CandidateProfile extends User {
  phone?: string;
  location?: string;
  expectedSalary?: string;
  yearsOfExperience?: number;
  skills?: string[];
  languages?: { language: string; level: string }[];
  openToWork?: boolean;
}

export interface Job {
  id: string;
  title: string;
  company: string;
  companyLogo?: string;
  location: string[];
  salary: string;
  type: 'full-time' | 'part-time' | 'contract' | 'remote';
  description: string;
  requirements: string[];
  skills: string[];
  postedAt: Date;
  deadline?: Date;
  recruiterId: string;
  applicantCount: number;
  isActive: boolean;
  views?: number;
  clickToApply?: number;
}

export interface ApplicationNote {
  id: string;
  applicationId: string;
  authorId: string;
  authorName: string;
  content: string;
  createdAt: Date;
}

export interface Application {
  id: string;
  jobId: string;
  candidateId: string;
  cvId: string;
  status: ApplicationStatus;
  appliedAt: Date;
  matchScore?: number;
  notes?: ApplicationNote[];
  viewedAt?: Date;
  contactedAt?: Date;
  interviewDate?: Date;
  rejectionReason?: string;
}

export interface ATSBreakdown {
  skillsMatch: number;
  keywordsMatch: number;
  formattingScore: number;
  missingKeywords: string[];
  formattingIssues: string[];
  feedback: string[];
}

export interface CV {
  id: string;
  candidateId: string;
  fileName: string;
  fileUrl: string;
  uploadedAt: Date;
  parsedData?: CVParsedData;
  atsScore?: number;
  atsBreakdown?: ATSBreakdown;
}

export interface CVParsedData {
  name?: string;
  email?: string;
  phone?: string;
  skills: string[];
  experience: Experience[];
  education: Education[];
  summary?: string;
}

export interface Experience {
  title: string;
  company: string;
  duration: string;
  description: string;
}

export interface Education {
  degree: string;
  institution: string;
  year: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

// Pipeline stage configuration - Extended with new stages
export const PIPELINE_STAGES: { key: ApplicationStatus; label: string; color: string }[] = [
  { key: 'new', label: 'New', color: 'bg-blue-500' },
  { key: 'viewed', label: 'Viewed', color: 'bg-indigo-500' },
  { key: 'screening', label: 'Screening', color: 'bg-purple-500' },
  { key: 'interviewing', label: 'Interviewing', color: 'bg-amber-500' },
  { key: 'negotiating', label: 'Negotiating', color: 'bg-orange-500' },
  { key: 'offered', label: 'Offered', color: 'bg-emerald-500' },
  { key: 'hired', label: 'Hired', color: 'bg-green-600' },
  { key: 'rejected', label: 'Rejected', color: 'bg-red-500' },
];

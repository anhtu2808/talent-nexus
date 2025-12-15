export type UserRole = 'candidate' | 'recruiter' | 'admin';

export type ApplicationStatus = 'new' | 'interviewing' | 'hired' | 'rejected';

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
  location: string;
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

export interface CV {
  id: string;
  candidateId: string;
  fileName: string;
  fileUrl: string;
  uploadedAt: Date;
  parsedData?: CVParsedData;
  atsScore?: number;
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

// Pipeline stage configuration - Simplified to 4 essential stages
export const PIPELINE_STAGES: { key: ApplicationStatus; label: string; color: string }[] = [
  { key: 'new', label: 'New', color: 'bg-blue-500' },
  { key: 'interviewing', label: 'Interviewing', color: 'bg-amber-500' },
  { key: 'hired', label: 'Hired', color: 'bg-green-500' },
  { key: 'rejected', label: 'Rejected', color: 'bg-red-500' },
];

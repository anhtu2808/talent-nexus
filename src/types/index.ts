export type UserRole = 'candidate' | 'recruiter' | 'admin';

export type ApplicationStatus = 'applied' | 'in_review' | 'interview' | 'hired' | 'rejected';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  subRole?: 'manager' | 'member'; // Only applicable for 'recruiter' role
  avatar?: string;
  createdAt: Date;
}

export interface Recruiter extends User {
  companyId: string;
  subRole: 'manager' | 'member';
  status: 'active' | 'inactive';
  hasPurchasedPackage?: boolean;
  currentPlan?: string;
  planExpiresAt?: Date;
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
  weights?: {
    skills: number;
    requirements: number;
    experience: number;
    location: number;
  };
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
  keywordsMatch: number; // Keeping for backward compatibility, mapped to requirements
  requirementsMatch: number; // New field
  experienceMatch: number; // New field
  locationMatch: number;
  skillsAnalysis?: string[];
  requirementsAnalysis?: string[];
  experienceAnalysis?: string[];
  locationAnalysis?: string[];
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
  institutionLogo?: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

// Pipeline stage configuration - Extended with new stages
export const PIPELINE_STAGES: { key: ApplicationStatus; label: string; color: string }[] = [
  { key: 'applied', label: 'Applied', color: 'bg-blue-500' },
  { key: 'in_review', label: 'In Review', color: 'bg-purple-500' },
  { key: 'interview', label: 'Interview', color: 'bg-amber-500' },
  { key: 'hired', label: 'Hired', color: 'bg-emerald-500' },
  { key: 'rejected', label: 'Rejected', color: 'bg-red-500' },
];

export type InvitationStatus = 'pending' | 'accepted' | 'declined';

export interface JobInvitation {
  id: string;
  jobId: string;
  candidateId: string;
  recruiterId: string;
  companyName: string;
  jobTitle: string;
  message: string;
  sentAt: Date;
  status: InvitationStatus;
}

export type TargetRole = "candidate" | "recruiter";
export type RecruiterPlanType = "seat" | "ai_quota";

export interface PricingPlan {
  id: number;
  name: string;
  salePrice: number;
  target: TargetRole;
  recruiterPlanType?: RecruiterPlanType;
  userSeats?: number;
  aiCredits: number;
  isUnlimitedScoring: boolean;
  atsScoringLimit?: number;
  duration: number;
  status: "Active" | "Inactive";
  description: string;
}

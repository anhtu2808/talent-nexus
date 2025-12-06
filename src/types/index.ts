export type UserRole = 'candidate' | 'recruiter' | 'admin';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
  createdAt: Date;
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
}

export interface Application {
  id: string;
  jobId: string;
  candidateId: string;
  cvId: string;
  status: 'pending' | 'reviewing' | 'shortlisted' | 'interview' | 'offered' | 'rejected';
  appliedAt: Date;
  matchScore?: number;
  notes?: string;
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

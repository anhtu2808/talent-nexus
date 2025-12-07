import { Job, Application, CV, User } from '@/types';

export const mockJobs: Job[] = [
  {
    id: '1',
    title: 'Senior React Developer',
    company: 'TechVision Corp',
    companyLogo: 'https://ui-avatars.com/api/?name=TV&background=0F2238&color=fff&size=100',
    location: 'Ho Chi Minh City',
    salary: '$2,500 - $4,000',
    type: 'full-time',
    description: 'We are looking for a Senior React Developer to join our innovative team. You will be responsible for building and maintaining complex web applications using React, TypeScript, and modern frontend technologies.',
    requirements: [
      '5+ years of experience with React.js',
      'Strong understanding of TypeScript',
      'Experience with state management (Redux, Zustand)',
      'Familiarity with RESTful APIs and GraphQL',
      'Excellent problem-solving skills'
    ],
    skills: ['React', 'TypeScript', 'Redux', 'GraphQL', 'Node.js'],
    postedAt: new Date('2024-01-15'),
    deadline: new Date('2024-02-28'),
    recruiterId: 'r1',
    applicantCount: 45,
    isActive: true
  },
  {
    id: '2',
    title: 'Full Stack Java Developer',
    company: 'FinTech Solutions',
    companyLogo: 'https://ui-avatars.com/api/?name=FS&background=38B65F&color=fff&size=100',
    location: 'Ha Noi',
    salary: '$2,000 - $3,500',
    type: 'full-time',
    description: 'Join our fintech team to build secure and scalable banking solutions. Work with Spring Boot, React, and cloud technologies.',
    requirements: [
      '3+ years with Java and Spring Boot',
      'Experience with React or Angular',
      'Knowledge of SQL and NoSQL databases',
      'Understanding of microservices architecture',
      'Banking/fintech experience is a plus'
    ],
    skills: ['Java', 'Spring Boot', 'React', 'PostgreSQL', 'AWS'],
    postedAt: new Date('2024-01-18'),
    recruiterId: 'r2',
    applicantCount: 32,
    isActive: true
  },
  {
    id: '3',
    title: 'AI/ML Engineer',
    company: 'AI Dynamics',
    companyLogo: 'https://ui-avatars.com/api/?name=AI&background=6366f1&color=fff&size=100',
    location: 'Da Nang',
    salary: '$3,000 - $5,000',
    type: 'full-time',
    description: 'Work on cutting-edge AI projects including NLP, computer vision, and recommendation systems. Build and deploy ML models at scale.',
    requirements: [
      'MS/PhD in Computer Science or related field',
      'Strong Python programming skills',
      'Experience with TensorFlow/PyTorch',
      'Knowledge of NLP and deep learning',
      'Published research is a plus'
    ],
    skills: ['Python', 'TensorFlow', 'PyTorch', 'NLP', 'Computer Vision'],
    postedAt: new Date('2024-01-20'),
    recruiterId: 'r1',
    applicantCount: 28,
    isActive: true
  },
  {
    id: '4',
    title: 'DevOps Engineer',
    company: 'CloudScale Inc',
    companyLogo: 'https://ui-avatars.com/api/?name=CS&background=f59e0b&color=fff&size=100',
    location: 'Remote',
    salary: '$2,800 - $4,500',
    type: 'remote',
    description: 'Lead our cloud infrastructure initiatives. Implement CI/CD pipelines, manage Kubernetes clusters, and ensure system reliability.',
    requirements: [
      '4+ years of DevOps experience',
      'Expert in AWS/GCP/Azure',
      'Strong Kubernetes knowledge',
      'Experience with Terraform and Ansible',
      'Understanding of security best practices'
    ],
    skills: ['AWS', 'Kubernetes', 'Docker', 'Terraform', 'CI/CD'],
    postedAt: new Date('2024-01-22'),
    recruiterId: 'r2',
    applicantCount: 19,
    isActive: true
  },
  {
    id: '5',
    title: 'Product Manager - Tech',
    company: 'StartupHub',
    companyLogo: 'https://ui-avatars.com/api/?name=SH&background=ec4899&color=fff&size=100',
    location: 'Ho Chi Minh City',
    salary: '$2,500 - $4,000',
    type: 'full-time',
    description: 'Drive product strategy and roadmap for our B2B SaaS platform. Work closely with engineering, design, and sales teams.',
    requirements: [
      '3+ years of product management experience',
      'Technical background preferred',
      'Strong analytical and communication skills',
      'Experience with agile methodologies',
      'B2B SaaS experience is a plus'
    ],
    skills: ['Product Strategy', 'Agile', 'Data Analysis', 'User Research', 'Roadmapping'],
    postedAt: new Date('2024-01-25'),
    recruiterId: 'r1',
    applicantCount: 56,
    isActive: true
  },
  {
    id: '6',
    title: 'QA Automation Engineer',
    company: 'Quality First Ltd',
    companyLogo: 'https://ui-avatars.com/api/?name=QF&background=14b8a6&color=fff&size=100',
    location: 'Ha Noi',
    salary: '$1,500 - $2,500',
    type: 'full-time',
    description: 'Build and maintain automated testing frameworks. Ensure quality across web and mobile applications.',
    requirements: [
      '2+ years of QA automation experience',
      'Proficiency in Selenium/Cypress',
      'Experience with API testing',
      'Knowledge of CI/CD integration',
      'ISTQB certification is a plus'
    ],
    skills: ['Selenium', 'Cypress', 'JavaScript', 'API Testing', 'Jest'],
    postedAt: new Date('2024-01-28'),
    recruiterId: 'r2',
    applicantCount: 23,
    isActive: true
  }
];

export const mockApplications: Application[] = [
  {
    id: 'a1',
    jobId: '1',
    candidateId: 'c1',
    cvId: 'cv1',
    status: 'reviewing',
    appliedAt: new Date('2024-01-20'),
    matchScore: 85
  },
  {
    id: 'a2',
    jobId: '2',
    candidateId: 'c1',
    cvId: 'cv1',
    status: 'shortlisted',
    appliedAt: new Date('2024-01-22'),
    matchScore: 92
  },
  {
    id: 'a3',
    jobId: '3',
    candidateId: 'c1',
    cvId: 'cv1',
    status: 'pending',
    appliedAt: new Date('2024-01-25'),
    matchScore: 78
  },
  {
    id: 'a4',
    jobId: '1',
    candidateId: 'c2',
    cvId: 'cv2',
    status: 'interview',
    appliedAt: new Date('2024-01-18'),
    matchScore: 88
  }
];

export const mockCVs: CV[] = [
  {
    id: 'cv1',
    candidateId: 'c1',
    fileName: 'nguyen_van_a_resume.pdf',
    fileUrl: '/uploads/cv1.pdf',
    uploadedAt: new Date('2024-01-15'),
    atsScore: 85,
    parsedData: {
      name: 'Nguyen Van A',
      email: 'nguyenvana@email.com',
      phone: '0901234567',
      skills: ['React', 'TypeScript', 'Node.js', 'Python', 'AWS'],
      experience: [
        {
          title: 'Senior Frontend Developer',
          company: 'Tech Corp',
          duration: '2021 - Present',
          description: 'Led frontend development for multiple client projects'
        },
        {
          title: 'Frontend Developer',
          company: 'StartupXYZ',
          duration: '2019 - 2021',
          description: 'Developed React applications for e-commerce platform'
        }
      ],
      education: [
        {
          degree: 'Bachelor of Computer Science',
          institution: 'FPT University',
          year: '2019'
        }
      ],
      summary: 'Experienced frontend developer with 5+ years of experience in React ecosystem'
    }
  },
  {
    id: 'cv2',
    candidateId: 'c1',
    fileName: 'senior_fullstack_2024.pdf',
    fileUrl: '/uploads/cv2.pdf',
    uploadedAt: new Date('2024-02-10'),
    atsScore: 78,
    parsedData: {
      name: 'Nguyen Van A',
      email: 'nguyenvana@email.com',
      phone: '0901234567',
      skills: ['Java', 'Spring Boot', 'React', 'PostgreSQL', 'Docker'],
      experience: [
        {
          title: 'Full Stack Developer',
          company: 'FinTech Corp',
          duration: '2020 - Present',
          description: 'Built scalable microservices for banking platform'
        }
      ],
      education: [
        {
          degree: 'Bachelor of Computer Science',
          institution: 'FPT University',
          year: '2019'
        }
      ],
      summary: 'Full stack developer with expertise in Java and React'
    }
  },
  {
    id: 'cv3',
    candidateId: 'c1',
    fileName: 'backend_developer_cv.pdf',
    fileUrl: '/uploads/cv3.pdf',
    uploadedAt: new Date('2024-03-05'),
    atsScore: 92,
    parsedData: {
      name: 'Nguyen Van A',
      email: 'nguyenvana@email.com',
      phone: '0901234567',
      skills: ['Python', 'Django', 'FastAPI', 'AWS', 'Kubernetes'],
      experience: [
        {
          title: 'Backend Engineer',
          company: 'AI Startup',
          duration: '2022 - Present',
          description: 'Developed AI-powered APIs and microservices'
        }
      ],
      education: [
        {
          degree: 'Master of Computer Science',
          institution: 'HCMUT',
          year: '2022'
        }
      ],
      summary: 'Backend specialist with AI/ML integration experience'
    }
  },
  {
    id: 'cv4',
    candidateId: 'c1',
    fileName: 'devops_engineer_resume.docx',
    fileUrl: '/uploads/cv4.docx',
    uploadedAt: new Date('2024-01-28'),
    atsScore: 70,
    parsedData: {
      name: 'Nguyen Van A',
      email: 'nguyenvana@email.com',
      phone: '0901234567',
      skills: ['AWS', 'Terraform', 'Docker', 'Kubernetes', 'CI/CD'],
      experience: [
        {
          title: 'DevOps Engineer',
          company: 'CloudScale Inc',
          duration: '2021 - Present',
          description: 'Managed cloud infrastructure and CI/CD pipelines'
        }
      ],
      education: [
        {
          degree: 'Bachelor of IT',
          institution: 'UIT',
          year: '2020'
        }
      ],
      summary: 'DevOps engineer with strong cloud and automation skills'
    }
  }
];

export const mockCandidates: User[] = [
  {
    id: 'c1',
    email: 'nguyenvana@email.com',
    name: 'Nguyen Van A',
    role: 'candidate',
    avatar: 'https://ui-avatars.com/api/?name=NV&background=0F2238&color=fff',
    createdAt: new Date('2024-01-10')
  },
  {
    id: 'c2',
    email: 'tranb@email.com',
    name: 'Tran Thi B',
    role: 'candidate',
    avatar: 'https://ui-avatars.com/api/?name=TT&background=38B65F&color=fff',
    createdAt: new Date('2024-01-12')
  },
  {
    id: 'c3',
    email: 'lec@email.com',
    name: 'Le Van C',
    role: 'candidate',
    avatar: 'https://ui-avatars.com/api/?name=LV&background=6366f1&color=fff',
    createdAt: new Date('2024-01-14')
  }
];

export const trendingSkills = [
  'Java', 'ReactJS', '.NET', 'Tester', 'PHP', 'Business Analysis', 'NodeJS', 'Python', 'DevOps', 'AWS'
];

export const cities = [
  'All Cities', 'Ho Chi Minh City', 'Ha Noi', 'Da Nang', 'Can Tho', 'Binh Duong', 'Remote'
];

export const jobTypes = [
  { value: 'all', label: 'All Types' },
  { value: 'full-time', label: 'Full-time' },
  { value: 'part-time', label: 'Part-time' },
  { value: 'contract', label: 'Contract' },
  { value: 'remote', label: 'Remote' }
];

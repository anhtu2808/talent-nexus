import { Job, Application, CV, CandidateProfile, ApplicationNote, Recruiter } from '@/types';

export const mockJobs: Job[] = [
  {
    id: '1',
    title: 'Senior React Developer',
    company: 'TechVision Corp',
    companyLogo: 'https://ui-avatars.com/api/?name=TV&background=0F2238&color=fff&size=100',
    location: ['Ho Chi Minh City'],
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
    postedAt: new Date('2026-01-02'),
    deadline: new Date('2026-02-28'),
    recruiterId: 'r1',
    applicantCount: 45,
    isActive: true,
    views: 1250,
    clickToApply: 145
  },
  {
    id: '2',
    title: 'Full Stack Java Developer',
    company: 'FinTech Solutions',
    companyLogo: 'https://ui-avatars.com/api/?name=FS&background=38B65F&color=fff&size=100',
    location: ['Ha Noi', 'Ho Chi Minh City'],
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
    postedAt: new Date('2025-12-01'),
    deadline: new Date('2025-12-31'), // Expired
    recruiterId: 'r2',
    applicantCount: 32,
    isActive: true, // Should be auto-closed
    views: 890,
    clickToApply: 98
  },
  {
    id: '3',
    title: 'AI/ML Engineer',
    company: 'AI Dynamics',
    companyLogo: 'https://ui-avatars.com/api/?name=AI&background=6366f1&color=fff&size=100',
    location: ['Da Nang'],
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
    postedAt: new Date('2026-01-05'),
    recruiterId: 'r1',
    applicantCount: 28,
    isActive: true,
    views: 756,
    clickToApply: 67
  },
  {
    id: '4',
    title: 'DevOps Engineer',
    company: 'CloudScale Inc',
    companyLogo: 'https://ui-avatars.com/api/?name=CS&background=f59e0b&color=fff&size=100',
    location: ['Remote'],
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
    postedAt: new Date('2026-01-04'),
    recruiterId: 'r2',
    applicantCount: 19,
    isActive: true,
    views: 623,
    clickToApply: 52
  },
  {
    id: '5',
    title: 'Product Manager - Tech',
    company: 'StartupHub',
    companyLogo: 'https://ui-avatars.com/api/?name=SH&background=ec4899&color=fff&size=100',
    location: ['Ho Chi Minh City'],
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
    postedAt: new Date('2026-01-03'),
    recruiterId: 'r1',
    applicantCount: 56,
    isActive: true,
    views: 1100,
    clickToApply: 120
  },
  {
    id: '6',
    title: 'QA Automation Engineer',
    company: 'Quality First Ltd',
    companyLogo: 'https://ui-avatars.com/api/?name=QF&background=14b8a6&color=fff&size=100',
    location: ['Ha Noi'],
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
    postedAt: new Date('2026-01-01'),
    recruiterId: 'r2',
    applicantCount: 23,
    isActive: true,
    views: 445,
    clickToApply: 38
  }
];

// Extended candidate profiles with more details for filtering
export const mockCandidateProfiles: CandidateProfile[] = [
  {
    id: 'c1',
    email: 'nguyenvana@email.com',
    name: 'Nguyen Van A',
    role: 'candidate',
    avatar: 'https://ui-avatars.com/api/?name=NV&background=0F2238&color=fff',
    createdAt: new Date('2025-11-10'),
    phone: '0901234567',
    location: 'Ho Chi Minh City',
    expectedSalary: '$3,000 - $4,000',
    yearsOfExperience: 5,
    skills: ['React', 'TypeScript', 'Node.js', 'Python', 'AWS'],
    languages: [
      { language: 'English', level: 'Fluent' },
      { language: 'Vietnamese', level: 'Native' }
    ],
    openToWork: true
  },
  {
    id: 'c2',
    email: 'tranb@email.com',
    name: 'Tran Thi B',
    role: 'candidate',
    avatar: 'https://ui-avatars.com/api/?name=TT&background=38B65F&color=fff',
    createdAt: new Date('2025-11-12'),
    phone: '0912345678',
    location: 'Ha Noi',
    expectedSalary: '$2,500 - $3,500',
    yearsOfExperience: 4,
    skills: ['Java', 'Spring Boot', 'React', 'PostgreSQL', 'Docker'],
    languages: [
      { language: 'English', level: 'Professional' },
      { language: 'Vietnamese', level: 'Native' }
    ],
    openToWork: true
  },
  {
    id: 'c3',
    email: 'lec@email.com',
    name: 'Le Van C',
    role: 'candidate',
    avatar: 'https://ui-avatars.com/api/?name=LV&background=6366f1&color=fff',
    createdAt: new Date('2025-11-14'),
    phone: '0923456789',
    location: 'Da Nang',
    expectedSalary: '$4,000 - $5,500',
    yearsOfExperience: 7,
    skills: ['Python', 'TensorFlow', 'PyTorch', 'NLP', 'AWS'],
    languages: [
      { language: 'English', level: 'Fluent' },
      { language: 'Japanese', level: 'Intermediate' },
      { language: 'Vietnamese', level: 'Native' }
    ],
    openToWork: true
  },
  {
    id: 'c4',
    email: 'phamd@email.com',
    name: 'Pham Thi D',
    role: 'candidate',
    avatar: 'https://ui-avatars.com/api/?name=PD&background=f59e0b&color=fff',
    createdAt: new Date('2025-11-16'),
    phone: '0934567890',
    location: 'Ho Chi Minh City',
    expectedSalary: '$2,000 - $2,500',
    yearsOfExperience: 2,
    skills: ['React', 'JavaScript', 'CSS', 'HTML', 'Node.js'],
    languages: [
      { language: 'English', level: 'Intermediate' },
      { language: 'Vietnamese', level: 'Native' }
    ],
    openToWork: true
  },
  {
    id: 'c5',
    email: 'hoange@email.com',
    name: 'Hoang Van E',
    role: 'candidate',
    avatar: 'https://ui-avatars.com/api/?name=HE&background=ec4899&color=fff',
    createdAt: new Date('2025-11-18'),
    phone: '0945678901',
    location: 'Ha Noi',
    expectedSalary: '$3,500 - $4,500',
    yearsOfExperience: 6,
    skills: ['AWS', 'Kubernetes', 'Docker', 'Terraform', 'Python'],
    languages: [
      { language: 'English', level: 'Fluent' },
      { language: 'Vietnamese', level: 'Native' }
    ],
    openToWork: false
  },
  {
    id: 'c6',
    email: 'vuf@email.com',
    name: 'Vu Thi F',
    role: 'candidate',
    avatar: 'https://ui-avatars.com/api/?name=VF&background=14b8a6&color=fff',
    createdAt: new Date('2025-11-20'),
    phone: '0956789012',
    location: 'Remote',
    expectedSalary: '$2,800 - $3,500',
    yearsOfExperience: 3,
    skills: ['Java', 'Spring Boot', 'Microservices', 'Kafka', 'Redis'],
    languages: [
      { language: 'English', level: 'Professional' },
      { language: 'Vietnamese', level: 'Native' }
    ],
    openToWork: true
  },
  {
    id: 'c7',
    email: 'dingg@email.com',
    name: 'Dinh Van G',
    role: 'candidate',
    avatar: 'https://ui-avatars.com/api/?name=DG&background=8b5cf6&color=fff',
    createdAt: new Date('2025-11-22'),
    phone: '0967890123',
    location: 'Ho Chi Minh City',
    expectedSalary: '$1,500 - $2,000',
    yearsOfExperience: 1,
    skills: ['React', 'JavaScript', 'TypeScript', 'Tailwind'],
    languages: [
      { language: 'English', level: 'Intermediate' },
      { language: 'Vietnamese', level: 'Native' }
    ],
    openToWork: true
  },
  {
    id: 'c8',
    email: 'buh@email.com',
    name: 'Bu Thi H',
    role: 'candidate',
    avatar: 'https://ui-avatars.com/api/?name=BH&background=ef4444&color=fff',
    createdAt: new Date('2025-11-24'),
    phone: '0978901234',
    location: 'Da Nang',
    expectedSalary: '$3,000 - $4,000',
    yearsOfExperience: 5,
    skills: ['Selenium', 'Cypress', 'JavaScript', 'API Testing', 'Jest'],
    languages: [
      { language: 'English', level: 'Fluent' },
      { language: 'Vietnamese', level: 'Native' }
    ],
    openToWork: true
  }
];

// For backward compatibility
export const mockCandidates = mockCandidateProfiles;

// Extended applications with notes
export const mockApplications: Application[] = [
  // Original Applications
  {
    id: 'a1',
    jobId: '1',
    candidateId: 'c1',
    cvId: 'cv1',
    status: 'applied',
    appliedAt: new Date('2026-01-01'),
    matchScore: 85,
    viewedAt: undefined,
    contactedAt: undefined,
    interviewDate: undefined,
    notes: [
      {
        id: 'n1',
        applicationId: 'a1',
        authorId: 'r1',
        authorName: 'HR Manager',
        content: 'Strong React experience, matches most requirements. Schedule for technical interview.',
        createdAt: new Date('2024-01-21')
      }
    ]
  },
  {
    id: 'a2',
    jobId: '1',
    candidateId: 'c2',
    cvId: 'cv2',
    status: 'in_review',
    appliedAt: new Date('2025-12-15'),
    matchScore: 88,
    viewedAt: new Date('2025-12-16'),
    contactedAt: undefined,
    interviewDate: undefined,
    notes: [
      {
        id: 'n2',
        applicationId: 'a2',
        authorId: 'r1',
        authorName: 'HR Manager',
        content: 'Excellent technical skills. Passed phone screening.',
        createdAt: new Date('2024-01-20')
      },
      {
        id: 'n3',
        applicationId: 'a2',
        authorId: 'r1',
        authorName: 'Tech Lead',
        content: 'Scheduled for technical round on Feb 1st.',
        createdAt: new Date('2024-01-22')
      }
    ]
  },
  {
    id: 'a3',
    jobId: '1',
    candidateId: 'c3',
    cvId: 'cv3',
    status: 'applied',
    appliedAt: new Date('2025-12-25'),
    matchScore: 92
  },
  {
    id: 'a4',
    jobId: '1',
    candidateId: 'c4',
    cvId: 'cv4',
    status: 'applied',
    appliedAt: new Date('2025-12-26'),
    matchScore: 65
  },
  {
    id: 'a5',
    jobId: '1',
    candidateId: 'c5',
    cvId: 'cv5',
    status: 'interview',
    appliedAt: new Date('2025-12-22'),
    matchScore: 78,
    viewedAt: new Date('2025-12-23'),
    contactedAt: new Date('2025-12-24'),
    notes: [
      {
        id: 'n4',
        applicationId: 'a5',
        authorId: 'r1',
        authorName: 'HR Manager',
        content: 'Good DevOps background, but we need stronger frontend skills. Pending discussion.',
        createdAt: new Date('2025-12-24')
      }
    ]
  },
  {
    id: 'a6',
    jobId: '1',
    candidateId: 'c6',
    cvId: 'cv6',
    status: 'rejected',
    appliedAt: new Date('2026-01-03'),
    matchScore: 45,
    viewedAt: new Date('2026-01-05'),
    rejectionReason: 'Insufficient experience with React ecosystem'
  },
  {
    id: 'a7',
    jobId: '1',
    candidateId: 'c7',
    cvId: 'cv7',
    status: 'applied',
    appliedAt: new Date('2026-01-05'),
    matchScore: 72
  },
  {
    id: 'a8',
    jobId: '1',
    candidateId: 'c8',
    cvId: 'cv8',
    status: 'offered',
    appliedAt: new Date('2025-12-05'),
    matchScore: 90,
    viewedAt: new Date('2025-12-06'),
    contactedAt: new Date('2025-12-07'),
    interviewDate: new Date('2025-12-15'),
    notes: [
      {
        id: 'n5',
        applicationId: 'a8',
        authorId: 'r1',
        authorName: 'HR Manager',
        content: 'Outstanding performance in all rounds. Extended offer.',
        createdAt: new Date('2025-12-18')
      }
    ]
  },
  {
    id: 'a9',
    jobId: '2',
    candidateId: 'c2',
    cvId: 'cv2',
    status: 'applied',
    appliedAt: new Date('2025-12-22'),
    matchScore: 92
  },
  {
    id: 'a10',
    jobId: '3',
    candidateId: 'c3',
    cvId: 'cv3',
    status: 'interview',
    appliedAt: new Date('2026-01-04'),
    matchScore: 95,
    viewedAt: new Date('2026-01-05'),
    contactedAt: new Date('2026-01-05'),
    interviewDate: new Date('2026-02-05')
  },
  // New Fake Applications for Better Visualization
  // Job 1: Senior React Developer (More applicants)
  {
    id: 'a11',
    jobId: '1',
    candidateId: 'c2',
    cvId: 'cv2',
    status: 'in_review',
    appliedAt: new Date('2025-12-28'),
    matchScore: 78
  },
  {
    id: 'a12',
    jobId: '1',
    candidateId: 'c3',
    cvId: 'cv3',
    status: 'applied',
    appliedAt: new Date('2025-12-29'),
    matchScore: 82
  },
  {
    id: 'a13',
    jobId: '1',
    candidateId: 'c4',
    cvId: 'cv4',
    status: 'applied',
    appliedAt: new Date('2025-12-30'),
    matchScore: 60
  },
  {
    id: 'a14',
    jobId: '1',
    candidateId: 'c5',
    cvId: 'cv5',
    status: 'applied',
    appliedAt: new Date('2026-01-02'),
    matchScore: 75
  },
  {
    id: 'a15',
    jobId: '1',
    candidateId: 'c7',
    cvId: 'cv7',
    status: 'applied',
    appliedAt: new Date('2026-01-06'),
    matchScore: 88
  },

  // Job 3: AI/ML Engineer
  {
    id: 'a20',
    jobId: '3',
    candidateId: 'c1',
    cvId: 'cv1',
    status: 'applied',
    appliedAt: new Date('2026-01-01'),
    matchScore: 70
  },
  {
    id: 'a21',
    jobId: '3',
    candidateId: 'c4',
    cvId: 'cv4',
    status: 'in_review',
    appliedAt: new Date('2026-01-02'),
    matchScore: 65
  },
  {
    id: 'a22',
    jobId: '3',
    candidateId: 'c5',
    cvId: 'cv5',
    status: 'applied',
    appliedAt: new Date('2026-01-03'),
    matchScore: 85
  },
  {
    id: 'a23',
    jobId: '3',
    candidateId: 'c6',
    cvId: 'cv6',
    status: 'applied',
    appliedAt: new Date('2026-01-05'),
    matchScore: 80
  },
  {
    id: 'a24',
    jobId: '3',
    candidateId: 'c2',
    cvId: 'cv2',
    status: 'applied',
    appliedAt: new Date('2025-12-29'),
    matchScore: 75
  },

  // Job 5: Product Manager - Tech
  {
    id: 'a30',
    jobId: '5',
    candidateId: 'c1',
    cvId: 'cv1',
    status: 'applied',
    appliedAt: new Date('2025-12-27'),
    matchScore: 60
  },
  {
    id: 'a31',
    jobId: '5',
    candidateId: 'c6',
    cvId: 'cv6',
    status: 'in_review',
    appliedAt: new Date('2025-12-30'),
    matchScore: 85
  },
  {
    id: 'a32',
    jobId: '5',
    candidateId: 'c7',
    cvId: 'cv7',
    status: 'applied',
    appliedAt: new Date('2026-01-02'),
    matchScore: 70
  },
  {
    id: 'a33',
    jobId: '5',
    candidateId: 'c8',
    cvId: 'cv8',
    status: 'interview',
    appliedAt: new Date('2026-01-03'),
    matchScore: 90
  },

  // Job 2: Full Stack Java (Expired but needs data)
  {
    id: 'a40',
    jobId: '2',
    candidateId: 'c1',
    cvId: 'cv1',
    status: 'rejected',
    appliedAt: new Date('2025-12-10'),
    matchScore: 50
  },
  {
    id: 'a41',
    jobId: '2',
    candidateId: 'c5',
    cvId: 'cv5',
    status: 'offered',
    appliedAt: new Date('2025-12-15'),
    matchScore: 95
  },
  // Job 4: DevOps
  {
    id: 'a50',
    jobId: '4',
    candidateId: 'c5',
    cvId: 'cv5',
    status: 'offered',
    appliedAt: new Date('2025-12-20'),
    matchScore: 98
  },
  {
    id: 'a51',
    jobId: '4',
    candidateId: 'c3',
    cvId: 'cv3',
    status: 'applied',
    appliedAt: new Date('2026-01-05'),
    matchScore: 70
  }
];

export const mockCVs: CV[] = [
  {
    id: 'cv1',
    candidateId: 'c1',
    fileName: 'nguyen_van_a_resume.pdf',
    fileUrl: '/uploads/cv1.pdf',
    uploadedAt: new Date('2025-12-30'),
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
    },
    atsBreakdown: {
      skillsMatch: 90,
      keywordsMatch: 85,
      formattingScore: 95,
      missingKeywords: ['Redux', 'GraphQL testing'],
      formattingIssues: [],
      feedback: ['Strong match for React roles', 'Consider adding more details on leadership experience']
    }
  },
  // {
  //   id: 'cv2',
  //   candidateId: 'c2',
  //   fileName: 'tran_thi_b_cv.pdf',
  //   fileUrl: '/uploads/cv2.pdf',
  //   uploadedAt: new Date('2025-12-31'),
  //   atsScore: 88,
  //   parsedData: {
  //     name: 'Tran Thi B',
  //     email: 'tranb@email.com',
  //     phone: '0912345678',
  //     skills: ['Java', 'Spring Boot', 'React', 'PostgreSQL', 'Docker'],
  //     experience: [
  //       {
  //         title: 'Full Stack Developer',
  //         company: 'FinTech Corp',
  //         duration: '2020 - Present',
  //         description: 'Built scalable microservices for banking platform'
  //       }
  //     ],
  //     education: [
  //       {
  //         degree: 'Bachelor of Computer Science',
  //         institution: 'HUST',
  //         year: '2020'
  //       }
  //     ],
  //     summary: 'Full stack developer with expertise in Java and React'
  //   }
  // },
  // {
  //   id: 'cv3',
  //   candidateId: 'c3',
  //   fileName: 'le_van_c_resume.pdf',
  //   fileUrl: '/uploads/cv3.pdf',
  //   uploadedAt: new Date('2026-01-03'),
  //   atsScore: 92,
  //   parsedData: {
  //     name: 'Le Van C',
  //     email: 'lec@email.com',
  //     phone: '0923456789',
  //     skills: ['Python', 'TensorFlow', 'PyTorch', 'NLP', 'AWS'],
  //     experience: [
  //       {
  //         title: 'Senior ML Engineer',
  //         company: 'AI Startup',
  //         duration: '2019 - Present',
  //         description: 'Developed AI-powered APIs and recommendation systems'
  //       },
  //       {
  //         title: 'Data Scientist',
  //         company: 'BigData Inc',
  //         duration: '2017 - 2019',
  //         description: 'Built NLP models for sentiment analysis'
  //       }
  //     ],
  //     education: [
  //       {
  //         degree: 'Master of Computer Science',
  //         institution: 'HCMUT',
  //         year: '2017'
  //       }
  //     ],
  //     summary: 'ML specialist with 7+ years experience in AI/ML'
  //   }
  // },
  // {
  //   id: 'cv4',
  //   candidateId: 'c4',
  //   fileName: 'pham_thi_d_cv.pdf',
  //   fileUrl: '/uploads/cv4.pdf',
  //   uploadedAt: new Date('2025-12-28'),
  //   atsScore: 70,
  //   parsedData: {
  //     name: 'Pham Thi D',
  //     email: 'phamd@email.com',
  //     phone: '0934567890',
  //     skills: ['React', 'JavaScript', 'CSS', 'HTML', 'Node.js'],
  //     experience: [
  //       {
  //         title: 'Junior Frontend Developer',
  //         company: 'Web Agency',
  //         duration: '2022 - Present',
  //         description: 'Developed responsive websites for clients'
  //       }
  //     ],
  //     education: [
  //       {
  //         degree: 'Bachelor of IT',
  //         institution: 'UIT',
  //         year: '2022'
  //       }
  //     ],
  //     summary: 'Junior developer eager to learn and grow'
  //   }
  // },
  // {
  //   id: 'cv5',
  //   candidateId: 'c5',
  //   fileName: 'hoang_van_e_resume.pdf',
  //   fileUrl: '/uploads/cv5.pdf',
  //   uploadedAt: new Date('2024-01-30'),
  //   atsScore: 82,
  //   parsedData: {
  //     name: 'Hoang Van E',
  //     email: 'hoange@email.com',
  //     phone: '0945678901',
  //     skills: ['AWS', 'Kubernetes', 'Docker', 'Terraform', 'Python'],
  //     experience: [
  //       {
  //         title: 'Senior DevOps Engineer',
  //         company: 'CloudScale Inc',
  //         duration: '2020 - Present',
  //         description: 'Managed cloud infrastructure and CI/CD pipelines'
  //       },
  //       {
  //         title: 'DevOps Engineer',
  //         company: 'TechOps',
  //         duration: '2018 - 2020',
  //         description: 'Implemented containerization strategies'
  //       }
  //     ],
  //     education: [
  //       {
  //         degree: 'Bachelor of Computer Science',
  //         institution: 'PTIT',
  //         year: '2018'
  //       }
  //     ],
  //     summary: 'DevOps engineer with strong cloud and automation skills'
  //   }
  // },
  // {
  //   id: 'cv6',
  //   candidateId: 'c6',
  //   fileName: 'vu_thi_f_cv.pdf',
  //   fileUrl: '/uploads/cv6.pdf',
  //   uploadedAt: new Date('2024-02-01'),
  //   atsScore: 75,
  //   parsedData: {
  //     name: 'Vu Thi F',
  //     email: 'vuf@email.com',
  //     phone: '0956789012',
  //     skills: ['Java', 'Spring Boot', 'Microservices', 'Kafka', 'Redis'],
  //     experience: [
  //       {
  //         title: 'Backend Developer',
  //         company: 'Enterprise Solutions',
  //         duration: '2021 - Present',
  //         description: 'Built microservices for enterprise clients'
  //       }
  //     ],
  //     education: [
  //       {
  //         degree: 'Bachelor of Software Engineering',
  //         institution: 'HCMUT',
  //         year: '2021'
  //       }
  //     ],
  //     summary: 'Backend developer specializing in microservices'
  //   }
  // },
  // {
  //   id: 'cv7',
  //   candidateId: 'c7',
  //   fileName: 'dinh_van_g_resume.pdf',
  //   fileUrl: '/uploads/cv7.pdf',
  //   uploadedAt: new Date('2024-02-05'),
  //   atsScore: 65,
  //   parsedData: {
  //     name: 'Dinh Van G',
  //     email: 'dingg@email.com',
  //     phone: '0967890123',
  //     skills: ['React', 'JavaScript', 'TypeScript', 'Tailwind'],
  //     experience: [
  //       {
  //         title: 'Frontend Developer Intern',
  //         company: 'Startup ABC',
  //         duration: '2023 - Present',
  //         description: 'Assisted in building web applications'
  //       }
  //     ],
  //     education: [
  //       {
  //         degree: 'Bachelor of IT',
  //         institution: 'FPT University',
  //         year: '2023'
  //       }
  //     ],
  //     summary: 'Fresh graduate with passion for frontend development'
  //   }
  // },
  // {
  //   id: 'cv8',
  //   candidateId: 'c8',
  //   fileName: 'bu_thi_h_cv.pdf',
  //   fileUrl: '/uploads/cv8.pdf',
  //   uploadedAt: new Date('2024-02-08'),
  //   atsScore: 88,
  //   parsedData: {
  //     name: 'Bu Thi H',
  //     email: 'buh@email.com',
  //     phone: '0978901234',
  //     skills: ['Selenium', 'Cypress', 'JavaScript', 'API Testing', 'Jest'],
  //     experience: [
  //       {
  //         title: 'Senior QA Engineer',
  //         company: 'Quality First Ltd',
  //         duration: '2020 - Present',
  //         description: 'Led automation testing initiatives'
  //       },
  //       {
  //         title: 'QA Engineer',
  //         company: 'TestCorp',
  //         duration: '2018 - 2020',
  //         description: 'Developed automated test suites'
  //       }
  //     ],
  //     education: [
  //       {
  //         degree: 'Bachelor of Computer Science',
  //         institution: 'Da Nang University',
  //         year: '2018'
  //       }
  //     ],
  //     summary: 'QA specialist with 5+ years of automation experience'
  //   }
  // }
];

export const trendingSkills = [
  'Java', 'ReactJS', '.NET', 'Tester', 'PHP', 'Business Analysis', 'NodeJS', 'Python', 'DevOps', 'AWS'
];

export const cities = [
  'All Cities', 'Ho Chi Minh City', 'Ha Noi', 'Da Nang', 'Can Tho', 'Binh Duong'
];

export const jobTypes = [
  { value: 'all', label: 'All Types' },
  { value: 'full-time', label: 'Full-time' },
  { value: 'part-time', label: 'Part-time' },
  { value: 'contract', label: 'Contract' },
  { value: 'remote', label: 'Remote' }
];

export const experienceLevels = [
  { value: 'all', label: 'All Levels' },
  { value: '0-1', label: '0-1 years' },
  { value: '1-3', label: '1-3 years' },
  { value: '3-5', label: '3-5 years' },
  { value: '5+', label: '5+ years' }
];

export const languageLevels = [
  'Basic', 'Intermediate', 'Professional', 'Fluent', 'Native'
];

export const mockCompanies = [
  {
    id: '1',
    name: 'TechVision Corp',
    logo: 'https://ui-avatars.com/api/?name=TV&background=0F2238&color=fff&size=100',
    location: 'Ho Chi Minh City',
    industry: 'Software Development',
    employees: '500-1000',
    description: 'Leading provider of enterprise software solutions.',
    rating: 4.8,
    reviews: 124,
    followers: 8500,
    workingTime: 'Monday - Friday',
    specialties: ['Enterprise Software', 'Cloud Solutions', 'Digital Transformation'],
    introduction: 'TechVision Corp is a global leader in providing innovative software solutions for enterprises. We specialize in digital transformation, cloud computing, and AI-driven applications. Our mission is to empower businesses with technology that drives growth and efficiency.',
    techStack: {
      keySkills: ['Java', 'JavaScript', 'Python', 'Oracle', 'AngularJS', 'ReactJS'],
      mobile: 'React Native (Javascript), Flutter (Dart), Mini App',
      web: 'AngularJs, ReactJs, Micro FrontEnd, HTML/Javascript/CSS',
      backend: 'SpringBoot (Java), Golang, Hasura, GraphQL, MongoDB, Oracle, Microservice',
      cloud: 'AWS, Google Cloud, Viettel Cloud, Kubernetes, Microsoft Azure, Multi DC'
    },
    reasonsToJoin: [
      'Top-tier compensation and benefits package',
      'Flexible working hours & Hybrid working model (2 days remote/week)',
      'Annual company trip, team building activities',
      'Premium healthcare insurance for you and your family',
      'Opportunity to work with latest technologies and global experts'
    ],
    reviewsList: [
      {
        id: 1,
        date: 'Tháng Hai 2025',
        title: 'Công ty tốt, chế độ lương thưởng hấp dẫn',
        rating: 5,
        isRecommended: true,
        content: 'Môi trường làm việc chuyên nghiệp, đồng nghiệp thân thiện. Sếp tâm lý, luôn lắng nghe nhân viên. Có nhiều cơ hội học hỏi và phát triển bản thân. Lương thưởng cạnh tranh so với thị trường.',
        details: {
          salary: 5,
          training: 5,
          care: 5,
          culture: 5,
          workspace: 5
        }
      },
      {
        id: 2,
        date: 'Tháng Một 2025',
        title: 'Chế độ ok. Vài người hơi khó tính thôi, nhưng đâu chả có this có that',
        rating: 4,
        isRecommended: true,
        content: 'Chế độ phúc lợi tốt, bảo hiểm full lương. Tuy nhiên quy trình đôi khi hơi rườm rà. Văn phòng đẹp, xịn xò. Pantry luôn đầy ắp đồ ăn.',
        details: {
          salary: 4,
          training: 5,
          care: 4,
          culture: 3,
          workspace: 5
        }
      }
    ]
  },
  {
    id: '2',
    name: 'FinTech Solutions',
    logo: 'https://ui-avatars.com/api/?name=FS&background=38B65F&color=fff&size=100',
    location: 'Ha Noi',
    industry: 'Financial Technology',
    employees: '100-500',
    description: 'Revolutionizing banking with secure and scalable tech.',
    rating: 4.5,
    reviews: 89,
    followers: 4200,
    workingTime: 'Monday - Friday',
    specialties: ['FinTech', 'Blockchain', 'Cybersecurity'],
    introduction: 'FinTech Solutions is dedicated to modernizing the financial sector. We build secure, modular, and scalable banking platforms that enable financial institutions to innovate faster.'
  },
  {
    id: '3',
    name: 'AI Dynamics',
    logo: 'https://ui-avatars.com/api/?name=AI&background=6366f1&color=fff&size=100',
    location: 'Da Nang',
    industry: 'Artificial Intelligence',
    employees: '50-100',
    description: 'Building the future with advanced AI & ML models.',
    rating: 4.9,
    reviews: 56,
    followers: 3100,
    workingTime: 'Flexible',
    specialties: ['Artificial Intelligence', 'Machine Learning', 'Data Science'],
    introduction: 'AI Dynamics is at the forefront of AI research and application. We develop cutting-edge models for NLP, computer vision, and predictive analytics to solve complex real-world problems.'
  },
  {
    id: '4',
    name: 'CloudScale Inc',
    logo: 'https://ui-avatars.com/api/?name=CS&background=f59e0b&color=fff&size=100',
    location: 'Remote',
    industry: 'Cloud Infrastructure',
    employees: '200-500',
    description: 'Global leader in cloud computing and DevOps services.',
    rating: 4.7,
    reviews: 102,
    followers: 5600,
    workingTime: 'Remote / Flexible',
    specialties: ['Cloud Computing', 'DevOps', 'Infrastructure as Code'],
    introduction: 'CloudScale Inc helps businesses scale their infrastructure with ease. We provide comprehensive cloud services, from migration to management, ensuring high availability and performance.'
  },
  {
    id: '5',
    name: 'StartupHub',
    logo: 'https://ui-avatars.com/api/?name=SH&background=ec4899&color=fff&size=100',
    location: 'Ho Chi Minh City',
    industry: 'Internet / Product',
    employees: '50-150',
    description: 'Fast-growing startup incubator and product studio.',
    rating: 4.6,
    reviews: 45,
    followers: 2800,
    workingTime: 'Monday - Friday',
    specialties: ['Product Management', 'Startup Incubation', 'Venture Capital'],
    introduction: 'StartupHub is where great ideas become reality. We partner with founders to build, launch, and scale successful products. Join a vibrant community of innovators and creators.'
  },
  {
    id: '6',
    name: 'Quality First Ltd',
    logo: 'https://ui-avatars.com/api/?name=QF&background=14b8a6&color=fff&size=100',
    location: 'Ha Noi',
    industry: 'Quality Assurance',
    employees: '1000+',
    description: 'Ensuring software excellence through automation.',
    rating: 4.4,
    reviews: 210,
    followers: 1200,
    workingTime: 'Monday - Friday',
    specialties: ['Software Testing', 'QA Automation', 'Performance Testing'],
    introduction: 'Quality First Ltd is committed to delivering bug-free software. We offer a full range of QA services, including manual testing, automation, and security audits.'
  },
  {
    id: '7',
    name: 'FPT Software',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/FPT_logo_2010.svg/2560px-FPT_logo_2010.svg.png',
    location: 'Global',
    industry: 'IT Services',
    employees: '10000+',
    description: 'Vietnam’s largest IT software & services company.',
    rating: 4.2,
    reviews: 1500,
    followers: 45000,
    workingTime: 'Monday - Friday',
    specialties: ['Outsourcing', 'Digital Platforms', 'Enterprise Services'],
    introduction: 'FPT Software is the leading software outsourcing company in Vietnam. With a global presence, we provide world-class technology services to clients across various industries, from automotive to healthcare.'
  },
  {
    id: '8',
    name: 'Viettel Group',
    logo: 'https://yourway.viettel.vn/images/og-image.png',
    location: 'Ha Noi',
    industry: 'Telecommunications',
    employees: '10000+',
    description: 'Leading telecommunications group in Vietnam.',
    rating: 4.5,
    reviews: 2300,
    followers: 60000,
    workingTime: 'Monday - Friday',
    specialties: ['Telecommunications', 'Cyber Security', 'High Tech Manufacturing'],
    introduction: 'Viettel Group is a multinational telecommunications company headquartered in Hanoi. We are driving the digital society with our extensive network infrastructure and innovative digital solutions.'
  },
  {
    id: '9',
    name: 'VNG Corporation',
    logo: 'https://mondialbrand.com/wp-content/uploads/2024/02/vng_corporation-logo_brandlogos.net_ysr15.png',
    location: 'Ho Chi Minh City',
    industry: 'Internet / Gaming',
    employees: '2000-5000',
    description: 'Vietnam’s first unicorn startup, specializing in online games, platforms, and payments.',
    rating: 4.3,
    reviews: 890,
    followers: 25000,
    workingTime: 'Monday - Friday',
    specialties: ['Game Development', 'Zalo', 'ZaloPay', 'Cloud Services'],
    introduction: 'VNG believes in the power of the Internet to change lives. We are dedicated to bringing meaningful experiences to our users through our ecosystem of digital products.'
  },
  {
    id: '10',
    name: 'MoMo',
    logo: 'https://static.momocdn.net/app/img/payment/logo.png',
    location: 'Ho Chi Minh City',
    industry: 'Fintech',
    employees: '1000-2000',
    description: 'The number one super app in Vietnam.',
    rating: 4.4,
    reviews: 650,
    followers: 18000,
    workingTime: 'Monday - Friday',
    specialties: ['Mobile Payment', 'Financial Services', 'Digital Wallet'],
    introduction: 'MoMo is an e-wallet and super app that allows users to pay, transfer money, and access financial services easily. We are committed to driving financial inclusion in Vietnam.'
  },
  {
    id: '11',
    name: 'ZaloPay',
    logo: 'https://cdn.haitrieu.com/wp-content/uploads/2022/10/Logo-ZaloPay-Square.png',
    location: 'Ho Chi Minh City',
    industry: 'Fintech',
    employees: '500-1000',
    description: 'Leading mobile payment application in Vietnam.',
    rating: 4.2,
    reviews: 420,
    followers: 12000,
    workingTime: 'Monday - Friday',
    specialties: ['E-wallet', 'Payment Gateway', 'Financial Technology'],
    introduction: 'ZaloPay provides a seamless payment experience for millions of users. Integrated with Zalo, we offer a convenient way to pay bills, transfer money, and more.'
  },
  {
    id: '12',
    name: 'Vingroup',
    logo: 'https://upload.wikimedia.org/wikipedia/vi/thumb/9/98/Vingroup_logo.svg/2560px-Vingroup_logo.svg.png',
    location: 'Ha Noi',
    industry: 'Conglomerate',
    employees: '10000+',
    description: 'The largest private conglomerate in Vietnam.',
    rating: 4.0,
    reviews: 3500,
    followers: 80000,
    workingTime: 'Monday - Friday',
    specialties: ['Real Estate', 'Education', 'Healthcare', 'Technology', 'Industrials'],
    introduction: 'Vingroup is a multi-sector corporation focusing on technology, industry, and services. We aim to create a better life for people and contribute to the modernization of Vietnam.'
  },
  {
    id: '13',
    name: 'Shopee Vietnam',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fe/Shopee.svg/2560px-Shopee.svg.png',
    location: 'Ho Chi Minh City',
    industry: 'E-commerce',
    employees: '1000-5000',
    description: 'Leading e-commerce platform in Southeast Asia.',
    rating: 4.1,
    reviews: 1200,
    followers: 40000,
    workingTime: 'Monday - Friday',
    specialties: ['E-commerce', 'Logistics', 'Digital Payments'],
    introduction: 'Shopee is the leading e-commerce platform in Southeast Asia and Taiwan. We provide a secure, fast, and enjoyable online shopping experience for millions of users.'
  }
];

export const mockJobInvitations: import('@/types').JobInvitation[] = [
  {
    id: 'inv1',
    jobId: '1',
    candidateId: 'c1',
    recruiterId: 'r1',
    companyName: 'TechVision Corp',
    jobTitle: 'Senior React Developer',
    message: 'Hi Nguyen, I was impressed by your profile and experience with React. We have an opening that I think would be a great fit for you.',
    sentAt: new Date('2026-01-18'),
    status: 'pending'
  },
  {
    id: 'inv2',
    jobId: '3',
    candidateId: 'c1',
    recruiterId: 'r1',
    companyName: 'AI Dynamics',
    jobTitle: 'AI/ML Engineer',
    message: 'Hello, we are looking for someone with your background in AI. improving our recommendation engine.',
    sentAt: new Date('2026-01-15'),
    status: 'pending'
  },
  {
    id: 'inv3',
    jobId: '2',
    candidateId: 'c1',
    recruiterId: 'r2',
    companyName: 'FinTech Solutions',
    jobTitle: 'Full Stack Java Developer',
    message: 'Greetings! Your skills in Java and React caught our eye. We would love to chat with you.',
    sentAt: new Date('2026-01-10'),
    status: 'declined'
  }
];
// Mock Recruiters for Team Management
export const mockRecruiters: Recruiter[] = [
  {
    id: 'r1',
    email: 'hr.manager@company.com',
    name: 'Sarah Manager',
    role: 'recruiter',
    subRole: 'manager',
    companyId: 'comp1',
    status: 'active',
    avatar: 'https://ui-avatars.com/api/?name=SM&background=0284c7&color=fff',
    createdAt: new Date('2024-01-01')
  },
  {
    id: 'r2',
    email: 'hr.member1@company.com',
    name: 'John Member',
    role: 'recruiter',
    subRole: 'member',
    companyId: 'comp1',
    status: 'active',
    avatar: 'https://ui-avatars.com/api/?name=JM&background=0ea5e9&color=fff',
    createdAt: new Date('2024-02-15')
  },
  {
    id: 'r3',
    email: 'hr.member2@company.com',
    name: 'Emily Staff',
    role: 'recruiter',
    subRole: 'member',
    companyId: 'comp1',
    status: 'active',
    createdAt: new Date('2024-03-20')
  }
];


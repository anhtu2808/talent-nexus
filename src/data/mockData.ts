import { Job, Application, CV, CandidateProfile, ApplicationNote } from '@/types';

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
    isActive: true,
    views: 1250,
    clickToApply: 145
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
    isActive: true,
    views: 890,
    clickToApply: 98
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
    isActive: true,
    views: 756,
    clickToApply: 67
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
    isActive: true,
    views: 623,
    clickToApply: 52
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
    isActive: true,
    views: 1100,
    clickToApply: 120
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
    createdAt: new Date('2024-01-10'),
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
    createdAt: new Date('2024-01-12'),
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
    createdAt: new Date('2024-01-14'),
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
    createdAt: new Date('2024-01-16'),
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
    createdAt: new Date('2024-01-18'),
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
    createdAt: new Date('2024-01-20'),
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
    createdAt: new Date('2024-01-22'),
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
    createdAt: new Date('2024-01-24'),
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
  {
    id: 'a1',
    jobId: '1',
    candidateId: 'c1',
    cvId: 'cv1',
    status: 'new',
    appliedAt: new Date('2024-01-20'),
    matchScore: 85,
    viewedAt: new Date('2024-01-21'),
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
    status: 'interviewing',
    appliedAt: new Date('2024-01-18'),
    matchScore: 88,
    viewedAt: new Date('2024-01-19'),
    contactedAt: new Date('2024-01-20'),
    interviewDate: new Date('2024-02-01'),
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
    status: 'new',
    appliedAt: new Date('2024-01-25'),
    matchScore: 92
  },
  {
    id: 'a4',
    jobId: '1',
    candidateId: 'c4',
    cvId: 'cv4',
    status: 'new',
    appliedAt: new Date('2024-01-26'),
    matchScore: 65
  },
  {
    id: 'a5',
    jobId: '1',
    candidateId: 'c5',
    cvId: 'cv5',
    status: 'interviewing',
    appliedAt: new Date('2024-01-22'),
    matchScore: 78,
    viewedAt: new Date('2024-01-23'),
    contactedAt: new Date('2024-01-24'),
    notes: [
      {
        id: 'n4',
        applicationId: 'a5',
        authorId: 'r1',
        authorName: 'HR Manager',
        content: 'Good DevOps background, but we need stronger frontend skills. Pending discussion.',
        createdAt: new Date('2024-01-24')
      }
    ]
  },
  {
    id: 'a6',
    jobId: '1',
    candidateId: 'c6',
    cvId: 'cv6',
    status: 'rejected',
    appliedAt: new Date('2024-01-19'),
    matchScore: 45,
    viewedAt: new Date('2024-01-20'),
    rejectionReason: 'Insufficient experience with React ecosystem'
  },
  {
    id: 'a7',
    jobId: '1',
    candidateId: 'c7',
    cvId: 'cv7',
    status: 'new',
    appliedAt: new Date('2024-01-27'),
    matchScore: 72
  },
  {
    id: 'a8',
    jobId: '1',
    candidateId: 'c8',
    cvId: 'cv8',
    status: 'hired',
    appliedAt: new Date('2024-01-15'),
    matchScore: 90,
    viewedAt: new Date('2024-01-16'),
    contactedAt: new Date('2024-01-17'),
    interviewDate: new Date('2024-01-25'),
    notes: [
      {
        id: 'n5',
        applicationId: 'a8',
        authorId: 'r1',
        authorName: 'HR Manager',
        content: 'Outstanding performance in all rounds. Extended offer.',
        createdAt: new Date('2024-01-28')
      }
    ]
  },
  {
    id: 'a9',
    jobId: '2',
    candidateId: 'c2',
    cvId: 'cv2',
    status: 'new',
    appliedAt: new Date('2024-01-22'),
    matchScore: 92
  },
  {
    id: 'a10',
    jobId: '3',
    candidateId: 'c3',
    cvId: 'cv3',
    status: 'interviewing',
    appliedAt: new Date('2024-01-25'),
    matchScore: 95,
    viewedAt: new Date('2024-01-26'),
    contactedAt: new Date('2024-01-27'),
    interviewDate: new Date('2024-02-05')
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
    candidateId: 'c2',
    fileName: 'tran_thi_b_cv.pdf',
    fileUrl: '/uploads/cv2.pdf',
    uploadedAt: new Date('2024-02-10'),
    atsScore: 88,
    parsedData: {
      name: 'Tran Thi B',
      email: 'tranb@email.com',
      phone: '0912345678',
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
          institution: 'HUST',
          year: '2020'
        }
      ],
      summary: 'Full stack developer with expertise in Java and React'
    }
  },
  {
    id: 'cv3',
    candidateId: 'c3',
    fileName: 'le_van_c_resume.pdf',
    fileUrl: '/uploads/cv3.pdf',
    uploadedAt: new Date('2024-03-05'),
    atsScore: 92,
    parsedData: {
      name: 'Le Van C',
      email: 'lec@email.com',
      phone: '0923456789',
      skills: ['Python', 'TensorFlow', 'PyTorch', 'NLP', 'AWS'],
      experience: [
        {
          title: 'Senior ML Engineer',
          company: 'AI Startup',
          duration: '2019 - Present',
          description: 'Developed AI-powered APIs and recommendation systems'
        },
        {
          title: 'Data Scientist',
          company: 'BigData Inc',
          duration: '2017 - 2019',
          description: 'Built NLP models for sentiment analysis'
        }
      ],
      education: [
        {
          degree: 'Master of Computer Science',
          institution: 'HCMUT',
          year: '2017'
        }
      ],
      summary: 'ML specialist with 7+ years experience in AI/ML'
    }
  },
  {
    id: 'cv4',
    candidateId: 'c4',
    fileName: 'pham_thi_d_cv.pdf',
    fileUrl: '/uploads/cv4.pdf',
    uploadedAt: new Date('2024-01-28'),
    atsScore: 70,
    parsedData: {
      name: 'Pham Thi D',
      email: 'phamd@email.com',
      phone: '0934567890',
      skills: ['React', 'JavaScript', 'CSS', 'HTML', 'Node.js'],
      experience: [
        {
          title: 'Junior Frontend Developer',
          company: 'Web Agency',
          duration: '2022 - Present',
          description: 'Developed responsive websites for clients'
        }
      ],
      education: [
        {
          degree: 'Bachelor of IT',
          institution: 'UIT',
          year: '2022'
        }
      ],
      summary: 'Junior developer eager to learn and grow'
    }
  },
  {
    id: 'cv5',
    candidateId: 'c5',
    fileName: 'hoang_van_e_resume.pdf',
    fileUrl: '/uploads/cv5.pdf',
    uploadedAt: new Date('2024-01-30'),
    atsScore: 82,
    parsedData: {
      name: 'Hoang Van E',
      email: 'hoange@email.com',
      phone: '0945678901',
      skills: ['AWS', 'Kubernetes', 'Docker', 'Terraform', 'Python'],
      experience: [
        {
          title: 'Senior DevOps Engineer',
          company: 'CloudScale Inc',
          duration: '2020 - Present',
          description: 'Managed cloud infrastructure and CI/CD pipelines'
        },
        {
          title: 'DevOps Engineer',
          company: 'TechOps',
          duration: '2018 - 2020',
          description: 'Implemented containerization strategies'
        }
      ],
      education: [
        {
          degree: 'Bachelor of Computer Science',
          institution: 'PTIT',
          year: '2018'
        }
      ],
      summary: 'DevOps engineer with strong cloud and automation skills'
    }
  },
  {
    id: 'cv6',
    candidateId: 'c6',
    fileName: 'vu_thi_f_cv.pdf',
    fileUrl: '/uploads/cv6.pdf',
    uploadedAt: new Date('2024-02-01'),
    atsScore: 75,
    parsedData: {
      name: 'Vu Thi F',
      email: 'vuf@email.com',
      phone: '0956789012',
      skills: ['Java', 'Spring Boot', 'Microservices', 'Kafka', 'Redis'],
      experience: [
        {
          title: 'Backend Developer',
          company: 'Enterprise Solutions',
          duration: '2021 - Present',
          description: 'Built microservices for enterprise clients'
        }
      ],
      education: [
        {
          degree: 'Bachelor of Software Engineering',
          institution: 'HCMUT',
          year: '2021'
        }
      ],
      summary: 'Backend developer specializing in microservices'
    }
  },
  {
    id: 'cv7',
    candidateId: 'c7',
    fileName: 'dinh_van_g_resume.pdf',
    fileUrl: '/uploads/cv7.pdf',
    uploadedAt: new Date('2024-02-05'),
    atsScore: 65,
    parsedData: {
      name: 'Dinh Van G',
      email: 'dingg@email.com',
      phone: '0967890123',
      skills: ['React', 'JavaScript', 'TypeScript', 'Tailwind'],
      experience: [
        {
          title: 'Frontend Developer Intern',
          company: 'Startup ABC',
          duration: '2023 - Present',
          description: 'Assisted in building web applications'
        }
      ],
      education: [
        {
          degree: 'Bachelor of IT',
          institution: 'FPT University',
          year: '2023'
        }
      ],
      summary: 'Fresh graduate with passion for frontend development'
    }
  },
  {
    id: 'cv8',
    candidateId: 'c8',
    fileName: 'bu_thi_h_cv.pdf',
    fileUrl: '/uploads/cv8.pdf',
    uploadedAt: new Date('2024-02-08'),
    atsScore: 88,
    parsedData: {
      name: 'Bu Thi H',
      email: 'buh@email.com',
      phone: '0978901234',
      skills: ['Selenium', 'Cypress', 'JavaScript', 'API Testing', 'Jest'],
      experience: [
        {
          title: 'Senior QA Engineer',
          company: 'Quality First Ltd',
          duration: '2020 - Present',
          description: 'Led automation testing initiatives'
        },
        {
          title: 'QA Engineer',
          company: 'TestCorp',
          duration: '2018 - 2020',
          description: 'Developed automated test suites'
        }
      ],
      education: [
        {
          degree: 'Bachelor of Computer Science',
          institution: 'Da Nang University',
          year: '2018'
        }
      ],
      summary: 'QA specialist with 5+ years of automation experience'
    }
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

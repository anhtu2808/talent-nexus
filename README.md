# Talent Nexus - SmartRecruit

**Talent Nexus** (SmartRecruit) is an AI-powered recruitment ecosystem designed to bridge the gap between Recruiters and Candidates. It leverages advanced semantic analysis to automate resume scoring, providing an efficient "ATS Score" and ranking candidates against Job Descriptions (JDs) to reduce manual screening time.

## 🚀 Project Overview

The platform connects two main actors:
- **Candidates**: Can upload CVs, view their "ATS Score", and apply to jobs with optimized profiles.
- **Recruiters**: Can post jobs, manage pipelines, and use AI to match JDs with the best candidates automatically.

## ✨ Key Features

### For Candidates
- **CV Management**: Upload and manage multiple versions of your CV (PDF/DOCX).
- **AI Analysis**: Get instant feedback on your resume with an ATS Score (0-100) and optimization suggestions.
- **Job Board**: Browse and search for jobs with advanced filters (Location, Skills, Type).
- **Smart Apply**: Compare your CV against a specific Job Description before applying to see your match percentage.

### For Recruiters
- **Job Management**: Create, publish, and manage job listings.
- **Candidate Pipeline**: Visual Kanban/List view of applicants through different stages (Pending -> Interview -> Offered).
- **AI Matching Engine**: Automatically rank applicants based on Semantic Analysis (Cosine Similarity between JD and CV).

## 🛠 Technology Stack

### Frontend (This Repository)
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS, Shadcn UI, Lucide React
- **State Management**: React Query (TanStack Query)
- **Routing**: React Router DOM
- **Forms**: React Hook Form + Zod

### Backend & AI Services (Context)
- **Core API**: Java Spring Boot
- **AI Service**: Python (FastAPI)
- **Database**: PostgreSQL / MySQL
- **Storage**: AWS S3
- **NLP/AI**: PyMuPDF, Underthesea (Vietnamese NLP), Sentence-BERT

## 📂 Project Structure

```
src/
├── components/     # Reusable UI components
│   ├── layout/     # Header, Footer, etc.
│   ├── jobs/       # Job-related components (Cards, Lists)
│   └── ui/         # Shadcn UI primitives
├── pages/          # Page components (Routes)
│   ├── candidate/  # Candidate-specific dashboards
│   ├── recruiter/  # Recruiter-specific dashboards
│   ├── Jobs.tsx    # Job listing page
│   └── JobDetail.tsx # Job detail & Application page
├── contexts/       # React Context providers (Auth, etc.)
├── hooks/          # Custom React hooks
├── lib/            # Utilities
├── types/          # TypeScript interface definitions
└── data/           # Mock data for prototyping
```

## 🏁 Getting Started

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or bun

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd talent-nexus
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   bun install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   # or
   bun dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000` (or the port shown in your terminal).

## 📝 Business Rules & Logic

For a detailed breakdown of the business rules, user roles, and system logic, please refer to [BUSINESS-RULE.MD](./BUSINESS-RULE.MD).

## 📄 License

This project is for educational purposes as part of the University Semester Project.

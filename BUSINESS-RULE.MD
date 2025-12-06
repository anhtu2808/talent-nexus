# PROJECT CONTEXT: SmartRecruit (AI-powered Resume Scoring Platform)

## 1. PROJECT OVERVIEW
**SmartRecruit** is a recruitment ecosystem connecting Recruiters and Candidates. It leverages AI to automate resume scoring, ranking, and optimization.
- **Primary Goal:** Bridge the gap between JD (Job Description) and CV (Curriculum Vitae) using Semantic Analysis.
- **Core Value:** Reduce manual screening time and help candidates optimize their profiles for ATS (Applicant Tracking Systems).

---

## 2. TECHNOLOGY STACK (STRICT)
The AI agent must generate code based on the following stack:

### Backend
- **Core API:** Java Spring Boot.
- **AI Service:** Python (FastAPI).
- **Communication:** RESTful APIs between Spring Boot and FastAPI.

### Frontend
- **Framework:** ReactJS.

### Database & Storage
- **RDBMS:** PostgreSQL or MySQL.
- **File Storage:** AWS S3 (for PDF/DOCX files).

### AI/NLP Libraries
- **PDF Extraction:** PyMuPDF.
- **Keyword Extraction:** Underthesea (Vietnamese NLP), BERT.
- **Matching Engine:** Sentence-BERT, Cosine Similarity.
- **Generative AI (Optional/Bonus):** GPT API for suggestions.

---

## 3. ACTORS & PERMISSIONS (RBAC)
Implementation must use **JWT Authentication** and enforce strict **Role-Based Access Control (RBAC)**.

### Role: CANDIDATE
- **Auth:** Register, Login.
- **CV Management:** Upload, View, Delete CVs.
- **Job Interaction:** Search Jobs, Filter Jobs, Apply ("Easy Apply" using uploaded CV).
- **Dashboard:** View Application Status, View AI Analysis of own CV (ATS Score).

### Role: RECRUITER
- **Auth:** Register, Login, Manage Company Profile.
- **Job Management:** Create (Post), Edit, Publish, Unpublish Job Listings.
- **Candidate Management:** View Applicant Pipeline, Update Application Status (e.g., Pending -> Interview -> Accepted).
- **AI Usage:** Trigger JD-CV Matching, View Ranked Candidates, Export Reports.

### Role: ADMINISTRATOR
- **User Management:** Ban/Activate accounts.
- **System:** Configure AI parameters, Monitor logs.

---

## 4. BUSINESS RULES & LOGIC

### 4.1. Core Data Entities
The database schema must support these relationships:
- **User:** (id, email, password, role).
- **Profile:** (Linked to User - specialized for Candidate or Company).
- **CV:** (Linked to Candidate, s3_url, parsed_content_json).
- **JobListing:** (Linked to Recruiter, title, description, requirements, status).
- **Application:** (Linked to Candidate, JobListing, CV, status, match_score).

### 4.2. Feature: CV Parsing & Scoring (Candidate Flow)
1.  **Upload:** User uploads PDF/DOCX -> Saved to AWS S3.
2.  **Trigger:** Spring Boot sends S3 URL to Python Service.
3.  **Processing (Python):**
    -   Extract text using PyMuPDF.
    -   Parse into JSON (Skills, Experience, Education).
    -   Calculate "ATS Score" (0-100) based on structure and keywords.
4.  **Result:** JSON data returned to Spring Boot and saved to DB.

### 4.3. Feature: Job Matching Engine (Recruiter Flow)
1.  **Input:** One Job Description (JD) vs. Multiple CVs.
2.  **Algorithm:**
    -   Parse JD to extract required skills/keywords.
    -   Use **Sentence-BERT** to embed JD text and CV text into vectors.
    -   Calculate **Cosine Similarity** to get a "Match Score".
3.  **Output:** A ranked list of candidates sorted by Match Score descending.
4.  **Constraint:** Matching 1 JD against 100 CVs MUST complete in **under 60 seconds**.

### 4.4. Feature: Job Application
-   Candidates select an *existing* optimized CV to apply.
-   Recruiters see these applications in a "Pipeline" view.
-   Status changes by Recruiter trigger notifications (logic only, email optional via AWS SES).

---

## 5. NON-FUNCTIONAL REQUIREMENTS
-   **Performance:** Dashboard load time < 3 seconds.
-   **Security:**
    -   Passwords must be hashed (BCrypt).
    -   API endpoints must be secured with JWT.
    -   S3 Presigned URLs should be used for secure file access (if applicable).
-   **Scalability:** Design services to be stateless (Microservices approach between Java/Python).

## 6. DEVELOPMENT PHASES (For Context)
-   **Phase 1:** Auth, DB Setup, Basic UI, S3 Upload.
-   **Phase 2 (AI Core):** CV Parsing, ATS Scoring API.
-   **Phase 3 (Matching):** JD Parsing, Semantic Matching, Job Board.
-   **Phase 4 (Bonus):** Suggestions, Advanced Charts, Export.
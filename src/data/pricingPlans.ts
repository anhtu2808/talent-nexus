import { PricingPlan } from "@/types";

export const initialPlans: PricingPlan[] = [
    { id: 1, name: "Premium Candidate", salePrice: 199000, target: "candidate", aiCredits: 100, isUnlimitedScoring: true, duration: 30, status: "Active", description: "Không giới hạn ATS Scoring, Matching Scoring và có 100 credits AI hàng tháng. " },

    // Recruiter Seat Plans (Standard Seat License)
   { 
        id: 2, 
        name: "Standard Recruitment Pack", 
        salePrice: 1500000, 
        target: "recruiter", 
        recruiterPlanType: "job_post", // Đã chuyển sang job_post
        jobLimit: 10, // Giới hạn 10 tin đăng [cite: 32]
        aiCredits: 0, 
        isUnlimitedScoring: true, 
        duration: 30, 
        status: "Active", 
        description: "Cho phép đăng tối đa 10 tin tuyển dụng trên nền tảng IT. Mở khóa tính năng quản lý hồ sơ ứng tuyển cơ bản. [cite: 211, 430]" 
    },
    { 
        id: 4, 
        name: "Growth Professional Pack", 
        salePrice: 3500000, 
        target: "recruiter", 
        recruiterPlanType: "job_post", 
        jobLimit: 30, // Giới hạn 30 tin đăng
        aiCredits: 200, // Tặng kèm 200 AI Credits
        isUnlimitedScoring: true, 
        duration: 90, 
        status: "Active", 
        description: "Gói dành cho doanh nghiệp đang tăng trưởng. Đăng tối đa 30 tin/quý. Tặng kèm 200 Credits cho tính năng Ranking ứng viên. [cite: 35, 435]" 
    },
    { 
        id: 5, 
        name: "Enterprise Global Suite", 
        salePrice: 12000000, 
        target: "recruiter", 
        recruiterPlanType: "job_post", 
        jobLimit: 100, // Giới hạn 100 tin đăng
        aiCredits: 1000, 
        isUnlimitedScoring: true, 
        duration: 180, 
        status: "Active", 
        description: "Giải pháp tuyển dụng quy mô lớn. 100 tin đăng trong 6 tháng, ưu tiên hiển thị trên Job Board và hỗ trợ xuất báo cáo ứng viên. [cite: 38, 434]" 
    },

    { id: 3, name: "AI Power Pack (1000)", salePrice: 1000000, target: "recruiter", recruiterPlanType: "ai_quota", aiCredits: 1000, isUnlimitedScoring: true, duration: 0, status: "Active", description: "Gói nạp AI credits dùng cho tính năng JD-CV Matching và AI Recommend. " },
];

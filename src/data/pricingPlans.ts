import { PricingPlan } from "@/types";

export const initialPlans: PricingPlan[] = [
    { id: 1, name: "Premium Candidate", salePrice: 199000, target: "candidate", aiCredits: 100, isUnlimitedScoring: true, duration: 30, status: "Active", description: "Không giới hạn ATS Scoring, Matching Scoring và có 100 credits AI hàng tháng. " },

    // Recruiter Seat Plans (Standard Seat License)
    { id: 2, name: "Standard Seat License (1 Month)", salePrice: 500000, target: "recruiter", recruiterPlanType: "seat", userSeats: 1, aiCredits: 0, isUnlimitedScoring: true, duration: 30, status: "Active", description: "Phí duy trì cho 01 tài khoản nhà tuyển dụng con trong hệ thống." },
    { id: 4, name: "Standard Seat License (3 Months)", salePrice: 1425000, target: "recruiter", recruiterPlanType: "seat", userSeats: 1, aiCredits: 0, isUnlimitedScoring: true, duration: 90, status: "Active", description: "Phí duy trì cho 01 tài khoản nhà tuyển dụng con trong hệ thống. (Tiết kiệm 5%)" },
    { id: 5, name: "Standard Seat License (6 Months)", salePrice: 2700000, target: "recruiter", recruiterPlanType: "seat", userSeats: 1, aiCredits: 0, isUnlimitedScoring: true, duration: 180, status: "Active", description: "Phí duy trì cho 01 tài khoản nhà tuyển dụng con trong hệ thống. (Tiết kiệm 10%)" },
    { id: 6, name: "Standard Seat License (12 Months)", salePrice: 4800000, target: "recruiter", recruiterPlanType: "seat", userSeats: 1, aiCredits: 0, isUnlimitedScoring: true, duration: 365, status: "Active", description: "Phí duy trì cho 01 tài khoản nhà tuyển dụng con trong hệ thống. (Tiết kiệm 20%)" },

    { id: 3, name: "AI Power Pack (1000)", salePrice: 1000000, target: "recruiter", recruiterPlanType: "ai_quota", aiCredits: 1000, userSeats: 0, isUnlimitedScoring: true, duration: 0, status: "Active", description: "Gói nạp AI credits dùng cho tính năng JD-CV Matching và AI Recommend. " },
];

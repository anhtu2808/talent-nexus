export interface Specialization {
    id: string;
    name: string;
}

export interface Profession {
    id: string;
    name: string;
    specializations: Specialization[];
}

export interface IndustryGroup {
    id: string;
    name: string;
    professions: Profession[];
}

export const jobCategories: IndustryGroup[] = [
    {
        id: 'business-sales',
        name: 'Kinh doanh / Bán hàng',
        professions: [
            {
                id: 'sales-logistics',
                name: 'Sales Xuất nhập khẩu / Logistics',
                specializations: [
                    { id: 'sales-logistics-1', name: 'Sales Logistics' },
                    { id: 'sales-logistics-2', name: 'Sales Xuất nhập khẩu' },
                    { id: 'sales-logistics-3', name: 'Logistics khác' },
                ]
            },
            {
                id: 'sales-real-estate',
                name: 'Sales Bất động sản',
                specializations: [
                    { id: 'sales-re-1', name: 'Sales Bất động sản' },
                    { id: 'sales-re-2', name: 'Môi giới Bất động sản' },
                    { id: 'sales-re-3', name: 'Tư vấn Bất động sản' },
                ]
            },
            {
                id: 'sales-tech',
                name: 'Sales Công nghệ / Phần mềm',
                specializations: [
                    { id: 'sales-tech-1', name: 'Sales IT' },
                    { id: 'sales-tech-2', name: 'Sales SaaS' },
                    { id: 'sales-tech-3', name: 'Account Manager' },
                ]
            }
        ]
    },
    {
        id: 'marketing',
        name: 'Marketing / PR / Quảng cáo',
        professions: [
            {
                id: 'digital-marketing',
                name: 'Digital Marketing',
                specializations: [
                    { id: 'dm-seo', name: 'SEO' },
                    { id: 'dm-sem', name: 'SEM / Google Ads' },
                    { id: 'dm-social', name: 'Social Media' },
                    { id: 'dm-content', name: 'Content Marketing' },
                ]
            },
            {
                id: 'brand-marketing',
                name: 'Brand Marketing',
                specializations: [
                    { id: 'bm-manager', name: 'Brand Manager' },
                    { id: 'bm-assistant', name: 'Brand Assistant' },
                ]
            }
        ]
    },
    {
        id: 'it',
        name: 'Công nghệ thông tin',
        professions: [
            {
                id: 'software-dev',
                name: 'Lập trình viên / Developer',
                specializations: [
                    { id: 'dev-backend', name: 'Backend Developer' },
                    { id: 'dev-frontend', name: 'Frontend Developer' },
                    { id: 'dev-fullstack', name: 'Fullstack Developer' },
                    { id: 'dev-mobile', name: 'Mobile Developer' },
                ]
            },
            {
                id: 'data',
                name: 'Data / AI',
                specializations: [
                    { id: 'data-engineer', name: 'Data Engineer' },
                    { id: 'data-analyst', name: 'Data Analyst' },
                    { id: 'ai-engineer', name: 'AI Engineer' },
                ]
            },
            {
                id: 'product',
                name: 'Product',
                specializations: [
                    { id: 'pm', name: 'Product Manager' },
                    { id: 'po', name: 'Product Owner' },
                    { id: 'ba', name: 'Business Analyst' },
                ]
            }
        ]
    },
    {
        id: 'hr-admin',
        name: 'Nhân sự / Hành chính / Pháp chế',
        professions: [
            {
                id: 'hr',
                name: 'Nhân sự',
                specializations: [
                    { id: 'hr-recruitment', name: 'Tuyển dụng' },
                    { id: 'hr-c-b', name: 'C&B' },
                    { id: 'hr-training', name: 'Đào tạo / L&D' },
                ]
            },
            {
                id: 'admin',
                name: 'Hành chính',
                specializations: [
                    { id: 'admin-staff', name: 'Nhân viên hành chính' },
                    { id: 'admin-reception', name: 'Lễ tân' },
                ]
            }
        ]
    },
    {
        id: 'finance',
        name: 'Tài chính / Kế toán / Kiểm toán',
        professions: [
            {
                id: 'accounting',
                name: 'Kế toán',
                specializations: [
                    { id: 'acc-general', name: 'Kế toán tổng hợp' },
                    { id: 'acc-tax', name: 'Kế toán thuế' },
                    { id: 'acc-payable', name: 'Kế toán công nợ' },
                ]
            },
            {
                id: 'finance',
                name: 'Tài chính',
                specializations: [
                    { id: 'fin-analyst', name: 'Chuyên viên tài chính' },
                    { id: 'fin-investment', name: 'Đầu tư' },
                ]
            }
        ]
    }
];

import { Button } from '@/components/ui/button';
import Header from '@/components/layout/Header';
import { Card } from '@/components/ui/card';
import { CheckCircle, ChevronRight, Clock, ShieldCheck, User, Building2, FileText, ArrowRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const Verification = () => {
    const navigate = useNavigate();
    const { user } = useAuth();

    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <div className="flex-1 bg-muted/30 flex overflow-hidden">
                {/* Left Side - Promo Card (Green Theme) */}
                <div className="hidden lg:flex lg:w-5/12 bg-[#00B14F] relative overflow-hidden flex-col justify-center items-center p-12 text-white">
                    <div className="relative z-10 w-full max-w-md">
                        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 shadow-xl">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-3 bg-white rounded-full">
                                    <Building2 className="h-6 w-6 text-[#00B14F]" />
                                </div>
                                <div>
                                    <p className="text-white/80 text-sm">You are hiring for:</p>
                                    <h3 className="text-xl font-bold">Business Development</h3>
                                </div>
                            </div>

                            <h2 className="text-2xl font-bold mb-6">Post on SmartRecruit now<br />Effective - Fast response</h2>

                            <div className="space-y-4">
                                <div className="bg-white rounded-xl p-4 flex items-center gap-4 text-[#00B14F]">
                                    <User className="h-8 w-8" />
                                    <div>
                                        <span className="font-bold text-lg block">120.000+</span>
                                        <span className="text-sm text-gray-600">monthly applications for sales roles</span>
                                    </div>
                                </div>

                                <div className="bg-white rounded-xl p-4 flex items-center gap-4 text-[#00B14F]">
                                    <ShieldCheck className="h-8 w-8" />
                                    <div>
                                        <span className="font-bold text-lg block">Access potential candidates</span>
                                        <span className="text-sm text-gray-600">800.000+ profiles in Sales Industry</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Background shapes */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                    <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
                </div>

                {/* Right Side - Verification Checklist */}
                <div className="flex-1 overflow-y-auto">
                    <div className="max-w-3xl mx-auto p-8 lg:p-16 h-full flex flex-col">
                        <div className="flex-1">
                            <div className="mb-8">
                                <div className="flex items-center justify-between mb-2">
                                    <h1 className="text-3xl font-bold text-foreground">
                                        Hello, <span className="text-[#00B14F]">{user?.name || 'Recruiter'}</span>
                                    </h1>
                                    <div className="flex gap-2 text-sm font-medium text-white">
                                        <div className="bg-[#00B14F] px-4 py-2 rounded-lg flex flex-col items-center">
                                            <span className="text-xl font-bold">7</span>
                                            <span className="text-[10px]">Day</span>
                                        </div>
                                        <div className="flex items-center text-[#00B14F]">:</div>
                                        <div className="bg-[#00B14F] px-4 py-2 rounded-lg flex flex-col items-center">
                                            <span className="text-xl font-bold">23</span>
                                            <span className="text-[10px]">Hour</span>
                                        </div>
                                        <div className="flex items-center text-[#00B14F]">:</div>
                                        <div className="bg-[#00B14F] px-4 py-2 rounded-lg flex flex-col items-center">
                                            <span className="text-xl font-bold">59</span>
                                            <span className="text-[10px]">Minute</span>
                                        </div>
                                    </div>
                                </div>
                                <p className="text-muted-foreground">
                                    Follow these steps to increase the security of your account
                                </p>
                            </div>

                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-xl font-semibold">Verify information</h2>
                                <span className="text-sm font-medium text-muted-foreground">Completed <span className="text-[#00B14F]">0%</span></span>
                            </div>

                            <div className="space-y-4">
                                {/* Step 1 */}
                                <Card
                                    className="p-6 flex items-center justify-between hover:shadow-md transition-shadow cursor-pointer group"
                                    onClick={() => navigate('/recruiter/verify/phone')}
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="h-6 w-6 rounded-full border-2 border-muted-foreground group-hover:border-[#00B14F] flex items-center justify-center">
                                            {/* Check icon would go here if completed */}
                                        </div>
                                        <span className="font-medium group-hover:text-[#00B14F] transition-colors">Phone number verification</span>
                                    </div>
                                    <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-[#00B14F]" />
                                </Card>

                                {/* Step 2 */}
                                <Card
                                    className="p-6 flex items-center justify-between hover:shadow-md transition-shadow cursor-pointer group"
                                    onClick={() => navigate('/recruiter/verify/company')}
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="h-6 w-6 rounded-full border-2 border-muted-foreground group-hover:border-[#00B14F] flex items-center justify-center">
                                        </div>
                                        <span className="font-medium group-hover:text-[#00B14F] transition-colors">Update company information</span>
                                    </div>
                                    <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-[#00B14F]" />
                                </Card>

                                {/* Step 3 */}
                                <Card
                                    className="p-6 flex items-center justify-between hover:shadow-md transition-shadow cursor-pointer group"
                                    onClick={() => navigate('/recruiter/verify/license')}
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="h-6 w-6 rounded-full border-2 border-muted-foreground group-hover:border-[#00B14F] flex items-center justify-center">
                                        </div>
                                        <span className="font-medium group-hover:text-[#00B14F] transition-colors">Update Business Registration Certificate</span>
                                    </div>
                                    <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-[#00B14F]" />
                                </Card>
                            </div>

                            <div className="text-center mt-8">
                                <button onClick={() => navigate('/recruiter/dashboard')} className="text-muted-foreground hover:text-foreground text-sm underline">
                                    I will verify later.
                                </button>
                            </div>
                        </div>

                        <div className="flex justify-between items-center bg-black text-white p-4 rounded-full mt-8">
                            <span className="flex items-center gap-2 text-sm text-gray-400">
                                Powered by <span className="font-bold text-white">SmartRecruit</span>
                            </span>
                            <Button className="rounded-full bg-[#00B14F] hover:bg-[#009b45] text-white border-0" onClick={() => navigate('/recruiter/verify/phone')}>
                                Next: Phone number verification <ChevronRight className="ml-2 h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Verification;

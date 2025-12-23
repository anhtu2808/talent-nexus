import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { ArrowLeft, Building2, Upload, FileText, ShieldCheck, User, AlertTriangle } from 'lucide-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const VerifyLicense = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [docType, setDocType] = useState('license'); // license | power

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        // Simulate API call
        setTimeout(() => {
            setIsLoading(false);
            toast.success('Document uploaded successfully!');
            navigate('/recruiter/verify');
        }, 1000);
    };

    return (
        <div className="min-h-screen bg-muted/30 flex">
            {/* Left Side - Promo Card */}
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
                        </div>
                    </div>
                </div>
                {/* Background shapes */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
            </div>

            {/* Right Side - Form */}
            <div className="flex-1 overflow-y-auto">
                <div className="max-w-4xl mx-auto p-8 lg:p-12">
                    <Link to="/recruiter/verify" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 text-sm">
                        <ArrowLeft className="h-4 w-4" />
                        Back to Verification List
                    </Link>

                    <div className="mb-8">
                        <h1 className="text-2xl font-bold text-foreground mb-2">Business Registration Certificate Information</h1>
                        <p className="text-muted-foreground">
                            Please choose your preferred upload method; see the upload instructions <span className="text-[#00B14F] cursor-pointer hover:underline">here</span>.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-8">
                        <RadioGroup defaultValue="license" onValueChange={setDocType} className="space-y-4">
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="license" id="license" />
                                <Label htmlFor="license" className="font-medium cursor-pointer">Business registration certificate or other equivalent documents</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="power" id="power" />
                                <Label htmlFor="power" className="font-medium cursor-pointer">Power of Attorney and Identification Documents</Label>
                            </div>
                        </RadioGroup>

                        <div className="border rounded-xl p-8 bg-white">
                            <Label className="text-red-500 font-medium mb-4 block">Documents *</Label>

                            <div className="flex flex-col md:flex-row gap-8">
                                {/* Upload Area */}
                                <div className="flex-1 border-2 border-dashed border-gray-300 rounded-lg p-8 flex flex-col items-center justify-center text-center bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer">
                                    <Upload className="h-10 w-10 text-gray-400 mb-4" />
                                    <p className="font-medium text-gray-700 mb-1">Select or drag the file here.</p>
                                    <p className="text-xs text-gray-500 mb-4">Maximum file size: 5MB, formats: jpeg, jpg, png, pdf</p>
                                    <Button type="button" variant="outline" className="text-[#00B14F] border-[#00B14F] hover:bg-[#00B14F]/10">
                                        <Upload className="h-4 w-4 mr-2" /> Select file
                                    </Button>
                                </div>

                                {/* Placeholder Illustration */}
                                <div className="flex-1 flex flex-col items-center">
                                    <p className="text-sm font-medium text-gray-500 mb-4">Illustration</p>
                                    <div className="w-full aspect-[4/3] bg-yellow-50 border border-yellow-200 rounded-lg flex items-center justify-center relative overflow-hidden">
                                        <div className="absolute inset-4 border-2 border-dashed border-yellow-300 rounded opacity-50"></div>
                                        <FileText className="h-16 w-16 text-yellow-500 opacity-50" />
                                        <div className="absolute bottom-4 right-4 h-12 w-12 rounded-full border-4 border-yellow-500/20 flex items-center justify-center">
                                            <div className="h-8 w-8 rounded-full bg-yellow-500/20"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-6 bg-orange-50 border border-orange-200 rounded-lg p-4 text-sm text-orange-800 space-y-2">
                                <div className="flex items-start gap-2">
                                    <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5 text-orange-600" />
                                    <p>The published texts must be complete and show no signs of editing, obscuring, or cutting out information.</p>
                                </div>
                                <div className="flex items-start gap-2">
                                    <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5 text-orange-600" />
                                    <p>Please upload the Business Registration Certificate with information matching the business data from the Tax Department's website.</p>
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-end pt-4">
                            <Button type="submit" className="bg-[#00B14F] hover:bg-[#009b45] text-white min-w-[200px] h-12 text-lg">
                                {isLoading ? 'Saving...' : 'Save'}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default VerifyLicense;

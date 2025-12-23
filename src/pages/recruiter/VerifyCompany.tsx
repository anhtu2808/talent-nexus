import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, Building2, ShieldCheck, User, Info, Camera } from 'lucide-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const VerifyCompany = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [businessType, setBusinessType] = useState('business'); // business | household

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        // Simulate API call
        setTimeout(() => {
            setIsLoading(false);
            toast.success('Company information updated successfully!');
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
                <div className="max-w-3xl mx-auto p-8 lg:p-12">
                    <Link to="/recruiter/verify" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 text-sm">
                        <ArrowLeft className="h-4 w-4" />
                        Back to Verification List
                    </Link>

                    <div className="mb-8 text-center">
                        <div className="relative inline-block group cursor-pointer">
                            <div className="h-24 w-24 bg-gray-100 rounded-full flex flex-col items-center justify-center border-2 border-dashed border-gray-300">
                                <Building2 className="h-8 w-8 text-gray-400 mb-1" />
                            </div>
                            <div className="absolute bottom-0 right-0 bg-gray-600 text-white p-1.5 rounded-full">
                                <Camera className="h-4 w-4" />
                            </div>
                        </div>
                        <p className="text-sm text-muted-foreground mt-2">Company logo</p>
                    </div>

                    <div className="flex gap-4 mb-8">
                        <button
                            type="button"
                            onClick={() => setBusinessType('business')}
                            className={`flex-1 py-3 px-4 rounded-full border-2 text-sm font-medium transition-colors ${businessType === 'business'
                                    ? 'border-[#00B14F] text-[#00B14F] bg-[#00B14F]/5'
                                    : 'border-gray-200 text-gray-600 hover:border-gray-300'
                                }`}
                        >
                            Businesses
                        </button>
                        <button
                            type="button"
                            onClick={() => setBusinessType('household')}
                            className={`flex-1 py-3 px-4 rounded-full border-2 text-sm font-medium transition-colors ${businessType === 'household'
                                    ? 'border-[#00B14F] text-[#00B14F] bg-[#00B14F]/5'
                                    : 'border-gray-200 text-gray-600 hover:border-gray-300'
                                }`}
                        >
                            Household business
                        </button>
                    </div>

                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-8 flex gap-3 text-sm text-yellow-800">
                        <Info className="h-5 w-5 shrink-0 text-yellow-600" />
                        <p>
                            To ensure your account is verified quickly, please enter <strong>the Tax Identification Number</strong> and <strong>Company Name</strong> that match the business data on the Tax Department's website. You can look up business information <a href="#" className="underline text-[#00B14F]">here</a>.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="taxId">Tax identification number <span className="text-red-500">*</span></Label>
                                <Input id="taxId" placeholder="Enter tax ID" required />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="companyName">Company name <span className="text-red-500">*</span></Label>
                                <Input id="companyName" placeholder="Enter company name" required />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="website">Website</Label>
                                <Input id="website" placeholder="https://" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="field">Area of activity <span className="text-red-500">*</span></Label>
                                <Select>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Choose a field of activity" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="it">IT - Software</SelectItem>
                                        <SelectItem value="marketing">Marketing - Advertising</SelectItem>
                                        <SelectItem value="sales">Sales</SelectItem>
                                        <SelectItem value="education">Education</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="scale">Scale <span className="text-red-500">*</span></Label>
                                <Select>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Choose company size" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="10-24">10-24 employees</SelectItem>
                                        <SelectItem value="25-99">25-99 employees</SelectItem>
                                        <SelectItem value="100-499">100-499 employees</SelectItem>
                                        <SelectItem value="500+">500+ employees</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="address">Address <span className="text-red-500">*</span></Label>
                            <Input id="address" placeholder="Enter company address" required />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="email">Email <span className="text-red-500">*</span></Label>
                                <Input id="email" type="email" placeholder="Enter company email" required />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="phone">Phone number <span className="text-red-500">*</span></Label>
                                <Input id="phone" type="tel" placeholder="Enter phone number" required />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div className="flex items-center gap-2">
                                <Label htmlFor="description">Company description <span className="text-red-500">*</span></Label>
                                <Info className="h-4 w-4 text-muted-foreground" />
                            </div>
                            <Textarea
                                id="description"
                                placeholder="Describe your company..."
                                className="min-h-[150px]"
                                required
                            />
                            <div className="flex justify-between text-xs text-muted-foreground">
                                <span>SmartRecruit recommends a minimum length of 500 characters</span>
                                <span>0 / 10000</span>
                            </div>
                        </div>

                        <div className="flex justify-end pt-4">
                            <Button type="submit" className="bg-[#00B14F] hover:bg-[#009b45] text-white min-w-[200px] h-12 text-lg">
                                {isLoading ? 'Saving...' : 'Save & Continue'}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default VerifyCompany;

import { Button } from '@/components/ui/button';
import Header from '@/components/layout/Header';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { useAuth } from '@/contexts/AuthContext';
import { Briefcase, Building2, Link as LinkIcon, Lock, Mail, MapPin, Phone, User, FileText, Upload } from 'lucide-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const RecruiterRegister = () => {
    const navigate = useNavigate();
    const { register, isLoading } = useAuth(); // Assuming register handles the basic auth part

    const [formData, setFormData] = useState({
        // Account
        email: '',
        password: '',
        confirmPassword: '',
        // Personal
        fullName: '',
        gender: 'male',
        phone: '',
        // Company
        companyName: '',
        city: '',
        district: '',
        // Terms
        agreed: false,
        // Additional
        registrationDoc: null as File | null,
        hrAccountCount: 1,
    });

    const handleChange = (field: string, value: any) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFormData(prev => ({ ...prev, registrationDoc: e.target.files![0] }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Basic Validation
        if (!formData.agreed) {
            toast.error('You must agree to the Terms of Service.');
            return;
        }
        if (formData.password !== formData.confirmPassword) {
            toast.error('Passwords do not match.');
            return;
        }

        try {
            // In a real app, we would pass all these extra fields to a specialized recruiter register function.
            // For now, we'll use the existing register function and mock the success.
            await register(formData.email, formData.password, formData.fullName, 'recruiter');

            // Here we would ideally make a second API call to save the recruiter profile details 
            // (company, phone, etc.)

            toast.success('Account created! Please select a subscription plan.');
            navigate('/recruiter/package-selection', {
                state: {
                    hrAccountCount: formData.hrAccountCount,
                    email: formData.email
                }
            });
        } catch (error) {
            toast.error('Registration failed. Please try again.');
        }
    };

    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <div className="flex-1 bg-muted/30 flex overflow-hidden">
                {/* Left Side - Branding & Info (Matching the dark theme in screenshot) */}
                <div className="hidden lg:flex lg:w-1/3 bg-[#0F172A] relative overflow-hidden flex-col justify-between p-12 text-white">
                    <div className="relative z-10">
                        <Link to="/" className="flex items-center gap-2 mb-12">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent">
                                <Briefcase className="h-5 w-5 text-accent-foreground" />
                            </div>
                            <span className="text-2xl font-bold">
                                Smart<span className="text-accent">Recruit</span>
                            </span>
                        </Link>

                        <h2 className="text-3xl font-bold mb-6">Track your funnel with Report</h2>
                        <p className="text-slate-400 text-lg mb-8">
                            Gain insights into your recruitment process with advanced analytics and reporting tools.
                        </p>

                        {/* Abstract Visuals similar to screenshot */}
                        <div className="relative h-64 w-full">
                            <div className="absolute top-10 left-0 bg-slate-800/50 p-4 rounded-lg border border-slate-700 w-3/4 backdrop-blur-sm">
                                <div className="h-2 w-1/3 bg-slate-600 rounded mb-2"></div>
                                <div className="h-32 bg-gradient-to-tr from-accent/20 to-accent/5 rounded-md relative overflow-hidden">
                                    <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-accent/10"></div>
                                </div>
                            </div>
                            <div className="absolute bottom-0 right-0 bg-accent p-6 rounded-lg shadow-xl shadow-accent/20 w-1/2">
                                <div className="h-16 w-16 bg-white/20 rounded-full mb-4"></div>
                                <div className="h-2 w-2/3 bg-white/40 rounded"></div>
                            </div>
                        </div>
                    </div>

                    <div className="relative z-10 text-center text-slate-500 text-sm">
                        © 2025 SmartRecruit. All rights reserved.
                    </div>

                    {/* Background Decorations */}
                    <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-accent/20 rounded-full blur-[100px]" />
                    <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-96 h-96 bg-blue-600/20 rounded-full blur-[100px]" />
                </div>

                {/* Right Side - Form */}
                <div className="flex-1 overflow-y-auto">
                    <div className="max-w-3xl mx-auto p-8 lg:p-12">
                        <div className="mb-8">
                            <h1 className="text-3xl font-bold text-foreground mb-2">Recruiter Registration</h1>
                            <p className="text-muted-foreground">Create your employer account to start hiring top talent.</p>
                        </div>

                        {/* Regulations Alert */}
                        <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8 text-sm text-green-800">
                            <h3 className="font-bold text-green-900 mb-2">Regulations</h3>
                            <ul className="list-disc pl-5 space-y-1">
                                <li>To ensure service quality, SmartRecruit does not allow one user to create multiple different accounts.</li>
                                <li>If a violation is detected, SmartRecruit will stop providing services to all duplicate accounts.</li>
                            </ul>
                            <div className="mt-4 pt-4 border-t border-green-200 flex gap-6 text-green-700 font-medium">
                                <span className="flex items-center gap-2"><Phone className="h-4 w-4" /> (024) 71079799</span>
                                <span className="flex items-center gap-2"><Phone className="h-4 w-4" /> 0862 691929</span>
                            </div>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-8">
                            {/* Account Section */}
                            <section className="space-y-4">
                                <h3 className="text-lg font-semibold border-b pb-2">Account Information</h3>
                                <div className="space-y-2">
                                    <Label htmlFor="email" className="flex items-center gap-1">Email <span className="text-red-500">*</span></Label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                        <Input
                                            id="email"
                                            type="email"
                                            placeholder="hr@company.com"
                                            className="pl-10"
                                            value={formData.email}
                                            onChange={(e) => handleChange('email', e.target.value)}
                                            required
                                        />
                                    </div>
                                    <p className="text-xs text-red-500">Login email cannot be empty</p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="password">Password <span className="text-red-500">*</span></Label>
                                        <div className="relative">
                                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                            <Input
                                                id="password"
                                                type="password"
                                                placeholder="••••••••"
                                                className="pl-10"
                                                value={formData.password}
                                                onChange={(e) => handleChange('password', e.target.value)}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="confirmPassword">Confirm Password <span className="text-red-500">*</span></Label>
                                        <div className="relative">
                                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                            <Input
                                                id="confirmPassword"
                                                type="password"
                                                placeholder="••••••••"
                                                className="pl-10"
                                                value={formData.confirmPassword}
                                                onChange={(e) => handleChange('confirmPassword', e.target.value)}
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>
                            </section>

                            {/* Recruiter Info Section */}
                            <section className="space-y-4">
                                <h3 className="text-lg font-semibold border-b pb-2">Recruiter Information</h3>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="fullName">Full Name <span className="text-red-500">*</span></Label>
                                        <div className="relative">
                                            <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                            <Input
                                                id="fullName"
                                                placeholder="John Doe"
                                                className="pl-10"
                                                value={formData.fullName}
                                                onChange={(e) => handleChange('fullName', e.target.value)}
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label>Gender <span className="text-red-500">*</span></Label>
                                        <RadioGroup
                                            defaultValue="male"
                                            className="flex gap-6 mt-2"
                                            onValueChange={(val) => handleChange('gender', val)}
                                        >
                                            <div className="flex items-center space-x-2">
                                                <RadioGroupItem value="male" id="male" />
                                                <Label htmlFor="male" className="font-normal">Male</Label>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <RadioGroupItem value="female" id="female" />
                                                <Label htmlFor="female" className="font-normal">Female</Label>
                                            </div>
                                        </RadioGroup>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="phone">Phone Number <span className="text-red-500">*</span></Label>
                                    <div className="relative">
                                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                        <Input
                                            id="phone"
                                            placeholder="0912 345 678"
                                            className="pl-10"
                                            value={formData.phone}
                                            onChange={(e) => handleChange('phone', e.target.value)}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="companyName">Company Name <span className="text-red-500">*</span></Label>
                                    <div className="relative">
                                        <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                        <Input
                                            id="companyName"
                                            placeholder="My Great Company"
                                            className="pl-10"
                                            value={formData.companyName}
                                            onChange={(e) => handleChange('companyName', e.target.value)}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="hrAccountCount">Desired number of HR accounts</Label>
                                    <div className="relative">
                                        <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                        <Input
                                            id="hrAccountCount"
                                            type="number"
                                            min={1}
                                            placeholder="1"
                                            className="pl-10"
                                            value={formData.hrAccountCount}
                                            onChange={(e) => handleChange('hrAccountCount', parseInt(e.target.value))}
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="city">Work Location <span className="text-red-500">*</span></Label>
                                        <Select
                                            onValueChange={(val) => handleChange('city', val)}
                                        >
                                            <SelectTrigger className="w-full">
                                                <div className="flex items-center gap-2">
                                                    <MapPin className="h-4 w-4 text-muted-foreground" />
                                                    <SelectValue placeholder="Select City/Province" />
                                                </div>
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="hanoi">Ha Noi</SelectItem>
                                                <SelectItem value="hcm">Ho Chi Minh</SelectItem>
                                                <SelectItem value="danang">Da Nang</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="district">District</Label>
                                        <Select
                                            onValueChange={(val) => handleChange('district', val)}
                                            disabled={!formData.city}
                                        >
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Select District" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="d1">District 1</SelectItem>
                                                <SelectItem value="d2">District 2</SelectItem>
                                                <SelectItem value="caugiay">Cau Giay</SelectItem>
                                                <SelectItem value="badinh">Ba Dinh</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                            </section>

                            {/* Documentation Section */}
                            <section className="space-y-4">
                                <h3 className="text-lg font-semibold border-b pb-2">Business Documentation</h3>
                                <div className="space-y-2">
                                    <Label htmlFor="registrationDoc">Business Registration / Authorization Letter <span className="text-red-500">*</span></Label>
                                    <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 flex flex-col items-center justify-center bg-muted/10 hover:bg-muted/20 transition-colors text-center cursor-pointer relative">
                                        <Input
                                            id="registrationDoc"
                                            type="file"
                                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                            onChange={handleFileChange}
                                            accept=".pdf,.doc,.docx,.jpg,.png"
                                            required
                                        />
                                        {formData.registrationDoc ? (
                                            <div className="flex items-center gap-2 text-accent">
                                                <FileText className="h-8 w-8" />
                                                <span className="font-medium">{formData.registrationDoc.name}</span>
                                            </div>
                                        ) : (
                                            <>
                                                <div className="p-3 bg-muted rounded-full mb-3">
                                                    <Upload className="h-6 w-6 text-muted-foreground" />
                                                </div>
                                                <p className="text-sm font-medium">Click to upload or drag and drop</p>
                                                <p className="text-xs text-muted-foreground mt-1">PDF, DOC, DOCX, JPG or PNG (MAX. 10MB)</p>
                                            </>
                                        )}
                                    </div>
                                    <p className="text-xs text-muted-foreground">Please provide a valid Business Registration Certificate or an Authorization Letter from the company.</p>
                                </div>
                            </section>

                            <div className="flex items-start space-x-2 pt-4">
                                <Checkbox
                                    id="terms"
                                    checked={formData.agreed}
                                    onCheckedChange={(checked) => handleChange('agreed', checked)}
                                />
                                <div className="grid gap-1.5 leading-none">
                                    <Label
                                        htmlFor="terms"
                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        I have read and agree to the <Link to="/terms" className="text-accent hover:underline">Terms of Service</Link> and <Link to="/privacy" className="text-accent hover:underline">Privacy Policy</Link> of SmartRecruit.
                                    </Label>
                                </div>
                            </div>

                            <Button type="submit" variant="accent" size="lg" className="w-full h-12 text-lg" disabled={isLoading}>
                                {isLoading ? 'Creating Account...' : 'Complete Registration'}
                            </Button>

                            <div className="text-center mt-4">
                                <span className="text-muted-foreground">Already have an account? </span>
                                <Link to="/auth?mode=login&role=recruiter" className="text-accent hover:underline font-medium">
                                    Sign In Now
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RecruiterRegister;

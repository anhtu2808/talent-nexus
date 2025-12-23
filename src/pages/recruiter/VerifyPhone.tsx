import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Building2, ShieldCheck, User, Phone } from 'lucide-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const VerifyPhone = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState<'input' | 'otp'>('input');
    const [phone, setPhone] = useState('');
    const [otp, setOtp] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSendOtp = (e: React.FormEvent) => {
        e.preventDefault();
        if (!phone) {
            toast.error('Please enter your phone number');
            return;
        }
        setIsLoading(true);
        // Simulate API call
        setTimeout(() => {
            setIsLoading(false);
            setStep('otp');
            toast.success('OTP sent to your phone number');
        }, 1000);
    };

    const handleVerifyOtp = (e: React.FormEvent) => {
        e.preventDefault();
        if (!otp) {
            toast.error('Please enter the OTP');
            return;
        }
        setIsLoading(true);
        // Simulate API call
        setTimeout(() => {
            setIsLoading(false);
            toast.success('Phone number verified successfully!');
            navigate('/recruiter/verify');
            // In a real app, this would probably mark the step as complete in the context/backend
        }, 1000);
    };

    return (
        <div className="min-h-screen bg-muted/30 flex">
            {/* Left Side - Promo Card (Green Theme) - Same as Verification.tsx for consistency */}
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

            {/* Right Side - Phone Verification Form */}
            <div className="flex-1 overflow-y-auto flex flex-col justify-center">
                <div className="max-w-md w-full mx-auto p-8">
                    <Link to="/recruiter/verify" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 text-sm">
                        <ArrowLeft className="h-4 w-4" />
                        Back to Verification List
                    </Link>

                    <div className="mb-8">
                        <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center mb-4 text-[#00B14F]">
                            <Phone className="h-6 w-6" />
                        </div>
                        <h1 className="text-2xl font-bold text-foreground mb-2">Phone Verification</h1>
                        <p className="text-muted-foreground">
                            {step === 'input'
                                ? 'We will send you a One Time Password (OTP) to your mobile number for verification.'
                                : `Enter the 6-digit code sent to ${phone}`}
                        </p>
                    </div>

                    {step === 'input' ? (
                        <form onSubmit={handleSendOtp} className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="phone">Phone Number</Label>
                                <Input
                                    id="phone"
                                    type="tel"
                                    placeholder="Enter your phone number"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    className="h-12"
                                    autoFocus
                                />
                            </div>
                            <Button type="submit" className="w-full h-12 bg-[#00B14F] hover:bg-[#009b45]" disabled={isLoading}>
                                {isLoading ? 'Sending OTP...' : 'Get OTP'}
                            </Button>
                        </form>
                    ) : (
                        <form onSubmit={handleVerifyOtp} className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="otp">OTP Code</Label>
                                <Input
                                    id="otp"
                                    type="text"
                                    placeholder="123456"
                                    className="h-12 text-center text-lg tracking-widest"
                                    maxLength={6}
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value)}
                                    autoFocus
                                />
                            </div>
                            <Button type="submit" className="w-full h-12 bg-[#00B14F] hover:bg-[#009b45]" disabled={isLoading}>
                                {isLoading ? 'Verifying...' : 'Verify'}
                            </Button>
                            <button
                                type="button"
                                onClick={() => setStep('input')}
                                className="w-full text-sm text-[#00B14F] hover:underline"
                            >
                                Change phone number
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};

export default VerifyPhone;

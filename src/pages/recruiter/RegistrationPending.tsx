import { Button } from '@/components/ui/button';
import Header from '@/components/layout/Header';
import { Card, CardContent } from '@/components/ui/card';
import { Clock, Home } from 'lucide-react';
import { Link } from 'react-router-dom';

const RegistrationPending = () => {
    return (
        <div className="min-h-screen flex flex-col bg-slate-50">
            <Header />
            <main className="flex-1 container mx-auto flex items-center justify-center p-4">
                <Card className="max-w-md w-full shadow-lg border-t-4 border-t-amber-500">
                    <CardContent className="pt-10 pb-10 flex flex-col items-center text-center">
                        <div className="h-20 w-20 bg-amber-100 rounded-full flex items-center justify-center mb-6">
                            <Clock className="h-10 w-10 text-amber-600" />
                        </div>

                        <h1 className="text-2xl font-bold text-slate-900 mb-2">Registration Submitted</h1>

                        <p className="text-slate-600 mb-8 px-4">
                            Thank you for registering. Your account is currently under review by our admin team.
                            We will notify you via email once your account has been approved.
                        </p>

                        <div className="flex gap-4 w-full">
                            <Button asChild variant="outline" className="w-full">
                                <Link to="/">
                                    <Home className="mr-2 h-4 w-4" /> Return Home
                                </Link>
                            </Button>
                            <Button asChild className="w-full">
                                <Link to="/auth?mode=login&role=recruiter">
                                    Go to Login
                                </Link>
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </main>
        </div>
    );
};

export default RegistrationPending;

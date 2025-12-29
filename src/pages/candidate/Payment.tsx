import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Copy } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Payment = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const plan = location.state?.plan;

    if (!plan) {
        return (
            <div className="flex flex-col items-center justify-center h-[60vh] space-y-4">
                <h2 className="text-2xl font-bold">No plan selected</h2>
                <Button onClick={() => navigate("/candidate/upgrade")}>
                    Go back to Upgrade Page
                </Button>
            </div>
        );
    }

    const handleCopy = (text: string) => {
        navigator.clipboard.writeText(text);
        toast.success("Copied to clipboard");
    };



    return (
        <div className="max-w-4xl mx-auto animate-fade-in">
            <Button
                variant="ghost"
                className="mb-6 pl-0 hover:pl-2 transition-all"
                onClick={() => navigate("/candidate/upgrade")}
            >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Plans
            </Button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Payment Details</h1>
                        <p className="text-muted-foreground mt-2">
                            Scan the QR code to complete your payment for the selected plan.
                        </p>
                    </div>

                    <Card>
                        <CardHeader>
                            <CardTitle>Selected Plan</CardTitle>
                            <CardDescription>Review your subscription details</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex justify-between items-center py-2 border-b">
                                <span className="text-muted-foreground">Plan</span>
                                <span className="font-semibold">{plan.name}</span>
                            </div>
                            <div className="flex justify-between items-center py-2 border-b">
                                <span className="text-muted-foreground">Duration</span>
                                <span className="font-semibold">{plan.period.replace('/ ', '')}</span>
                            </div>
                            <div className="flex justify-between items-center py-2">
                                <span className="text-muted-foreground">Total Amount</span>
                                <span className="text-2xl font-bold text-primary">{plan.price}</span>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Bank Transfer Details</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="p-4 bg-muted/50 rounded-lg space-y-3">
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-muted-foreground">Bank Name</span>
                                    <span className="font-medium">MB Bank</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-muted-foreground">Account Number</span>
                                    <div className="flex items-center gap-2">
                                        <span className="font-medium">1234 5678 9999</span>
                                        <Button variant="ghost" size="icon" className="h-4 w-4" onClick={() => handleCopy("123456789999")}>
                                            <Copy className="h-3 w-3" />
                                        </Button>
                                    </div>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-muted-foreground">Account Name</span>
                                    <span className="font-medium text-uppercase">TALENT NEXUS COMPANY</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-muted-foreground">Content</span>
                                    <div className="flex items-center gap-2">
                                        <span className="font-medium">UPGRADE {plan.name.replace(/\s/g, '').toUpperCase()}</span>
                                        <Button variant="ghost" size="icon" className="h-4 w-4" onClick={() => handleCopy(`UPGRADE ${plan.name.replace(/\s/g, '').toUpperCase()}`)}>
                                            <Copy className="h-3 w-3" />
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="flex flex-col gap-6">
                    <Card className="flex-1 flex flex-col justify-center items-center p-8 bg-white border-primary/20 shadow-lg">
                        <div className="text-center space-y-4">
                            <h3 className="text-lg font-semibold">Scan QR Code</h3>
                            <div className="border-4 border-black p-2 rounded-lg inline-block bg-white">
                                {/* Placeholder for real QR Code generation */}
                                <img
                                    src={`https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=example_payment_string`}
                                    alt="Payment QR Code"
                                    className="w-48 h-48 md:w-56 md:h-56 object-contain"
                                />
                            </div>
                            <p className="text-sm text-muted-foreground">
                                Open your banking app and scan this code to pay instantly.
                            </p>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default Payment;

import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { useAuth } from '@/contexts/AuthContext';

const SettingsView = () => {
    const { user } = useAuth();
    const [taxId, setTaxId] = useState("");
    const [companyName, setCompanyName] = useState("");
    const [internationalName, setInternationalName] = useState("");
    const [shortName, setShortName] = useState("");
    const [registrationType, setRegistrationType] = useState<"auth" | "license">("auth");
    const [isCreatingCompany, setIsCreatingCompany] = useState(false);
    const [address, setAddress] = useState("");

    const handleTaxIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setTaxId(value);
        if (value === 'SP26SE010SR') {
            setCompanyName('Smart Recruit');
            setInternationalName('Smart Recruit Joint Stock Company');
            setShortName('SmartRecruit');
            setAddress('Tầng 10, Tòa nhà Landmark 81, 720A Điện Biên Phủ, Phường 22, Quận Bình Thạnh, TP.HCM');
        }
    };

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-bold tracking-tight">Account settings</h2>
                <p className="text-muted-foreground">Manage your personal and business information</p>
            </div>

            <Tabs defaultValue="personal" className="w-full">
                <TabsList className="w-full justify-start border-b rounded-none h-auto p-0 bg-transparent gap-6">
                    <TabsTrigger
                        value="personal"
                        className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-0 py-2"
                    >
                        Personal information
                    </TabsTrigger>
                    {user?.subRole === 'manager' && (
                        <>
                            <TabsTrigger
                                value="business-reg"
                                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-0 py-2"
                            >
                                Business registration
                            </TabsTrigger>
                            <TabsTrigger
                                value="company-info"
                                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-0 py-2"
                            >
                                Company information
                            </TabsTrigger>
                        </>
                    )}
                </TabsList>

                <TabsContent value="personal" className="mt-6 space-y-4 max-w-2xl">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="firstName">First name</Label>
                            <Input id="firstName" placeholder="Nguyễn" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="lastName">Last name</Label>
                            <Input id="lastName" placeholder="Văn A" />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" placeholder="email@example.com" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="phone">Phone number</Label>
                        <Input id="phone" placeholder="0901234567" />
                    </div>
                    <Button variant="accent">Save changes</Button>
                </TabsContent>

                <TabsContent value="business-reg" className="mt-6 space-y-6 max-w-2xl">
                    <div className="space-y-4">
                        <Label>Document Type</Label>
                        <RadioGroup defaultValue="auth" value={registrationType} onValueChange={(v) => setRegistrationType(v as "auth" | "license")}>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="auth" id="type-auth" />
                                <Label htmlFor="type-auth">Authorisation Letter (Giấy uỷ quyền)</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="license" id="type-license" />
                                <Label htmlFor="type-license">Business Registration Certificate (Giấy đăng ký kinh doanh)</Label>
                            </div>
                        </RadioGroup>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="licenseUrl">
                            {registrationType === 'auth' ? 'Upload Authorisation Letter' : 'Upload Business License'}
                        </Label>
                        <Input id="licenseUrl" type="file" />
                        <p className="text-xs text-muted-foreground">
                            {registrationType === 'auth'
                                ? 'Upload the official letter authorizing you to recruit on behalf of the company.'
                                : 'Upload your company\'s business registration certificate.'}
                        </p>
                    </div>
                    <Button variant="accent">Submit Verification</Button>
                </TabsContent>

                <TabsContent value="company-info" className="mt-6 space-y-6 max-w-2xl">
                    <div className="flex items-center space-x-2 border p-4 rounded-lg bg-muted/20">
                        <Checkbox
                            id="create-mode"
                            checked={isCreatingCompany}
                            onCheckedChange={(c) => setIsCreatingCompany(c as boolean)}
                        />
                        <div>
                            <Label htmlFor="create-mode" className="font-medium">Register New Business Entity</Label>
                            <p className="text-sm text-muted-foreground">Check this if you need to create a new company profile instead of linking to an existing one.</p>
                        </div>
                    </div>

                    <div className={isCreatingCompany ? "" : "opacity-100" /* Just for structure, logic handled below */}>
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="taxId">Tax ID {isCreatingCompany && <span className="text-red-500">*</span>}</Label>
                                <Input
                                    id="taxId"
                                    placeholder="Enter your company's tax ID"
                                    value={taxId}
                                    onChange={handleTaxIdChange}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="companyName">Company Name {isCreatingCompany && <span className="text-red-500">*</span>}</Label>
                                <Input
                                    id="companyName"
                                    placeholder="Talent Nexus"
                                    value={companyName}
                                    onChange={(e) => setCompanyName(e.target.value)}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="internationalName">International Name</Label>
                                <Input
                                    id="internationalName"
                                    placeholder="Talent Nexus Joint Stock Company"
                                    value={internationalName}
                                    onChange={(e) => setInternationalName(e.target.value)}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="shortName">Short Name</Label>
                                <Input
                                    id="shortName"
                                    placeholder="Talent Nexus"
                                    value={shortName}
                                    onChange={(e) => setShortName(e.target.value)}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="website">Website</Label>
                                <Input id="website" placeholder="https://talentnexus.com" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="description">Description</Label>
                                <Textarea id="description" placeholder="Introduce your company..." className="min-h-[150px]" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="address">Address</Label>
                                <Input
                                    id="address"
                                    placeholder="123 Đường ABC, Quận XYZ, TP.HCM"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                />
                            </div>
                            <Button variant="accent">
                                {isCreatingCompany ? 'Create Company Profile' : 'Update Information'}
                            </Button>
                        </div>
                    </div>
                </TabsContent>
            </Tabs>
        </div >
    );
};

export default SettingsView;

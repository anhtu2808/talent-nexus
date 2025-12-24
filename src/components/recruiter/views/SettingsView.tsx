import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

const SettingsView = () => {
    const [taxId, setTaxId] = useState("");
    const [companyName, setCompanyName] = useState("");
    const [internationalName, setInternationalName] = useState("");
    const [shortName, setShortName] = useState("");
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

                <TabsContent value="business-reg" className="mt-6 space-y-4 max-w-2xl">
                    <div className="space-y-2">
                        <Label htmlFor="licenseUrl">Business license (Link or Upload)</Label>
                        <Input id="licenseUrl" type="file" />
                    </div>
                    <Button variant="accent">Submit</Button>
                </TabsContent>

                <TabsContent value="company-info" className="mt-6 space-y-4 max-w-2xl">
                    <div className="space-y-2">
                        <Label htmlFor="taxId">Tax ID</Label>
                        <Input
                            id="taxId"
                            placeholder="Enter your company's tax ID"
                            value={taxId}
                            onChange={handleTaxIdChange}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="companyName">Company name</Label>
                        <Input
                            id="companyName"
                            placeholder="Talent Nexus"
                            value={companyName}
                            onChange={(e) => setCompanyName(e.target.value)}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="internationalName">International name</Label>
                        <Input
                            id="internationalName"
                            placeholder="Talent Nexus Joint Stock Company"
                            value={internationalName}
                            onChange={(e) => setInternationalName(e.target.value)}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="shortName">Short name</Label>
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
                    <Button variant="accent">Update information</Button>
                </TabsContent>
            </Tabs>
        </div>
    );
};

export default SettingsView;

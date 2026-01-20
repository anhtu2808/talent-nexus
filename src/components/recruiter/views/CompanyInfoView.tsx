import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

const CompanyInfoView = () => {
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
                <h2 className="text-2xl font-bold tracking-tight">Company Profile</h2>
                <p className="text-muted-foreground">Manage your company information</p>
            </div>

            <div className="mt-6 space-y-6 max-w-2xl">
                <div className="space-y-4">
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
                        <Label htmlFor="companyName">Company Name</Label>
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
                    <Button variant="default" className="bg-indigo-600 hover:bg-indigo-700">
                        Update Information
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default CompanyInfoView;

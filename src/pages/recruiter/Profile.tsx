import { useState } from 'react';
import Header from '@/components/layout/Header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { Building2, Mail, MapPin, Phone, Globe, FileText, Upload, User, Briefcase } from 'lucide-react';
import { mockCompanies } from '@/data/mockData';

const RecruiterProfile = () => {
    const { user } = useAuth();

    // Mock finding recruiter's company (assuming it's the first one or mapped by ID)
    // In a real app, this would come from the user's profile data
    const company = mockCompanies[0];

    const [isEditing, setIsEditing] = useState(false);

    return (
        <div className="min-h-screen bg-muted/30">
            <Header />

            <main className="container py-8">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6">

                    {/* Left Column: User Profile Card */}
                    <div className="md:col-span-4 lg:col-span-3 space-y-6">
                        <Card>
                            <CardHeader className="text-center">
                                <div className="flex justify-center mb-4">
                                    <Avatar className="h-24 w-24">
                                        <AvatarImage src={user?.avatar} />
                                        <AvatarFallback className="text-2xl">{user?.name?.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                </div>
                                <CardTitle>{user?.name}</CardTitle>
                                <CardDescription>Recruitment Manager</CardDescription>
                                <div className="mt-2">
                                    <Badge variant="secondary" className="mt-2">Verified Recruiter</Badge>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                                    <Mail className="h-4 w-4" />
                                    <span>{user?.email}</span>
                                </div>
                                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                                    <Phone className="h-4 w-4" />
                                    <span>+84 901 234 567</span>
                                </div>
                                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                                    <Building2 className="h-4 w-4" />
                                    <span>{company.name}</span>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Right Column: Detailed Information */}
                    <div className="md:col-span-8 lg:col-span-9">
                        <Tabs defaultValue="company" className="w-full">
                            <TabsList className="w-full justify-start mb-6 bg-transparent p-0 border-b rounded-none h-auto">
                                <TabsTrigger
                                    value="company"
                                    className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-4 py-2"
                                >
                                    Company Information
                                </TabsTrigger>
                                <TabsTrigger
                                    value="documents"
                                    className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-4 py-2"
                                >
                                    Legal Documents
                                </TabsTrigger>
                            </TabsList>

                            <TabsContent value="company">
                                <Card>
                                    <CardHeader className="flex flex-row items-center justify-between">
                                        <div>
                                            <CardTitle>Company Details</CardTitle>
                                            <CardDescription>Information about the entity you represent</CardDescription>
                                        </div>
                                        <Button variant="outline" size="sm" onClick={() => setIsEditing(!isEditing)}>
                                            {isEditing ? 'Cancel' : 'Edit Details'}
                                        </Button>
                                    </CardHeader>
                                    <CardContent className="space-y-6">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <Label>Company Name</Label>
                                                <div className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg">
                                                    <Building2 className="h-4 w-4 text-muted-foreground" />
                                                    <span className="font-medium">{company.name}</span>
                                                </div>
                                            </div>

                                            <div className="space-y-2">
                                                <Label>Website</Label>
                                                <div className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg">
                                                    <Globe className="h-4 w-4 text-muted-foreground" />
                                                    <span className="font-medium text-accent">https://techvision.example.com</span>
                                                </div>
                                            </div>

                                            <div className="space-y-2">
                                                <Label>Industry</Label>
                                                <div className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg">
                                                    <Briefcase className="h-4 w-4 text-muted-foreground" />
                                                    <span className="font-medium">{company.industry}</span>
                                                </div>
                                            </div>

                                            <div className="space-y-2">
                                                <Label>Company Size</Label>
                                                <div className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg">
                                                    <User className="h-4 w-4 text-muted-foreground" />
                                                    <span className="font-medium">{company.employees} Employees</span>
                                                </div>
                                            </div>

                                            <div className="md:col-span-2 space-y-2">
                                                <Label>Headquarters Location</Label>
                                                <div className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg">
                                                    <MapPin className="h-4 w-4 text-muted-foreground" />
                                                    <span className="font-medium">{company.location}</span>
                                                </div>
                                            </div>

                                            <div className="md:col-span-2 space-y-2">
                                                <Label>Introduction</Label>
                                                <div className="p-4 bg-muted/50 rounded-lg text-sm leading-relaxed text-muted-foreground">
                                                    {company.introduction}
                                                </div>
                                            </div>
                                        </div>

                                        {isEditing && (
                                            <div className="flex justify-end pt-4">
                                                <Button>Save Changes</Button>
                                            </div>
                                        )}
                                    </CardContent>
                                </Card>
                            </TabsContent>

                            <TabsContent value="documents">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Business Documents</CardTitle>
                                        <CardDescription>Official registration and tax documents</CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-6">
                                        <div className="space-y-4">
                                            <div className="flex items-center justify-between">
                                                <div className="space-y-1">
                                                    <h4 className="font-medium">Business Registration Certificate</h4>
                                                    <p className="text-sm text-muted-foreground">Verified on Dec 15, 2023</p>
                                                </div>
                                                <Badge className="bg-green-100 text-green-700 hover:bg-green-100">Verified</Badge>
                                            </div>

                                            <div className="border-2 border-dashed border-slate-200 rounded-xl p-8 flex flex-col items-center justify-center bg-slate-50">
                                                <FileText className="h-12 w-12 text-slate-300 mb-4" />
                                                <img
                                                    src="https://example.com/placeholder-certificate.png"
                                                    alt="Business Registration"
                                                    className="max-w-full h-auto max-h-[300px] mb-4 shadow-sm border"
                                                    onError={(e) => {
                                                        e.currentTarget.style.display = 'none';
                                                    }}
                                                />
                                                <div className="text-center">
                                                    <p className="text-sm font-medium text-slate-900">Certificate_of_Registration.pdf</p>
                                                    <p className="text-xs text-slate-500 mb-4">2.4 MB • Uploaded 2 months ago</p>
                                                    <Button variant="outline" size="sm">
                                                        <Upload className="h-4 w-4 mr-2" />
                                                        Update Document
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="pt-6 border-t">
                                            <div className="flex items-center justify-between mb-4">
                                                <div className="space-y-1">
                                                    <h4 className="font-medium">Tax Registration</h4>
                                                    <p className="text-sm text-muted-foreground">Tax Code: 0101234567</p>
                                                </div>
                                                <Badge variant="outline">Pending Update</Badge>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </TabsContent>
                        </Tabs>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default RecruiterProfile;

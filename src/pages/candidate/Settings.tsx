import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Bell, Eye, Globe, Lock, Mail, Save, Shield, User } from 'lucide-react';
import { useState } from 'react';

const Settings = () => {
    const { user } = useAuth();
    const { toast } = useToast();
    const [loading, setLoading] = useState(false);

    const handleSave = async () => {
        setLoading(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 800));
        setLoading(false);
        toast({
            title: "Settings saved",
            description: "Your changes have been successfully saved.",
        });
    };

    return (
        <div className="space-y-6 max-w-5xl mx-auto p-6 md:p-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Account Settings</h1>
                <p className="text-muted-foreground mt-2">
                    Manage your account preferences and security settings.
                </p>
            </div>

            <Tabs defaultValue="general" className="w-full" key={user?.id || 'loading'}>
                <TabsList className="grid w-full grid-cols-4 lg:w-[400px]">
                    <TabsTrigger value="general">General</TabsTrigger>
                    <TabsTrigger value="security">Security</TabsTrigger>
                    <TabsTrigger value="notifications">Notifications</TabsTrigger>
                    <TabsTrigger value="privacy">Privacy</TabsTrigger>
                </TabsList>

                <TabsContent value="general" className="mt-6 space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Profile Information</CardTitle>
                            <CardDescription>Update your personal information.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid gap-2">
                                <Label htmlFor="name">Full Name</Label>
                                <div className="relative">
                                    <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                    <Input id="name" defaultValue={user?.name} className="pl-9" />
                                </div>
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                    <Input id="email" value={user?.email || ''} readOnly className="pl-9 bg-muted text-foreground opacity-100 cursor-default" />
                                </div>
                                <p className="text-xs text-muted-foreground">Email cannot be changed.</p>
                            </div>

                        </CardContent>
                        <CardFooter>
                            <Button onClick={handleSave} disabled={loading} className="gap-2">
                                {loading && <span className="animate-spin">⏳</span>}
                                <Save className="h-4 w-4" /> Save Changes
                            </Button>
                        </CardFooter>
                    </Card>
                </TabsContent>

                <TabsContent value="security" className="mt-6 space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Change Password</CardTitle>
                            <CardDescription>
                                Ensure your account is secure by using a strong password.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid gap-2">
                                <Label htmlFor="current">Current Password</Label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                    <Input id="current" type="password" className="pl-9" />
                                </div>
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="new">New Password</Label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                    <Input id="new" type="password" className="pl-9" />
                                </div>
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="confirm">Confirm New Password</Label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                    <Input id="confirm" type="password" className="pl-9" />
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button onClick={handleSave} disabled={loading} className="gap-2">
                                {loading && <span className="animate-spin">⏳</span>}
                                Update Password
                            </Button>
                        </CardFooter>
                    </Card>
                </TabsContent>

                <TabsContent value="notifications" className="mt-6 space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Email Notifications</CardTitle>
                            <CardDescription>Manage when you receive emails.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center justify-between space-x-2">
                                <Label htmlFor="job_alerts" className="flex flex-col space-y-1">
                                    <span>Job Alerts</span>
                                    <span className="font-normal text-xs text-muted-foreground">Receive emails about new jobs matching your profile.</span>
                                </Label>
                                <Switch id="job_alerts" defaultChecked />
                            </div>
                            <div className="flex items-center justify-between space-x-2">
                                <Label htmlFor="app_updates" className="flex flex-col space-y-1">
                                    <span>Application Updates</span>
                                    <span className="font-normal text-xs text-muted-foreground">Get notified when a recruiter views or responds to your application.</span>
                                </Label>
                                <Switch id="app_updates" defaultChecked />
                            </div>
                            <div className="flex items-center justify-between space-x-2">
                                <Label htmlFor="marketing" className="flex flex-col space-y-1">
                                    <span>Marketing & Tips</span>
                                    <span className="font-normal text-xs text-muted-foreground">Receive news, career tips, and promotions.</span>
                                </Label>
                                <Switch id="marketing" />
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button onClick={handleSave} disabled={loading}>Save Preferences</Button>
                        </CardFooter>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Push Notifications</CardTitle>
                            <CardDescription>Control browser push notifications.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center justify-between space-x-2">
                                <Label htmlFor="push_messages" className="flex flex-col space-y-1">
                                    <span>Messages</span>
                                    <span className="font-normal text-xs text-muted-foreground">Direct messages from recruiters.</span>
                                </Label>
                                <Switch id="push_messages" defaultChecked />
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="privacy" className="mt-6 space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Profile Visibility</CardTitle>
                            <CardDescription>Control who can see your profile.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center justify-between space-x-2">
                                <Label htmlFor="public_profile" className="flex flex-col space-y-1">
                                    <span>Public Profile</span>
                                    <span className="font-normal text-xs text-muted-foreground">Allow recruiters to find your profile in search results.</span>
                                </Label>
                                <Switch id="public_profile" defaultChecked />
                            </div>
                            <div className="flex items-center justify-between space-x-2">
                                <Label htmlFor="show_salary" className="flex flex-col space-y-1">
                                    <span>Show Expected Salary</span>
                                    <span className="font-normal text-xs text-muted-foreground">Display your expected salary to recruiters.</span>
                                </Label>
                                <Switch id="show_salary" defaultChecked />
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button onClick={handleSave} disabled={loading} variant="outline" className="border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700">
                                Delete Account
                            </Button>
                            <Button onClick={handleSave} disabled={loading} className="ml-auto">Save Privacy Settings</Button>
                        </CardFooter>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
};

export default Settings;

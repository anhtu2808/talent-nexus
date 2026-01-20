import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';

const SettingsView = () => {
    const { user } = useAuth();

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-bold tracking-tight">Account settings</h2>
                <p className="text-muted-foreground">Manage your personal information</p>
            </div>

            <div className="mt-6 space-y-4 max-w-2xl">
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
                <Button variant="default" className="bg-indigo-600 hover:bg-indigo-700">Save changes</Button>

                <div className="pt-6 border-t mt-6">
                    <h3 className="font-semibold text-lg mb-4">Change Password</h3>
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="currentPassword">Current Password</Label>
                            <Input id="currentPassword" type="password" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="newPassword">New Password</Label>
                                <Input id="newPassword" type="password" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="confirmPassword">Confirm Password</Label>
                                <Input id="confirmPassword" type="password" />
                            </div>
                        </div>
                        <Button variant="outline">Update Password</Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SettingsView;

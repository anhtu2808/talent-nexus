import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { mockRecruiters } from '@/data/mockData';
import { MoreHorizontal, Plus, Search, Trash2, UserPlus } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { toast } from 'sonner';

const TeamManagementView = () => {
    const [teamMembers, setTeamMembers] = useState(mockRecruiters);
    const [searchTerm, setSearchTerm] = useState('');
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        subRole: 'member' as 'manager' | 'member'
    });

    // Mock limit from registration plan
    const ACCOUNT_LIMIT = 5;

    const filteredMembers = teamMembers.filter(member =>
        member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        member.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleCreateMember = (e: React.FormEvent) => {
        e.preventDefault();
        if (teamMembers.length >= ACCOUNT_LIMIT) {
            toast.error('Account limit reached. Please upgrade your plan to add more members.');
            return;
        }

        if (!formData.name || !formData.email || !formData.password) {
            toast.error('Please fill in all fields');
            return;
        }

        // Mock create logic
        const newMember = {
            id: `r${Date.now()}`,
            email: formData.email,
            name: formData.name,
            role: 'recruiter' as const,
            subRole: formData.subRole,
            companyId: 'comp1',
            status: 'active' as const,
            createdAt: new Date()
        };

        setTeamMembers([...teamMembers, newMember]);
        setFormData({ name: '', email: '', password: '', subRole: 'member' });
        setIsCreateOpen(false);
        toast.success(`Account created for ${formData.name}`);
    };

    const handleRemoveMember = (id: string) => {
        // Prevent removing self (mocking current user as r1)
        if (id === 'r1') {
            toast.error("You cannot remove yourself.");
            return;
        }

        setTeamMembers(teamMembers.filter(m => m.id !== id));
        toast.success("Team member removed successfully.");
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight">Team Management</h2>
                    <p className="text-muted-foreground">Manage your HR team and their access permissions.</p>
                </div>
                <div className="flex items-center gap-2">
                    <div className="bg-muted px-3 py-1 rounded-md text-sm font-medium">
                        {teamMembers.length} / {ACCOUNT_LIMIT} Accounts Used
                    </div>
                    <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
                        <DialogTrigger asChild>
                            <Button disabled={teamMembers.length >= ACCOUNT_LIMIT}>
                                <UserPlus className="mr-2 h-4 w-4" />
                                Add Member
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Create Team Member Account</DialogTitle>
                                <DialogDescription>
                                    Create a new account for your HR team member. They can log in immediately with these credentials.
                                </DialogDescription>
                            </DialogHeader>
                            <form onSubmit={handleCreateMember}>
                                <div className="grid gap-4 py-4">
                                    <div className="grid gap-2">
                                        <Label htmlFor="name">Full Name</Label>
                                        <Input
                                            id="name"
                                            placeholder="John Doe"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            required
                                        />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="email">Email address</Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            placeholder="colleague@company.com"
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            required
                                        />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="password">Password</Label>
                                        <Input
                                            id="password"
                                            type="password"
                                            placeholder="••••••••"
                                            value={formData.password}
                                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                            required
                                        />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="role">Role</Label>
                                        <select
                                            id="role"
                                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                            value={formData.subRole}
                                            onChange={(e) => setFormData({ ...formData, subRole: e.target.value as 'manager' | 'member' })}
                                        >
                                            <option value="member">Member</option>
                                            <option value="manager">Manager</option>
                                        </select>
                                    </div>
                                </div>
                                <DialogFooter>
                                    <Button type="submit">Create Account</Button>
                                </DialogFooter>
                            </form>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>

            <Card>
                <CardHeader className="pb-3">
                    <CardTitle>Team Members</CardTitle>
                    <CardDescription>
                        A list of all recruiters in your company account.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center mb-4">
                        <div className="relative w-full max-w-sm">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                type="search"
                                placeholder="Search members..."
                                className="pl-8"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="rounded-md border">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Member</TableHead>
                                    <TableHead>Role</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Joined Date</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredMembers.map((member) => (
                                    <TableRow key={member.id}>
                                        <TableCell>
                                            <div className="flex items-center gap-3">
                                                <Avatar className="h-9 w-9">
                                                    <AvatarImage src={member.avatar} alt={member.name} />
                                                    <AvatarFallback>{member.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                                                </Avatar>
                                                <div className="grid gap-0.5">
                                                    <p className="text-sm font-medium leading-none">{member.name}</p>
                                                    <p className="text-xs text-muted-foreground">{member.email}</p>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant={member.subRole === 'manager' ? 'default' : 'secondary'}>
                                                {member.subRole === 'manager' ? 'Manager' : 'Member'}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50">
                                                Active
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-muted-foreground text-sm">
                                            {member.createdAt.toLocaleDateString()}
                                        </TableCell>
                                        <TableCell className="text-right">
                                            {member.subRole !== 'manager' && (
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button variant="ghost" className="h-8 w-8 p-0">
                                                            <span className="sr-only">Open menu</span>
                                                            <MoreHorizontal className="h-4 w-4" />
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end">
                                                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                        <DropdownMenuSeparator />
                                                        <DropdownMenuItem
                                                            className="text-red-600 cursor-pointer"
                                                            onClick={() => handleRemoveMember(member.id)}
                                                        >
                                                            <Trash2 className="mr-2 h-4 w-4" />
                                                            Remove Member
                                                        </DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            )}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default TeamManagementView;

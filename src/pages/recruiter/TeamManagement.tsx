import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Header from '@/components/layout/Header';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from '@/components/ui/tabs';
import { toast } from 'sonner';
import { Check, X, UserX, Clock, ShieldCheck } from 'lucide-react';

// Mock data for team members
const mockTeamMembers = [
    {
        id: 'tm1',
        name: 'Sarah Wilson',
        email: 'sarah.wilson@company.com',
        role: 'Recruiter',
        status: 'active',
        joinedAt: '2023-11-15',
    },
    {
        id: 'tm2',
        name: 'James Chen',
        email: 'james.chen@company.com',
        role: 'Recruiter',
        status: 'pending',
        joinedAt: '2023-12-20',
    },
    {
        id: 'tm3',
        name: 'Emily Davis',
        email: 'emily.davis@company.com',
        role: 'Recruiter',
        status: 'pending',
        joinedAt: '2023-12-22',
    },
    {
        id: 'tm4',
        name: 'Michael Brown',
        email: 'michael.brown@company.com',
        role: 'Recruiter',
        status: 'rejected',
        joinedAt: '2023-12-10',
    },
];

const TeamManagement = () => {
    const [members, setMembers] = useState(mockTeamMembers);

    const handleAction = (id: string, action: 'approve' | 'reject' | 'deactivate') => {
        setMembers((prev) =>
            prev.map((member) => {
                if (member.id === id) {
                    if (action === 'approve') return { ...member, status: 'active' };
                    if (action === 'reject') return { ...member, status: 'rejected' };
                    if (action === 'deactivate') return { ...member, status: 'rejected' }; // Or 'inactive' if we had that status
                }
                return member;
            })
        );

        if (action === 'approve') toast.success('Member approved successfully');
        if (action === 'reject') toast.info('Member request rejected');
        if (action === 'deactivate') toast.warning('Member deactivated');
    };

    const pendingMembers = members.filter((m) => m.status === 'pending');
    const activeMembers = members.filter((m) => m.status === 'active');
    const rejectedMembers = members.filter((m) => m.status === 'rejected');

    return (
        <div className="min-h-screen bg-muted/30">
            <Header />

            <main className="container py-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                    <div>
                        <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                            Team Management
                        </h1>
                        <p className="text-muted-foreground">
                            Manage your recruitment team members and access requests.
                        </p>
                    </div>
                </div>

                <div className="bg-card rounded-xl border border-border shadow-sm">
                    <Tabs defaultValue="pending" className="w-full">
                        <div className="p-4 border-b border-border">
                            <TabsList className="grid w-full md:w-[400px] grid-cols-3">
                                <TabsTrigger value="pending" className="relative">
                                    Pending
                                    {pendingMembers.length > 0 && (
                                        <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] text-white">
                                            {pendingMembers.length}
                                        </span>
                                    )}
                                </TabsTrigger>
                                <TabsTrigger value="active">Active</TabsTrigger>
                                <TabsTrigger value="rejected">Rejected</TabsTrigger>
                            </TabsList>
                        </div>

                        <TabsContent value="pending" className="p-0 m-0">
                            {pendingMembers.length > 0 ? (
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Name</TableHead>
                                            <TableHead>Email</TableHead>
                                            <TableHead>Date Requested</TableHead>
                                            <TableHead className="text-right">Actions</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {pendingMembers.map((member) => (
                                            <TableRow key={member.id}>
                                                <TableCell className="font-medium">{member.name}</TableCell>
                                                <TableCell>{member.email}</TableCell>
                                                <TableCell>{member.joinedAt}</TableCell>
                                                <TableCell className="text-right">
                                                    <div className="flex justify-end gap-2">
                                                        <Button
                                                            size="sm"
                                                            variant="outline"
                                                            className="text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200"
                                                            onClick={() => handleAction(member.id, 'reject')}
                                                        >
                                                            <X className="h-4 w-4 mr-1" />
                                                            Reject
                                                        </Button>
                                                        <Button
                                                            size="sm"
                                                            className="bg-green-600 hover:bg-green-700 text-white"
                                                            onClick={() => handleAction(member.id, 'approve')}
                                                        >
                                                            <Check className="h-4 w-4 mr-1" />
                                                            Approve
                                                        </Button>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            ) : (
                                <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
                                    <Clock className="h-12 w-12 mb-4 opacity-20" />
                                    <p>No pending requests</p>
                                </div>
                            )}
                        </TabsContent>

                        <TabsContent value="active" className="p-0 m-0">
                            {activeMembers.length > 0 ? (
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Name</TableHead>
                                            <TableHead>Email</TableHead>
                                            <TableHead>Role</TableHead>
                                            <TableHead>Joined Date</TableHead>
                                            <TableHead className="text-right">Actions</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {activeMembers.map((member) => (
                                            <TableRow key={member.id}>
                                                <TableCell className="font-medium">{member.name}</TableCell>
                                                <TableCell>{member.email}</TableCell>
                                                <TableCell>
                                                    <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                                                        {member.role}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell>{member.joinedAt}</TableCell>
                                                <TableCell className="text-right">
                                                    <Button
                                                        size="sm"
                                                        variant="ghost"
                                                        className="text-muted-foreground hover:text-red-600"
                                                        onClick={() => handleAction(member.id, 'deactivate')}
                                                    >
                                                        <UserX className="h-4 w-4 mr-1" />
                                                        Deactivate
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            ) : (
                                <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
                                    <ShieldCheck className="h-12 w-12 mb-4 opacity-20" />
                                    <p>No active team members</p>
                                </div>
                            )}
                        </TabsContent>

                        <TabsContent value="rejected" className="p-0 m-0">
                            {rejectedMembers.length > 0 ? (
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Name</TableHead>
                                            <TableHead>Email</TableHead>
                                            <TableHead>Date Rejected</TableHead>
                                            <TableHead className="text-right">Actions</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {rejectedMembers.map((member) => (
                                            <TableRow key={member.id}>
                                                <TableCell className="font-medium text-muted-foreground">{member.name}</TableCell>
                                                <TableCell className="text-muted-foreground">{member.email}</TableCell>
                                                <TableCell className="text-muted-foreground">{member.joinedAt}</TableCell>
                                                <TableCell className="text-right">
                                                    <Button
                                                        size="sm"
                                                        variant="outline"
                                                        onClick={() => handleAction(member.id, 'approve')}
                                                    >
                                                        Re-approve
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            ) : (
                                <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
                                    <UserX className="h-12 w-12 mb-4 opacity-20" />
                                    <p>No rejected requests</p>
                                </div>
                            )}
                        </TabsContent>
                    </Tabs>
                </div>
            </main>
        </div>
    );
};

export default TeamManagement;

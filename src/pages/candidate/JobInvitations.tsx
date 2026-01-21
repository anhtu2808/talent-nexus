import JobInvitationCard from '@/components/candidate/JobInvitationCard';
import { useToast } from '@/hooks/use-toast';
import { mockJobInvitations } from '@/data/mockData';
import { JobInvitation } from '@/types';
import { useState } from 'react';

const JobInvitations = () => {
    const [invitations, setInvitations] = useState<JobInvitation[]>(mockJobInvitations);
    const { toast } = useToast();

    const handleRespond = (id: string, status: 'accepted' | 'declined') => {
        setInvitations(prev => prev.map(inv =>
            inv.id === id ? { ...inv, status } : inv
        ));

        toast({
            title: status === 'accepted' ? 'Invitation Accepted' : 'Invitation Declined',
            description: status === 'accepted'
                ? 'Great! The recruiter has been notified of your interest.'
                : 'You have declined this job invitation.',
            variant: status === 'accepted' ? 'default' : 'destructive',
        });
    };

    const pendingInvitations = invitations.filter(i => i.status === 'pending');
    const pastInvitations = invitations.filter(i => i.status !== 'pending');

    return (
        <div className="space-y-6 max-w-5xl mx-auto p-6 md:p-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Job Invitations</h1>
                <p className="text-muted-foreground mt-2">
                    Manage invitations from recruiters interested in your profile.
                </p>
            </div>

            <div className="space-y-4">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                    Pending Invitations
                    <span className="bg-primary/10 text-primary text-sm font-normal px-2 py-0.5 rounded-full">
                        {pendingInvitations.length}
                    </span>
                </h2>

                {pendingInvitations.length > 0 ? (
                    <div className="grid gap-4">
                        {pendingInvitations.map(invitation => (
                            <JobInvitationCard
                                key={invitation.id}
                                invitation={invitation}
                                onRespond={handleRespond}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12 border rounded-xl bg-muted/50 border-dashed">
                        <p className="text-muted-foreground">No pending invitations.</p>
                    </div>
                )}
            </div>

            {pastInvitations.length > 0 && (
                <div className="space-y-4 pt-8">
                    <h2 className="text-xl font-semibold text-muted-foreground">Past Invitations</h2>
                    <div className="grid gap-4 opacity-75">
                        {pastInvitations.map(invitation => (
                            <JobInvitationCard
                                key={invitation.id}
                                invitation={invitation}
                                onRespond={handleRespond}
                            />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default JobInvitations;

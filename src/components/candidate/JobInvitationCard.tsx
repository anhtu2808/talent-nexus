import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { JobInvitation } from '@/types';
import { format } from 'date-fns';
import { Briefcase, Building2, Calendar, Check, X } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

interface JobInvitationCardProps {
    invitation: JobInvitation;
    onRespond: (id: string, status: 'accepted' | 'declined') => void;
}

const JobInvitationCard = ({ invitation, onRespond }: JobInvitationCardProps) => {
    const [isProcessing, setIsProcessing] = useState(false);

    const handleAction = async (status: 'accepted' | 'declined') => {
        setIsProcessing(true);
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));
        onRespond(invitation.id, status);
        setIsProcessing(false);
    };

    return (
        <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-4 justify-between items-start">
                    <div className="space-y-3 flex-1">
                        <div className="flex items-center gap-2">
                            <Badge variant={invitation.status === 'pending' ? 'default' : 'secondary'} className={
                                invitation.status === 'pending' ? 'bg-blue-600 hover:bg-blue-700' : ''
                            }>
                                {invitation.status.charAt(0).toUpperCase() + invitation.status.slice(1)}
                            </Badge>
                            <span className="text-sm text-muted-foreground flex items-center gap-1">
                                <Calendar className="w-3 h-3" />
                                {format(new Date(invitation.sentAt), 'PPP')}
                            </span>
                        </div>

                        <div>
                            <Link to={`/jobs/${invitation.jobId}`} className="text-xl font-bold hover:text-primary transition-colors">
                                {invitation.jobTitle}
                            </Link>
                            <div className="flex items-center gap-2 text-muted-foreground mt-1">
                                <Building2 className="w-4 h-4" />
                                <span className="font-medium">{invitation.companyName}</span>
                            </div>
                        </div>

                        <div className="bg-muted/50 p-4 rounded-lg text-sm italic text-muted-foreground relative border-l-4 border-primary/20">
                            "{invitation.message}"
                        </div>
                    </div>

                    <div className="flex md:flex-col gap-2 w-full md:w-auto mt-4 md:mt-0">
                        {invitation.status === 'pending' && (
                            <>
                                <Button
                                    className="w-full md:w-32 gap-2"
                                    onClick={() => handleAction('accepted')}
                                    disabled={isProcessing}
                                >
                                    <Check className="w-4 h-4" />
                                    Accept
                                </Button>
                                <Button
                                    variant="outline"
                                    className="w-full md:w-32 gap-2 hover:bg-red-50 hover:text-red-600 hover:border-red-200"
                                    onClick={() => handleAction('declined')}
                                    disabled={isProcessing}
                                >
                                    <X className="w-4 h-4" />
                                    Decline
                                </Button>
                            </>
                        )}

                        <Button variant="ghost" className="w-full md:w-32 gap-2" asChild>
                            <Link to={`/jobs/${invitation.jobId}`}>
                                <Briefcase className="w-4 h-4" />
                                View Job
                            </Link>
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default JobInvitationCard;

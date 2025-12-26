import { useAuth } from '@/contexts/AuthContext';
import RecruiterProfile from './recruiter/Profile';
import NotFound from './NotFound';

const Profile = () => {
    const { user, isAuthenticated } = useAuth();

    if (!isAuthenticated || !user) {
        return <NotFound />; // Or redirect to login
    }

    if (user.role === 'recruiter') {
        return <RecruiterProfile />;
    }

    // Placeholder for other roles or redirect
    // For now, let's just return a generic placeholder or existing dashboards could hold profile sections
    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
                <h1 className="text-2xl font-bold">Profile Page</h1>
                <p className="text-muted-foreground">Profile view for {user.role} is under development.</p>
            </div>
        </div>
    );
};

export default Profile;

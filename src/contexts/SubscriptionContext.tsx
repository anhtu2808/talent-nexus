import { createContext, useContext, useState, ReactNode } from 'react';
import { toast } from 'sonner';

type PlanTier = 'free' | 'premium';

interface SubscriptionContextType {
    tier: PlanTier;
    togglePlan: () => void;
    setTier: (tier: PlanTier) => void;
}

const SubscriptionContext = createContext<SubscriptionContextType | undefined>(undefined);

export const SubscriptionProvider = ({ children }: { children: ReactNode }) => {
    const [tier, setTier] = useState<PlanTier>('free');

    const togglePlan = () => {
        const newTier = tier === 'free' ? 'premium' : 'free';
        setTier(newTier);
        toast.success(`Switched to ${newTier.toUpperCase()} plan`);
    };

    return (
        <SubscriptionContext.Provider value={{ tier, togglePlan, setTier }}>
            {children}
        </SubscriptionContext.Provider>
    );
};

export const useSubscription = () => {
    const context = useContext(SubscriptionContext);
    if (context === undefined) {
        throw new Error('useSubscription must be used within a SubscriptionProvider');
    }
    return context;
};

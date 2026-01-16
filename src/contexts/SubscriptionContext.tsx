import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { toast } from 'sonner';

type PlanTier = 'free' | 'premium';

interface SubscriptionContextType {
    tier: PlanTier;
    togglePlan: () => void;
    setTier: (tier: PlanTier) => void;
    atsScoringUsage: number;
    matchScoringUsage: number;
    fixCredits: number;
    incrementATSScoring: () => void;
    incrementMatchScoring: () => void;
    decrementFixCredits: () => void;
    LIMITS: {
        FREE: {
            ATS_SCORING: number;
            MATCH_SCORING: number;
            FIX_CREDITS: number;
        };
        PREMIUM: {
            FIX_CREDITS: number;
        };
    };
}

const LIMITS = {
    FREE: {
        ATS_SCORING: 3,
        MATCH_SCORING: 1,
        FIX_CREDITS: 2,
    },
    PREMIUM: {
        FIX_CREDITS: 100,
    }
};

const SubscriptionContext = createContext<SubscriptionContextType | undefined>(undefined);

export const SubscriptionProvider = ({ children }: { children: ReactNode }) => {
    // Initialize state from localStorage or defaults
    const [tier, setTierState] = useState<PlanTier>(() => {
        return (localStorage.getItem('subscription_tier') as PlanTier) || 'free';
    });

    const [atsScoringUsage, setAtsScoringUsage] = useState<number>(() => {
        return parseInt(localStorage.getItem('ats_scoring_usage') || '0', 10);
    });

    const [matchScoringUsage, setMatchScoringUsage] = useState<number>(() => {
        return parseInt(localStorage.getItem('match_scoring_usage') || '0', 10);
    });

    const [fixCredits, setFixCredits] = useState<number>(() => {
        const stored = localStorage.getItem('fix_credits');
        return stored ? parseInt(stored, 10) : LIMITS.FREE.FIX_CREDITS;
    });

    // Persist changes to localStorage
    useEffect(() => {
        localStorage.setItem('subscription_tier', tier);
    }, [tier]);

    useEffect(() => {
        localStorage.setItem('ats_scoring_usage', atsScoringUsage.toString());
    }, [atsScoringUsage]);

    useEffect(() => {
        localStorage.setItem('match_scoring_usage', matchScoringUsage.toString());
    }, [matchScoringUsage]);

    useEffect(() => {
        localStorage.setItem('fix_credits', fixCredits.toString());
    }, [fixCredits]);


    const setTier = (newTier: PlanTier) => {
        setTierState(newTier);
        // Reset credits when upgrading/downgrading for demo purposes
        if (newTier === 'premium') {
            // For premium, we might want to ensure they have at least the monthly allowance if they upgrade
            // checking if they already have more than base premium credits (unlikely in this simple logic but good to consider)
            // For now, simple reset to monthly allowance
            setFixCredits(LIMITS.PREMIUM.FIX_CREDITS);
        } else {
            // Downgrade to free
            setFixCredits(LIMITS.FREE.FIX_CREDITS); // Reset to free trial amount or 0? Prompt says "2 free trial credit".
            // We'll reset usages too for testing easier? Or keep them? 
            // Usually usage isn't reset on downgrade, but for a "Free trial" concept, let's keep usage as is 
            // so if they used 3 ATS scores, they are still blocked.
        }
    };

    const togglePlan = () => {
        const newTier = tier === 'free' ? 'premium' : 'free';
        setTier(newTier);
        toast.success(`Switched to ${newTier.toUpperCase()} plan`);
    };

    const incrementATSScoring = () => {
        setAtsScoringUsage(prev => prev + 1);
    };

    const incrementMatchScoring = () => {
        setMatchScoringUsage(prev => prev + 1);
    };

    const decrementFixCredits = () => {
        setFixCredits(prev => Math.max(0, prev - 1));
    };

    return (
        <SubscriptionContext.Provider value={{
            tier,
            togglePlan,
            setTier,
            atsScoringUsage,
            matchScoringUsage,
            fixCredits,
            incrementATSScoring,
            incrementMatchScoring,
            decrementFixCredits,
            LIMITS
        }}>
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

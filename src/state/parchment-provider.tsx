import {
    type ReactNode,
    useState,
} from 'react';
import ParchmentContext from './parchment-context';
import type {
    ParchmentSectionKey,
    ParchmentSectionRef,
    ParchmentSections,
} from '../types';

export default function ParchmentProvider({ children }: { children: ReactNode }) {
    const [parchmentSections, setParchmentSections] = useState<ParchmentSections>({});
    const [currentParchmentSectionKey, setCurrentParchmentSection] = useState<ParchmentSectionKey | null>(null);
    const addParchmentSection = (parchmentSectionKey: ParchmentSectionKey, parchmentSection: ParchmentSectionRef) => {
        if (parchmentSections[parchmentSectionKey]) {
            return;
        }

        setParchmentSections(prevState => ({
            ...prevState,
            [parchmentSectionKey]: {
                ref: parchmentSection,
                isInViewport: false,
            },
        }));
    };

    const removeParchmentSection = (parchmentSectionKey: ParchmentSectionKey) => {
        if (!parchmentSections[parchmentSectionKey]) {
            return;
        }

        const newParchmentSections = { ...parchmentSections };
        delete newParchmentSections[parchmentSectionKey];

        setParchmentSections(newParchmentSections);
    };

    const value = {
        currentParchmentSectionKey,
        setCurrentParchmentSection,

        parchmentSections,
        addParchmentSection,
        removeParchmentSection,
    };

    return (
        <ParchmentContext.Provider value={value}>
            {children}
        </ParchmentContext.Provider>
    );
}

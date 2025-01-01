import type {
    ParchmentSectionRef,
    ParchmentSectionKey,
    ParchmentSections,
} from '../types.ts';
import { createContext } from 'react';

interface ParchmentContext {
    currentSectionId?: ParchmentSectionKey | null;
    setCurrentParchmentSection?: (
        currentSectionId: ParchmentSectionKey,
    ) => void;

    parchmentSections?: ParchmentSections;
    addParchmentSection?: (
        id: ParchmentSectionKey,
        parchmentSection: ParchmentSectionRef,
    ) => void;
}

export default createContext<ParchmentContext>({} as ParchmentContext);

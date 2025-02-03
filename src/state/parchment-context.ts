import { createContext } from 'react';
import type {
    ParchmentSectionRef,
    ParchmentSectionKey,
    ParchmentSections,
} from '../types';

interface ParchmentContext {
    currentParchmentSectionKey?: ParchmentSectionKey | null;
    setCurrentParchmentSection?: (currentParchmentSection: ParchmentSectionKey) => void;

    parchmentSections?: ParchmentSections;
    addParchmentSection?: (parchmentSectionKey: ParchmentSectionKey, parchmentSection: ParchmentSectionRef) => void;
    removeParchmentSection?: (parchmentSectionKey: ParchmentSectionKey) => void;
}

export default createContext<ParchmentContext>({} as ParchmentContext);

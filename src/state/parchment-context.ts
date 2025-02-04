import { createContext, type RefObject } from 'react';
import type {
    ParchmentSectionRef,
    ParchmentSectionKey,
    ParchmentSections,
} from '../types';

interface ParchmentContext {
    parchmentContainerRef: RefObject<HTMLDivElement>;
    currentParchmentSectionKey?: ParchmentSectionKey | null;
    setCurrentParchmentSection: (currentParchmentSection: ParchmentSectionKey) => void;

    parchmentSections?: ParchmentSections;
    addParchmentSection: (parchmentSectionKey: ParchmentSectionKey, parchmentSection: ParchmentSectionRef) => void;
    removeParchmentSection?: (parchmentSectionKey: ParchmentSectionKey) => void;

    scrollTo: (parchmentSectionKey: ParchmentSectionKey) => void;

    intersectionThreshold: number;
    setIntersectionThreshold: (threshold: number) => void;
    scrollIntoViewOptions: ScrollIntoViewOptions;
    setScrollIntoViewOptions: (options: ScrollIntoViewOptions) => void;
}

export default createContext<ParchmentContext>({} as ParchmentContext);

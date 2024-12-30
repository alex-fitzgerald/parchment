import { create } from 'zustand';
import {
    ParchmentSectionRef,
    ParchmentSectionKey,
    ParchmentSections
} from "../types.ts";

interface ParchmentStore {
    currentParchmentSectionKey: ParchmentSectionKey | null;
    setCurrentParchmentSection: (currentParchmentSection: ParchmentSectionKey) => void;

    parchmentSections: ParchmentSections;
    addParchmentSection: (parchmentSectionKey: ParchmentSectionKey, parchmentSection: ParchmentSectionRef) => void;
}

export default create<ParchmentStore>((set) => ({
    currentParchmentSectionKey: null,
    setCurrentParchmentSection: (currentParchmentSectionKey) => set({ currentParchmentSectionKey }),

    parchmentSections: {},
    addParchmentSection: (parchmentSectionKey: ParchmentSectionKey, parchmentSection: ParchmentSectionRef) => set(({ parchmentSections }) => {
        const newParchmentSections = parchmentSections;
        newParchmentSections[parchmentSectionKey] = parchmentSection;

        return { parchmentSections: newParchmentSections }
    })
}));

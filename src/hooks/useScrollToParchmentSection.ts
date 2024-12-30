import { ParchmentSectionKey } from "../types.ts";
import parchmentStore from "../state/parchment-store.ts";

export default function useScrollToParchmentSection() {
    const { parchmentSections } = parchmentStore();

    return (parchmentSectionKey: ParchmentSectionKey) => {
        const nextSection = parchmentSections[parchmentSectionKey];

        nextSection?.current?.scrollIntoView({ behavior: 'smooth' });
    }
}
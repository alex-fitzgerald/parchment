import { ParchmentSectionKey } from "../types.ts";
import useParchmentContext from "./useParchmentContext.ts";

export default function useScrollToParchmentSection() {
    const { parchmentSections } = useParchmentContext();

    if (!parchmentSections) {
        return () => {};
    }

    return (parchmentSectionKey: ParchmentSectionKey) => {
        const nextSection = parchmentSections[parchmentSectionKey];

        nextSection?.ref?.current?.scrollIntoView({ behavior: 'smooth' });
    }
}
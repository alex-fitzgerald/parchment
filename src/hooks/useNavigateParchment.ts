import useScrollToParchmentSection from "./useScrollToParchmentSection.ts";
import useParchmentContext from "./useParchmentContext.ts";

export enum ParchmentDirection {
    UP = 'up',
    DOWN = 'down'
}

export default function useNavigateParchment() {
    const { currentParchmentSectionKey, parchmentSections } = useParchmentContext();
    const scrollToParchmentSection = useScrollToParchmentSection();

    if (!parchmentSections) {
        return () => {};
    }
    const parchmentSectionIndexes = Object.keys(parchmentSections);

    return (direction: ParchmentDirection) => {
        const currentIndex = currentParchmentSectionKey ? parchmentSectionIndexes.indexOf(String(currentParchmentSectionKey)) : 0;
        const nextPageIndex = direction === ParchmentDirection.DOWN ? currentIndex + 1 : currentIndex - 1;
        const nextPageKey = parchmentSectionIndexes[nextPageIndex];

        scrollToParchmentSection(nextPageKey);
    }
}
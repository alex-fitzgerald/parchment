import parchmentStore from "../state/parchment-store.ts";
import useScrollToParchmentSection from "./useScrollToParchmentSection.ts";

export enum ParchmentDirection {
    UP = 'up',
    DOWN = 'down'
}

export default function useNavigateParchment() {
    const { currentParchmentSectionKey, parchmentSections } = parchmentStore();
    const scrollToParchmentSection = useScrollToParchmentSection();
    const parchmentSectionIndexes = Object.keys(parchmentSections);

    return (direction: ParchmentDirection) => {
        const currentIndex = currentParchmentSectionKey ? parchmentSectionIndexes.indexOf(String(currentParchmentSectionKey)) : 0;
        const nextPageIndex = direction === ParchmentDirection.DOWN ? currentIndex + 1 : currentIndex - 1;
        const nextPageKey = parchmentSectionIndexes[nextPageIndex];
        console.log(
            'currentParchmentSectionKey:', currentParchmentSectionKey,
            'currentIndex:', currentIndex,
            'nextPageIndex:', nextPageIndex,
            'nextPageKey:', nextPageKey,
            'parchmentSectionIndexes:', parchmentSectionIndexes
        )

        scrollToParchmentSection(nextPageKey);
    }
}
import {
    type ReactNode,
    useRef,
    useState,
} from 'react';
import ParchmentContext from './parchment-context';
import type {
    ParchmentSectionKey,
    ParchmentSectionRef,
    ParchmentSections,
} from '../types';

const DEFAULT_THRESHOLD = 0.25;

export default function ParchmentProvider({ children }: { children: ReactNode }) {
    const parchmentContainerRef = useRef<HTMLDivElement>(null);
    const [parchmentSections, setParchmentSections] = useState<ParchmentSections>({});
    const [currentParchmentSectionKey, setCurrentParchmentSection] = useState<ParchmentSectionKey | null>(null);
    const [intersectionThreshold, setIntersectionThreshold] = useState(DEFAULT_THRESHOLD);
    const [scrollIntoViewOptions, setScrollIntoViewOpts] = useState<ScrollIntoViewOptions>({
        behavior: 'smooth',
        block: 'center',
    });

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

    const scrollTo = (parchmentSectionKey: ParchmentSectionKey) => {
        const nextSection = parchmentSections?.[parchmentSectionKey];

        nextSection?.ref?.current?.scrollIntoView(scrollIntoViewOptions);
    };

    const value = {
        parchmentContainerRef,

        currentParchmentSectionKey,
        setCurrentParchmentSection,

        parchmentSections,
        addParchmentSection,
        removeParchmentSection,

        scrollTo,

        /**
         * Configuration options
         */
        intersectionThreshold,
        setIntersectionThreshold,
        scrollIntoViewOptions,
        setScrollIntoViewOptions: (scrollIntoViewOptions: ScrollIntoViewOptions) => setScrollIntoViewOpts((prevState) => {
            return ({
                ...prevState,
                ...scrollIntoViewOptions,
            });
        }),
    };

    return (
        <ParchmentContext.Provider value={value}>
            {children}
        </ParchmentContext.Provider>
    );
}

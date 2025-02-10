import {
    type CSSProperties,
    type ReactNode,
    useLayoutEffect,
    useRef,
} from 'react';
import observerIntersection from '../hooks/observer-intersection.ts';
import { type ParchmentSectionKey } from '../types';
import useParchment from '../hooks/use-parchment';

interface ParchmentSectionProps {
    children: ReactNode;
    id: ParchmentSectionKey;
    className?: string;
    style?: CSSProperties;
}

export default function ParchmentSection({ children, id, className, style }: Readonly<ParchmentSectionProps>) {
    const { addParchmentSection, parchmentSections, removeParchmentSection, setInView } = useParchment();
    const parchmentSectionRef = useRef(null);
    observerIntersection(parchmentSectionRef.current, setInView);

    /**
     * On render, add the parchment section ref to state.
     *
     * This allows for it to be easily accessed by other components.
     */
    useLayoutEffect(() => {
        if (parchmentSectionRef.current && !parchmentSections?.[id]) {
            addParchmentSection?.(id, parchmentSectionRef);
        }

        return () => removeParchmentSection?.(id);
    }, [addParchmentSection, id, parchmentSectionRef]);

    return (
        <section
            id={id}
            ref={parchmentSectionRef}
            style={{
                scrollSnapAlign: 'center',
                boxSizing: 'border-box',
                minHeight: '100%',
                ...style,
            }}
            className={className}
        >
            {children}
        </section>
    );
}

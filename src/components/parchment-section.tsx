import {
    type CSSProperties,
    type ReactNode,
    useEffect,
    useRef,
} from 'react';
import useCurrentViewObserver from '../hooks/use-current-view-observer.ts';
import { type ParchmentSectionKey } from '../types.ts';
import useParchment from '../hooks/use-parchment.ts';

interface ParchmentSectionProps {
    children: ReactNode;
    id: ParchmentSectionKey;
    className?: string;
    style?: CSSProperties;
}

export default function ParchmentSection({ children, id, className, style }: Readonly<ParchmentSectionProps>) {
    const { addParchmentSection, parchmentSections, removeParchmentSection } = useParchment();
    const parchmentSectionRef = useRef(null);
    useCurrentViewObserver(parchmentSectionRef.current);
    /**
     * On render, add the parchment section ref to state.
     *
     * This allows for it to be easily accessed by other components.
     */
    useEffect(() => {
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
                scrollSnapAlign: 'start',
                boxSizing: 'border-box',
                minHeight: '100dvh',
                ...style,
            }}
            className={className}
        >
            {children}
        </section>
    );
}

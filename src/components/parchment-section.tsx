import {
    type ReactNode,
    useEffect,
    useRef,
} from 'react';
import useCurrentViewObserver from '../hooks/use-current-view-observer.ts';
import { type ParchmentSectionKey } from '../types.ts';
import useParchmentContext from '../hooks/use-parchment-context.ts';

interface ParchmentSectionProps {
    children: ReactNode;
    id: ParchmentSectionKey;
    className?: string;
}

export default function ParchmentSection({ children, id, className }: Readonly<ParchmentSectionProps>) {
    const { addParchmentSection, parchmentSections, removeParchmentSection } = useParchmentContext();
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
            }}
            className={className}
        >
            {children}
        </section>
    );
}

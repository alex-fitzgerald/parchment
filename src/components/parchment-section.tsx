import {
    type ReactNode,
    useEffect,
    useRef,
} from 'react';
import useCurrentViewObserver from '../hooks/useCurrentViewObserver.ts';
import { type ParchmentSectionKey } from '../types.ts';
import useParchmentContext from '../hooks/useParchmentContext.ts';

interface ParchmentSectionProps {
    children: ReactNode;
    id: ParchmentSectionKey;
}

export default function ParchmentSection({ children, id }: Readonly<ParchmentSectionProps>) {
    const { addParchmentSection } = useParchmentContext();
    const parchmentSectionRef = useRef(null);
    useCurrentViewObserver(parchmentSectionRef.current);
    /**
     * On render, add the parchment section ref to state.
     *
     * This allows for it to be easily accessed by other components.
     */
    useEffect(() => {
        if (parchmentSectionRef.current) {
            addParchmentSection?.(id, parchmentSectionRef);
        }
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
        >
            {children}
        </section>
    );
}

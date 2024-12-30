import {
    type ReactNode,
    useEffect,
    useRef
} from 'react';
import useCurrentViewObserver from "../../hooks/useCurrentViewObserver.ts";
import { type ParchmentSectionKey } from "../../types.ts";
import useParchmentContext from "../../hooks/useParchmentContext.ts";

interface ParchmentSectionProps {
    children: ReactNode;
    parchmentSectionKey: ParchmentSectionKey;
}

export default function ParchmentSection({ children, parchmentSectionKey }: Readonly<ParchmentSectionProps>) {
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
            addParchmentSection?.(parchmentSectionKey, parchmentSectionRef);
        }
    }, [addParchmentSection, parchmentSectionKey, parchmentSectionRef]);

    return (
        <section ref={parchmentSectionRef} style={{ boxSizing: 'border-box', minHeight: '100dvh' }} data-parchment-section-key={parchmentSectionKey}>
            {children}
        </section>
    );
}

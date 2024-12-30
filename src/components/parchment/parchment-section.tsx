import {
    type ReactNode,
    useEffect,
    useRef
} from 'react';
import parchmentStore from "../../state/parchment-store.ts";
import useCurrentViewObserver from "../../hooks/useCurrentViewObserver.ts";
import {ParchmentSectionKey} from "../../types.ts";

interface ParchmentSectionProps {
    children: ReactNode;
    parchmentSectionKey: ParchmentSectionKey;
}

export default function ParchmentSection({ children, parchmentSectionKey }: Readonly<ParchmentSectionProps>) {
    const { addParchmentSection } = parchmentStore();
    const parchmentSectionRef = useRef(null);
    useCurrentViewObserver(parchmentSectionRef.current);
    /**
     * On render, add the parchment section ref to state.
     *
     * This allows for it to be easily accessed by other components.
     */
    useEffect(() => {
        if (parchmentSectionRef.current) {
            addParchmentSection(parchmentSectionKey, parchmentSectionRef);
        }
    }, [addParchmentSection, parchmentSectionKey, parchmentSectionRef]);

    return (
        <section ref={parchmentSectionRef} style={{ boxSizing: 'border-box', minHeight: '100dvh' }} data-parchment-section-key={parchmentSectionKey}>
            {children}
        </section>
    );
}

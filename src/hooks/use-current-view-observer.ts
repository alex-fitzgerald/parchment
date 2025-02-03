import { useEffect } from 'react';
import { ParchmentSectionRef } from '../types';
import useParchment from './use-parchment';

/**
 * Creates an IntersectionObserver to monitor the provided
 * parchment section. When the provided section enters the viewport,
 * update the `currentParchmentSection` accordingly.
 */
export default function useCurrentViewObserver(parchmentSectionElement: ParchmentSectionRef['current']) {
    const { setCurrentParchmentSection, parchmentSections } = useParchment();

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            for (const { isIntersecting, target } of entries) {
                if (isIntersecting && target instanceof HTMLElement) {
                    const { id } = target;
                    if (!id || !parchmentSections?.[id]) {
                        return;
                    }

                    setCurrentParchmentSection?.(id);
                }
            }
        }, { threshold: 0.5 });

        if (parchmentSectionElement) {
            observer.observe(parchmentSectionElement);
        }

        return () => {
            if (parchmentSectionElement) {
                observer.unobserve(parchmentSectionElement);
            }
        };
    }, [parchmentSectionElement, setCurrentParchmentSection]);
}

import { useEffect } from 'react';
import type { ParchmentSectionRef } from '../types.ts';
import useParchment from './use-parchment.ts';

/**
 * Creates an IntersectionObserver to monitor the provided
 * parchment section. When the provided section enters the viewport,
 * update the `currentParchmentSection` accordingly.
 */
type ParchmentIntersectionCallback = (id: string) => void;
export default function useObserverIntersection(parchmentSectionElement: ParchmentSectionRef['current'], callback: ParchmentIntersectionCallback) {
    const { parchmentSections, parchmentContainerRef, intersectionThreshold } = useParchment();

    useEffect(() => {
        if (!parchmentContainerRef.current) {
            return;
        }

        const observer = new IntersectionObserver((entries) => {
            for (const { isIntersecting, target } of entries) {
                if (isIntersecting && target instanceof HTMLElement) {
                    const { id } = target;
                    if (!id || !parchmentSections?.[id]) {
                        return;
                    }

                    callback(id);
                }
            }
        }, { threshold: intersectionThreshold, root: parchmentContainerRef.current, rootMargin: '0px' });

        if (parchmentSectionElement) {
            observer.observe(parchmentSectionElement);
        }

        return () => {
            if (parchmentSectionElement) {
                observer.unobserve(parchmentSectionElement);
            }
        };
    }, [parchmentSectionElement, callback]);
}

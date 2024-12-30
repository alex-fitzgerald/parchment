import { useEffect } from "react";
import { ParchmentSection } from "../types.ts";
import parchmentStore from "../state/parchment-store.ts";

/**
 * Creates an IntersectionObserver to monitor the provided
 * parchment section. When the provided section enters the viewport,
 * update the `currentParchmentSection` accordingly.
 */
export default function useCurrentViewObserver(parchmentSectionElement: ParchmentSection['current']) {
    const { setCurrentParchmentSection } = parchmentStore();

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            for (const { isIntersecting, target } of entries) {
                if (isIntersecting && target instanceof HTMLElement) {
                    const { parchmentSectionKey } = target.dataset;
                    if (!parchmentSectionKey) {
                        return;
                    }

                    setCurrentParchmentSection(parchmentSectionKey);
                }
            }
        });

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
import type { RefObject } from 'react';

export type ParchmentSectionRef = RefObject<HTMLElement>;
export type ParchmentSectionKey = string;
export type ParchmentSections = Partial<Record<ParchmentSectionKey, { ref?: ParchmentSectionRef; isInViewport: boolean; intersectionThreshold?: number }>>;

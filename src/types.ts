import { type RefObject } from "react";

export type ParchmentSectionRef = RefObject<HTMLElement>;
export type ParchmentSectionKey = string;
export type ParchmentSections = Record<ParchmentSectionKey, ParchmentSectionRef>;
export type ParchmentNavItem<P> = P & { to: ParchmentSectionKey };
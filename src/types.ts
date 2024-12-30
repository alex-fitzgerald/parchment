import { type RefObject } from "react";

export type ParchmentSectionRef = RefObject<HTMLElement>;
export type ParchmentSectionKey = string;
export type ParchmentSections = { [key in ParchmentSectionKey]?: { ref?: ParchmentSectionRef; isInViewport: boolean } };

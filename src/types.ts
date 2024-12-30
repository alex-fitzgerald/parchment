import type { RefObject } from "react";

export type ParchmentSection = RefObject<HTMLElement>;
export type ParchmentSectionKey = string;
export type ParchmentSections = Record<ParchmentSectionKey, ParchmentSection>;
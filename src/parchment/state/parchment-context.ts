import type { RefObject } from "react";

import { createContext } from "react";

import type {
  ParchmentSectionKey,
  ParchmentSectionRef,
  ParchmentSections,
} from "../types.ts";

interface ParchmentContext {
  parchmentContainerRef: RefObject<HTMLDivElement>;
  inView?: ParchmentSectionKey | null;
  setInView: (currentParchmentSection: ParchmentSectionKey) => void;

  parchmentSections?: ParchmentSections;
  addParchmentSection: (parchmentSectionKey: ParchmentSectionKey, parchmentSection: ParchmentSectionRef) => void;
  removeParchmentSection?: (parchmentSectionKey: ParchmentSectionKey) => void;

  scrollTo: (parchmentSectionKey: ParchmentSectionKey) => void;

  intersectionThreshold: number;
  setIntersectionThreshold: (threshold: number) => void;
  scrollIntoViewOptions: ScrollIntoViewOptions;
  setScrollIntoViewOptions: (options: ScrollIntoViewOptions) => void;
}

export default createContext<ParchmentContext>({} as ParchmentContext);

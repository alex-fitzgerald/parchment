import type { CSSProperties, ReactNode } from "react";

import {

  useLayoutEffect,
  useRef,
} from "react";

import type { ParchmentSectionKey } from "../types.ts";

import useObserverIntersection from "../hooks/use-observer-intersection.ts";
import useParchment from "../hooks/use-parchment.ts";

interface ParchmentSectionProps {
  children: ReactNode;
  section: ParchmentSectionKey;
  className?: string;
  style?: CSSProperties;
}

export default function ParchmentSection({ children, section, className, style }: Readonly<ParchmentSectionProps>) {
  const { addParchmentSection, parchmentSections, removeParchmentSection, setInView } = useParchment();
  const parchmentSectionRef = useRef(null);
  useObserverIntersection(parchmentSectionRef.current, setInView);

  /**
   * On render, add the parchment section ref to state.
   *
   * This allows for it to be easily accessed by other components.
   */
  useLayoutEffect(() => {
    if (parchmentSectionRef.current && !parchmentSections?.[section]) {
      addParchmentSection?.(section, parchmentSectionRef);
    }

    return () => removeParchmentSection?.(section);
  }, [section, parchmentSectionRef]);

  return (
    <section
      id={section}
      ref={parchmentSectionRef}
      style={{
        scrollSnapAlign: "center",
        boxSizing: "border-box",
        minHeight: "100%",
        ...style,
      }}
      className={className}
    >
      {children}
    </section>
  );
}

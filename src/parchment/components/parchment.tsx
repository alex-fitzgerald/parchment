import type {
  CSSProperties,
  ReactNode,
} from "react";

import {
  useLayoutEffect,
} from "react";

import useParchment from "../hooks/use-parchment.ts";

export interface ParchmentOptions {
  /**
   * Sets the intersection threshold for all parchment sections.
   *
   * @default 0.5
   */
  intersectionThreshold?: number;
  /**
   * Sets options for the `scrollIntoView` method, when a ParchmentButton is clicked.
   *
   * @default { behavior: 'smooth', block: 'center' }
   */
  scrollIntoViewOptions?: ScrollIntoViewOptions;
  /**
   * Whether to enable scroll-snapping on the parchment container.
   *
   * @default false
   */
  snap?: boolean;
}

interface ParchmentProps extends ParchmentOptions {
  /**
   * Accepts any children. Only `ParchmentSections` will
   * be observed by the IntersectionObserver.
   */
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}

export default function Parchment({
  children,
  snap,
  className,
  style,
  intersectionThreshold,
  scrollIntoViewOptions,
}: Readonly<ParchmentProps>) {
  const {
    parchmentContainerRef,
    setIntersectionThreshold,
    setScrollIntoViewOptions,
  } = useParchment();

  useLayoutEffect(() => {
    if (intersectionThreshold) {
      setIntersectionThreshold(intersectionThreshold);
    }
  }, [intersectionThreshold]);

  useLayoutEffect(() => {
    if (scrollIntoViewOptions) {
      setScrollIntoViewOptions(scrollIntoViewOptions);
    }
  }, [scrollIntoViewOptions]);

  return (
    <article ref={parchmentContainerRef} style={{ height: "100%", width: "100%", overflowY: "auto", scrollSnapType: snap ? "y mandatory" : "" }} className={className}>
      <div
        style={{
          display: "flex",
          width: "100%",
          minHeight: "100%",
          flexDirection: "column",
          ...style,
        }}
      >
        {children}
      </div>
    </article>
  );
}

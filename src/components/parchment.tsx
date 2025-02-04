import {
    CSSProperties,
    ReactNode,
    useLayoutEffect,
} from 'react';
import useParchment from '../hooks/use-parchment';

interface ParchmentProps {
    /**
     * Accepts any children. Only child `ParchmentSections` will
     * be observed by the IntersectionObserver, but all children are valid.
     */
    children: ReactNode;
    /**
     * Whether to enable scroll-snapping on the parchment container.
     */
    snap?: boolean;
    className?: string;
    style?: CSSProperties;
    /**
     * Sets the intersection threshold for all parchment sections.
     *
     * If a section has its own threshold specified, that will take precedence.
     */
    intersectionThreshold?: number;
    scrollIntoViewOptions?: ScrollIntoViewOptions;
}

export default function Parchment({
    children,
    snap,
    className,
    style,
    intersectionThreshold,
    scrollIntoViewOptions,
}: Readonly<ParchmentProps>) {
    const { parchmentContainerRef, setIntersectionThreshold, setScrollIntoViewOptions } = useParchment();

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
        <article ref={parchmentContainerRef} style={{ height: '100%', width: '100%', overflowY: 'auto', scrollSnapType: snap ? 'y mandatory' : '' }} className={className}>
            <div
                style={{
                    display: 'flex',
                    width: '100%',
                    minHeight: '100%',
                    flexDirection: 'column',
                    ...style,
                }}
            >
                {children}
            </div>
        </article>
    );
}

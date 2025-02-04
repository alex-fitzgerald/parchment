import type {
    CSSProperties,
    ReactNode,
} from 'react';
import useParchment from '../hooks/use-parchment';

interface ParchmentProps {
    children: ReactNode;
    snap?: boolean;
    className?: string;
    style?: CSSProperties;
}

export default function Parchment({
    children,
    snap,
    className,
    style,
}: Readonly<ParchmentProps>) {
    const { parchmentContainerRef } = useParchment();

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

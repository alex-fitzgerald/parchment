import type {
    CSSProperties,
    ReactNode,
} from 'react';

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
    return (
        <div style={{ height: '100%', width: '100%', overflowY: 'auto', scrollSnapType: snap ? 'y mandatory' : '' }} className={className}>
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
        </div>
    );
}

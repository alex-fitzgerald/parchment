import { type ReactNode } from 'react';

interface ParchmentProps {
    children: ReactNode;
    snap?: boolean;
}

export default function Parchment({ children, snap }: Readonly<ParchmentProps>) {
    return (
        <div style={{ height: '100%', maxHeight: '100dvh', overflowY: 'auto', scrollSnapType: snap ? 'y mandatory' : '' }}>
            <div
                style={{
                    display: 'flex',
                    width: '100%',
                    minHeight: '100%',
                    flexDirection: 'column',
                }}
            >
                {children}
            </div>
        </div>
    );
}

import { type ReactNode } from 'react';

interface ParchmentProps {
    children: ReactNode;
    enableKeyboardNavigation?: boolean;
}

export default function Parchment({ children }: Readonly<ParchmentProps>) {
    return (
        <div style={{ height: '100%', maxHeight: '100dvh', overflowY: 'auto', scrollSnapType: 'y mandatory' }}>
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

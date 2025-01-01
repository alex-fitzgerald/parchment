import { type ReactNode } from 'react';
import ParchmentProvider from '../state/parchment-provider.tsx';

interface ParchmentProps {
    children: ReactNode;
    enableKeyboardNavigation?: boolean;
}

export default function Parchment({ children }: Readonly<ParchmentProps>) {
    return (
        <ParchmentProvider>
            <div
                style={{
                    display: 'flex',
                    width: '100%',
                    minHeight: '100%',
                    scrollSnapType: 'y mandatory',
                    flexDirection: 'column',
                }}
            >
                {children}
            </div>
        </ParchmentProvider>
    );
}

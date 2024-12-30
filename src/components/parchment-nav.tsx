import { type ReactNode } from 'react';
import ParchmentProvider from "../context/parchment-provider.tsx";

export default function ParchmentNav({ children }: Readonly<{ children: ReactNode; }>) {
    return (
        <ParchmentProvider>
            <nav>
                {children}
            </nav>
        </ParchmentProvider>
    );
}

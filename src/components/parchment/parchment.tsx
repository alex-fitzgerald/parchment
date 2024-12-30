import { type ReactNode } from 'react';
import NavigateByDirectionalKeysPlugin from "./plugins/navigate-by-directional-keys-plugin.tsx";
import NavigateByWheelPlugin from "./plugins/navigate-by-wheel-plugin.tsx";

interface ParchmentProps {
    children: ReactNode;
    enableWheelNavigation?: boolean;
    enableKeyboardNavigation?: boolean;
}

export default function Parchment({
    children,
    enableWheelNavigation,
    enableKeyboardNavigation
}: Readonly<ParchmentProps>) {
    return (
        <>
            <div style={{ display: 'flex', width: '100%', minHeight: '100%', overflow: 'hidden', flexDirection: 'column' }}>
                {children}
            </div>
            {enableWheelNavigation && <NavigateByWheelPlugin />}
            {enableKeyboardNavigation && <NavigateByDirectionalKeysPlugin />}
        </>
    );
}

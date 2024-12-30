import { type ReactNode } from 'react';
import ParchmentSection from "./parchment-section.tsx";
import {ParchmentSectionKey} from "../../types.ts";
import NavigateByDirectionalKeysPlugin from "./plugins/navigate-by-directional-keys-plugin.tsx";
import NavigateByWheelPlugin from "./plugins/navigate-by-wheel-plugin.tsx";

interface ParchmentProps {
    sections: Record<ParchmentSectionKey, ReactNode>;
    enableWheelNavigation?: boolean;
    enableKeyboardNavigation?: boolean;
}

export default function Parchment({
    sections,
    enableWheelNavigation,
    enableKeyboardNavigation
}: Readonly<ParchmentProps>) {
    return (
        <>
            <div style={{ display: 'flex', width: '100%', minHeight: '100%', overflow: 'hidden', flexDirection: 'column' }}>
                {
                    Object.entries(sections).map(([parchmentSectionKey, section], index) => (
                        <ParchmentSection key={index} parchmentSectionKey={parchmentSectionKey}>
                            {section}
                        </ParchmentSection>
                    ))
                }
            </div>
            {enableWheelNavigation && <NavigateByWheelPlugin />}
            {enableKeyboardNavigation && <NavigateByDirectionalKeysPlugin />}
        </>
    );
}

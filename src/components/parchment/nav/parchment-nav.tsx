import parchmentStore from "../../../state/parchment-store.ts";
import ParchmentNavButton from "./parchment-nav-button.tsx";
import { type FunctionComponent } from "react";
import { type ParchmentSectionKey } from "../../../types.ts";

type ButtonConstructors = Record<ParchmentSectionKey, FunctionComponent<{ isActive: boolean }>>

interface ParchmentNavProps {
    className?: string;
    buttons: ButtonConstructors;
}

export default function ParchmentNav({ className, buttons }: ParchmentNavProps) {
    const { currentParchmentSectionKey, parchmentSections } = parchmentStore();
    const sectionButtons = Object.entries(buttons);

    return (
        <nav className={className}>
            <ul>
                {
                    sectionButtons.map(([parchmentSectionButtonKey, ParchmentSectionButton]) => {
                        /**
                         * Check we have a corresponding section in the parchmentSections store
                         * for the provided button.
                         */
                        if (!parchmentSections[parchmentSectionButtonKey]) {
                            return;
                        }
                        const isActive = parchmentSectionButtonKey === currentParchmentSectionKey;

                        return (
                            <li key={parchmentSectionButtonKey} style={{ listStyle: 'none' }}>
                                <ParchmentNavButton parchmentSectionKey={parchmentSectionButtonKey}>
                                    <ParchmentSectionButton isActive={isActive} />
                                </ParchmentNavButton>
                            </li>
                        )
                    })
                }
            </ul>
        </nav>
    );
}
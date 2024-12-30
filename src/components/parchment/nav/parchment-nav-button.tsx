import { ReactNode } from "react";
import { ParchmentSectionKey } from "../../../types.ts";
import useScrollToParchmentSection from "../../../hooks/useScrollToParchmentSection.ts";

interface LinkProps {
    /**
     * Content to display in the link.
     */
    children: ReactNode;
    /**
     * The node to scroll to when the link is clicked.
     */
    parchmentSectionKey: ParchmentSectionKey;
}

export default function ParchmentNavButton({ children, parchmentSectionKey }: LinkProps) {
    const scrollToParchmentSection = useScrollToParchmentSection();
    function handleClick() {
        scrollToParchmentSection(parchmentSectionKey);
    }

    return (
        <button onClick={handleClick}>
            {children}
        </button>
    )
}
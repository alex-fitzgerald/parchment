import { ReactNode } from "react";
import { ParchmentSectionKey } from "../types.ts";
import useScrollToParchmentSection from "../hooks/useScrollToParchmentSection.ts";
import useParchmentContext from "../hooks/useParchmentContext.ts";
import ParchmentProvider from "../context/parchment-provider.tsx";

interface LinkProps {
    /**
     * Content to display in the link.
     */
    children: ReactNode | ((isActive?: boolean) => ReactNode);
    /**
     * The node to scroll to when the link is clicked.
     */
    to: ParchmentSectionKey;
}

function Button({ children, to }: LinkProps) {
    const { currentParchmentSectionKey, parchmentSections } = useParchmentContext();
    const scrollToParchmentSection = useScrollToParchmentSection();
    const childIsFunction = typeof children === 'function';

    console.log(currentParchmentSectionKey, parchmentSections, to);

    if (!to || !parchmentSections || !parchmentSections[to]) {
        return childIsFunction ? children() : children
    }

    function handleClick() {
        scrollToParchmentSection(to);
    }

    if (childIsFunction) {
        return (
            <button onClick={handleClick}>
                { children(to === currentParchmentSectionKey) }
            </button>
        );
    }

    return (
        <button onClick={handleClick}>
            {children}
        </button>
    )
}

export default function ParchmentButton({ children, to }: LinkProps) {
    return (
        <ParchmentProvider>
            <Button to={to}>{children}</Button>
        </ParchmentProvider>
    )
}
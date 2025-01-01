import { ReactNode } from 'react';
import { ParchmentSectionKey } from '../types.ts';
import useScrollToParchmentSection from '../hooks/useScrollToParchmentSection.ts';
import useParchmentContext from '../hooks/useParchmentContext.ts';

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

export default function Button({ children, to }: LinkProps) {
    const { currentSectionId, parchmentSections } = useParchmentContext();
    const scrollToParchmentSection = useScrollToParchmentSection();
    const childIsFunction = typeof children === 'function';

    console.log(currentSectionId, parchmentSections, to);

    if (!to || !parchmentSections || !parchmentSections[to]) {
        return childIsFunction ? children() : children;
    }

    function handleClick() {
        scrollToParchmentSection(to);
    }

    if (childIsFunction) {
        return (
            <button onClick={handleClick}>
                { children(to === currentSectionId) }
            </button>
        );
    }

    return (
        <button onClick={handleClick}>
            {children}
        </button>
    );
}

import { ReactNode } from 'react';
import { ParchmentSectionKey } from '../types';
import useParchment from '../hooks/use-parchment';

interface ButtonProps {
    /**
     * Content to display in the link.
     *
     * Optionally accepts a function that receives a boolean for whether
     * the associated ParchmentLink is in view.
     */
    children: ReactNode | ((hasCrossedThreshold?: boolean) => ReactNode);
    /**
     * The parchment section to scroll to when the link is clicked.
     */
    toSection: ParchmentSectionKey;
}

export default function Button({ children, toSection }: ButtonProps) {
    const { currentParchmentSectionKey, parchmentSections, scrollTo } = useParchment();
    const childIsFunction = typeof children === 'function';

    if (!toSection || !parchmentSections || !parchmentSections[toSection]) {
        return childIsFunction ? children() : children;
    }

    function handleClick() {
        scrollTo(toSection);
    }

    if (childIsFunction) {
        return (
            <button onClick={handleClick}>
                { children(toSection === currentParchmentSectionKey) }
            </button>
        );
    }

    return (
        <button onClick={handleClick}>
            {children}
        </button>
    );
}

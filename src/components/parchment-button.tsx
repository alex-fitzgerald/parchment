import { ReactNode } from 'react';
import { ParchmentSectionKey } from '../types.ts';
import useParchment from '../hooks/use-parchment';

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
    const { currentParchmentSectionKey, parchmentSections, scrollTo } = useParchment();
    const childIsFunction = typeof children === 'function';

    if (!to || !parchmentSections || !parchmentSections[to]) {
        return childIsFunction ? children() : children;
    }

    function handleClick() {
        scrollTo(to);
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
    );
}

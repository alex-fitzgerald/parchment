import { ReactNode } from 'react';
import { ParchmentSectionKey } from '../types.ts';
import useParchment from '../hooks/use-parchment.ts';

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
    section: ParchmentSectionKey;
}

export default function Button({ children, section }: ButtonProps) {
    const { inView, parchmentSections, scrollTo } = useParchment();
    const childIsFunction = typeof children === 'function';
    const active = section === inView;

    if (!section || !parchmentSections || !parchmentSections[section]) {
        return childIsFunction ? children() : children;
    }

    function handleClick() {
        scrollTo(section);
    }

    if (childIsFunction) {
        return (
            <button onClick={handleClick}>
                { children(active) }
            </button>
        );
    }

    return (
        <button onClick={handleClick} className={`parchment-button ${active ? 'active' : ''}`}>
            {children}
        </button>
    );
}

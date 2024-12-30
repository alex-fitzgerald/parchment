import { useEffect } from "react";


export default function useKeydownEvent(handleKeyboardEvent: (event: KeyboardEvent) => void) {
    useEffect(() => {
        window.addEventListener('keydown', handleKeyboardEvent, { passive: false });

        return () => {
            window.removeEventListener('keydown', handleKeyboardEvent);
        }
    }, [handleKeyboardEvent]);
}

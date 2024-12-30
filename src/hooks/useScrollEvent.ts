import { useEffect } from "react";


export default function useScrollEvent(handleWheelEvent: (event: WheelEvent) => void) {
    useEffect(() => {
        window.addEventListener('wheel', handleWheelEvent, { passive: false });

        return () => {
            window.removeEventListener('wheel', handleWheelEvent);
        }
    }, [handleWheelEvent]);
}

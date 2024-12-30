import useWheelEvent from "../../../hooks/useScrollEvent.ts";
import useNavigateParchment, { ParchmentDirection } from "../../../hooks/useNavigateParchment.ts";

export default function NavigateByWheelPlugin() {
    const navigationParchment = useNavigateParchment();

    function handleWheelEvent(event: WheelEvent)  {
        event.preventDefault();
        const wheelDirectionDown = event.deltaY > 0;
        navigationParchment(wheelDirectionDown ? ParchmentDirection.DOWN : ParchmentDirection.UP);
    }

    useWheelEvent(handleWheelEvent);

    return null;
}
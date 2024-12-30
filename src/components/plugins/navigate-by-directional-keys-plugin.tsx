import useNavigateParchment, { ParchmentDirection } from "../../hooks/useNavigateParchment.ts";
import useKeydownEvent from "../../hooks/useKeydownEvent.ts";

const DOWN = 'ArrowDown';
const RIGHT = 'ArrowRight';
const UP = 'ArrowUp';
const LEFT = 'ArrowLeft';
const SPACE = ' ';
const ENTER = 'Enter';
const BACKSPACE = 'Backspace';

const downKeys = [DOWN, RIGHT, SPACE, ENTER];
const upKeys = [UP, LEFT, BACKSPACE];
const observedKeys = [
    ...downKeys,
    ...upKeys
];

export default function NavigateByDirectionalKeysPlugin() {
    const navigationParchment = useNavigateParchment();

    function handleKeydownEvent(event: KeyboardEvent)  {
        if (!observedKeys.includes(event.key)) {
            return;
        }
        event.preventDefault()
        const isDown = downKeys.includes(event.key);

        navigationParchment(isDown ? ParchmentDirection.DOWN : ParchmentDirection.UP);
    }

    useKeydownEvent(handleKeydownEvent);

    return null;
}
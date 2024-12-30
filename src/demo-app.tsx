import './App.css';
import Parchment from "./components/parchment/parchment.tsx";
import ParchmentNav from "./components/parchment/nav/parchment-nav.tsx";
import {
    type ReactNode,
    useState
} from "react";

function MyNavButton({ isActive, children }: { isActive?: boolean, children: ReactNode }) {
    return (
        <span style={{
            border: '1px solid',
            borderColor: isActive ? 'red' : 'transparent'
        }}>
            {children}
        </span>
    )
}

function MyFirstSection() {
    return (
        <div>
            I'm the first section
        </div>
    )
}

function MySecondSection() {
    return (
        <div>
            I'm the second section
        </div>
    )
}

function MyThirdSection() {
    return (
        <div>
            I'm the third section
        </div>
    )
}

function ToggleButton({ onClick, label, isActive }: { onClick: () => void, label: string, isActive: boolean }) {
    return (
        <button
            style={{ border: '1px solid', borderColor: isActive ? 'green' : 'transparent' }}
            onClick={onClick}
        >
            { label }
        </button>
    )
}

function DemoApp() {
    const [navigateByWheel, setNavigateByWheel] = useState(true);
    const [navigateByDirectionalKeys, setNavigateByDirectionalKeys] = useState(true);

    return (
        <>
            <div style={{ position: 'fixed', display: 'flex', flexDirection: 'column' }}>
                <div  style={{ display: 'flex', flexDirection: 'column' }}>
                    <ToggleButton onClick={() => setNavigateByWheel(!navigateByWheel)} label="Wheel nav" isActive={navigateByWheel} />
                    <ToggleButton onClick={() => setNavigateByDirectionalKeys(!navigateByDirectionalKeys)} label="Keyboard nav" isActive={navigateByDirectionalKeys} />
                </div>
                <div>
                    <ParchmentNav buttons={{
                        myFirstSection: ({ isActive }) => <MyNavButton isActive={isActive}>1</MyNavButton>,
                        myThirdSection: ({ isActive }) => <MyNavButton isActive={isActive}>3</MyNavButton>,
                    }} />
                </div>
            </div>
            <Parchment
                sections={{
                  myFirstSection: <MyFirstSection />,
                  mySecondSection: <MySecondSection />,
                  myThirdSection: <MyThirdSection />,
                }}
                enableWheelNavigation={navigateByWheel}
                enableKeyboardNavigation={navigateByDirectionalKeys}
            />
        </>
    )
}

export default DemoApp

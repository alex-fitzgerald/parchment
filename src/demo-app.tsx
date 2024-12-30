import './demo-app.css';
import Parchment from "./components/parchment.tsx";
import {
    type ReactNode,
    useState
} from "react";
import ParchmentSection from "./components/parchment-section.tsx";
import ParchmentButton from "./components/parchment-button.tsx";

function MyNavButton({isActive, children}: { isActive?: boolean, children: ReactNode }) {
    return (
        <span style={{ color: isActive ? 'red' : 'blue' }}>
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
            style={{border: '1px solid', borderColor: isActive ? 'green' : 'transparent'}}
            onClick={onClick}
        >
            {label}
        </button>
    )
}

function DemoApp() {
    const [navigateByWheel, setNavigateByWheel] = useState(true);
    const [navigateByDirectionalKeys, setNavigateByDirectionalKeys] = useState(true);

    return (
        <>
            <div style={{position: 'fixed', display: 'flex', flexDirection: 'column'}}>
                <div style={{display: 'flex', flexDirection: 'column'}}>
                    <ToggleButton
                      onClick={() => setNavigateByWheel(!navigateByWheel)}
                      label="Wheel nav"
                      isActive={navigateByWheel}
                    />
                    <ToggleButton
                      onClick={() => setNavigateByDirectionalKeys(!navigateByDirectionalKeys)}
                      label="Keyboard nav"
                      isActive={navigateByDirectionalKeys}
                    />
                </div>
                <div>
                    <ParchmentButton to="myFirstSection">
                        {
                            (isActive) => <MyNavButton isActive={isActive}>First</MyNavButton>
                        }
                    </ParchmentButton>
                    <ParchmentButton to="mySecondSection">
                        <MyNavButton>Second</MyNavButton>
                    </ParchmentButton>
                    <ParchmentButton to="myThirdSection">
                        <MyNavButton>Third</MyNavButton>
                    </ParchmentButton>
                </div>
            </div>
            <Parchment
              enableWheelNavigation={navigateByWheel}
              enableKeyboardNavigation={navigateByDirectionalKeys}
            >
                <ParchmentSection parchmentSectionKey="myFirstSection">
                    <MyFirstSection />
                </ParchmentSection>
                <ParchmentSection parchmentSectionKey="mySecondSection">
                    <MySecondSection />
                </ParchmentSection>
                <ParchmentSection parchmentSectionKey="myThirdSection">
                    <MyThirdSection />
                </ParchmentSection>
            </Parchment>
        </>
    )
}

export default DemoApp

import './demo-app.css';
import Parchment from './components/parchment.tsx';
import {
    type ReactNode,
} from 'react';
import ParchmentSection from './components/parchment-section.tsx';
import ParchmentButton from './components/parchment-button.tsx';
import ParchmentProvider from './state/parchment-provider.tsx';

function MyNavButton({ isActive, children }: { isActive?: boolean; children: ReactNode }) {
    return (
        <span style={{ color: isActive ? 'red' : 'blue' }}>
            {children}
        </span>
    );
}

function MyFirstSection() {
    return (
        <div>
            I'm the first section
        </div>
    );
}

function MySecondSection() {
    return (
        <div>
            I'm the second section
        </div>
    );
}

function MyThirdSection() {
    return (
        <div>
            I'm the third section
        </div>
    );
}

function DemoApp() {
    return (
        <ParchmentProvider>
            <div style={{ position: 'fixed', display: 'flex', flexDirection: 'column' }}>
                <ParchmentButton to="myFirstSection">
                    {
                        isActive => <MyNavButton isActive={isActive}>First</MyNavButton>
                    }
                </ParchmentButton>
                <ParchmentButton to="mySecondSection">
                    {
                        isActive => <MyNavButton isActive={isActive}>Second</MyNavButton>
                    }
                </ParchmentButton>
                <ParchmentButton to="myThirdSection">
                    {
                        isActive => <MyNavButton isActive={isActive}>Third</MyNavButton>
                    }
                </ParchmentButton>
            </div>
            <Parchment>
                <ParchmentSection id="myFirstSection">
                    <MyFirstSection />
                </ParchmentSection>
                <ParchmentSection id="mySecondSection">
                    <MySecondSection />
                </ParchmentSection>
                <ParchmentSection id="myThirdSection">
                    <MyThirdSection />
                </ParchmentSection>
            </Parchment>
        </ParchmentProvider>
    );
}

export default DemoApp;

import './demo-app.css';
import Parchment from './components/parchment';
import {
    useState,
    type ReactNode,
} from 'react';
import ParchmentSection from './components/parchment-section';
import ParchmentButton from './components/parchment-button';
import ParchmentProvider from './state/parchment-provider';

function MyNavButton({ isActive, children }: { isActive?: boolean; children: ReactNode }) {
    return (
        <span style={{ color: isActive ? 'var(--accent)' : 'var(--foreground)' }}>
            {children}
        </span>
    );
}

function Section({ title }: { title: string }) {
    return (
        <div style={{ height: '100vh', display: 'flex', alignItems: 'center' }}>
            {title}
        </div>
    );
}

function Controls({ snap, toggleSnap }: { snap: boolean; toggleSnap: () => void }) {
    return (
        <div style={{ position: 'fixed', top: '8px', right: '8px', border: '1px solid', borderColor: snap ? 'var(--foreground)' : 'transparent' }}>
            <button onClick={toggleSnap}>
                Scroll snap
            </button>
        </div>
    );
}

function DemoApp() {
    const [snap, setSnap] = useState(false);

    return (
        <>
            <Controls snap={snap} toggleSnap={() => setSnap(prevSnap => !prevSnap)} />
            <ParchmentProvider>
                <div style={{ position: 'fixed', display: 'flex', flexDirection: 'column', gap: '8px', top: '8px', left: '8px' }}>
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
                <Parchment snap={snap}>
                    <ParchmentSection id="myFirstSection" style={{ padding: '8px', borderRadius: '8px', border: '1px solid white' }}>
                        <Section title="My first section" />
                    </ParchmentSection>
                    <ParchmentSection id="mySecondSection" style={{ padding: '8px', borderRadius: '8px', border: '1px solid white' }}>
                        <Section title="My section section" />
                    </ParchmentSection>
                    <ParchmentSection id="myThirdSection" style={{ padding: '8px', borderRadius: '8px', border: '1px solid white' }}>
                        <Section title="My third section" />
                    </ParchmentSection>
                </Parchment>
            </ParchmentProvider>
        </>
    );
}

export default DemoApp;

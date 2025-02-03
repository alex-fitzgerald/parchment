import './demo-app.css';
import Parchment from './components/parchment';
import {
    useState,
    type ReactNode,
} from 'react';
import ParchmentSection from './components/parchment-section';
import ParchmentButton from './components/parchment-button';
import ParchmentProvider from './state/parchment-provider';

const INTERSECTION_OBSERVER = 'https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API';
const GITHUB_URL = 'https://github.com/alex-fitzgerald/parchment';

function MyNavButton({ isActive, children }: { isActive?: boolean; children: ReactNode }) {
    return (
        <span style={{ color: isActive ? 'var(--accent)' : 'var(--foreground)' }}>
            {children}
        </span>
    );
}

function Section({ title }: { title: string }) {
    return (
        <div style={{ height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            {title}
        </div>
    );
}

function Controls({ snap, toggleSnap }: { snap: boolean; toggleSnap: () => void }) {
    return (
        <div style={{ border: '1px solid', borderColor: snap ? 'var(--foreground)' : 'transparent' }}>
            <button onClick={toggleSnap}>
                Scroll snap
            </button>
        </div>
    );
}

function DemoApp() {
    const [snap, setSnap] = useState(false);

    return (
        <main style={{ display: 'flex', gap: '8px', alignItems: 'center', position: 'relative' }}>
            <article style={{ flex: 1, alignItems: 'start', textAlign: 'left', padding: '32px' }}>
                <div style={{ maxWidth: '312px' }}>
                    <h1>
                        📜 React Parchment
                    </h1>
                    <p>
                        Parchment is a simple React library for creating scrollable sections with visual feedback.
                    </p>
                    <p>
                        It uses the
                        {' '}
                        <a target="_blank" href={INTERSECTION_OBSERVER}>IntersectionObserver API</a>
                        {' '}
                        to determine which section is currently in view and provides a simple API for scrolling to sections.
                    </p>
                    <p>
                        This information is feedback to the `ParchmentButton` component, and available on the `useParchment` hook.
                    </p>
                    <a href={GITHUB_URL} target="_blank">Visit on Github</a>
                </div>
            </article>
            <div style={{ flex: 1 }}>
                <ParchmentProvider>
                    <div style={{ position: 'fixed', display: 'flex', flexDirection: 'column', gap: '32px', top: '32px', right: '32px' }}>
                        <Controls snap={snap} toggleSnap={() => setSnap(prevSnap => !prevSnap)} />
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
                    <Parchment snap={snap} style={{ display: 'flex', flexDirection: 'column', gap: '256px', padding: '256px 0' }}>
                        <ParchmentSection id="myFirstSection" style={{ margin: '8px', padding: '8px', borderRadius: '8px', border: '1px solid rgba(125, 125, 125, 0.5)', height: '500px' }}>
                            <Section title="My first section" />
                        </ParchmentSection>
                        <ParchmentSection id="mySecondSection" style={{ margin: '8px', padding: '8px', borderRadius: '8px', border: '1px solid rgba(125, 125, 125, 0.5)', height: '500px' }}>
                            <Section title="My section section" />
                        </ParchmentSection>
                        <ParchmentSection id="myThirdSection" style={{ margin: '8px', padding: '8px', borderRadius: '8px', border: '1px solid rgba(125, 125, 125, 0.5)', height: '500px' }}>
                            <Section title="My third section" />
                        </ParchmentSection>
                    </Parchment>
                </ParchmentProvider>
            </div>
        </main>
    );
}

export default DemoApp;

import './demo-app.css';
import Parchment from './components/parchment';
import {
    useEffect,
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
        <div>
            <button onClick={toggleSnap} style={{ fontSize: '0.875em', color: snap ? 'var(--foreground)' : 'var(--foreground-muted)', boxShadow: snap ? 'var(--neumorphic-shadow-inset)' : 'var(--neumorphic-shadow)', borderRadius: '16px', textShadow: snap ? '0px 0px 4px var(--foreground)' : '' }}>
                Scroll snap
            </button>
        </div>
    );
}

function useIsSmallViewport() {
    const [isSmallViewport, setIsSmallViewport] = useState(window.innerWidth < 768);

    useEffect(() => {
        const handleResize = () => {
            setIsSmallViewport(window.innerWidth < 768);
        };

        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return isSmallViewport;
}

function DemoApp() {
    const [snap, setSnap] = useState(false);
    const isSmallView = useIsSmallViewport();

    return (
        <main style={{ height: '100%', display: 'flex', gap: '8px', alignItems: 'center', position: 'relative', flexDirection: isSmallView ? 'column' : 'row' }}>
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
                        This information is feed back to the `ParchmentButton` component, and available on the `useParchment` hook.
                    </p>
                    <p>
                        Examples to come...
                    </p>
                    <a href={GITHUB_URL} target="_blank">Visit on Github</a>
                </div>
            </article>
            <div style={{ flex: 1, height: '100%', overflow: 'hidden' }}>
                <ParchmentProvider>
                    <div style={{ height: '100%', display: 'flex', gap: '32px', alignItems: 'center', flexDirection: isSmallView ? 'column' : 'row' }}>
                        <div style={{ display: 'flex', alignItems: 'center', flexDirection: isSmallView ? 'row' : 'column', gap: '32px', margin: '32px' }}>
                            <Controls snap={snap} toggleSnap={() => setSnap(prevSnap => !prevSnap)} />
                            <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: isSmallView ? 'row' : 'column' }}>
                                <ParchmentButton toSection="myFirstSection">
                                    {
                                        isActive => <MyNavButton isActive={isActive}>First</MyNavButton>
                                    }
                                </ParchmentButton>
                                <ParchmentButton toSection="mySecondSection">
                                    {
                                        isActive => <MyNavButton isActive={isActive}>Second</MyNavButton>
                                    }
                                </ParchmentButton>
                                <ParchmentButton toSection="myThirdSection">
                                    {
                                        isActive => <MyNavButton isActive={isActive}>Third</MyNavButton>
                                    }
                                </ParchmentButton>
                            </ul>
                        </div>
                        <Parchment snap={snap} style={{ display: 'flex', flexGrow: 1, flexDirection: 'column', gap: '32px', padding: '32px 0' }}>
                            <ParchmentSection id="myFirstSection" style={{ margin: '8px', padding: '8px', borderRadius: '8px', border: '1px solid rgba(125, 125, 125, 0.5)', height: '720px' }}>
                                <Section title="My first section" />
                            </ParchmentSection>
                            <ParchmentSection id="mySecondSection" style={{ margin: '8px', padding: '8px', borderRadius: '8px', border: '1px solid rgba(125, 125, 125, 0.5)', height: '720px' }}>
                                <Section title="My second section" />
                            </ParchmentSection>
                            <ParchmentSection id="myThirdSection" style={{ margin: '8px', padding: '8px', borderRadius: '8px', border: '1px solid rgba(125, 125, 125, 0.5)', height: '720px' }}>
                                <Section title="My third section" />
                            </ParchmentSection>
                        </Parchment>
                    </div>
                </ParchmentProvider>
            </div>
        </main>
    );
}

export default DemoApp;

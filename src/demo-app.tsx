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

const GITHUB_URL = 'https://github.com/alex-fitzgerald/parchment';

function MyNavButton({ isActive, children }: { isActive?: boolean; children: ReactNode }) {
    return (
        <span style={{ color: isActive ? 'hsla(var(--accent), 50%)' : 'var(--foreground)' }}>
            {children}
        </span>
    );
}

function Section({ title }: { title: string }) {
    return (
        <div className="section">
            <p>
                {title}
            </p>
        </div>
    );
}

interface ControlProps {
    snap: boolean;
    toggleSnap: () => void;
    smoothScroll: boolean;
    toggleSmoothScroll: () => void;
}

function Controls({ snap, toggleSnap, smoothScroll, toggleSmoothScroll }: ControlProps) {
    return (
        <div className="controls gap-tight">
            <button onClick={toggleSnap} className={`toggle-button ${snap ? 'active' : ''}`}>
                Snap
            </button>
            <button onClick={toggleSmoothScroll} className={`toggle-button ${smoothScroll ? 'active' : ''}`}>
                Smooth
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
    const [smoothScroll, setSmoothScroll] = useState(false);
    const isSmallView = useIsSmallViewport();

    return (
        <ParchmentProvider>
            <main className={isSmallView ? 'column' : ''}>
                <article className="blurb-container">
                    <div className="blurb">
                        <h1>
                            📜 React Parchment
                        </h1>
                        <p>
                            Parchment is a simple React library for providing visual feedback for scrollable sections
                        </p>
                        <p>
                            Examples to come...
                        </p>
                        <a href={GITHUB_URL} target="_blank">Visit on Github</a>
                    </div>
                    <div className="parchment-nav-wrapper row">
                        <Controls
                            snap={snap}
                            toggleSnap={() => setSnap(prevSnap => !prevSnap)}
                            smoothScroll={smoothScroll}
                            toggleSmoothScroll={() => setSmoothScroll(prevSmoothScroll => !prevSmoothScroll)}
                        />
                        <ul className="parchment-nav row">
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
                </article>
                <div className={`parchment-demo-wrapper ${isSmallView ? 'column size-full' : 'row-reverse flex-1'}`}>
                    <div style={{ height: isSmallView ? '100%' : '80%', width: '100%' }}>
                        <Parchment snap={snap} scrollIntoViewOptions={{ behavior: smoothScroll ? 'smooth' : 'instant' }} className={`parchment ${isSmallView ? 'height-80' : ''}`}>
                            <ParchmentSection id="myFirstSection" style={{ display: 'flex', alignItems: 'center' }}>
                                <Section title="My first section" />
                            </ParchmentSection>
                            <ParchmentSection id="mySecondSection" style={{ display: 'flex', alignItems: 'center' }}>
                                <Section title="My second section" />
                            </ParchmentSection>
                            <ParchmentSection id="myThirdSection" style={{ display: 'flex', alignItems: 'center' }}>
                                <Section title="My third section" />
                            </ParchmentSection>
                        </Parchment>
                    </div>
                </div>
            </main>
        </ParchmentProvider>
    );
}

export default DemoApp;

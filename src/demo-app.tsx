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
        <span style={{ color: isActive ? 'hsla(var(--accent), 50%)' : 'var(--foreground)', textShadow: isActive ? '0px 0px 4px hsla(var(--accent), 80%)' : '' }}>
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

function Controls({ snap, toggleSnap }: { snap: boolean; toggleSnap: () => void }) {
    return (
        <div>
            <button onClick={toggleSnap} className={`toggle-button ${snap ? 'active' : ''}`}>
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
            </article>
            <ParchmentProvider>
                <div className={`parchment-demo-wrapper ${isSmallView ? 'column size-full' : 'row-reverse flex-1'}`}>
                    <div className={`parchment-nav-wrapper ${!isSmallView ? 'column' : 'row'}`}>
                        <Controls snap={snap} toggleSnap={() => setSnap(prevSnap => !prevSnap)} />
                        <ul className={`parchment-nav ${!isSmallView ? 'column' : 'row'}`}>
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
                    <Parchment snap={snap} className="parchment">
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
            </ParchmentProvider>
        </main>
    );
}

export default DemoApp;

import './demo-app.css';
import Parchment from './components/parchment';
import {
    useEffect,
    useState,
    type ReactNode, useLayoutEffect,
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
    darkMode: boolean;
    toggleDarkMode: () => void;
}

function Controls({ snap, toggleSnap, smoothScroll, toggleSmoothScroll, darkMode, toggleDarkMode }: ControlProps) {
    return (
        <div className="controls gap-spacious">
            <div className={`${snap ? 'active' : ''} toggle-button-field`}>
                <label htmlFor="toggle-snap" onClick={toggleSnap}>Snap to section</label>
                <button name="toggle-snap" onClick={toggleSnap} />
            </div>
            <div className={`${smoothScroll ? 'active' : ''} toggle-button-field`}>
                <label htmlFor="toggle-smooth" onClick={toggleSmoothScroll}>Smooth scrolling</label>
                <button name="toggle-smooth" onClick={toggleSmoothScroll} />
            </div>
            <div className={`${darkMode ? 'active' : ''} toggle-button-field`}>
                <label htmlFor="toggle-smooth" onClick={toggleDarkMode}>Dark mode</label>
                <button name="toggle-smooth" onClick={toggleDarkMode} />
            </div>
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

const toggleDarkMode = () => {
    document.documentElement.classList.toggle('dark-mode');
};

function DemoApp() {
    const [snap, setSnap] = useState(false);
    const [smoothScroll, setSmoothScroll] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const isSmallView = useIsSmallViewport();

    useLayoutEffect(() => {
        const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)');

        if (prefersDarkMode.matches) {
            setIsDarkMode(true);
            document.documentElement.classList.add('dark-mode');
        }
    }, []);

    const handleToggleDarkMode = () => {
        toggleDarkMode();
        setIsDarkMode(prevDarkMode => !prevDarkMode);
    };

    return (
        <ParchmentProvider>
            <main className={isSmallView ? 'column' : ''}>
                <article className={`blurb-container ${isSmallView ? '' : 'flex-1'}`}>
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
                            darkMode={isDarkMode}
                            toggleDarkMode={handleToggleDarkMode}
                        />
                        <div className="parchment-nav row sections">
                            <ParchmentButton section="myFirstSection">
                                {
                                    isActive => <MyNavButton isActive={isActive}>First</MyNavButton>
                                }
                            </ParchmentButton>
                            <ParchmentButton section="mySecondSection">
                                Second
                            </ParchmentButton>
                            <ParchmentButton section="myThirdSection">
                                {
                                    isActive => <MyNavButton isActive={isActive}>Third</MyNavButton>
                                }
                            </ParchmentButton>
                        </div>
                    </div>
                </article>
                <div className={`parchment-demo-wrapper ${isSmallView ? 'column size-full' : 'row-reverse flex-1'}`}>
                    <div style={{ height: '100%', width: '100%' }}>
                        <Parchment snap={snap} scrollIntoViewOptions={{ behavior: smoothScroll ? 'smooth' : 'instant' }} className="parchment">
                            <ParchmentSection section="myFirstSection" style={{ display: 'flex', alignItems: 'center' }}>
                                <Section title="My first section" />
                            </ParchmentSection>
                            <ParchmentSection section="mySecondSection" style={{ display: 'flex', alignItems: 'center' }}>
                                <Section title="My second section" />
                            </ParchmentSection>
                            <ParchmentSection section="myThirdSection" style={{ display: 'flex', alignItems: 'center' }}>
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

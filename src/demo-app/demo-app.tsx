import './demo-app.css';
import Parchment from '../components/parchment.tsx';
import {
    useEffect,
    useState,
    useLayoutEffect,
} from 'react';
import ParchmentSection from '../components/parchment-section.tsx';
import ParchmentButton from '../components/parchment-button.tsx';
import ParchmentProvider from '../state/parchment-provider.tsx';
import Github from './svgs/github.tsx';
import Moon from './svgs/moon.tsx';

const GITHUB_URL = 'https://github.com/alex-fitzgerald/parchment';

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
            <div className={`${snap ? 'active' : ''} toggle-button-field`}>
                <label htmlFor="toggle-snap" onClick={toggleSnap}>Snap to section</label>
                <button name="toggle-snap" onClick={toggleSnap} />
            </div>
            <div className={`${smoothScroll ? 'active' : ''} toggle-button-field`}>
                <label htmlFor="toggle-smooth" onClick={toggleSmoothScroll}>Smooth scrolling</label>
                <button name="toggle-smooth" onClick={toggleSmoothScroll} />
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
        <>
            <ParchmentProvider>
                <main className={isSmallView ? 'column' : ''}>
                    <div style={{ display: 'flex', justifyContent: 'end', alignItems: 'end' }} className="flex-1">
                        <article>
                            <div className="blurb">
                                <h1>
                                    📜 React Parchment
                                </h1>
                                <p>
                                    Parchment is a simple React library for providing visual feedback for scrollable sections.
                                </p>
                            </div>
                            <div className="parchment-nav-wrapper row">
                                <Controls
                                    snap={snap}
                                    toggleSnap={() => setSnap(prevSnap => !prevSnap)}
                                    smoothScroll={smoothScroll}
                                    toggleSmoothScroll={() => setSmoothScroll(prevSmoothScroll => !prevSmoothScroll)}
                                />
                            </div>
                        </article>
                    </div>
                    <div style={{ justifyContent: 'start' }} className={`parchment-demo-wrapper ${isSmallView ? 'column size-full' : 'row-reverse flex-1'}`}>
                        <div style={{ height: '100%', width: '100%' }}>
                            <div className="parchment-nav row">
                                <ParchmentButton section="myFirstSection">
                                    First
                                </ParchmentButton>
                                <ParchmentButton section="mySecondSection">
                                    Second
                                </ParchmentButton>
                                <ParchmentButton section="myThirdSection">
                                    Third
                                </ParchmentButton>
                            </div>
                            <Parchment
                                snap={snap}
                                scrollIntoViewOptions={{ behavior: smoothScroll ? 'smooth' : 'instant' }}
                                className="parchment"
                            >
                                <ParchmentSection
                                    section="myFirstSection"
                                    style={{ display: 'flex', alignItems: 'center' }}
                                >
                                    <Section title="My first section" />
                                </ParchmentSection>
                                <ParchmentSection
                                    section="mySecondSection"
                                    style={{ display: 'flex', alignItems: 'center' }}
                                >
                                    <Section title="My second section" />
                                </ParchmentSection>
                                <ParchmentSection
                                    section="myThirdSection"
                                    style={{ display: 'flex', alignItems: 'center' }}
                                >
                                    <Section title="My third section" />
                                </ParchmentSection>
                            </Parchment>
                        </div>
                    </div>
                </main>
            </ParchmentProvider>
            <footer>
                <div>
                    <button
                        name="toggle-smooth"
                        onClick={handleToggleDarkMode}
                        className={`toggle-button ${isDarkMode ? 'active' : ''}`}
                    >
                        <Moon />
                    </button>
                    <a href={GITHUB_URL}>
                        <Github />
                    </a>
                </div>
                <p>
                    Alex
                </p>
            </footer>
        </>
    );
}

export default DemoApp;

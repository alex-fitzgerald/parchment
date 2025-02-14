import './demo-app.css';
import Parchment from '../parchment/components/parchment.tsx';
import {
    useEffect,
    useState,
    useLayoutEffect,
} from 'react';
import ParchmentSection from '../parchment/components/parchment-section.tsx';
import ParchmentButton from '../parchment/components/parchment-button.tsx';
import ParchmentProvider from '../parchment/state/parchment-provider.tsx';
import Github from './svgs/github.tsx';
import Moon from './svgs/moon.tsx';
import { Noise } from '@alex-fitzgerald/noise';
import Logo from './logo.tsx';

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
        <div className="controls">
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

const demoSections = [
    'First',
    'Second',
    'Third',
    'Fourth',
    'Fifth',
    'Sixth',
    'Seventh',
    'Etcetera',
];

function DemoApp() {
    const [snap, setSnap] = useState(false);
    const [smoothScroll, setSmoothScroll] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(false);
    // const [demoSections] = useState();
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
                                    Parchment
                                </h1>
                                <p>
                                    Parchment is a simple React library for composing scrollspies.
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
                            <Parchment
                                snap={snap}
                                scrollIntoViewOptions={{ behavior: smoothScroll ? 'smooth' : 'instant' }}
                                className="parchment"
                            >
                                {
                                    demoSections.map(section => (
                                        <ParchmentSection
                                            section={section}
                                            key={section}
                                            style={{ display: 'flex', alignItems: 'center' }}
                                        >
                                            <Section title={section} />
                                        </ParchmentSection>
                                    ))
                                }
                            </Parchment>
                            <div className="parchment-nav row">
                                {
                                    demoSections.map(section => (
                                        <ParchmentButton section={section} key={section}>
                                            {section}
                                        </ParchmentButton>
                                    ))
                                }
                            </div>
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
                </div>
                <Logo />
                <a href={GITHUB_URL}>
                    Visit on GitHub
                    <Github />
                </a>
            </footer>
            <Noise />
        </>
    );
}

export default DemoApp;

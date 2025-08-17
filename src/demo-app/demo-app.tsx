import "./demo-app.css";

import { Noise } from "@alex-fitzgerald/noise";
import { useLayoutEffect, useState } from "react";

import ParchmentButton from "../parchment/components/parchment-button.tsx";
import ParchmentSection from "../parchment/components/parchment-section.tsx";
import Parchment from "../parchment/components/parchment.tsx";
import ParchmentProvider from "../parchment/state/parchment-provider.tsx";
import Logo from "./logo.tsx";
import Github from "./svgs/github.tsx";
import Moon from "./svgs/moon.tsx";
import Magnet from "./svgs/magnet.tsx";
import Waves from "./svgs/waves.tsx";

const GITHUB_URL = "https://github.com/alex-fitzgerald/parchment";

function Section({ title }: { title: string }) {
  return (
    <div className="section">
      <p>{title}</p>
    </div>
  );
}

interface ControlProps {
  snap: boolean;
  toggleSnap: () => void;
  smoothScroll: boolean;
  toggleSmoothScroll: () => void;
}

function Controls({
  snap,
  toggleSnap,
  smoothScroll,
  toggleSmoothScroll,
}: ControlProps) {
  return (
    <div className="controls">
      <div className={`${snap ? "active" : ""} toggle-button-field`}>
        <label htmlFor="toggle-snap" onClick={toggleSnap}>
          Snap to section
        </label>
        <button name="toggle-snap" onClick={toggleSnap}>
          <Magnet />
        </button>
      </div>
      <div className={`${smoothScroll ? "active" : ""} toggle-button-field`}>
        <label htmlFor="toggle-smooth" onClick={toggleSmoothScroll}>
          Smooth scrolling
        </label>
        <button name="toggle-smooth" onClick={toggleSmoothScroll}>
          <Waves />
        </button>
      </div>
    </div>
  );
}

function toggleDarkMode() {
  document.documentElement.classList.toggle("dark-mode");
}

const demoSections = ["First", "Second", "Third", "Fourth", "Etcetera"];

function IntroBlurb() {
  return (
    <div className="blurb">
      <p>Parchment is a simple React library for composing scrollspies.</p>
    </div>
  );
}

function Footer({
  isDarkMode,
  toggleDarkMode,
}: {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}) {
  return (
    <footer>
      <div className="items-container justify-center">
        <div className="footer-child">
          <button
            name="toggle-smooth"
            onClick={toggleDarkMode}
            className={`toggle-button ${isDarkMode ? "active" : ""}`}
          >
            <Moon />
          </button>
        </div>
        <div className="footer-child">
          <Logo />
        </div>
        <div className="footer-child">
          <a href={GITHUB_URL}>
            <Github />
          </a>
        </div>
      </div>
    </footer>
  );
}

function ParchmentSections({
  snap,
  smoothScroll,
}: {
  snap: boolean;
  smoothScroll: boolean;
}) {
  return (
    <Parchment
      snap={snap}
      scrollIntoViewOptions={{ behavior: smoothScroll ? "smooth" : "instant" }}
      className="parchment"
    >
      {demoSections.map((section) => (
        <ParchmentSection
          section={section}
          key={section}
          style={{ display: "flex", alignItems: "center" }}
        >
          <Section title={section} />
        </ParchmentSection>
      ))}
    </Parchment>
  );
}

function ParchmentNav() {
  return (
    <div className="parchment-nav row">
      {demoSections.map((section) => (
        <ParchmentButton section={section} key={section}>
          {section}
        </ParchmentButton>
      ))}
    </div>
  );
}

function DemoApp() {
  const [snap, setSnap] = useState(false);
  const [smoothScroll, setSmoothScroll] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);
  // const [demoSections] = useState();

  useLayoutEffect(() => {
    const prefersDarkMode = window.matchMedia("(prefers-color-scheme: dark)");

    if (prefersDarkMode.matches) {
      setIsDarkMode(true);
      document.documentElement.classList.add("dark-mode");
    }
  }, []);

  const handleToggleDarkMode = () => {
    toggleDarkMode();
    setIsDarkMode((prevDarkMode) => !prevDarkMode);
  };

  return (
    <>
      <h1>Parchment</h1>
      <main>
        <article>
          <div className="demo-wrapper">
            <div className="blurb-panel">
              <IntroBlurb />
              <Controls
                snap={snap}
                toggleSnap={() => setSnap((prevSnap) => !prevSnap)}
                smoothScroll={smoothScroll}
                toggleSmoothScroll={() =>
                  setSmoothScroll((prevSmoothScroll) => !prevSmoothScroll)
                }
              />
            </div>
            <div className="demo-panel">
              <ParchmentProvider>
                <div className="parchment-sections">
                  <div style={{ height: "100%", width: "100%" }}>
                    <ParchmentSections
                      snap={snap}
                      smoothScroll={smoothScroll}
                    />
                  </div>
                </div>
                <ParchmentNav />
              </ParchmentProvider>
            </div>
          </div>
        </article>
      </main>
      <Footer toggleDarkMode={handleToggleDarkMode} isDarkMode={isDarkMode} />
      <Noise />
    </>
  );
}

export default DemoApp;

import React, { useEffect, useLayoutEffect, useState } from "react";
import Lenis from "@studio-freight/lenis";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { Projects } from "./components/Projects";
import { Archives } from "./components/Archives";
import { Travel } from "./components/Travel";
import { Songs } from "./components/Songs";
import { Art } from "./components/Art";
import { Footer } from "./components/Footer";
import { Navbar } from "./components/Navbar";
import { CustomCursor } from "./components/CustomCursor";
import { LoadingScreen } from "./components/LoadingScreen";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Outlet, useLocation } from "react-router";

gsap.registerPlugin(ScrollTrigger);

/**
 * Global "wake-from-sleep" reload state threshold.
 * Forces a hard reload dropping the cache if the tab was suspended 
 * in the background for longer than 5 minutes to securely refresh 
 * dynamic page resources.
 */
const SLEEP_THRESHOLD_MS = 5 * 60 * 1000; // 5 minutes
let _hiddenAt = 0;

function handlePageSleep() {
  if (document.visibilityState === "hidden") {
    _hiddenAt = Date.now();
  } else if (document.visibilityState === "visible" && _hiddenAt > 0) {
    const sleptFor = Date.now() - _hiddenAt;
    if (sleptFor > SLEEP_THRESHOLD_MS) {
      // Clear sesssion so the full loading sequence (7s counter) plays again
      sessionStorage.removeItem("portfolio_visited");
      window.location.reload();
    }
    _hiddenAt = 0;
  }
}

document.addEventListener("visibilitychange", handlePageSleep);

/**
 * Root Application Component
 * 
 * Serves as the master wrapper for the entire SPA architecture.
 * Initializes and binds the `Lenis` smooth scrolling engine tightly against 
 * `GSAP` ticker timelines for high-performance physics-based DOM scrolling.
 * Globally controls manual scroll restoration to forcibly retain strict `[0,0]` 
 * constraints on fresh mounting until the initial LoadingScreen unmounts.
 * 
 * @returns {JSX.Element} The active Layout provider wrapping the Hero, Navbar, and Footer sequences.
 */
export default function Root() {
  const location = useLocation();
  const [prevLocation, setPrevLocation] = useState(location.pathname);

  useLayoutEffect(() => {
    if (prevLocation !== "/" && location.pathname === "/") {
      // Create pitch black overlay BEFORE browser paint to intercept the unmount flawlessly
      const exit = document.createElement("div");
      exit.style.cssText = "position:fixed;inset:0;background:#090909;z-index:999999;opacity:1;transition:opacity 0.65s ease;pointer-events:none;";
      document.body.appendChild(exit);

      // Restore scroll organically
      const savedScroll = sessionStorage.getItem("portfolioScrollY");
      if (savedScroll) {
        const y = parseFloat(savedScroll);
        window.scrollTo(0, y);
        if ((window as any).lenis) (window as any).lenis.scrollTo(y, { immediate: true });
      } else {
        window.scrollTo(0, 0);
        if ((window as any).lenis) (window as any).lenis.scrollTo(0, { immediate: true });
      }

      // Force DOM reflow then fade out perfectly mirroring Navbar exit mechanics explicitly Native
      void exit.offsetWidth;
      requestAnimationFrame(() => { exit.style.opacity = "0"; });
      setTimeout(() => exit.remove(), 650);
    }
    setPrevLocation(location.pathname);
  }, [location.pathname, prevLocation]);

  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth <= 768 : false
  );

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (isMobile) {
      // Artificially trigger all sequence animations because LoadingScreen is purposely bypassed natively.
      const timer = setTimeout(() => {
        window.dispatchEvent(new Event("portfolioReady"));
        window.dispatchEvent(new Event("heroReveal"));
        if ((window as any).lenis) (window as any).lenis.start();
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isMobile]);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.8,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
    });

    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }

    // Check if we're returning from a project detail page
    const savedScroll = sessionStorage.getItem("portfolioScrollY");
    if (savedScroll) {
      // Restore position then let lenis take over — skip the reset to top
      const y = parseFloat(savedScroll);
      sessionStorage.removeItem("portfolioScrollY");
      window.scrollTo(0, y);
      lenis.scrollTo(y, { immediate: true });
      lenis.start();
    } else {
      window.scrollTo(0, 0);
      lenis.scrollTo(0, { immediate: true });
      /** Stop scroll — LoadingScreen restarts it when transition concludes */
      lenis.stop();
    }

    /** Expose lenis globally for Navbar + LoadingScreen programmatic interventions */
    (window as any).lenis = lenis;

    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(lenis.raf);
      delete (window as any).lenis;
    };
  }, []);

  return (
    <div className="w-full overflow-x-hidden bg-[#fffcf3] text-black font-sans">
      {/** 
       * Primary Loading screen strictly mounts over the Z-index index universally stack 
       * and mechanically unmounts itself permanently when transitions conclude.
       */}
      {!isMobile && <LoadingScreen />}
      {!isMobile && <CustomCursor />}
      
      <Navbar />
      <Hero />
      
      {!isMobile && (
        <>
          <About />
          <Projects />
          <Archives />
          <Travel />
          <Songs />
          <Art />
        </>
      )}
      
      <Footer />
      <Outlet />
    </div>
  );
}


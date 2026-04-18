import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

/**
 * Physics-driven slot-machine column component that dynamically spins numbers.
 * Utilizing native CSS `translateY` scaling calculated mapped against array maps to organically 
 * recreate a cinematic rolling mechanical numbers effect tied securely to global states.
 * 
 * @param {number} targetValue - The exact numeric digit this specific column stops at.
 * @param {number} max - The length interval array this column spins through dynamically.
 * @param {number} duration - Easing cubic timeline scale spanning the transition velocity in milliseconds.
 * @param {number} delay - Pre-offset throttle dictating stagger starts on the X-axis for each explicit block.
 */
function SlotColumn({ targetValue, max, duration, delay = 0 }: { targetValue: number; max: number; duration: number; delay?: number }) {
  const arr = Array.from({ length: max + 1 });
  return (
    <div
      style={{
        position: "relative",
        display: "inline-block",
        width: "50px",
        height: "82px",
        overflow: "hidden",
        fontFeatureSettings: '"tnum"',
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          // The CSS handles spinning automatically!
          transform: `translateY(-${targetValue * 82}px)`,
          transition: `transform ${duration}ms cubic-bezier(0.65, 0, 0.35, 1) ${delay}ms`,
          willChange: "transform",
        }}
      >
        {arr.map((_, i) => (
          <div key={i} style={{ height: "82px", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            {i % 10}
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * Master Loading Screen Sequence Controller.
 * 
 * Orchestrates deeply nested asynchronous phase transitions on global mount loops ensuring
 * visual elements enter exactly per predetermined timelines. Tracks `count` target states 
 * securely off the main thread to decouple visual UX sequences from browser tab switching bugs.
 * 
 * Phase Math:
 * -> 0-7000ms: Math slot-machine counter execution.
 * -> 7000ms: Counter array unmounts. Background rect shrinks natively leveraging scale vectors.
 * -> 8300ms: Sequence completion globally signals Lenis to resume processing user-scroll.
 * 
 * @returns {JSX.Element | null} Null strictly if visited prior over session thresholds.
 */
export function LoadingScreen() {
  const [count, setCount] = useState(0);
  const [showUI, setShowUI] = useState(true);
  const [rectScale, setRectScale] = useState(1);
  const [mounted, setMounted] = useState(true);
  const hasRun = useRef(false);

  const isFirstVisit = !sessionStorage.getItem("portfolio_visited");
  const counterDuration = isFirstVisit ? 7000 : 2500;

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;

    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);

    if ((window as any).lenis) (window as any).lenis.stop();
    (window as any).__portfolioLoading = true;

    const runSequence = async () => {
      // ── Phase 1: Counter 000 → 100 via CSS ───────────────────────────────
      await new Promise<void>((r) => setTimeout(r, 60));
      
      // Setting count to 100 explicitly triggers the slot machine's targetValue CSS transition securely
      setCount(100);
      
      // Wait mechanically on the JS clock instead of the rAF visual clock so it ticks in background perfectly!
      await new Promise((r) => setTimeout(r, counterDuration));
      await new Promise((r) => setTimeout(r, 200));

      // Fade out name + counter UI
      setShowUI(false);
      await new Promise((r) => setTimeout(r, 350));

      const isProjectPage = window.location.pathname !== '/';
      
      if (isProjectPage) {
        // Lower rect z-index so ProjectDetail (z-index 50000) can slide over it smoothly
        const rect = document.getElementById("loading-rect");
        if (rect) rect.style.zIndex = "48000";
        
        window.dispatchEvent(new CustomEvent("portfolioReady"));
        
        // Wait safely for ProjectDetail's 2-second slide-up to finish
        await new Promise((r) => setTimeout(r, 2200));
        
        sessionStorage.setItem("portfolio_visited", "true");
        (window as any).__portfolioLoading = false;
        (window as any).__appInitiated = true;
        setMounted(false);
        return;
      }

      // ── Phase 2: Collapse black rect to centre via CSS ───────────────────────────
      setRectScale(0);
      await new Promise((r) => setTimeout(r, 1200));

      // Brief white-screen flash
      await new Promise((r) => setTimeout(r, 80));

      // Signal Hero to start its reveal animations exactly right now
      window.dispatchEvent(new CustomEvent("heroReveal"));

      // ── Done ─────────────────────────────────────────────────────────────
      sessionStorage.setItem("portfolio_visited", "true");
      (window as any).__portfolioLoading = false;
      window.dispatchEvent(new CustomEvent("portfolioReady"));

      await new Promise((r) => setTimeout(r, 100));
      (window as any).__appInitiated = true;
      setMounted(false);
    };

    runSequence().catch(console.error);
  }, []);

  if (!mounted) return null;

  return (
    <>
      {/* ── Black overlay — naturally shrinks via CSS exactly when scale shrinks ── */}
      <div
        id="loading-rect"
        style={{
          position: "fixed",
          inset: 0,
          background: "#0a0a0a",
          zIndex: 999998,
          transformOrigin: "center center",
          transform: `scale(${rectScale})`,
          borderRadius: "0%",
          transition: "transform 1200ms cubic-bezier(0.76, 0, 0.24, 1)",
          pointerEvents: "none",
        }}
      />

      <AnimatePresence>
        {showUI && (
          <motion.div
            key="loading-name"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.5, delay: 0.25 } }}
            exit={{ opacity: 0, transition: { duration: 0.3 } }}
            style={{
              position: "fixed",
              top: 33,
              left: 40,
              zIndex: 999999,
              fontFamily: "'SG Grotesk DEMO', 'Inter Display', sans-serif",
              fontSize: 25,
              fontWeight: 300,
              letterSpacing: "-0.75px",
              color: "#fffcf3",
              pointerEvents: "none",
              userSelect: "none",
            }}
          >
            ragavwithouttheh
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showUI && (
          <motion.div
            key="loading-counter"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.5, delay: 0.25 } }}
            exit={{ opacity: 0, transition: { duration: 0.3 } }}
            style={{
              position: "fixed",
              bottom: 44,
              right: 44,
              zIndex: 999999,
              fontFamily: "'Inter Display', 'Inter', sans-serif",
              fontSize: 80,
              fontWeight: 400,
              letterSpacing: "-4px",
              color: "#fffcf3",
              lineHeight: 1,
              display: "flex",
              alignItems: "center",
              pointerEvents: "none",
              userSelect: "none",
            }}
          >
            <SlotColumn 
              targetValue={count / 100} 
              max={1} 
              duration={count > 0 ? counterDuration / 2 : 0} 
              delay={count > 0 ? counterDuration / 2 : 0} 
            />
            <SlotColumn targetValue={count / 10} max={10} duration={count > 0 ? counterDuration : 0} />
            <SlotColumn targetValue={count} max={100} duration={count > 0 ? counterDuration : 0} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

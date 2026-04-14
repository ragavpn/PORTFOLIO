import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

// ── Slot-machine continuous column ──────────────────────────────────────────
function SlotColumn({ value, max }: { value: number; max: number }) {
  // Rent an array large enough to contain all digits needed for the scroll
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
          // Use exact sub-pixel translation for continuous smooth spin
          transform: `translateY(-${value * 82}px)`,
          // Hardware accelerate
          willChange: "transform",
        }}
      >
        {arr.map((_, i) => (
          <div
            key={i}
            style={{
              height: "82px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0
            }}
          >
            {i % 10}
          </div>
        ))}
      </div>
    </div>
  );
}

// ── LoadingScreen ───────────────────────────────────────────────────────────
export function LoadingScreen() {
  const [count, setCount] = useState(0);
  const [showUI, setShowUI] = useState(true);
  const [mounted, setMounted] = useState(true);
  const overlayRef = useRef<HTMLDivElement>(null);
  const hasRun = useRef(false);

  const isFirstVisit = !sessionStorage.getItem("portfolio_visited");
  const counterDuration = isFirstVisit ? 7000 : 2500;

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;

    // Force top scroll and handle browser restorations
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);

    // Lock lenis if available
    if ((window as any).lenis) (window as any).lenis.stop();
    (window as any).__portfolioLoading = true;

    const start = performance.now();
    const rafIdRef = { id: 0 };

    const easeInOut = (t: number): number =>
      t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

    // Imperative WAAPI animation helper
    const animEl = (
      el: HTMLElement,
      fromStyles: Record<string, string>,
      toStyles: Record<string, string>,
      durationMs: number,
      easing = "cubic-bezier(0.76, 0, 0.24, 1)"
    ): Promise<void> => {
      return new Promise((resolve) => {
        // Apply from styles to inline style first
        for (const [k, v] of Object.entries(fromStyles)) {
          (el.style as any)[k] = v;
        }
        // Give browser one frame to register
        requestAnimationFrame(() => {
          const anim = el.animate(
            [fromStyles as Keyframe, toStyles as Keyframe],
            { duration: durationMs, easing, fill: "none" }
          );
          anim.onfinish = () => {
            // Persist final state to inline style
            for (const [k, v] of Object.entries(toStyles)) {
              (el.style as any)[k] = v;
            }
            resolve();
          };
          anim.oncancel = () => resolve();
        });
      });
    };

    const runSequence = async () => {
      // Small delay to make sure overlay DOM is ready
      await new Promise<void>((r) => setTimeout(r, 60));
      const overlay = overlayRef.current;
      if (!overlay) return;

      // ── Phase 1: Counter 000 → 100 ──────────────────────────────────────
      await new Promise<void>((resolve) => {
        const tick = (now: number) => {
          const elapsed = now - start;
          const prog = Math.min(elapsed / counterDuration, 1);
          // Keep count as float to drive the smooth spin translation
          setCount(easeInOut(prog) * 100);
          if (prog < 1) {
            rafIdRef.id = requestAnimationFrame(tick);
          } else {
            setCount(100);
            resolve();
          }
        };
        rafIdRef.id = requestAnimationFrame(tick);
      });

      // Hold at 100 briefly
      await new Promise((r) => setTimeout(r, 200));

      // Fade out name + counter UI
      setShowUI(false);
      await new Promise((r) => setTimeout(r, 350));

      // ── Phase 2: Collapse black rect to centre ───────────────────────────
      await animEl(
        overlay,
        { transform: "scale(1)", borderRadius: "0%" },
        { transform: "scale(0)", borderRadius: "0%" }, // No corner radius!
        1200 // Slower collapse
      );
      overlay.style.transform = "scale(0)";

      // Brief white-screen flash
      await new Promise((r) => setTimeout(r, 80));

      // Signal Hero to start its reveal animations (Mask expands)
      window.dispatchEvent(new CustomEvent("heroReveal"));

      // ── Done ─────────────────────────────────────────────────────────────
      sessionStorage.setItem("portfolio_visited", "true");
      // Give __portfolioLoading false state to hero via custom event, lenis is started in Hero.tsx
      (window as any).__portfolioLoading = false;
      window.dispatchEvent(new CustomEvent("portfolioReady"));

      // Short buffer then unmount
      await new Promise((r) => setTimeout(r, 100));
      setMounted(false);
    };

    runSequence().catch(console.error);

    return () => {
      cancelAnimationFrame(rafIdRef.id);
    };
  }, []);

  if (!mounted) return null;

  return (
    <>
      {/* ── Black overlay — animates through all phases ── */}
      <div
        ref={overlayRef}
        style={{
          position: "fixed",
          inset: 0,
          background: "#0a0a0a",
          zIndex: 999998,
          transformOrigin: "center center",
          pointerEvents: "none",
        }}
      />

      {/* ── "ragavwithouttheh" — top left ── */}
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

      {/* ── Counter — bottom right ── */}
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
            <SlotColumn value={count / 100} max={1} />
            <SlotColumn value={count / 10} max={10} />
            <SlotColumn value={count} max={100} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

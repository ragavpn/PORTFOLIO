import React, { useEffect, useRef, useState } from "react";
/**
 * High-performance Custom Pointer Tracking overlay.
 * 
 * Hijacks the native OS pointer and aggressively tracks mouse coordinates using 
 * explicit HTML5 `requestAnimationFrame` loops completely decoupled from React state rendering locks.
 * Manages contextual intersection checking (e.g. `data-cursor="hidden"`) globally to 
 * swap out physical reticles specifically based exactly on which visual elements reside below the pointer.
 * 
 * @returns {JSX.Element} The absolutely positioned global DOM pointer overlay components.
 */
export function CustomCursor() {
  const circleRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const circleCursor = useRef({ x: 0, y: 0 });
  const dotCursor = useRef({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [isCursorHidden, setIsCursorHidden] = useState(false);
  const [cursorMode, setCursorMode] = useState("SCROLL");
  // While the loading screen is active, suppress the SCROLL text ring
  const [isLoading, setIsLoading] = useState(true);

  /**
   * Suspend interactive elements universally while global LoadingScreen executes.
   * Listens directly to dispatched `portfolioReady` events fired by initial mounts 
   * to immediately unhide custom pointer visuals.
   */
  useEffect(() => {
    const onReady = () => setIsLoading(false);
    window.addEventListener("portfolioReady", onReady);
    // If loading screen already finished (e.g. HMR), check flag
    if (!(window as any).__portfolioLoading && !sessionStorage.getItem("portfolio_visited") === false) {
      // On very first load this won't trigger early — that's fine
    }
    return () => window.removeEventListener("portfolioReady", onReady);
  }, []);

  useEffect(() => {
    // Hide default cursor globally
    document.body.style.cursor = "none";
    const interactables = document.querySelectorAll(
      "a, button, input, select, textarea"
    );
    interactables.forEach((el) => {
      (el as HTMLElement).style.cursor = "none";
    });

    const onMouseMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
      if (!isVisible) setIsVisible(true);

      // Check if cursor is inside the Art image trail zone
      const artZone = document.getElementById("art-trail-zone");
      if (artZone) {
        const rect = artZone.getBoundingClientRect();
        const relY = e.clientY - rect.top;
        const scale = rect.height / 3700;
        const trailHeight = 900 * scale;
        if (
          relY >= 0 &&
          relY <= trailHeight &&
          e.clientX >= rect.left &&
          e.clientX <= rect.right
        ) {
          setIsCursorHidden(true);
          setCursorMode("HIDDEN");
          return;
        }
      }

      const target = e.target as HTMLElement;
      const cursorTarget = target.closest(
        "[data-cursor], a, button, [role='button']"
      );

      if (!cursorTarget) {
        setIsCursorHidden(false);
        setCursorMode("SCROLL");
        return;
      }

      const attr = cursorTarget.getAttribute("data-cursor");

      if (attr === "hidden") {
        setIsCursorHidden(true);
        setCursorMode("HIDDEN");
        return;
      }

      setIsCursorHidden(false);

      if (attr === "hero-title") {
        setCursorMode("HERO_TITLE");
      } else if (attr === "dot-only") {
        setCursorMode("DOT_ONLY");
      } else if (attr === "drag") {
        setCursorMode("DRAG");
      } else if (attr === "play") {
        setCursorMode("PLAY");
      } else if (attr === "pause") {
        setCursorMode("PAUSE");
      } else if (
        cursorTarget.tagName.toLowerCase() === "a" ||
        cursorTarget.tagName.toLowerCase() === "button" ||
        attr === "click"
      ) {
        setCursorMode("CLICK");
      } else {
        setCursorMode("SCROLL");
      }
    };

    window.addEventListener("mousemove", onMouseMove);

    let rafId: number;
    const update = () => {
      dotCursor.current.x += (mouse.current.x - dotCursor.current.x) * 0.8;
      dotCursor.current.y += (mouse.current.y - dotCursor.current.y) * 0.8;

      // For hero-title mode, slow the ring lerp way down so the big circle trails dreamily
      const ringLerp = cursorMode === "HERO_TITLE" ? 0.04 : 0.055;
      circleCursor.current.x +=
        (mouse.current.x - circleCursor.current.x) * ringLerp;
      circleCursor.current.y +=
        (mouse.current.y - circleCursor.current.y) * ringLerp;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${dotCursor.current.x}px, ${dotCursor.current.y}px, 0)`;
      }
      if (circleRef.current) {
        circleRef.current.style.transform = `translate3d(${circleCursor.current.x}px, ${circleCursor.current.y}px, 0)`;
      }

      rafId = requestAnimationFrame(update);
    };

    update();

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(rafId);
      document.body.style.cursor = "auto";
    };
  }, [isVisible, cursorMode]);

  const renderTextPaths = () => {
    switch (cursorMode) {
      case "PLAY":
        return (
          <>
            <textPath href="#circleTextPath" startOffset="0%">
              PLAY
            </textPath>
            <textPath href="#circleTextPath" startOffset="33.3%">
              PLAY
            </textPath>
            <textPath href="#circleTextPath" startOffset="66.6%">
              PLAY
            </textPath>
          </>
        );
      case "PAUSE":
        return (
          <>
            <textPath href="#circleTextPath" startOffset="0%">
              PAUSE
            </textPath>
            <textPath href="#circleTextPath" startOffset="50%">
              PAUSE
            </textPath>
          </>
        );
      default:
        return (
          <>
            <textPath href="#circleTextPath" startOffset="0%">
              {cursorMode}
            </textPath>
            <textPath href="#circleTextPath" startOffset="50%">
              {cursorMode}
            </textPath>
          </>
        );
    }
  };

  // ── Derived sizing for hero-title mode ─────────────────────────────────
  const isHeroTitle = cursorMode === "HERO_TITLE";
  const dotSize = isHeroTitle ? 200 : 5;
  const dotOffset = dotSize / 2;

  // Ring: hidden during loading, hidden in hero-title mode, shown otherwise
  const ringVisible =
    !isLoading &&
    isVisible &&
    !isCursorHidden &&
    cursorMode !== "DOT_ONLY" &&
    !isHeroTitle;

  return (
    <>
      <style>{`
        @keyframes spinCursor {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        * { cursor: none !important; }
      `}</style>

      {/* ── THE SNAPPY ANCHOR DOT — grows to 200px in hero-title mode ── */}
      <div
        ref={dotRef}
        className={`fixed top-0 left-0 pointer-events-none z-[99999] mix-blend-difference`}
        style={{
          width: `${dotSize}px`,
          height: `${dotSize}px`,
          marginTop: `-${dotOffset}px`,
          marginLeft: `-${dotOffset}px`,
          transition:
            "width 0.45s cubic-bezier(0.34,1.56,0.64,1), height 0.45s cubic-bezier(0.34,1.56,0.64,1), margin 0.45s cubic-bezier(0.34,1.56,0.64,1)",
        }}
      >
        <div
          className={`w-full h-full bg-white rounded-full transition-opacity duration-300 ${
            isVisible && !isCursorHidden ? "opacity-100" : "opacity-0"
          }`}
        />
      </div>

      {/* ── THE LAGGING SPINNING RING — fades in after loading, off in hero-title ── */}
      <div
        ref={circleRef}
        className="fixed top-0 left-0 pointer-events-none z-[99998] mix-blend-difference"
        style={{
          width: "100px",
          height: "100px",
          marginTop: "-50px",
          marginLeft: "-50px",
        }}
      >
        <div
          className={`w-full h-full transition-all duration-500 ${
            ringVisible ? "opacity-100 scale-100" : "opacity-0 scale-50"
          }`}
        >
          <div
            style={{
              width: "100%",
              height: "100%",
              animation: "spinCursor 9s linear infinite",
            }}
          >
            <svg viewBox="0 0 100 100" className="w-full h-full text-white">
              <defs>
                <path
                  id="circleTextPath"
                  d="M 50, 50 m -24, 0 a 24,24 0 1,1 48,0 a 24,24 0 1,1 -48,0"
                />
              </defs>
              <text
                fontSize="13.5"
                fontWeight="800"
                letterSpacing="3"
                fill="currentColor"
                className="font-['Space_Grotesk',sans-serif] uppercase"
              >
                {renderTextPaths()}
              </text>
            </svg>
          </div>
        </div>
      </div>
    </>
  );
}

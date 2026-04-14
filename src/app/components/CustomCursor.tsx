import React, { useEffect, useRef, useState } from "react";

export function CustomCursor() {
  const circleRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const circleCursor = useRef({ x: 0, y: 0 });
  const dotCursor = useRef({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [isCursorHidden, setIsCursorHidden] = useState(false);
  const [cursorMode, setCursorMode] = useState("SCROLL");

  useEffect(() => {
    // Hide default cursor globally
    document.body.style.cursor = 'none';
    const interactables = document.querySelectorAll('a, button, input, select, textarea');
    interactables.forEach((el) => {
      (el as HTMLElement).style.cursor = 'none';
    });

    const onMouseMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
      if (!isVisible) setIsVisible(true);

      // Check if cursor is inside the Art image trail zone (top ~24.3% of the art section)
      const artZone = document.getElementById('art-trail-zone');
      if (artZone) {
        const rect = artZone.getBoundingClientRect();
        const relY = e.clientY - rect.top;
        // Trail spawns within first 900px of the 3700px unscaled container, scaled
        const scale = rect.height / 3700;
        const trailHeight = 900 * scale;
        if (relY >= 0 && relY <= trailHeight && e.clientX >= rect.left && e.clientX <= rect.right) {
          setIsCursorHidden(true);
          setCursorMode("HIDDEN");
          return;
        }
      }

      const target = e.target as HTMLElement;
      
      const cursorTarget = target.closest('[data-cursor], a, button, [role="button"]');
      
      if (!cursorTarget) {
        setIsCursorHidden(false);
        setCursorMode("SCROLL");
        return;
      }

      const attr = cursorTarget.getAttribute('data-cursor');

      if (attr === 'hidden') {
        setIsCursorHidden(true);
        setCursorMode("HIDDEN");
        return;
      }

      setIsCursorHidden(false);

      if (attr === 'dot-only') {
        setCursorMode("DOT_ONLY");
      } else if (attr === 'drag') {
        setCursorMode("DRAG");
      } else if (attr === 'play') {
        setCursorMode("PLAY");
      } else if (attr === 'pause') {
        setCursorMode("PAUSE");
      } else if (cursorTarget.tagName.toLowerCase() === 'a' || cursorTarget.tagName.toLowerCase() === 'button' || attr === 'click') {
        setCursorMode("CLICK");
      } else {
        setCursorMode("SCROLL");
      }
    };

    window.addEventListener("mousemove", onMouseMove);

    let rafId: number;
    const update = () => {
      // The tiny central dot stays snappy to the mouse (slight organic lerp to anti-alias)
      dotCursor.current.x += (mouse.current.x - dotCursor.current.x) * 0.8;
      dotCursor.current.y += (mouse.current.y - dotCursor.current.y) * 0.8;

      // The large text circle massively lags smoothly behind (halved for MORE inertia)
      circleCursor.current.x += (mouse.current.x - circleCursor.current.x) * 0.055;
      circleCursor.current.y += (mouse.current.y - circleCursor.current.y) * 0.055;

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
      document.body.style.cursor = 'auto';
    };
  }, [isVisible]);

  const renderTextPaths = () => {
    switch (cursorMode) {
      case "PLAY":
        return (
          <>
            <textPath href="#circleTextPath" startOffset="0%">PLAY</textPath>
            <textPath href="#circleTextPath" startOffset="33.3%">PLAY</textPath>
            <textPath href="#circleTextPath" startOffset="66.6%">PLAY</textPath>
          </>
        );
      case "PAUSE":
        return (
          <>
            <textPath href="#circleTextPath" startOffset="0%">PAUSE</textPath>
            <textPath href="#circleTextPath" startOffset="50%">PAUSE</textPath>
          </>
        );
      default:
        return (
          <>
            <textPath href="#circleTextPath" startOffset="0%">{cursorMode}</textPath>
            <textPath href="#circleTextPath" startOffset="50%">{cursorMode}</textPath>
          </>
        );
    }
  };

  return (
    <>
      <style>{`
        @keyframes spinCursor {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        /* Ensure standard cursors are hidden when hovering over things */
        * { cursor: none !important; }
      `}</style>
      
      {/* THE SNAPPY ANCHOR DOT */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 pointer-events-none z-[99999] mix-blend-difference"
        style={{
          width: '5px',
          height: '5px',
          marginTop: '-2.5px',
          marginLeft: '-2.5px',
        }}
      >
        <div 
          className={`w-full h-full bg-white rounded-full transition-all duration-300 ${isVisible && !isCursorHidden ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}
        />
      </div>

      {/* THE LAGGING SPINNING RING */}
      <div
        ref={circleRef}
        className="fixed top-0 left-0 pointer-events-none z-[99998] mix-blend-difference"
        style={{
          width: '100px',
          height: '100px',
          marginTop: '-50px',
          marginLeft: '-50px',
        }}
      >
        <div className={`w-full h-full transition-all duration-300 ${isVisible && !isCursorHidden && cursorMode !== "DOT_ONLY" ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}>
          <div style={{ width: '100%', height: '100%', animation: 'spinCursor 9s linear infinite' }}>
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
                className="font-['Space_Grotesk',sans-serif] uppercase transition-all duration-300"
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

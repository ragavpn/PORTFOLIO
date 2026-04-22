import React, { useState, useEffect } from "react";
import imgGeminiGeneratedImageBnf70Cbnf70Cbnf71 from "../../assets/a6fe2b506a0a432a9e17a0ef38b5ca4b3fa14f15.png";
import svgPaths from "../../imports/svg-hsdg76jmon";
/**
 * Core Application Hero Section.
 * 
 * Functions as the absolute landing viewpoint for the application.
 * Architecturally decoupled from initial React mounts globally masking itself via CSS 
 * transitions until the abstract `heroReveal` trigger is fired by the separate `LoadingScreen` engine. 
 * Orchestrates programmatic Lenis `start()` overrides once staggered layout paints complete.
 * 
 * @returns {JSX.Element} Fully declarative section spanning exact viewport boundaries.
 */
export function Hero() {
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const onReveal = () => {
      setRevealed(true);
      /**
       * Delay Lenis engine unlock strictly matching CSS stagger sequences statically.
       * (1200ms mask calculation + ~1000ms explicit image/text stagger translation)
       */
      setTimeout(() => {
        if ((window as any).lenis) (window as any).lenis.start();
      }, 2500);
    };
    window.addEventListener("heroReveal", onReveal);

    /** 
     * Safe-fallback hook manually overriding physics locks natively if 
     * Hot-Module Replacement explicitly skips abstract mounting sequences in Dev environments.
     */
    const onReady = () => setRevealed(true);
    window.addEventListener("portfolioReady", onReady);

    /** Terminal safety net arbitrarily snapping components visible linearly over 13s if UI threads block. */
    const fallback = setTimeout(() => setRevealed(true), 13000);

    return () => {
      window.removeEventListener("heroReveal", onReveal);
      window.removeEventListener("portfolioReady", onReady);
      clearTimeout(fallback);
    };
  }, []);

  const baseTransition = "transition-[opacity,transform]";

  return (
    <section
      id="hero-section"
      className="min-h-screen relative w-full bg-[#fffcf3] z-20 flex items-center justify-center"
    >
      <div className="relative flex flex-col items-center justify-center text-center z-10 w-full px-4 pt-20">

        {/* ── "Hi, I'm Ragav" title SVG (Desktop: mask reveal) ── */}
        <div
          className={`hidden md:block w-[70vw] max-w-[1100px] mx-auto ${baseTransition}`}
          data-name="Hi, I'm Ragav"
          data-cursor="hero-title"
          style={{
            clipPath: revealed ? "inset(0% 0% 0% 0%)" : "inset(50% 50% 50% 50%)",
            transition: "clip-path 1200ms cubic-bezier(0.76, 0, 0.24, 1)",
          }}
        >
          <svg
            className="block w-full h-auto mx-[-6px] my-[-10px]"
            fill="none"
            preserveAspectRatio="xMidYMid meet"
            viewBox="0 0 1189.46 310.012"
          >
            <path d={svgPaths.p197bf980} fill="#090909" />
            <path d={svgPaths.p39f16080} fill="#090909" />
            <path d={svgPaths.p1c08f280} fill="#090909" />
            <path d={svgPaths.p1e20ca00} fill="#090909" />
            <path d={svgPaths.p37f39db0} fill="#090909" />
            <path d={svgPaths.p32a45080} fill="#090909" />
            <path d={svgPaths.p2c62f780} fill="#090909" />
            <path d={svgPaths.p327ecd00} fill="#090909" />
            <path d={svgPaths.p9226380} fill="#090909" />
            <path d={svgPaths.p38810600} fill="#090909" />
            <path d={svgPaths.p32390800} fill="#090909" />
          </svg>
        </div>

        {/* ── Hero image (Mobile: in-flow, stands on top of title) ── */}
        <div
          className={`block md:hidden mx-auto w-[25vw] max-w-[120px] overflow-hidden rounded-xl z-30 mb-[-5vw] relative ${baseTransition}`}
          data-name="Hero Image Mobile"
          style={{
            opacity: revealed ? 1 : 0,
            transform: revealed ? "translateY(0px)" : "translateY(40px)",
            transitionDuration: "1000ms",
            transitionTimingFunction: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
            transitionDelay: revealed ? "500ms" : "0ms",
          }}
        >
          <img
            alt="Hero Graphic"
            className="w-full h-auto object-cover pointer-events-none"
            src={imgGeminiGeneratedImageBnf70Cbnf70Cbnf71}
          />
        </div>

        {/* ── "Hi, I'm Ragav" title SVG (Mobile: float-in, no mask) ── */}
        <div
          className={`block md:hidden w-[85vw] mx-auto ${baseTransition}`}
          data-name="Hi, I'm Ragav"
          style={{
            opacity: revealed ? 1 : 0,
            transform: revealed ? "translateY(0px)" : "translateY(50px)",
            transitionDuration: "1000ms",
            transitionTimingFunction: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
            transitionDelay: revealed ? "200ms" : "0ms",
          }}
        >
          <svg
            className="block w-full h-auto mx-[-6px] my-[-10px]"
            fill="none"
            preserveAspectRatio="xMidYMid meet"
            viewBox="0 0 1189.46 310.012"
          >
            <path d={svgPaths.p197bf980} fill="#090909" />
            <path d={svgPaths.p39f16080} fill="#090909" />
            <path d={svgPaths.p1c08f280} fill="#090909" />
            <path d={svgPaths.p1e20ca00} fill="#090909" />
            <path d={svgPaths.p37f39db0} fill="#090909" />
            <path d={svgPaths.p32a45080} fill="#090909" />
            <path d={svgPaths.p2c62f780} fill="#090909" />
            <path d={svgPaths.p327ecd00} fill="#090909" />
            <path d={svgPaths.p9226380} fill="#090909" />
            <path d={svgPaths.p38810600} fill="#090909" />
            <path d={svgPaths.p32390800} fill="#090909" />
          </svg>
        </div>

        {/* ── Sub-text (Desktop) ── */}
        <div
          className={`hidden md:flex flex-col font-sans items-center justify-center text-[#090909] tracking-[-0.02em] font-light uppercase whitespace-nowrap z-20 mx-[0px] my-[5px] ${baseTransition}`}
          style={{
            opacity: revealed ? 1 : 0,
            transform: revealed ? "translateY(0px)" : "translateY(50px)",
            transitionDuration: "1000ms",
            transitionTimingFunction: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
            transitionDelay: revealed ? "800ms" : "0ms",
          }}
        >
          <p className="font-['Inter',sans-serif] font-normal m-[0px] text-[clamp(24px,3vw,44px)] tracking-[-0.05em]">
            Creative Developer living in Bangalore,
          </p>
          <p className="font-['Inter',sans-serif] font-normal text-[clamp(24px,3vw,44px)] mx-[0px] mt-[-15px] mb-[-15px] tracking-[-0.05em]">
            Freelancer, and working @ CAPITAL ONE
          </p>
        </div>

        {/* ── Sub-text (Mobile Fallback) ── */}
        <div
          className={`flex md:hidden flex-col font-sans items-center text-center justify-center text-[#090909] uppercase z-20 mt-[16px] max-w-[80vw] ${baseTransition}`}
          style={{
            opacity: revealed ? 1 : 0,
            transform: revealed ? "translateY(0px)" : "translateY(50px)",
            transitionDuration: "1000ms",
            transitionTimingFunction: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
            transitionDelay: revealed ? "800ms" : "0ms",
          }}
        >
          <p className="font-['Inter',sans-serif] text-[14px] font-semibold leading-snug tracking-[-0.3px]">
            Load my profile in desktop version to view everything... But you can contact me below
          </p>
        </div>
      </div>

      {/* ── Hero image (Desktop: absolute positioned) ── */}
      <div
        className={`hidden md:block absolute right-[2%] xl:right-[5%] top-[30%] w-[clamp(100px,25vw,360px)] z-30 overflow-hidden rounded-2xl ${baseTransition}`}
        data-name="Hero Image"
        style={{
          opacity: revealed ? 1 : 0,
          transform: revealed ? "translate(15px, 60px) rotate(0deg)" : "translate(15px, 150px) rotate(0deg)",
          transitionDuration: "1000ms",
          transitionTimingFunction: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
          transitionDelay: revealed ? "1100ms" : "0ms",
        }}
      >
        <img
          alt="Hero Graphic"
          className="w-[90%] h-auto object-cover pointer-events-none"
          src={imgGeminiGeneratedImageBnf70Cbnf70Cbnf71}
        />
      </div>
    </section>

  );
}

import React, { useState, useEffect } from "react";
import imgGeminiGeneratedImageBnf70Cbnf70Cbnf71 from "../../assets/a6fe2b506a0a432a9e17a0ef38b5ca4b3fa14f15.png";
import svgPaths from "../../imports/svg-hsdg76jmon";

export function Hero() {
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const onReveal = () => {
      setRevealed(true);
      // Wait for all home page animations to finish before re-enabling scroll
      // 1200ms mask + ~1000ms for text/image stagger
      setTimeout(() => {
        if ((window as any).lenis) (window as any).lenis.start();
      }, 2500);
    };
    window.addEventListener("heroReveal", onReveal);

    // Fallback: if portfolioReady fires without heroReveal (shouldn't happen),
    // still reveal. Also handle dev HMR where loading might already be done.
    const onReady = () => setRevealed(true);
    window.addEventListener("portfolioReady", onReady);

    // Safety net: reveal after 8s no matter what
    const fallback = setTimeout(() => setRevealed(true), 8000);

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

        {/* â”€â”€ "Hi, I'm Ragav" title SVG â”€â”€ */}
        <div
          className={`w-[80vw] md:w-[70vw] max-w-[1100px] mx-auto ${baseTransition}`}
          data-name="Hi, I'm Ragav"
          data-cursor="hero-title"
          style={{
            // Rectangular mask expanding from center - slowed down
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

        {/* â”€â”€ Sub-text â”€â”€ */}
        <div
          className={`flex flex-col font-sans items-center justify-center text-[#090909] tracking-[-0.02em] font-light uppercase whitespace-nowrap z-20 mx-[0px] my-[5px] ${baseTransition}`}
          style={{
            opacity: revealed ? 1 : 0,
            transform: revealed ? "translateY(0px)" : "translateY(50px)",
            transitionDuration: "1000ms",
            transitionTimingFunction: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
            transitionDelay: revealed ? "800ms" : "0ms",
          }}
        >
          <p className="font-['Inter',sans-serif] m-[0px] text-[44px] tracking-[-3px]">
            I'm a Software Engineer currently working
          </p>
          <p className="font-['Inter',sans-serif] text-[44px] mx-[0px] my-[-15px] tracking-[-3px]">
            @ CAPITAL ONE IN BLR
          </p>
        </div>
      </div>

      {/* â”€â”€ Hero image â”€â”€ */}
      <div
        className={`absolute right-[-5%] md:right-[5%] top-[25%] md:top-[30%] w-[42vw] md:w-[30vw] max-w-[360px] z-30 overflow-hidden rounded-2xl ${baseTransition}`}
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

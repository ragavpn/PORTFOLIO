import React, { useLayoutEffect, useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const polaroids = [
  { id: 1, title: "Pondicherry", date: "22.03.2026", rotate: -2.11, zIndex: 10, img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmF2ZWwlMjBiZWFjaHxlbnwxfHx8fDE3NzU5MDAyNjN8MA&ixlib=rb-4.1.0&q=80&w=1080" },
  { id: 2, title: "Varkala", date: "15.06.2025", rotate: -0.43, zIndex: 20, img: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmF2ZWwlMjBsYW5kc2NhcGV8ZW58MXx8fHwxNzc1OTAwMjYzfDA&ixlib=rb-4.1.0&q=80&w=1080" },
  { id: 3, title: "Goa", date: "10.12.2024", rotate: -1.84, zIndex: 30, img: "https://images.unsplash.com/photo-1589840221511-ba87a0d793e9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmF2ZWwlMjBhcmNoaXRlY3R1cmV8ZW58MXx8fHwxNzc1OTAwMjYzfDA&ixlib=rb-4.1.0&q=80&w=1080" },
  { id: 4, title: "Kochi", date: "04.01.2024", rotate: -3.00, zIndex: 40, img: "https://images.unsplash.com/photo-1612374159088-53b4c44f5e0b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmF2ZWwlMjBzdHJlZXR8ZW58MXx8fHwxNzc1OTAwMjYzfDA&ixlib=rb-4.1.0&q=80&w=1080" },
  { id: 5, title: "Munnar", date: "18.08.2023", rotate: 1.26, zIndex: 50, img: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmF2ZWwlMjBuYXR1cmV8ZW58MXx8fHwxNzc1OTAwMjYzfDA&ixlib=rb-4.1.0&q=80&w=1080" },
];

// Left text content (typed first)
const LEFT_TEXT  = "Growing up in the UAE\nto doing my bachelors\nin South India..";
// Right text (typed after left is done)
const RIGHT_TEXT = "...travelling has felt\nmore like home than\nany house i've lived in.";

// Typing speed in ms per character
const CHAR_MS = 55;

export function Travel() {
  const containerRef  = useRef<HTMLDivElement>(null);
  const triggerRef    = useRef<HTMLDivElement>(null);
  const polaroidRefs  = useRef<(HTMLDivElement | null)[]>([]);
  const [scale, setScale] = useState(1);

  // ── Typing state ──────────────────────────────────────────────────────────
  const [leftTyped,  setLeftTyped]  = useState("");
  const [rightTyped, setRightTyped] = useState("");
  const typingStarted = useRef(false);

  // ── Mouse parallax state ──────────────────────────────────────────────────
  // Store current and target X/Y offsets per polaroid (inertia system)
  const mouse = useRef({ x: 0, y: 0 });
  const offsets = useRef(polaroids.map(() => ({ x: 0, y: 0 })));
  const rafParallax = useRef<number>(0);

  // ── Scale to viewport ─────────────────────────────────────────────────────
  useEffect(() => {
    const updateScale = () => {
      const s = Math.min(window.innerWidth / 1920, window.innerHeight / 1080);
      setScale(s);
    };
    updateScale();
    window.addEventListener("resize", updateScale);
    return () => window.removeEventListener("resize", updateScale);
  }, []);

  // ── Typing animation — starts when section is 70% into viewport ───────────
  useEffect(() => {
    const section = containerRef.current;
    if (!section) return;

    const startTyping = () => {
      if (typingStarted.current) return;
      typingStarted.current = true;

      const allChars = LEFT_TEXT.split("");
      let i = 0;
      const typeLeft = () => {
        if (i < allChars.length) {
          setLeftTyped(LEFT_TEXT.slice(0, i + 1));
          i++;
          setTimeout(typeLeft, CHAR_MS);
        } else {
          // Left done → start right
          const rightChars = RIGHT_TEXT.split("");
          let j = 0;
          const typeRight = () => {
            if (j < rightChars.length) {
              setRightTyped(RIGHT_TEXT.slice(0, j + 1));
              j++;
              setTimeout(typeRight, CHAR_MS);
            }
          };
          setTimeout(typeRight, 200); // small pause between sides
        }
      };
      setTimeout(typeLeft, 300);
    };

    // Trigger when section top crosses 70% down the viewport
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          startTyping();
          obs.disconnect();
        }
      },
      { threshold: 0, rootMargin: "-30% 0px -0% 0px" } // fires when 70% down = top edge at 30% from viewport top
    );
    obs.observe(section);
    return () => obs.disconnect();
  }, []);

  // ── Mouse parallax with cascading inertia ─────────────────────────────────
  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth  - 0.5) * 2; // -1 to 1
      mouse.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", handleMouse);

    // Each polaroid has a slightly different lerp speed to create the cascade
    const lerpSpeeds = [0.07, 0.055, 0.042, 0.032, 0.025];
    // Max displacement in "canvas px" (will be scaled by scale factor)
    const maxDisplace = 18;

    const loop = () => {
      polaroids.forEach((_, i) => {
        const targetX = mouse.current.x * maxDisplace;
        const targetY = mouse.current.y * maxDisplace * 0.5;
        offsets.current[i].x += (targetX - offsets.current[i].x) * lerpSpeeds[i];
        offsets.current[i].y += (targetY - offsets.current[i].y) * lerpSpeeds[i];

        const el = polaroidRefs.current[i];
        if (el) {
          el.style.transform = `translate(${offsets.current[i].x}px, ${offsets.current[i].y}px)`;
        }
      });
      rafParallax.current = requestAnimationFrame(loop);
    };
    loop();

    return () => {
      window.removeEventListener("mousemove", handleMouse);
      cancelAnimationFrame(rafParallax.current);
    };
  }, []);

  // ── GSAP scroll-driven polaroid stacking ──────────────────────────────────
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray(".polaroid-card") as HTMLElement[];

      if (cards.length > 0) {
        cards.forEach((card) => {
          const rot = parseFloat(card.dataset.rotation || "0");
          gsap.set(card, { rotate: rot });
        });

        // Hide all but the first polaroid out of frame
        gsap.set(cards.slice(1), { y: "150%", scale: 0.8 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: triggerRef.current,
            start: "top top",
            end: "+=4000",
            scrub: true,
            pin: true,
          },
        });

        cards.slice(1).forEach((card, index) => {
          tl.to(card, {
            y: `${(index + 1) * 35}px`,
            scale: 1,
            duration: 1,
            ease: "power2.out",
          }, index === 0 ? undefined : "-=0.6");
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Helper: render text with newlines
  const renderTyped = (text: string) =>
    text.split("\n").map((line, i, arr) => (
      <React.Fragment key={i}>
        {line}
        {i < arr.length - 1 && <br />}
      </React.Fragment>
    ));

  return (
    <section id="journal-section" ref={containerRef} className="bg-[#fffcf3] relative w-full" data-name="Travel">
      <div ref={triggerRef} className="w-full h-screen relative">

        {/* Exact 1920×1080 Canvas */}
        <div
          className="absolute left-1/2 top-1/2 w-[1920px] h-[1080px] origin-center"
          style={{ transform: `translate(-50%, -50%) scale(${scale})` }}
        >

          {/* Title */}
          <p className="absolute font-['Instrument_Serif',serif] leading-[0.639] left-1/2 -translate-x-1/2 not-italic text-[191px] text-black text-center top-[154px] tracking-[-5.73px] whitespace-nowrap z-0">
            My Travel Snapshots
          </p>

          {/* Typed Side Texts */}
          <div className="absolute flex justify-between items-start left-[53px] top-[519px] w-[1812px] font-['Just_Another_Hand',cursive] text-[77px] leading-[0.85] text-black opacity-50 z-0">
            <p className="w-[402px] text-left" style={{ minHeight: "3em" }}>
              {renderTyped(leftTyped)}
              {/* blinking caret only while left is still typing */}
              {leftTyped.length < LEFT_TEXT.length && (
                <span className="inline-block w-[3px] h-[0.8em] bg-black ml-1 align-middle animate-pulse" />
              )}
            </p>
            <p className="w-[402px] text-right" style={{ minHeight: "3em" }}>
              {renderTyped(rightTyped)}
              {rightTyped.length > 0 && rightTyped.length < RIGHT_TEXT.length && (
                <span className="inline-block w-[3px] h-[0.8em] bg-black ml-1 align-middle animate-pulse" />
              )}
            </p>
          </div>

          {/* Polaroids */}
          <div className="absolute left-1/2 -translate-x-1/2 top-[280px] w-[849.72px] h-[529.41px] z-10">
            {polaroids.map((p, i) => (
              // Outer: GSAP owns this (rotation + y entrance)
              <div
                key={p.id}
                className="polaroid-card absolute inset-0"
                data-rotation={p.rotate}
                style={{ zIndex: p.zIndex }}
              >
                {/* Inner: parallax RAF owns this (translate x/y only) */}
                <div
                  ref={(el) => (polaroidRefs.current[i] = el)}
                  className="absolute inset-0 bg-[#fcf6e6] rounded-[13.84px] shadow-[0px_5px_36.9px_18.45px_rgba(0,0,0,0.18)] flex justify-center items-center overflow-clip"
                  style={{ willChange: "transform" }}
                >
                  <div className="absolute left-[30.1px] top-[27.4px] w-[789.75px] h-[480px] flex flex-col gap-[28.6px]">
                    <div className="bg-black w-full h-[400.41px] rounded-[9.23px] shrink-0 overflow-hidden relative">
                      <img src={p.img} alt={p.title} className="absolute inset-0 w-full h-full object-cover pointer-events-none" />
                    </div>
                    <div className="flex font-['Inter',sans-serif] items-center justify-between leading-[normal] text-black w-full whitespace-nowrap">
                      <p className="text-[36.9px] tracking-[-2.21px] font-normal">{p.title}</p>
                      <p className="text-[32.3px] tracking-[-0.65px] font-normal">{p.date}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}

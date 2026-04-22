import React, { useLayoutEffect, useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Dynamic File System Import Engine.
 * 
 * Bypasses explicit static imports by dynamically mapping all polaroid image/video properties locally.
 * Forces automated regex ingestion mapped specifically around file notation (e.g., `Title - DD.MM.YYYY`).
 * Generates highly controlled, stable, pseudorandom spatial properties (rotation, xDev offsets) 
 * anchored explicitly via filename string hashes universally preventing layout hydration tracking jitter.
 */
const importParams = import.meta.glob('../../polaroids/*.(jpg|jpeg|png|mp4|heic)', { eager: true, query: '?url', import: 'default' });

interface ParsedPolaroid {
  id: string;
  title: string;
  date: string; // DD/MM/YYYY
  dateObj: Date; // For sorting
  isVideo: boolean;
  src: string;
  rotate: number; // organic random
  xDev: number; // organic random
  zIndex: number;
}

const rawPolaroids: ParsedPolaroid[] = [];

for (const [path, url] of Object.entries(importParams)) {
  const filename = path.split('/').pop() || '';
  if (filename.includes('-poster')) continue;

  const match = filename.match(/^(.*?)\s*-\s*(\d{1,2})\.(\d{1,2})\.(\d{2,4})\.(jpg|jpeg|png|mp4|heic)$/i);
  
  let title = "Unknown";
  let dateStr = "00/00/0000";
  let dateObj = new Date(0);
  
  if (match) {
    title = match[1].trim();
    const day = match[2].padStart(2, '0');
    const month = match[3].padStart(2, '0');
    const yearRaw = match[4];
    const year = yearRaw.length === 2 ? `20${yearRaw}` : yearRaw;
    dateStr = `${day}.${month}.${year}`;
    dateObj = new Date(`${year}-${month}-${day}`);
  } else {
    title = filename.replace(/\.[^/.]+$/, ""); // fallback
  }

  // Generate slightly random rotations (-3 to +3) and x displacement (-12 to 12)
  // seeded strictly by filename string to prevent jitter on re-renders
  let hash = 0;
  for(let i = 0; i < filename.length; i++) hash = hash * 31 + filename.charCodeAt(i);
  const rot = (hash % 600) / 100 - 3; // -3 to +3 degrees
  const xDev = (hash % 2400) / 100 - 12; // -12 to 12 pixels displacement

  rawPolaroids.push({
    id: filename,
    title,
    date: dateStr,
    dateObj,
    isVideo: filename.toLowerCase().endsWith('.mp4'),
    src: url as string,
    rotate: rot,
    xDev: xDev,
    zIndex: 0, // Assigned iteratively after sorting
  });
}

// Sequence natively from latest to farthest backwards date
const sortedPolaroids = rawPolaroids.sort((a, b) => b.dateObj.getTime() - a.dateObj.getTime());
sortedPolaroids.forEach((p, i) => {
  p.zIndex = i * 10;
});
const polaroids = sortedPolaroids;

// ── Left text content (typed first)
const LEFT_TEXT  = "Growing up in the UAE\nto doing my bachelors\nin South India..";
// ── Right text (typed after left is done)
const RIGHT_TEXT = "...travelling has felt\nmore like home than\nany house i've lived in.";

// Typing speed in ms per character
const CHAR_MS = 35;

// ── Simple Video Controller Component ───────────────────────────────────────
function VideoPolaroid({ src, isActive }: { src: string; isActive: boolean }) {
  const vidRef = useRef<HTMLVideoElement>(null);

  // Power save — only play when this card is at the top of the stack
  useEffect(() => {
    if (isActive) {
      vidRef.current?.play().catch(() => {});
    } else {
      vidRef.current?.pause();
    }
  }, [isActive]);

  return (
    <video
      ref={vidRef}
      src={src}
      muted
      loop
      playsInline
      className="absolute inset-0 w-full h-full object-cover pointer-events-none"
    />
  );
}

/**
 * Vertical Polaroids Pinning Container Component.
 * 
 * Intercepts the native scroll math through hard GSAP `pin` triggers tracking `stackContainerRef`.
 * Synchronizes nested vertical displacement translations onto dynamically nested card arrays 
 * mathematically mapped tightly against overlapping array indices simulating 3D pile physics.
 * 
 * @returns {JSX.Element} The physical layout engine binding the sticky `travel-section`.
 */
export function Travel() {
  const containerRef  = useRef<HTMLDivElement>(null);
  const triggerRef    = useRef<HTMLDivElement>(null);
  const polaroidRefs  = useRef<(HTMLDivElement | null)[]>([]);
  const [scale, setScale] = useState(1);
  const [activeIndex, setActiveIndex] = useState(0);

  // ── Typing state ──────────────────────────────────────────────────────────
  const [leftTyped,  setLeftTyped]  = useState("");
  const [rightTyped, setRightTyped] = useState("");
  const typingStarted = useRef(false);

  // ── Mouse parallax state ──────────────────────────────────────────────────
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
      { threshold: 0, rootMargin: "-30% 0px -0% 0px" } 
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

    // Dynamic speeds for all 16 items
    const lerpSpeeds = polaroids.map((_, i) => Math.max(0.015, 0.08 - (i * 0.004)));
    const maxDisplace = 18;

    const loop = () => {
      polaroids.forEach((_, i) => {
        const targetX = mouse.current.x * maxDisplace;
        const targetY = mouse.current.y * maxDisplace * 0.5;
        offsets.current[i].x += (targetX - offsets.current[i].x) * lerpSpeeds[i];
        offsets.current[i].y += (targetY - offsets.current[i].y) * lerpSpeeds[i];

        const el = polaroidRefs.current[i];
        if (el) {
          // Add permanent natural x displacement alongside the mouse tracking
          el.style.transform = `translate(${offsets.current[i].x + polaroids[i].xDev}px, ${offsets.current[i].y}px)`;
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

  // ── GSAP scroll-driven active index tracker ────────────────────────────
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const dropCount = polaroids.length - 1;

      ScrollTrigger.create({
        trigger: triggerRef.current,
        start: "top top",
        end: `+=${polaroids.length * 150}`, 
        pin: true,
        // Snap naturally assists the user's scrollbar into exact indexed increments
        snap: dropCount > 0 ? {
          snapTo: 1 / dropCount,
          duration: { min: 0.15, max: 0.5 },
          ease: "power1.inOut"
        } : undefined,
        onUpdate: (self) => {
          if(dropCount <= 0) return;
          // As soon as the scroll progress rounds to the next indexed notch,
          // instantly flip the active state.
          let active = Math.round(self.progress * dropCount);
          if (active > dropCount) active = dropCount;
          if (active < 0) active = 0;
          setActiveIndex(active);
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

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

        <div
          className="absolute left-1/2 top-1/2 w-[1920px] h-[1080px] origin-center"
          style={{ transform: `translate(-50%, -50%) scale(${scale})` }}
        >

          <p className="absolute font-['Instrument_Serif',serif] leading-[0.639] left-1/2 -translate-x-1/2 not-italic text-[191px] text-black text-center top-[154px] tracking-[-5.73px] whitespace-nowrap z-0">
            My Travel Snapshots
          </p>

          <div className="absolute flex justify-between items-start left-[53px] top-[519px] w-[1812px] font-['Just_Another_Hand',cursive] text-[77px] leading-[0.85] text-black opacity-50 z-0">
            <p className="w-[402px] text-left" style={{ minHeight: "3em" }}>
              {renderTyped(leftTyped)}
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

          <div className="absolute left-1/2 -translate-x-1/2 top-[280px] w-[849.72px] h-[529.41px] z-10">
            {polaroids.map((p, i) => {
              const isDropped = i <= activeIndex;
              const targetY = i === 0 ? 0 : (isDropped ? i * 8 : 800);
              const targetScale = isDropped ? 1 : 0.8;

              return (
              <div
                key={p.id}
                className="polaroid-card absolute inset-0"
                data-rotation={p.rotate}
                style={{ 
                  zIndex: p.zIndex,
                  transform: `translateY(${targetY}px) scale(${targetScale}) rotate(${p.rotate}deg)`,
                  // Completely smooths the drop natively bypassing direct scroll scrubbing!
                  transition: "transform 0.65s cubic-bezier(0.22, 1, 0.36, 1)",
                }}
              >
                <div
                  ref={(el) => (polaroidRefs.current[i] = el)}
                  className="absolute inset-0 bg-[#fcf6e6] rounded-[13.84px] shadow-[0px_5px_36.9px_18.45px_rgba(0,0,0,0.06)] flex justify-center items-center overflow-clip"
                  style={{ willChange: "transform" }}
                >
                  <div className="absolute left-[30.1px] top-[27.4px] w-[789.75px] h-[480px] flex flex-col gap-[28.6px]">
                    <div className="bg-black w-full h-[400.41px] rounded-[9.23px] shrink-0 overflow-hidden relative">
                      {p.isVideo ? (
                        <VideoPolaroid src={p.src} isActive={activeIndex === i} />
                      ) : (
                        <img src={p.src} alt={p.title} className="absolute inset-0 w-full h-full object-cover pointer-events-none" />
                      )}
                    </div>
                    <div className="flex font-['Inter',sans-serif] items-center justify-between leading-[normal] text-black w-full whitespace-nowrap">
                      <p className="text-[36.9px] tracking-[-2.21px] font-normal">{p.title}</p>
                      <p className="text-[32.3px] tracking-[-0.65px] font-normal">{p.date}</p>
                    </div>
                  </div>
                </div>
              </div>
            );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}

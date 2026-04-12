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

export function Travel() {
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  // Scalable 1920x1080 Canvas Setup for Perfect Reference Matching
  useEffect(() => {
    const updateScale = () => {
      // Scale down to fit within the viewport while preserving the exact 1920x1080 proportions
      const s = Math.min(window.innerWidth / 1920, window.innerHeight / 1080);
      setScale(s);
    };
    updateScale();
    window.addEventListener("resize", updateScale);
    return () => window.removeEventListener("resize", updateScale);
  }, []);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      const cards = gsap.utils.toArray(".polaroid-card") as HTMLElement[];

      if (cards.length > 0) {
        // Explicitly set the rotation via GSAP so it stacks perfectly and doesn't get overwritten
        cards.forEach((card) => {
          const rot = parseFloat(card.dataset.rotation || "0");
          gsap.set(card, { rotate: rot });
        });

        // Hide all but the first polaroid out of frame
        gsap.set(cards.slice(1), { y: "150%", opacity: 0, scale: 0.8 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: triggerRef.current,
            start: "top top",
            end: "+=4000", // Smooth scroll duration
            scrub: 1,
            pin: true,
          },
        });

        // Animate subsequent polaroids up into the stack
        cards.slice(1).forEach((card, index) => {
          tl.to(card, {
            y: `${(index + 1) * 35}px`, // Slight shift downwards to create a visible stack
            opacity: 1,
            scale: 1,
            duration: 1,
            ease: "power2.out",
          }, index === 0 ? undefined : "-=0.6"); // slight overlap in timing for smoothness
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="bg-[#fffcf3] relative w-full" data-name="Travel">
      <div ref={triggerRef} className="w-full h-screen relative">
        
        {/* Exact 1920x1080 Canvas Scaled to Window */}
        <div 
          className="absolute left-1/2 top-1/2 w-[1920px] h-[1080px] origin-center"
          style={{ transform: `translate(-50%, -50%) scale(${scale})` }}
        >
          
          {/* Title */}
          <p className="absolute font-['Instrument_Serif',serif] leading-[0.639] left-1/2 -translate-x-1/2 not-italic text-[191px] text-black text-center top-[154px] tracking-[-5.73px] whitespace-nowrap z-0">
            My Travel Snapshots
          </p>

          {/* Hand-written Side Texts */}
          <div className="absolute flex justify-between items-start left-[53px] top-[519px] w-[1812px] font-['Just_Another_Hand',cursive] text-[77px] leading-[0.85] text-black opacity-50 z-0">
            <p className="w-[402px] text-left">
              Growing up in the UAE<br />
              to doing my bachelors<br />
              in South India..
            </p>
            <p className="w-[402px] text-right">
              ...travelling has felt<br />
              more like home than<br />
              any house i've lived in.
            </p>
          </div>

          {/* Polaroids Base Container (Centered directly under title, exactly at top: 280px) */}
          <div className="absolute left-1/2 -translate-x-1/2 top-[280px] w-[849.72px] h-[529.41px] z-10">
            {polaroids.map((p) => (
              <div
                key={p.id}
                className="polaroid-card absolute inset-0 bg-[#fcf6e6] rounded-[13.84px] shadow-[0px_5px_36.9px_18.45px_rgba(0,0,0,0.18)] flex justify-center items-center overflow-clip"
                data-rotation={p.rotate}
                style={{ zIndex: p.zIndex }}
              >
                {/* Polaroid Inner Layout */}
                <div className="absolute left-[30.1px] top-[27.4px] w-[789.75px] h-[480px] flex flex-col gap-[28.6px]">
                  
                  {/* Image Block */}
                  <div className="bg-black w-full h-[400.41px] rounded-[9.23px] shrink-0 overflow-hidden relative">
                    <img src={p.img} alt={p.title} className="absolute inset-0 w-full h-full object-cover pointer-events-none" />
                  </div>
                  
                  {/* Polaroid Footer Text */}
                  <div className="flex font-['Inter',sans-serif] items-center justify-between leading-[normal] text-black w-full whitespace-nowrap">
                    <p className="text-[36.9px] tracking-[-2.21px] font-normal">{p.title}</p>
                    <p className="text-[32.3px] tracking-[-0.65px] font-normal">{p.date}</p>
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

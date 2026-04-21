import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import svgPaths8tskrlw096 from "../../imports/svg-8tskrlw096";
import svgPathsuxavwq7xjp from "../../imports/svg-uxavwq7xjp";

const MENU_EASE: [number, number, number, number] = [0.76, 0, 0.24, 1];
/**
 * Core Application Navigation Overlay Component.
 * 
 * Houses the fully animated fullscreen overlay menu mapped iteratively to static route targets.
 * Subscribes organically to custom window `portfolioReady` events exclusively surfaced after
 * root loading sequences settle, securely preventing menu access during initialization physics.
 * Integrates explicitly with Lenis global variables to hijack DOM scrolls during programmatic traversal.
 * 
 * @returns {JSX.Element} Natively sticky navigation UI component.
 */
export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [isTeleporting, setIsTeleporting] = useState(false);
  const [navRevealed, setNavRevealed] = useState(false);

  /**
   * Listen to discrete initialization signals broadcasted by Hero/Loading sequences
   * unlocking interactivity safely behind CSS entrance bounds.
   */
  useEffect(() => {
    const onReveal = () => setNavRevealed(true);
    window.addEventListener("heroReveal", onReveal);
    const onReady = () => setNavRevealed(true);
    window.addEventListener("portfolioReady", onReady);
    const fallback = setTimeout(() => setNavRevealed(true), 15000);
    return () => {
      window.removeEventListener("heroReveal", onReveal);
      window.removeEventListener("portfolioReady", onReady);
      clearTimeout(fallback);
    };
  }, []);

  /** Master route map statically anchoring anchor strings to DOM section IDs. */
  const menuLinks = [
    { num: "(01)", label: "Home", target: "hero-section" },
    { num: "(02)", label: "About", target: "about-section" },
    { num: "(03)", label: "Works", target: "projects-section" },
    { num: "(04)", label: "Archives", target: "archives-section" },
    { num: "(05)", label: "Journal", target: "journal-section" },
    { num: "(06)", label: "Contact", target: "contact-section" },
  ];

  const openMenu = () => {
    setIsClosing(false);
    setIsOpen(true);
  };

  const closeMenu = () => {
    if (isClosing) return;
    setIsClosing(true);
    setTimeout(() => {
      setIsOpen(false);
      setIsClosing(false);
    }, 1750);
  };

  const handleLinkClick = (e: React.MouseEvent, target: string) => {
    e.preventDefault();
    const needsWait = isOpen;
    if (isOpen) {
      closeMenu();
    }
    
    // Intercept clicks when inside a Project overlay to cleanly transition out back to Root
    if (window.location.pathname.length > 1) {
      if (isOpen) {
        closeMenu();
        // Wait mechanically for the menu tearing-down animation before triggering exit curtain
        setTimeout(() => {
          window.dispatchEvent(new CustomEvent("projectExit", { detail: { target } }));
        }, 1750);
      } else {
        window.dispatchEvent(new CustomEvent("projectExit", { detail: { target } }));
      }
      return;
    }
    
    setTimeout(() => {
      // Disable pointer events temporarily to avoid hover triggers
      document.body.style.pointerEvents = "none";
      setTimeout(() => {
        document.body.style.pointerEvents = "";
      }, 2100);

      // Force mechanical refresh tracking natively keeping 2.5s caching active
      if (target === "magic-refresh") {
        window.scrollTo(0, 0);
        sessionStorage.removeItem("portfolio_visited");
        sessionStorage.removeItem("portfolioScrollY");
        window.location.href = "/";
        return;
      }

      if ((window as any).lenis) {
        (window as any).lenis.start();

        const el = document.getElementById(target);
        const currentScroll = window.scrollY;

        // Sections 1-4 are "top" group — smooth scroll is always fine among these
        const TOP_SECTION_IDS = ["hero-section", "about-section", "projects-section", "archives-section"];
        const isTargetContact = target === "contact-section";
        const isTargetTop = TOP_SECTION_IDS.includes(target);

        // Detect which group the user is currently in by checking if viewport centre
        // falls within any of the top sections
        const viewportCentre = currentScroll + window.innerHeight / 2;
        const isCurrentlyInTop = TOP_SECTION_IDS.some(id => {
          const sectionEl = document.getElementById(id);
          if (!sectionEl) return false;
          const sectionTop = sectionEl.getBoundingClientRect().top + currentScroll;
          const sectionBottom = sectionEl.getBoundingClientRect().bottom + currentScroll;
          return viewportCentre >= sectionTop && viewportCentre <= sectionBottom;
        });

        // Dissolve only when:
        //   (a) Going to Contact from anywhere, OR
        //   (b) Going UP to a top section while currently below the top group
        const shouldDissolve = isTargetContact || (isTargetTop && !isCurrentlyInTop);

        if (shouldDissolve) {
          setIsTeleporting(true);
          setTimeout(() => {
            (window as any).lenis.scrollTo(`#${target}`, { immediate: true });
            setTimeout(() => {
              setIsTeleporting(false);
            }, 100);
          }, 600);
        } else {
          (window as any).lenis.scrollTo(`#${target}`, {
            duration: 2.2,
            lock: false,
            easing: (t: number) => t < 0.5 ? 8 * t * t * t * t : 1 - Math.pow(-2 * t + 2, 4) / 2
          });
        }
      } else {
        const el = document.getElementById(target);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }
    }, needsWait ? 1750 : 0);
  };

  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      if ((window as any).lenis) (window as any).lenis.stop();
    } else {
      document.body.style.overflow = "";
      if ((window as any).lenis) (window as any).lenis.start();
    }
  }, [isOpen]);

  return (
    <>
      {/* Teleport Dissolve Overlay */}
      <AnimatePresence>
        {isTeleporting && (
          <motion.div 
            className="fixed inset-0 bg-[#fffcf3] z-[9999999] pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          />
        )}
      </AnimatePresence>
      {/* Persistent navbar bar */}
      <div className="fixed top-0 left-0 w-full z-[100000] flex justify-center md:justify-between items-center px-10 py-8 pointer-events-none mix-blend-difference text-[#fffcf3]">
        <div 
          className="cursor-pointer pointer-events-auto"
          style={{ 
            opacity: isOpen ? 0 : (navRevealed ? 1 : 0), 
            transform: navRevealed ? "translateY(0px)" : "translateY(-20px)",
            transition: "opacity 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.6s, transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.6s",
            fontFamily: `"SG Grotesk DEMO", sans-serif`,
            fontSize: "clamp(16px, 3vw, 25px)",
            fontStyle: "normal",
            fontWeight: "300",
            lineHeight: "normal",
            letterSpacing: "-0.75px"
          }}
          onClick={(e) => handleLinkClick(e, "magic-refresh")}
          data-cursor="CLICK"
        >
          ragavwithouttheh
        </div>
        <button
          onClick={isOpen ? closeMenu : openMenu}
          className="hidden md:flex cursor-pointer h-[16px] w-[55px] relative pointer-events-auto flex-col justify-between"
          aria-label="Toggle menu"
          style={{
            opacity: navRevealed ? 1 : 0,
            transform: navRevealed ? "translateY(0px)" : "translateY(-20px)",
            transition: "opacity 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.8s, transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.8s",
          }}
        >
          {/* Top Line */}
          <span 
            className="w-full h-[2px] bg-current origin-center" 
            style={{ 
              transform: isOpen ? "translateY(7px)" : "translateY(0px)",
              transition: "transform 0.4s cubic-bezier(0.68, -0.55, 0.26, 1.55)" 
            }} 
          />
          {/* Bottom Line */}
          <span 
            className="w-full h-[2px] bg-current origin-center" 
            style={{ 
               transform: isOpen ? "translateY(-7px)" : "translateY(0px)",
               transition: "transform 0.4s cubic-bezier(0.68, -0.55, 0.26, 1.55)" 
            }} 
          />
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Left-half dim + blur + grain — fades IN after panel lands, fades OUT first on close */}
            <motion.div
              key="overlay"
              className="fixed top-0 left-0 bottom-0 z-[99998] pointer-events-auto"
              data-cursor="dot-only"
              style={{
                right: "50%",
                backdropFilter: "blur(5px)",
                background: "linear-gradient(90.3deg, rgba(255,252,243,0.3) 0%, rgba(80,78,74,0.4) 120%)",
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: isClosing ? 0 : 1 }}
              transition={{ duration: 0.5, ease: "easeInOut", delay: isClosing ? 0 : 0.75 }}
              onClick={closeMenu}
            >
              {/* Grain texture */}
              <div
                className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-20"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
                  backgroundSize: "180px 180px",
                }}
              />

              {/* Dynamic Blur "Flashlight" Blob */}
              {/* Note: This is nested *above* the grain but inside the overlay 
                  so that it locally intensifies blur beneath it visually */}
              <motion.div
                className="absolute w-[60vw] h-[60vh] rounded-full pointer-events-none mix-blend-overlay"
                style={{
                  background: "radial-gradient(circle, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0) 70%)",
                  filter: "blur(40px)",
                }}
                initial={{ left: "-20%", bottom: "-10%", opacity: 0 }}
                animate={{
                  left: ["-20%", "40%", "-20%"],
                  bottom: ["-10%", "50%", "-10%"],
                  opacity: isClosing ? 0 : [0.6, 1, 0.6],
                }}
                transition={{
                  duration: 12,
                  ease: "easeInOut",
                  repeat: Infinity,
                  opacity: { duration: 0.5 }
                }}
              />
            </motion.div>

            {/* ↙ Arrow button — sits at bottom-left of the LEFT half, outside the menu panel */}
            <motion.button
              key="arrow-btn"
              onClick={closeMenu}
              aria-label="Close"
              data-cursor="dot-only"
              className="fixed z-[99999] bg-[#fffcf3] border border-black/[0.12] rounded-[3px] flex items-center justify-center cursor-pointer transition-colors overflow-hidden group hover:bg-[#fffcf3]"
              style={{
                bottom: 44,
                left: "calc(50% - 65px - 22px)", // 22px gap from left edge of menu panel
                width: 65,
                height: 65,
                transformOrigin: "top right",
              }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ 
                scale: isClosing ? 0 : 1, 
                opacity: isClosing ? 0 : 1 
              }}
              transition={{ delay: isClosing ? 0 : 1.0, duration: isClosing ? 0.5 : 1.0, ease: MENU_EASE }}
            >
              <div className="-rotate-45 flex-none transition-transform duration-[600ms] ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:rotate-[135deg]">
                <div className="h-0 relative w-[20px]">
                  <div className="absolute inset-[-11px_-3.66%]">
                    <svg className="block size-[22px]" fill="none" viewBox="0 0 44 22">
                      <path d={svgPathsuxavwq7xjp.p4466300} fill="black" />
                    </svg>
                  </div>
                </div>
              </div>
            </motion.button>

            {/* Right-half menu panel */}
            <motion.div
              key="menu"
              className="fixed top-0 right-0 z-[99998] bg-[#fffcf3] flex flex-col w-full md:w-[50vw] h-screen"
              data-cursor="dot-only"
              initial={{ y: "-100%" }}
              animate={{ y: isClosing ? "-100%" : "0%" }}
              transition={{ delay: isClosing ? 0.5 : 0, duration: 1.2, ease: MENU_EASE }}
            >
              {/* Top: "Menu" title left */}
              <div className="flex items-start justify-between px-[44px] pt-[33px]">
                <p className="font-['Inter_Display',sans-serif] font-normal leading-[0.87] text-[50px] text-black tracking-[-3px]">
                  Menu
                </p>
              </div>

              {/* Body: two-column layout matching Figma */}
              {/* Left col: "(Links)" label at ~49px, links list at ~41.8% from panel left */}
              <div className="flex-1 w-full relative pt-[82px] overflow-y-auto">

                {/* Left sidebar label */}
                <div className="flex items-start gap-[4px] absolute left-[49px] top-[100px]">
                  <p className="font-['Inter_Display',sans-serif] font-light opacity-50 text-[25px] tracking-[-1.5px] leading-[0.87]">
                    (Links)
                  </p>
                  <sup className="font-['Inter_Display',sans-serif] font-medium opacity-50 text-[12px] tracking-[-0.24px] mt-[4px]">
                    05
                  </sup>
                </div>

                {/* Links column — Uses normal document flow natively forcing scrolling logic instead of strict overlapping boundaries */}
                <div className="w-full pl-[41%] pr-[44px] flex flex-col pb-8">
                  {menuLinks.map((link, idx) => (
                    <motion.div
                      key={link.num}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.45 + idx * 0.07, duration: 0.4, ease: "easeOut" }}
                      className="flex flex-col w-full group cursor-pointer"
                      onClick={(e) => handleLinkClick(e, link.target)}
                    >
                      <div className="flex items-center justify-between w-full py-[18px]">
                        {/* Number + label side by side */}
                        <div className="flex items-center gap-[48px]">
                          <p className="font-['Inter_Display',sans-serif] font-normal opacity-50 text-[30px] text-black tracking-[-1.8px] group-hover:opacity-100 transition-opacity duration-200 w-[72px] shrink-0">
                            {link.num}
                          </p>
                          {/* Label slides right on hover */}
                          <div className="relative">
                            <p className="font-['Inter_Display',sans-serif] font-normal text-[30px] text-black tracking-[-1.8px] whitespace-nowrap transform transition-transform duration-300 ease-out group-hover:translate-x-2">
                              {link.label}
                            </p>
                          </div>
                        </div>
                        {/* Arrow — statically visible */}
                        <div className="flex items-center justify-center size-[13px] opacity-100 -rotate-45">
                          <div className="h-0 relative w-[18.385px]">
                            <div className="absolute inset-[-7.36px_-5.44%_-7.36px_0]">
                              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19.3848 14.7279">
                                <path d={svgPaths8tskrlw096.p3a9d3c80} fill="black" />
                              </svg>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* Divider */}
                      <div className="h-px w-full bg-black/10" />
                    </motion.div>
                  ))}
                </div>
              </div>

                {/* Bottom bar — (Social Media) label left, social links in middle column, ©2026 right */}
              <div className="px-[49px] pb-[30px] pt-[20px] flex items-end justify-between relative shrink-0">

                {/* (Social Media) label — left column */}
                <p className="font-['Inter_Display',sans-serif] font-light leading-[0.87] opacity-50 text-[25px] text-black tracking-[-1.5px] whitespace-nowrap">
                  (Social Media)
                </p>

                {/* Social links — positioned at same 41% column as links list */}
                <div
                  className="absolute flex flex-col gap-[7px] font-['Inter_Display',sans-serif] text-[16px] text-black tracking-[-0.96px] leading-[0.87]"
                  style={{ left: "41%", bottom: "30px" }}
                >
                  <a href="https://www.instagram.com/ragavwithouttheh" target="_blank" rel="noopener noreferrer" className="cursor-pointer hover:opacity-60 transition-opacity">Instagram — Personal</a>
                  <a href="https://www.instagram.com/rgxv.ui" target="_blank" rel="noopener noreferrer" className="cursor-pointer hover:opacity-60 transition-opacity">Instagram — Art</a>
                  <a href="https://open.spotify.com/user/61ea69ooda9ch57149ylpfeh9?si=6f37d19b5ef7493b" target="_blank" rel="noopener noreferrer" className="cursor-pointer hover:opacity-60 transition-opacity">Spotify</a>
                </div>

                {/* ©2026 — right */}
                <div className="flex items-center gap-1 opacity-50">
                  <span className="font-['Inter_Display',sans-serif] font-light text-[18.667px] leading-[0.87] tracking-[-1.12px]">©</span>
                  <span className="font-['Inter_Display',sans-serif] font-light text-[25px] leading-[0.87] tracking-[-1.5px]">2026</span>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

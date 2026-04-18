import React, { useState, useEffect, useLayoutEffect, useRef, useCallback } from "react";
import { useParams, useNavigate, useNavigationType } from "react-router";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useAnimationFrame,
  useTransform,
  wrap,
  useScroll,
  useSpring,
  usePresence,
} from "motion/react";
import { getProjectBySlug, getNextProject, type ProjectData } from "../data/projectsData";
import Lenis from "@studio-freight/lenis";

// ─── IST Clock ──────────────────────────────────────────────────────────────
function useISTTime() {
  const [time, setTime] = useState("");
  useEffect(() => {
    const update = () => {
      const now = new Date();
      const ist = new Date(now.toLocaleString("en-US", { timeZone: "Asia/Kolkata" }));
      const h = String(ist.getHours()).padStart(2, "0");
      const m = String(ist.getMinutes()).padStart(2, "0");
      setTime(`${h}:${m}`);
    };
    update();
    const id = setInterval(update, 10000);
    return () => clearInterval(id);
  }, []);
  return time;
}

// ─── Move-Up-On-Hover Text ───────────────────────────────────────────────────
function MoveUpText({ children, className = "" }: { children: string; className?: string }) {
  const [hovered, setHovered] = useState(false);
  return (
    <span
      className={`inline-block overflow-hidden relative cursor-default select-none ${className}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ lineHeight: 1 }}
    >
      <motion.span
        className="block"
        animate={{ y: hovered ? "-100%" : "0%" }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.span>
      <motion.span
        className="absolute inset-0 block"
        animate={{ y: hovered ? "0%" : "100%" }}
        initial={{ y: "100%" }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.span>
    </span>
  );
}

// ─── Cascading Text Reveal ───────────────────────────────────────────────────
// ─── Cascading Text Reveal ───────────────────────────────────────────────────
// Detects actual RENDERED line breaks by measuring word span offsetTop values.
// Each visual line (as wrapped in the container) gets its own clip animation.
function CascadeText({ text, trigger }: { text: string; trigger: string | number }) {
  const measureRef = useRef<HTMLDivElement>(null);
  const [lineGroups, setLineGroups] = useState<string[]>([]);
  const words = text.split(" ").filter(Boolean);

  // Reset measured lines when content or trigger changes
  useEffect(() => {
    setLineGroups([]);
  }, [text, trigger]);

  // After each render pass, if not yet measured, group words by rendered offsetTop
  useLayoutEffect(() => {
    if (lineGroups.length > 0 || !measureRef.current) return;
    const spans = Array.from(
      measureRef.current.querySelectorAll<HTMLElement>("[data-w]")
    );
    if (spans.length === 0) return;

    const groups: string[][] = [];
    let lastTop: number | null = null;
    spans.forEach((span) => {
      const top = span.offsetTop;
      const word = span.dataset.w ?? "";
      if (lastTop === null || top !== lastTop) {
        groups.push([word]);
        lastTop = top;
      } else {
        groups[groups.length - 1].push(word);
      }
    });

    setLineGroups(groups.map((g) => g.join(" ")));
  });

  const ready = lineGroups.length > 0;

  return (
    <div className="text-center relative">
      {/* Measurement pass — invisible text at exact same styles */}
      {!ready && (
        <div
          ref={measureRef}
          className="text-[28px] leading-[1.2] tracking-[-0.85px]"
          style={{ visibility: "hidden" }}
        >
          {words.map((word, i) => (
            <span key={i} data-w={word}>
              {word}{" "}
            </span>
          ))}
        </div>
      )}

      {/* Animation pass — each detected line clips in from below */}
      {ready &&
        lineGroups.map((line, i) => (
          <div key={`${trigger}-${i}`} style={{ overflow: "hidden" }}>
            <motion.div
              initial={{ y: "110%" }}
              animate={{ y: "0%" }}
              transition={{
                duration: 1.0,
                delay: i * 0.15,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="leading-[1.2]"
            >
              {line}
            </motion.div>
          </div>
        ))}
    </div>
  );
}

// ─── Floating Cursor Icon ("Me" badge) ───────────────────────────────────────
function FloatingCursor() {
  return (
    <motion.div
      className="pointer-events-none select-none"
      animate={{ y: [0, -12, 0] }}
      transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
      style={{ position: "absolute", bottom: "-65px", right: "-18px", zIndex: 20 }}
    >
      <div style={{ position: "relative", width: 100, height: 58 }}>
        {/* Exact cursor SVG from Figma node 813:2909 */}
        <svg
          width="38" height="38"
          viewBox="0 0 38.0018 38.0012"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ position: "absolute", left: 0, top: 0 }}
          preserveAspectRatio="none"
          overflow="visible"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M2.76104 0.150454C2.39585 0.000189198 1.99435 -0.0386041 1.60715 0.0389638C1.21995 0.116532 0.864372 0.306989 0.585246 0.586329C0.30612 0.865669 0.115935 1.22139 0.0386634 1.60865C-0.0386079 1.99591 0.000493182 2.39738 0.151038 2.76245L14.151 36.7625C14.301 37.1267 14.5551 37.4386 14.8817 37.659C15.2082 37.8793 15.5925 37.9984 15.9864 38.0012C16.3803 38.0039 16.7663 37.8903 17.0959 37.6746C17.4254 37.4588 17.684 37.1506 17.839 36.7885L23.209 24.2585C23.4113 23.7867 23.7873 23.4107 24.259 23.2085L36.789 17.8385C37.1512 17.6834 37.4594 17.4249 37.6752 17.0953C37.8909 16.7657 38.0045 16.3797 38.0017 15.9858C37.999 15.5919 37.8799 15.2076 37.6596 14.8811C37.4392 14.5546 37.1273 14.3004 36.763 14.1505L2.76104 0.150454Z"
            fill="#FFFCF3"
          />
        </svg>
        {/* "Me" pill — positioned to the right of cursor tip, matching Figma left:50px top:25px */}
        <div
          style={{
            position: "absolute",
            left: 46,
            top: 22,
            background: "#fffcf3",
            borderRadius: 10,
            padding: "3px 11px",
          }}
        >
          <span
            style={{
              fontFamily: "'Inter Display', sans-serif",
              fontWeight: 600,
              fontSize: 18,
              color: "#090909",
              letterSpacing: "-0.6px",
              whiteSpace: "nowrap",
            }}
          >
            Me
          </span>
        </div>
      </div>
    </motion.div>
  );
}


// ─── Gallery Section ─────────────────────────────────────────────────────────
function GallerySection({ slug }: { slug: string }) {
  const [isHovered, setIsHovered] = useState(false);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [hoverTimer, setHoverTimer] = useState<ReturnType<typeof setTimeout> | null>(null);
  const [tooltipVisible, setTooltipVisible] = useState(false);
  
  // Inertia spring setup for tooltip positioning
  const tooltipX = useMotionValue(0);
  const tooltipY = useMotionValue(0);
  const smoothX = useSpring(tooltipX, { damping: 25, stiffness: 200, mass: 0.5 });
  const smoothY = useSpring(tooltipY, { damping: 25, stiffness: 200, mass: 0.5 });

  const baseX = useMotionValue(0);
  const dragX = useMotionValue(0);

  // Dynamically load all images belonging to this project's slug
  const allImages = import.meta.glob<{ default: string }>('/src/assets/projects/**/*.{png,jpg,jpeg,webp,gif}', { eager: true });
  const projectImages = Object.entries(allImages)
    .filter(([path]) => path.includes(`/projects/${slug}/`) && !path.toLowerCase().includes("-arch"))
    .map(([path, module]) => {
      // Extract optional caption from parentheses: e.g., "hero_shot (Dashboard View).png" -> "Dashboard View"
      const match = path.match(/\((.*?)\)/);
      const caption = match ? match[1] : null;
      return { url: module.default, caption };
    });

  const hasImages = projectImages.length > 0;

  const placeholders = [
    { url: "", caption: "Dashboard Overview" },
    { url: "", caption: "Inspection Form Flow" },
    { url: "", caption: "Approval Workflow" },
    { url: "", caption: "User Management Panel" },
  ];

  const sourceItems = hasImages ? projectImages : placeholders;
  const sequence = [...sourceItems, ...sourceItems, ...sourceItems];

  useAnimationFrame((_, delta) => {
    const velocity = isHovered ? -0.1 : -0.5;
    baseX.set(baseX.get() + velocity * (delta / 1000));
  });


  const handleMouseEnter = (idx: number) => {
    setHoveredIdx(idx);
    const t = setTimeout(() => {
      setTooltipVisible(true);
      // Fire synthetic physics update structurally bridging data-cursor drop with CustomCursor event engine
      const px = tooltipX.get();
      const py = tooltipY.get();
      const targetEl = document.elementFromPoint(px, py);
      if (targetEl) {
        targetEl.dispatchEvent(new MouseEvent('mousemove', { clientX: px, clientY: py, bubbles: true }));
      }
    }, 2500);
    setHoverTimer(t);
  };
  const handleMouseLeave = () => {
    setHoveredIdx(null);
    if (hoverTimer) clearTimeout(hoverTimer);
    setTooltipVisible(false);
  };
  const handleMouseMove = (e: React.MouseEvent) => {
    tooltipX.set(e.clientX);
    tooltipY.set(e.clientY);
  };

  return (
    <div
      className="w-full bg-[#090909] py-16 overflow-hidden relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
    >
      <motion.div
        className="flex gap-[31px] w-max"
        data-cursor="DRAG"
        onPan={(_, info) => {
          // Accelerate Pan: converting pixel dragged to roughly matching percentage points
          baseX.set(baseX.get() + info.delta.x * 0.015);
        }}
        style={{ x: useTransform(baseX, (v) => `${wrap(-33.33, 0, v)}%`) }}
      >
        {sequence.map((item, idx) => (
          <div
            key={idx}
            className="h-[492px] w-[760px] shrink-0 relative rounded-[17px] overflow-hidden bg-white/5 border border-white/10 flex items-center justify-center group"
            onMouseEnter={() => handleMouseEnter(idx)}
            onMouseLeave={handleMouseLeave}
            data-cursor={tooltipVisible && hoveredIdx === idx ? "dot-only" : undefined}
          >
            {item.url ? (
              <img 
                src={item.url} 
                alt={item.caption || "Project gallery image"} 
                className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105" 
                draggable={false}
              />
            ) : (
              <span className="text-white/20 font-['Inter_Display',sans-serif] text-[18px] tracking-tight select-none">
                Drop images in{" "}
                <span className="text-white/40">
                  src/assets/projects/{slug}/
                </span>
              </span>
            )}
          </div>
        ))}
      </motion.div>

      {/* Edge fades */}
      <div className="pointer-events-none absolute left-0 top-0 h-full w-[200px] bg-gradient-to-r from-[#090909] to-transparent z-10" />
      <div className="pointer-events-none absolute right-0 top-0 h-full w-[200px] bg-gradient-to-l from-[#090909] to-transparent z-10" />

      {/* Hover tooltip */}
      {tooltipVisible && hoveredIdx !== null && sequence[hoveredIdx].caption && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="fixed left-0 top-0 z-50 pointer-events-none bg-[#fffcf3] text-black px-[18px] py-[10px] rounded-[11px] text-[16px] font-['Inter_Display',sans-serif] font-semibold tracking-tight shadow-xl max-w-[280px] w-max whitespace-normal break-words leading-[1.1]"
          style={{ x: smoothX, y: smoothY, translateX: 20, translateY: -28 }}
        >
          {sequence[hoveredIdx].caption}
        </motion.div>
      )}
    </div>
  );
}

// ─── Process List Item ────────────────────────────────────────────────────────
function ProcessItem({ text, delay, visible }: { text: string; delay: number; visible: boolean }) {
  return (
    <div className="overflow-hidden">
       <motion.div
        initial={{ y: "110%", opacity: 0 }}
        animate={visible ? { y: "0%", opacity: 1 } : {}}
        transition={{ duration: 0.65, delay, ease: [0.16, 1, 0.3, 1] }}
        className="flex items-start gap-4"
      >
        <span className="text-black mt-[2px] shrink-0 text-[22px] leading-none">✓</span>
        <p className="font-['Inter_Display',sans-serif] text-[22px] leading-[1.1] tracking-tight text-black">
          {text}
        </p>
      </motion.div>
    </div>
  );
}

// ─── Main Component ──────────────────────────────────────────────────────────
function ProjectContent({ slug }: { slug: string }) {
  const istTime = useISTTime();
  
  const [isPresent, safeToRemove] = usePresence();
  useEffect(() => {
    if (!isPresent) {
      setTimeout(() => {
        safeToRemove();
      }, window.location.pathname === "/" ? 0 : 1600);
    }
  }, [isPresent, safeToRemove]);

  const [isSpaNav] = useState(() => {
    const fromNextProject = !!sessionStorage.getItem("portfolio_nav");
    sessionStorage.removeItem("portfolio_nav");
    // If the JS heap already ran the LoadingScreen dynamically, it implies a physical internal 
    // soft routing sequence natively (e.g., clicking Back Arrow) so we suppress loading loops
    const isSoftNav = !!(window as any).__appInitiated;
    return fromNextProject || isSoftNav;
  });

  const navType = useNavigationType();
  const isPop = navType === "POP" && isSpaNav;
  
  const navigate = useNavigate();
  const project = getProjectBySlug(slug ?? "");
  const nextProject = project ? getNextProject(project.slug) : undefined;
  const [pageVisible, setPageVisible] = useState(false);
  const [hoveredTab, setHoveredTab] = useState<"overview" | "challenges" | "reflections" | null>(null);
  const displayTab = hoveredTab ?? "overview";
  const [tabTrigger, setTabTrigger] = useState(0);

  const [localZIndex] = useState(() => {
    let z = parseInt(sessionStorage.getItem("project_z") || "50000");
    z += 10;
    sessionStorage.setItem("project_z", z.toString());
    return z;
  });

  // Refs for each nav item to measure pixel-perfect ellipse alignment
  const navItemRefs = {
    overview: useRef<HTMLButtonElement>(null),
    challenges: useRef<HTMLButtonElement>(null),
    reflections: useRef<HTMLButtonElement>(null),
  };
  const navContainerRef = useRef<HTMLDivElement>(null);
  const [ellipseY, setEllipseY] = useState(0);

  const processRef = useRef<HTMLDivElement>(null);
  const processSectionRef = useRef<HTMLDivElement>(null);
  const processListRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [processListVisible, setProcessListVisible] = useState(false);

  const { scrollYProgress } = useScroll({
    container: containerRef,
    target: processSectionRef,
    offset: ["start end", "end start"],
  });

  const processY = useTransform(scrollYProgress, [0, 0.5], [250, 0]);
  const processOpacity = useTransform(scrollYProgress, [0, 0.15], [0, 1]);

  // Stop Lenis (Root's smooth scroll) while this overlay is mounted;
  // Initialize dedicated Lenis instance for ProjectDetail viewport.
  useEffect(() => {
    // Suspend global scroll safely
    (window as any).lenis?.stop();

    let localLenis: any;
    if (containerRef.current) {
      localLenis = new Lenis({
        wrapper: containerRef.current,
        content: containerRef.current.firstElementChild as HTMLElement,
        duration: 1.8,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
      const raf = (time: number) => {
        localLenis.raf(time);
        requestAnimationFrame(raf);
      };
      const rafId = requestAnimationFrame(raf);
      return () => {
        cancelAnimationFrame(rafId);
        localLenis.destroy();
        (window as any).lenis?.start(); // Resume global when navigating away
      };
    }
  }, []);

  // Dispatch portfolioReady so Navbar reveals immediately
  useEffect(() => {
    if (isSpaNav) window.dispatchEvent(new Event("portfolioReady"));
  }, [isSpaNav]);

  // Entry animation timing
  useEffect(() => {
    if (isSpaNav) {
      if (isPop) {
        // Native Back Button POP: Mirror the 0.65s pure black dissolve from Contact Menu
        const exit = document.createElement("div");
        exit.style.cssText =
          "position:fixed;inset:0;background:#090909;z-index:999999;opacity:0;transition:opacity 0.65s ease;pointer-events:all;";
        document.body.appendChild(exit);
        
        requestAnimationFrame(() => {
          exit.style.opacity = "1";
        });
        
        const tVis = setTimeout(() => {
          setPageVisible(true);
          exit.style.opacity = "0";
        }, 650);

        const tClean = setTimeout(() => {
          exit.remove();
        }, 1300);

        return () => { clearTimeout(tVis); clearTimeout(tClean); };
      } else {
        // Next Project Slide Up
        const t = setTimeout(() => setPageVisible(true), 30);
        const tClean = setTimeout(() => {
          document.getElementById("project-transition-overlay")?.remove();
          document.getElementById("project-transition-bar")?.remove();
        }, 1600);
        return () => { clearTimeout(t); clearTimeout(tClean); };
      }
    } else {
      // Direct load / reload: wait for LoadingScreen to finish before sliding in
      const onReady = () => {
        setPageVisible(true);
        (window as any).lenis?.stop();
      };
      window.addEventListener("portfolioReady", onReady);
      return () => window.removeEventListener("portfolioReady", onReady);
    }
  }, [isSpaNav, isPop]);

  const handleExit = useCallback((softRouteTarget?: string) => {
    const exit = document.createElement("div");
    exit.style.cssText =
      "position:fixed;inset:0;background:#090909;z-index:999999;opacity:0;transition:opacity 0.65s ease;pointer-events:all;";
    document.body.appendChild(exit);
    requestAnimationFrame(() => { exit.style.opacity = "1"; });

    sessionStorage.setItem("project_z", "50000"); // Reset local zIndex stack

    setTimeout(() => {
      // Hard routing mechanically avoids SPA intercepts strictly for magic-refresh
      if (softRouteTarget === "magic-refresh" || softRouteTarget === "HARD_RELOAD") {
        window.scrollTo(0, 0);
        sessionStorage.removeItem("portfolio_visited");
        sessionStorage.removeItem("portfolioScrollY");
        window.location.href = "/";
      } else {
        // Soft route strictly bypasses reloads relying exclusively on CSS overlay masking
        navigate("/");
        setTimeout(() => {
          if ((window as any).lenis) {
            const scrollHash = (!softRouteTarget || softRouteTarget === "hero-section" || softRouteTarget === "top") 
                 ? 0 : `#${softRouteTarget}`;
            (window as any).lenis.scrollTo(scrollHash, { immediate: true });
          }
          exit.style.opacity = "0";
          setTimeout(() => exit.remove(), 650);
        }, 50);
      }
    }, 700);
  }, [navigate]);

  // Intercept browser back button -> cleanly handled purely by React Router's URL changes now that ProjectDetail forces remount via key={slug}!

  useEffect(() => {
    const onProjectExit = (e: any) => {
      const target = e.detail?.target;
      if (target === "magic-refresh") {
         handleExit("magic-refresh"); // Passes through exact handler causing hard reload naturally via else block? Wait no, handleExit needs to hard load!
      } else {
         handleExit(target);
      }
    };

    window.addEventListener("projectExit", onProjectExit);
    return () => window.removeEventListener("projectExit", onProjectExit);
  }, [handleExit]);

  // Measure ellipse Y from actual DOM whenever displayTab changes
  useEffect(() => {
    const ref = navItemRefs[displayTab];
    const container = navContainerRef.current;
    if (ref?.current && container) {
      const itemRect = ref.current.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();
      const centerY = itemRect.top - containerRect.top + itemRect.height / 2 - 3.5;
      setEllipseY(centerY);
    }
  }, [displayTab]);

  // Re-play cascade animation when displayTab changes
  useEffect(() => {
    setTabTrigger((v) => v + 1);
  }, [displayTab]);

  const hoverOutTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  // Track visibility for unified process list appearance
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setProcessListVisible(true); },
      { threshold: 0.1 }
    );
    if (processListRef.current) obs.observe(processListRef.current);
    return () => obs.disconnect();
  }, []);

  const handleHoverIn = (tab: "overview" | "challenges" | "reflections") => {
    if (hoverOutTimer.current) clearTimeout(hoverOutTimer.current);
    setHoveredTab(tab);
  };
  const handleHoverOut = () => {
    hoverOutTimer.current = setTimeout(() => setHoveredTab(null), 650);
  };

  const handleNextProject = () => {
    if (!nextProject) return;
    const overlay = document.createElement("div");
    overlay.id = "project-transition-overlay";
    overlay.style.cssText =
      `position:fixed;inset:0;background:#090909;z-index:${localZIndex + 1};opacity:0;transition:opacity 0.3s ease;pointer-events:all;`;
    document.body.appendChild(overlay);
    const bar = document.createElement("div");
    bar.id = "project-transition-bar";
    bar.style.cssText =
      `position:fixed;top:0;left:0;height:4px;background:#fffcf3;width:0%;z-index:${localZIndex + 2};transition:width 1.1s cubic-bezier(0.16,1,0.3,1);`;
    document.body.appendChild(bar);
    requestAnimationFrame(() => {
      // Opacity reduced down by ~15% from 0.97
      overlay.style.opacity = "0.70";
      bar.style.width = "100%";
    });
    setTimeout(() => {
      sessionStorage.setItem("portfolio_nav", "1");
      navigate(`/${nextProject.slug}`);
    }, 1200);
  };

  const handleHome = () => handleExit();

  if (!project) {
    return (
      <div className="w-full min-h-screen bg-[#090909] flex items-center justify-center">
        <p className="text-white text-[24px] font-['Inter_Display',sans-serif]">Project not found.</p>
      </div>
    );
  }

  const tabContent = {
    overview: project.overview,
    challenges: project.challenges,
    reflections: project.reflections,
  };

  const tabs = [
    { key: "overview" as const, label: "OVERVIEW" },
    { key: "challenges" as const, label: "CHALLENGE" },
    { key: "reflections" as const, label: "REFLECTION" },
  ];

  return (
      <motion.div
        ref={containerRef}
        className="bg-[#090909] overflow-x-hidden overflow-y-auto"
        style={{
          position: "fixed",
          inset: 0,
          zIndex: localZIndex,
          borderTop: "1.5px solid rgba(255,252,243,0.28)",
          pointerEvents: pageVisible ? "auto" : "none",
        }}
        initial={isPop ? { y: 0, opacity: 0 } : { y: "100vh", opacity: 1 }}
        animate={pageVisible ? { y: 0, opacity: 1 } : (isPop ? { y: 0, opacity: 0 } : { y: "100vh", opacity: 1 })}
        transition={isPop ? { duration: 0 } : { duration: 1.4, ease: [0.81, 0, 0.29, 1.01] }}
        exit={{ 
          opacity: window.location.pathname === "/" ? 0 : 0.99, 
          transition: { duration: window.location.pathname === "/" ? 0 : 1.6, ease: "linear" } 
        }}
      >
      {/* ── NEXT PROJECT FOOTER (Absolute Figma Overlay Layout) ── */}
      {nextProject && (
        <div className="sticky top-0 w-full h-screen bg-[#090909] overflow-hidden z-0">
          
          {/* SEE NEXT header */}
          <div className="absolute top-[100px] left-0 w-full flex items-start justify-between px-10">
            <p className="font-['Mango_Grotesque',sans-serif] text-[clamp(35px,4vw,72px)] text-[#fffcf3] leading-none">
              SEE NEXT
            </p>
            <p className="font-['Mango_Grotesque',sans-serif] text-[clamp(35px,4vw,72px)] text-[#fffcf3] leading-none text-right uppercase">
              {nextProject.displayTitle}
            </p>
          </div>
          
          {/* Top Divider */}
          <div className="absolute top-[180px] left-10 right-10 h-px bg-white/20" />
          {/* Center Column Container */}
          <div className="absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] w-[650px] flex flex-col items-start mt-[10px]">
            {/* Project counter (Aligned to Top-Left of Image) */}
            <div className="relative w-[166px] h-[38px] mb-[16px] shrink-0">
              <span className="absolute left-0 top-0 font-['Inter_Display',sans-serif] font-semibold text-[20px] text-[#fffcf3] tracking-[-0.6px]">
                {String(nextProject.index).padStart(2, "0")}
              </span>
              <div className="absolute left-[28px] top-[17px] w-[4px] h-[4px] bg-[#fffcf3] rounded-full opacity-50" />
              <span className="absolute left-[36px] top-[14px] font-['Inter_Display',sans-serif] font-semibold text-[20px] text-[#fffcf3]/50 tracking-[-0.6px]">
                {nextProject.totalProjects}
              </span>
              <span className="absolute left-[65px] top-[14px] font-['Inter_Display',sans-serif] font-semibold text-[20px] text-[#fffcf3]/50 tracking-[-0.6px]">
                PROJECTS
              </span>
            </div>

            {/* Preview image */}
            <motion.div
              className={`w-full aspect-[1920/1080] rounded-[20px] overflow-hidden ${nextProject.hasContent ? "cursor-pointer" : ""}`}
              onClick={nextProject.hasContent ? handleNextProject : undefined}
              data-cursor={nextProject.hasContent ? "CLICK" : undefined}
            >
              <img
                src={nextProject.image}
                alt={nextProject.title}
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>

          {/* HOME / VISIT Absolute Triggers */}
          <div className="absolute top-[50%] -translate-y-[50%] left-0 w-full px-10 flex justify-between items-center pointer-events-none mt-[26px]">
            <button
              onClick={handleHome}
              className="font-['Inter_Display',sans-serif] font-medium text-[24px] text-[#fffcf3] tracking-[-0.72px] pointer-events-auto transition-opacity"
              data-cursor="CLICK"
            >
              <MoveUpText>HOME</MoveUpText>
            </button>

            <button
              onClick={nextProject.hasContent ? handleNextProject : undefined}
              className={`group flex items-center gap-[13px] font-['Inter_Display',sans-serif] font-medium text-[24px] text-[#fffcf3] tracking-[-0.72px] transition-all ${nextProject.hasContent ? 'pointer-events-auto' : 'pointer-events-none opacity-50'}`}
              data-cursor={nextProject.hasContent ? "CLICK" : undefined}
            >
              VISIT
              <div className="w-[38px] h-[38px] rounded-full flex items-center justify-center relative transition-transform duration-300 ease-out group-hover:translate-x-[6px]">
                 <svg className="absolute inset-0 w-full h-full" viewBox="0 0 38 38" fill="none">
                    <circle cx="19" cy="19" r="18.5" stroke="#FFFCF3" strokeOpacity="0.3"/>
                 </svg>
                 <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 7H13M13 7L7 1M13 7L7 13" stroke="#FFFCF3" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </button>
          </div>

          {/* Bottom Info Details */}
          <div className="absolute bottom-[40px] left-0 w-full px-10 flex items-center justify-between">
             <div className="flex items-center gap-[51px]">
                <div className="flex items-center gap-[15px]">
                   <div className="w-[8px] h-[8px] bg-[#fffcf3] rounded-full" />
                   <p className="font-['Inter_Display',sans-serif] font-medium text-[18px] text-[#fffcf3] tracking-[-0.6px] whitespace-pre">
                     BANGALORE,  INDIA
                   </p>
                </div>
                <div className="flex items-center gap-[11px] font-['Inter_Display',sans-serif] font-medium text-[18px] text-[#fffcf3] tracking-[-0.6px]">
                   <p>{istTime}</p>
                   <p>GMT +5:30</p>
                </div>
                <p className="font-['Inter_Display',sans-serif] font-medium text-[18px] text-[#fffcf3] tracking-[-0.6px]">
                   12.9826° N, 77.7377° E
                </p>
             </div>
             
             <div className="flex items-start gap-1 font-['Inter_Display',sans-serif] font-medium text-[18px] text-[#fffcf3] tracking-[-0.6px]">
               <span className="relative z-10">&copy; 2026</span>
             </div>
          </div>
        </div>
      )}

      {/* ── MAIN CONTENT (Hero / Process / Gallery) ── */}
      {/* Slides over the sticky footer, then leaves a transparent spacer behind */}
      <div 
        className="relative z-10 w-full bg-[#090909]" 
        style={nextProject ? { marginTop: "-100vh" } : undefined}
      >
      {/* ── HERO ── */}
      <section className="w-full bg-[#090909] pt-16 pb-0 px-[98px] relative overflow-hidden">
        <h1
          className="font-['Mango_Grotesque',sans-serif] text-[clamp(80px,17vw,280px)] text-[#fffcf3] leading-none text-center w-full tracking-tight"
          style={{ fontWeight: 400 }}
        >
          {project.displayTitle}
        </h1>

        {/* Divider */}
        <div className="w-full h-px bg-white/20 mt-2" />

        {/* Tags + Tech Icons row */}
        <div className="flex items-center justify-between mt-8 pb-8">
          {/* Tags */}
          <div className="flex gap-[21px] flex-wrap">
            {project.tags.map((tag) => (
              <div
                key={tag}
                className="bg-[#fffcf3] rounded-[9px] px-[16px] py-[7px] flex items-center justify-center"
              >
                <span className="font-['Inter_Display',sans-serif] font-medium text-black leading-none tracking-[-1.2px] whitespace-nowrap text-[18px]">
                  {tag}
                </span>
              </div>
            ))}
          </div>

          {/* Tech Stack Icons — 44.5px version */}
          <div className="flex gap-[10px]">
            {project.techStack.map((tech) => (
              <div
                key={tech.name}
                title={tech.name}
                className="border-[0.297px] border-[#fffcf3] flex items-center justify-center p-[9px] rounded-[6px] size-[44px] bg-transparent overflow-hidden shrink-0"
              >
                <img
                  src={tech.src}
                  alt={tech.name}
                  className="w-full h-full object-contain opacity-90"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Category / Role / Team card */}
        <div className="border border-white/15 rounded-[17px] w-full mt-[70px] mb-[100px] px-12 py-8 flex flex-row items-stretch justify-between gap-6">
          <div className="flex flex-col gap-[18px] flex-1 min-w-0 pr-4">
            <p className="font-['Inter_Display',sans-serif] font-medium text-[24px] text-white/60 tracking-[-0.72px]">
              CATEGORY
            </p>
            <p className="font-['Inter_Display',sans-serif] text-[35px] text-[#fffcf3] tracking-[-1.2px] break-words whitespace-normal leading-[1.1]">
              {project.category}
            </p>
          </div>
          
          <div className="flex flex-col gap-[18px] items-center text-center flex-1 min-w-0 px-4">
            <p className="font-['Inter_Display',sans-serif] font-medium text-[24px] text-white/60 tracking-[-0.72px]">
              ROLE
            </p>
            <div className="relative inline-block text-center max-w-full">
              <p className="font-['Inter_Display',sans-serif] text-[35px] text-[#fffcf3] tracking-[-1.2px] break-words whitespace-normal leading-[1.1]">
                {project.role}
              </p>
              <FloatingCursor />
            </div>
          </div>
          
          <div className="flex flex-col gap-[18px] items-end text-right flex-1 min-w-0 pl-4">
            <p className="font-['Inter_Display',sans-serif] font-medium text-[24px] text-white/60 tracking-[-0.72px]">
              TEAM
            </p>
            <p className="font-['Inter_Display',sans-serif] text-[35px] text-[#fffcf3] tracking-[-1.2px] break-words whitespace-normal leading-[1.1]">
              {project.team}
            </p>
          </div>
        </div>

        {/* ── Overview / Challenge / Reflection ── */}
        <div className="flex items-start justify-between w-full gap-8 pb-24">

          {/* Left Nav — ellipse measured from real DOM */}
          <div className="relative w-[200px] shrink-0" ref={navContainerRef}>
            <motion.div
              className="absolute left-0 w-[7px] h-[7px] rounded-full bg-[#fffcf3] pointer-events-none"
              animate={{ top: ellipseY }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            />
            <div className="flex flex-col pl-5">
              {tabs.map(({ key, label }) => (
                <button
                  key={key}
                  ref={navItemRefs[key]}
                  data-cursor="dot-only"
                  onMouseEnter={() => handleHoverIn(key)}
                  onMouseLeave={handleHoverOut}
                  className={`font-['Inter_Display',sans-serif] font-medium text-[28px] leading-normal tracking-[-0.9px] text-left transition-opacity duration-300 ${
                    displayTab === key ? "opacity-100" : "opacity-35"
                  } text-[#fffcf3]`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Center Paragraph */}
          <div className="flex-1 max-w-[800px] mx-auto text-[#fffcf3] font-['Inter_Display',sans-serif] text-[28px] leading-[1.2] tracking-[-0.85px] text-center shrink-0 min-h-[220px]">
            <CascadeText text={tabContent[displayTab]} trigger={tabTrigger} />
          </div>

          {/* Right Nav — mirrored, shares same hover state */}
          <div className="relative w-[200px] shrink-0">
            <motion.div
              className="absolute right-0 w-[7px] h-[7px] rounded-full bg-[#fffcf3] pointer-events-none"
              animate={{ top: ellipseY }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            />
            <div className="flex flex-col pr-5 items-end">
              {tabs.map(({ key, label }) => (
                <button
                  key={key}
                  data-cursor="dot-only"
                  onMouseEnter={() => handleHoverIn(key)}
                  onMouseLeave={handleHoverOut}
                  className={`font-['Inter_Display',sans-serif] font-medium text-[28px] leading-normal tracking-[-0.9px] text-right transition-opacity duration-300 ${
                    displayTab === key ? "opacity-100" : "opacity-35"
                  } text-[#fffcf3]`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* ── SYSTEM ARCHITECTURE ── */}
      {project.hasArchitecture && (
        <div className="w-full max-w-[1920px] mx-auto flex justify-center pb-24 mt-[100px] mb-[100px]">
          <div className="flex flex-col items-center w-full px-6 sm:px-12 md:px-24">
             {Object.entries(import.meta.glob<{ default: string }>('/src/assets/projects/**/*.{png,jpg,jpeg,webp,gif}', { eager: true }))
               .find(([path]) => path.includes(`/projects/${project.slug}/`) && path.toLowerCase().includes("-arch")) ? (
                 <img 
                   src={Object.entries(import.meta.glob<{ default: string }>('/src/assets/projects/**/*.{png,jpg,jpeg,webp,gif}', { eager: true })).find(([path]) => path.includes(`/projects/${project.slug}/`) && path.toLowerCase().includes("-arch"))?.[1].default}
                   alt="System Architecture" 
                   className="w-full h-auto object-contain" 
                 />
             ) : (
                <div className="w-full h-[600px] border border-white/20 flex items-center justify-center text-white/50 font-['Inter_Display',sans-serif]">
                  [Architecture Image Placeholder: Save your Figma export explicitly with '-arch' in the name. E.g., 'nocaine-arch.png' in src/assets/projects/nocaine/]
                </div>
             )}
          </div>
        </div>
      )}

      {/* ── GALLERY ── */}
      <GallerySection slug={project.slug} />

      {/* ── PROCESS (white bg, parallax scroll-up) ── */}
      <div
        ref={processSectionRef}
        className="relative w-full"
        style={{ zIndex: 10 }}
      >
        <motion.div
          ref={processRef}
          className="w-full bg-[#fffcf3] relative overflow-hidden"
          style={{ y: processY, opacity: processOpacity }}
        >
          <div className="px-[98px] pt-[72px] pb-[100px] max-w-[1920px] mx-auto">
            {/* Heading */}
            <div className="text-center mb-6">
              <h2
                className="font-['Mango_Grotesque',sans-serif] text-[clamp(80px,13vw,220px)] text-black leading-none tracking-tight"
                style={{ fontWeight: 400 }}
              >
                THE PROCESS
              </h2>
              <p className="font-['Inter_Display',sans-serif] font-medium text-[36px] text-black tracking-[-1.3px]">
                <MoveUpText>FROM CONCEPT TO REALITY</MoveUpText>
              </p>
            </div>

            {/* Divider */}
            <div className="w-full h-px bg-black/60 my-10" />

            {/* Two columns */}
            <div ref={processListRef} className="flex items-start justify-between gap-16 mt-12">
              {/* What was done */}
              <div className="flex-1">
                <p className="font-['Inter_Display',sans-serif] font-semibold text-[26px] text-black tracking-[-0.8px] mb-7">
                  <MoveUpText>WHAT WAS DONE</MoveUpText>
                </p>
                <div className="flex flex-col gap-6">
                  {project.whatWasDone.map((item, i) => (
                    <ProcessItem key={i} text={item} delay={i * 0.2} visible={processListVisible} />
                  ))}
                </div>
              </div>

              {/* What was built */}
              <div className="flex-1">
                <p className="font-['Inter_Display',sans-serif] font-semibold text-[26px] text-black tracking-[-0.8px] mb-7">
                  <MoveUpText>WHAT WAS BUILT</MoveUpText>
                </p>
                <div className="flex flex-col gap-6">
                  {project.whatWasBuilt.map((item, i) => (
                    <ProcessItem key={i} text={item} delay={i * 0.2 + 0.15} visible={processListVisible} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      </div> {/* End of Main Content Wrap */}

      {/* ── Transparent Full-Height Spacer for the Reveal ── */}
      {nextProject && (
        <div className="w-full h-screen relative z-0 pointer-events-none" />
      )}
      </motion.div>
  );
}

export default function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>();

  return (
    <AnimatePresence>
      {slug && <ProjectContent key={slug} slug={slug} />}
    </AnimatePresence>
  );
}

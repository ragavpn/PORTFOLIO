import React, { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "motion/react";
import { useNavigate } from "react-router";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TechMarquee } from "./TechMarquee";
import { projectsData as projects } from "../data/projectsData";
gsap.registerPlugin(ScrollTrigger);

/**
 * Dynamic URL-Aware Interactive Projects Strategy.
 * 
 * Orchestrates a physics-based layout expansion grid synchronizing Framer Motion layout states
 * natively against GSAP/Lenis boundaries. Operates via URL parameter synchronization (`?domain=...`) 
 * for stateless filtering deep linking, managing high-inertia physics mapping for 
 * dynamic component mount/unmount lists.
 * 
 * @returns {JSX.Element} Fluid project grid scaling bounds structurally across multiple axis depths.
 */
export function Projects() {
  const navigate = useNavigate();

  // Load local projects dynamically to supply the hover preview
  const allImages = import.meta.glob<{ default: string }>('/src/assets/projects/**/*.{png,jpg,jpeg,webp,gif}', { eager: true });

  const toSlug = (title: string) =>
    title.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");

  const handleProjectClick = (title: string) => {
    const slug = toSlug(title);
    const currentScroll = (window as any).lenis?.scroll ?? window.scrollY;
    sessionStorage.setItem("portfolioScrollY", String(currentScroll));

    // Create overlay that persists through the route change
    // (it's a raw DOM element so React's unmount doesn't remove it)
    const overlay = document.createElement("div");
    overlay.id = "project-transition-overlay";
    overlay.style.cssText =
      "position:fixed;inset:0;background:#090909;z-index:9999;opacity:0;transition:opacity 0.3s ease;pointer-events:all;";
    document.body.appendChild(overlay);
    const bar = document.createElement("div");
    bar.id = "project-transition-bar";
    bar.style.cssText =
      "position:fixed;top:0;left:0;height:4px;background:#fffcf3;width:0%;z-index:10000;transition:width 1.1s cubic-bezier(0.16,1,0.3,1);pointer-events:none;";
    document.body.appendChild(bar);
    requestAnimationFrame(() => {
      overlay.style.opacity = "0.97"; // Near-opaque to hide transition
      bar.style.width = "100%";
    });
    if ((window as any).lenis) (window as any).lenis.stop();
    sessionStorage.setItem("portfolio_nav", "1");
    // Navigate WHILE overlay is still covering the screen
    setTimeout(() => navigate(`/${slug}`), 1200);
  };

  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [filterDomain, setFilterDomain] = useState<string | null>(null);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  /**
   * Brute-force GSAP trigger offsets sequentially along Framer Layout transitions.
   * Schedules explicit timed refreshes aligning sequentially against Framer Motion's actual DOM
   * footprint elasticity, guaranteeing Lenis absolute limits recalculate perfectly iteratively 
   * over the length of the 2000ms UX fall loops.
   */
  useEffect(() => {
    // Schedule highly robust synchronized layout refreshes mapping Framer Motion's physical expansion math dynamically
    const timers = [100, 300, 600, 1000, 1500, 2500].map(delay => 
      setTimeout(() => {
        ScrollTrigger.refresh();
        if ((window as any).lenis) (window as any).lenis.resize();
      }, delay)
    );

    return () => timers.forEach(clearTimeout);
  }, [isExpanded, filterDomain]);

  // URL State hook
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const domain = searchParams.get("domain");
    if (domain === "software" || domain === "design") {
      setFilterDomain(domain);
    }
  }, []);

  const handleFilterClick = (domain: string) => {
    const newDomain = filterDomain === domain ? null : domain;
    setFilterDomain(newDomain);
    
    const url = new URL(window.location.href);
    if (!newDomain) {
      url.searchParams.delete("domain");
    } else {
      url.searchParams.set("domain", newDomain);
    }
    window.history.pushState({}, "", url.toString());
  };

  const defaultProjectsTitles = ["Internal Tool", "Causal Reasoning", "Hypothesis Interpolation", "Median", "Ballast"];

  const baseProjectsList = isExpanded 
       ? projects 
       : projects.filter(p => defaultProjectsTitles.includes(p.title));

  const displayedProjects = filterDomain 
       ? baseProjectsList.filter(p => p.domain === filterDomain)
       : baseProjectsList;

  const handleExploreAll = () => {
    if (isExpanded) {
      setIsExpanded(false);
      if (containerRef.current) {
        window.scrollTo({
           top: containerRef.current.offsetTop,
           behavior: "smooth"
        });
      }
    } else {
      setIsExpanded(true);
      if (containerRef.current) {
        window.scrollTo({
           top: containerRef.current.offsetTop,
           behavior: "smooth"
        });
      }
    }
  };

  // Motion values for smooth mouse tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 200, mass: 0.5 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  return (
    <section id="projects-section"
      ref={containerRef}
      className="relative w-full bg-[#090909] py-32 px-6 sm:px-12 md:px-24 flex justify-center overflow-hidden min-h-screen"
      style={{ willChange: "transform" }} // Add hardware accelerate layout safety
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setHoveredIndex(null)}
    >
      <style>
        {`
          @keyframes tv-static {
            0% { transform: translate(0, 0); }
            10% { transform: translate(-1%, -1%); }
            20% { transform: translate(-2%, 1%); }
            30% { transform: translate(1%, -2%); }
            40% { transform: translate(-1%, 3%); }
            50% { transform: translate(-2%, 1%); }
            60% { transform: translate(3%, 0); }
            70% { transform: translate(0, 2%); }
            80% { transform: translate(-3%, 0); }
            90% { transform: translate(2%, 1%); }
            100% { transform: translate(0, 0); }
          }
        `}
      </style>
      
      {/* TV Static Overlay */}
      <div 
        className="pointer-events-none absolute inset-0 z-20 mix-blend-screen overflow-hidden opacity-[0.18]"
      >
        <div 
          className="w-[110%] h-[110%] -left-[5%] -top-[5%] absolute"
          style={{ animation: 'tv-static 0.3s steps(1) infinite' }}
        >
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <filter id="noiseFilter">
              <feTurbulence 
                type="fractalNoise" 
                baseFrequency="0.45" 
                numOctaves="3" 
                stitchTiles="stitch"
              />
              <feColorMatrix 
                type="matrix" 
                values="1 0 0 0 0
                        1 0 0 0 0
                        1 0 0 0 0
                        0 0 0 1 0" 
              />
            </filter>
            <rect width="100%" height="100%" filter="url(#noiseFilter)" />
          </svg>
        </div>
      </div>

      <div className="w-full max-w-[1694px] mx-auto flex flex-col relative z-10 transition-all duration-700 ease-in-out">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between text-white pb-0 gap-8 md:gap-0">
          <div className="font-['Inter_Display',sans-serif] font-medium text-[clamp(20px,2vw,30px)] opacity-70 tracking-[-1.8px] leading-[0.87]">
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.div 
                 key={isExpanded ? "all" : "selected"}
                 initial={{ opacity: 0, y: 15, filter: "blur(4px)" }}
                 animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                 exit={{ opacity: 0, y: -15, filter: "blur(4px)" }}
                 transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                 className="whitespace-nowrap"
              >
                 {isExpanded ? "All Works" : "Selected Works"}
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex items-center gap-6 md:gap-10">
            {/* Filter Pills */}
            <div className="flex gap-2 sm:gap-4 font-['Inter_Display',sans-serif] text-[16px] sm:text-[20px] font-medium">
               <motion.button 
                 layout
                 transition={{ layout: { duration: 1, ease: [0.16, 1, 0.3, 1] } }}
                 onClick={() => handleFilterClick("software")} 
                 className={`px-[18px] py-[5px] border rounded-[9px] transition-colors duration-[1000ms] flex items-center gap-2 group ${filterDomain === "software" ? "bg-white border-white text-black" : "bg-transparent border-white/20 text-white/50 hover:border-white/50 hover:text-white"}`}
                 title={filterDomain === "software" ? "Clear Software filter" : "Filter by Software"}
               >
                 <motion.span layout="position">Software</motion.span>
                 <AnimatePresence>
                 {filterDomain === "software" && (
                   <motion.span 
                     layout="position"
                     initial={{ width: 0, opacity: 0, scale: 0.5, marginLeft: -8 }}
                     animate={{ width: 18, opacity: 0.6, scale: 1, marginLeft: 0 }}
                     exit={{ width: 0, opacity: 0, scale: 0.5, marginLeft: -8 }}
                     transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                     className="flex items-center justify-center -mr-1 h-[18px] rounded-full bg-black/10 text-[11px] font-bold group-hover:opacity-100 group-hover:bg-black/20 font-sans overflow-hidden whitespace-nowrap"
                   >
                     ✕
                   </motion.span>
                 )}
                 </AnimatePresence>
               </motion.button>
               <motion.button 
                 layout
                 transition={{ layout: { duration: 1, ease: [0.16, 1, 0.3, 1] } }}
                 onClick={() => handleFilterClick("design")} 
                 className={`px-[18px] py-[5px] border rounded-[9px] transition-colors duration-[1000ms] flex items-center gap-2 group ${filterDomain === "design" ? "bg-white border-white text-black" : "bg-transparent border-white/20 text-white/50 hover:border-white/50 hover:text-white"}`}
                 title={filterDomain === "design" ? "Clear Design filter" : "Filter by Design"}
               >
                 <motion.span layout="position">Design</motion.span>
                 <AnimatePresence>
                 {filterDomain === "design" && (
                   <motion.span 
                     layout="position"
                     initial={{ width: 0, opacity: 0, scale: 0.5, marginLeft: -8 }}
                     animate={{ width: 18, opacity: 0.6, scale: 1, marginLeft: 0 }}
                     exit={{ width: 0, opacity: 0, scale: 0.5, marginLeft: -8 }}
                     transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                     className="flex items-center justify-center -mr-1 h-[18px] rounded-full bg-black/10 text-[11px] font-bold group-hover:opacity-100 group-hover:bg-black/20 font-sans overflow-hidden whitespace-nowrap"
                   >
                     ✕
                   </motion.span>
                 )}
                 </AnimatePresence>
               </motion.button>
            </div>
            {/* Explore Target */}
            <p 
              onClick={handleExploreAll} 
              className="font-['Inter_Display',sans-serif] font-medium text-[clamp(20px,2vw,30px)] opacity-70 tracking-[-1.8px] underline decoration-solid leading-[0.87] cursor-pointer hover:opacity-100 transition-opacity whitespace-nowrap"
            >
              {isExpanded ? "Collapse" : "Explore All"}
            </p>
          </div>
        </div>

        <TechMarquee />

        {/* Projects List */}
        <motion.div 
          layout
          className="flex flex-col w-full relative min-h-[650px]"
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <AnimatePresence>
            {displayedProjects.map((project, i) => {
              // Extract the true global index for stable image hover mapping regardless of active filters
              const globalIndex = projects.findIndex(p => p.title === project.title);

              return (
              <motion.div 
                layout
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0, filter: "blur(4px)" }}
                transition={{ 
                   opacity: { duration: isExpanded ? 0.8 : 0.4 },
                   height: { 
                      type: "spring", 
                      stiffness: isExpanded ? 80 : 160, 
                      damping: isExpanded ? 24 : 22, 
                      mass: isExpanded ? 1.8 : 1.2 
                   },
                   filter: { duration: isExpanded ? 0.8 : 0.4 },
                   delay: i * (isExpanded ? 0.07 : 0.05) 
                }}
                key={project.title}
                className={`flex flex-col w-full relative ${project.hasContent ? "group cursor-pointer" : "group cursor-default opacity-40 hover:opacity-100 transition-opacity"}`}
                onMouseEnter={() => setHoveredIndex(globalIndex)}
                onClick={() => {
                  if (project.hasContent) handleProjectClick(project.title);
                }}
                data-cursor="hidden"
              >
                {/* Top border line */}
                <div className="w-full h-px bg-white/20" />

                {/* Main Content Wrapper allowing programmatic shifting of heights! */}
                <motion.div 
                  layout="position"
                  className={`flex items-center justify-between w-full transition-all duration-[600ms] ease-out 
                    ${hoveredIndex !== null && hoveredIndex !== globalIndex ? "opacity-30 blur-[2px]" : "opacity-100 blur-0"} 
                    ${isExpanded ? "py-[22px]" : "py-[30px]"}`
                  }
                >
                  
                  {/* Title & Tags Container */}
                  <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-11 transform transition-transform duration-500 ease-out group-hover:translate-x-4">
                    <h2 className={`font-['Instrument_Serif'] italic text-white transition-all duration-500 ease-out leading-[0.87] tracking-[-1.4px] m-0 ${isExpanded ? "text-[clamp(35px,4vw,55px)]" : "text-[clamp(40px,5vw,70px)]"}`}>
                      {project.title}
                    </h2>
                    
                    {/* Tags */}
                    <div className="flex flex-wrap items-center gap-3">
                      {project.tags.map((tag, tagIndex) => (
                        <div 
                          key={tagIndex} 
                          className="bg-[#fffcf3] rounded-[9px] px-[16px] py-[7px] flex items-center justify-center transition-transform duration-300 group-hover:scale-105"
                        >
                          <span className="font-['Inter_Display',sans-serif] font-medium text-black leading-[0.87] tracking-[-1.2px] whitespace-nowrap text-[18px]">
                            {tag}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Calculated Virtual Index */}
                  <span className={`font-['Instrument_Serif'] italic text-white leading-[0.87] opacity-80 group-hover:opacity-100 transition-all duration-300 ${isExpanded ? "text-[clamp(20px,2vw,30px)]" : "text-[clamp(24px,3vw,37px)]"}`}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </motion.div>
              </motion.div>
            )})}
          </AnimatePresence>
          {/* Bottom border for the last live item */}
          <motion.div layout className="w-full h-px bg-white/20" />
        </motion.div>
      </div>

      {/* Floating Browser Mockup for Hover Effects */}
      <motion.div
        style={{
          x,
          y,
          translateX: "-50%",
          translateY: "-50%",
        }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{
          opacity: hoveredIndex !== null ? 1 : 0,
          scale: hoveredIndex !== null ? 1 : 0.8,
        }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="absolute top-0 left-0 w-[500px] h-[330px] z-50 pointer-events-none rounded-xl overflow-hidden shadow-2xl flex flex-col border border-white/10"
      >
        {/* Browser Chrome Top Bar */}
        <div className="h-9 w-full bg-[#1a1a1a]/90 backdrop-blur-md flex items-center px-4 relative z-10">
          {/* Traffic Lights */}
          <div className="flex items-center gap-[6px]">
            <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
            <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
            <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
          </div>
          {/* URL Bar */}
          <div className="flex-1 flex justify-center absolute inset-0 pointer-events-none items-center">
            <div className="bg-white/5 rounded-md px-16 py-1 flex items-center justify-center">
              <span className="text-[11px] text-white/50 font-['Inter_Display',sans-serif] tracking-wide">
                ragavwithouttheh.work
              </span>
            </div>
          </div>
        </div>

        {/* Browser Content (Project Image) */}
        <div className="flex-1 relative bg-black overflow-hidden">
          <AnimatePresence mode="popLayout">
            {hoveredIndex !== null && (
              <motion.img
                key={hoveredIndex}
                src={(() => {
                  const p = projects[hoveredIndex];
                  const all = Object.entries(allImages).filter(([path]) =>
                    path.toLowerCase().includes(`/projects/${p.slug}/`)
                  );
                  // Prefer a file explicitly named "preview.*"
                  const preview = all.find(([path]) => path.toLowerCase().includes("/preview."));
                  if (preview) return preview[1].default;
                  // Otherwise first gallery image (excluding special assets)
                  const gallery = all.filter(([path]) => {
                    const lower = path.toLowerCase();
                    return !lower.includes("-arch") && !lower.includes("app flow");
                  });
                  return gallery.length > 0 ? gallery[0][1].default : p.image;
                })()}
                alt="Project Preview"
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className={(() => {
                  const p = projects[hoveredIndex];
                  const all = Object.entries(allImages).filter(([path]) =>
                    path.toLowerCase().includes(`/projects/${p.slug}/`)
                  );
                  const hasPreview = all.some(([path]) => path.toLowerCase().includes("/preview."));
                  // preview image: fit to width, center vertically; mobile without preview: same; else: cover
                  if (hasPreview || p.mobileGallery) return "absolute left-0 top-1/2 -translate-y-1/2 w-full h-auto";
                  return "absolute inset-0 w-full h-full object-cover";
                })()}
              />
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </section>
  );
}

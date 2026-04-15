import React, { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "motion/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: "Internal Tool",
    domain: "software",
    tags: ["Full Stack", "React"],
    image: "https://images.unsplash.com/photo-1720962158883-b0f2021fb51e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB3ZWIlMjBhcHAlMjBkYXNoYm9hcmQlMjBpbnRlcmZhY2V8ZW58MXx8fHwxNzc1OTI5Njc1fDA&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    title: "AI Therapist",
    domain: "software",
    tags: ["Natural Language Processing", "Mental Health Tech"],
    image: "https://images.unsplash.com/photo-1775440285627-ce48346bc58c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGF0Ym90JTIwY29udmVyc2F0aW9uYWwlMjBhaSUyMGludGVyZmFjZXxlbnwxfHx8fDE3NzU5Mjk2NzZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    title: "Nocaine",
    domain: "software",
    tags: ["Microservices", "Cybersecurity"],
    image: "https://images.unsplash.com/photo-1608742213509-815b97c30b36?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjeWJlcnNlY3VyaXR5JTIwY29kZSUyMHNjcmVlbiUyMGFic3RyYWN0fGVufDF8fHx8MTc3NTkyOTY3NXww&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    title: "Hypothesis Interpolation",
    domain: "software",
    tags: ["Data Science", "Python"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1080",
  },
  {
    title: "DonkeyCar",
    domain: "software",
    tags: ["Autonomous", "Robotics"],
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=1080",
  },
  {
    title: "Causal Reasoning",
    domain: "software",
    tags: ["Machine Learning", "Research"],
    image: "https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&q=80&w=1080",
  },
  {
    title: "Weld Detection",
    domain: "software",
    tags: ["Computer Vision", "Industrial"],
    image: "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&q=80&w=1080",
  },
  {
    title: "Cosmic Carnage",
    domain: "software",
    tags: ["Game Dev", "C#"],
    image: "https://images.unsplash.com/photo-1614294149010-950b698f72c0?auto=format&fit=crop&q=80&w=1080",
  },
  {
    title: "Neuron",
    domain: "software",
    tags: ["Neural Networks", "AI"],
    image: "https://images.unsplash.com/photo-1620712948343-0008cc890662?auto=format&fit=crop&q=80&w=1080",
  },
  {
    title: "Median",
    domain: "design",
    tags: ["UI / UX"],
    image: "https://images.unsplash.com/photo-1706509511838-4b101f379ef3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsaXN0JTIwdWklMjB1eCUyMGRlc2lnbiUyMHByb3RvdHlwZXxlbnwxfHx8fDE3NzU5Mjk2NzV8MA&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    title: "Ballast",
    domain: "design",
    tags: ["UI / UX", "Mobile App"],
    image: "https://images.unsplash.com/photo-1773611814475-e80ea69a4f2c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsaXN0JTIwbW9iaWxlJTIwYXBwJTIwaW50ZXJmYWNlJTIwb24lMjBwaG9uZXxlbnwxfHx8fDE3NzU5Mjk2NzV8MA&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    title: "Homebase",
    domain: "design",
    tags: ["Product Design", "Web App"],
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1080"
  },
  {
    title: "Eventozo",
    domain: "design",
    tags: ["Event Management", "App Design"],
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=1080"
  },
  {
    title: "Pragyan 2026",
    domain: "design",
    tags: ["Brand Identity", "Print"],
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=1080"
  },
  {
    title: "Lunar Crater",
    domain: "design",
    tags: ["3D Modeling", "Concept Art"],
    image: "https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?auto=format&fit=crop&q=80&w=1080"
  },
  {
    title: "Mental Health Chatbot",
    domain: "design",
    tags: ["Conversational UI", "Empathy"],
    image: "https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&q=80&w=1080"
  }
];

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

  const defaultProjectsTitles = ["Internal Tool", "AI Therapist", "Nocaine", "Median", "Ballast"];

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
      
      {/* TV Static Background */}
      <div 
        className="pointer-events-none absolute inset-0 z-0 mix-blend-screen overflow-hidden opacity-[0.18]"
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
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between text-white pb-[90px] gap-8 md:gap-0">
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
                className="flex flex-col w-full relative group cursor-pointer overflow-hidden"
                onMouseEnter={() => setHoveredIndex(globalIndex)}
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
                src={projects[hoveredIndex].image}
                alt="Project Preview"
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="absolute inset-0 w-full h-full object-cover"
              />
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </section>
  );
}

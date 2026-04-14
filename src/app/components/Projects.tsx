import React, { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "motion/react";

const projects = [
  {
    title: "Internal Tool",
    tags: ["Full Stack"],
    number: "01",
    image: "https://images.unsplash.com/photo-1720962158883-b0f2021fb51e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB3ZWIlMjBhcHAlMjBkYXNoYm9hcmQlMjBpbnRlcmZhY2V8ZW58MXx8fHwxNzc1OTI5Njc1fDA&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    title: "AI Therapist",
    tags: ["Natural Language Processing", "Mental Health Tech"],
    number: "02",
    image: "https://images.unsplash.com/photo-1775440285627-ce48346bc58c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGF0Ym90JTIwY29udmVyc2F0aW9uYWwlMjBhaSUyMGludGVyZmFjZXxlbnwxfHx8fDE3NzU5Mjk2NzZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    title: "Nocaine",
    tags: ["Microservices", "Cybersecurity"],
    number: "03",
    image: "https://images.unsplash.com/photo-1608742213509-815b97c30b36?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjeWJlcnNlY3VyaXR5JTIwY29kZSUyMHNjcmVlbiUyMGFic3RyYWN0fGVufDF8fHx8MTc3NTkyOTY3NXww&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    title: "Median",
    tags: ["UI / UX"],
    number: "04",
    image: "https://images.unsplash.com/photo-1706509511838-4b101f379ef3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsaXN0JTIwdWklMjB1eCUyMGRlc2lnbiUyMHByb3RvdHlwZXxlbnwxfHx8fDE3NzU5Mjk2NzV8MA&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    title: "Ballast",
    tags: ["UI / UX", "Mobile App"],
    number: "05",
    image: "https://images.unsplash.com/photo-1773611814475-e80ea69a4f2c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsaXN0JTIwbW9iaWxlJTIwYXBwJTIwaW50ZXJmYWNlJTIwb24lMjBwaG9uZXxlbnwxfHx8fDE3NzU5Mjk2NzV8MA&ixlib=rb-4.1.0&q=80&w=1080",
  }
];

export function Projects() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
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
      className="relative w-full bg-[#090909] py-32 px-6 sm:px-12 md:px-24 flex justify-center overflow-hidden"
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

      <div className="w-full max-w-[1694px] mx-auto flex flex-col relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between text-white px-[0px] pt-[0px] pb-[90px]">
          <p className="font-['Inter_Display',sans-serif] font-medium text-[clamp(20px,2vw,30px)] opacity-70 tracking-[-1.8px] leading-[0.87]">
            Selected Works
          </p>
          <p className="font-['Inter_Display',sans-serif] font-medium text-[clamp(20px,2vw,30px)] opacity-70 tracking-[-1.8px] underline decoration-solid leading-[0.87] cursor-pointer hover:opacity-100 transition-opacity">
            Explore All
          </p>
        </div>

        {/* Projects List */}
        <div 
          className="flex flex-col w-full relative"
          onMouseLeave={() => setHoveredIndex(null)}
        >
          {projects.map((project, i) => (
            <div 
              key={i}
              className="flex flex-col w-full relative group cursor-pointer"
              onMouseEnter={() => setHoveredIndex(i)}
              data-cursor="hidden"
            >
              {/* Top border line */}
              <div className="w-full h-px bg-white/20" />

              <div className={`flex items-end justify-between w-full transition-all duration-500 ${hoveredIndex !== null && hoveredIndex !== i ? "opacity-30" : "opacity-100"} m-[0px] px-[0px] py-[30px]`}>
                
                {/* Title & Tags Container */}
                <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-11 transform transition-transform duration-500 ease-out group-hover:translate-x-4">
                  <h2 className="font-['Instrument_Serif'] italic text-white text-[clamp(40px,5vw,70px)] leading-[0.87] tracking-[-1.4px] m-0">
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

                {/* Number */}
                <span className="font-['Instrument_Serif'] italic text-white text-[clamp(24px,3vw,37px)] leading-[0.87] opacity-80 group-hover:opacity-100 transition-opacity duration-300">
                  {project.number}
                </span>
              </div>
            </div>
          ))}
          {/* Bottom border for the last item */}
          <div className="w-full h-px bg-white/20" />
        </div>
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

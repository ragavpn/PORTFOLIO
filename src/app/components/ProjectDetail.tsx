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


// ─── Timelapse Video Player ──────────────────────────────────────────────────
function TimelapseVideoPlayer({ videoSrc }: { videoSrc: string }) {
  const [isHovered, setIsHovered] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  // Modal Player Internal States
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  const togglePlay = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (videoRef.current) {
      if (isPlaying) videoRef.current.pause();
      else videoRef.current.play();
      setIsPlaying(!isPlaying);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (videoRef.current) {
      videoRef.current.currentTime = (value / 100) * duration;
      setProgress(value);
    }
  };

  const skipForward = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.currentTime = Math.min(videoRef.current.currentTime + 10, duration);
    }
  };

  return (
    <>
      <div 
        className="w-full relative cursor-pointer group"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => setModalOpen(true)}
        data-cursor="CLICK"
      >
        <video 
           src={videoSrc}
           autoPlay
           loop
           muted
           playsInline
           className="w-full h-auto rounded-[17px] shadow-2xl overflow-hidden border border-white/10 opacity-90 transition-opacity hover:opacity-100"
        />
        
        {/* Hover Expand Icon */}
        <AnimatePresence>
          {isHovered && (
             <motion.div
               initial={{ opacity: 0, scale: 0.9 }}
               animate={{ opacity: 1, scale: 1 }}
               exit={{ opacity: 0, scale: 0.9 }}
               className="absolute bottom-4 right-4 bg-[#fffcf3]/10 backdrop-blur-md rounded-[12px] p-3 border border-white/20 shadow-lg pointer-events-none"
             >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15 3H21V9M9 21H3V15M21 3L14 10M3 21L10 14" stroke="#FFFCF3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
             </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Full-Screen Lightbox Modal */}
      <AnimatePresence>
         {modalOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[#090909]/80 backdrop-blur-md"
              onClick={() => {
                if(videoRef.current) videoRef.current.pause();
                setModalOpen(false);
              }}
              onWheel={(e) => e.stopPropagation()}
              data-cursor="dot-only"
            >
               <motion.div
                  initial={{ scale: 0.95, opacity: 0, y: 20 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  exit={{ scale: 0.95, opacity: 0, y: 20 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="relative w-full max-w-[1200px] px-8 flex flex-col items-center gap-6 cursor-auto"
                  onClick={(e) => e.stopPropagation()}
               >
                  <video 
                     ref={videoRef}
                     src={videoSrc}
                     playsInline
                     className="w-full h-auto max-h-[80vh] rounded-[16px] shadow-2xl bg-black border border-white/10"
                     onTimeUpdate={() => {
                        if(videoRef.current && duration > 0) {
                           setProgress((videoRef.current.currentTime / duration) * 100);
                        }
                     }}
                     onLoadedMetadata={() => {
                        if(videoRef.current) {
                          setDuration(videoRef.current.duration);
                          videoRef.current.play().catch(()=>console.log("Autoplay prevented"));
                        }
                        setIsPlaying(true);
                     }}
                     onEnded={() => setIsPlaying(false)}
                     onClick={togglePlay}
                  />

                  {/* Custom Bottom Playback Controls */}
                  <div className="absolute bottom-6 left-[50%] -translate-x-[50%] flex items-center gap-6 bg-[#1a1a1a]/80 backdrop-blur-lg border border-white/15 px-8 py-4 rounded-full shadow-2xl w-max">
                     <button onClick={togglePlay} className="text-[#fffcf3] hover:opacity-70 transition-opacity outline-none" data-cursor="CLICK">
                        {isPlaying ? (
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                             <rect x="6" y="4" width="4" height="16" fill="currentColor"/>
                             <rect x="14" y="4" width="4" height="16" fill="currentColor"/>
                          </svg>
                        ) : (
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                             <path d="M8 5V19L19 12L8 5Z" fill="currentColor"/>
                          </svg>
                        )}
                     </button>
                     <button onClick={skipForward} className="text-[#fffcf3] hover:opacity-70 transition-opacity outline-none relative group flex items-center justify-center p-1" data-cursor="CLICK">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                           <path d="M10 16a6 6 0 1 1 5-11.45V2"/>
                           <path d="M15 2l5 2.5L15 7"/>
                        </svg>
                        <span className="absolute text-[8px] font-bold pt-1 pr-[2px]">10</span>
                     </button>

                     <input 
                        type="range" 
                        min="0" 
                        max="100" 
                        value={progress || 0}
                        onChange={handleSeek}
                        className="w-[300px] md:w-[400px] h-1.5 bg-white/20 rounded-lg appearance-none cursor-pointer outline-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-[#fffcf3] [&::-webkit-slider-thumb]:rounded-full"
                        data-cursor="CLICK"
                     />
                  </div>
               </motion.div>
            </motion.div>
         )}
      </AnimatePresence>
    </>
  );
}

// ─── Hypothesis Interpolation Section ────────────────────────────────────────
// ─── Pragyan 2026: Insights and Timeline ────────────────────────────────────
function PragyanInsightsSection() {
  const allImgs = import.meta.glob<{ default: string }>('/src/assets/projects/**/*.{png,jpg,jpeg,webp,gif}', { eager: true });
  const timelineImg = Object.entries(allImgs).find(([p]) => p.toLowerCase().includes('/pragyan-2026/') && p.toLowerCase().includes('timeline'))?.[1].default;
  const empathyImg  = Object.entries(allImgs).find(([p]) => p.toLowerCase().includes('/pragyan-2026/') && p.toLowerCase().includes('empathy map'))?.[1].default;

  return (
    <div className="w-full max-w-[1920px] mx-auto my-[100px] flex flex-col gap-[80px]">

      {/* ── Header + timeline paragraph (gap-8 throughout — matches HypothesisInterpolation) ── */}
      <div className="px-6 sm:px-12 md:px-[98px] flex flex-col gap-8">
        <h3 className="font-['Inter_Display',sans-serif] font-medium text-[40px] text-center tracking-[-1.2px] text-[#fffcf3] uppercase">
          Insights and Timeline
        </h3>
        <div className="w-full h-px bg-white/20" />
        <div className="flex items-center justify-between">
          <p className="font-['Inter_Display',sans-serif] font-medium text-[25px] text-[#fffcf3]/80 tracking-[-0.75px]">(TIMELINE)</p>
          <p className="font-['Inter_Display',sans-serif] font-medium text-[25px] text-[#fffcf3]/80 tracking-[-0.75px]">(EMPATHY MAP)</p>
        </div>
        {/* Timeline description sits directly under the labels — same gap-8 */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          className="font-['Inter_Display',sans-serif] font-medium text-[30px] leading-[1.35] tracking-[-1.0px] text-[#fffcf3] text-center max-w-[1093px] mx-auto"
        >
          The project followed a structured eight-week timeline divided into phases such as understanding requirements, defining direction, ideation, design, and testing. Work was distributed across team members while regular reviews ensured consistency and timely delivery. This phased approach enabled efficient coordination of a large-scale website design while maintaining quality across all sections.
        </motion.p>
      </div>

      {/* ── Timeline image — left-aligned, max 1200px (62.5% of 1920 Figma canvas) ── */}
      <div className="pl-6 sm:pl-12 md:pl-[98px]">
        <div className="flex items-baseline gap-[4px] mb-4">
          <span className="font-['Inter_Display',sans-serif] font-semibold text-[20px] text-[#fffcf3] tracking-[-0.6px]">01</span>
          <span className="font-['Inter_Display',sans-serif] font-semibold text-[14px] text-[#fffcf3]/60 mx-1">·</span>
          <span className="font-['Inter_Display',sans-serif] font-semibold text-[20px] text-[#fffcf3]/60 tracking-[-0.6px]">02</span>
        </div>
        {timelineImg && (
          <motion.img
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            src={timelineImg}
            alt="Project Timeline"
            className="w-full max-w-[1200px] h-auto rounded-[15px]"
            draggable={false}
          />
        )}
      </div>

      {/* ── Empathy Map image — right-aligned, max 1200px ── */}
      <div className="pr-6 sm:pr-12 md:pr-[98px] flex flex-col items-end">
        <div className="w-full max-w-[1200px] flex flex-col items-end">
          <div className="flex items-baseline gap-[4px] mb-4">
            <span className="font-['Inter_Display',sans-serif] font-semibold text-[20px] text-[#fffcf3] tracking-[-0.6px]">02</span>
            <span className="font-['Inter_Display',sans-serif] font-semibold text-[14px] text-[#fffcf3]/60 mx-1">·</span>
            <span className="font-['Inter_Display',sans-serif] font-semibold text-[20px] text-[#fffcf3]/60 tracking-[-0.6px]">02</span>
          </div>
          {empathyImg && (
            <motion.img
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
              src={empathyImg}
              alt="Empathy Map"
              className="w-full h-auto rounded-[15px]"
              draggable={false}
            />
          )}
        </div>
      </div>

      {/* ── Empathy paragraph — left-aligned with timeline image (same pl-[98px]) ── */}
      <div className="pl-6 sm:pl-12 md:pl-[98px]">
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          className="font-['Inter_Display',sans-serif] font-medium text-[30px] leading-[1.35] tracking-[-1.0px] text-[#fffcf3] max-w-[1093px]"
        >
          An empathy mapping exercise was used to understand how users navigate large volumes of festival information and what challenges they might face. The insights emphasized the need for clear navigation, structured content, and timely updates to reduce confusion and improve engagement. These findings directly informed decisions around layout hierarchy and menu organization across the website.
        </motion.p>
      </div>

    </div>
  );
}

function HypothesisInterpolationBlocks() {
  return (
    <div className="w-full max-w-[1920px] mx-auto px-6 sm:px-12 md:px-[98px] my-[100px] flex flex-col gap-[120px]">
      
      {/* TITLE ROW */}
      <div className="w-full flex flex-col gap-8">
        <h3 className="font-['Inter_Display',sans-serif] font-medium text-[40px] text-center tracking-[-1.2px] text-[#fffcf3] uppercase">
          Two Parallelly Done Implementations
        </h3>
        <div className="w-full h-px bg-white/20" />
        <div className="w-full flex justify-between items-center px-4">
          <p className="font-['Inter_Display',sans-serif] font-medium text-[25px] text-[#fffcf3]/80 tracking-[-0.75px]">(HYBRID)</p>
          <p className="font-['Inter_Display',sans-serif] font-medium text-[25px] text-[#fffcf3]/80 tracking-[-0.75px]">(RLHF)</p>
        </div>
      </div>

      {/* Grid Layout mimicking stagger */}
      <div className="w-full flex flex-col gap-[100px]">
        
        {/* HYBRID PARAGRAPH (Centered) */}
        <motion.p 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className="-my-[60px] font-['Inter_Display',sans-serif] font-medium text-[28px] md:text-[30px] leading-[1.3] tracking-[-1.0px] md:tracking-[-1.2px] text-[#fffcf3] w-[1093px] max-w-full text-center mx-auto"
        >
          A hybrid processing pipeline that transforms raw metadata into structured summaries through preprocessing, transformer-based summarization, and template-driven refinement. This approach was chosen to ensure concise, consistent outputs while maintaining flexibility to adapt summary generation across different conditions and data scenarios.
        </motion.p>

        {/* HYBRID IMAGE (Left aligned) */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          className="w-full flex flex-col items-start max-w-[1001px] self-start group cursor-default"
        >
           <div className="relative w-[56px] h-[38px] shrink-0 mb-[16px]">
              <span className="absolute left-0 top-0 font-['Inter_Display',sans-serif] font-semibold text-[20px] text-[#fffcf3] tracking-[-0.6px]">
                01
              </span>
              <div className="absolute left-[28px] top-[17px] w-[4px] h-[4px] bg-[#fffcf3] rounded-full opacity-50" />
              <span className="absolute left-[36px] top-[14px] font-['Inter_Display',sans-serif] font-semibold text-[20px] text-[#fffcf3]/50 tracking-[-0.6px]">
                03
              </span>
           </div>
           <div className="w-full aspect-[1001/427] rounded-[15.6px] bg-white/5 border border-white/10 overflow-hidden relative">
             <img src="/src/assets/projects/hypothesis-interpolation/flow_diagram.png" alt="Hybrid Flow Diagram" className="w-full h-full object-contain absolute scale-[1.35]" />
           </div>
        </motion.div>

        {/* RLHF IMAGES ROW (Right aligned) */}
        <div className="w-full grid pl-0 md:pl-[20%] grid-cols-1 md:grid-cols-2 gap-[49px]">
           <motion.div 
             initial={{ opacity: 0, y: 40 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true, margin: "-100px" }}
             transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
             className="flex flex-col group cursor-default"
           >
             <div className="relative w-[56px] h-[38px] shrink-0 mb-[16px]">
                <span className="absolute left-0 top-0 font-['Inter_Display',sans-serif] font-semibold text-[20px] text-[#fffcf3] tracking-[-0.6px]">
                  02
                </span>
                <div className="absolute left-[28px] top-[17px] w-[4px] h-[4px] bg-[#fffcf3] rounded-full opacity-50" />
                <span className="absolute left-[36px] top-[14px] font-['Inter_Display',sans-serif] font-semibold text-[20px] text-[#fffcf3]/50 tracking-[-0.6px]">
                  03
                </span>
             </div>
             <div className="w-full aspect-[768/432] rounded-[15.6px] bg-white/5 border border-white/10 overflow-hidden relative">
                <img src="/src/assets/projects/hypothesis-interpolation/rlhf_approach.png" alt="RLHF Approach" className="w-full h-full object-cover absolute" />
             </div>
           </motion.div>

           <motion.div 
             initial={{ opacity: 0, y: 40 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true, margin: "-100px" }}
             transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.25 }}
             className="flex flex-col group cursor-default"
           >
             <div className="relative w-[56px] h-[38px] shrink-0 mb-[16px]">
                <span className="absolute left-0 top-0 font-['Inter_Display',sans-serif] font-semibold text-[20px] text-[#fffcf3] tracking-[-0.6px]">
                  03
                </span>
                <div className="absolute left-[28px] top-[17px] w-[4px] h-[4px] bg-[#fffcf3] rounded-full opacity-50" />
                <span className="absolute left-[36px] top-[14px] font-['Inter_Display',sans-serif] font-semibold text-[20px] text-[#fffcf3]/50 tracking-[-0.6px]">
                  03
                </span>
             </div>
             <div className="w-full aspect-[768/432] rounded-[15.6px] bg-white/5 border border-white/10 overflow-hidden relative">
                <img src="/src/assets/projects/hypothesis-interpolation/intra_predictor.png" alt="Intra Predictor Analysis" className="w-full h-full object-cover absolute" />
             </div>
           </motion.div>
        </div>

        {/* RLHF PARAGRAPH (Left Aligned) */}
        <motion.p 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          className="font-['Inter_Display',sans-serif] font-medium text-[28px] md:text-[30px] leading-[1.3] tracking-[-1.0px] md:tracking-[-1.2px] text-[#fffcf3] w-[1093px] max-w-full text-left self-start"
        >
          A feedback-driven optimization framework that combines cluster-aware context retrieval with reinforcement learning from human feedback to improve summary relevance and quality. By focusing on semantically grouped metadata and iteratively refining outputs through reward-based evaluation, the system enhances contextual accuracy and robustness of generated summaries.
        </motion.p>

      </div>
    </div>
  );
}

// ─── Gallery Section ─────────────────────────────────────────────────────────
function GallerySection({ slug, mobile }: { slug: string; mobile?: boolean }) {
  const [isHovered, setIsHovered] = useState(false);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [hoverTimer, setHoverTimer] = useState<ReturnType<typeof setTimeout> | null>(null);
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [lightboxImage, setLightboxImage] = useState<{url: string, caption: string | null} | null>(null);
  const isDraggingRef = useRef(false);
  
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
    .filter(([path]) => {
      const lower = path.toLowerCase();
      return lower.includes(`/projects/${slug}/`) 
        && !lower.includes("-arch")
        && !lower.includes("flow_diagram")
        && !lower.includes("rlhf_approach")
        && !lower.includes("intra_predictor")
        && !lower.includes("app flow")
        && !lower.includes("timeline")
        && !lower.includes("empathy map");
    })
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
    if (lightboxImage) return;
    const velocity = isHovered ? -0.05 : -0.3;
    baseX.set(baseX.get() + velocity * (delta / 1000));
  });


  const handleMouseEnter = (idx: number, e: React.MouseEvent) => {
    setHoveredIdx(idx);
    setTooltipVisible(true);
    // Fire synthetic physics update structurally bridging data-cursor drop with CustomCursor event engine accurately using real DOM events!
    const targetEl = document.elementFromPoint(e.clientX, e.clientY);
    if (targetEl) {
      targetEl.dispatchEvent(new MouseEvent('mousemove', { clientX: e.clientX, clientY: e.clientY, bubbles: true }));
    }
  };
  const handleMouseLeave = () => {
    setHoveredIdx(null);
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
        onPanStart={() => {
          isDraggingRef.current = true;
        }}
        onPanEnd={() => {
          setTimeout(() => {
            isDraggingRef.current = false;
          }, 50);
        }}
        onPan={(_, info) => {
          // Accelerate Pan: converting pixel dragged to roughly matching percentage points, lowered sensitivity per user request
          baseX.set(baseX.get() + info.delta.x * 0.01);
        }}
        style={{ x: useTransform(baseX, (v) => `${wrap(-33.33, 0, v)}%`) }}
      >
        {sequence.map((item, idx) => (
          <div
            key={idx}
            className={[
              "shrink-0 relative rounded-[17px] overflow-hidden bg-white/5 border border-white/10 flex items-center justify-center group cursor-pointer",
              mobile
                ? "w-full max-w-[360px] aspect-[393/852]"
                : "w-full max-w-[871px] aspect-video",
            ].join(" ")}
            onMouseEnter={(e) => handleMouseEnter(idx, e)}
            onMouseLeave={handleMouseLeave}
            onClick={(e) => {
              if (isDraggingRef.current) {
                e.stopPropagation();
                return;
              }
              setLightboxImage(item);
            }}
          >
            {item.url ? (
              <img 
                src={item.url} 
                alt={item.caption || "Project gallery image"} 
                className="w-full h-full object-cover object-top transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105" 
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

      {/* Lightbox Overlay */}
      <AnimatePresence>
        {lightboxImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[#090909]/80 backdrop-blur-md"
            onClick={() => setLightboxImage(null)}
            onWheel={(e) => e.stopPropagation()}
            data-cursor="dot-only"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="relative max-w-[85vw] max-h-[80vh] flex flex-col items-center gap-6 cursor-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={lightboxImage.url}
                alt={lightboxImage.caption || "Expanded gallery image"}
                className="w-auto h-auto max-w-full max-h-[70vh] rounded-[16px] object-contain shadow-2xl"
                draggable={false}
              />
              
              {lightboxImage.caption && (
                <div className="bg-white/10 backdrop-blur-lg border border-white/15 px-8 py-3 rounded-full text-[#fffcf3] font-['Inter_Display',sans-serif] font-medium text-[20px] tracking-[-0.6px] shadow-xl">
                  {lightboxImage.caption}
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
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
        // Native Back Button POP: dissolve in black then reveal page
        // Remove any leftover overlays from previous rapid navigations first
        document.getElementById("pop-nav-overlay")?.remove();

        const exit = document.createElement("div");
        exit.id = "pop-nav-overlay";
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

        // CRITICAL: if component unmounts before timers fire (rapid navigation),
        // we must clear timers AND remove the overlay from the DOM
        return () => {
          clearTimeout(tVis);
          clearTimeout(tClean);
          exit.remove(); // ← prevents orphaned black div accumulation
        };
      } else {
        // Next Project Slide Up or SPA Nav from Home
        const bar = document.getElementById("project-transition-bar");
        const overlay = document.getElementById("project-transition-overlay");

        // Force the bar to 100% immediately now that the component has actually mounted
        if (bar) {
          bar.style.transition = "width 0.3s ease-out, opacity 0.4s ease-out 0.3s";
          bar.style.width = "100%";
          bar.style.opacity = "0";
        }

        // Wait for the bar to hit 100% before revealing the page
        const tVis = setTimeout(() => setPageVisible(true), 300);
        
        // Remove overlay and bar from DOM only AFTER the 1.4s slide-up finishes covering it
        const tClean = setTimeout(() => {
          overlay?.remove();
          bar?.remove();
        }, 1800);

        return () => {
          clearTimeout(tVis);
          clearTimeout(tClean);
          overlay?.remove();
          bar?.remove();
        };
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
    // Remove any existing exit overlay before creating a new one
    // (prevents accumulation when back is pressed rapidly)
    document.getElementById("exit-nav-overlay")?.remove();

    const exit = document.createElement("div");
    exit.id = "exit-nav-overlay";
    exit.style.cssText =
      "position:fixed;inset:0;background:#090909;z-index:999999;opacity:0;transition:opacity 0.65s ease;pointer-events:all;";
    document.body.appendChild(exit);
    requestAnimationFrame(() => { exit.style.opacity = "1"; });

    sessionStorage.setItem("project_z", "50000"); // Reset local zIndex stack

    setTimeout(() => {
      if (softRouteTarget === "magic-refresh" || softRouteTarget === "HARD_RELOAD") {
        window.scrollTo(0, 0);
        sessionStorage.removeItem("portfolio_visited");
        sessionStorage.removeItem("portfolioScrollY");
        window.location.href = "/";
      } else {
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
      `position:fixed;top:0;left:0;height:4px;background:#fffcf3;width:0%;z-index:${localZIndex + 2};transition:width 10s cubic-bezier(0.1, 1, 0.3, 1);pointer-events:none;`;
    document.body.appendChild(bar);
    requestAnimationFrame(() => {
      // Opacity reduced down by ~15% from 0.97
      overlay.style.opacity = "0.70";
      bar.style.width = "85%";
    });
    setTimeout(() => {
      sessionStorage.setItem("portfolio_nav", "1");
      navigate(`/${nextProject.slug}`);
    }, 350);
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
        className="bg-[#090909] overflow-y-auto"
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
        {/* Unified Lenis Scroll Wrapper exposing dynamic image bounds accurately */}
        <div className="w-full relative">
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
          <div 
            className="absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] flex flex-col items-start mt-[10px]"
            style={{ width: 'min(85vw, 650px, 60vh * 1.77)' }}
          >
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
                className="w-full h-full object-cover object-top"
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
          <div className="flex gap-[21px] flex-wrap items-center">
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
            
            {/* GitHub link — software projects only */}
            {project.domain === "software" && project.githubUrl && (
              <a 
                href={project.githubUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                title="View Source on GitHub"
                className="border-[0.297px] border-[#fffcf3] flex items-center justify-center p-[9px] rounded-[6px] size-[44px] bg-transparent overflow-hidden shrink-0 transition-opacity hover:opacity-70 ml-2"
                data-cursor="CLICK"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="#FFFCF3" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 0.296997C5.37 0.296997 0 5.67199 0 12.297C0 17.6 3.438 22.097 8.205 23.682C8.805 23.795 9.025 23.424 9.025 23.105C9.025 22.82 9.015 22.065 9.01 21.065C5.672 21.789 4.968 19.455 4.968 19.455C4.422 18.07 3.633 17.7 3.633 17.7C2.546 16.956 3.717 16.971 3.717 16.971C4.922 17.055 5.555 18.207 5.555 18.207C6.625 20.042 8.364 19.512 9.05 19.205C9.158 18.429 9.467 17.9 9.81 17.6C7.145 17.3 4.344 16.268 4.344 11.67C4.344 10.36 4.809 9.29 5.579 8.45C5.444 8.147 5.039 6.927 5.684 5.274C5.684 5.274 6.689 4.952 8.984 6.504C9.944 6.237 10.964 6.105 11.984 6.099C13.004 6.105 14.024 6.237 14.984 6.504C17.264 4.952 18.269 5.274 18.269 5.274C18.914 6.927 18.509 8.147 18.389 8.45C19.154 9.29 19.619 10.36 19.619 11.67C19.619 16.28 16.814 17.295 14.144 17.59C14.564 17.95 14.954 18.686 14.954 19.81C14.954 21.416 14.939 22.706 14.939 23.096C14.939 23.411 15.149 23.786 15.764 23.666C20.565 22.092 24 17.592 24 12.297C24 5.67199 18.627 0.296997 12 0.296997Z"/>
                </svg>
              </a>
            )}

            {/* Behance link — design projects only */}
            {project.domain === "design" && project.behanceUrl && (
              <a
                href={project.behanceUrl}
                target="_blank"
                rel="noopener noreferrer"
                title="View on Behance"
                className="border-[0.297px] border-[#fffcf3] flex items-center justify-center p-[9px] rounded-[6px] size-[44px] bg-transparent overflow-hidden shrink-0 transition-opacity hover:opacity-70 ml-2"
                data-cursor="CLICK"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="#FFFCF3" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16.969 16.927a2.561 2.561 0 0 0 1.901.677 2.501 2.501 0 0 0 1.531-.475c.362-.235.636-.584.779-.99h2.585a5.091 5.091 0 0 1-1.9 2.896 5.292 5.292 0 0 1-3.091.88 5.839 5.839 0 0 1-2.284-.433 4.871 4.871 0 0 1-1.723-1.211 5.657 5.657 0 0 1-1.08-1.874 7.057 7.057 0 0 1-.383-2.393c-.005-.8.129-1.595.396-2.349a5.313 5.313 0 0 1 5.088-3.604 4.87 4.87 0 0 1 2.376.563c.661.362 1.231.87 1.668 1.485a6.2 6.2 0 0 1 .943 2.133c.194.821.263 1.666.205 2.508h-7.699c-.063.79.184 1.574.688 2.187ZM6.947 4.084a8.065 8.065 0 0 1 1.928.198 4.29 4.29 0 0 1 1.49.638c.418.303.748.711.958 1.182.241.579.357 1.203.341 1.83a3.506 3.506 0 0 1-.506 1.961 3.726 3.726 0 0 1-1.503 1.287 3.588 3.588 0 0 1 2.027 1.437c.464.747.697 1.615.67 2.494a4.593 4.593 0 0 1-.423 2.032 3.945 3.945 0 0 1-1.163 1.413 5.114 5.114 0 0 1-1.683.807 7.135 7.135 0 0 1-1.928.259H0V4.084h6.947Zm-.235 12.9c.308.004.616-.029.916-.099a2.18 2.18 0 0 0 .766-.332c.228-.158.411-.371.534-.619.142-.317.208-.663.191-1.009a2.08 2.08 0 0 0-.642-1.715 2.618 2.618 0 0 0-1.696-.505h-3.54v4.279h3.471Zm13.635-5.967a2.13 2.13 0 0 0-1.654-.619 2.336 2.336 0 0 0-1.163.259 2.474 2.474 0 0 0-.738.62 2.359 2.359 0 0 0-.396.792c-.074.239-.12.485-.137.734h4.769a3.239 3.239 0 0 0-.679-1.785l-.002-.001Zm-13.813-.648a2.254 2.254 0 0 0 1.423-.433c.399-.355.607-.88.56-1.413a1.916 1.916 0 0 0-.178-.891 1.298 1.298 0 0 0-.495-.533 1.851 1.851 0 0 0-.711-.274 3.966 3.966 0 0 0-.835-.073H3.241v3.631h3.293v-.014ZM21.62 5.122h-5.976v1.527h5.976V5.122Z"/>
                </svg>
              </a>
            )}

            {/* Instagram link — design projects with instagramUrl */}
            {project.instagramUrl && (
              <a
                href={project.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                title="View on Instagram"
                className="border-[0.297px] border-[#fffcf3] flex items-center justify-center p-[9px] rounded-[6px] size-[44px] bg-transparent overflow-hidden shrink-0 transition-opacity hover:opacity-70 ml-2"
                data-cursor="CLICK"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="#FFFCF3" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
            )}
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
          <div className="hidden lg:block relative w-[200px] shrink-0" ref={navContainerRef}>
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

          {/* Center Paragraph - Grid ensures height matches the longest text natively avoiding layout shift */}
          <div className="flex-1 max-w-[800px] mx-auto text-[#fffcf3] font-['Inter_Display',sans-serif] text-[28px] leading-[1.2] tracking-[-0.85px] text-center shrink-0 grid items-start">
            
            {/* Invisible boundaries forcing the component to accommodate all paragraphs natively */}
            {tabs.map((tab) => (
               <div key={`ghost-${tab.key}`} className="col-start-1 row-start-1 invisible pointer-events-none whitespace-pre-wrap" aria-hidden="true">
                 {tabContent[tab.key]}
               </div>
            ))}

            {/* Active Rendered Animated Text */}
            <div className="col-start-1 row-start-1 relative">
              <CascadeText text={tabContent[displayTab]} trigger={tabTrigger} />
            </div>
          </div>

          {/* Right Nav — mirrored, shares same hover state */}
          <div className="hidden lg:block relative w-[200px] shrink-0">
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

      {/* ── TIMELAPSE VISUALIZATION ── */}
      {project.timelapse && (
        <div className="w-full max-w-[1920px] mx-auto flex flex-col mt-[100px] mb-[100px] px-6 sm:px-12 md:px-24">
            <h3 className="font-['Inter_Display',sans-serif] text-[30px] font-medium text-[#FFFCF3] leading-normal tracking-[-0.9px] mb-8">
              {project.timelapse.heading}
            </h3>
            
            <div className="flex flex-col md:flex-row items-center justify-between gap-16">
              {/* Left Side: Video Player */}
              <div className="w-full md:w-[60%] flex justify-center shrink-0">
                 {Object.entries(import.meta.glob<{ default: string }>('/src/assets/projects/**/*.mp4', { eager: true }))
                   .find(([path]) => path.includes(`/projects/${project.slug}/`)) ? (
                     <TimelapseVideoPlayer 
                       videoSrc={Object.entries(import.meta.glob<{ default: string }>('/src/assets/projects/**/*.mp4', { eager: true })).find(([path]) => path.includes(`/projects/${project.slug}/`))?.[1].default || ""}
                     />
                 ) : (
                    <div className="w-full h-[400px] border border-white/20 flex items-center justify-center text-white/50 font-['Inter_Display',sans-serif] rounded-[17px]">
                      [Timelapse MP4 Block: Save your file inside src/assets/projects/{project.slug}/]
                    </div>
                 )}
              </div>

              {/* Right Side: Descriptive Block */}
              <div className="w-full md:w-[40%] flex flex-col justify-center items-start text-left shrink-0">
                <p className="font-['Inter_Display',sans-serif] text-[30px] font-medium text-[#FFF] leading-normal tracking-[-1.2px]">
                  {project.timelapse.text}
                </p>
              </div>
            </div>
        </div>
      )}

      {/* ── HYPOTHESIS INTERPOLATION SPECIFIC ── */}
      {project.slug === "hypothesis-interpolation" && <HypothesisInterpolationBlocks />}
      {project.slug === "pragyan-2026" && <PragyanInsightsSection />}

      {/* ── APP FLOW SECTION (design projects with appFlowText + appFlowImage) ── */}
      {project.appFlowText && (
        <div className="w-full max-w-[1920px] mx-auto my-[100px] flex flex-col gap-8">
          {/* Header row: title + white rule */}
          <div className="px-6 sm:px-12 md:px-[120px] flex flex-col gap-4">
            <h3 className="font-['Inter_Display',sans-serif] font-medium text-[40px] text-center tracking-[-1.2px] text-[#fffcf3] uppercase">
              App Flow
            </h3>
            <div className="w-full h-px bg-white/20" />
          </div>

          {/* Description paragraph — full padded width, no max-w cap */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
            className="px-6 sm:px-12 md:px-[98px] font-['Inter_Display',sans-serif] font-medium text-[28px] md:text-[30px] leading-[1.3] tracking-[-1.0px] md:tracking-[-1.2px] text-[#fffcf3] text-center"
          >
            {project.appFlowText}
          </motion.p>

          {/* App flow image — left edge aligns with text, right bleeds 50px past viewport */}
          {project.appFlowImage && (
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              style={{
                marginLeft: "clamp(24px, 6.25vw, 98px)",
                overflow: "visible",
              }}
            >
              <img
                src={project.appFlowImage}
                alt="App Flow Diagram"
                className="h-auto object-contain object-left rounded-[15px]"
                style={{
                  display: "block",
                  width: "calc(100vw - clamp(24px, 6.25vw, 98px) + 80px)",
                  maxWidth: "none",
                }}
                draggable={false}
              />
            </motion.div>
          )}
        </div>
      )}

      {/* ── GALLERY ── */}
      {!project.skipGallery && <GallerySection slug={project.slug} mobile={project.mobileGallery} />}

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
          <div className="px-6 md:px-[98px] pt-[72px] pb-[100px] max-w-[1920px] mx-auto">
            {/* Heading */}
            <div className="text-center mb-6">
              <h2
                className="font-['Mango_Grotesque',sans-serif] text-[clamp(80px,13vw,220px)] text-black leading-none tracking-tight"
                style={{ fontWeight: 400 }}
              >
                THE PROCESS
              </h2>
              <p className="font-['Inter_Display',sans-serif] font-medium text-[clamp(20px,2vw,36px)] text-black tracking-[-1.3px]">
                <MoveUpText>FROM CONCEPT TO REALITY</MoveUpText>
              </p>
            </div>

            {/* Divider */}
            <div className="w-full h-px bg-black/60 my-10" />

            {/* Two columns */}
            <div ref={processListRef} className="flex flex-col md:flex-row items-start justify-between gap-10 lg:gap-16 mt-12">
              {/* Design Approach / What was done */}
              <div className="flex-1 w-full">
                <p className="font-['Inter_Display',sans-serif] font-semibold text-[26px] text-black tracking-[-0.8px] mb-7">
                  <MoveUpText>{project.domain === "design" ? "DESIGN APPROACH" : "WHAT WAS DONE"}</MoveUpText>
                </p>
                <div className="flex flex-col gap-6">
                  {project.whatWasDone.map((item, i) => (
                    <ProcessItem key={i} text={item} delay={i * 0.2} visible={processListVisible} />
                  ))}
                </div>
              </div>

              {/* Deliverables / What was built */}
              <div className="flex-1 w-full mt-4 md:mt-0">
                <p className="font-['Inter_Display',sans-serif] font-semibold text-[26px] text-black tracking-[-0.8px] mb-7">
                  <MoveUpText>{project.domain === "design" ? "DELIVERABLES" : "WHAT WAS BUILT"}</MoveUpText>
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
        </div>
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

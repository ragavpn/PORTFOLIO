import React, { useState, useEffect, useRef, useCallback } from "react";
import { useParams, useNavigate } from "react-router";
import {
  motion,
  useMotionValue,
  useAnimationFrame,
  useTransform,
  wrap,
  useScroll,
  useSpring,
} from "motion/react";
import { getProjectBySlug, getNextProject, type ProjectData } from "../data/projectsData";

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
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.span>
      <motion.span
        className="absolute inset-0 block"
        animate={{ y: hovered ? "0%" : "100%" }}
        initial={{ y: "100%" }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.span>
    </span>
  );
}

// ─── Cascading Text Reveal ───────────────────────────────────────────────────
function CascadeText({ text, trigger }: { text: string; trigger: string | number }) {
  const lines = text.split("\n").filter(Boolean);
  return (
    <div className="text-center">
      {lines.map((line, i) => (
        <div key={`${trigger}-${i}`} className="overflow-hidden">
          <motion.div
            initial={{ y: "110%" }}
            animate={{ y: "0%" }}
            transition={{
              duration: 0.7,
              delay: i * 0.07,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="leading-snug"
          >
            {line}
          </motion.div>
        </div>
      ))}
    </div>
  );
}

// ─── Gallery Section ─────────────────────────────────────────────────────────
function GallerySection({ slug }: { slug: string }) {
  const [isHovered, setIsHovered] = useState(false);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [hoverTimer, setHoverTimer] = useState<ReturnType<typeof setTimeout> | null>(null);
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const baseX = useMotionValue(0);
  const dragX = useMotionValue(0);

  // Gallery images — populated from src/assets/projects/[slug]/ by user
  // For now render elegant placeholders
  const placeholders = [
    { caption: "Dashboard Overview" },
    { caption: "Inspection Form Flow" },
    { caption: "Approval Workflow" },
    { caption: "User Management Panel" },
  ];

  useAnimationFrame((_, delta) => {
    const velocity = isHovered ? -4 : -35;
    baseX.set(baseX.get() + velocity * (delta / 1000));
  });

  const sequence = [...placeholders, ...placeholders, ...placeholders];

  const handleMouseEnter = (idx: number) => {
    setHoveredIdx(idx);
    const t = setTimeout(() => setTooltipVisible(true), 1000);
    setHoverTimer(t);
  };
  const handleMouseLeave = () => {
    setHoveredIdx(null);
    if (hoverTimer) clearTimeout(hoverTimer);
    setTooltipVisible(false);
  };
  const handleMouseMove = (e: React.MouseEvent) => {
    setCursorPos({ x: e.clientX, y: e.clientY });
  };

  return (
    <div
      className="w-full bg-[#090909] py-16 overflow-hidden relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
    >
      <motion.div
        className="flex gap-[31px] w-max cursor-grab active:cursor-grabbing"
        drag="x"
        dragElastic={0.1}
        dragConstraints={{ right: 0, left: -99999 }}
        style={{ x: useTransform(baseX, (v) => `${wrap(-33.33, 0, v)}%`) }}
      >
        {sequence.map((item, idx) => (
          <div
            key={idx}
            className="h-[492px] w-[760px] shrink-0 relative rounded-xl overflow-hidden bg-white/5 border border-white/10 flex items-center justify-center"
            onMouseEnter={() => handleMouseEnter(idx)}
            onMouseLeave={handleMouseLeave}
          >
            <span className="text-white/20 font-['Inter_Display',sans-serif] text-[18px] tracking-tight select-none">
              Drop images in{" "}
              <span className="text-white/40">
                src/assets/projects/{slug}/
              </span>
            </span>
          </div>
        ))}
      </motion.div>

      {/* Edge fades */}
      <div className="pointer-events-none absolute left-0 top-0 h-full w-[200px] bg-gradient-to-r from-[#090909] to-transparent z-10" />
      <div className="pointer-events-none absolute right-0 top-0 h-full w-[200px] bg-gradient-to-l from-[#090909] to-transparent z-10" />

      {/* Hover tooltip */}
      {tooltipVisible && hoveredIdx !== null && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="fixed z-50 pointer-events-none bg-[#fffcf3] text-black px-4 py-2 rounded-xl text-[16px] font-['Inter_Display',sans-serif] font-semibold tracking-tight shadow-xl"
          style={{ left: cursorPos.x + 16, top: cursorPos.y - 20 }}
        >
          {placeholders[hoveredIdx % placeholders.length]?.caption}
        </motion.div>
      )}
    </div>
  );
}

// ─── Process List Item ────────────────────────────────────────────────────────
function ProcessItem({ text, delay }: { text: string; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} className="overflow-hidden">
      <motion.div
        initial={{ y: "110%", opacity: 0 }}
        animate={visible ? { y: "0%", opacity: 1 } : {}}
        transition={{ duration: 0.65, delay, ease: [0.16, 1, 0.3, 1] }}
        className="flex items-start gap-4"
      >
        <span className="text-black mt-1 shrink-0 text-[22px]">✓</span>
        <p className="font-['Inter_Display',sans-serif] text-[22px] leading-snug tracking-tight text-black">
          {text}
        </p>
      </motion.div>
    </div>
  );
}

// ─── Main Component ──────────────────────────────────────────────────────────
export default function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const project = getProjectBySlug(slug ?? "");
  const nextProject = project ? getNextProject(project.slug) : undefined;
  const istTime = useISTTime();
  const [pageVisible, setPageVisible] = useState(false);
  const [activeTab, setActiveTab] = useState<"overview" | "challenges" | "reflections">("overview");
  const [tabTrigger, setTabTrigger] = useState(0);

  const processRef = useRef<HTMLDivElement>(null);
  const processSectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: processSectionRef,
    offset: ["start end", "end start"],
  });

  const processY = useTransform(scrollYProgress, [0, 0.5], [60, 0]);
  const processOpacity = useTransform(scrollYProgress, [0, 0.15], [0, 1]);

  // Slide-in on mount
  useEffect(() => {
    const t = setTimeout(() => setPageVisible(true), 50);
    return () => clearTimeout(t);
  }, []);

  // Re-enable scroll and lenis after animation
  useEffect(() => {
    document.body.style.overflow = "hidden";
    const t = setTimeout(() => {
      document.body.style.overflow = "";
      if ((window as any).lenis) (window as any).lenis.start();
    }, 1800);
    return () => {
      clearTimeout(t);
      document.body.style.overflow = "";
    };
  }, []);

  const handleTabChange = (tab: typeof activeTab) => {
    setActiveTab(tab);
    setTabTrigger((v) => v + 1);
  };

  const handleNextProject = () => {
    if (!nextProject) return;
    // Dim, bar, navigate
    const overlay = document.createElement("div");
    overlay.style.cssText =
      "position:fixed;inset:0;background:#090909;z-index:9999;opacity:0;transition:opacity 0.3s ease;pointer-events:all;";
    document.body.appendChild(overlay);
    const bar = document.createElement("div");
    bar.style.cssText =
      "position:fixed;top:0;left:0;height:3px;background:#f5e647;width:0%;z-index:10000;transition:width 1.1s cubic-bezier(0.16,1,0.3,1);";
    document.body.appendChild(bar);

    requestAnimationFrame(() => {
      overlay.style.opacity = "0.85";
      bar.style.width = "100%";
    });

    setTimeout(() => {
      document.body.removeChild(overlay);
      document.body.removeChild(bar);
      navigate(`/projects/${nextProject.slug}`);
    }, 1300);
  };

  const handleHome = () => navigate("/");

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

  const ellipsePositions = { overview: 0, challenges: 40, reflections: 80 };

  return (
    <motion.div
      ref={containerRef}
      className="w-full min-h-screen bg-[#090909] overflow-x-hidden"
      initial={{ y: "100vh" }}
      animate={pageVisible ? { y: 0 } : { y: "100vh" }}
      transition={{ duration: 1.7, ease: [0.81, 0, 0.29, 1.01] }}
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
        <div className="border border-white/15 rounded-[17px] w-full mt-4 mb-16 px-12 py-10 flex items-center justify-between relative">
          <div className="flex flex-col gap-4">
            <p className="font-['Inter_Display',sans-serif] font-medium text-[20px] text-white/60 tracking-[-0.6px]">
              CATEGORY
            </p>
            <p className="font-['Inter_Display',sans-serif] text-[36px] text-[#fffcf3] tracking-[-1.1px]">
              {project.category}
            </p>
          </div>
          <div className="flex flex-col gap-4 items-center text-center">
            <p className="font-['Inter_Display',sans-serif] font-medium text-[20px] text-white/60 tracking-[-0.6px]">
              ROLE
            </p>
            <p className="font-['Inter_Display',sans-serif] text-[36px] text-[#fffcf3] tracking-[-1.1px]">
              {project.role}
            </p>
          </div>
          <div className="flex flex-col gap-4 items-end text-right">
            <p className="font-['Inter_Display',sans-serif] font-medium text-[20px] text-white/60 tracking-[-0.6px]">
              TEAM
            </p>
            <p className="font-['Inter_Display',sans-serif] text-[36px] text-[#fffcf3] tracking-[-1.1px]">
              {project.team}
            </p>
          </div>
        </div>

        {/* ── Overview / Challenge / Reflection ── */}
        <div className="flex items-start justify-between w-full gap-8 pb-24">
          {/* Left Nav */}
          <div className="relative w-[200px] shrink-0">
            {/* Ellipse indicator */}
            <motion.div
              className="absolute left-0 w-[7px] h-[7px] rounded-full bg-[#fffcf3]"
              animate={{ top: `${ellipsePositions[activeTab]}px` }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              style={{ marginTop: "8px" }}
            />
            <div className="flex flex-col gap-[26px] pl-5">
              {(["overview", "challenges", "reflections"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => handleTabChange(tab)}
                  className={`font-['Inter_Display',sans-serif] font-medium text-[26px] tracking-[-0.8px] text-left transition-opacity duration-300 ${
                    activeTab === tab ? "opacity-100" : "opacity-35 hover:opacity-60"
                  } text-[#fffcf3] uppercase`}
                >
                  {tab === "challenges" ? "CHALLENGE" : tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Center Paragraph */}
          <div className="flex-1 max-w-[900px] mx-auto text-[#fffcf3] font-['Inter_Display',sans-serif] text-[26px] leading-[1.45] tracking-[-0.8px]">
            <CascadeText text={tabContent[activeTab]} trigger={tabTrigger} />
          </div>

          {/* Right Nav (mirrored) */}
          <div className="relative w-[200px] shrink-0 flex justify-end">
            <div className="relative">
              <motion.div
                className="absolute right-0 w-[7px] h-[7px] rounded-full bg-[#fffcf3]"
                animate={{ top: `${ellipsePositions[activeTab]}px` }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                style={{ marginTop: "8px" }}
              />
              <div className="flex flex-col gap-[26px] pr-5 items-end">
                {(["overview", "challenges", "reflections"] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => handleTabChange(tab)}
                    className={`font-['Inter_Display',sans-serif] font-medium text-[26px] tracking-[-0.8px] text-right transition-opacity duration-300 ${
                      activeTab === tab ? "opacity-100" : "opacity-35 hover:opacity-60"
                    } text-[#fffcf3] uppercase`}
                  >
                    {tab === "challenges" ? "CHALLENGE" : tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

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
              <p className="font-['Inter_Display',sans-serif] font-medium text-[36px] text-black tracking-[-1.1px] mt-2">
                <MoveUpText>FROM CONCEPT TO REALITY</MoveUpText>
              </p>
            </div>

            {/* Divider */}
            <div className="w-full h-px bg-black/20 my-10" />

            {/* Two columns */}
            <div className="flex items-start justify-between gap-16 mt-12">
              {/* What was done */}
              <div className="flex-1">
                <p className="font-['Inter_Display',sans-serif] font-semibold text-[26px] text-black tracking-[-0.8px] mb-10">
                  WHAT WAS DONE
                </p>
                <div className="flex flex-col gap-6">
                  {project.whatWasDone.map((item, i) => (
                    <ProcessItem key={i} text={item} delay={i * 0.1} />
                  ))}
                </div>
              </div>

              {/* What was built */}
              <div className="flex-1">
                <p className="font-['Inter_Display',sans-serif] font-semibold text-[26px] text-black tracking-[-0.8px] mb-10">
                  WHAT WAS BUILT
                </p>
                <div className="flex flex-col gap-6">
                  {project.whatWasBuilt.map((item, i) => (
                    <ProcessItem key={i} text={item} delay={i * 0.1 + 0.15} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* ── NEXT PROJECT FOOTER ── */}
      {nextProject && (
        <div className="w-full bg-[#090909] min-h-screen relative flex flex-col">
          {/* SEE NEXT header */}
          <div className="flex items-start justify-between px-[98px] pt-[75px]">
            <p className="font-['Mango_Grotesque',sans-serif] text-[clamp(40px,5vw,72px)] text-[#fffcf3] leading-none">
              SEE NEXT
            </p>
            <p className="font-['Mango_Grotesque',sans-serif] text-[clamp(40px,5vw,72px)] text-[#fffcf3] leading-none text-right">
              {nextProject.displayTitle}
            </p>
          </div>

          {/* Divider */}
          <div className="w-full h-px bg-white/20 mt-6" />

          {/* Center preview image */}
          <div className="flex-1 flex items-center justify-center py-16 relative">
            {/* Project counter */}
            <div className="absolute top-6 left-1/2 -translate-x-1/2 flex items-baseline gap-1">
              <span className="font-['Inter_Display',sans-serif] font-semibold text-[18px] text-[#fffcf3] tracking-[-0.5px]">
                {String(nextProject.index).padStart(2, "0")}
              </span>
              <span className="font-['Inter_Display',sans-serif] font-semibold text-[14px] text-[#fffcf3]/50 tracking-[-0.4px] mx-1">
                ·
              </span>
              <span className="font-['Inter_Display',sans-serif] font-semibold text-[14px] text-[#fffcf3]/50 tracking-[-0.4px]">
                {nextProject.totalProjects}
              </span>
              <span className="font-['Inter_Display',sans-serif] font-semibold text-[14px] text-[#fffcf3]/50 tracking-[-0.4px] ml-2">
                PROJECTS
              </span>
            </div>

            {/* Preview image */}
            <motion.div
              className="w-[700px] h-[430px] rounded-2xl overflow-hidden cursor-pointer border border-white/10 shadow-2xl"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              onClick={handleNextProject}
            >
              <img
                src={nextProject.image}
                alt={nextProject.title}
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>

          {/* HOME / VISIT row */}
          <div className="flex items-center justify-between px-[98px] pb-8">
            <button
              onClick={handleHome}
              className="font-['Inter_Display',sans-serif] font-medium text-[22px] text-[#fffcf3] tracking-[-0.65px] hover:opacity-60 transition-opacity"
            >
              <MoveUpText>HOME</MoveUpText>
            </button>
            {nextProject.liveUrl ? (
              <a
                href={nextProject.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 font-['Inter_Display',sans-serif] font-medium text-[22px] text-[#fffcf3] tracking-[-0.65px] hover:opacity-60 transition-opacity"
              >
                <MoveUpText>VISIT</MoveUpText>
                <span className="w-9 h-9 rounded-full border border-white/30 flex items-center justify-center text-[14px]">
                  ↗
                </span>
              </a>
            ) : (
              <span className="font-['Inter_Display',sans-serif] font-medium text-[22px] text-white/30 tracking-[-0.65px]">
                COMING SOON
              </span>
            )}
          </div>

          {/* ── Footer Details Bar ── */}
          <div className="w-full border-t border-white/10 px-[98px] py-6 flex items-center justify-between">
            <div className="flex items-center gap-12">
              {/* Location */}
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-[#fffcf3]" />
                <span className="font-['Inter_Display',sans-serif] font-medium text-[18px] text-[#fffcf3] tracking-[-0.55px] whitespace-pre">
                  BANGALORE,  INDIA
                </span>
              </div>
              {/* Time */}
              <div className="flex items-center gap-2 font-['Inter_Display',sans-serif] font-medium text-[18px] text-[#fffcf3] tracking-[-0.55px]">
                <span>{istTime}</span>
                <span className="opacity-50">GMT +5:30</span>
              </div>
              {/* Coordinates */}
              <span className="font-['Inter_Display',sans-serif] font-medium text-[18px] text-[#fffcf3] tracking-[-0.55px]">
                12.9826° N, 77.7377° E
              </span>
            </div>
            {/* Year */}
            <div className="flex items-center gap-1 font-['Inter_Display',sans-serif] font-medium text-[18px] text-[#fffcf3] tracking-[-0.55px]">
              <span className="opacity-50 text-[14px]">©</span>
              <span>2026</span>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
}

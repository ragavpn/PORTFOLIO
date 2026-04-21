import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring } from "motion/react";
import imgImage40 from "../../assets/a24cb39d900485d56afd7b02d380c9d99b9b4d16.png";
import imgTag from "../../assets/hanging tag.png";
import imgPin from "../../assets/red pin.png";
import songsData from "../data/songs.json";

// Glob import all mp3s
const mp3Modules = import.meta.glob('../../songs/*.mp3', { eager: true, query: '?url', import: 'default' }) as Record<string, string>;

/**
 * Physical Physics-driven Typography Component.
 * 
 * Hijacks individual string characters explicitly mapping localized 2D translation vectors 
 * upon hover. Leverages nested `<span/>` cloning overlapping out-of-bounds nodes to securely 
 * simulate infinite marquee scrolling exclusively across a single character footprint structurally.
 * 
 * @param {string} ch - Single character chunk natively broken from source string arrays.
 * @param {string} [className] - Optional custom layout utility tailwind tokens.
 */
function ShiftLetter({ ch, className }: { ch: string; className?: string }) {
  const [phase, setPhase] = React.useState<"ready" | "playing">("ready");
  const phaseRef      = React.useRef<"ready" | "playing">("ready");
  const pendingReset  = React.useRef(false);
  const cloneRef      = React.useRef<HTMLSpanElement>(null);

  const updatePhase = (p: "ready" | "playing") => {
    phaseRef.current = p;
    setPhase(p);
  };

  // Listen for the clone's transitionend — it finishes last (80ms delay + 550ms duration)
  React.useEffect(() => {
    const el = cloneRef.current;
    if (!el) return;
    const onEnd = (e: TransitionEvent) => {
      // Must filter out any overlapping transition bubbles (like color/opacity) implicitly
      if (e.propertyName !== "transform") return;
      
      // Snaps back immediately visually seamlessly resetting the marquee lock
      updatePhase("ready"); 
    };
    el.addEventListener("transitionend", onEnd as EventListener);
    return () => el.removeEventListener("transitionend", onEnd as EventListener);
  }, []);

  const handleEnter = () => {
    if (phaseRef.current === "ready") updatePhase("playing");
  };

  // If the user's mouse leaves early, the physics just finishes the current cycle and snaps.
  // If the user rests their mouse inside permanently, the cycle naturally resolves to ready seamlessly.
  const handleLeave = () => {};

  if (ch === " ") {
    return <span className={className} style={{ display: "inline-block", width: "0.3em" }}>&nbsp;</span>;
  }

  const isPlaying  = phase === "playing";
  const transition = isPlaying ? "transform 0.55s cubic-bezier(0.25, 1, 0.5, 1)" : "none";

  return (
    <span
      style={{ display: "inline-block", overflow: "hidden", position: "relative", lineHeight: "inherit" }}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      {/* Real letter â€” slides out left */}
      <span
        className={className}
        style={{
          display: "inline-block",
          transform: isPlaying ? "translateX(-110%)" : "translateX(0%)",
          transition,
          whiteSpace: "nowrap",
        }}
      >
        {ch}
      </span>
      {/* Clone â€” enters from right (finishes last due to 80ms delay) */}
      <span
        ref={cloneRef}
        className={className}
        style={{
          display: "inline-block",
          position: "absolute",
          left: 0,
          top: 0,
          transform: isPlaying ? "translateX(0%)" : "translateX(110%)",
          transition,
          transitionDelay: isPlaying ? "80ms" : "0ms",
          whiteSpace: "nowrap",
        }}
      >
        {ch}
      </span>
    </span>
  );
}

/**
 * Massive Media Player & Audio Gallery Component.
 * 
 * Dynamically ingests local JSON structures statically alongside globbed local `.mp3` assets resolving 
 * to active `Howl` / Web Audio API tracking components. Manages extreme physics configurations 
 * directly binding mouse vector metrics into global sticky disc visuals spanning active layout layers.
 * 
 * @returns {JSX.Element} Fluid dynamic audio player UI wrapping a 2D hovering DOM disc tracker.
 */
export function Songs() {
  const [scale, setScale] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isAudioLoading, setIsAudioLoading] = useState(false);
  const [activeSongId, setActiveSongId] = useState("1");
  const [progress, setProgress] = useState(0);
  const [currentDuration, setCurrentDuration] = useState(0);
  const [currentArtistIndex, setCurrentArtistIndex] = useState(0);

  const activeSong = songsData.find((s) => s.id === activeSongId) || songsData[0];
  const audioRef = useRef<HTMLAudioElement>(null);
  const fadeTarget = useRef<number | null>(null);

  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [rotation, setRotation] = useState(0);
  const currentSpeed = useRef(0);
  const isDraggingRef = useRef(false);
  const [isDragging, setIsDragging] = useState(false);
  const vinylRef = useRef<HTMLDivElement>(null);

  // ── Tag Physics Momentum Engine ───────────────────────────────────────────
  const tagRotate = useMotionValue(0);
  // High inertia, low damping rocks it gently back and forth like a real pendulum
  const smoothedTagRotate = useSpring(tagRotate, { stiffness: 100, damping: 3.5, mass: 1.2 });
  const lastMouseX = useRef(0);
  const returnTimeout = useRef<number>(0);

  const handleTagMouseEnter = (e: React.PointerEvent) => {
    lastMouseX.current = e.clientX;
  };
  const handleTagMouseMove = (e: React.PointerEvent) => {
    const deltaX = e.clientX - lastMouseX.current;
    lastMouseX.current = e.clientX;
    const currentRot = tagRotate.get();
    
    // Simulate pushing: gently convert cursor velocity to tiny angular nudges
    // Subtraction means it physically swings away from the cursor's velocity!
    let newRot = currentRot - deltaX * 0.15;
    // Strictly cap to just a few pixels of visual swing!
    newRot = Math.max(-4, Math.min(4, newRot));
    tagRotate.set(newRot);

    clearTimeout(returnTimeout.current);
    returnTimeout.current = window.setTimeout(() => {
      tagRotate.set(0); 
    }, 150);
  };
  const handleTagMouseLeave = () => {
    tagRotate.set(0);
    clearTimeout(returnTimeout.current);
  };

  // Parse original duration from json just in case M:SS format
  useEffect(() => {
    if (activeSong.duration) {
      const [m, s] = activeSong.duration.split(':').map(Number);
      setCurrentDuration((m * 60) + s);
    }
  }, [activeSongId, activeSong.duration]);

  // Reset artist index when song changes
  useEffect(() => {
    setCurrentArtistIndex(0);
  }, [activeSongId]);

  // Cycle through artists for multi-artist songs
  useEffect(() => {
    const artists = activeSong.artist.split(",").map((a) => a.trim());
    if (artists.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentArtistIndex((prev) => (prev + 1) % artists.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [activeSong, activeSongId]);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;
    const maxScroll = target.scrollHeight - target.clientHeight;
    setScrollProgress(maxScroll > 0 ? target.scrollTop / maxScroll : 0);
  };

  const togglePlay = () => {
    setIsPlaying((p) => {
      if (!p) setIsAudioLoading(true);
      return !p;
    });
  };

  const handleSongClick = (songId: string) => {
    if (songId === activeSongId) {
      if (!isPlaying) setIsAudioLoading(true);
      setIsPlaying(p => !p);
      return;
    }
    setActiveSongId(songId);
    setProgress(0);
    setIsAudioLoading(true);
    setIsPlaying(true);
  };

  // Playback Control & Fade In
  useEffect(() => {
    if (!audioRef.current) return;
    const audio = audioRef.current;

    if (fadeTarget.current) {
        clearInterval(fadeTarget.current);
        fadeTarget.current = null;
    }

    if (isPlaying) {
      // Start with volume 0 and fade in
      if (audio.paused) {
          audio.volume = 0;
          audio.play().catch(e => console.error("Audio playback error:", e));
          
          fadeTarget.current = window.setInterval(() => {
              if (audio.volume < 0.95) {
                  audio.volume += 0.05;
              } else {
                  audio.volume = 1;
                  if (fadeTarget.current) clearInterval(fadeTarget.current);
              }
          }, 30);
      }
    } else {
      audio.pause();
    }

    return () => {
        if (fadeTarget.current) clearInterval(fadeTarget.current);
    };
  }, [isPlaying, activeSongId]);

  // Sync Audio Duration when metadata loads
  const handleLoadedMetadata = () => {
    if (audioRef.current && audioRef.current.duration) {
      setCurrentDuration(audioRef.current.duration);
    }
  };

  const handleAudioEnded = () => {
    setIsPlaying(false);
    setProgress(0);
  };

  // Scale canvas
  useEffect(() => {
    const updateScale = () => {
      const s = Math.min(window.innerWidth / 1920, window.innerHeight / 1080);
      setScale(s);
    };
    updateScale();
    window.addEventListener("resize", updateScale);
    return () => window.removeEventListener("resize", updateScale);
  }, []);

  // Vinyl rotation & Progress bar rAF loop
  useEffect(() => {
    let animationFrame: number;
    let lastTime = Date.now();

    const updateLoop = () => {
      const now = Date.now();
      const delta = (now - lastTime) / 1000;
      lastTime = now;

      // Spin vinyl
      const TARGET_SPEED = isPlaying ? 24 : 0;
      currentSpeed.current += (TARGET_SPEED - currentSpeed.current) * (delta * 3);
      if (Math.abs(currentSpeed.current) > 0.05) {
        setRotation((r) => (r + currentSpeed.current * delta) % 360);
      }

      // Update progress extremely smoothly from audio
      if (audioRef.current && currentDuration > 0 && !isDraggingRef.current) {
         setProgress(audioRef.current.currentTime / currentDuration);
      }

      animationFrame = requestAnimationFrame(updateLoop);
    };

    animationFrame = requestAnimationFrame(updateLoop);
    return () => cancelAnimationFrame(animationFrame);
  }, [isPlaying, currentDuration]);

  // Time from progress * duration
  const elapsedSeconds = Math.floor(progress * currentDuration);
  const elapsedMin = Math.floor(elapsedSeconds / 60);
  const elapsedSec = (elapsedSeconds % 60).toString().padStart(2, "0");

  const totalMin = Math.floor(currentDuration / 60);
  const totalSec = Math.floor(currentDuration % 60).toString().padStart(2, "0");
  const totalFormatted = currentDuration > 0 ? `${totalMin}:${totalSec}` : activeSong.duration;
  const elapsedFormatted = currentDuration > 0 ? `${elapsedMin}:${elapsedSec}` : "0:00";

  // SVG arc math
  const fullArcLength = 1.5 * Math.PI * 493;
  const staticArcLength = 0.5 * Math.PI * 493;
  const visibleLength = staticArcLength + progress * (Math.PI * 493);

  const angle = progress * Math.PI - Math.PI / 2;
  const dotX = 494.5 + 493 * Math.cos(angle);
  const dotY = 494.5 + 493 * Math.sin(angle);

  const updateProgressFromPointer = (clientX: number, clientY: number) => {
    if (!vinylRef.current || !audioRef.current || currentDuration === 0) return;
    const rect = vinylRef.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = clientX - cx;
    const dy = clientY - cy;
    let dragAngle = Math.atan2(dy, dx);
    if (dx < 0) dragAngle = dy < 0 ? -Math.PI / 2 : Math.PI / 2;
    let newProgress = (dragAngle + Math.PI / 2) / Math.PI;
    newProgress = Math.max(0, Math.min(1, newProgress));
    setProgress(newProgress);
    audioRef.current.currentTime = newProgress * currentDuration;
  };

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      if (isDraggingRef.current) updateProgressFromPointer(e.clientX, e.clientY);
    };
    const onUp = () => {
      isDraggingRef.current = false;
      setIsDragging(false);
    };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };
  }, [currentDuration]);

  const handlePointerDown = (e: React.PointerEvent) => {
    isDraggingRef.current = true;
    setIsDragging(true);
    updateProgressFromPointer(e.clientX, e.clientY);
  };

  // Artist text line-break heuristic logic
  const getArtistLines = () => {
    const artists = activeSong.artist.split(",").map((a) => a.trim().toUpperCase());
    const currentArtist = artists[currentArtistIndex] || artists[0];
    const words = currentArtist.split(" ");
    
    // Using 13 character soft-cap to prevent standard strings from bleeding past 1920px container bounds
    const MAX_CHARS = 13;

    if (words.length <= 1) {
      return [words.join(" ")];
    }

    if (words.length === 2) {
      // Default for exactly 2-word artists: 1st word on 1st line, 2nd word on 2nd line
      return [words[0], words[1]];
    }

    // For 3 or more words
    let line1 = words[0];
    let remainingWords = words.slice(1);

    while (remainingWords.length > 0) {
      const line2Str = remainingWords.join(" ");
      // If line 2 is expanding out of viewport bounds
      if (line2Str.length > MAX_CHARS) {
        const nextWord = remainingWords[0];
        // Ensure that moving the word doesn't push line 1 out of viewport bounds
        if ((line1 + " " + nextWord).length <= MAX_CHARS) {
          line1 += " " + nextWord;
          remainingWords.shift();
        } else {
          // Both lines are tight; stop moving
          break;
        }
      } else {
        // Line 2 is completely inside viewport; stop moving
        break;
      }
    }
    
    if (remainingWords.length === 0) return [line1];
    return [line1, remainingWords.join(" ")];
  };

  const artistLines = getArtistLines();

  // Artist text renderer â€” UPPERCASE with per-letter hover animation
  const LETTER_CLS = "font-['Space_Grotesk'] text-[160px] font-normal leading-[0.853] tracking-[-8px] text-black";

  const renderLine = (text: string) => (
    <div className="whitespace-nowrap" style={{ lineHeight: "0.853", display: "flex", alignItems: "baseline" }}>
      {text.split("").map((ch, i) => (
        <ShiftLetter key={i} ch={ch} className={LETTER_CLS} />
      ))}
    </div>
  );

  const renderArtistText = () => {
    if (artistLines.length === 1) {
      return (
        <div className="w-full flex justify-start">
          {renderLine(artistLines[0])}
        </div>
      );
    } else {
      return (
        <>
          <div className="self-start">{renderLine(artistLines[0])}</div>
          <div className="w-full flex justify-start">{renderLine(artistLines[1])}</div>
        </>
      );
    }
  };

  // Find the required mp3 file path
  // The object keys are like '../../songs/Filename.mp3'
  const matchingGlobKey = Object.keys(mp3Modules).find(k => k.includes(activeSong.fileName));
  const activeAudioSrc = matchingGlobKey ? mp3Modules[matchingGlobKey] : "";

  return (
    <section
      className="bg-[#fffcf3] relative w-full overflow-hidden"
      style={{ height: `${1080 * scale + 100}px` }}
      data-name="SongsRec"
    >
      {/* Native HTML5 Audio */}
      <audio
        ref={audioRef}
        src={activeAudioSrc}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleAudioEnded}
        onWaiting={() => setIsAudioLoading(true)}
        onPlaying={() => setIsAudioLoading(false)}
        onCanPlay={() => setIsAudioLoading(false)}
      />

      {/* Main 1920Ã—1080 canvas */}
      <div
        className="absolute left-1/2 top-[0px] w-[1920px] h-[1080px] origin-top"
        style={{ transform: `translate(-50%, 0) scale(${scale})` }}
      >
        {/* VINYL DISPLAY */}
        <div
          ref={vinylRef}
          className="absolute left-[60px] top-[602px] w-[989px] h-[989px] -translate-x-1/2 -translate-y-1/2 z-10 scale-110 select-none"
          data-name="Vinyl display"
        >
          {/* Base circular track */}
          <svg className="absolute inset-0 w-[989px] h-[989px] pointer-events-none" viewBox="0 0 989 989" fill="none">
            <circle cx="494.5" cy="494.5" r="493" stroke="url(#trackGrad)" strokeOpacity="0.28" strokeWidth="2" />
            <defs>
              <linearGradient id="trackGrad" x1="494.5" x2="502.7" y1="0" y2="989" gradientUnits="userSpaceOnUse">
                <stop stopColor="#666666" stopOpacity="0" />
                <stop offset="1" stopColor="#666666" stopOpacity="0.78" />
              </linearGradient>
            </defs>
          </svg>

          {/* Progress arc */}
          <svg className="absolute inset-0 w-[989px] h-[989px] pointer-events-none" viewBox="0 0 989 989" fill="none">
            <path
              d="M 1.5 494.5 A 493 493 0 1 1 494.5 987.5"
              stroke="#720808"
              strokeWidth="3"
              strokeDasharray={fullArcLength}
              strokeDashoffset={fullArcLength - visibleLength}
            />
          </svg>

          {/* Spinning vinyl */}
          <div
            className="absolute left-1/2 top-1/2 w-[935.5px] h-[941.6px] mix-blend-multiply overflow-hidden rounded-full origin-center pointer-events-none"
            style={{ transform: `translate(-50%, -50%) rotate(${rotation}deg)` }}
          >
            <img draggable="false" src={imgImage40} alt="Vinyl" className="absolute w-[100.66%] h-[139.99%] left-[-0.44%] top-[-19.79%] max-w-none object-cover pointer-events-none" />
          </div>

          {/* Center hole */}
          <div className="absolute w-[363px] h-[363px] bg-[#FFFCF3] rounded-full left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />

          {/* Waveform */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-end gap-[5px] h-[48px]">
            <style>{`
              @keyframes waveform {
                0%, 100% { transform: scaleY(0.2); }
                50% { transform: scaleY(1); }
              }
              @keyframes loadingWave {
                0%, 100% { transform: scaleY(0.15); opacity: 0.4; }
                50% { transform: scaleY(0.65); opacity: 1; }
              }
            `}</style>
            {[{ h: "38px", d: "0.9s", delay: "0s" }, { h: "48px", d: "1.1s", delay: "0.2s" }, { h: "34px", d: "0.8s", delay: "0.4s" }, { h: "39px", d: "1.2s", delay: "0.1s" }].map((b, i) => (
              <div
                key={i}
                className="w-[7px] bg-[#c80f0f] origin-bottom transition-opacity duration-300"
                style={{
                  height: b.h,
                  animation: isAudioLoading && isPlaying 
                    ? `loadingWave 0.8s ease-in-out infinite ${i * 0.15}s` 
                    : isPlaying 
                      ? `waveform ${b.d} ease-in-out infinite ${b.delay}` 
                      : "none",
                }}
              />
            ))}
          </div>

          {/* Song title overlay */}
          <div className="absolute left-[664px] top-[485px] flex text-white w-[250px] z-20 mx-[25px]">
            <span className="font-['Inter'] font-semibold text-[19px] leading-[0.85] mt-1 mr-[10px] shrink-0 tabular-nums">
              {activeSong.id.toString().padStart(2, "0")}.
            </span>
            <div className="font-['Inter'] font-medium text-[30px] leading-[0.96] break-words uppercase">
              {activeSong.title}
            </div>
          </div>

          {/* Draggable arc dot */}
          <div
            className={`absolute -translate-x-1/2 -translate-y-1/2 z-20 ${isDragging ? "cursor-grabbing" : "cursor-grab"}`}
            style={{ left: `${dotX}px`, top: `${dotY}px` }}
            onPointerDown={handlePointerDown}
            data-cursor="drag"
          >
            <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
              <circle cx="18" cy="18" r="18" fill="#FFFCF3" />
              <circle cx="18" cy="18" r="16.6" stroke="black" strokeOpacity="0.3" strokeWidth="2.6" />
              <circle cx="18" cy="18" r="7" fill="#C80F0F" />
            </svg>
          </div>

          {/* Runtime display â€” bottom of vinyl arc */}
          <div className="absolute left-[818px] top-[923px] flex font-['JetBrains_Mono'] font-medium text-[19px] gap-[5px] z-20 tabular-nums">
            <span className="text-black">{elapsedFormatted}</span>
            <span className="text-black">/</span>
            <span className="text-black/50">{totalFormatted}</span>
          </div>
        </div>

        {/* ARTIST NAME */}
        <div className="absolute left-[740px] top-[127px] w-[736px] flex flex-col z-10" data-name="Artist Name">
          <AnimatePresence mode="wait">
            <motion.div
              key={`artist-${activeSongId}-${currentArtistIndex}`}
              initial={{ opacity: 0, filter: "blur(6px)", y: 12 }}
              animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
              exit={{ opacity: 0, filter: "blur(6px)", y: -12 }}
              transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
              className="flex flex-col w-full"
            >
              {renderArtistText()}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* GENRES â€” animated on song change */}
        <div
          className="absolute left-[740px] z-10 transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]"
          style={{ top: artistLines.length === 1 ? "296px" : "408px" }}
          data-name="Genres"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={`genres-${activeSongId}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.45, ease: [0.76, 0, 0.24, 1] }}
              className="flex gap-[18px] font-['Inter',sans-serif] font-medium text-[26px] tracking-[-2px] text-black uppercase"
            >
              {activeSong.genres.map((g, i) => (
                <span key={i}>
                  {g}{i < activeSong.genres.length - 1 ? " ," : ""}
                </span>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* SONGS LIST */}
        <div className="absolute left-[740px] right-[0px] top-[516px] flex flex-col gap-[36px] z-10" data-name="Top Songs">
          {/* Header */}
          <div className="flex justify-between w-full items-center pl-[20px] pr-[10px]">
            <div className="flex items-center gap-[24px]">
              <h3 className="text-[#c80f0f] text-[30px] font-['Inter',sans-serif] font-normal tracking-[-2px] whitespace-nowrap leading-[0.853]">
                SOME FAVOURITES
              </h3>
              <button
                onClick={togglePlay}
                className="w-[24px] h-[26px] flex items-center justify-center text-[#c80f0f] hover:scale-110 transition-transform shrink-0"
              >
                {isPlaying ? (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="6" y="4" width="4" height="16" /><rect x="14" y="4" width="4" height="16" />
                  </svg>
                ) : (
                  <svg width="36" height="38" viewBox="0 0 36 38" fill="none">
                    <g filter="url(#playFilter)">
                      <path d="M26.2407 15.6599C27.6083 16.4258 27.6083 18.3753 26.2407 19.1412L12.5698 26.804C11.1685 27.5891 9.38883 26.5796 9.38883 24.9634L9.38883 9.83777C9.38883 8.22156 11.1685 7.21204 12.5698 7.99712L26.2407 15.6599Z" fill="#C80F0F" />
                    </g>
                    <defs>
                      <filter id="playFilter" x="0" y="0" width="36" height="38" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                        <feFlood floodOpacity="0" result="BackgroundImageFix" />
                        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                        <feOffset dx="1" dy="2" /><feGaussianBlur stdDeviation="3" />
                        <feComposite in2="hardAlpha" operator="out" />
                        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.39 0" />
                        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow" />
                        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape" />
                      </filter>
                    </defs>
                  </svg>
                )}
              </button>
            </div>
            <a
              href="https://open.spotify.com/playlist/1dnd3RjsOKjrIyneiw4iaC?si=573117f8991d4ef0"
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="dot-only"
              className="text-[19px] font-['Inter',sans-serif] font-medium underline tracking-[-1.5px] text-black leading-[0.853] hover:opacity-70 transition-opacity whitespace-nowrap"
            >
              VIEW PLAYLIST
            </a>
          </div>

          {/* Track list */}
          <div className="relative w-full h-[422px] overflow-hidden">
            <div
              ref={scrollRef}
              onScroll={handleScroll}
              data-lenis-prevent="true"
              className="absolute left-0 right-[24px] top-0 flex flex-col gap-[6px] h-[422px] overflow-y-auto"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              <style>{`::-webkit-scrollbar { display: none; }`}</style>
              {songsData.map((song, i) => {
                const isActive = song.id === activeSongId;
                return (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ delay: i * 0.04, duration: 0.4 }}
                    key={song.id}
                    onClick={() => handleSongClick(song.id)}
                    data-cursor={isActive && isPlaying ? "pause" : "play"}
                    className={`flex justify-between items-center w-full group transition-colors duration-300 cursor-pointer rounded-[14px] px-[20px] py-[10px] ${isActive ? "bg-black/[0.04]" : "bg-transparent hover:bg-black/[0.02]"}`}
                  >
                    {/* Left: number + art + titles */}
                    <div className="flex items-center gap-[28px] min-w-0 flex-1 mr-[20px]">
                      <div className="flex items-center justify-between w-[122px] shrink-0">
                        <span className="font-['Inter',sans-serif] tracking-[-1px] font-semibold text-[19px] text-black leading-[0.853] whitespace-nowrap tabular-nums">
                          {(i + 1).toString().padStart(2, "0")}
                        </span>
                        <div className="w-[70px] h-[70px] rounded-[6px] shrink-0 transition-transform duration-500 group-hover:scale-110 relative overflow-hidden bg-[#d9d9d9]">
                          {song.cover && (
                            <img src={song.cover} alt="Cover" className="w-full h-full object-cover pointer-events-none absolute inset-0" />
                          )}
                        </div>
                      </div>
                      <div className="flex flex-col items-start min-w-0 flex-1 leading-[0.96] pr-4">
                        <span className="font-['Inter',sans-serif] tracking-[-1px] font-semibold text-[21px] text-black uppercase whitespace-nowrap overflow-hidden text-ellipsis w-full leading-[0.85]">
                          {song.title}
                        </span>
                        <span className="font-['Inter',sans-serif] tracking-[-1px] font-medium text-[19px] text-black/50 uppercase whitespace-nowrap overflow-hidden text-ellipsis w-full mt-[6px] leading-[0.85]">
                          {song.album}
                        </span>
                      </div>
                    </div>

                    {/* Right: duration */}
                    <span className="font-['JetBrains_Mono'] font-medium text-[19px] text-black/40 leading-[0.86] whitespace-nowrap shrink-0 tabular-nums">
                      {song.duration}
                    </span>
                  </motion.div>
                );
              })}
            </div>

            {/* Scrollbar */}
            <div className="absolute right-0 top-[27px] w-[9px] h-[368px] bg-black/20 rounded-full overflow-hidden">
              <motion.div
                className="absolute left-0 w-[9px] h-[191px] bg-black rounded-full"
                animate={{ top: scrollProgress * (368 - 191) }}
                transition={{ type: "spring", stiffness: 400, damping: 40, mass: 0.8 }}
              />
            </div>
          </div>
        </div>

        {/* Hanging Tag */}
        <div 
          className="absolute right-[-80px] top-[90px] w-[270px] h-[339px] z-30" 
          data-name="Hanging Tag"
        >
          {/* Interactive Physics Zone Bounds */}
          <div 
            className="absolute inset-0 -mx-[40px] -my-[40px]"
            onPointerEnter={handleTagMouseEnter}
            onPointerMove={handleTagMouseMove}
            onPointerLeave={handleTagMouseLeave}
            style={{ cursor: "grab" }}
          />

          {/* Tag Body (Swings) */}
          <motion.div 
            className="absolute left-[0.47px] top-[1px] w-[228px] h-[339px] pointer-events-none"
            style={{ 
              rotate: smoothedTagRotate,
              transformOrigin: "154px 0px" // Exact top pixel where the string geometrically starts
            }}
          >
            <img src={imgTag} alt="Sleeve info" className="absolute inset-0 w-full h-full object-contain" />
          </motion.div>

          {/* Red Pin rigidly locked to the top pixel of the string precisely at X=154 */}
          <div className="absolute left-[128px] top-[-26px] w-[52px] h-[52px] pointer-events-none z-10">
             <img src={imgPin} alt="Pin" className="absolute inset-0 w-full h-full object-contain drop-shadow-sm" />
          </div>
        </div>
      </div>
    </section>
  );
}
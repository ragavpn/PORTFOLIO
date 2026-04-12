import React, { useState, useEffect, useRef } from "react";
import { motion } from "motion/react";
import imgImage40 from "figma:asset/a24cb39d900485d56afd7b02d380c9d99b9b4d16.png";
import imgImage41 from "figma:asset/66afc10e3f90b9840edfe543845dae245979e005.png";
import imgImage42 from "figma:asset/e581c7139cdf4ade8070e5a6b734b5dadd90a55c.png";
import imgAlbumCover from "figma:asset/62a77fde6c6d2aa05b8e9c0444482f0662e933ae.png";
import imgAlbumCover1 from "figma:asset/ef0a6ae20c2d4a3c3290ea3463a103f482af15e3.png";
import imgAlbumCover2 from "figma:asset/edf7bf626721767d09aac32a43280bb75774dd36.png";
import imgAlbumCover3 from "figma:asset/ca316ceedc3a56e0a96f872ab72e119ec4043b6e.png";
import imgAlbumCover4 from "figma:asset/49ac33d35def1789ef1ba9197bb4fcff07fa477a.png";

const songs = [
  { id: "01", title: "ABOUT YOU", album: "BEING FUNNY IN A FOREIGN LANGUAGE", time: "2:43", artist1: "THE", artist2: "1975", cover: imgAlbumCover },
  { id: "02", title: "CHAMPAGNE PROBLEMS", album: "EVERMORE", time: "2:43", artist1: "TAYLOR", artist2: "SWIFT", cover: imgAlbumCover1 },
  { id: "03", title: "REFLECTIONS", album: "HARD TO IMAGINE THE NEIGHBOURHOOD EVER ..", time: "3:30", artist1: "THE", artist2: "NEIGHBOURHOOD", cover: imgAlbumCover2 },
  { id: "04", title: "DRACULA", album: "DEADBEAT", time: "2:58", artist1: "BEA", artist2: "MILLER", cover: imgAlbumCover3 },
  { id: "05", title: "NOT OK", album: "EVERYONE'S A STAR", time: "2:58", artist1: "CHLOE", artist2: "MORIONDO", cover: imgAlbumCover4 },
  { id: "06", title: "THE ARCHER", album: "EVERMORE", time: "3:16", artist1: "TAYLOR", artist2: "SWIFT", cover: imgAlbumCover1 },
  { id: "07", title: "AUGUST", album: "LOVER", time: "4:21", artist1: "TAYLOR", artist2: "SWIFT", cover: imgAlbumCover1 }
];

export function Songs() {
  const [scale, setScale] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeSongId, setActiveSongId] = useState("02");
  const [progress, setProgress] = useState(0); // Starts at 0:00

  const activeSong = songs.find(s => s.id === activeSongId) || songs[1];
  const TOTAL_SECONDS = React.useMemo(() => {
    const [mins, secs] = activeSong.time.split(':').map(Number);
    return mins * 60 + secs;
  }, [activeSong.time]);

  const audioRef = useRef<HTMLAudioElement>(null);

  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [rotation, setRotation] = useState(0);
  const currentSpeed = useRef(0);
  const isDraggingRef = useRef(false);
  const [isDragging, setIsDragging] = useState(false);
  const vinylRef = useRef<HTMLDivElement>(null);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;
    const maxScroll = target.scrollHeight - target.clientHeight;
    setScrollProgress(maxScroll > 0 ? target.scrollTop / maxScroll : 0);
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(e => console.error("Audio play failed:", e));
      }
    }
  };

  const handleSongClick = (songId: string) => {
    if (songId === activeSongId) {
      togglePlay();
      return;
    }
    setActiveSongId(songId);
    setProgress(0);
    setIsPlaying(true);
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      // Small timeout to allow state to settle
      setTimeout(() => {
        audioRef.current?.play().catch(e => console.error("Audio play failed:", e));
      }, 50);
    }
  };

  // Scalable 1920x1080 Canvas Setup for Perfect Reference Matching
  useEffect(() => {
    const updateScale = () => {
      const s = Math.min(window.innerWidth / 1920, window.innerHeight / 1080);
      setScale(s);
    };
    updateScale();
    window.addEventListener("resize", updateScale);
    return () => window.removeEventListener("resize", updateScale);
  }, []);

  // Song Progress & Vinyl Rotation Animation
  useEffect(() => {
    let animationFrame: number;
    let lastTime = Date.now();
    
    const updateLoop = () => {
      const now = Date.now();
      const delta = (now - lastTime) / 1000;
      lastTime = now;
      
      // Target speed: 360 degrees / 15s = 24 deg/s
      const TARGET_SPEED = isPlaying ? 24 : 0;
      
      // Lerp the speed for smooth start/stop
      currentSpeed.current += (TARGET_SPEED - currentSpeed.current) * (delta * 3); // easing factor 3
      
      // Update rotation
      if (Math.abs(currentSpeed.current) > 0.05) {
        setRotation(r => (r + currentSpeed.current * delta) % 360);
      }
      
      // Update progress only if not dragging
      if (isPlaying && !isDraggingRef.current) {
        setProgress(p => {
          const newProgress = p + delta / TOTAL_SECONDS;
          return newProgress > 1 ? 0 : newProgress;
        });
      }
      
      animationFrame = requestAnimationFrame(updateLoop);
    };
    
    animationFrame = requestAnimationFrame(updateLoop);
    
    return () => {
      if (animationFrame) cancelAnimationFrame(animationFrame);
    };
  }, [isPlaying, TOTAL_SECONDS]);

  // Calculate Time Details
  const currentTime = Math.min(TOTAL_SECONDS, Math.max(0, Math.floor(progress * TOTAL_SECONDS)));
  const currentMinutes = Math.floor(currentTime / 60);
  const currentSeconds = (currentTime % 60).toString().padStart(2, '0');

  // Math for SVG Arc & Dot Position (9 o'clock to 6 o'clock)
  const fullArcLength = 1.5 * Math.PI * 493; // 270 degrees (9 to 6)
  const staticArcLength = 0.5 * Math.PI * 493; // 90 degrees (9 to 12)
  const visibleLength = staticArcLength + progress * (Math.PI * 493);
  
  const angle = progress * Math.PI - Math.PI / 2; // -90 deg to +90 deg (12 to 6)
  const dotX = 494.5 + 493 * Math.cos(angle);
  const dotY = 494.5 + 493 * Math.sin(angle);

  const updateProgressFromPointer = (clientX: number, clientY: number) => {
    if (!vinylRef.current) return;
    const rect = vinylRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const dx = clientX - centerX;
    const dy = clientY - centerY;
    let dragAngle = Math.atan2(dy, dx);
    
    // Normalize logic for 12 o'clock (-pi/2) to 6 o'clock (+pi/2)
    if (dx < 0) {
      if (dy < 0) dragAngle = -Math.PI / 2;
      else dragAngle = Math.PI / 2;
    }
    
    let newProgress = (dragAngle + Math.PI / 2) / Math.PI;
    newProgress = Math.max(0, Math.min(1, newProgress));
    
    setProgress(newProgress);
    if (audioRef.current) {
      audioRef.current.currentTime = newProgress * TOTAL_SECONDS;
    }
  };

  useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
      if (isDraggingRef.current) {
        updateProgressFromPointer(e.clientX, e.clientY);
      }
    };
    const handlePointerUp = () => {
      if (isDraggingRef.current) {
        isDraggingRef.current = false;
        setIsDragging(false);
      }
    };
    
    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);
    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
    };
  }, [TOTAL_SECONDS]);

  const handlePointerDown = (e: React.PointerEvent) => {
    isDraggingRef.current = true;
    setIsDragging(true);
    updateProgressFromPointer(e.clientX, e.clientY);
  };

  return (
    <section 
      className="bg-[#fffcf3] relative w-full overflow-hidden" 
      style={{ height: `${1080 * scale + 100}px` }}
      data-name="SongsRec"
    >
      <audio 
        ref={audioRef} 
        src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" 
        loop
      />
      {/* Exact 1920x1080 Canvas Scaled to Window */}
      <div
        className="absolute left-1/2 top-[0px] w-[1920px] h-[1080px] origin-top m-[0px]"
        style={{ transform: `translate(-50%, 0) scale(${scale})` }}
      >
        
        {/* TOP NAVBAR / MARQUEE */}
        

        {/* VINYL DISPLAY (Left Side) */}
        {/* The center of the vinyl track is placed at Left: 60px, Top: 602px (pushed right) */}
        <div ref={vinylRef} className="absolute left-[60px] top-[602px] w-[989px] h-[989px] -translate-x-1/2 -translate-y-1/2 z-10 scale-110" data-name="Vinyl display">
          
          {/* Base Gray Circular Track */}
          <svg className="absolute inset-0 w-[989px] h-[989px] pointer-events-none" viewBox="0 0 989 989" fill="none">
            <circle cx="494.5" cy="494.5" r="493" stroke="url(#trackGradient)" strokeOpacity="0.28" strokeWidth="2" />
            <defs>
              <linearGradient id="trackGradient" x1="494.5" x2="502.7" y1="0" y2="989" gradientUnits="userSpaceOnUse">
                <stop stopColor="#666666" stopOpacity="0" />
                <stop offset="1" stopColor="#666666" stopOpacity="0.78" />
              </linearGradient>
            </defs>
          </svg>

          {/* Red Progress Arc (From 9 o'clock to 6 o'clock) */}
          <svg className="absolute inset-0 w-[989px] h-[989px] pointer-events-none m-[0px]" viewBox="0 0 989 989" fill="none">
            <path 
              d="M 1.5 494.5 A 493 493 0 1 1 494.5 987.5" 
              stroke="#720808" 
              strokeWidth="3" 
              strokeDasharray={fullArcLength}
              strokeDashoffset={fullArcLength - visibleLength}
              className="transition-[stroke-dashoffset] duration-100 ease-linear"
            />
          </svg>

          {/* Spinning Vinyl Image */}
          {/* Spinning logic updated to slowly start and stop rotating using JS interpolation */}
          <div 
            className="absolute left-1/2 top-1/2 w-[935.5px] h-[941.6px] mix-blend-multiply overflow-hidden rounded-full origin-center"
            style={{ transform: `translate(-50%, -50%) rotate(${rotation}deg)` }}
          >
             <img src={imgImage40} alt="Vinyl Record" className="absolute w-[100.66%] h-[139.99%] left-[-0.44%] top-[-19.79%] max-w-none object-cover pointer-events-none" />
          </div>

          {/* Center Hole Background (Beige) */}
          <div className="absolute w-[363px] h-[363px] bg-[#FFFCF3] rounded-full left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />

          {/* Center Waveform Graphic */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-end gap-[5px] h-[48px]">
            <style>{`
              @keyframes waveform {
                0%, 100% { transform: scaleY(0.2); }
                50% { transform: scaleY(1); }
              }
            `}</style>
            <div className="w-[7px] h-[38px] bg-[#c80f0f] origin-bottom" style={{ animation: isPlaying ? 'waveform 0.9s ease-in-out infinite' : 'none' }} />
            <div className="w-[7px] h-[48px] bg-[#c80f0f] origin-bottom" style={{ animation: isPlaying ? 'waveform 1.1s ease-in-out infinite 0.2s' : 'none' }} />
            <div className="w-[7px] h-[34px] bg-[#c80f0f] origin-bottom" style={{ animation: isPlaying ? 'waveform 0.8s ease-in-out infinite 0.4s' : 'none' }} />
            <div className="w-[7px] h-[39px] bg-[#c80f0f] origin-bottom" style={{ animation: isPlaying ? 'waveform 1.2s ease-in-out infinite 0.1s' : 'none' }} />
          </div>

          {/* Song Text (Static overlay over vinyl) */}
          <div className="absolute left-[664px] top-[485px] flex text-white w-[250px] z-20 mx-[25px] my-[0px]">
            <span className="font-['Inter'] font-semibold text-[19px] leading-[0.85] mt-1 mr-[10px] shrink-0">{activeSong.id}.</span>
            <div className="font-['Inter'] font-medium text-[30px] leading-[0.96] break-words">
              {activeSong.title}
            </div>
          </div>
          
          {/* Red Dot Indicator animating along the arc */}
          <div 
            className={`absolute -translate-x-1/2 -translate-y-1/2 z-20 ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
            style={{ left: `${dotX}px`, top: `${dotY}px`, transition: isDragging ? 'none' : 'all 100ms linear' }}
            onPointerDown={handlePointerDown}
          >
            <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
              <circle cx="18" cy="18" r="18" fill="#FFFCF3" />
              <circle cx="18" cy="18" r="16.6" stroke="black" strokeOpacity="0.3" strokeWidth="2.6" />
              <circle cx="18" cy="18" r="7" fill="#C80F0F" />
            </svg>
          </div>

          {/* Runtime underneath the vinyl arc */}
          <div className="absolute left-[818px] top-[923px] flex font-['JetBrains_Mono'] font-medium text-[19px] gap-[5px] z-20">
            <span className="text-black">{currentMinutes}:{currentSeconds}</span>
            <span className="text-black">/</span>
            <span className="text-black/50">{activeSong.time}</span>
          </div>

        </div>

        {/* ARTIST NAME & GENRES */}
        <div className="absolute left-[740px] top-[127px] w-[736px] flex flex-col z-10" data-name="Artist Name">
          <p className="font-['Space_Grotesk'] text-[160px] font-normal leading-[0.853] tracking-[-8px] text-black self-start whitespace-nowrap">{activeSong.artist1}</p>
          <div className="w-full flex justify-start">
            <p className="font-['Space_Grotesk'] text-[160px] font-normal leading-[0.853] tracking-[-8px] text-black text-left w-full whitespace-nowrap">{activeSong.artist2}</p>
          </div>
        </div>

        <div className="absolute left-[740px] top-[408px] flex gap-[18px] font-['Inter',sans-serif] font-medium text-[26px] tracking-[-2px] text-black z-10" data-name="Genres">
          <span>INDIE - FOLK ,</span>
          <span>CHAMBER POP ,</span>
          <span>BALLAD</span>
        </div>

        {/* SONGS LIST */}
        <div className="absolute left-[740px] right-[0px] top-[516px] flex flex-col gap-[36px] z-10" data-name="Top Songs">
          
          {/* Header */}
          <div className="flex justify-between w-full items-center pl-[20px] pr-[10px]">
            <div className="flex items-center gap-[24px]">
              <h3 className="text-[#c80f0f] text-[30px] font-['Inter',sans-serif] font-normal tracking-[-2px] whitespace-nowrap leading-[0.853]">SOME FAVOURITES</h3>
              <button 
                onClick={togglePlay}
                className="w-[24px] h-[26px] flex items-center justify-center text-[#c80f0f] hover:scale-110 transition-transform shrink-0"
              >
                {isPlaying ? (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg>
                ) : (
                  <svg width="36" height="38" viewBox="0 0 36 38" fill="none">
                    <g filter="url(#filter0_d_2_3930)">
                      <path d="M26.2407 15.6599C27.6083 16.4258 27.6083 18.3753 26.2407 19.1412L12.5698 26.804C11.1685 27.5891 9.38883 26.5796 9.38883 24.9634L9.38883 9.83777C9.38883 8.22156 11.1685 7.21204 12.5698 7.99712L26.2407 15.6599Z" fill="#C80F0F"/>
                    </g>
                    <defs>
                      <filter id="filter0_d_2_3930" x="0" y="0" width="36" height="38" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                        <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                        <feOffset dx="1" dy="2"/>
                        <feGaussianBlur stdDeviation="3"/>
                        <feComposite in2="hardAlpha" operator="out"/>
                        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.39 0"/>
                        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_2_3930"/>
                        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_2_3930" result="shape"/>
                      </filter>
                    </defs>
                  </svg>
                )}
              </button>
            </div>
            <button className="text-[19px] font-['Inter',sans-serif] font-medium underline tracking-[-1.5px] text-black leading-[0.853] hover:opacity-70 transition-opacity whitespace-nowrap">VIEW PLAYLIST</button>
          </div>
          
          {/* Track List + Scrollbar Container */}
          <div className="relative w-full h-[422px] overflow-hidden">
            
            {/* Songs Column */}
            <div 
              ref={scrollRef}
              onScroll={handleScroll}
              data-lenis-prevent="true"
              className="absolute left-0 right-[24px] top-0 flex flex-col gap-[6px] h-[422px] overflow-y-auto"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              <style>{`
                ::-webkit-scrollbar { display: none; }
              `}</style>
              {songs.map((song, i) => {
                const isActive = song.id === activeSongId;
                return (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ delay: i * 0.1, duration: 0.5 }}
                    key={`${song.id}-${i}`} 
                    onClick={() => handleSongClick(song.id)}
                    className={`flex justify-between items-center w-full group transition-colors duration-300 cursor-pointer rounded-[14px] px-[20px] py-[10px] ${isActive ? 'bg-black/[0.04]' : 'bg-transparent hover:bg-black/[0.02]'}`}
                  >
                    {/* Left: ID, Cover, Titles */}
                    <div className="flex items-center gap-[28px] min-w-0 flex-1 mr-[20px]">
                      
                      {/* ID and Cover (122px) */}
                      <div className="flex items-center justify-between w-[122px] shrink-0">
                        <span className="font-['Inter',sans-serif] tracking-[-1px] font-semibold text-[19px] text-black leading-[0.853] whitespace-nowrap">{song.id}</span>
                        <div className="w-[70px] h-[70px] rounded-[6px] shrink-0 transition-transform duration-500 group-hover:scale-110 relative overflow-hidden bg-[#d9d9d9]">
                          {song.cover && <img src={song.cover} alt="Album Cover" className="w-full h-full object-cover pointer-events-none absolute inset-0" />}
                        </div>
                      </div>

                      {/* Song Title and Album */}
                      <div className="flex flex-col items-start min-w-0 flex-1 leading-[0.96]">
                        <span className="font-['Inter',sans-serif] tracking-[-1px] font-medium text-[19px] text-black uppercase whitespace-nowrap overflow-hidden text-ellipsis w-full">{song.title}</span>
                        <span className="font-['Inter',sans-serif] tracking-[-1px] font-medium text-[19px] text-black/50 uppercase whitespace-nowrap overflow-hidden text-ellipsis w-full mt-[6px]">{song.album}</span>
                      </div>

                    </div>

                    {/* Right: Time */}
                    <span className="font-['JetBrains_Mono'] font-medium text-[19px] text-black leading-[0.86] whitespace-nowrap shrink-0">{song.time}</span>
                  </motion.div>
                );
              })}
            </div>

            {/* Custom Scrollbar */}
            <div className="absolute right-0 top-[27px] w-[9px] h-[368px] bg-black/20 shrink-0 rounded-full overflow-hidden">
              <motion.div 
                className="absolute left-0 w-[9px] h-[191px] bg-black rounded-full" 
                animate={{ top: scrollProgress * (368 - 191) }}
                transition={{ type: "spring", stiffness: 400, damping: 40, mass: 0.8 }}
              />
            </div>

          </div>
        </div>

        {/* HANGING TAG (Top Right) */}
        {/* Adjusted to precisely match the overlapping tag look aligned with the new wider song list */}
        <div className="absolute right-[-50px] top-[90px] w-[270px] h-[339px] z-30" data-name="Hanging Tag">
          
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative w-full h-[400px]">
               <img src="/src/imports/bookmark.png" alt="Tag Background" className="w-full h-full object-contain pointer-events-none" />
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
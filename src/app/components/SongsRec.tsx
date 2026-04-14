import React, { useLayoutEffect, useState, useEffect } from "react";
import imgImage40 from "../../assets/a24cb39d900485d56afd7b02d380c9d99b9b4d16.png";
import imgImage41 from "../../assets/66afc10e3f90b9840edfe543845dae245979e005.png";
import imgImage42 from "../../assets/e581c7139cdf4ade8070e5a6b734b5dadd90a55c.png";

const songs = [
  { id: "01", title: "ABOUT YOU", album: "BEING FUNNY IN A FOREIGN LANGUAGE", time: "2:43" },
  { id: "02", title: "CHAMPAGNE PROBLEMS", album: "EVERMORE", time: "2:43" },
  { id: "03", title: "REFLECTIONS", album: "HARD TO IMAGINE THE NEIGHBOURHOOD EVER ..", time: "3:30" },
  { id: "04", title: "DRACULA", album: "DEADBEAT", time: "2:58" },
  { id: "05", title: "NOT OK", album: "EVERYONE'S A STAR", time: "2:58" },
];

export function SongsRec() {
  const [scale, setScale] = useState(1);

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

  return (
    <section className="bg-[#fffcf3] relative w-full h-screen overflow-hidden" data-name="SongsRec">
      {/* Exact 1920x1080 Canvas Scaled to Window */}
      <div
        className="absolute left-1/2 top-1/2 w-[1920px] h-[1080px] origin-center"
        style={{ transform: `translate(-50%, -50%) scale(${scale})` }}
      >
        
        {/* TOP NAVBAR / MARQUEE */}
        <div className="absolute top-[13px] left-1/2 -translate-x-1/2 w-[1890px] h-[75px] rounded-[20px] z-50">
          <div className="absolute top-1/2 left-[50%] -translate-x-1/2 -translate-y-1/2 w-[1835px] h-[36px]">
            {/* Logo/Ticker text */}
            <div className="absolute left-[30px] top-[4px] pointer-events-none">
              <span className="font-['Space_Grotesk'] font-light tracking-[-0.75px] text-[25px] text-[#090909]">ragavwithouttheh</span>
            </div>
            {/* Hamburger Icon */}
            <div className="absolute left-[1777px] top-[1px] w-[51px] h-[33px] bg-[#FFFCF3]/50 backdrop-blur-[2.85px] rounded-sm flex flex-col justify-center items-center gap-[6px] border border-black/10 cursor-pointer hover:bg-black/5 transition-colors">
              <div className="w-[39px] h-[2px] bg-[#090909]" />
              <div className="w-[39px] h-[2px] bg-[#090909]" />
            </div>
          </div>
        </div>

        {/* VINYL DISPLAY (Left Side) */}
        {/* The center of the vinyl track is placed at Left: 94px, Top: 602px based on the Figma calculations */}
        <div className="absolute left-[94px] top-[602px] w-[989px] h-[989px] -translate-x-1/2 -translate-y-1/2 z-10" data-name="Vinyl display">
          
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

          {/* Red Progress Arc (From roughly 12 o'clock to 3 o'clock) */}
          <svg className="absolute inset-0 w-[989px] h-[989px] pointer-events-none" viewBox="0 0 989 989" fill="none">
            <path d="M 494.5 1.5 A 493 493 0 0 1 987.5 494.5" stroke="#720808" strokeWidth="3" />
          </svg>

          {/* Spinning Vinyl Image */}
          {/* We only spin this specific image as requested */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[935.5px] h-[941.6px] mix-blend-multiply overflow-hidden rounded-full animate-[spin_15s_linear_infinite] origin-center">
             <img src={imgImage40} alt="Vinyl Record" className="absolute w-[100.66%] h-[139.99%] left-[-0.44%] top-[-19.79%] max-w-none object-cover pointer-events-none" />
          </div>

          {/* Center Hole Background (Beige) */}
          <div className="absolute w-[363px] h-[363px] bg-[#FFFCF3] rounded-full left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />

          {/* Center Waveform Graphic */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-end gap-[5px] h-[48px]">
            <div className="w-[7px] h-[38px] bg-[#c80f0f]" />
            <div className="w-[7px] h-[48px] bg-[#c80f0f]" />
            <div className="w-[7px] h-[34px] bg-[#c80f0f]" />
            <div className="w-[7px] h-[39px] bg-[#c80f0f]" />
          </div>

          {/* "02. CHAMPAGNE PROBLEMS" Text (Static overlay over vinyl) */}
          <div className="absolute left-[664px] top-[485px] flex text-white whitespace-nowrap z-20">
            <span className="font-['Inter'] font-semibold text-[19px] leading-[0.85] mt-1 mr-[10px]">02.</span>
            <div className="flex flex-col font-['Inter'] font-medium text-[30px] leading-[0.96]">
              <span>CHAMPAGNE</span>
              <span>PROBLEMS</span>
            </div>
          </div>
          
          {/* Red Dot Indicator at 3 o'clock end of the red arc */}
          <div className="absolute left-[987.5px] top-[494.5px] -translate-x-1/2 -translate-y-1/2 z-20">
            <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
              <circle cx="18" cy="18" r="18" fill="#FFFCF3" />
              <circle cx="18" cy="18" r="16.6" stroke="black" strokeOpacity="0.3" strokeWidth="2.6" />
              <circle cx="18" cy="18" r="7" fill="#C80F0F" />
            </svg>
          </div>

          {/* Runtime underneath the vinyl arc */}
          <div className="absolute left-[818px] top-[923px] flex font-['JetBrains_Mono'] font-medium text-[19px] gap-[5px] z-20">
            <span className="text-black">2:43</span>
            <span className="text-black">/</span>
            <span className="text-black/50">5:05</span>
          </div>

        </div>

        {/* ARTIST NAME & GENRES */}
        <div className="absolute left-[764px] top-[127px] w-[736px] flex flex-col z-10" data-name="Artist Name">
          <p className="font-['Space_Grotesk'] text-[160px] leading-[0.853] tracking-[-8px] text-black self-start">TAYLOR</p>
          {/* 'SWIFT' is horizontally centered in the block in the Figma layout */}
          <div className="w-full flex justify-center px-[10px]">
            <p className="font-['Space_Grotesk'] text-[160px] leading-[0.853] tracking-[-8px] text-black text-center w-full">SWIFT</p>
          </div>
        </div>

        <div className="absolute left-[793px] top-[408px] flex gap-[18px] font-['Inter'] font-medium text-[26px] tracking-[-1.3px] text-black z-10" data-name="Genres">
          <span>INDIE - FOLK ,</span>
          <span>CHAMBER POP ,</span>
          <span>BALLAD</span>
        </div>

        {/* SONGS LIST */}
        <div className="absolute left-[741px] top-[516px] w-[1137px] flex flex-col gap-[36px] z-10">
          
          {/* Header */}
          <div className="flex justify-between w-[1085px] items-center">
            <h3 className="text-[#c80f0f] text-[30px] font-['Inter'] tracking-[-1.5px]">SOME FAVOURITES</h3>
            <button className="text-[19px] font-['Inter'] font-medium underline tracking-[-0.95px] text-black hover:opacity-70 transition-opacity">VIEW PLAYLIST</button>
          </div>
          
          {/* Track List + Scrollbar */}
          <div className="flex w-full gap-[29px] items-start">
            
            {/* Songs Column */}
            <div className="flex flex-col gap-[18px] w-[1093px]">
              {songs.map((song) => (
                <div key={song.id} className="flex justify-between items-center w-full group hover:bg-black/5 transition-colors p-2 -ml-2 rounded-xl cursor-pointer">
                  {/* Left: ID, Cover, Titles */}
                  <div className="flex items-center gap-[28px]">
                    <span className="font-['Inter'] font-semibold text-[19px] text-black leading-[0.85] w-[25px]">{song.id}</span>
                    <div className="w-[70px] h-[70px] bg-[#d9d9d9] rounded-[6px] shrink-0" />
                    <div className="flex flex-col w-[400px]">
                      <span className="font-['Inter'] font-medium text-[19px] text-black leading-[0.96] mb-[6px] uppercase">{song.title}</span>
                      <span className="font-['Inter'] font-medium text-[19px] text-black/50 leading-[0.96] uppercase">{song.album}</span>
                    </div>
                  </div>
                  {/* Right: Time */}
                  <span className="font-['JetBrains_Mono'] font-medium text-[19px] text-black leading-[0.86]">{song.time}</span>
                </div>
              ))}
            </div>

            {/* Custom Scrollbar */}
            <div className="w-[9px] h-[368px] bg-black/20 rounded-full mt-[10px] shrink-0 relative">
              <div className="absolute top-0 w-[9px] h-[80px] bg-black rounded-full" />
            </div>

          </div>
        </div>

        {/* HANGING TAG (Top Right) */}
        {/* Adjusted to precisely match the overlapping tag look */}
        <div className="absolute left-[1696px] top-[90px] w-[270px] h-[339px] z-30" data-name="Hanging Tag">
          
          {/* Tag string & background image (flipped as per Figma snippet) */}
          <div className="absolute inset-0 rotate-180 -scale-y-100 flex items-center justify-center">
            <div className="relative w-[270px] h-[339px] overflow-hidden">
               <img src={imgImage41} alt="Tag Background" className="absolute w-full h-[119.61%] left-0 top-0 max-w-none object-cover pointer-events-none" />
            </div>
          </div>
          
          {/* Text inside Tag */}
          <div className="absolute left-[176px] top-[154px] w-[81px] text-right text-white font-['Inter'] text-[19px] tracking-[-1.14px] leading-[1.04] -translate-x-full z-10 pointer-events-none">
            <p className="mb-0">A Music Loverâ€™s Worst Nightmare</p>
            <p className="mb-0">&nbsp;</p>
            <p>{` - Picking their Top Songs`}</p>
          </div>
          
          {/* Red Pin Image overlapping the top hole */}
          <div className="absolute left-[130px] top-[-18px] w-[48px] h-[50px] z-20">
             <img src={imgImage42} alt="Red Pin" className="absolute w-[255.32%] h-[244.9%] left-[-105.53%] top-[-55.92%] max-w-none pointer-events-none" />
          </div>

        </div>

      </div>
    </section>
  );
}
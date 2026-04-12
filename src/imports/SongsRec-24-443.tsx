import imgImage40 from "figma:asset/a24cb39d900485d56afd7b02d380c9d99b9b4d16.png";
import imgImage41 from "figma:asset/66afc10e3f90b9840edfe543845dae245979e005.png";
import imgImage42 from "figma:asset/e581c7139cdf4ade8070e5a6b734b5dadd90a55c.png";

function Frame1() {
  return (
    <div className="absolute h-[503.23px] left-[-23.67px] top-[2.06px] w-[988.966px]">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 988.966 503.23">
        <g clipPath="url(#clip0_2_3932)" id="Frame 33">
          <circle cx="494.483" cy="494.483" id="Ellipse 3" r="492.939" stroke="var(--stroke-0, #720808)" strokeWidth="3.0873" />
        </g>
        <defs>
          <clipPath id="clip0_2_3932">
            <rect fill="white" height="503.23" width="988.966" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function SongDetails() {
  return (
    <div className="absolute h-[52px] left-[664.1px] not-italic text-white top-[492px] w-[253px] whitespace-nowrap" data-name="Song details">
      <p className="absolute font-['Inter_Display:SemiBold',sans-serif] leading-[0.853] left-0 text-[19px] top-[5px]">02.</p>
      <div className="absolute font-['Inter_Display:Medium',sans-serif] leading-[0] left-[43px] text-[30px] top-[-5px]">
        <p className="leading-[0.96] mb-0">CHAMPAGNE</p>
        <p className="leading-[0.96]">PROBLEMS</p>
      </div>
    </div>
  );
}

function Waveform() {
  return (
    <div className="-translate-x-1/2 -translate-y-1/2 absolute content-stretch flex gap-[5px] items-end left-[calc(50%+0.28px)] top-[calc(50%+0.21px)]" data-name="Waveform">
      <div className="bg-[#c80f0f] h-[38px] shrink-0 w-[7px]" />
      <div className="bg-[#c80f0f] h-[48px] shrink-0 w-[7px]" />
      <div className="bg-[#c80f0f] h-[34px] shrink-0 w-[7px]" />
      <div className="bg-[#c80f0f] h-[39px] shrink-0 w-[7px]" />
    </div>
  );
}

function Group() {
  return (
    <div className="absolute left-[945.74px] size-[36.019px] top-[487.79px]">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 36.0186 36.0187">
        <g id="Group 3">
          <g id="Ellipse 4">
            <circle cx="18.0093" cy="18.0093" fill="var(--fill-0, #FFFCF3)" r="18.0093" />
            <circle cx="18.0093" cy="18.0093" r="16.6752" stroke="var(--stroke-0, black)" strokeOpacity="0.3" strokeWidth="2.66804" />
          </g>
          <circle cx="18.0099" cy="18.0094" fill="var(--fill-0, #C80F0F)" id="Ellipse 5" r="6.92664" />
        </g>
      </svg>
    </div>
  );
}

function Runtime() {
  return (
    <div className="absolute content-stretch flex font-['JetBrains_Mono:Medium',sans-serif] font-medium gap-[5px] items-center leading-[0.86] left-[818.1px] text-[19px] top-[923px] whitespace-nowrap" data-name="Runtime">
      <p className="relative shrink-0 text-black">2:43</p>
      <p className="relative shrink-0 text-black">/</p>
      <p className="relative shrink-0 text-[rgba(0,0,0,0.5)]">5:05</p>
    </div>
  );
}

function VinylDisplay() {
  return (
    <div className="-translate-x-1/2 -translate-y-1/2 absolute h-[993.082px] left-[calc(50%-866.28px)] top-[calc(50%+61.54px)] w-[941.627px]" data-name="Vinyl display">
      <div className="absolute h-[941.627px] left-[4.12px] mix-blend-multiply top-[21.61px] w-[935.453px]" data-name="image 40">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img alt="" className="absolute h-[139.99%] left-[-0.44%] max-w-none top-[-19.79%] w-[100.66%]" src={imgImage40} />
        </div>
      </div>
      <div className="absolute left-[289.18px] size-[363.273px] top-[302.56px]">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 363.273 363.273">
          <circle cx="181.636" cy="181.636" fill="var(--fill-0, #FFFCF3)" id="Ellipse 1" r="181.636" />
        </svg>
      </div>
      <div className="-translate-x-1/2 -translate-y-1/2 absolute left-[calc(50%-0.05px)] size-[988.966px] top-[calc(50%-0.16px)]">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 988.966 988.966">
          <circle cx="494.483" cy="494.483" id="Ellipse 2" r="493.454" stroke="url(#paint0_linear_24_124)" strokeOpacity="0.28" strokeWidth="2.0582" />
          <defs>
            <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_24_124" x1="494.483" x2="502.716" y1="-2.45357e-07" y2="988.966">
              <stop />
              <stop offset="1" stopColor="#666666" stopOpacity="0.78" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      <Frame1 />
      <SongDetails />
      <Waveform />
      <Group />
      <Runtime />
    </div>
  );
}

function Frame9() {
  return (
    <div className="content-stretch flex items-center justify-center px-[10px] relative shrink-0">
      <p className="font-['Space_Grotesk:Regular',sans-serif] font-normal leading-[0.853] relative shrink-0 text-[160px] text-black text-center tracking-[-8px] whitespace-nowrap">SWIFT</p>
    </div>
  );
}

function ArtistName() {
  return (
    <div className="absolute content-stretch flex flex-col items-start justify-center left-[764px] top-[127px] w-[736px]" data-name="Artist Name">
      <p className="font-['Space_Grotesk:Regular',sans-serif] font-normal leading-[0.853] relative shrink-0 text-[160px] text-black tracking-[-8px] whitespace-nowrap">TAYLOR</p>
      <Frame9 />
    </div>
  );
}

function Frame() {
  return (
    <div className="absolute h-[33px] left-[1777px] top-px w-[51px]">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 51 33">
        <foreignObject height="44.4" width="62.4" x="-5.7" y="-5.7">
          <div style={{ backdropFilter: "blur(2.85px)", clipPath: "url(#bgblur_0_2_3993_clip_path)", height: "100%", width: "100%" }} xmlns="http://www.w3.org/1999/xhtml" />
        </foreignObject>
        <g data-figma-bg-blur-radius="5.7" id="Frame 20">
          <rect fill="var(--fill-0, #FFFCF3)" height="33" rx="2" width="51" />
          <line id="Line 1" stroke="var(--stroke-0, #090909)" strokeWidth="2" x1="6" x2="45" y1="9" y2="9" />
          <line id="Line 2" stroke="var(--stroke-0, #090909)" strokeWidth="2" x1="6" x2="45" y1="24" y2="24" />
        </g>
        <defs>
          <clipPath id="bgblur_0_2_3993_clip_path" transform="translate(5.7 5.7)">
            <rect height="33" rx="2" width="51" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Frame14() {
  return (
    <div className="-translate-x-1/2 -translate-y-1/2 absolute h-[36px] left-[calc(50%+6.5px)] overflow-clip top-[calc(50%+0.5px)] w-[1835px]">
      <div className="absolute bottom-0 h-[36px] left-[-238px] pointer-events-none top-0">
        <p className="font-['SG_Grotesk_DEMO:Light_DEMO',sans-serif] leading-[normal] not-italic pointer-events-auto sticky text-[#090909] text-[25px] top-0 tracking-[-0.75px] whitespace-nowrap">ragavwithouttheh</p>
      </div>
      <Frame />
    </div>
  );
}

function Frame13() {
  return (
    <div className="-translate-x-1/2 absolute h-[75px] left-[calc(50%-1px)] rounded-[20px] top-[13px] w-[1890px]">
      <Frame14 />
    </div>
  );
}

function Frame2() {
  return (
    <div className="absolute h-[339px] left-[1696px] top-[90px] w-[270px]">
      <div className="absolute flex h-[339px] items-center justify-center left-0 top-0 w-[270px]">
        <div className="-scale-y-100 flex-none rotate-180">
          <div className="h-[339px] relative w-[270px]" data-name="image 41">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <img alt="" className="absolute h-[119.61%] left-0 max-w-none top-0 w-full" src={imgImage41} />
            </div>
          </div>
        </div>
      </div>
      <div className="-translate-x-full absolute font-['Inter_Display:Regular',sans-serif] h-[156px] leading-[0] left-[176px] not-italic text-[19px] text-right text-white top-[154px] tracking-[-1.14px] w-[81px] whitespace-pre-wrap">
        <p className="leading-[1.04] mb-0">A Music Lover’s Worst Nightmare</p>
        <p className="leading-[1.04] mb-0">&nbsp;</p>
        <p className="leading-[1.04]">{` - Picking their Top Songs`}</p>
      </div>
      <div className="absolute h-[50px] left-[130px] top-[-18px] w-[48px]" data-name="image 42">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img alt="" className="absolute h-[244.9%] left-[-105.53%] max-w-none top-[-55.92%] w-[255.32%]" src={imgImage42} />
        </div>
      </div>
    </div>
  );
}

function Genres() {
  return (
    <div className="absolute content-stretch flex font-['Inter_Display:Medium',sans-serif] gap-[18px] items-center leading-[0.853] left-[793px] not-italic text-[26px] text-black top-[408px] tracking-[-1.3px] whitespace-nowrap" data-name="Genres">
      <p className="relative shrink-0">INDIE - FOLK ,</p>
      <p className="relative shrink-0">CHAMBER POP ,</p>
      <p className="relative shrink-0">BALLAD</p>
    </div>
  );
}

function Frame3() {
  return (
    <div className="content-stretch flex items-center justify-between leading-[0.853] not-italic relative shrink-0 w-[1085px] whitespace-nowrap">
      <p className="font-['Inter_Display:Regular',sans-serif] relative shrink-0 text-[#c80f0f] text-[30px] tracking-[-1.5px]">SOME FAVOURITES</p>
      <p className="decoration-solid font-['Inter_Display:Medium',sans-serif] relative shrink-0 text-[19px] text-black text-right tracking-[-0.95px] underline">VIEW PLAYLIST</p>
    </div>
  );
}

function Frame8() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-[122px]">
      <p className="font-['Inter_Display:SemiBold',sans-serif] leading-[0.853] not-italic relative shrink-0 text-[19px] text-black whitespace-nowrap">01</p>
      <div className="bg-[#d9d9d9] rounded-[6px] shrink-0 size-[70px]" data-name="ALBUM COVER" />
    </div>
  );
}

function Frame4() {
  return (
    <div className="content-stretch flex flex-col font-['Inter_Display:Medium',sans-serif] items-start leading-[0.96] not-italic relative shrink-0 text-[19px] w-[223px]">
      <p className="min-w-full relative shrink-0 text-black w-[min-content]">ABOUT YOU</p>
      <p className="relative shrink-0 text-[rgba(0,0,0,0.5)] whitespace-nowrap">BEING FUNNY IN A FOREIGN LANGUAGE</p>
    </div>
  );
}

function Frame5() {
  return (
    <div className="content-stretch flex gap-[28px] items-center relative shrink-0">
      <Frame8 />
      <Frame4 />
    </div>
  );
}

function Frame6() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full">
      <Frame5 />
      <p className="font-['JetBrains_Mono:Medium',sans-serif] font-medium leading-[0.86] relative shrink-0 text-[19px] text-black whitespace-nowrap">2:43</p>
    </div>
  );
}

function Frame12() {
  return (
    <div className="content-stretch flex flex-col font-['Inter_Display:Medium',sans-serif] items-start leading-[0.96] not-italic relative shrink-0 text-[19px] w-[223px]">
      <p className="relative shrink-0 text-black w-full">CHAMPAGNE PROBLEMS</p>
      <p className="relative shrink-0 text-[rgba(0,0,0,0.5)] w-full">EVERMORE</p>
    </div>
  );
}

function Frame11() {
  return (
    <div className="content-stretch flex gap-[28px] items-center relative shrink-0">
      <p className="font-['Inter_Display:SemiBold',sans-serif] leading-[0.853] not-italic relative shrink-0 text-[19px] text-black whitespace-nowrap">02</p>
      <div className="bg-[#d9d9d9] rounded-[6px] shrink-0 size-[70px]" data-name="ALBUM COVER" />
      <Frame12 />
    </div>
  );
}

function Frame7() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full">
      <Frame11 />
      <p className="font-['JetBrains_Mono:Medium',sans-serif] font-medium leading-[0.86] relative shrink-0 text-[19px] text-black whitespace-nowrap">2:43</p>
    </div>
  );
}

function Frame17() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-[122px]">
      <p className="font-['Inter_Display:SemiBold',sans-serif] leading-[0.853] not-italic relative shrink-0 text-[19px] text-black whitespace-nowrap">03</p>
      <div className="bg-[#d9d9d9] rounded-[6px] shrink-0 size-[70px]" data-name="ALBUM COVER" />
    </div>
  );
}

function Frame18() {
  return (
    <div className="content-stretch flex flex-col font-['Inter_Display:Medium',sans-serif] items-start leading-[0.96] not-italic relative shrink-0 text-[19px] w-[223px]">
      <p className="min-w-full relative shrink-0 text-black w-[min-content]">REFLECTIONS</p>
      <p className="relative shrink-0 text-[rgba(0,0,0,0.5)] whitespace-nowrap">HARD TO IMAGINE THE NEIGHBOURHOOD EVER ..</p>
    </div>
  );
}

function Frame16() {
  return (
    <div className="content-stretch flex gap-[28px] items-center relative shrink-0">
      <Frame17 />
      <Frame18 />
    </div>
  );
}

function Frame15() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full">
      <Frame16 />
      <p className="font-['JetBrains_Mono:Medium',sans-serif] font-medium leading-[0.86] relative shrink-0 text-[19px] text-black whitespace-nowrap">3:30</p>
    </div>
  );
}

function Frame21() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-[122px]">
      <p className="font-['Inter_Display:SemiBold',sans-serif] leading-[0.853] not-italic relative shrink-0 text-[19px] text-black whitespace-nowrap">04</p>
      <div className="bg-[#d9d9d9] rounded-[6px] shrink-0 size-[70px]" data-name="ALBUM COVER" />
    </div>
  );
}

function Frame22() {
  return (
    <div className="content-stretch flex flex-col font-['Inter_Display:Medium',sans-serif] items-start leading-[0.96] not-italic relative shrink-0 text-[19px] w-[223px]">
      <p className="relative shrink-0 text-black w-full">DRACULA</p>
      <p className="relative shrink-0 text-[rgba(0,0,0,0.5)] w-full">DEADBEAT</p>
    </div>
  );
}

function Frame20() {
  return (
    <div className="content-stretch flex gap-[28px] items-center relative shrink-0">
      <Frame21 />
      <Frame22 />
    </div>
  );
}

function Frame19() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full">
      <Frame20 />
      <p className="font-['JetBrains_Mono:Medium',sans-serif] font-medium leading-[0.86] relative shrink-0 text-[19px] text-black whitespace-nowrap">2:58</p>
    </div>
  );
}

function Frame25() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-[122px]">
      <p className="font-['Inter_Display:SemiBold',sans-serif] leading-[0.853] not-italic relative shrink-0 text-[19px] text-black whitespace-nowrap">05</p>
      <div className="bg-[#d9d9d9] rounded-[6px] shrink-0 size-[70px]" data-name="ALBUM COVER" />
    </div>
  );
}

function Frame26() {
  return (
    <div className="content-stretch flex flex-col font-['Inter_Display:Medium',sans-serif] items-start leading-[0.96] not-italic relative shrink-0 text-[19px] w-[223px]">
      <p className="relative shrink-0 text-black w-full">NOT OK</p>
      <p className="relative shrink-0 text-[rgba(0,0,0,0.5)] w-full">EVERYONE’S A STAR</p>
    </div>
  );
}

function Frame24() {
  return (
    <div className="content-stretch flex gap-[28px] items-center relative shrink-0">
      <Frame25 />
      <Frame26 />
    </div>
  );
}

function Frame23() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full">
      <Frame24 />
      <p className="font-['JetBrains_Mono:Medium',sans-serif] font-medium leading-[0.86] relative shrink-0 text-[19px] text-black whitespace-nowrap">2:58</p>
    </div>
  );
}

function Frame10() {
  return (
    <div className="content-stretch flex flex-col gap-[18px] items-start relative shrink-0 w-[1093px]">
      <Frame6 />
      <Frame7 />
      <Frame15 />
      <Frame19 />
      <Frame23 />
    </div>
  );
}

function Frame27() {
  return (
    <div className="bg-[rgba(0,0,0,0.2)] content-stretch flex h-[368px] items-start pb-[288px] relative shrink-0 w-[9px]">
      <div className="bg-black h-[80px] shrink-0 w-[9px]" />
    </div>
  );
}

function Frame28() {
  return (
    <div className="content-stretch flex gap-[29px] items-center relative shrink-0 w-full">
      <Frame10 />
      <Frame27 />
    </div>
  );
}

function Frame29() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[36px] items-end left-[741px] top-[516px] w-[1137px]">
      <Frame3 />
      <Frame28 />
    </div>
  );
}

export default function SongsRec() {
  return (
    <div className="bg-[#fffcf3] relative size-full" data-name="SONGS REC">
      <VinylDisplay />
      <ArtistName />
      <div className="-translate-x-1/2 absolute h-[100px] left-1/2 top-0 w-[1920px]" data-name="Component 6">
        <Frame13 />
      </div>
      <Frame2 />
      <Genres />
      <Frame29 />
    </div>
  );
}
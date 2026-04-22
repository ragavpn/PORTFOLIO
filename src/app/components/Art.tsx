import React, { useRef, useLayoutEffect, useState, useEffect } from "react";
import { motion } from "motion/react";
import svgPaths from "../../imports/svg-fctlv6cp1g";
import imgBackground from "../../assets/3d47aee2a77f678c34dac332d486e89319cfdd31.png";
import imgNewDoc201901021011171 from "../../assets/b87076761d8889ce01c9a0ea71011cd5b5c6b8be.png";
import imgNewDoc201901021011179 from "../../assets/81520e38cfd49d4cc1137fc094600e9bbbfebc8a.png";
import imgDraw5 from "../../assets/5ab4df45d8976869203c4483166073abe1c4a099.png";
import imgNewDoc2019010210111715 from "../../assets/c6a73d138d917d8a7b1f6c7b2c18cefaaafb308e.png";
import imgDsc03422 from "../../assets/b39efb8c1152087c9c9e64ff5d213c950bd00ce4.png";
import imgDraw1 from "../../assets/1a60bb9b1dce99cf899835729934083e62b8c7f1.png";
import imgNewDoc201901021011173 from "../../assets/28ebf16742ca6d95e8b29241235f3b0518a85284.png";
import imgImage16 from "../../assets/7e3b5a5b6928c3730d83caafff8dcf8ed9047c5d.png";
import imgProfile1 from "../../assets/a4d251f356b1dd5d1d1203a7d94d91c18c2d7429.png";
import imgMyImage1 from "../../assets/83f6809a292b37204322f2d527a21a4eda6f7b45.png";
import imgMyImage21 from "../../assets/a798663657b620cb89488dbe0c6a6ed5fff498ac.png";
import imgMyImage2 from "../../assets/cd19b637e2457d96678da23b69dd3a2ba98788f8.png";
import imgMyImage41 from "../../assets/52bf55597d910e31bf1d86c2030f873e11203c05.png";
import imgMyImage3 from "../../assets/0bd26a6762c0818dfeff1cc5842bcf6754aba61c.png";
import imgMyImage31 from "../../assets/6f03edebe3d8bb5e974fdda5698618bb61f88208.png";
import imgMyImage61 from "../../assets/23677bfa826aeb01b6f8486f0b915464950a0044.png";
import imgMyImage4 from "../../assets/62ad6ebf6072505c575cadec06b740d779e1412b.png";
import imgMyImage5 from "../../assets/82fb6e0707143eb2bf6be49e5015edc1cb9499f2.png";
import imgMyImage51 from "../../assets/80bdf2e958f9907d4b3f34fe023689cfedd08895.png";
import imgLinkedin from "../../assets/LINKEDIN.png";
import imgInstagram from "../../assets/INSTA.png";
import imgBehance from "../../assets/behnace.png";
import imgWordmark from "../../assets/Vector.png";

function Frame1() {
  return (
    <div className="h-[265px] mb-[-64px] relative shrink-0 w-[1202px]">
      <p className="absolute font-['Instrument_Serif',serif] left-0 opacity-50 text-[186px] top-0 tracking-[-5.58px]">The</p>
      <p className="absolute font-['Sloop_Script',cursive] left-[250px] text-[197px] top-[17px]">Creativity</p>
      <p className="absolute font-['Instrument_Serif',serif] left-[826px] opacity-50 text-[186px] top-0 tracking-[-5.58px]">doesn't</p>
    </div>
  );
}

function Frame() {
  return (
    <div className="h-[263px] mb-[-64px] relative shrink-0 w-full">
      <p className="absolute font-['Sloop_Script',cursive] left-[603px] text-[197px] top-[15px]">Digital</p>
      <p className="absolute font-['Instrument_Serif',serif] left-0 opacity-50 text-[186px] top-0 tracking-[-5.58px]">pertain to</p>
      <p className="absolute font-['Instrument_Serif',serif] left-[1103px] opacity-50 text-[186px] top-0 tracking-[-5.58px]">spaces</p>
    </div>
  );
}

function Content() {
  return (
    <div className="content-stretch flex flex-col items-center leading-[normal] not-italic pb-[64px] relative shrink-0 text-black w-full whitespace-nowrap" data-name="Content">
      <Frame1 />
      <Frame />
    </div>
  );
}

function Content1() {
  return (
    <div className="h-[268px] relative shrink-0 w-[1160px]" data-name="Content">
      <div className="-translate-x-1/2 absolute font-['Inter_Display:Regular',sans-serif] leading-[0] left-[472.5px] not-italic text-[64px] text-black text-center top-0 tracking-[-3.84px] w-[945px] whitespace-pre-wrap">
        <p className="mb-0">
          <span className="leading-[87.12000274658203%]">Taking up traditional </span>
          <span className="font-['Inter_Display:Light_Italic',sans-serif] italic leading-[87.12000274658203%]" style={{ fontFeatureSettings: "'salt'" }}>
            Pencil Sketches
          </span>
          <span className="font-['Inter_Display:Italic',sans-serif] italic leading-[87.12000274658203%]">, </span>
          <span className="font-['Inter_Display:Light_Italic',sans-serif] italic leading-[87.12000274658203%]">Acrylic Paintings</span>
          <span className="leading-[87.12000274658203%]"> and </span>
          <span className="font-['Inter_Display:Light_Italic',sans-serif] italic leading-[87.12000274658203%]">3D Origami</span>
          <span className="leading-[87.12000274658203%]">, </span>
        </p>
        <p className="leading-[87.12000274658203%]">my hands never stayed still trying to get the minute perfections in order.</p>
      </div>
      <div className="-translate-x-1/2 absolute font-['Just_Another_Hand',cursive] leading-[0] left-[1074.5px] not-italic opacity-50 text-[37px] text-black text-center top-[33px] whitespace-nowrap">
        <p className="leading-[63.91999816894531%] mb-0 whitespace-pre">This is what followed </p>
        <p className="leading-[63.91999816894531%] whitespace-pre">your cursor above</p>
      </div>
      <div className="absolute h-[37.924px] left-[867px] top-[63px] w-[100px]">
        <div className="absolute inset-[-3.69%_-1.4%_-14.98%_0]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 101.399 45.0033">
            <path d={svgPaths.p25c9b300} fill="var(--stroke-0, black)" id="Vector 1" opacity="0.5" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Frame27() {
  return (
    <div className="content-stretch flex flex-col gap-[259px] items-end justify-center relative shrink-0 w-[1443px]">
      <Content />
      <Content1 />
    </div>
  );
}

function Frame2() {
  return (
    <div className="-translate-x-1/2 absolute h-[286.78px] left-1/2 overflow-clip rounded-[19.541px] shadow-[2.931px_3.908px_5.862px_0px_rgba(0,0,0,0.35)] top-[128.87px] w-[400.327px]">
      <div className="absolute h-[286.873px] left-[-4.37px] top-0 w-[404.564px]" data-name="New Doc 2019-01-02 10.11.17_1">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgNewDoc201901021011171} />
      </div>
    </div>
  );
}

function Frame10() {
  return (
    <div className="bg-[#fca4bb] h-[490.812px] overflow-clip relative rounded-[27.42px] w-[400.327px]">
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[0.87] left-[24.68px] not-italic text-[56.21px] text-black top-[23.31px] tracking-[-4.4968px] whitespace-nowrap">2016</p>
      <p className="-translate-x-1/2 absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[0.87] left-[144.18px] not-italic text-[28.791px] text-black text-center top-[78.15px] tracking-[-2.3033px] whitespace-nowrap">Frame of Reference.</p>
      <Frame2 />
    </div>
  );
}

function Frame3() {
  return (
    <div className="-translate-x-1/2 absolute h-[404.44px] left-1/2 overflow-clip rounded-[27.42px] shadow-[4.113px_5.484px_8.226px_0px_rgba(0,0,0,0.35)] top-[100.08px] w-[282.423px]">
      <div className="absolute h-[416.33px] left-0 top-[-8.23px] w-[282.728px]" data-name="New Doc 2019-01-02 10.11.17_9">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgNewDoc201901021011179} />
      </div>
    </div>
  );
}

function Frame9() {
  return (
    <div className="absolute content-stretch flex items-center justify-center left-[180.97px] px-[7.915px] py-[3.957px] rounded-[7.915px] top-[75.4px]">
      <div aria-hidden="true" className="absolute border-[0.791px] border-black border-solid inset-0 pointer-events-none rounded-[7.915px]" />
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[0.87] not-italic relative shrink-0 text-[10.289px] text-black text-center tracking-[-0.8232px] whitespace-nowrap">2018</p>
    </div>
  );
}

function Frame8() {
  return (
    <div className="bg-[#fffcf3] h-[490.812px] overflow-clip relative rounded-[27.42px] w-[400.327px]">
      <Frame3 />
      <p className="-translate-x-1/2 absolute font-['Inter:Medium',sans-serif] font-medium leading-[0.87] left-[calc(50%-0.49px)] not-italic text-[56.21px] text-black text-center top-[21.94px] tracking-[-4.4968px] whitespace-nowrap">AM I REAL?</p>
      <Frame9 />
    </div>
  );
}

function Frame5() {
  return (
    <div className="absolute h-[363.311px] left-[71.29px] overflow-clip rounded-[27.42px] shadow-[4.113px_5.484px_6.444px_0px_rgba(0,0,0,0.25)] top-[71.29px] w-[257.745px]">
      <div className="-translate-x-1/2 -translate-y-1/2 absolute flex h-[410.583px] items-center justify-center left-[calc(50%+0.08px)] top-[calc(50%+9.46px)] w-[273.061px]" style={{ "--transform-inner-width": "1185", "--transform-inner-height": "21" } as React.CSSProperties}>
        <div className="flex-none rotate-[0.61deg]">
          <div className="h-[407.731px] relative w-[268.713px]" data-name="draw_5">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <img alt="" className="absolute h-[106.45%] left-[-0.05%] max-w-none top-[0.43%] w-[100.09%]" src={imgDraw5} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame4() {
  return (
    <div className="bg-[#a96de7] h-[490.812px] overflow-clip relative rounded-[27.42px] w-[400.327px]">
      <Frame5 />
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold h-[112.421px] leading-[0.87] left-[24.68px] not-italic text-[52.097px] text-black top-[30.16px] tracking-[-4.1678px] w-[201.535px]">THE JOKER</p>
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[1.02] left-[264.6px] not-italic text-[52.097px] text-black top-[415.41px] tracking-[-4.1678px] whitespace-nowrap">2018</p>
    </div>
  );
}

function Frame7() {
  return (
    <div className="-translate-x-1/2 absolute h-[363.311px] left-1/2 overflow-clip rounded-[27.42px] shadow-[4.113px_5.484px_8.226px_0px_rgba(0,0,0,0.35)] top-[37.02px] w-[282.423px]">
      <div className="absolute h-[363.019px] left-0 top-0 w-[282.649px]" data-name="New Doc 2019-01-02 10.11.17_15">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img alt="" className="absolute h-[105.04%] left-0 max-w-none top-[-2.4%] w-full" src={imgNewDoc2019010210111715} />
        </div>
      </div>
    </div>
  );
}

function Frame11() {
  return (
    <div className="-translate-x-1/2 absolute content-stretch flex font-['Inter:Semi_Bold',sans-serif] font-semibold items-center justify-between leading-[1.02] left-[calc(50%-0.69px)] not-italic text-[19.768px] text-black top-[222.1px] tracking-[-1.5814px] w-[382.504px] whitespace-nowrap">
      <p className="relative shrink-0">2017</p>
      <p className="relative shrink-0">2017</p>
    </div>
  );
}

function Frame6() {
  return (
    <div className="bg-[#fffcf3] h-[490.812px] overflow-clip relative rounded-[27.42px] w-[400.327px]">
      <Frame7 />
      <Frame11 />
      <div className="-translate-x-1/2 absolute font-['Inter:Medium',sans-serif] font-medium leading-[0] left-[calc(50%-0.63px)] not-italic text-[16.452px] text-black text-center top-[430.49px] tracking-[-1.3161px] whitespace-nowrap">
        <p className="leading-[0.87] mb-0 whitespace-pre">What I would see if I was </p>
        <p className="leading-[0.87] whitespace-pre">Schizophrenic</p>
      </div>
    </div>
  );
}

function Frame13() {
  return (
    <div className="-translate-x-1/2 absolute h-[349.29px] left-[calc(50%-1.37px)] overflow-clip rounded-[29.731px] shadow-[4.46px_5.946px_8.919px_0px_rgba(0,0,0,0.35)] top-[71.29px] w-[400.327px]">
      <div className="absolute h-[349.425px] left-0 top-0 w-[400.172px]" data-name="DSC_0342 (2)">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img alt="" className="absolute h-[126.35%] left-[-35.43%] max-w-none top-[-17.53%] w-[154.55%]" src={imgDsc03422} />
        </div>
      </div>
    </div>
  );
}

function Frame12() {
  return (
    <div className="bg-gradient-to-b from-[#6081b6] h-[490.812px] overflow-clip relative rounded-[27.42px] to-[#243969] w-[400.327px]">
      <Frame13 />
      <div className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold h-[128.872px] leading-[0] left-[24.68px] not-italic text-[#fffcf3] text-[56.21px] top-[356.46px] tracking-[-4.4968px] w-[300.245px]">
        <p className="leading-[0.93] mb-0">Tranquility in</p>
        <p className="leading-[0.93]">wilderness.</p>
      </div>
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[0.93] left-[318.07px] not-italic text-[#fffcf3] text-[26.049px] top-[23.31px] tracking-[-2.0839px] whitespace-nowrap">2021</p>
    </div>
  );
}

function Frame15() {
  return (
    <div className="absolute h-[363.311px] left-[71.29px] overflow-clip rounded-[27.42px] shadow-[4.113px_5.484px_6.444px_0px_rgba(0,0,0,0.25)] top-[87.74px] w-[257.745px]">
      <div className="absolute h-[396.577px] left-0 top-[-19.19px] w-[257.51px]" data-name="draw_1">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img alt="" className="absolute h-[113.52%] left-[-0.03%] max-w-none top-[-5.2%] w-[100.07%]" src={imgDraw1} />
        </div>
      </div>
    </div>
  );
}

function Frame16() {
  return (
    <div className="absolute content-stretch flex items-center justify-center left-[154.92px] p-[13.71px] top-[441.46px]">
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[1.02] not-italic relative shrink-0 text-[27.42px] text-black tracking-[-2.1936px] whitespace-nowrap">2020</p>
    </div>
  );
}

function Frame14() {
  return (
    <div className="bg-[#ef8e35] h-[490.812px] overflow-clip relative rounded-[27.42px] w-[400.327px]">
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[0.87] left-[34.27px] not-italic opacity-30 text-[115.163px] text-black top-[6.85px] tracking-[-9.213px] whitespace-nowrap">COVID</p>
      <Frame15 />
      <Frame16 />
    </div>
  );
}

function Frame18() {
  return (
    <div className="-translate-x-1/2 absolute h-[271.455px] left-[calc(50%+0.69px)] overflow-clip rounded-[18.404px] shadow-[2.761px_3.681px_5.521px_0px_rgba(0,0,0,0.35)] top-[171.37px] w-[363.311px]">
      <div className="absolute h-[270.431px] left-[-27.42px] top-0 w-[418.685px]" data-name="New Doc 2019-01-02 10.11.17_3">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgNewDoc201901021011173} />
      </div>
    </div>
  );
}

function Frame19() {
  return (
    <div className="absolute content-stretch flex items-center justify-center left-[19.19px] px-[7.915px] py-[3.957px] rounded-[7.915px] top-[24.68px]">
      <div aria-hidden="true" className="absolute border-[0.791px] border-black border-solid inset-0 pointer-events-none rounded-[7.915px]" />
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[0.87] not-italic relative shrink-0 text-[10.289px] text-black text-center tracking-[-0.8232px] whitespace-nowrap">2016</p>
    </div>
  );
}

function Frame17() {
  return (
    <div className="bg-[#b4e6eb] h-[490.812px] overflow-clip relative rounded-[27.42px] w-[400.327px]">
      <Frame18 />
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium h-[85.001px] leading-[0.87] left-[19.19px] not-italic text-[56.21px] text-black top-[50.73px] tracking-[-4.4968px] w-[326.294px]">Are you alone though?</p>
      <Frame19 />
    </div>
  );
}

function Frame32() {
  return (
    <div className="content-stretch flex items-center relative shrink-0">
      <div className="h-[86.547px] relative shrink-0 w-[85.451px]" data-name="image 16">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img alt="" className="absolute h-[379.75%] left-[-179.49%] max-w-none top-[-255.27%] w-[299.15%]" src={imgImage16} />
        </div>
      </div>
    </div>
  );
}

function Frame20() {
  return (
    <motion.div
      className="absolute content-stretch flex flex-col font-['Inter',sans-serif] items-start left-[29.5px] not-italic text-[#fffcf3] text-[122.53px] top-[0px] tracking-[-2.4506px] w-[471.96px]"
      animate={{
        y: [
          "0%", "0%",
          "-20%", "-20%",
          "-40%", "-40%",
          "-60%", "-60%",
          "-80%", "-80%"
        ],
      }}
      transition={{
        duration: 8,
        ease: "easeInOut",
        times: [
          0, 0.15,
          0.25, 0.40,
          0.50, 0.65,
          0.75, 0.90,
          0.95, 1.0
        ],
        repeat: Infinity,
      }}
    >
      <p className="relative shrink-0 w-full h-[152.026px] flex items-center m-0 leading-[0]">IMAGINE</p>
      <p className="relative shrink-0 w-full h-[152.026px] flex items-center m-0 leading-[0]">WORK</p>
      <p className="relative shrink-0 w-full h-[152.026px] flex items-center m-0 leading-[0]">BUILD</p>
      <p className="relative shrink-0 w-full h-[152.026px] flex items-center m-0 leading-[0]">CREATE</p>
      <p className="relative shrink-0 w-full h-[152.026px] flex items-center m-0 leading-[0]">IMAGINE</p>
    </motion.div>
  );
}

function Frame30() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-[494px]">
      <div className="h-[152.026px] overflow-clip relative shrink-0 w-[550.955px]" data-name="Component 1">
        <Frame20 />
      </div>
    </div>
  );
}

function Frame31() {
  return (
    <div className="content-stretch flex gap-[28px] items-center relative shrink-0">
      <p className="font-['Inter_Display:Regular',sans-serif] leading-[1.02] not-italic relative shrink-0 text-[#fffcf3] text-[122.528px] tracking-[-2.4506px] whitespace-nowrap">LET'S </p>
      <Frame32 />
      <Frame30 />
    </div>
  );
}

function Frame33() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
      <Frame31 />
      <p className="font-['Inter_Display:Regular',sans-serif] leading-[1.02] min-w-full not-italic relative shrink-0 text-[#fffcf3] text-[122.528px] tracking-[-2.4506px] w-[min-content]">TOGETHER.</p>
    </div>
  );
}

// ── SOCIAL LINK ──────────────────────────────────────────────────────────────────
function SocialLink({ href, label, iconSrc, iconW, iconH }: {
  href: string;
  label: string;
  iconSrc: string;
  iconW: number;
  iconH: number;
}) {
  const [hovered, setHovered] = React.useState(false);
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      data-cursor="dot-only"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '17.656px',
        textDecoration: 'none',
        opacity: hovered ? 1 : 0.8,
        transition: 'opacity 0.3s ease',
        flexShrink: 0,
      }}
    >
      <div style={{ width: iconW, height: iconH, position: 'relative', flexShrink: 0 }}>
        <img
          alt={label}
          src={iconSrc}
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', display: 'block' }}
        />
      </div>
      <span style={{
        fontFamily: "'Inter Display', sans-serif",
        fontWeight: 500,
        fontSize: '22.262px',
        lineHeight: 1.02,
        letterSpacing: '-0.4452px',
        color: '#ffffff',
        textDecoration: 'underline',
        whiteSpace: 'nowrap',
      }}>
        {label}
      </span>
    </a>
  );
}

// ── CONTACT US (blue card) ───────────────────────────────────────────────────────
function ContactUs() {
  const [emailHovered, setEmailHovered] = React.useState(false);

  // Icon assets from local files
  const linkedinSrc = imgLinkedin;
  const instagramSrc = imgInstagram;
  const behanceSrc   = imgBehance;
  const portfolioWordmarkSrc = imgWordmark;

  return (
    <div
      className="absolute bg-[#1735f4] h-[1114px] left-[572px] rounded-[62.336px] top-[52px] w-[1298px]"
      data-name="Contact Us"
      data-cursor="scroll"
      style={{ position: 'absolute', overflow: 'visible' }}
    >
      {/* ── LET'S [starburst] IMAGINE / TOGETHER. ── */}
      <div
        className="absolute flex flex-col items-start"
        style={{ left: 53.57, top: 67, width: 1244.43 }}
      >
        {/* Row: LET'S + starburst + animated word */}
        <div className="flex items-center gap-[28px]">
          <p style={{
            fontFamily: "'Inter Display', sans-serif",
            fontWeight: 400,
            fontSize: '122.528px',
            lineHeight: 1.02,
            letterSpacing: '-2.4506px',
            color: '#fffcf3',
            whiteSpace: 'nowrap',
          }}>
            {"LET'S "}
          </p>
          {/* Starburst sticker */}
          <div style={{ height: 86.547, width: 85.451, position: 'relative', flexShrink: 0 }}>
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <img
                alt=""
                src={imgImage16}
                className="absolute max-w-none"
                style={{ height: '379.75%', left: '-179.49%', top: '-255.27%', width: '299.15%' }}
              />
            </div>
          </div>
          {/* Cycling word: IMAGINE / WORK / BUILD / CREATE */}
          <div style={{ height: 152.026, width: 550.955, overflow: 'hidden', position: 'relative', flexShrink: 0 }}>
            <Frame20 />
          </div>
        </div>

        {/* TOGETHER. */}
        <p style={{
          fontFamily: "'Inter Display', sans-serif",
          fontWeight: 400,
          fontSize: '122.528px',
          lineHeight: 1.02,
          letterSpacing: '-2.4506px',
          color: '#fffcf3',
        }}>
          TOGETHER.
        </p>
      </div>

      {/* ── NAME + EMAIL ── */}
      <div
        className="absolute flex flex-col"
        style={{ left: 53.57, top: 411.03, gap: 11 }}
      >
        <p style={{
          fontFamily: "'Inter Display', sans-serif",
          fontWeight: 500,
          fontSize: '38.667px',
          lineHeight: 1.02,
          letterSpacing: '-0.7733px',
          color: '#fffcf3',
          opacity: 0.8,
          whiteSpace: 'nowrap',
        }}>
          Ragav Palaniswamy
        </p>

        {/* Email row */}
        <a
          href="https://mail.google.com/mail/?view=cm&fs=1&to=ragavpn2005@gmail.com&su=Connecting%20from%20your%20portfolio&body=Hi%20Ragav%2C%0D%0A%0D%0AI%20saw%20your%20portfolio%20and%20would%20love%20to%20connect%20with%20you%20further.%0D%0A%0D%0AThanks%20and%20regards%2C%0D%0A%5BYour%20Name%5D"
          target="_blank"
          rel="noopener noreferrer"
          data-cursor="dot-only"
          onMouseEnter={() => setEmailHovered(true)}
          onMouseLeave={() => setEmailHovered(false)}
          style={{ display: 'flex', alignItems: 'center', gap: 12, textDecoration: 'none' }}
        >
          <svg width="24" height="12" viewBox="0 0 24 11.547" fill="none" style={{ flexShrink: 0, opacity: 0.5 }}>
            <path d="M 0 5.7735 L 24 5.7735 M 18.2265 0 L 24 5.7735 L 18.2265 11.547" stroke="white" strokeWidth="2" />
          </svg>
          <span style={{
            fontFamily: "'Inter Display', sans-serif",
            fontWeight: 500,
            fontSize: '28px',
            lineHeight: 1.02,
            letterSpacing: '-0.56px',
            color: '#fffcf3',
            whiteSpace: 'nowrap',
            display: 'inline-block',
            opacity: emailHovered ? 1 : 0.5,
            transform: emailHovered ? 'translateX(10px)' : 'translateX(0)',
            transition: 'opacity 0.3s ease, transform 0.3s ease',
          }}>
            ragavpn2005@gmail.com
          </span>
        </a>
      </div>

      {/* ── SOCIAL LINKS ── */}
      <div
        className="absolute flex items-center"
        style={{ left: 53.57, top: 534.03, gap: 23.798 }}
      >
        <SocialLink href="https://www.linkedin.com/in/ragav-palaniswamy-55aa97183/"                         label="Linkedin"  iconSrc={linkedinSrc}  iconW={29.939} iconH={29.938} />
        <SocialLink href="https://www.instagram.com/ragavwithouttheh"  label="Instagram" iconSrc={instagramSrc} iconW={33.622} iconH={33.622} />
        <SocialLink href="https://www.behance.net/ragavpn"             label="Behance"   iconSrc={behanceSrc}   iconW={33.622} iconH={32.781} />
      </div>

      {/* ── 2026 ── */}
      <p
        className="absolute"
        style={{
          fontFamily: "'Inter Display', sans-serif",
          fontWeight: 900,
          fontSize: '110.958px',
          lineHeight: 1.02,
          letterSpacing: '-3.3287px',
          color: '#fffcf3',
          left: 193.23,
          top: 982.52,
          whiteSpace: 'nowrap',
        }}
      >
        2026
      </p>

      {/* ── PORTFOLIO WORDMARK SVG ── */}
      <div
        className="absolute"
        style={{ height: 698.868, left: 584.23, top: 396.65, width: 713.767 }}
      >
        <img
          alt=""
          src={portfolioWordmarkSrc}
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', display: 'block' }}
        />
      </div>

      {/* ── STICKER (top left of card) ── */}
      <div
        className="absolute flex flex-col items-start px-[75px]"
        style={{ left: -2, top: 62 }}
      >
        <div style={{ display: 'flex', height: 72.605, width: 90.57, alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
          <div style={{ transform: 'rotate(15deg)', flexShrink: 0 }}>
            <div style={{ height: 53.912, width: 79.319, position: 'relative' }}>
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <img
                  alt=""
                  src={imgImage16}
                  className="absolute max-w-none"
                  style={{ height: '344.83%', left: '-56.77%', top: '-136.02%', width: '182.29%' }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


function Frame26() {
  return (
    <div className="h-[1218px] relative shrink-0 w-full">
      <ContactUs />
      <div className="absolute h-[857px] left-[-3px] top-[240px] w-[678px]" data-name="Profile 1">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgProfile1} />
      </div>
    </div>
  );
}

const cursorImages = [
  imgMyImage1,
  imgMyImage21,
  imgMyImage2,
  imgMyImage41,
  imgMyImage3,
  imgMyImage31,
  imgMyImage61,
  imgMyImage4,
  imgMyImage5,
  imgMyImage51
];

// Eagerly preload hover trail assets immediately into memory on client load
if (typeof window !== "undefined") {
  cursorImages.forEach(src => {
    const img = new Image();
    img.src = src;
  });
}

function MotionCard({ wrapperClass, initialX, initialY, zIndexBase, children }: any) {
  return (
    <motion.div
      className={`${wrapperClass} origin-center`}
      style={{ zIndex: zIndexBase }}
      variants={{
        collapsed: { 
          x: initialX,
          y: initialY,
          rotate: (zIndexBase - 4) * 5, // 5 degree spread strictly during stacked phase!
          transition: { type: "spring", stiffness: 80, damping: 20 }
        },
        expanded: { 
          x: 0,
          y: 0,
          rotate: 0, // Returns to 0 rotation on the massive diagonal fan-out line
          transition: { type: "spring", stiffness: 80, damping: 20 }
        }
      }}
    >
      <div className="w-full h-full rounded-[27.42px] overflow-hidden">
        {children}
      </div>
    </motion.div>
  )
}

function Paintings() {
  return (
    <div className="h-[1075px] relative shrink-0 w-full pointer-events-none" data-name="Paintings">
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial="collapsed"
        whileInView="expanded"
        viewport={{ once: false, amount: 0.5 }}
      >
        <MotionCard wrapperClass="absolute w-[400.327px] h-[490.812px] left-[1746.35px] top-[769.19px]" initialX={-960} initialY={-480} zIndexBase={1}><Frame10 /></MotionCard>
        <MotionCard wrapperClass="absolute w-[400.327px] h-[490.812px] left-[1426.35px] top-[609.19px]" initialX={-640} initialY={-320} zIndexBase={2}><Frame8 /></MotionCard>
        <MotionCard wrapperClass="absolute w-[400.327px] h-[490.812px] left-[1106.35px] top-[449.19px]" initialX={-320} initialY={-160} zIndexBase={3}><Frame4 /></MotionCard>
        <MotionCard wrapperClass="absolute w-[400.327px] h-[490.812px] left-[786.35px] top-[289.19px]" initialX={0} initialY={0} zIndexBase={4}><Frame6 /></MotionCard>
        <MotionCard wrapperClass="absolute w-[400.327px] h-[490.812px] left-[466.35px] top-[129.19px]" initialX={320} initialY={160} zIndexBase={5}><Frame12 /></MotionCard>
        <MotionCard wrapperClass="absolute w-[400.327px] h-[490.812px] left-[146.35px] top-[-30.81px]" initialX={640} initialY={320} zIndexBase={6}><Frame14 /></MotionCard>
        <MotionCard wrapperClass="absolute w-[400.327px] h-[490.812px] left-[-173.65px] top-[-190.81px]" initialX={960} initialY={480} zIndexBase={7}><Frame17 /></MotionCard>
      </motion.div>
    </div>
  )
}
/**
 * Abstract Experimental Canvas Rendering Section.
 * 
 * Orchestrates a heavily unconstrained canvas space mapping continuous cursor intersection 
 * nodes over a constrained Y-axis bound natively triggering explicit declarative `requestAnimationFrame` 
 * node painting behaviors. Operates through fully dynamic `useLayoutEffect` window scalar resizing logic 
 * perfectly clamping physical CSS matrices rigidly against custom UI aspect ratios natively bypassing grid structures.
 * 
 * @returns {JSX.Element} Fluid viewport-locked pointer interaction canvas bounded by global scaling constraints.
 */
export function Art() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trailContainerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useLayoutEffect(() => {
    const handleResize = () => {
      const windowWidth = window.innerWidth;
      setScale(windowWidth / 1920);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const container = trailContainerRef.current;
    if (!container) return;

    let imgIndex = 0;
    let lastX = 0;
    let lastY = 0;
    let hasMoved = false;

    // ── Window-level cursor position tracker (used by scroll handler) ────
    const clientPos = { x: -1, y: -1 };
    const trackMouse = (e: MouseEvent) => { clientPos.x = e.clientX; clientPos.y = e.clientY; };
    window.addEventListener('mousemove', trackMouse, { passive: true });

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Only spawn within 900 pixels from top
      if (y > 900 * scale) {
        lastX = x;
        lastY = y;
        return;
      }

      if (!hasMoved) {
        lastX = x;
        lastY = y;
        hasMoved = true;
      }

      const distance = Math.hypot(x - lastX, y - lastY);
      const spawnDistance = 30;

      if (distance < spawnDistance * scale) return;

      lastX = x;
      lastY = y;
      spawnImage(x, y);
    };

    // ── Shared image spawner ─────────────────────────────────────────────
    function spawnImage(x: number, y: number) {
      if (!container) return;
      
      const img = document.createElement("img");
      img.src = cursorImages[imgIndex % cursorImages.length];
      img.className = "absolute pointer-events-none object-contain overflow-visible";
      img.style.width = `${(76.8 * 3.5) * scale}px`;
      img.style.height = `${(48.25 * 3.5) * scale}px`;
      img.style.left = `${x}px`;
      img.style.top = `${y}px`;
      img.style.transform = `translate(-50%, -50%) rotate(${Math.random() * 40 - 20}deg)`;
      img.style.opacity = "1";
      img.style.transition = "opacity 0.5s ease-out, transform 0.5s ease-out";
      img.style.zIndex = "9999";

      container.appendChild(img);
      imgIndex++;

      requestAnimationFrame(() => {
        setTimeout(() => {
          if (img) {
            img.style.opacity = "0";
            img.style.transform = img.style.transform + " scale(0.5)";
          }
        }, 50);
      });

      setTimeout(() => {
        if (container && container.contains(img)) {
          container.removeChild(img);
        }
      }, 500);
    }

    // ── Scroll handler: section moves under cursor → spawn images ────────
    const handleScroll = () => {
      if (clientPos.x < 0) return;
      const rect = container.getBoundingClientRect();
      const x = clientPos.x - rect.left;
      const y = clientPos.y - rect.top;

      // Only spawn in trail zone
      if (x < 0 || x > rect.width || y < 0 || y > 900 * scale) return;

      if (!hasMoved) { lastX = x; lastY = y; hasMoved = true; }

      const distance = Math.hypot(x - lastX, y - lastY);
      // Use a smaller threshold on scroll so it feels responsive
      if (distance < 8 * scale) return;

      lastX = x;
      lastY = y;
      spawnImage(x, y);
    };

    const section = containerRef.current?.parentElement;
    if (section) {
      section.addEventListener("mousemove", handleMouseMove as EventListener);
      window.addEventListener("scroll", handleScroll, { passive: true });
      return () => {
        section.removeEventListener("mousemove", handleMouseMove as EventListener);
        window.removeEventListener("scroll", handleScroll);
        window.removeEventListener("mousemove", trackMouse);
      };
    }
    return () => {
      window.removeEventListener("mousemove", trackMouse);
    };
  }, [scale]);

  return (
    <section id="art-trail-zone" className="bg-[#fffcf3] relative w-full" style={{ height: 3700 * scale }} data-cursor="scroll" data-trail-height-ratio="0.243">
      <div
        ref={containerRef}
        className="absolute origin-top-left w-[1920px] h-[3700px]"
        style={{ transform: `scale(${scale})` }}
      >
        <div className="absolute h-[2043px] left-[-641px] opacity-40 top-[132px] w-[2773px] pointer-events-none" data-name="Background">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <img alt="" className="absolute h-[176.61%] left-0 max-w-none top-[-26.04%] w-full" src={imgBackground} />
          </div>
        </div>

        <div className="absolute content-stretch flex flex-col gap-[74px] items-center left-0 top-[253px] w-[1920px]">
          <Frame27 />
          <Paintings />
          <Frame26 />
        </div>
      </div>

      <div ref={trailContainerRef} className="absolute inset-0 w-full h-full pointer-events-none" />
    </section>
  );
}

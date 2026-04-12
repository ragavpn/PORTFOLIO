import React from "react";
import imgGeminiGeneratedImageBnf70Cbnf70Cbnf71 from "figma:asset/a6fe2b506a0a432a9e17a0ef38b5ca4b3fa14f15.png";
import svgPaths from "../../imports/svg-hsdg76jmon";

export function Hero() {
  return (
    <section className="min-h-screen relative w-full bg-[#fffcf3] z-20 flex items-center justify-center">
      <div className="relative flex flex-col items-center justify-center text-center z-10 w-full px-4 pt-20">
        <div className="w-[80vw] md:w-[70vw] max-w-[1100px] mx-auto" data-name="Hi, I’m Ragav">
          <svg className="block w-full h-auto mx-[-6px] my-[-10px]" fill="none" preserveAspectRatio="xMidYMid meet" viewBox="0 0 1189.46 310.012">
            <path d={svgPaths.p197bf980} fill="#090909" />
            <path d={svgPaths.p39f16080} fill="#090909" />
            <path d={svgPaths.p1c08f280} fill="#090909" />
            <path d={svgPaths.p1e20ca00} fill="#090909" />
            <path d={svgPaths.p37f39db0} fill="#090909" />
            <path d={svgPaths.p32a45080} fill="#090909" />
            <path d={svgPaths.p2c62f780} fill="#090909" />
            <path d={svgPaths.p327ecd00} fill="#090909" />
            <path d={svgPaths.p9226380} fill="#090909" />
            <path d={svgPaths.p38810600} fill="#090909" />
            <path d={svgPaths.p32390800} fill="#090909" />
          </svg>
        </div>
        <div className="flex flex-col font-sans items-center justify-center text-[#090909] text-[18px] sm:text-[24px] md:text-[32px] tracking-[-0.02em] font-light uppercase whitespace-nowrap z-20 mx-[0px] my-[5px]">
          <p className="font-['Inter',sans-serif] m-[0px] text-[44px] tracking-[-3px]">I’m a Software Engineer currently working</p>
          <p className="font-['Inter',sans-serif] text-[44px] mx-[0px] my-[-15px] tracking-[-3px]">@ CAPITAL ONE IN BLR</p>
        </div>
      </div>
      
      {/* Background or decorative image */}
      <div className="absolute right-[-5%] md:right-[5%] top-[25%] md:top-[30%] w-[42vw] md:w-[30vw] max-w-[360px] z-30 overflow-hidden rounded-2xl rotate-3 translate-x-[25px] translate-y-[60px]" data-name="Hero Image">
        <img alt="Hero Graphic" className="w-[90%] h-auto object-cover pointer-events-none" src={imgGeminiGeneratedImageBnf70Cbnf70Cbnf71} />
      </div>
    </section>
  );
}

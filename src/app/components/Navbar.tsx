import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import svgPaths8tskrlw096 from "../../imports/svg-8tskrlw096";
import svgPathsuxavwq7xjp from "../../imports/svg-uxavwq7xjp";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const menuLinks = [
    { num: "(01)", label: "Home" },
    { num: "(02)", label: "About" },
    { num: "(03)", label: "Works" },
    { num: "(04)", label: "Archives" },
    { num: "(05)", label: "Journal" },
    { num: "(06)", label: "Contact" },
  ];

  return (
    <>
      <div className="fixed top-0 left-0 w-full z-[100] flex justify-between items-center p-8 mix-blend-difference text-[#fffcf3]">
        <div className="text-2xl font-bold uppercase tracking-widest cursor-pointer opacity-0 pointer-events-none">
          Ragav
        </div>
        <button onClick={toggleMenu} className="cursor-pointer h-[15px] w-[39px] relative group mix-blend-normal">
          {/* We show menu button either in mix-blend-difference or inside the menu depending on design. Since background is full screen bg-[#fffcf3], we need close button inside the menu as well, or we change color based on state.
          Let's just use the close button inside the menu. */}
          {!isOpen && (
            <div className="absolute inset-[-13.33%_0_0_0]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 39 17">
                <g>
                  <line stroke="currentColor" strokeWidth="2" x2="39" y1="1" y2="1" className="transition-transform origin-center group-hover:scale-x-90" />
                  <line stroke="currentColor" strokeWidth="2" x2="39" y1="16" y2="16" className="transition-transform origin-center group-hover:scale-x-110" />
                </g>
              </svg>
            </div>
          )}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[110] bg-[#fffcf3]/95 backdrop-blur-md overflow-hidden flex flex-col justify-between"
          >
            {/* Top area */}
            <div className="relative w-full px-10 py-10 flex justify-between">
              <p className="font-['Inter_Display:Regular',sans-serif] leading-[0.87] not-italic text-[50px] text-black tracking-[-3px] whitespace-nowrap pt-2">
                Menu
              </p>
              
              {/* Top Right Close Button */}
              <button onClick={toggleMenu} className="cursor-pointer h-[15px] w-[39px] relative mt-4">
                <div className="absolute inset-[-13.33%_0_0_0]">
                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 39 17">
                    <g>
                      <line stroke="black" strokeWidth="2" x2="39" y1="1" y2="1" />
                      <line stroke="black" strokeWidth="2" x2="39" y1="16" y2="16" />
                    </g>
                  </svg>
                </div>
              </button>
            </div>

            {/* Center Area: Links */}
            <div className="flex-1 w-full max-w-7xl mx-auto flex flex-col md:flex-row justify-center md:justify-start items-start md:items-center relative px-10">
              {/* Links Header */}
              <div className="absolute top-0 left-10 md:static md:-mt-32 md:mr-32 flex items-start gap-2 mb-12">
                <p className="font-['Inter_Display:Light',sans-serif] opacity-50 text-[25px] tracking-[-1.5px]">
                  (Links)
                </p>
                <p className="font-['Inter_Display:Medium',sans-serif] opacity-50 text-[12px] tracking-[-0.24px] mt-1">
                  05
                </p>
              </div>

              {/* Links List */}
              <div className="flex flex-col gap-[30px] md:gap-[40px] items-start w-full md:w-[510px] mt-16 md:mt-0 relative">
                {menuLinks.map((link, idx) => (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + idx * 0.1, duration: 0.5 }}
                    key={link.num}
                    className="flex flex-col gap-[20px] md:gap-[40px] w-full group cursor-pointer"
                    onClick={toggleMenu}
                  >
                    <div className="flex items-center justify-between w-full">
                      <div className="flex items-center justify-between w-[150px] md:w-[190px]">
                        <p className="font-['Inter_Display:Regular',sans-serif] leading-[normal] opacity-50 text-[20px] md:text-[30px] text-black tracking-[-1.8px] group-hover:opacity-100 transition-opacity">
                          {link.num}
                        </p>
                        <div className="h-[24px] md:h-[36px] relative w-[60px] md:w-[72px]">
                          <p className="absolute font-['Inter_Display:Regular',sans-serif] leading-[normal] left-0 text-[24px] md:text-[30px] text-black top-0 tracking-[-1.8px] whitespace-nowrap">
                            {link.label}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-center size-[13px] opacity-0 group-hover:opacity-100 transition-all transform group-hover:translate-x-2 mr-4 md:mr-0">
                        <div className="-rotate-45">
                          <div className="h-0 relative w-[18.385px]">
                            <div className="absolute inset-[-7.36px_-5.44%_-7.36px_0]">
                              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19.3848 14.7279">
                                <path d={svgPaths8tskrlw096.p3a9d3c80} fill="black" />
                              </svg>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="h-px w-full bg-black/10" />
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Bottom Area: Socials and close button */}
            <div className="w-full px-10 pb-10 flex flex-col md:flex-row justify-between items-end relative">
              <div className="flex flex-col md:flex-row w-full justify-between items-end">
                {/* User's Bottom Left Close Button */}
                <button onClick={toggleMenu} className="size-[29px] bg-[#fffcf3] rounded-[3px] flex items-center justify-center cursor-pointer hover:bg-black/5 transition-colors group absolute left-10 bottom-10 z-10" data-name="Component 10">
                  <div className="-rotate-45 flex-none group-hover:-translate-x-1 group-hover:-translate-y-1 transition-transform">
                    <div className="h-0 relative w-[20.012px]">
                      <div className="absolute inset-[-11.05px_-3.66%]">
                        <svg className="block size-[22px]" fill="none" preserveAspectRatio="none" viewBox="0 0 44 22">
                          <path d={svgPathsuxavwq7xjp.p4466300} fill="black" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </button>

                <div className="md:ml-[80px] absolute md:static left-10 bottom-[100px] md:bottom-auto">
                  <p className="font-['Inter_Display:Light',sans-serif] leading-[0.87] opacity-50 text-[25px] text-black tracking-[-1.5px] whitespace-nowrap">
                    (Social Media)
                  </p>
                </div>

                <div className="flex flex-col font-['Inter_Display:Regular',sans-serif] gap-[5px] text-[20px] text-black tracking-[-1.2px] leading-[0.87] absolute md:static right-10 md:right-auto bottom-[100px] md:bottom-auto text-right md:text-left">
                  <a href="#" className="cursor-pointer hover:opacity-70">Instagram - Personal</a>
                  <a href="#" className="cursor-pointer hover:opacity-70">Instagram - Art</a>
                  <a href="#" className="cursor-pointer hover:opacity-70">Spotify</a>
                </div>

                <div className="flex items-center gap-1 opacity-50 absolute bottom-10 right-10">
                  <span className="font-['Inter_Display:Light',sans-serif] text-[18.667px] leading-[0.87] tracking-[-1.12px]">c</span>
                  <span className="font-['Inter_Display:Light',sans-serif] text-[25px] leading-[0.87] tracking-[-1.5px] mr-4">2026</span>
                  <div className="size-[14px]">
                    <svg className="block size-full" fill="none" viewBox="0 0 14 14">
                      <circle cx="7" cy="7" opacity="0.5" r="6.61111" stroke="black" strokeWidth="0.777778" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

import React, { useRef, useState } from "react";
import { motion, useAnimationFrame, useMotionValue, useTransform, wrap } from "motion/react";

// Import SVGs
import imgFigma from "../../assets/tech-icons/figma.svg";
import imgHtml from "../../assets/tech-icons/html5.svg";
import imgJs from "../../assets/tech-icons/javascript.svg";
import imgTs from "../../assets/tech-icons/typescript.svg";
import imgReact from "../../assets/tech-icons/react.svg";
import imgExpo from "../../assets/tech-icons/expo.svg";
import imgTailwind from "../../assets/tech-icons/tailwindcss.svg";
import imgBootstrap from "../../assets/tech-icons/bootstrap.svg";
import imgNextjs from "../../assets/tech-icons/nextdotjs.svg";
import imgVite from "../../assets/tech-icons/vite.svg";
import imgMysql from "../../assets/tech-icons/mysql.svg";
import imgSupabase from "../../assets/tech-icons/supabase.svg";
import imgPython from "../../assets/tech-icons/python.svg";
import imgC from "../../assets/tech-icons/c.svg";
import imgCpp from "../../assets/tech-icons/cplusplus.svg";
import imgExpress from "../../assets/tech-icons/express.svg";
import imgNode from "../../assets/tech-icons/nodedotjs.svg";
import imgFlask from "../../assets/tech-icons/flask.svg";
import imgGraphql from "../../assets/tech-icons/graphql.svg";
import imgGit from "../../assets/tech-icons/git.svg";
import imgGithub from "../../assets/tech-icons/github.svg";
import imgLinux from "../../assets/tech-icons/linux.svg";
import imgPostman from "../../assets/tech-icons/postman.svg";
import imgDocker from "../../assets/tech-icons/docker.svg";
import imgCopilot from "../../assets/tech-icons/githubcopilot.svg";
import imgMongo from "../../assets/tech-icons/mongodb.svg";
import imgPostgres from "../../assets/tech-icons/postgresql.svg";
import imgAws from "../../assets/tech-icons/aws.svg";
type TechStackItem = {
  name: string;
  src: string;
};

const TECH_STACK: TechStackItem[] = [
  { name: "Figma", src: imgFigma },
  { name: "HTML", src: imgHtml },
  { name: "JavaScript", src: imgJs },
  { name: "TypeScript", src: imgTs },
  { name: "React", src: imgReact },
  { name: "Expo", src: imgExpo },
  { name: "Tailwind CSS", src: imgTailwind },
  { name: "Bootstrap", src: imgBootstrap },
  { name: "Next.js", src: imgNextjs },
  { name: "Vite", src: imgVite },
  { name: "MySQL", src: imgMysql },
  { name: "Supabase", src: imgSupabase },
  { name: "Python", src: imgPython },
  { name: "C", src: imgC },
  { name: "C++", src: imgCpp },
  { name: "Express", src: imgExpress },
  { name: "Node.js", src: imgNode },
  { name: "Flask", src: imgFlask },
  { name: "GraphQL", src: imgGraphql },
  { name: "Git", src: imgGit },
  { name: "GitHub", src: imgGithub },
  { name: "Linux", src: imgLinux },
  { name: "Postman", src: imgPostman },
  { name: "Docker", src: imgDocker },
  { name: "Copilot", src: imgCopilot },
  { name: "MongoDB", src: imgMongo },
  { name: "PostgreSQL", src: imgPostgres }
];

export function TechMarquee() {
  const [isHovered, setIsHovered] = useState(false);
  const baseX = useMotionValue(0);

  // Constants mapping spacing/size exactly to Figma constraints
  const ITEM_WIDTH = 91 + 30; // node W + gap flex spacing. 
  // Wait, let's use a natural inline flex map and trust a percentage modulo length wrap mechanism
  
  // A seamless velocity ticker using framer-motion that modulates speed effortlessly
  useAnimationFrame((t, delta) => {
    const baseVelocity = -1; // Ultra slow crawl
    const targetVelocity = isHovered ? (baseVelocity * 0.40) : baseVelocity; // Drops smoothly to a crawl on hover
    
    let moveBy = targetVelocity * (delta / 1000);
    baseX.set(baseX.get() + moveBy);
  });

  // Calculate strict pixel width of the entire tech list once per block to wrap flawlessly
  // using 26 items * ~(91px width + 40px gap). 
  // More reliably, we can just use percentage mapping! 
  // Let's use standard layout wrap: -50% means exactly 1 full iteration of the list sequence passed.
  const x = useTransform(baseX, (v) => `${wrap(-50, 0, v)}%`);

  // To prevent janky rendering with infinite wraps, we clone the array twice! 
  // 1 clone to wrap through, 1 clone to instantly swap back to at -50%. Total 52 items inline.
  const sequence = [...TECH_STACK, ...TECH_STACK];

  return (
    <div className="w-full relative py-[70px] flex flex-col justify-center items-center overflow-hidden">
      
      {/* Container wrapper ensuring full-bleed width with no scrollbars */}
      <div 
        className="relative w-full max-w-[1920px] mx-auto overflow-hidden group flex items-center"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        
        {/* The literal motion scroll conveyor belt. */}
        <motion.div 
          className="flex items-center gap-[40px] px-[20px] w-max whitespace-nowrap"
          style={{ x }}
        >
          {sequence.map((tech, idx) => (
            <div 
              key={idx} 
              className="flex flex-col gap-[6px] items-center shrink-0 w-[91px]"
            >
              {/* Box Element matching node 770:2878 exactly */}
              <div 
                className="border-[0.6px] border-solid border-white/40 flex items-center justify-center p-[20px] rounded-[13px] size-[90px] bg-transparent overflow-hidden"
              >
                <div className="relative shrink-0 w-full h-full flex justify-center items-center">
                  <img 
                    alt={tech.name} 
                    className="block w-full h-full object-contain opacity-90" 
                    src={tech.src}
                  />
                </div>
              </div>
              
              {/* Title Text */}
              <p className="font-['Inter_Display',sans-serif] leading-tight mt-1 not-italic shrink-0 text-[18px] text-center text-white tracking-[-0.54px] overflow-visible pb-1">
                {tech.name}
              </p>
            </div>
          ))}
        </motion.div>

        {/* CSS Portal Overlays for the fade illusion */}
        <div className="absolute left-0 top-0 h-full w-[150px] md:w-[377px] bg-gradient-to-r from-[#090909] to-transparent pointer-events-none z-10" />
        <div className="absolute right-0 top-0 h-full w-[150px] md:w-[377px] bg-gradient-to-l from-[#090909] to-transparent pointer-events-none z-10" />
      </div>
    </div>
  );
}

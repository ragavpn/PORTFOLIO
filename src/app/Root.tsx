import React, { useEffect } from "react";
import Lenis from "@studio-freight/lenis";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { Projects } from "./components/Projects";
import { Archives } from "./components/Archives";
import { Travel } from "./components/Travel";
import { Songs } from "./components/Songs";
import { Art } from "./components/Art";
import { Footer } from "./components/Footer";
import { Navbar } from "./components/Navbar";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Outlet } from "react-router";

gsap.registerPlugin(ScrollTrigger);

export default function Root() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
    });

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time)=>{
      lenis.raf(time * 1000)
    });

    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(lenis.raf);
    };
  }, []);

  return (
    <div className="w-full overflow-x-hidden bg-[#fffcf3] text-black font-sans">
      <Navbar />
      <Hero />
      <About />
      <Projects />
      <Archives />
      <Travel />
      <Songs />
      <Art />
      <Footer />
      <Outlet />
    </div>
  );
}

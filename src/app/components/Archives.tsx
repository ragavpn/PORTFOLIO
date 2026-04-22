import React, { useRef, useState, useEffect, useLayoutEffect, useCallback } from "react";
import gsap from "gsap";
import { Draggable } from "gsap/all";
import "../../styles/archives.css";

import imgRectangle1 from "../../assets/44d8ca679124c7e912ca3d6f45c90cd43b0fbe05.png";
import imgRectangle2 from "../../assets/b7c375cdb058365a733d1bf277a83c66452cd437.png";
import imgRectangle3 from "../../assets/e1338a03f5d96833a05e7c1a7caf242550330845.png";
import imgRectangle4 from "../../assets/880928608ce0fe62ff23115aeca7b455578597fa.png";
import imgRectangle5 from "../../assets/3e41dcb8e2113164fe350de95c8514ad377090bf.png";
import imgRectangle6 from "../../assets/fbeb2628438b8a6fa5618f1e34c9d764a6c1d8f2.png";
import imgRectangle7 from "../../assets/e7e0b6df495ea9563c6f8ef1747d3b8ab8ec5643.png";
import imgRectangle8 from "../../assets/d9d08092a2326bca3f8309077cde111cec49e0f3.png";
import imgRectangle9 from "../../assets/0281b12097e54c5f98160e098107fec25401ba2c.png";
import imgRectangle10 from "../../assets/93c3b30ae3778e3964adbc42eb6cff76d762bcc8.png";
import imgRectangle11 from "../../assets/ac7386bc0bc7911ef14d47b22636e3eddf145adf.png";
import imgRectangle12 from "../../assets/a7487275baa3922f0b2b6f878e26388996c7aa4a.png";
import imgRectangle13 from "../../assets/34dee3eff5718f45b805e03308b38d03debc45a4.png";
import imgRectangle14 from "../../assets/b30f711faff64e93b4c72f5a63464662260a0d4f.png";
import imgRectangle15 from "../../assets/af39a30d534fbcdcfae509804fcc4b14e6c0d54f.png";
import imgRectangle16 from "../../assets/1d4a35ba5970173795f9c8bfc96babf2de7288af.png";
import imgRectangle17 from "../../assets/178cfdcd987502d35117063c858adea1978cb454.png";
import imgRectangle18 from "../../assets/1bdf9ad8c70743b5dae196343330f0dd67e1cd48.png";
import imgRectangle19 from "../../assets/112750b5be8d6516e88fa1679e1112325a4be40e.png";
import imgRectangle20 from "../../assets/b83a2db72e8c0cce534efba8b86984dbc6b3867c.png";
import imgRectangle21 from "../../assets/4f5f3f75f20641cc0a38abc12718ac7a0725417f.png";
import imgRectangle22 from "../../assets/4682866e2a0f119b232455c05baf0b7d4e504510.png";
import imgRectangle23 from "../../assets/5e1e9316bc74274dee84013d6ad1e266f2a74969.png";
import imgRectangle24 from "../../assets/798f5cc7bdcb604a2abefcb3ee78ea36d2ea3bb3.png";

if (typeof window !== "undefined") {
  gsap.registerPlugin(Draggable);
}

const IMAGES = [
  imgRectangle1, imgRectangle2, imgRectangle3, imgRectangle4, imgRectangle5, imgRectangle6,
  imgRectangle7, imgRectangle8, imgRectangle9, imgRectangle10, imgRectangle11, imgRectangle12,
  imgRectangle13, imgRectangle14, imgRectangle15, imgRectangle16, imgRectangle17, imgRectangle18,
  imgRectangle19, imgRectangle20, imgRectangle21, imgRectangle22, imgRectangle23, imgRectangle24
];

const METADATA = [
  { title: "The Portal is Live", desc: "Launch the ecosystem. Make the digital gateway for Pragyan's tech festival official and live." },
  { title: "Optimizing Intelligence", desc: "Deploy the framework. Translate complex generative AI workloads into a striking visual narrative." },
  { title: "Brand Synergy", desc: "Bridge the branding. Integrate the mascot with sponsors for immediate cross-platform engagement." },
  { title: "The Event Cluster", desc: "Structure the cluster. Organize critical dates and sponsors into a sophisticated 3D spherical hierarchy." },
  { title: "Mechanical Prestige", desc: "Highlight the stakes. Demand attention for the flagship event through high-contrast mechanical precision." },
  { title: "Legacy of Partnership", desc: "Honor the lineage. Provide a premium, structured layout to showcase integral festival partners." },
  { title: "Mind Matters", desc: "Respect the subject. Use calming negative space and deliberate typography to explore mental health." },
  { title: "The Panopticon Archive", desc: "Embody the paranoia. Translate digital surveillance and omnipresence into a tangible physical asset." },
  { title: "Ethereal Entities", desc: "Drift through the void. Capture cosmic weightlessness using subtle gradients and minimal composition." },
  { title: "The Architecture of Teams", desc: "Map the structure. Break down complex organizational sub-teams into a seamless digital experience." },
  { title: "Rhythm in Motion", desc: "Set the tempo. Mimic the energetic cadence of salsa dancing to pull viewers into the cultural showcase." },
  { title: "The Golden Jubilee", desc: "Celebrate the milestone. Drape the 50th edition inductions interface in a luxurious golden legacy." },
  { title: "Under the Lens", desc: "Watch them closely. Immerse the inductions landing page in a subtly unsettling surveillance aesthetic." },
  { title: "The Red Directive", desc: "Command the launch. Utilize an aggressive red visual language to drive immediate, urgent engagement." },
  { title: "Robowars Registration", desc: "Arm the mechanics. Blend brutalist undertones with a high-conversion layout for flagship registrations." },
  { title: "Orbital Vision", desc: "Process the data. Deliver clean, technical interface design for satellite imagery captioning logic." },
  { title: "The Preference Matrix", desc: "Simplify the choice. Guide applicants through complex organizational systems without cognitive friction." },
  { title: "Sonic Onboarding", desc: "Onboard the sound. Rely on dark contrast and fluid inputs to create a seamless musical entry point." },
  { title: "Brewing Analytics", desc: "Organize the workflow. Prioritize operational clarity and rapid management through strict grid layouts." },
  { title: "The Murder Mystery", desc: "Build the suspense. Employ heavy shadows and cryptic typography to invite immediate intrigue." },
  { title: "Retro Workshop Interface", desc: "Revive the classic. Flawlessly recreate the tactile, iconic aesthetic of early operating systems." },
  { title: "The Crown Jewels", desc: "Seat the royalty. Elegantly position each team firmly within the geographic gaps of a crown." },
  { title: "Comic Launch", desc: "Break the mold. Announce the technical launch utilizing a vibrant, energetic comic-book layout." },
  { title: "Know Your Fest", desc: "Demystify the chaos. Implement clean typographic hierarchy to make dense informational answers scan fast." }
];

const COLS = 6;
const ROWS = 4;
const ITEM_SIZE = 506; // Massive intrinsic resolution so 60% zoom equals exactly 303.6px per Figma specs
/**
 * Immersive Interactive Polaroids Showcase Component.
 * 
 * Maps a grid of statically imported assets onto an absolute 2D floating coordinate canvas natively 
 * hijacked by `GSAP Draggable` rigid body constraints. Calculates randomized polaroid scattering math
 * explicitly anchoring custom intersections targeting active Z-index stacks to surface narrative 
 * metadata synchronously when users actively drag nodes through the central target vector.
 * 
 * @returns {JSX.Element} Fluid drag-and-drop boundary layout holding scatter-plotted image assets.
 */
export function Archives() {
  const canvasWrapperRef = useRef<HTMLDivElement>(null);
  const splitLeftRef = useRef<HTMLDivElement>(null);
  const splitRightRef = useRef<HTMLDivElement>(null);
  const zoomTargetRef = useRef<HTMLDivElement>(null);
  const splitContainerRef = useRef<HTMLDivElement>(null);
  const titleOverlayRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const percentageRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const controlsContainerRef = useRef<HTMLDivElement>(null);

  const [soundEnabled, setSoundEnabled] = useState(false);
  const [zoomMode, setZoomMode] = useState("NORMAL"); // User preference
  const [activeImageIndex, setActiveImageIndex] = useState<number | null>(null);
  const [isZoomClosing, setIsZoomClosing] = useState(false);
  
  const currentZoomLevel = useRef(0.6);
  const currentGap = useRef(32);
  const draggableInstance = useRef<Draggable[]>([]);

  // Audio system Ref
  const audioSystem = useRef({
    enabled: false,
    sounds: {
      click: typeof Audio !== "undefined" ? new Audio("/glitch-fx-001.mp3") : null,
      open: typeof Audio !== "undefined" ? new Audio("/click-glitch-001.mp3") : null,
      close: typeof Audio !== "undefined" ? new Audio("/click-glitch-001.mp3") : null,
      zoom: typeof Audio !== "undefined" ? new Audio("/whoosh-fx-001.mp3") : null,
      drag: typeof Audio !== "undefined" ? new Audio("/preloader-2s-001.mp3") : null,
    },
    play: (soundName: "click" | "open" | "close" | "zoom" | "drag") => {
      if (!audioSystem.current.enabled || !audioSystem.current.sounds[soundName]) return;
      try {
        const audio = audioSystem.current.sounds[soundName];
        if (audio) {
          audio.currentTime = 0;
          audio.volume = 0.3;
          audio.play().catch(() => {});
        }
      } catch (e) {}
    }
  });

  // Keep Audio Sync'd securely
  useEffect(() => {
    audioSystem.current.enabled = soundEnabled;
    if (soundEnabled && !activeImageIndex) {
      setTimeout(() => audioSystem.current.play("click"), 50);
    }
  }, [soundEnabled, activeImageIndex]);

  // Sound Wave Animation Hook
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    
    let animationId: number;
    let currentAmplitude = soundEnabled ? 1 : 0;
    const width = 32;
    const height = 16;
    const centerY = height / 2;
    const startTime = Date.now();

    const interpolateColor = (color1: string, color2: string, factor: number) => {
      const r1 = parseInt(color1.substring(1, 3), 16);
      const g1 = parseInt(color1.substring(3, 5), 16);
      const b1 = parseInt(color1.substring(5, 7), 16);
      const r2 = parseInt(color2.substring(1, 3), 16);
      const g2 = parseInt(color2.substring(3, 5), 16);
      const b2 = parseInt(color2.substring(5, 7), 16);
      const r = Math.round(r1 + factor * (r2 - r1)).toString(16).padStart(2, "0");
      const g = Math.round(g1 + factor * (g2 - g1)).toString(16).padStart(2, "0");
      const b = Math.round(b1 + factor * (b2 - b1)).toString(16).padStart(2, "0");
      return `#${r}${g}${b}`;
    };

    const animateWave = () => {
      const targetAmplitude = soundEnabled ? 1 : 0;
      currentAmplitude += (targetAmplitude - currentAmplitude) * 0.08;
      ctx.clearRect(0, 0, width, height);
      const time = (Date.now() - startTime) / 1000;
      const muteFactor = 1 - currentAmplitude;
      
      const primaryColor = "#2C1B14";
      const accentColor = "#A64B23";
      const muteColor = "#D9C4AA";

      if (!soundEnabled && currentAmplitude < 0.01) {
        ctx.fillStyle = muteColor;
        ctx.fillRect(0, centerY, width, 2);
      } else {
        ctx.fillStyle = interpolateColor(primaryColor, muteColor, muteFactor);
        for (let i = 0; i < width; i++) {
          const x = i - width / 2;
          const e = Math.exp((-x * x) / 50);
          const y = centerY + Math.cos(x * 0.4 - time * 8) * e * height * 0.35 * currentAmplitude;
          ctx.fillRect(i, Math.round(y), 1, 2);
        }
        ctx.fillStyle = interpolateColor(accentColor, muteColor, muteFactor);
        for (let i = 0; i < width; i++) {
          const x = i - width / 2;
          const e = Math.exp((-x * x) / 80);
          const y = centerY + Math.cos(x * 0.3 - time * 5) * e * height * 0.25 * currentAmplitude;
          ctx.fillRect(i, Math.round(y), 1, 2);
        }
      }
      animationId = requestAnimationFrame(animateWave);
    };
    animateWave();

    return () => cancelAnimationFrame(animationId);
  }, [soundEnabled]);

  /**
   * Viewport Intersection Observer for Dimming Logic.
   * Cross-references native JS intersection APIs to seamlessly dim items natively drifting 
   * out of bounds inside the global dragging canvas securely optimizing visual loads.
   */
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          gsap.to(entry.target, { opacity: 1, duration: 0.6, ease: "power2.out" });
        } else {
          // Check if enough time has passed since mount to start dimming
          const elapsed = Date.now() - (sectionRef.current as any)._mountTime;
          if (elapsed > 2000) {
            gsap.to(entry.target, { opacity: 0.1, duration: 0.6, ease: "power2.out" });
          } else {
            gsap.to(entry.target, { opacity: 1, duration: 0.6});
          }
        }
      });
    }, {
      root: sectionRef.current,
      threshold: 0.15,
      rootMargin: "-10%"
    });

    if (sectionRef.current) (sectionRef.current as any)._mountTime = Date.now();

    IMAGES.forEach((_, i) => {
      const el = document.getElementById(`grid-container-${i}`);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Dedicated core Initializer to completely decouple GSAP from React State Renders
  useLayoutEffect(() => {
    if (!canvasWrapperRef.current) return;
    const initialZoom = 0.6; // "NORMAL" state
    const initialGap = 32;

    const initW = COLS * (ITEM_SIZE + initialGap) - initialGap;
    const initH = ROWS * (ITEM_SIZE + initialGap) - initialGap;
    const vw = window.innerWidth;
    const vh = window.innerHeight;

    // Apply strict grid alignment silently
    IMAGES.forEach((_, i) => {
      const el = document.getElementById(`grid-container-${i}`);
      if (!el) return;
      const row = Math.floor(i / COLS);
      const col = i % COLS;
      gsap.set(el, {
        left: col * (ITEM_SIZE + initialGap),
        top: row * (ITEM_SIZE + initialGap),
        width: ITEM_SIZE,
        height: ITEM_SIZE,
      });
    });

    // Set map default placement (perfectly centered layout)
    gsap.set(canvasWrapperRef.current, {
      width: initW,
      height: initH,
      x: (vw - initW * initialZoom) / 2,
      y: (vh - initH * initialZoom) / 2,
      scale: initialZoom,
      transformOrigin: "0 0" 
    });

    gsap.set(controlsContainerRef.current, { 
      left: "50%", 
      xPercent: -50, 
      scale: 1.2,
      transformOrigin: "bottom center"
    });

    initDraggable(initW, initH, initialZoom, initialGap);

    currentZoomLevel.current = initialZoom;
    currentGap.current = initialGap;
  }, []);

  /**
   * Physics Layout Draggable Engine configuration block.
   * 
   * Lazily reconfigures spatial boundary definitions dynamically mapped against scaled virtual grid layouts. 
   * Safely kills legacy runtime hooks tracking coordinate constraints before re-binding 
   * new viewport limit values preventing native over-scroll outside of global container coordinates.
   * 
   * @param {number} w - Absolute physical width tracking column layout combinations.
   * @param {number} h - Absolute physical height tracking row layout combinations.
   * @param {number} z - Current scalar Zoom ratio mapped natively directly bypassing CSS matrices.
   * @param {number} currentGapValue - Absolute coordinate margin gap distance actively pushing matrix slots.
   */
  const initDraggable = (w: number, h: number, z: number, currentGapValue: number) => {
    if (draggableInstance.current.length > 0) {
      draggableInstance.current[0].kill();
    }
    
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const scaledW = w * z;
    const scaledH = h * z;
    const margin = currentGapValue;
    const marginX = margin * z;
    const marginY = margin * z;
    
    let minX, maxX, minY, maxY;
    
    if (scaledW <= vw) {
      const centerX = (vw - scaledW) / 2;
      minX = centerX - 100;
      maxX = centerX + 100;
    } else {
      maxX = 100;
      minX = vw - scaledW - 100;
    }
    
    if (scaledH <= vh) {
      const centerY = (vh - scaledH) / 2;
      minY = centerY - 100;
      maxY = centerY + 100;
    } else {
      maxY = 100;
      minY = vh - scaledH - 100;
    }

    draggableInstance.current = Draggable.create(canvasWrapperRef.current, {
      type: "x,y",
      bounds: { minX, maxX, minY, maxY },
      edgeResistance: 0.8,
      zIndexBoost: false,
      inertia: false, // Disabling native hook since InertiaPlugin is not installed globally
      onDragStart: function() {
        gsap.killTweensOf(this.target); // Catch and cancel any active momentum glides if grabbed instantly!
        document.body.classList.add("dragging");
        audioSystem.current.play("drag");
      },
      onDragEnd: function() {
        document.body.classList.remove("dragging");
        
        // Emulate Premium GSAP Inertia Physics manually based on physical exit velocity
        const momentumMultiplier = 6;  // Lowered from 18 to prevent aggressive flying/hitting bounds too hard
        let targetX = this.x + (this.deltaX * momentumMultiplier);
        let targetY = this.y + (this.deltaY * momentumMultiplier);

        // Clamp securely against the calculated bounds map
        targetX = Math.max(minX, Math.min(maxX, targetX));
        targetY = Math.max(minY, Math.min(maxY, targetY));

        gsap.to(this.target, {
          x: targetX,
          y: targetY,
          duration: 1.5,
          ease: "power4.out" // Gives that extremely long silky-smooth flowing glide finish
        });
      }
    });

    return { minX, maxX, minY, maxY };
  };

  /**
   * Calculates the target zoom scalar based on the selected mode.
   * "FIT" dynamically computes maximum bounds against current viewport limits.
   * 
   * @param {string} mode - The requested zoom preset ("ZOOM_OUT", "NORMAL", "ZOOM_IN", "FIT").
   * @returns {number} The absolute scalar float to apply to the coordinate grid.
   */
  const getTargetZoom = (mode: string) => {
    if (mode === "ZOOM_OUT") return 0.3;
    if (mode === "NORMAL") return 0.6;
    if (mode === "ZOOM_IN") return 1.0;
    
    // FIT mode
    const vw = window.innerWidth;
    const vh = window.innerHeight - 80;
    const g = 32;
    const fitW = (vw - 80) / (COLS * (ITEM_SIZE + g) - g);
    const fitH = (vh - 80) / (ROWS * (ITEM_SIZE + g) - g);
    return Math.max(0.1, Math.min(2.0, Math.min(fitW, fitH)));
  };

  /**
   * Handles user-driven zoom scaling transitions.
   * Calculates structural gap modifications and explicitly clamps focal coordinates
   * securely against viewport dimensions before smoothly interpolating the GSAP matrix.
   * 
   * @param {string} mode - The requested zoom level string.
   */
  const handleZoomChange = (mode: string) => {
    if (activeImageIndex !== null) {
       closeZoomMode();
       return;
    }
    
    setZoomMode(mode);
    audioSystem.current.play("zoom");
    
    const newZoom = getTargetZoom(mode);
    const newGap = newZoom >= 1.0 ? 16 : newZoom >= 0.6 ? 32 : 64;
    
    const oldZoom = currentZoomLevel.current;
    
    // Un-scaled grid dimensions
    const oldWidth = COLS * (ITEM_SIZE + currentGap.current) - currentGap.current;
    const oldHeight = ROWS * (ITEM_SIZE + currentGap.current) - currentGap.current;
    
    const newWidth = COLS * (ITEM_SIZE + newGap) - newGap;
    const newHeight = ROWS * (ITEM_SIZE + newGap) - newGap;
    
    // Ensure we maintain the focal point centered perfectly! 
    const vw = sectionRef.current ? sectionRef.current.clientWidth : window.innerWidth;
    const vh = sectionRef.current ? sectionRef.current.clientHeight : window.innerHeight;
    
    const currentX = gsap.getProperty(canvasWrapperRef.current, "x") as number;
    const currentY = gsap.getProperty(canvasWrapperRef.current, "y") as number;
    
    // 1. Move map to center natively over oldWidth / oldHeight!
    const cx = vw / 2;
    const cy = vh / 2;
    const initCenterX = cx - (oldWidth * oldZoom) / 2;
    const initCenterY = cy - (oldHeight * oldZoom) / 2;

    gsap.to(canvasWrapperRef.current, {
      duration: 0.6,
      x: initCenterX,
      y: initCenterY,
      ease: "power2.inOut",
      onComplete: () => {
        // 2. Perform grid rescales and zoom natively
        let targetX = cx - (newWidth * newZoom) / 2;
        let targetY = cy - (newHeight * newZoom) / 2;

        const scaledW = newWidth * newZoom;
        const scaledH = newHeight * newZoom;
        const margin = newGap * newZoom;

        // Apply clamped boundary logic securely if needed
        if (scaledW > vw) targetX = Math.max(vw - scaledW - margin, Math.min(targetX, margin));
        if (scaledH > vh) targetY = Math.max(vh - scaledH - margin, Math.min(targetY, margin));

        if (newGap !== currentGap.current) {
          IMAGES.forEach((_, i) => {
            const el = document.getElementById(`grid-container-${i}`);
            if (!el) return;
            const row = Math.floor(i / COLS);
            const col = i % COLS;
            gsap.to(el, {
              duration: 1.2,
              left: col * (ITEM_SIZE + newGap),
              top: row * (ITEM_SIZE + newGap),
              ease: "power4.inOut"
            });
          });
          
          gsap.to(canvasWrapperRef.current, {
            duration: 1.2,
            width: newWidth,
            height: newHeight,
            ease: "power4.inOut"
          });
        }

        if (percentageRef.current) {
            percentageRef.current.textContent = `${Math.round(newZoom * 100)}%`;
        }

        gsap.to(canvasWrapperRef.current, {
          duration: 1.2,
          scale: newZoom,
          x: targetX,
          y: targetY,
          ease: "power4.inOut",
          onComplete: () => {
             initDraggable(newWidth, newHeight, newZoom, newGap);
          }
        });

        currentZoomLevel.current = newZoom;
        currentGap.current = newGap;
      }
    });
  };

  /**
   * Smoothly unmounts the active zoomed image split-screen modal.
   * Re-initializes physics Draggable limits securely upon exit completion.
   */
  const closeZoomMode = () => {
    if (activeImageIndex === null || !sectionRef.current) return;
    audioSystem.current.play("close");
    setIsZoomClosing(true);
    
    // Hide Title
    gsap.to(titleOverlayRef.current, { opacity: 0, duration: 0.3 });
    
    // Animate container out and restore background brightness
    gsap.to(splitContainerRef.current, { opacity: 0, duration: 0.8, pointerEvents: "none" });
    gsap.to(canvasWrapperRef.current, { opacity: 1, duration: 1.0, ease: "power3.inOut" });

    // Ensure bottom bar stays centered
    gsap.to(controlsContainerRef.current, { 
      left: "50%", 
      xPercent: -50,
      duration: 1.0, 
      ease: "power3.inOut" 
    });

    const sourceEl = document.getElementById(`grid-img-${activeImageIndex}`);
    const cloneContainer = document.getElementById("scaling-overlay-container");

    if (cloneContainer && sourceEl) {
      const rect = sourceEl.getBoundingClientRect();
      const sectionRect = sectionRef.current.getBoundingClientRect();
      
      const targetTop = rect.top - sectionRect.top;
      const targetLeft = rect.left - sectionRect.left;

      gsap.to(cloneContainer, {
        top: targetTop,
        left: targetLeft,
        width: rect.width,
        height: rect.height,
        duration: 1.0,
        ease: "power4.inOut",
        onComplete: () => {
          // Immediately make source element visible underneath, but keep clone on top
          gsap.set(sourceEl, { opacity: 1 });
          
          // Gradually fade out the fully bright clone to smoothly reveal the vignette-darkened source underneath!
          gsap.to(cloneContainer, {
            opacity: 0,
            duration: 0.5,
            ease: "power2.out",
            onComplete: () => {
              if (cloneContainer.parentNode) cloneContainer.parentNode.removeChild(cloneContainer);
            }
          });
          
          setActiveImageIndex(null);
          setIsZoomClosing(false);
          
          // Re-enable dragging!
          const newW = COLS * (ITEM_SIZE + currentGap.current) - currentGap.current;
          const newH = ROWS * (ITEM_SIZE + currentGap.current) - currentGap.current;
          initDraggable(newW, newH, currentZoomLevel.current, currentGap.current);
        }
      });
    } else {
      setActiveImageIndex(null);
    }
  };

  const enterZoomMode = (index: number) => {
    if (activeImageIndex !== null || !sectionRef.current || !splitLeftRef.current) return;
    audioSystem.current.play("open");
    setActiveImageIndex(index);

    if (draggableInstance.current[0]) draggableInstance.current[0].kill();
    
    const splitContainer = splitContainerRef.current;
    if (splitContainer) {
      gsap.to(splitContainer, { opacity: 1, duration: 1.0, ease: "power4.inOut", pointerEvents: "all" });
      gsap.to(canvasWrapperRef.current, { opacity: 0.4, duration: 1.0, ease: "power4.inOut" }); // Gentle Dimming 
    }

    const sourceEl = document.getElementById(`grid-img-${index}`) as HTMLImageElement;
    if (sourceEl) {
      const rect = sourceEl.getBoundingClientRect();
      const sectionRect = sectionRef.current.getBoundingClientRect();
      const splitRect = splitLeftRef.current.getBoundingClientRect();
      
      // Calculate start bounds mathematically securely inside section!
      const startTop = rect.top - sectionRect.top;
      const startLeft = rect.left - sectionRect.left;

      // Build Wrapper element natively applying uncrop mask transition physics
      const cloneContainer = document.createElement("div");
      cloneContainer.id = "scaling-overlay-container";
      cloneContainer.style.position = "absolute";
      cloneContainer.style.top = `${startTop}px`;
      cloneContainer.style.left = `${startLeft}px`;
      cloneContainer.style.width = `${rect.width}px`;
      cloneContainer.style.height = `${rect.height}px`;
      cloneContainer.style.overflow = "hidden";
      cloneContainer.style.zIndex = "9992"; // Explicitly float over splitscreen (80)
      cloneContainer.style.cursor = "pointer";
      cloneContainer.onclick = closeZoomMode;

      const cloneImg = sourceEl.cloneNode(true) as HTMLImageElement;
      cloneImg.className = "w-full h-full object-cover pointer-events-none absolute top-0 left-0";
      cloneImg.style.opacity = "1";
      cloneContainer.appendChild(cloneImg);
      
      // Internal Fade Mask to simulate the native vignette and prevent instant blinding "pop"
      const fadeMask = document.createElement("div");
      fadeMask.className = "absolute inset-0 bg-black pointer-events-none";
      fadeMask.style.opacity = "0.7"; // Mimic the vignette depth approximately
      cloneContainer.appendChild(fadeMask);
      
      sectionRef.current.appendChild(cloneContainer);

      gsap.set(sourceEl, { opacity: 0 });
      gsap.to(fadeMask, { opacity: 0, duration: 0.6, ease: "power2.out" });

      // Determine intrinsic uncropped aspect ratio sizes mapped internally
      const aspect = sourceEl.naturalWidth / sourceEl.naturalHeight || 1;
      
      // Force Left Margin positioning
      const LEFT_MARGIN = 80;
      const VERTICAL_MARGIN = 80;
      
      const maxW = splitRect.width - LEFT_MARGIN - 40; // Leave 40px right breathing room in left-split
      const maxH = splitRect.height - VERTICAL_MARGIN * 2;
      
      let finalW = maxW;
      let finalH = maxW / aspect;
      if (finalH > maxH) {
        finalH = maxH;
        finalW = maxH * aspect;
      }
      
      const finalTop = (splitRect.top - sectionRect.top) + (splitRect.height - finalH) / 2;
      const finalLeft = (splitRect.left - sectionRect.left) + LEFT_MARGIN;

      // Animate the bottom bar off center uniquely positioned right of the image
      const imageRightEdge = finalLeft + finalW;
      gsap.to(controlsContainerRef.current, {
         left: imageRightEdge + 200, // 200px margin away from the expanded image
         xPercent: 0,                // Re-orients left anchor point perfectly
         scale: 1.2,
         duration: 1.0,
         ease: "power4.inOut"
      });

      gsap.to(cloneContainer, {
        top: finalTop,
        left: finalLeft,
        width: finalW,
        height: finalH,
        duration: 1.0,
        ease: "power4.inOut",
        onComplete: () => {
          if (titleOverlayRef.current) {
            gsap.to(titleOverlayRef.current, { opacity: 1, duration: 0.3 });
          }
        }
      });
    }
  };

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (activeImageIndex !== null && e.key === "Escape") closeZoomMode();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [activeImageIndex]);


  return (
    <section ref={sectionRef} id="archives-section" className="relative w-full h-screen bg-[#090909] overflow-hidden flex items-center justify-center select-none">
      
      {/* Background Vignette */}
      <div className="absolute inset-0 pointer-events-none z-10 bg-gradient-to-b from-[#000000b3] to-transparent h-[400px]" />

      {/* Main Draggable Map - Handled perfectly by GSAP completely ignoring React loops */}
      <div 
        ref={canvasWrapperRef} 
        className="absolute top-0 left-0 origin-top-left cursor-grab active:cursor-grabbing" 
        data-cursor="drag"
      >
        {IMAGES.map((imgSrc, i) => {
          return (
            <div 
              id={`grid-container-${i}`}
              key={i}
              className="absolute bg-transparent overflow-hidden" 
              onClick={() => enterZoomMode(i)}
              data-cursor="drag-click"
            >
              <img 
                id={`grid-img-${i}`}
                src={imgSrc} 
                alt={`Archive Item ${i}`} 
                className="w-full h-full object-cover pointer-events-none user-select-none" 
              />
            </div>
          );
        })}
      </div>

      {/* Split Screen Overlay */}
      <div ref={splitContainerRef} className="archives-split-screen-container">
        <div ref={splitLeftRef} className="archives-split-left" onClick={closeZoomMode}>
          <div ref={zoomTargetRef} className="archives-zoom-target"></div>
        </div>
        <div ref={splitRightRef} className="archives-split-right" onClick={closeZoomMode}></div>
      </div>

      {/* Image Title Information */}
      <div ref={titleOverlayRef} className={`archives-image-title-overlay ${activeImageIndex !== null ? 'opacity-100 !pointer-events-auto' : ''}`}>
        <div className="archives-image-slide-number">
          <span>{String((activeImageIndex || 0) + 1).padStart(2, '0')}</span>
        </div>
        <div className="archives-image-slide-title">
          <h1>{METADATA[activeImageIndex || 0]?.title || "Archive Document"}</h1>
        </div>
        <div className="archives-image-slide-description text-white w-[400px]">
          <p className="archives-description-line">
            {METADATA[activeImageIndex || 0]?.desc || "No description available."}
          </p>
        </div>
      </div>

      {/* Title Overlays / Headers */}
      <div className="-translate-x-1/2 absolute bg-[#090909bf] blur-[56.4px] h-[347px] left-1/2 top-[-98px] w-[2341px] pointer-events-none z-[9990]" />
      <p className="absolute font-['Inter_Display',sans-serif] font-semibold leading-[normal] left-1/2 -translate-x-1/2 not-italic text-[75px] text-shadow-[0px_4px_4px_rgba(0,0,0,0.25)] text-white top-[33px] tracking-[-4.5px] whitespace-nowrap z-[9995] pointer-events-none">
        THE ARCHIVES
      </p>

      {/* Close Button For Zoom View */}
      <button 
        className={`archives-close-button !z-[9999] transition-all duration-[700ms] ease-[cubic-bezier(0.87,0,0.13,1)]`}
        style={{
          opacity: activeImageIndex !== null && !isZoomClosing ? 1 : 0,
          pointerEvents: activeImageIndex !== null && !isZoomClosing ? 'all' : 'none',
          transform: activeImageIndex !== null && !isZoomClosing ? 'translateY(-50%) translateX(0px)' : 'translateY(-50%) translateX(60px)'
        }}
        onClick={closeZoomMode}
      >
        <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M7.89873 16L6.35949 14.48L11.8278 9.08H0V6.92H11.8278L6.35949 1.52L7.89873 0L16 8L7.89873 16Z" fill="white" />
        </svg>
      </button>

      {/* Controls Container */}
      <div 
        ref={controlsContainerRef}
        className="absolute bottom-10 left-1/2 flex items-center z-[9995] gap-4"
      >
        
        {/* Zoom Level Indicator */}
        <div ref={percentageRef} className="w-[80px] bg-[#fffcf3] rounded-[5px] shrink-0 h-10 flex items-center justify-center font-['JetBrains_Mono',monospace] tracking-[-0.75px] text-black">
           60%
        </div>

        {/* Zoom Mode Steps */}
        <div className="w-[360px] justify-between flex gap-2 bg-[#121212] px-3 h-10 items-center rounded-md relative radial-bg bg-[radial-gradient(rgba(255,255,255,0.015)_1px,transparent_0)] bg-[length:0.44em_0.44em] font-['Inter_Display',sans-serif]">
          {["ZOOM_OUT", "NORMAL", "ZOOM_IN", "FIT"].map((mode) => (
            <button 
              key={mode}
              className={`archives-switch-button ${zoomMode === mode ? 'archives-switch-button-current' : ''}`}
              onClick={() => handleZoomChange(mode)}
            >
              <span className="archives-indicator-dot"></span>
              {mode.replace("_", " ")}
            </button>
          ))}
        </div>

        {/* Sound Toggle */}
        <button 
          className="bg-[#f0f0f0] h-10 px-2 rounded-md flex items-center justify-center w-[80px]"
          onClick={() => setSoundEnabled(prev => !prev)}
        >
          <canvas ref={canvasRef} className="archives-sound-wave-canvas" width="32" height="16"></canvas>
        </button>

      </div>
    </section>
  );
}

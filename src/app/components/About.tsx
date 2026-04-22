import React, { useEffect, useRef } from "react";
import Matter from "matter-js";

const tags = [
  { text: "Prototyping" },
  { text: "Websites" },
  { text: "Mobile Apps" },
  { text: "Landing Pages" },
  { text: "User Research" },
  { text: "Workflows" },
  { text: "Product Management" },
  { text: "Digital Products" },
  { text: "Wireframing" },
];
/**
 * About Section providing a physics-based interactive tag pool.
 * 
 * Integrates an invisible HTML Canvas explicitly running `Matter.js` 2D rigid body physics,
 * mapped securely onto arbitrary `div` components (labels) tracking rotation and spatial
 * velocity across fixed `requestAnimationFrame` loops. Generates a reactive ground boundary
 * tracking exact responsive window dimensions to dynamically reset falling physics.
 * 
 * @returns {JSX.Element} Reactive layout anchoring the absolute Matter physics boundaries.
 */
export function About() {
  const containerRef = useRef<HTMLElement>(null);
  const tagRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;

    const Engine = Matter.Engine,
      Runner = Matter.Runner,
      MouseConstraint = Matter.MouseConstraint,
      Mouse = Matter.Mouse,
      World = Matter.World,
      Bodies = Matter.Bodies,
      Composite = Matter.Composite;

    const engine = Engine.create();
    engine.world.gravity.y = 0.95;

    const container = containerRef.current;
    let width = container.clientWidth;
    let height = container.clientHeight;

    const wallOptions = { 
      isStatic: true,
      friction: 0.5,
      collisionFilter: { category: 0x0001 }
    };
    
    /** 
     * Construct static infinite-mass container walls natively trapping the dynamic tags.
     * Walls use extreme thickness (5000px) so even the highest-velocity bodies cannot
     * tunnel through in a single physics tick. Walls are intentionally placed far outside
     * the visible area so their inner face aligns exactly with the container edge.
     * Left/right walls are taller than the container so corners are fully sealed.
     */
    const wallThickness = 5000;
    const ground  = Bodies.rectangle(width / 2,        height + wallThickness / 2, width + wallThickness * 2, wallThickness, wallOptions);
    const ceiling = Bodies.rectangle(width / 2,        -wallThickness / 2,         width + wallThickness * 2, wallThickness, wallOptions);
    const leftWall  = Bodies.rectangle(-wallThickness / 2, height / 2, wallThickness, height + wallThickness * 2, wallOptions);
    const rightWall = Bodies.rectangle(width + wallThickness / 2, height / 2, wallThickness, height + wallThickness * 2, wallOptions);

    Composite.add(engine.world, [ground, leftWall, rightWall, ceiling]);

    let runner: Matter.Runner;
    let mouse: Matter.Mouse;
    
    // Use a small timeout to guarantee fonts are loaded and DOM elements have correct dimensions
    // otherwise Matter bodies are created with 0x0 size and cannot be dragged.
    const initTimeout = setTimeout(() => {
      // Safely re-read dimensions inside the timeout to guarantee they aren't 0 from the very first render tick
      width = container.clientWidth || window.innerWidth;
      height = container.clientHeight || window.innerHeight;

      const bodies = tagRefs.current.map((ref, i) => {
        if (!ref) return null;
        // Fallback dimensions in case they are somehow still 0
        const w = ref.offsetWidth || 200;
        const h = ref.offsetHeight || 60;
        
        // Spawn at random horizontal places near the bottom of the section
        const x = (width * 0.1) + (Math.random() * (width * 0.8));
        const y = height - (Math.random() * 150) - 100;
        
        // Give each tag a unique permanent resting tilt
        const targetAngle = (Math.random() - 0.5) * 0.4;
        
        const body = Bodies.rectangle(x, y, w, h, {
          chamfer: { radius: h / 2 },
          restitution: 0.3,
          friction: 0.2,
          density: 0.005,
          angle: targetAngle,
          collisionFilter: { category: 0x0002 }
        });
        
        // Store the target angle so the weebles effect remembers its unique tilt
        body.plugin.targetAngle = targetAngle;
        return body;
      }).filter((b): b is Matter.Body => b !== null);

      Composite.add(engine.world, bodies);

      mouse = Mouse.create(container);
      const mouseConstraint = MouseConstraint.create(engine, {
        mouse: mouse,
        constraint: {
          stiffness: 0.2,
          render: { visible: false }
        },
        collisionFilter: {
          mask: 0x0002
        }
      });
      Composite.add(engine.world, mouseConstraint);

      // Prevent holding: instantly drop objects when clicked, but give them a fun "pop" push!
      Matter.Events.on(mouseConstraint, 'mousedown', (event: any) => {
        const clickedBody = Matter.Query.point(bodies, event.mouse.position)[0];
        if (clickedBody) {
          // Apply an upward "pop" force, angled slightly away from where you clicked
          const forceX = (clickedBody.position.x - event.mouse.position.x) * 0.001;
          Matter.Body.applyForce(clickedBody, event.mouse.position, { x: forceX, y: -0.15 });
        }
      });

      // Ensure that if the mouse leaves the boundary of the canvas (container) and is released,
      // it drops the object properly when coming back.
      const handleGlobalPointerUp = () => {
        if (mouseConstraint.body) {
          mouseConstraint.body = null as unknown as Matter.Body;
        }
        mouse.button = -1; // Force Matter to drop left click internally
      };
      
      // Actively tracks the true native browser cursor since Matter.js internal coordinates 
      // strictly freeze when the cursor escapes the internal DOM bounds
      const handleGlobalPointerMove = (e: PointerEvent) => {
        const rect = container.getBoundingClientRect();
        // Force drop if the cursor visually escapes the strict spatial boundaries of the About section
        if (e.clientY < rect.top || e.clientY > rect.bottom || e.clientX < rect.left || e.clientX > rect.right) {
           if (mouseConstraint.body) {
              mouseConstraint.body = null as unknown as Matter.Body;
           }
           // Critically: Reset Matter.js internal "mousedown" state so it stops ghost-grabbing!
           mouse.button = -1; 
        }
      };

      window.addEventListener('pointermove', handleGlobalPointerMove);
      window.addEventListener('pointerup', handleGlobalPointerUp);
      window.addEventListener('pointercancel', handleGlobalPointerUp);

      // Prevent matter.js from stealing scroll events when not interacting with bodies
      mouse.element.removeEventListener("mousewheel", (mouse as any).mousewheel);
      mouse.element.removeEventListener("DOMMouseScroll", (mouse as any).mousewheel);

      runner = Runner.create();
      Runner.run(runner, engine);

      // Apply the self-righting "weebles" effect mechanics!
      Matter.Events.on(engine, 'beforeUpdate', () => {
        
        // Clamp the internal mouse position to strictly prevent pulling items beyond visible walls/floors
        if (mouse.position.y > height - 30) {
          mouse.position.y = height - 30;
          mouse.absolute.y = height - 30;
        }
        if (mouse.position.y < 0) {
          mouse.position.y = 0;
          mouse.absolute.y = 0;
        }
        if (mouse.position.x < 30) {
          mouse.position.x = 30;
          mouse.absolute.x = 30;
        }
        if (mouse.position.x > width - 30) {
          mouse.position.x = width - 30;
          mouse.absolute.x = width - 30;
        }

        bodies.forEach(body => {
          // Dampen rotation slightly so it doesn't spin wildly
          Matter.Body.setAngularVelocity(body, body.angularVelocity * 0.9);
          // Apply a force pulling the angle back to its unique target rest angle
          const targetAngle = body.plugin.targetAngle || 0;
          
          /* <-- INCREASE OR DECREASE THIS VALUE (0.4) TO CHANGE HOW FAST THEY SELF-BALANCE! --> */
          const balancingForce = 0.4; 
          
          body.torque = -(body.angle - targetAngle) * balancingForce;

          // ── Velocity cap: prevent tunneling at extreme throw forces ──────────
          const maxSpeed = 40;
          const vx = body.velocity.x;
          const vy = body.velocity.y;
          const speed = Math.sqrt(vx * vx + vy * vy);
          if (speed > maxSpeed) {
            const scale = maxSpeed / speed;
            Matter.Body.setVelocity(body, { x: vx * scale, y: vy * scale });
          }

          // ── Escape-hatch clamp: teleport back if body somehow slips out bounds ─
          const margin = 10;
          if (body.position.x < margin)           Matter.Body.setPosition(body, { x: margin, y: body.position.y });
          if (body.position.x > width - margin)   Matter.Body.setPosition(body, { x: width - margin, y: body.position.y });
          if (body.position.y < margin)            Matter.Body.setPosition(body, { x: body.position.x, y: margin });
          if (body.position.y > height - margin)  Matter.Body.setPosition(body, { x: body.position.x, y: height - margin });
        });
      });

      const updateLoop = () => {
        bodies.forEach((body, i) => {
          const ref = tagRefs.current[i];
          if (ref && body) {
            const bx = body.position.x - ref.offsetWidth / 2;
            const by = body.position.y - ref.offsetHeight / 2;
            ref.style.transform = `translate(${bx}px, ${by}px) rotate(${body.angle}rad)`;
          }
        });
      };

      Matter.Events.on(engine, 'afterUpdate', updateLoop);

      const handleResize = () => {
        if (!containerRef.current) return;
        width = containerRef.current.clientWidth;
        height = containerRef.current.clientHeight;
        const wt = 5000;
        Matter.Body.setPosition(ground,     { x: width / 2,          y: height + wt / 2 });
        Matter.Body.setVertices(ground,     Matter.Bodies.rectangle(width / 2, height + wt / 2, width + wt * 2, wt).vertices);
        Matter.Body.setPosition(ceiling,    { x: width / 2,          y: -wt / 2 });
        Matter.Body.setVertices(ceiling,    Matter.Bodies.rectangle(width / 2, -wt / 2, width + wt * 2, wt).vertices);
        Matter.Body.setPosition(leftWall,   { x: -wt / 2,            y: height / 2 });
        Matter.Body.setVertices(leftWall,   Matter.Bodies.rectangle(-wt / 2, height / 2, wt, height + wt * 2).vertices);
        Matter.Body.setPosition(rightWall,  { x: width + wt / 2,     y: height / 2 });
        Matter.Body.setVertices(rightWall,  Matter.Bodies.rectangle(width + wt / 2, height / 2, wt, height + wt * 2).vertices);
      };
      window.addEventListener("resize", handleResize);

      // Add a ResizeObserver so the physics floor moves down dynamically if the text wraps or section grows
      const resizeObserver = new ResizeObserver(() => {
        handleResize();
      });
      if (containerRef.current) resizeObserver.observe(containerRef.current);

      // Store cleanup references in the engine plugin to clean up properly
      (engine as any).plugin.cleanup = () => {
        window.removeEventListener("resize", handleResize);
        window.removeEventListener('pointermove', handleGlobalPointerMove);
        window.removeEventListener('pointerup', handleGlobalPointerUp);
        window.removeEventListener('pointercancel', handleGlobalPointerUp);
        resizeObserver.disconnect();
      };

    }, 150);

    return () => {
      clearTimeout(initTimeout);
      if (runner) Runner.stop(runner);
      if ((engine as any).plugin.cleanup) {
        (engine as any).plugin.cleanup();
      }
      World.clear(engine.world, false);
      Engine.clear(engine);
      if (mouse) Mouse.clearSourceEvents(mouse);
    };
  }, []);

  // ── Per-character sweep opacity driven by scroll ──────────────────────────
  const textRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const el = textRef.current;
    if (!el) return;

    let rafId: number;

    const update = () => {
      const spans = el.querySelectorAll<HTMLSpanElement>("span[data-char]");
      if (!spans.length) { rafId = requestAnimationFrame(update); return; }

      const rect = el.getBoundingClientRect();
      const vpH = window.innerHeight;

      // Start: paragraph top is 10% into the viewport (rect.top = vpH * 0.9)
      // End:   paragraph midpoint is at viewport midpoint (rect.top = vpH/2 - rect.height/2)
      const startY = vpH * 0.9;
      const endY   = vpH / 2 - rect.height / 2;
      const progress = Math.min(1, Math.max(0, (startY - rect.top) / (startY - endY)));

      const total = spans.length;
      const frontier = progress * (total + 12);
      const fadeZone = 14;

      spans.forEach((span, i) => {
        const t = Math.min(1, Math.max(0, (frontier - i) / fadeZone));
        span.style.opacity = String(0.08 + 0.92 * t);
      });

      rafId = requestAnimationFrame(update);
    };

    update();
    return () => cancelAnimationFrame(rafId);
  }, []);

  /**
   * Helper function to render text with per-character spanning.
   * Splits strings by spaces to preserve line-wrapping via plain text nodes,
   * while individually wrapping non-space characters in `data-char` spans 
   * for the scroll-driven opacity sweep animation.
   * 
   * @param {string} text - The raw string to animate.
   * @param {string} [cls] - Optional CSS classes to apply to each character span.
   * @returns {JSX.Element[]} Array of span elements representing the wrapped words.
   */
  const animText = (text: string, cls?: string) => {
    const words = text.split(" ");
    return words.map((word, wi) => (
      <span key={wi} style={{ display: "inline" }}>
        {wi > 0 && " "}
        {word.split("").map((ch, ci) => (
          <span
            key={ci}
            data-char="1"
            className={cls}
            style={{ opacity: 0.08 }}
          >
            {ch}
          </span>
        ))}
      </span>
    ));
  };

  return (
    <section
      id="about-section"
      ref={containerRef}
      className="min-h-screen relative w-full flex flex-col items-center justify-center py-25"
    >
      <div className="flex flex-col items-center z-10 w-full text-center relative pointer-events-none -translate-y-[50px]">
        <div className="w-full px-6 sm:px-12 md:px-24">
          <p
            ref={textRef}
            className="font-medium text-[#090909] text-[clamp(20px,3.5vw,52px)] leading-[0.9] tracking-[-1.22px] w-full mx-auto"
          >
            {animText("A full-time ")}
            {animText("Software Engineer ", "font-['Just_Another_Hand'] text-[clamp(32px,5vw,70px)]")}
            {animText("and part-time ")}
            {animText("Machine Learning Enthusiast", "font-['Just_Another_Hand'] text-[clamp(32px,5vw,70px)]")}
            {animText(" and ")}
            {animText("UI UX Designer", "font-['Just_Another_Hand'] text-[clamp(32px,5vw,70px)]")}
            {animText(", alongside being a passionate ")}
            {animText("Artist", "font-['Just_Another_Hand'] text-[clamp(32px,5vw,70px)]")}
            {animText(" and a ")}
            {animText("Music Lover", "font-['Just_Another_Hand'] text-[clamp(32px,5vw,70px)]")}
            {animText(", with a myriad of interests that just might be perfect conversation starters.")}
          </p>
        </div>
      </div>

      <div className="absolute inset-0 z-20 pointer-events-none">
        {tags.map((tag, i) => (
          <div
            key={i}
            ref={(el) => { tagRefs.current[i] = el; }}
            data-cursor="drag"
            className="absolute top-0 left-0 bg-[#1735f4] flex items-center justify-center px-[46.7px] py-[8.4px] rounded-[49.8px] shadow-lg cursor-pointer hover:bg-[#152edb] transition-colors pointer-events-auto select-none"
            style={{ 
              willChange: "transform",
              touchAction: "none" // Ensures dragging works on all devices without triggering scroll
            }}
          >
            <p className="font-['Instrument_Serif'] text-[#FFFCF3] text-[48.8px] font-normal not-italic leading-normal tracking-[-2.44px] whitespace-nowrap p-0">
              {tag.text}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

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
    
    // Create boundaries. The ground is made very thick to prevent tunneling. Top edge is exactly at height.
    const ground = Bodies.rectangle(width / 2, height + 250, width * 2, 500, wallOptions);
    const leftWall = Bodies.rectangle(-250, height / 2, 500, height * 4, wallOptions);
    const rightWall = Bodies.rectangle(width + 250, height / 2, 500, height * 4, wallOptions);
    // Move ceiling right to the top of the container so items bounce down when thrown 
    const ceiling = Bodies.rectangle(width / 2, -50, width * 2, 100, wallOptions);

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
      Matter.Events.on(mouseConstraint, 'mousedown', (event) => {
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
          mouseConstraint.body = null;
        }
      };
      window.addEventListener('pointerup', handleGlobalPointerUp);
      window.addEventListener('pointercancel', handleGlobalPointerUp);

      // Prevent matter.js from stealing scroll events when not interacting with bodies
      mouse.element.removeEventListener("mousewheel", mouse.mousewheel);
      mouse.element.removeEventListener("DOMMouseScroll", mouse.mousewheel);

      runner = Runner.create();
      Runner.run(runner, engine);

      let lastMouseX = 0;
      let lastMouseY = 0;

      // Apply the self-righting "weebles" effect and anti-hold mechanics!
      Matter.Events.on(engine, 'beforeUpdate', () => {
        
        // Anti-Holding Physics: Calculate instantaneous mouse pointer speed
        const mouseSpeed = Math.abs(mouse.position.x - lastMouseX) + Math.abs(mouse.position.y - lastMouseY);
        lastMouseX = mouse.position.x;
        lastMouseY = mouse.position.y;

        // If the user tries to hold an item still in mid-air (speed drops below 2 pixels per tick), rip it out of their grip!
        if (mouseConstraint.body && mouseSpeed < 2) {
           mouseConstraint.body = null;
        }

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
        Matter.Body.setPosition(ground, { x: width / 2, y: height + 250 });
        Matter.Body.setVertices(ground, Matter.Bodies.rectangle(width / 2, height + 250, width * 2, 500).vertices);
        Matter.Body.setPosition(rightWall, { x: width + 250, y: height / 2 });
        Matter.Body.setVertices(rightWall, Matter.Bodies.rectangle(width + 250, height / 2, 500, height * 4).vertices);
        Matter.Body.setPosition(leftWall, { x: -250, y: height / 2 });
        Matter.Body.setVertices(leftWall, Matter.Bodies.rectangle(-250, height / 2, 500, height * 4).vertices);
        Matter.Body.setPosition(ceiling, { x: width / 2, y: -50 });
        Matter.Body.setVertices(ceiling, Matter.Bodies.rectangle(width / 2, -50, width * 2, 100).vertices);
      };
      window.addEventListener("resize", handleResize);

      // Add a ResizeObserver so the physics floor moves down dynamically if the text wraps or section grows
      const resizeObserver = new ResizeObserver(() => {
        handleResize();
      });
      if (containerRef.current) resizeObserver.observe(containerRef.current);

      // Store cleanup references in the engine plugin to clean up properly
      engine.plugin.cleanup = () => {
        window.removeEventListener("resize", handleResize);
        window.removeEventListener('pointerup', handleGlobalPointerUp);
        window.removeEventListener('pointercancel', handleGlobalPointerUp);
        resizeObserver.disconnect();
      };

    }, 150);

    return () => {
      clearTimeout(initTimeout);
      if (runner) Runner.stop(runner);
      if (engine.plugin.cleanup) {
        engine.plugin.cleanup();
      }
      World.clear(engine.world, false);
      Engine.clear(engine);
      if (mouse) Mouse.clearSourceEvents(mouse);
    };
  }, []);

  return (
    <section 
      id="about-section"
      ref={containerRef}
      className="min-h-screen relative w-full flex flex-col items-center justify-center py-25"
    >
      <div className="flex flex-col items-center z-10 w-full text-center relative pointer-events-none -translate-y-[50px]">
        <div className="w-full px-6 sm:px-12 md:px-24">
          <p className="font-medium text-[#090909] text-[clamp(20px,3.5vw,52px)] leading-[0.9] tracking-[-1.22px] w-full mx-auto">
            <span>A full-time </span>
            <span className="font-['Just_Another_Hand'] text-[clamp(32px,5vw,70px)]">Software Engineer </span>
            <span>and part-time </span>
            <span className="font-['Just_Another_Hand'] text-[clamp(32px,5vw,70px)]">Machine Learning Enthusiast</span>
            <span> and </span>
            <span className="font-['Just_Another_Hand'] text-[clamp(32px,5vw,70px)]">UI UX Designer</span>
            <span>, alongside being a passionate </span>
            <span className="font-['Just_Another_Hand'] text-[clamp(32px,5vw,70px)]">Artist</span>
            <span> and a </span>
            <span className="font-['Just_Another_Hand'] text-[clamp(32px,5vw,70px)]">Music Lover</span>
            <span>, with a myriad of interests that just might be perfect conversation starters.</span>
          </p>
        </div>
      </div>

      <div className="absolute inset-0 z-20 pointer-events-none">
        {tags.map((tag, i) => (
          <div
            key={i}
            ref={(el) => (tagRefs.current[i] = el)}
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

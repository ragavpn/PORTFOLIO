import React, { useState, useEffect, useRef } from "react";
import imgImage16 from "../../assets/7e3b5a5b6928c3730d83caafff8dcf8ed9047c5d.png";
import imgLinkedin from "../../assets/LINKEDIN.png";
import imgInstagram from "../../assets/INSTA.png";
import imgBehance from "../../assets/behnace.png";
import imgWordmark from "../../assets/Vector.png";

/**
 * Global Page Footer Component.
 *
 * Dual-mode rendering strategy:
 *  - **Desktop (md+):** Renders only a minimal invisible anchor (`#contact-section`)
 *    since the full blue contact card is embedded inside `Art.tsx`.
 *  - **Mobile (<md):** Renders a standalone, pixel-faithful blue contact card that matches
 *    Figma node 429:2568 exactly, scaled responsively to viewport width using CSS transform.
 *
 * @returns {JSX.Element} The responsive contact anchor / mobile contact card.
 */
export function Footer() {
  const [emailHovered, setEmailHovered] = useState(false);
  const [scale, setScale] = useState(1);
  const wrapperRef = useRef<HTMLDivElement>(null);

  /** Compute scale to fill the mobile viewport width, matching the Figma 1298px card width. */
  useEffect(() => {
    const DESIGN_W = 1298;
    const PADDING = 32; // 16px each side

    const handleResize = () => {
      const available = window.innerWidth - PADDING;
      setScale(available / DESIGN_W);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  /** Figma card intrinsic height at 1:1 scale. */
  const CARD_H = 1114;
  const CARD_W = 1298;

  return (
    <section id="contact-section" className="w-full relative">
      {/* ── Mobile-only contact card (hidden on md+) ── */}
      <div
        ref={wrapperRef}
        className="block md:hidden mx-auto"
        style={{
          width: CARD_W * scale,
          height: CARD_H * scale,
          margin: "16px auto 32px",
        }}
      >
        {/* 
          The inner card is rendered at Figma's native 1298×1114 resolution
          then uniformly scaled down via transform-origin top-left.
          This guarantees all absolute positions from Figma are pixel-accurate.
        */}
        <div
          style={{
            width: CARD_W,
            height: CARD_H,
            transformOrigin: "top left",
            transform: `scale(${scale})`,
            position: "relative",
            borderRadius: "62.336px",
            background: "#1735f4",
            overflow: "hidden",
          }}
        >
          {/* ── LET'S ★ IMAGINE / TOGETHER headline ── */}
          <div
            style={{
              position: "absolute",
              left: 53.57,
              top: 67,
              width: 1244.43,
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
            }}
          >
            {/* Row: LET'S + starburst + IMAGINE */}
            <div style={{ display: "flex", gap: 28, alignItems: "center" }}>
              <p style={{
                fontFamily: "'Inter Display', sans-serif",
                fontWeight: 400,
                fontSize: 122.528,
                lineHeight: 1.02,
                letterSpacing: "-2.4506px",
                color: "#fffcf3",
                whiteSpace: "nowrap",
                margin: 0,
              }}>
                {"LET'S "}
              </p>

              {/* Starburst sprite from Figma image16 */}
              <div style={{ height: 86.547, width: 85.451, position: "relative", flexShrink: 0 }}>
                <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
                  <img
                    alt=""
                    src={imgImage16}
                    style={{
                      position: "absolute",
                      height: "379.75%",
                      left: "-179.49%",
                      maxWidth: "none",
                      top: "-255.27%",
                      width: "299.15%",
                    }}
                  />
                </div>
              </div>

              {/* Cycling word slot — static IMAGINE for mobile */}
              <div style={{ height: 152.026, width: 550.955, overflow: "hidden", position: "relative", flexShrink: 0 }}>
                <div style={{
                  position: "absolute",
                  display: "flex",
                  flexDirection: "column",
                  fontFamily: "'Inter Display', sans-serif",
                  fontWeight: 400,
                  gap: 39.708,
                  height: 618.313,
                  alignItems: "flex-start",
                  lineHeight: 1.02,
                  left: 29.5,
                  fontSize: 122.53,
                  color: "#fffcf3",
                  top: 18.15,
                  letterSpacing: "-2.4506px",
                  width: 471.96,
                }}>
                  <p style={{ margin: 0 }}>IMAGINE</p>
                  <p style={{ margin: 0 }}>WORK</p>
                  <p style={{ margin: 0 }}>BUILD</p>
                  <p style={{ margin: 0 }}>CREATE</p>
                  <p style={{ margin: 0 }}>IMAGINE</p>
                </div>
              </div>
            </div>

            {/* TOGETHER. */}
            <p style={{
              fontFamily: "'Inter Display', sans-serif",
              fontWeight: 400,
              fontSize: 122.528,
              lineHeight: 1.02,
              letterSpacing: "-2.4506px",
              color: "#fffcf3",
              margin: 0,
            }}>
              TOGETHER.
            </p>
          </div>

          {/* ── Name + Email ── */}
          <div
            style={{
              position: "absolute",
              left: 53.57,
              top: 411.03,
              display: "flex",
              flexDirection: "column",
              gap: 11,
              alignItems: "flex-start",
            }}
          >
            <p style={{
              fontFamily: "'Inter Display', sans-serif",
              fontWeight: 500,
              fontSize: 58,
              lineHeight: 1.02,
              letterSpacing: "-1.2px",
              color: "#fffcf3",
              opacity: 0.8,
              whiteSpace: "nowrap",
              margin: 0,
            }}>
              Ragav Palaniswamy
            </p>

            <a
              href="mailto:ragavpn2005@gmail.com"
              onMouseEnter={() => setEmailHovered(true)}
              onMouseLeave={() => setEmailHovered(false)}
              style={{ display: "flex", alignItems: "center", gap: 16, textDecoration: "none" }}
            >
              {/* Arrow icon */}
              <svg width="36" height="18" viewBox="0 0 24 11.547" fill="none" style={{ flexShrink: 0, opacity: 0.5 }}>
                <path d="M 0 5.7735 L 24 5.7735 M 18.2265 0 L 24 5.7735 L 18.2265 11.547" stroke="white" strokeWidth="2" />
              </svg>
              <span style={{
                fontFamily: "'Inter Display', sans-serif",
                fontWeight: 500,
                fontSize: 42,
                lineHeight: 1.02,
                letterSpacing: "-0.84px",
                color: "#fffcf3",
                whiteSpace: "nowrap",
                opacity: emailHovered ? 1 : 0.5,
                transform: emailHovered ? "translateX(10px)" : "translateX(0)",
                transition: "opacity 0.3s ease, transform 0.3s ease",
                display: "inline-block",
              }}>
                ragavpn2005@gmail.com
              </span>
            </a>
          </div>

          {/* ── Social Links (icon-only) ── */}
          <div
            style={{
              position: "absolute",
              left: 53.57,
              top: 618,
              display: "flex",
              alignItems: "center",
              gap: 48,
            }}
          >
            {/* LinkedIn */}
            <a href="https://www.linkedin.com/in/ragav-palaniswamy-55aa97183/" target="_blank" rel="noreferrer"
              style={{ display: "flex", alignItems: "center", textDecoration: "none", opacity: 0.8 }}>
              <img src={imgLinkedin} alt="LinkedIn" style={{ width: 56, height: 56, objectFit: "contain" }} />
            </a>

            {/* Instagram */}
            <a href="https://www.instagram.com/ragavwithouttheh" target="_blank" rel="noreferrer"
              style={{ display: "flex", alignItems: "center", textDecoration: "none", opacity: 0.8 }}>
              <img src={imgInstagram} alt="Instagram" style={{ width: 56, height: 56, objectFit: "contain" }} />
            </a>

            {/* Behance */}
            <a href="https://www.behance.net/ragavpn" target="_blank" rel="noreferrer"
              style={{ display: "flex", alignItems: "center", textDecoration: "none", opacity: 0.8 }}>
              <img src={imgBehance} alt="Behance" style={{ width: 56, height: 56, objectFit: "contain" }} />
            </a>
          </div>


          {/* ── 2026 ── */}
          <p style={{
            position: "absolute",
            fontFamily: "'Inter Display', sans-serif",
            fontWeight: 900,
            fontSize: 110.958,
            lineHeight: 1.02,
            letterSpacing: "-3.3287px",
            color: "#fffcf3",
            left: 193.23,
            top: 982.52,
            whiteSpace: "nowrap",
            margin: 0,
          }}>
            2026
          </p>

          {/* ── PORTFOLIO wordmark (rotated, bottom-right) ── */}
          <div style={{
            position: "absolute",
            height: 698.868,
            left: 584.23,
            top: 396.65,
            width: 713.767,
          }}>
            <img
              alt="PORTFOLIO"
              src={imgWordmark}
              style={{ position: "absolute", inset: 0, width: "100%", height: "100%", display: "block" }}
            />
          </div>

          {/* ── Sticker (top-left, rotated) ── */}
          <div style={{
            position: "absolute",
            left: -2,
            top: 62,
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            paddingLeft: 75,
          }}>
            <div style={{
              display: "flex",
              height: 72.605,
              width: 90.57,
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
            }}>
              <div style={{ transform: "rotate(15deg)", flexShrink: 0 }}>
                <div style={{ height: 53.912, width: 79.319, position: "relative" }}>
                  <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
                    <img
                      alt=""
                      src={imgImage16}
                      style={{
                        position: "absolute",
                        height: "344.83%",
                        left: "-56.77%",
                        maxWidth: "none",
                        top: "-136.02%",
                        width: "182.29%",
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

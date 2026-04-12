# Product Requirements Document (PRD) & Implementation Plan

## Overview
A highly interactive, single-page portfolio website built with React, Vite, GSAP, Lenis (for smooth scrolling), and Framer Motion.

## Tech Stack
- Frontend: React (Vite)
- Routing: React Router (if needed, though single page is preferred)
- Styling: Tailwind CSS
- Animation: GSAP, ScrollTrigger, Framer Motion (Motion), Lenis
- Assets: Figma exports (Images & SVGs)

## Section-by-Section Requirements

1. **Global Smooth Scroll**
   - Implement `@studio-freight/lenis` for global smooth scrolling.
   - Synchronize Lenis with GSAP ScrollTrigger.

2. **Hero / Home**
   - Replicate the landing section.

3. **About Section**
   - Display the text contents.
   - Implement a floating/draggable tags component (using `framer-motion` `drag` capabilities) for the blue tags ("Digital Products", "Prototyping", etc.). They remain in place but can be interactively dragged.

4. **Projects Section**
   - List of projects.
   - On hovering over a project, a popup image/preview appears and follows the cursor (replicated for all projects as requested).

5. **Archives Section**
   - A draggable image gallery of all the rectangular images.
   - Include the zoom controls (Fit, Normal, Zoom In, Zoom Out) that scale the entire draggable container.

6. **Travel Section**
   - Polaroids reveal one by one on scroll.
   - The polaroids stack on top of each other in a slightly tilted orientation, with a slight downward shift so all previous polaroids remain visible.
   - Uses GSAP ScrollTrigger pinning and stacking.

7. **Songs Section**
   - Interactive music player.
   - User can play their favorite songs (using placeholder audio files for now since actual files are not provided).
   - "View Playlist" text links to Spotify.
   - Clicking play/pause or album cover toggles audio.
   - When playing: Vinyl disc rotates continuously, time updates, and waveform animates.

8. **Art Section**
   - Fixed background image.
   - Custom cursor trail using the provided image assets.
   - Paintings (the year-labeled frames) scatter in a predetermined path upon entering the viewport and stack back up when exiting (via GSAP ScrollTrigger).

9. **Footer / Contact**
   - "Let's build together" and contact information.

## Implementation Plan

- [ ] **Task 1: Setup & Configuration**
  - Install dependencies: `gsap`, `@studio-freight/lenis`, `motion`, `lucide-react`.
  - Set up Lenis inside the root `App` component.

- [ ] **Task 2: Hero & About Sections**
  - Build the Hero text and images.
  - Implement the `framer-motion` draggable tags in the About section.

- [ ] **Task 3: Projects Section**
  - Build the list layout.
  - Implement mouse-following hover preview logic.

- [ ] **Task 4: Archives Section**
  - Build the grid of images.
  - Implement `framer-motion` dragging for the grid.
  - Implement Zoom scale state.

- [ ] **Task 5: Travel Section**
  - Extract the Polaroid components.
  - Implement GSAP ScrollTrigger to pin the section and animate the cards stacking.

- [ ] **Task 6: Songs Section**
  - Build the UI.
  - Add state for `isPlaying`, `progress`.
  - Add CSS animations for the vinyl rotation and waveform.

- [ ] **Task 7: Art Section**
  - Extract the paintings.
  - Build the cursor trail effect on mouse move.
  - Implement GSAP scatter animation on scroll.

- [ ] **Task 8: Final Polish**
  - Stitch all sections in the main `App.tsx`.
  - Ensure responsive fallbacks where appropriate.
  - Add the Footer.

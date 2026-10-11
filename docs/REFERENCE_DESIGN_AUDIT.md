# Reference Design Audit & Behavior Mapping

**Reference Source:** [hariprasanna939-hue/https-github.com-anushree-gs-portfolio.-git-main.git](https://github.com/hariprasanna939-hue/https-github.com-anushree-gs-portfolio.-git-main.git)  
**Target Brand:** Prasanna Hari Portfolio Redesign  
**Goal:** Extract engineering excellence & interaction quality while completely transforming the visual aesthetic from heavy dark mode into an Apple-inspired editorial light mode.

---

## 1. Reference Architecture Breakdown

The reference website is a dark-aesthetic creative developer portfolio featuring high-drama motion, pinned scroll scrubbing, canvas sequence playback, and physics-driven micro-interactions.

### 1.1 Core Mechanical Strengths
1. **Integrated Scroll Infrastructure:**
   - Lenis handles virtual scroll normalization across mouse wheels, trackpads, and touch screens.
   - GSAP `ScrollTrigger.scrollerProxy` binds Lenis's RAF loop to GSAP triggers, ensuring pinned elements do not stutter or desynchronize.
2. **Layered Motion Hierarchy:**
   - Text elements use `overflow: hidden` parent containers with inner `translateY` reveals (`MaskText.tsx`).
   - Cards leverage multi-plane 3D tilt (`Tilt3D.tsx`) based on mouse coordinates relative to card bounding boxes.
   - The "Beyond" section implements a custom swipe/drag 3D z-depth stack (`Stack3D.tsx`) with dynamic z-index, perspective transform, and tilt offset.
3. **Information Depth:**
   - Projects are presented twice: first as expansive visual showcases with full metadata, then as analytical STAR-methodology case studies (Situation, Task, Action, Result).
   - Structured sections provide proof of competence (Skills, Tools, Certifications, Journey timeline).

### 1.2 Core Visual Deficiencies of the Reference Design
1. **Overly Aggressive Dark Aesthetics:**
   - The palette relies on deep black (`#0B0B0B`) and dark gray cards (`#161616`), illuminated by high-saturation neon orange (`#FF7448`) and cyan (`#75D3C2`).
   - This creates an intense "gaming / cyber / high-contrast neon" impression rather than a mature, executive software architect identity.
2. **Visual Clutter & Glow Saturation:**
   - Heavy radial gradients (`radial-gradient(circle at top right, rgb(255 116 72 / 0.18)...)`) and animated sheen lines sweep across cards constantly.
   - In a professional context, this reduces text legibility and distracts from core architectural achievements.
3. **Inversion Inconsistency:**
   - The reference abruptly switches to an ivory background only for the `#contact` section, while the rest of the site is pitch black. This abrupt flip breaks visual continuity.
4. **Repetitive Heading Formulas:**
   - Every single section uses the exact same `clamp(2.6rem, 8vw, 7rem)` display typography, creating a monotonic rhythm where no individual section feels distinct or hierarchical.

---

## 2. Section-by-Section Audit & Redesign Strategy

| Section | Reference Implementation | Behaviors to Preserve | Elements to Redesign for Light Mode |
| :--- | :--- | :--- | :--- |
| **Loader** | Dark screen with uppercase name, neon progress line, and 0–100% counter with 2s minimum duration. | Percentage increment logic, smooth fade-out exit transition (`AnimatePresence`). | Switch to crisp ivory backdrop (`#FAF9F5`), refined charcoal monogram, subtle hairline progress bar in royal cobalt. |
| **Navbar** | Fixed dark header with translucent background on scroll; mobile drawer overlay. | Scroll detection (`scrollY > 40`), active navigation intersection observer, keyboard escape handler, smooth anchor jumping. | Frosted white glass backdrop (`rgba(255,255,255,0.85)` with `backdrop-filter: blur(16px)`), slate typography, crisp border, polished pill CTA button. |
| **Hero** | Pinned canvas frame sequence / centered portrait with heavy circular decorative rings and dark drop shadows. | Smooth scroll cue fade-out, responsive layout adapts cleanly to mobile. | Asymmetric editorial layout with left-aligned bold headline, subtle floating architect badge, refined profile portal, and clear action buttons. |
| **About** | Split layout with brand pillars and narrative text. | High-readability paragraph flow, brand pillar tags. | Editorial typography scale, warm off-white surface card for core mission quote, subtle graphite metrics, crisp icons. |
| **Marquee** | Infinite scrolling text ticker with neon outline. | Seamless 60s infinite CSS loop, paused on reduced motion. | Refined small-caps technical ribbon with subtle muted slate text and light gray separation dots. |
| **Passion** | Numbered list (01, 02, 03) with hover slide, design thinking summary, and italic serif quote. | Hover interaction, sequential numbering, thought leadership storytelling. | Replace neon orange numbers with refined cobalt accents; use modern serif display quote against ivory paper texture. |
| **Beyond (3D Stack)** | Dual 3D perspective card stacks (Drawings & Sports) with mouse tilt and card drag cycling. | Complete 3D physics engine (`transform-style: preserve-3d`), drag velocity tracking, touch swipe support. | Replace dark glowing card frames with clean white art boards featuring subtle diffuse dropshadows and crisp borders. |
| **Skills** | Horizontal category rows with large typography that dims non-hovered items. | Focus dimming effect (`hover: opacity: 0.25`), comprehensive technical categorization. | Clean light-mode contrast, refined typography weight, subtle tag indicators to avoid eye fatigue. |
| **Projects** | Alternating 7-column visual / 5-column metadata cards with GitHub link and fallback wireframes. | Alternating visual balance, metadata definition list (Type, Team, Duration, Stack), 3D image tilt. | Replace generic project titles with real flagship work (**SaaISS AI**, **Belt Forge**), crisp light card containers, clear status badges. |
| **Case Studies** | Tabbed STAR breakdown (Situation, Task, Action, Result) with animated tab transitions. | Tab switching with `framer-motion AnimatePresence`, structured analytical storytelling. | Apple-style segmented control pills, clean white content card with subtle neutral divider lines, legible deep charcoal text. |
| **Journey** | Vertical timeline with dashed line and milestone text. | Sequential narrative progression from early code to product architecture. | Solid neutral line with cobalt milestone rings, varied typographic weights to emphasize key learnings. |
| **Tools** | 8-cell grid of tech tools with hovering float animation and animated sheen light. | Grid density, technology breakdown. | Eliminate distracting constant diagonal sheen; replace with Apple-style smooth hover lift, soft border transition, and crisp logo badges. |
| **Achievements** | Sticky left column with large count number; right column with certification cards and digital badge links. | Sticky section title, verifiable external links (`ArrowUpRight`). | Crisp white certification tiles with soft neutral borders; genuine brand logos with proper contrast. |
| **Contact** | Inverted light card with minimalist underline inputs and validation. | Full input validation (name, email, phone, message), submit state feedback, social button grid. | Integrate seamlessly into the global light aesthetic; use modern floating label or crisp rounded input surfaces with cobalt focus rings. |
| **Footer** | Dark bottom bar with name, slogan, social icons, and copyright. | Verified links, clean responsive column wrap. | Minimal light footer with subtle border, muted metadata, and accessible social links. |

---

## 3. Interaction & Motion Translation Rules

1. **Glow & Shadow Replacement:**
   - *Reference:* `box-shadow: 0 0 25px rgba(255, 116, 72, 0.4)` (colored neon blooms).
   - *Light Redesign:* Multi-stop diffuse shadows:
     ```css
     box-shadow: 0 1px 2px rgba(15, 23, 42, 0.04), 0 8px 24px -4px rgba(15, 23, 42, 0.08);
     ```
2. **Border Treatment:**
   - *Reference:* `border: 1px solid rgba(255, 255, 255, 0.1)`.
   - *Light Redesign:* Crisp subtle hairline borders:
     ```css
     border: 1px solid rgba(15, 23, 42, 0.08);
     ```
3. **Hover Elevation:**
   - On light backgrounds, cards elevate with a `translateY(-4px)` shift and an expanding soft shadow, mimicking physical tactile paper and frosted glass surfaces.

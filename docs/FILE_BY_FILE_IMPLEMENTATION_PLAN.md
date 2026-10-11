# File-by-File Implementation Plan — Phase 2 Execution

**Rule:** This plan is executed strictly during **Phase 2**, following the user's explicit written approval of the Phase 1 audit and design specification.

---

## 1. Global Setup & Design System Foundation

### File 1: `index.html`
- **Purpose:** Update SEO metadata, favicon link, and modern typography imports.
- **Changes:**
  - Remove redundant `DM Sans` stylesheet.
  - Import `Inter` (Variable weights 400..800) and `Instrument Serif` (400 Italic).
  - Update page title: `Prasanna Hari — Product Architect & Full-Stack Systems Engineer`.
  - Add descriptive light-theme meta tags (`theme-color: #FAF9F5`).

### File 2: `tailwind.config.js`
- **Purpose:** Configure light-mode semantic color variables and typography.
- **Changes:**
  - Map `colors.bg`, `colors.surface`, `colors.fg`, `colors.muted`, `colors.accent`, `colors.line` to new RGB light tokens.
  - Add `colors.accentElectric: '#2563EB'`, `colors.mint: '#059669'`, `colors.lavender: '#6366F1'`.
  - Set `fontFamily.sans` to `'Inter', system-ui, -apple-system, sans-serif`.
  - Add bespoke shadow tokens: `shadow-card`, `shadow-card-hover`.

### File 3: `src/index.css`
- **Purpose:** Establish `:root` tokens, base styles, light scrollbar, and utility classes.
- **Changes:**
  - Redefine `:root` design tokens:
    ```css
    :root {
      --bg: 250 249 245;          /* #FAF9F5 Ivory */
      --surface: 255 255 255;      /* #FFFFFF Pure White */
      --surface-muted: 241 243 245;/* #F1F3F5 Neutral Off-White */
      --fg: 15 23 42;              /* #0F172A Deep Charcoal */
      --muted: 71 85 105;          /* #475569 Slate Gray */
      --accent: 29 78 216;         /* #1D4ED8 Royal Cobalt */
      --accent-cool: 5 150 105;    /* #059669 Mint */
      --line: 15 23 42 / 0.08;     /* Hairline Border */
    }
    ```
  - Overhaul body styling: remove dark radial gradient; implement subtle light grid (`rgba(15, 23, 42, 0.03)`).
  - Light-mode pill scrollbar: track `#FAF9F5`, thumb `#CBD5E1`.
  - Remove all dark-mode `!important` color overrides on `#contact` so the entire site adheres to a unified light architecture.

---

## 2. Content Single Source of Truth

### File 4: `src/data/site.ts`
- **Purpose:** Authoritative profile, projects, skills, and metadata.
- **Changes:**
  - Update `profile.role` to `"Product Architect & Full-Stack Systems Engineer"`.
  - Update `profile.niche` to `"AI Systems & Enterprise Web Architecture"`.
  - Replace generic projects with:
    1. **SaaISS AI** — AI Financial Accounting Platform.
    2. **Belt Forge** — Intelligent Conveyor Monitoring System.
    3. **DPDP AI Compliance Mapper** — Enterprise Regulatory Tech.
  - Update `projects[].case` with comprehensive STAR narratives for all three projects.
  - Verify and align all social links (LinkedIn, GitHub, Email, Instagram).

---

## 3. Core Layout & Navigation

### File 5: `src/App.tsx`
- **Purpose:** Main layout tree, Lenis smooth scrolling, and preloader transition.
- **Changes:**
  - Wrap application in light-theme container (`bg-bg text-fg min-h-screen`).
  - Maintain Lenis smooth scrolling initialization.
  - Ensure skip link has high contrast (`bg-accent text-white`).

### File 6: `src/components/Loader.tsx`
- **Purpose:** Elegant preloading entrance.
- **Changes:**
  - Transition loader from dark canvas to warm ivory (`#FAF9F5`).
  - Render crisp monogram `[PH]` in deep charcoal with cobalt indicator.
  - Display role and 0–100% counter with smooth exit animation.

### File 7: `src/components/Navbar.tsx`
- **Purpose:** Apple-style frosted glass navigation bar.
- **Changes:**
  - Sticky header with `bg-white/80 backdrop-blur-md border-b border-line`.
  - Left: `[PH]` monogram badge and `"Prasanna Hari"` in 600-weight typography.
  - Center: Nav links (`About`, `Skills`, `Work`, `Journey`, `Achievements`, `Contact`) with subtle hover underline and active indicator.
  - Right: Prominent rounded pill CTA button `"Hire Me"` with smooth scroll to `#contact`.
  - Full-screen mobile drawer styled in clean light mode.

---

## 4. Section-by-Section Component Redesigns

### File 8: `src/components/Hero.tsx`
- **Purpose:** Signature hero portal with asymmetric editorial layout.
- **Changes:**
  - Left column: High-fidelity portrait portal of Prasanna Hari, framed in an Apple-style white card with diffuse shadow and subtle gyroscope 3D tilt.
  - Right column: Cobalt category eyebrow, multi-line display headline:
    `"Engineering systems. Elevating human experience."`
  - Body paragraph highlighting AI workflows & high-performance frontend engineering.
  - Primary button: `"Download Resume"` (solid charcoal with download icon).
  - Secondary button: `"View Projects"` (clean border).
  - Verified LinkedIn connection pill.
  - Clickable `"Scroll to explore"` bottom cue.

### File 9: `src/components/About.tsx`
- **Purpose:** Split biographical narrative & credentials overview.
- **Changes:**
  - Left 5 cols: Brand pillars (`Architect`, `Builder`, `Innovator`) rendered as modern rounded tags; quick facts table (Focus, Location, Target Trajectory).
  - Right 7 cols: Narrative paragraphs detailing transition from backend code to holistic product architecture.
  - Feature callout card: Core mission quote in clean white container.

### File 10: `src/components/Marquee.tsx`
- **Purpose:** Technical competencies ribbon.
- **Changes:**
  - Clean light ribbon with subtle border and muted slate text.
  - Small-caps keywords separated by cobalt bullet points.

### File 11: `src/components/Passion.tsx`
- **Purpose:** Top 3 core passions & philosophy.
- **Changes:**
  - Numbered list (01 System Architecture, 02 Generative AI & LLMs, 03 Cinematic Interaction Design) with hover slide-in.
  - Modern serif blockquote for core design quote.

### File 12: `src/components/Beyond.tsx` & `src/components/Stack3D.tsx`
- **Purpose:** Interactive 3D z-depth card stacks (Drawings & Sports).
- **Changes:**
  - Update card backgrounds from black glass to clean white artboards (`bg-white shadow-xl border border-line`).
  - Retain full drag physics and cursor tilt.

### File 13: `src/components/Skills.tsx`
- **Purpose:** Categorized competency breakdown.
- **Changes:**
  - Grouped rows: `Development`, `AI / ML`, `Systems & Architecture`, `Cloud & DevOps`.
  - High-contrast typography with focus-dimming hover interaction.

### File 14: `src/components/Projects.tsx`
- **Purpose:** Featured project showcase.
- **Changes:**
  - Render SaaISS AI, Belt Forge, and DPDP AI in alternating 7/5 column layouts.
  - High-resolution visual container with hover zoom and diffuse drop shadow.
  - Crisp metadata definition lists and direct GitHub buttons.

### File 15: `src/components/CaseStudies.tsx`
- **Purpose:** Segmented STAR analytical problem-solving breakdown.
- **Changes:**
  - Segmented control pills in warm off-white surface.
  - 2-column active panel: Left STAR breakdown (Situation, Task, Action, Result); Right impact card (Affected, User Flow, UI Emotion).

### File 16: `src/components/Journey.tsx`
- **Purpose:** Chronological development timeline.
- **Changes:**
  - Solid neutral timeline track with cobalt milestone nodes.
  - Clean typography highlighting milestone insights.

### File 17: `src/components/Tools.tsx`
- **Purpose:** 8-cell technical toolkit grid.
- **Changes:**
  - Minimal grid with hairline borders.
  - Tool cards with hover lift and cobalt active border.

### File 18: `src/components/Achievements.tsx`
- **Purpose:** Certifications and verified digital badges.
- **Changes:**
  - Sticky left count column.
  - Dual-column white certification cards and verified badge links.

### File 19: `src/components/Contact.tsx`
- **Purpose:** Inbound inquiry portal.
- **Changes:**
  - Left column: Direct email, location, LinkedIn & GitHub cards.
  - Right column: Clean white form container with rounded inputs, cobalt focus rings, real-time client validation, and submit status feedback.

### File 20: `src/components/Footer.tsx`
- **Purpose:** Minimal colophon.
- **Changes:**
  - 3-column clean layout: `Prasanna Hari` wordmark, colophon statement, social links, and 2026 copyright.

---

## 5. Supporting UI & Animation Primitives

- `SectionLabel.tsx`: Cobalt uppercase eyebrow with accent line.
- `MaskText.tsx`: Refined clip-path reveal using CSS variables.
- `Reveal.tsx`: Standardized Framer Motion fade-up wrapper.
- `Tilt3D.tsx`: Interactive card tilt preserving light shadow aesthetics.
- `Cursor.tsx`: Subtle graphite magnetic ring cursor.
- `ScrollProgress.tsx`: 2px royal cobalt progress line at the top of the viewport.

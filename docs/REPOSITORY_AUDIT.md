# Repository Audit — Prasanna Hari Portfolio

**Audit Date:** October 2026  
**Auditor:** Antigravity Creative Engineering Team  
**Workspace:** `/Users/prasannahari/Downloads/prasanna-portfolio-main-main 1/prasanna-portfolio-main`  
**Current Live URL:** [prasanna-portfolio-main.vercel.app](https://prasanna-portfolio-main.vercel.app/)  
**Reference Repo:** [hariprasanna939-hue/https-github.com-anushree-gs-portfolio.-git-main.git](https://github.com/hariprasanna939-hue/https-github.com-anushree-gs-portfolio.-git-main.git)

---

## 1. Executive Summary

The existing repository is a single-page interactive personal portfolio built with React 18, TypeScript (strict), Vite 5, Tailwind CSS 3.4, GSAP 3 (ScrollTrigger), Lenis smooth scrolling, Framer Motion 11, and Lucide React icons. 

The previous codebase suffered from a split personality:
1. It originated as a dark-theme clone of a reference repository (`--bg: #0B0B0B`, neon orange `--accent: #FF7448`, dark overlays).
2. Recent modifications attempted an ad-hoc light mode for `Hero.tsx` and custom background banners without overhauling the underlying design system or typography tokens.
3. An incidental empty file state in `src/components/About.tsx` recently triggered a compiler failure (`TS2306: File is not a module`), creating a blank white screen during live rendering. This has been remediated.

To achieve a true **Apple-inspired, editorial light-mode portfolio**, the codebase requires an architectural design-system overhaul rather than superficial color overrides.

---

## 2. Architecture & File Tree Audit

```
prasanna-portfolio-main/
├── .env.example                # Form endpoints & environment config
├── index.html                  # HTML entry point, SEO meta, Google Fonts
├── package.json                # Dependencies & build scripts
├── postcss.config.js           # PostCSS Tailwind + Autoprefixer
├── tailwind.config.js          # Tailwind theme tokens & font families
├── tsconfig.json               # TypeScript strict configuration
├── vite.config.ts              # Vite 5 React plugin configuration
├── public/
│   ├── favicon.svg             # Brand monogram SVG
│   ├── hero-banner.jpg         # User-provided custom banner
│   ├── hero-banner.webp        # Optimized WebP banner
│   ├── IMG_5169.JPG            # Prasanna Hari original photo
│   ├── images/
│   │   ├── hero-art.webp       # 90-degree rotated horizontal fantasy cityscape
│   │   ├── portrait.webp       # Scaled portrait photo
│   │   ├── drawings/           # 6 media items (drawing-1 to 6)
│   │   └── sports/             # 6 media items (sport-1 to 6)
│   └── projects/               # Placeholder project mockups (dashboard, recipe, shop)
└── src/
    ├── main.tsx                # React DOM root render
    ├── App.tsx                 # Root layout, Lenis controller, asset preloader, section order
    ├── index.css               # Design tokens (:root), Tailwind layers, keyframe animations
    ├── vite-env.d.ts           # Vite client type definitions
    ├── config/
    │   └── hero.ts             # Hero scroll screens, sequence frame count, portrait source
    ├── data/
    │   └── site.ts             # Single source of truth (profile, projects, skills, journey, etc.)
    ├── lib/
    │   ├── gsap.ts             # GSAP core + ScrollTrigger registration
    │   ├── heroAssets.ts       # Frame sequence preloader & fallback handler
    │   ├── lenis.ts            # Lenis smooth-scroll instance controller & anchor helper
    │   └── motion.ts           # Cubic bezier easing curves & media query checks
    └── components/
        ├── Loader.tsx          # Initial entry percentage counter & brand reveal
        ├── Cursor.tsx          # Custom magnetic ring cursor
        ├── ScrollProgress.tsx  # Top 2px scroll progress bar
        ├── Navbar.tsx          # Fixed header with mobile drawer & active nav spy
        ├── Hero.tsx            # Cinematic hero portal with canvas/static mode & scroll cue
        ├── About.tsx           # Split narrative layout, brand pillars, core mission
        ├── Marquee.tsx         # Endless CSS-animated text tape
        ├── Passion.tsx         # Top 3 passions numbered list, design philosophy & quote
        ├── Beyond.tsx          # Wrapper for dual 3D card stacks
        ├── Stack3D.tsx         # Interactive drag/swipe 3D card stack (Drawings & Sports)
        ├── Skills.tsx          # Categorized engineering competencies
        ├── Projects.tsx        # Featured project articles (7/5 alternating columns)
        ├── CaseStudies.tsx     # Tabbed STAR format problem-solving breakdown
        ├── Journey.tsx         # Vertical developmental narrative timeline
        ├── Tools.tsx           # 8-cell toolkit grid with hover lifts
        ├── Achievements.tsx    # Certifications count grid + digital badge links
        ├── Contact.tsx         # Full-featured form with validation & social cards
        ├── Footer.tsx          # Minimal wordmark, tagline, copyright & social links
        ├── SectionLabel.tsx    # Consistent section category eyebrow with accent line
        ├── MaskText.tsx        # Scroll-triggered line-masked headline typography
        ├── Reveal.tsx          # Standardized Framer Motion fade-up wrapper
        ├── Tilt3D.tsx          # Interactive 3D gyroscope card tilt on mouse move
        ├── Wireframes.tsx      # SVG wireframe fallback graphics for projects
        └── Icons.tsx           # SVG brand icons (LinkedIn, GitHub, X, Instagram, etc.)
```

---

## 3. Dependency Inventory & Suitability

| Package | Version | Purpose | Evaluation for Light Mode |
| :--- | :--- | :--- | :--- |
| `react` / `react-dom` | `^18.3.1` | Core Framework | Retain. Stable, zero issues. |
| `framer-motion` | `^11.18.2` | Component & Layout Motion | Retain. Best-in-class for physics, spring animations, and tab transitions. |
| `gsap` | `^3.12.7` | ScrollTrigger & Pinning | Retain. Crucial for high-performance canvas scrubbing and pinned sections. |
| `lenis` | `^1.1.20` | Momentum Smooth Scroll | Retain. Synchronized with GSAP ScrollTrigger for buttery 60fps scrolling. |
| `lucide-react` | `^0.469.0` | UI Icons | Retain. Clean line weights, easily customized with light-theme stroke colors. |
| `tailwindcss` | `^3.4.17` | Utility Styling | Retain. Needs CSS token restructuring for light-mode defaults. |
| `sharp` | `^0.35.5` | Asset optimization (Dev) | Retain. Used in background scripts for WebP conversion and image transforms. |
| `typescript` | `~5.6.3` | Type Safety | Retain. Strict type checking passing cleanly. |
| `vite` | `^5.4.11` | Build Tool & Bundler | Retain. Builds production bundle in ~1.2s. |

---

## 4. Current State vs. Light-Mode Target Analysis

### 4.1 Global Styles & CSS Tokens (`src/index.css`)
- **Current State:**
  - `:root` declares dark variables: `--bg: 11 11 11` (`#0B0B0B`), `--surface: 22 22 22`, `--fg: 246 241 232` (ivory white), `--accent: 255 116 72` (orange).
  - `#contact` is hardcoded as an inverted light card (`#F6F1E8`), while all other sections are dark.
- **Defects:**
  - Applying light mode currently requires `!important` hacks.
  - Borders use `rgb(var(--line) / 0.1)`, which is near-invisible on light surfaces.
  - Body background has a dark-mode subtle grid pattern that does not look clean in light mode.
- **Required Redesign:**
  - Redefine `:root` tokens for warm ivory background (`#FAF9F5`), clean card surfaces (`#FFFFFF`), charcoal text (`#111827`), muted slate (`#64748B`), and sophisticated royal cobalt blue accent (`#1D4ED8`).

### 4.2 Typography & Fonts (`index.html`, `tailwind.config.js`)
- **Current State:**
  - Google Fonts currently imports `DM Sans` (400, 500, 600, 700) and `Instrument Serif` (400 italic).
  - Tailwind sets `fontFamily.sans` to `DM Sans`.
- **Defects:**
  - `DM Sans` has wide geometric proportions that lean casual/playful rather than Apple-style technical elegance.
  - Section titles use the same clamp formula repeatedly (`clamp(2.6rem, 8vw, 7rem)`), creating visual fatigue.
- **Required Redesign:**
  - Switch primary sans to **Inter** or **Geist Sans** (with tabular figure font features).
  - Establish distinct typographic scales for hero headlines, section titles, editorial subheaders, body copy, and metadata tags.

### 4.3 Content Architecture (`src/data/site.ts`)
- **Current State:**
  - Projects are hardcoded to "Shree Andal AI", "DPDP AI Compliance Mapper", and "SmartHealth Ecosystem".
  - Prasanna Hari's flagship work—**SaaISS AI** (AI Financial Accounting Software) and **Belt Forge** (Intelligent Conveyor Monitoring)—is not yet represented in `site.ts`.
- **Required Redesign:**
  - Integrate verified flagship projects (SaaISS AI and Belt Forge) into `projects` and `caseStudies`.
  - Update `profile.role`, `profile.niche`, and `profile.mission` to reflect Prasanna's authentic expertise in AI Systems, Financial Engineering, and Industrial IoT.

---

## 5. Summary of Actions for Phase 2

1. **Retain & Preserve:**
   - Smooth-scrolling stack (Lenis + GSAP ScrollTrigger).
   - Component architecture and lazy preloading pipeline.
   - 3D interactive stack interaction (`Stack3D.tsx`, `Tilt3D.tsx`).
   - Accessible keyboard skip link, screen-reader markup (`sr-only`), and semantic HTML.
   - Comprehensive contact form client validation.

2. **Refactor & Redesign:**
   - Replace `:root` color tokens with warm light-mode variables.
   - Update typography to Inter/Geist with intentional size/weight hierarchies.
   - Revamp all 14 visual sections from dark backgrounds to crisp, layered off-white and ivory surfaces.
   - Implement cobalt blue (`#1D4ED8`) and supporting mint/lavender accents.
   - Replace generic project content with verified SaaISS AI and Belt Forge case studies.

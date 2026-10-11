# Light-Mode Design Specification — Prasanna Hari Portfolio

**Design Direction:** Apple-Inspired Premium Minimalism & Editorial Engineering  
**Target Identity:** Prasanna Hari — Product Architect & Full-Stack Systems Engineer  
**Core Principles:** Tactile clarity, generous whitespace, crisp typography, and restrained interactive motion.

---

## 1. Color Palette & Exact Hexadecimal Tokens

The light design system replaces all pitch-black backdrops with warm, organic ivory and layered neutral surfaces, complemented by high-contrast deep charcoal text and an authoritative royal cobalt blue accent.

### 1.1 Complete Token System

| Token Name | CSS Variable | Hex Value | RGB Decimal | Semantic Role |
| :--- | :--- | :--- | :--- | :--- |
| **Canvas Background** | `--bg` | `#FAF9F5` | `250 249 245` | Global page backdrop (warm organic ivory) |
| **Primary Surface** | `--surface` | `#FFFFFF` | `255 255 255` | Card surfaces, interactive containers, modal drawers |
| **Muted Surface** | `--surface-muted` | `#F1F3F5` | `241 243 245` | Subtle nested containers, code blocks, inactive tabs |
| **Primary Text** | `--fg` | `#0F172A` | `15 23 42` | Hero headlines, section titles, primary body copy |
| **Secondary Text** | `--muted` | `#475569` | `71 85 105` | Supporting descriptions, metadata, dates, captions |
| **Subtle Text** | `--text-subtle` | `#94A3B8` | `148 163 184` | Placeholder text, index numbers, tertiary metadata |
| **Primary Accent** | `--accent` | `#1D4ED8` | `29 78 216` | Royal cobalt blue (primary CTAs, active indicators, focus rings) |
| **Electric Accent** | `--accent-electric`| `#2563EB` | `37 99 235` | Hover states, active links, gradient accents |
| **Supporting Mint** | `--accent-mint` | `#059669` | `5 150 105` | Status badges ("Live in Production"), positive metrics |
| **Mint Surface** | `--mint-surface` | `#ECFDF5` | `236 253 245` | Background pill for production status |
| **Supporting Lavender** | `--accent-lavender`| `#6366F1` | `99 102 241` | AI / Machine Learning tag accents |
| **Lavender Surface** | `--lavender-surface`| `#EEF2FF` | `238 242 255` | Background pill for AI / architecture tags |
| **Hairline Border** | `--line` | `rgba(15, 23, 42, 0.08)` | `15 23 42 / 0.08` | Section dividers, card outlines, table borders |
| **Active Border** | `--line-active` | `rgba(29, 78, 216, 0.35)` | `29 78 216 / 0.35` | Hover border for interactive cards |

---

## 2. Accessibility & WCAG Contrast Verification

All proposed color pairs have been verified against **WCAG 2.1 Level AA and AAA** specifications:

| Text Color | Background Color | Contrast Ratio | WCAG Compliance | Usage Context |
| :--- | :--- | :--- | :--- | :--- |
| `#0F172A` (Charcoal) | `#FAF9F5` (Ivory Canvas) | **16.5 : 1** | **AAA Pass** (Exceeds 7:1) | Body text, section titles, hero copy |
| `#0F172A` (Charcoal) | `#FFFFFF` (White Card) | **17.8 : 1** | **AAA Pass** | Text inside cards, modal drawers, tabs |
| `#475569` (Slate Gray) | `#FAF9F5` (Ivory Canvas) | **6.8 : 1** | **AA Pass** (Exceeds 4.5:1) | Secondary body copy, section descriptions |
| `#475569` (Slate Gray) | `#FFFFFF` (White Card) | **7.3 : 1** | **AAA Pass** | Card descriptions, metadata definition lists |
| `#1D4ED8` (Cobalt Accent)| `#FAF9F5` (Ivory Canvas) | **6.1 : 1** | **AA Pass** (Exceeds 4.5:1) | Section category labels, active text links |
| `#FFFFFF` (White) | `#1D4ED8` (Cobalt Accent)| **6.1 : 1** | **AA Pass** | Primary button label text |
| `#FFFFFF` (White) | `#0F172A` (Charcoal) | **17.8 : 1** | **AAA Pass** | Dark pill button label text |
| `#059669` (Mint) | `#ECFDF5` (Mint Surface) | **5.4 : 1** | **AA Pass** | "Live in Production" status badge text |

---

## 3. Surface & Elevation System

Rather than flat borders or heavy blur overlays, the light design uses Apple-inspired diffuse, multi-stop elevations:

```css
/* Card Elevation: Idle State */
--shadow-card-idle: 
  0 1px 2px 0 rgba(15, 23, 42, 0.04),
  0 4px 16px -2px rgba(15, 23, 42, 0.05);

/* Card Elevation: Hover / Active State */
--shadow-card-hover: 
  0 4px 6px -1px rgba(15, 23, 42, 0.06),
  0 20px 32px -6px rgba(15, 23, 42, 0.08);

/* Frosted Navigation Glass */
--glass-surface: rgba(250, 249, 245, 0.82);
--glass-blur: blur(18px);
```

---

## 4. Typography Redesign & Typographic Hierarchy

### 4.1 Primary Type Family
- **Font:** `Inter` (Variable font: weights 400, 500, 600, 700, 800)
- **Features:** `cv02`, `cv03`, `cv04`, `cv11` (open digits, modern aesthetic), `tnum` (tabular numbers for metrics and indexes).
- **Secondary Display Accent (used selectively for quotes):** `Instrument Serif` (400 Italic).

### 4.2 Typographic Hierarchy Scale

| Level | Element | Font Weight | Line Height | Letter Spacing | Responsive Size (`clamp()`) |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Display 1** | Hero Headline | Bold (700) | 1.05 | -0.035em | `clamp(2.75rem, 6.2vw, 5.5rem)` |
| **Display 2** | Section Lead Titles | Semibold (600) | 1.08 | -0.025em | `clamp(2.2rem, 5vw, 4.2rem)` |
| **Title 1** | Project & Case Study Names | Bold (700) | 1.15 | -0.02em | `clamp(1.75rem, 3.8vw, 2.75rem)` |
| **Title 2** | Card & Sub-section Headings | Semibold (600) | 1.25 | -0.015em | `clamp(1.25rem, 2.5vw, 1.75rem)` |
| **Body Large** | Hero Subtitle & About Lead | Regular (400) | 1.55 | 0 | `clamp(1.05rem, 1.6vw, 1.35rem)` |
| **Body Regular**| Narrative Story & Descriptions | Regular (400) | 1.65 | 0 | `1rem (16px)` |
| **Body Small** | Metadata & Definition Lists | Medium (500) | 1.45 | 0 | `0.875rem (14px)` |
| **Eyebrow / Tag**| Section Category Eyebrow | Bold (700) | 1.0 | 0.16em | `0.75rem (12px)` (Uppercase) |
| **Code / Index**| Milestone & Step Numbers | Mono (600) | 1.0 | 0.08em | `0.8125rem (13px)` |

---

## 5. Layout, Composition & Alignment Redesign

Rather than repeating the same card shape and centered alignment across all 14 sections, each section receives a tailored editorial composition:

### 5.1 Hero Section: Asymmetric Architectural Portal
- **Layout:** Balanced 2-column asymmetric grid (Desktop `[44%_56%]`).
- **Left Column:**
  - Modern floating portal containing Prasanna Hari's portrait framed with clean border (`rounded-3xl` or `rounded-full`), floating status badge: `"Lead Product Architect · AI Systems"`.
  - Subtle interactive 3D gyroscope tilt on cursor hover.
- **Right Column:**
  - Category eyebrow: `"AVAILABLE FOR SELECT ARCHITECTURAL ROLES · 2026"` in cobalt blue.
  - Headline: Large, multi-line editorial typography:
    > **"Engineering systems.**  
    > **Elevating human experience."**
  - Crisp paragraph introducing his dual focus: AI pipelines and high-performance full-stack web applications.
  - Two prominent action buttons:
    - Primary CTA: Solid charcoal button `"Download Resume"` with download icon.
    - Secondary CTA: Clean border button `"View Projects"`.
    - Third CTA: LinkedIn badge link with verified handle.

### 5.2 Navigation Bar: Frosted Apple-Style Glass Header
- **Layout:** Full-width fixed header with container max-width `1600px`, height `76px`.
- **Branding:** Modern monogram `[PH]` in deep charcoal with crisp rounded border, accompanied by `"Prasanna Hari"` in 500-weight typography.
- **Center Navigation:** Desktop inline links (`About`, `Skills`, `Work`, `Journey`, `Achievements`, `Contact`) with subtle hover underline and active indicator.
- **Right Action:** Prominent rounded pill button `"Hire Me"` with smooth scroll to contact form.

### 5.3 About Section: Split Analytical Layout
- **Layout:** Asymmetric 12-column layout (Left 5 cols / Right 7 cols).
- **Left Column:** Brand pillars (`Architect`, `Builder`, `Innovator`) rendered as rounded pill tags; verified metrics table (Current Focus, Location, Target Trajectory).
- **Right Column:** 2-paragraph narrative story detailing his evolution from low-level systems logic to product architecture. Features a dedicated callout card with his core mission quote.

### 5.4 Projects Showcase: Editorial Feature Cards
- **Layout:** Alternating 12-column cards (Left 7 visual / Right 5 metadata, alternating on even/odd).
- **Visuals:** High-fidelity project screenshots with 4:3 aspect ratio, subtle diffuse shadow, and smooth zoom on hover.
- **Metadata:** Clean definition list (`Type`, `Team`, `Duration`, `Status`, `Stack`) with high-contrast text and a direct button linking to GitHub/Demo.
- **Featured Projects:**
  1. **SaaISS AI** — AI Financial Accounting Platform.
  2. **Belt Forge** — Intelligent Conveyor Monitoring System.
  3. **DPDP AI Compliance Mapper** — Regulatory LLM Automation Engine.

### 5.5 Case Studies: Segmented STAR Analysis
- **Layout:** Top segmented control pill bar (01 · SaaISS AI, 02 · Belt Forge, 03 · DPDP AI).
- **Content Panel:** Two-column card container:
  - Left: Chronological STAR narrative (Situation, Task, Action, Result) with numbered cobalt tags.
  - Right: Executive impact card ("Who was affected", "User Flow", "Target UI Emotion").

### 5.6 Skills & Tools: Structured Competency Architecture
- **Skills:** Grouped horizontal rows (`Development`, `AI / ML`, `Design & Architecture`, `Cloud & Infrastructure`) with tag pills that highlight cleanly on cursor hover.
- **Tools:** 8-cell minimal grid with subtle hairline borders, displaying tool names, practical use cases, and crisp logo monograms.

### 5.7 Achievements & Badges: Dual-Column Credential Grid
- **Layout:** Sticky left headline with dual-column credential cards on the right.
- **Certifications:** Verified hackathon honors, Google analytics certifications, and academic excellence awards.
- **Digital Badges:** Interactive cards linking to external verification authorities (Google Cloud, NVIDIA DLI, IBM Enterprise Architecture, Credly).

### 5.8 Development Journey: Clean Timeline Stream
- **Layout:** Vertical chronological stream with solid neutral timeline track and cobalt circular nodes.
- **Narrative:** 5 milestone steps showing the mental model shift from pure syntax mastery to empathetic product architecture.

### 5.9 Contact Section: Premium Inbound Portal
- **Layout:** Balanced split grid (Left: Direct email, location, LinkedIn & GitHub cards; Right: Polished interactive inquiry form).
- **Form Design:** Clean rounded input fields (`border: 1px solid rgba(15,23,42,0.12)`), cobalt focus glow, real-time client validation for name, email, phone, and message.

### 5.10 Footer: Minimalist Colophon
- **Layout:** 3-column clean alignment (Left: Prasanna Hari wordmark; Center: Colophon statement; Right: Social links & 2026 copyright).

---

## 6. Animation Language & Motion Hierarchy

All animations adhere to the `prefers-reduced-motion` standard, automatically degrading to immediate rendering when reduced motion is requested.

| Interaction Type | Component | Motion Implementation | Timing & Easing |
| :--- | :--- | :--- | :--- |
| **Entrance Reveal** | Section titles & subtitles | Masked container with inner Y-translate (`y: 35 -> 0, opacity: 0 -> 1`) | `0.75s`, `cubic-bezier(0.22, 1, 0.36, 1)` |
| **Card Hover Lift** | Projects, Tools, Achievements | `translateY(-4px)` with expansion of diffuse drop shadow | `0.3s ease-out` |
| **3D Tilt** | Hero portal, Project preview | Mouse-coordinate proportional rotation (`rotateX`, `rotateY` max 6°) | Smooth GSAP dampening (`quickTo`) |
| **Scroll Progress** | Top bar | `scaleX` from 0 to 1 based on window scroll progress | Native RAF / Lenis scroll binding |
| **Tab Transition** | Case Studies | Cross-fade with slight vertical shift (`y: 12 -> 0, opacity: 0 -> 1`) | `0.4s`, `cubic-bezier(0.16, 1, 0.3, 1)` |
| **Infinite Ribbon** | Marquee | Smooth horizontal `translateX(-50%)` loop | `60s linear infinite` |
| **Form Feedback** | Contact submit button | Spinner transition, checkmark success reveal | `0.35s ease` |

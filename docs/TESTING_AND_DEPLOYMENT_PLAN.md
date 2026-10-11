# Testing and Deployment Plan — Prasanna Hari Portfolio

**Target Environment:** Vercel Production (`prasanna-portfolio-main.vercel.app`)  
**Standard:** 100% Type-Safe, WCAG 2.1 AA/AAA Accessible, 60 FPS Smooth Motion, Zero Layout Shift.

---

## 1. Automated Build & Type Verification

Before deploying any phase, the automated validation suite must pass cleanly without warnings or TypeScript skips:

```bash
# 1. Type Check (Strict mode)
npx tsc --noEmit

# 2. Production Bundle Compilation
npm run build

# 3. Production Preview Inspection
npm run preview
```

**Acceptance Criteria:**
- Zero TypeScript diagnostics.
- Total production JS bundle `< 200 KB` gzipped.
- Total production CSS bundle `< 20 KB` gzipped.
- Zero broken static import paths or missing assets.

---

## 2. Responsive Viewport Testing Matrix

Testing must be executed across four distinct viewport tiers:

| Viewport Tier | Target Resolutions | Critical Verification Points |
| :--- | :--- | :--- |
| **Mobile (Portrait)** | `375 × 667` (iPhone SE)<br>`390 × 844` (iPhone 14)<br>`412 × 915` (Pixel 7) | - Hamburger menu drawer opens/closes with ESC key and smooth slide.<br>- Hero portrait scales cleanly without horizontal page blowout.<br>- Multi-column project cards collapse to single column.<br>- Touch swipe functions smoothly on 3D card stacks.<br>- No horizontal scroll leakage (`overflow-x: hidden`). |
| **Tablet** | `768 × 1024` (iPad)<br>`820 × 1180` (iPad Air) | - Two-column metadata layouts wrap cleanly.<br>- Navigation bar transitions smoothly between mobile drawer and desktop menu.<br>- Tools and achievements grid adapt to 2-column format. |
| **Laptop / Desktop** | `1280 × 800` (MacBook)<br>`1440 × 900` (MacBook Pro)<br>`1920 × 1080` (Desktop FHD) | - Desktop navigation links active-state tracking works as sections scroll.<br>- Pinned GSAP ScrollTrigger transitions pin and unpin with zero jitter.<br>- 3D gyroscope tilt activates smoothly on mouse movement. |
| **Ultrawide** | `2560 × 1440` (QHD)<br>`3440 × 1440` (Ultrawide) | - Max-width container (`max-w-[1600px]`) prevents layout stretching.<br>- Background ivory canvas extends seamlessly across edges. |

---

## 3. Visual & Aesthetic QA Checklist

- [ ] **Background Consistency:** Every section utilizes the warm ivory canvas (`#FAF9F5`) and clean white cards (`#FFFFFF`). Zero residual dark-mode background blocks or neon glows.
- [ ] **Contrast Verification:** All text elements meet WCAG 2.1 AA (minimum 4.5:1) and AAA (minimum 7:1) contrast against their respective backgrounds.
- [ ] **Typography Scale:** Heading sizes scale proportionately using `clamp()`, with no awkward line wrapping or orphaned words on small screens.
- [ ] **Card Elevation:** Cards render soft diffuse multi-stop shadows (`rgba(15, 23, 42, 0.04)` to `0.08)` rather than hard black outlines or neon flares.
- [ ] **Scrollbar:** Custom 8px rounded pill scrollbar matches the light theme (ivory track, soft slate thumb).

---

## 4. Animation & Performance Quality Assurance

- [ ] **Scroll Smoothness:** Lenis momentum scrolling maintains a stable 60 FPS during fast and slow mouse wheel movements.
- [ ] **GSAP ScrollTrigger Sync:** Lenis RAF loop is properly bound to `ScrollTrigger.update()`, eliminating any pinned element lag or page jump.
- [ ] **Motion Sensitivity:** When `prefers-reduced-motion: reduce` is enabled in system settings:
  - All transitions degrade to instantaneous reveals.
  - Infinite marquee ticker pauses.
  - Canvas sequence or tilt effects are disabled.
- [ ] **Core Web Vitals:**
  - **LCP (Largest Contentful Paint):** `< 1.2s` on 4G network.
  - **CLS (Cumulative Layout Shift):** `< 0.02` (all image containers have explicit aspect ratios).
  - **FID / INP (Interaction to Next Paint):** `< 50ms`.

---

## 5. Functional & Interactive Testing Protocol

| Component / Feature | Test Procedure | Expected Outcome |
| :--- | :--- | :--- |
| **Navigation Anchor Scroll** | Click each nav item (`About`, `Skills`, `Work`, `Journey`, `Achievements`, `Contact`). | Lenis smoothly animates to target section with proper scroll offset. |
| **Active Nav Spy** | Scroll down through the page. | Active indicator under navigation links updates to match the visible section. |
| **Resume Download** | Click "Download Resume" in Hero, About, and Contact sections. | Prompts download of `/Resume.pdf`. |
| **Case Studies Tabs** | Click between SaaISS AI, Belt Forge, and DPDP AI tabs. | Content panel smoothly cross-fades using Framer Motion with zero layout jump. |
| **3D Card Stacks** | Drag and flick cards in Drawing and Sports sections. | Top card flies out and rotates to back of the deck with smooth physics. |
| **Contact Form Validation** | Submit empty form. | Validation error messages appear beneath Name, Email, and Message. |
| **Contact Form Submission** | Enter valid details and submit. | Submit button displays loading spinner, then confirms successful delivery. |
| **External Links** | Click GitHub, LinkedIn, and Digital Badge links. | Opens respective target URLs in a new tab with `rel="noopener noreferrer"`. |

---

## 6. Production Deployment Runbook (Vercel)

1. **Pre-Deployment Git Check:**
   - Commit all approved changes to `main` branch.
   - Verify zero uncommitted scratch files or broken symlinks.
2. **Environment Variable Configuration in Vercel:**
   - Verify `VITE_FORM_ENDPOINT` is configured in Vercel Project Settings > Environment Variables.
3. **Deployment Trigger:**
   - Push to `origin main` to trigger automatic Vercel build.
   - Inspect build log to confirm `tsc --noEmit && vite build` completes with exit code `0`.
4. **Post-Deployment Smoke Test:**
   - Open production domain: `https://prasanna-portfolio-main.vercel.app/`.
   - Run browser audit to confirm zero 404 network errors and zero console exceptions.

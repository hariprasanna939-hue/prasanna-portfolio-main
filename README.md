# Prasanna Hari — Personal Portfolio

A cinematic, high-performance personal portfolio built with React 18, TypeScript, Vite 5, Tailwind CSS, GSAP 3, Lenis Smooth Scroll, and Framer Motion.

---

## 🚀 Tech Stack

- **Framework**: React 18 (Strict Mode) + Vite 5
- **Language**: TypeScript (Strict type checking)
- **Styling**: Tailwind CSS 3.4 (Token-based design system with CSS custom properties)
- **Kinetic Choreography**: GSAP 3 + ScrollTrigger
- **Smooth Scroll**: Lenis
- **Micro-Interactions & Transitions**: Framer Motion 11
- **Icons**: Lucide React + custom SVGs

---

## 🛠️ Run Locally

### Prerequisites
- Node.js **>= 18.0.0**
- npm **>= 9.0.0**

### Setup Instructions

```bash
# 1. Clone repository
git clone https://github.com/hariprasanna939-hue/prasanna-portfolio.git
cd prasanna-portfolio

# 2. Install dependencies
npm install

# 3. Start local development server
npm run dev
```

### Command Reference

| Command | Description |
|---|---|
| `npm run dev` | Starts local Vite development server with HMR |
| `npm run build` | Type-checks with `tsc --noEmit` and creates production bundle in `dist/` |
| `npm run preview` | Locally serves the production `dist/` bundle |
| `npm run frames:manifest` | Scans `public/hero-frames/` and generates `manifest.json` for 360° turntable |

---

## 📁 Where to Edit

| Target | File Path | Description |
|---|---|---|
| **All Copy & Data** | `src/data/site.ts` | Single source of truth for bio, profile, socials, projects, case studies, journey, skills, and tools |
| **Color Tokens & Theme** | `src/index.css` | `:root` CSS variables (`--bg`, `--surface`, `--fg`, `--muted`, `--accent`, `--accent-cool`, `--line`) |
| **Hero Configuration** | `src/config/hero.ts` | Turntable directories, timeout, frame steps, and fallback image paths |
| **Media & Static Assets** | `public/` | Images, portrait, project screenshots, favicon, resume, and turntable frames |

---

## 🔄 Optional 360° Hero Turntable

The Hero section supports a smooth 360° scroll-scrubbed turntable sequence:

1. **Generate Turntable Video**: Prompt an AI 3D/video generator with a rotating subject turntable loop (or render a 3D CAD/model).
2. **Export Frames with ffmpeg**:
   ```bash
   ffmpeg -i turntable.mp4 -vf "fps=24,scale=960:-2" -c:v libwebp -lossless 0 -compression_level 4 -q:v 85 public/hero-frames/frame_%04d.webp
   ```
3. **Register Frames**:
   ```bash
   npm run frames:manifest
   ```
4. **Behavior**:
   - Desktop scrubs all frames 1:1 with scroll position.
   - Mobile devices load every 2nd frame (`mobileFrameStep: 2`) to conserve memory and bandwidth.
   - If fewer than 2 frames exist, or if reduced-motion is detected, or on timeout/load failure, the site seamlessly falls back to the interactive 3D tilting portrait.
   - To revert back to static portrait at any time, simply delete `public/hero-frames/manifest.json`.

---

## 📬 Contact Form Configuration

- **Default (No API key needed)**: Opens the visitor's default email client (`mailto:hariprasanna939@gmail.com`) with the subject, project type, name, and project description pre-filled.
- **Formspree / Backend API**: Set `VITE_FORM_ENDPOINT` in `.env.local` (or in Vercel environment variables):
  ```bash
  VITE_FORM_ENDPOINT=https://formspree.io/f/your_form_id
  ```
  When set, the form sends a JSON POST request directly to the endpoint and displays inline animated success or error banners.

---

## 🌐 Deploying to Vercel

1. Push your code to GitHub:
   ```bash
   git add .
   git commit -m "Rebuild portfolio with cinematic design system"
   git push origin main
   ```
2. Import the repository in [Vercel](https://vercel.com).
3. Framework Preset: **Vite** (auto-detected).
4. Build Command: `npm run build`.
5. Output Directory: `dist`.
6. Environment Variables (optional): add `VITE_FORM_ENDPOINT` if using Formspree.
7. Once deployed, update `og:image` in `index.html` to your absolute canonical domain URL (e.g. `https://your-domain.com/og.jpg`).

---

## 🎨 Performance & Accessibility Highlights

- **Reduced Motion Support**: Fully respects `prefers-reduced-motion`. Turns 3D scroll-pinned stacks into clean responsive grids and suppresses continuous marquee loops.
- **Desktop Magnetic Cursor**: Only activates on desktop pointer devices (`(hover: hover) and (pointer: fine)`). Hides automatically over form inputs.
- **Fluid Typography**: Responsive clamps across all headlines (`clamp(2.4rem, 6vw, 6.2rem)`) designed for seamless scaling from compact smartphones to ultra-wide 4K monitors.
- **Zero CLS & LCP Optimization**: Preloaded hero portrait and background images in `index.html`.

# Asset Requirements & Specifications — Prasanna Hari Portfolio

**Standard:** Next-generation formats (WebP, SVG) with explicit aspect ratios, high DPI support, and lightweight payloads to achieve sub-second LCP (Largest Contentful Paint).

---

## 1. Imagery Specifications Table

| Asset Identifier | File Path | Format | Dimensions | Aspect Ratio | Max Weight | Visual Description & Framing |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Hero Portrait** | `public/images/portrait.webp` | WebP | `1200 × 1200` | `1:1` Square | `< 120 KB` | Authentic photo of Prasanna Hari; clean framing centered on face and torso; high clarity. |
| **Hero Portrait Fallback** | `public/images/portrait.jpg` | JPEG | `1200 × 1200` | `1:1` Square | `< 180 KB` | Standard JPEG fallback for older Safari versions. |
| **Project: SaaISS AI** | `public/projects/saaiss-ai.webp` | WebP | `1600 × 1200` | `4:3` Landscape | `< 150 KB` | High-fidelity UI capture of the SaaISS AI financial accounting dashboard, ledger overview, or analytics. |
| **Project: Belt Forge** | `public/projects/belt-forge.webp` | WebP | `1600 × 1200` | `4:3` Landscape | `< 150 KB` | Industrial monitoring UI of Belt Forge featuring telemetry feeds, sensor heatmaps, or conveyor status. |
| **Project: DPDP AI** | `public/projects/dpdp-ai.webp` | WebP | `1600 × 1200` | `4:3` Landscape | `< 140 KB` | Privacy compliance blueprint UI or regulatory schema parsing interface. |
| **Project: SmartHealth**| `public/projects/smarthealth.webp` | WebP | `1600 × 1200` | `4:3` Landscape | `< 140 KB` | Healthcare marketplace or telemedicine consultation dashboard. |
| **Drawings Media (1–6)**| `public/images/drawings/drawing-1..6.webp` | WebP | `800 × 1000` | `4:5` Portrait | `< 80 KB ea.` | Architectural sketches, kinetic graphite studies, and perspective wireframes. |
| **Sports Media (1–6)** | `public/images/sports/sport-1..6.webp` | WebP | `1200 × 800` | `3:2` Landscape | `< 95 KB ea.` | High-intensity athletic drills, badminton matches, and endurance conditioning. |
| **Social OpenGraph** | `public/og.jpg` | JPEG | `1200 × 630` | `1.91:1` | `< 160 KB` | Clean light-mode card with monogram, name, role, and preview for Twitter / LinkedIn unfurls. |
| **Favicon Monogram** | `public/favicon.svg` | SVG | Vector | `1:1` | `< 4 KB` | Minimalist `[PH]` monogram in deep charcoal with royal cobalt accent dot. |

---

## 2. Document & Download Assets

| Asset Name | Target Path | File Type | Requirement |
| :--- | :--- | :--- | :--- |
| **Curriculum Vitae** | `public/Resume.pdf` | PDF | Authentic, up-to-date resume of Prasanna Hari, accessible via all "Download Resume" buttons. |

---

## 3. Brand Vector Icons (`src/components/Icons.tsx`)

All vector marks must be optimized SVGs utilizing `currentColor` for crisp light-theme stroke rendering:
- **LinkedIn** (`lucide-react` or custom SVG)
- **GitHub** (Clean 24px viewBox vector)
- **Instagram** (Minimal line vector)
- **X / Twitter** (Monochrome vector mark)
- **Brand Badges:** Google Cloud, NVIDIA DLI, IBM Enterprise, Credly.

---

## 4. Asset Generation & Optimization Scripts

The repository includes `sharp` in `devDependencies`. The build pipeline utilizes Node scripts to automate image compression:
```bash
# Convert raw PNG/JPEG assets to production WebP
node -e "
const sharp = require('sharp');
sharp('raw-input.png')
  .resize(1600, 1200, { fit: 'cover' })
  .webp({ quality: 85, effort: 6 })
  .toFile('public/projects/output.webp');
"
```

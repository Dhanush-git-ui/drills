# ⚙️ PSR's Rock Drills — High-Performance Pneumatic Systems & 3D Interactive Parts Hub

[![Vite](https://img.shields.io/badge/Vite-v8.1.1-646CFF?logo=vite&logoColor=white)](https://vite.dev/)
[![React](https://img.shields.io/badge/React-v19.2.7-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-v4.3.2-38B2AC?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Three.js](https://img.shields.io/badge/Three.js-r185-000000?logo=three.js&logoColor=white)](https://threejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-v6.0.2-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Oxlint](https://img.shields.io/badge/Linter-Oxlint-F65B5B?logo=oxc&logoColor=white)](https://oxc.rs/docs/guide/usage/linter/rules)

An advanced engineering showcase and real-time inventory management platform custom-built for **PSR's Rock Drills**. The application focuses on the **Airtech 70L4R Radial Piston Air Motor Series**—the global standard for rotary drill strings in water well, wagon, and crawler drilling applications.

This interactive web application includes live 3D procedural modeling, dynamic spare parts mapping, real-time inventory databases, side-by-side machine comparisons, and a commercial quote builder.

---

## 🚀 Key Modules & Interactive Features

### 1. 🌐 3D Drill Assembly Viewer
* **File Location:** [Drill3DViewer.tsx](file:///c:/Users/dhanu/OneDrive/Desktop/psrs/src/components/ui/Drill3DViewer.tsx)
* **Technology:** `@react-three/fiber` & `@react-three/drei`
* **Features:**
  * **Procedural Textures:** Dynamically generated HTML5 Canvas heightmaps and bumpmaps simulate authentic sand-cast iron surfaces, ductile bronze housing textures, and brushed stainless steel spindles.
  * **Interactive Lighting:** Multi-point studio lighting with high-contrast rim highlights and a dramatic, glowing brand-red underlight (`#C8102E`) projecting the motor's structure.
  * **Physics-Based Particles:** Real-time air mist particles puff from the rotary distribution valve chest ports, reflecting physical engine pressure.
  * **Dynamic Rotational Speeds:** Custom `useFrame` hook animates drive shaft splines and helical threads, responding to speed ratings on load.

### 2. 🔍 Hotspot Explorer
* **File Location:** [HotspotExplorer.tsx](file:///c:/Users/dhanu/OneDrive/Desktop/psrs/src/components/ui/HotspotExplorer.tsx)
* **Features:**
  * Interactive overlay pins map to key components of the radial air motor.
  * Hovering pins exposes live metadata detailing:
    * **Function:** How the component distributes mechanical stress.
    * **Material:** Sourced raw metallurgy (e.g., SG Ductile Iron, Case-Hardened Tool Steel).
    * **Benefits:** Efficiency gain or vibration suppression.
    * **Maintenance Logs:** Re-lubrication intervals and seal inspections.

### 3. 📦 Live Inventory Hub
* **File Locations:** [Inventory.tsx](file:///c:/Users/dhanu/OneDrive/Desktop/psrs/src/pages/Inventory.tsx) & [inventory.ts](file:///c:/Users/dhanu/OneDrive/Desktop/psrs/src/data/inventory.ts)
* **Features:**
  * Live status tracker monitors item availability (e.g., `In Stock`, `Low Stock`, `Out of Stock`).
  * Detail panels display manufacturer metrics, barcode IDs, warehouse storage cells (e.g., `Rack R-12`, position `B4`), dimensions, and total operating weights.
  * Integrated fuzzy search indexing supports synonym lookups via [SEARCH_SYNONYMS](file:///c:/Users/dhanu/OneDrive/Desktop/psrs/src/data/inventory.ts#L684) (e.g., typing "conrod" finds "Engine Connecting Rod").

### 4. ⚖️ Strata Comparison Matrix
* **File Location:** [Comparison.tsx](file:///c:/Users/dhanu/OneDrive/Desktop/psrs/src/pages/Comparison.tsx)
* **Features:**
  * Side-by-side technical evaluation of the three principal 70L4R motor varieties:
    * **70L4R Standard:** Optimized for limestone quarries and blast hole anchoring.
    * **70L4R-T (High-Torque):** Outfitted with carbon-composite cylinder liners and tapered bearings to drill through hard granite layers.
    * **70L4R-L (Deep Borewell):** Features extended API spindle thread-locks and double-lipped NBR grease seals to prevent slurry backflow under high water levels.

### 5. 🛒 Smart Quote Builder
* **File Locations:** [Quote.tsx](file:///c:/Users/dhanu/OneDrive/Desktop/psrs/src/pages/Quote.tsx) & [QuoteContext.tsx](file:///c:/Users/dhanu/OneDrive/Desktop/psrs/src/context/QuoteContext.tsx)
* **Features:**
  * Context-driven cart where buyers configure entire motor assemblies and small spare parts.
  * Auto-tallies cumulative weight, handles bulk pricing, and exports custom requirements to a structured contact form to request commercial quotes.

---

## 🎨 Premium UI/UX Details

This application implements high-fidelity details to deliver a premium user experience:

* **Lenis Smooth Scroll:** Provides fluid scrolling behavior, handled by [SmoothScroll.tsx](file:///c:/Users/dhanu/OneDrive/Desktop/psrs/src/components/ui/SmoothScroll.tsx).
* **Magnetic Navigation Buttons:** Navigation controls gently snap to the user's cursor using spring force equations in [MagneticButton.tsx](file:///c:/Users/dhanu/OneDrive/Desktop/psrs/src/components/ui/MagneticButton.tsx).
* **Responsive Custom Cursor:** A secondary liquid-ring cursor reacts differently to text inputs, buttons, and canvas viewport drags in [CustomCursor.tsx](file:///c:/Users/dhanu/OneDrive/Desktop/psrs/src/components/ui/CustomCursor.tsx).
* **Framer Motion & GSAP Animations:** Powers seamless page entry transitions, grid item layouts, and active route markers.

---

## 📁 Repository Directory Structure

```text
psrs/
├── .oxlintrc.json          # Oxlint static analysis config
├── index.html              # HTML mount point
├── package.json            # Core dependencies & scripts
├── tsconfig.json           # TS base compiler settings
├── vite.config.ts          # Vite build pipeline configuration
├── public/                 # Static asset delivery
│   ├── favicon.svg         
│   └── images/
│       └── inventory/      # Live product photos & technical diagrams
└── src/
    ├── App.tsx             # Route orchestration & sticky navigation shell
    ├── App.css             
    ├── index.css           # Global typography & design tokens (Tailwind CSS v4)
    ├── main.tsx            # DOM initialization
    ├── components/
    │   └── ui/             # Core UI & Three.js Canvas modules
    │       ├── CustomCursor.tsx
    │       ├── Drill3DViewer.tsx
    │       ├── HotspotExplorer.tsx
    │       ├── MagneticButton.tsx
    │       └── SmoothScroll.tsx
    ├── context/
    │   └── QuoteContext.tsx # Context state managing the Quote Builder Cart
    ├── data/               # Structuring static catalogs and inventory indices
    │   ├── inventory.ts    # Extended list of items, SKUs, and search keywords
    │   ├── products.ts     # Details on motor variants and structural hotspots
    │   └── spareParts.ts   # Parts breakdown indices
    └── pages/              # Application views & templates
        ├── About.tsx       # Corporate divisions & history
        ├── Comparison.tsx  # Product specs table
        ├── Contact.tsx     # Contact details & sales inquiries
        ├── Home.tsx        # Hero deck & 3D landing viewport
        ├── Inventory.tsx   # Live stock lookup & parts dashboard
        ├── ProductDetail.tsx# Extended product view with details
        ├── Products.tsx    # Technical parts matrix
        ├── Quote.tsx       # Quote builder form
        └── SpareParts.tsx  # Dynamic parts catalog
```

---

## 🛠️ Technology Stack

| Technology | Target Version | Purpose |
| :--- | :--- | :--- |
| **React** | `^19.2.7` | UI library using React 19 concurrent features |
| **Vite** | `^8.1.1` | Build system utilizing the lightning-fast Tailwind integration |
| **TailwindCSS** | `^4.3.2` | CSS framework for styling layouts |
| **Three.js** | `^0.185.1` | 3D rendering engine |
| **React Three Fiber** | `^9.6.1` | Declarative Three.js component architecture |
| **React Three Drei** | `^10.7.7` | Collection of helpers for Three.js (OrbitControls, PerspectiveCamera) |
| **GSAP** | `^3.15.0` | GreenSock Animation Platform for scroll triggers |
| **Framer Motion** | `^12.42.2` | Fluid interface transitions and animations |
| **Lenis** | `^1.3.25` | Smooth scrolling framework |
| **TypeScript** | `~6.0.2` | Static type safety and intellisense |
| **Oxlint** | `^1.71.0` | Static analysis checking for performance bugs |

---

## 💻 Local Setup and Installation

Follow these steps to run the project locally on your machine:

### 1. Prerequisites
Ensure you have [Node.js](https://nodejs.org/) installed (version `18.x` or higher is recommended).

### 2. Clone and Install Dependencies
```bash
# Navigate to the project root
cd c:\Users\dhanu\OneDrive\Desktop\psrs

# Install package dependencies
npm install
```

### 3. Run Development Server
```bash
# Starts the Vite bundler on http://localhost:5173
npm run dev
```

### 4. Build for Production
```bash
# Compile TypeScript and generate minified distribution assets in /dist
npm run build
```

### 5. Preview Production Build
```bash
# Serves the compiled production bundle locally
npm run preview
```

### 6. Lint with Oxlint
```bash
# Runs ultra-fast Oxc linter to ensure code standards
npm run lint
```

---

## ⚙️ Engineering Specifications: The Airtech Radial Piston Motor

The horizontal radial motor modeled in [Drill3DViewer.tsx](file:///c:/Users/dhanu/OneDrive/Desktop/psrs/src/components/ui/Drill3DViewer.tsx) highlights several critical components of heavy boring machinery:
* **The radial timing valve core** distributes high-pressure air synchronously to four opposing 70mm piston cylinders to produce balanced shaft rotation.
* **Tapered bearing nose caps** absorb axial pushback loads when drilling rods meet hard strata.
* **Double-lipped NBR grease seals** prevent sand or water slurry backflow from entering the crankcase oil sump.

For inquiries, product datasheets, or custom configurations, head over to the [Contact page](file:///c:/Users/dhanu/OneDrive/Desktop/psrs/src/pages/Contact.tsx) or submit a parts request via the [Quote page](file:///c:/Users/dhanu/OneDrive/Desktop/psrs/src/pages/Quote.tsx).

---

*© 2026 PSR'S Rock Drills. All engineering patents, procedural designs, and rights reserved.*

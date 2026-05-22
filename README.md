# 🌬️ PureFlow — Premium Smart Air Purifier & Customizer

PureFlow is a state-of-the-art, premium frontend React application built with Vite and TypeScript. It showcases a high-end smart air purifier product line, featuring custom scroll-linked GSAP animations, a premium interactive device customizer, and an elegant dark glassmorphism user interface.

---

## 🚀 Key Features

* **Interactive Scroll-Linked Parallax Homepage** — A stunning cloud/sky background video that interactively responds to user scrolling, creating a smooth visual descent metaphor for breathing cleaner air.
* **Smart Device Customizer (`/device`)** — A premium, step-by-step air purifier configurator. Users can customize airflow rates, carbon/HEPA filtration modules, exterior shell materials, and optional wall mounts with a live specifications calculator.
* **Air Science Showcase (`/science`)** — An educational dashboard explaining HEPA particle filtration, active carbon absorption, and clean air metrics with interactive component breakdowns.
* **Subscription & Filter Plans (`/plans`)** — A modern pricing table with hover transitions and pricing tier estimations for replacement filter delivery.
* **Real Stories (`/stories`)** — A clean customer wall showcasing reviews, ratings, and testimonial cards with smooth fade-in animations.
* **Modern Glassmorphic UI** — Curated HSL-tailored dark modes, smooth micro-animations, custom scrollbars, and premium typography powered by Helvetica Neue fonts.

---

## 🛠️ Tech Stack

* **Frontend**: React 19, TypeScript
* **Styling**: Tailwind CSS v4, Custom Vanilla CSS overlays
* **Animations**: GSAP (GreenSock Animation Platform) + ScrollTrigger, Motion
* **Routing**: React Router v7
* **Icons**: Lucide React
* **Build Tool**: Vite v6

---

## 📁 Directory Structure

```
PureFlow/
├── public/                 # Static assets
│   ├── fonts/              # Custom Helvetica Neue fonts
│   ├── black_jet.png       # Aesthetic jet asset
│   ├── black_jet_plane.png # PureFlow device/plane asset
│   └── clean_sky.png       # Clean sky banner image
├── src/                    # Source directory
│   ├── components/         # Reusable UI components
│   │   ├── Footer.tsx      # Premium footer component
│   │   ├── Navbar.tsx      # Glassmorphic top navigation bar
│   │   └── VideoBackground.tsx # GSAP scroll-linked video wrapper
│   ├── pages/              # Page views / routes
│   │   ├── AboutUs.tsx     # Company story & details
│   │   ├── DeviceCustomizer.tsx # Step-by-step purifier configurator
│   │   ├── Home.tsx        # Homepage hero & scroll-masked content
│   │   ├── Plans.tsx       # Subscription filter plans
│   │   ├── ReachUs.tsx     # Contact & support forms
│   │   ├── RealStories.tsx # Customer testimonials grid
│   │   └── Science.tsx     # Purification technology details
│   ├── utils/              # Utility helpers
│   │   └── seo.ts          # Page title & SEO metatag manager
│   ├── App.tsx             # Main routing and scroll mask container
│   ├── index.css           # Tailwind v4 configuration and global design tokens
│   └── main.tsx            # Application entry point
├── index.html              # HTML template wrapper
├── package.json            # Scripts & project dependencies
├── tsconfig.json           # TypeScript configuration
└── vite.config.ts          # Vite build and environment settings
```

---

## ⚙️ Setup & Local Installation

### Prerequisites
* **Node.js** (v18.0.0 or higher recommended)
* **npm** (v9.0.0 or higher)

### 1. Install Dependencies
Clone the repository, navigate into the project directory, and run:
```bash
npm install
```

### 2. Run the App
Launch the Vite local development server:
```bash
npm run dev
```
The app will be available locally at [http://localhost:3000](http://localhost:3000).

### 3. Build for Production
Bundle the production-ready assets into the `dist/` directory:
```bash
npm run build
```

---

## 📜 Available Scripts

* `npm run dev` — Starts the local dev server on port 3000 with HMR.
* `npm run build` — Compiles and bundles static assets for production.
* `npm run preview` — Previews the production build locally.
* `npm run lint` — Runs TypeScript compiler checks (`tsc --noEmit`).

---

## 📄 License
This project is private and proprietary. All rights reserved.

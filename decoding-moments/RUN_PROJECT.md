# Decoding Moments - Project Setup & Run Guide

## Project Overview

**Decoding Moments** is a luxury portfolio/marketing website for a content creation studio specializing in unscripted weddings, celebrations, traditions, and instant same-day 4K reels.

**Tech Stack:** React 19 + TypeScript + Vite 8 + Tailwind CSS 4 + Framer Motion

---

## Prerequisites

- **Node.js** (v18 or higher recommended)
- **npm** or **bun** package manager

---

## Setup Instructions

### 1. Navigate to the project directory

```bash
cd decoding-moments
```

### 2. Install dependencies

Using npm:
```bash
npm install
```

Or using bun:
```bash
bun install
```

### 3. Environment Variables (Optional)

The project can run without any environment variables. If you want Gemini AI integration, create a `.env` file:

```bash
cp .env.example .env
```

Then add your API key:
```
GEMINI_API_KEY=your_api_key_here
```

### 4. Start the development server

```bash
npm run dev
```

This will start the Vite dev server on **http://localhost:3000**.

---

## Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server on port 3000 |
| `npm run build` | Create production build in `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run TypeScript type-checking |
| `npm run clean` | Remove `dist/` and `server.js` |

---

## Project Structure

```
decoding-moments/
├── public/assets/          # Static assets (logos)
├── src/
│   ├── components/         # React components
│   │   ├── Header.tsx
│   │   ├── HeroSection.tsx
│   │   ├── CinematicStorySection.tsx
│   │   ├── ServicesSection.tsx
│   │   ├── FeaturedStoriesSection.tsx
│   │   ├── InstantReelsProcessSection.tsx
│   │   ├── GrandCtaSection.tsx
│   │   ├── MainFooter.tsx
│   │   ├── LogoIntroOverlay.tsx
│   │   ├── ReelModal.tsx
│   │   ├── ShowreelModal.tsx
│   │   ├── PlanStoryModal.tsx
│   │   └── StoryChapterModal.tsx
│   ├── data/
│   │   └── studioData.ts  # Static data (reels, services, etc.)
│   ├── App.tsx             # Root component
│   ├── main.tsx            # Entry point
│   ├── index.css           # Global styles + Tailwind
│   └── types.ts            # TypeScript interfaces
├── index.html              # SPA shell
├── package.json
├── vite.config.ts
└── tsconfig.json
```

---

## Key Notes

- **Purely frontend** - No backend or database required
- Images are hosted externally (Google CDN)
- Tailwind CSS v4 is used with the Vite plugin (no `tailwind.config.js` needed)
- The `express` and `dotenv` dependencies in `package.json` are unused scaffolding artifacts

---

## Build for Production

```bash
npm run build
npm run preview
```

The production build will be output to the `dist/` directory.

---

## Troubleshooting

| Issue | Solution |
|---|---|
| Port 3000 already in use | Kill the process or use a different port |
| Missing node_modules | Run `npm install` |
| TypeScript errors | Run `npm run lint` to check types |

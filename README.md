# PulseDaily AI 🗞️⚡

> **Personalized Daily AI Intelligence Dashboard** built with **React**, **TypeScript**, **Tailwind CSS**, and styled strictly to **Google News Material Design 3** via **Google Stitch MCP**.

[![GitHub Repo](https://img.shields.io/badge/GitHub-Itachi0710%2Fpulsedaily--ai-blue.svg)](https://github.com/Itachi0710/pulsedaily-ai)
[![Design System](https://img.shields.io/badge/Design_System-Google_Material_Design_3-1A73E8.svg)](#design-system-architecture)
[![Grounded Engine](https://img.shields.io/badge/Grounded_Engine-HackerNews_API_v4.2-188038.svg)](#features)

---

## 🌟 Overview

**PulseDaily AI** delivers curated, high-velocity developer and executive intelligence every morning. It cuts through wrapper fatigue and open-ended chatbot prompts by structuring information into an authoritative, 4-zone editorial briefing inspired by **Google News** (`news.google.com`).

---

## 🎨 Design System Architecture (Google News Material Design 3)

The UI was authored and inspected directly via **Google Stitch MCP** (`projects/3551216057459068690/screens/16315c6b6c8e4bfd89369fe2bffa7c62`), strictly enforcing:

- **100% Solid Surfaces & Anti-Blur Discipline**:
  - `#F8F9FA` canvas background.
  - `#FFFFFF` cards with `16px` (`rounded-2xl`) corners and crisp `1px solid #DADCE0` hairline borders.
  - **Zero glassmorphism** or diffuse backdrop blurs to maintain crisp information density.
- **Top Google App Bar (Row 1)**:
  - Official 4-color Google dots SVG mark (`#4285F4`, `#EA4335`, `#FBBC05`, `#34A853`).
  - Wide pill-shaped search bar in `#F1F3F4` with interactive search filtering.
  - Compact Role Lens selector pill (`#E8F0FE` background, `#1A73E8` text).
  - `#D93025` notification bell for high-velocity breaking alerts.
  - Google SSO avatar pill with verified session indicator.
- **Horizontal Google News Tab Bar (Row 2)**:
  - Multi-category beat selector: `For you`, `Following (Saved)`, `Agentic AI`, `Cloud & Infra`, `Product & Strategy`.
  - Active tab indicated by `text-[#1A73E8]` and a `3px` rounded Google Blue bottom bar.
- **"Your briefing" Header (Zone 3)**:
  - Live status badge: `● Live HackerNews API Active`.
  - 1-click **Refresh Feed** (syncs live stories from HackerNews Firebase API).
  - Google Blue **Listen to Daily Brief (60s)** button.
- **12-Column Briefing Grid (Zone 4)**:
  - **Left 8 Columns**: Top stories with `✓ Grounded` chips, 3-bullet Gemini TL;DR summaries, soft blue Material Design 3 tonal callout boxes (`#E8F0FE`) with role-tailored impacts (`Software Engineer`, `Product Manager`, `Founder / Exec`), and citation counters.
  - **Right 4 Columns**: Sidebar cards for **Breaking Alert Radar** (with pulsing red indicator), **60-Second Executive Audio Brief** (animated waveform, interactive scrubber, and playback speed), and **Saved Reading List** (with 1-click **Export to Obsidian / Markdown**).

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- npm or pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/Itachi0710/pulsedaily-ai.git

# Enter project directory
cd pulsedaily-ai

# Install dependencies
npm install

# Start development server
npm run dev
```

### Production Build

```bash
npm run build
npm run preview
```

---

## 🛠️ Tech Stack

- **Framework**: React 18 + Vite 6
- **Language**: TypeScript
- **Styling**: Tailwind CSS v3 (configured with Material Design 3 tokens)
- **Design Authoring**: Google Stitch MCP
- **Live Ingestion**: HackerNews Firebase REST API (`v0/topstories`)
- **Iconography**: Google Material Symbols Outlined & Filled

---

## 📄 License

MIT © [Itachi0710](https://github.com/Itachi0710)

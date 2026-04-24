# 🌤️ Next Weather Pro 3D

A premium, immersive weather experience built with **Next.js 15**, **OpenWeatherMap API**, and **React Three Fiber**. Featuring high-fidelity volumetric 3D atmospheres and interactive weather maps.

![License](https://img.shields.io/github/license/fapethedev/next-open-weather-map)
![Next.js](https://img.shields.io/badge/Next.js-16-black)
![Three.js](https://img.shields.io/badge/Three.js-Volumetric-blue)

## Features

- **Realistic 3D Atmosphere**: Dynamic volumetric clouds, rain particles, and sun positioning that reacts to real-time weather data.
- **Bento Dashboard**: A modern, sleek UI using Framer Motion for staggered entrance animations and fluid transitions.
- **Interactive Weather Maps**: 5 high-resolution layers (Clouds, Precipitation, Temperature, Wind, Pressure) powered by Leaflet.
- **Global Search**: Command-palette style city search with geocoding integration.
- **Smart Data Layer**: Secure API proxying with SWR caching to respect OpenWeatherMap's free tier (60 calls/min).
- **Air Quality Index**: Detailed pollutant breakdown (PM2.5, PM10, SO2, NO2).
- **Forecasts**: 24-hour hourly view and 5-day daily outlook.

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **3D Engine**: React Three Fiber + Drei (Three.js)
- **Animations**: Framer Motion
- **Styling**: Tailwind CSS + Shadcn UI
- **State**: Zustand (with Persistence)
- **Data Fetching**: SWR
- **Maps**: Leaflet + React Leaflet

## 🛠️ Getting Started

### 1. Prerequisites
- Node.js 20+ 
- pnpm (recommended)

### 2. Environment Setup
Create a `.env.local` file in the root directory:
```bash
NEXT_PUBLIC_OPENWEATHER_API_KEY=your_api_key_here
```
Get your free API key at [OpenWeatherMap](https://home.openweathermap.org/api_keys).

### 3. Installation
```bash
pnpm install
```

### 4. Development
```bash
pnpm dev
```

## Project Structure

```text
src/
├── app/              # Next.js Routes & API Proxy
├── components/
│   ├── three/        # 3D Atmosphere & Scenes
│   ├── weather/      # UI Dashboard Widgets
│   └── ui/           # Shared Shadcn components
├── hooks/            # Weather & Search logic
├── lib/              # Utils, Types & Global Store
└── public/           # Static assets
```

## Security
We take security seriously. Please see our [SECURITY.md](./SECURITY.md) for reporting vulnerabilities.

## Contributing
Contributions are welcome! Check out [CONTRIBUTING.md](./CONTRIBUTING.md) to get started.

## License
Distributed under the MIT License. See `LICENSE` for more information.

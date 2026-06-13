"use client";

import { useState, useEffect } from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import {
	Cloud,
	Droplets,
	Thermometer,
	Wind as WindIcon,
	Layers,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import { useWeatherStore } from "@/lib/store";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// Fix Leaflet icon issue
const iconUrl = "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png";
const shadowUrl =
	"https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png";
const DefaultIcon = L.icon({
	iconUrl,
	shadowUrl,
	iconSize: [25, 41],
	iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

const LAYERS = [
	{ id: "clouds_new", name: "Clouds", icon: <Cloud className="h-4 w-4" /> },
	{
		id: "precipitation_new",
		name: "Rain",
		icon: <Droplets className="h-4 w-4" />,
	},
	{ id: "temp_new", name: "Temp", icon: <Thermometer className="h-4 w-4" /> },
	{ id: "wind_new", name: "Wind", icon: <WindIcon className="h-4 w-4" /> },
	{
		id: "pressure_new",
		name: "Pressure",
		icon: <Layers className="h-4 w-4" />,
	},
];

function MapUpdater({ center }: { center: [number, number] }) {
	const map = useMap();
	useEffect(() => {
		map.setView(center, 7);
	}, [center, map]);
	return null;
}

export function WeatherMap() {
	const { lat, lon } = useWeatherStore();
	const [activeLayer, setActiveLayer] = useState("clouds_new");
	const apiKey = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;

	const center: [number, number] = [lat, lon];

	return (
		<Card className="relative h-100 w-full overflow-hidden rounded-3xl border-white/10 bg-white/5 backdrop-blur-md py-0">
			<div className="absolute top-4 right-4 z-1000 flex flex-col gap-2">
				<AnimatePresence mode="wait">
					<motion.div
						initial={{ opacity: 0, x: 20 }}
						animate={{ opacity: 1, x: 0 }}
						className="flex flex-col gap-2 rounded-2xl border border-white/10 bg-black/40 p-2 backdrop-blur-xl"
					>
						{LAYERS.map((layer) => (
							<Button
								key={layer.id}
								variant={activeLayer === layer.id ? "default" : "ghost"}
								size="sm"
								onClick={() => setActiveLayer(layer.id)}
								className={`h-9 justify-start gap-2 rounded-xl px-3 transition-all ${
									activeLayer === layer.id
										? "bg-white text-black"
										: "text-white hover:bg-white/10"
								}`}
							>
								{layer.icon}
								<span className="text-xs font-medium">{layer.name}</span>
							</Button>
						))}
					</motion.div>
				</AnimatePresence>
			</div>

			<div className="h-full w-full contrast-[1.1] grayscale-[0.3]">
				<MapContainer
					center={center}
					zoom={7}
					scrollWheelZoom={false}
					className="h-full w-full"
					zoomControl={false}
				>
					<TileLayer
						attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
						url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
					/>
					{apiKey && (
						<TileLayer
							key={activeLayer}
							url={`https://tile.openweathermap.org/map/${activeLayer}/{z}/{x}/{y}.png?appid=${apiKey}`}
							opacity={0.7}
						/>
					)}
					<MapUpdater center={center} />
				</MapContainer>
			</div>

			<div className="absolute bottom-4 left-4 z-1000">
				<div className="rounded-full border border-white/10 bg-black/40 px-3 py-1.5 text-[10px] font-medium tracking-widest text-white/60 uppercase backdrop-blur-md">
					Live Satellite Data
				</div>
			</div>
		</Card>
	);
}

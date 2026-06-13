"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { useEffect } from "react";
import dynamic from "next/dynamic";

import { SearchLocation } from "@/components/weather/search-location";
import { CurrentWeather } from "@/components/weather/current-weather";
import { Forecast } from "@/components/weather/forecast";
import { AirQuality } from "@/components/weather/air-quality";
import { WeatherScene } from "@/components/three/weather-scene";
import { Toaster } from "@/components/ui/sonner";

const WeatherMap = dynamic(
	() =>
		import("@/components/weather/weather-map").then((mod) => mod.WeatherMap),
	{
		ssr: false,
		loading: () => (
			<div className="h-100 w-full animate-pulse rounded-3xl bg-white/5" />
		),
	},
);

export default function WeatherPage() {
	useEffect(() => {
		if (!process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY) {
			toast.error(
				"OpenWeatherMap API Key is missing. Please check your .env.local file.",
				{
					duration: Infinity,
				},
			);
		}
	}, []);

	return (
		<main className="relative min-h-screen overflow-x-hidden p-4 md:p-8 lg:p-12">
			<Toaster position="top-center" richColors />
			<WeatherScene />

			<div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 pt-16 md:pt-8 lg:grid-cols-12 lg:gap-12">
				<div className="flex flex-col gap-12 lg:col-span-7">
					<motion.div
						initial={{ opacity: 0, x: -50 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.8, ease: "easeOut" }}
						className="w-full max-w-md"
					>
						<SearchLocation />
					</motion.div>

					<CurrentWeather />

					<div className="hidden lg:block">
						<AirQuality />
					</div>
				</div>

				<div className="flex flex-col gap-8 lg:col-span-5">
					<Forecast />

					<div className="lg:hidden">
						<AirQuality />
					</div>

					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.5 }}
					>
						<h3 className="mb-4 text-sm font-medium tracking-wider text-white/50 uppercase">
							Weather Maps
						</h3>
						<WeatherMap />
					</motion.div>
				</div>
			</div>

			<div className="fixed right-6 bottom-6 text-[10px] font-medium tracking-widest text-white/20 uppercase">
				Next OpenWeather Map by{" "}
				<Link
					className="text-primary italic"
					href="https://www.linkedin.com/in/fapethedev/"
					target="_blank"
				>
					Fapethedev
				</Link>
			</div>
		</main>
	);
}

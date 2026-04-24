"use client";

import { motion } from "framer-motion";
import { Droplets, Wind, Thermometer, Eye } from "lucide-react";
import { format } from "date-fns";

import { useWeather } from "@/hooks/use-weather";
import { Skeleton } from "@/components/ui/skeleton";
import { useWeatherStore } from "@/lib/store";

export function CurrentWeather() {
	const { weather, isLoading } = useWeather();
	const { units } = useWeatherStore();

	if (isLoading)
		return <Skeleton className="h-64 w-full rounded-3xl bg-white/10" />;
	if (!weather || !weather.weather || !weather.main) return null;

	const tempSymbol = units === "metric" ? "°C" : "°F";
	const speedUnit = units === "metric" ? "m/s" : "mph";

	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.8 }}
			className="flex flex-col gap-6"
		>
			<div className="flex flex-col">
				<h2 className="text-xl font-medium text-white/70">
					{weather.name}, {weather.sys.country}
				</h2>
				<p className="text-sm text-white/50">
					{format(new Date(), "EEEE, d MMMM")}
				</p>
			</div>

			<div className="flex items-center gap-8">
				<h1 className="text-8xl font-bold tracking-tighter text-white">
					{Math.round(weather.main.temp)}
					{tempSymbol}
				</h1>
				<div className="flex flex-col">
					<p className="text-2xl font-medium text-white capitalize">
						{weather.weather[0].description}
					</p>
					<p className="text-white/60">
						Feels like {Math.round(weather.main.feels_like)}
						{tempSymbol}
					</p>
				</div>
			</div>

			<div className="grid grid-cols-2 gap-4 md:grid-cols-4">
				<WeatherDetailItem
					icon={<Droplets className="h-4 w-4" />}
					label="Humidity"
					value={`${weather.main.humidity}%`}
				/>
				<WeatherDetailItem
					icon={<Wind className="h-4 w-4" />}
					label="Wind"
					value={`${weather.wind.speed} ${speedUnit}`}
				/>
				<WeatherDetailItem
					icon={<Thermometer className="h-4 w-4" />}
					label="Pressure"
					value={`${weather.main.pressure} hPa`}
				/>
				<WeatherDetailItem
					icon={<Eye className="h-4 w-4" />}
					label="Visibility"
					value={`${(weather.visibility / 1000).toFixed(1)} km`}
				/>
			</div>
		</motion.div>
	);
}

function WeatherDetailItem({
	icon,
	label,
	value,
}: {
	icon: React.ReactNode;
	label: string;
	value: string;
}) {
	return (
		<div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-md">
			<div className="rounded-xl bg-white/10 p-2 text-white">{icon}</div>
			<div className="flex flex-col">
				<span className="text-xs text-white/40">{label}</span>
				<span className="text-sm font-medium text-white">{value}</span>
			</div>
		</div>
	);
}

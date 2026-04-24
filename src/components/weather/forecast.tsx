"use client";

import { motion } from "framer-motion";
import { format } from "date-fns";

import { useForecast } from "@/hooks/use-weather";
import { Skeleton } from "@/components/ui/skeleton";
import { useWeatherStore } from "@/lib/store";

export function Forecast() {
	const { forecast, isLoading } = useForecast();
	const { units } = useWeatherStore();

	if (isLoading)
		return <Skeleton className="h-48 w-full rounded-3xl bg-white/10" />;
	if (!forecast || !Array.isArray(forecast.list) || forecast.list.length === 0)
		return null;

	const tempSymbol = units === "metric" ? "°C" : "°F";

	// Get next 8 intervals (24 hours as they are 3h apart)
	const hourlyForecast = forecast.list.slice(0, 8);

	// Group by day for 5-day forecast
	const dailyForecast = forecast.list
		.filter((_, index) => index % 8 === 0)
		.slice(0, 5);

	return (
		<div className="flex flex-col gap-8">
			{/* Hourly */}
			<section>
				<h3 className="mb-4 text-sm font-medium tracking-wider text-white/50 uppercase">
					Hourly Forecast
				</h3>
				<div className="scrollbar-hide flex gap-4 overflow-x-auto pb-4">
					{hourlyForecast.map((item, i) => (
						<motion.div
							key={item.dt}
							initial={{ opacity: 0, scale: 0.9 }}
							animate={{ opacity: 1, scale: 1 }}
							transition={{ delay: i * 0.05 }}
							className="flex min-w-[80px] flex-col items-center gap-2 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-md"
						>
							<span className="text-xs text-white/60">
								{format(new Date(item.dt * 1000), "HH:mm")}
							</span>
							<img
								src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
								alt={item.weather[0].main}
								className="h-10 w-10"
							/>
							<span className="text-lg font-bold text-white">
								{Math.round(item.main.temp)}
								{tempSymbol}
							</span>
						</motion.div>
					))}
				</div>
			</section>

			{/* Daily */}
			<section>
				<h3 className="mb-4 text-sm font-medium tracking-wider text-white/50 uppercase">
					5-Day Forecast
				</h3>
				<div className="flex flex-col gap-3">
					{dailyForecast.map((item, i) => (
						<motion.div
							key={item.dt}
							initial={{ opacity: 0, x: -20 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ delay: i * 0.1 }}
							className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-md"
						>
							<span className="w-24 text-sm font-medium text-white">
								{format(new Date(item.dt * 1000), "EEEE")}
							</span>
							<div className="flex items-center gap-2">
								<img
									src={`https://openweathermap.org/img/wn/${item.weather[0].icon}.png`}
									alt={item.weather[0].main}
									className="h-8 w-8"
								/>
								<span className="text-sm text-white/70 capitalize">
									{item.weather[0].description}
								</span>
							</div>
							<div className="flex gap-4">
								<span className="text-sm font-bold text-white">
									{Math.round(item.main.temp_max)}
									{tempSymbol}
								</span>
								<span className="text-sm text-white/40">
									{Math.round(item.main.temp_min)}
									{tempSymbol}
								</span>
							</div>
						</motion.div>
					))}
				</div>
			</section>
		</div>
	);
}

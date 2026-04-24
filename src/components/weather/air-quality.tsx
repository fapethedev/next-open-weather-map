"use client";

import { motion } from "framer-motion";

import { useAirPollution } from "@/hooks/use-weather";
import { Skeleton } from "@/components/ui/skeleton";

export function AirQuality() {
	const { airPollution, isLoading } = useAirPollution();

	if (isLoading)
		return <Skeleton className="h-32 w-full rounded-3xl bg-white/10" />;
	if (!airPollution || !airPollution.list || !airPollution.list[0]) return null;

	const firstItem = airPollution.list[0];
	const aqi = firstItem.main?.aqi;
	const components = firstItem.components;

	if (aqi === undefined || !components) return null;

	const aqiMap: Record<number, { label: string; color: string }> = {
		1: { label: "Good", color: "text-emerald-400" },
		2: { label: "Fair", color: "text-yellow-400" },
		3: { label: "Moderate", color: "text-orange-400" },
		4: { label: "Poor", color: "text-red-400" },
		5: { label: "Very Poor", color: "text-purple-400" },
	};

	const { label, color } = aqiMap[aqi] || {
		label: "Unknown",
		color: "text-white",
	};

	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-md"
		>
			<div className="mb-6 flex items-center justify-between">
				<h3 className="text-sm font-medium tracking-wider text-white/50 uppercase">
					Air Quality
				</h3>
				<span className={`text-sm font-bold ${color}`}>{label}</span>
			</div>

			<div className="grid grid-cols-2 gap-6 md:grid-cols-4">
				<AQIItem label="PM2.5" value={components.pm2_5.toFixed(1)} />
				<AQIItem label="PM10" value={components.pm10.toFixed(1)} />
				<AQIItem label="SO2" value={components.so2.toFixed(1)} />
				<AQIItem label="NO2" value={components.no2.toFixed(1)} />
			</div>

			<div className="mt-6 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
				<motion.div
					initial={{ width: 0 }}
					animate={{ width: `${(aqi / 5) * 100}%` }}
					className={`h-full bg-linear-to-r from-emerald-400 to-purple-400`}
				/>
			</div>
		</motion.div>
	);
}

function AQIItem({ label, value }: { label: string; value: string }) {
	return (
		<div className="flex flex-col">
			<span className="mb-1 text-xs text-white/40">{label}</span>
			<span className="text-lg font-bold text-white">{value}</span>
		</div>
	);
}

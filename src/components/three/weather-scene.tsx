"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";

import { Atmosphere } from "./atmosphere";
import { useWeather } from "@/hooks/use-weather";

export function WeatherScene() {
	const { weather, isLoading } = useWeather();

	const weatherMain = weather?.weather?.[0]?.main || "Clear";
	const isDay = weather?.sys
		? weather.dt > weather.sys.sunrise && weather.dt < weather.sys.sunset
		: true;

	return (
		<div className="fixed inset-0 -z-10 bg-slate-950">
			<Canvas shadows camera={{ position: [0, 5, 15], fov: 45 }}>
				<Suspense fallback={null}>
					{!isLoading && <Atmosphere weatherMain={weatherMain} isDay={isDay} />}
				</Suspense>
			</Canvas>

			<div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-slate-950/50" />
		</div>
	);
}

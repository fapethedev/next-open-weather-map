import { create } from "zustand";
import { persist } from "zustand/middleware";

interface WeatherState {
	lat: number;
	lon: number;
	city: string;
	units: "metric" | "imperial";
	setLocation: (lat: number, lon: number, city: string) => void;
	setUnits: (units: "metric" | "imperial") => void;
}

export const useWeatherStore = create<WeatherState>()(
	persist(
		(set) => ({
			lat: 48.8566, // Paris default
			lon: 2.3522,
			city: "Paris",
			units: "metric",
			setLocation: (lat, lon, city) => set({ lat, lon, city }),
			setUnits: (units) => set({ units }),
		}),
		{
			name: "weather-storage",
		},
	),
);

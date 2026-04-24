import useSWR from "swr";

import { useWeatherStore } from "@/lib/store";
import {
	WeatherData,
	ForecastData,
	AirPollutionData,
	GeocodingData,
} from "@/lib/api/types";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function useWeather() {
	const { lat, lon, units } = useWeatherStore();
	const { data, error, isLoading } = useSWR<WeatherData>(
		`/api/weather?lat=${lat}&lon=${lon}&units=${units}&type=weather`,
		fetcher,
	);

	return { weather: data, error, isLoading };
}

export function useForecast() {
	const { lat, lon, units } = useWeatherStore();
	const { data, error, isLoading } = useSWR<ForecastData>(
		`/api/weather?lat=${lat}&lon=${lon}&units=${units}&type=forecast`,
		fetcher,
	);

	return { forecast: data, error, isLoading };
}

export function useAirPollution() {
	const { lat, lon } = useWeatherStore();
	const { data, error, isLoading } = useSWR<AirPollutionData>(
		`/api/weather?lat=${lat}&lon=${lon}&type=air_pollution`,
		fetcher,
	);

	return { airPollution: data, error, isLoading };
}

export function useLocationSearch(query: string) {
	const { data, error, isLoading } = useSWR<GeocodingData[]>(
		query ? `/api/geocode?q=${query}` : null,
		fetcher,
	);

	return { locations: data, error, isLoading };
}

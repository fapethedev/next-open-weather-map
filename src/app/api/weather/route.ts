import { NextRequest, NextResponse } from "next/server";

const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5";

export async function GET(request: NextRequest) {
	const { searchParams } = new URL(request.url);
	const lat = searchParams.get("lat");
	const lon = searchParams.get("lon");
	const type = searchParams.get("type") || "weather"; // weather, forecast, air_pollution
	const units = searchParams.get("units") || "metric";

	if (!API_KEY) {
		return NextResponse.json(
			{ error: "API Key not configured" },
			{ status: 500 },
		);
	}

	if (!lat || !lon) {
		return NextResponse.json({ error: "Missing coordinates" }, { status: 400 });
	}

	let url = "";
	switch (type) {
		case "forecast":
			url = `${BASE_URL}/forecast?lat=${lat}&lon=${lon}&units=${units}&appid=${API_KEY}`;
			break;
		case "air_pollution":
			url = `${BASE_URL}/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`;
			break;
		default:
			url = `${BASE_URL}/weather?lat=${lat}&lon=${lon}&units=${units}&appid=${API_KEY}`;
	}

	try {
		const response = await fetch(url, {
			next: { revalidate: 300 }, // Cache for 5 minutes (respects free tier)
		});

		if (!response.ok) {
			throw new Error(`Weather API responded with status: ${response.status}`);
		}

		const data = await response.json();
		return NextResponse.json(data);
	} catch (error) {
		console.error("Weather API Error:", error);
		return NextResponse.json(
			{ error: "Failed to fetch weather data" },
			{ status: 500 },
		);
	}
}

import { NextRequest, NextResponse } from "next/server";

const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
const BASE_URL = "https://api.openweathermap.org/geo/1.0";

export async function GET(request: NextRequest) {
	const { searchParams } = new URL(request.url);
	const q = searchParams.get("q");

	if (!API_KEY) {
		return NextResponse.json(
			{ error: "API Key not configured" },
			{ status: 500 },
		);
	}

	if (!q) {
		return NextResponse.json({ error: "Missing query" }, { status: 400 });
	}

	try {
		const url = `${BASE_URL}/direct?q=${encodeURIComponent(q)}&limit=5&appid=${API_KEY}`;
		const response = await fetch(url, {
			next: { revalidate: 86400 }, // Cache geocoding for 24 hours
		});

		if (!response.ok) {
			throw new Error(
				`Geocoding API responded with status: ${response.status}`,
			);
		}

		const data = await response.json();
		return NextResponse.json(data);
	} catch (error) {
		console.error("Geocoding API Error:", error);
		return NextResponse.json(
			{ error: "Failed to fetch location data" },
			{ status: 500 },
		);
	}
}

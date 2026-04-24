"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Stars, Cloud, Sky, Float } from "@react-three/drei";
import * as THREE from "three";

interface AtmosphereProps {
	weatherMain?: string;
	isDay?: boolean;
}

export function Atmosphere({
	weatherMain = "Clear",
	isDay = true,
}: AtmosphereProps) {
	const rainRef = useRef<THREE.Points>(null);

	const rainParticles = useMemo(() => {
		const count = 1500;
		const positions = new Float32Array(count * 3);
		for (let i = 0; i < count; i++) {
			positions[i * 3] = (Math.random() - 0.5) * 20;
			positions[i * 3 + 1] = Math.random() * 20;
			positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
		}
		return positions;
	}, []);

	useFrame((state, delta) => {
		if (
			rainRef.current &&
			(weatherMain === "Rain" || weatherMain === "Drizzle")
		) {
			const positions = rainRef.current.geometry.attributes.position
				.array as Float32Array;
			for (let i = 0; i < positions.length; i += 3) {
				positions[i + 1] -= delta * 15;
				if (positions[i + 1] < 0) positions[i + 1] = 20;
			}
			rainRef.current.geometry.attributes.position.needsUpdate = true;
		}
	});

	return (
		<>
			<Sky
				distance={450000}
				sunPosition={isDay ? [100, 20, 100] : [0, -20, 0]}
				inclination={0}
				azimuth={0.25}
			/>

			{!isDay && (
				<Stars
					radius={100}
					depth={50}
					count={5000}
					factor={4}
					saturation={0}
					fade
					speed={1}
				/>
			)}

			<ambientLight intensity={isDay ? 0.5 : 0.1} />
			<directionalLight position={[10, 10, 5]} intensity={isDay ? 1 : 0.2} />

			{/* Volumetric Clouds */}
			<Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
				<Cloud
					opacity={weatherMain === "Clouds" ? 0.8 : 0.2}
					speed={0.4} // Rotation speed
					segments={20} // Number of spheres
				/>
			</Float>

			{/* Rain Effect */}
			{(weatherMain === "Rain" || weatherMain === "Drizzle") && (
				<points ref={rainRef}>
					<bufferGeometry>
						<bufferAttribute
							attach="attributes-position"
							count={rainParticles.length / 3}
							array={rainParticles}
							itemSize={3}
							args={[rainParticles, 3]}
						/>
					</bufferGeometry>
					<pointsMaterial color="#aaf" size={0.05} transparent opacity={0.6} />
				</points>
			)}

			{/* Fog for Atmosphere */}
			<fog attach="fog" args={["#1e293b", 10, 25]} />
		</>
	);
}

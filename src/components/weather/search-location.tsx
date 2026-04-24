"use client";

import { useEffect, useState } from "react";
import { Check, ChevronsUpDown, Loader2, MapPin } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger, } from "@/components/ui/popover";
import { useLocationSearch } from "@/hooks/use-weather";
import { useWeatherStore } from "@/lib/store";

export function SearchLocation() {
	const [open, setOpen] = useState(false);
	const [query, setQuery] = useState("");
	const [debouncedQuery, setDebouncedQuery] = useState("");
	const { locations, isLoading } = useLocationSearch(debouncedQuery);
	const { setLocation, city } = useWeatherStore();

	useEffect(() => {
		const timer = setTimeout(() => setDebouncedQuery(query), 500);
		return () => clearTimeout(timer);
	}, [query]);

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button
					variant="outline"
					role="combobox"
					aria-expanded={open}
					className="w-full justify-between border-white/20 bg-white/10 text-white backdrop-blur-md hover:bg-white/20 hover:text-white"
				>
					<div className="flex items-center gap-2">
						<MapPin className="h-4 w-4" />
						{city || "Search city..."}
					</div>
					<ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-75 border-slate-800 bg-slate-900 p-0">
				<Command className="bg-transparent">
					<CommandInput
						placeholder="Search city..."
						value={query}
						onValueChange={setQuery}
						className="text-white"
					/>
					<CommandList>
						{isLoading && (
							<div className="flex items-center justify-center p-4">
								<Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
							</div>
						)}
						<CommandEmpty className="p-4 text-slate-400">
							No city found.
						</CommandEmpty>
						<CommandGroup>
							{Array.isArray(locations) &&
								locations.map((loc) => (
									<CommandItem
										key={`${loc.lat}-${loc.lon}`}
										value={`${loc.name}, ${loc.country}`}
										onSelect={() => {
											setLocation(loc.lat, loc.lon, loc.name);
											setOpen(false);
										}}
										className="cursor-pointer text-white hover:bg-white/10"
									>
										<Check
											className={cn(
												"mr-2 h-4 w-4",
												city === loc.name ? "opacity-100" : "opacity-0",
											)}
										/>
										{loc.name}, {loc.state ? `${loc.state}, ` : ""}
										{loc.country}
									</CommandItem>
								))}
						</CommandGroup>
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	);
}

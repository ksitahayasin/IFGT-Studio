import type { Game, NewsItem } from "@/types";
export const games: Game[] = [
  { slug: "echoframe", title: "ECHOFRAME", genre: "Tactical Action", platform: "PC · Console", description: "A precision co-op experience set inside a city that remembers every choice.", visual: "from-blue-950 via-slate-900 to-cyan-500", status: "In development" },
  { slug: "vanta", title: "VANTA", genre: "Open-world RPG", platform: "PC · Console", description: "Step beyond the final frontier in a living universe shaped by players.", visual: "from-fuchsia-950 via-indigo-950 to-blue-500", status: "Announced" },
  { slug: "kinetic", title: "KINETIC", genre: "Competitive Arena", platform: "PC", description: "Fast minds. Infinite momentum. A new generation of competitive play.", visual: "from-amber-950 via-orange-950 to-rose-500", status: "Season one" }
];
export const news: NewsItem[] = [
  { slug: "building-the-studio-we-wanted-to-join", category: "Studio", date: "June 18, 2026", title: "Building the studio we wanted to join", description: "A note from our founders on the first chapter of IFGT.", visual: "from-blue-700 to-slate-950" },
  { slug: "inside-echoframe-an-audio-first-world", category: "EchoFrame", date: "May 29, 2026", title: "Inside EchoFrame: an audio-first world", description: "How our sound team gives every decision a lasting echo.", visual: "from-cyan-700 to-indigo-950" },
  { slug: "meet-the-builders-behind-vanta", category: "People", date: "May 08, 2026", title: "Meet the builders behind Vanta", description: "The team mapping an entire universe, one impossible detail at a time.", visual: "from-violet-700 to-slate-950" }
];
export const values = ["Play with purpose", "Invent with courage", "Build together", "Leave worlds better"];

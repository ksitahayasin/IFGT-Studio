import { GamesContent } from "@/components/pages/GamesContent";
import { getPageMetadata } from "@/lib/metadata";

export const metadata = getPageMetadata(
  "Games",
  "Explore our games. Worlds in motion. Our games are built around one question: what could players feel here that they cannot feel anywhere else?",
  "/games"
);

export default function GamesPage() {
  return <main><GamesContent /></main>;
}

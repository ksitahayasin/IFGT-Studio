import { Hero } from "@/components/home/Hero";
import { Announcements, FeaturedGames, JoinUs, LatestNews, StudioStatement } from "@/components/home/HomeSections";
import { getPageMetadata } from "@/lib/metadata";

export const metadata = getPageMetadata(
  "Home",
  "Independent Future Game Technologies. We create worlds that move people.",
  "/"
);

export default function Home() {
  return (
    <main>
      <Hero />
      <FeaturedGames />
      <StudioStatement />
      <LatestNews />
      <Announcements />
      <JoinUs />
    </main>
  );
}

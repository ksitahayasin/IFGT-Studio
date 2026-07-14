"use client";

import { PageHero } from "@/components/page/PageHero";
import { Container } from "@/components/ui/Container";
import { LiveGames } from "@/components/live/LiveGames";
import { useLabels } from "@/hooks/useLabels";

export function GamesContent() {
  const { page } = useLabels();
  const labels = page.games;

  return (
    <>
      <PageHero eyebrow={labels.eyebrow} title={labels.title} copy={labels.copy} />
      <section className="py-20 sm:py-28">
        <Container>
          <LiveGames />
        </Container>
      </section>
    </>
  );
}

"use client";

import { PageHero } from "@/components/page/PageHero";
import { Container } from "@/components/ui/Container";
import { LiveNews } from "@/components/live/LiveNews";
import { useLabels } from "@/hooks/useLabels";

export function NewsContent() {
  const { page } = useLabels();
  const labels = page.news;

  return (
    <>
      <PageHero eyebrow={labels.eyebrow} title={labels.title} copy={labels.copy} />
      <section className="py-20 sm:py-28">
        <Container>
          <LiveNews />
        </Container>
      </section>
    </>
  );
}

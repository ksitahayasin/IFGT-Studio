"use client";

import { Code2, Layers3, Rocket } from "lucide-react";
import { PageHero } from "@/components/page/PageHero";
import { Container } from "@/components/ui/Container";
import { LiveDeveloperPosts } from "@/components/live/LiveDeveloperPosts";
import { useLabels } from "@/hooks/useLabels";

export function DevelopersContent() {
  const { page } = useLabels();
  const labels = page.developers;

  const pillars = [
    [Code2, labels.pillar1Title, labels.pillar1Copy],
    [Layers3, labels.pillar2Title, labels.pillar2Copy],
    [Rocket, labels.pillar3Title, labels.pillar3Copy],
  ] as const;

  return (
    <>
      <PageHero eyebrow={labels.eyebrow} title={labels.title} copy={labels.copy} />
      <section className="py-20 sm:py-28">
        <Container>
          <div className="grid gap-5 md:grid-cols-3">
            {pillars.map(([Icon, title, copy]) => (
              <article key={title} className="glass rounded-3xl p-7">
                <Icon className="text-blue-400" size={24} />
                <h2 className="mt-12 font-display text-2xl tracking-[-.04em]">{title}</h2>
                <p className="mt-3 text-sm leading-6 text-zinc-400">{copy}</p>
              </article>
            ))}
          </div>
          <div className="mt-16 rounded-3xl border border-blue-500/30 bg-blue-500/[.06] p-8 sm:p-12">
            <p className="text-xs font-bold uppercase tracking-[.2em] text-blue-400">{labels.programEyebrow}</p>
            <h2 className="mt-5 max-w-2xl font-display text-4xl tracking-[-.05em]">{labels.programTitle}</h2>
            <p className="mt-4 max-w-xl text-zinc-400">{labels.programCopy}</p>
          </div>
          <div className="mt-16">
            <LiveDeveloperPosts />
          </div>
        </Container>
      </section>
    </>
  );
}

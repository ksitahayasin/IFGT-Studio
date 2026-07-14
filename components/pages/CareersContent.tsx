"use client";

import { PageHero } from "@/components/page/PageHero";
import { Container } from "@/components/ui/Container";
import { LiveJobs } from "@/components/live/LiveJobs";
import { useLabels } from "@/hooks/useLabels";

export function CareersContent() {
  const { page } = useLabels();
  const labels = page.careers;

  return (
    <>
      <PageHero eyebrow={labels.eyebrow} title={labels.title} copy={labels.copy} />
      <section className="py-20 sm:py-28">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[.8fr_1.2fr]">
            <div>
              <p className="font-display text-3xl tracking-[-.05em]">{labels.sideTitle}</p>
              <p className="mt-5 leading-7 text-zinc-400">{labels.sideCopy}</p>
              <div className="mt-8 rounded-2xl border border-white/10 p-5 text-sm text-zinc-400">
                {labels.perk1}
                <br />
                {labels.perk2}
                <br />
                {labels.perk3}
              </div>
            </div>
            <div>
              <div className="mb-5 flex items-end justify-between">
                <h2 className="font-display text-3xl tracking-[-.05em]">{labels.openRoles}</h2>
              </div>
              <LiveJobs />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}

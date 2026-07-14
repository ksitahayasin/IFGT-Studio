"use client";

import { PageHero } from "@/components/page/PageHero";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useLabels } from "@/hooks/useLabels";

export function AboutContent() {
  const { page, values, aboutTimeline } = useLabels();
  const labels = page.about;

  return (
    <>
      <PageHero eyebrow={labels.eyebrow} title={labels.title} copy={labels.copy} />
      <section className="py-24">
        <Container>
          <div className="grid gap-14 lg:grid-cols-2">
            <SectionHeading eyebrow={labels.missionEyebrow} title={labels.missionTitle} copy={labels.missionCopy} />
            <div className="rounded-3xl bg-gradient-to-br from-blue-600 to-indigo-950 p-8 sm:p-12">
              <p className="text-sm text-blue-100">{labels.visionLabel}</p>
              <p className="mt-5 font-display text-3xl leading-tight tracking-[-.05em] sm:text-4xl">{labels.visionText}</p>
            </div>
          </div>
        </Container>
      </section>
      <section className="border-y border-white/[.08] bg-[#0a0a0a] py-24">
        <Container>
          <SectionHeading eyebrow={labels.storyEyebrow} title={labels.storyTitle} />
          <div className="mt-14 border-l border-white/10">
            {aboutTimeline.map(([year, copy]) => (
              <div key={year} className="grid gap-3 border-b border-white/[.08] py-8 pl-7 sm:grid-cols-[120px_1fr]">
                <span className="font-display text-2xl text-blue-400">{year}</span>
                <p className="max-w-xl text-zinc-400">{copy}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>
      <section className="py-24">
        <Container>
          <SectionHeading eyebrow={labels.valuesEyebrow} title={labels.valuesTitle} />
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value, i) => (
              <div key={value} className="glass rounded-2xl p-6">
                <span className="text-sm text-blue-400">0{i + 1}</span>
                <p className="mt-10 font-display text-xl">{value}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}

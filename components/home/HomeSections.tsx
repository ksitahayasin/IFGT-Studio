"use client";

import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { LiveGames } from "@/components/live/LiveGames";
import { LiveNews } from "@/components/live/LiveNews";
import { LiveAnnouncements } from "@/components/live/LiveAnnouncements";
import { useLocale } from "@/hooks/useLocale";
import { homeSectionLabels, studioValues } from "@/lib/i18n";

export function FeaturedGames() {
  const locale = useLocale();
  const labels = homeSectionLabels[locale];

  return (
    <section className="py-24 sm:py-32">
      <Container>
        <div className="flex items-end justify-between gap-6">
          <SectionHeading
            eyebrow={labels.featuredEyebrow}
            title={labels.featuredTitle}
            copy={labels.featuredCopy}
          />
          <Link href="/games" className="hidden items-center gap-1 text-sm text-zinc-300 sm:flex">
            {labels.allGames} <ArrowUpRight size={15} />
          </Link>
        </div>
        <div className="mt-12">
          <LiveGames />
        </div>
      </Container>
    </section>
  );
}

export function StudioStatement() {
  const locale = useLocale();
  const labels = homeSectionLabels[locale];
  const values = studioValues[locale];

  return (
    <section className="relative overflow-hidden border-y border-white/[.08] bg-[#0a0a0a] py-24 sm:py-32">
      <div className="absolute right-0 top-0 h-full w-1/2 bg-blue-600/[.06] blur-3xl" />
      <Container className="relative">
        <div className="grid gap-16 lg:grid-cols-[1.1fr_.9fr]">
          <SectionHeading
            eyebrow={labels.studioEyebrow}
            title={labels.studioTitle}
            copy={labels.studioCopy}
          />
          <div className="grid gap-4 sm:grid-cols-2">
            {values.map((value, i) => (
              <div key={value} className="glass rounded-2xl p-6">
                <span className="mb-10 flex h-8 w-8 items-center justify-center rounded-full bg-blue-500/15 text-xs text-blue-300">
                  0{i + 1}
                </span>
                <p className="font-display text-xl tracking-[-.04em]">{value}</p>
                <Check className="mt-4 text-blue-400" size={18} />
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

export function LatestNews() {
  const locale = useLocale();
  const labels = homeSectionLabels[locale];

  return (
    <section className="py-24 sm:py-32">
      <Container>
        <div className="flex items-end justify-between">
          <SectionHeading eyebrow={labels.newsEyebrow} title={labels.newsTitle} />
          <Link href="/news" className="hidden items-center gap-1 text-sm text-zinc-300 sm:flex">
            {labels.viewNewsroom} <ArrowUpRight size={15} />
          </Link>
        </div>
        <div className="mt-12">
          <LiveNews />
        </div>
      </Container>
    </section>
  );
}

export function Announcements() {
  const locale = useLocale();
  const labels = homeSectionLabels[locale];

  return (
    <section className="py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow={labels.announcementsEyebrow}
          title={labels.announcementsTitle}
          copy={labels.announcementsCopy}
        />
        <div className="mt-10">
          <LiveAnnouncements />
        </div>
      </Container>
    </section>
  );
}

export function JoinUs() {
  const locale = useLocale();
  const labels = homeSectionLabels[locale];

  return (
    <section className="pb-24 sm:pb-32">
      <Container>
        <div className="relative overflow-hidden rounded-[2rem] bg-blue-600 px-7 py-14 sm:px-14 sm:py-20">
          <div className="absolute -right-20 -top-28 h-96 w-96 rounded-full border-[40px] border-white/10" />
          <div className="relative max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[.2em] text-blue-100">{labels.joinEyebrow}</p>
            <h2 className="mt-5 font-display text-4xl font-medium tracking-[-.05em] sm:text-6xl">
              {labels.joinTitle}
            </h2>
            <Link href="/careers" className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-bold text-blue-700">
              {labels.joinCta} <ArrowUpRight size={16} />
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}

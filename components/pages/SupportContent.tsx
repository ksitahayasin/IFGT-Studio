"use client";

import { ChevronRight, MessageCircle, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { PageHero } from "@/components/page/PageHero";
import { Container } from "@/components/ui/Container";
import { useLabels } from "@/hooks/useLabels";

export function SupportContent() {
  const { page } = useLabels();
  const labels = page.support;

  const topics = [
    { title: labels.topic1, href: "/id" },
    { title: labels.topic2, href: "/contact" },
    { title: labels.topic3, href: "/contact" },
    { title: labels.topic4, href: "/contact" },
  ];

  return (
    <>
      <PageHero eyebrow={labels.eyebrow} title={labels.title} copy={labels.copy} />
      <section className="py-20 sm:py-28">
        <Container>
          <div className="mx-auto grid max-w-4xl gap-4 sm:grid-cols-2">
            {topics.map((topic, i) => (
              <Link
                key={topic.title}
                href={topic.href}
                className="group flex items-center justify-between rounded-2xl border border-white/10 bg-white/[.025] p-6 transition hover:border-blue-500/60 hover:bg-blue-500/[.06]"
              >
                <div>
                  <span className="text-sm text-blue-400">0{i + 1}</span>
                  <h2 className="mt-5 font-display text-xl">{topic.title}</h2>
                </div>
                <ChevronRight className="text-zinc-600 transition group-hover:translate-x-1 group-hover:text-white" />
              </Link>
            ))}
          </div>
          <div className="mx-auto mt-14 grid max-w-4xl gap-4 sm:grid-cols-2">
            <div className="rounded-2xl bg-blue-600 p-7">
              <ShieldCheck />
              <h3 className="mt-7 font-display text-2xl">{labels.safeTitle}</h3>
              <p className="mt-2 text-sm text-blue-100">{labels.safeCopy}</p>
            </div>
            <div className="rounded-2xl border border-white/10 p-7">
              <MessageCircle />
              <h3 className="mt-7 font-display text-2xl">{labels.humanTitle}</h3>
              <p className="mt-2 text-sm text-zinc-500">{labels.humanCopy}</p>
              <Link href="/contact" className="mt-4 inline-flex text-sm text-blue-400 hover:text-blue-300">
                hello@ifgt.studio →
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}

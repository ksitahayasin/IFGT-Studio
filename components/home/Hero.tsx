"use client";
import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { useLocale } from "@/hooks/useLocale";
import { heroLabels } from "@/lib/i18n";

export function Hero() {
  const locale = useLocale();
  const labels = heroLabels[locale];

  return (
    <section className="relative flex min-h-[820px] items-end overflow-hidden pt-20">
      <div className="absolute inset-0 grid-bg opacity-20" />
      <div className="absolute left-[10%] top-[10%] h-[35rem] w-[35rem] rounded-full bg-blue-600/20 blur-[140px]" />
      <div className="absolute right-[-15%] top-[20%] h-[30rem] w-[30rem] rounded-full bg-indigo-500/20 blur-[140px]" />
      <div className="absolute inset-0 noise opacity-20" />
      <Container className="relative z-10 pb-20 sm:pb-28">
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="mb-7 text-xs font-bold uppercase tracking-[.3em] text-blue-400">
          {labels.eyebrow}
        </motion.p>
        <motion.h1 initial={{ opacity: 0, y: 35 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="font-display text-[20vw] font-medium leading-[.72] tracking-[-.1em] sm:text-[13vw]">
          {labels.headline}
          <span className="text-blue-500">.</span>
        </motion.h1>
        <motion.div initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35, duration: 0.6 }} className="mt-16 flex flex-col justify-between gap-10 md:flex-row md:items-end">
          <div>
            <p className="font-display text-4xl font-medium leading-tight tracking-[-.05em] sm:text-5xl">
              {labels.line1}
              <br />
              {labels.line2}
              <br />
              <span className="text-zinc-500">{labels.line3}</span>
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="/games">{labels.exploreGames}</Button>
              <Button href="/about" variant="secondary">{labels.learnMore}</Button>
            </div>
          </div>
          <p className="max-w-xs border-l border-white/15 pl-5 text-sm leading-6 text-zinc-400">{labels.description}</p>
        </motion.div>
        <div className="absolute bottom-6 right-5 hidden items-center gap-2 text-xs text-zinc-500 sm:flex">
          <ArrowDown size={14} />
          {labels.scroll}
        </div>
      </Container>
    </section>
  );
}

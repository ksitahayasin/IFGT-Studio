"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import type { NewsItem } from "@/types";
import { useLocale } from "@/hooks/useLocale";
import { uiLabels } from "@/lib/i18n";

export function NewsCard({ item, index = 0 }: { item: NewsItem; index?: number }) {
  const locale = useLocale();
  const ui = uiLabels[locale];

  return (
    <motion.article
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.12 }}
      whileHover={{ y: -5 }}
      className="group"
    >
      <Link href={`/news/${item.slug}`}>
        <div className={`relative mb-5 aspect-[16/10] overflow-hidden rounded-2xl bg-gradient-to-br ${item.visual}`}>
          <div className="absolute inset-0 noise opacity-30" />
          <div className="absolute bottom-0 left-0 h-1 w-0 bg-blue-400 transition-all duration-500 group-hover:w-full" />
        </div>
        <div className="flex gap-3 text-[11px] font-bold uppercase tracking-widest text-blue-400">
          <span>{item.category}</span>
          <span className="text-zinc-600">{item.date}</span>
        </div>
        <h3 className="mt-3 font-display text-2xl font-medium tracking-[-.04em]">{item.title}</h3>
        <p className="mt-2 text-sm leading-6 text-zinc-500">{item.description}</p>
        <span className="mt-4 flex items-center gap-1 text-sm text-zinc-300">
          {ui.readStory} <ArrowUpRight size={15} />
        </span>
      </Link>
    </motion.article>
  );
}

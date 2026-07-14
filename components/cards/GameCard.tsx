"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import type { Game } from "@/types";
import { useLocale } from "@/hooks/useLocale";
import { uiLabels } from "@/lib/i18n";

export function GameCard({ game, index = 0 }: { game: Game; index?: number }) {
  const locale = useLocale();
  const ui = uiLabels[locale];
  const slug = game.slug || game.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.12, duration: 0.55 }}
      whileHover={{ y: -8 }}
      className="group overflow-hidden rounded-[1.5rem] border border-white/10 bg-[#111] shadow-2xl"
    >
      <div className={`relative aspect-[4/3] overflow-hidden bg-gradient-to-br ${game.visual}`}>
        {game.imageUrl && (
          <Image src={game.imageUrl} alt="" fill className="object-cover" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
        )}
        <div className="absolute inset-0 opacity-30 noise" />
        <div className="absolute -right-12 top-6 h-44 w-44 rounded-full border border-white/30" />
        {game.status && (
          <div className="absolute bottom-5 left-5 rounded-full border border-white/15 bg-black/25 px-3 py-1 text-[10px] font-bold uppercase tracking-widest backdrop-blur">
            {game.status}
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/65 to-transparent" />
        <p className="absolute bottom-5 left-5 font-display text-3xl font-semibold tracking-[-.06em]">{game.title}</p>
      </div>
      <div className="p-6">
        <div className="flex justify-between gap-4 text-xs uppercase tracking-widest text-zinc-500">
          <span>{game.genre}</span>
          <span>{game.platform}</span>
        </div>
        <p className="mt-4 min-h-12 text-sm leading-6 text-zinc-400">{game.description}</p>
        <Link href={`/games/${slug}`} className="mt-6 flex items-center gap-1 text-sm font-medium text-white">
          {ui.discover} <ArrowUpRight size={16} className="transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
        </Link>
      </div>
    </motion.article>
  );
}

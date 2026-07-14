"use client";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Logo } from "@/components/ui/Logo";
import { navLabels } from "@/lib/i18n";
import { useLocale, useSetLocale } from "@/hooks/useLocale";

const menuKeys = ["games", "news", "developers", "careers", "support", "about", "contact"] as const;

export function Navbar() {
  const locale = useLocale();
  const setLocale = useSetLocale();
  const [open, setOpen] = useState(false);

  const labels = navLabels[locale];
  const links = menuKeys.map((key) => ({
    href: `/${key}`,
    label: labels[key],
  }));

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/[.07] bg-[#050505]/70 backdrop-blur-xl">
      <nav className="mx-auto flex h-20 max-w-[1440px] items-center justify-between px-5 sm:px-8 lg:px-12">
        <Link href="/" className="flex items-center">
          <Logo width={216} height={108} />
        </Link>
        <div className="hidden items-center gap-7 lg:flex">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="text-sm text-zinc-400 transition hover:text-white">
              {l.label}
            </Link>
          ))}
        </div>
        <div className="hidden items-center gap-2 lg:flex">
          <button
            onClick={() => setLocale("tr")}
            className={`rounded-full px-3 py-1.5 text-xs ${locale === "tr" ? "bg-white text-black" : "border border-white/10 text-zinc-400"}`}
          >
            TR
          </button>
          <button
            onClick={() => setLocale("en")}
            className={`rounded-full px-3 py-1.5 text-xs ${locale === "en" ? "bg-white text-black" : "border border-white/10 text-zinc-400"}`}
          >
            EN
          </button>
        </div>
        <Link href="/id" className="hidden rounded-full bg-white px-4 py-2 text-xs font-bold text-black sm:block">
          IFGT ID
        </Link>
        <button className="lg:hidden" aria-label="Toggle navigation" onClick={() => setOpen(!open)}>
          {open ? <X /> : <Menu />}
        </button>
      </nav>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden border-t border-white/10 bg-[#090909] lg:hidden">
            <div className="flex flex-col px-5 py-5">
              {links.map((l) => (
                <Link onClick={() => setOpen(false)} key={l.href} href={l.href} className="py-3 text-lg text-zinc-300">
                  {l.label}
                </Link>
              ))}
              <div className="mt-4 flex gap-2">
                <button onClick={() => setLocale("tr")} className="rounded-full border border-white/10 px-3 py-1.5 text-sm text-white">TR</button>
                <button onClick={() => setLocale("en")} className="rounded-full border border-white/10 px-3 py-1.5 text-sm text-white">EN</button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

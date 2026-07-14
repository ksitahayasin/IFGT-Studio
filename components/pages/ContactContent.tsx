"use client";

import { useState } from "react";
import { Mail, MapPin } from "lucide-react";
import { PageHero } from "@/components/page/PageHero";
import { Container } from "@/components/ui/Container";
import { useLabels } from "@/hooks/useLabels";

export function ContactContent() {
  const { page } = useLabels();
  const labels = page.contact;
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const name = (form.elements.namedItem("name") as HTMLInputElement).value;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const subject = (form.elements.namedItem("subject") as HTMLInputElement).value;
    const message = (form.elements.namedItem("message") as HTMLTextAreaElement).value;
    const body = `From: ${name} (${email})\n\n${message}`;
    window.location.href = `mailto:hello@ifgt.studio?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  }

  return (
    <>
      <PageHero eyebrow={labels.eyebrow} title={labels.title} copy={labels.copy} />
      <section className="py-20 sm:py-28">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[.75fr_1.25fr]">
            <div className="space-y-8">
              <div>
                <Mail className="text-blue-400" />
                <p className="mt-3 text-sm text-zinc-500">{labels.generalInquiries}</p>
                <a href="mailto:hello@ifgt.studio" className="font-display text-xl">
                  hello@ifgt.studio
                </a>
              </div>
              <div>
                <MapPin className="text-blue-400" />
                <p className="mt-3 text-sm text-zinc-500">{labels.studio}</p>
                <p className="font-display text-xl">Istanbul, Türkiye</p>
              </div>
            </div>
            <form onSubmit={handleSubmit} className="glass grid gap-5 rounded-3xl p-6 sm:grid-cols-2 sm:p-9">
              <label className="text-sm text-zinc-400">
                {labels.name}
                <input name="name" required className="mt-2 w-full border-b border-white/15 bg-transparent py-3 text-white outline-none focus:border-blue-500" placeholder={labels.namePlaceholder} />
              </label>
              <label className="text-sm text-zinc-400">
                {labels.email}
                <input name="email" required type="email" className="mt-2 w-full border-b border-white/15 bg-transparent py-3 text-white outline-none focus:border-blue-500" placeholder={labels.emailPlaceholder} />
              </label>
              <label className="text-sm text-zinc-400 sm:col-span-2">
                {labels.subject}
                <input name="subject" required className="mt-2 w-full border-b border-white/15 bg-transparent py-3 text-white outline-none focus:border-blue-500" placeholder={labels.subjectPlaceholder} />
              </label>
              <label className="text-sm text-zinc-400 sm:col-span-2">
                {labels.message}
                <textarea name="message" required rows={4} className="mt-2 w-full resize-none border-b border-white/15 bg-transparent py-3 text-white outline-none focus:border-blue-500" placeholder={labels.messagePlaceholder} />
              </label>
              {sent && <p className="text-sm text-blue-300 sm:col-span-2">{labels.sent}</p>}
              <button type="submit" className="w-fit rounded-full bg-blue-600 px-5 py-3 text-sm font-bold transition hover:bg-blue-500 sm:col-span-2">
                {labels.send}
              </button>
            </form>
          </div>
        </Container>
      </section>
    </>
  );
}

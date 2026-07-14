"use client";

import { useLocale } from "@/hooks/useLocale";
import {
  aboutTimeline,
  authLabels,
  footerLabels,
  heroLabels,
  homeSectionLabels,
  idLabels,
  navLabels,
  notFoundLabels,
  pageLabels,
  studioValues,
  uiLabels,
} from "@/lib/i18n";

export function useLabels() {
  const locale = useLocale();
  return {
    locale,
    nav: navLabels[locale],
    hero: heroLabels[locale],
    home: homeSectionLabels[locale],
    ui: uiLabels[locale],
    footer: footerLabels[locale],
    page: pageLabels[locale],
    auth: authLabels[locale],
    id: idLabels[locale],
    notFound: notFoundLabels[locale],
    values: studioValues[locale],
    aboutTimeline: aboutTimeline[locale],
  };
}

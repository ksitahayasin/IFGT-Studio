"use client";

import { useLocaleContext } from "@/components/providers/LocaleProvider";

export function useLocale() {
  return useLocaleContext().locale;
}

export function useSetLocale() {
  return useLocaleContext().setLocale;
}

"use client";

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { detectLocaleFromAcceptLanguage, type Locale } from "@/lib/i18n";

const STORAGE_KEY = "ifgt-locale";

const LocaleContext = createContext<{
  locale: Locale;
  setLocale: (locale: Locale) => void;
}>({
  locale: "en",
  setLocale: () => undefined,
});

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>("en");

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    const fallback = detectLocaleFromAcceptLanguage(
      `${navigator.language},${navigator.languages?.join(",") ?? ""}`
    );

    const nextLocale = stored === "tr" || stored === "en" ? stored : fallback;
    setLocale(nextLocale);
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale;
    window.localStorage.setItem(STORAGE_KEY, locale);
  }, [locale]);

  const value = useMemo(() => ({ locale, setLocale }), [locale]);

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocaleContext() {
  return useContext(LocaleContext);
}

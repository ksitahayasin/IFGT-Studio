"use client";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useLocale } from "@/hooks/useLocale";

type SiteSetting = {
  id: string;
  key: string;
  value: string;
  value_tr?: string;
  value_en?: string;
};

// Fallback settings if supabase returns empty
const fallbackSettings: Record<string, { tr: string; en: string }> = {
  "footer.tagline": {
    tr: "Bağımsız Gelecek Oyun Teknolojileri. Önemsenmeye değer deneyimler üretiyoruz.",
    en: "Independent Future Game Technologies. We make experiences worth caring about."
  },
  "footer.explore": { tr: "Keşfet", en: "Explore" },
  "footer.connect": { tr: "Bağlan", en: "Connect" },
  "footer.say_hello": { tr: "Merhaba De", en: "Say Hello" },
  "footer.rights": { tr: "© 2026 IFGT Studio. Tüm hakları saklıdır.", en: "© 2026 IFGT Studio. All rights reserved." },
  "footer.privacy": { tr: "Gizlilik", en: "Privacy" },
  "footer.terms": { tr: "Şartlar", en: "Terms" },
  "footer.accessibility": { tr: "Erişilebilirlik", en: "Accessibility" }
};

export function useSiteSettings() {
  const locale = useLocale();
  const [settings, setSettings] = useState<SiteSetting[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase.from("site_settings").select("*");
      setSettings(data ?? []);
      setLoading(false);
    };
    load();
  }, []);

  const getSetting = (key: string): string => {
    const setting = settings.find((s) => s.key === key);
    if (setting) {
      const value = locale === "tr" ? setting.value_tr : setting.value_en;
      if (value) return value;
      return setting.value;
    }
    return fallbackSettings[key]?.[locale as "tr" | "en"] ?? fallbackSettings[key]?.en ?? "";
  };

  return { settings, getSetting, loading };
}

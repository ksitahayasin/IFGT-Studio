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
    tr: "Sevdiğin oyunları yapıyoruz.",
    en: "We make games you'll love."
  },
  "hero.backgroundImage": {
    tr: "",
    en: ""
  },
  "hero.backgroundVideo": {
    tr: "",
    en: ""
  },
  "hero.gallery": {
    tr: "",
    en: ""
  },
  "footer.explore": { tr: "Keşfet", en: "Explore" },
  "footer.connect": { tr: "Bağlan", en: "Connect" },
  "footer.say_hello": { tr: "Merhaba De", en: "Say Hello" },
  "footer.rights": { tr: "© 2026 IFGT Studio. Tüm hakları saklıdır.", en: "© 2026 IFGT Studio. All rights reserved." },
  "footer.privacy": { tr: "Gizlilik", en: "Privacy" },
  "footer.terms": { tr: "Şartlar", en: "Terms" },
  "footer.accessibility": { tr: "Erişilebilirlik", en: "Accessibility" },
  "social.instagram": { tr: "https://instagram.com", en: "https://instagram.com" },
  "social.linkedin": { tr: "https://linkedin.com", en: "https://linkedin.com" },
  "social.youtube": { tr: "https://youtube.com", en: "https://youtube.com" }
};

export function useSiteSettings() {
  const locale = useLocale();
  const [settings, setSettings] = useState<SiteSetting[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    const load = async () => {
      if (!supabase) {
        setLoading(false);
        return;
      }
      const { data, error } = await supabase.from("site_settings").select("*");
      console.log("useSiteSettings Debug - data:", data);
      console.log("useSiteSettings Debug - error:", error);
      setSettings((data as SiteSetting[]) ?? []);
      setLoading(false);
    };
    load();
  }, []);

  const getSetting = (key: string): string => {
    if (loading) return ""; // Don't return fallback while loading
    const setting = settings.find((s) => s.key === key);
    console.log("getSetting Debug - key:", key, "setting:", setting);
    if (setting) {
      const value = locale === "tr" ? setting.value_tr : setting.value_en;
      if (value) return value;
      return setting.value;
    }
    const fallback = fallbackSettings[key]?.[locale as "tr" | "en"] ?? fallbackSettings[key]?.en ?? "";
    console.log("getSetting Debug - using fallback for key:", key, "fallback:", fallback);
    return fallback;
  };

  return { settings, getSetting, loading };
}

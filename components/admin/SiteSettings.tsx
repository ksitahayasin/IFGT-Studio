"use client";
import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, Eye, EyeOff } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { useLocale } from "@/hooks/useLocale";

type SiteSetting = {
  id: string;
  key: string;
  value: string;
  value_tr?: string;
  value_en?: string;
};

export function SiteSettings() {
  const locale = useLocale();
  const [settings, setSettings] = useState<SiteSetting[]>([]);
  const [message, setMessage] = useState("");
  const [editingKey, setEditingKey] = useState<string | null>(null);
  const supabase = createClient();

  const loadSettings = async () => {
    const { data } = await supabase.from("site_settings").select("*");
    setSettings(data ?? []);
  };

  useEffect(() => {
    loadSettings();
  }, []);

  async function save(data: FormData) {
    const key = String(data.get("key"));
    const value_tr = String(data.get("value_tr"));
    const value_en = String(data.get("value_en"));
    const value = locale === "tr" ? value_tr : value_en;

    if (editingKey) {
      const { error } = await supabase
        .from("site_settings")
        .update({ key, value, value_tr, value_en })
        .eq("key", editingKey);
      setMessage(error ? error.message : "Ayar güncellendi.");
      setEditingKey(null);
    } else {
      const { error } = await supabase
        .from("site_settings")
        .insert({ key, value, value_tr, value_en });
      setMessage(error ? error.message : "Ayar kaydedildi.");
    }
    (document.getElementById("settings-form") as HTMLFormElement).reset();
    loadSettings();
  }

  async function deleteSetting(key: string) {
    if (!confirm("Silmek istediğine emin misin?")) return;
    const { error } = await supabase.from("site_settings").delete().eq("key", key);
    if (!error) loadSettings();
  }

  function editSetting(setting: SiteSetting) {
    setEditingKey(setting.key);
    const form = document.getElementById("settings-form") as HTMLFormElement;
    (form.elements.namedItem("key") as HTMLInputElement).value = setting.key;
    (form.elements.namedItem("value_tr") as HTMLInputElement).value = setting.value_tr || "";
    (form.elements.namedItem("value_en") as HTMLInputElement).value = setting.value_en || "";
  }

  return (
    <section className="mt-10 grid gap-6 lg:grid-cols-2">
      <div className="rounded-2xl border border-white/10 bg-white/[.03] p-6">
        <h2 className="font-display text-2xl">
          {editingKey ? "Düzenle" : "Yeni Ayar Ekle"}
        </h2>
        <form
          id="settings-form"
          action={save}
          className="mt-5 grid gap-3"
        >
          <input
            required
            name="key"
            placeholder="Ayar Anahtarı (örn: footer_tagline)"
            className="rounded-xl border border-white/10 bg-black/20 px-4 py-3"
          />
          <textarea
            name="value_tr"
            rows={2}
            placeholder="Türkçe Değer"
            className="rounded-xl border border-white/10 bg-black/20 px-4 py-3"
          />
          <textarea
            name="value_en"
            rows={2}
            placeholder="İngilizce Değer"
            className="rounded-xl border border-white/10 bg-black/20 px-4 py-3"
          />
          {message && <p className="text-sm text-blue-300">{message}</p>}
          <div className="flex gap-2">
            <button className="inline-flex w-fit items-center gap-2 rounded-full bg-blue-600 px-4 py-3 text-sm font-bold">
              <Plus size={16} />
              {editingKey ? "Güncelle" : "Kaydet"}
            </button>
            {editingKey && (
              <button
                type="button"
                onClick={() => {
                  setEditingKey(null);
                  (document.getElementById("settings-form") as HTMLFormElement).reset();
                }}
                className="inline-flex w-fit items-center gap-2 rounded-full border border-white/10 px-4 py-3 text-sm font-bold text-zinc-400"
              >
                İptal
              </button>
            )}
          </div>
        </form>
      </div>
      <div className="overflow-hidden rounded-2xl border border-white/10">
        <div className="border-b border-white/10 p-5 font-display text-xl">
          Site Ayarları
        </div>
        <div className="divide-y divide-white/[.07]">
          {settings.map((setting) => (
            <div
              key={setting.key}
              className="flex items-center justify-between gap-4 p-5"
            >
              <div>
                <p className="font-medium">{setting.key}</p>
                <p className="mt-1 text-xs text-zinc-500">
                  {locale === "tr" ? setting.value_tr : setting.value_en}
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => editSetting(setting)}
                  className="rounded-lg border border-white/10 p-2 text-zinc-400 hover:border-blue-500 hover:text-blue-400"
                >
                  <Pencil size={16} />
                </button>
                <button
                  onClick={() => deleteSetting(setting.key)}
                  className="rounded-lg border border-white/10 p-2 text-zinc-400 hover:border-red-500 hover:text-red-400"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

"use client";
import { useEffect, useState } from "react";
import { Check, LoaderCircle } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export function ProfileSetup({ userId, userMetadata, onComplete }: { userId: string; userMetadata?: any; onComplete: () => void }) {
  const [username, setUsername] = useState(userMetadata?.username || "");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function save(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    
    const { error } = await createClient()
      .from("profiles")
      .upsert({ id: userId, username: username.toLowerCase() });
    
    setLoading(false);
    
    if (error) {
      return setError(
        error.code === "23505" ? "Bu kullanıcı adı alınmış." : error.message
      );
    }
    
    onComplete();
  }

  return (
    <form onSubmit={save} className="mt-10 max-w-lg rounded-3xl border border-blue-500/30 bg-blue-500/[.08] p-7">
      <Check className="text-blue-400" />
      <h2 className="mt-5 font-display text-2xl">IFGT profilini oluştur</h2>
      <p className="mt-2 text-sm leading-6 text-zinc-400">
        Bu kullanıcı adı herkese açık olur. Küçük harf, rakam ve alt çizgi kullanabilirsin.
      </p>
      <label className="mt-6 block text-sm text-zinc-400">
        Kullanıcı adı
        <input
          required
          minLength={3}
          maxLength={20}
          pattern="[a-z0-9_]+"
          value={username}
          onChange={(e) =>
            setUsername(e.target.value.replace(/[^a-z0-9_]/g, "").toLowerCase())
          }
          className="mt-2 w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none focus:border-blue-500"
          placeholder="ornek_oyuncu"
        />
      </label>
      {error && <p className="mt-3 text-sm text-red-300">{error}</p>}
      <button
        disabled={loading}
        className="mt-5 inline-flex items-center gap-2 rounded-full bg-blue-600 px-5 py-3 text-sm font-bold disabled:opacity-60"
      >
        {loading && <LoaderCircle size={16} className="animate-spin" />}
        Profili kaydet
      </button>
    </form>
  );
}

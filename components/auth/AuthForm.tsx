"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Eye,
  EyeOff,
  LoaderCircle,
  XCircle,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import {
  getPasswordStrength,
  getUsernameIssues,
  isValidUsername,
  normalizeUsername,
} from "@/lib/auth";

type Mode = "sign-in" | "sign-up" | "forgot-password" | "update-password";
type UsernameStatus = "idle" | "checking" | "available" | "invalid" | "taken" | "error";

export function AuthForm({ mode: initialMode }: { mode: Mode }) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [messageType, setMessageType] = useState<"error" | "success">("error");
  const [username, setUsername] = useState("");
  const [usernameStatus, setUsernameStatus] = useState<UsernameStatus>("idle");
  const [usernameMessage, setUsernameMessage] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [mode, setMode] = useState<Mode>(initialMode);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Check if we are in recovery mode (password reset) on mount
  useEffect(() => {
    const checkRecoveryMode = async () => {
      const supabase = createClient();
      if (!supabase) return;
      const { data } = await supabase.auth.getSession();
      // If there's a session or the URL has recovery params, switch to update password mode
      const urlParams = new URLSearchParams(location.search);
      const isRecovery = urlParams.has("type") && urlParams.get("type") === "recovery";
      if (isRecovery || data.session) {
        // If we have a session and mode is not update password, switch to it
        if (initialMode !== "update-password") {
          setMode("update-password");
        }
      }
    };
    checkRecoveryMode();
  }, [initialMode]);

  const isSignUp = mode === "sign-up";
  const isForgotPassword = mode === "forgot-password";
  const isUpdatePassword = mode === "update-password";
  const isSignIn = mode === "sign-in";
  const passwordStrength = getPasswordStrength(password);
  const passwordsMatch = !confirmPassword || password === confirmPassword;
  const usernameIssues = getUsernameIssues(username);

  useEffect(() => {
    if (!isSignUp) {
      setUsernameStatus("idle");
      setUsernameMessage("");
      return;
    }

    if (!username) {
      setUsernameStatus("idle");
      setUsernameMessage("");
      return;
    }

    if (!isValidUsername(username)) {
      setUsernameStatus("invalid");
      setUsernameMessage(usernameIssues[0] ?? "Geçersiz kullanıcı adı.");
      return;
    }

    const controller = new AbortController();
    let checkingTimeoutId: number;
    
    // Only show "checking" status after 500ms to avoid flickering
    checkingTimeoutId = window.setTimeout(() => {
      setUsernameStatus("checking");
      setUsernameMessage("");
    }, 500);

    const mainTimeoutId = window.setTimeout(async () => {
      try {
        const response = await fetch(
          `/api/auth/check-username?username=${encodeURIComponent(username)}`,
          { signal: controller.signal }
        );
        const result = (await response.json()) as {
          available?: boolean;
          issues?: string[];
        };

        if (controller.signal.aborted) return;

        if (result.issues?.length) {
          setUsernameStatus("invalid");
          setUsernameMessage(result.issues[0]);
          return;
        }

        if (result.available) {
          setUsernameStatus("available");
          setUsernameMessage("Kullanıcı adı kullanılabilir.");
          return;
        }

        setUsernameStatus("taken");
        setUsernameMessage("Kullanıcı adı zaten alınmış.");
      } catch {
        if (controller.signal.aborted) return;
        setUsernameStatus("error");
        setUsernameMessage("Kullanıcı adı kontrolü başarısız oldu.");
      }
    }, 350);

    return () => {
      controller.abort();
      window.clearTimeout(mainTimeoutId);
      window.clearTimeout(checkingTimeoutId);
    };
  }, [isSignUp, username, usernameIssues]);

  async function submit(formData: FormData) {
    setLoading(true);
    setMessage(null);
    const supabase = createClient();
    if (!supabase) {
      setLoading(false);
      setMessage("Kimlik sistemi henüz yapılandırılmamış.");
      setMessageType("error");
      return;
    }

    if (isSignUp) {
      const email = String(formData.get("email"));
      const formPassword = String(formData.get("password"));
      const normalizedUsername = normalizeUsername(String(formData.get("username")));
      const formConfirmPassword = String(formData.get("confirmPassword"));

      if (!isValidUsername(normalizedUsername)) {
        setLoading(false);
        setMessage(getUsernameIssues(String(formData.get("username")))[0] ?? "Geçersiz kullanıcı adı.");
        setMessageType("error");
        return;
      }

      if (usernameStatus !== "available") {
        setLoading(false);
        setMessage("Devam etmeden önce uygun bir kullanıcı adı seç.");
        setMessageType("error");
        return;
      }

      if (formPassword !== formConfirmPassword) {
        setLoading(false);
        setMessage("Şifreler eşleşmiyor.");
        setMessageType("error");
        return;
      }

      const result = await supabase.auth.signUp({ 
        email, 
        password: formPassword, 
        options: { 
          emailRedirectTo: `${location.origin}/id`,
          data: {
            username: normalizedUsername
          }
        }
      });

      setLoading(false);
      
      if (result.error) {
        let errorMessage = result.error.message;
        if (result.error.code === "auth/email-already-in-use") {
          errorMessage = "Bu e-posta zaten kayıtlı.";
        }
        setMessage(errorMessage);
        setMessageType("error");
        return;
      }

      setMessage("Hesabını etkinleştirmek için e-posta kutunu kontrol et.");
      setMessageType("success");
    } else if (isForgotPassword) {
      const email = String(formData.get("email"));
      const result = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${location.origin}/update-password`
      });
      
      setLoading(false);
      
      if (result.error) {
        setMessage(result.error.message);
        setMessageType("error");
        return;
      }
      
      setMessage("Şifre sıfırlama bağlantısı e-postana gönderildi.");
      setMessageType("success");
    } else if (isUpdatePassword) {
      const formPassword = String(formData.get("password"));
      const formConfirmPassword = String(formData.get("confirmPassword"));
      
      if (formPassword !== formConfirmPassword) {
        setLoading(false);
        setMessage("Şifreler eşleşmiyor.");
        setMessageType("error");
        return;
      }

      const result = await supabase.auth.updateUser({
        password: formPassword
      });

      setLoading(false);
      
      if (result.error) {
        setMessage(result.error.message);
        setMessageType("error");
        return;
      }
      
      setMessage("Şifren başarıyla güncellendi.");
      setMessageType("success");
      
      // Redirect to sign in after a short delay
      setTimeout(() => {
        location.assign("/sign-in");
      }, 2000);
    } else if (isSignIn) {
      const identifier = String(formData.get("identifier")); // can be email or username
      const formPassword = String(formData.get("password"));

      let email = identifier;

      if (!identifier.includes("@")) {
        const response = await fetch("/api/auth/resolve-identifier", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ identifier }),
        });
        const result = (await response.json()) as { email?: string; error?: string };

        if (!response.ok || !result.email) {
          setLoading(false);
          setMessage(result.error ?? "Geçersiz kullanıcı adı veya şifre.");
          setMessageType("error");
          return;
        }

        email = result.email;
      }

      const result = await supabase.auth.signInWithPassword({ email, password: formPassword });
      setLoading(false);
      
      if (result.error) {
        setMessage(result.error.message);
        setMessageType("error");
        return;
      }
      
      location.assign("/id");
    }
  }

  return (
    <div className="min-h-screen bg-[#050505] px-5 py-8">
      <Link href="/" className="mx-auto flex max-w-md items-center gap-2 text-sm text-zinc-500 transition hover:text-white">
        <ArrowLeft size={16}/> IFGT Studio
      </Link>
      <main className="mx-auto mt-[12vh] max-w-md">
        <p className="text-xs font-bold uppercase tracking-[.22em] text-blue-400">IFGT ID</p>
        <h1 className="mt-4 font-display text-4xl font-medium tracking-[-.06em]">
          {isSignUp 
            ? "Bir evrenin kapısını aç." 
            : isForgotPassword 
              ? "Şifreni sıfırla." 
              : isUpdatePassword 
                ? "Yeni şifreni belirle." 
                : "Tekrar hoş geldin."}
        </h1>
        <p className="mt-4 text-sm leading-6 text-zinc-500">
          {isSignUp 
            ? "IFGT ID ile oyunlarını, topluluğunu ve gelecekteki deneyimlerini tek yerde birleştir." 
            : isForgotPassword 
              ? "E-postanı gir, şifre sıfırlama bağlantısı gönderelim."
              : isUpdatePassword 
                ? "Yeni şifreni belirle, sonra giriş yap."
                : "IFGT dünyalarına devam etmek için giriş yap."}
        </p>
        <form action={submit} className="mt-9 grid gap-5">
          {/* Email/identifier only for sign-in, sign-up, forgot-password */}
          {!isUpdatePassword && (
            <label className="text-sm text-zinc-400">
              {isSignIn ? "E-posta veya kullanıcı adı" : "E-posta"}
              <input 
                required 
                name={isSignIn ? "identifier" : "email"} 
                type={isSignIn ? "text" : "email"} 
                autoComplete={isSignIn ? "username" : "email"} 
                className="mt-2 w-full rounded-xl border border-white/10 bg-white/[.05] px-4 py-3.5 text-white outline-none focus:border-blue-500" 
                placeholder={isSignIn ? "sen@ornek.com veya kullanıcı adın" : "sen@ornek.com"}
              />
            </label>
          )}
          
          {/* Password fields (always except forgot-password) */}
          {!isForgotPassword && (
            <>
              {/* Username only for sign-up */}
              {isSignUp && (
                <label className="text-sm text-zinc-400">
                  Kullanıcı adı
                  <div className="relative">
                    <input 
                      required 
                      name="username" 
                      minLength={3} 
                      maxLength={20} 
                      pattern="[a-z0-9_]+" 
                      type="text" 
                      autoComplete="username" 
                      value={username}
                      onChange={(e) => setUsername(normalizeUsername(e.target.value))}
                      className="mt-2 w-full rounded-xl border border-white/10 bg-white/[.05] px-4 py-3.5 pr-12 text-white outline-none focus:border-blue-500" 
                      placeholder="ornek_oyuncu"
                    />
                    <span className="absolute right-4 top-[1.15rem] text-zinc-400">
                      {usernameStatus === "checking" && <LoaderCircle size={18} className="animate-spin" />}
                      {usernameStatus === "available" && <CheckCircle2 size={18} className="text-green-400" />}
                      {(usernameStatus === "taken" || usernameStatus === "invalid" || usernameStatus === "error") && (
                        <XCircle size={18} className="text-red-400" />
                      )}
                    </span>
                  </div>
                  <p className="mt-2 text-xs text-zinc-500">
                    3-20 karakter, sadece `a-z`, `0-9` ve `_`
                  </p>
                  {usernameMessage && (
                    <p
                      className={`mt-2 text-xs ${
                        usernameStatus === "available" ? "text-green-300" : "text-red-300"
                      }`}
                    >
                      {usernameMessage}
                    </p>
                  )}
                </label>
              )}
              
              <div className="relative">
                <label className="text-sm text-zinc-400">
                  {isUpdatePassword ? "Yeni şifre" : "Şifre"}
                </label>
                <div className="mt-2 relative">
                  <input 
                    required 
                    name="password" 
                    minLength={6} 
                    type={showPassword ? "text" : "password"} 
                    autoComplete={isUpdatePassword ? "new-password" : isSignUp ? "new-password" : "current-password"} 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-white/[.05] px-4 py-3.5 pr-12 text-white outline-none focus:border-blue-500" 
                    placeholder="En az 6 karakter"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white transition"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>
              {(isSignUp || isUpdatePassword) && password.length > 0 && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs text-zinc-400">
                    <span>Şifre gücü</span>
                    <span>
                      {passwordStrength === "weak"
                        ? "Zayıf"
                        : passwordStrength === "medium"
                        ? "Orta"
                        : "Güçlü"}
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {["weak", "medium", "strong"].map((level, index) => {
                      const activeCount =
                        passwordStrength === "weak" ? 1 : passwordStrength === "medium" ? 2 : 3;
                      const isActive = index < activeCount;
                      const color =
                        passwordStrength === "weak"
                          ? "bg-red-500"
                          : passwordStrength === "medium"
                          ? "bg-amber-500"
                          : "bg-green-500";

                      return (
                        <span
                          key={level}
                          className={`h-2 rounded-full ${isActive ? color : "bg-white/10"}`}
                        />
                      );
                    })}
                  </div>
                </div>
              )}
              
              {/* Confirm password for sign-up and update-password */}
              {(isSignUp || isUpdatePassword) && (
                <div className="relative">
                  <label className="text-sm text-zinc-400">
                    Şifre tekrar
                  </label>
                  <div className="mt-2 relative">
                    <input 
                      required 
                      name="confirmPassword" 
                      minLength={6} 
                      type={showConfirmPassword ? "text" : "password"} 
                      autoComplete="new-password" 
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full rounded-xl border border-white/10 bg-white/[.05] px-4 py-3.5 pr-12 text-white outline-none focus:border-blue-500" 
                      placeholder="Şifreni tekrar gir"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white transition"
                    >
                      {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                  {confirmPassword.length > 0 && (
                    <p className={`mt-2 text-xs ${passwordsMatch ? "text-green-300" : "text-red-300"}`}>
                      {passwordsMatch ? "Şifreler eşleşiyor." : "Şifreler eşleşmiyor."}
                    </p>
                  )}
                </div>
              )}
            </>
          )}

          {message && (
            <p 
              className={`rounded-xl border ${messageType === "success" ? "border-green-500/30 bg-green-500/10 text-green-200" : "border-red-500/30 bg-red-500/10 text-red-200"} px-4 py-3 text-sm`}
            >
              {message}
            </p>
          )}
          
          <button 
            disabled={
              loading ||
              ((isSignUp || isUpdatePassword) && (!passwordsMatch || password.length < 6)) ||
              (isSignUp && usernameStatus !== "available")
            } 
            className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-blue-600 px-5 py-3.5 text-sm font-bold transition hover:bg-blue-500 disabled:opacity-60"
          >
            {loading ? <LoaderCircle className="animate-spin" size={17}/> : (
              <>
                {isSignUp 
                  ? "IFGT ID oluştur" 
                  : isForgotPassword 
                    ? "Bağlantı gönder" 
                    : isUpdatePassword 
                      ? "Şifreyi güncelle" 
                      : "Giriş yap"}
                <ArrowRight size={17}/>
              </>
            )}
          </button>
        </form>

        {/* Links */}
        {!isForgotPassword && !isUpdatePassword && (
          <p className="mt-7 text-center text-sm text-zinc-500">
            {isSignUp ? "Zaten IFGT ID'in var mı?" : "IFGT ID'in yok mu?"} 
            <Link 
              className="text-blue-400 hover:text-blue-300 ml-1" 
              href={isSignUp ? "/sign-in" : "/sign-up"}
            >
              {isSignUp ? "Giriş yap" : "Hesap oluştur"}
            </Link>
          </p>
        )}

        {!isSignUp && !isForgotPassword && !isUpdatePassword && (
          <p className="mt-4 text-center text-sm text-zinc-500">
            Şifreni mi unuttun? 
            <Link className="text-blue-400 hover:text-blue-300 ml-1" href="/forgot-password">
              Şifremi unuttum
            </Link>
          </p>
        )}
        
        {(isForgotPassword || isUpdatePassword) && (
          <p className="mt-4 text-center text-sm text-zinc-500">
            <Link className="text-blue-400 hover:text-blue-300" href="/sign-in">
              Giriş yap ekranına dön
            </Link>
          </p>
        )}
      </main>
    </div>
  );
}

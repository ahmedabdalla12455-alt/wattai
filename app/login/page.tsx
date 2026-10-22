"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      setError("تعذّر تسجيل الدخول. تحقق من البريد الإلكتروني وكلمة المرور.");
      return;
    }

    router.push("/telemetry");
    router.refresh();
  }

  return (
    <main dir="rtl" className="flex min-h-screen items-center justify-center bg-slate-950 p-5 text-white">
      <section className="w-full max-w-md rounded-3xl border border-slate-800 bg-slate-900 p-8 shadow-2xl">
        <Link href="/" className="text-2xl font-bold text-cyan-400">WattAI</Link>
        <h1 className="mt-8 text-3xl font-bold">مرحبًا بعودتك</h1>
        <p className="mt-2 text-slate-400">سجّل الدخول لمتابعة بيانات الطاقة الخاصة بك.</p>

        <form className="mt-8 space-y-4" onSubmit={handleLogin}>
          <label className="block text-sm">
            البريد الإلكتروني
            <input
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
              className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 p-3 outline-none focus:border-cyan-400"
            />
          </label>

          <label className="block text-sm">
            كلمة المرور
            <input
              type="password"
              required
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="أدخل كلمة المرور"
              className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 p-3 outline-none focus:border-cyan-400"
            />
          </label>

          {error && <p role="alert" className="text-sm text-red-400">{error}</p>}

          <button
            disabled={loading}
            className="w-full rounded-xl bg-cyan-400 p-3 font-bold text-slate-950 disabled:opacity-60"
          >
            {loading ? "جارٍ تسجيل الدخول..." : "تسجيل الدخول"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-400">
          ليس لديك حساب؟ <Link href="/signup" className="text-cyan-400">إنشاء حساب</Link>
        </p>
        <Link href="/" className="mt-5 block text-center text-sm text-slate-500">العودة للرئيسية</Link>
      </section>
    </main>
  );
}

"use client";

import { useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSignup(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      setMessage("تعذّر إنشاء الحساب. تأكد من البيانات وحاول مرة أخرى.");
      return;
    }

    setMessage(
      data.session
        ? "تم إنشاء الحساب بنجاح! يمكنك تسجيل الدخول الآن."
        : "تم إرسال رسالة تأكيد إلى بريدك الإلكتروني. افتح الرسالة لتفعيل حسابك."
    );
  }

  return (
    <main dir="rtl" className="flex min-h-screen items-center justify-center bg-slate-950 p-5 text-white">
      <section className="w-full max-w-md rounded-3xl border border-slate-800 bg-slate-900 p-8 shadow-2xl">
        <Link href="/" className="text-2xl font-bold text-cyan-400">WattAI</Link>
        <h1 className="mt-8 text-3xl font-bold">إنشاء حساب جديد</h1>
        <p className="mt-2 text-slate-400">أنشئ حسابك للبدء باستخدام WattAI.</p>

        <form onSubmit={handleSignup} className="mt-8 space-y-4">
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
              minLength={8}
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="8 أحرف على الأقل"
              className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 p-3 outline-none focus:border-cyan-400"
            />
          </label>

          {message && <p role="status" className="text-sm text-cyan-300">{message}</p>}

          <button
            disabled={loading}
            className="w-full rounded-xl bg-cyan-400 p-3 font-bold text-slate-950 disabled:opacity-60"
          >
            {loading ? "جارٍ إنشاء الحساب..." : "إنشاء الحساب"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-400">
          لديك حساب بالفعل؟ <Link href="/login" className="text-cyan-400">تسجيل الدخول</Link>
        </p>
        <Link href="/" className="mt-5 block text-center text-sm text-slate-500">العودة للرئيسية</Link>
      </section>
    </main>
  );
}

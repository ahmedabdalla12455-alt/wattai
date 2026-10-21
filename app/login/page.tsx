"use client";
import Link from "next/link";
export default function Login(){
return <main dir="rtl" className="flex min-h-screen items-center justify-center bg-slate-950 p-5 text-white">
<section className="w-full max-w-md rounded-3xl border border-slate-800 bg-slate-900 p-8 shadow-2xl">
<Link href="/" className="text-2xl font-bold text-cyan-400">WattAI</Link>
<h1 className="mt-8 text-3xl font-bold">مرحبًا بعودتك</h1>
<p className="mt-2 text-slate-400">سجّل الدخول لمراقبة استهلاك الطاقة وتحليل الخوادم.</p>
<form className="mt-8 space-y-4" onSubmit={e=>{e.preventDefault();alert("تسجيل الدخول الحقيقي لم يُربط بعد.")}}>
<label className="block text-sm">البريد الإلكتروني<input type="email" required autoComplete="email" placeholder="name@example.com" className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 p-3 outline-none focus:border-cyan-400"/></label>
<label className="block text-sm">كلمة المرور<input type="password" required minLength={8} autoComplete="current-password" placeholder="8 أحرف على الأقل" className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 p-3 outline-none focus:border-cyan-400"/></label>
<button className="w-full rounded-xl bg-cyan-400 p-3 font-bold text-slate-950 hover:bg-cyan-300">تسجيل الدخول</button>
</form>
<button type="button" onClick={()=>alert("سنفعّل تسجيل Google بعد إعداد المصادقة.")} className="mt-3 w-full rounded-xl border border-slate-700 p-3 hover:bg-slate-800">المتابعة باستخدام Google</button>
<p className="mt-6 text-center text-sm text-slate-400">ليس لديك حساب؟ <Link href="/signup" className="text-cyan-400">إنشاء حساب</Link></p>
<Link href="/" className="mt-5 block text-center text-sm text-slate-500">العودة للرئيسية</Link>
</section></main>
}

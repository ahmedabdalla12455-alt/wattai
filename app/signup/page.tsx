"use client";
import Link from "next/link";
export default function Signup(){
return <main dir="rtl" className="flex min-h-screen items-center justify-center bg-slate-950 p-5 text-white">
<section className="w-full max-w-md rounded-3xl border border-slate-800 bg-slate-900 p-8 shadow-2xl">
<Link href="/" className="text-2xl font-bold text-cyan-400">WattAI</Link>
<h1 className="mt-8 text-3xl font-bold">أنشئ حسابك</h1>
<p className="mt-2 text-slate-400">ابدأ بمراقبة استهلاك الطاقة وأداء الخوادم.</p>
<form className="mt-8 space-y-4" onSubmit={e=>{e.preventDefault();const f=e.currentTarget;if((f.elements.namedItem("password") as HTMLInputElement).value!==(f.elements.namedItem("confirm") as HTMLInputElement).value)return alert("كلمتا المرور غير متطابقتين");alert("الواجهة جاهزة؛ إنشاء الحساب الحقيقي يحتاج ربط خدمة المصادقة.")}}>
<label className="block text-sm">الاسم<input name="name" required autoComplete="name" placeholder="اسمك" className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 p-3"/></label>
<label className="block text-sm">البريد الإلكتروني<input name="email" type="email" required autoComplete="email" placeholder="name@example.com" className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 p-3"/></label>
<label className="block text-sm">كلمة المرور<input name="password" type="password" required minLength={8} autoComplete="new-password" placeholder="8 أحرف على الأقل" className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 p-3"/></label>
<label className="block text-sm">تأكيد كلمة المرور<input name="confirm" type="password" required minLength={8} autoComplete="new-password" placeholder="أعد كتابة كلمة المرور" className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 p-3"/></label>
<button className="w-full rounded-xl bg-cyan-400 p-3 font-bold text-slate-950 hover:bg-cyan-300">إنشاء الحساب</button>
</form>
<button type="button" onClick={()=>alert("سنفعّل Google بعد إعداد المصادقة.")} className="mt-3 w-full rounded-xl border border-slate-700 p-3 hover:bg-slate-800">إنشاء حساب باستخدام Google</button>
<p className="mt-6 text-center text-sm text-slate-400">لديك حساب؟ <Link href="/login" className="text-cyan-400">تسجيل الدخول</Link></p>
<Link href="/" className="mt-5 block text-center text-sm text-slate-500">العودة للرئيسية</Link>
</section></main>
}

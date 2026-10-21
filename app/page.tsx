import Link from "next/link";

const links = [
  { icon: "＋", title: "إدخال بيانات الخادم", desc: "أضف قراءات GPU والطاقة والحرارة", href: "/telemetry" },
  { icon: "▥", title: "التحليل والتقارير", desc: "راجع الاستهلاك والتكلفة والقراءات", href: "/reports" },
  { icon: "↗", title: "تسجيل الدخول", desc: "ادخل إلى حسابك", href: "/login" },
  { icon: "◎", title: "إنشاء حساب", desc: "ابدأ إعداد حسابك في WattAI", href: "/signup" },
];

export default function Home() {
  return (
    <main dir="rtl" className="min-h-screen bg-slate-950 px-5 py-8 text-white md:px-10">
      <div className="mx-auto max-w-6xl">
        <nav className="flex items-center justify-between border-b border-slate-800 pb-5">
          <Link href="/" className="text-2xl font-black text-cyan-400">WattAI</Link>
          <div className="flex gap-3">
            <Link href="/login" className="rounded-xl border border-slate-700 px-4 py-2">دخول</Link>
            <Link href="/signup" className="rounded-xl bg-cyan-400 px-4 py-2 font-bold text-slate-950">إنشاء حساب</Link>
          </div>
        </nav>

        <section className="grid items-center gap-10 py-16 md:grid-cols-2 md:py-24">
          <div>
            <span className="rounded-full border border-cyan-900 bg-cyan-950/40 px-3 py-2 text-sm text-cyan-300">مراقبة الطاقة بذكاء</span>
            <h1 className="mt-7 text-4xl font-black leading-tight md:text-6xl">افهم استهلاك خوادمك، واتخذ قرارات أفضل.</h1>
            <p className="mt-5 max-w-xl text-lg leading-8 text-slate-400">أدخل بيانات الخوادم، واحسب استهلاك الطاقة والتكلفة، وتابع التحليلات والتقارير من مكان واحد.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/telemetry" className="rounded-xl bg-cyan-400 px-6 py-3 font-bold text-slate-950">ابدأ إدخال البيانات ←</Link>
              <Link href="/reports" className="rounded-xl border border-slate-700 px-6 py-3">عرض التقارير</Link>
            </div>
            <p className="mt-5 text-xs text-amber-300">ملاحظة: بيانات العرض تجريبية حتى ربط أجهزة ومصادر فعلية.</p>
          </div>

          <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-2xl">
            <div className="flex items-center justify-between">
              <div><p className="text-sm text-slate-400">لوحة WattAI</p><h2 className="mt-1 text-xl font-bold">نظرة عامة</h2></div>
              <span className="rounded-full bg-amber-950 px-3 py-1 text-xs text-amber-300">عرض تجريبي</span>
            </div>
            <div className="mt-6 grid grid-cols-2 gap-3">
              {[["استهلاك الطاقة","42.8 kWh"],["التكلفة التقديرية","$6.42"],["استخدام GPU","73%"],["الخوادم","4"]].map(([label,value])=>(
                <div key={label} className="rounded-2xl border border-slate-800 bg-slate-950 p-4">
                  <p className="text-sm text-slate-400">{label}</p><p className="mt-3 text-2xl font-bold text-cyan-300">{value}</p>
                </div>
              ))}
            </div>
            <div className="mt-4 rounded-2xl border border-slate-800 p-4">
              <p className="font-semibold">مسار العمل</p>
              <p className="mt-2 text-sm leading-7 text-slate-400">إنشاء حساب ← إدخال القراءات ← تحليل الاستهلاك ← مراجعة التقارير</p>
            </div>
          </div>
        </section>

        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {links.map(item=>(
            <Link key={item.href} href={item.href} className="group rounded-2xl border border-slate-800 bg-slate-900 p-5 transition hover:border-cyan-500 hover:bg-slate-900/70">
              <span className="text-3xl text-cyan-400">{item.icon}</span>
              <h2 className="mt-4 text-lg font-bold">{item.title}</h2>
              <p className="mt-2 text-sm leading-6 text-slate-400">{item.desc}</p>
              <span className="mt-4 block text-sm text-cyan-300">فتح الصفحة ←</span>
            </Link>
          ))}
        </section>

        <footer className="mt-16 border-t border-slate-800 pt-5 text-center text-sm text-slate-500">WattAI • مراقبة الطاقة وتحليل الخوادم</footer>
      </div>
    </main>
  );
}

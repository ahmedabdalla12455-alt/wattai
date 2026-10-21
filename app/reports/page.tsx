"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

type Reading = {
  id: number; name: string; g: number; p: number; t: number; r: number; date: string;
};

export default function Reports() {
  const [rows, setRows] = useState<Reading[]>([]);

  useEffect(() => {
    try {
      setRows(JSON.parse(localStorage.getItem("wattai-data") || "[]"));
    } catch {
      setRows([]);
    }
  }, []);

  const energy = rows.reduce((sum, x) => sum + x.p, 0) / 1000;
  const cost = rows.reduce((sum, x) => sum + (x.p / 1000) * x.r, 0);
  const avgGpu = rows.length ? Math.round(rows.reduce((s, x) => s + x.g, 0) / rows.length) : 0;
  const hot = rows.filter(x => x.t >= 80).length;

  return (
    <main dir="rtl" className="min-h-screen bg-slate-950 p-5 text-white md:p-10">
      <div className="mx-auto max-w-6xl">
        <header className="flex flex-wrap items-center justify-between gap-4">
          <div><Link href="/" className="font-bold text-cyan-400">WattAI</Link><h1 className="mt-3 text-3xl font-black">التحليل والتقارير</h1><p className="mt-2 text-slate-400">ملخص القراءات المحفوظة على هذا المتصفح.</p></div>
          <Link href="/telemetry" className="rounded-xl bg-cyan-400 px-5 py-3 font-bold text-slate-950">＋ إضافة قراءة</Link>
        </header>

        <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {[["عدد القراءات",String(rows.length)],["مجموع القدرة",`${energy.toFixed(2)} kW`],["التكلفة التقديرية",`$${cost.toFixed(3)}`],["متوسط استخدام GPU",`${avgGpu}%`]].map(([title,value])=><section key={title} className="rounded-2xl border border-slate-800 bg-slate-900 p-5"><p className="text-sm text-slate-400">{title}</p><p className="mt-3 text-2xl font-bold text-cyan-300">{value}</p></section>)}
        </div>

        <section className="mt-6 rounded-2xl border border-slate-800 bg-slate-900 p-5">
          <h2 className="text-xl font-bold">التوصيات</h2>
          {!rows.length ? <p className="mt-3 text-slate-400">لا توجد قراءات بعد. أضف بيانات من صفحة إدخال البيانات لعرض التحليل.</p> : <div className="mt-3 space-y-3 text-slate-300">
            <p>{hot ? `تنبيه: توجد ${hot} قراءة بحرارة 80°C أو أكثر. راجع التبريد.` : "لم تُسجل قراءات بدرجة حرارة 80°C أو أكثر."}</p>
            <p>متوسط استخدام GPU: {avgGpu}%. {avgGpu >= 90 ? "راجع توزيع أحمال العمل." : "راقب الاستخدام مع مرور الوقت."}</p>
            <p className="text-xs text-amber-300">التكلفة تقديرية للقراءات المسجلة وليست فاتورة فعلية. القدرة ليست استهلاكًا زمنيًا بالكيلوواط ساعة.</p>
          </div>}
        </section>

        <section className="mt-6 rounded-2xl border border-slate-800 bg-slate-900 p-5">
          <h2 className="text-xl font-bold">سجل القراءات</h2>
          {!rows.length ? <p className="mt-3 text-slate-400">السجل فارغ.</p> : <div className="mt-4 overflow-x-auto"><table className="w-full min-w-[620px] text-right text-sm"><thead className="text-slate-400"><tr><th className="p-3">التاريخ</th><th className="p-3">الخادم</th><th className="p-3">GPU</th><th className="p-3">القدرة</th><th className="p-3">الحرارة</th><th className="p-3">التكلفة/ساعة</th></tr></thead><tbody>{rows.map(x=><tr key={x.id} className="border-t border-slate-800"><td className="p-3">{x.date}</td><td className="p-3">{x.name}</td><td className="p-3">{x.g}%</td><td className="p-3">{x.p} W</td><td className="p-3">{x.t}°C</td><td className="p-3">${(x.p/1000*x.r).toFixed(3)}</td></tr>)}</tbody></table></div>}
        </section>

        <Link href="/" className="mt-6 inline-block text-cyan-300">← العودة إلى الرئيسية</Link>
        <p className="mt-8 text-xs text-slate-500">ملاحظة: البيانات محفوظة محليًا في المتصفح، وليست متزامنة بين الأجهزة أو الحسابات.</p>
      </div>
    </main>
  );
}

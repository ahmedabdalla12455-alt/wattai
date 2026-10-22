"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

type Reading = {
  id: string;
  name: string;
  g: number;
  p: number;
  t: number;
  r: number;
  date: string;
};

export default function Telemetry() {
  const [rows, setRows] = useState<Reading[]>([]);
  const [name, setName] = useState("GPU-01");
  const [gpu, setGpu] = useState("65");
  const [power, setPower] = useState("280");
  const [temp, setTemp] = useState("62");
  const [rate, setRate] = useState("0.15");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  async function loadRows() {
    setLoading(true);
    const { data: auth } = await supabase.auth.getUser();

    if (!auth.user) {
      setRows([]);
      setMessage("سجّل الدخول أولًا لعرض قراءاتك وحفظها.");
      setLoading(false);
      return;
    }

    const { data, error } = await supabase
      .from("telemetry")
      .select("id,name,power_kw,pue,temperature_c,recorded_at")
      .order("recorded_at", { ascending: false })
      .limit(100);

    if (error) {
      setMessage("تعذّر تحميل البيانات من قاعدة البيانات.");
      setLoading(false);
      return;
    }

    setRows((data || []).map((item) => ({
      id: item.id,
      name: item.name,
      g: 0,
      p: Number(item.power_kw) * 1000,
      t: Number(item.temperature_c),
      r: 0.15,
      date: new Date(item.recorded_at).toLocaleString(),
    })));
    setLoading(false);
  }

  useEffect(() => {
    void loadRows();
  }, []);

  async function save(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setMessage("");

    const g = Number(gpu);
    const p = Number(power);
    const t = Number(temp);
    const r = Number(rate);

    if (
      !name.trim() ||
      ![g, p, t, r].every(Number.isFinite) ||
      g < 0 || g > 100 || p < 0 || t < -50 || t > 200 || r < 0
    ) {
      setMessage("تحقق من القيم المدخلة.");
      return;
    }

    setSaving(true);
    const { data: auth } = await supabase.auth.getUser();

    if (!auth.user) {
      setMessage("يجب تسجيل الدخول قبل حفظ القراءات.");
      setSaving(false);
      return;
    }

    const { error } = await supabase.from("telemetry").insert({
      user_id: auth.user.id,
      name: name.trim(),
      power_kw: p / 1000,
      pue: 1.5,
      temperature_c: t,
    });

    setSaving(false);

    if (error) {
      setMessage("لم تُحفظ القراءة. تحقق من الاتصال وسياسات قاعدة البيانات.");
      return;
    }

    setMessage("تم حفظ القراءة بنجاح.");
    await loadRows();
  }

  const x = rows[0];
  const msg = !x
    ? "أدخل قراءة لبدء التحليل"
    : x.t >= 80
      ? "حرارة مرتفعة: افحص التبريد"
      : x.p >= 700
        ? "طاقة مرتفعة: راجع حمل العمل"
        : "القراءة ضمن النطاق التجريبي";

  return (
    <main dir="rtl" className="min-h-screen bg-slate-950 p-5 text-white">
      <h1 className="text-3xl font-bold text-cyan-400">WattAI</h1>
      <p className="my-3 text-amber-300">
        أدخل القراءات يدويًا؛ هذه الصفحة لا تتصل مباشرة بأجهزة GPU.
      </p>

      <form onSubmit={save} className="grid gap-3 rounded-xl bg-slate-900 p-4">
        <label>اسم الخادم
          <input className="mt-1 w-full rounded bg-slate-800 p-3" value={name} onChange={(e) => setName(e.target.value)} required />
        </label>
        <label>استخدام GPU %
          <input type="number" min="0" max="100" className="mt-1 w-full rounded bg-slate-800 p-3" value={gpu} onChange={(e) => setGpu(e.target.value)} required />
        </label>
        <label>الطاقة W
          <input type="number" min="0" step="any" className="mt-1 w-full rounded bg-slate-800 p-3" value={power} onChange={(e) => setPower(e.target.value)} required />
        </label>
        <label>الحرارة °C
          <input type="number" min="-50" max="200" step="any" className="mt-1 w-full rounded bg-slate-800 p-3" value={temp} onChange={(e) => setTemp(e.target.value)} required />
        </label>
        <label>سعر kWh بالدولار
          <input type="number" min="0" step="any" className="mt-1 w-full rounded bg-slate-800 p-3" value={rate} onChange={(e) => setRate(e.target.value)} required />
        </label>
        <button disabled={saving} className="rounded bg-cyan-400 p-3 font-bold text-black disabled:opacity-60">
          {saving ? "جارٍ الحفظ..." : "حفظ وتحليل"}
        </button>
      </form>

      {message && <p role="status" className="my-3 text-cyan-300">{message}</p>}

      <section className="my-4 rounded-xl bg-slate-900 p-4">
        <h2 className="text-xl font-bold">التحليل</h2>
        <p className="my-2 text-cyan-300">{msg}</p>
        {x && <p>الخادم {x.name} — الطاقة {x.p} W — الحرارة {x.t}°C</p>}
        {x && <p className="mt-2 text-sm text-slate-400">التكلفة بالساعة تقديرية للقراءة الحالية: ${(x.p / 1000 * Number(rate)).toFixed(3)} دولار، وليست إجمالي استهلاك الطاقة.</p>}
      </section>

      <section className="rounded-xl bg-slate-900 p-4">
        <h2 className="text-xl font-bold">السجل ({rows.length})</h2>
        {loading ? <p className="py-3">جارٍ تحميل السجل...</p> :
          rows.length === 0 ? <p className="py-3 text-slate-400">لا توجد قراءات محفوظة.</p> :
          rows.map((a) => (
            <p key={a.id} className="border-b border-slate-700 py-3">
              {a.date} — {a.name}: {a.p} W، {a.t}°C
            </p>
          ))}
      </section>

      <Link className="mt-5 block text-cyan-300" href="/">العودة للوحة الرئيسية</Link>
      <Link className="mt-3 block text-cyan-300" href="/login">تسجيل الدخول</Link>
    </main>
  );
}

"use client";

const servers = [
  { name: "GPU-01", gpu: 78, power: 286, temp: 64, status: "Healthy" },
  { name: "GPU-02", gpu: 91, power: 331, temp: 71, status: "High load" },
  { name: "GPU-03", gpu: 54, power: 219, temp: 58, status: "Healthy" },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-white p-5 md:p-10">
      <div className="mx-auto max-w-6xl">
        <header className="mb-8">
          <div className="text-sm text-cyan-400 font-semibold tracking-widest">
            WATTAI
          </div>
          <h1 className="mt-2 text-3xl md:text-5xl font-bold">
            AI Energy Monitor
          </h1>
          <p className="mt-2 text-slate-400">
            مراقبة الطاقة وأداء خوادم الذكاء الاصطناعي
          </p>
        </header>

        <section className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card title="ENERGY TODAY" value="42.8 kWh" icon="⚡" />
          <Card title="EST. COST" value="$6.42" icon="💰" />
          <Card title="GPU UTILIZATION" value="74%" icon="🎮" />
          <Card title="TOTAL POWER" value="836 W" icon="🔌" />
        </section>

        <section className="grid lg:grid-cols-3 gap-5">
          <div className="lg:col-span-2 rounded-2xl border border-slate-800 bg-slate-900 p-5">
            <div className="flex justify-between items-center mb-5">
              <div>
                <h2 className="text-xl font-semibold">Servers</h2>
                <p className="text-sm text-slate-500">Live infrastructure overview</p>
              </div>
              <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs text-emerald-400">
                ● 3 Online
              </span>
            </div>

            <div className="space-y-3">
              {servers.map((server) => (
                <div
                  key={server.name}
                  className="rounded-xl bg-slate-950 border border-slate-800 p-4"
                >
                  <div className="flex justify-between mb-3">
                    <div>
                      <div className="font-semibold">{server.name}</div>
                      <div className="text-xs text-slate-500">
                        {server.status}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold">{server.power} W</div>
                      <div className="text-xs text-slate-500">
                        {server.temp}°C
                      </div>
                    </div>
                  </div>

                  <div className="h-2 rounded-full bg-slate-800 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-cyan-400"
                      style={{ width: `${server.gpu}%` }}
                    />
                  </div>

                  <div className="mt-2 text-xs text-slate-500">
                    GPU utilization: {server.gpu}%
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-cyan-900/50 bg-cyan-950/20 p-5">
            <div className="text-cyan-400 text-sm font-semibold">
              🤖 AI ANALYST
            </div>

            <h2 className="mt-3 text-xl font-bold">
              Energy opportunity detected
            </h2>

            <p className="mt-3 text-sm leading-6 text-slate-300">
              GPU-02 is using high power while maintaining very high
              utilization. WattAI recommends monitoring this workload for
              possible efficiency improvements.
            </p>

            <div className="mt-5 rounded-xl bg-slate-950/70 p-4">
              <div className="text-xs text-slate-500">Potential saving</div>
              <div className="mt-1 text-2xl font-bold text-emerald-400">
                8–14%
              </div>
            </div>

            <button className="mt-5 w-full rounded-xl bg-cyan-500 py-3 font-semibold text-slate-950">
              Analyze infrastructure
            </button>
          </div>
        </section>

        <footer className="mt-10 text-center text-xs text-slate-600">
          WattAI V0.3 • Live GPU Monitoring • AI Energy & GPU Monitoring
        </footer>
      </div>
    </main>
  );
}

function Card({
  title,
  value,
  icon,
}: {
  title: string;
  value: string;
  icon: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-4">
      <div className="text-xl">{icon}</div>
      <div className="mt-4 text-xs text-slate-500">{title}</div>
      <div className="mt-1 text-xl md:text-2xl font-bold">{value}</div>
    </div>
  );
}

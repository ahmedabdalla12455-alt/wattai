"use client";

import { useEffect, useMemo, useState } from "react";

const baseServers = [
  { name: "GPU-01", gpu: 78, power: 286, temp: 64 },
  { name: "GPU-02", gpu: 91, power: 331, temp: 71 },
  { name: "GPU-03", gpu: 54, power: 219, temp: 58 },
  { name: "GPU-04", gpu: 67, power: 248, temp: 62 },
];

const energyRate = 0.15;

export default function Home() {
  const [live, setLive] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setLive((value) => value + 1), 2000);
    return () => clearInterval(timer);
  }, []);

  const servers = useMemo(
    () =>
      baseServers.map((server, i) => {
        const gpu = Math.max(
          20,
          Math.min(99, server.gpu + ((live + i * 3) % 11) - 5),
        );
        const power = server.power + ((live * (i + 2)) % 21) - 10;
        const temp = server.temp + ((live + i) % 7) - 3;

        return {
          ...server,
          gpu,
          power,
          temp,
          status: temp >= 70 || gpu >= 90 ? "High load" : "Healthy",
        };
      }),
    [live],
  );

  const totalPower = servers.reduce((sum, server) => sum + server.power, 0);
  const avgGpu = Math.round(
    servers.reduce((sum, server) => sum + server.gpu, 0) / servers.length,
  );
  const energyToday = 42.8 + live * 0.03;
  const estimatedCost = energyToday * energyRate;

  const analysis = useMemo(() => {
    const highLoad = servers.filter(
      (server) => server.status === "High load",
    );
    const hottest = [...servers].sort((a, b) => b.temp - a.temp)[0];
    const highestPower = [...servers].sort((a, b) => b.power - a.power)[0];

    if (highLoad.length > 0) {
      return {
        title: "Efficiency opportunity detected",
        message: `${highLoad.length} server(s) are under high load. ${highestPower.name} is currently using the most power at ${highestPower.power} W.`,
        action: "Review high-load workloads and power usage.",
        level: "warning",
      };
    }

    if (hottest.temp >= 68) {
      return {
        title: "Thermal attention recommended",
        message: `${hottest.name} is the warmest server at ${hottest.temp}°C.`,
        action: "Check cooling and airflow for this server.",
        level: "warning",
      };
    }

    return {
      title: "Infrastructure looks healthy",
      message: `All ${servers.length} servers are operating within the simulated healthy range.`,
      action: "Continue monitoring telemetry for changes.",
      level: "healthy",
    };
  }, [servers]);

  return (
    <main className="min-h-screen bg-slate-950 p-5 text-white md:p-10">
      <div className="mx-auto max-w-6xl">
        <header className="mb-8">
          <div className="text-sm font-semibold tracking-widest text-cyan-400">
            WATTAI
          </div>
          <h1 className="mt-2 text-3xl font-bold md:text-5xl">
            AI Energy Monitor
          </h1>
          <p className="mt-2 text-slate-400">
            مراقبة الطاقة وأداء خوادم الذكاء الاصطناعي
          </p>
          <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-cyan-900/60 bg-cyan-950/30 px-3 py-1 text-xs text-cyan-300">
            <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
            Live telemetry simulation
          </div>
        </header>

        <section className="mb-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
          <Card title="ENERGY TODAY" value={`${energyToday.toFixed(1)} kWh`} icon="⚡" />
          <Card title="EST. COST" value={`$${estimatedCost.toFixed(2)}`} icon="💰" />
          <Card title="GPU UTILIZATION" value={`${avgGpu}%`} icon="🎮" />
          <Card title="TOTAL POWER" value={`${totalPower} W`} icon="🔌" />
        </section>

        <section className="grid gap-5 lg:grid-cols-3">
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5 lg:col-span-2">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold">Servers</h2>
                <p className="text-sm text-slate-500">
                  Live infrastructure overview
                </p>
              </div>
              <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs text-emerald-400">
                ● {servers.length} Online
              </span>
            </div>

            <div className="space-y-3">
              {servers.map((server) => (
                <div
                  key={server.name}
                  className="rounded-xl border border-slate-800 bg-slate-950 p-4"
                >
                  <div className="mb-3 flex justify-between">
                    <div>
                      <div className="font-semibold">{server.name}</div>
                      <div
                        className={
                          server.status === "High load"
                            ? "text-xs text-amber-400"
                            : "text-xs text-emerald-400"
                        }
                      >
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

                  <div className="h-2 overflow-hidden rounded-full bg-slate-800">
                    <div
                      className="h-full rounded-full bg-cyan-400 transition-all duration-500"
                      style={{ width: `${server.gpu}%` }}
                    />
                  </div>

                  <div className="mt-2 flex justify-between text-xs text-slate-500">
                    <span>GPU utilization: {server.gpu}%</span>
                    <span>
                      {Math.round(server.power / Math.max(server.gpu, 1))} W /
                      GPU%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-cyan-900/50 bg-cyan-950/20 p-5">
            <div className="text-sm font-semibold text-cyan-400">
              🤖 AI ANALYST
            </div>

            <h2 className="mt-3 text-xl font-bold">
              {analysis.title}
            </h2>

            <p className="mt-3 text-sm leading-6 text-slate-300">
              {analysis.message}
            </p>

            <div className="mt-4 rounded-xl border border-slate-800 bg-slate-950/60 p-4">
              <div className="text-xs text-slate-500">Recommendation</div>
              <div className="mt-1 text-sm text-slate-200">
                {analysis.action}
              </div>
            </div>

            <div className="mt-5 rounded-xl bg-slate-950/70 p-4">
              <div className="text-xs text-slate-500">
                Electricity rate
              </div>
              <div className="mt-1 text-2xl font-bold text-cyan-400">
                $0.15/kWh
              </div>

              <div className="mt-3 text-xs text-slate-500">
                Potential saving
              </div>
              <div className="mt-1 text-2xl font-bold text-emerald-400">
                8–14%
              </div>

              <div className="mt-1 text-xs text-slate-500">
                Simulation estimate
              </div>
            </div>

            <div className="mt-5 rounded-xl bg-slate-950/70 p-4">
              <div className="text-xs text-slate-500">Analysis status</div>
              <div
                className={`mt-1 text-sm font-semibold ${
                  analysis.level === "healthy"
                    ? "text-emerald-400"
                    : "text-amber-400"
                }`}
              >
                ● Local AI rules active
              </div>
            </div>
          </div>
        </section>

        <footer className="mt-10 text-center text-xs text-slate-600">
          WattAI V0.5 • Live Telemetry Simulation • AI Energy & GPU Monitoring
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
      <div className="mt-1 text-xl font-bold md:text-2xl">{value}</div>
    </div>
  );
}

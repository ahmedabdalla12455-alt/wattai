from pathlib import Path

p = Path("app/page.tsx")
s = p.read_text()

s = s.replace(
    'WattAI V0.2',
    'WattAI V0.2 • Live GPU Monitoring'
)

s = s.replace(
    'AI Energy Monitor',
    'AI Energy Monitor'
)

p.write_text(s)
print("Dashboard update prepared.")

from datetime import datetime, timezone
from typing import Optional

from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI(title="WattAI API", version="0.9.0")

telemetry = []


class Telemetry(BaseModel):
    server: str
    gpu: float
    power: float
    temp: float
    timestamp: Optional[str] = None


@app.get("/health")
def health():
    return {"status": "ok", "service": "wattai-api"}


@app.get("/telemetry")
def get_telemetry():
    return telemetry[-100:]


@app.post("/telemetry")
def add_telemetry(data: Telemetry):
    item = data.model_dump()
    item["timestamp"] = item["timestamp"] or datetime.now(timezone.utc).isoformat()
    telemetry.append(item)
    return item


@app.get("/analytics")
def analytics():
    if not telemetry:
        return {
            "samples": 0,
            "avg_power": 0,
            "avg_gpu": 0,
            "energy_kwh": 0,
        }

    avg_power = sum(x["power"] for x in telemetry) / len(telemetry)
    avg_gpu = sum(x["gpu"] for x in telemetry) / len(telemetry)

    return {
        "samples": len(telemetry),
        "avg_power": round(avg_power, 2),
        "avg_gpu": round(avg_gpu, 2),
        "energy_kwh": round(avg_power / 1000 * 0.5, 4),
    }

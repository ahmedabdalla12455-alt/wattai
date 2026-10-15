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


@app.post("/ai/analyze")
def ai_analyze():
    if not telemetry:
        return {
            "status": "no_data",
            "detection": "No telemetry available.",
            "explanation": "WattAI needs GPU/server telemetry before analysis.",
            "recommendation": "Send telemetry to POST /telemetry.",
        }

    latest = telemetry[-1]
    power = latest["power"]
    gpu = latest["gpu"]
    temp = latest["temp"]

    if temp >= 80:
        detection = "High thermal load detected."
        explanation = f"{latest['server']} is running at {temp}°C."
        recommendation = "Check cooling, airflow, and GPU workload."
    elif power >= 700:
        detection = "High power usage detected."
        explanation = f"{latest['server']} is consuming {power} W."
        recommendation = "Review workload efficiency and GPU utilization."
    elif gpu >= 90:
        detection = "High GPU utilization detected."
        explanation = f"{latest['server']} GPU utilization is {gpu}%."
        recommendation = "Verify workload demand and monitor thermal/power impact."
    else:
        detection = "Telemetry is within the local healthy range."
        explanation = f"{latest['server']} is operating at {gpu}% GPU, {power} W, and {temp}°C."
        recommendation = "Continue monitoring for changes."

    return {
        "status": "ok",
        "mode": "local-rules",
        "detection": detection,
        "explanation": explanation,
        "recommendation": recommendation,
    }


@app.get("/gpu/ready")
def gpu_ready():
    return {
        "ready": True,
        "source": "external-nvidia-gpu",
        "message": "WattAI is ready to receive real GPU telemetry.",
    }


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

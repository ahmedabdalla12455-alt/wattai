# WattAI Backend

V0.8/V0.9 FastAPI backend.

Run:
`pip install -r requirements.txt`
`uvicorn main:app --reload --port 8000`

Health:
`http://127.0.0.1:8000/health`

Telemetry:
`GET /telemetry`
`POST /telemetry`

Analytics:
`GET /analytics`

PostgreSQL configuration is prepared through DATABASE_URL.

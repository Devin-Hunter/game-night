from fastapi import FastAPI
from routers import games, members, locations, venues, events
from fastapi.middleware.cors import CORSMiddleware
import os
from authenticator import authenticator


app = FastAPI()
app.include_router(venues.router)
app.include_router(locations.router)
app.include_router(games.router)
app.include_router(members.router)
app.include_router(events.router)
app.include_router(authenticator.router)


@app.get("/")
def root():
    return {"message": "You hit the root path!"}


app.add_middleware(
    CORSMiddleware,
    allow_origins=[os.environ.get("CORS_HOST"), 'http://localhost:5173'],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/api/launch-details")
def launch_details():
    return {
        "launch_details": {
            "module": 3,
            "week": 17,
            "day": 5,
            "hour": 19,
            "min": "00",
        }
    }

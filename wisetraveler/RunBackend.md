GO INTO SRC/BACKEND/APP
install python 3.12
run ./install_requirements.sh
or install requirements via pip 
aka pip -r requirements.txt
run uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
then start frontend.

Optimizing API Calls with FastAPI

Introduction



1. Reduction in Excessive JavaScript Async Calls

Handling API calls directly on the frontend can lead to:

Too many network requests → Increased load times.

Difficult debugging → Complex async handling.

Familiarity -> less work for me to have to debug issues in a language I havn't coded in many years. 


After: Using FastAPI for API Aggregation

from fastapi import FastAPI
from typing import List
import httpx

app = FastAPI()

API_URLS = [
    "https://localhost:8000/route1",
    "https://localhost:8000/route2"
]

@app.get("/api/routes")
async def get_routes():
    async with httpx.AsyncClient() as client:
        responses = await client.get(API_URLS[0])
        return responses.json()

Benefits:

FastAPI fetches and aggregates data before sending it to the frontend.

Reduces frontend fetch complexity.

Uses httpx, an async HTTP client, for better performance.

Steps to Implement FastAPI for API Handling

1️ Install FastAPI and Dependencies
go into src/backend/app/
pip install -r requirements.txt

2️ Start FastAPI Server
go into backend/app/ and run 
uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload

3 Modify Frontend to Use FastAPI

Instead of making multiple fetch requests, modify the frontend to call a single FastAPI endpoint:
Or basically the same way you did before. 
import axios from "axios";

async function getRoutes() {
    try {
        const response = await axios.get("http://localhost:8000/api/routes");
        return response.data;
    } catch (error) {
        console.error("Error fetching routes:", error);
    }
}


Check out the Login Page i modified to communicate with backend. There is still an issue with a route or something so it currently just delivers an iternerary. 




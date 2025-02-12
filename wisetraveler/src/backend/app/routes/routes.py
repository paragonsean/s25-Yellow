import os
import logging
import openai
import httpx
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from dotenv import load_dotenv

# Import helper functions from services.py
from app.services import (
    parse_locations,
    fetch_place_details,
    call_create_route_function,
    generate_google_maps_url
)

# Load environment variables
load_dotenv()
openai.api_key = os.getenv("OPENAI_API_KEY")

# Initialize logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Create FastAPI router with prefix "/api"
router = APIRouter()  # Ensure routes match frontend expectations

# Pydantic models
class ItineraryRequest(BaseModel):
    query: str

class RouteRequest(BaseModel):
    locations: list[str]

@router.post("/generate-itinerary")
async def generate_itinerary(request: ItineraryRequest):
    """Generates a travel itinerary based on user preferences."""
    try:
        messages = [
            {"role": "system", "content": "You are a helpful travel assistant."},
            {"role": "user", "content": (
                f"Create a travel itinerary based on the following preferences: {request.query}\n"
                "List the key locations (cities, landmarks, attractions) in bullet points."
            )}
        ]

        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=messages,
            max_tokens=150,
            temperature=0.7,
        )

        itinerary = response.choices[0].message.content.strip()
        locations = parse_locations(itinerary)

        return {"itinerary": itinerary, "locations": locations}
    except Exception as e:
        logger.error(f"Error generating itinerary: {e}")
        raise HTTPException(status_code=500, detail="Failed to generate itinerary.")

@router.post("/get-route")
async def optimize_route(request: RouteRequest):
    """Optimizes a travel route based on a list of locations."""
    try:
        if not request.locations or len(request.locations) < 2:
            raise HTTPException(status_code=400, detail="At least two locations are required.")

        async with httpx.AsyncClient() as client:
            places_details = [await fetch_place_details(client, location) for location in request.locations]
            # Filter out any None results
            places_details = [details for details in places_details if details]

        if len(places_details) < 2:
            raise HTTPException(status_code=400, detail="Not enough valid locations to optimize a route.")

        route_info = call_create_route_function(places_details)
        if route_info:
            return {
                "route": route_info.get("route"),
                "explanation": route_info.get("explanation"),
                "maps_url": generate_google_maps_url(route_info.get("route"))
            }
        else:
            raise HTTPException(status_code=500, detail="Failed to optimize the route.")
    except Exception as e:
        logger.error(f"Error optimizing route: {e}")
        raise HTTPException(status_code=500, detail="Failed to optimize the route.")

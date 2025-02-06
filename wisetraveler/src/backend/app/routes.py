from fastapi import APIRouter, HTTPException
from app.models import ItineraryRequest, RouteRequest
from app.services import fetch_places_details, optimize_route, generate_google_maps_url
import openai

router = APIRouter()

@router.post("/api/generate-itinerary")
async def generate_itinerary(request: ItineraryRequest):
    """Generates a travel itinerary using OpenAI"""
    try:
        messages = [
            {"role": "system", "content": "You are a helpful travel assistant."},
            {"role": "user", "content": f"Create a travel itinerary based on these preferences: {request.query}.\nList key locations in bullet points."}
        ]

        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=messages,
            max_tokens=150,
            temperature=0.7,
        )

        itinerary = response.choices[0].message["content"].strip()
        locations = [line.lstrip("-* ").strip() for line in itinerary.split("\n") if line.strip().startswith(("-", "*"))]

        return {"itinerary": itinerary, "locations": locations}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error generating itinerary: {str(e)}")


@router.post("/api/get-route")
async def get_route(request: RouteRequest):
    """Fetches Google Places details & determines the best travel route"""
    if len(request.locations) < 2:
        raise HTTPException(status_code=400, detail="At least two locations are required.")

    try:
        places_details = await fetch_places_details(request.locations)
        route_info = await optimize_route(places_details)
        maps_url = generate_google_maps_url(route_info["route"])

        return {"route_info": route_info, "maps_url": maps_url}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error determining route: {str(e)}")

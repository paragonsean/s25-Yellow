import os
import json
import logging
import openai
import httpx
from dotenv import load_dotenv

# Load environment variables
load_dotenv()
openai.api_key = os.getenv("OPENAI_API_KEY")
GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")

# Initialize logging
logger = logging.getLogger(__name__)
logging.basicConfig(level=logging.INFO)


def parse_locations(itinerary: str) -> list[str]:
    """
    Extracts location names from bullet-pointed itinerary text.
    
    Args:
        itinerary (str): A text itinerary with locations as bullet points.
    
    Returns:
        list[str]: A list of cleaned location names.
    """
    return [
        line.lstrip("-*0123456789. ").strip()
        for line in itinerary.splitlines()
        if line.strip() and (line.startswith("-") or line[0].isdigit())
    ]


async def fetch_place_details(client: httpx.AsyncClient, place: str) -> dict | None:
    """
    Uses the Google Places API to retrieve details for a given location.
    
    Args:
        client (httpx.AsyncClient): The HTTP client used for making the request.
        place (str): The name of the place to fetch details for.
    
    Returns:
        dict or None: The first result from the API, or None if no results are found or an error occurs.
    """
    url = "https://maps.googleapis.com/maps/api/place/textsearch/json"
    params = {"query": place, "key": GOOGLE_API_KEY}
    try:
        response = await client.get(url, params=params)
        data = response.json()
        return data["results"][0] if data.get("results") else None
    except Exception as e:
        logger.error(f"Error fetching details for {place}: {e}")
        return None


def call_create_route_function(places_details: list[dict]) -> dict | None:
    """
    Calls the OpenAI API to get an optimized travel route based on place details.
    
    This updated function instructs the model to include every provided location in the output.
    
    Args:
        places_details (list[dict]): A list of place detail dictionaries.
    
    Returns:
        dict or None: A dictionary with keys 'route' and 'explanation' if successful, else None.
    """
    details_str = "\n\n".join(
        f"Name: {d.get('name', 'N/A')}\nAddress: {d.get('formatted_address', 'N/A')}\nRating: {d.get('rating', 'N/A')}"
        for d in places_details if d
    )

    messages = [
        {
            "role": "system",
            "content": "You are a travel planning assistant that specializes in optimizing travel routes."
        },
        {
            "role": "user",
            "content": (
                "Based on the following list of places and their details, determine the best order "
                "to visit all these locations. Make sure that your optimized route includes every one of the provided places, "
                "taking into account geographic proximity and ratings. "
                "Return the result by calling the function 'create_route' with two fields: "
                "'route' (an ordered list of place names that includes all the given locations) "
                "and 'explanation' (a short rationale). \n\n" + details_str
            )
        }
    ]

    functions = [{
        "name": "create_route",
        "description": "Generates an optimized travel route given a list of places",
        "parameters": {
            "type": "object",
            "properties": {
                "route": {
                    "type": "array",
                    "items": {"type": "string"},
                    "description": "Ordered list of place names that includes all provided locations."
                },
                "explanation": {
                    "type": "string",
                    "description": "A brief explanation of the recommended route."
                }
            },
            "required": ["route", "explanation"]
        }
    }]

    try:
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=messages,
            functions=functions,
            function_call="auto",
            max_tokens=200,
            temperature=0.7,
        )
        message = response.choices[0].message
        if message.get("function_call"):
            return json.loads(message["function_call"]["arguments"])
        else:
            logger.error("No function_call received in the OpenAI response.")
            return None
    except Exception as e:
        logger.error(f"Error determining best route: {e}")
        return None


def generate_google_maps_url(route: list[str]) -> str:
    """
    Creates a Google Maps directions URL based on an ordered list of place names.
    
    Args:
        route (list[str]): An ordered list of place names.
    
    Returns:
        str: A URL string for Google Maps directions.
    """
    return "https://www.google.com/maps/dir/" + "/".join(place.replace(" ", "+") for place in route)

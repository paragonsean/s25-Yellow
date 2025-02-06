import os
import json
import requests
import openai
from dotenv import load_dotenv

# Load API keys
load_dotenv()
GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")
openai.api_key = os.getenv("OPENAI_API_KEY")

async def fetch_places_details(locations):
    """Fetches Google Places details for given locations"""
    places_details = []
    for place in locations:
        try:
            url = f"https://maps.googleapis.com/maps/api/place/textsearch/json?query={place}&key={GOOGLE_API_KEY}"
            response = requests.get(url)
            data = response.json()
            if "results" in data and data["results"]:
                places_details.append(data["results"][0])
        except Exception as e:
            print(f"Error fetching details for {place}: {e}")
    return places_details

async def optimize_route(places_details):
    """Uses OpenAI to optimize the best travel route"""
    details_str = "\n\n".join([f"Name: {place['name']}\nAddress: {place['formatted_address']}\nRating: {place.get('rating', 'N/A')}" for place in places_details])

    messages = [
        {"role": "system", "content": "You are a travel planning assistant that specializes in optimizing travel routes."},
        {"role": "user", "content": f"Determine the best order to visit these places, considering proximity and ratings.\n\n{details_str}"}
    ]

    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=messages,
        max_tokens=200,
        temperature=0.7,
    )

    return json.loads(response.choices[0].message["content"])

def generate_google_maps_url(route):
    """Generates a Google Maps directions link"""
    base_url = "https://www.google.com/maps/dir/"
    stops = "/".join([place.replace(" ", "+") for place in route])
    return base_url + stops

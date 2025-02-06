import axios from "axios";
import { Configuration, OpenAIApi } from "openai";

export default async function handler(req, res) {
    if (req.method !== "POST") return res.status(405).json({ error: "Method Not Allowed" });

    const { locations } = req.body;
    if (!locations || locations.length < 2) return res.status(400).json({ error: "At least two locations are required." });

    try {
        const placesDetails = await Promise.all(locations.map(getPlaceDetails));
        const validPlaces = placesDetails.filter(place => place !== null);

        if (validPlaces.length < 2) return res.status(400).json({ error: "Not enough valid locations found." });

        const routeInfo = await getOptimizedRoute(validPlaces);
        const mapsUrl = generateGoogleMapsUrl(routeInfo.route);

        res.json({ routeInfo, mapsUrl });
    } catch (error) {
        console.error("Error determining route:", error);
        res.status(500).json({ error: "Failed to determine the best route." });
    }
}

// Fetches place details using Google Places API
async function getPlaceDetails(place) {
    try {
        const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(place)}&key=${process.env.GOOGLE_API_KEY}`;
        const response = await axios.get(url);
        return response.data.results[0] || null;
    } catch (error) {
        console.error(`Error fetching details for ${place}:`, error);
        return null;
    }
}

// Calls OpenAI to determine the best route
async function getOptimizedRoute(placesDetails) {
    const openai = new OpenAIApi(new Configuration({ apiKey: process.env.OPENAI_API_KEY }));

    const detailsStr = placesDetails.map(detail => 
        `Name: ${detail.name}\nAddress: ${detail.formatted_address}\nRating: ${detail.rating || "N/A"}`
    ).join("\n\n");

    const messages = [
        { role: "system", content: "You are a travel planning assistant that specializes in optimizing travel routes." },
        { role: "user", content: `Determine the best order to visit these places, considering proximity and ratings. Return an ordered list of places along with a brief explanation.\n\n${detailsStr}` }
    ];

    const response = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages,
        max_tokens: 200,
        temperature: 0.7,
    });

    return JSON.parse(response.data.choices[0].message.content);
}

// Generates a Google Maps link for the route
function generateGoogleMapsUrl(route) {
    const baseUrl = "https://www.google.com/maps/dir/";
    const encodedStops = route.map(place => encodeURIComponent(place)).join("/");
    return `${baseUrl}${encodedStops}`;
}

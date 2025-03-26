import dotenv from "dotenv";
import axios from "axios";
import OpenAI from "openai";
import express from "express";

dotenv.config();

const openai = new OpenAI({ 
    apiKey: process.env.OPENAI_API_KEY,
    organization: process.env.OPENAI_ORG_ID
});

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;

const app = express();
app.use(express.json());


// Function to parse locations from itinerary
export function parseLocations(itinerary) {
    /* 
        Extracts location names from bullet-pointed itinerary text.
    
    Args:
        itinerary (str): A text itinerary with locations as bullet points.
    
    Returns:
        list[str]: A list of cleaned location names.
    */

    // debugging
    console.log("Extracting locations from itinerary");

    // Match lines that start with "Day: " or list items
    const locationMatches = itinerary.match(/(?:Day \d+: )?([\w\s]+, [\w\s]+)/g);

    if (!locationMatches || locationMatches.length === 0) {
        console.log("No locations found in itinerary text.");
        return [];
    }

    const locations = locationMatches.map(loc => loc.replace(/Day \d+: /, "").trim());

    // debugging
    console.log("Extracted locations:", locations);
    return locations
}

// Function to fetch place details from Google Places API
export async function fetchPlaceDetails(place) {
    /*
        Uses the Google Places API to retrieve details for a given location.
    
    Args:
        client (httpx.AsyncClient): The HTTP client used for making the request.
        place (str): The name of the place to fetch details for.
    
    Returns:
        dict or None: The first result from the API, or None if no results are found or an error occurs.
     */
    const url = "https://maps.googleapis.com/maps/api/place/textsearch/json";

    if (!process.env.OPENAI_API_KEY) {
        console.error("OPENAI_API_KEY is missing. Check the .env file.");
        return null;
    }
    
    if (!GOOGLE_API_KEY) {
        console.error("GOOGLE_API_KEY is missing. Check the .env file.");
        return null;
    }

    try {
        const response = await axios.get(url, {
            params: { query: place, key: GOOGLE_API_KEY }
        });

        if (!response.data.results || response.data.results.length === 0) {
            console.warn(`No results found for: ${place}`);
            return null;
        }
        return response.data.results[0];
    }

    catch (error) {
        console.error(`Error fetching details for ${place}`, error);
        return null;
    }
}

// TODO Create export function to call OpenAI API to optimize travel route
export async function callCreateRouteFunction(placesDetails) {

    if (!process.env.OPENAI_API_KEY) {
        console.error("OPENAI_API_KEY is missing. Check the .env file.");
        return null;
    }
    
    if (!GOOGLE_API_KEY) {
        console.error("GOOGLE_API_KEY is missing. Check the .env file.");
        return null;
    }

    const detailsStr = placesDetails.map(d =>
        `Name: ${d.name || "N/A"}\nAddress: ${d.formatted_address || "N/A"}\nRating: ${d.rating || "N/A"}`
    ).join("\n\n");

    const messages = [
        {
            role: "system",
            content: "You are a travel planning assistant that specializes in optimizing travel routes."
        },
        {
            role: "user",
            content: 
                "Based on the following list of places and their details, determine the best order " +
                "to visit all these locations. Make sure that your optimized route includes every one of the provided places, " +
                "taking into account geographic proximity and ratings. " +
                "Return the result by calling the function 'create_route' with two fields: " +
                "'route' (an ordered list of place names that includes all the given locations) " +
                "and 'explanation' (a short rationale).\n\n" + detailsStr
        }
    ];

    const functions = [{
        name: "create_route",
        description: "Generates an optimized travel route given a list of places",
        parameters: {
            type: "object",
            properties: {
                route: {
                    type: "array",
                    items: { type: "string" },
                    description: "Ordered list of place names that includes all provided locations."
                },
                explanation: {
                    type: "string",
                    description: "A brief explanation of the recommended route."
                }
            },
            required: ["route", "explanation"]
        }
    }];

    try {
        const response = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: messages,
            functions: functions,
            function_call: "auto",
            max_tokens: 200,
            temperature: 0.7
        });

        const message = response.choices[0]?.message?.function_call?.arguments;
        return message ? JSON.parse(message) : null;

    } catch (error) {
        console.error("Error determining best route:", error);
        return null;
    }
}

export const getChatResponse = async (message) => {

    if (!process.env.OPENAI_API_KEY) {
        console.error("OPENAI_API_KEY is missing. Check the .env file.");
        return null;
    }
    
    const bannedTopics = ["dog", "movie", "cat", "celebrities", "sports", "games", "technology", "ai", "politics"];
    const containsBannedTopic = bannedTopics.some((topic) =>
        message.toLowerCase().includes(topic)
    );

    if (containsBannedTopic) {
        return "I'm here to help with travel-related inquiries. Feel free to ask me about destinations, local customs, health & safety tips, or planning advice."
    }

    const messages = [
        { 
            role: "system", 
            content: "You are a helpful and focused travel assistant. You ONLY respond to travel-related inquiries. If someone asks about any non-travel topic," +
                      " kindly remind them that you can only help with travel-related inquiries."
        },
        { 
            role: "user", 
            content: message 
        }
    ];

    try {
        const response = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: messages,
            max_tokens: 150,
            temperature: 0.7,
        });

        return response.choices[0].message.content.trim();
    }

    catch (error) {
        console.error("OpenAI API Error:", error);
        return "Error communicating with AI";
    }
}

// TODO Create export function to generate google maps url
export function generateGoogleMapsUrl(route) {
    return "https://www.google.com/maps/dir/" + route.map(place => encodeURIComponent(place)).join("/");
}

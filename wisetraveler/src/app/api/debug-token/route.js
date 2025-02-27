import { OpenAI } from "openai";

export const runtime = "edge";

if (!process.env.OPENAI_API_KEY) {
  console.error("Missing OpenAI API Key. Set OPENAI_API_KEY in environment variables.");
  throw new Error("Missing OpenAI API Key.");
}

if (!process.env.GOOGLE_API_KEY) {
  console.error("Missing Google API Key. Set GOOGLE_API_KEY in environment variables.");
  throw new Error("Missing Google API Key.");
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;
if (!GOOGLE_API_KEY) {
  console.error("Missing Google API Key. Set GOOGLE_API_KEY in environment variables.");
  throw new Error("Missing Google API Key.");
}

// Function to fetch place details from Google Places API
async function fetchPlaceDetails(place) {
  console.log(`Fetching details for: ${place}`);

  try {
    const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(place)}&key=${GOOGLE_API_KEY}`;
    const response = await fetch(url);
    const data = await response.json();

    if (data.results?.length) {
      return {
        name: data.results[0].name,
        address: data.results[0].formatted_address,
        rating: data.results[0].rating || "N/A",
      };
    } else {
      console.warn(`No results found for: ${place}`);
      return null;
    }
  } catch (error) {
    console.error(`Error fetching details for ${place}:`, error);
    return null;
  }
}

// API Handler
export async function POST(req) {
  try {
    console.log("Received a POST request for trip planning.");

    const { prompt } = await req.json();
    console.log("Extracted prompt:", prompt);

    if (!prompt) {
      console.warn("⚠️ No prompt provided in request body.");
      return new Response(JSON.stringify({ error: "Prompt is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    console.log("Calling OpenAI API with function calling...");

    const messages = [
      { role: "system", content: "You are an expert travel planner. Generate a structured list of Google Places locations for a trip." },
      { role: "user", content: `Plan a trip based on the following request: ${prompt}. Return only a list of Google Places locations.` },
    ];

    // Define the function for structured response
    const functions = [
      {
        name: "generate_places_list",
        description: "Generates a structured list of places for travel itinerary",
        parameters: {
          type: "object",
          properties: {
            places: {
              type: "array",
              items: { type: "string" },
              description: "List of place names extracted from the itinerary.",
            },
          },
          required: ["places"],
        },
      },
    ];

    // Call OpenAI with function calling
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo-1106",
      messages: messages,
      functions: functions,
      function_call: "auto",
      max_tokens: 500,
      temperature: 0.7,
    });

    // Extract function call response
    const functionCall = response.choices[0]?.message?.function_call;
    if (!functionCall) {
      console.error("OpenAI did not return a function call response.");
      return new Response(JSON.stringify({ error: "AI function call failed." }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }

    const parsedResponse = JSON.parse(functionCall.arguments);
    const places = parsedResponse.places;

    if (!places || places.length === 0) {
      console.warn("⚠️ No places returned from OpenAI.");
      return new Response(JSON.stringify({ error: "No locations found." }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    console.log("Extracted places from OpenAI:", places);

    // Fetch Google Places details for each location
    const placeDetailsList = [];
    for (const place of places) {
      const details = await fetchPlaceDetails(place);
      if (details) placeDetailsList.push(details);
    }

    if (placeDetailsList.length === 0) {
      return new Response(JSON.stringify({ error: "No valid place details found." }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    console.log("Final list of place details:", placeDetailsList);

    return new Response(JSON.stringify(placeDetailsList), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });

  } catch (error) {
    console.error("Error in OpenAI request:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

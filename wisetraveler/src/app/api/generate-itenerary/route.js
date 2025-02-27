import { OpenAI } from "openai";
import { NextResponse } from "next/server";

import { fetchPlaceDetails, parseLocations, callCreateRouteFunction, generateGoogleMapsUrl } from "@/services/services";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Function to clean malformed JSON before parsing
function fixMalformedJson(rawJson) {
  return rawJson
    .replace(/([{,])\s*([\w-]+)\s*:/g, '$1"$2":') // Ensure keys are quoted
    .replace(/:\s*([\w-]+)([,\n}])/g, ': "$1"$2') // Fix unquoted string values
    .replace(/,\s*}/g, "}") // Remove trailing commas before closing braces
    .replace(/,\s*]/g, "]") // Remove trailing commas before closing brackets
    .replace(/(?<!\w)undefined(?!\w)/g, "null") // Replace "undefined" with "null"
    .replace(/\\n/g, " ") // Remove unnecessary new lines
    .trim();
}

// Handle POST request to generate a trip itinerary
export async function POST(req) {
  try {
    console.log("Received POST request for trip planning.");

    const { query } = await req.json();
    if (!query) {
      return NextResponse.json({ error: "Query is required" }, { status: 400 });
    }

    console.log("Query received:", query);
    const messages = [
      { role: "system", content: "You are an expert travel planner. Generate a well-formatted JSON travel itinerary. Ensure all JSON properties are properly quoted and formatted." },
      { role: "user", content: `Create a travel itinerary based on the following preferences: ${query}` }
    ];

    console.log("Calling OpenAI API...");
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo-1106",
      messages: messages,
      max_tokens: 1000,
      temperature: 0.7,
    });

    console.log("OpenAI response received.");
    
    // Extract response content and clean JSON format
    let rawContent = response.choices[0]?.message?.content ?? "";
    rawContent = rawContent.replace(/```json|```/g, "").trim();
    rawContent = fixMalformedJson(rawContent);

    console.log("Fixed OpenAI Response:", rawContent);

    let jsonResponse;
    try {
      jsonResponse = JSON.parse(rawContent);
      if (!jsonResponse || typeof jsonResponse !== "object") {
        throw new Error("Invalid JSON structure");
      }

      // Ensure required fields exist
      jsonResponse = {
        title: jsonResponse.title || "Unknown Trip",
        description: jsonResponse.description || "No description provided.",
        destination: jsonResponse.destination || "Unknown",
        budget: jsonResponse.budget || "Mid-range",
        duration: jsonResponse.duration || 5,
        group_size: jsonResponse.group_size || 1,
        preferences: jsonResponse.preferences || {
          adventure: false,
          luxury: false,
          nature: false,
        },
        itinerary: Array.isArray(jsonResponse.itinerary)
          ? jsonResponse.itinerary.filter((day) => Object.keys(day).length > 0)
          : [],
        cost_estimate: jsonResponse.cost_estimate || {
          accommodation: 0,
          food: 0,
          activities: 0,
          transport: 0,
          total: 0,
        },
      };

      console.log("Final JSON Response:", JSON.stringify(jsonResponse, null, 2));

      return NextResponse.json({ itinerary: jsonResponse, locations: parseLocations(jsonResponse) });
    } catch (error) {
      console.error("Error parsing OpenAI response as JSON:", error);
      return NextResponse.json({ error: "Invalid JSON format received from OpenAI." }, { status: 500 });
    }
  } catch (error) {
    console.error("Error in OpenAI request:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

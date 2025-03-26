import { parseLocations } from "@/utils/services";
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OpenAI_API_KEY});

export async function POST(req) {
    const { query } = await req.json();

    if (!query) {
        return Response.json({ error: "Query is required" });
    }

    try {
        const messages = [
            { role: "system", content: "You are a helpful travel assistant." },
            { role: "user", content: `Create a travel itinerary based on the following preferences: ${query} `}
        ];

        const response = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages,
            max_tokens: 150,
            temperature: 0.7,
        });

        const itinerary = response.choices[0].message.content.trim();
        if (!itinerary) {
            return res.status(500).json({ error: "Failed to generate itinerary" });
        }
    }

    catch (error) {
        console.error("Error generating itinerary:", error);
        res.status(500).json({ error: "Failed to generate itinerary" });
    }
}
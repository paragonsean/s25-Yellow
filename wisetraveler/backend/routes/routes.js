import express from "express";
import {
    fetchPlaceDetails,
    parseLocations,
    callCreateRouteFunction,
    generateGoogleMapsUrl,
    getChatResponse
} from "../services/services.js";

import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY 
});



router.use((req, res, next) => {
    console.log(`Received ${req.method} request to ${req.url}`);
    next();
});

// Generates the itinerary (POST /api/generate-itinerary)
router.post("/generate-itinerary", async (req, res) => {
    try {
        // debugging
        console.log("Receive POST request to /generate-itinerary");

        const { query } = req.body;
        if (!query) {
            console.log("Missing query in request body");
            return res.status(400).json({ error: "Query is required" });
        }

        console.log("Query received:", query);
        const messages = [
            { role: "system", content: "You are a helpful travel assistant." },
            { role: "user", content: `Create a travel itinerary based on the following preferences: ${query} `}
        ];

        // debugging
        console.log("Sending request to OpenAI");

        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: messages,
            max_tokens: 150,
            temperature: 0.7,
        });

        // debugging
        console.log("OpenAI response received");

        const itinerary = response.choices[0]?.message?.content?.trim();
        if (!itinerary) {
            return res.status(500).json({ error: "Failed to generate itinerary" });
        }

        // debugging
        console.log("Sending response back to client");
        res.json({ itinerary, locations: parseLocations(itinerary) });
    }

    catch (error) {
        console.error("Error generating itinerary:", error);
        res.status(500).json({error: "Failed to generate itinerary" });
    }
});

router.post("/get-route", async (req, res) => {
    try {
        const { locations } = req.body;
        if (!locations || locations.length < 2) {
            return res.status(400).json({ error: "At least two locations are required" });
        }

        const placesDetails = [];
        for (const location of locations) {
            const details = await fetchPlaceDetails(location);
            if (details) placesDetails.push(details);
        }

        if (placesDetails.length < 2) {
            return res.status(400).json({ error: "Not enough valid locations to optimize a route" });
        }

        const routeInfo = await callCreateRouteFunction(placesDetails);
        if (!routeInfo || !routeInfo.route) {
            console.error("OpenAI failed to generate a route");
            return res.status(500).json({ error: "Failed to optimize the route" });
        }

        res.json({
            route: routeInfo.route,
            explanation: routeInfo.explanation,
            maps_url: generateGoogleMapsUrl(routeInfo.route)
        });

    }   

    catch (error) {
        console.error("Error optimizing route:", error);
        res.status(500).json({ error: "Failed to optimize the route" });
    }

});

router.post("/chat", async (req, res) => {
    try {
        const { message } = req.body;
        if (!message) {
            return res.status(400).json({ error: "Message is required" });
        }

        const chatResponse = await getChatResponse(message);
        if (!chatResponse) {
            return res.status(500).json({ error: "Failed to generate chat response" });
        }

        res.json({ response: chatResponse });
    }

    catch (error) {
        console.error("Error generating chat response:", error);
        res.status(500).json({ error: "Failed to generate chat response" });
    }
});

// Route to fetch place details from Google Places API
router.get("/places/:place", async (req, res) => {
    const place = req.params.place;
    const details = await fetchPlaceDetails(place);
    res.json(details);
});

// TODO: post example to parse locations from itinerary

export default router;
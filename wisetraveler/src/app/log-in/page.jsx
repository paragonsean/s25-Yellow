"use client";

import { useState, useEffect } from "react";
import axios from "axios";

export default function Home() {
    const [query, setQuery] = useState("");
    const [itinerary, setItinerary] = useState(null);
    const [route, setRoute] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Base URL for FastAPI backend
    const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

    // Function to generate itinerary using FastAPI
    const generateItinerary = async () => {
        if (!query.trim()) {
            setError("Please enter travel preferences.");
            return;
        }
        
        setLoading(true);
        setError(null);

        try {
            const response = await axios.post(`${API_BASE_URL}/api/generate-itinerary`, { query });

            if (response.status === 200) {
                setItinerary(response.data);
            } else {
                throw new Error("Failed to generate itinerary.");
            }
        } catch (err) {
            setError("Failed to generate itinerary. Please try again.");
            console.error("Error fetching itinerary:", err);
        } finally {
            setLoading(false);
        }
    };

    // Function to fetch optimized route using FastAPI
    const getRoute = async () => {
        if (!itinerary?.locations || itinerary.locations.length === 0) {
            setError("No locations found in itinerary.");
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const response = await axios.post(`${API_BASE_URL}/api/get-route`, { locations: itinerary.locations });

            if (response.status === 200) {
                setRoute(response.data);
            } else {
                throw new Error("Failed to fetch optimized route.");
            }
        } catch (err) {
            setError("Failed to fetch optimized route. Please try again.");
            console.error("Error fetching route:", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
            <div className="max-w-lg w-full bg-white p-6 rounded-lg shadow-lg">
                <h1 className="text-2xl font-bold text-center mb-4">Travel Itinerary Planner</h1>

                {/* Input field for user query */}
                <input
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded mb-4"
                    placeholder="Enter travel preferences..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />

                {/* Button to generate itinerary */}
                <button
                    className="w-full bg-blue-500 text-white p-2 rounded disabled:opacity-50"
                    onClick={generateItinerary}
                    disabled={loading}
                >
                    {loading ? "Generating..." : "Generate Itinerary"}
                </button>

                {/* Error Message */}
                {error && <p className="text-red-500 mt-4">{error}</p>}

                {/* Display itinerary if generated */}
                {itinerary && (
                    <div className="mt-6 p-4 border border-gray-300 rounded-lg">
                        <h2 className="text-lg font-semibold">Generated Itinerary</h2>
                        <pre className="bg-gray-200 p-2 rounded whitespace-pre-wrap">{itinerary.itinerary}</pre>

                        {/* Button to get optimized route */}
                        <button
                            className="w-full bg-green-500 text-white p-2 mt-4 rounded disabled:opacity-50"
                            onClick={getRoute}
                            disabled={loading}
                        >
                            {loading ? "Optimizing..." : "Optimize Route"}
                        </button>
                    </div>
                )}

                {/* Display optimized route if available */}
                {route && (
                    <div className="mt-6 p-4 border border-gray-300 rounded-lg">
                        <h2 className="text-lg font-semibold">Optimized Route</h2>
                        <pre className="bg-gray-200 p-2 rounded whitespace-pre-wrap">{JSON.stringify(route.routeInfo, null, 2)}</pre>

                        {/* Link to view route on Google Maps */}
                        <a
                            href={route.mapsUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block text-center bg-blue-500 text-white p-2 mt-4 rounded"
                        >
                            View Route on Google Maps
                        </a>
                    </div>
                )}
            </div>
        </div>
    );
}

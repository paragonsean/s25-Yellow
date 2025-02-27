import { NextResponse } from "next/server";
import { fetchPlaceDetails, callCreateRouteFunction, generateGoogleMapsUrl } from "../services/services";

export async function POST(req) {
  try {
    console.log("Received POST request to /api/get-route");

    const { locations } = await req.json();
    if (!locations || locations.length < 2) {
      return NextResponse.json({ error: "At least two locations are required" }, { status: 400 });
    }

    console.log("Locations received:", locations);

    // Fetch details for each location
    const placesDetails = [];
    for (const location of locations) {
      const details = await fetchPlaceDetails(location);
      if (details) placesDetails.push(details);
    }

    if (placesDetails.length < 2) {
      return NextResponse.json({ error: "Not enough valid locations to optimize a route" }, { status: 400 });
    }

    // Call function to generate optimized route
    const routeInfo = await callCreateRouteFunction(placesDetails);
    if (!routeInfo || !routeInfo.route) {
      console.error("Failed to generate a route");
      return NextResponse.json({ error: "Failed to optimize the route" }, { status: 500 });
    }

    console.log("Route optimized successfully.");

    return NextResponse.json({
      route: routeInfo.route,
      explanation: routeInfo.explanation,
      maps_url: generateGoogleMapsUrl(routeInfo.route),
    });

  } catch (error) {
    console.error("Error optimizing route:", error);
    return NextResponse.json({ error: "Failed to optimize the route" }, { status: 500 });
  }
}

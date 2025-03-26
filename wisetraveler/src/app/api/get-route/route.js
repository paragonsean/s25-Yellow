import {
    fetchPlaceDetails,
    callCreateRouteFunction,
    generateGoogleMapsUrl,
} from "@/utils/services";

export async function POST(req) {
    const { locations } = await req.json();

    if (!locations || locations.legnth < 2) {
        return Response.json({ error: "At least two locations are required" }, { status: 400 });
    }

    const placesDetails = [];
    for (const location of locations) {
        const details = await fetchPlaceDetails(location);
        
        if (details) {
            placesDetails.push(details);
        }
    }

    if (placesDetails.length < 2) {
        return Response.json({ error: "Not enough valid locations" }, { status: 400 });
    }

    try {
        const routeInfo = await callCreateRouteFunction(placesDetails);

        if (!routeInfo || !routeInfo.route) {
            return Response.json({ error: "Failed to optimize route" }, { status: 500 });
        }

        return Response.json({
            route: routeInfo.route,
            explanation: routeInfo.explanation,
            maps_url: generateGoogleMapsUrl(routeInfo.route)
        });
    }
    
    catch (error) {
        console.error("Error optimizing route:", error);
        return Response.json({ error: "Internal server error" }, { status: 500 });
    }
}
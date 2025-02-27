import { NextResponse } from "next/server";
import { fetchPlaceDetails } from "@/services/services";

export async function GET(req, { params }) {
  try {
    console.log("Received GET request to /api/places/:place");

    const place = params.place;
    if (!place) {
      return NextResponse.json({ error: "Place parameter is required" }, { status: 400 });
    }

    console.log("Fetching details for place:", place);
    
    const details = await fetchPlaceDetails(place);
    if (!details) {
      return NextResponse.json({ error: "No details found for the specified place" }, { status: 404 });
    }

    console.log("Place details fetched successfully.");
    
    return NextResponse.json(details);

  } catch (error) {
    console.error("Error fetching place details:", error);
    return NextResponse.json({ error: "Failed to fetch place details" }, { status: 500 });
  }
}

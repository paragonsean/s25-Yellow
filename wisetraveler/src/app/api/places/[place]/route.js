import { fetchPlaceDetails } from "@/src/utils/services";

export async function GET(req, { params }) {
  const { place } = params;

  try {
    const details = await fetchPlaceDetails(place);
    return Response.json(details);
  } 
  catch (error) {
    console.error(`Error fetching place details for ${place}:`, error);
    return Response.json({ error: "Failed to fetch place details" }, { status: 500 });
  }
}
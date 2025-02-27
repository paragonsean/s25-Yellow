import { auth } from "@clerk/nextjs/server"
import { supabaseClient, supabaseClientPublic } from "@/lib/supabase-client"

// Fetch user-specific trips (Private)
export async function getTripsByUserId() {
  console.log("Fetching trips for authenticated user...")

  const { userId } = await auth()
  if (!userId) {
    console.error("User is not authenticated.")
    return []
  }

  try {
    const supabase = await supabaseClient()

    // TODO: Fetch trips for the authenticated user
    // const { data: trips, error } = await supabase.from("trips").select().eq("user_id", userId).order("created_at", { ascending: false });

    console.log("User trips fetched successfully.")
    return [] // TODO: Replace with actual fetched data
  } catch (error) {
    console.error("Unexpected error in `getTripsByUserId()`:", error)
    return []
  }
}

// Fetch latest generated trips (Public)
export async function getLatestTrips() {
  console.log("Fetching latest generated trips...")

  const supabase = supabaseClientPublic()
  try {
    // TODO: Fetch latest trips
    // const { data: trips, error } = await supabase.from("trips").select().order("created_at", { ascending: false });

    console.log("Latest trips fetched successfully.")
    return [] // TODO: Replace with actual fetched data
  } catch (error) {
    console.error("Unexpected error in `getLatestTrips()`:", error)
    return []
  }
}

// Fetch a specific trip by ID (Public)
export async function getTrip(id) {
  console.log("Fetching trip with ID:", id)

  const supabase = supabaseClientPublic()
  try {
    // TODO: Fetch a trip by its ID
    // const { data: trip, error } = await supabase.from("trips").select().eq("id", id).single();

    console.log("Trip fetched successfully.")
    return null // TODO: Replace with actual fetched trip
  } catch (error) {
    console.error("Unexpected error in `getTrip()`:", error)
    return null
  }
}

// Get total trip count
export async function getTripsCount() {
  console.log("Counting total trips...")

  const supabase = supabaseClientPublic()
  try {
    // TODO: Get the count of trips
    // const { count, error } = await supabase.from("trips").select("*", { count: "exact" });

    console.log("Total trip count fetched successfully.")
    return 0 // TODO: Replace with actual count
  } catch (error) {
    console.error("Unexpected error in `getTripsCount()`:", error)
    return 0
  }
}

// Fetch public trip by ID (From "trip_plans" Table)
export async function getTripPublic(id) {
  console.log("Fetching public trip with ID:", id)

  const supabase = supabaseClientPublic()
  try {
    // TODO: Fetch a public trip by ID from "trip_plans" table
    // const { data: trip, error } = await supabase.from("trip_plans").select("content_json").eq("id", id).single();

    console.log("Public trip fetched successfully.")
    return null // TODO: Replace with actual fetched trip content
  } catch (error) {
    console.error("Unexpected error in `getTripPublic()`:", error)
    return null
  }
}

// Fetch a private trip (Requires authentication)
export async function getTripPrivate(id) {
  console.log("Fetching private trip with ID:", id)

  const supabase = await supabaseClient() // Uses authenticated Supabase client
  try {
    // TODO: Fetch a private trip by ID
    // const { data: trip, error } = await supabase.from("trips").select("content_json").eq("id", id).single();

    console.log("Private trip fetched successfully.")
    return null // TODO: Replace with actual fetched trip content
  } catch (error) {
    console.error("Unexpected error in `getTripPrivate()`:", error)
    return null
  }
}

// Fetch private trips (For authenticated users)
export async function getTripsPrivate() {
  console.log("Fetching private trips for authenticated user...")

  const { getToken, userId } = await auth()
  const supabaseAccessToken = await getToken({ template: "supabase" })
  const supabase = await supabaseClient()

  try {
    // TODO: Fetch private trips for authenticated user
    // const { data: trips, error } = await supabase.from("trips").select().eq("user_id", userId);

    console.log("Private trips fetched successfully.")
    return [] // TODO: Replace with actual fetched data
  } catch (error) {
    console.error("Unexpected error in `getTripsPrivate()`:", error)
    return []
  }
}

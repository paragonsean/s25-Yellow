"use server"

import { revalidatePath } from "next/cache"
import { auth } from "@clerk/nextjs/server"
import { supabaseClient, supabaseClientPublic } from "@/lib/supabase-client"

//  Fetch private trips for the authenticated user
export async function getUserTrips() {
  console.log("Fetching user-specific trips...")

  const { userId } = await auth()
  if (!userId) {
    console.error("User is not authenticated.")
    return { trips: [], data: [] }
  }

  try {
    const supabase = await supabaseClient()

    // TODO: Fetch saved trips for the authenticated user
    // const { data: trips, error: tripsError } = await supabase.from("trips").select().eq("user_id", userId).order("created_at", { ascending: false });

    // TODO: Fetch latest generated trip plans
    // const { data: generatedTrips, error: generatedError } = await supabase.from("generations").select().order("created_at", { ascending: false }).limit(3);

    console.log("User-specific trips fetched successfully.")
    return { trips: [], data: [] } // TODO: Replace with actual fetched data
  } catch (error) {
    console.error("Unexpected error in `getUserTrips()`:", error)
    return { trips: [], data: [] }
  }
}

// Save generated trip plan (Public)
export async function saveGeneration(generatedTrip) {
  console.log("Saving generated trip...")

  const supabase = await supabaseClientPublic()

  try {
    // TODO: Save the generated trip to the "generations" table
    // const { error } = await supabase.from("generations").insert([data]);

    console.log("Trip plan saved successfully.")
    revalidatePath("/") // Refresh UI
  } catch (error) {
    console.error("Unexpected error in `saveGeneration()`:", error)
    throw new Error("Failed to save generated trip.")
  }
}

// Save user trip (Private)
export async function saveTrip(generatedTrip) {
  console.log("Saving user trip...")

  const { userId } = await auth()
  if (!userId) {
    console.error("User is not authenticated.")
    throw new Error("User ID not found")
  }

  try {
    const supabase = await supabaseClient()

    // TODO: Save the trip for the authenticated user
    // const { error } = await supabase.from("trips").insert([data]);

    console.log("Trip saved successfully.")
  } catch (error) {
    console.error("Unexpected error in `saveTrip()`:", error)
    throw new Error("Failed to save the trip.")
  }
}

// Delete user trip (Private)
export async function deleteTrip(id) {
  console.log("Deleting trip with ID:", id)

  const { userId } = await auth()
  if (!userId) {
    console.error("User is not authenticated.")
    throw new Error("User ID not found")
  }

  try {
    const supabase = await supabaseClient()

    // TODO: Delete the trip by ID from the "trips" table
    // const { error } = await supabase.from("trips").delete().eq("id", id);

    console.log("Trip deleted successfully.")
    revalidatePath("/dashboard/my-trips") // Refresh UI
  } catch (error) {
    console.error("Unexpected error in `deleteTrip()`:", error)
    throw new Error("Failed to delete the trip.")
  }
}

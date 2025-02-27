import { NextResponse } from "next/server";

export async function GET(req) {
  const authHeader = req.headers.get("Authorization");
  const validApiKey = process.env.NEXT_PUBLIC_API_KEY; // Fetch key from .env

  // Check if API Key is missing or incorrect
  if (!authHeader || authHeader !== `Bearer ${validApiKey}`) {
    return NextResponse.json({ error: "Unauthorized - Invalid API Key" }, { status: 401 });
  }

  return NextResponse.json({ message: "API Access Granted!" });
}

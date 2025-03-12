import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const { message } = await req.json();
        if (!message) {
            return NextResponse.json({ error: "Message is required" }, { status: 400 });
        }

        // Directly forwards requests to Express backend
    
        const response = await fetch("http://localhost:8000/api/chat", {  // Call backend
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ message }),
        });

        const data = await response.json();
        return NextResponse.json({ response: data.response || "No response from AI" });

    } catch (error) {
        console.error("Error in API route:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
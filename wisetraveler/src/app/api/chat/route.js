import { getChatResponse } from "@/utils/services";

export async function POST(req) {
    const { message } = await req.json();

    if (!message) {
        return Response.json({ error: "Message is required" }, { status: 400 });
    }

    try {
        const response = await getChatResponse(message);
        return Response.json({ response });

    } 
    
    catch (error) {
        console.error("Error generating chat response:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
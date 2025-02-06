import { Configuration, OpenAIApi } from "openai";

export default async function handler(req, res) {
    if (req.method !== "POST") return res.status(405).json({ error: "Method Not Allowed" });

    const { query } = req.body;
    if (!query) return res.status(400).json({ error: "Query is required." });

    const openai = new OpenAIApi(new Configuration({ apiKey: process.env.OPENAI_API_KEY }));

    try {
        const messages = [
            { role: "system", content: "You are a helpful travel assistant." },
            { role: "user", content: `Create a travel itinerary based on these preferences: ${query}.\nList key locations in bullet points.` }
        ];

        const response = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages,
            max_tokens: 150,
            temperature: 0.7,
        });

        const itinerary = response.data.choices[0].message.content.trim();
        const locations = itinerary.split("\n")
            .filter(line => line.trim().startsWith("-") || line.trim().startsWith("*"))
            .map(line => line.replace(/[-*]\s*/, "").trim());

        res.json({ itinerary, locations });
    } catch (error) {
        console.error("Error generating itinerary:", error);
        res.status(500).json({ error: "Failed to generate itinerary." });
    }
}

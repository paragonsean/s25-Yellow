import express from "express";
import dotenv from "dotenv";
import routes from "./routes/routes.js";
import cors from "cors";

dotenv.config();

// debugging
console.log("OpenAI API Key:", process.env.OPENAI_API_KEY ? "Loaded" : "Missing API Key");

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api", routes);    // Uses the API routes

app.get("/" , (req, res) => {
    res.json({ message: "Welcome to the Travel Itinerary API" });
});

// Next.js forwards requests from api/chat to this Express backend
app.post("/chat", async (req, res) => {

    try {
        const { message } = req.body;
        if (!message) {
            return res.status(400).json({ error: "Message is required" });
        }

        console.log("Received message:", message);

        const response = await getChatResponse(message);

        if (response) {
            res.json({ response });
        }

        else {
            res.status(500).json({ error: "No response received" });
        }
    }
    
    catch (error) {
        console.error("Error processing chat request:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`Server running on port http://localhost:${PORT}`);
});
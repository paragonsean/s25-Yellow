import express from "express";
import dotenv from "dotenv";
import routes from "./routes/routes.js";

dotenv.config();

// debugging
console.log("OpenAI API Key:", process.env.OPENAI_API_KEY ? "Loaded" : "Missing API Key");
const app = express();
app.use(express.json());

app.use("/api", routes);    // Uses the API routes

app.get("/" , (req, res) => {
    res.json({ message: "Welcome to the Travel Itinerary API" });
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
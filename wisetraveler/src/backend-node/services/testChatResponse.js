import { getChatResponse } from "./services.js";
import dotenv from "dotenv";

dotenv.config();

console.log("API Key:", process.env.OPENAI_API_KEY ? "Exists" : "Missing");
console.log("Loaded API Key:", process.env.OPENAI_API_KEY);
console.log("Test Variable:", process.env.TEST_VARIABLE);

const testChatResponse = async () => {
    try {
        const message = "Tell me about the best places to visit in Tokyo.";
        console.log("Sending message:", message);

        const response = await getChatResponse(message);
        if (response) {
            console.log("Chatbot response:", response);
        }

        else {
            console.log("No response received");
        }
    }

    catch (error) {
        console.error("Error testing chat response:", error);
    }
};

testChatResponse();
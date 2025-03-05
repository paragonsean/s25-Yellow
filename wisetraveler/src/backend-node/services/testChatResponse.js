import dotenv from "dotenv";
import { getChatResponse } from "./services.js";

dotenv.config();

const testChatResponse = async () => {
    try {
        const message = "Tell me about the best places to visit in Tokyo.";
        console.log("Sending message:", message);

        const response = await getChatResponse(message);
        if (response) {
            console.log("Chatbot response:", response);
        } else {
            console.log("No response received");
        }
    } catch (error) {
        console.error("Error testing chat response:", error);
    }
};

testChatResponse();

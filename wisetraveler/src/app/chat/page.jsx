"use client"; 
import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import styles from "./page.module.css"

export default function Chat(){
    const [userInput, setUserInput] = useState("");
    const [messages, setMessages] = useState([]);
    const messagesEndRef = useRef(null);


    // Auto-scrolls when new messages arrive
    // Needs fixes on the font and styling
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth"});
    }, [messages]);

    const fetchChatResponse = async () => {
        if (!userInput.trim()) return;  // This prevents users from sending empty messages

        const newMessage = { sender: "user", text: userInput };
        setMessages((prevMessages) => [...prevMessages, newMessage]);

        try {
            const response = await fetch("/api/chat", { // Now uses Next.js API route since I couldn't get the backend route to work properly
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ message: userInput }),
            });

            const data = await response.json();
            const botMessage = { sender: "bot", text: data.response || "No response from AI" };

            setMessages((prevMessages) => [...prevMessages, botMessage]);
        }

        catch (error) {
            console.error("Error fetching chat response:", error);
            setMessages((prevMessages) => [...prevMessages, { sender: "bot", text: "Error getting response "}]);
        }

        setUserInput("");   // Clears user input after sending a message
    };

    return(
        <div className={styles.chatPage}>
            <section className={styles.sideBar}>
            <Link href="/">Home</Link>

            <button 
                className={styles.newChatbutton}
                onClick={() => setMessages([])} // Supposed to clear chat history
            >
                + New Chat
            </button>
            <ul className={styles.otherPages}>
                <li>Search</li>
                <li>Recommendation</li>
                <li>My trip</li>
            </ul>
            <nav>
                <p>&copy; {new Date().getFullYear()} WiseTraveler</p>
            </nav>
            </section>

            <section className={styles.chat}>
                <h1>WiseTraveler</h1>
                <ul className={styles.conversations}>
                    {messages.map((msg, index) => (
                        <li key = {index} className={msg.sender === "user" ? styles.userMessage : styles.botMessage}>
                             <strong>{msg.sender === "user" ? "You" : "WiseTraveler"}:</strong> {msg.text}
                            </li>
                    ))}
                    <div ref ={messagesEndRef} />   {/* Auto-scroll logic here */}
                </ul>

                <div className={styles.bottomSection}>
                    <div className={styles.inputContainer}>
                        <input 
                            type="text"
                            value={userInput}
                            onChange={(e) => setUserInput(e.target.value)}  // This updates the state of the chatbox
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    e.preventDefault(); // This prevents newlines from happening
                                    fetchChatResponse();
                                }
                            }}
                            placeholder="Ask me about your trip..."
                        />
                        <button className={styles.submit} onClick={fetchChatResponse}>Send</button> {/* This is supposed to send on a click but didn't */}
                    </div>
                    <p>Discover the World with WiseTraveler</p>

                </div>
            </section>
            <section className={styles.map} >
                map
            </section>
        </div>
    

    );
}
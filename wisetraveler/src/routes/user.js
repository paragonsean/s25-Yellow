const express = require('express');
const router = express.Router();
const db = require('../db');
const {hashPassword} = require('../utils/authHelper'); 
require('dotenv').config();

// Handles creation, updating, and deletion of user accounts

// Create a new user account with (first_name, last_name, username, email, password)
// May need to update with birthday and gender
router.post("/create", async (req, res) => {
    const { first_name, last_name, username, email, password } = req.body;
    if (!first_name || !last_name || !username || !email || !password) {
        return res.status(400).json({ error: "All fields are required" });
    }

    try {
        const hashedPassword = await hashPassword(password);
        const query = "INSERT INTO users (first_name, last_name, username, email, password) VALUES (?, ?, ?, ?, ?)";
        db.query(query, [first_name, last_name, username, email, hashedPassword], (err, result) => {
            if (err) {
                console.error("Error creating account:", err);
                return res.status(500).json({ error: "Failed to create account" });
            }
            res.status(201).json({ message: "Account created successfully", userId: result.insertId });
        });
    } catch (err) {
        console.error("Error hashing password:", err);
        res.status(500).json({ error: "Internal server error" });
    }
});

// Delete an account
router.delete("/delete/:id", (req, res) => {
    const { id } = req.params;

    const query = "DELETE FROM users WHERE id = ?";
    db.query(query, [id], (err, result) => {
        if (err) {
            console.error("Error deleting account:", err);
            return res.status(500).json({ error: "Failed to delete account" });
        }
        res.json({ message: "Account deleted successfully" });
    });
});

// Update account



module.exports = router;
import supabase from "@/db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export default async function handler(req, res) {
    if (req.method === "GET") {
        const {email} = req.query;

        if (!email) {
            return res.status(400).json({ error: "Email is required" });
        }

        try {
            const { data: user, error } = await supabase
                .from("users")
                .select("*")
                .eq("email", email)
                .single();

            if (error || !user) {
                return res.status(404).json({ error: "User not found" });
            }

            if (!process.env.JWT_SECRET) {
                return res.status(500).json({ error: "Server misconfiguration, missing JWT_SECRET" });
            }

            const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: "7d" });

            return res.status(200).json({ token, user });
        } catch (error) {
            console.error("Error fetching user:", error);
            return res.status(500).json({ error: "Something went wrong" });
        }
    } else {
        return res.status(405).json({ error: "Method not allowed" });
    }
}
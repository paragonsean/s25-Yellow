import supabase from "@/db"; 
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export default async function handler(req, res) {
    if (req.method === "PUT") {
        const { email } = req.query;
        const { firstName, lastName, username, birthdate } = req.body;

        if (!email || !firstName || !lastName || !username || !birthdate) {
            return res.status(400).json({ error: "Email, first name, last name, username, and birthdate are required" });
        }

        try {
            const { data: user, error } = await supabase
                .from("users")
                .update({ first_name: firstName, last_name: lastName, username: username, birth_date: birthdate })
                .eq("email", email)
                .select("*")
                .single();
            
            if(error) {
                return res.status(500).json({ error: "Something went wrong" });
            }

            if (!process.env.JWT_SECRET) {
                return res.status(500).json({ error: "Server misconfiguration, missing JWT_SECRET" });
            }

            const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: "7d" });

            return res.status(200).json({ token, user });
        } catch (err) {
            console.error("Error: ", err);
            return res.status(500).json({ error: "Something went wrong" });
        }
    } else {
        return res.status(405).json({ error: "Method not allowed" });
    }
}

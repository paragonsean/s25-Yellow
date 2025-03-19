import supabase from "@/db"; 
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export default async function handler(req, res) {
    if (req.method === "PUT") {
        const { email, firstName, lastName, username, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: "Email, location, and password are required" });
        }

        try {
            const { data: existingUser, error: emailCheckError } = await supabase
                .from("users")
                .select("id")
                .eq("email", email)
                .single();

            if (existingUser) {
                return res.status(400).json({ error: "Email is already taken" });
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            const { data: user, error } = await supabase
                .from("users")
                .insert({ email: email, username: username, first_name: firstName, last_name: lastName, password_hash: hashedPassword })
                .select("*")
                .single();

            if (error || !user) {
                console.error("Error inserting user:", error);
                return res.status(500).json({ error: "Something went wrong during signup" });
            }

            if (!process.env.JWT_SECRET) {
                return res.status(500).json({ error: "Server misconfiguration, missing JWT_SECRET" });
            }

            const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: "7d" });

            return res.status(200).json({ token, user });
        } catch (err) {
            console.error("Error during signup:", err);
            return res.status(500).json({ error: "Something went wrong" });
        }
    } else {
        return res.status(405).json({ error: "Method not allowed" });
    }
}

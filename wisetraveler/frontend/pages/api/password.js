import supabase from "@/db"; 
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export default async function handler(req, res) {
    if (req.method === "PUT") {
        const { email } = req.query;
        const { password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: "Email and password are required" });
        }

        try {
            //update password
            const hashedPassword = await bcrypt.hash(password, 10);

            const { data: user, error } = await supabase
                .from("users")
                .update({ password_hash: hashedPassword })
                .eq("email", email)
                .select("*")
                .single();
            
            if(error) {
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

const express = require("express");
const router = express.Router();
const supabase = require("@/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  try {
    const{ data: user, error } = await supabase
        .from("users")
        .select("*")
        .eq("email", email)
        .single();

    if (error || !user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: "7d" });

    return res.status(200).json({ token, user });
  } catch (err) {
    console.error("Error during login:", err);
    return res.status(500).json({ error: "Something went wrong" });
  }
})

module.exports = router;
/* export async function POST(req) {
  try {
    const { email, password } = await req.json();

    const { data: user, error } = await supabase
        .from("users")
        .select("*")
        .eq("email", email)
        .single();

    if (error || !user) {
    return Response.json({error: "Invalid Credentials" }, {status: 401});
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return Response.json({error: "Invalid Credentials" }, {status: 401});
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: "7d"});

    return Response.json({ token, user }, { status: 200 });
  } catch (error) {
    console.error(error)
    return Response.json({ error: "Something went wrong" }, {status: 500});
  }
}
*/
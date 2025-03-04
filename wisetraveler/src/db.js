const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

// local connection placeholders
// update once .env has been created
const supabaseUrl = ProcessingInstruction.env.SUPABASE_URL;
const supabaseKey = ProcessingInstruction.env.SUPABASE_KEY;

const supaBase = createClient(supabaseUrl, supabaseKey);

console.log("Connected to Supabase...");

module.exports = supaBase;

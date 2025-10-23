// 1. Core Imports
const express = require('express');
const cors = require('cors'); // Required for Cross-Origin communication
require('dotenv').config(); // Load environment variables from .env

// 2. Initialize App and Constants
const app = express();
// Use the PORT from your .env, or default to 4000
const port = process.env.PORT || 4000; 
const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
const OPENROUTER_MODEL_NAME = process.env.OPENROUTER_MODEL_NAME || 'mistralai/mistral-small-3.2-24b-instruct-2506';

// *******************************************************************
// 🔑 NEW: Define the allowed origin for CORS
// Read the deployed frontend URL from a new environment variable (e.g., set on Render)
// Fallback to localhost for development
const ALLOWED_ORIGIN = process.env.FRONTEND_URL || 'http://localhost:3000';
console.log(`CORS ALLOWED_ORIGIN: ${ALLOWED_ORIGIN}`);
// *******************************************************************

// Simple check to ensure API key is present
if (!OPENROUTER_API_KEY) {
    console.error("CRITICAL: OPENROUTER_API_KEY is not set in .env file!");
    process.exit(1);
}

// 3. Middleware Configuration
// CRITICAL: Configure CORS to allow requests from your React app's origin
app.use(cors({
    // *******************************************************************
    // 🛑 FIX: Use the dynamically configured ALLOWED_ORIGIN
    origin: ALLOWED_ORIGIN,
    // This ensures that your deployed Vercel frontend is the only allowed origin (besides localhost in dev)
    // *******************************************************************
}));

// Middleware to parse JSON request bodies
app.use(express.json());

// 4. API Route Definition
app.post('/api/classify', async (req, res) => {
    // Extract the text to classify from the request body
    const { text } = req.body;

    if (!text) {
        return res.status(400).json({ error: 'Missing "text" in request body.' });
    }

    // Define the prompt for the language model
    const prompt = `Classify the following text content as either "SAFE" or "UNSAFE" for a general audience.
        If the content is inappropriate, explicit, or hateful, classify as UNSAFE. Otherwise, classify as SAFE.
        Respond ONLY with the single word: SAFE or UNSAFE.

        Content: "${text}"
    `;

    try {
        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                model: OPENROUTER_MODEL_NAME,
                messages: [
                    { role: "user", content: prompt }
                ]
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('OpenRouter API Error:', errorData);
            return res.status(response.status).json({ 
                error: 'External API call failed', 
                details: errorData 
            });
        }

        const data = await response.json();
        
        // Extract the classification text and clean it up (e.g., remove whitespace)
        const classification = data.choices[0].message.content.trim().toUpperCase();

        // Respond to the client with the classification
        res.json({ 
            text: text,
            classification: classification
        });

    } catch (error) {
        console.error('Server error during API call:', error);
        res.status(500).json({ error: 'Internal server error during classification.' });
    }
});

// 5. Start the Server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

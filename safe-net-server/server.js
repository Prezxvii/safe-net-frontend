 // 1. Core Imports
const express = require('express');
const cors = require('cors'); // Required for Cross-Origin communication
require('dotenv').config(); // Load environment variables from .env

// 2. Initialize App and Constants
const app = express();
// Use the PORT from your .env, or default to 4000
const port = process.env.PORT || 4000; 
const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;

// 🛑 FIX: Updated the model name to the new Mistral model
const OPENROUTER_MODEL_NAME = process.env.OPENROUTER_MODEL_NAME || 'mistralai/mistral-small-3.2-24b-instruct-2506';

// 🔑 CORS: Define the allowed origin for CORS using an environment variable
const ALLOWED_ORIGIN = process.env.FRONTEND_URL || 'http://localhost:3000';
console.log(`CORS ALLOWED_ORIGIN: ${ALLOWED_ORIGIN}`);

// Simple check to ensure API key is present
if (!OPENROUTER_API_KEY) {
    console.error("CRITICAL: OPENROUTER_API_KEY is not set in .env file!");
    process.exit(1);
}

// 3. Middleware Configuration
// 🛑 CORS: Configure CORS to allow the deployed frontend origin
app.use(cors({
    origin: ALLOWED_ORIGIN,
}));

// Middleware to parse JSON request bodies
app.use(express.json());

// 4. API Route Definition (USING DETAILED JSON RESPONSE PROMPT)
app.post('/api/classify', async (req, res) => {
    // Expects 'text' field from the frontend
    const { text } = req.body;

    if (!text) {
        return res.status(400).json({ error: 'Missing "text" in request body.' });
    }

    // Prompt to force structured JSON output with detailed reasoning (30-50 words)
    const prompt = `Classify the following text content. Your response MUST be a single JSON object.

    **Categories and Criteria:**
    1.  **SAFE**: Benign, family-friendly, no concerning elements.
    2.  **UNSAFE**: Questionable, mature, or spam elements; not overtly illegal.
    3.  **WARNING**: Moderately offensive, explicit, or sexually suggestive material.
    4.  **BLOCKED**: Severe hate speech, illegal acts (e.g., phishing), or extreme violence.

    **REQUIRED JSON STRUCTURE:**
    {
        "category": "[SAFE | UNSAFE | WARNING | BLOCKED]",
        "safety_score": [A number between 0.0 and 10.0, where 10.0 is safest],
        "reason": "[A **detailed explanation** of the classification, clearly stating why it fits the category. The explanation must be between 30 and 50 words long.]"
    }

    Content to classify: "${text}"
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
                response_format: { type: "json_object" }, 
                messages: [
                    { 
                        role: "system", 
                        content: "You are an expert content safety classifier. You must respond ONLY with the requested JSON object." 
                    },
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
        const rawModelContent = data.choices[0].message.content.trim();
       
        // Parse the model's response string into a usable JavaScript object
        let classificationData;
        try {
            classificationData = JSON.parse(rawModelContent);
        } catch (e) {
            console.error('Failed to parse model output as JSON:', rawModelContent);
            return res.status(500).json({ error: 'Model returned unparseable response.', raw: rawModelContent });
        }
        
        // Respond to the client with the parsed structured data
        res.json({ 
            category: classificationData.category,
            safety_score: classificationData.safety_score,
            reason: classificationData.reason,
            original_text: text 
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

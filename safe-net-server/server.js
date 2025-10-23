// 4. API Route Definition (UPDATED PROMPT FOR DETAIL)
app.post('/api/classify', async (req, res) => {
    const { text } = req.body;
    if (!text) {
        return res.status(400).json({ error: 'Missing "text" in request body.' });
    }

    // 🛑 FIX: Prompt revised to request a much longer, more descriptive reason
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
                // Use the API feature to request JSON output
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

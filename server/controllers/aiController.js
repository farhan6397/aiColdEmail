const EmailHistory = require("../models/EmailHistory");
const axios = require("axios");

exports.generateEmail = async (req, res) => {
    const { prompt } = req.body;
    if (!prompt) {
        return res.status(400).json({ message: "Prompt is required" });
    }
    try {
        const systemPrompt = `You are an expert cold email writer and marketing strategist with over 15 years of experience. Generate the requested email materials based on the prompt. You MUST respond with ONLY a valid JSON object containing exactly these four keys: "subject", "emailBody", "linkedInDM", "followUpEmail".`;

        const response = await axios.post(
            "https://api.groq.com/openai/v1/chat/completions",
            {
                model: "groq/compound-mini",
                messages: [
                    { role: "system", content: systemPrompt },
                    { role: "user", content: prompt }
                ],
                response_format: { type: "json_object" },
                max_tokens: 1024,
                temperature: 0.7
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${process.env.GROQ_API_KEY}`
                },
                timeout: 30000
            }
        );

        const rawContent = response.data.choices[0].message.content;

        // Remove markdown backticks if returned by LLM
        const cleanedContent = rawContent.replace(/```json/gi, "").replace(/```/g, "").trim();
        const parsedData = JSON.parse(cleanedContent);
        const { subject, emailBody, linkedInDM, followUpEmail } = parsedData;

        const emailHistory = await EmailHistory.create({
            user: req.user._id,
            prompt: systemPrompt + ` USER PROMPT: ` + prompt,
            subject,
            emailBody,
            linkedInDM,
            followUpEmail
        });

        return res.status(200).json({
            message: "Email generated successfully",
            data: emailHistory
        });
    } catch (error) {
        console.error("Generate email error:", error.response?.data || error.message);
        return res.status(500).json({
            message: "Error while generating email",
            error: error.response?.data?.error?.message || error.message
        });
    }
};
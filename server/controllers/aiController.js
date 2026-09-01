const EmailHistory = require("../models/EmailHistory");
const axios = require("axios");

exports.generateEmail = async (req, res) => {
    const { prompt } = req.body;
    if (!prompt || !prompt.trim()) {
        return res.status(400).json({
            success: false,
            message: "Please enter a prompt or template description."
        });
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

        // Clean markdown code fence if returned
        const cleanedContent = rawContent.replace(/```json/gi, "").replace(/```/g, "").trim();
        const parsedData = JSON.parse(cleanedContent);
        const { subject, emailBody, linkedInDM, followUpEmail } = parsedData;

        const emailHistory = await EmailHistory.create({
            user: req.user._id,
            prompt: prompt,
            subject: subject || "Cold Outreach Proposal",
            emailBody: emailBody || "",
            linkedInDM: linkedInDM || "",
            followUpEmail: followUpEmail || ""
        });

        return res.status(200).json({
            success: true,
            message: "Outreach package generated successfully!",
            data: {
                _id: emailHistory._id,
                prompt: emailHistory.prompt,
                subject: emailHistory.subject,
                emailBody: emailHistory.emailBody,
                linkedInDM: emailHistory.linkedInDM,
                followUpEmail: emailHistory.followUpEmail,
                createdAt: emailHistory.createdAt
            }
        });
    } catch (error) {
        console.error("Generate email error:", error.response?.data || error.message);
        return res.status(500).json({
            success: false,
            message: "AI email generation service is currently unavailable. Please try again in a few moments."
        });
    }
};

exports.getHistory = async (req, res) => {
    try {
        const emailHistory = await EmailHistory.find({ user: req.user._id })
            .select("-__v")
            .sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            message: "Email history retrieved successfully.",
            data: emailHistory
        });
    } catch (error) {
        console.error("Get history error:", error.message);
        return res.status(500).json({
            success: false,
            message: "Unable to retrieve your email history. Please try again later."
        });
    }
};
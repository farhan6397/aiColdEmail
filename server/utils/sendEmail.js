const nodemailer = require("nodemailer");
const axios = require("axios");

const sendEmail = async (options) => {
    // 1. If RESEND_API_KEY is present, send via HTTPS API (Guaranteed on Render Free Tier)
    if (process.env.RESEND_API_KEY) {
        try {
            const res = await axios.post(
                "https://api.resend.com/emails",
                {
                    from: process.env.RESEND_FROM || "ColdMail AI <onboarding@resend.dev>",
                    to: [options.to],
                    subject: options.subject,
                    text: options.text,
                    html: options.html || `<p>${options.text.replace(/\n/g, '<br/>')}</p>`
                },
                {
                    headers: {
                        Authorization: `Bearer ${process.env.RESEND_API_KEY.trim()}`,
                        "Content-Type": "application/json"
                    }
                }
            );
            console.log("Mail sent successfully via Resend API:", res.data?.id);
            return true;
        } catch (resendErr) {
            console.error("Resend API failed:", resendErr.response?.data || resendErr.message);
        }
    }

    // 2. Gmail SMTP Fallback
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
        throw new Error("Email credentials not found in environment variables (EMAIL_USER/EMAIL_PASS or RESEND_API_KEY)");
    }

    const cleanPass = process.env.EMAIL_PASS.replace(/\s+/g, '');

    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: process.env.EMAIL_USER.trim(),
            pass: cleanPass,
        },
        tls: {
            rejectUnauthorized: false
        },
        family: 4,
        connectionTimeout: 10000
    });

    const mailOptions = {
        from: `"ColdMail AI" <${process.env.EMAIL_USER.trim()}>`,
        to: options.to,
        subject: options.subject,
        text: options.text,
        html: options.html || `<p>${options.text.replace(/\n/g, '<br/>')}</p>`
    };

    await transporter.sendMail(mailOptions);
    console.log("Mail sent successfully via Gmail SMTP to", options.to);
    return true;
};

module.exports = { sendEmail };
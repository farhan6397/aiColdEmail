const nodemailer = require("nodemailer");

const sendEmail = async (options) => {
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
        throw new Error("Email credentials not found in environment variables (EMAIL_USER & EMAIL_PASS)");
    }

    const cleanPass = process.env.EMAIL_PASS.replace(/\s+/g, '');

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER.trim(),
            pass: cleanPass,
        },
    });

    const mailOptions = {
        from: `"ColdMail AI" <${process.env.EMAIL_USER.trim()}>`,
        to: options.to,
        subject: options.subject,
        text: options.text,
        html: options.html || `
            <div style="font-family: Arial, sans-serif; max-width: 500px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; rounded-radius: 8px;">
                <h2 style="color: #0f172a; margin-bottom: 12px;">ColdMail AI Verification</h2>
                <p style="color: #475569; font-size: 14px; line-height: 1.5;">${options.text.replace(/\n/g, '<br/>')}</p>
                <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 20px 0;" />
                <p style="color: #94a3b8; font-size: 12px;">If you did not request this code, you can safely ignore this email.</p>
            </div>
        `
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Mail sent successfully to", options.to, "Message ID:", info.messageId);
    return true;
};

module.exports = { sendEmail };
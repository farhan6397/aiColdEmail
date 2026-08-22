const nodemailer = require("nodemailer");

const sendEmail = async (options) => {
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
        throw new Error("Email credentials not found in environment variables");
    }

    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS.replace(/\s+/g, ""),
        },
    });

    const mailOptions = {
        from: `"AI Cold Email Generator" <${process.env.EMAIL_USER}>`,
        to: options.to,
        subject: options.subject,
        text: options.text,
        html: `<div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
                <h2>AI Cold Email Generator - Email Verification</h2>
                <p>Your OTP verification code is:</p>
                <h1 style="color: #4F46E5; letter-spacing: 4px;">${options.text.match(/\d{6}/)?.[0] || options.text}</h1>
                <p>This code is valid for <strong>10 minutes</strong>. Do not share this code with anyone.</p>
               </div>`
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Mail sent successfully, Message ID:", info.messageId);
    return info;
};

module.exports = { sendEmail };
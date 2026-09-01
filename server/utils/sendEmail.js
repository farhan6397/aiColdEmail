const nodemailer = require("nodemailer");

const sendEmail = async (options) => {
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
        throw new Error("Email credentials not found in environment variables");
    }

    const cleanPass = process.env.EMAIL_PASS.replace(/\s+/g, '');

    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: process.env.EMAIL_USER,
            pass: cleanPass,
        },
        tls: {
            rejectUnauthorized: false
        },
        family: 4 // Force IPv4 to prevent ENETUNREACH on Render
    });

    const mailOptions = {
        from: `"ColdMail AI" <${process.env.EMAIL_USER}>`,
        to: options.to,
        subject: options.subject,
        text: options.text,
        html: `<p>${options.text}</p>`
    };

    await transporter.sendMail(mailOptions);
    console.log("Mail sent successfully");
    return true;
};

module.exports = { sendEmail };
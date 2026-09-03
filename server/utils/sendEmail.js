const nodemailer = require("nodemailer");
const { Resend } = require("resend");


/**
 * Generate a responsive, dark-mode branded HTML email template for OTP codes
 */
const generateOtpHtml = (name, otp) => {
    return `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ColdMail AI Verification Code</title>
</head>
<body style="margin: 0; padding: 0; background-color: #080B0C; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #e2e8f0;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #080B0C; padding: 40px 15px;">
        <tr>
            <td align="center">
                <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 500px; background-color: #0D1317; border-radius: 16px; border: 1px solid #1E293B; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.5);">
                    <!-- Header -->
                    <tr>
                        <td style="padding: 32px 32px 20px; text-align: center; border-bottom: 1px solid #1E293B;">
                            <span style="font-size: 24px; font-weight: 800; color: #ffffff; letter-spacing: -0.5px;">
                                coldmail<span style="color: #2DD4BF;">.ai</span>
                            </span>
                        </td>
                    </tr>
                    <!-- Body -->
                    <tr>
                        <td style="padding: 32px;">
                            <h1 style="margin: 0 0 16px; font-size: 20px; font-weight: 700; color: #ffffff; text-align: center;">
                                Verify Your Email Address
                            </h1>
                            <p style="margin: 0 0 24px; font-size: 14px; line-height: 1.6; color: #94A3B8; text-align: center;">
                                Hello ${name || 'there'},<br/>
                                Please use the 6-digit verification code below to activate your ColdMail AI account:
                            </p>
                            
                            <!-- OTP Box -->
                            <div style="text-align: center; margin: 28px 0;">
                                <div style="display: inline-block; background-color: #080C0E; border: 1.5px solid #2DD4BF; border-radius: 12px; padding: 16px 32px;">
                                    <span style="font-family: 'Courier New', Courier, monospace; font-size: 34px; font-weight: 700; letter-spacing: 8px; color: #2DD4BF;">
                                        ${otp}
                                    </span>
                                </div>
                            </div>

                            <p style="margin: 0 0 12px; font-size: 13px; line-height: 1.5; color: #64748B; text-align: center;">
                                ⏱️ This code will expire in <strong style="color: #94A3B8;">10 minutes</strong>.
                            </p>
                            <p style="margin: 0; font-size: 13px; line-height: 1.5; color: #64748B; text-align: center;">
                                If you did not request this verification, you can safely ignore this email.
                            </p>
                        </td>
                    </tr>
                    <!-- Footer -->
                    <tr>
                        <td style="padding: 20px 32px; background-color: #080C0E; border-top: 1px solid #1E293B; text-align: center;">
                            <p style="margin: 0; font-size: 11px; color: #475569;">
                                © ${new Date().getFullYear()} ColdMail AI Outreach Platform. All rights reserved.
                            </p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
    `.trim();
};

const sendEmail = async (options) => {
    const htmlContent = options.html || (options.otp ? generateOtpHtml(options.name, options.otp) : `
        <div style="font-family: Arial, sans-serif; max-width: 500px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
            <h2 style="color: #0f172a; margin-bottom: 12px;">ColdMail AI Verification</h2>
            <p style="color: #475569; font-size: 14px; line-height: 1.5;">${(options.text || '').replace(/\n/g, '<br/>')}</p>
            <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 20px 0;" />
            <p style="color: #94a3b8; font-size: 12px;">If you did not request this code, you can safely ignore this email.</p>
        </div>
    `);

    // =========================================================================
    // Option 1: Resend Official SDK (Recommended for Render - Port 443 HTTPS)
    // =========================================================================
    if (process.env.RESEND_API_KEY) {
        try {
            const resend = new Resend(process.env.RESEND_API_KEY.trim());
            const senderEmail = process.env.EMAIL_FROM || 'ColdMail AI <onboarding@resend.dev>';
            const { data, error } = await resend.emails.send({
                from: senderEmail,
                to: [options.to],
                subject: options.subject,
                html: htmlContent,
                text: options.text
            });

            if (error) {
                throw new Error(`Resend Error: ${error.message || JSON.stringify(error)}`);
            }

            console.log("Mail sent successfully via Resend to", options.to, "ID:", data?.id);
            return true;
        } catch (resendErr) {
            console.error("Resend dispatch failed:", resendErr.message);
            throw resendErr;
        }
    }

    // =========================================================================
    // Option 2: Brevo HTTP REST API (Port 443)
    // =========================================================================
    if (process.env.BREVO_API_KEY) {
        try {
            const senderEmail = process.env.EMAIL_USER || 'no-reply@coldmail.ai';
            const res = await fetch('https://api.brevo.com/v3/smtp/email', {
                method: 'POST',
                headers: {
                    'api-key': process.env.BREVO_API_KEY.trim(),
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    sender: { name: 'ColdMail AI', email: senderEmail },
                    to: [{ email: options.to }],
                    subject: options.subject,
                    htmlContent: htmlContent,
                    textContent: options.text
                })
            });

            const data = await res.json();
            if (!res.ok) {
                throw new Error(`Brevo API Error: ${data.message || JSON.stringify(data)}`);
            }
            console.log("Mail sent successfully via Brevo to", options.to, "Message ID:", data.messageId);
            return true;
        } catch (brevoErr) {
            console.error("Brevo API dispatch failed:", brevoErr.message);
            throw brevoErr;
        }
    }

    // =========================================================================
    // Option 3: Nodemailer with Gmail SMTP (Works on Localhost, VPS & Paid Cloud)
    // =========================================================================
    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
        const cleanPass = process.env.EMAIL_PASS.replace(/\s+/g, '');

        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            connectionTimeout: 10000,
            greetingTimeout: 10000,
            socketTimeout: 15000,
            auth: {
                user: process.env.EMAIL_USER.trim(),
                pass: cleanPass,
            },
            tls: {
                rejectUnauthorized: false
            }
        });

        const mailOptions = {
            from: `"ColdMail AI" <${process.env.EMAIL_USER.trim()}>`,
            to: options.to,
            subject: options.subject,
            text: options.text,
            html: htmlContent
        };

        const info = await transporter.sendMail(mailOptions);
        console.log("Mail sent successfully via Gmail SMTP to", options.to, "Message ID:", info.messageId);
        return true;
    }

    throw new Error("No email service configured. Please set RESEND_API_KEY or EMAIL_USER & EMAIL_PASS in environment variables.");
};

module.exports = { sendEmail, generateOtpHtml };
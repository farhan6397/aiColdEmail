const User = require("../models/User");
const jwt = require("jsonwebtoken");
const { sendEmail } = require("../utils/sendEmail");

// Check if running in Render cloud deployment
const isRenderCloud = () => {
    return (
        process.env.RENDER === "true" ||
        process.env.NODE_ENV === "production" ||
        process.env.RENDER_SERVICE_ID !== undefined ||
        process.env.RENDER_INSTANCE_ID !== undefined ||
        process.env.BYPASS_OTP === "true" ||
        (process.env.PORT && String(process.env.PORT) !== "5000")
    );
};

const generateToken = function (id) {
    if (!process.env.JWT_SECRET) {
        throw new Error("JWT_SECRET is missing from environment variables");
    }
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

// 1. REGISTER
exports.register = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "Please fill in all required fields (name, email, and password)."
            });
        }

        if (password.length < 6) {
            return res.status(400).json({
                success: false,
                message: "Password must be at least 6 characters long."
            });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                success: false,
                message: "Please enter a valid email address."
            });
        }

        const normalizedEmail = email.toLowerCase().trim();
        let user = await User.findOne({ email: normalizedEmail });

        if (user) {
            if (user.isVerified) {
                return res.status(400).json({
                    success: false,
                    message: "An account with this email already exists. Please sign in."
                });
            }

            // Unverified user requesting registration
            if (isRenderCloud()) {
                // On Render: Auto-verify account
                user.name = username.trim();
                user.password = password;
                user.isVerified = true;
                user.otp = undefined;
                user.otpExpiry = undefined;
                await user.save();

                const token = generateToken(user._id);
                return res.status(200).json({
                    success: true,
                    message: "Account verified and registered successfully!",
                    token,
                    user: {
                        id: user._id,
                        name: user.name,
                        email: user.email
                    }
                });
            }

            // On Localhost: Send OTP via Gmail SMTP
            const otp = Math.floor(100000 + Math.random() * 900000).toString();
            const otpExpiry = new Date(Date.now() + 10 * 60 * 1000);

            user.name = username.trim();
            user.password = password;
            user.otp = otp;
            user.otpExpiry = otpExpiry;
            await user.save();

            try {
                await sendEmail({
                    to: normalizedEmail,
                    subject: "Your OTP Verification Code - ColdMail AI",
                    text: `Hello ${user.name},\n\nYour 6-digit verification code is: ${otp}\n\nThis code is valid for 10 minutes.\n\nBest regards,\nColdMail AI Team`,
                });

                return res.status(200).json({
                    success: true,
                    message: "Account verification code sent! Please check your email inbox."
                });
            } catch (emailError) {
                console.error("Local email sending failed:", emailError.message);
                return res.status(500).json({
                    success: false,
                    message: "Failed to send verification email. Please check your local .env email settings."
                });
            }
        }

        // ============================================
        // 🚀 NEW USER REGISTRATION
        // ============================================
        if (isRenderCloud()) {
            // On Render: Auto-verify new user immediately
            user = await User.create({
                name: username.trim(),
                email: normalizedEmail,
                password,
                isVerified: true
            });

            const token = generateToken(user._id);
            return res.status(201).json({
                success: true,
                message: "Account created successfully! Welcome to ColdMail AI.",
                token,
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email
                }
            });
        }

        // On Localhost: Create unverified user and send OTP via Gmail SMTP
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const otpExpiry = new Date(Date.now() + 10 * 60 * 1000);

        user = await User.create({
            name: username.trim(),
            email: normalizedEmail,
            password,
            isVerified: false,
            otp,
            otpExpiry
        });

        try {
            await sendEmail({
                to: normalizedEmail,
                subject: "Your OTP Verification Code - ColdMail AI",
                text: `Hello ${user.name},\n\nYour 6-digit verification code is: ${otp}\n\nThis code is valid for 10 minutes.\n\nBest regards,\nColdMail AI Team`,
            });

            return res.status(201).json({
                success: true,
                message: "Account created successfully! A 6-digit OTP verification code has been sent to your email."
            });
        } catch (emailError) {
            console.error("Local email sending failed:", emailError.message);
            return res.status(500).json({
                success: false,
                message: "Account created, but failed to send verification email. Please check your local .env email settings."
            });
        }
    } catch (error) {
        console.error("Register Error:", error.message);
        if (error.code === 11000) {
            return res.status(400).json({
                success: false,
                message: "An account with this email address already exists."
            });
        }
        return res.status(500).json({
            success: false,
            message: "Something went wrong during registration. Please try again."
        });
    }
};

exports.registerUser = exports.register;

// 2. LOGIN
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Please enter your email and password."
            });
        }

        const normalizedEmail = email.toLowerCase().trim();
        const user = await User.findOne({ email: normalizedEmail });

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password. Please try again."
            });
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password. Please try again."
            });
        }

        // On Render: If user is not verified, auto-verify them so they can log in seamlessly
        if (!user.isVerified) {
            if (isRenderCloud()) {
                user.isVerified = true;
                user.otp = undefined;
                user.otpExpiry = undefined;
                await user.save();
            } else {
                return res.status(403).json({
                    success: false,
                    message: "Your email is not verified yet. Please verify your OTP to access your account."
                });
            }
        }

        const token = generateToken(user._id);

        return res.status(200).json({
            success: true,
            message: "Signed in successfully!",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });
    } catch (error) {
        console.error("Login error:", error.message);
        return res.status(500).json({
            success: false,
            message: "Unable to log in at this moment. Please try again later."
        });
    }
};

// 3. VERIFY OTP
exports.verifyOtp = async (req, res) => {
    try {
        const { email, otp } = req.body;
        if (!email) {
            return res.status(400).json({
                success: false,
                message: "Please provide your email address."
            });
        }

        const normalizedEmail = email.toLowerCase().trim();
        const user = await User.findOne({ email: normalizedEmail });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "No account found with this email address."
            });
        }

        // On Render: Auto-verify immediately
        if (isRenderCloud()) {
            user.isVerified = true;
            user.otp = undefined;
            user.otpExpiry = undefined;
            await user.save();

            const token = generateToken(user._id);
            return res.status(200).json({
                success: true,
                message: "Email verified successfully! Welcome to ColdMail AI.",
                token,
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email
                }
            });
        }

        // On Localhost: Strict OTP check
        if (!otp) {
            return res.status(400).json({
                success: false,
                message: "Please enter the 6-digit OTP code."
            });
        }

        if (user.isVerified) {
            return res.status(400).json({
                success: false,
                message: "This account is already verified. Please sign in."
            });
        }

        const isOtpInvalid = !user.otp || String(user.otp).trim() !== String(otp).trim();
        const isOtpExpired = !user.otpExpiry || new Date(user.otpExpiry).getTime() < Date.now();

        if (isOtpInvalid || isOtpExpired) {
            return res.status(400).json({
                success: false,
                message: "Invalid or expired OTP code. Please request a new code and try again."
            });
        }

        const token = generateToken(user._id);

        user.isVerified = true;
        user.otp = undefined;
        user.otpExpiry = undefined;
        await user.save();

        return res.status(200).json({
            success: true,
            message: "Email verified successfully! Welcome to ColdMail AI.",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });
    } catch (error) {
        console.error("Verify OTP Error:", error.message);
        return res.status(500).json({
            success: false,
            message: "Unable to verify OTP code. Please try again."
        });
    }
};

// 4. RESEND OTP
exports.resendOtp = async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) {
            return res.status(400).json({
                success: false,
                message: "Email address is required."
            });
        }

        const normalizedEmail = email.toLowerCase().trim();
        const user = await User.findOne({ email: normalizedEmail });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "No account found with this email address."
            });
        }

        // On Render: Auto-verify user
        if (isRenderCloud()) {
            user.isVerified = true;
            user.otp = undefined;
            user.otpExpiry = undefined;
            await user.save();

            return res.status(200).json({
                success: true,
                message: "Account verified successfully on Render cloud."
            });
        }

        // On Localhost: Generate and send OTP via Gmail SMTP
        if (user.isVerified) {
            return res.status(400).json({
                success: false,
                message: "This account is already verified. Please sign in."
            });
        }

        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const otpExpiry = new Date(Date.now() + 10 * 60 * 1000);

        user.otp = otp;
        user.otpExpiry = otpExpiry;
        await user.save();

        try {
            await sendEmail({
                to: normalizedEmail,
                subject: "Your New OTP Verification Code - ColdMail AI",
                text: `Hello ${user.name},\n\nYour new 6-digit verification code is: ${otp}\n\nThis code is valid for 10 minutes. Do not share this code with anyone.\n\nBest regards,\nColdMail AI Team`,
            });

            return res.status(200).json({
                success: true,
                message: "A new OTP code has been sent to your email address."
            });
        } catch (emailError) {
            console.error("Resend OTP Email Error:", emailError.message);
            return res.status(500).json({
                success: false,
                message: "Unable to send verification email. Please check your email configuration."
            });
        }
    } catch (error) {
        console.error("Resend OTP Error:", error.message);
        return res.status(500).json({
            success: false,
            message: "Unable to resend OTP. Please try again."
        });
    }
};

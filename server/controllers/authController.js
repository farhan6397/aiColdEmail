const User = require("../models/User");
const jwt = require("jsonwebtoken");
const { sendEmail } = require("../utils/sendEmail");

const generateToken = function (id) {
    if (!process.env.JWT_SECRET) {
        throw new Error("JWT_SECRET is missing from environment variables");
    }
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

// ============================================
// 1. REGISTER USER & SEND REAL OTP
// ============================================
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

        // Case A: User already exists
        if (user) {
            if (user.isVerified) {
                return res.status(400).json({
                    success: false,
                    message: "An account with this email already exists. Please sign in."
                });
            }

            // Unverified user requesting new registration/verification
            const otp = Math.floor(100000 + Math.random() * 900000).toString();
            const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

            user.name = username.trim();
            user.password = password;
            user.otp = otp;
            user.otpExpiry = otpExpiry;
            await user.save();

            try {
                await sendEmail({
                    to: normalizedEmail,
                    subject: "Your OTP Verification Code - ColdMail AI",
                    name: user.name,
                    otp,
                    text: `Hello ${user.name},\n\nYour 6-digit verification code is: ${otp}\n\nThis code is valid for 10 minutes.\n\nBest regards,\nColdMail AI Team`,
                });

                return res.status(200).json({
                    success: true,
                    message: "Account verification code sent! Please check your email inbox."
                });
            } catch (emailError) {
                console.error("Email sending failed:", emailError.message);
                return res.status(500).json({
                    success: false,
                    message: "Failed to send verification email. Please check your email address or try again later."
                });
            }
        }

        // Case B: Brand new user registration
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

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
                name: user.name,
                otp,
                text: `Hello ${user.name},\n\nYour 6-digit verification code is: ${otp}\n\nThis code is valid for 10 minutes.\n\nBest regards,\nColdMail AI Team`,
            });

            return res.status(201).json({
                success: true,
                message: "Account created successfully! A 6-digit OTP verification code has been sent to your email."
            });
        } catch (emailError) {
            console.error("Email sending failed:", emailError.message);
            return res.status(500).json({
                success: false,
                message: "Account created, but failed to send verification email. Please try resending the OTP code."
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

// ============================================
// 2. LOGIN USER (STRICT VERIFICATION CHECK)
// ============================================
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

        // Strict verification: user must be verified via OTP
        if (!user.isVerified) {
            return res.status(403).json({
                success: false,
                isUnverified: true,
                message: "Your email is not verified yet. Please verify your OTP to access your account."
            });
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

// ============================================
// 3. VERIFY OTP (STRICT 6-DIGIT CODE & EXPIRY)
// ============================================
exports.verifyOtp = async (req, res) => {
    try {
        const { email, otp } = req.body;
        if (!email) {
            return res.status(400).json({
                success: false,
                message: "Please provide your email address."
            });
        }

        if (!otp) {
            return res.status(400).json({
                success: false,
                message: "Please enter the 6-digit OTP code."
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

        if (user.isVerified) {
            return res.status(400).json({
                success: false,
                message: "This account is already verified. Please sign in."
            });
        }

        // Strict OTP check: correct value and within 10 minutes
        const isOtpInvalid = !user.otp || String(user.otp).trim() !== String(otp).trim();
        const isOtpExpired = !user.otpExpiry || new Date(user.otpExpiry).getTime() < Date.now();

        if (isOtpInvalid || isOtpExpired) {
            return res.status(400).json({
                success: false,
                message: "Invalid or expired OTP code. Please request a new code and try again."
            });
        }

        // Verification successful: Mark user verified and clear OTP fields
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
    } catch (error) {
        console.error("Verify OTP Error:", error.message);
        return res.status(500).json({
            success: false,
            message: "Unable to verify OTP code. Please try again."
        });
    }
};

// ============================================
// 4. RESEND OTP (SEND REAL FRESH 6-DIGIT CODE)
// ============================================
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

        if (user.isVerified) {
            return res.status(400).json({
                success: false,
                message: "This account is already verified. Please sign in."
            });
        }

        // Generate fresh 6-digit OTP and 10-minute expiry
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const otpExpiry = new Date(Date.now() + 10 * 60 * 1000);

        user.otp = otp;
        user.otpExpiry = otpExpiry;
        await user.save();

        try {
            await sendEmail({
                to: normalizedEmail,
                subject: "Your New OTP Verification Code - ColdMail AI",
                name: user.name,
                otp,
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

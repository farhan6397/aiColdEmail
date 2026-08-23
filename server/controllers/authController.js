const User = require("../models/User");
const jwt = require("jsonwebtoken");
const { sendEmail } = require("../utils/sendEmail");

const generateToken = function (id) {
    if (!process.env.JWT_SECRET) {
        throw new Error("JWT_SECRET is missing from environment variables");
    }
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

exports.register = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters long" });
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: "Invalid email address" });
        }

        let user = await User.findOne({ email });
        if (user) {
            if (user.isVerified) {
                return res.status(400).json({ message: "User already exists with this email. Please log in." });
            }
            // If user exists but is unverified, update details and send fresh OTP
            const otp = Math.floor(100000 + Math.random() * 900000).toString();
            const otpExpiry = new Date(Date.now() + 10 * 60 * 1000);

            user.name = username;
            user.password = password;
            user.otp = otp;
            user.otpExpiry = otpExpiry;
            await user.save();

            try {
                await sendEmail({
                    to: email,
                    subject: "Your OTP code for AI Cold Email Generator",
                    text: `Your OTP is ${otp}. It is valid for 10 minutes.`,
                });
                return res.status(200).json({ message: "Account pending verification. A new OTP has been sent to your email.", userId: user._id });
            } catch (emailError) {
                console.error("Email sending error:", emailError);
                return res.status(500).json({ message: "Failed to send OTP email. Please try resending OTP.", error: emailError.message });
            }
        }

        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const otpExpiry = new Date(Date.now() + 10 * 60 * 1000);

        user = await User.create({ email, name: username, password, otp, otpExpiry });

        try {
            await sendEmail({
                to: email,
                subject: "Your OTP code for AI Cold Email Generator",
                text: `Your OTP is ${otp}. It is valid for 10 minutes.`,
            });
            return res.status(201).json({ message: "User created successfully. OTP sent to email.", userId: user._id });
        } catch (emailError) {
            console.error("Email sending error:", emailError);
            return res.status(201).json({ message: "User created, but failed to send OTP email. Please try resending OTP.", userId: user._id, emailError: emailError.message });
        }
    } catch (error) {
        console.error("Register Error:", error);
        if (error.name === "ValidationError") {
            return res.status(400).json({ message: error.message });
        }
        if (error.code === 11000) {
            return res.status(400).json({ message: "User with this email already exists" });
        }
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

exports.registerUser = exports.register;

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        if (!user.isVerified) {
            return res.status(400).json({ message: "Please verify your email before logging in" });
        }

        const token = generateToken(user._id);

        return res.status(200).json({
            message: "Login successful",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
            }
        });
    } catch (error) {
        console.error("Login error:", error);
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

exports.verifyOtp = async (req, res) => {
    try {
        const { email, otp } = req.body;
        if (!email || !otp) {
            return res.status(400).json({ message: "Email and OTP are required" });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (user.isVerified) {
            // const token = generateToken(user._id);
            return res.status(200).json({
                message: "User is already verified",
                // token,
                /* user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                 }*/
            });
        }

        if (!user.otp || String(user.otp).trim() !== String(otp).trim() || new Date(user.otpExpiry).getTime() < Date.now()) {
            return res.status(400).json({ message: "Invalid or expired OTP" });
        }

        const token = generateToken(user._id);

        user.isVerified = true;
        user.otp = undefined;
        user.otpExpiry = undefined;
        await user.save();

        return res.status(200).json({
            message: "Email verified successfully",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
            }
        });
    } catch (error) {
        console.error("Verify OTP Error:", error);
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

exports.resendOtp = async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) {
            return res.status(400).json({ message: "Email is required" });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (user.isVerified) {
            return res.status(400).json({ message: "User is already verified" });
        }

        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const otpExpiry = new Date(Date.now() + 10 * 60 * 1000);

        user.otp = otp;
        user.otpExpiry = otpExpiry;
        await user.save();

        await sendEmail({
            to: email,
            subject: "Your OTP code for AI Cold Email Generator",
            text: `Your OTP is ${otp}. It is valid for 10 minutes.`,
        });

        return res.status(200).json({ message: "New OTP sent successfully to email" });
    } catch (error) {
        console.error("Resend OTP Error:", error);
        return res.status(500).json({ message: "Failed to resend OTP", error: error.message });
    }
};

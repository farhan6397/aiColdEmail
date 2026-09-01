const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const getISTDateTime = () => {
    return new Date().toLocaleString("en-IN", {
        timeZone: "Asia/Kolkata",
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true
    }) + " IST";
};

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        minLength: 6,
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    otp: {
        type: String,
    },
    otpExpiry: {
        type: Date,
    },
    createdAtIST: {
        type: String,
        default: getISTDateTime
    },
    updatedAtIST: {
        type: String,
        default: getISTDateTime
    }
}, { timestamps: true });

// Pre-save middleware for IST timestamps and password hashing
userSchema.pre("save", async function () {
    const nowIST = getISTDateTime();
    if (this.isNew) {
        this.createdAtIST = nowIST;
    }
    this.updatedAtIST = nowIST;

    if (!this.isModified("password")) {
        return;
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

// Method to compare password
userSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
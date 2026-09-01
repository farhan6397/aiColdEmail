const mongoose = require("mongoose");

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

const emailHistorySchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    prompt: {
        type: String,
        required: true,
    },
    subject: {
        type: String,
        required: true,
    },
    emailBody: {
        type: String,
        required: true,
    },
    linkedInDM: {
        type: String,
        required: true,
    },
    followUpEmail: {
        type: String,
        required: true,
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

emailHistorySchema.pre("save", function () {
    const nowIST = getISTDateTime();
    if (this.isNew) {
        this.createdAtIST = nowIST;
    }
    this.updatedAtIST = nowIST;
});

const EmailHistory = mongoose.model("EmailHistory", emailHistorySchema);

module.exports = EmailHistory;
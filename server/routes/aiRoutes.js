const express = require("express");
const router = express.Router();

router.get("/health", (req, res) => {
    res.json({ message: "AI routes active" });
});

module.exports = router;

const express = require("express");
const router = express.Router();
const aiController = require("../controllers/aiController");
const protect = require("../middleware/authMiddleware");

/**
 * @name generate email
 * @description generate an email
 * @route POST /generate-email
 */

router.post("/generate-email", protect, aiController.generateEmail);
router.get("/history", protect, aiController.getHistory);

module.exports = router;

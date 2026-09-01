const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

/**
 * @name register user
 * @description register a user
 * @route POST /register
 */


router.post("/register", authController.register);

/**
 * @name login user
 * @description login a user
 * @route POST /login
 */


router.post("/login", authController.login);

/**
 * @name verify otp
 * @description opt verification
 * @route POST /verify-otp
 */


router.post("/verify-otp", authController.verifyOtp);

/**
 * @name resend otp
 * @description resend otp verification code
 * @route POST /resend-otp
 */
router.post("/resend-otp", authController.resendOtp);

module.exports = router;
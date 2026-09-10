const express = require("express");

const router = express.Router();

const {
    register,
    login,
    logout
} = require("../controllers/authController");

const {
    registerValidation,
    loginValidation
} = require("../validators/authValidator");

const {
    authLimiter
} = require("../middleware/rateLimitMiddleware");

const authMiddleware = require("../middleware/authMiddleware");

router.post(
    "/register",
    authLimiter,
    registerValidation,
    register
);

router.post(
    "/login",
    authLimiter,
    loginValidation,
    login
);

router.post(
    "/logout",
    authMiddleware,
    logout
);

module.exports = router;
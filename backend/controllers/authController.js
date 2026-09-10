const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");

const {
    findUserByEmail,
    createUser
} = require("../models/userModel");

// Register user
const register = async (req, res, next) => {
    try {
        // Check validation errors
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                errors: errors.array()
            });
        }

        const { fullName, email, password } = req.body;

        // Check whether email already exists
        const existingUser = await findUserByEmail(email);

        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: "Email address already registered"
            });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 12);

        // Save user
        const userId = await createUser(
            fullName,
            email,
            hashedPassword
        );

        return res.status(201).json({
            success: true,
            message: "User registered successfully",
            user: {
                id: userId,
                fullName,
                email
            }
        });

    } catch (error) {
        next(error);
    }
};
// Login user
const login = async (req, res, next) => {
    try {
        // Check validation errors
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                errors: errors.array()
            });
        }

        const { email, password } = req.body;

        // Find user
        const user = await findUserByEmail(email);

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            });
        }

        // Compare password with bcrypt hash
        const isPasswordValid = await bcrypt.compare(
            password,
            user.password
        );

        if (!isPasswordValid) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            });
        }

        // Create JWT token
        const token = jwt.sign(
            {
                userId: user.id,
                email: user.email
            },
            process.env.JWT_SECRET,
            {
                expiresIn: process.env.JWT_EXPIRES_IN
            }
        );

        return res.status(200).json({
            success: true,
            message: "Login successful",
            token,
            user: {
                id: user.id,
                fullName: user.full_name,
                email: user.email
            }
        });

    } catch (error) {
        next(error);
    }
};

const logout = async (req, res) => {
    return res.status(200).json({
        success: true,
        message: "Logout successful"
    });
};


module.exports = {
    register,
    login,
    logout
};
const pool = require("../config/db");

// Find user by email
const findUserByEmail = async (email) => {
    const [rows] = await pool.execute(
        "SELECT id, full_name, email, password, created_at FROM users WHERE email = ?",
        [email]
    );

    return rows[0];
};

// Create a new user
const createUser = async (fullName, email, hashedPassword) => {
    const [result] = await pool.execute(
        "INSERT INTO users (full_name, email, password) VALUES (?, ?, ?)",
        [fullName, email, hashedPassword]
    );

    return result.insertId;
};

// Find user by ID
const findUserById = async (id) => {
    const [rows] = await pool.execute(
        "SELECT id, full_name, email, created_at FROM users WHERE id = ?",
        [id]
    );

    return rows[0];
};

module.exports = {
    findUserByEmail,
    createUser,
    findUserById
};
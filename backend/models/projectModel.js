const pool = require("../config/db");

// Create project
const createProject = async (
    userId,
    projectName,
    description,
    status,
    startDate,
    endDate
) => {
    const [result] = await pool.execute(
        `INSERT INTO projects
        (user_id, project_name, description, status, start_date, end_date)
        VALUES (?, ?, ?, ?, ?, ?)`,
        [
            userId,
            projectName,
            description,
            status,
            startDate,
            endDate
        ]
    );

    return result.insertId;
};

// Get all projects of a user
const getProjectsByUser = async (
    userId,
    search,
    status
) => {
    let query = `
        SELECT
            id,
            project_name,
            description,
            status,
            start_date,
            end_date,
            created_at
        FROM projects
        WHERE user_id = ?
    `;

    const params = [userId];

    if (search) {
        query += ` AND project_name LIKE ?`;
        params.push(`%${search}%`);
    }

    if (status) {
        query += ` AND status = ?`;
        params.push(status);
    }

    query += ` ORDER BY created_at DESC`;

    const [rows] = await pool.execute(query, params);

    return rows;
};

// Get one project belonging to user
const getProjectById = async (projectId, userId) => {
    const [rows] = await pool.execute(
        `SELECT
            id,
            project_name,
            description,
            status,
            start_date,
            end_date,
            created_at
         FROM projects
         WHERE id = ? AND user_id = ?`,
        [projectId, userId]
    );

    return rows[0];
};

// Update project
const updateProject = async (
    projectId,
    userId,
    projectName,
    description,
    status,
    startDate,
    endDate
) => {
    const [result] = await pool.execute(
        `UPDATE projects
         SET project_name = ?,
             description = ?,
             status = ?,
             start_date = ?,
             end_date = ?
         WHERE id = ? AND user_id = ?`,
        [
            projectName,
            description,
            status,
            startDate,
            endDate,
            projectId,
            userId
        ]
    );

    return result.affectedRows;
};

// Delete project
const deleteProject = async (projectId, userId) => {
    const [result] = await pool.execute(
        `DELETE FROM projects
         WHERE id = ? AND user_id = ?`,
        [projectId, userId]
    );

    return result.affectedRows;
};

module.exports = {
    createProject,
    getProjectsByUser,
    getProjectById,
    updateProject,
    deleteProject
};
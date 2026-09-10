const pool = require("../config/db");

const checkProjectOwnership = async (projectId, userId) => {
    const [rows] = await pool.execute(
        `SELECT id FROM projects
         WHERE id = ? AND user_id = ?`,
        [projectId, userId]
    );

    return rows[0];
};

const createTask = async (
    projectId,
    taskName,
    description,
    priority,
    status,
    dueDate
) => {
    const [result] = await pool.execute(
        `INSERT INTO tasks
        (project_id, task_name, description, priority, status, due_date)
        VALUES (?, ?, ?, ?, ?, ?)`,
        [
            projectId,
            taskName,
            description,
            priority,
            status,
            dueDate
        ]
    );

    return result.insertId;
};

const getTasksByUser = async (userId, search, status, priority) => {
    let query = `
        SELECT
            t.id,
            t.project_id,
            t.task_name,
            t.description,
            t.priority,
            t.status,
            t.due_date,
            t.created_at
        FROM tasks t
        INNER JOIN projects p
            ON t.project_id = p.id
        WHERE p.user_id = ?
    `;

    const params = [userId];

    if (search) {
        query += ` AND t.task_name LIKE ?`;
        params.push(`%${search}%`);
    }

    if (status) {
        query += ` AND t.status = ?`;
        params.push(status);
    }

    if (priority) {
        query += ` AND t.priority = ?`;
        params.push(priority);
    }

    query += ` ORDER BY t.created_at DESC`;

    const [rows] = await pool.execute(query, params);

    return rows;
};

const getTaskById = async (taskId, userId) => {
    const [rows] = await pool.execute(
        `SELECT
            t.id,
            t.project_id,
            t.task_name,
            t.description,
            t.priority,
            t.status,
            t.due_date,
            t.created_at
         FROM tasks t
         INNER JOIN projects p
             ON t.project_id = p.id
         WHERE t.id = ? AND p.user_id = ?`,
        [taskId, userId]
    );

    return rows[0];
};

const updateTask = async (
    taskId,
    userId,
    taskName,
    description,
    priority,
    status,
    dueDate
) => {
    const [result] = await pool.execute(
        `UPDATE tasks t
         INNER JOIN projects p
             ON t.project_id = p.id
         SET
            t.task_name = ?,
            t.description = ?,
            t.priority = ?,
            t.status = ?,
            t.due_date = ?
         WHERE t.id = ? AND p.user_id = ?`,
        [
            taskName,
            description,
            priority,
            status,
            dueDate,
            taskId,
            userId
        ]
    );

    return result.affectedRows;
};

const deleteTask = async (taskId, userId) => {
    const [result] = await pool.execute(
        `DELETE t
         FROM tasks t
         INNER JOIN projects p
             ON t.project_id = p.id
         WHERE t.id = ? AND p.user_id = ?`,
        [taskId, userId]
    );

    return result.affectedRows;
};

module.exports = {
    checkProjectOwnership,
    createTask,
    getTasksByUser,
    getTaskById,
    updateTask,
    deleteTask
};
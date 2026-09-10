const pool = require("../config/db");

const getDashboardStats = async (userId) => {
    const [rows] = await pool.execute(
        `SELECT
            (SELECT COUNT(*)
             FROM projects
             WHERE user_id = ?) AS total_projects,

            (SELECT COUNT(*)
             FROM tasks t
             INNER JOIN projects p
                 ON t.project_id = p.id
             WHERE p.user_id = ?) AS total_tasks,

            (SELECT COUNT(*)
             FROM tasks t
             INNER JOIN projects p
                 ON t.project_id = p.id
             WHERE p.user_id = ?
             AND t.status = 'Completed') AS completed_tasks,

            (SELECT COUNT(*)
             FROM tasks t
             INNER JOIN projects p
                 ON t.project_id = p.id
             WHERE p.user_id = ?
             AND t.status = 'Pending') AS pending_tasks,

            (SELECT COUNT(*)
             FROM projects
             WHERE user_id = ?
             AND status = 'In Progress') AS projects_in_progress`,
        [
            userId,
            userId,
            userId,
            userId,
            userId
        ]
    );

    return rows[0];
};

module.exports = {
    getDashboardStats
};
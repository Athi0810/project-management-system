const {
    getDashboardStats
} = require("../models/dashboardModel");

const getStats = async (req, res, next) => {
    try {
        const stats = await getDashboardStats(
            req.user.userId
        );

        return res.status(200).json({
            success: true,
            dashboard: {
                totalProjects: stats.total_projects,
                totalTasks: stats.total_tasks,
                completedTasks: stats.completed_tasks,
                pendingTasks: stats.pending_tasks,
                projectsInProgress: stats.projects_in_progress
            }
        });

    } catch (error) {
        next(error);
    }
};

module.exports = {
    getStats
};
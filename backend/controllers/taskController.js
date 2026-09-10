const { validationResult } = require("express-validator");

const {
    checkProjectOwnership,
    createTask,
    getTasksByUser,
    getTaskById,
    updateTask,
    deleteTask
} = require("../models/taskModel");

const create = async (req, res, next) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                errors: errors.array()
            });
        }

        const {
            projectId,
            taskName,
            description,
            priority,
            status,
            dueDate
        } = req.body;

        const project = await checkProjectOwnership(
            projectId,
            req.user.userId
        );

        if (!project) {
            return res.status(404).json({
                success: false,
                message: "Project not found"
            });
        }

        const taskId = await createTask(
            projectId,
            taskName,
            description || null,
            priority || "Medium",
            status || "Pending",
            dueDate || null
        );

        return res.status(201).json({
            success: true,
            message: "Task created successfully",
            taskId
        });

    } catch (error) {
        next(error);
    }
};

const getAll = async (req, res, next) => {
    try {
        const {
            search,
            status,
            priority
        } = req.query;

        const tasks = await getTasksByUser(
            req.user.userId,
            search,
            status,
            priority
        );

        return res.status(200).json({
            success: true,
            tasks
        });

    } catch (error) {
        next(error);
    }
};

const getOne = async (req, res, next) => {
    try {
        const task = await getTaskById(
            req.params.id,
            req.user.userId
        );

        if (!task) {
            return res.status(404).json({
                success: false,
                message: "Task not found"
            });
        }

        return res.status(200).json({
            success: true,
            task
        });

    } catch (error) {
        next(error);
    }
};

const update = async (req, res, next) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                errors: errors.array()
            });
        }

        const {
            taskName,
            description,
            priority,
            status,
            dueDate
        } = req.body;

        const affectedRows = await updateTask(
            req.params.id,
            req.user.userId,
            taskName,
            description || null,
            priority,
            status,
            dueDate || null
        );

        if (affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: "Task not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Task updated successfully"
        });

    } catch (error) {
        next(error);
    }
};

const remove = async (req, res, next) => {
    try {
        const affectedRows = await deleteTask(
            req.params.id,
            req.user.userId
        );

        if (affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: "Task not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Task deleted successfully"
        });

    } catch (error) {
        next(error);
    }
};

module.exports = {
    create,
    getAll,
    getOne,
    update,
    remove
};
const { validationResult } = require("express-validator");

const {
    createProject,
    getProjectsByUser,
    getProjectById,
    updateProject,
    deleteProject
} = require("../models/projectModel");

// Create project
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
            projectName,
            description,
            status,
            startDate,
            endDate
        } = req.body;

        const projectId = await createProject(
            req.user.userId,
            projectName,
            description || null,
            status || "Not Started",
            startDate || null,
            endDate || null
        );

        return res.status(201).json({
            success: true,
            message: "Project created successfully",
            projectId
        });

    } catch (error) {
        next(error);
    }
};

// Get all projects
const getAll = async (req, res, next) => {
    try {
        const {
            search,
            status
        } = req.query;

        const projects = await getProjectsByUser(
            req.user.userId,
            search,
            status
        );

        return res.status(200).json({
            success: true,
            projects
        });

    } catch (error) {
        next(error);
    }
};
// Get project by ID
const getOne = async (req, res, next) => {
    try {
        const project = await getProjectById(
            req.params.id,
            req.user.userId
        );

        if (!project) {
            return res.status(404).json({
                success: false,
                message: "Project not found"
            });
        }

        return res.status(200).json({
            success: true,
            project
        });

    } catch (error) {
        next(error);
    }
};

// Update project
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
            projectName,
            description,
            status,
            startDate,
            endDate
        } = req.body;

        const affectedRows = await updateProject(
            req.params.id,
            req.user.userId,
            projectName,
            description || null,
            status,
            startDate || null,
            endDate || null
        );

        if (affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: "Project not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Project updated successfully"
        });

    } catch (error) {
        next(error);
    }
};

// Delete project
const remove = async (req, res, next) => {
    try {
        const affectedRows = await deleteProject(
            req.params.id,
            req.user.userId
        );

        if (affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: "Project not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Project deleted successfully"
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
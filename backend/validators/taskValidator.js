const { body } = require("express-validator");

const taskValidation = [
    body("projectId")
        .isInt({ min: 1 })
        .withMessage("Valid project ID is required"),

    body("taskName")
        .trim()
        .notEmpty()
        .withMessage("Task name is required"),

    body("description")
        .optional()
        .trim(),

    body("priority")
        .optional()
        .isIn(["Low", "Medium", "High"])
        .withMessage("Invalid task priority"),

    body("status")
        .optional()
        .isIn(["Pending", "In Progress", "Completed"])
        .withMessage("Invalid task status"),

    body("dueDate")
        .optional()
        .isISO8601()
        .withMessage("Invalid due date")
];

const taskUpdateValidation = [
    body("taskName")
        .trim()
        .notEmpty()
        .withMessage("Task name is required"),

    body("description")
        .optional()
        .trim(),

    body("priority")
        .optional()
        .isIn(["Low", "Medium", "High"])
        .withMessage("Invalid task priority"),

    body("status")
        .optional()
        .isIn(["Pending", "In Progress", "Completed"])
        .withMessage("Invalid task status"),

    body("dueDate")
        .optional()
        .isISO8601()
        .withMessage("Invalid due date")
];

module.exports = {
    taskValidation,
    taskUpdateValidation
};
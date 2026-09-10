const { body } = require("express-validator");

const projectValidation = [
    body("projectName")
        .trim()
        .notEmpty()
        .withMessage("Project name is required"),

    body("description")
        .optional()
        .trim(),

    body("status")
        .optional()
        .isIn(["Not Started", "In Progress", "Completed"])
        .withMessage("Invalid project status"),

    body("startDate")
        .optional()
        .isISO8601()
        .withMessage("Invalid start date"),

    body("endDate")
        .optional()
        .isISO8601()
        .withMessage("Invalid end date")
        .custom((endDate, { req }) => {
            if (req.body.startDate && endDate) {
                const start = new Date(req.body.startDate);
                const end = new Date(endDate);

                if (end < start) {
                    throw new Error(
                        "End date cannot be before start date"
                    );
                }
            }

            return true;
        })
];

module.exports = {
    projectValidation
};
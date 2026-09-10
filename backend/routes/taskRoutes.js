const express = require("express");

const router = express.Router();

const {
    create,
    getAll,
    getOne,
    update,
    remove
} = require("../controllers/taskController");

const authMiddleware = require("../middleware/authMiddleware");

const {
    taskValidation,
    taskUpdateValidation
} = require("../validators/taskValidator");

router.post(
    "/",
    authMiddleware,
    taskValidation,
    create
);

router.get(
    "/",
    authMiddleware,
    getAll
);

router.get(
    "/:id",
    authMiddleware,
    getOne
);

router.put("/:id", authMiddleware, taskUpdateValidation, update);

router.delete(
    "/:id",
    authMiddleware,
    remove
);

module.exports = router;
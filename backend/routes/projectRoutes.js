const express = require("express");

const router = express.Router();

const {
    create,
    getAll,
    getOne,
    update,
    remove
} = require("../controllers/projectController");

const authMiddleware = require("../middleware/authMiddleware");

const {
    projectValidation
} = require("../validators/projectValidator");

router.post("/", authMiddleware, projectValidation, create);

router.get("/", authMiddleware, getAll);

router.get("/:id", authMiddleware, getOne);

router.put("/:id", authMiddleware, projectValidation, update);

router.delete("/:id", authMiddleware, remove);

module.exports = router;
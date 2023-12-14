const express = require("express");
const categoryController = require("../controllers/categoryController");
const adminMiddleware = require("../middleware/adminMiddleware")

const router = express.Router();

router.route("/").post(adminMiddleware, categoryController.createCategory);
router.route("/:id").put(adminMiddleware, categoryController.editCategory);
router.route("/:id").delete(adminMiddleware, categoryController.deleteCategory);

module.exports = router;

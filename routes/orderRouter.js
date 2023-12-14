const express = require("express");
const orderController = require("../controllers/orderController");
const adminMiddleware = require("../middleware/adminMiddleware")

const router = express.Router();

router.route("/").post(orderController.createOrder);
router.route("/:id").get(adminMiddleware, orderController.deleteOrder);

module.exports = router;

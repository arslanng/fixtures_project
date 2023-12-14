const express = require("express")
const furnitureController = require("../controllers/furnitureController")
const adminMiddleware = require("../middleware/adminMiddleware")

const router = express.Router()

router.route("/").post(adminMiddleware, furnitureController.createFurniture)
router.route("/").get(furnitureController.getAllFurnitures)
router.route("/:slug").get(furnitureController.getFurniture)
router.route("/:slug").put(furnitureController.editFurniture)
router.route("/delete/:id").get(furnitureController.deleteFurniture)

module.exports = router
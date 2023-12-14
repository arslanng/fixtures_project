const express = require("express")
const pageController = require("../controllers/pageController")
const redirectMiddleware = require("../middleware/redirectMiddleware")

const router = express.Router()

router.route("/").get(pageController.getIndexPage)
router.route("/about").get(pageController.getAboutPage)
router.route("/blog").get(pageController.getBlogPage)
router.route("/contact").get(pageController.getContactPage)
router.route("/register").get(redirectMiddleware, pageController.getRegisterPage)
router.route("/login").get(redirectMiddleware, pageController.getLoginPage)
router.route("/contact").post(pageController.sendMail)

module.exports = router
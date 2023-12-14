const express = require("express");
const { body } = require("express-validator");
const authController = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");
const User = require("../models/User");

const router = express.Router();

router.route("/").post(
  [
    body("name").not().isEmpty().withMessage("Please Enter Your Name"),
    body("password").not().isEmpty().withMessage("Please Enter Your Password"),
    body("email")
      .isEmail()
      .withMessage("Please Enter Your Email")
      .custom((userEmail) => {
        return User.findOne({ email: userEmail }).then((user) => {
          return Promise.reject("Email is Already Exist");
        });
      }),
  ],
  authController.createUser
);
router.route("/login").post(authController.loginUser);
router.route("/logout").get(authController.logoutUser);
router.route("/basket").get(authMiddleware, authController.getBasketPage);
router.route("/admin").get(adminMiddleware, authController.getAdminPage);
router.route("/addFurniture").post(authController.addFurnituresInBasket);
router.route("/release").post(authController.releaseFurniture);
router.route("/:id").delete(adminMiddleware, authController.deleteUser)
router.route("/:id").put(adminMiddleware, authController.editUser)

module.exports = router;

const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");
const User = require("../models/User");
const Category = require("../models/Category");
const Furniture = require("../models/Furniture");
const Order = require("../models/Order");

exports.createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).redirect("/login");
  } catch (error) {
    const errors = validationResult(req);
    for (let i = 0; i < errors.array().length; i++) {
      req.flash("error", ` ${errors.array()[i].msg}`);
    }
    res.status(400).redirect("/register");
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (user) {
      bcrypt.compare(password, user.password, (err, same) => {
        if (same) {
          req.session.userID = user._id;
          res.status(200).redirect("/");
        } else {
          req.flash("error", "Your Password Is Not Correct!!");
          res.status(200).redirect("/login");
        }
      });
    } else {
      req.flash("error", "User Is Not Exist");
      res.status(200).redirect("/login");
    }
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};

exports.logoutUser = (req, res) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
};

exports.getBasketPage = async (req, res) => {
  const user = await User.findOne({ _id: req.session.userID }).populate(
    "basket"
  );
  const userOrders = await Order.find({ user: req.session.userID }).populate(
    "orders"
  );
  let total = 0;
  for (i = 0; i < user.basket.length; i++) {
    total = total + user.basket[i].price;
  }
  res.status(200).render("basket", {
    page_name: "basket",
    user,
    total,
    orders: userOrders,
  });
};

exports.getAdminPage = async (req, res) => {
  const user = await User.findOne({ _id: req.session.userID });
  const categories = await Category.find();
  const furnitures = await Furniture.find().populate("category");
  const users = await User.find();
  const orders = await Order.find().populate("user").populate("orders");
  res.status(200).render("admin", {
    page_name: "admin",
    user,
    categories,
    furnitures,
    users,
    orders,
  });
};

exports.addFurnituresInBasket = async (req, res) => {
  try {
    const furnitureId = req.body.id;
    const user = await User.findById(req.session.userID);
    const furniture = await Furniture.findById(req.body.id);
    user.basket.push(furnitureId);
    user.save();
    req.flash("success", `${furniture.name} added to cart`);
    res.status(200).redirect("/furnitures");
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};

exports.releaseFurniture = async (req, res) => {
  try {
    const user = await User.findById(req.session.userID);
    user.basket.pull(req.body.id);
    user.save();
    res.status(200).redirect("/users/basket");
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    await Order.deleteMany({user: req.params.id})
    res.status(200).redirect("/users/admin");
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};

exports.editUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    user.role = req.body.role;
    user.save();
    res.status(200).redirect("/users/admin");
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};

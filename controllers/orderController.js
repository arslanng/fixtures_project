const Order = require("../models/Order");
const User = require("../models/User");

exports.createOrder = async (req, res) => {
  try {
    const order = await Order.create(req.body);
    const user = await User.findById(req.session.userID);
    user.basket = [];
    user.save();
    res.status(201).redirect("/");
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};

exports.deleteOrder = async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.status(200).redirect("/users/admin");
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};

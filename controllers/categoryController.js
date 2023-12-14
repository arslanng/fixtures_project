const Category = require("../models/Category");
const Furniture = require("../models/Furniture");

exports.createCategory = async (req, res) => {
  try {
    const category = await Category.create(req.body);
    res.status(201).redirect("/users/admin");
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};
exports.editCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    category.name = req.body.name;
    category.save();
    res.status(200).redirect("/users/admin");
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};
exports.deleteCategory = async (req, res) => {
  try {
    await Category.findByIdAndDelete(req.params.id);
    await Furniture.deleteMany({ category: req.params.id });
    res.status(200).redirect("/users/admin")
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};

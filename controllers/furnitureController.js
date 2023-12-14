const Furniture = require("../models/Furniture");
const Category = require("../models/Category");
const User = require("../models/User");

exports.createFurniture = async (req, res) => {
  try {
    const furniture = await Furniture.create(req.body);
    res.status(201).redirect("/furnitures");
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};

exports.getAllFurnitures = async (req, res) => {
  try {
    const categorySlug = req.query.categories;
    const query = req.query.search;
    const category = await Category.findOne({slug: categorySlug})
    
    let filter = {};
    if (categorySlug) {
      filter = { category: category._id };
    }
    
    if (query) {
      filter = { name: query };
    }
    
    if (!query && !categorySlug) {
      filter.name = "";
      filter.categorty = null;
    }
    const furnitures = await Furniture.find({
      $or: [
        { name: { $regex: ".*" + filter.name + ".*", $options: "i" } }, 
        { category: filter.category },
      ],
    }).populate("category").sort("-createdAt");

    const categories = await Category.find();
    res.status(200).render("furnitures", {
      furnitures,
      page_name: "furnitures",
      categories,
    });
  } catch (error) {}
};

exports.getFurniture = async (req, res) => {
  try {
    const furniture = await Furniture.findOne({ slug: req.params.slug });
    const user = await User.findById(req.session.userID);
    res.status(200).render("furniture", {
      page_name: "furnitures",
      furniture,
      user,
    });
  } catch (error) {}
};

exports.deleteFurniture = async (req, res) => {
  try {
    await Furniture.findByIdAndDelete(req.params.id);
    res.status(200).redirect("/users/admin");
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};
exports.editFurniture = async (req, res) => {
  try {
    const furniture = await Furniture.findOne({ slug: req.params.slug })
    furniture.name = req.body.name
    furniture.description = req.body.description
    furniture.price = req.body.price
    furniture.image = req.body.image
    furniture.category = req.body.category
    furniture.save()

    req.flash("success", `${furniture.name} Has Been Updated`)
    res.status(200).redirect("/users/admin")
  } catch (error) {
    
  }
}

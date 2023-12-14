const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
  orders: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Furniture",
    },
  ],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

Order = mongoose.model("Order", OrderSchema);
module.exports = Order;

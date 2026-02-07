const Order = require("../models/Order");
const Cart = require("../models/Cart");

// POST /orders
exports.createOrder = async (req, res) => {
  try {
    const userId = req.user._id;

    const cart = await Cart.findOne({
      userId,
      status: "ACTIVE"
    });

    if (!cart) {
      return res.status(400).json({ message: "No active cart found" });
    }

    const order = await Order.create({
      userId,
      cartId: cart._id
    });

    cart.status = "COMPLETED";
    await cart.save();

    res.status(201).json({
      message: "Order placed successfully",
      orderId: order._id
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET /orders
exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user._id })
      .populate("cartId");

    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const Cart = require("../models/Cart");

// POST /carts
exports.addToCart = async (req, res) => {
  try {
    const userId = req.user._id;
    const { itemId } = req.body;

    let cart = await Cart.findOne({ userId, status: "ACTIVE" });

    if (!cart) {
      cart = await Cart.create({
        userId,
        items: [itemId]
      });
    } else {
      cart.items.push(itemId);
      await cart.save();
    }

    res.status(201).json(cart);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET /carts  ✅ FIXED
exports.getCarts = async (req, res) => {
  try {
    const carts = await Cart.find({ userId: req.user._id })
      .populate("items", "name");

    res.json(carts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

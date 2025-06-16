import Cartitem from "../model/CartItem.schema.js";
import Order from "../model/Order.schema.js";
import User from "../model/User.schema.js";

export const placeOrder = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate("cart");
    if (!user || user.cart.length === 0) {
      return res.status(400).json({ success: false, message: "Cart is empty" });
    }

    const cartItems = await Cartitem.find({ user: user._id }).populate(
      "product"
    );

    const products = cartItems.map((item) => ({
      product: item.product._id,
      quantity: item.quantity,
    }));

    const total = cartItems.reduce(
      (acc, item) => acc + item.quantity * item.product.price,
      0
    );

    const order = await Order.create({
      user: user._id,
      products,
      total,
    });

    user.cart = [];
    await user.save();
    await Cartitem.deleteMany({ user: user._id });

    return res.status(200).json({
      success: true,
      message: "Order placed",
      order,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `placeOrder error: ${error.message}`,
    });
  }
};

export const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .populate("products.product")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      messsage: "fetch users orders",
      orders,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `getUserOrders error: ${error.message}`,
    });
  }
};

export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user","username email")
      .populate("products.product")
      .sort({ createdAt: -1 });

      return res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `getAllOrders error: ${error.message}`,
    });
  }
};

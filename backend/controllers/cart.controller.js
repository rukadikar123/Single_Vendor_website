import Cartitem from "../model/CartItem.schema.js";
import User from "../model/User.schema.js";

export const getCart = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate({
      path: "cart",
      populate: {
        path: "product",
        model: "Product",
      },
    });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "user not found",
      });
    }

    return res.status(200).json({
      success: true,
      cart: user.cart,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `getCart error: ${error.message}`,
    });
  }
};

export const addToCart = async (req, res) => {
  try {
    const { productId } = req.body;

    let user = await User.findById(req.user._id);
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "user not found",
      });
    }

    let cartItem = await Cartitem.findOne({
      user: user._id,
      product: productId,
    });

    if (cartItem) {
      cartItem.quantity += 1;
      await cartItem.save();
    } else {
      cartItem = await Cartitem.create({
        user: user._id,
        product: productId,
        quantity: 1,
      });
    }
    if (!user.cart.includes(cartItem._id)) {
      user.cart.push(cartItem._id);
      await user.save();
    }
    let cartItems = await Cartitem.find({ user: user._id }).populate("product");
    return res.status(200).json({
      success: true,
      message: "Product added to cart",
      cart: cartItems,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `addToCart error: ${error.message}`,
    });
  }
};

export const removeFromCart = async (req, res) => {
  try {
    const { productId } = req.params;
    let user = await User.findById(req.user._id);

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "user not found",
      });
    }

    let cartItem = await Cartitem.findOne({
      user: user._id,
      product: productId,
    });

    if (!cartItem) {
      return res.status(404).json({
        success: false,
        message: "Cart item not found",
      });
    }

    user.cart = user.cart.filter(
      (item) => item.toString() !== cartItem._id.toString()
    );
    await user.save();
    await cartItem.deleteOne();

    const updatedCartItems = await Cartitem.find({ user: user._id }).populate(
      "product"
    );
    res.status(200).json({
      success: true,
      message: "Product removed from cart",
      cart: updatedCartItems,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `removeFromCart error: ${error.message}`,
    });
  }
};

export const clearCart = async (req, res) => {
  try {
    let user = await User.findById(req.user._id);
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "user not found",
      });
    }

    await Cartitem.deleteMany({ user: user._id });
    user.cart = [];
    await user.save();

    res.status(200).json({
      success: true,
      message: "Cart cleared",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `clearCart error: ${error.message}`,
    });
  }
};

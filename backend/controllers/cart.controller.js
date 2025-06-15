import User from "../model/User.schema.js";

export const getCart = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate("cart.product");
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

    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "user not found",
      });
    }

    const existingItem = user.cart.find(
      (item) => item.product.toString() === productId
    );

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      user.cart.push({ product: productId, quantity: 1 });
    }

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Product added to cart",
      cart: user.cart,
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
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "user not found",
      });
    }
    user.cart = user.cart.filter(
      (item) => item.product.toString() !== productId
    );
    await user.save();

    res.status(200).json({
      success: true,
      message: "Product removed from cart",
      cart: user.cart,
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
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "user not found",
      });
    }

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

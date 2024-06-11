import userModel from "../models/userModel.js";

// Add to user cart
const addToCart = async (req, res) => {
  try {
    const { userId, itemId } = req.body;

    let userData = await userModel.findOne({ userId });
    if (!userData) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    let cartData = userData.cartData || {};
    if (!cartData[itemId]) {
      cartData[itemId] = 1;
    } else {
      cartData[itemId] += 1;
    }
    await userModel.findOneAndUpdate({userId},{cartData})
    //userData.cartData = cartData;
    //await userData.save();

    res.json({ success: true, message: "Added to cart", cartData });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "An error occurred while adding to cart" });
  }
};
// Remove items from user cart
const removeFromCart = async (req, res) => {
  try {
    const { userId, itemId } = req.body;

    let userData = await userModel.findOne({ userId });
    if (!userData) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    let cartData = userData.cartData || {};
    if (cartData[itemId]) {
      // Decrease the quantity of the item in the cart
      cartData[itemId] -= 1;
      // If the quantity becomes zero, remove the item from the cart
      if (cartData[itemId] === 0) {
        delete cartData[itemId];
      }
    } else {
      return res.status(400).json({ success: false, message: "Item not in cart" });
    }

    // Update the user's cartData
    await userModel.findOneAndUpdate({ userId }, { cartData });

    res.json({ success: true, message: "Removed from cart", cartData });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "An error occurred while removing from cart" });
  }
};

// Fetch user cart data
const getCart = async (req, res) => {
   try {
    const { userId } = req.body;

    let userData = await userModel.findOne({ userId });
    if (!userData) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const cartData = userData.cartData || {};

    res.json({ success: true, cartData });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "An error occurred while fetching cart data" });
  }
};

export { addToCart, removeFromCart, getCart };

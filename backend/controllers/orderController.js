import orderModel from "../models/orderModel.js";

//Place user Order from frontend
const placeOrder = async (req, res) => {
  try {
    const newOrder = new orderModel({
      items: req.body.items,
      amount: req.body.amount,
      address: req.body.address,
      phone: req.body.phone,
    });
    await newOrder.save();
    res.json({ success: true, message: "Order Placed" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

//user order for frontend
const userOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({ phone: req.body.phone });
    res.json({ success: true, data: orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

export { placeOrder, userOrders };

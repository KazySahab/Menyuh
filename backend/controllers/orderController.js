import orderModel from "../models/orderModel.js";

import userModel from "../models/userModel.js";




//Place user Order from frontend
const placeOrder = async (req, res) => {
  try {
    let user = await userModel.findOne({ userId: req.body.userId });
    if (!user) {
      const newUser = new userModel({
        userId: req.body.userId
      });
      user = await newUser.save();
    }
    const newOrder = new orderModel({
      userId:req.body.userId,
      items: req.body.items,
      amount: req.body.amount,
      address: req.body.address,
    });
    
 
  res.json({success:true,message:"Order Placed"})

    await newOrder.save()

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

//user order for frontend
const userOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({ userId: req.body.userId });
    res.json({ success: true, data: orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};



export { placeOrder, userOrders };

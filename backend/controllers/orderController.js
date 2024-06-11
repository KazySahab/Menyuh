import orderModel from "../models/orderModel.js";
import jwt from "jsonwebtoken"
import userModel from "../models/userModel.js";

const createtoken = (id) =>{
    return jwt.sign({id},process.env.JWT_SECRET)
}

//Place user Order from frontend
const placeOrder = async (req, res) => {
  try {
    let user = await userModel.findOne({ customerId: req.body.customerId });
    if (!user) {
      const newUser = new userModel({
        customerId: req.body.customerId
      });
      user = await newUser.save();
    }
    const newOrder = new orderModel({
      userId:req.body.userId,
      items: req.body.items,
      amount: req.body.amount,
      address: req.body.address,
    });
    
  const token = createtoken(user._id)
  res.json({success:true,token})

    await newOrder.save()
    //res.json({ success: true, message:"Order Placed" });

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

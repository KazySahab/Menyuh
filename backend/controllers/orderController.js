import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";

//Place user Order from frontend
const placeOrder = async (req, res) => {
  try {
    const newOrder = new orderModel({
      userId: req.body.userId,
      items: req.body.items,
      amount: req.body.amount,
      address: req.body.address,
    });

    await newOrder.save();
    await userModel.findOneAndUpdate(
      { userId: req.body.userId },
      { cartData: {} }
    );
    res.json({ success: true, message: "Order Placed" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

//user order for frontend
const userOrders = async (req, res) => {
  try {
    const order = await orderModel.find({ userId: req.body.userId });
    res.json({ success: true, data: order });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

//Listting Orders For Admin panel
const listOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({});
    res.json({ success: true, data: orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

//API for updating order status
const updateStatus = async (req, res) => {
  try {
    await orderModel.findByIdAndUpdate(req.body.orderId, {
      status: req.body.status,
    });
    res.json({ success: true, message: "Status Updated" });

    
    setTimeout(async () => {
      try {
        await orderModel.findByIdAndDelete(req.body.orderId);
        console.log(`Order ${req.body.orderId} deleted after 30 seconds`);
      } catch (deleteError) {
        console.log(`Error deleting order ${req.body.orderId}:`, deleteError);
      }
    }, 24*60*60*1000);


  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

const deleteOrder = async (req, res) => {
  try {
    const deletedOrder = await orderModel.findOneAndDelete({_id:req.body.orderId});
    if (deletedOrder) {
      res.json({ success: true, message: "Order deleted successfully" });
    } else {
      res.json({ success: false, message: "Order not found" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error deleting order" });
  }
};

export { placeOrder, userOrders, listOrders, updateStatus,deleteOrder };

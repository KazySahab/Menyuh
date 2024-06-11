import express from "express"
import { placeOrder,userOrders } from "../controllers/orderController.js"

const orderRouter =express.Router();

orderRouter.post("/place",placeOrder);
orderRouter.post("/userorders",userOrders);

export default orderRouter;
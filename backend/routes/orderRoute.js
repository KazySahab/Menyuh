import express from "express"
import { deleteOrder, listOrders, placeOrder,updateStatus,userOrders } from "../controllers/orderController.js"

const orderRouter =express.Router();

orderRouter.post("/place",placeOrder);
orderRouter.post("/userorders",userOrders);
orderRouter.get("/list",listOrders);
orderRouter.post("/status",updateStatus);
orderRouter.post("/delete",deleteOrder);

export default orderRouter;
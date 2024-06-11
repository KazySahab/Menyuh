import express from "express"
import {addToCart,removeFromCart,getCart} from "../controllers/cartController.js"




const cartRouter =express.Router();

cartRouter.post("/add",addToCart);
cartRouter.post("/remove",removeFromCart);
cartRouter.post("/get",getCart);
// Add logging to cartRoute.js
console.log("Received request at /api/cart/add");


export default cartRouter;
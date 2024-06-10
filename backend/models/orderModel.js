import mongoose, { mongo } from "mongoose"

const orderSchema = new mongoose.Schema({
    items:{type:Array, required:true},
    amount:{type:Number,required:true},
    address:{type:Object,required:true},
    phone:{type:String,required:true},
    status:{type:String, default:"Food Processing"},
    date:{type:Date, default:Date.now},
    payment:{type:Boolean, default:false},
})

const orderModel = mongoose.model.order || mongoose.model("order",orderSchema);

export default orderModel;
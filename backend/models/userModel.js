import mongoose from "mongoose"
 const userSchema = new mongoose.Schema({
    userId:{type:String,required:true},
    cartData:{type:Object,default:{}}
 },{minimize:false})

const userModel = mongoose.model("user", userSchema);


 export default userModel;
import mongoose from "mongoose";

 export const connectDB = async () => {
  
    await mongoose.connect("mongodb+srv://menyuh:mausham098765@cluster0.kwcrjry.mongodb.net/menyuh").then(()=>console.log("DB connected")); 
 
};

export default connectDB;

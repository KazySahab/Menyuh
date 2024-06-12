import userModel from "../models/userModel.js";

const loginUser = async (req, res) => {
  try {
    let user = await userModel.findOne({ userId: req.body.userId });
    if(user)
        {
            return res.json({success:true,message:"user Exists"})
        }
    if (!user) {
      const newUser = new userModel({
        userId: req.body.userId,
      });
      user = await newUser.save();
      res.json({success:true,message:"User LoggedIn"})
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export {loginUser};

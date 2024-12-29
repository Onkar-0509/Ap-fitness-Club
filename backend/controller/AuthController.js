import User from "../Model/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt"; // Import bcrypt for password hashing
import dotenv from "dotenv";

dotenv.config();

const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user= new User({
      username:"apfitness@gmail.com",
      password:"123456",
      phoneNumber:"9067354605",
    })

    await user.save();


    const Userdata = await User.findOne({ username }); 


    if (!Userdata) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }

    const isPasswordCorrect = await bcrypt.compare(password, Userdata.password);

    if (!isPasswordCorrect) {
      return res.status(400).json({
        message: "Password is not correct",
        success: false,
      });
    }


    
    const token = jwt.sign(
      { email: Userdata.username, userId: Userdata._id },
      process.env.SECRET_ID, 
      { expiresIn: "1h" }
    );

    
    res.status(200).json({
      message: "Owner login successfully",
      success: true,
      token,
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      message: "Internal server error occurred",
      success: false,
      Error: err.message,
    });
  }
};

export default login;

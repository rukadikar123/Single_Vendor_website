import { generateToken } from "../config/generateToken.js";
import User from "../model/User.schema.js";

export const register = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    if (!username || !email || !password)
      return res.status(400).json({  success:false ,message: "All fields required" });

    const userExist=await User.findOne({email});

    if(userExist){
        return res.status(400).json({  success:false ,message: "User already exist" });
    }

    const newUser=await User.create({
        username,
        email,
        password,
        role
    })

    const token =generateToken(newUser)

    res.cookie('token',token,{
        httpOnly:true,
        sameSite: 'Lax'
    })

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `register error: ${error.message}`,
    });
  }
};

export const login = async (req, res) => {
  try {
  } catch (error) {}
};

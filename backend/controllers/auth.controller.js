import { generateToken } from "../config/generateToken.js";
import User from "../model/User.schema.js";
import bcrypt from "bcryptjs";

export const register = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    if (!username || !email || !password)
      return res
        .status(400)
        .json({ success: false, message: "All fields required" });

    const userExist = await User.findOne({ email });

    if (userExist) {
      return res
        .status(400)
        .json({ success: false, message: "User already exist" });
    }

    const hashedPassword = bcrypt.hash(password, 8);
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
      role,
    });

    newUser.password = undefined;
    const token = generateToken(newUser);

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "Lax",
      secure: true,
      maxAge:4*24*60*60*1000
    });

    return res.status(200).json({
      success: true,
      message: "User registered successfully",
      newUser,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `register error: ${error.message}`,
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res
        .status(400)
        .json({ success: false, message: "All fields required" });

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    const comparedPassword = bcrypt.compare(password, user.password);
    if (!comparedPassword) {
      return res.status(400).json({
        success: false,
        message: "Incorrect password",
      });
    }

    user.password = undefined;
    const token = generateToken(user);

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "Lax",
      secure: true,
       maxAge:4*24*60*60*1000
    });

    return res.status(200).json({
      success: true,
      message: "User registered successfully",
      user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `login error: ${error.message}`,
    });
  }
};

export const getProfile = async (req, res) => {
  try {
    const user = req.user;

    const userProfile = await User.findById(user._id).select("-password");

    if (!userProfile) {
      return res.status(400).json({
        success: false,
        message: "User not Found ",
      });
    }

    return res.status(200).json({
      success: true,
      userProfile
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Get profile error: ${error.message}`,
    });
  }
};


export const logout=async(req,res)=>{
  try {
    res.clearCookie("token",{
      httpOnly:true,
      sameSite: "Lax",
      secure: true,
    })

    res.status(200).json({
            success:true,
            message:"User logged out successfully"
        })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `logout error: ${error.message}`,
    });
  }
}
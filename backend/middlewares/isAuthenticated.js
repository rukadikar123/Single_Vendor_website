import jwt from 'jsonwebtoken'
import User from '../model/User.schema.js'

export const isAuthenticated=async(req,res,next)=>{
    try {
    const token=req.cookies.token
    if(!token){
        return res.status(400).json({
            success:false,
            message:"Unauthorized"
        })
    }

    const decodedToken=jwt.verify(token,process.env.JWT_SECRET)

    const user=await User.findById(decodedToken._id)

    req.user=user

    next();
    
    } catch (error) {
         return res.status(500).json({
      success: false,
      message: `Authentication error: ${error.message}`,
    });
    }
}

export const isAdmin=async(req,res,next)=>{
    try {
        if(req.user.role !== "admin"){
            return res.status(403).json({
                success:false,
                message:"Forbidden: Admins only"
            })
        }

        next()

    } catch (error) {
        return res.status(500).json({
      success: false,
      message: `Authentication error: ${error.message}`,
    });
    }
}
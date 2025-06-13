import Order from "../model/Order.schema.js";

export const placeOrder=async(req,res)=>{
    try {
        const {products,total}=req.body

        const order=await Order.create({
            user:req.user._id,
            products,
            total
        })

        return res.status(200).json({
            success:true,
            message:"Order placed",
            order
        })

    } catch (error) {
         return res.status(500).json({
      success: false,
      message: `placeOrder error: ${error.message}`,
    });
    }
}

export const getUserOrders=async(req,res)=>{
    try {
        const orders=await Order.find({user:req.user._id}).populate('products.product')

        return res.status(200).json({
            success:true,
            messsage:"fetch users orders",
            orders
        })
        
    } catch (error) {
         return res.status(500).json({
      success: false,
      message: `getUserOrders error: ${error.message}`,
    });
    }
}

export const getAllOrders=async(req,res)=>{
    try {
        const orders=await Order.find().populate('user').populate('products.product')
    } catch (error) {
         return res.status(500).json({
      success: false,
      message: `getAllOrders error: ${error.message}`,
    });
    }
}
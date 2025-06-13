import mongoose from "mongoose"


export const mongoDbConnect=async()=>{
   try {
    await  mongoose.connect(`${process.env.MONGODB_URI}`).then(()=>{
         console.log("mongodb is connected successfully");
         
     })
   } catch (error) {
    console.log("db error:" ,error);
    
   }
}
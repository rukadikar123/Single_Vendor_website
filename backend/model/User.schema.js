import mongoose from "mongoose";

const UserSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true,
        unique:true
    },
    username:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:["user","admin"],
        default:"user"
    }
},{timestamps:true})

const User=mongoose.model("User",UserSchema)

export default User
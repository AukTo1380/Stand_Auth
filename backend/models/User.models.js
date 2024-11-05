import mongoose from "mongoose";



const userSchema =new Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    lastLogin:{
        
        type:Date,   
        default:Date.now
    },
    isVerified:{
        type:Boolean,
        default:false
    },
    resetPasswordToken:String,
    resetPasswordExpires:Date,
    verificationToken:String,
    verificationExpires:Date

},{timestamp:true})


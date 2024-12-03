import mongoose from "mongoose";

// No need to import Schema separately if you're already importing mongoose
const { Schema } = mongoose;

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    lastLogin: {
        type: Date,
        default: Date.now
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    resetPasswordToken: String,
    resetPasswordTokenExpiresAt: Date,
    verificationToken: String,
    verificationExpiresAt: Date,
    
}, { timestamps: true }); // Corrected timestamps option

// Corrected the model name from 'modell' to 'model'
export const User = mongoose.model("User", userSchema);




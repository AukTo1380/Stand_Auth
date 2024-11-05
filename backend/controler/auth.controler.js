import { User } from '../models/User.models.js';
import bcryptjs from 'bcryptjs';
import { generateTokenAndSetCookie } from '../Uitls/generateTokenAndSetCookie.js';

export const signup = async (req, res) => {
    try {
        const { email, password, name } = req.body; // Make sure this is correct
      //   console.log('Sign Up Request:', { email, password, name }); // Log for debugging

        if (!email || !password || !name) {
            return res.status(400).json({ msg: "Please fill all fields" });
        }

        const userAlreadyExists = await User.findOne({ email });
        if (userAlreadyExists) {
            return res.status(400).json({ success: false, msg: "User already exists" });
        }

        const hashPassword = await bcryptjs.hash(password, 10);
        const verificationToken = Math.floor(100000 + Math.random() * 900000).toString();

        const user = new User({
            email,
            password: hashPassword,
            name,
            verificationToken,
            verificationExpiresAt: Date.now() + 24 * 60 * 60 * 1000
        });

        await user.save();
        generateTokenAndSetCookie(res, user._id);

        return res.status(201).json({
            success: true,
            message: "User saved successfully",
            user: {
                ...user._doc,
                password: undefined
            }
        });

    } catch (error) {
        console.error("Signup error:", error.message);
        return res.status(500).json({ msg: "Server Error" });
    }
};


export const login = (req, res) => {
 
}

export const logout = (req, res) => {


}

import { User } from '../models/User.models.js';
import bcryptjs from 'bcryptjs';
import crypto from 'crypto';
import { generateTokenAndSetCookie } from '../Uitls/generateTokenAndSetCookie.js';
import { sendResetPasswordEmail, sendResetSeccessEmail, sendVerificationEmail, sendWellcomEmail } from '../mailtrap/emails.js';
// import { sendVerificationEmail } from '../mailtrap/emails.js';

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
        console.log(email);
        
        await sendVerificationEmail(email, verificationToken);

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

export const verifyEmail = async (req, res) => {
    // code  1 2 4 9 3 2 4
   const {code} =req.body

   try { 
      const user = await User.findOne({
        verificationToken :code,
        verificationExpiresAt :{$gt:Date.now()}
    })
    if(!user){
        return res.status(400).json({success:false,msg:"Invalid Token or expired verification token code "})
    }
    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationExpiresAt = undefined;

    await user.save();
    await sendWellcomEmail(user.email, user.name)

    res.status(200).json({
        success:true,
        message: "Email verified successfully",
        user: {
            ...user._doc,
            password: undefined,
        }
    })    

   } catch (error ) {
        console.error("VerifyEmail error:", error.message);
        return res.status(500).json({ msg: "Server Error" });
   }
   
}
 

export const login =  async (req, res) => {
    // Implement login logic here
    const { email, password } = req.body;
    try {
       const user = await User.findOne({ email});
       if(!user){
           return res.status(400).json({success:false,msg:"User not found"})
       }
       const isPassworValid  = await bcryptjs.compare(password, user.password)
       if(!isPassworValid){
           return res.status(400).json({success:false,msg:"Invalid password"})
       }
       generateTokenAndSetCookie(res, user._id);

       user.lastLogin = new Date();
       await user.save();
       
       res.status(200).json({
         success:true,
         message:"login successfully",
         user:{
             ...user._doc,
             password:undefined
         }
       });
        
    } catch (error) {
        console.error("Login error:", error.message);
        return res.status(500).json({ msg: "login error happen" });
        
    }
}

export const logout = (req, res) => {
    // Implement logout logic here
    res.clearCookie("token");
    res.json({ success: true, msg: "Logged out successfully" });
}




export const forgotPassword = async (req, res) => {
    const { email } = req.body; // Changed `res.body` to `req.body`
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ success: false, msg: "User not found" });
        }

        // Generate reset email
        const resetToken = crypto.randomBytes(20).toString('hex'); // Added 'hex' for better token format
        const resetTokenExpiresAt = Date.now() + 3600000; // Fixed token expiration time calculation

        user.resetPasswordToken = resetToken;
        user.resetPasswordTokenExpiresAt = resetTokenExpiresAt;

        await user.save();

        // Send reset email
        await sendResetPasswordEmail(user.email, `${process.env.CLIENT_URL}/reset-password/${resetToken}`);
        res.status(200).json({
            success: true,
            msg: "Reset password link sent successfully"
        });
    } catch (error) {
        console.error("Error sending password reset email", error);
        return res.status(500).send({ message: "Error sending password reset email" });
    }
};



export const resetPassword = async (req, res) => {
	try {
		const { token } = req.params;
		const { password } = req.body;

		const user = await User.findOne({
			resetPasswordToken: token,
			resetPasswordTokenExpiresAt: { $gt: Date.now() },
		});

		if (!user) {
			return res.status(400).json({ success: false, message: "Invalid or expired reset token" });
		}

		// update password
		const hashedPassword = await bcryptjs.hash(password, 10);

		user.password = hashedPassword;
		user.resetPasswordToken = undefined;
		user.resetPasswordTokenExpiresAt = undefined;
		await user.save();

		await sendResetSeccessEmail(user.email);

		res.status(200).json({ success: true, message: "Password reset successful" });
	} catch (error) {
		console.log("Error in resetPassword ", error);
		res.status(400).json({ success: false, message: error.message });
	}
};

export const cheekAuthentication = async (req, res) => {
    try {
		const user = await User.findById(req.userId).select("-password");
		if (!user) {
			return res.status(400).json({ success: false, message: "User not found" });
		}

		res.status(200).json({ success: true, user });
	} catch (error) {
		console.log("Error in checkAuth ", error);
		res.status(400).json({ success: false, message: error.message });
	}
};





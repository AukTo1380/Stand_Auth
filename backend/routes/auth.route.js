import express from "express";
import {signup,login,verifyEmail, logout, forgotPassword,resetPassword, cheekAuthentication} from "../controler/auth.controler.js";
import { verifyToken } from "../middleware/verifyToken.js";



const router = express.Router();
router.get("/check-auth",verifyToken,cheekAuthentication)
router.post("/sigup",signup);
router.post("/login",login);
router.post("/verify-email",verifyEmail);
router.post("/logout",logout);
router.post("/forgot-password",forgotPassword);
router.post("/reset-password/:token",resetPassword);



export default router

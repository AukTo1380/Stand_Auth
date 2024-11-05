import express from "express";
import {login,sigup,logout} from "../controler/auth.controler.js";



const router = express.Router();

router.get("/sigup",sigup);
router.get("/login",login);
router.get("/logout", logout);

export default router;

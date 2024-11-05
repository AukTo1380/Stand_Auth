import express from "express";
import {signup,login} from "../controler/auth.controler.js";



const router = express.Router();

router.post("/sigup",signup);
router.post("/login",login);
// router.post("/logout",log);

export default router
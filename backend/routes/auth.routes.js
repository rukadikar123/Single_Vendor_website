import { Router } from "express";
import { getProfile, login, logout, register } from "../controllers/auth.controller.js";
import { isAuthenticated } from "../middlewares/isAuthenticated.js";

const router=Router()

router.post("/register",register)
router.post("/login",login)
router.get("/profile",isAuthenticated,getProfile)
router.get("/logout",isAuthenticated,logout)

export default router
import { Router } from "express";
import { getCurrentUser, getProfile, login, logout, register } from "../controllers/auth.controller.js";
import { isAuthenticated } from "../middlewares/isAuthenticated.js";

const router=Router()

router.post("/register",register)
router.post("/login",login)
router.get("/profile",isAuthenticated,getProfile)
router.get("/current",isAuthenticated,getCurrentUser)
router.get("/logout",isAuthenticated,logout)

export default router
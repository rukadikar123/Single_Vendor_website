import { Router } from "express";
import { getProfile, login, register } from "../controllers/auth.controller.js";
import { isAuthenticated } from "../middlewares/isAuthenticated.js";

const router=Router()

router.post("/register",register)
router.post("/login",login)
router.get("/profile",isAuthenticated,getProfile)

export default router
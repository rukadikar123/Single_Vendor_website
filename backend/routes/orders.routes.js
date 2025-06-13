import { Router } from "express";
import { getAllOrders, getUserOrders, placeOrder } from "../controllers/order.controller.js";
import { isAdmin, isAuthenticated } from "../middlewares/isAuthenticated.js";

const router=Router()

router.post('/',isAuthenticated, placeOrder)
router.get('/my-orders',isAuthenticated,getUserOrders)
router.get('/all',isAuthenticated,isAdmin,getAllOrders)

export default router
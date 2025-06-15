import {Router} from "express";
import { isAuthenticated } from "../middlewares/isAuthenticated.js";
import { addToCart, clearCart, getCart, removeFromCart } from "../controllers/cart.controller.js";


const router = Router();


router.get("/", isAuthenticated, getCart);
router.post("/add", isAuthenticated, addToCart);
router.delete("/remove/:productId", isAuthenticated, removeFromCart);
router.delete("/clear", isAuthenticated, clearCart);

export default router
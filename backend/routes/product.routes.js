import { Router } from "express";
import { createProduct, deleteProduct, getAllProducts, updateProduct } from "../controllers/products.controller.js";
import { upload } from "../middlewares/multer.js";
import { isAdmin, isAuthenticated } from "../middlewares/isAuthenticated.js";

const router=Router()


router.get('/all',getAllProducts)
router.post('/create',isAuthenticated, isAdmin,upload.single("image"), createProduct)
router.put('/:id',isAuthenticated, isAdmin,upload.single('image'),updateProduct)
router.delete('/:id',isAuthenticated, isAdmin,deleteProduct)

export default router
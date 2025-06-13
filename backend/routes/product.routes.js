import { Router } from "express";
import { createProduct, deleteProduct, getAllProducts, updateProduct } from "../controllers/products.controller.js";
import { upload } from "../middlewares/multer.js";

const router=Router()


router.get('/all',getAllProducts)
router.get('/create',upload.single("image"), createProduct)
router.get('/:id',upload.single('image'),updateProduct)
router.get('/:id',deleteProduct)

export default router
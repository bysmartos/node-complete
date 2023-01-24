import { Router } from "express";
import productController from "../controllers/product.controller";

const router = Router();

router.get("/products", productController.getProducts);
router.get("/product/:productid", productController.getProduct);

export default router;
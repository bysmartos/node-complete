import express from "express";
import adminController from "../controllers/admin.controller";
import { verifyTokenAndAdmin } from "../middlewares/auth.middleware";
const router = express.Router();




router.get('/users',verifyTokenAndAdmin,adminController.getUsers);
router.get('/orders',verifyTokenAndAdmin,adminController.getOrders);
router.get('/carts',verifyTokenAndAdmin,adminController.getCarts);
router.post("/product",verifyTokenAndAdmin,adminController.postProduct);
router.put("/product/:productid",verifyTokenAndAdmin,adminController.editProduct);
router.delete("/product/:productid",verifyTokenAndAdmin, adminController.deleteProduct);

export default router ;

import express from "express";

import cartController from "../controllers/cart.controller";
import { auth, verifyTokenAndAuthorization } from "../middlewares/auth.middleware";

const router = express.Router();


router.get("/:userId", verifyTokenAndAuthorization , cartController.getCart);
router.post("/", auth ,cartController.postCart);
router.put("/:productid", verifyTokenAndAuthorization ,cartController.deleteProductCart);
router.delete('/:cartid', verifyTokenAndAuthorization,cartController.deleteCart);


export default router;
import express from "express";

import orderController from "../controllers/order.controller";
import { verifyTokenAndAuthorization } from "../middlewares/auth.middleware";

const router = express.Router();


router.get('/:userid',verifyTokenAndAuthorization, orderController.getUserOrders)
router.post('/',verifyTokenAndAuthorization, orderController.postOrder)


export default router;
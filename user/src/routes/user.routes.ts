import { Router } from "express";
import UserController from "../controllers/user.controller";
import {  verifyTokenAndAuthorization } from "../middlewares/auth.middleware";

const router = Router();

router.put("/:userid", verifyTokenAndAuthorization, UserController.updateUser);

router.delete("/:userid", verifyTokenAndAuthorization,UserController.deleteUser);

router.get("/:userid", verifyTokenAndAuthorization, UserController.getUser);



export default router;
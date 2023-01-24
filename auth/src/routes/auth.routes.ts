import { Router } from "express";
import authCtroller from "../controllers/auth.controller";

const router = Router();

router.post("/register", authCtroller.register);

router.post("/login", authCtroller.login);

router.post("/logout", authCtroller.logout);

router.post("/refresh_token", authCtroller.generateAccessToken);

export default router;
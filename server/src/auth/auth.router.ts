import { Router } from "express";
import authController from "./auth.controller.js";
import { validateToken } from "../middleware/validation/validateToken.js";

const authRouter = Router();

authRouter.get("/kakao", authController.getKakaoAuthCode);

authRouter.get("/oauth", authController.handleKakaoOAuthProcess);

authRouter.post("/login", authController.handleLogin);

authRouter.post("/join", authController.handleJoin);

authRouter.post("/logout", authController.handleLogout);

authRouter.post("/withdraw", validateToken, authController.handleWithdraw);

export default authRouter;

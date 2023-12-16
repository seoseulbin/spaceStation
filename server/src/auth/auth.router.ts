import { Router } from "express";
import authController from "./auth.controller.js";

const authRouter = Router();

authRouter.get("/oauth", authController.handleKakaoOAuthProcess);

authRouter.post("/login", authController.handleLogin);

authRouter.post("/join", authController.handleJoin);

authRouter.post("/logout", authController.handleLogout);

authRouter.post("/withdraw", authController.handleWithdraw);

export default authRouter;

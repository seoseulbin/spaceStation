import { Router } from "express";
import authController from "./auth.controller.js";

const authRouter = Router();

authRouter.get("/oauth", 
  authController.handleKakaoOAuthProcess);

authRouter.post("/login", 
  authController.handleKakaoOAuthProcess);

authRouter.post("/join", 
  authController.handleKakaoOAuthProcess);

export default authRouter;

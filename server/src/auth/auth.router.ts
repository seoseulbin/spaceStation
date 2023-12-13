import { Router } from "express";
import authController from "./auth.controller.js";

const authRouter = Router();

authRouter.get("/oauth", 
  authController.handleKakaoOAuthProcess);
authRouter.get("/", 
  authController.handleAccountValidation);

export default authRouter;

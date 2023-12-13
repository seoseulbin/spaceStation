import { Router } from "express";
import authController from "./auth.controller.js";

const authRouter = Router();

authRouter.get("/oauth", 
  authController.handleKakaoOAuthProcess);


export default authRouter;

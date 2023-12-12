import { Router } from "express";
import authController from "./auth.controller.js";

const authRouter = Router();

authRouter.get("/kakao", authController.getKakaoAppkey);

export default authRouter;

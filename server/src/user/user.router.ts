import { Router } from "express";
import userController from "./user.controller.js";

const userRouter = Router();

userRouter.get("/:userid", userController.getUser);
userRouter.put("/", userController.updateUser);

export default userRouter;

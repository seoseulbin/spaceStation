import { Router } from "express";
import userController from "./user.controller.js";
import { validateToken } from "../middleware/validation/validateToken.js";

const userRouter = Router();

userRouter.get("/:userid", userController.getUser);
userRouter.get("/me", userController.getUser);
userRouter.put("/", validateToken, userController.updateUser);

export default userRouter;

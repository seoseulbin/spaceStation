import { Router } from "express";
import userController from "./user.controller.js";
import { validateQueryParams } from "../middleware/validation/queryParams.js";

const userRouter = Router();

userRouter.get("/me", userController.getUser);
userRouter.get(
  "/search/:query",
  validateQueryParams([
    { key: "limit", isNumber: true },
    { key: "cursor", isNumber: true },
  ]),
  userController.getUsersByQuery,
);
userRouter.get("/:userid", userController.getUser);
userRouter.put("/", userController.updateUser);

export default userRouter;

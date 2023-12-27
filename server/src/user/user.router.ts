import { Router } from "express";
import userController from "./user.controller.js";
import { validateQueryParams } from "../middleware/validation/queryParams.js";
import { validateToken } from "../middleware/validation/validateToken.js";

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
userRouter.put("/", validateToken, userController.updateUser);

export default userRouter;

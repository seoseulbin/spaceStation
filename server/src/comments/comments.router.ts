import { Router } from "express";
import commentController from "./comments.controller.js";
import { validateToken } from "../middleware/validation/validateToken.js";

const commentRouter = Router();

commentRouter.get("/:feedId", commentController.getComment);
commentRouter.post("/", validateToken, commentController.postComment);
commentRouter.delete(
  "/:commentId",
  validateToken,
  commentController.deleteComment,
);

export default commentRouter;

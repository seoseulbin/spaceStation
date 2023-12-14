import { Router } from "express";
import commentController from "./comments.controller.js";

const commentRouter = Router();

commentRouter.get("/:feedId", commentController.getComment);
commentRouter.post("/:feedId", commentController.postComment);
commentRouter.delete("/:commentId", commentController.deleteComment);

export default commentRouter;

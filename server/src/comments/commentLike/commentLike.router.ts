import { Router } from "express";
import commentLikeController from "./commentLike.controller.js";
import { validateToken } from "../../middleware/validation/validateToken.js";

const commentLikeRouter = Router();

commentLikeRouter.get("/:commentId", commentLikeController.getLikesBycommentId);
commentLikeRouter.post("/", validateToken, commentLikeController.postLikes);
commentLikeRouter.delete(
  "/:commentId",
  validateToken,
  commentLikeController.deleteLikes,
);

export default commentLikeRouter;

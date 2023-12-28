import { Router } from "express";
import likeController from "./like.controller.js";
import { validateToken } from "../middleware/validation/validateToken.js";

const likeRouter = Router();

likeRouter.get("/:feedId", likeController.getLikesByFeedId);
likeRouter.post("/", validateToken, likeController.postLikes);
likeRouter.delete("/:feedId", validateToken, likeController.deleteLikes);

export default likeRouter;

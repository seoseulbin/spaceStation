import { Router } from "express";
import likeController from "./like.controller.js";

const likeRouter = Router();

likeRouter.get("/:feedId", likeController.getLikesByFeedId);
likeRouter.post("/", likeController.postLikes);
likeRouter.delete("/:feedId", likeController.deleteLikes);

export default likeRouter;

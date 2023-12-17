import { Router } from "express";
import likeController from "./like.controller.js";

const likeRouter = Router();

//test
likeRouter.get("/", (req, res) => {
  res.json({ hello: "hello" });
});

likeRouter.get("/:feedId", likeController.getLikesByFeedId);
likeRouter.post("/", likeController.postLikes);
likeRouter.delete("/:feedId", likeController.deleteLikes);

export default likeRouter;

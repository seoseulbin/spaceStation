import { Router } from "express";
import feedController from "./feed.controller.js";

const feedRouter = Router();

feedRouter.post("/", feedController.createFeed);
feedRouter.put("/:id", feedController.updateFeed);
feedRouter.delete("/:id", feedController.deleteFeed);

export default feedRouter;

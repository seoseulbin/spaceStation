import { Router } from "express";
import feedController from "./feed.controller.js";

const feedRouter = Router();

feedRouter.get("/", feedController.getFeeds);

export default feedRouter;

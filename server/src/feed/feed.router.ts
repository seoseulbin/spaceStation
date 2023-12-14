import { Router } from "express";
import feedController from "./feed.controller.js";

const feedRouter = Router();

feedRouter.post("/", feedController.createFeed);

export default feedRouter;

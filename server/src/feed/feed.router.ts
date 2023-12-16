import { Router } from "express";
import feedController from "./feed.controller.js";
import { validateQueryParams } from "../middleware/validation/queryParams.js";

const feedRouter = Router();

feedRouter.get(
  "/",
  validateQueryParams([
    { key: "limit", isNumber: true },
    { key: "cursor", isNumber: true },
    { key: "userId", isOptional: true },
    { key: "category", isOptional: true },
  ]),
  feedController.getFeeds,
);

export default feedRouter;

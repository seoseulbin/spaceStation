import { Router } from "express";
import feedController from "./feed.controller.js";
import { validateQueryParams } from "../middleware/validation/queryParams.js";

const feedRouter = Router();

feedRouter.get("/:id", feedController.getFeed);

feedRouter.get(
  "/",
  validateQueryParams([
    { key: "limit", isNumber: true },
    { key: "cursor", isNumber: true },
  ]),
  feedController.getFeeds,
);

feedRouter.get(
  "/categories/:categoryId",
  validateQueryParams([
    { key: "limit", isNumber: true },
    { key: "cursor", isNumber: true },
  ]),
  feedController.getCategoryFeeds,
);

feedRouter.get(
  "/profiles/:userId",
  validateQueryParams([
    { key: "limit", isNumber: true },
    { key: "cursor", isNumber: true },
  ]),
  feedController.getProfileFeeds,
);

feedRouter.get(
  "/search/content/:query",
  validateQueryParams([
    { key: "limit", isNumber: true },
    { key: "cursor", isNumber: true },
  ]),
  feedController.getFeedsSearchedByContent,
);

feedRouter.get(
  "/bookmarks/mine",
  validateQueryParams([
    { key: "limit", isNumber: true },
    { key: "cursor", isNumber: true },
  ]),
  feedController.getMyBookmarkFeeds,
);

feedRouter.post("/", feedController.createFeed);
feedRouter.put("/:id", feedController.updateFeed);
feedRouter.delete("/:id", feedController.deleteFeed);

export default feedRouter;

import { Router } from "express";
import feedController from "./feed.controller.js";
import { validateQueryParams } from "../middleware/validation/queryParams.js";
import { validateToken } from "../middleware/validation/validateToken.js";

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
  "/hashtag/:hashtag",
  validateQueryParams([
    { key: "limit", isNumber: true },
    { key: "cursor", isNumber: true },
  ]),
  feedController.getFeedsHashtag,
);

feedRouter.get(
  "/geoLocationContent/:geoLocationContent",
  validateQueryParams([
    { key: "limit", isNumber: true },
    { key: "cursor", isNumber: true },
  ]),
  feedController.getFeedsGeoLocationContent,
);

feedRouter.get(
  "/bookmarks/mine",
  validateQueryParams([
    { key: "limit", isNumber: true },
    { key: "cursor", isNumber: true },
  ]),
  feedController.getMyBookmarkFeeds,
);

feedRouter.get(
  "/bookmarks/mine",
  validateToken,
  validateQueryParams([
    { key: "limit", isNumber: true },
    { key: "cursor", isNumber: true },
  ]),
  feedController.getMyBookmarkFeeds,
);

feedRouter.post("/", validateToken, feedController.createFeed);
feedRouter.put("/:id", validateToken, feedController.updateFeed);
feedRouter.delete("/:id", validateToken, feedController.deleteFeed);

export default feedRouter;

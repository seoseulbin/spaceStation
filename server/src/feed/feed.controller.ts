import asyncHandler from "../middleware/asyncHandler.js";
import feedService from "./feed.service.js";

const feedController = {
  getFeeds: asyncHandler(async (_, res) => {
    const feeds = await feedService.getFeeds();
    res.json(feeds);
  }),
};

export default feedController;

import { ObjectId } from "mongodb";
import asyncHandler from "../middleware/asyncHandler.js";
import feedService from "./feed.service.js";

const feedController = {
  getFeeds: asyncHandler(async (req, res) => {
    const { cursor, limit, userId, category } = req.query;

    if (userId) {
      const feeds = await feedService.getUserFeeds({
        userId: new ObjectId(userId as string),
        cursor: Number(cursor),
        limit: Number(limit),
      });

      res.json(feeds);
    } else if (category) {
      const feeds = await feedService.getCategoryFeeds({
        category: new ObjectId(category as string),
        cursor: Number(cursor),
        limit: Number(limit),
      });

      res.json(feeds);
    } else {
      const feeds = await feedService.getFeeds({
        cursor: Number(cursor),
        limit: Number(limit),
      });

      res.json(feeds);
    }
  }),
};

export default feedController;

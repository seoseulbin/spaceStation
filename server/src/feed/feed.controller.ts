import { ObjectId } from "mongodb";
import asyncHandler from "../middleware/asyncHandler.js";
import { CustomError } from "../middleware/errorHandler.js";
import feedService from "./feed.service.js";

const feedController = {
  getFeeds: asyncHandler(async (req, res) => {
    const { cursor, limit, userId, category } = req.query;
    if (cursor === undefined || limit === undefined) {
      throw new CustomError({
        status: 400,
        message: "cursor 혹은 limit을 전달받지 못했습니다.",
      });
    }

    if (userId && typeof userId === "string") {
      const feeds = await feedService.getUserFeeds({
        userId: new ObjectId(userId),
        cursor: Number(cursor),
        limit: Number(limit),
      });

      res.json(feeds);
    } else if (category && typeof category === "string") {
      const feeds = await feedService.getCategoryFeeds({
        category: new ObjectId(category),
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

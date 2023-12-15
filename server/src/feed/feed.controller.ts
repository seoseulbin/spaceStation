import { ObjectId } from "mongodb";
import asyncHandler from "../middleware/asyncHandler.js";
import { CustomError } from "../middleware/errorHandler.js";
import feedService from "./feed.service.js";

const feedController = {
  getFeeds: asyncHandler(async (req, res) => {
    const { cursor, limit } = req.query;
    if (cursor === undefined || limit === undefined) {
      throw new CustomError({
        status: 400,
        message: "cursor 혹은 limit을 전달받지 못했습니다.",
      });
    }

    const feeds = await feedService.getFeeds({
      cursor: Number(cursor),
      limit: Number(limit),
    });
    res.json(feeds);
  }),

  getUserFeeds: asyncHandler(async (req, res) => {
    const { userId, cursor, limit } = req.query;
    if (
      typeof userId !== "string" ||
      cursor === undefined ||
      limit === undefined
    ) {
      throw new CustomError({
        status: 400,
        message: "userId, cursor 혹은 limit을 전달받지 못했습니다.",
      });
    }

    const feeds = await feedService.getUserFeeds({
      userId: new ObjectId(userId),
      cursor: Number(cursor),
      limit: Number(limit),
    });

    res.json(feeds);
  }),

  getCategoryFeeds: asyncHandler(async (req, res) => {
    const { category, cursor, limit } = req.query;
    if (
      typeof category !== "string" ||
      cursor === undefined ||
      limit === undefined
    ) {
      throw new CustomError({
        status: 400,
        message: "category, cursor 혹은 limit을 전달받지 못했습니다.",
      });
    }

    const feeds = await feedService.getCategoryFeeds({
      category: new ObjectId(category),
      cursor: Number(cursor),
      limit: Number(limit),
    });
    res.json(feeds);
  }),
};

export default feedController;

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
};

export default feedController;

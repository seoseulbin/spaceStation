import { Request } from "express";
import asyncHandler from "../middleware/asyncHandler.js";
import { CustomError } from "../middleware/errorHandler.js";
import feedService from "./feed.service.js";
import { ObjectId } from "mongodb";

type FeedType = {
  userId: string;
  category: string;
  content: string;
  imgUrls: string[];
};

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
  createFeed: asyncHandler(async (req: Request<{}, {}, FeedType>, res) => {
    const { userId, category, content, imgUrls } = req.body;

    if (!userId || !category || !content || !imgUrls) {
      throw new CustomError({
        status: 400,
        message: "요청에 필요한 정보가 부족합니다.",
      });
    }

    feedService.createFeed({ userId, category, content, imgUrls });
    res.status(200).end();
  }),

  updateFeed: asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { category, content, imgUrls }: FeedType = req.body;

    if (!category || !content || !imgUrls) {
      throw new CustomError({
        status: 400,
        message: "요청에 필요한 정보가 부족합니다.",
      });
    }

    feedService.updateFeed({ id, category, content, imgUrls });
    res.status(200).end();
  }),

  deleteFeed: asyncHandler(async (req, res) => {
    const { id } = req.params;

    if (!id) {
      throw new CustomError({
        status: 400,
        message: "요청에 필요한 정보가 부족합니다.",
      });
    }
    feedService.deleteFeed({ id });
    res.status(204).end();
  }),
};

export default feedController;

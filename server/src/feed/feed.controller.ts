import { Request } from "express";
import asyncHandler from "../middleware/asyncHandler.js";
import { CustomError } from "../middleware/errorHandler.js";
import feedService from "./feed.service.js";

const feedController = {
  createFeed: asyncHandler(
    async (
      req: Request<
        {},
        {},
        {
          userId: string;
          category: string;
          content: string;
          imgUrls: string[];
        }
      >,
      res,
    ) => {
      const { userId, category, content, imgUrls } = req.body;
      if (!userId || !category || !content || !imgUrls) {
        throw new CustomError({
          status: 400,
          message: "요청에 필요한 정보가 부족합니다.",
        });
      }

      feedService.createFeed({ userId, category, content, imgUrls });
      res.status(200).end();
    },
  ),
};

export default feedController;

import { Request } from "express";
import asyncHandler from "../middleware/asyncHandler.js";
import { CustomError } from "../middleware/errorHandler.js";
import decodeTokenPayload from "../utils/decodeTokenPayload.js";
import bookmarkService from "./bookmark.service.js";
import { Types } from "mongoose";

const boomarkController = {
  getBookmarksByFeedId: asyncHandler(
    async (req: Request<{ feedId?: string }>, res) => {
      const { feedId } = req.params;
      if (!feedId) {
        throw new CustomError({
          status: 400,
          message: `feedId를 전달 받지 못했습니다.`,
        });
      }

      const bookmarks = await bookmarkService.getBookmarksByFeedId({
        feedId: new Types.ObjectId(feedId),
      });

      res.json(bookmarks);
    },
  ),

  getBookmarksMine: asyncHandler(async (req, res) => {
    const token = req.cookies.service_token;

    if (!token) {
      throw new CustomError({
        status: 401,
        message: "토큰을 전달받지 못했습니다.",
      });
    }

    const userId = decodeTokenPayload(token)["user_id"];

    const bookmarks = await bookmarkService.getBookmarksByUserId({
      userId: new Types.ObjectId(userId),
    });

    res.json(bookmarks);
  }),

  postBookmark: asyncHandler(
    async (req: Request<{}, {}, { feedId: string }>, res) => {
      const { feedId } = req.body;

      if (!feedId) {
        throw new CustomError({
          status: 400,
          message: `feedId를 전달 받지 못했습니다.`,
        });
      }

      const token = req.cookies.service_token;

      if (!token) {
        throw new CustomError({
          status: 401,
          message: "토큰을 전달받지 못했습니다.",
        });
      }

      const userId = decodeTokenPayload(token)["user_id"];

      await bookmarkService.postBookmark({
        userId: new Types.ObjectId(userId),
        feedId: new Types.ObjectId(feedId),
      });

      res.status(201).end();
    },
  ),

  deleteBookmark: asyncHandler(
    async (req: Request<{ feedId?: string }>, res) => {
      const { feedId } = req.params;

      if (!feedId) {
        throw new CustomError({
          status: 400,
          message: `feedId를 전달 받지 못했습니다.`,
        });
      }

      const token = req.cookies.service_token;

      if (!token) {
        throw new CustomError({
          status: 401,
          message: "토큰을 전달받지 못했습니다.",
        });
      }

      const userId = decodeTokenPayload(token)["user_id"];

      await bookmarkService.deleteBookmark({
        userId: new Types.ObjectId(userId),
        feedId: new Types.ObjectId(feedId),
      });

      res.status(200).end();
    },
  ),
};

export default boomarkController;

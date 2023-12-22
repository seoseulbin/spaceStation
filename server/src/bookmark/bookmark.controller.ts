import { Request } from "express";
import asyncHandler from "../middleware/asyncHandler.js";
import { CustomError } from "../middleware/errorHandler.js";
import decodeTokenPayload from "../utils/decodeTokenPayload.js";
import bookmarkService from "./bookmark.service.js";

const boomarkController = {
  getBookmarksByUserId: asyncHandler(async (req, res) => {
    const token = req.cookies.service_token;
    if (!token) {
      throw new CustomError({
        status: 401,
        message: "잘못된 접근 방식입니다.",
      });
    }
    const user = decodeTokenPayload(token)["user_id"];
    await bookmarkService.getBookmarks({ user });
    res.status(200).end();
  }),

  postBookmark: asyncHandler(
    async (req: Request<{}, {}, { feedId: string }>, res) => {
      const { feedId } = req.body;

      if (!feedId) {
        throw new CustomError({
          status: 400,
          message: "전달된 내용이 없습니다.",
        });
      }

      const token = req.cookies.service_token;

      if (!token) {
        throw new CustomError({
          status: 401,
          message: "잘못된 접근 방식입니다.",
        });
      }

      const userId = decodeTokenPayload(token)["user_id"];
      await bookmarkService.postBookmark({ user: userId, feed: feedId });

      res.status(200).end();
    },
  ),

  deleteBookmark: asyncHandler(
    async (req: Request<{ feedId?: string }>, res) => {
      const { feedId } = req.params;

      if (!feedId)
        throw new CustomError({
          status: 400,
          message: "전달된 내용이 없습니다.",
        });

      const token = req.cookies.service_token;

      if (!token) {
        throw new CustomError({
          status: 401,
          message: "잘못된 접근 방식입니다.",
        });
      }

      const user = decodeTokenPayload(token)["user_id"];

      await bookmarkService.deleteBookmark({ user, feed: feedId });
      res.status(200).end();
    },
  ),
};

export default boomarkController;

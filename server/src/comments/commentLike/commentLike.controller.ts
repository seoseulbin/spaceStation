import { Request } from "express";
import asyncHandler from "../../middleware/asyncHandler.js";
import { CustomError } from "../../middleware/errorHandler.js";
import commentLikeService from "./commentLike.service.js";
import decodeTokenPayload from "../../utils/decodeTokenPayload.js";

const commentLikeController = {
  getLikesBycommentId: asyncHandler(
    async (req: Request<{ commentId?: string }>, res) => {
      const { commentId } = req.params;

      if (!commentId) {
        throw new CustomError({
          status: 400,
          message: "전달된 내용이 없습니다.",
        });
      }
      const likes = await commentLikeService.getLikes({ comment: commentId });
      res.json(likes);
    },
  ),

  postLikes: asyncHandler(
    async (req: Request<{}, {}, { commentId: string }>, res) => {
      const { commentId } = req.body;

      if (!commentId) {
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
      await commentLikeService.postLike({ user: userId, comment: commentId });

      res.status(200).end();
    },
  ),

  deleteLikes: asyncHandler(
    async (req: Request<{ commentId?: string }>, res) => {
      const { commentId } = req.params;

      if (!commentId)
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

      await commentLikeService.deleteLike({ user, comment: commentId });
      res.status(200).end();
    },
  ),
};

export default commentLikeController;

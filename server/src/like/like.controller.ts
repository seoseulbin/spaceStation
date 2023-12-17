import { Request } from "express";
import asyncHandler from "../middleware/asyncHandler.js";
import { CustomError } from "../middleware/errorHandler.js";
import likeService from "./like.service.js";

const likeController = {
  getLikesByFeedId: asyncHandler(
    async (req: Request<{ feedId?: string }>, res) => {
      const { feedId } = req.params;
      if (!feedId) {
        throw new CustomError({
          status: 400,
          message: "전달된 내용이 없습니다.",
        });
      }
      const likes = await likeService.getLikes({ feed: feedId });
      res.json(likes);
    },
  ),

  postLikes: asyncHandler(
    async (req: Request<{}, {}, { feedId: string }>, res) => {
      const { feedId } = req.body;

      if (!feedId) {
        throw new CustomError({
          status: 400,
          message: "전달된 내용이 없습니다.",
        });
      }

      const cookie = req.headers.cookie;

      if (!cookie) {
        throw new CustomError({
          status: 401,
          message: "잘못된 접근 방식입니다.",
        });
      }

      const userId = decodeJWT(cookie);
      likeService.postLike({ user: userId, feed: feedId });

      res.status(200).end();
    },
  ),

  deleteLikes: asyncHandler(async (req: Request<{ feedId?: string }>, res) => {
    const { feedId } = req.params;

    if (!feedId)
      throw new CustomError({
        status: 400,
        message: "전달된 내용이 없습니다.",
      });

    const cookie = req.headers.cookie;

    if (!cookie) {
      throw new CustomError({
        status: 401,
        message: "잘못된 접근 방식입니다.",
      });
    }

    const user = decodeJWT(cookie);

    likeService.deleteLike({ user, feed: feedId });
    res.status(200).end();
  }),
};

//JWT token payload decode 함수
function decodeJWT(cookie: string) {
  // token의 . 이후 부분이 payload 값을 의미
  const token = cookie?.split(".")[1];
  const payload = Buffer.from(token, "base64");
  const result = JSON.parse(payload.toString());

  return result.user_id;
}

export default likeController;
